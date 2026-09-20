"use client";

import React from "react";
import { Ban, CalendarDays, CalendarPlus, MapPin } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { QrPass } from "./qr-pass";
import { TicketStatusBadge } from "./ticket-status-badge";
import type { Ticket } from "./types";

/**
 * Locale and timezone are pinned rather than left to the runtime default.
 *
 * `toLocaleString()` with no arguments formats using whatever locale and
 * timezone the host happens to have, which differs between the Next.js server
 * and the visitor's browser — React then reports a hydration mismatch on text
 * that looks identical to a human. Pinning both makes the output byte-stable
 * everywhere, and an RVCE event is in Bengaluru regardless of who is reading.
 */
/**
 * `en-GB` rather than `en-IN`: both order the date identically as
 * "3 Oct 2026", but en-IN inserts a comma before the year ("Sat, 3 Oct, 2026").
 */
const EVENT_LOCALE = "en-GB";
const EVENT_TIME_ZONE = "Asia/Kolkata";

const dayFormatter = new Intl.DateTimeFormat(EVENT_LOCALE, {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: EVENT_TIME_ZONE,
});

const timeFormatter = new Intl.DateTimeFormat(EVENT_LOCALE, {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: EVENT_TIME_ZONE,
});

/** "Sat, 17 Oct" — the year is dropped so a same-year range states it once. */
const dayMonthFormatter = new Intl.DateTimeFormat(EVENT_LOCALE, {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: EVENT_TIME_ZONE,
});

const yearFormatter = new Intl.DateTimeFormat(EVENT_LOCALE, {
  year: "numeric",
  timeZone: EVENT_TIME_ZONE,
});

/** ISO calendar date in the event's timezone, used only to compare two days. */
const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: EVENT_TIME_ZONE,
});

/**
 * Renders the event window as tightly as the dates allow, because this line
 * wraps to three rows on a phone if every part is repeated:
 *
 *   same day   → "Sat, 17 Oct 2026 · 9:00 am – 6:00 pm"
 *   same year  → "Sat, 17 Oct – Sun, 18 Oct 2026 · 9:00 am – 6:00 pm"
 *   otherwise  → both dates in full
 */
export function formatEventWindow(startsAt: string, endsAt: string): string {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  const times = `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`;

  if (dayKeyFormatter.format(start) === dayKeyFormatter.format(end)) {
    return `${dayFormatter.format(start)} · ${times}`;
  }

  if (yearFormatter.format(start) === yearFormatter.format(end)) {
    return `${dayMonthFormatter.format(start)} – ${dayMonthFormatter.format(end)} ${yearFormatter.format(end)} · ${times}`;
  }

  return `${dayFormatter.format(start)}, ${timeFormatter.format(start)} – ${dayFormatter.format(end)}, ${timeFormatter.format(end)}`;
}

/** Google Calendar's template URL wants UTC basic-format stamps: 20261017T033000Z. */
function toCalendarStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * Builds an "add to calendar" link entirely on the client — no backend, and no
 * .ics file to generate or serve.
 */
export function buildGoogleCalendarUrl(ticket: Ticket): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ticket.eventTitle,
    dates: `${toCalendarStamp(ticket.startsAt)}/${toCalendarStamp(ticket.endsAt)}`,
    details: `RVCE Events registration — ticket ${ticket.ticketCode} (${ticket.organizingClub}).`,
    location: ticket.venue,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Only a live registration can be given up; a past or cancelled seat cannot. */
const CANCELLABLE_STATUSES: ReadonlyArray<Ticket["status"]> = ["CONFIRMED", "WAITLISTED"];

interface TicketPassCardProps {
  ticket: Ticket;
  /**
   * Link to the event details page. Defaults to `/events/<slug>`, but stays
   * overridable because that route is still being built on another branch.
   */
  eventHref?: string;
  /** Overrides the generated Google Calendar link. */
  calendarHref?: string;
  /**
   * Asks the parent to open the cancel confirmation. The card never cancels on
   * its own — the dashboard owns a single dialog rather than one per card.
   */
  onCancelRequest?: (ticket: Ticket) => void;
  /**
   * Past registrations cannot be cancelled. The owning tab decides this rather
   * than the card reading the clock, so stories stay deterministic.
   */
  showCancelAction?: boolean;
  className?: string;
}

export function TicketPassCard({
  ticket,
  eventHref = `/events/${ticket.eventSlug}`,
  calendarHref,
  onCancelRequest,
  showCancelAction = true,
  className,
}: TicketPassCardProps) {
  const titleId = `ticket-title-${ticket.id}`;
  const isVoid = ticket.status === "CANCELLED";
  const canCancel =
    showCancelAction && CANCELLABLE_STATUSES.includes(ticket.status) && Boolean(onCancelRequest);

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "rounded-2xl border border-[var(--border-blush)] bg-[var(--surface-dark)] p-5 sm:p-6",
        "transition-colors duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[var(--border-blush-strong)]",
        className
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 space-y-2">
              <h3
                id={titleId}
                className="font-aalto text-2xl break-words text-[var(--text-blush)] sm:text-3xl"
              >
                {ticket.eventTitle}
              </h3>
              <span className="inline-flex rounded-full border border-[var(--border-blush)] px-3 py-1 font-[family-name:var(--font-space-grotesk)] text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-[var(--text-blush-muted)]">
                {ticket.organizingClub}
              </span>
            </div>
            <TicketStatusBadge status={ticket.status} />
          </div>

          <dl className="space-y-2.5 text-sm text-[var(--text-blush-muted)]">
            <div className="flex items-start gap-2.5">
              <dt className="mt-0.5 shrink-0">
                <CalendarDays aria-hidden="true" className="size-4" />
                <span className="sr-only">Date and time</span>
              </dt>
              <dd>{formatEventWindow(ticket.startsAt, ticket.endsAt)}</dd>
            </div>
            <div className="flex items-start gap-2.5">
              <dt className="mt-0.5 shrink-0">
                <MapPin aria-hidden="true" className="size-4" />
                <span className="sr-only">Venue</span>
              </dt>
              <dd>{ticket.venue}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2.5">
            {/* `secondary`, not `outline`: the outline variant fills with
                `--background`, which is cobalt, so on this dark card it reads
                as a loud blue block rather than a quiet secondary action.

                `nativeButton={false}` tells Base UI the rendered element is an
                anchor, not a <button>; without it the button warns at runtime
                that native button semantics have been removed. */}
            <Button
              variant="secondary"
              size="sm"
              nativeButton={false}
              render={<a href={eventHref} />}
            >
              View Event Details
            </Button>
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={
                <a
                  href={calendarHref ?? buildGoogleCalendarUrl(ticket)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <CalendarPlus aria-hidden="true" />
              Add to Calendar
            </Button>
            {canCancel && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancelRequest?.(ticket)}
              >
                <Ban aria-hidden="true" />
                Cancel Registration
              </Button>
            )}
          </div>
        </div>

        {/* Dimmed rather than hidden for a cancelled seat: the pass is void, but
            the student should still see the record of what they held. */}
        <QrPass
          ticketCode={ticket.ticketCode}
          className={cn("shrink-0 self-center md:self-start", isVoid && "opacity-45")}
        />
      </div>
    </article>
  );
}
