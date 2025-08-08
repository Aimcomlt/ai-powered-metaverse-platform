# UI Architecture Overview

The frontend is built with React and Redux Toolkit and integrates with Ethereum smart contracts and OpenAI services. This document summarizes how the main pieces fit together.

## Pages
Top-level routes under `src/pages/` render faction profiles and course curricula along with the landing page. Pages are mostly static and compose reusable UI components. They do not talk directly to Redux or blockchain services but can be enhanced to do so.

## Components
Reusable widgets under `src/components/` handle presentation and user interactions. Some notable categories:
- **Shared**: generic UI pieces such as modal and wallet connector.
- **Domain-specific**: AI consoles, staking panels, faction tools, and governance voting components.
These components interact with Redux slices like `gt`, `task`, and `ai` and call services for smart contract or AI operations.

## Services
Modules in `src/services/` abstract side effects. Examples include:
- **ai** for AI provider calls invoked via `aiMiddleware`.
- **gtService** and **houseOfTheLawService** for contract interactions.
- **eventListeners** which push blockchain events into Redux.
They provide a thin layer between UI logic and external systems, keeping components focused on rendering.

## Redux Store
Slices in `src/store/` manage application state for wallets, tasks, governance tokens, AI recommendations, and blockchain events. Middleware connects services to slices so components can dispatch actions without handling side effects directly.

## Extension Points
- Add new slices and services for emerging features.
- Replace placeholder APIs in services with production endpoints.
- Enhance pages to fetch data dynamically and persist progress.
- Introduce additional components under existing folders to expand domain capabilities.

