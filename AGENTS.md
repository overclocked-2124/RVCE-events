# RVCE Events — Project Rules & Conventions

> **This is the canonical source of truth for all coding agents working on this repository.**
> Every sub-directory may contain its own `AGENTS.md` with scope-specific rules that extend (never contradict) this root document.

---

## 1. Project Identity

| Key | Value |
| --- | --- |
| **Project** | RVCE Events Platform |
| **Organization** | Coding Club RVCE |
| **Gradle Group** | `in.rvce.events` |
| **Gradle Root Project** | `rvce-events` |
| **Version** | `0.1.0-SNAPSHOT` |
| **Production URL** | `https://events.codingclubrvce.com` |
| **Staging URL** | `https://events.test.codingclubrvce.com` |

---

## 2. Design System & Color Palette

The official brand palette is derived from the Coming Soon page and **must be used consistently** across the entire events platform — frontend, emails, and any visual material.

### Primary Palette

| Token | CSS Variable | Hex / Value | Usage |
| --- | --- | --- | --- |
| **Cobalt** (Primary BG) | `--bg-cobalt` | `#4a32f9` | Primary background, hero sections, prominent surfaces |
| **Blush** (Primary Text) | `--text-blush` | `#fdcdd7` | Primary text, headings, icons on cobalt backgrounds |
| **Blush Muted** | `--text-blush-muted` | `rgba(253, 205, 215, 0.75)` | Secondary / body text, captions |
| **Border Light** | `--border-blush` | `rgba(253, 205, 215, 0.4)` | Dividers, subtle borders |
| **Border Strong** | `--border-blush-strong` | `#fdcdd7` | Active borders, focus rings |

### Extended Palette (for UI states — use sparingly)

| Token | Hex | Usage |
| --- | --- | --- |
| **Success** | `#10b981` | Success toasts, checkmarks, confirmed states |
| **Warning** | `#f59e0b` | Warnings, pending states, capacity alerts |
| **Error** | `#ef4444` | Error messages, destructive actions |
| **Info** | `#3b82f6` | Informational badges, links |
| **Surface Dark** | `#1e1b4b` | Cards, modals, elevated surfaces on cobalt |
| **Surface Light** | `#ede9fe` | Light-mode card backgrounds (if used) |

### Typography

| Font | CSS Variable | Usage |
| --- | --- | --- |
| **Aalto Display** | `--font-aalto-local` | Hero headings, display text, brand typography |
| **Inter** | `--font-inter` | Body text, UI labels, form inputs, navigation |
| **Space Grotesk** | `--font-space-grotesk` | Code-adjacent text, badges, monospaced-feel labels |

### Rules
- **Never use raw hex codes in components.** Always reference CSS variables (`var(--bg-cobalt)`) or Tailwind classes mapped to these tokens.
- **Never introduce new brand colors** without updating this file and `frontend/app/globals.css`.
- **Selection highlight**: Background `--text-blush`, text `--bg-cobalt`.

---

## 3. Repository Structure & "Where Things Go"

