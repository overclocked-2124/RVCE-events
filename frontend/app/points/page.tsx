import type { Metadata } from "next";
import { Award, Medal, Sparkles, Trophy, TrendingUp } from "lucide-react";

import { LeaderboardTable } from "@/src/components/leaderboard/leaderboard-table";
import { leaderboardStudents } from "@/src/components/leaderboard/mock-data";
import { Podium } from "@/src/components/leaderboard/podium";

export const metadata: Metadata = {
  title: "AICTE Points Leaderboard | RVCE Events",
  description: "Track RVCE AICTE activity points, milestones, and campus leaderboard standings.",
};

const milestoneCategories = [
  { label: "National Initiatives", points: 25, icon: Medal },
  { label: "Innovation & Hackathons", points: 35, icon: Sparkles },
  { label: "Sports & Cultural", points: 20, icon: Trophy },
  { label: "NSS / Social Outreach", points: 20, icon: Award },
];

export default function PointsPage() {
  const topStudent = leaderboardStudents[0];

  return (
    <main className="min-h-screen bg-[var(--bg-cobalt)] text-[var(--text-blush)]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="flex min-h-[28rem] flex-col justify-between rounded-lg border border-[var(--border-blush)] bg-[color-mix(in_srgb,var(--surface-dark)_32%,transparent)] p-5 sm:p-7 lg:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--border-blush-strong)] px-3 py-1 text-xs font-black uppercase tracking-[0.18em]">
                Public tracker
              </span>
              <span className="rounded-full border border-[var(--border-blush)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-blush-muted)]">
                AICTE 100 point milestone
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="font-aalto text-[4.9rem] uppercase leading-[0.82] text-[var(--text-blush)] sm:text-[7rem] lg:text-[8.6rem]">
                Campus AICTE Leaderboard
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[var(--text-blush-muted)]">
                Follow the climb toward the mandatory 100 AICTE activity points for degree completion. Discover where
                workshops, hackathons, outreach, cultural work, and sports add up across RVCE.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] p-4">
                <p className="font-aalto text-5xl">{leaderboardStudents.length}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-blush-muted)]">Students</p>
              </div>
              <div className="rounded-lg border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] p-4">
                <p className="font-aalto text-5xl">{topStudent.points}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-blush-muted)]">Top score</p>
              </div>
              <div className="rounded-lg border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] p-4">
                <p className="font-aalto text-5xl">100</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-blush-muted)]">Target pts</p>
              </div>
            </div>
          </div>

          <aside className="rounded-lg border border-[var(--border-blush-strong)] bg-[var(--text-blush)] p-5 text-[var(--bg-cobalt)] sm:p-6">
            <div className="flex h-full flex-col justify-between gap-7">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">Milestone teaser</p>
                  <TrendingUp className="size-6" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-3xl font-black leading-tight">Ananya is 5 points away from the full AICTE milestone.</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-end justify-between">
                  <span className="font-aalto text-6xl">{topStudent.points}</span>
                  <span className="pb-2 text-sm font-black uppercase tracking-[0.16em]">/ 100 pts</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full border border-[var(--bg-cobalt)]">
                  <div className="h-full w-[95%] bg-[var(--bg-cobalt)]" />
                </div>
              </div>

              <div className="grid gap-3">
                {milestoneCategories.map(({ label, points, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between gap-3 border-t border-[color-mix(in_srgb,var(--bg-cobalt)_30%,transparent)] pt-3">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5" aria-hidden="true" />
                      <span className="text-sm font-bold">{label}</span>
                    </div>
                    <span className="text-sm font-black">{points}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-sans-editorial text-xs uppercase text-[var(--text-blush-muted)]">Top 3 showcase</p>
              <h2 className="mt-2 text-3xl font-black">Point leaders setting the pace</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[var(--text-blush-muted)]">
              Metallic rank cards call out the current campus podium using hardcoded sample data for this PR.
            </p>
          </div>
          <Podium students={leaderboardStudents} />
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-sans-editorial text-xs uppercase text-[var(--text-blush-muted)]">Lookup and rankings</p>
            <h2 className="mt-2 text-3xl font-black">Search by name or USN, then filter by department</h2>
          </div>
          <LeaderboardTable students={leaderboardStudents} />
        </div>
      </section>
    </main>
  );
}
