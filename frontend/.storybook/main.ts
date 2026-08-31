import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  // Output is public/storybook, so ../public cannot be mapped wholesale onto
  // itself — map only the directories the stories actually reference.
  staticDirs: [
    { from: "../public/fonts", to: "/fonts" },
    { from: "../public/logos", to: "/logos" },
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../"),
    };
    config.define = {
      ...config.define,
      "process.env": {},
    };
    return config;
  },
};

export default config;
