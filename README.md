# Angular Starter

A minimal, scalable Angular starter kit. Standard Angular CLI tooling, zoneless change detection, standalone components, lazy-loaded feature routes, and a modern test/lint stack — nothing else bolted on.

## Stack

- [Angular 21](https://angular.dev) — standalone components, signals, zoneless change detection, esbuild/Vite-based build (`@angular/build`)
- [Vitest](https://vitest.dev) — unit tests
- [Playwright](https://playwright.dev) — end-to-end tests
- [ESLint](https://github.com/angular-eslint/angular-eslint) + [Prettier](https://prettier.io) — linting and formatting
- TypeScript strict mode

## Requirements

- Node.js (see `.nvmrc`; Angular 21 requires Node `^20.19 || ^22.12 || >=24`)
- npm

## Getting started

```bash
npm install
npm start
```

Open `http://localhost:4200`.

New to the codebase? See [`docs/getting-started.md`](docs/getting-started.md) for a walkthrough of the structure, a worked example (`src/app/features/counter/`), and how to add a new feature route.

## Scripts

| Command          | Description                              |
| ---------------- | ----------------------------------------- |
| `npm start`       | Run the dev server                        |
| `npm run build`   | Production build to `dist/`               |
| `npm test`        | Unit tests (Vitest)                       |
| `npm run e2e`      | End-to-end tests (Playwright)              |
| `npm run lint`     | Lint with ESLint                          |
| `npm run format`   | Format `src/` with Prettier               |

## Project structure

```
src/app/
  app.ts, app.html, app.scss   # root shell: layout + <router-outlet>
  app.routes.ts                 # top-level route table (lazy-loaded)
  app.config.ts                 # application providers
  features/
    home/                       # one folder per feature
      home.ts
      home.html
      home.spec.ts
      home.routes.ts            # feature's own route table, lazy-loaded from app.routes.ts
    about/
      ...
    counter/                     # worked example: service + signals + reactive form
      ...
e2e/                             # Playwright specs
docs/
  getting-started.md             # walkthrough for new contributors
```

Each feature is self-contained and lazy-loaded via `loadChildren`/`loadComponent`, so the pattern scales by adding new folders under `features/` rather than growing a shared module. Add cross-feature code (shared UI, utilities, data access) under `src/app/shared/` or `src/app/core/` as the app grows — neither exists yet since this is a starter kit and premature structure isn't worth adding until there's a second consumer.

## AI tooling

This repo includes `AGENTS.md`, `.claude/CLAUDE.md`, and `.cursor/rules/` with Angular/TypeScript conventions for AI coding assistants (Claude Code, Cursor, and other tools that read `AGENTS.md`).
