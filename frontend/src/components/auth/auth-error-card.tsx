"use client";

import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export type AuthErrorReason =
  | "unauthorized_domain"
  | "invalid_state"
  | "access_denied"
  | "missing_config";

type AuthErrorCardProps = {
  reason?: AuthErrorReason;
};

const ERROR_CONTENT: Record<
  AuthErrorReason,
  { title: string; message: string }
> = {
  unauthorized_domain: {
    title: "RVCE Mail Required",
    message:
      "Please sign in using your RVCE institutional email address.",
  },
  invalid_state: {
    title: "Session Expired",
    message:
      "Your authentication session is no longer valid. Please try signing in again.",
  },
  access_denied: {
    title: "Sign-In Cancelled",
    message:
      "Google sign-in was cancelled. You can try again whenever you're ready.",
  },
  missing_config: {
    title: "Authentication Unavailable",
    message:
      "Authentication is currently unavailable. Please try again later.",
  },
};

export function AuthErrorCard({ reason }: AuthErrorCardProps) {
  const errorReason = reason ?? "invalid_state";
  const content = ERROR_CONTENT[errorReason];

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-5 py-12 text-foreground">
      <section
        className="w-full max-w-xl rounded-3xl border border-primary/20 bg-background p-6 text-center shadow-lg sm:p-10"
        aria-labelledby="auth-error-title"
      >
        <ShieldAlert
          aria-hidden="true"
          className="mx-auto size-12 text-primary opacity-80 sm:size-16"
          strokeWidth={1.5}
        />

        <h1
          id="auth-error-title"
          className="font-aalto mt-6 text-4xl uppercase leading-none sm:text-5xl"
        >
          {content.title}
        </h1>

        <p
          role="alert"
          className="mx-auto mt-4 max-w-md text-sm leading-relaxed opacity-80 sm:text-base"
        >
          {content.message}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
<a
  href="/api/auth/login"
  className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  Try Again
</a><Button
  variant="outline"
  size="hero"
  className="rounded-full"
  nativeButton={false}
  render={<Link href="/" />}
>
  <ArrowLeft aria-hidden="true" className="size-4" />
  Back Home
</Button>
        </div>
      </section>
    </main>
  );
}