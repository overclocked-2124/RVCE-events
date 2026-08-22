import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/src/bff/auth";
import { GoogleSignInButton } from "@/src/components/auth/google-sign-in-button";
import { DevAuthPanel } from "@/src/components/auth/dev-auth-panel";
import { Sparkles, ShieldCheck } from "lucide-react";

export default async function HomePage() {
  const session = await getSession();
  if (session) {
    redirect("/coming-soon");
  }

  const isDev = process.env.NODE_ENV !== "production";

  return (
    <main className="relative w-screen min-h-screen bg-[var(--bg-cobalt)] text-[var(--text-blush)] flex flex-col justify-between select-none overflow-x-hidden">
      {/* Top Header */}
      <header className="w-full px-6 py-6 sm:px-10 sm:py-8 flex justify-between items-start z-20">
        {/* Top Left: RVCE Logo */}
        <div className="flex items-start">
          <Image
            src="/logos/rvce_logo_blush.png"
            alt="RVCE Logo"
            width={300}
            height={90}
            priority
            className="h-10 sm:h-14 md:h-18 w-auto block object-contain transition-opacity duration-300 hover:opacity-90"
          />
        </div>

        {/* Top Right: Coding Club Logo */}
        <div className="flex items-start">
          <Image
            src="/logos/coding_club_logo_blush.png"
            alt="Coding Club RVCE Logo"
            width={300}
            height={120}
            priority
            className="h-[55px] sm:h-[75px] md:h-[95px] w-auto block object-contain transition-opacity duration-300 hover:opacity-90"
          />
        </div>
      </header>

      {/* Hero Section & Sign In */}
      <section className="relative flex flex-col items-center justify-center text-center z-10 w-full px-4 my-auto py-12">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 pill-badge mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Season 2026</span>
          </div>

          {/* Main Title in Aalto Display */}
          <h1 className="font-aalto text-5xl sm:text-7xl md:text-8xl tracking-normal text-[var(--text-blush)] mb-4 uppercase leading-[0.88]">
            RVCE EVENTS
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-[var(--text-blush-muted)] font-normal max-w-lg mb-10 leading-relaxed font-sans">
            Hackathons, Workshops, Technical Symposiums & AICTE Activity Points for RVCE Students.
          </p>

          {/* Sign In CTA */}
          <div className="flex flex-col items-center gap-4 w-full sm:w-auto mb-8">
            <GoogleSignInButton size="lg" className="w-full sm:w-auto" />

            <div className="flex items-center gap-1.5 text-xs text-[var(--text-blush-muted)]">
              <ShieldCheck className="w-4 h-4 text-[var(--text-blush)]" />
              <span>Strictly restricted to official @rvce.edu.in accounts</span>
            </div>
          </div>

          {/* Dev Mock Auth Panel (Visible only in development) */}
          {isDev && <DevAuthPanel className="mt-4" />}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 py-6 sm:px-10 flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--text-blush-muted)] z-20 gap-2">
        <span>© 2026 Coding Club RVCE. All rights reserved.</span>
        <span className="font-mono text-[11px] tracking-wider uppercase">R.V. College of Engineering</span>
      </footer>
    </main>
  );
}
