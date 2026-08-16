# RVCE Events

Self-hosted event discovery and management platform for RVCE.

## Repository layout

```text
api/proto/                 Protocol Buffer contracts (to be designed)
backend/
  libraries/               Shared Kotlin/JVM libraries (empty)
  services/                Spring Boot services (empty)
  database/liquibase/      Service-owned Liquibase migrations (empty)
frontend/
  app/                     Next.js application shell; no routes implemented
  src/bff/                 Frontend BFF boundary; no endpoints implemented
tests/
  jvm/                     Backend tests (empty)
  playwright/              End-to-end tests (empty)
  smoke-python/            Python smoke tests (empty)
docs/adr/                  Architecture decision records (empty)
```

The canonical product requirements are documented in [docs/PRD.md](docs/PRD.md), high-level system architecture in [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md), feature requirements in [docs/FEATURES.md](docs/FEATURES.md), and design specifications in [docs/DESIGN.md](docs/DESIGN.md).

Deployment preparation for a self-hosted Docker server is documented in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). It contains no production credentials.

## Contributing

We welcome contributions from RVCE Coding Club members and juniors! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on our workflow, issue allotment, and submission process.






