CREATE TABLE "donation_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" varchar(16) NOT NULL,
	"provider_subscription_id" varchar(255) NOT NULL,
	"plan_id" varchar(255),
	"status" varchar(32) NOT NULL,
	"latest_provider_event_id" varchar(255) NOT NULL,
	"latest_provider_event_at" timestamp with time zone,
	"provider_created_at" timestamp with time zone,
	"provider_updated_at" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"last_payment_failed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "donation_subscriptions_provider_check" CHECK ("donation_subscriptions"."provider" in ('paypal', 'xendit')),
	CONSTRAINT "donation_subscriptions_status_check" CHECK ("donation_subscriptions"."status" in ('unknown', 'approval_pending', 'approved', 'active', 'suspended', 'cancelled', 'expired'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX "donation_subscriptions_provider_subscription_uidx" ON "donation_subscriptions" USING btree ("provider","provider_subscription_id");--> statement-breakpoint
CREATE INDEX "donation_subscriptions_status_idx" ON "donation_subscriptions" USING btree ("provider","status");