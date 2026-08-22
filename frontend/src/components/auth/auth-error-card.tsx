"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { AuthErrorReason } from "@/src/bff/auth";

export interface AuthErrorCardProps {
  reason?: AuthErrorReason | string;
  className?: string;
}

export function AuthErrorCard({ reason = "unauthorized_domain", className }: AuthErrorCardProps) {
  const getErrorContent = () => {
    switch (reason) {
      case "unauthorized_domain":
        return {
          badge: "Institutional Access Only",
          title: "Access Restricted",
          description:
            "Please sign in with your official @rvce.edu.in institutional email address. Personal accounts (@gmail.com) and unauthorized email domains are strictly barred.",
          icon: ShieldAlert,
          iconColor: "text-amber-400",
        };
      case "invalid_state":
        return {
          badge: "Security Verification",
          title: "Session Expired",
          description:
            "Your login session timed out or the security token expired. Please try signing in again.",
          icon: AlertTriangle,
          iconColor: "text-amber-400",
        };
      case "access_denied":
        return {
          badge: "Authentication Cancelled",
          title: "Sign In Cancelled",
          description:
            "Google authentication was cancelled. To access the platform, please approve institutional sign-in with your @rvce.edu.in account.",
          icon: ShieldAlert,
          iconColor: "text-[var(--text-blush)]",
        };
      case "missing_config":
        return {
          badge: "Configuration Error",
          title: "Auth Not Configured",
          description:
            "Google OAuth configuration is missing on the server. Please ensure environment variables are set.",
          icon: AlertTriangle,
          iconColor: "text-red-400",
        };
      default:
        return {
          badge: "Authentication Error",
          title: "Login Failed",
          description:
            "An unexpected error occurred during institutional sign-in. Please try again or contact support if the issue persists.",
          icon: ShieldAlert,
          iconColor: "text-[var(--text-blush)]",
        };
    }
  };

  const content = getErrorContent();
  const IconComponent = content.icon;

  return (
    <div
      className={cn(
        "max-w-lg w-full mx-auto bg-[rgba(30,27,75,0.9)] border border-[var(--border-blush)] rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl text-center text-[var(--text-blush)] flex flex-col items-center",
        className
      )}
    >
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-[rgba(253,205,215,0.1)] border border-[var(--border-blush)] flex items-center justify-center mb-6">
        <IconComponent className={cn("w-8 h-8", content.iconColor)} />
      </div>

      {/* Pill Badge */}
      <span className="pill-badge text-[10px] sm:text-[11px] mb-4 border-[var(--border-blush)] text-[var(--text-blush-muted)]">
        {content.badge}
      </span>

      {/* Title */}
      <h2 className="font-aalto text-3xl sm:text-4xl text-[var(--text-blush)] my-3 tracking-wide uppercase leading-normal">
        {content.title}
      </h2>

      {/* Description */}
      <p className="text-sm sm:text-base text-[var(--text-blush-muted)] leading-relaxed mb-8 max-w-md">
        {content.description}
      </p>

      {/* Action Buttons */}
      <div className="w-full flex flex-col sm:flex-row items-center gap-3.5">
        <a
          href="/api/auth/login"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[var(--text-blush)] text-[var(--bg-cobalt)] font-semibold text-sm py-3.5 px-5 rounded-xl shadow-md hover:bg-[#ffe3e9] transition-all duration-200 active:scale-[0.98]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </a>

        <Link
          href="/"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-[var(--border-blush)] text-[var(--text-blush)] font-medium text-sm py-3.5 px-5 rounded-xl hover:bg-[rgba(253,205,215,0.1)] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
