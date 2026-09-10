"use client";

import { useState } from "react";
import { ChevronDown, FlaskConical } from "lucide-react";
import { Button } from "@/src/components/ui/button";

type MockProfile = "student" | "faculty" | "gmail";

const PROFILES: { id: MockProfile; label: string }[] = [
  { id: "student", label: "Student" },
  { id: "faculty", label: "Faculty" },
  { id: "gmail", label: "Personal Gmail" },
];

export function DevAuthPanel() {
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const handleMockAuth = (profile: MockProfile) => {
    window.location.assign(`/api/auth/mock?profile=${profile}`);
  };

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-[min(20rem,calc(100vw-2rem))]">
      <div className="rounded-2xl border border-primary/20 bg-background p-3 shadow-xl">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="dev-auth-panel-content"
        >
          <span className="flex items-center gap-2">
            <FlaskConical aria-hidden="true" className="size-4" />
            Dev Mock Auth
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {isOpen && (
          <div
            id="dev-auth-panel-content"
            role="region"
            aria-label="Development authentication profiles"
            className="mt-3 space-y-2"
          >
            <p className="px-1 text-xs opacity-70">
              Test authentication with a mock profile.
            </p>

            {PROFILES.map((profile) => (
              <Button
                key={profile.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMockAuth(profile.id)}
              >
                {profile.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
