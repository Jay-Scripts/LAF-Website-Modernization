import { bigint, check, index, jsonb, pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const paymentWebhookEvents = pgTable(
  "payment_webhook_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    provider: varchar("provider", { length: 16 }).notNull(),
    providerEventId: varchar("provider_event_id", { length: 255 }).notNull(),
    eventType: varchar("event_type", { length: 160 }).notNull(),
    providerTransactionId: varchar("provider_transaction_id", { length: 255 }),
    providerOrderId: varchar("provider_order_id", { length: 255 }),
    providerSubscriptionId: varchar("provider_subscription_id", { length: 255 }),
    processingStatus: varchar("processing_status", { length: 24 }).default("received").notNull(),
    payloadHash: varchar("payload_hash", { length: 64 }).notNull(),
    providerCreatedAt: timestamp("provider_created_at", { withTimezone: true }),
    receivedAt: timestamp("received_at", { withTimezone: true }).defaultNow().notNull(),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    failureCategory: varchar("failure_category", { length: 120 }),
  },
  (table) => [
    uniqueIndex("payment_webhook_events_provider_event_uidx").on(table.provider, table.providerEventId),
    index("payment_webhook_events_transaction_idx").on(table.provider, table.providerTransactionId),
    check("payment_webhook_events_provider_check", sql`${table.provider} in ('paypal', 'xendit')`),
    check(
      "payment_webhook_events_status_check",
      sql`${table.processingStatus} in ('received', 'processed', 'ignored', 'failed')`,
    ),
  ],
);

export const donationSubscriptions = pgTable(
  "donation_subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    provider: varchar("provider", { length: 16 }).notNull(),
    providerSubscriptionId: varchar("provider_subscription_id", { length: 255 }).notNull(),
    planId: varchar("plan_id", { length: 255 }),
    status: varchar("status", { length: 32 }).notNull(),
    latestProviderEventId: varchar("latest_provider_event_id", { length: 255 }).notNull(),
    latestProviderEventAt: timestamp("latest_provider_event_at", { withTimezone: true }),
    providerCreatedAt: timestamp("provider_created_at", { withTimezone: true }),
    providerUpdatedAt: timestamp("provider_updated_at", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    lastPaymentFailedAt: timestamp("last_payment_failed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("donation_subscriptions_provider_subscription_uidx").on(table.provider, table.providerSubscriptionId),
    index("donation_subscriptions_status_idx").on(table.provider, table.status),
    check("donation_subscriptions_provider_check", sql`${table.provider} in ('paypal', 'xendit')`),
    check(
      "donation_subscriptions_status_check",
      sql`${table.status} in ('unknown', 'approval_pending', 'approved', 'active', 'suspended', 'cancelled', 'expired')`,
    ),
  ],
);

export const donationPayments = pgTable(
  "donation_payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    provider: varchar("provider", { length: 16 }).notNull(),
    latestProviderEventId: varchar("latest_provider_event_id", { length: 255 }).notNull(),
    providerTransactionId: varchar("provider_transaction_id", { length: 255 }).notNull(),
    providerOrderId: varchar("provider_order_id", { length: 255 }),
    providerSubscriptionId: varchar("provider_subscription_id", { length: 255 }),
    providerCustomerId: varchar("provider_customer_id", { length: 255 }),
    paymentType: varchar("payment_type", { length: 16 }).notNull(),
    amountMinor: bigint("amount_minor", { mode: "number" }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    status: varchar("status", { length: 24 }).notNull(),
    donorEmail: varchar("donor_email", { length: 320 }),
    tierId: varchar("tier_id", { length: 80 }),
    tierName: varchar("tier_name", { length: 160 }),
    providerCreatedAt: timestamp("provider_created_at", { withTimezone: true }),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    providerReferences: jsonb("provider_references").$type<Record<string, string>>().default({}).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("donation_payments_provider_transaction_uidx").on(table.provider, table.providerTransactionId),
    index("donation_payments_subscription_idx").on(table.provider, table.providerSubscriptionId),
    index("donation_payments_paid_at_idx").on(table.paidAt),
    check("donation_payments_provider_check", sql`${table.provider} in ('paypal', 'xendit')`),
    check("donation_payments_type_check", sql`${table.paymentType} in ('one_time', 'monthly', 'annual')`),
    check("donation_payments_currency_check", sql`${table.currency} in ('USD', 'PHP')`),
    check(
      "donation_payments_status_check",
      sql`${table.status} in ('pending', 'completed', 'failed', 'refunded', 'reversed', 'canceled')`,
    ),
    check("donation_payments_amount_check", sql`${table.amountMinor} > 0`),
  ],
);
