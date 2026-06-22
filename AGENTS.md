# AGENTS.md

Compact instructions for working on the `movie-snob` repository.

## Commands

- **Dev:** `pnpm run dev`
- **Build:** `pnpm run build`
- **Lint:** `pnpm run lint`

## Development

- This project uses pnpm as package manager.
- **No tests exist** in this repository.

## Architecture & Conventions

- **Framework:** Next.js (App Router) with `next-intl` for i18n.
- implementing nextjs CacheComponents
- implementing experimental rootParams so that next-intl does not affect cache components
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) + shadcn/ui components. CSS modules are NOT used.
- **Data Fetching:** TanStack Query (`@tanstack/react-query`).
- **Components:** Organized in `src/components`. UI primitives in `src/components/ui/`.
- **Models & Types:** Zod schemas in `src/models` for validation.
- **Services:** Server-side data fetching in `src/services` calling TMDB API directly.
- **Locales:** `locales/en-US/messages.json` and `locales/es/messages.json`.
- **Env:** `TMDB_KEY` required (see `env.ts` for validation).

## App Structure

- `src/app/[lang]/` - Main routes (movie, tv, search, discover, bookmark, liked).
- `src/app/api/` - Route handlers (trending, popular, discover, search).
- `src/services/` - Server-side data fetching functions (not API wrappers).
- `src/features/` - Feature-specific types and utilities.
- `src/utils/functions/` - Shared utility functions.

## Routing

- All routes are locale-prefixed: `/{lang}/...` (e.g., `/en-US/movie/123`).
- Supported locales: `en-US`, `es`. Default: `en-US`.

## Important Notes

- Images are unoptimized (`images: { unoptimized: true }` in next.config).
- Remote image patterns: `image.tmdb.org`, `img.youtube.com`.
- Path aliases: `@/*` maps to `./src/*`.
