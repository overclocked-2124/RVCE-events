import type { Meta, StoryObj } from "@storybook/react";
import { TicketStatusBadge } from "./ticket-status-badge";

const meta: Meta<typeof TicketStatusBadge> = {
  title: "Tickets/TicketStatusBadge",
  component: TicketStatusBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["CONFIRMED", "WAITLISTED", "CHECKED_IN", "CANCELLED"],
    },
  },
  // Matches the framing used by UI/Button: a padded cobalt stage that centres
  // the component, so every story is judged against the real brand canvas.
  decorators: [
    (Story) => (
      <div className="flex min-h-[160px] items-center justify-center bg-[var(--bg-cobalt)] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TicketStatusBadge>;

export const Confirmed: Story = {
  args: { status: "CONFIRMED" },
};

export const Waitlisted: Story = {
  args: { status: "WAITLISTED" },
};

export const CheckedIn: Story = {
  args: { status: "CHECKED_IN" },
};

export const Cancelled: Story = {
  args: { status: "CANCELLED" },
};

/** All four states together — used to check contrast and weight on the cobalt canvas. */
export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <TicketStatusBadge status="CONFIRMED" />
      <TicketStatusBadge status="WAITLISTED" />
      <TicketStatusBadge status="CHECKED_IN" />
      <TicketStatusBadge status="CANCELLED" />
    </div>
  ),
};

/** The same four states against the elevated dark surface the ticket cards sit on. */
export const OnDarkSurface: Story = {
  decorators: [
    (Story) => (
      <div className="flex min-h-[160px] items-center justify-center bg-[var(--surface-dark)] p-8">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <TicketStatusBadge status="CONFIRMED" />
      <TicketStatusBadge status="WAITLISTED" />
      <TicketStatusBadge status="CHECKED_IN" />
      <TicketStatusBadge status="CANCELLED" />
    </div>
  ),
};
