import React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { ScheduleSlot } from "./event-types";

export interface EventScheduleProps {
  agenda: ScheduleSlot[];
  className?: string;
}

/**
 * Visual timeline component for the event schedule/agenda.
 * Server component.
 */
export function EventSchedule({ agenda, className }: EventScheduleProps) {
  if (!agenda || agenda.length === 0) {
    return (
      <section className={cn("", className)}>
        <h2 className="font-aalto text-2xl sm:text-3xl uppercase text-[var(--text-blush)] mb-4">
          Schedule
        </h2>
        <p className="text-[var(--text-blush-muted)] text-sm">
          Schedule to be announced.
        </p>
      </section>
    );
  }

  return (
    <section className={cn("", className)}>
      <h2 className="font-aalto text-2xl sm:text-3xl uppercase text-[var(--text-blush)] mb-6">
        Schedule
      </h2>

      {/* Timeline */}
      <ol className="relative" aria-label="Event schedule">
        {agenda.map((slot, index) => {
          const isLast = index === agenda.length - 1;
          return (
            <li key={index} className="flex gap-4 sm:gap-6 group">
              {/* Timeline spine */}
              <div className="flex flex-col items-center" aria-hidden="true">
                {/* Dot */}
                <div className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border-blush-strong)] bg-[var(--surface-dark)] transition-colors group-hover:border-[var(--text-blush)] group-hover:bg-[var(--surface-blush-subtle)]">
                  <Clock className="h-3.5 w-3.5 text-[var(--text-blush)]" />
                </div>
                {/* Connector line */}
                {!isLast && (
                  <div className="mt-1 w-px flex-1 bg-[var(--border-blush)] min-h-8" />
                )}
              </div>

              {/* Content */}
              <div
                className={cn(
                  "flex-1 rounded-xl border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] p-4 transition-colors hover:bg-[var(--surface-blush-muted)]",
                  isLast ? "mb-0" : "mb-4"
                )}
              >
                {/* Time */}
                <p className="font-sans-editorial text-[0.65rem] uppercase tracking-widest text-[var(--text-blush)] mb-1">
                  {slot.time}
                </p>

                {/* Session title */}
                <h3 className="text-sm sm:text-base font-semibold text-[var(--text-blush)] leading-snug">
                  {slot.title}
                </h3>

                {/* Speaker */}
                {slot.speaker && (
                  <p className="mt-0.5 text-xs text-[var(--text-blush-muted)]">
                    {slot.speaker}
                  </p>
                )}

                {/* Description */}
                {slot.description && (
                  <p className="mt-1.5 text-xs text-[var(--text-blush-muted)] leading-relaxed">
                    {slot.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
