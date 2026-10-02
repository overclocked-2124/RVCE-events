"use client";

import React from "react";
import Image from "next/image";
import { CalendarDays, Clock3, MapPin, Sparkles, Ticket } from "lucide-react";
import { GoogleSignInButton } from "@/src/components/auth/google-sign-in-button";
import { DevAuthPanel } from "@/src/components/auth/dev-auth-panel";
import { UserProfileBadge } from "@/src/components/auth/user-profile-badge";

export default function HomePage() {
  return (
    <main className="relative flex h-screen w-screen select-none items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Top Header */}
      <header className="landing-header absolute left-4 right-4 top-4 z-40 flex items-start justify-between sm:left-7 sm:right-7 sm:top-7 md:left-9 md:right-9 md:top-9 lg:left-11 lg:right-11">
        {/* RVCE Logo */}
        <div className="flex flex-col items-start gap-6 sm:gap-8">
          <Image
            src="/logos/rvce_logo_blush.png"
            alt="RVCE Logo"
            width={2330}
            height={1001}
            priority
            className="block h-10 w-auto object-contain transition-opacity duration-300 hover:opacity-90 sm:h-14 md:h-18 lg:h-22"
          />

          <Image
            src="/logos/coding_club_logo_blush.png"
            alt="Coding Club RVCE Logo"
            width={1913}
            height={1372}
            priority
            className="block h-10 w-auto object-contain transition-opacity duration-300 hover:opacity-90 sm:h-14 md:h-18 lg:h-22"
          />
        </div>

        <UserProfileBadge />
      </header>

      {/* Coming Soon reveal */}
      <section className="reveal-content relative z-10 flex w-full flex-col items-center justify-center px-2 text-center sm:px-4">
        <div className="orbit-field" aria-hidden="true">
          <CalendarDays className="orbit-icon orbit-icon-one" strokeWidth={1.5} />
          <Ticket className="orbit-icon orbit-icon-two" strokeWidth={1.5} />
          <Sparkles className="orbit-icon orbit-icon-three" strokeWidth={1.5} />
          <MapPin className="orbit-icon orbit-icon-four" strokeWidth={1.5} />
          <Clock3 className="orbit-icon orbit-icon-five" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col items-center justify-center leading-none">
          <div className="flex w-full items-center justify-center">
            <h1 className="font-aalto text-[24vw] font-normal uppercase leading-[0.82] tracking-normal text-foreground sm:text-[15vw] md:text-[13vw] lg:text-[12vw]">
              COMING
            </h1>
          </div>

          <div className="flex w-full items-center justify-center">
            <h2 className="font-aalto text-[24vw] font-normal uppercase leading-[0.82] tracking-normal text-foreground sm:text-[15vw] md:text-[13vw] lg:text-[12vw]">
              SOON
            </h2>
          </div>
        </div>

        <div className="landing-sign-in mt-8 sm:mt-10">
          <GoogleSignInButton size="lg" className="px-8 py-4 text-base shadow-[0_0_2rem_var(--surface-blush-muted)] sm:px-10" />
        </div>
      </section>

      <div className="paper-reveal" aria-hidden="true">
        <div className="paper-half paper-half-left" />
        <div className="paper-half paper-half-right" />
      </div>

      {/* Development-only mock authentication */}
      <DevAuthPanel />
    </main>
  );
}
