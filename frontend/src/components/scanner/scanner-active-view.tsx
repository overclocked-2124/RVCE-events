"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ScanLine,
  UserCheck,
  Users,
  QrCode
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { ScanResultOverlay, ScanResultType } from "./scan-result-overlay";

const markViaCodeSchema = z.object({
  code: z.string().min(1, "Ticket code or USN is required"),
});

type MarkViaCodeFormValues = z.infer<typeof markViaCodeSchema>;

export interface ScannerActiveViewProps {
  initialCheckedIn?: number;
  capacity?: number;
}

export function ScannerActiveView({
  initialCheckedIn = 142,
  capacity = 200,
}: ScannerActiveViewProps) {
  const [checkedIn, setCheckedIn] = useState(initialCheckedIn);
  const [scanResult, setScanResult] = useState<ScanResultType>(null);
  const [attendeeInfo, setAttendeeInfo] = useState<{ name: string; usn: string }>({
    name: "Ananya",
    usn: "1RV22CS045",
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<MarkViaCodeFormValues>({
    resolver: zodResolver(markViaCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onMarkViaCode = async (data: MarkViaCodeFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const trimmed = data.code.trim().toUpperCase();

    if (trimmed === "RVCE-EVT-00000" || trimmed === "DUPLICATE") {
      setScanResult("duplicate");
    } else if (trimmed === "INVALID" || trimmed === "BAD-TICKET") {
      setScanResult("invalid");
    } else {
      const isUsn = /^1RV\d{2}[A-Z]{2}\d{3}$/i.test(trimmed);
      setAttendeeInfo({
        name: isUsn ? "Student Attendee" : "Ananya",
        usn: isUsn ? trimmed : "1RV22CS045",
      });
      setScanResult("success");
      setCheckedIn((prev) => Math.min(prev + 1, capacity));
    }
    reset();
  };

  const attendancePercentage = Math.min(100, Math.round((checkedIn / capacity) * 100));

  return (
    <div className="flex flex-col min-h-dvh w-full bg-[var(--bg-cobalt)] text-[var(--text-blush)] relative select-none">
      <ScanResultOverlay
        result={scanResult}
        attendee={attendeeInfo}
        onDismiss={() => setScanResult(null)}
      />

      {/* Header with RVCE & Coding Club Logos */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between px-4 pt-4 sm:pt-6 z-10 shrink-0">
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

      {/* Main Scanner Body */}
      <main className="flex-1 flex flex-col items-center px-4 py-4 max-w-md mx-auto w-full z-10 space-y-4">

        {/* Viewfinder Card */}
        <div className="w-full bg-[var(--surface-dark)] rounded-2xl p-4 border border-[var(--border-blush)]/40 shadow-xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[var(--text-blush-muted)] font-sans-editorial flex items-center gap-1.5">
              <ScanLine className="h-3.5 w-3.5 text-[var(--text-blush)]" />
              <span>Ticket Viewfinder</span>
            </span>
          </div>

          {/* Viewfinder Target Container */}
          <div className="w-full aspect-[4/3] max-h-[240px] bg-[var(--bg-cobalt)]/40 rounded-xl border border-[var(--border-blush)]/40 relative overflow-hidden flex items-center justify-center">
            {/* Viewfinder Reticle Corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[var(--text-blush)] rounded-tl" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[var(--text-blush)] rounded-tr" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[var(--text-blush)] rounded-bl" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[var(--text-blush)] rounded-br" />

            <div className="flex flex-col items-center text-center px-4 py-2 text-[var(--text-blush-muted)]">
              <ScanLine className="h-8 w-8 text-[var(--text-blush)]/50 mb-2" />
              <p className="text-xs font-medium font-sans-editorial uppercase tracking-wider text-[var(--text-blush-muted)]">
                Point Camera at Ticket QR Code
              </p>
            </div>
          </div>
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
                Checked In: {checkedIn} / {capacity}
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

        {/* Mark via Code Fallback */}
        <div className="w-full bg-[var(--surface-dark)] rounded-2xl p-4 border border-[var(--border-blush)]/40 shadow-xl">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] sm:text-xs font-semibold text-[var(--text-blush)] uppercase tracking-widest font-sans-editorial flex items-center gap-1.5">
              <QrCode className="h-3.5 w-3.5 text-[var(--text-blush)]" />
              <span>Mark via Code</span>
            </span>
            <span className="text-[9px] text-[var(--text-blush-muted)] font-mono">
              Manual Check-In
            </span>
          </div>

          <p className="text-[11px] text-[var(--text-blush-muted)] mb-3 leading-relaxed px-1">
            Enter ticket code or USN if QR code cannot be scanned:
          </p>

          <form onSubmit={handleSubmit(onMarkViaCode)} className="space-y-2.5">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ticket code or USN (e.g. 1RV22CS045)"
                {...register("code")}
                className="flex-1 uppercase font-mono text-xs sm:text-sm h-10 bg-[var(--bg-cobalt)]/40"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                className="bg-[var(--text-blush)] text-[var(--bg-cobalt)] hover:bg-[var(--text-blush)]/90 h-10 px-4 rounded-xl font-semibold cursor-pointer shrink-0 text-xs sm:text-sm"
                isLoading={isSubmitting}
              >
                {!isSubmitting && (
                  <>
                    <UserCheck className="h-3.5 w-3.5 mr-1" />
                    Check In
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
