import React from "react";
import { AtSign, Briefcase, ExternalLink, Mail, Users } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { OrganizerContact } from "./event-types";

export interface EventOrganizerProps {
  organizer: OrganizerContact;
  className?: string;
}

/**
 * Organizer / contact card.
 * Displays club name, contact person, email, and social links.
 * Server component.
 */
export function EventOrganizer({ organizer, className }: EventOrganizerProps) {
  return (
    <section className={cn("", className)}>
      <h2 className="font-aalto text-2xl sm:text-3xl uppercase text-[var(--text-blush)] mb-4">
        Organizer
      </h2>

      <div className="rounded-xl border border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] p-5 sm:p-6">
        {/* Club name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-blush-muted)] border border-[var(--border-blush-strong)] shrink-0">
            <Users aria-hidden="true" className="h-5 w-5 text-[var(--text-blush)]" />
          </div>
          <div>
            <p className="font-semibold text-[var(--text-blush)] text-sm sm:text-base">
              {organizer.clubName}
            </p>
            {organizer.contactName && (
              <p className="text-xs text-[var(--text-blush-muted)]">
                Contact: {organizer.contactName}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border-blush)] my-4" aria-hidden="true" />

        {/* Contact links */}
        <div className="flex flex-wrap gap-3">
          {/* Email */}
          <a
            href={`mailto:${organizer.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-blush)] bg-transparent px-3 py-1.5 text-xs text-[var(--text-blush-muted)] transition-colors hover:border-[var(--border-blush-strong)] hover:text-[var(--text-blush)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)]"
            aria-label={`Send email to ${organizer.email}`}
          >
            <Mail aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {organizer.email}
          </a>

          {/* Instagram */}
          {organizer.instagramUrl && (
            <a
              href={organizer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-blush)] bg-transparent px-3 py-1.5 text-xs text-[var(--text-blush-muted)] transition-colors hover:border-[var(--border-blush-strong)] hover:text-[var(--text-blush)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)]"
              aria-label={`Follow ${organizer.clubName} on Instagram`}
            >
              <AtSign aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              Instagram
            </a>
          )}

          {/* LinkedIn */}
          {organizer.linkedinUrl && (
            <a
              href={organizer.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-blush)] bg-transparent px-3 py-1.5 text-xs text-[var(--text-blush-muted)] transition-colors hover:border-[var(--border-blush-strong)] hover:text-[var(--text-blush)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)]"
              aria-label={`Connect with ${organizer.clubName} on LinkedIn`}
            >
              <Briefcase aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              LinkedIn
            </a>
          )}

          {/* Website */}
          {organizer.websiteUrl && (
            <a
              href={organizer.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-blush)] bg-transparent px-3 py-1.5 text-xs text-[var(--text-blush-muted)] transition-colors hover:border-[var(--border-blush-strong)] hover:text-[var(--text-blush)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)]"
              aria-label={`Visit ${organizer.clubName} website`}
            >
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              Website
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
