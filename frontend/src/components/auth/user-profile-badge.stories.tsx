import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileBadge } from "./user-profile-badge";

const meta: Meta<typeof UserProfileBadge> = {
  title: "Auth/UserProfileBadge",
  component: UserProfileBadge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserProfileBadge>;

export const Default: Story = {
  args: {
    user: {
      id: "google-sub-1",
      name: "Ananya Sharma",
      email: "ananya.cs23@rvce.edu.in",
      hd: "rvce.edu.in",
      role: "student",
    },
  },
};

export const WithAvatar: Story = {
  args: {
    user: {
      id: "google-sub-2",
      name: "Sumukha Upadhyaya",
      email: "sumukha.is22@rvce.edu.in",
      picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      hd: "rvce.edu.in",
      role: "student",
    },
  },
};
