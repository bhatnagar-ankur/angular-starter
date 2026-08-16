# Getting started

A short walkthrough for anyone cloning this starter for the first time. It assumes you've already run `npm install` and `npm start` (see the main [README](../README.md)).

## How the app is structured

Everything under `src/app/features/` is a self-contained route. Look at `src/app/features/counter/` for a worked example that touches most of what you'll need day-to-day:

- `counter.service.ts` — app state as a signal, with a `computed()` derived value. `providedIn: 'root'` makes it a singleton without touching a module file.
- `counter.ts` — the component. `inject()` pulls in the service, `ChangeDetectionStrategy.OnPush` is set explicitly (this app is zoneless — see below), and a `ReactiveFormsModule` `FormControl` handles the step-size input, bridged to a signal with `toSignal()`.
- `counter.html` — a plain template reading signals as `count()` / `doubled()`.
- `counter.routes.ts` — the feature's own route table, lazy-loaded from `app.routes.ts` via `loadChildren`.
- `counter.spec.ts` / `counter.service.spec.ts` — unit tests for the component and the service, run with Vitest.

Visit `/counter` in the running app to see it.

## Adding a new feature route

1. Create a folder: `src/app/features/<name>/`.
2. Add a standalone component (`<name>.ts` + `<name>.html`), `ChangeDetectionStrategy.OnPush` by convention.
3. Add `<name>.routes.ts` exporting a `Routes` array, following the pattern in `counter.routes.ts`.
4. Wire it into `src/app/app.routes.ts` with a `loadChildren` entry, so it's lazy-loaded (a separate JS chunk, not part of the initial bundle).
5. If it needs a nav link, add it to `src/app/app.html`.
6. If it needs shared state, add a service with `providedIn: 'root'` next to the component (see `counter.service.ts`), or promote it to `src/app/shared/` once a second feature needs it too.

## Why zoneless / signals

This starter uses `provideZonelessChangeDetection()` (set in `src/app/app.config.ts`) instead of Zone.js. Practically, that means:

- State that should trigger a re-render must be a signal (`signal()`, `computed()`), not a plain class field mutated in place.
- Components should set `changeDetection: ChangeDetectionStrategy.OnPush` — with zoneless change detection, Angular schedules renders based on signal reads, so OnPush is the natural default rather than an optimization to opt into later.
- RxJS is still fine to use (forms, HTTP, etc.) — bridge to signals with `toSignal()` when you need the value in a template, as `counter.ts` does for the step-size form control.

## Testing

- **Unit tests** (Vitest): `npm test`. Co-locate `*.spec.ts` next to the file it tests, as with `counter.spec.ts` and `counter.service.spec.ts`.
- **End-to-end tests** (Playwright): `npm run e2e`. Specs live in `e2e/`; see `e2e/navigation.spec.ts` for the pattern (`page.goto`, `getByRole`, assert on visible text).

## Before opening a PR

```bash
npm run lint
npm test
npm run build
```

`.github/workflows/ci.yml` runs the same checks (plus `npm run e2e`) on every push and PR.
