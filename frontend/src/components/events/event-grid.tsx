// event-grid.tsx
"use client";

import { cn } from "@/src/lib/utils";
import {
  EventCard,
  EventCardProps,
  EventCardSkeleton,
} from "./event-card";

export interface EventGridProps {
  events?: EventCardProps[];
  isLoading?: boolean;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  className?: string;
}

/** Renders a fluid event catalogue that keeps cards at a readable minimum width. */
export function EventGrid({
  events = [],
  isLoading = false,
  emptyStateTitle = "No events found",
  emptyStateDescription = "Check back soon for more events!",
  className,
}: EventGridProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid w-full gap-7",
          "grid-cols-[repeat(auto-fit,minmax(440px,1fr))]",
          className,
        )}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div
        className={cn(
          "flex min-h-[300px] w-full flex-col items-center justify-center",
          "px-6 py-16 text-center",
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="mb-6 h-px w-24 bg-[var(--border-blush-strong)]"
        />

        <h3 className="font-aalto text-3xl text-[var(--text-blush)]">
          {emptyStateTitle}
        </h3>

        <p className="mt-3 max-w-md text-sm text-[var(--text-blush-muted)]">
          {emptyStateDescription}
        </p>

        <div
          aria-hidden="true"
          className="mt-6 h-px w-24 bg-[var(--border-blush-strong)]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid w-full gap-7",
        "grid-cols-[repeat(auto-fit,minmax(440px,1fr))]",
        className,
      )}
    >
      {events.map((event, idx) => (
        <EventCard key={`${event.title}-${idx}`} {...event} />
      ))}
    </div>
  );
}

EventGrid.displayName = "EventGrid";