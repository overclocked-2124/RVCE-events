import type { Metadata } from "next";

import { LeaderboardTable } from "@/src/components/leaderboard/leaderboard-table";
import { leaderboardStudents } from "@/src/components/leaderboard/mock-data";

export const metadata: Metadata = {
  title: "AICTE Points Leaderboard | RVCE Events",
  description: "Look up RVCE student AICTE activity points and campus leaderboard standings.",
};

export default function PointsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-cobalt)] text-[var(--text-blush)]">
      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <LeaderboardTable students={leaderboardStudents} />
      </section>
    </main>
  );
}
