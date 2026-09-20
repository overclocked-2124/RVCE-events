import type { Meta, StoryObj } from "@storybook/react";
import { QrPass } from "./qr-pass";

/** Sample pass codes for Storybook only — the component takes a plain string. */
const SAMPLE_CODE = "RVCE-EVT-98213";
const OTHER_SAMPLE_CODE = "RVCE-EVT-98274";

const meta: Meta<typeof QrPass> = {
  title: "Tickets/QrPass",
  component: QrPass,
  tags: ["autodocs"],
  argTypes: {
    ticketCode: { control: "text" },
  },
  // The pass normally sits on an elevated card, so the default stage uses the
  // dark surface rather than raw cobalt.
  decorators: [
    (Story) => (
      <div className="flex min-h-[260px] items-center justify-center bg-[var(--surface-dark)] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QrPass>;

export const Default: Story = {
  args: { ticketCode: SAMPLE_CODE },
};

/** On the cobalt canvas, to confirm the blush pass panel holds its contrast. */
export const OnCobalt: Story = {
  args: { ticketCode: OTHER_SAMPLE_CODE },
  decorators: [
    (Story) => (
      <div className="flex min-h-[260px] items-center justify-center bg-[var(--bg-cobalt)] p-8">
        <Story />
      </div>
    ),
  ],
};

/**
 * Different codes produce visibly different symbols, while the same code always
 * produces the same one — the pattern is seeded from the ticket code, never random.
 * The first and third passes share a code and should be pixel-identical.
 */
export const DistinctPerCode: Story = {
  render: () => (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <QrPass ticketCode="RVCE-EVT-98213" />
      <QrPass ticketCode="RVCE-EVT-98274" />
      <QrPass ticketCode="RVCE-EVT-98213" />
    </div>
  ),
};
