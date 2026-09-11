import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect, waitFor } from "@storybook/test";
import { SiteHeader, SiteHeaderUser } from "./site-header";

const mockStudentUser: SiteHeaderUser = {
  id: "mock-student-101",
  name: "Ananya Sharma",
  email: "ananya.cs23@rvce.edu.in",
  picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces",
  role: "student",
  usn: "1RV23CS001",
  points: 100,
};

const meta: Meta<typeof SiteHeader> = {
  title: "Layout/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "cobalt" },
  },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

/**
 * 1. Logged-out Desktop:
 * Unauthenticated visitor view with brand marks, navigation items (Events highlighted as active),
 * and the primary Sign In CTA button.
 */
export const LoggedOutDesktop: Story = {
  args: {
    variant: "sticky",
    user: null,
  },
  parameters: {
    nextjs: {
      pathname: "/events",
    },
  },
};

/**
 * 2. Logged-in Student:
 * Authenticated student view showing the AICTE points badge, user avatar with picture
 * and fallback initials, and the interactive dropdown menu with Profile, Registrations, and Sign Out.
 */
export const LoggedInStudent: Story = {
  args: {
    variant: "sticky",
    user: mockStudentUser,
  },
  parameters: {
    nextjs: {
      pathname: "/events",
    },
  },
};

/**
 * 3. Mobile Viewport:
 * Rendered at mobile screen size (390px, mobile2 viewport) demonstrating the responsive
 * hamburger trigger and the slide-out navigation Sheet drawer in its open state.
 */
export const MobileViewport: Story = {
  args: {
    variant: "sticky",
    user: mockStudentUser,
    defaultMobileOpen: true,
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
    nextjs: {
      pathname: "/events",
    },
  },
};

/**
 * 4. Transparent vs Sticky Variants:
 * Visual comparison demonstrating the difference between the Sticky variant (cobalt backdrop-blur
 * and border divider) and the Transparent variant (floating seamlessly over page content).
 */
export const Variants: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--bg-cobalt)] text-[var(--text-blush)]">
      {/* Sticky Variant Section */}
      <div className="border-b border-[var(--border-blush)] pb-12">
        <div className="p-4 bg-[var(--surface-dark)]/50 text-xs font-sans-editorial uppercase tracking-wider text-[var(--text-blush-muted)]">
          Variant: Sticky (Backdrop blur &amp; divider border)
        </div>
        <div className="relative">
          <SiteHeader variant="sticky" user={mockStudentUser} />
          <div className="p-8 max-w-4xl mx-auto text-center">
            <h3 className="font-aalto text-3xl uppercase">Upcoming Hackathons</h3>
            <p className="mt-2 text-sm text-[var(--text-blush-muted)]">
              Header remains fixed at the top with a subtle cobalt blur when scrolling content.
            </p>
          </div>
        </div>
      </div>

      {/* Transparent Variant Section */}
      <div className="pt-8">
        <div className="p-4 bg-[var(--surface-dark)]/50 text-xs font-sans-editorial uppercase tracking-wider text-[var(--text-blush-muted)]">
          Variant: Transparent (Floating without background / border)
        </div>
        <div className="relative h-96 flex flex-col justify-center items-center bg-gradient-to-b from-[var(--bg-cobalt)] to-[var(--surface-dark)]">
          <SiteHeader variant="transparent" user={null} />
          <div className="p-8 max-w-4xl mx-auto text-center mt-16">
            <h2 className="font-aalto text-4xl uppercase">Hero Banner Display</h2>
            <p className="mt-2 text-sm text-[var(--text-blush-muted)]">
              Header floats cleanly over landing page heroes without background interference.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    nextjs: {
      pathname: "/events",
    },
  },
};

// ─── Interaction Test Stories ────────────────────────────────────────────────

/**
 * 5. Dropdown Opens Without Crash:
 * Interaction test that clicks the avatar trigger and verifies the dropdown
 * menu renders with Profile and Sign Out items — no console error from
 * Menu.GroupLabel requiring a Group ancestor.
 */
