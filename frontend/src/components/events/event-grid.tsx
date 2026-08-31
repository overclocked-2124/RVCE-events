"use client";

import { cn } from "@/src/lib/utils";
import { EventCard, EventCardProps, EventCardSkeleton } from "./event-card";

export interface EventGridProps {
  events?: EventCardProps[];
  isLoading?: boolean;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  className?: string;
}

/** Renders a responsive grid of event cards. */
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
          "grid gap-6 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
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
      <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
        <h3 className="font-aalto text-2xl text-[var(--text-blush)]">{emptyStateTitle}</h3>
        <p className="mt-2 text-[var(--text-blush-muted)]">{emptyStateDescription}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {events.map((event, idx) => (
        <EventCard key={idx} {...event} />
      ))}
    </div>
  );
}

EventGrid.displayName = "EventGrid";