# Spec Delta: Backend Core Service

## Purpose

Provides a unified Spring Boot core service managing persistent state, business logic, and transactional boundaries for identity, events, registrations, attendance, and notifications over typed gRPC interfaces.

## ADDED Requirements

### Requirement: Unified gRPC Server Interface
The backend service SHALL expose typed gRPC service stubs defined in `api/proto/` covering Identity, Event, Registration, Attendance, and Notification domains on a single configurable port.

#### Scenario: BFF queries event details
- **WHEN** the BFF makes a gRPC call to `GetEvent` with a valid `eventId`
- **THEN** the backend service retrieves the event entity from PostgreSQL and returns the event details payload

#### Scenario: gRPC call to unauthenticated administrative endpoint
- **WHEN** a client invokes an organizer/admin gRPC method without a verified institutional session token
- **THEN** the backend service responds with a `PERMISSION_DENIED` status code

### Requirement: Domain Module Boundaries
The backend application SHALL encapsulate distinct domain models and business services within isolated module packages (`identity`, `event`, `registration`, `attendance`, `notification`) to prevent unconstrained circular dependencies.

#### Scenario: Internal domain event dispatch
- **WHEN** an attendee registration is successfully confirmed in the registration domain
- **THEN** an in-process domain event is published to notify the notification domain without cross-service network calls

### Requirement: Relational Persistence and Migrations
The backend service SHALL manage database schemas using Liquibase changelogs for relational tables in PostgreSQL.

#### Scenario: Service bootstrap with pending migrations
- **WHEN** the backend service container starts up against the configured database
- **THEN** Liquibase executes pending changesets and establishes schema integrity before gRPC listeners become active
