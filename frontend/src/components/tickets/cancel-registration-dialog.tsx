"use client";

import React from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import type { Ticket } from "./types";

/**
 * Opaque equivalent of the backdrop composited over the cobalt page: the
 * backdrop is `--surface-dark` at 75% alpha, so 75% surface-dark mixed with
 * 25% cobalt lands on the same colour. Mixed in sRGB because that is the space
 * the browser composites alpha in.
 */
const DIMMED_CANVAS = "color-mix(in srgb, var(--surface-dark) 75%, var(--bg-cobalt))";

/**
 * Dims the page canvas for as long as the dialog is open.
 *
 * Base UI locks scrolling with `scrollbar-gutter: stable; overflow: hidden` on
 * <html>, which correctly stops the page shifting when the scrollbar goes away.
 * The reserved gutter then sits outside the root's padding box, and because a
 * root with `overflow: hidden` clips its fixed descendants to that box, no
 * element in the document can paint there — the backdrop included. The gutter
 * keeps showing the cobalt canvas as a bright stripe down the edge.
 *
 * Painting the canvas itself is the only thing that reaches that band, so the
 * root background is swapped while the dialog is open and restored on close.
 */
function useDimmedCanvasWhileOpen(open: boolean) {
  React.useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previous = root.style.backgroundColor;
    root.style.backgroundColor = DIMMED_CANVAS;

    return () => {
      root.style.backgroundColor = previous;
    };
  }, [open]);
}

interface CancelRegistrationDialogProps {
  /**
   * The registration being released, or `null` when nothing is pending.
   * Kept as a prop rather than internal state so one dialog instance can serve
   * every card in the list.
   */
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called once the student confirms. */
  onConfirm: (ticket: Ticket) => void;
  className?: string;
}

/**
 * Confirmation before a student gives up their seat.
 *
 * Built on Base UI's `AlertDialog` rather than `Dialog`: an alert dialog traps
 * focus, renders as `role="alertdialog"`, and — unlike a plain dialog —
 * deliberately cannot be dismissed by clicking the backdrop or pressing Escape
 * alone in every case, which is the correct behaviour for a destructive,
 * irreversible choice. Title and Description are wired to
 * `aria-labelledby` / `aria-describedby` by the library.
 */
export function CancelRegistrationDialog({
  ticket,
  open,
  onOpenChange,
  onConfirm,
  className,
}: CancelRegistrationDialogProps) {
  useDimmedCanvasWhileOpen(open);

  return (
    <AlertDialog.Root open={open} onOpenChange={(nextOpen) => onOpenChange(nextOpen)}>
      <AlertDialog.Portal>
        {/* `inset-0` covers the root's padding box; the scrollbar gutter beyond
            it is handled by useDimmedCanvasWhileOpen, since fixed elements are
            clipped there and cannot reach it. */}
        <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-[color-mix(in_oklch,var(--surface-dark),transparent_25%)] backdrop-blur-sm" />
        <AlertDialog.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-[var(--border-blush)] bg-[var(--surface-dark-raised)] p-6",
            "shadow-[0_24px_60px_-12px_rgb(0_0_0/0.6)] outline-none",
            className
          )}
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 shrink-0 rounded-full border border-[color-mix(in_oklch,var(--chart-red),transparent_60%)] bg-[color-mix(in_oklch,var(--chart-red),transparent_88%)] p-2"
            >
              <TriangleAlert className="size-4 text-[color-mix(in_oklch,var(--chart-red),white_30%)]" />
            </span>
            <div className="min-w-0 space-y-2">
              <AlertDialog.Title className="font-aalto text-2xl text-[var(--text-blush)]">
                Cancel registration?
              </AlertDialog.Title>
              <AlertDialog.Description className="text-sm leading-relaxed text-[var(--text-blush-muted)]">
                {/* The event is named in the body rather than the heading so the
                    warning stays readable when a title runs long. */}
                This releases your seat for{" "}
                <span className="font-semibold text-[var(--text-blush)]">
                  {ticket?.eventTitle ?? "this event"}
                </span>
                . Cancellation cannot be undone — if the event fills up you would
                need to register again and may be waitlisted.
              </AlertDialog.Description>
              {ticket && (
                <p className="font-[family-name:var(--font-space-grotesk)] text-xs tracking-[0.14em] text-[var(--text-blush-muted)]">
                  {ticket.ticketCode}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
            <AlertDialog.Close render={<Button variant="ghost" size="sm" />}>
              Keep my seat
            </AlertDialog.Close>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                if (ticket) onConfirm(ticket);
                onOpenChange(false);
              }}
            >
              Yes, cancel registration
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
