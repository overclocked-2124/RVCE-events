import { Award, Medal, Sparkles, Trophy } from "lucide-react";

import { cn } from "@/src/lib/utils";
import type { StudentLeaderboardRecord } from "./mock-data";

interface PodiumProps {
  students: StudentLeaderboardRecord[];
  className?: string;
}

const podiumStyles = [
  {
    label: "Gold",
    accent: "border-[var(--leaderboard-gold)] text-[var(--leaderboard-gold)]",
    surface: "bg-[color-mix(in_srgb,var(--leaderboard-gold)_18%,transparent)]",
    height: "lg:min-h-[23rem]",
    icon: Trophy,
  },
  {
    label: "Silver",
    accent: "border-[var(--leaderboard-silver)] text-[var(--leaderboard-silver)]",
    surface: "bg-[color-mix(in_srgb,var(--leaderboard-silver)_18%,transparent)]",
    height: "lg:min-h-[20rem]",
    icon: Medal,
  },
  {
    label: "Bronze",
    accent: "border-[var(--leaderboard-bronze)] text-[var(--leaderboard-bronze)]",
    surface: "bg-[color-mix(in_srgb,var(--leaderboard-bronze)_18%,transparent)]",
    height: "lg:min-h-[18rem]",
    icon: Award,
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Podium({ students, className }: PodiumProps) {
  const topThree = students.slice(0, 3);

  return (
    <section className={cn("grid gap-4 lg:grid-cols-[0.9fr_1.08fr_0.9fr] lg:items-end", className)}>
      {topThree.map((student, index) => {
        const style = podiumStyles[index];
        const Icon = style.icon;
        const orderClass = index === 0 ? "lg:order-2" : index === 1 ? "lg:order-1" : "lg:order-3";

        return (
          <article
            key={student.usn}
            className={cn(
              "relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-lg border bg-[color-mix(in_srgb,var(--surface-dark)_78%,var(--bg-cobalt))] p-5 shadow-2xl shadow-black/10",
              style.accent,
              style.height,
              orderClass,
            )}
          >
            <div className={cn("absolute inset-x-0 top-0 h-1", style.surface)} />
            <div className="flex items-start justify-between gap-4">
              <div
                className={cn(
                  "flex size-16 items-center justify-center rounded-full border-2 bg-[var(--surface-dark)] font-sans-editorial text-xl font-black",
                  style.accent,
                )}
                aria-hidden="true"
              >
                {initials(student.name)}
              </div>
              <div className={cn("rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]", style.accent)}>
                #{student.rank} {style.label}
              </div>
            </div>

            <div className="space-y-4">
              <Icon className={cn("size-8", style.accent)} aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-black text-[var(--text-blush)]">{student.name}</h3>
                <p className="mt-1 font-sans-editorial text-xs uppercase text-[var(--text-blush-muted)]">
                  {student.usn} · {student.department}
                </p>
              </div>
              <div className="flex items-end justify-between gap-3">
                <p className="font-aalto text-6xl text-[var(--text-blush)]">{student.points}</p>
                <p className="pb-2 text-sm font-bold uppercase tracking-[0.16em] text-[var(--text-blush-muted)]">Pts</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {student.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] px-2.5 py-1 text-xs text-[var(--text-blush)]"
                  >
                    <Sparkles className="size-3" aria-hidden="true" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

