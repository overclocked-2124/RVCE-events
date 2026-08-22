"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

export interface GoogleSignInButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function GoogleSignInButton({
  href = "/api/auth/login",
  size = "md",
  isLoading = false,
  className,
  disabled,
  onClick,
  ...props
}: GoogleSignInButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-2 rounded-lg",
    md: "px-6 py-3.5 text-sm gap-3 rounded-xl",
    lg: "px-8 py-4 text-base gap-3.5 rounded-2xl",
  };

  const buttonContent = (
    <>
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-[var(--bg-cobalt)]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5 flex-shrink-0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
      )}
      <span className="font-semibold tracking-wide">Sign in with RVCE Mail</span>
    </>
  );

  const baseClassName = cn(
    "inline-flex items-center justify-center bg-[var(--text-blush)] text-[var(--bg-cobalt)] font-medium transition-all duration-200 cursor-pointer select-none shadow-md hover:opacity-90 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[var(--border-blush-strong)] focus:ring-offset-2 focus:ring-offset-[var(--bg-cobalt)]",
    sizeStyles[size],
    className
  );

  if (href && !disabled && !isLoading) {
    return (
      <a href={href} className={baseClassName}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={baseClassName}
      {...props}
    >
      {buttonContent}
    </button>
  );
}
