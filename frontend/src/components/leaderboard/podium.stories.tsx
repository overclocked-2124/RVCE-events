import type { Meta, StoryObj } from "@storybook/react";

import { leaderboardStudents } from "./mock-data";
import { Podium } from "./podium";

const meta: Meta<typeof Podium> = {
  title: "Leaderboard/Podium",
  component: Podium,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-h-[520px] bg-[var(--bg-cobalt)] p-6 text-[var(--text-blush)]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Podium>;

export const TopThree: Story = {
  args: {
    students: leaderboardStudents.slice(0, 3),
  },
};

export const DenseCanvas: Story = {
  args: {
    students: leaderboardStudents.slice(0, 3),
    className: "max-w-6xl",
  },
};

