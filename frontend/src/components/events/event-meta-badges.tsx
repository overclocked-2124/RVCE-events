import React from "react";
import { Award, MapPin, Tag, Ticket } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { EventDetail } from "./event-types";

export interface EventMetaBadgesProps {
  event: EventDetail;
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Technical: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Cultural: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Sports: "bg-green-500/20 text-green-300 border-green-500/30",
  Hackathon: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Workshop: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Conference: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Other: "bg-[var(--surface-blush-subtle)] text-[var(--text-blush-muted)] border-[var(--border-blush)]",
};

/**
 * Floating meta badges / pills row.
 * Shows: AICTE Points, Category, Fee, and Venue details.
 * Server component.
 */
export function EventMetaBadges({ event, className }: EventMetaBadgesProps) {
  const categoryColor =
    CATEGORY_COLORS[event.category] ?? CATEGORY_COLORS["Other"];

  const feeLabel = event.fee === 0 ? "Free" : `₹${event.fee}`;
  const isFree = event.fee === 0;

  return (
    <div
      className={cn("flex flex-wrap gap-2 sm:gap-3", className)}
      aria-label="Event metadata"
    >
      {/* AICTE Points pill */}
      {event.aictePoints > 0 && (
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-blush-strong)] bg-[var(--surface-blush-subtle)] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--text-blush)]"
          aria-label={`AICTE Activity Points: ${event.aictePoints}`}
        >
          <Award aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          +{event.aictePoints} AICTE Pts
        </span>
      )}

      {/* Category badge */}
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest",
          categoryColor
        )}
        aria-label={`Category: ${event.category}`}
      >
        <Tag aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        {event.category}
      </span>

      {/* Fee badge */}
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-widest",
          isFree
            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
            : "bg-amber-500/20 text-amber-300 border-amber-500/30"
        )}
        aria-label={`Registration fee: ${feeLabel}`}
      >
        <Ticket aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        {feeLabel}
      </span>

      {/* Venue chip */}
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-blush-muted)]"
        aria-label={`Venue: ${event.venue}`}
      >
        <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[var(--text-blush)]" />
        {event.venue}
      </span>
    </div>
  );
}