export const DropdownOpensWithoutCrash: Story = {
  args: {
    variant: "sticky",
    user: mockStudentUser,
  },
  parameters: {
    nextjs: { pathname: "/events" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the avatar dropdown trigger
    const trigger = canvas.getByLabelText("Open user menu");
    await userEvent.click(trigger);

    // The dropdown portal renders outside the canvas, query from document body
    const body = within(document.body);

    // Wait for dropdown content to appear and verify key items exist
    await waitFor(() => {
      expect(body.getByText("Ananya Sharma")).toBeInTheDocument();
    });

    expect(body.getByText("ananya.cs23@rvce.edu.in")).toBeInTheDocument();
    expect(body.getByText("Profile")).toBeInTheDocument();
    expect(body.getByText("My Registrations")).toBeInTheDocument();
    expect(body.getByText("Sign Out")).toBeInTheDocument();
  },
};

/**
 * 6. Mobile Logout Form Submits:
 * Interaction test that verifies the mobile Sign Out button has type="submit"
 * and is contained within a form with the correct POST action.
 */
export const MobileLogoutFormSubmits: Story = {
  args: {
    variant: "sticky",
    user: mockStudentUser,
    defaultMobileOpen: true,
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
    nextjs: { pathname: "/events" },
  },
  play: async () => {
    const body = within(document.body);

    // Wait for the sheet drawer to render (portalled to body)
    await waitFor(() => {
      expect(body.getByText("Sign Out")).toBeInTheDocument();
    });

    // Find the Sign Out button
    const signOutButton = body.getByText("Sign Out").closest("button");
    expect(signOutButton).not.toBeNull();

    // Verify it has type="submit" so it actually triggers the form POST
    expect(signOutButton!.getAttribute("type")).toBe("submit");

    // Verify the button is wrapped in a form with the correct action
    const form = signOutButton!.closest("form");
    expect(form).not.toBeNull();
    expect(form!.getAttribute("action")).toBe("/api/auth/logout");
    expect(form!.getAttribute("method")).toBe("POST");
  },
};

/**
 * 7. Keyboard Focus Visible on Nav Links:
 * Interaction test that tabs through desktop nav links and verifies each one
 * receives a visible focus ring (focus-visible:ring-2).
 */
export const KeyboardFocusVisible: Story = {
  args: {
    variant: "sticky",
    user: null,
  },
  parameters: {
    nextjs: { pathname: "/" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the desktop nav container
    const nav = canvas.getByLabelText("Main Navigation");
    const links = within(nav).getAllByRole("link");

    // Tab to each nav link and verify focus ring class is present
    for (const link of links) {
      link.focus();

      // The element should have focus-visible ring classes in its className
      expect(link.className).toContain("focus-visible:ring-2");
      expect(link.className).toContain(
        "focus-visible:ring-[var(--border-blush-strong)]"
      );
    }
  },
};

/**
 * 8. Drawer Scroll on Short Screen:
 * Interaction test that verifies the mobile drawer's scrollable region can
 * reach all navigation items and the Sign Out button, even on a short viewport.
 */
export const DrawerScrollShortScreen: Story = {
  args: {
    variant: "sticky",
    user: mockStudentUser,
    defaultMobileOpen: true,
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
    nextjs: { pathname: "/events" },
  },
  play: async () => {
    const body = within(document.body);

    // Wait for the sheet drawer to render (portalled to body)
    await waitFor(() => {
      expect(body.getByText("Events")).toBeInTheDocument();
    });

    // Verify all navigation links are present in the DOM
    expect(body.getByText("Leaderboard")).toBeInTheDocument();
    expect(body.getByText("Clubs")).toBeInTheDocument();
    expect(body.getByText("About")).toBeInTheDocument();

    // Verify account section items are in the DOM
    expect(body.getByText("Profile")).toBeInTheDocument();
    expect(body.getByText("My Registrations")).toBeInTheDocument();

    // Verify Sign Out button is in the DOM (the critical item that was
    // unreachable before the overflow-y-auto fix)
    const signOutButton = body.getByText("Sign Out").closest("button");
    expect(signOutButton).not.toBeNull();

    // Verify the scrollable wrapper has overflow-y-auto
    const sheetPopup = document.querySelector('[data-slot="sheet-content"]');
    expect(sheetPopup).not.toBeNull();

    // The first child of SheetContent should be our scrollable wrapper
    const scrollWrapper = sheetPopup!.querySelector(".overflow-y-auto");
    expect(scrollWrapper).not.toBeNull();
  },
};
