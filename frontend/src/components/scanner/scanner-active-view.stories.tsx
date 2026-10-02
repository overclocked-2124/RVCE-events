import type { Meta, StoryObj } from "@storybook/react";
import { ScannerActiveView } from "./scanner-active-view";

const meta: Meta<typeof ScannerActiveView> = {
  title: "Scanner/ScannerActiveView",
  component: ScannerActiveView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "cobalt" },
  },
  args: {
    initialCheckedIn: 142,
    capacity: 200,
  },
};

export default meta;
type Story = StoryObj<typeof ScannerActiveView>;

export const Default: Story = {};

export const LowAttendance: Story = {
  args: {
    initialCheckedIn: 12,
    capacity: 200,
  },
};

export const NearCapacity: Story = {
  args: {
    initialCheckedIn: 195,
    capacity: 200,
  },
};

export const FullCapacity: Story = {
  args: {
    initialCheckedIn: 200,
    capacity: 200,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};
