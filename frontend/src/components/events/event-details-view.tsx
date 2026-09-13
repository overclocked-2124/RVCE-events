import React from "react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { EventHero } from "./event-hero";
import { EventMetaBadges } from "./event-meta-badges";
import { EventActionBar } from "./event-action-bar";
import { EventSchedule } from "./event-schedule";
import { EventOrganizer } from "./event-organizer";
import { EventCard } from "./event-card";
import { type EventDetail, toEventCardProps } from "./event-types";

export interface EventDetailsViewProps {
  event: EventDetail;
  relatedEvents?: EventDetail[];
  className?: string;
}

/**
 * Main Event Details page view.
 * Composes all event sub-sections: hero, meta badges, description, schedule, organizer, and action bar.
 *
 * Layout:
 * - Mobile: single-column, sticky bottom action bar
 * - Desktop: two-column (main content | sidebar) with sticky sidebar containing action card
 *
 * This is a Server Component; client sub-components are imported where needed.
 */
export function EventDetailsView({
  event,
  relatedEvents,
  className,
}: EventDetailsViewProps) {
  const isPast = event.registrationState === "past";
  const isSoldOut = event.registrationState === "sold_out";
  const isClosed = event.registrationState === "closed";
  const isDisabled = isPast || isSoldOut || isClosed;
  const capacityPct = Math.min(
    (event.registeredCount / event.capacity) * 100,
    100
  );

  return (
    <main
      className={cn(
        "relative min-h-screen bg-[var(--bg-cobalt)] text-[var(--text-blush)]",
        className
      )}
    >
      {/* Page content — padded bottom on mobile for sticky action bar */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-32 lg:pb-12 pt-6 sm:pt-8 lg:pt-12">
        {/* Breadcrumb nav */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-blush-muted)] uppercase tracking-widest hover:text-[var(--text-blush)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)] rounded"
          >
            ← Back to Events
          </Link>
        </nav>

        {/* Two-column layout on desktop */}
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8 xl:gap-12">
          {/* ─── Main content column ─── */}
          <div className="space-y-8 sm:space-y-10">
            {/* Hero section */}
            <EventHero event={event} />

            {/* Meta badges */}
            <EventMetaBadges event={event} />

            {/* Payment notice for paid events */}
            {event.fee > 0 && event.registrationState === "open" && (
              <div
                className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4"
                role="note"
                aria-label="Payment notice"
              >
                <p className="text-sm text-amber-300">
                  <span className="font-semibold">Paid Event:</span> A registration
                  fee of ₹{event.fee} per participant is required. Payment is
                  collected at the venue on the day of the event.
                </p>
              </div>
            )}

            {/* Description */}
            <section aria-labelledby="event-description-heading">
              <h2
                id="event-description-heading"
                className="font-aalto text-2xl sm:text-3xl uppercase text-[var(--text-blush)] mb-4"
              >
                About
              </h2>
              <p
                className={cn(
                  "max-w-none leading-relaxed whitespace-pre-line text-sm sm:text-base",
                  "text-[var(--text-blush-muted)]"
                )}
              >
                {event.description}
              </p>
            </section>

            {/* Schedule / Agenda */}
            <EventSchedule agenda={event.agenda} />

            {/* Organizer — shown below schedule on mobile */}
            <div className="lg:hidden">
              <EventOrganizer organizer={event.organizer} />
            </div>
          </div>

          {/* ─── Sidebar column (desktop only) ─── */}
          <aside className="hidden lg:flex lg:flex-col lg:gap-6" aria-label="Event actions">
            <div className="sticky top-8 space-y-6">
              {/* Desktop action card */}
              <div className="rounded-2xl border border-[var(--border-blush)] bg-[var(--surface-dark)] p-6 space-y-5">
                {/* Capacity row */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-blush-muted)]">Capacity</span>
                    <span className="font-semibold text-[var(--text-blush)]">
                      {event.registeredCount} / {event.capacity} registered
                    </span>
                  </div>
                  {/* Capacity progress bar */}
                  <div
                    className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-blush-subtle)]"
                    role="progressbar"
                    aria-valuenow={event.registeredCount}
                    aria-valuemin={0}
                    aria-valuemax={event.capacity}
                    aria-label={`${event.registeredCount} of ${event.capacity} seats registered`}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700",
                        capacityPct >= 100
                          ? "bg-red-500"
                          : capacityPct >= 85
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      )}
                      style={{ width: `${capacityPct}%` }}
                    />
                  </div>
                </div>

                {/* Status notice for disabled states */}
                {isDisabled && (
                  <div
                    className={cn(
                      "rounded-lg px-4 py-3 text-center text-sm font-semibold border",
                      isPast
                        ? "bg-[var(--surface-blush-subtle)] text-[var(--text-blush-muted)] border-[var(--border-blush)]"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    )}
                  >
                    {isPast
                      ? "This event has concluded"
                      : isSoldOut
                      ? "This event is sold out"
                      : "Registration is closed"}
                  </div>
                )}

                {/* Inline action buttons (no sticky wrapper) */}
                <EventActionBar event={event} inline />
              </div>

              {/* Organizer card in sidebar */}
              <EventOrganizer organizer={event.organizer} />
            </div>
          </aside>
        </div>

        {/* ─── More Events / Catalogue Showcase ─── */}
        {relatedEvents && relatedEvents.length > 0 && (
          <section
            className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-[var(--border-blush)]"
            aria-labelledby="related-events-heading"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono font-medium uppercase tracking-widest text-[var(--accent-coral)]">
                  Keep Exploring
                </span>
                <h2
                  id="related-events-heading"
                  className="font-aalto text-2xl sm:text-3xl uppercase text-[var(--text-blush)] mt-1"
                >
                  More Events
                </h2>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--text-blush-muted)] hover:text-[var(--text-blush)] transition-colors"
              >
                View All Events →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {relatedEvents.slice(0, 3).map((relEvent) => (
                <EventCard
                  key={relEvent.slug}
                  {...toEventCardProps(relEvent)}
                  href={`/events/${relEvent.slug}`}
                  actionLabel="View Event"
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky action bar — hidden on desktop via lg:hidden */}
      <div className="lg:hidden">
        <EventActionBar event={event} />
      </div>
    </main>
  );
}
