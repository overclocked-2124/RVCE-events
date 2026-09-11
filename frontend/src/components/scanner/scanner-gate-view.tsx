"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldCheck, ArrowRight, Sparkles, KeyRound } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

const gateSchema = z.object({
  passcode: z.string().min(1, "Passcode is required"),
});

type GateFormValues = z.infer<typeof gateSchema>;

const ALLOWED_DEMO_CODES = ["SCAN2026", "DEMO2026"];

export interface ScannerGateViewProps {
  onUnlock: () => void;
  className?: string;
}

export function ScannerGateView({ onUnlock, className }: ScannerGateViewProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<GateFormValues>({
    resolver: zodResolver(gateSchema),
    defaultValues: {
      passcode: "",
    },
  });

  const onSubmit = async (data: GateFormValues) => {
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (ALLOWED_DEMO_CODES.includes(data.passcode.trim().toUpperCase())) {
      onUnlock();
    } else {
      setError("Invalid passcode. Use demo: SCAN2026");
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 h-[100dvh] max-h-[100dvh] w-full bg-[var(--bg-cobalt)] text-[var(--text-blush)] p-3.5 sm:p-6 lg:p-8 select-none overflow-hidden flex flex-col justify-between items-center",
        className
      )}
    >
      {/* Header with RVCE & Coding Club Logos */}
      <header className="w-full max-w-4xl flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/rvce_logo_blush.png"
            alt="RVCE Logo"
            className="h-8 sm:h-12 w-auto object-contain"
          />
        </div>
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/coding_club_logo_blush.png"
            alt="Coding Club RVCE Logo"
            className="h-9 sm:h-14 w-auto object-contain"
          />
        </div>
      </header>

      {/* Main Gate Card - Scaled for compact mobile viewports */}
      <main className="w-full max-w-md z-10 my-auto py-1 sm:py-2 flex flex-col justify-center">
        <div className="rounded-2xl sm:rounded-3xl bg-[var(--surface-dark)] p-5 sm:p-8 shadow-2xl border border-[var(--border-blush)]/40 flex flex-col items-center text-center">
          
          {/* Brand pill badge */}
          <div className="mb-3 sm:mb-5">
            <span className="pill-badge text-[9px] sm:text-xs py-0.5 sm:py-1 px-3 sm:px-4 gap-1 sm:gap-1.5 border-[var(--border-blush)] text-[var(--text-blush)]">
              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[var(--text-blush)]" />
              <span>Door Access Control</span>
            </span>
          </div>

          <h1 className="font-aalto text-2xl sm:text-4xl text-[var(--text-blush)] uppercase tracking-tight leading-none mb-1 sm:mb-2">
            Scanner Portal
          </h1>
          <p className="text-[var(--text-blush-muted)] text-[11px] sm:text-sm font-sans-editorial tracking-wider uppercase mb-3.5 sm:mb-6">
            Authorized Volunteers Only
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3 sm:space-y-4 text-left">
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label
                  htmlFor="passcode"
                  className="text-[9px] sm:text-xs font-semibold uppercase tracking-widest text-[var(--text-blush-muted)] font-sans-editorial"
                >
                  Event Gate Passcode
                </label>
                <button
                  type="button"
                  onClick={() => setValue("passcode", "SCAN2026")}
                  className="text-[9px] sm:text-[10px] text-[var(--text-blush)] hover:underline cursor-pointer"
                >
                  Auto-fill Demo PIN
                </button>
              </div>

              <div className="relative">
                <input
                  id="passcode"
                  type="password"
                  placeholder="Enter passcode (e.g. SCAN2026)"
                  {...register("passcode")}
                  className="w-full bg-[var(--bg-cobalt)]/40 border border-[var(--border-blush)] rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 pl-9 sm:pl-10 text-xs sm:text-sm text-[var(--text-blush)] placeholder:text-[var(--text-blush-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--border-blush-strong)] transition-all font-mono tracking-wider"
                  disabled={isSubmitting}
                />
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--text-blush-muted)]" />
                <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-[var(--text-blush-muted)] opacity-60" />
              </div>

              {errors.passcode && (
                <p className="text-[#ef4444] text-xs font-medium mt-1">
                  {errors.passcode.message}
                </p>
              )}
              {error && (
                <div className="p-2 sm:p-2.5 rounded-xl bg-[#ef4444]/15 border border-[#ef4444]/40 text-[#ef4444] text-xs font-medium text-center">
                  {error}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 bg-[var(--text-blush)] text-[var(--bg-cobalt)] hover:bg-[var(--text-blush)]/90 font-semibold tracking-wide rounded-xl cursor-pointer shadow-lg transition-all text-xs sm:text-sm"
              isLoading={isSubmitting}
            >
              {!isSubmitting && (
                <>
                  Unlock Scanner
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-3.5 sm:mt-6 pt-2.5 sm:pt-4 border-t border-[var(--border-blush)]/20 w-full text-center">
            <p className="text-[9px] sm:text-[10px] text-[var(--text-blush-muted)] uppercase tracking-widest font-sans-editorial">
              HackRVCE 2026 · Gate 1
            </p>
          </div>
        </div>
      </main>

      {/* Footer System Status - Always visible without scroll */}
      <footer className="w-full max-w-4xl flex items-center justify-between text-[9px] sm:text-xs text-[var(--text-blush-muted)] z-10 font-sans-editorial uppercase tracking-wider shrink-0 pb-1">
        <span>RVCE Events</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
          Scanner Online
        </span>
      </footer>
    </div>
  );
}
