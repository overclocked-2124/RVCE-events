import type { Meta, StoryObj } from "@storybook/react";
import { NotFoundView } from "./not-found-view";

const meta: Meta<typeof NotFoundView> = {
  title: "Feedback/NotFoundView",
  component: NotFoundView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "cobalt" },
  },
  argTypes: {
    homeHref: { control: "text" },
    exploreHref: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof NotFoundView>;

/** Default 404 as rendered by app/not-found.tsx on desktop. */
export const Default: Story = {
  args: {
    homeHref: "/",
    exploreHref: "/",
  },
};

/** Mobile viewport — verifies the zero-scroll layout at 390x844. */
export const Mobile: Story = {
  args: { ...Default.args },
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
};

/** Tablet viewport — verifies display type scaling between breakpoints. */
export const Tablet: Story = {
  args: { ...Default.args },
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
};

/** Once /events ships, the outline CTA points at the catalog instead of home. */
export const WithEventsCatalogLink: Story = {
  args: {
    homeHref: "/",
    exploreHref: "/events",
  },
};
