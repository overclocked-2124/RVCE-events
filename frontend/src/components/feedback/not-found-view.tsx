import React from "react";
import { ArrowLeft, Compass, MapPinOff } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export interface NotFoundViewProps {
  /** Destination of the primary CTA. */
  homeHref?: string;
  /** Destination of the outline CTA. */
  exploreHref?: string;
  className?: string;
}

/**
 * Presentational 404 screen. Kept free of next/link and next/image so it renders
 * identically inside Storybook (@storybook/react-vite) and the Next.js app.
 */
export function NotFoundView({
  homeHref = "/",
  exploreHref = "/",
  className,
}: NotFoundViewProps) {
  return (
    <main
      className={cn(
        "relative w-full h-dvh overflow-hidden bg-[var(--bg-cobalt)] text-[var(--text-blush)] flex items-center justify-center",
        className
      )}
    >
      {/* Header: RVCE mark, matching the landing page placement */}
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

      {/* Decorative floating icons — hidden from assistive tech */}
      <Compass
        aria-hidden="true"
        className="animate-float pointer-events-none absolute left-[6%] top-[24%] h-10 w-10 sm:h-16 sm:w-16 lg:h-24 lg:w-24 text-[var(--text-blush)] opacity-20"
        strokeWidth={1.25}
      />
      <MapPinOff
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute right-[7%] bottom-[22%] h-9 w-9 sm:h-14 sm:w-14 lg:h-20 lg:w-20 text-[var(--text-blush)] opacity-20"
        strokeWidth={1.25}
      />

      <section className="relative z-10 flex w-full flex-col items-center justify-center px-5 text-center sm:px-8">
        <h1 className="font-aalto text-[34vw] sm:text-[24vw] lg:text-[18vw] leading-[0.82] uppercase text-[var(--text-blush)]">
          404
        </h1>

        <h2 className="font-aalto mt-1 text-[9vw] sm:text-[6vw] lg:text-[4.2vw] leading-[0.9] uppercase text-[var(--text-blush)]">
          Lost on Campus
        </h2>

        <p className="mt-4 max-w-[34rem] text-sm leading-relaxed text-[var(--text-blush-muted)] sm:mt-5 sm:text-base">
          The page you are looking for might have been moved, deleted, or
          doesn&apos;t exist yet.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <Button variant="default" size="hero" render={<a href={homeHref} />}>
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            size="hero"
            className="rounded-full"
            render={<a href={exploreHref} />}
          >
            <Compass aria-hidden="true" className="h-4 w-4" />
            Explore Events
          </Button>
        </div>
      </section>
    </main>
  );
}
