"use client";

import React from "react";
import Image from "next/image";
import { GoogleSignInButton } from "@/src/components/auth/google-sign-in-button";
import { DevAuthPanel } from "@/src/components/auth/dev-auth-panel";
import { UserProfileBadge } from "@/src/components/auth/user-profile-badge";

export default function HomePage() {
  return (
    <main className="relative flex h-screen w-screen select-none items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Top Header */}
      <header className="absolute left-4 right-4 top-4 z-20 flex items-start justify-between sm:left-7 sm:right-7 sm:top-7 md:left-9 md:right-9 md:top-9 lg:left-11 lg:right-11">
        {/* RVCE Logo */}
        <div className="flex items-start">
          <Image
            src="/logos/rvce_logo_blush.png"
            alt="RVCE Logo"
            width={2330}
            height={1001}
            priority
            className="block h-10 w-auto object-contain transition-opacity duration-300 hover:opacity-90 sm:h-14 md:h-18 lg:h-22"
          />
        </div>

        {/* Coding Club Logo */}
      {/* Coding Club Logo + Profile */}
<div className="flex items-start gap-4">
  <Image
    src="/logos/coding_club_logo_blush.png"
    alt="Coding Club RVCE Logo"
    width={1913}
    height={1372}
    priority
    className="block h-[55px] w-auto object-contain transition-opacity duration-300 hover:opacity-90 sm:h-[75px] md:h-[95px] lg:h-[120px]"
  />

  <UserProfileBadge />
</div>
      </header>

      {/* Coming Soon + Sign In */}
      <section className="relative z-10 flex w-full flex-col items-center justify-center px-2 text-center sm:px-4">
        <div className="flex flex-col items-center justify-center leading-none">
          <div className="flex w-full items-center justify-center">
            <h1 className="font-aalto text-[30vw] font-normal uppercase leading-[0.82] tracking-normal text-foreground sm:text-[19vw] md:text-[17vw] lg:text-[16vw]">
              COMING
            </h1>
          </div>

          <div className="flex w-full items-center justify-center">
            <h2 className="font-aalto text-[30vw] font-normal uppercase leading-[0.82] tracking-normal text-foreground sm:text-[19vw] md:text-[17vw] lg:text-[16vw]">
              SOON
            </h2>
          </div>
        </div>

        {/* RVCE Mail Sign In */}
        <div className="mt-8">
          <GoogleSignInButton size="md" />
        </div>
      </section>

      {/* Development-only mock authentication */}
      <DevAuthPanel />
    </main>
  );
}
