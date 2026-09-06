CREATE TABLE "donation_payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" varchar(16) NOT NULL,
	"latest_provider_event_id" varchar(255) NOT NULL,
	"provider_transaction_id" varchar(255) NOT NULL,
	"provider_order_id" varchar(255),
	"provider_subscription_id" varchar(255),
	"provider_customer_id" varchar(255),
	"payment_type" varchar(16) NOT NULL,
	"amount_minor" bigint NOT NULL,
	"currency" varchar(3) NOT NULL,
	"status" varchar(24) NOT NULL,
	"donor_email" varchar(320),
	"tier_id" varchar(80),
	"tier_name" varchar(160),
	"provider_created_at" timestamp with time zone,
	"paid_at" timestamp with time zone,
	"provider_references" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "donation_payments_provider_check" CHECK ("donation_payments"."provider" in ('paypal', 'xendit')),
	CONSTRAINT "donation_payments_type_check" CHECK ("donation_payments"."payment_type" in ('one_time', 'monthly', 'annual')),
	CONSTRAINT "donation_payments_currency_check" CHECK ("donation_payments"."currency" in ('USD', 'PHP')),
	CONSTRAINT "donation_payments_status_check" CHECK ("donation_payments"."status" in ('pending', 'completed', 'failed', 'refunded', 'reversed', 'canceled')),
	CONSTRAINT "donation_payments_amount_check" CHECK ("donation_payments"."amount_minor" > 0)
);
--> statement-breakpoint
CREATE TABLE "payment_webhook_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" varchar(16) NOT NULL,
	"provider_event_id" varchar(255) NOT NULL,
	"event_type" varchar(160) NOT NULL,
	"provider_transaction_id" varchar(255),
	"provider_order_id" varchar(255),
	"provider_subscription_id" varchar(255),
	"processing_status" varchar(24) DEFAULT 'received' NOT NULL,
	"payload_hash" varchar(64) NOT NULL,
	"provider_created_at" timestamp with time zone,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL,
	"processed_at" timestamp with time zone,
	"failure_category" varchar(120),
	CONSTRAINT "payment_webhook_events_provider_check" CHECK ("payment_webhook_events"."provider" in ('paypal', 'xendit')),
	CONSTRAINT "payment_webhook_events_status_check" CHECK ("payment_webhook_events"."processing_status" in ('received', 'processed', 'ignored', 'failed'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX "donation_payments_provider_transaction_uidx" ON "donation_payments" USING btree ("provider","provider_transaction_id");--> statement-breakpoint
CREATE INDEX "donation_payments_subscription_idx" ON "donation_payments" USING btree ("provider","provider_subscription_id");--> statement-breakpoint
CREATE INDEX "donation_payments_paid_at_idx" ON "donation_payments" USING btree ("paid_at");--> statement-breakpoint
CREATE UNIQUE INDEX "payment_webhook_events_provider_event_uidx" ON "payment_webhook_events" USING btree ("provider","provider_event_id");--> statement-breakpoint
CREATE INDEX "payment_webhook_events_transaction_idx" ON "payment_webhook_events" USING btree ("provider","provider_transaction_id");