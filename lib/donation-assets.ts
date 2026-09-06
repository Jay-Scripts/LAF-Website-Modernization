import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

const donationAssetDirectory = join(process.cwd(), "public", "images", "donate");

export function getDonationAsset(filename: string) {
  return existsSync(join(donationAssetDirectory, filename)) ? `/images/donate/${filename}` : null;
}
