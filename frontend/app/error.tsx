"use client";

import React from "react";
import { ErrorView } from "@/src/components/feedback/error-view";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Route error boundary caught:", error);
  }, [error]);

  return <ErrorView error={error} reset={reset} homeHref="/" />;
}
