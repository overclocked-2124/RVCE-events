"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ScanLine,
  Search,
  UserCheck,
  Zap,
  Volume2,
  VolumeX,
  ChevronDown,
  Sparkles,
  Ticket,
  Users
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { ScanResultOverlay, ScanResultType } from "./scan-result-overlay";

const MOCK_VALID_TICKET = "RVCE-EVT-98213";
const MOCK_DUPLICATE_TICKET = "RVCE-EVT-00000";

const simulateScanSchema = z.object({
  ticketCode: z.string().min(1, "Ticket code required"),
});

type SimulateScanFormValues = z.infer<typeof simulateScanSchema>;

const manualUsnSchema = z.object({
  usn: z.string().min(1, "USN or Name required"),
});

export interface ScannerActiveViewProps {
  initialCheckedIn?: number;
  capacity?: number;
  eventTitle?: string;
  clubName?: string;
  gateName?: string;
}

export function ScannerActiveView({
  initialCheckedIn = 142,
  capacity = 200,
  eventTitle = "HackRVCE 2026",
  clubName = "Coding Club RVCE",
  gateName = "Gate 1",
}: ScannerActiveViewProps) {
  const [checkedIn, setCheckedIn] = useState(initialCheckedIn);
  const [scanResult, setScanResult] = useState<ScanResultType>(null);
  const [isManualExpanded, setIsManualExpanded] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const {
    register: registerSimulate,
    handleSubmit: handleSimulateSubmit,
    setValue: setSimulateValue,
    formState: { isSubmitting: isSimulating },
    reset: resetSimulate,
  } = useForm<SimulateScanFormValues>({
    resolver: zodResolver(simulateScanSchema),
    defaultValues: {
      ticketCode: "",
    },
  });

  const {
    register: registerManual,
    handleSubmit: handleManualSubmit,
    formState: { isSubmitting: isManualSubmitting },
    reset: resetManual,
  } = useForm<ManualUsnFormValues>({
    resolver: zodResolver(manualUsnSchema),
    defaultValues: {
      usn: "",
    },
  });

  const onSimulateScan = async (data: SimulateScanFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (data.ticketCode.trim() === MOCK_VALID_TICKET) {
      setScanResult("success");
      setCheckedIn((prev) => Math.min(prev + 1, capacity));
    } else if (data.ticketCode.trim() === MOCK_DUPLICATE_TICKET) {
      setScanResult("duplicate");
    } else {
      setScanResult("invalid");
    }
    resetSimulate();
  };

  const onManualCheckIn = async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setScanResult("success");
    setCheckedIn((prev) => Math.min(prev + 1, capacity));
    resetManual();
  };

  const attendancePercentage = Math.min(100, Math.round((checkedIn / capacity) * 100));

  return (
    <div className="flex flex-col min-h-dvh w-full bg-[var(--bg-cobalt)] text-[var(--text-blush)] relative select-none">
      <ScanResultOverlay
        result={scanResult}
        onDismiss={() => setScanResult(null)}
      />

      {/* Portal Header per Issue 32: Event title, organizing club badge, and Live Scanner active badge */}
      <header className="px-4 py-3.5 border-b border-[var(--border-blush)]/20 bg-[var(--surface-dark)] sticky top-0 z-20">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/rvce_logo_blush.png"
              alt="RVCE"
              className="h-7 w-auto object-contain"
            />
            <div className="h-4 w-[1px] bg-[var(--border-blush)]/40" />
            <div>
              <h1 className="font-aalto text-base sm:text-lg tracking-wide uppercase leading-tight text-[var(--text-blush)]">
                {eventTitle}
              </h1>
              <span className="text-[10px] text-[var(--text-blush-muted)] font-sans-editorial tracking-wider uppercase">
                {clubName} · {gateName}
              </span>
            </div>
          </div>

          {/* Live Scanner Active Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#10b981]/40 bg-[#10b981]/15 text-[#10b981]">
            <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-sans-editorial">
              Live Scanner
            </span>
          </div>
        </div>
      </header>

      {/* Main Scanner Body */}
      <main className="flex-1 flex flex-col items-center px-4 py-5 max-w-md mx-auto w-full z-10 space-y-4">

        {/* Viewfinder Card */}
        <div className="w-full bg-[var(--surface-dark)] rounded-2xl p-4 border border-[var(--border-blush)]/40 shadow-xl flex flex-col items-center">

          <div className="w-full flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[var(--text-blush-muted)] font-sans-editorial flex items-center gap-1.5">
              <ScanLine className="h-3.5 w-3.5 text-[var(--text-blush)]" />
              <span>Ticket Viewfinder</span>
            </span>

            {/* Quick Controls: Flashlight & Sound */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsFlashlightOn(!isFlashlightOn)}
                className={cn(
                  "p-1.5 rounded-lg border transition-all cursor-pointer",
                  isFlashlightOn
                    ? "bg-[var(--text-blush)] text-[var(--bg-cobalt)] border-[var(--text-blush)]"
                    : "bg-[var(--surface-blush-subtle)] text-[var(--text-blush)] border-[var(--border-blush)]/40"
                )}
                title="Toggle Torch / Flashlight"
              >
                <Zap className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsSoundOn(!isSoundOn)}
                className={cn(
                  "p-1.5 rounded-lg border transition-all cursor-pointer",
                  isSoundOn
                    ? "bg-[var(--surface-blush-subtle)] text-[var(--text-blush)] border-[var(--border-blush)]/40"
                    : "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40"
                )}
                title="Toggle Sound Effects"
              >
                {isSoundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Viewfinder Target Container */}
          <div className="w-full aspect-[4/3] max-h-[260px] bg-[var(--bg-cobalt)]/40 rounded-xl border border-[var(--border-blush)]/40 relative overflow-hidden flex items-center justify-center">

            {/* Viewfinder Reticle Corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--text-blush)] rounded-tl" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[var(--text-blush)] rounded-tr" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[var(--text-blush)] rounded-bl" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--text-blush)] rounded-br" />

            {/* Laser scanning beam */}
            <div className="absolute left-2 right-2 h-[2px] bg-[var(--text-blush)] shadow-[0_0_10px_1px_var(--text-blush)] animate-[scan_2.5s_ease-in-out_infinite]" />

            {/* Central scanning HUD */}
            <div className="flex flex-col items-center text-center px-4 py-2.5 rounded-xl bg-[var(--surface-dark)]/90 border border-[var(--border-blush)]/30 mx-4">
              <Sparkles className="h-4 w-4 text-[var(--text-blush)] mb-1" />
              <p className="text-xs font-semibold text-[var(--text-blush)] uppercase tracking-wider font-sans-editorial">
                Align QR Code Inside Box
              </p>
              <p className="text-[10px] text-[var(--text-blush-muted)] tracking-wider mt-0.5 font-mono">
                Auto-Detect Active
              </p>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes scan {
              0% { top: 12%; opacity: 0; }
              15% { opacity: 1; }
              85% { opacity: 1; }
              100% { top: 88%; opacity: 0; }
            }
          `}} />
        </div>

        {/* Live Attendance Counter Bar */}
        <div className="w-full bg-[var(--surface-dark)] rounded-2xl p-4 border border-[var(--border-blush)]/40 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-[var(--text-blush-muted)]" />
              <span className="text-[10px] sm:text-xs font-semibold text-[var(--text-blush-muted)] uppercase tracking-widest font-sans-editorial">
                Live Attendance
              </span>
            </div>
            <div className="text-xs font-bold font-mono text-[var(--text-blush)]">
              {attendancePercentage.toFixed(1)}%
            </div>
          </div>

          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-[var(--text-blush)] font-sans-editorial">
                Checked In: {checkedIn} / {capacity} ({attendancePercentage.toFixed(1)}%)
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[var(--bg-cobalt)] rounded-full overflow-hidden border border-[var(--border-blush)]/20">
            <div
              className="h-full bg-[var(--text-blush)] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>

        {/* Simulate Scan Controller */}
        <div className="w-full bg-[var(--surface-dark)] rounded-2xl p-4 border border-[var(--border-blush)]/40 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] sm:text-xs font-semibold text-[var(--text-blush-muted)] uppercase tracking-widest font-sans-editorial flex items-center gap-1.5">
              <Ticket className="h-3.5 w-3.5 text-[var(--text-blush)]" />
              <span>Simulate Scan</span>
            </span>
          </div>

          <form onSubmit={handleSimulateSubmit(onSimulateScan)} className="flex gap-2 mb-2.5">
            <input
              type="text"
              placeholder="e.g. RVCE-EVT-98213"
              {...registerSimulate("ticketCode")}
              className="flex-1 min-w-0 bg-[var(--bg-cobalt)]/40 border border-[var(--border-blush)] rounded-xl px-3 py-2 text-xs sm:text-sm text-[var(--text-blush)] placeholder:text-[var(--text-blush-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-blush-strong)] transition-all font-mono"
              disabled={isSimulating}
            />
            <Button
              type="submit"
              className="bg-[var(--text-blush)] text-[var(--bg-cobalt)] hover:bg-[var(--text-blush)]/90 px-4 rounded-xl font-semibold cursor-pointer shrink-0"
              isLoading={isSimulating}
            >
              {!isSimulating && "Test Scan"}
            </Button>
          </form>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-[var(--border-blush)]/20">
            <button
              type="button"
              onClick={() => setSimulateValue("ticketCode", MOCK_VALID_TICKET)}
              className="px-2 py-1 rounded bg-[var(--surface-blush-subtle)] hover:bg-[var(--surface-blush-muted)] border border-[var(--border-blush)]/40 text-[10px] text-[var(--text-blush)] font-mono transition-colors cursor-pointer"
            >
              Valid
            </button>
            <button
              type="button"
              onClick={() => setSimulateValue("ticketCode", MOCK_DUPLICATE_TICKET)}
              className="px-2 py-1 rounded bg-[var(--surface-blush-subtle)] hover:bg-[var(--surface-blush-muted)] border border-[var(--border-blush)]/40 text-[10px] text-[#f59e0b] font-mono transition-colors cursor-pointer"
            >
              Duplicate
            </button>
            <button
              type="button"
              onClick={() => setSimulateValue("ticketCode", "BAD-TICKET")}
              className="px-2 py-1 rounded bg-[var(--surface-blush-subtle)] hover:bg-[var(--surface-blush-muted)] border border-[var(--border-blush)]/40 text-[10px] text-[#ef4444] font-mono transition-colors cursor-pointer"
            >
              Invalid
            </button>
          </div>
        </div>

        {/* Manual USN Search Fallback */}
        <div className="w-full border border-[var(--border-blush)]/40 rounded-2xl bg-[var(--surface-dark)] overflow-hidden shadow-xl">
          <button
            type="button"
            onClick={() => setIsManualExpanded(!isManualExpanded)}
            className="w-full flex items-center justify-between p-3.5 bg-transparent text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-[var(--text-blush-muted)]" />
              <span className="text-xs font-semibold tracking-wide uppercase font-sans-editorial">
                Manual USN Search Fallback
              </span>
            </div>
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", isManualExpanded && "rotate-180")} />
          </button>

          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              isManualExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="p-3.5 pt-0 border-t border-[var(--border-blush)]/20">
                <p className="text-[11px] text-[var(--text-blush-muted)] mb-2.5 leading-relaxed font-sans-editorial">
                  Use this if a student&apos;s phone battery died or their QR code is unreadable.
                </p>
                <form onSubmit={handleManualSubmit(onManualCheckIn)} className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Enter Attendee USN / Name"
                    {...registerManual("usn")}
                    className="w-full bg-[var(--bg-cobalt)]/40 border border-[var(--border-blush)] rounded-xl px-3 py-2 text-xs sm:text-sm text-[var(--text-blush)] placeholder:text-[var(--text-blush-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-blush-strong)] transition-all uppercase font-mono"
                    disabled={isManualSubmitting}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[var(--text-blush)] text-[var(--bg-cobalt)] hover:bg-[var(--text-blush)]/90 rounded-xl font-semibold cursor-pointer py-2 text-xs"
                    isLoading={isManualSubmitting}
                  >
                    {!isManualSubmitting && (
                      <>
                        <UserCheck className="h-3.5 w-3.5 mr-1.5" />
                        Mark Present
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
