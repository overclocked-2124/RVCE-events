"use client";

/* eslint-disable @next/next/no-img-element -- Storybook's Vite renderer cannot render next/image. */

import { Badge } from "@/src/components/ui/badge";
import { Calendar, Clock3, MapPin } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

/** Categories supported by the RVCE Events catalogue. */
export const eventCategories = [
  "Technical",
  "Cultural",
  "Sports",
  "Hackathon",
  "Workshop",
] as const;

/** A category supported by the RVCE Events catalogue. */
export type EventCategory = (typeof eventCategories)[number];

/** The registration state shown on an event card. */
export type EventAvailability = "available" | "fast-filling" | "sold-out";

/** Data and optional behaviour used to render an event card. */
export interface EventCardProps {
  title: string;
  club: string;
  date: string;
  time: string;
  venue: string;
  category: EventCategory;
  points: number;
  price: string;
  imageUrl: string;
  imageAlt?: string;
  status?: EventAvailability;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const availabilityCopy: Record<Exclude<EventAvailability, "available">, string> = {
  "fast-filling": "Fast filling",
  "sold-out": "Sold out",
};

/** Renders a responsive summary card for an RVCE event. */
export function EventCard({
  title,
  club,
  date,
  time,
  venue,
  category,
  points,
  price,
  imageUrl,
  imageAlt,
  status = "available",
  actionLabel,
  onAction,
  className,
}: EventCardProps) {
  const resolvedActionLabel =
    actionLabel ?? (status === "sold-out" ? "View Event" : "Register");

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-blush)] bg-[var(--text-blush)]/10 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[var(--border-blush-strong)] hover:shadow-lg focus-within:-translate-y-1 focus-within:border-[var(--border-blush-strong)]",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt ?? `${title} event poster`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <Badge
  variant="outline"
  className="absolute left-3 top-3 h-auto border-[var(--border-blush)] bg-[var(--bg-cobalt)]/90 px-3.5 py-2 text-[var(--text-blush)] backdrop-blur-sm shadow-md"
>
  {category}
</Badge>

<Badge
  variant="default"
  className="absolute right-3 top-3 h-auto bg-[var(--text-blush)] px-3.5 py-2 text-[var(--bg-cobalt)] shadow-md"
>
  +{points} AICTE Pts
</Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="pt-2">
          <h3 className="font-aalto line-clamp-2 text-2xl text-[var(--text-blush)]">
            {title}
          </h3>
          <p className="mt-2 text-sm text-[var(--text-blush-muted)]">{club}</p>
        </div>

        <div className="space-y-2 text-sm text-[var(--text-blush-muted)]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Calendar
              aria-hidden="true"
              className="size-4 shrink-0 text-[var(--text-blush)]"
            />
            <span>{date}</span>

            <Clock3
              aria-hidden="true"
              className="ml-2 size-4 shrink-0 text-[var(--text-blush)]"
            />
            <span>{time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin
              aria-hidden="true"
              className="size-4 shrink-0 text-[var(--text-blush)]"
            />
            <span className="min-w-0 truncate">{venue}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--border-blush)] pt-4 pb-1">
          <div className="min-w-0 shrink">
            <p className="text-sm font-semibold text-[var(--text-blush)]">{price}</p>

           {status !== "available" && (
  <Badge
    variant={status === "fast-filling" ? "destructive" : "secondary"}
    className={cn(
      "mt-1 ml-2 h-auto px-2.5 py-1 text-[11px]",
      status === "fast-filling"
        ? "bg-[rgba(245,158,11,0.18)] text-amber-400"
        : "bg-[var(--border-blush)]/20 text-[var(--text-blush-muted)]",
    )}
  >
    {availabilityCopy[status]}
  </Badge>
)}
          </div>

          <Button
            type="button"
            size="md"
            className="shrink-0 whitespace-nowrap px-5"
            onClick={onAction}
          >
            {resolvedActionLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Displays a layout-preserving loading placeholder for an event card. */
export function EventCardSkeleton({
  className,
}: Pick<EventCardProps, "className">) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading event"
      className={cn(
        "h-full overflow-hidden rounded-2xl border border-[var(--border-blush)] bg-[var(--text-blush)]/10",
        className,
      )}
    >
      <div className="aspect-video animate-pulse bg-[var(--border-blush)]" />

      <div className="space-y-3 p-5">
        <div className="h-6 w-4/5 animate-pulse rounded bg-[var(--border-blush)]" />
        <div className="h-4 w-2/5 animate-pulse rounded bg-[var(--border-blush)]" />

        <div className="space-y-2 pt-1">
          <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--border-blush)]" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-[var(--border-blush)]" />
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-blush)] pt-4">
          <div className="h-4 w-14 animate-pulse rounded bg-[var(--border-blush)]" />
          <div className="h-8 w-24 animate-pulse rounded-lg bg-[var(--border-blush)]" />
        </div>
      </div>
    </div>
  );
}