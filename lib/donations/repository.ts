import "server-only";

import { and, eq, sql } from "drizzle-orm";

import { openDatabase } from "@/lib/db/client";
import { donationPayments, donationSubscriptions, paymentWebhookEvents } from "@/lib/db/schema";
import type { DonationPersistenceResult, NormalizedDonationWebhook } from "@/lib/donations/types";

export interface DonationWebhookRepository {
  process(event: NormalizedDonationWebhook): Promise<DonationPersistenceResult>;
}

export class PostgresDonationWebhookRepository implements DonationWebhookRepository {
  async process(event: NormalizedDonationWebhook): Promise<DonationPersistenceResult> {
    const database = openDatabase();
    try {
      return await database.db.transaction(async (tx) => {
        let insertedEvents = await tx
          .insert(paymentWebhookEvents)
          .values({
            provider: event.provider,
            providerEventId: event.providerEventId,
            eventType: event.eventType,
            providerTransactionId: event.providerTransactionId,
            providerOrderId: event.providerOrderId,
            providerSubscriptionId: event.providerSubscriptionId,
            processingStatus: "received",
            payloadHash: event.payloadHash,
            providerCreatedAt: event.providerCreatedAt,
          })
          .onConflictDoNothing({
            target: [paymentWebhookEvents.provider, paymentWebhookEvents.providerEventId],
          })
          .returning({ id: paymentWebhookEvents.id });

        if (insertedEvents.length === 0) {
          if (!event.payment && !event.subscription) return "duplicate_event";

          insertedEvents = await tx
            .update(paymentWebhookEvents)
            .set({
              processingStatus: "received",
              providerTransactionId: event.providerTransactionId,
              providerOrderId: event.providerOrderId,
              providerSubscriptionId: event.providerSubscriptionId,
              payloadHash: event.payloadHash,
              processedAt: null,
            })
            .where(and(
              eq(paymentWebhookEvents.provider, event.provider),
              eq(paymentWebhookEvents.providerEventId, event.providerEventId),
              eq(paymentWebhookEvents.processingStatus, "ignored"),
            ))
            .returning({ id: paymentWebhookEvents.id });

          if (insertedEvents.length === 0) return "duplicate_event";
        }

        if (event.subscription) {
          const subscription = event.subscription;
          await tx
            .insert(donationSubscriptions)
            .values({
              provider: event.provider,
              providerSubscriptionId: subscription.providerSubscriptionId,
              planId: subscription.planId,
              status: subscription.status || "unknown",
              latestProviderEventId: event.providerEventId,
              latestProviderEventAt: subscription.latestProviderEventAt,
              providerCreatedAt: subscription.providerCreatedAt,
              providerUpdatedAt: subscription.providerUpdatedAt,
              cancelledAt: subscription.cancelledAt,
              lastPaymentFailedAt: subscription.lastPaymentFailedAt,
            })
            .onConflictDoUpdate({
              target: [donationSubscriptions.provider, donationSubscriptions.providerSubscriptionId],
              set: {
                planId: sql`coalesce(excluded.plan_id, ${donationSubscriptions.planId})`,
                status: sql`case
                  when excluded.latest_provider_event_at is null
                    or ${donationSubscriptions.latestProviderEventAt} is null
                    or excluded.latest_provider_event_at >= ${donationSubscriptions.latestProviderEventAt}
                  then coalesce(${subscription.status}, ${donationSubscriptions.status})
                  else ${donationSubscriptions.status}
                end`,
                latestProviderEventId: sql`case
                  when excluded.latest_provider_event_at is null
                    or ${donationSubscriptions.latestProviderEventAt} is null
                    or excluded.latest_provider_event_at >= ${donationSubscriptions.latestProviderEventAt}
                  then excluded.latest_provider_event_id
                  else ${donationSubscriptions.latestProviderEventId}
                end`,
                latestProviderEventAt: sql`greatest(excluded.latest_provider_event_at, ${donationSubscriptions.latestProviderEventAt})`,
                providerCreatedAt: sql`coalesce(${donationSubscriptions.providerCreatedAt}, excluded.provider_created_at)`,
                providerUpdatedAt: sql`greatest(excluded.provider_updated_at, ${donationSubscriptions.providerUpdatedAt})`,
                cancelledAt: sql`coalesce(excluded.cancelled_at, ${donationSubscriptions.cancelledAt})`,
                lastPaymentFailedAt: sql`coalesce(excluded.last_payment_failed_at, ${donationSubscriptions.lastPaymentFailedAt})`,
                updatedAt: new Date(),
              },
            });
        }

        if (!event.payment && !event.subscription) {
          await tx
            .update(paymentWebhookEvents)
            .set({ processingStatus: "ignored", processedAt: new Date() })
            .where(sql`${paymentWebhookEvents.id} = ${insertedEvents[0].id}`);
          return "ignored";
        }

        if (event.payment) {
          const payment = event.payment;
          await tx
            .insert(donationPayments)
            .values({
              provider: event.provider,
              latestProviderEventId: event.providerEventId,
              providerTransactionId: payment.providerTransactionId,
              providerOrderId: payment.providerOrderId,
              providerSubscriptionId: payment.providerSubscriptionId,
              providerCustomerId: payment.providerCustomerId,
              paymentType: payment.paymentType,
              amountMinor: payment.amountMinor,
              currency: payment.currency,
              status: payment.status,
              donorEmail: payment.donorEmail,
              tierId: payment.tierId,
              tierName: payment.tierName,
              providerCreatedAt: payment.providerCreatedAt,
              paidAt: payment.paidAt,
              providerReferences: payment.providerReferences,
            })
            .onConflictDoUpdate({
              target: [donationPayments.provider, donationPayments.providerTransactionId],
              set: {
                latestProviderEventId: event.providerEventId,
                providerOrderId: sql`coalesce(excluded.provider_order_id, ${donationPayments.providerOrderId})`,
                providerSubscriptionId: sql`coalesce(excluded.provider_subscription_id, ${donationPayments.providerSubscriptionId})`,
                providerCustomerId: sql`coalesce(excluded.provider_customer_id, ${donationPayments.providerCustomerId})`,
                status: sql`case
                when ${donationPayments.status} in ('refunded', 'reversed') then ${donationPayments.status}
                when ${donationPayments.status} = 'completed' and excluded.status not in ('refunded', 'reversed') then ${donationPayments.status}
                else excluded.status
              end`,
                donorEmail: sql`coalesce(excluded.donor_email, ${donationPayments.donorEmail})`,
                paidAt: sql`coalesce(excluded.paid_at, ${donationPayments.paidAt})`,
                providerReferences: sql`${donationPayments.providerReferences} || excluded.provider_references`,
                updatedAt: new Date(),
              },
            });
        }

        await tx
          .update(paymentWebhookEvents)
          .set({ processingStatus: "processed", processedAt: new Date() })
          .where(sql`${paymentWebhookEvents.id} = ${insertedEvents[0].id}`);

        return "processed";
      });
    } finally {
      await database.close();
    }
  }
}

let repository: DonationWebhookRepository | null = null;

export function getDonationWebhookRepository() {
  repository ??= new PostgresDonationWebhookRepository();
  return repository;
}

export function persistDonationWebhook(
  event: NormalizedDonationWebhook,
  selectedRepository: DonationWebhookRepository = getDonationWebhookRepository(),
) {
  return selectedRepository.process(event);
}
