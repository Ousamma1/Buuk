# Survey Platform Architecture Overview

## 1. Goal & Value Proposition
- Collect survey data end-to-end with real-time visibility into field progress and results.
- Reduce admin overhead for building surveys, assigning locations, managing teams, and monitoring delivery.
- Provide surveyors with a streamlined, themed experience that works online/offline with idiot-proof logic configuration.

## 2. Core Roles & Responsibilities
| Role     | Responsibilities |
|----------|------------------|
| **Admin** | Create and manage surveys, surveyors, assignments, themes, email/reminders, and access control. |
| **Surveyor** | Login, view assigned surveys and locations, collect responses online/offline, and sync data. |
| **Analyst/User** | View dashboards, export data (CSV), and compare survey performance. |

## 3. MVP Scope Summary
- **Authentication & RBAC**: JWT + refresh tokens for Admin, Surveyor, and Analyst roles.
- **Survey Builder**: SurveyJS-based drag-and-drop builder with themes (logo, colors, fonts) and validation controls.
- **Visual Logic Builder**: Node-based "If → Then" connectors for show/hide, skip, piping, and validation triggers without expression syntax.
- **Assignments & Map**: Leaflet map focused on Dubai with status-colored pins (Not started, In progress, Done, Overdue).
- **Surveyor Management**: UI-driven surveyor creation with auto-generated credentials, invite emails, and credential expiry policies.
- **Email & Reminders**: Invitation and reminder workflows with bounce/delivery tracking via webhooks and resend capabilities.
- **Data Pipeline**: Responses streamed over Kafka and materialized in Postgres for real-time widgets.
- **Dashboard**: Live progress tiles, location heat maps, time-to-complete metrics, and cross-survey comparisons.
- **Theming**: Liquid-glass aesthetic with light/dark blue palette, rounded corners, and high polish.
- **Containerized Delivery**: Each microservice runs in Docker with GitLab CI/CD pipelines for dev/stage/prod.

## 4. Service Architecture (Microservices)
| Service | Responsibilities | Tech Notes |
|---------|------------------|------------|
| **Gateway/API Aggregator** | Auth delegation, request routing, rate limiting, OpenAPI docs. | Node.js (Express/NestJS) |
| **Auth Service** | Manages users, roles, tokens, password reset, credential expiry, audit logs. | Postgres (users), Redis for sessions |
| **Survey Builder Service** | Stores SurveyJS schemas, versions, themes, and visual logic graphs. Provides preview endpoints. | Stores JSON schemas & graph data |
| **Assignment & Geo Service** | Manages locations, geo-fences, surveyor assignments, and map statuses. | Leaflet/OpenStreetMap in front-end |
| **Response Ingest Service** | Validates submissions, ensures idempotency, emits `response.created/updated` events. | Kafka producer |
| **Stream Processor** | Kafka consumer that materializes metrics into Postgres reporting tables. | Aggregates metrics/materialized views |
| **Dashboard/Analytics Service** | Serves progress metrics, comparisons, SSE/WebSocket feed. | Reads from reporting schema |
| **Email Service** | Handles invites, reminders, webhooks for delivery/bounce tracking. | Integrates SMTP/transactional provider |
| **File/Media Service** | Stores logos/themes using object storage with signed URLs. | S3/MinIO |

Shared infrastructure: **Kafka**, **Postgres** (OLTP + reporting), **Redis**, **Object Storage**, and centralized logging/metrics stack.

## 5. Data Model (Simplified Postgres)
Key tables (with indexed foreign keys and GIN indexes on JSON columns):
- `users(id, name, email, role, status, credential_expires_at, created_at)`
- `surveyors(id, user_id, phone, notes, active_from, active_to)`
- `surveys(id, title, description, status, theme_id, version, start_at, end_at, created_by)`
- `survey_versions(id, survey_id, surveyjs_json)`
- `themes(id, name, logo_url, primary_hex, secondary_hex, radius, glass_opacity)`
- `locations(id, name, lat, lng, emirate, meta_json)`
- `assignments(id, survey_id, location_id, surveyor_id, status, assigned_at, due_at)`
- `respondents(id, external_id, contact_email, contact_phone, location_id, meta_json)`
- `responses(id, survey_id, assignment_id, respondent_id, response_json, started_at, submitted_at, status)`
- `email_events(id, to_email, template, message_id, event, ts, meta_json)`
- `metrics_materialized(id, survey_id, metric_key, metric_value, as_of_ts)`

