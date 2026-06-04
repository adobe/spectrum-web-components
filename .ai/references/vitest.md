# Vitest reference

Pointer file. Not auto-loaded; read when working on Vitest config, tests, or test infrastructure.

## Where Vitest is used in this repo

There are **five** Vitest configs in `2nd-gen/`. Nothing in `1st-gen/` uses Vitest.

### Browser-mode (Storybook-driven) — `2nd-gen/packages/swc/vitest.config.js`

This is the config most contributors mean when they say "the Vitest config." Runs tests in Chromium via the Playwright provider, with discovery handled by the `storybookTest` plugin reading `2nd-gen/packages/swc/.storybook/main.ts`.

Test files it executes:

| Glob                                                       | What lives here                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------- |
| `2nd-gen/packages/swc/components/*/test/*.test.ts`         | 2nd-gen component unit/integration tests (Lit elements, DOM events) |
| `2nd-gen/packages/swc/components/*/stories/*.stories.ts`   | Storybook stories with a `play` function tagged for testing         |
| `2nd-gen/packages/swc/patterns/*/*/test/*.test.ts`         | Pattern tests (e.g. conversational-ai)                              |
| `2nd-gen/packages/swc/patterns/*/*/stories/*.stories.ts`   | Pattern stories tagged for testing                                  |
| `2nd-gen/packages/core/controllers/*/test/*.test.ts`       | Controller tests (rendered via demo hosts in the browser)           |
| `2nd-gen/packages/core/controllers/*/stories/*.stories.ts` | Controller stories tagged for testing                               |

Run from repo root: `yarn test:2nd-gen` → delegates to `vitest --run --project storybook` in `swc/`.

A second project slot (`core-unit`, Node environment, scoped to `packages/core/**/test/__unit__/*.test.ts`) is reserved and commented in the config for future pure-logic tests that don't need a browser.

### Node-mode (standalone) — `2nd-gen/packages/tools/*/vitest.config.ts`

Four small package-local configs, all `environment: 'node'`, all run via their own `yarn test` (`vitest --run`). They are **not** part of `yarn test:2nd-gen`.

| Config                                            | Test files                                          |
| ------------------------------------------------- | --------------------------------------------------- |
| `tools/swc-tokens/vitest.config.ts`               | `tools/swc-tokens/tests/*.test.ts`                  |
| `tools/swc-vscode-token/vitest.config.ts`         | `tools/swc-vscode-token/src/server/tests/*.test.ts` |
| `tools/postcss-token/vitest.config.ts`            | tests TBD; config exists                            |
| `tools/vite-global-elements-css/vitest.config.ts` | tests TBD; config exists                            |

### What is NOT Vitest

Do not confuse these with Vitest:

- `1st-gen/**` — uses `web-test-runner` (`wtr`), Karma, and a custom `yarn test:focus unit` setup. Different config files, different glob conventions.
- `playwright.a11y.config.ts` (repo root) — Playwright drives the `yarn test:a11y*` accessibility suite over the built Storybook. Separate from `vitest`.
- `test-storybook` (referenced in `swc/package.json` as `test:a11y`) — the Storybook test runner, distinct from Vitest's `storybookTest` plugin.

## Canonical AI-friendly sources

Vitest publishes two LLM-targeted bundles. Prefer the index unless you specifically need full doc content.

- **Index (small, ~3 KB)**: <https://vitest.dev/llms.txt>
  - Lists every doc URL under `/config/`, `/guide/`, `/api/`. Use this to find the one page you need.
- **Full bundle (~150-200 KB)**: <https://vitest.dev/llms-full.txt>
  - Every doc page concatenated. Only fetch if you need broad context across many topics in one go; otherwise the per-page fetch below is cheaper.

## Token-efficient usage pattern

1. **WebFetch the index** (`llms.txt`) when you don't know which page covers your question.
2. **WebFetch the specific page** by full URL (e.g. `https://vitest.dev/guide/projects.html`) — these are typically 5-15 KB.
3. **Avoid fetching `llms-full.txt`** unless you've already determined you'd otherwise pull more than ~5 individual pages.

Do not stash either bundle in this repo. They drift with Vitest releases; fetching on demand keeps content current and keeps repo size down.

## Targeted entry points

For common Vitest questions, jump straight to:

| Topic                                                    | URL                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| Writing tests with AI (prompt patterns, common pitfalls) | <https://vitest.dev/guide/learn/writing-tests-with-ai.html> |
| Projects (multi-config monorepo setup)                   | <https://vitest.dev/guide/projects>                         |
| Browser mode (Playwright/WebdriverIO/Preview)            | <https://vitest.dev/guide/browser>                          |
| Parallelism & isolation                                  | <https://vitest.dev/guide/parallelism>                      |
| Config reference index                                   | <https://vitest.dev/config>                                 |
| Mocking guide                                            | <https://vitest.dev/guide/mocking>                          |

## Project-specific notes

- The Vitest entry point in this repo is `2nd-gen/packages/swc/vitest.config.js`.
- Test discovery happens via the `storybookTest` plugin reading `2nd-gen/packages/swc/.storybook/main.ts`, which globs stories and `*.test.ts` files across `swc/components`, `swc/patterns`, and `core/`.
- Coverage thresholds and reporters are root-only in Vitest and must stay at the top level of `vitest.config.js`, not inside a project entry.
- The `core-unit` project slot is reserved for future pure-logic Node tests in `packages/core/**/__unit__/*.test.ts`; see comment in `vitest.config.js`.
- No official Vitest MCP server exists. Third-party options (`djankies/vitest-mcp`, `madrus/vitest-mcp-server`) wrap `vitest run` for structured AI output but aren't installed here.
