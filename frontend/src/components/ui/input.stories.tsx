import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8 bg-[var(--bg-cobalt)] min-h-[160px] flex items-center justify-center">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter attendee USN...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "1RV22CS045",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Scanner disabled",
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: "INVALID_CODE",
    "aria-invalid": true,
  },
};

export const Mobile: Story = {
  args: {
    placeholder: "Enter Ticket Code / USN",
  },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};
