import type { Meta, StoryObj } from "@storybook/react";
import { MyTicketsView } from "./my-tickets-view";
import {
  cancelledTicket,
  checkedInTicket,
  confirmedTicket,
  waitlistedTicket,
} from "./ticket-pass-card.stories";
import type { Ticket } from "./types";

/**
 * Pinned reference time. Without it the upcoming/past split would drift as the
 * sample dates age, and these stories would eventually show something
 * different from what they document.
 */
const REFERENCE_NOW = new Date("2026-09-14T12:00:00+05:30");

/**
 * Extra registrations needed to fill both tabs. Like the ones re-used from the
 * card stories, these exist only for Storybook — no mock data ships with the
 * application.
 */
const upcomingConfirmedSprint: Ticket = {
  id: "tkt-03",
  ticketCode: "RVCE-EVT-99001",
  eventTitle: "Open Source Sprint",
  eventSlug: "open-source-sprint",
  organizingClub: "Coding Club",
  venue: "CSE Lab 4",
  startsAt: "2026-11-08T10:00:00+05:30",
  endsAt: "2026-11-08T16:00:00+05:30",
  status: "CONFIRMED",
};

const pastCheckedInDesignTalk: Ticket = {
  id: "tkt-06",
  ticketCode: "RVCE-EVT-86044",
  eventTitle: "Design Systems 101",
  eventSlug: "design-systems-101",
  organizingClub: "Design Club",
  venue: "Architecture Studio",
  startsAt: "2026-07-12T11:00:00+05:30",
  endsAt: "2026-07-12T13:00:00+05:30",
  status: "CHECKED_IN",
};

/** Registered but never scanned in — a past event the student did not attend. */
const pastNoShowTicket: Ticket = {
  id: "tkt-07",
  ticketCode: "RVCE-EVT-85319",
  eventTitle: "Cybersecurity Capture The Flag",
  eventSlug: "cybersecurity-capture-the-flag",
  organizingClub: "CyberSec Club",
  venue: "CSE Lab 1",
  startsAt: "2026-06-14T09:00:00+05:30",
  endsAt: "2026-06-14T20:00:00+05:30",
  status: "CONFIRMED",
};

/** Full sample set covering every status across both tabs. */
const sampleTickets: Ticket[] = [
  confirmedTicket,
  waitlistedTicket,
  upcomingConfirmedSprint,
  cancelledTicket,
  checkedInTicket,
  pastCheckedInDesignTalk,
  pastNoShowTicket,
];

const meta: Meta<typeof MyTicketsView> = {
  title: "Tickets/MyTicketsView",
  component: MyTicketsView,
  tags: ["autodocs"],
  args: {
    now: REFERENCE_NOW,
  },
  argTypes: {
    browseHref: { control: "text" },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--bg-cobalt)]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MyTicketsView>;

/**
 * Populated dashboard: four upcoming registrations across confirmed,
 * waitlisted and cancelled states. Switch to Past Registrations for the three
 * historic tickets, and use Cancel Registration to open the confirmation.
 */
export const Populated: Story = {
  args: { tickets: sampleTickets },
};

/**
 * No registrations — both tabs fall back to the empty state. This is also what
 * the live route renders until the BFF supplies real data.
 */
export const Empty: Story = {
  args: { tickets: [] },
};

/** Mobile — cards stack, the QR pass centres and the tab row stays on one line. */
export const Mobile: Story = {
  args: { tickets: sampleTickets },
  parameters: { viewport: { defaultViewport: "mobile2" } },
};

/** Tablet — the card's two-column split engages. */
export const Tablet: Story = {
  args: { tickets: sampleTickets },
  parameters: { viewport: { defaultViewport: "tablet" } },
};

/** Empty state on mobile, where the dashed panel and CTA must still breathe. */
export const EmptyMobile: Story = {
  args: { tickets: [] },
  parameters: { viewport: { defaultViewport: "mobile2" } },
};
