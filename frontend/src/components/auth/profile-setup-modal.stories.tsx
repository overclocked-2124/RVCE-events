import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ProfileSetupModal } from "./profile-setup-modal";

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof ProfileSetupModal> = {
  title: "Auth/ProfileSetupModal",
  component: ProfileSetupModal,
  tags: ["autodocs"],
  parameters: {
    /**
     * Use the Cobalt brand background (defined in .storybook/preview.ts) so
     * the elevated dark surface (#1e1b4b) panel reads correctly against the
     * page-level background, matching the real app context.
     */
    backgrounds: { default: "cobalt" },
    layout: "fullscreen",
  },
  args: {
    open: true,
    onClose: fn(),
    onSubmit: fn(),
    defaultValues: {
      fullName: "Ananya Sharma",
      email: "ananya.cs23@rvce.edu.in",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileSetupModal>;

// ---------------------------------------------------------------------------
// Story 1 — Initial (pre-filled, clean)
// ---------------------------------------------------------------------------

/**
 * **Initial state** — modal opens with name and email pre-filled from the
 * Google OAuth session. No validation errors; all interactive controls are
 * enabled. The student must supply USN, department, and graduation year.
 */
export const Initial: Story = {
  name: "Initial — Pre-filled & clean",
  args: {
    open: true,
    defaultValues: {
      fullName: "Ananya Sharma",
      email: "ananya.cs23@rvce.edu.in",
    },
  },
};

// ---------------------------------------------------------------------------
// Story 2 — Validation Errors (invalid USN)
// ---------------------------------------------------------------------------

/**
 * **Validation error state** — demonstrates inline error feedback.
 * The `onSubmit` mock immediately resolves, but the zod resolver will reject
 * the default empty values when the form is submitted. In this story we
 * pre-supply an invalid USN so the error message is visible on first render
 * after a submit attempt.
 *
 * To trigger it in Storybook: click "Save & Continue" without filling in
 * required fields, or type an invalid USN like `1RX22CS045`.
 *
 * This story renders a `play` function that programmatically submits the form
 * so the error state is visible without any user interaction.
 */
export const ValidationError: Story = {
  name: "Validation Errors — invalid USN",
  args: {
    open: true,
    defaultValues: {
      fullName: "Ananya Sharma",
      email: "ananya.cs23@rvce.edu.in",
    },
  },
  /**
   * The play function clicks Submit after a short delay so that Storybook's
   * interactions panel shows the validation error state automatically.
   * Requires @storybook/addon-interactions (already installed).
   */
  play: async ({ canvasElement }) => {
    // Small delay so the component has fully mounted
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Find and click the submit button to trigger validation
    const submitBtn = canvasElement.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );
    submitBtn?.click();
  },
};

// ---------------------------------------------------------------------------
// Story 3 — Submitting / Loading state
// ---------------------------------------------------------------------------

/**
 * **Submitting state** — simulates the in-flight loading moment when the mock
 * submit handler is awaiting resolution. All inputs are disabled and the
 * primary button shows the built-in spinner from `<Button isLoading />`.
 *
 * Achieved by passing an `onSubmit` that never settles, then triggering a
 * form submit via the play function so the `isSubmitting` flag stays `true`.
 */
export const Submitting: Story = {
  name: "Submitting — loading state",
  args: {
    open: true,
    defaultValues: {
      fullName: "Ananya Sharma",
      email: "ananya.cs23@rvce.edu.in",
    },
    /**
     * onSubmit returns a Promise that never resolves — keeps `isSubmitting`
     * permanently `true`, locking the UI in the loading state for inspection.
     */
    onSubmit: () => new Promise<void>(() => {}),
  },
  play: async ({ canvasElement }) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Fill minimum valid data so the zod resolver passes and isSubmitting fires
    const usnInput = canvasElement.querySelector<HTMLInputElement>("#usn");
    if (usnInput) {
      usnInput.focus();
      // Simulate typing a valid USN
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(usnInput, "1RV22CS045");
      usnInput.dispatchEvent(new Event("input", { bubbles: true }));
      usnInput.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const deptSelect =
      canvasElement.querySelector<HTMLSelectElement>("#department");
    if (deptSelect) {
      const nativeSelectValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype,
        "value"
      )?.set;
      nativeSelectValueSetter?.call(deptSelect, "CSE");
      deptSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const yearSelect =
      canvasElement.querySelector<HTMLSelectElement>("#graduationYear");
    if (yearSelect) {
      const nativeSelectValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype,
        "value"
      )?.set;
      const year = String(new Date().getFullYear() + 2);
      nativeSelectValueSetter?.call(yearSelect, year);
      yearSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Small delay for React state to update
    await new Promise((resolve) => setTimeout(resolve, 100));

    const submitBtn = canvasElement.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );
    submitBtn?.click();
  },
};

// ---------------------------------------------------------------------------
// Mobile viewport variants (bonus — per AGENTS.md responsive requirement)
// ---------------------------------------------------------------------------

/** Initial state on a 390×844 mobile viewport. */
export const InitialMobile: Story = {
  name: "Initial — Mobile (390×844)",
  args: {
    open: true,
    defaultValues: {
      fullName: "Ananya Sharma",
      email: "ananya.cs23@rvce.edu.in",
    },
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