```text
RVCE-events/
├── AGENTS.md                    ← THIS FILE (root rules)
├── CONTRIBUTING.md              ← Contributor guide
├── README.md                    ← Project overview
│
├── api/                         ← ALL Protocol Buffer / gRPC contracts
│   └── proto/                   ← .proto files organized by service domain
│
├── backend/                     ← ALL Kotlin/JVM backend code
│   ├── services/                ← Individual Spring Boot microservices
│   │   ├── identity-service/
│   │   ├── event-service/
│   │   ├── registration-service/
│   │   ├── attendance-service/
│   │   └── notification-service/
│   ├── libraries/               ← Shared JVM libraries
│   │   ├── auth-context/        ← Auth/session context propagation
│   │   ├── messaging/           ← Pub/Sub & outbox pattern abstractions
│   │   └── persistence/         ← JPA/Spring Data/Liquibase common utils
│   └── database/
│       └── liquibase/           ← Service-owned DB migration changesets
│
├── frontend/                    ← ALL frontend code (Next.js 16 App Router)
│   ├── app/                     ← Next.js App Router pages & layouts
│   │   └── api/                 ← Next.js Route Handlers (BFF API endpoints)
│   ├── src/
│   │   └── bff/                 ← Backend-for-Frontend layer
│   │       ├── auth/            ← Session/auth helpers
│   │       ├── clients/         ← gRPC client wrappers (NOT raw protobuf)
│   │       └── mappers/         ← Proto-to-UI data transformers
│   └── public/                  ← Static assets (fonts, logos, images)
│       ├── fonts/               ← Custom fonts (Aalto Display OTF)
│       └── logos/               ← Brand logos (RVCE, Coding Club)
│
├── deploy/                      ← Docker Compose, env templates, infra configs
│   ├── docker-compose.yml
│   └── server.env.example
│
├── docs/                        ← ALL documentation lives here
│   ├── PRD.md                   ← Canonical Product Requirements Document
│   ├── SYSTEM_DESIGN.md         ← Architecture & system design
│   ├── FEATURES.md              ← Feature requirements & milestones
│   ├── DESIGN.md                ← Tech stack & design decisions
│   ├── DEPLOYMENT.md            ← Deployment runbook
│   └── adr/                     ← Architecture Decision Records
│
├── scripts/                     ← Operational scripts
│   ├── deploy/                  ← Deployment helper scripts
│   └── server/                  ← Server bootstrap & setup scripts
│
├── tests/                       ← ALL tests (separated from source)
│   ├── jvm/                     ← Backend Kotlin unit/integration tests
│   ├── playwright/              ← Browser E2E tests
│   └── smoke-python/            ← Lightweight smoke verification scripts
│
└── .github/                     ← CI/CD, issue templates, PR templates
    ├── workflows/
    │   ├── ci.yml               ← PR/push validation (lint, build, test)
    │   └── deploy.yml           ← Staging auto-deploy, production manual
    ├── ISSUE_TEMPLATE/
    └── PULL_REQUEST_TEMPLATE.md
```

### Absolute Rules

1. **Documentation**: ALL `.md` documentation files (design docs, feature specs, ADRs, runbooks) go in `docs/`. The only exceptions are `README.md`, `CONTRIBUTING.md`, and `AGENTS.md` files at repo or module roots.
2. **Proto Contracts**: ALL `.proto` files live under `api/proto/`, organized by service domain (e.g., `api/proto/identity/`, `api/proto/event/`). Never place `.proto` files inside `backend/` or `frontend/`.
3. **No Direct Protobuf Usage in Frontend**: The frontend **must never** import or use raw generated protobuf types directly. All gRPC communication goes through typed **wrapper clients** in `frontend/src/bff/clients/` that expose clean TypeScript interfaces. Proto-to-UI mapping happens in `frontend/src/bff/mappers/`.
4. **Backend Services**: Each service gets its own directory under `backend/services/<service-name>/` with its own `build.gradle.kts`, source tree, and Dockerfile.
5. **Shared Backend Code**: Shared JVM code goes in `backend/libraries/<library-name>/`. Never duplicate utility code across services.
6. **Database Migrations**: Liquibase changesets go in `backend/database/liquibase/`, organized by owning service. Each service owns its schema — no cross-service direct DB access.
7. **Tests**: Tests live in `tests/` at the repo root, **not** inside individual service or frontend directories (except for co-located unit test files that are standard in each framework).
8. **Scripts**: All operational/deployment scripts go in `scripts/`. Never put scripts in the repo root.
9. **Static Assets**: All public static assets (images, fonts, logos) go in `frontend/public/`. Never commit assets elsewhere.
10. **Environment Files**: `.env` and `server.env` files are **gitignored**. Only `.env.example` and `server.env.example` templates are committed. Never commit secrets or credentials.

---

## 4. Architecture Rules

### 4.1 Frontend → Backend Communication

```
Browser → Next.js App Router (React Server Components / Route Handlers)
       → BFF Layer (frontend/src/bff/)
       → gRPC Client Wrappers (frontend/src/bff/clients/)
       → Kotlin/Spring Boot Services (backend/services/)
       → PostgreSQL
```

- The **BFF (Backend-for-Frontend)** layer in the Next.js server handles: session auth context, gRPC translation, data aggregation from multiple services, and response shaping for the UI.
- **Never call backend services directly from React client components.** All data fetching goes through Next.js server-side mechanisms (Server Components, Route Handlers, Server Actions).

### 4.2 Inter-Service Communication

- Services communicate via **gRPC** using contracts defined in `api/proto/`.
- **Asynchronous operations** use the transactional outbox pattern with a pub/sub message broker.
- Domain events (e.g., `EventPublished`, `RegistrationCreated`, `AttendanceRecorded`) are published via the `messaging` library.
- **No service may directly access another service's database.** All cross-service data access is via gRPC calls or domain events.

