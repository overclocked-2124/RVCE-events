"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Hash, GraduationCap, Phone, BookOpen, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------

/**
 * USN regex accepts both the legacy 1RV prefix and the newer 1RZ prefix.
 * Corrected per maintainer clarification in the issue thread (Rule_Update.txt):
 *   Original (issue): ^1RV\d{2}[A-Z]{2}\d{3}$
 *   Corrected:        ^1R[VZ]\d{2}[A-Z]{2}\d{3}$
 */
const USN_REGEX = /^1R[VZ]\d{2}[A-Z]{2}\d{3}$/;

const CURRENT_YEAR = new Date().getFullYear();
const GRADUATION_YEARS = [
  CURRENT_YEAR,
  CURRENT_YEAR + 1,
  CURRENT_YEAR + 2,
  CURRENT_YEAR + 3,
  CURRENT_YEAR + 4,
] as const;

const DEPARTMENTS = [
  "AE",
  "CH",
  "CSE",
  "CD",
  "CY",
  "CV",
  "ECE",
  "EE",
  "BT",
  "ISE",
  "IEM",
  "ETE",
  "AIML",
  "MECH",
  "EI",
] as const;

const profileSetupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters"),
  email: z.string().email("Invalid email address"),
  usn: z
    .string()
    .min(1, "USN is required")
    .transform((val) => val.toUpperCase())
    .pipe(
      z
        .string()
        .regex(
          USN_REGEX,
          "USN must match format 1RV22CS045 or 1RZ22CS045 (1R[V/Z] + 2-digit year + 2-letter branch + 3-digit roll)"
        )
    ),
  department: z.enum(DEPARTMENTS, {
    error: "Please select your department",
  }),
  graduationYear: z.coerce
    .number()
    .int()
    .min(CURRENT_YEAR, "Graduation year must be current year or later")
    .refine((val) => !isNaN(val), "Please select your graduation year"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{10}$/.test(val),
      "Phone number must be exactly 10 digits"
    ),
});

