# AGENTS.md

Compact instructions for working on the `movie-snob` repository.

## Commands

- **Dev:** `pnpm run dev`
- **Build:** `pnpm run build`
- **Lint:** `pnpm run lint`

## Development

- this projects uses pnpm

## Architecture & Conventions

- **Framework:** Next.js (App Router).
- **Styling:** CSS Modules (`*.module.css`).
- **Data Fetching:** TanStack Query (`@tanstack/react-query`).
- **Components:** Organized in `src/components`. Functional components with associated CSS modules.
- **Models & Types:** Defined in `src/models` using interfaces.
- **Services:** API wrappers in `src/services` mapping to `src/pages/api`.
- **Localization:** `next-intl` (see `src/i18n/` directory).

## Operational Notes

- This is a standard Next.js application structure using the Pages router.
- CSS modules are strictly used for component styling.
- Ensure type definitions in `src/models` are kept in sync when updating API service responses.
