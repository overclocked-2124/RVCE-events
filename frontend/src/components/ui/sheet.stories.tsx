import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./sheet";
import { Button } from "./button";

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
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
type Story = StoryObj<typeof Sheet>;

/** Right-side sheet with header, body text, and a footer action. */
export const RightSide: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="border-[var(--border-blush)] text-[var(--text-blush)]"
          />
        }
      >
        Open Sheet
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-[var(--surface-dark)] text-[var(--text-blush)] border-l border-[var(--border-blush)]"
      >
        <SheetHeader>
          <SheetTitle className="text-[var(--text-blush)]">
            Navigation
          </SheetTitle>
          <SheetDescription className="text-[var(--text-blush-muted)]">
            Example right-side sheet drawer for mobile navigation.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 text-sm text-[var(--text-blush-muted)]">
          <p>Sheet content goes here. This is the main body area.</p>
        </div>
        <SheetFooter>
          <SheetClose
            render={
              <Button
                variant="outline"
                className="border-[var(--border-blush)] text-[var(--text-blush)]"
              />
            }
          >
            Close
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/** Left-side sheet variant. */
export const LeftSide: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="border-[var(--border-blush)] text-[var(--text-blush)]"
          />
        }
      >
        Open Left Sheet
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-[var(--surface-dark)] text-[var(--text-blush)] border-r border-[var(--border-blush)]"
      >
        <SheetHeader>
          <SheetTitle className="text-[var(--text-blush)]">
            Sidebar
          </SheetTitle>
          <SheetDescription className="text-[var(--text-blush-muted)]">
            Example left-side sheet for sidebar navigation.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 text-sm text-[var(--text-blush-muted)]">
          <p>Left sheet content area.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/** Bottom sheet variant for mobile action panels. */
export const BottomSheet: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="border-[var(--border-blush)] text-[var(--text-blush)]"
          />
        }
      >
        Open Bottom Sheet
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="bg-[var(--surface-dark)] text-[var(--text-blush)] border-t border-[var(--border-blush)]"
      >
        <SheetHeader>
          <SheetTitle className="text-[var(--text-blush)]">
            Actions
          </SheetTitle>
          <SheetDescription className="text-[var(--text-blush-muted)]">
            Bottom sheet for contextual actions.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 flex gap-3">
          <Button
            variant="default"
            className="bg-[var(--text-blush)] text-[var(--bg-cobalt)]"
          >
            Confirm
          </Button>
          <SheetClose
            render={
              <Button
                variant="outline"
                className="border-[var(--border-blush)] text-[var(--text-blush)]"
              />
            }
          >
            Cancel
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/** Sheet without the default close button. */
export const NoCloseButton: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="border-[var(--border-blush)] text-[var(--text-blush)]"
          />
        }
      >
        Custom Close
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="bg-[var(--surface-dark)] text-[var(--text-blush)] border-l border-[var(--border-blush)]"
      >
        <SheetHeader>
          <SheetTitle className="text-[var(--text-blush)]">
            Custom Close
          </SheetTitle>
          <SheetDescription className="text-[var(--text-blush-muted)]">
            This sheet has no default X close button. Use the footer button or
            press Escape to close.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose
            render={
              <Button
                variant="destructive"
                className="w-full"
              />
            }
          >
            Dismiss
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
