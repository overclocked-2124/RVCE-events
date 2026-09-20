# Proposal: Redesign Services Architecture (Console Frontend + BFF + Backend Service)

## Why

The current architecture draft in `docs/SYSTEM_DESIGN.md` specifies five independent Spring Boot microservices (`identity-service`, `event-service`, `registration-service`, `attendance-service`, `notification-service`) with distributed Pub/Sub messaging. Running five JVM instances plus PostgreSQL and Next.js on a single shared production server causes massive memory bloat (2.5–4GB heap just for idling JVMs), extreme build/CI overhead, and premature operational complexity before any backend code has even been written.

We are redefining the system architecture around a clean, cohesive model:
1. **Console**: The unified frontend client for everything—student/attendee event discovery, ticketing, registration, as well as organizer and faculty administration.
2. **BFF (Backend-for-Frontend)**: The secure Next.js server-side layer enforcing institutional OAuth `@rvce.edu.in` sessions, translating browser actions, and aggregating data.
3. **Backend Service**: A single consolidated Kotlin / Spring Boot core service managing business logic, gRPC interfaces, and PostgreSQL persistence.
4. **Extensibility ("and more if required")**: An event-driven foundation allowing specialized background workers (e.g. bulk notification delivery, ticket check-in scanners) to be split off as standalone services only when needed.

## What Changes

- **Consolidate Backend Services**: Replace the 5 empty microservice directories (`backend/services/*`) with a single unified Kotlin / Spring Boot application (`backend/service/`) containing domain packages (`identity`, `event`, `registration`, `attendance`, `notification`).
- **Unified Frontend Console**: Position the Next.js web application as the comprehensive "Console" serving all user journeys—attendees, club organizers, faculty advisors, and system administrators—with role-based views.
- **Integrated BFF Layer**: Solidify the Next.js server layer (`frontend/src/bff/`) as the secure intermediary between the Console UI and the Backend Service, using typed gRPC client wrappers (`frontend/src/bff/clients/`).
- **Streamlined Infrastructure**: Update `deploy/docker-compose.yml` to run 1 backend JVM container, 1 Next.js Console container (with embedded BFF), and PostgreSQL.
- **Worker Extensibility**: Structure backend domain events so asynchronous jobs (email digests, batch reminders) can run in-process initially and cleanly extract into separate worker services if needed later.

## Capabilities

### New Capabilities
- `console`: Unified web frontend for all users (public event discovery, student ticketing, organizer management, and admin workflows).
- `bff-service`: Next.js 16 server-side BFF translating Console interactions into typed gRPC calls with institutional OAuth enforcement.
- `backend-service`: Consolidated Kotlin / Spring Boot core service providing gRPC APIs and PostgreSQL persistence across all core domains.

### Modified Capabilities
<!-- None: No existing specs exist under openspec/specs/ yet -->

## Impact

- **Backend Architecture**: Replaces 5 separate Gradle subprojects with 1 unified Spring Boot application.
- **Frontend Architecture**: Formalizes Next.js as the all-in-one Console with dedicated route zones (public catalog vs. organizer controls).
- **Deployment**: Reduces Docker Compose containers from 7 to 3 (Postgres, Backend, Console/BFF), saving ~2.5GB RAM.
- **Documentation**: Updates `docs/SYSTEM_DESIGN.md` and `docs/DEPLOYMENT.md` to reflect the Console + BFF + Backend Service architecture.
