# Backend — Agent Rules

> Extends the root [AGENTS.md](../AGENTS.md). Read the root document first for project-wide rules.

---

## Stack

| Technology | Version | Purpose |
| --- | --- | --- |
| **Kotlin** | Latest stable | Language (no Java in new code) |
| **Java** | 21 (Temurin) | JVM runtime |
| **Spring Boot** | 3.x | Application framework |
| **Gradle** | Kotlin DSL | Build system |
| **gRPC + Protobuf** | Latest stable | Inter-service communication |
| **PostgreSQL** | 17 (Alpine) | Primary data store |
| **Liquibase** | Community | Database migrations |
| **JPA / Spring Data** | Via Spring Boot | ORM & data access |

---

## Package Structure

All backend code follows the `in.rvce.events` group prefix. The application is structured as a **Modular Monolith** with clean domain module packages:

```text
in.rvce.events.<domain>/
├── grpc/                ← gRPC service implementations (extending generated stubs)
├── domain/
│   ├── model/           ← Domain entities and value objects
│   ├── repository/      ← Spring Data JPA repositories
│   └── service/         ← Domain service layer (business logic)
├── application/         ← Application services (use cases, orchestration)
├── config/              ← Module-specific Spring configuration
├── exception/           ← Domain-specific exceptions
└── event/               ← Domain events and listener handlers
```

### Domain Module Examples
- `in.rvce.events.identity` → Identity & Access domain
- `in.rvce.events.event` → Event management domain
- `in.rvce.events.registration` → Registration & ticketing domain
- `in.rvce.events.attendance` → Attendance & QR check-in domain
- `in.rvce.events.notification` → Notification & email delivery domain

---

## Directory Structure

```text
backend/
├── service/                          ← Core Spring Boot Modular Monolith application
│   ├── build.gradle.kts              ← Application dependencies & plugins
│   ├── src/main/kotlin/in/rvce/events/
│   │   ├── service/                  ← Application entry point & server bootstrap
│   │   ├── identity/                 ← Identity domain module
│   │   ├── event/                    ← Event domain module
│   │   ├── registration/             ← Registration domain module
│   │   ├── attendance/               ← Attendance domain module
│   │   └── notification/             ← Notification domain module
│   ├── src/main/resources/           ← application.yml, application-production.yml
│   └── Dockerfile                    ← Unified backend container build
│
├── libraries/                        ← Shared JVM libraries
│   ├── auth-context/                 ← Auth/session context propagation
│   ├── messaging/                    ← In-process & outbox domain event abstractions
│   └── persistence/                  ← JPA/Spring Data common configs, Liquibase utils
│
├── database/
│   └── liquibase/                    ← Domain-scoped database migration changesets
│       ├── master.xml                ← Root Liquibase changelog
│       ├── identity/                 ← Identity schema migrations
│       ├── event/                    ← Event schema migrations
│       ├── registration/             ← Registration schema migrations
│       ├── attendance/               ← Attendance schema migrations
│       └── notification/             ← Notification & outbox schema migrations
│
└── README.md
```

---

## Architecture Rules

### Modular Monolith Boundaries
1. **Domain boundaries in code.** Domain packages (`identity`, `event`, etc.) must maintain clean boundaries. Modules interact through defined service interfaces or domain events, never through direct raw entity manipulation across domains.
2. **Each domain owns its schema.** Liquibase changesets are organized by domain under `backend/database/liquibase/<domain>/`.
3. **Shared code goes in `libraries/`.** Common utilities, base entity models, or cross-cutting interceptors live under `backend/libraries/`.
4. **Single runtime, extensible workers.** The core backend runs as a single high-performance JVM container. If high-throughput async processing (e.g. bulk email dispatcher) requires dedicated resources later, worker processes ("and more if required") can be added under `backend/workers/`.

### gRPC & Protobuf
1. **All `.proto` files live in `api/proto/`.** Never place proto definitions inside `backend/`.
2. **Service implementations extend generated stubs** from the proto contracts. Place these in `<service>/grpc/`.
3. **Use gRPC status codes consistently:**
   - `NOT_FOUND` for missing resources
   - `ALREADY_EXISTS` for duplicate creation attempts
   - `PERMISSION_DENIED` for authorization failures
   - `INVALID_ARGUMENT` for validation errors
   - `RESOURCE_EXHAUSTED` for capacity limits
   - `INTERNAL` for unexpected server errors
4. **Map domain exceptions to gRPC statuses** via interceptors, not in each RPC method.

### Database & Migrations
1. **All schema changes via Liquibase changesets.** Never apply manual DDL in production.
2. **Changeset ID convention**: `<service>-<sequence>-<description>` (e.g., `identity-001-create-users-table`).
3. **Use JPA/Spring Data** for standard CRUD operations.
4. **Use native SQL** for performance-sensitive queries (batch operations, complex joins, reporting).
5. **Database credentials** are injected via environment variables (`SPRING_DATASOURCE_*`), never hardcoded.

### Messaging & Domain Events
1. **Use the transactional outbox pattern** for publishing domain events. Write events to an outbox table in the same transaction as the business operation.
2. **Domain event naming**: Past tense, descriptive — `EventPublished`, `RegistrationCreated`, `AttendanceRecorded`, `AccountActivated`.
3. **Event handlers must be idempotent.** Design for at-least-once delivery.
4. **Use the `messaging` library** from `backend/libraries/messaging/` for all pub/sub operations. Never use broker-specific APIs directly in service code.

---

## Spring Profiles

| Profile | Usage |
| --- | --- |
| `development` | Local development with Docker Compose |
| `production` | Deployed server environment |

- Profile-specific configuration in `application-{profile}.yml`.
- The `SPRING_PROFILES_ACTIVE` environment variable is set in `deploy/docker-compose.yml`.

---

## Code Style

- **Language**: Kotlin exclusively. No Java in new code.
- **Formatting**: Follow ktlint conventions.
- **Null Safety**: Leverage Kotlin's null safety. Avoid `!!` — prefer `?.let`, `?:`, or explicit null checks.
- **Data Classes**: Use for DTOs, domain value objects, and event payloads.
- **Coroutines**: Prefer coroutines for async operations over reactive streams.
- **Testing**: Write tests in `tests/jvm/` at the repo root. Use JUnit 5, MockK for mocking, Testcontainers for integration tests with PostgreSQL.
