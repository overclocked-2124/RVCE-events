# Spec Delta: Console (Unified Frontend)

## Purpose

Serves as the unified web frontend for the entire platform, providing public event discovery and ticketing for attendees alongside role-based event creation, attendee management, and administrative controls for club leads and faculty.

## ADDED Requirements

### Requirement: Unified Event Discovery and Attendee Workflows
The Console SHALL provide responsive, accessible user interfaces for discovering published events, viewing event agendas, registering for tickets, and accessing personal QR admission passes.

#### Scenario: Attendee browses upcoming campus events
- **WHEN** an attendee visits the Console home page
- **THEN** the Console displays active events filtered by category, club, and date using the Cobalt & Blush brand design system

#### Scenario: Student completes event registration
- **WHEN** an authenticated student registers for an open-capacity event
- **THEN** the Console submits the registration via the BFF and presents an instant confirmation with their entry pass

### Requirement: Role-Gated Organizer and Administrative Views
The Console SHALL provide management interfaces accessible only to authenticated users holding verified Organizer, Club Lead, or Faculty Admin roles to manage event lifecycles.

#### Scenario: Club organizer creates new event proposal
- **WHEN** an authorized club lead accesses the event creation wizard in the Console
- **THEN** the Console validates event schedules, capacity limits, and venue details, submitting the draft for approval

#### Scenario: Unauthorized user accesses organizer controls
- **WHEN** an attendee without organizer privileges navigates directly to an administrative console path
- **THEN** the Console denies access, displays an unauthorized notice, and redirects to the public events directory

### Requirement: Design System Token Compliance
The Console components SHALL strictly utilize official brand design tokens (Cobalt `#4a32f9`, Blush `#fdcdd7`, Blush Muted `rgba(253, 205, 215, 0.75)`) defined in CSS variables without hardcoded hex values.

#### Scenario: Component rendering
- **WHEN** any Console page or component renders in the browser
- **THEN** all backgrounds, typography, and borders resolve directly from brand CSS custom properties
