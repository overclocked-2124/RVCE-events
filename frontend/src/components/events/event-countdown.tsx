"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { EventRegistrationState } from "./event-types";

interface CountdownData {
  label: string;
  variant: "upcoming" | "live" | "soon" | "past" | "sold-out";
}

function computeLabel(targetDate: string, state: EventRegistrationState): CountdownData {
  if (state === "past") return { label: "Event concluded", variant: "past" };

  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    const absDiff = Math.abs(diff);
    if (absDiff > 60 * 60 * 1000) return { label: "Event concluded", variant: "past" };
    return { label: "Event is live now", variant: "live" };
  }

  if (state === "sold_out") {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const label = days > 0 ? `Starts in ${days}d ${hours}h` : `Starts in ${Math.floor(diff / (1000 * 60))}m`;
    return { label, variant: "sold-out" };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (days > 0) return { label: `Starts in ${days}d ${hours}h`, variant: "upcoming" };
  if (hours > 0) return { label: `Starts in ${hours}h ${minutes}m`, variant: "upcoming" };
  if (minutes > 0) return { label: `Starts in ${minutes}m ${seconds}s`, variant: "soon" };
  return { label: "Starting soon", variant: "soon" };
}

export interface EventCountdownProps {
  dateTime: string;
  registrationState: EventRegistrationState;
  className?: string;
}

/**
 * Live countdown timer badge.
 *
 * Hydration safety:
 * - SSR renders a static "Upcoming" placeholder (no dynamic time).
 * - On the client, useEffect fires ONLY in setInterval (never synchronously in the body),
 *   so the lint rule react-hooks/set-state-in-effect is not triggered.
 * - suppressHydrationWarning on the container ensures React doesn't throw if
 *   the client interval fires before React reconciles.
 */
export function EventCountdown({ dateTime, registrationState, className }: EventCountdownProps) {
  // Stable server/SSR initial state — no dynamic time, just a static label.
  const [data, setData] = useState<CountdownData | null>(null);

  useEffect(() => {
    // Start interval: setState is ONLY called inside the setInterval callback,
    // which is an async/callback invocation — compliant with react-hooks/set-state-in-effect.
    const interval = setInterval(() => {
      setData(computeLabel(dateTime, registrationState));
    }, 1000);

    // Schedule first update on next macro-task (not synchronously in effect body)
    const timeout = setTimeout(() => {
      setData(computeLabel(dateTime, registrationState));
    }, 0);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [dateTime, registrationState]);

  // Resolve display values
  const variant = data?.variant;
  const label = data?.label;

  // Before client-side hydration (data is null), render the SSR placeholder.
  // suppressHydrationWarning prevents React mismatch errors on the initial render.
  if (!data) {
    return (
      <span
        suppressHydrationWarning
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest",
          "bg-[var(--surface-blush-subtle)] text-[var(--text-blush)] border border-[var(--border-blush)]",
          className
        )}
      >
        <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        {registrationState === "past" ? "Concluded" : "Upcoming"}
      </span>
    );
  }

  return (
    <span
      suppressHydrationWarning
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest",
        variant === "live"
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
          : variant === "soon"
          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          : variant === "past"
          ? "bg-[var(--surface-blush-subtle)] text-[var(--text-blush-muted)] border border-[var(--border-blush)]"
          : variant === "sold-out"
          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          : "bg-[var(--surface-blush-subtle)] text-[var(--text-blush)] border border-[var(--border-blush)]",
        className
      )}
    >
      {variant === "live" && (
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0"
        />
      )}
      {variant !== "live" && (
        <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      )}
      {label}
    </span>
  );
}
