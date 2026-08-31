import type { Meta, StoryObj } from "@storybook/react";
import { EventCard, EventCardSkeleton } from "./event-card";

const meta = {
  title: "Events/EventCard",
  component: EventCard,
  tags: ["autodocs"],
  argTypes: {
    category: {
      control: "select",
      options: ["Technical", "Cultural", "Sports", "Hackathon", "Workshop"],
    },
    status: {
      control: "select",
      options: ["available", "fast-filling", "sold-out"],
    },
    onAction: {
      action: "action clicked",
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[560px] items-center justify-center bg-[var(--bg-cobalt)] p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FreeEvent: Story = {
  args: {
    title: "AI/ML Hackathon 2026",
    club: "Coding Club RVCE",
    date: "24 Aug 2026",
    time: "9:00 AM",
    venue: "Main Auditorium",
    category: "Hackathon",
    points: 20,
    price: "Free",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Students collaborating on laptops during a hackathon",
  },
};

export const PaidEvent: Story = {
  args: {
    title: "Web Development Bootcamp",
    club: "Coding Club RVCE",
    date: "28 Aug 2026",
    time: "2:00 PM",
    venue: "Seminar Hall 2",
    category: "Workshop",
    points: 10,
    price: "₹150",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Developer working on a laptop during a web development workshop",
  },
};

export const FastFilling: Story = {
  args: {
    title: "RVCE Football League Trials",
    club: "Sports Committee",
    date: "30 Aug 2026",
    time: "6:00 PM",
    venue: "College Ground",
    category: "Sports",
    points: 5,
    price: "Free",
    status: "fast-filling",
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Football players competing on a field",
  },
};

export const SoldOut: Story = {
  args: {
    title: "Cultural Fest Finale",
    club: "Cultural Committee",
    date: "2 Sep 2026",
    time: "6:00 PM",
    venue: "Open Air Theatre",
    category: "Cultural",
    points: 5,
    price: "Free",
    status: "sold-out",
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Crowd watching a live cultural music performance",
  },
};

export const Loading: Story = {
  args: {
    title: "Loading event",
    club: "Loading organiser",
    date: "Loading date",
    time: "Loading time",
    venue: "Loading venue",
    category: "Technical",
    points: 0,
    price: "Free",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
  render: () => <EventCardSkeleton />,
};