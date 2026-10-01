# Design: Services Architecture Redesign

## Context

The repository originally drafted 5 separate Spring Boot microservices in `docs/SYSTEM_DESIGN.md` and `deploy/docker-compose.yml`, but none were implemented (`backend/services/*` contains only `.gitkeep` files). The production host is a shared VPS (`220.158.157.163`). Running multiple idling JVMs imposes severe memory penalties. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Consolidate the entire platform into a streamlined, high-performance architecture:
  1. **Console**: The unified frontend application (Next.js 16 App Router) for all users—attendees, organizers, faculty, and admins.
  2. **BFF**: Next.js server-side layer managing OAuth session cookies, data aggregation, and gRPC client communication.
  3. **Backend Service**: A single Kotlin / Spring Boot core service managing PostgreSQL data persistence and business logic via gRPC.
  4. **Extensibility**: Clean domain event boundaries allowing background workers (e.g. bulk email dispatcher) to be split into separate containers only when required.
- Reduce Docker Compose memory footprint from ~3GB (5 JVMs) to ~512MB (1 JVM).
- Enforce strict institutional security (`@rvce.edu.in`) and brand design tokens (Cobalt `#4a32f9` / Blush `#fdcdd7`).

**Non-Goals:**
- Creating separate standalone frontend codebases for attendees vs. organizers (the Console handles all user roles within a unified App Router structure).
- Deploying external message queues (Kafka/RabbitMQ); in-process Spring events and transactional DB outbox are used.

## Decisions

### 1. Unified Console Frontend with Embedded BFF
- **Decision**: Consolidate all user interfaces (public event discovery, student ticketing, organizer management, administrative approvals) into a single Next.js 16 application named **Console**, with an integrated server-side **BFF**.
- **Rationale**: Keeps a single frontend codebase, reuses Cobalt & Blush Tailwind styling, shares the `lucide-react` icon set and Storybook design system, and centralizes `@rvce.edu.in` JWT session management.
- **Topology**:
  ```mermaid
  flowchart TB
      subgraph Client["Console (Next.js 16 App Router)"]
          PublicUI["Attendee Portal<br/>(Discovery, Tickets, Passes)"]
          AdminUI["Organizer & Admin Portal<br/>(Creation, Check-in, Analytics)"]
      end

      subgraph Server["Next.js Server (BFF Layer)"]
          Auth["OAuth & Session Gatekeeper<br/>(@rvce.edu.in strict check)"]
          ClientWrappers["Typed gRPC Client Wrappers<br/>(No raw protos in UI)"]
      end

      subgraph Core["Backend Service (Kotlin / Spring Boot)"]
          GRPC["gRPC Server (Single Port)"]
          Modules["Domain Modules:<br/>Identity | Event | Registration | Attendance | Notification"]
          Events["Spring Application Events"]
      end

      DB[(PostgreSQL)]

      PublicUI --> Auth
      AdminUI --> Auth
      Auth --> ClientWrappers
      ClientWrappers -->|gRPC / Protobuf| GRPC
      GRPC --> Modules
      Modules --> DB
      Modules -.-> Events
  ```

### 2. Spring Boot Modular Monolith for Backend Core
- **Decision**: Package all domain logic into a single Spring Boot application (`backend/service/`) with isolated packages: `in.rvce.events.identity`, `.event`, `.registration`, `.attendance`, `.notification`.
- **Rationale**: Eliminates cross-service network latency, multi-repo synchronization, distributed transactions, and 2.5GB+ of idle JVM memory waste.

### 3. "And More If Required": Extension Strategy
- **Decision**: Cross-domain side effects (e.g., event registration triggering a notification email) publish internal Spring `ApplicationEvent` objects.
- **Rationale**: Runs in-process with zero extra infrastructure initially. If email volume or heavy background batch jobs eventually require isolation, the event listener can be redirected to a dedicated worker container (`events-worker`) without rewriting domain logic.

## Risks / Trade-offs

- **[Risk] Route clutter in Console** → *Mitigation*: Group routes logically using Next.js route groups: `app/(public)/` for attendees and `app/(organizer)/` or `app/(admin)/` for management, with layout-level auth guards.
- **[Risk] Domain bleeding in backend** → *Mitigation*: Restrict direct package imports; modules interact solely through defined service interfaces or domain events.
- **[Risk] gRPC contract drift** → *Mitigation*: Centralize all contracts in `api/proto/` and generate TypeScript client wrappers for the BFF and Kotlin stubs for the backend.
