# AGENTS.md

Compact instructions for working on the `movie-snob` repository.

## Commands
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`

## Architecture & Conventions
- **Framework:** Next.js (Pages Router).
- **Styling:** CSS Modules (`*.module.css`).
- **Data Fetching:** TanStack Query (`@tanstack/react-query`).
- **Components:** Organized in `src/components`. Functional components with associated CSS modules.
- **Models & Types:** Defined in `src/models` using interfaces.
- **Services:** API wrappers in `src/services` mapping to `src/pages/api`.
- **Localization:** `next-translate` (see `next-translate-plugin` in `package.json`).

## Operational Notes
- This is a standard Next.js application structure using the Pages router.
- CSS modules are strictly used for component styling.
- Ensure type definitions in `src/models` are kept in sync when updating API service responses.
