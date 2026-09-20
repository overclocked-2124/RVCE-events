"use client";

import React, { useEffect } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Award } from "lucide-react";
import { cn } from "@/src/lib/utils";

export type ScanResultType = "success" | "duplicate" | "invalid" | null;

export interface ScanResultOverlayProps {
  result: ScanResultType;
  attendee?: {
    name: string;
    usn: string;
  };
  onDismiss: () => void;
  autoDismiss?: boolean;
}

export function ScanResultOverlay({
  result,
  attendee,
  onDismiss,
  autoDismiss = true,
}: ScanResultOverlayProps) {
  // Auto-dismiss after 3 seconds if enabled
  useEffect(() => {
    if (result && autoDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [result, onDismiss, autoDismiss]);

  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div 
        className={cn(
          "w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center text-center",
          {
            "bg-[var(--chart-emerald)] text-white": result === "success",
            "bg-[var(--chart-amber)] text-white": result === "duplicate",
            "bg-[var(--destructive)] text-white": result === "invalid",
          }
        )}
      >
        {result === "success" && (
          <>
            <CheckCircle2 className="h-16 w-16 mb-4 animate-bounce" />
            <h2 className="font-aalto text-3xl uppercase mb-2">Checked In</h2>
            <p className="text-xl font-bold tracking-tight mb-2">
              {attendee?.name || "Ananya"} ({attendee?.usn || "1RV22CS045"})
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/30">
              <Award className="h-5 w-5" />
              <span className="text-sm font-bold tracking-wide uppercase">
                +10 AICTE Points Credited
              </span>
            </div>
          </>
        )}

        {result === "duplicate" && (
          <>
            <AlertTriangle className="h-16 w-16 mb-4" />
            <h2 className="font-aalto text-3xl uppercase mb-2">Already Checked In</h2>
            <p className="text-base font-medium opacity-95">
              This ticket has already been recorded.
            </p>
          </>
        )}

        {result === "invalid" && (
          <>
            <XCircle className="h-16 w-16 mb-4" />
            <h2 className="font-aalto text-3xl uppercase mb-2">Invalid Ticket</h2>
            <p className="text-base font-medium opacity-95">
              Unrecognized or invalid ticket code.
            </p>
          </>
        )}
      </div>

      <p className="text-white/70 text-xs mt-6 font-sans-editorial tracking-widest uppercase cursor-pointer">
        Tap anywhere to dismiss
      </p>
      
      {/* Invisible overlay for tap-to-dismiss */}
      <div 
        className="absolute inset-0 -z-10 cursor-pointer" 
        onClick={onDismiss}
        aria-hidden="true"
      />
    </div>
  );
}
