import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileBadge } from "./user-profile-badge";

const meta: Meta<typeof UserProfileBadge> = {
  title: "Auth/UserProfileBadge",
  component: UserProfileBadge,
  tags: ["autodocs"],
  argTypes: {
    user: {
      control: "object",
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

type Story = StoryObj<typeof UserProfileBadge>;

const student = {
  name: "Ananya Sharma",
  email: "ananya.cs23@rvce.edu.in",
  
};

const studentWithAvatar = {
  name: "Ananya Sharma",
  email: "ananya.cs23@rvce.edu.in",
 picture: "https://lh3.googleusercontent.com/a/example",};

export const Default: Story = {
  args: {
    user: student,
  },
};

export const WithAvatar: Story = {
  args: {
    user: studentWithAvatar,
  },
};