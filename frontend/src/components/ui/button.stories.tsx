import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
        "pill",
      ],
    },

    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "hero",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
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
      <div className="flex min-h-[160px] items-center justify-center bg-[var(--bg-cobalt)] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Sign in with RVCE Mail",
    variant: "default",
    size: "default",
  },
};

export const Outline: Story = {
  args: {
    children: "View Events Catalog",
    variant: "outline",
    size: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Browse Archive",
    variant: "secondary",
    size: "default",
  },
};

export const Ghost: Story = {
  args: {
    children: "Explore Guidelines",
    variant: "ghost",
    size: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "Cancel Registration",
    variant: "destructive",
    size: "default",
  },
};

export const Link: Story = {
  args: {
    children: "Read the code of conduct",
    variant: "link",
    size: "default",
  },
};

export const Pill: Story = {
  args: {
    children: "100 AICTE Points",
    variant: "pill",
  },
};

export const Hero: Story = {
  args: {
    children: "Back to Home",
    variant: "default",
    size: "hero",
  },
};

export const Loading: Story = {
  args: {
    children: "Authenticating...",
    variant: "default",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Registration Closed",
    variant: "default",
    disabled: true,
  },
};

export const AsLink: Story = {
  args: {
    children: "Explore Events",
    variant: "outline",
    size: "hero",
    render: <a href="#" />,
  },
};