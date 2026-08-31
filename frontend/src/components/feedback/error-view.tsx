"use client";

import React from "react";
import { ArrowLeft, RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

/** Shown instead of a raw exception message when the error is not safe to surface. */
export const GENERIC_ERROR_MESSAGE =
  "An unexpected error occurred while loading this page. Our team has been notified.";

/**
 * Runtime error messages can carry stack fragments, file paths, or minified
 * build noise. Surface a message only when it reads like a deliberate,
 * human-facing sentence; otherwise fall back to the generic copy.
 */
export function sanitizeErrorMessage(message?: string | null): string {
  if (!message) return GENERIC_ERROR_MESSAGE;

  const trimmed = message.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0 || trimmed.length > 160) return GENERIC_ERROR_MESSAGE;

  const looksTechnical =
    /(\bat\s+\w+\s*\(|https?:\/\/|[\\/][\w.-]+[\\/]|\.(tsx?|jsx?|mjs):\d+|node_modules|webpack|ENOENT|\bstack\b)/i.test(
      trimmed
    );

  return looksTechnical ? GENERIC_ERROR_MESSAGE : trimmed;
}

export interface ErrorViewProps {
  /** The caught error. Only `message` and `digest` are read. */
  error?: { message?: string; digest?: string };
  /** Next.js error-boundary reset callback. */
  reset?: () => void;
  /** Destination of the secondary CTA. */
  homeHref?: string;
  className?: string;
}

/**
 * Presentational runtime-error screen, shared by app/error.tsx and
 * app/global-error.tsx. Free of next/link and next/image so it renders in
 * Storybook (@storybook/react-vite) unchanged.
 */
export function ErrorView({ error, reset, homeHref = "/", className }: ErrorViewProps) {
  const message = sanitizeErrorMessage(error?.message);

  return (
    <main
      className={cn(
        "relative w-full min-h-dvh overflow-hidden bg-[var(--bg-cobalt)] text-[var(--text-blush)] flex items-center justify-center",
        className
      )}
    >
      <header className="absolute top-4 left-4 right-4 sm:top-7 sm:left-7 sm:right-7 lg:top-11 lg:left-11 lg:right-11 z-20 flex justify-between items-start pointer-events-none">
        <a href={homeHref} className="pointer-events-auto flex items-start" aria-label="RVCE Events home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/rvce_logo_blush.png"
            alt="RVCE Logo"
            className="h-10 sm:h-14 lg:h-22 w-auto block object-contain transition-opacity duration-300 hover:opacity-90"
          />
        </a>
      </header>

      <section className="relative z-10 flex w-full max-w-[46rem] flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <TriangleAlert
          aria-hidden="true"
          className="animate-float h-12 w-12 text-[var(--text-blush)] opacity-70 sm:h-16 sm:w-16"
          strokeWidth={1.25}
        />

        <h1 className="font-aalto mt-6 text-[12vw] sm:text-[8vw] lg:text-[5.4vw] leading-[0.88] uppercase text-[var(--text-blush)]">
          Something Went Wrong
        </h1>

        <p
          role="alert"
          className="mt-4 max-w-[34rem] text-sm leading-relaxed text-[var(--text-blush-muted)] sm:mt-5 sm:text-base"
        >
          {message}
        </p>

        {error?.digest && (
          <p className="font-sans-editorial mt-3 text-[0.65rem] uppercase text-[var(--text-blush-muted)]">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <Button variant="default" size="hero" onClick={reset} disabled={!reset}>
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            size="hero"
            className="rounded-full"
            render={<a href={homeHref} />}
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to Safety
          </Button>
        </div>
      </section>
    </main>
  );
}
