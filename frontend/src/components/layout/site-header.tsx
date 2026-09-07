"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ChevronDown,
  LogOut,
  Menu,
  Ticket,
  User as UserIcon,
  X,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

export interface SiteHeaderUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  role?: string;
  usn?: string;
  points?: number;
}

export interface SiteHeaderProps {
  /** Header presentation mode: sticky with blur or transparent floating */
  variant?: "sticky" | "transparent";
  /** Authenticated user session. Header never fetches session directly. */
  user?: SiteHeaderUser | null;
  /** Initial open state of mobile navigation drawer (primarily for Storybook) */
  defaultMobileOpen?: boolean;
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Leaderboard", href: "/points" },
  { label: "Clubs", href: "/clubs" },
  { label: "About", href: "/about" },
];

function getInitials(name: string): string {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatUserBadge(user: SiteHeaderUser): string | null {
  const hasUsn = Boolean(user.usn);
  const hasPoints = user.points !== undefined;

  if (hasUsn && hasPoints) {
    return `${user.usn} • ${user.points} pts`;
  }
  if (hasPoints) {
    return `${user.points} pts`;
  }
  if (hasUsn) {
    return user.usn!;
  }
  return null;
}

export function SiteHeader({
  variant = "sticky",
  user = null,
  defaultMobileOpen = false,
  className,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(defaultMobileOpen);
  const badgeText = user ? formatUserBadge(user) : null;

  const isRouteActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isSticky = variant === "sticky";

  return (
    <header
      className={cn(
        "w-full transition-colors duration-200",
        isSticky
          ? "sticky top-0 z-40 bg-[var(--bg-cobalt)]/90 backdrop-blur-md border-b border-[var(--border-blush)]"
          : "absolute top-0 left-0 right-0 z-40 bg-transparent border-b border-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logos */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3.5 group rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)]"
            aria-label="RVCE Events platform home"
          >
            {/* RVCE Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/rvce_logo_blush.png"
              alt="RVCE"
              className="h-8 sm:h-11 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
            {/* Divider */}
            <span
              className="h-5 sm:h-6 w-px bg-[var(--border-blush)]"
              aria-hidden="true"
            />
            {/* Coding Club Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/coding_club_logo_blush.png"
              alt="Coding Club RVCE"
              className="h-9 sm:h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(item.href);
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 outline-none select-none",
                  active
                    ? "bg-[var(--surface-blush-subtle)] text-[var(--text-blush)] font-semibold border border-[var(--border-blush)] shadow-xs"
                    : "text-[var(--text-blush-muted)] hover:text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)]/60 border border-transparent"
                )}
              >
                {IconComponent && (
                  <IconComponent
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-150",
                      active
                        ? "text-[var(--text-blush)]"
                        : "text-[var(--text-blush-muted)]"
                    )}
                    aria-hidden="true"
                  />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: Auth Action & User Profile */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Points / USN Badge */}
              {badgeText && (
                <div
                  className="pill-badge text-xs py-1 px-3 border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] whitespace-nowrap"
                  title={user.usn ? `USN: ${user.usn}` : undefined}
                >
                  {badgeText}
                </div>
              )}

              {/* User Avatar & Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className="flex items-center gap-2 p-1 rounded-full text-[var(--text-blush)] transition-all hover:bg-[var(--surface-blush-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-blush-strong)] cursor-pointer"
                      aria-label="Open user menu"
                    />
                  }
                >
                  <Avatar size="default" className="border border-[var(--border-blush)]">
                    {user.picture && (
                      <AvatarImage src={user.picture} alt={user.name} />
                    )}
                    <AvatarFallback className="bg-[var(--surface-dark)] text-[var(--text-blush)] font-semibold text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="size-3.5 text-[var(--text-blush-muted)]" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-56 bg-[var(--surface-dark)] text-[var(--text-blush)] border border-[var(--border-blush)] p-1.5 shadow-xl rounded-xl"
                >
                  <DropdownMenuLabel className="px-2 py-1.5 text-xs text-[var(--text-blush-muted)]">
                    <p className="font-semibold text-sm text-[var(--text-blush)] truncate">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-[var(--text-blush-muted)]">
                      {user.email}
                    </p>
                    {user.role && (
                      <p className="font-sans-editorial mt-1 text-[0.65rem] uppercase tracking-wider text-[var(--text-blush)]">
                        {user.role}
                      </p>
                    )}
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-[var(--border-blush)]" />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      render={<Link href="/profile" />}
                      className="cursor-pointer gap-2 px-2.5 py-2 text-sm text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg transition-colors focus:bg-[var(--surface-blush-subtle)] focus:text-[var(--text-blush)]"
                    >
                      <UserIcon className="size-4 text-[var(--text-blush-muted)]" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      render={<Link href="/registrations" />}
                      className="cursor-pointer gap-2 px-2.5 py-2 text-sm text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg transition-colors focus:bg-[var(--surface-blush-subtle)] focus:text-[var(--text-blush)]"
                    >
                      <Ticket className="size-4 text-[var(--text-blush-muted)]" />
                      <span>My Registrations</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="bg-[var(--border-blush)]" />

                  <form action="/api/auth/logout" method="POST">
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors focus:bg-destructive/10 focus:outline-none cursor-pointer text-left"
                    >
                      <LogOut className="size-4 shrink-0" />
                      <span>Sign Out</span>
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button
              variant="default"
              size="default"
              nativeButton={false}
              className="bg-[var(--text-blush)] text-[var(--bg-cobalt)] hover:bg-[var(--text-blush)]/90 font-semibold px-4"
              render={<a href="/api/auth/login" />}
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile: Hamburger Menu Trigger (< 768px) */}
        <div className="flex items-center md:hidden gap-2">
          {/* Quick Avatar/Points for Logged-in Users on Mobile Bar */}
          {user && (
            <Avatar size="sm" className="border border-[var(--border-blush)]">
              {user.picture && (
                <AvatarImage src={user.picture} alt={user.name} />
              )}
              <AvatarFallback className="bg-[var(--surface-dark)] text-[var(--text-blush)] text-[0.65rem] font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] hover:text-[var(--text-blush)] cursor-pointer"
                  aria-label={
                    mobileOpen
                      ? "Close main navigation menu"
                      : "Open main navigation menu"
                  }
                  aria-expanded={mobileOpen}
                />
              }
            >
              {mobileOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:max-w-sm bg-[var(--surface-dark)] text-[var(--text-blush)] border-l border-[var(--border-blush)] p-6 flex flex-col justify-between"
            >
              <div>
                <SheetHeader className="p-0 text-left border-b border-[var(--border-blush)] pb-5">
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/rvce_logo_blush.png"
                      alt="RVCE"
                      className="h-8 w-auto object-contain"
                    />
                    <span
                      className="h-5 w-px bg-[var(--border-blush)]"
                      aria-hidden="true"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/coding_club_logo_blush.png"
                      alt="Coding Club"
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                  <SheetTitle className="font-aalto text-xl uppercase tracking-wider text-[var(--text-blush)] mt-4">
                    RVCE Events
                  </SheetTitle>
                  <SheetDescription className="text-xs text-[var(--text-blush-muted)]">
                    Official events portal for the RVCE student community.
                  </SheetDescription>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-1.5 mt-6" aria-label="Mobile Navigation">
                  {NAV_ITEMS.map((item) => {
                    const active = isRouteActive(item.href);
                    const IconComponent = item.icon;
                    return (
                      <SheetClose
                        key={item.href}
                        nativeButton={false}
                        render={
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center gap-3 px-3.5 py-3 rounded-xl text-base font-medium transition-colors outline-none",
                              active
                                ? "bg-[var(--surface-blush-subtle)] text-[var(--text-blush)] font-semibold border border-[var(--border-blush)]"
                                : "text-[var(--text-blush-muted)] hover:text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)]/50"
                            )}
                          />
                        }
                      >
                        {IconComponent && (
                          <IconComponent
                            className={cn(
                              "size-5 shrink-0",
                              active
                                ? "text-[var(--text-blush)]"
                                : "text-[var(--text-blush-muted)]"
                            )}
                            aria-hidden="true"
                          />
                        )}
                        <span>{item.label}</span>
                      </SheetClose>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Drawer Bottom Section: Auth / Account */}
              <div className="border-t border-[var(--border-blush)] pt-5 mt-auto">
                {user ? (
                  <div className="flex flex-col gap-4">
                    {/* User Profile Overview */}
                    <div className="flex items-center gap-3">
                      <Avatar size="default" className="border border-[var(--border-blush)]">
                        {user.picture && (
                          <AvatarImage src={user.picture} alt={user.name} />
                        )}
                        <AvatarFallback className="bg-[var(--surface-dark-raised)] text-[var(--text-blush)] font-semibold">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm text-[var(--text-blush)] truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-[var(--text-blush-muted)] truncate">
                          {user.email}
                        </p>
                      </div>
                      {badgeText && (
                        <div className="pill-badge text-[0.65rem] py-0.5 px-2.5 border-[var(--border-blush)] bg-[var(--surface-blush-subtle)] whitespace-nowrap">
                          {badgeText}
                        </div>
                      )}
                    </div>

                    {/* Quick Account Links */}
                    <div className="flex flex-col gap-1">
                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            href="/profile"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg transition-colors"
                          />
                        }
                      >
                        <UserIcon className="size-4 text-[var(--text-blush-muted)]" />
                        <span>Profile</span>
                      </SheetClose>
                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            href="/registrations"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg transition-colors"
                          />
                        }
                      >
                        <Ticket className="size-4 text-[var(--text-blush-muted)]" />
                        <span>My Registrations</span>
                      </SheetClose>
                    </div>

                    {/* Mobile Sign Out */}
                    <form action="/api/auth/logout" method="POST">
                      <Button
                        variant="destructive"
                        size="default"
                        className="w-full justify-center gap-2 border border-destructive/30"
                      >
                        <LogOut className="size-4" />
                        <span>Sign Out</span>
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-[var(--text-blush-muted)]">
                      Sign in with your @rvce.edu.in institutional email to register for events.
                    </p>
                    <Button
                      variant="default"
                      size="default"
                      nativeButton={false}
                      className="w-full justify-center bg-[var(--text-blush)] text-[var(--bg-cobalt)] hover:bg-[var(--text-blush)]/90 font-semibold"
                      render={<a href="/api/auth/login" />}
                    >
                      Sign In with RVCE Mail
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
