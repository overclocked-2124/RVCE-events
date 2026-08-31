import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ErrorView } from "./error-view";

const meta: Meta<typeof ErrorView> = {
  title: "Feedback/ErrorView",
  component: ErrorView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "cobalt" },
  },
  args: {
    // Interactive: clicking "Try Again" logs a call in the Actions panel,
    // standing in for the Next.js reset() callback.
    reset: fn(),
    homeHref: "/",
  },
};

export default meta;
type Story = StoryObj<typeof ErrorView>;

/** A deliberate, user-facing message is surfaced verbatim. */
export const Default: Story = {
  args: {
    error: { message: "We could not load the events feed right now." },
  },
};

/** Technical messages are replaced by the generic fallback copy. */
export const SanitizedTechnicalError: Story = {
  args: {
    error: {
      message:
        "TypeError: Cannot read properties of undefined (reading 'id')\n    at EventCard (/app/.next/server/chunks/4821.js:12:9)",
    },
  },
};

/** Production errors carry a digest, rendered as a support reference. */
export const WithDigest: Story = {
  args: {
    error: {
      message: "We could not load the events feed right now.",
      digest: "3892174655",
    },
  },
};

/** No message at all — the generic fallback still renders a complete screen. */
export const EmptyError: Story = {
  args: {
    error: {},
  },
};

/** Mobile viewport — verifies CTA stacking and type scale at 390x844. */
export const Mobile: Story = {
  args: {
    error: { message: "We could not load the events feed right now." },
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};
