import type { Meta, StoryObj } from "@storybook/react";
import { AuthErrorCard } from "./auth-error-card";

const meta: Meta<typeof AuthErrorCard> = {
  title: "Auth/AuthErrorCard",
  component: AuthErrorCard,
  tags: ["autodocs"],
  argTypes: {
    reason: {
      control: { type: "select" },
      options: ["unauthorized_domain", "invalid_state", "access_denied", "missing_config", "oauth_failed"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthErrorCard>;

export const UnauthorizedDomain: Story = {
  args: {
    reason: "unauthorized_domain",
  },
};

export const InvalidState: Story = {
  args: {
    reason: "invalid_state",
  },
};

export const AccessDenied: Story = {
  args: {
    reason: "access_denied",
  },
};

export const MissingConfig: Story = {
  args: {
    reason: "missing_config",
  },
};
