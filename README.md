# Buuk Survey Platform

This repository hosts the frontend and documentation for the Buuk field survey platform. The goal is to deliver an end-to-end workflow for planning, executing, and monitoring location-aware surveys with a premium liquid-glass visual style.

## Overview
- **Real-time visibility** into survey progress, response quality, and field team activity.
- **Microservice backend** that supports survey building, assignment management, response ingestion, analytics, and messaging.
- **React-based applications** for admins, surveyors, and public respondents with SurveyJS, Leaflet maps, and theming controls.

## Architecture & Requirements
The complete functional scope, architecture, and acceptance criteria for the MVP and Phase 2 roadmap are captured in [docs/architecture.md](docs/architecture.md).

Key highlights:
- JWT-authenticated roles for Admins, Surveyors, and Analysts.
- Survey builder with drag-and-drop sections, validations, and a visual logic editor.
- Dubai-focused assignment map with status-aware pins and due-date management.
- Kafka-based response streaming with Postgres materializations for live dashboards.
- Email invitation and reminder workflows with bounce tracking.
- GitLab CI/CD pipelines and containerized services for dev/stage/prod deployments.

## Admin console prototype

The default Next.js app now renders a high-fidelity prototype of the Admin Control Room alongside production-ready SurveyJS tooling:

- Liquid-glass layout with sidebar navigation, contextual actions, and live-status tiles.
- Real-time style dashboard cards with assignment, survey comparison, and reminder widgets backed by mock data.
- A stylised Dubai map heat panel, logic builder snapshot, theme tokens preview, and CSV assignment uploader stub for future integrations.
- A dedicated **Survey Builder** page powered by SurveyJS Creator, with auto-saved schemas and visual logic controls.
- A companion **Survey Preview** page that replays the current schema so admins and analysts can dry-run the respondent experience.

Use these screens as the visual baseline when implementing the authenticated admin experience.

## Getting Started
This project was bootstrapped with Next.js. Install dependencies and start the development server:

```bash
npm install
npm run dev
```

The default app runs on [http://localhost:3000](http://localhost:3000).

## Contributing
1. Create a feature branch.
2. Implement changes with tests and documentation updates where applicable.
3. Run linting and ensure CI passes.
4. Submit a pull request summarizing the feature or fix.

## License
This project is proprietary to the Buuk team. All rights reserved.