### 4.3 Database Conventions

- One logical schema per service in the shared PostgreSQL instance.
- All schema changes via **Liquibase** changesets — never manual DDL.
- Use **JPA/Spring Data** for standard CRUD, **native SQL** for performance-sensitive queries.
- Database credentials are injected via environment variables, never hardcoded.

### 4.4 Authentication & Open-Source Dev Mock Mode

- **Institutional Google OAuth 2.0**: Strictly enforces `@rvce.edu.in` email and `hd === 'rvce.edu.in'` hosted domain claims on the server-side BFF layer (`frontend/src/bff/auth/`). Personal accounts (`@gmail.com`) and unauthorized domains are rejected immediately.
- **Stateless JWT Sessions**: Session state is managed via encrypted, `HttpOnly`, `SameSite=Lax` JWT cookies signed using `jose` with `HS256`.
- **Route Protection**: Unauthenticated access to protected routes (e.g. `/coming-soon`) redirects to `/`. Authenticated access to `/` redirects to `/coming-soon`.
- **Open-Source Dev Mock Auth**: In development mode (`NODE_ENV !== 'production'`), contributors can use built-in mock profiles (`/api/auth/mock?profile=student|faculty|gmail`) and the `<DevAuthPanel />` UI to test student, faculty, and domain-rejection flows without requiring Google Cloud credentials.

---

## 5. Code Style & Conventions

### 5.1 General

- **Language**: TypeScript for frontend, Kotlin for backend. No Java in new code.
- **Formatting**: Follow each language's standard formatter (Prettier/ESLint for TS, ktlint for Kotlin).
- **Naming**: Use `kebab-case` for file/directory names, `PascalCase` for components/classes, `camelCase` for functions/variables.
- **Imports**: Absolute imports with `@/` prefix in frontend (maps to `frontend/`).
- **Comments**: Preserve all existing comments and docstrings unrelated to your changes. Add JSDoc/KDoc for all public APIs.

### 5.2 Frontend (TypeScript / React / Next.js)

- **Framework**: Next.js 16 with App Router. Use React Server Components by default; add `"use client"` only when necessary.
- **Styling**: Tailwind CSS v4 with CSS variables from `globals.css`. Never use inline `style={{}}` for brand colors.
- **Forms**: `react-hook-form` + `zod` for all form validation.
- **HTTP Client**: `axios` for external API calls from BFF layer.
- **Icons**: `lucide-react` exclusively. Do not introduce other icon libraries.
- **Class Merging**: Use `clsx` + `tailwind-merge` for conditional class composition.
- **Path Alias**: `@/` maps to the `frontend/` root.
- **Storybook Stories Mandatory**: Every UI component created under `src/components/` MUST include a companion Storybook story file (`<ComponentName>.stories.tsx`). Stories must showcase all variants, responsive behavior, and interactive states (default, hover, loading, disabled) rendered on the Cobalt (`#4a32f9`) brand canvas.
- **Storybook Access**: Storybook is compiled to `public/storybook` and served live at `/storybook` (`https://events.codingclubrvce.com/storybook`). Test builds with `npm run build:storybook`.

### 5.3 Backend (Kotlin / Spring Boot)

- **JDK**: Java 21 (Temurin).
- **Build**: Gradle Kotlin DSL. All dependencies declared in individual module `build.gradle.kts`.
- **Package Root**: `in.rvce.events.<service-name>` (e.g., `in.rvce.events.identity`, `in.rvce.events.event`).
- **Spring Profiles**: `development`, `production`. Profile-specific configs via `application-{profile}.yml`.
- **gRPC Services**: Implement service stubs generated from `api/proto/`. Service implementations go in `<service>/src/main/kotlin/.../grpc/`.
- **Error Handling**: Use gRPC status codes consistently. Map domain exceptions to appropriate gRPC statuses.

---

## 6. Git & CI/CD Rules

### 6.1 Branching

- `main` is the primary branch. All merges to `main` trigger automatic staging deployment.
- Feature branches: `feat/issue-<number>-short-description`
- Bug fixes: `fix/issue-<number>-short-description`
- Documentation: `docs/issue-<number>-short-description`

### 6.2 Commits

