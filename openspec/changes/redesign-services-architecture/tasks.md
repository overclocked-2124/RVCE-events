# Tasks: Services Architecture Redesign

## 1. Architecture Documentation Updates

- [ ] 1.1 Update `docs/SYSTEM_DESIGN.md` with the unified architecture (Console Frontend with embedded BFF, Backend Core Service, extensible worker model) and verify Mermaid diagrams render properly
- [ ] 1.2 Update repository structure section in root `AGENTS.md` and `docs/DESIGN.md` to replace the 5 separate service directories with consolidated `backend/service/` and the Console frontend

## 2. Infrastructure & Deployment Configuration

- [ ] 2.1 Update `deploy/docker-compose.yml` to replace 5 Spring Boot service blocks with a single `backend-service` container alongside `frontend` (Console/BFF) and PostgreSQL, verifying `docker compose config`
- [ ] 2.2 Update `deploy/server.env.example` to streamline environment variable templates for the unified backend container and verify no secrets are exposed

## 3. Backend Service Scaffolding & gRPC Contracts

- [ ] 3.1 Scaffold unified Gradle Kotlin subproject under `backend/service/` with modular package boundaries (`in.rvce.events.*`) and verify directory structure
- [ ] 3.2 Consolidate Protocol Buffer contracts in `api/proto/` for Identity, Event, Registration, Attendance, and Notification services and verify `.proto` syntax
- [ ] 3.3 Establish centralized Liquibase changelog structure under `backend/database/liquibase/` for unified PostgreSQL migrations

## 4. Console & BFF Alignment

- [ ] 4.1 Update gRPC client wrappers in `frontend/src/bff/clients/` to communicate with the single backend service host/port and verify TypeScript interfaces
- [ ] 4.2 Structure Console route groups in `frontend/app/` (`(public)` for attendee discovery/ticketing and `(manage)` for organizer/admin flows) with role-based session protection and Storybook companion stories
