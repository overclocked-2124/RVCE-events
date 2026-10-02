import { cn } from "@/src/lib/utils";
import type { TicketStatus } from "./types";

/**
 * Shared chip surface.
 *
 * Every status shares this one fill so the row reads as a single family and
 * only the label and hairline border carry the state. Tinting the fill with the
 * status colour instead was tried and rejected — over cobalt the background
 * bleeds through, which lifts the fill toward the label and flattens the hue.
 * A dark constant fill lets a bright label stay legible on both brand
 * backgrounds without per-background tuning.
 *
 * `--surface-dark-raised` rather than `--surface-dark`: the chip has to work on
 * the cobalt canvas *and* on the dark ticket card. Matching the card's own
 * surface made it disappear there, so the raised token — the one the palette
 * documents for elevated panels — keeps it a step above the card while still
 * reading as recessed against cobalt.
 */
const CHIP_SURFACE = "bg-[color-mix(in_oklch,var(--surface-dark-raised),transparent_10%)]";

/**
 * Presentation for each registration state.
 *
 * Typing this as `Record<TicketStatus, ...>` makes the map exhaustive: adding a
 * new status to the union is a compile error until it is styled here.
 *
 * Colours come from the documented state tokens in `globals.css`
 * (`--chart-emerald` / `-amber` / `-blue` / `-red`). Each label is the state
 * token lifted toward white so it clears the 4.5:1 floor against the chip, and
 * the border is the same token at low opacity — the restrained treatment the
 * destructive Button already uses, where a red label on a barely-there fill
 * does the work instead of a saturated block of colour.
 */
const STATUS_STYLES: Record<TicketStatus, { label: string; className: string }> = {
  CONFIRMED: {
    label: "CONFIRMED",
    className:
      "text-[color-mix(in_oklch,var(--chart-emerald),white_30%)] border-[color-mix(in_oklch,var(--chart-emerald),transparent_55%)]",
  },
  WAITLISTED: {
    label: "WAITLISTED",
    className:
      "text-[color-mix(in_oklch,var(--chart-amber),white_24%)] border-[color-mix(in_oklch,var(--chart-amber),transparent_55%)]",
  },
  CHECKED_IN: {
    label: "CHECKED IN",
    className:
      "text-[color-mix(in_oklch,var(--chart-blue),white_36%)] border-[color-mix(in_oklch,var(--chart-blue),transparent_52%)]",
  },
  CANCELLED: {
    label: "CANCELLED",
    className:
      "text-[color-mix(in_oklch,var(--chart-red),white_30%)] border-[color-mix(in_oklch,var(--chart-red),transparent_58%)]",
  },
};

interface TicketStatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

/**
 * Small pill showing the lifecycle state of a registration.
 *
 * The written label carries the meaning on its own, so the badge never relies
 * on colour alone to communicate status.
 */
export function TicketStatusBadge({ status, className }: TicketStatusBadgeProps) {
  const { label, className: statusClassName } = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        // Type metrics mirror the .pill-badge utility in globals.css so status
        // chips sit in the same visual family as the project's editorial pills.
        // The border is a 1px hairline rather than pill-badge's 1.5px: this chip
        // is roughly half the size, where the heavier rule reads as a crayon
        // outline instead of an edge.
        "inline-flex items-center justify-center gap-2 rounded-full border px-3.5 py-[0.35rem]",
        "font-[family-name:var(--font-space-grotesk)] text-[0.72rem] font-semibold tracking-[0.18em] uppercase whitespace-nowrap",
        "transition-colors duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        CHIP_SURFACE,
        statusClassName,
        className
      )}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
