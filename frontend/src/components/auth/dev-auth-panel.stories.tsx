import type { Meta, StoryObj } from "@storybook/react";
import { DevAuthPanel } from "./dev-auth-panel";

const meta: Meta<typeof DevAuthPanel> = {
  title: "Auth/DevAuthPanel",
  component: DevAuthPanel,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DevAuthPanel>;

export const Default: Story = {};
