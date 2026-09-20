"use client";

import React from "react";
import { Tabs } from "@base-ui/react/tabs";
import { TicketIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { CancelRegistrationDialog } from "./cancel-registration-dialog";
import { TicketPassCard } from "./ticket-pass-card";
import { partitionTickets, type Ticket } from "./types";

function TabTrigger({
  value,
  label,
  count,
}: {
  value: string;
  label: string;
  count: number;
}) {
  return (
    <Tabs.Tab
      value={value}
      className={cn(
        "-mb-px cursor-pointer border-b-2 border-transparent px-1 pb-3",
        "font-[family-name:var(--font-space-grotesk)] text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap",
        "text-[var(--text-blush-muted)] transition-colors duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:text-[var(--text-blush)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--border-blush-strong)]",
        // `data-active` is Base UI's own attribute for the selected tab, so the
        // selected style follows the library's state instead of local state.
        "data-[active]:text-[var(--text-blush)]"
      )}
    >
      {label}
      <span className="ml-2 rounded-full bg-[var(--surface-blush-subtle)] px-1.5 py-0.5 text-[0.65rem]">
        {count}
      </span>
    </Tabs.Tab>
  );
}

function EmptyState({
  title,
  description,
  browseHref,
}: {
  title: string;
  description: string;
  browseHref: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-[var(--border-blush)] px-6 py-14 text-center">
      <TicketIcon aria-hidden="true" className="size-10 text-[var(--text-blush-muted)]" />
      <div className="space-y-1.5">
        <p className="font-aalto text-2xl text-[var(--text-blush)]">{title}</p>
        <p className="mx-auto max-w-sm text-sm text-[var(--text-blush-muted)]">{description}</p>
      </div>
      {/* `nativeButton={false}`: the rendered element is an anchor, not a
          <button>, which Base UI needs told explicitly. */}
      <Button variant="default" nativeButton={false} render={<a href={browseHref} />}>
        Browse Events
      </Button>
    </div>
  );
}

interface MyTicketsViewProps {
  tickets: readonly Ticket[];
  /**
   * Reference time for splitting upcoming from past. Injectable so stories
   * render the same split forever instead of drifting with the wall clock.
   */
  now?: Date;
  /** Where the empty state sends the student. */
  browseHref?: string;
  className?: string;
}

/**
 * Student dashboard for registrations (PRD Epic 5: REG-04).
 *
 * Holds the two pieces of state the dashboard owns: which registrations have
 * been cancelled in this session, and which one is awaiting confirmation. A
 * single dialog instance serves the whole list rather than one per card.
 */
export function MyTicketsView({
  tickets,
  now,
  browseHref = "/events",
  className,
}: MyTicketsViewProps) {
  const [cancelledIds, setCancelledIds] = React.useState<ReadonlySet<string>>(
    () => new Set<string>()
  );
  const [pendingTicket, setPendingTicket] = React.useState<Ticket | null>(null);

  // Cancellations are overlaid onto the incoming data rather than copied into
  // state, so the list still tracks its props. There is no backend to persist
  // to, so the change lives only for this session.
  const resolvedTickets = React.useMemo(
    () =>
      tickets.map((ticket) =>
        cancelledIds.has(ticket.id) ? { ...ticket, status: "CANCELLED" as const } : ticket
      ),
    [tickets, cancelledIds]
  );

  const { upcoming, past } = React.useMemo(
    () => partitionTickets(resolvedTickets, now),
    [resolvedTickets, now]
  );

  const handleConfirmCancel = React.useCallback((ticket: Ticket) => {
    setCancelledIds((previous) => new Set(previous).add(ticket.id));
  }, []);

  return (
    <section className={cn("mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14", className)}>
      <header className="space-y-3">
        <h1 className="font-aalto text-4xl text-[var(--text-blush)] sm:text-5xl">My Tickets</h1>
        <p className="max-w-xl text-sm text-[var(--text-blush-muted)] sm:text-base">
          Your registrations, digital passes and event history — all in one place.
        </p>
      </header>

      <Tabs.Root defaultValue="upcoming" className="mt-9">
        <Tabs.List className="relative flex gap-7 border-b border-[var(--border-blush)]">
          <TabTrigger value="upcoming" label="Upcoming Tickets" count={upcoming.length} />
          <TabTrigger value="past" label="Past Registrations" count={past.length} />
          {/* Base UI publishes the active tab's geometry as CSS variables, so the
              underline slides between tabs without any measurement code here. */}
          <Tabs.Indicator
            className={cn(
              "absolute bottom-0 left-[var(--active-tab-left)] h-0.5 w-[var(--active-tab-width)]",
              "bg-[var(--border-blush-strong)] transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            )}
          />
        </Tabs.List>

        <Tabs.Panel value="upcoming" className="pt-7 outline-none">
          {upcoming.length > 0 ? (
            <ul className="space-y-5">
              {upcoming.map((ticket) => (
                <li key={ticket.id}>
                  <TicketPassCard ticket={ticket} onCancelRequest={setPendingTicket} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="No upcoming tickets"
              description="You have not registered for any upcoming events yet. Browse what's on and grab your seat."
              browseHref={browseHref}
            />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="past" className="pt-7 outline-none">
          {past.length > 0 ? (
            <ul className="space-y-5">
              {past.map((ticket) => (
                <li key={ticket.id}>
                  {/* A seat at an event that has already happened cannot be released. */}
                  <TicketPassCard ticket={ticket} showCancelAction={false} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="No past registrations"
              description="Once you attend an event, your ticket history will appear here."
              browseHref={browseHref}
            />
          )}
        </Tabs.Panel>
      </Tabs.Root>

      <CancelRegistrationDialog
        ticket={pendingTicket}
        open={pendingTicket !== null}
        onOpenChange={(open) => {
          if (!open) setPendingTicket(null);
        }}
        onConfirm={handleConfirmCancel}
      />
    </section>
  );
}
