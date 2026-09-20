# RVCE Events — Technology Stack

## Purpose

RVCE Events is a self-hosted event management platform for RVCE. The application is designed to run reliably on infrastructure owned and managed by the project team, without depending on a particular cloud provider or paid hosting platform.

## Application Stack

| Area | Technology | Role |
| --- | --- | --- |
| **Console (Frontend)** | TypeScript, React 19, Next.js 16 | Unified web frontend for attendees, organizers, and administrators |
| **BFF Layer** | Next.js App Router (Server-side) | Institutional OAuth gatekeeper, session encryption, data aggregation, and gRPC translation |
| **Backend Service** | Kotlin on Java 21 (Temurin) | Application domain logic packaged as a modular monolith (`backend/service/`) |
| **Backend Framework** | Spring Boot 3.x | Dependency injection, transactions, event publishing, and gRPC server runtime |
| **API Contract** | Protocol Buffers | Strongly typed service and message definitions in `api/proto/` |
| **API Transport** | gRPC | High-performance binary communication between BFF and Backend Service |
| **Database** | PostgreSQL 17 | Relational persistence with domain-scoped tables |
| **Database Migrations** | Liquibase Community Edition | Versioned and repeatable schema migrations |
| **Persistence** | JPA / Spring Data | Standard entity persistence and repository interfaces |
| **Complex Queries** | Native SQL | Performance-critical or PostgreSQL-specific queries |
| **Background Processing** | Spring Application Events & Transactional Outbox | In-process decoupled domain events; cleanly extensible to dedicated worker containers ("and more if required") |
| **Styling & Design System** | Tailwind CSS v4 | CSS variable tokens: Cobalt (`#4a32f9`), Blush (`#fdcdd7`) |
| **Build System** | Gradle (Kotlin DSL) / npm | Builds, dependency management, code generation, and test orchestration |

## Testing Strategy

- **Kotlin/JVM tests**: Unit and integration tests for backend domain logic and gRPC endpoints.
- **Storybook & React tests**: Mandatory Storybook stories (`.stories.tsx`) for UI components, plus component tests.
- **Playwright**: Browser-level end-to-end user journeys (authentication, event registration, check-in).
- **Python smoke tests**: Lightweight deployment verification and endpoint health checks.

## Infrastructure & Deployment Scope

The platform is designed for self-hosted execution via Docker Compose:
- **Loopback isolation**: Only the Next.js Console/BFF binds to the host loopback interface (`127.0.0.1:3000`).
- **Private network**: Backend Service and PostgreSQL are not exposed to the public network.
- **Memory efficiency**: Running a single backend JVM container alongside Next.js and PostgreSQL fits comfortably within modest VPS constraints (~1GB total RAM footprint vs. ~4GB for multi-JVM setups).

## Initial Architectural Principles

- **Console is the frontend for everything**: All user roles (attendees, club leads, faculty admins) share a unified design system and Next.js frontend with role-gated routes.
- **Keep gRPC at the backend boundary**: Frontend UI components never import raw protobuf stubs; all interactions go through typed BFF wrappers.
- **Modular Monolith first**: Strong package boundaries in Kotlin keep domains decoupled without distributed systems overhead.
- **Liquibase for all database changes**: No manual DDL; all schema modifications are versioned and audited.
- **Zero secrets in code**: Strict open-source security compliance; all credentials injected via runtime environment variables.
