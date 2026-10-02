import type { Meta, StoryObj } from "@storybook/react";
import { ScannerPage } from "./scanner-page";

const meta: Meta<typeof ScannerPage> = {
  title: "Scanner/ScannerPage",
  component: ScannerPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "cobalt" },
  },
};

export default meta;
type Story = StoryObj<typeof ScannerPage>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};
