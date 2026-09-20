"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
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
    formState: { errors, isSubmitting },
  } = useForm<GateFormValues>({
    resolver: zodResolver(gateSchema),
    defaultValues: {
      passcode: "",
    },
  });

  const onSubmit = async (data: GateFormValues) => {
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (ALLOWED_DEMO_CODES.includes(data.passcode.trim().toUpperCase())) {
      onUnlock();
    } else {
      setError("Invalid gate passcode. Please contact your event coordinator.");
    }
  };

  return (
    <div
      className={cn(
        "min-h-dvh w-full bg-[var(--bg-cobalt)] text-[var(--text-blush)] p-4 sm:p-6 lg:p-8 select-none flex flex-col justify-between items-center",
        className
      )}
    >
      {/* Header with RVCE & Coding Club Logos */}
      <header className="w-full max-w-md flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/rvce_logo_blush.png"
            alt="RVCE Logo"
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </div>
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/coding_club_logo_blush.png"
            alt="Coding Club RVCE Logo"
            className="h-9 sm:h-12 w-auto object-contain"
          />
        </div>
      </header>

      {/* Main Gate Card */}
      <main className="w-full max-w-md z-10 my-auto py-6 flex flex-col justify-center">
        <div className="rounded-2xl sm:rounded-3xl bg-[var(--surface-dark)] p-6 sm:p-8 shadow-2xl border border-[var(--border-blush)]/40 flex flex-col items-center text-center">
          <h1 className="font-aalto text-3xl sm:text-4xl text-[var(--text-blush)] uppercase tracking-tight leading-none mb-2">
            Scanner Portal
          </h1>
          <p className="text-[var(--text-blush-muted)] text-xs sm:text-sm font-sans-editorial tracking-wider uppercase mb-6">
            Authorized Volunteers Only
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 text-left">
            <div className="space-y-1.5">
              <label
                htmlFor="passcode"
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[var(--text-blush-muted)] font-sans-editorial block px-1"
              >
                Event Gate Passcode
              </label>

              <div className="relative">
                <Input
                  id="passcode"
                  type="password"
                  placeholder="Enter volunteer passcode"
                  {...register("passcode")}
                  className="h-11 sm:h-12 pl-10 pr-10 font-mono tracking-wider text-xs sm:text-sm bg-[var(--bg-cobalt)]/40"
                  disabled={isSubmitting}
                />
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-blush-muted)] pointer-events-none" />
                <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-blush-muted)] opacity-60 pointer-events-none" />
              </div>

              {errors.passcode && (
                <p className="text-[var(--destructive)] text-xs font-medium mt-1">
                  {errors.passcode.message}
                </p>
              )}
              {error && (
                <div className="p-2.5 rounded-xl bg-[var(--destructive)]/15 border border-[var(--destructive)]/40 text-[var(--destructive)] text-xs font-medium text-center">
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
        </div>
      </main>

      {/* Bottom spacing to keep card centered */}
      <div className="h-8 sm:h-10 shrink-0" aria-hidden="true" />
    </div>
  );
}
