import type { Meta, StoryObj } from "@storybook/react";
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
