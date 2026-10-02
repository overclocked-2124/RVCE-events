import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TicketPassCard } from "./ticket-pass-card";
import type { Ticket } from "./types";

/**
 * Sample registrations for Storybook only.
 *
 * These live in the story file rather than a module under `src/` so no mock
 * data ships with the application — Storybook files are not part of the
 * Next.js bundle. Real data will arrive from the BFF once the registration
 * service exists.
 *
 * Timestamps carry an explicit `+05:30` offset so stories render identically
 * regardless of the machine's timezone.
 */
export const confirmedTicket: Ticket = {
  id: "tkt-01",
  ticketCode: "RVCE-EVT-98213",
  eventTitle: "HackRVCE 2026",
  eventSlug: "hackrvce-2026",
  organizingClub: "Coding Club",
  venue: "Main Auditorium",
  startsAt: "2026-10-17T09:00:00+05:30",
  endsAt: "2026-10-18T18:00:00+05:30",
  status: "CONFIRMED",
};

export const waitlistedTicket: Ticket = {
  id: "tkt-02",
  ticketCode: "RVCE-EVT-98274",
  eventTitle: "Intro to Kubernetes Workshop",
  eventSlug: "intro-to-kubernetes-workshop",
  organizingClub: "IEEE RVCE",
  venue: "Seminar Hall, CSE Block",
  startsAt: "2026-10-03T14:00:00+05:30",
  endsAt: "2026-10-03T17:30:00+05:30",
  status: "WAITLISTED",
};

export const cancelledTicket: Ticket = {
  id: "tkt-04",
  ticketCode: "RVCE-EVT-98450",
  eventTitle: "Competitive Programming Bootcamp",
  eventSlug: "competitive-programming-bootcamp",
  organizingClub: "Coding Club",
  venue: "CSE Lab 2",
  startsAt: "2026-10-25T09:30:00+05:30",
  endsAt: "2026-10-25T13:00:00+05:30",
  status: "CANCELLED",
};

export const checkedInTicket: Ticket = {
  id: "tkt-05",
  ticketCode: "RVCE-EVT-87120",
  eventTitle: "Flutter Forward Meetup",
  eventSlug: "flutter-forward-meetup",
  organizingClub: "GDG RVCE",
  venue: "Seminar Hall, ISE Block",
  startsAt: "2026-08-21T15:00:00+05:30",
  endsAt: "2026-08-21T18:00:00+05:30",
  status: "CHECKED_IN",
};

const meta: Meta<typeof TicketPassCard> = {
  title: "Tickets/TicketPassCard",
  component: TicketPassCard,
  tags: ["autodocs"],
  args: {
    onCancelRequest: fn(),
  },
  argTypes: {
    eventHref: { control: "text" },
    showCancelAction: { control: "boolean" },
  },
  // The card lives on the cobalt dashboard, constrained to the column width it
  // occupies in the real list.
  decorators: [
    (Story) => (
      <div className="flex min-h-[320px] justify-center bg-[var(--bg-cobalt)] p-6">
        <div className="w-full max-w-3xl">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TicketPassCard>;

/** Active registration for a future event — the common case. */
export const Confirmed: Story = {
  args: { ticket: confirmedTicket },
};

/** Seat not yet secured; the student is in the queue. */
export const Waitlisted: Story = {
  args: { ticket: waitlistedTicket },
};

/**
 * Past registration that was scanned at the door. Past tickets cannot be
 * given up, so the dashboard passes `showCancelAction={false}`.
 */
export const PastCheckedIn: Story = {
  args: { ticket: checkedInTicket, showCancelAction: false },
};

/** Released seat: the pass is dimmed to read as void, and cancelling is gone. */
export const Cancelled: Story = {
  args: { ticket: cancelledTicket },
};

/** Mobile — the QR pass stacks under the details and actions wrap. */
export const Mobile: Story = {
  args: { ticket: confirmedTicket },
  parameters: { viewport: { defaultViewport: "mobile2" } },
};

/** Tablet — the two-column split has just engaged. */
export const Tablet: Story = {
  args: { ticket: confirmedTicket },
  parameters: { viewport: { defaultViewport: "tablet" } },
};