Use **Conventional Commits**:
- `feat(frontend): add event card component`
- `fix(backend): resolve race condition in registration capacity check`
- `docs: update system design with notification architecture`
- `chore: upgrade Spring Boot to 3.x`
- `ci: add backend integration test step`

### 6.3 Pull Requests

- Every PR must reference an issue: `Fixes #<number>`.
- **Frontend PRs must include desktop AND mobile screenshots.** No exceptions.
- All CI checks (lint, build, tests) must pass before merge.
- PRs require at least one maintainer review.

### 6.4 Deployment Pipeline

| Trigger | Environment | URL |
| --- | --- | --- |
| Push to `main` | **Staging** (automatic) | `events.test.codingclubrvce.com` |
| Manual `workflow_dispatch` | **Production** | `events.codingclubrvce.com` |

- Container images are built and pushed to **GitHub Container Registry (GHCR)**.
- Image tags use the Git SHA (`${{ github.sha }}`).
- Deployment uses isolated Docker Compose projects: `rvce-events` (prod, port 3200) and `rvce-events-staging` (staging, port 3300).
- **Never run `docker system prune`** or `docker compose down --remove-orphans` on the server — other projects share the host.

---

## 7. Deployment & Infrastructure

### 7.1 Server Architecture

| Component | Value |
| --- | --- |
| **Host** | `220.158.157.163` (Ubuntu 24.04) |
| **Deploy User** | `rvce-deploy` (in `docker` group) |
| **Production Path** | `/opt/rvce-events` |
| **Staging Path** | `/opt/rvce-events-staging` |
| **Web Server** | Nginx reverse proxy on host |
| **SSL** | Let's Encrypt via Certbot |

### 7.2 Docker Conventions

- **Compose Project Names**: `rvce-events` (production), `rvce-events-staging` (staging). Set via `COMPOSE_PROJECT_NAME`.
- **Network**: Each environment gets its own isolated bridge network (`rvce-events_application`, `rvce-events-staging_application`).
- **Volumes**: Named volumes prefixed by project name (e.g., `rvce-events_postgres-data`).
- **Port Binding**: Always bind to `127.0.0.1` loopback, never `0.0.0.0`.
- **Frontend image**: Multi-stage build with `node:22-alpine`, Next.js standalone output, runs unprivileged on port 3000 internally.

---

## 8. Security & Environment Variable Management (Public Repository)

> **CRITICAL: This repository is completely PUBLIC and OPEN-SOURCE.**
> Any secret, token, private key, or credential committed to Git is permanently compromised and visible to the world.

### 8.1 Zero-Tolerance Rules for Secrets
- **NEVER commit any secret, credential, private token, or connection string to Git.**
- **NEVER commit `.env`, `.env.local`, `.env.production`, or `server.env` files.**
- **Only commit template files**: `.env.example` (for frontend / local development) and `deploy/server.env.example` (for Docker/server deployments) with sanitized, placeholder values (e.g. `your-google-client-id-here`, `change_me_in_production`).
- **Never embed credentials in code**: gRPC auth tokens, database passwords, OAuth client secrets, API keys, and JWT signing secrets must ALWAYS be loaded from environment variables at runtime.

### 8.2 Environment Variable Lifecycle
- **Local Development**:
  - Copy `.env.example` to `.env.local` (frontend) or create local environment configs.
  - These files are strictly ignored by `.gitignore`.
- **CI / CD Pipelines**:
  - Inject secrets exclusively via **GitHub Actions Repository Secrets** or GitHub Environment Secrets.
  - Secrets are passed as environment variables during build/deploy steps and never logged or echoed in CI logs.
- **Production & Staging Deployments**:
  - Environment files on the server (`/opt/rvce-events/server.env` and `/opt/rvce-events-staging/server.env`) are created and managed out-of-band directly on the host with restricted permissions (`chmod 600`).
  - Docker Compose binds these environment variables into container runtimes.

### 8.3 Infrastructure & General Security
- **SSH access**: Key-based authentication only. The `rvce-deploy` user has no sudo privileges.
- **Container images**: Use Alpine-based images. Run as non-root users inside containers.
- **Dependencies**: Address Dependabot alerts promptly. Pin major versions.
- **Accidental Leak Protocol**: If any secret or private key is accidentally committed or pushed, it must be considered **immediately compromised**. Revoke, invalidate, and rotate the secret in the provider console (e.g. Google Cloud Console, DB, etc.) immediately.