## 6. Event-Driven Integrations (Kafka Topics)
- `survey.created`, `survey.updated`
- `assignment.created`, `assignment.updated`
- `response.created` (first save/submit)
- `response.updated` (edits)
- `email.event` (delivery/open/bounce/spam)

**Sample `response.created` event**
```json
{
  "event": "response.created",
  "ts": "2025-11-06T14:02:03Z",
  "payload": {
    "response_id": "r_123",
    "survey_id": "s_456",
    "assignment_id": "a_789",
    "respondent_id": "p_333",
    "location_id": "l_100",
    "answers": { "Q1": "Yes", "Q2": 5, "Q3": ["A", "C"] }
  }
}
```

## 7. API Surface (Selected Contracts)
- **Auth**: `POST /auth/login`, `POST /auth/refresh`, `POST /users` (admin invite flow).
- **Survey Builder**: `POST /surveys`, `POST /surveys/{id}/versions`, `GET /surveys/{id}`, `POST /logic/graph/{surveyId}`.
- **Assignments & Map**: `POST /locations`, `POST /assignments`, `GET /map/assignments?bbox=…`.
- **Responses**: `POST /responses`, `PUT /responses/{id}`.
- **Dashboard**: `GET /metrics/surveys/{id}/progress`, `GET /metrics/compare?surveyA=&surveyB=&by=`.
- **Email**: `POST /email/invite`, `POST /email/reminders`, `POST /email/webhook`.

## 8. Frontend Applications (React + Vite)
- **Admin Console**: Dashboard tiles for Surveys, Assignments, Surveyors, Themes, Email center, Analytics.
- **Surveyor App**: Mobile-friendly app for assignments, offline capture (Phase 2 PWA), sync indicator.
- **Public Survey Runner**: Themed SurveyJS runner with section collapse chips and logic-driven flow.

**UI/UX Foundations**
- TailwindCSS + custom tokens, Framer Motion for transitions.
- Colors: primary `#0E1B3D`, secondary `#2A3F78`, soft shadows, 16–20px radii, backdrop-filter glass panels.
- Leaflet for map views with status-colored pins.

## 9. Real-Time Dashboard & Data Flow
1. Survey Runner posts to Response Ingest Service.
2. Service validates and emits `response.created` → Kafka.
3. Stream Processor aggregates metrics → Postgres `metrics_materialized`.
4. Dashboard/Analytics Service exposes SSE/WebSocket endpoints for <5s freshness.
5. Email provider webhooks emit `email.event` for bounce/delivery status.

## 10. Email & Credential Lifecycle
- Surveyor creation auto-generates credentials and invite email, enforcing `credential_expires_at` policy.
- Reminder scheduler sends cadence emails until submission or due date expiry.
- Webhooks log delivery/bounce and surface "Bounced" badges in UI.

## 11. Security & Compliance
- Short-lived JWT with refresh rotation; row-level access controls.
- HTTPS termination, secrets via environment/Vault, audit logging for admin actions.
- Phase 2: 2FA, advanced compliance features.

## 12. DevOps & Observability
- Docker containers per service with docker-compose for local dev.
- GitLab CI pipeline: lint → unit tests → build images → push → deploy → smoke tests → manual prod promotion.
- Observability stack: Winston JSON logs, Prometheus metrics, Grafana dashboards, alerts on Kafka lag and 5xx rates.

## 13. Acceptance Criteria Highlights
- Admin can build surveys with logic, assign locations, and preview themes.
- Map-based assignment workflow with due-date validation and status colors.
- Surveyor invite flow delivers emails instantly with expiring access.
- Dashboard updates progress within 5 seconds of a submission and supports survey comparisons.
- Email bounces appear with a "Bounced" status within one minute of provider webhook.
- Theming consistent across Admin, Runner, and Dashboard with liquid-glass aesthetic.

## 14. Phase 2 Enhancements (Nice-to-Have)
- Offline-capable PWA with conflict resolution.
- Advanced sampling, quotas, and weighting logic.
- Multi-tenant organization support.
- BI connectors, anomaly detection, and fraud detection signals.

## 15. Definition of Done (MVP)
A deployable stack with seed data (sample survey + Dubai locations) where an Admin can invite a surveyor, assign work, and observe live progress through the themed dashboard with CI/CD and monitoring in place.
