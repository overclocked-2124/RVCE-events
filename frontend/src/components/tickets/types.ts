/**
 * Domain model for a student's event registration ("ticket").
 *
 * This mirrors the shape the registration service is expected to return once
 * the backend lands (PRD Epic 5: REG-04). No sample data is shipped with the
 * application — the route renders its empty state until the BFF supplies real
 * registrations, and Storybook supplies its own sample tickets.
 */

/** Lifecycle state of a single registration. */
export type TicketStatus =
  | "CONFIRMED"
  | "WAITLISTED"
  | "CHECKED_IN"
  | "CANCELLED";

export interface Ticket {
  /** Stable identifier for React keys and cancel actions. */
  id: string;
  /** Human-readable pass code printed on the QR pass, e.g. `RVCE-EVT-98213`. */
  ticketCode: string;
  eventTitle: string;
  /** URL segment for the event details route, e.g. `/events/<eventSlug>`. */
  eventSlug: string;
  /** Club or department running the event, shown as a badge on the card. */
  organizingClub: string;
  venue: string;
  /** ISO 8601 timestamp. Kept as a string so it survives the server → client boundary unchanged. */
  startsAt: string;
  /** ISO 8601 timestamp. */
  endsAt: string;
  status: TicketStatus;
}

/**
 * Splits tickets into the two tabs the dashboard renders.
 *
 * The partition is derived from the event date rather than stored on the
 * ticket, so a registration moves to "Past" on its own once the event is over.
 * `now` is injectable so stories and future tests can pin a reference time
 * instead of depending on the wall clock.
 */
export function partitionTickets(
  tickets: readonly Ticket[],
  now: Date = new Date()
): { upcoming: Ticket[]; past: Ticket[] } {
  const cutoff = now.getTime();
  const upcoming: Ticket[] = [];
  const past: Ticket[] = [];

  for (const ticket of tickets) {
    if (new Date(ticket.endsAt).getTime() >= cutoff) {
      upcoming.push(ticket);
    } else {
      past.push(ticket);
    }
  }

  // Upcoming reads soonest-first; past reads most-recent-first.
  upcoming.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  past.sort((a, b) => b.startsAt.localeCompare(a.startsAt));

  return { upcoming, past };
}
