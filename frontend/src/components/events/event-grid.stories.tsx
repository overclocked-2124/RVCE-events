import type { Meta, StoryObj } from "@storybook/react";
import { EventGrid } from "./event-grid";

const meta = {
  title: "Events/EventGrid",
  component: EventGrid,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--bg-cobalt)] p-6 sm:p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EventGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiCardGrid: Story = {
  args: {
    events: [
      {
        title: "AI/ML Hackathon 2026",
        club: "Coding Club RVCE",
        date: "24 Aug 2026",
        time: "9:00 AM",
        venue: "Main Auditorium",
        category: "Hackathon",
        points: 20,
        price: "Free",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Hackathon event",
      },
      {
        title: "Web Development Bootcamp",
        club: "Coding Club RVCE",
        date: "28 Aug 2026",
        time: "2:00 PM",
        venue: "Seminar Hall 2",
        category: "Workshop",
        points: 10,
        price: "₹150",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Workshop event",
      },
      {
        title: "RVCE Football League Trials",
        club: "Sports Committee",
        date: "30 Aug 2026",
        time: "6:00 PM",
        venue: "College Ground",
        category: "Sports",
        points: 5,
        price: "Free",
        status: "fast-filling",
        imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Sports event",
      },
      {
        title: "Cultural Fest Finale",
        club: "Cultural Committee",
        date: "2 Sep 2026",
        time: "6:00 PM",
        venue: "Open Air Theatre",
        category: "Cultural",
        points: 5,
        price: "Free",
        status: "sold-out",
        imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Cultural event",
      },
      {
        title: "Cybersecurity Masterclass",
        club: "Coding Club RVCE",
        date: "3 Sep 2026",
        time: "3:00 PM",
        venue: "Lab 5",
        category: "Technical",
        points: 15,
        price: "₹100",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Cybersecurity workshop",
      },
      {
        title: "Photography Contest",
        club: "Media Club RVCE",
        date: "5 Sep 2026",
        time: "10:00 AM",
        venue: "Campus Grounds",
        category: "Cultural",
        points: 8,
        price: "Free",
        imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Photography contest",
      },
    ],
  },
};

export const LoadingState: Story = {
  args: {
    isLoading: true,
  },
};

export const EmptyState: Story = {
  args: {
    events: [],
    emptyStateTitle: "No events match your filters",
    emptyStateDescription: "Try adjusting your search criteria or check back later.",
  },
};