import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ScanResultOverlay } from "./scan-result-overlay";

const meta: Meta<typeof ScanResultOverlay> = {
  title: "Scanner/ScanResultOverlay",
  component: ScanResultOverlay,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "cobalt" },
  },
  args: {
    onDismiss: fn(),
    autoDismiss: false,
  },
};

export default meta;
type Story = StoryObj<typeof ScanResultOverlay>;

export const Success: Story = {
  args: {
    result: "success",
    attendee: {
      name: "Ananya",
      usn: "1RV22CS045",
    },
  },
};

export const Duplicate: Story = {
  args: {
    result: "duplicate",
  },
};

export const Invalid: Story = {
  args: {
    result: "invalid",
  },
};

export const Mobile: Story = {
  args: {
    result: "success",
    attendee: {
      name: "Ananya",
      usn: "1RV22CS045",
    },
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};
