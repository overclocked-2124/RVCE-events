"use client";

import Image from "next/image";
import { useEffect, useState } from "react";import { BadgeCheck, LogOut } from "lucide-react";
import { Button } from "@/src/components/ui/button";

type User = {
  name: string;
  email: string;
  picture?: string;
};

type UserProfileBadgeProps = {
  user?: User;
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function UserProfileBadge({ user: initialUser }: UserProfileBadgeProps) {
  const [user, setUser] = useState<User | null>(initialUser ?? null);
  const [failedPicture, setFailedPicture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (initialUser) return;

    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();

        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, [initialUser]);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      window.location.href = "/";
    } catch {
      setIsSigningOut(false);
    }
  };

  if (isLoading || !user) {
    return null;
  }

  const initials = getInitials(user.name);
  const picture = user.picture;

  return (
    <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-background px-3 py-2">
      <div
        className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground font-semibold"
        aria-label={`${user.name}'s profile`}
      >
        {picture && failedPicture !== picture ? (
          <Image
            src={picture}
            alt=""
            width={40}
            height={40}
            className="size-full object-cover"
            onError={() => setFailedPicture(picture)}
          />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1">
          <span className="truncate font-medium">{user.name}</span>
          <BadgeCheck
            className="size-4 shrink-0 text-green-500"
            aria-label="Verified RVCE account"
          />
        </div>

        <span className="block truncate text-sm opacity-80">
          {user.email}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleSignOut}
        isLoading={isSigningOut}
        aria-label="Sign out"
      >
        {!isSigningOut && <LogOut aria-hidden="true" />}
      </Button>
    </div>
  );
}
