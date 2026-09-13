import type { Meta, StoryObj } from "@storybook/react";
import { EventDetailsView } from "./event-details-view";
import {
  aimlHackathon,
  webDevBootcamp,
  footballLeagueTrials,
  culturalFestFinale,
  photographyContest,
  upcomingOpenEvent,
  paidHackathon,
  soldOutWorkshop,
  pastConference,
} from "./mock-events";

const sampleRelatedEvents = [
  webDevBootcamp,
  footballLeagueTrials,
  culturalFestFinale,
  photographyContest,
];

const meta: Meta<typeof EventDetailsView> = {
  title: "Events/EventDetailsView",
  component: EventDetailsView,
  tags: ["autodocs"],
  args: {
    relatedEvents: sampleRelatedEvents,
  },
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "cobalt" },
    docs: {
      description: {
        component: `
The **EventDetailsView** is the main event details page component for the RVCE Events platform.
It reflects the event cards from PR #22 and demonstrates all core event lifecycle states:
- **Upcoming / Open**: Active registration, live countdown timer, seats available. (AI/ML Hackathon 2026)
- **Paid Event**: Fee badge displayed, payment notice banner, fee included in CTA. (Web Development Bootcamp ₹150)
- **Fast-filling Sports Event**: Capacity indicator near threshold. (RVCE Football League Trials)
- **Sold Out / Closed**: Registration disabled, "Sold Out" badge, disabled CTA. (Cultural Fest Finale)
- **Past Event**: Event concluded state, registration unavailable, greyed treatment. (Photography Contest)

Also showcases the reusable **EventCard** component in the "More Events" catalogue section at the bottom.

All data is mocked using client-side TypeScript fixtures. Zero backend code involved.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EventDetailsView>;

/**
 * 1. AI/ML Hackathon 2026 — Card 1 in screenshots.
 * Flagship free event with open registration, 20 AICTE points, and live countdown timer.
 */
export const UpcomingOpen: Story = {
  name: "1 — AI/ML Hackathon 2026 (Open, Free, 20 AICTE Pts)",
  args: {
    event: upcomingOpenEvent,
    relatedEvents: [webDevBootcamp, footballLeagueTrials, culturalFestFinale],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Free, upcoming flagship AI/ML hackathon with open registration. Shows a live countdown badge, available seats, 20 AICTE points, and an active Register CTA.",
      },
    },
  },
};

/**
 * 2. Web Development Bootcamp — Card 2 in screenshots.
 * Paid workshop (₹150 fee). Shows fee badge, payment notice alert, and register CTA with price.
 */
export const PaidEvent: Story = {
  name: "2 — Web Dev Bootcamp (Paid, ₹150, 10 AICTE Pts)",
  args: {
    event: paidHackathon,
    relatedEvents: [aimlHackathon, footballLeagueTrials, culturalFestFinale],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Paid event (₹150 fee). Shows the fee badge in amber, a payment notice alert, and the Register CTA includes the price.",
      },
    },
  },
};

/**
 * 3. RVCE Football League Trials — Card 3 in screenshots.
 * Sports event, fast-filling capacity status (>85%), 5 AICTE points.
 */
export const SportsTrials: Story = {
  name: "3 — RVCE Football League Trials (Sports, Fast-filling)",
  args: {
    event: footballLeagueTrials,
    relatedEvents: [aimlHackathon, webDevBootcamp, culturalFestFinale],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Athletic trials event with fast-filling registration status (54/60 seats registered).",
      },
    },
  },
};

/**
 * 4. Cultural Fest Finale — Card 4 in screenshots.
 * Sold-out festival night — registration is disabled. Shows 'Sold Out' badge, full capacity bar.
 */
export const SoldOut: Story = {
  name: "4 — Cultural Fest Finale (Sold Out / Closed)",
  args: {
    event: soldOutWorkshop,
    relatedEvents: [aimlHackathon, webDevBootcamp, footballLeagueTrials],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Sold-out event. Registration is disabled, the CTA shows 'Sold Out', and the capacity progress bar is full (red).",
      },
    },
  },
};

/**
 * 5. Photography Contest — Card 6 in screenshots.
 * Past event — event has concluded. Shows greyed banner, 'Event Concluded' state, disabled CTA.
 */
export const PastEvent: Story = {
  name: "5 — Photography Contest (Past / Concluded)",
  args: {
    event: pastConference,
    relatedEvents: [aimlHackathon, webDevBootcamp, culturalFestFinale],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Past event. Banner is greyed out/muted, CTA reads 'Event Concluded' and is disabled, 'Add to Calendar' is hidden.",
      },
    },
  },
};

/**
 * Mobile viewport for the flagship upcoming event state.
 * Verifies single-column layout, sticky action bar, and touch-friendly sizing.
 */
export const MobileUpcoming: Story = {
  name: "Mobile — AI/ML Hackathon (390×844)",
  args: {
    event: upcomingOpenEvent,
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
    docs: {
      description: {
        story:
          "Mobile viewport (390×844). Verifies single-column layout, sticky bottom action bar, and touch target sizes.",
      },
    },
  },
};

/**
 * Mobile viewport for the sold-out state.
 */
export const MobileSoldOut: Story = {
  name: "Mobile — Cultural Fest (Sold Out)",
  args: {
    event: soldOutWorkshop,
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
    docs: {
      description: {
        story: "Mobile viewport for the sold-out event state.",
      },
    },
  },
};
