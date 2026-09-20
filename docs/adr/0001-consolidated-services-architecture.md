# ADR-0001: Consolidated Services Architecture (Console + BFF + Backend Service)

## Status
Accepted

## Context
The initial system design draft in `docs/SYSTEM_DESIGN.md` outlined five independent Spring Boot microservices (`identity-service`, `event-service`, `registration-service`, `attendance-service`, `notification-service`) with a distributed Pub/Sub message broker.

At the current pre-v1 phase, no backend service code had been implemented yet. Deploying five separate Spring Boot JVM containers alongside PostgreSQL and Next.js onto a single shared production Linux VPS (`220.158.157.163`) incurs prohibitive memory overhead (estimated 2.5–4GB RAM idling), multiple Gradle build subprojects, and unnecessary operational complexity (distributed transactions, multi-container logging, and inter-service network latency).

Furthermore, the user experience requires a clear frontend division between public student/attendee event discovery/ticketing and organizer/faculty administrative management.

## Decision
1. **Console as the Unified Frontend**: Next.js 16 (App Router) is designated as the **Console**—the unified web frontend serving all user journeys (attendees, club leads, and faculty admins) through structured route zones (`app/(public)/` and `app/(manage)/`).
2. **Embedded BFF Layer**: The Next.js server runtime acts as the Backend-For-Frontend (BFF), strictly verifying institutional `@rvce.edu.in` OAuth sessions and calling the backend via typed gRPC wrappers.
3. **Backend Service as a Modular Monolith**: Consolidate the five independent Spring Boot services into a single Kotlin / Spring Boot application (`backend/service/`) with strict domain package isolation (`in.rvce.events.identity`, `.event`, `.registration`, `.attendance`, `.notification`).
4. **In-Process Events with Worker Extensibility ("And More If Required")**: Use Spring `ApplicationEventPublisher` and `@TransactionalEventListener` with PostgreSQL outbox for asynchronous domain side-effects. This design enables high-volume tasks (e.g. bulk email dispatcher) to cleanly extract into standalone worker containers in the future without modifying core business domain models.

## Consequences

### Positive
- **Dramatic Memory Savings**: Reduces JVM footprint from ~3GB across 5 containers to a single ~512MB container, comfortably fitting within VPS constraints.
- **Developer Velocity**: Single Gradle backend project and single Next.js frontend; easier local setup without orchestrating 7 containers.
- **Consistent Design System**: Public and admin views share Cobalt (`#4a32f9`) and Blush (`#fdcdd7`) design tokens, `lucide-react` icons, and Storybook components.
- **Architectural Readiness**: Preserves gRPC contracts in `api/proto/` and modular package boundaries, allowing future microservice decomposition if organizational scale ever requires it.

### Negative / Trade-offs
- Requires developers to maintain package-level discipline in Kotlin to prevent accidental tight coupling across domains.
- A failure in one domain module in the backend process affects the entire backend service runtime.
