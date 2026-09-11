// Mock implementation of next/navigation for Storybook (Vite)

let currentPathname = "/";

export function setMockPathname(pathname: string) {
  currentPathname = pathname;
}

export function usePathname(): string {
  if (typeof window !== "undefined") {
    const globalPath = (window as unknown as { __STORYBOOK_PATHNAME__?: string }).__STORYBOOK_PATHNAME__;
    if (globalPath !== undefined) {
      return globalPath;
    }
  }
  return currentPathname;
}

export function useRouter() {
  return {
    push: (href: string) => {
      if (typeof window !== "undefined") {
        window.location.href = href;
      }
    },
    replace: (href: string) => {
      if (typeof window !== "undefined") {
        window.location.replace(href);
      }
    },
    refresh: () => {},
    back: () => {
      if (typeof window !== "undefined") {
        window.history.back();
      }
    },
    forward: () => {
      if (typeof window !== "undefined") {
        window.history.forward();
      }
    },
    prefetch: async () => {},
  };
}

export function useSearchParams() {
  return new URLSearchParams();
}

export function useParams() {
  return {};
}

export function redirect(url: string) {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
}

export function notFound() {}

const nextNavigationMock = {
  usePathname,
  useRouter,
  useSearchParams,
  useParams,
  redirect,
  notFound,
};

export default nextNavigationMock;
