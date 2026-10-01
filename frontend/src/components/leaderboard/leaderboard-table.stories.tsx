import type { Meta, StoryObj } from "@storybook/react";

import { LeaderboardTable } from "./leaderboard-table";
import { leaderboardStudents } from "./mock-data";

const meta: Meta<typeof LeaderboardTable> = {
  title: "Leaderboard/Leaderboard Table",
  component: LeaderboardTable,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--bg-cobalt)] p-6 text-[var(--text-blush)]">
        <div className="mx-auto max-w-7xl">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LeaderboardTable>;

export const SearchAndDepartmentFilters: Story = {
  args: {
    students: leaderboardStudents,
  },
};

export const CseSubset: Story = {
  args: {
    students: leaderboardStudents.filter((student) => student.department === "CSE"),
  },
};

