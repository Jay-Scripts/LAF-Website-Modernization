import "server-only";

import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "@/lib/db/schema";

export function openDatabase() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) throw new Error("Donation database configuration is unavailable.");
  const pool = new Pool({ connectionString });
  return {
    db: drizzle(pool, { schema }),
    close: () => pool.end(),
  };
}
