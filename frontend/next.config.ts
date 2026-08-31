import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Storybook's static build references its assets relatively (./sb-manager/...).
  // Rewriting /storybook -> /storybook/index.html keeps the browser URL at
  // /storybook, so those assets resolve against the site root and 404, leaving a
  // blank page. Redirect instead, so the URL carries the /storybook/ base.
  async redirects() {
    return [
      {
        source: "/storybook",
        destination: "/storybook/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
