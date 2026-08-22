import React from "react";
import Image from "next/image";
import { AuthErrorCard } from "@/src/components/auth/auth-error-card";

interface AuthErrorPageProps {
  searchParams: Promise<{ reason?: string }>;
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const resolvedSearchParams = await searchParams;
  const reason = resolvedSearchParams.reason || "unauthorized_domain";

  return (
    <main className="relative w-screen min-h-screen bg-[var(--bg-cobalt)] text-[var(--text-blush)] flex flex-col justify-between select-none overflow-x-hidden p-4 sm:p-8">
      {/* Top Header */}
      <header className="w-full flex justify-between items-start z-20">
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

      {/* Dead Center: Auth Error Card */}
      <section className="relative flex flex-col items-center justify-center text-center z-10 w-full my-auto py-8">
        <AuthErrorCard reason={reason} />
      </section>

      {/* Footer */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--text-blush-muted)] z-20 gap-2">
        <span>© 2026 Coding Club RVCE. All rights reserved.</span>
        <span className="font-mono text-[11px] tracking-wider uppercase">Institutional Access Firewall</span>
      </footer>
    </main>
  );
}
