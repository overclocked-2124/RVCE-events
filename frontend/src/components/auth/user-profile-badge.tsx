"use client";

import React from "react";
import Image from "next/image";
import { LogOut, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { SessionUser } from "@/src/bff/auth";

export interface UserProfileBadgeProps {
  user: SessionUser;
  className?: string;
  onSignOut?: () => void;
}

export function UserProfileBadge({ user, className, onSignOut }: UserProfileBadgeProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "RV";

  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-[rgba(253,205,215,0.12)] border border-[var(--border-blush)] rounded-full pl-2 pr-3 py-1.5 backdrop-blur-md shadow-sm transition-all duration-200",
        className
      )}
    >
      {/* Avatar or Initials */}
      <div className="relative flex items-center justify-center">
        {user.picture ? (
          <Image
            src={user.picture}
            alt={user.name}
            width={32}
            height={32}
            unoptimized
            className="w-8 h-8 rounded-full border border-[var(--border-blush-strong)] object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[var(--text-blush)] text-[var(--bg-cobalt)] flex items-center justify-center text-xs font-bold font-sans-editorial">
            {initials}
          </div>
        )}
        <div className="absolute -bottom-0.5 -right-0.5 bg-[var(--bg-cobalt)] rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-[var(--bg-cobalt)]" />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col text-left leading-tight pr-1">
        <span className="text-xs font-semibold text-[var(--text-blush)] truncate max-w-[140px] sm:max-w-[180px]">
          {user.name}
        </span>
        <span className="text-[10px] text-[var(--text-blush-muted)] font-mono truncate max-w-[140px] sm:max-w-[180px]">
          {user.email}
        </span>
      </div>

      {/* Sign Out Link / Button */}
      {onSignOut ? (
        <button
          type="button"
          onClick={onSignOut}
          title="Sign Out"
          className="ml-1 p-1.5 rounded-full text-[var(--text-blush-muted)] hover:text-[var(--text-blush)] hover:bg-[rgba(253,205,215,0.2)] transition-colors focus:outline-none"
        >
          <LogOut className="w-4 h-4" />
        </button>
      ) : (
        <a
          href="/api/auth/logout"
          title="Sign Out"
          className="ml-1 p-1.5 rounded-full text-[var(--text-blush-muted)] hover:text-[var(--text-blush)] hover:bg-[rgba(253,205,215,0.2)] transition-colors focus:outline-none"
        >
          <LogOut className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
