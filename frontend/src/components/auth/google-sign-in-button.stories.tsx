import type { Meta, StoryObj } from "@storybook/react";
import { GoogleSignInButton } from "./google-sign-in-button";

const meta: Meta<typeof GoogleSignInButton> = {
  title: "Auth/GoogleSignInButton",
  component: GoogleSignInButton,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof GoogleSignInButton>;

export const Default: Story = {
  args: {
    size: "md",
    isLoading: false,
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
