"use client";

import React from "react";
// global-error.tsx replaces the root layout, so it inherits neither globals.css
// nor the next/font variables — the stylesheet must be imported here directly.
import "./globals.css";
import { ErrorView } from "@/src/components/feedback/error-view";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Root layout error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-[var(--bg-cobalt)] text-[var(--text-blush)] min-h-dvh">
        <ErrorView error={error} reset={reset} homeHref="/" />
      </body>
    </html>
  );
}
