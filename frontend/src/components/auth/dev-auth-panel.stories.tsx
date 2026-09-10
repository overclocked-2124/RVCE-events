import type { Meta, StoryObj } from "@storybook/react";
import { DevAuthPanel } from "./dev-auth-panel";

const meta: Meta<typeof DevAuthPanel> = {
  title: "Auth/DevAuthPanel",
  component: DevAuthPanel,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative min-h-[300px] bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DevAuthPanel>;

export const Default: Story = {};

export const Expanded: Story = {
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector(
      'button[aria-controls="dev-auth-panel-content"]'
    );

    if (button instanceof HTMLElement) {
      button.click();
    }
  },
};