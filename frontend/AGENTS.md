# Frontend — Agent Rules

> Extends the root [AGENTS.md](../AGENTS.md). Read the root document first for project-wide rules.

---

## Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| **Next.js** | 16.3 (App Router, `standalone` output) | Framework |
| **React** | 19.2 | UI Library |
| **TypeScript** | 5.x (strict mode) | Language |
| **Tailwind CSS** | 4.x (via `@tailwindcss/postcss`) | Styling |
| **Zod** | 4.x | Schema validation |
| **React Hook Form** | 7.x + `@hookform/resolvers` | Form management |
| **Axios** | 1.x | HTTP client (BFF → external APIs) |
| **Lucide React** | 1.x | Icons (exclusive — no other icon library) |
| **clsx + tailwind-merge** | Latest | Conditional class composition |

> **⚠️ Next.js 16 has breaking changes compared to earlier versions.** When unsure about APIs, consult `node_modules/next/dist/docs/` or the Next.js 16 documentation. Do not assume Next.js 14/15 patterns work unchanged.

---

## Color Palette — MANDATORY

All colors must use CSS variables defined in `app/globals.css`. **Never use raw hex codes in components.**

```css
:root {
  --bg-cobalt: #4a32f9;          /* Primary background */
  --text-blush: #fdcdd7;          /* Primary text on cobalt */
  --text-blush-muted: rgba(253, 205, 215, 0.75);  /* Secondary text */
  --border-blush: rgba(253, 205, 215, 0.4);        /* Subtle borders */
  --border-blush-strong: #fdcdd7; /* Active/focus borders */
}
```

### In Tailwind Classes

Use Tailwind's arbitrary value syntax referencing CSS variables:
```tsx
// ✅ CORRECT — uses CSS variables
<div className="bg-[var(--bg-cobalt)] text-[var(--text-blush)]">

// ✅ CORRECT — Tailwind classes mapped in globals.css or theme
<div className="bg-cobalt text-blush">

// ❌ WRONG — raw hex codes
<div className="bg-[#4a32f9] text-[#fdcdd7]">

// ❌ WRONG — inline styles
<div style={{ backgroundColor: '#4a32f9' }}>
```

### Extended State Colors (for UI states only)

| State | Hex | Tailwind |
| --- | --- | --- |
| Success | `#10b981` | `text-emerald-500` / `bg-emerald-500` |
| Warning | `#f59e0b` | `text-amber-500` / `bg-amber-500` |
| Error | `#ef4444` | `text-red-500` / `bg-red-500` |
| Info | `#3b82f6` | `text-blue-500` / `bg-blue-500` |

---

## Typography

| Font | CSS Variable | Class | Usage |
| --- | --- | --- | --- |
| **Aalto Display** | `--font-aalto-local` | `.font-aalto` | Hero headings, display text, brand moments |
| **Inter** | `--font-inter` | Default body font | Body text, UI labels, navigation, forms |
| **Space Grotesk** | `--font-space-grotesk` | `.font-sans-editorial` | Badges, tags, editorial labels |

- Fonts are loaded in `app/layout.tsx` via `next/font/google` (Inter, Space Grotesk) and `next/font/local` (Aalto Display from `public/fonts/`).
- **Never add new font files** without updating `layout.tsx` and this document.

---

## Directory Structure

```text
frontend/
├── app/                    ← Next.js App Router (pages, layouts, route handlers)
│   ├── globals.css         ← Global styles, CSS variables, font-face declarations
│   ├── layout.tsx          ← Root layout (fonts, metadata, body classes)
│   ├── page.tsx            ← Homepage
│   ├── favicon.ico         ← Site favicon
│   ├── icon.png            ← PWA icon (192x192)
│   ├── apple-icon.png      ← Apple touch icon (180x180)
│   └── api/                ← Next.js Route Handlers (BFF API endpoints)
│
├── src/
│   └── bff/                ← Backend-for-Frontend layer (server-side only)
│       ├── auth/           ← Session management, auth context helpers
│       ├── clients/        ← gRPC client WRAPPERS (typed TS interfaces)
│       └── mappers/        ← Proto → UI model transformers
│
├── public/                 ← Static assets served at root URL
│   ├── fonts/              ← Custom font files (Aalto Display OTF)
│   ├── logos/              ← Brand logos (RVCE, Coding Club — blush & white variants)
│   ├── favicon.ico         ← Fallback favicon
│   └── icon-512.png        ← Large PWA icon (512x512)
│
├── Dockerfile              ← Multi-stage Docker build (node:22-alpine, standalone)
├── package.json
├── tsconfig.json           ← Strict mode, path alias @/ → frontend/
├── next.config.ts          ← output: "standalone"
├── eslint.config.mjs
└── postcss.config.mjs
```

