import type { Preview } from "@storybook/react";
import "../app/globals.css";

// Polyfill process for Next.js components (next/link, next/image) running in Vite/browser environment
if (typeof window !== "undefined" && !(window as unknown as { process?: unknown }).process) {
  (window as unknown as { process: { env: Record<string, string> } }).process = { env: {} };
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "cobalt",
      values: [
        {
          name: "cobalt",
          value: "#4a32f9",
        },
        {
          name: "surface-dark",
          value: "#1e1b4b",
        },
        {
          name: "dark",
          value: "#0f172a",
        },
        {
          name: "light",
          value: "#f8fafc",
        },
      ],
    },
  },
};

export default preview;
