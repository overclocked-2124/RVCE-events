import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-[var(--bg-cobalt)] min-h-[160px] flex items-center justify-center gap-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/** Default size avatar with a profile image. */
export const WithImage: Story = {
  args: {
    size: "default",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces"
        alt="Ananya Sharma"
      />
      <AvatarFallback>AS</AvatarFallback>
    </Avatar>
  ),
};

/** Fallback initials when no image is provided. */
export const FallbackInitials: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback className="bg-[var(--surface-dark)] text-[var(--text-blush)] font-semibold text-[0.65rem]">
          AS
        </AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback className="bg-[var(--surface-dark)] text-[var(--text-blush)] font-semibold text-xs">
          RK
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback className="bg-[var(--surface-dark)] text-[var(--text-blush)] font-semibold text-sm">
          PD
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

/** All three sizes side by side. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Avatar key={size} size={size} className="border border-[var(--border-blush)]">
          <AvatarImage
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces"
            alt={`Size ${size}`}
          />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** Avatar with a status badge overlay. */
export const WithBadge: Story = {
  render: () => (
    <Avatar size="lg" className="border border-[var(--border-blush)]">
      <AvatarImage
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces"
        alt="User with badge"
      />
      <AvatarFallback>AS</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
};

/** Grouped avatars with an overflow count. */
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {["AS", "RK", "PD"].map((initials) => (
        <Avatar key={initials} size="default">
          <AvatarFallback className="bg-[var(--surface-dark)] text-[var(--text-blush)] font-semibold text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>
        <span className="text-xs text-[var(--text-blush-muted)]">+5</span>
      </AvatarGroupCount>
    </AvatarGroup>
  ),
};