### Rules

1. **Pages & Layouts**: All routes go under `app/` using Next.js App Router conventions. Use folder-based routing with `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`.
2. **Components**: Create a `components/` directory under `app/` or as `frontend/components/` for shared UI components. Group by feature (e.g., `components/events/`, `components/auth/`).
3. **BFF Layer**: All backend communication logic lives in `src/bff/`. The BFF is server-side only — never import from `src/bff/` in client components.
4. **No Direct Protobuf**: Frontend must NEVER import raw `.proto` generated types. Use typed wrapper clients in `src/bff/clients/` that expose clean TypeScript interfaces. Data transformation happens in `src/bff/mappers/`.
5. **Static Assets**: All images, fonts, and media go in `public/`. Use Next.js `<Image>` component for optimized image rendering.
6. **Path Aliases**: Use `@/` for absolute imports (configured in `tsconfig.json`).
7. **Environment Variables & Public Repo Security**: Never commit `.env` or `.env.local`. Document all required keys in `frontend/.env.example` with dummy placeholders. Client-exposed variables must be prefixed with `NEXT_PUBLIC_` and must NEVER contain secrets or private tokens.
8. **Authentication & Open-Source Dev Mock Mode**: Google OAuth institutional verification is encapsulated in `src/bff/auth/`. For frictionless open-source local testing without requiring personal Google Cloud credentials, Dev Mock Auth (`/api/auth/mock` and `<DevAuthPanel />`) is active when `NODE_ENV !== "production"`.

---

## Component Conventions

### Server vs. Client Components
- **Default to Server Components.** Only add `"use client"` when you need:
  - Browser APIs (`window`, `document`, `localStorage`)
  - React hooks (`useState`, `useEffect`, `useRef`)
  - Event handlers (`onClick`, `onChange`, `onSubmit`)
  - Third-party client-only libraries
- **Never make a component client-side just for data fetching.** Use Server Components or Server Actions.

### Component Structure
```tsx
// 1. Directive (only if needed)
"use client";

// 2. Imports
import React from "react";
import { cn } from "@/lib/utils";  // clsx + tailwind-merge helper

// 3. Types
interface EventCardProps {
  title: string;
  date: string;
  className?: string;
}

// 4. Component
export function EventCard({ title, date, className }: EventCardProps) {
  return (
    <div className={cn("rounded-xl bg-[var(--surface-dark)] p-6", className)}>
      <h3 className="font-aalto text-2xl text-[var(--text-blush)]">{title}</h3>
      <p className="text-[var(--text-blush-muted)]">{date}</p>
    </div>
  );
}
```

### Storybook Stories (MANDATORY for all UI Components)
- Every reusable component in `src/components/ui/` or `src/components/` MUST have a co-located Storybook story file (`<ComponentName>.stories.tsx`).
- Stories must document:
  1. All component variants (`primary`, `outline`, `ghost`, etc.)
  2. All size variants (`sm`, `md`, `lg`)
  3. Interactive states (`hover`, `focus`, `isLoading`, `disabled`)
  4. Proper contrast on the brand Cobalt (`#4a32f9`) and dark surface backgrounds.
- Run local Storybook dev server with `npm run storybook`.
- Test static Storybook production build with `npm run build:storybook`.

### Forms
- Always use `react-hook-form` with `zod` schemas for validation.
- Define Zod schemas in the same file or a co-located `schema.ts`.
- Use `@hookform/resolvers/zod` to connect Zod schemas to React Hook Form.

---

## Build & Quality

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build (must pass before PR merge) |
| `npm run storybook` | Run Storybook development environment on port 6006 |
| `npm run build:storybook` | Build static Storybook into `public/storybook` (served at `/storybook`) |
| `npm run lint` | ESLint checks (must pass before PR merge) |
| `npm start` | Start production server (standalone mode) |

- **All PRs modifying frontend code must include desktop AND mobile screenshots.**
- **All PRs adding or modifying UI components must include a companion Storybook story file.**
- The Docker build uses `output: "standalone"` — the container runs a minimal Node.js server, not the full `node_modules`.

