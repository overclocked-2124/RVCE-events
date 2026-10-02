import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ScannerGateView } from "./scanner-gate-view";

const meta: Meta<typeof ScannerGateView> = {
  title: "Scanner/ScannerGateView",
  component: ScannerGateView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "cobalt" },
  },
  args: {
    onUnlock: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ScannerGateView>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};
