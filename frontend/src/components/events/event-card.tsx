// event-card.tsx
"use client";

/* eslint-disable @next/next/no-img-element -- Storybook's Vite renderer cannot render next/image. */

import {
  ArrowUpRight,
  Calendar,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
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

/** Small reusable diagonal-tick flourish (matches the one beside Register). */
function DiagonalTicks({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex rotate-[-25deg] gap-1", className)}
    >
      <span className="h-2.5 w-px bg-[var(--border-blush-strong)]" />
      <span className="h-4 w-px bg-[var(--border-blush-strong)]" />
      <span className="h-2.5 w-px bg-[var(--border-blush-strong)]" />
    </div>
  );
}

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
        "group relative flex h-full flex-col overflow-hidden",
        "rounded-[2rem]",
        "border-2 border-[var(--text-blush)]/50",
        "bg-[var(--surface-card)]",
        "shadow-[0_20px_50px_rgba(9,3,64,0.45)]",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-[var(--text-blush)]",
        "hover:shadow-[0_26px_65px_rgba(253,205,215,0.22)]",
        className,
      )}
    >
      {/* top hairline — a ticket edge catching the light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[var(--text-blush)]/70 to-transparent"
      />

      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt ?? `${title} event poster`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Soft indigo fade below image, matching the card surface */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--surface-card)] via-[var(--surface-card)]/75 to-transparent"
        />

        {/* Brand tag, echoing the <Coding Club> mark */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute bottom-3 left-3 z-10 flex items-center gap-1",
            "font-mono text-[10px] font-medium tracking-wide",
            "text-[var(--text-blush)] drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]",
          )}
        >
          
        </span>

        {/* BADGE ROW — flex + wrap so long labels never overlap */}
        <div className="absolute inset-x-4 top-4 flex flex-wrap items-start justify-between gap-2">
          {/* CATEGORY */}
                    <Badge
            variant="outline"
            className={cn(
              "h-auto max-w-full rounded-full",
              "border border-[var(--text-blush)]",
              "bg-[var(--text-blush)]",
              "px-4 py-2.5",
              "font-sans-editorial",
              "text-[11px] font-bold uppercase",
              "tracking-[0.14em]",
              "text-[var(--surface-card)]",
              "shadow-[0_8px_20px_rgba(253,205,215,0.35)]",
            )}
          >
            {category === "Hackathon" && (
              <span className="mr-1.5 font-mono text-[11px]">
                {"</>"}
              </span>
            )}

            {category !== "Hackathon" && (
              <span className="mr-1.5 size-1.5 shrink-0 rounded-full bg-[var(--surface-card)]" />
            )}

            <span className="truncate">{category}</span>
          </Badge>

          {/* AICTE POINTS */}
                    <Badge
            variant="default"
            className={cn(
              "h-auto max-w-full rounded-full",
              "border border-[var(--text-blush)]",
              "bg-[var(--text-blush)]",
              "px-4 py-2.5",
              "font-sans-editorial",
              "text-[11px] font-bold uppercase",
              "tracking-[0.1em]",
              "text-[var(--surface-card)]",
              "shadow-[0_8px_20px_rgba(253,205,215,0.35)]",
            )}
          >
            <Sparkles className="mr-1.5 size-3.5 shrink-0 text-[var(--surface-card)]" />
            <span className="truncate">+{points} AICTE PTS</span>
          </Badge>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
        {/* TICKET-STUB PERFORATION — sits right at the image/content seam */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(253,205,215,0.4) 1.5px, transparent 1.5px)",
            backgroundSize: "10px 1px",
            backgroundRepeat: "repeat-x",
          }}
        />

        {/* CLUB */}
        <div className="flex items-center gap-3">
          <p
            className={cn(
              "font-sans-editorial",
              "text-[10px] font-bold uppercase",
              "tracking-[0.22em]",
              "text-[var(--text-blush-muted)]",
              "sm:text-[11px]",
            )}
          >
            {club}
          </p>

          <DiagonalTicks className="opacity-70" />

          <div className="h-px flex-1 bg-[var(--border-blush)]" />
        </div>

        {/* TITLE */}
        <div className="relative pt-3">
          {/* Scattered plus-mark accents, echoing the Sparkles motif */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-1 top-0 select-none text-2xl font-light text-[var(--text-blush)]/25"
          >
            +
          </span>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-8 select-none text-lg font-light text-[var(--text-blush)]/40"
          >
            +
          </span>

          <h3
            className={cn(
              "font-aalto",
              "text-4xl leading-[0.88] tracking-tight",
              "bg-gradient-to-r from-[var(--text-blush)] via-white to-[var(--text-blush)]",
              "bg-clip-text text-transparent",
              "sm:text-5xl",
              "lg:text-6xl",
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              "mt-4",
              "text-sm leading-relaxed",
              "text-[var(--text-cream)]/70",
              "sm:text-[15px]",
            )}
          >
            Build. Innovate. Solve real-world problems.
          </p>
        </div>

        {/* EVENT DETAILS */}
        <div
          className={cn(
            "relative mt-6 overflow-hidden rounded-xl",
            "border-y border-[var(--border-blush)]",
            "bg-white/[0.04]",
            "px-4 py-5",
          )}
        >
          {/* Ring flourish, echoing the one behind Entry */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full border border-[var(--border-blush-strong)]/25"
          />

          <div className="relative grid grid-cols-3">
            {/* DATE */}
            <div className="relative pr-4">
              <div className="flex items-center gap-2">
                <Calendar
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[var(--text-blush)]"
                />

                <span
                  className={cn(
                    "font-sans-editorial",
                    "text-[10px] font-bold uppercase",
                    "tracking-[0.2em]",
                    "text-[var(--text-blush-muted)]",
                  )}
                >
                  Date
                </span>
              </div>

              <p
                className={cn(
                  "mt-2",
                  "text-[15px] font-bold",
                  "text-[var(--text-cream)]",
                )}
              >
                {date}
              </p>

              {/* DATE / TIME SEPARATOR */}
              <div
                aria-hidden="true"
                className="absolute right-0 top-1/2 h-12 w-px -translate-y-1/2 bg-[var(--border-blush)]"
              />
            </div>

            {/* TIME */}
            <div className="relative px-4">
              <div className="flex items-center gap-2">
                <Clock3
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[var(--text-blush)]"
                />

                <span
                  className={cn(
                    "font-sans-editorial",
                    "text-[10px] font-bold uppercase",
                    "tracking-[0.2em]",
                    "text-[var(--text-blush-muted)]",
                  )}
                >
                  Time
                </span>
              </div>

              <p
                className={cn(
                  "mt-2",
                  "text-[15px] font-bold",
                  "text-[var(--text-cream)]",
                )}
              >
                {time}
              </p>

              {/* TIME / VENUE SEPARATOR */}
              <div
                aria-hidden="true"
                className="absolute right-0 top-1/2 h-12 w-px -translate-y-1/2 bg-[var(--border-blush)]"
              />
            </div>

            {/* VENUE */}
            <div className="pl-4">
              <div className="flex items-center gap-2">
                <MapPin
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[var(--text-blush)]"
                />

                <span
                  className={cn(
                    "font-sans-editorial",
                    "text-[10px] font-bold uppercase",
                    "tracking-[0.2em]",
                    "text-[var(--text-blush-muted)]",
                  )}
                >
                  Venue
                </span>
              </div>

              <p
                className={cn(
                  "mt-2 truncate",
                  "text-[15px] font-bold",
                  "text-[var(--text-cream)]",
                )}
              >
                {venue}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative mt-6 flex items-end justify-between gap-4">
          {/* DECORATIVE CIRCLES */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-2.25rem] left-[5rem] size-24 rounded-full border border-[var(--border-blush-strong)]/25"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-3rem] left-[5.7rem] size-32 rounded-full border border-[var(--border-blush-strong)]/15"
          />

          {/* ENTRY */}
          <div className="relative min-w-0">
            <p
              className={cn(
                "font-sans-editorial",
                "text-[9px] font-bold uppercase",
                "tracking-[0.22em]",
                "text-[var(--text-blush-muted)]",
              )}
            >
              Entry
            </p>

            <p
              className={cn(
                "mt-1",
                "font-aalto",
                "text-[2.75rem] font-bold",
                "leading-none tracking-tight",
                "bg-gradient-to-r from-[var(--text-blush)] via-white to-[var(--text-blush)]",
                "bg-clip-text text-transparent",
              )}
            >
              {price}
            </p>

            <p
              className={cn(
                "mt-2",
                "font-sans-editorial",
                "text-[8px] font-bold uppercase",
                "tracking-[0.2em]",
                "text-[var(--text-blush-muted)]",
              )}
            >
              Open to all RVCE students
            </p>

            {/* AVAILABILITY */}
            {status !== "available" && (
              <Badge
                variant={
                  status === "fast-filling" ? "destructive" : "secondary"
                }
                className={cn(
                  "mt-3 h-auto rounded-full px-3 py-1.5",
                  "font-sans-editorial",
                  "text-[9px] font-bold uppercase tracking-[0.1em]",
                  status === "fast-filling"
                    ? "border border-[var(--accent-coral)]/40 bg-[var(--accent-coral)]/15 text-[var(--accent-coral)]"
                    : "border border-[var(--border-blush)] bg-white/[0.06] text-[var(--text-blush-muted)]",
                )}
              >
                {availabilityCopy[status]}
              </Badge>
            )}
          </div>

          {/* REGISTER AREA */}
          <div className="relative">
            {/* THREE DECORATIVE LINES */}
            <DiagonalTicks className="pointer-events-none absolute -right-1 -top-5 opacity-70" />

            {/* REGISTER BUTTON */}
            <Button
              type="button"
              size="lg"
              disabled={status === "sold-out"}
              className={cn(
                "h-12 shrink-0 rounded-full px-8",
                "font-sans-editorial",
                "text-[13px] font-bold uppercase",
                "tracking-[0.08em]",
                "bg-[var(--text-blush)]",
                "text-[var(--surface-card)]",
                "shadow-[0_8px_24px_rgba(253,205,215,0.3)]",
                "transition-all duration-300",
                "hover:scale-[1.04]",
                "hover:bg-[var(--bg-cobalt)]",
                "hover:text-[var(--text-blush)]",
                "hover:shadow-[0_10px_28px_rgba(74,50,249,0.5)]",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
              onClick={onAction}
            >
              {resolvedActionLabel}

              {status !== "sold-out" && (
                <ArrowUpRight className="ml-1.5 size-5" />
              )}
            </Button>
          </div>
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
        "h-full overflow-hidden rounded-[2rem]",
        "border border-[var(--border-blush)]",
        "bg-[var(--surface-card)]/70",
        className,
      )}
    >
      <div className="aspect-video animate-pulse bg-white/[0.06]" />

      <div className="space-y-4 p-6">
        <div className="h-3 w-2/5 animate-pulse rounded bg-white/[0.08]" />

        <div className="h-10 w-4/5 animate-pulse rounded bg-white/[0.08]" />

        <div className="h-4 w-3/5 animate-pulse rounded bg-white/[0.08]" />

        <div className="rounded-xl bg-white/[0.04] p-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-8 animate-pulse rounded bg-white/[0.08]" />
            <div className="h-8 animate-pulse rounded bg-white/[0.08]" />
            <div className="h-8 animate-pulse rounded bg-white/[0.08]" />
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-[var(--border-blush)] pt-5">
          <div className="space-y-2">
            <div className="h-3 w-12 animate-pulse rounded bg-white/[0.08]" />
            <div className="h-8 w-16 animate-pulse rounded bg-white/[0.08]" />
          </div>

          <div className="h-12 w-32 animate-pulse rounded-full bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
}