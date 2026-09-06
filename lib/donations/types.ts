export type DonationProvider = "paypal" | "xendit";
export type DonationPaymentType = "one_time" | "monthly" | "annual";
export type DonationPaymentStatus = "pending" | "completed" | "failed" | "refunded" | "reversed" | "canceled";
export type DonationSubscriptionStatus = "unknown" | "approval_pending" | "approved" | "active" | "suspended" | "cancelled" | "expired";

export type NormalizedDonationPayment = {
  providerTransactionId: string;
  providerOrderId: string | null;
  providerSubscriptionId: string | null;
  providerCustomerId: string | null;
  paymentType: DonationPaymentType;
  amountMinor: number;
  currency: "USD" | "PHP";
  status: DonationPaymentStatus;
  donorEmail: string | null;
  tierId: string | null;
  tierName: string | null;
  providerCreatedAt: Date | null;
  paidAt: Date | null;
  providerReferences: Record<string, string>;
};

export type NormalizedDonationSubscription = {
  providerSubscriptionId: string;
  planId: string | null;
  status: DonationSubscriptionStatus | null;
  providerCreatedAt: Date | null;
  providerUpdatedAt: Date | null;
  latestProviderEventAt: Date | null;
  cancelledAt: Date | null;
  lastPaymentFailedAt: Date | null;
};

export type NormalizedDonationWebhook = {
  provider: DonationProvider;
  providerEventId: string;
  eventType: string;
  payloadHash: string;
  providerCreatedAt: Date | null;
  providerTransactionId: string | null;
  providerOrderId: string | null;
  providerSubscriptionId: string | null;
  payment: NormalizedDonationPayment | null;
  subscription: NormalizedDonationSubscription | null;
};

export type DonationPersistenceResult = "processed" | "ignored" | "duplicate_event";
