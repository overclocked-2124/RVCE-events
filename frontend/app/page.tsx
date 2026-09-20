import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative w-screen h-[100dvh] bg-[var(--bg-cobalt)] text-[var(--text-blush)] flex flex-col justify-between select-none overflow-hidden p-6 sm:p-10 md:p-12 lg:p-16">
      {/* Top Header: RVCE Logo only */}
      <header className="w-full z-20 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/logos/rvce_logo_blush.png"
            alt="RVCE Logo"
            width={2330}
            height={1001}
            priority
            className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto object-contain transition-opacity duration-300 hover:opacity-85"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto px-4">
        {/* Institutional Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 sm:mb-8 text-[var(--text-blush)] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[var(--text-blush)] shrink-0" />
          <span>RV College of Engineering &bull; Campus Events</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-aalto text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[var(--text-blush)] uppercase mb-5 sm:mb-7">
          THE CENTRAL HUB FOR RVCE EVENTS
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--text-blush-muted)] max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10">
          Discover hackathons, technical workshops, and cultural fests across 80+ campus clubs. Standardized registrations, instant QR check-ins, and seamless AICTE activity points tracking.
        </p>

        {/* Prominent CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/coming-soon"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-[var(--text-blush)] text-[var(--bg-cobalt)] font-medium text-sm sm:text-base transition-all duration-200 hover:bg-[var(--text-blush)]/90 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-cobalt)] shadow-lg group"
          >
            <span>Sign in with RVCE Mail</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer / Sub-indicator */}
      <footer className="w-full z-10 flex justify-center text-center px-4 text-xs text-[var(--text-blush-muted)]">
        <span>Autonomous Institution affiliated to VTU &bull; Approved by AICTE</span>
      </footer>
    </main>
  );
}
