/**
 * Core event types for the RVCE Events platform.
 * These interfaces are shared across EventCard and EventDetailsView components.
 */

/** Registration / lifecycle state of an event. */
export type EventRegistrationState =
  | "open"          // Upcoming; registration enabled; seats available
  | "closed"        // Registration deadline passed or manually closed
  | "sold_out"      // Capacity reached; no seats available
  | "past";         // Event has already occurred

/** Broad category used for the category badge. */
export type EventCategory =
  | "Technical"
  | "Cultural"
  | "Sports"
  | "Hackathon"
  | "Workshop"
  | "Conference"
  | "Other";

/** A single agenda/schedule slot. */
export interface ScheduleSlot {
  time: string;       // e.g. "10:00 AM"
  title: string;      // Session title
  speaker?: string;   // Optional speaker/host name
  description?: string;
}

/** Organizer / contact card data. */
export interface OrganizerContact {
  clubName: string;
  contactName?: string;
  email: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}

/**
 * Full event data model for the Event Details page.
 * All data is mocked on the frontend; no backend is involved.
 */
export interface EventDetail {
  /** URL-safe slug used in /events/[slug] routing */
  slug: string;

  title: string;
  description: string;   // Rich description (may contain newlines / markdown-like text)

  /** Absolute URL or /public path to the banner/poster image */
  bannerUrl: string;

  /** Organizing club */
  clubName: string;
  /** Absolute URL or /public path to the club logo */
  clubLogoUrl: string;

  category: EventCategory;

  /** ISO 8601 date-time string, e.g. "2026-10-15T10:00:00+05:30" */
  dateTime: string;
  /** Human-readable timezone label, e.g. "IST" */
  timezone: string;

  /** Venue name, e.g. "RVCE Main Auditorium, 1st Floor" */
  venue: string;

  /** Registration / lifecycle state */
  registrationState: EventRegistrationState;

  /**
   * Registration fee in INR. Use 0 for free events.
   * A paid event has fee > 0.
   */
  fee: number;

  /** AICTE Activity Points awarded for attending */
  aictePoints: number;

  /** Total capacity (max attendees) */
  capacity: number;
  /** Current registered / checked-in count */
  registeredCount: number;

  agenda: ScheduleSlot[];
  organizer: OrganizerContact;

  /** Optional tags/keywords (not shown as badge, used for filtering) */
  tags?: string[];
}

import type { EventCardProps, EventAvailability, EventCategory as CardCategory } from "./event-card";

/** Helper to adapt an EventDetail domain model into EventCardProps for rendering in an EventCard. */
export function toEventCardProps(event: EventDetail): EventCardProps {
  const d = new Date(event.dateTime);
  const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timeStr = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  const status: EventAvailability =
    event.registrationState === "sold_out"
      ? "sold-out"
      : event.registeredCount / event.capacity >= 0.85
      ? "fast-filling"
      : "available";

  const validCategories: CardCategory[] = [
    "Technical",
    "Cultural",
    "Sports",
    "Hackathon",
    "Workshop",
  ];
  const category: CardCategory = validCategories.includes(event.category as CardCategory)
    ? (event.category as CardCategory)
    : "Technical";

  return {
    title: event.title,
    club: event.clubName,
    date: dateStr,
    time: timeStr,
    venue: event.venue,
    category,
    points: event.aictePoints,
    price: event.fee === 0 ? "Free" : `₹${event.fee}`,
    imageUrl: event.bannerUrl || "/logos/coding_club_logo_blush.png",
    status,
    actionLabel:
      event.registrationState === "past"
        ? "Concluded"
        : event.registrationState === "sold_out"
        ? "Sold Out"
        : "View Event",
    href: `/events/${event.slug}`,
  };
}
