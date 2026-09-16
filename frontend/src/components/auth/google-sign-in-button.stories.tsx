import type { Meta, StoryObj } from "@storybook/react";
import { GoogleSignInButton } from "./google-sign-in-button";

const meta: Meta<typeof GoogleSignInButton> = {
  title: "Auth/GoogleSignInButton",
  component: GoogleSignInButton,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[160px] bg-background p-8 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GoogleSignInButton>;

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Loading: Story = {
  args: {
    size: "md",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    size: "md",
    disabled: true,
  },
};