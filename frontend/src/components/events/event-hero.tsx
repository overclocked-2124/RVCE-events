/* eslint-disable @next/next/no-img-element -- Storybook's Vite renderer cannot render next/image. */
import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { EventCountdown } from "./event-countdown";
import type { EventDetail } from "./event-types";

export interface EventHeroProps {
  event: EventDetail;
  className?: string;
}

function formatDate(dateTime: string): string {
  try {
    const date = new Date(dateTime);
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });
  } catch {
    return dateTime;
  }
}

function formatTime(dateTime: string, timezone: string): string {
  try {
    const date = new Date(dateTime);
    return (
      date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }) +
      " " +
      timezone
    );
  } catch {
    return dateTime;
  }
}

/**
 * Hero / header section of the Event Details page.
 * Renders banner (16:9), club badge, event title, date/time, and countdown badge.
 * Server component — countdown is delegated to the client EventCountdown.
 */
export function EventHero({ event, className }: EventHeroProps) {
  const formattedDate = formatDate(event.dateTime);
  const formattedTime = formatTime(event.dateTime, event.timezone);

  const isPast = event.registrationState === "past";

  return (
    <header className={cn("w-full", className)}>
      {/* Banner: 16:9 with backdrop-blur gradient overlay */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        {/* Backdrop blur gradient for depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--surface-dark)] blur-2xl opacity-80 scale-110"
        />

        {/* Banner image */}
        <img
          src={event.bannerUrl}
          alt={`${event.title} event banner`}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500",
            isPast ? "opacity-50 grayscale" : "opacity-80"
          )}
        />

        {/* Gradient overlay for text readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--surface-dark)] via-[var(--surface-dark)]/40 to-transparent"
        />

        {/* Past event overlay */}
        {isPast && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[var(--surface-dark)]/50"
          />
        )}

        {/* Club badge overlay on banner */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 rounded-full bg-[var(--surface-dark)]/80 backdrop-blur-sm px-3 py-1.5 border border-[var(--border-blush)]">
          <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
            <img
              src={event.clubLogoUrl}
              alt={`${event.clubName} logo`}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xs font-semibold text-[var(--text-blush)] uppercase tracking-widest whitespace-nowrap">
            {event.clubName}
          </span>
        </div>

        {/* Countdown badge overlay on banner */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <EventCountdown
            dateTime={event.dateTime}
            registrationState={event.registrationState}
          />
        </div>
      </div>

      {/* Title and meta below banner */}
      <div className="mt-6 space-y-4">
        {/* Event Title */}
        <h1
          className={cn(
            "font-aalto text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.88] uppercase",
            isPast ? "text-[var(--text-blush-muted)]" : "text-[var(--text-blush)]"
          )}
        >
          {event.title}
        </h1>

        {/* Date, Time, Venue row */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <div className="flex items-center gap-2 text-[var(--text-blush-muted)] text-sm sm:text-base">
            <Calendar aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-blush)]" />
            <time dateTime={event.dateTime}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-blush-muted)] text-sm sm:text-base">
            <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-blush)]" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-blush-muted)] text-sm sm:text-base">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--text-blush)]" />
            <span>{event.venue}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