/** Raw input shape — what react-hook-form tracks in its internal field state. */
export type ProfileSetupFormInput = z.input<typeof profileSetupSchema>;
/** Validated, coerced output shape — what the submit handler receives. */
export type ProfileSetupFormValues = z.output<typeof profileSetupSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ProfileSetupModalProps {
  /** Whether the modal is visible. */
  open: boolean;
  /** Called when the modal is dismissed (ESC / close button). */
  onClose?: () => void;
  /**
   * Mock submit handler — receives validated form data.
   * Return a promise to trigger the submitting/loading state.
   */
  onSubmit?: (data: ProfileSetupFormValues) => Promise<void> | void;
  /** Pre-fill from the Google session. */
  defaultValues?: Partial<{
    fullName: string;
    email: string;
  }>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** All focusable element selectors for focus-trap logic. */
const FOCUSABLE =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.closest("[aria-hidden='true']")
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FieldWrapper({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-[var(--text-blush)]"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-[var(--text-blush-muted)]">{hint}</p>
      )}
      {error && (
        <p
          role="alert"
          className="flex items-center gap-1 text-xs text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  icon?: React.ReactNode;
}

function Input({ hasError, icon, className, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <span
          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[var(--text-blush-muted)]"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <input
        className={cn(
          "w-full rounded-lg border bg-[var(--surface-dark-raised)] px-3 py-2.5 text-sm text-[var(--text-blush)] placeholder:text-[var(--text-blush-muted)]",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-[var(--border-blush-strong)] focus:border-[var(--border-blush-strong)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          icon ? "pl-9" : "pl-3",
          hasError
            ? "border-red-400 focus:ring-red-400 focus:border-red-400"
            : "border-[var(--border-blush)]",
          className
        )}
        {...props}
      />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  icon?: React.ReactNode;
  placeholder?: string;
}

function Select({
  hasError,
  icon,
  placeholder,
  className,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="relative">
      {icon && (
        <span
          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[var(--text-blush-muted)]"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <select
        className={cn(
          "w-full appearance-none rounded-lg border bg-[var(--surface-dark-raised)] py-2.5 pr-9 text-sm text-[var(--text-blush)]",
          "transition-colors duration-150",
          "focus:outline-none focus:ring-2 focus:ring-[var(--border-blush-strong)] focus:border-[var(--border-blush-strong)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          icon ? "pl-9" : "pl-3",
          hasError
            ? "border-red-400 focus:ring-red-400 focus:border-red-400"
            : "border-[var(--border-blush)]",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {/* Custom caret */}
      <span
        className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--text-blush-muted)]"
        aria-hidden="true"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * `ProfileSetupModal` — Issue #31 / AUTH-04
 *
 * First-time profile completion modal prompted when a student signs in for the
 * first time via institutional Google OAuth. Captures USN and academic details
 * required for AICTE activity point attribution and event ticketing.
 *
 * ⚠️  FRONTEND ONLY — form submission is handled by a mock handler prop.
 *     No backend calls are made inside this component.
 */
export function ProfileSetupModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: ProfileSetupModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSetupFormInput, any, ProfileSetupFormValues>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      email: defaultValues?.email ?? "",
      usn: "",
      department: undefined,
      graduationYear: undefined,
      phone: "",
    },
  });

  // ------------------------------------------------------------------
  // Focus trap — keeps keyboard focus inside the dialog while open
  // ------------------------------------------------------------------
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open || !dialogRef.current) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = getFocusableElements(dialogRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [open, onClose]
  );

  // Attach / detach the keydown listener and manage body scroll lock
  useEffect(() => {
    if (!open) return;

    document.addEventListener("keydown", handleKeyDown);
    // Move focus into the dialog on open
    requestAnimationFrame(() => closeBtnRef.current?.focus());
    // Prevent background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, handleKeyDown]);

  // ------------------------------------------------------------------
  // Submit handler
  // ------------------------------------------------------------------
  const handleFormSubmit = async (data: ProfileSetupFormValues) => {
    await onSubmit?.(data);
  };

  // ------------------------------------------------------------------
  // Backdrop click → close
  // ------------------------------------------------------------------
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose?.();
    }
  };

  if (!open) return null;

  const isDisabled = isSubmitting;

  return (
    /* Backdrop */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "rgba(30, 27, 75, 0.8)" }}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="profile-setup-title"
      aria-describedby="profile-setup-desc"
    >
      {/* Backdrop blur layer */}
      <div
        className="absolute inset-0 -z-10 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        className={cn(
          "relative w-full max-w-lg overflow-y-auto rounded-2xl",
          "border border-[var(--border-blush)] shadow-2xl",
          "max-h-[90dvh] sm:max-h-[85dvh]",
          // Elevated dark surface per spec (#1e1b4b)
          "bg-[var(--surface-dark)]"
        )}
      >
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="flex items-start justify-between border-b border-[var(--border-blush)] px-6 py-5">
          <div className="flex-1 pr-4">
            <h2
              id="profile-setup-title"
              className="font-aalto text-2xl leading-tight text-[var(--text-blush)] sm:text-3xl"
            >
              Complete Your Student Profile
            </h2>
            <p
              id="profile-setup-desc"
              className="mt-1.5 text-sm text-[var(--text-blush-muted)]"
            >
              Required for AICTE activity point attribution and event ticketing.
              This takes less than a minute.
            </p>
          </div>

          {/* Close button */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            disabled={isDisabled}
            aria-label="Close profile setup"
            className={cn(
              "mt-0.5 rounded-lg p-1.5 text-[var(--text-blush-muted)]",
              "transition-colors hover:bg-[var(--surface-blush-subtle)] hover:text-[var(--text-blush)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)]",
              "disabled:pointer-events-none disabled:opacity-40"
            )}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* ── Form ─────────────────────────────────────────────── */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          className="flex flex-col gap-5 px-6 py-6"
        >
          {/* Full Name */}
          <FieldWrapper
            label="Full Name"
            htmlFor="fullName"
            error={errors.fullName?.message}
            required
          >
            <Input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Ananya Sharma"
              icon={<User className="h-4 w-4" aria-hidden="true" />}
              hasError={!!errors.fullName}
              disabled={isDisabled}
              aria-describedby={
                errors.fullName ? "fullName-error" : undefined
              }
              {...register("fullName")}
            />
          </FieldWrapper>

          {/* Email — read-only, pre-filled from Google session */}
          <FieldWrapper
            label="Email Address"
            htmlFor="email"
            error={errors.email?.message}
            required
          >
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ananya.cs23@rvce.edu.in"
              icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              hasError={!!errors.email}
              // Institutional email from OAuth — must not be changed
              readOnly
              disabled={isDisabled}
              aria-readonly="true"
              className="cursor-default opacity-70"
              {...register("email")}
            />
          </FieldWrapper>

          {/* USN */}
          <FieldWrapper
            label="University Seat Number (USN)"
            htmlFor="usn"
            error={errors.usn?.message}
            hint="Format: 1RV22CS045 or 1RZ22CS045 — automatically uppercased"
            required
          >
            <Input
              id="usn"
              type="text"
              autoComplete="off"
              placeholder="1RV22CS045"
              icon={<Hash className="h-4 w-4" aria-hidden="true" />}
              hasError={!!errors.usn}
              disabled={isDisabled}
              maxLength={10}
              spellCheck={false}
              aria-describedby={errors.usn ? "usn-error" : "usn-hint"}
              {...register("usn", {
                // Automatic uppercase conversion on input
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue("usn", e.target.value.toUpperCase(), {
                    shouldValidate: false,
                  });
                },
              })}
            />
          </FieldWrapper>

          {/* Department + Graduation Year — side by side on sm+ */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Department */}
            <FieldWrapper
              label="Department"
              htmlFor="department"
              error={errors.department?.message}
              required
            >
              <Select
                id="department"
                placeholder="Select department"
                icon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
                hasError={!!errors.department}
                disabled={isDisabled}
                defaultValue=""
                {...register("department")}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </Select>
            </FieldWrapper>

            {/* Graduation Year */}
            <FieldWrapper
              label="Graduation Year"
              htmlFor="graduationYear"
              error={errors.graduationYear?.message}
              required
            >
              <Select
                id="graduationYear"
                placeholder="Select year"
                icon={<GraduationCap className="h-4 w-4" aria-hidden="true" />}
                hasError={!!errors.graduationYear}
                disabled={isDisabled}
                defaultValue=""
                {...register("graduationYear")}
              >
                {GRADUATION_YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </FieldWrapper>
          </div>

          {/* Phone Number (optional) */}
          <FieldWrapper
            label="Phone Number"
            htmlFor="phone"
            error={errors.phone?.message}
            hint="Optional — 10-digit mobile number (e.g. 9876543210)"
          >
            <div className="relative">
              {/* +91 prefix badge */}
              <span className="absolute inset-y-0 left-3 flex items-center">
                <span className="flex items-center gap-1 text-sm font-medium text-[var(--text-blush-muted)]">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span className="select-none">+91</span>
                </span>
              </span>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="9876543210"
                inputMode="numeric"
                maxLength={10}
                disabled={isDisabled}
                className={cn(
                  "w-full rounded-lg border bg-[var(--surface-dark-raised)] py-2.5 pr-3 text-sm text-[var(--text-blush)] placeholder:text-[var(--text-blush-muted)]",
                  "pl-[4.75rem] transition-colors duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--border-blush-strong)] focus:border-[var(--border-blush-strong)]",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  errors.phone
                    ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                    : "border-[var(--border-blush)]"
                )}
                {...register("phone")}
              />
            </div>
          </FieldWrapper>

          {/* ── Footer actions ───────────────────────────────── */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              size="default"
              onClick={onClose}
              disabled={isDisabled}
              className="w-full text-[var(--text-blush-muted)] hover:text-[var(--text-blush)] sm:w-auto"
            >
              Skip for now
            </Button>

            <Button
              type="submit"
              variant="default"
              size="default"
              isLoading={isSubmitting}
              disabled={isDisabled}
              className={cn(
                "w-full sm:w-auto",
                "bg-[var(--text-blush)] text-[var(--surface-dark)]",
                "hover:bg-[var(--text-blush-muted)]",
                "font-semibold"
              )}
            >
              {isSubmitting ? "Saving…" : "Save & Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

