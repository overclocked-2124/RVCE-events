"use client";

import { Button } from "@/src/components/ui/button";

type GoogleSignInButtonProps = {
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
};

export function GoogleSignInButton({
  size = "md",
  isLoading = false,
  disabled = false,
}: GoogleSignInButtonProps) {
  const handleSignIn = () => {
    window.location.href = "/api/auth/login";
  };

  return (
    <Button
      size={size === "md" ? "default" : size}
      isLoading={isLoading}
      disabled={disabled}
      onClick={handleSignIn}
      aria-label="Sign in with RVCE Mail"
      className="gap-2 focus-visible:ring-2"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="#4285F4"
          d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
        />
        <path
          fill="#34A853"
          d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.5Z"
        />
        <path
          fill="#FBBC05"
          d="M6.54 13.58A5.85 5.85 0 0 1 6.23 12c0-.55.1-1.08.31-1.58V7.89H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.11l3.25-2.53Z"
        />
        <path
          fill="#EA4335"
          d="M12 6.39c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.5 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.39l3.25 2.53C7.31 8.11 9.46 6.39 12 6.39Z"
        />
      </svg>

      <span>Sign in with RVCE Mail</span>
    </Button>
  );
}