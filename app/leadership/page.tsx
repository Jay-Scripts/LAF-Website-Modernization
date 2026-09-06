import type { Metadata } from "next";
import LeadershipPageContent from "./_components/LeadershipPageContent";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Little Ark Foundation leadership.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  return <LeadershipPageContent />;
}
