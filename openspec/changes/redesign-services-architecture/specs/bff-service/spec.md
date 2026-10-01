# Spec Delta: Frontend BFF Layer

## Purpose

Acts as the Backend-For-Frontend translation and security layer between web browsers and backend gRPC services, strictly enforcing institutional OAuth authentication, session cookie encryption, and UI data aggregation.

## ADDED Requirements

### Requirement: Institutional Authentication Enforcement
The BFF layer SHALL validate Google OAuth credentials and reject any user account that does not belong to the `@rvce.edu.in` domain or lacks the `rvce.edu.in` hosted domain claim.

#### Scenario: Authorized RVCE user sign-in
- **WHEN** an institutional user signs in with a verified `@rvce.edu.in` account
- **THEN** the BFF generates an encrypted `HttpOnly` JWT session cookie and redirects the user to the application dashboard

#### Scenario: Unauthorized external account sign-in
- **WHEN** a user attempts to authenticate using an unauthorized personal Gmail address
- **THEN** the BFF terminates the auth flow, returns an `AUTH_DOMAIN_RESTRICTED` error, and does not issue a session cookie

### Requirement: Typed gRPC Client Wrapper
The BFF server layer SHALL translate React Server Component and Route Handler requests into typed backend gRPC calls using dedicated client wrappers and mappers without exposing raw Protobuf stubs to client components.

#### Scenario: Public event listing request
- **WHEN** a browser navigates to the public events page
- **THEN** the Next.js server calls the Backend Service `ListEvents` gRPC endpoint via the typed wrapper client and renders the UI server-side
