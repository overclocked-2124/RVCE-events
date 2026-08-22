"use client";

import React, { useState } from "react";
import { UserCheck, ShieldX, ChevronDown, ChevronUp, Terminal } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface DevAuthPanelProps {
  className?: string;
}

export function DevAuthPanel({ className }: DevAuthPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const focusRing =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-cobalt)]";

  return (
    <div
      className={cn(
        "max-w-md w-full mx-auto bg-[rgba(30,27,75,0.75)] border border-[rgba(253,205,215,0.25)] rounded-2xl p-4 backdrop-blur-md text-[var(--text-blush)] transition-all duration-200",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="dev-auth-panel-content"
        className={cn(
          "w-full flex items-center justify-between text-xs font-semibold tracking-wider text-[var(--text-blush-muted)] hover:text-[var(--text-blush)] uppercase transition-colors rounded-lg px-1 py-1",
          focusRing
        )}
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span>[DEV MODE] Mock Sign-In Profiles</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          id="dev-auth-panel-content"
          role="region"
          aria-label="Mock Sign-In Profiles"
          className="mt-4 flex flex-col gap-2 pt-3 border-t border-[rgba(253,205,215,0.15)] text-left"
        >
          <p className="text-[11px] text-[var(--text-blush-muted)] leading-relaxed mb-1">
            Test authentication and domain protection flows without configuring Google Cloud keys:
          </p>

          <a
            href="/api/auth/mock?profile=student"
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-xl bg-[rgba(253,205,215,0.1)] hover:bg-[rgba(253,205,215,0.2)] text-xs transition-colors",
              focusRing
            )}
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span className="font-semibold text-[var(--text-blush)]">Ananya Sharma (Student)</span>
            </div>
            <span className="font-mono text-[10px] text-[var(--text-blush-muted)]">ananya.cs23@rvce.edu.in</span>
          </a>

          <a
            href="/api/auth/mock?profile=faculty"
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-xl bg-[rgba(253,205,215,0.1)] hover:bg-[rgba(253,205,215,0.2)] text-xs transition-colors",
              focusRing
            )}
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span className="font-semibold text-[var(--text-blush)]">Dr. K. N. Subramanya (Faculty)</span>
            </div>
            <span className="font-mono text-[10px] text-[var(--text-blush-muted)]">principal@rvce.edu.in</span>
          </a>

          <a
            href="/api/auth/mock?profile=gmail"
            className={cn(
              "flex items-center justify-between px-3 py-2 rounded-xl bg-[rgba(239,68,68,0.15)] hover:bg-[rgba(239,68,68,0.25)] text-xs transition-colors border border-[rgba(239,68,68,0.3)]",
              focusRing
            )}
          >
            <div className="flex items-center gap-2">
              <ShieldX className="w-4 h-4 text-red-400" aria-hidden="true" />
              <span className="font-semibold text-red-300">Test Rejection (Personal Gmail)</span>
            </div>
            <span className="font-mono text-[10px] text-red-300/80">personal.user@gmail.com</span>
          </a>
        </div>
      )}
    </div>
  );
}
