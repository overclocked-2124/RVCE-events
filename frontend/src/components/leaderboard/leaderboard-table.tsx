"use client";

import { useEffect, useMemo, useState } from "react";
import { Award, Medal, Search, TrendingUp, X } from "lucide-react";

import { cn } from "@/src/lib/utils";
import {
  departments,
  type LeaderboardDepartment,
  type StudentLeaderboardRecord,
} from "./mock-data";

interface LeaderboardTableProps {
  students: StudentLeaderboardRecord[];
  className?: string;
}

function useDebouncedValue(value: string, delay = 180) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timeout);
  }, [delay, value]);

  return debounced;
}

function rankClass(rank: number) {
  if (rank === 1) return "border-[var(--leaderboard-gold)] text-[var(--leaderboard-gold)]";
  if (rank === 2) return "border-[var(--leaderboard-silver)] text-[var(--leaderboard-silver)]";
  if (rank === 3) return "border-[var(--leaderboard-bronze)] text-[var(--leaderboard-bronze)]";
  if (rank <= 10) return "border-[var(--border-blush-strong)] text-[var(--text-blush)]";
  return "border-[var(--border-blush)] text-[var(--text-blush-muted)]";
}

function StudentIdentity({ student }: { student: StudentLeaderboardRecord }) {
  return (
    <div>
      <p className="font-bold text-[var(--text-blush)]">{student.name}</p>
      <p className="mt-1 font-sans-editorial text-[0.65rem] uppercase text-[var(--text-blush-muted)]">{student.usn}</p>
    </div>
  );
}

function CategoryTags({ student }: { student: StudentLeaderboardRecord }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Object.entries(student.categories).map(([category, points]) => (
        <span
          key={category}
          className="rounded-full border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] px-2 py-1 text-[0.7rem] text-[var(--text-blush-muted)]"
        >
          {category}: {points}
        </span>
      ))}
    </div>
  );
}

export function LeaderboardTable({ students, className }: LeaderboardTableProps) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<"All" | LeaderboardDepartment>("All");
  const debouncedQuery = useDebouncedValue(query);

  const filteredStudents = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    return students.filter((student) => {
      const matchesDepartment = department === "All" || student.department === department;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        student.name.toLowerCase().includes(normalizedQuery) ||
        student.usn.toLowerCase().includes(normalizedQuery);

      return matchesDepartment && matchesQuery;
    });
  }, [debouncedQuery, department, students]);

  const highlightedStudent = debouncedQuery.trim().length >= 2 ? filteredStudents[0] : undefined;

  return (
    <section className={cn("space-y-5", className)}>
      <div className="rounded-lg border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block flex-1">
            <span className="sr-only">Search by student name or USN</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-blush-muted)]" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or USN"
              className="h-12 w-full rounded-lg border border-[var(--border-blush)] bg-[color-mix(in_srgb,var(--surface-dark)_70%,transparent)] pl-10 pr-11 text-sm text-[var(--text-blush)] outline-none placeholder:text-[var(--text-blush-muted)] focus:border-[var(--border-blush-strong)] focus:ring-2 focus:ring-[var(--border-blush)]"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--text-blush-muted)] hover:bg-[var(--surface-blush-subtle)] hover:text-[var(--text-blush)]"
                aria-label="Clear search"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </label>

          <div className="flex flex-wrap gap-2" aria-label="Department filters">
            {departments.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDepartment(item)}
                className={cn(
                  "h-9 rounded-full border px-3 text-xs font-bold uppercase tracking-[0.14em] transition",
                  department === item
                    ? "border-[var(--border-blush-strong)] bg-[var(--text-blush)] text-[var(--bg-cobalt)]"
                    : "border-[var(--border-blush)] text-[var(--text-blush-muted)] hover:border-[var(--border-blush-strong)] hover:text-[var(--text-blush)]",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {highlightedStudent && (
        <article className="rounded-lg border border-[var(--border-blush-strong)] bg-[var(--text-blush)] p-4 text-[var(--bg-cobalt)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full border border-[var(--bg-cobalt)]">
                <Award className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em]">Quick lookup match</p>
                <h3 className="mt-1 text-xl font-black">{highlightedStudent.name}</h3>
                <p className="text-sm opacity-80">
                  {highlightedStudent.usn} · {highlightedStudent.department} · Rank #{highlightedStudent.rank}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-aalto text-5xl">{highlightedStudent.points}</p>
              <p className="text-xs font-black uppercase tracking-[0.16em]">AICTE points</p>
            </div>
          </div>
        </article>
      )}

      <div className="hidden overflow-hidden rounded-lg border border-[var(--border-blush)] lg:block">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[var(--surface-blush-subtle)] text-xs uppercase tracking-[0.14em] text-[var(--text-blush-muted)]">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Points</th>
              <th className="px-4 py-3">Events</th>
              <th className="px-4 py-3">Category Breakdown</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.usn} className="border-t border-[var(--border-blush)] bg-[color-mix(in_srgb,var(--surface-dark)_42%,transparent)]">
                <td className="px-4 py-4">
                  <span className={cn("inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-full border px-2 text-sm font-black", rankClass(student.rank))}>
                    {student.rank <= 3 && <Medal className="size-4" aria-hidden="true" />}
                    #{student.rank}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <StudentIdentity student={student} />
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full border border-[var(--border-blush)] px-3 py-1 text-xs font-bold text-[var(--text-blush)]">
                    {student.department}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 font-black text-[var(--text-blush)]">
                    <TrendingUp className="size-4" aria-hidden="true" />
                    {student.points} Pts
                  </div>
                </td>
                <td className="px-4 py-4 text-[var(--text-blush-muted)]">{student.events}</td>
                <td className="px-4 py-4">
                  <CategoryTags student={student} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 lg:hidden">
        {filteredStudents.map((student) => (
          <article key={student.usn} className="rounded-lg border border-[var(--border-blush)] bg-[color-mix(in_srgb,var(--surface-dark)_48%,transparent)] p-4">
            <div className="flex items-start justify-between gap-3">
              <StudentIdentity student={student} />
              <span className={cn("inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-2 text-sm font-black", rankClass(student.rank))}>
                #{student.rank}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--text-blush-muted)]">Dept</p>
                <p className="mt-1 font-bold">{student.department}</p>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--text-blush-muted)]">Points</p>
                <p className="mt-1 font-bold">{student.points}</p>
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--text-blush-muted)]">Events</p>
                <p className="mt-1 font-bold">{student.events}</p>
              </div>
            </div>
            <div className="mt-4">
              <CategoryTags student={student} />
            </div>
          </article>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="rounded-lg border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] p-8 text-center text-[var(--text-blush-muted)]">
          No students match this search and department filter.
        </div>
      )}
    </section>
  );
}
