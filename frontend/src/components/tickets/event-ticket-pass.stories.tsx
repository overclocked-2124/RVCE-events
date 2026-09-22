import type { Meta, StoryObj } from "@storybook/react";
import { EventTicketPass } from "./event-ticket-pass";

const meta: Meta<typeof EventTicketPass> = {
  title: "Tickets/EventTicketPass",
  component: EventTicketPass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EventTicketPass>;

const defaultSampleProps = {
  ticketCode: "RVCE-EVT-98213",
  eventTitle: "8th Mile Hackathon 2026",
  clubName: "Coding Club RVCE",
  date: "Sat, Oct 24, 2026",
  time: "09:00 AM - 05:00 PM",
  venue: "IEM Auditorium, Mechanical Block",
  attendeeName: "Chethana Sridhar",
  usn: "1RV22CS045",
  department: "CSE",
  qrPayload: "https://events.rvce.edu.in/verify/RVCE-EVT-98213",
  status: "CONFIRMED" as const,
  admissionNotes:
    "Present this QR code at the registration desk for verification. Non-transferable. RVCE Student ID card required.",
};

export const PopulatedConfirmed: Story = {
  args: {
    ...defaultSampleProps,
  },
};

export const CheckedInPass: Story = {
  args: {
    ...defaultSampleProps,
    status: "CHECKED_IN",
  },
};

export const VipAdmission: Story = {
  args: {
    ...defaultSampleProps,
    status: "VIP",
    ticketCode: "RVCE-VIP-00012",
    attendeeName: "Guest Delegate",
    department: "Special Guest",
  },
};

export const MobileViewport: Story = {
  args: {
    ...defaultSampleProps,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const LoadingSkeleton: Story = {
  args: {
    ...defaultSampleProps,
    isLoading: true,
  },
};