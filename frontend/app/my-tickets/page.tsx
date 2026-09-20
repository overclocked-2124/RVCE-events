import type { Metadata } from "next";
import { MyTicketsView } from "@/src/components/tickets/my-tickets-view";

export const metadata: Metadata = {
  title: "My Tickets — RVCE Events",
  description:
    "View your RVCE event registrations, digital passes and attendance history.",
};

/**
 * Student registrations dashboard (PRD Epic 5: REG-04).
 *
 * A Server Component that only supplies data; the client view owns the
 * interaction. The registration service does not exist yet, so no tickets are
 * passed and the route renders its empty state — deliberately, rather than
 * shipping placeholder data.
 *
 * When the BFF lands, this should be the only file that changes: fetch the
 * student's registrations in `src/bff/` and hand them to `tickets`.
 */
export default function MyTicketsPage() {
  return <MyTicketsView tickets={[]} />;
}
