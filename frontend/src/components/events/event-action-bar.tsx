"use client";

import React, { useState } from "react";
import { CalendarPlus, Users, XCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import type { EventDetail } from "./event-types";

export interface EventActionBarProps {
  event: EventDetail;
  /** When true, renders the compact inline version (for sidebar).
   * When false (default), renders the full sticky bottom bar (for mobile). */
  inline?: boolean;
  className?: string;
}

function getCapacityLabel(registered: number, capacity: number): string {
  const remaining = capacity - registered;
  if (remaining <= 0) return "No seats remaining";
  if (remaining === 1) return "1 seat remaining";
  return `${remaining} / ${capacity} seats remaining`;
}

function getCapacityColor(registered: number, capacity: number): string {
  const pct = registered / capacity;
  if (pct >= 1) return "text-red-400";
  if (pct >= 0.85) return "text-amber-400";
  return "text-emerald-400";
}

/** Format a Date as YYYYMMDDTHHmmssZ for Google Calendar URL */
function formatGCalDate(d: Date): string {
  return d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

/**
 * Event action bar component.
 * In mobile (sticky) mode: full-width sticky bar at bottom with capacity + CTAs.
 * In inline mode (sidebar): just the CTA buttons without sticky wrapper.
 *
 * "use client" required for onClick interactivity.
 */
export function EventActionBar({ event, inline = false, className }: EventActionBarProps) {
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [registered, setRegistered] = useState(false);

  const isDisabled =
    event.registrationState === "sold_out" ||
    event.registrationState === "closed" ||
    event.registrationState === "past";

  const isPast = event.registrationState === "past";
  const isSoldOut = event.registrationState === "sold_out";
  const isClosed = event.registrationState === "closed";

  const registrationLabel = (() => {
    if (isPast) return "Event Concluded";
    if (isSoldOut) return "Sold Out";
    if (isClosed) return "Registration Closed";
    if (registered) return "Registered ✓";
    if (event.fee > 0) return `Register — ₹${event.fee}`;
    return "Register Now";
  })();

  function handleRegister() {
    if (isDisabled || registered) return;
    setRegistered(true);
  }

  function handleAddToCalendar() {
    if (calendarAdded) return;
    const start = new Date(event.dateTime);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // +3 hours mock

    const gcalUrl = new URL("https://calendar.google.com/calendar/render");
    gcalUrl.searchParams.set("action", "TEMPLATE");
    gcalUrl.searchParams.set("text", event.title);
    gcalUrl.searchParams.set("details", event.description.slice(0, 200));
    gcalUrl.searchParams.set("location", event.venue);
    gcalUrl.searchParams.set(
      "dates",
      `${formatGCalDate(start)}/${formatGCalDate(end)}`
    );

    window.open(gcalUrl.toString(), "_blank", "noopener,noreferrer");
    setCalendarAdded(true);
  }

  const capacityLabel = getCapacityLabel(event.registeredCount, event.capacity);
  const capacityColor = getCapacityColor(event.registeredCount, event.capacity);

  // ─── Inline mode (desktop sidebar card) ───
  if (inline) {
    return (
      <div className={cn("space-y-3", className)}>
        {/* Primary CTA */}
        <Button
          variant="default"
          size="hero"
          className={cn(
            "w-full rounded-full font-semibold transition-all",
            isDisabled ? "opacity-50 cursor-not-allowed" : "",
            registered ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
          )}
          disabled={isDisabled}
          onClick={handleRegister}
          aria-label={registrationLabel}
        >
          {registrationLabel}
        </Button>

        {/* Add to Calendar button */}
        {!isPast && (
          <Button
            variant="outline"
            size="hero"
            className="w-full rounded-full gap-2"
            onClick={handleAddToCalendar}
            aria-label={calendarAdded ? "Added to calendar" : "Add to Google Calendar"}
          >
            <CalendarPlus
              aria-hidden="true"
              className={cn("h-4 w-4", calendarAdded ? "text-emerald-400" : "")}
            />
            {calendarAdded ? "Added to Calendar!" : "Add to Calendar"}
          </Button>
        )}
      </div>
    );
  }

  // ─── Sticky mode (mobile bottom bar) ───
  return (
    <div
      className={cn(
        "sticky bottom-0 z-30 w-full",
        "border-t border-[var(--border-blush)] bg-[var(--bg-cobalt)]/95 backdrop-blur-md",
        "px-4 py-3 sm:px-6 sm:py-4",
        className
      )}
    >
      {/* Capacity + sold out row */}
      <div className="mb-3 flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-1.5">
          <Users aria-hidden="true" className="h-3.5 w-3.5 text-[var(--text-blush-muted)] shrink-0" />
          <span className={cn("font-semibold", capacityColor)}>
            {capacityLabel}
          </span>
        </div>

        {isDisabled && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-widest",
              isPast
                ? "bg-[var(--surface-blush-subtle)] text-[var(--text-blush-muted)]"
                : "bg-red-500/20 text-red-400 border border-red-500/30"
            )}
          >
            <XCircle aria-hidden="true" className="h-3 w-3 shrink-0" />
            {isPast ? "Concluded" : isSoldOut ? "Sold Out" : "Closed"}
          </span>
        )}
      </div>

      {/* CTA buttons */}
      <div className="flex items-center gap-3">
        {/* Primary CTA */}
        <Button
          variant="default"
          size="hero"
          className={cn(
            "flex-1 rounded-full font-semibold transition-all",
            isDisabled ? "opacity-50 cursor-not-allowed" : "",
            registered ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""
          )}
          disabled={isDisabled}
          onClick={handleRegister}
          aria-label={registrationLabel}
        >
          {registrationLabel}
        </Button>

        {/* Add to Calendar */}
        {!isPast && (
          <Button
            variant="outline"
            size="hero"
            className="rounded-full gap-2 shrink-0"
            onClick={handleAddToCalendar}
            aria-label={calendarAdded ? "Added to calendar" : "Add to Calendar"}
          >
            <CalendarPlus
              aria-hidden="true"
              className={cn("h-4 w-4", calendarAdded ? "text-emerald-400" : "")}
            />
            <span className="hidden sm:inline">
              {calendarAdded ? "Added!" : "Calendar"}
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
