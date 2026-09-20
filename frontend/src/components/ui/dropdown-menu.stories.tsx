import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";
import { Button } from "./button";
import {
  Calendar,
  LogOut,
  Settings,
  Ticket,
  User as UserIcon,
} from "lucide-react";
import { fn } from "@storybook/test";

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8 bg-[var(--bg-cobalt)] min-h-[320px] flex items-start justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/** Default dropdown with action items in the brand palette. */
export const Default: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="border-[var(--border-blush)] text-[var(--text-blush)]"
          />
        }
      >
        Open Menu
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-48 bg-[var(--surface-dark)] text-[var(--text-blush)] border border-[var(--border-blush)] shadow-xl rounded-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-[var(--text-blush-muted)]">
            Account
          </DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer gap-2 text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg">
            <UserIcon className="size-4 text-[var(--text-blush-muted)]" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer gap-2 text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg">
            <Ticket className="size-4 text-[var(--text-blush-muted)]" />
            <span>Registrations</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer gap-2 text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg">
            <Settings className="size-4 text-[var(--text-blush-muted)]" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[var(--border-blush)]" />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer gap-2 rounded-lg"
          onClick={fn()}
        >
          <LogOut className="size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** Dropdown with checkbox items for toggling options. */
export const WithCheckboxItems: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="border-[var(--border-blush)] text-[var(--text-blush)]"
          />
        }
      >
        Filters
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-48 bg-[var(--surface-dark)] text-[var(--text-blush)] border border-[var(--border-blush)] shadow-xl rounded-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-[var(--text-blush-muted)]">
            Event Types
          </DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked className="text-[var(--text-blush)] rounded-lg">
            Hackathons
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={false} className="text-[var(--text-blush)] rounded-lg">
            Workshops
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked className="text-[var(--text-blush)] rounded-lg">
            Guest Lectures
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** Dropdown with a nested submenu. */
export const WithSubmenu: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="border-[var(--border-blush)] text-[var(--text-blush)]"
          />
        }
      >
        Navigate
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="w-48 bg-[var(--surface-dark)] text-[var(--text-blush)] border border-[var(--border-blush)] shadow-xl rounded-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer gap-2 text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg">
            <Calendar className="size-4 text-[var(--text-blush-muted)]" />
            <span>Events</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2 text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg">
              <Settings className="size-4 text-[var(--text-blush-muted)]" />
              <span>More</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="bg-[var(--surface-dark)] text-[var(--text-blush)] border border-[var(--border-blush)] shadow-xl rounded-xl">
              <DropdownMenuItem className="cursor-pointer gap-2 text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg">
                <span>About</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2 text-[var(--text-blush)] hover:bg-[var(--surface-blush-subtle)] rounded-lg">
                <span>Contact</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
