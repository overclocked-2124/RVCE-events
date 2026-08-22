import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/src/bff/auth";
import { UserProfileBadge } from "@/src/components/auth/user-profile-badge";

export default async function ComingSoonPage() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  return (
    <main className="relative w-screen h-screen bg-[var(--bg-cobalt)] text-[var(--text-blush)] flex items-center justify-center select-none overflow-hidden">
      {/* Top Header */}
      <header className="absolute top-4 left-4 right-4 sm:top-7 sm:left-7 sm:right-7 md:top-9 md:left-9 md:right-9 lg:top-11 lg:left-11 lg:right-11 z-20 flex justify-between items-center pointer-events-none">
        {/* Top Left: RVCE Logo */}
        <div className="pointer-events-auto flex items-start">
          <Image
            src="/logos/rvce_logo_blush.png"
            alt="RVCE Logo"
            width={300}
            height={90}
            priority
            className="h-10 sm:h-14 md:h-18 w-auto block object-contain transition-opacity duration-300 hover:opacity-90"
          />
        </div>

        {/* Top Right: User Profile + Coding Club Logo */}
        <div className="pointer-events-auto flex items-center gap-3 sm:gap-6">
          <UserProfileBadge user={session} />
          <Image
            src="/logos/coding_club_logo_blush.png"
            alt="Coding Club RVCE Logo"
            width={300}
            height={120}
            priority
            className="h-[50px] sm:h-[70px] md:h-[85px] w-auto block object-contain transition-opacity duration-300 hover:opacity-90 hidden sm:block"
          />
        </div>
      </header>

      {/* Dead Center Display: COMING SOON */}
      <section className="relative flex flex-col items-center justify-center text-center z-10 w-full px-2 sm:px-4">
        <div className="flex flex-col items-center justify-center leading-none">
          {/* Line 1: COMING */}
          <div className="w-full flex items-center justify-center">
            <h1 className="font-aalto text-[36vw] sm:text-[23vw] md:text-[21vw] lg:text-[19vw] font-normal leading-[0.82] tracking-normal text-[var(--text-blush)] uppercase">
              COMING
            </h1>
          </div>

          {/* Line 2: SOON */}
          <div className="w-full flex items-center justify-center">
            <h2 className="font-aalto text-[36vw] sm:text-[23vw] md:text-[21vw] lg:text-[19vw] font-normal leading-[0.82] tracking-normal text-[var(--text-blush)] uppercase">
              SOON
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
}
