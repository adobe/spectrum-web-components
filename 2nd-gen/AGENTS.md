# 2nd-Gen — Agent Guide

**This is the future.** 2nd-gen is the desired end state of Spectrum Web Components. The goal is to fully replace 1st-gen with this architecture. Work here should be treated as greenfield — it is cleaner, more opinionated, and better structured than 1st-gen by design.

If you find yourself comparing the two and 1st-gen does something differently, follow 2nd-gen conventions. When in doubt, check the reference implementation ([Badge](./packages/swc/components/badge/)) before writing new code.

---

## Structure

```text
2nd-gen/
├── packages/
│   ├── core/    # Abstract base classes, mixins, types — no rendering
│   └── swc/     # Concrete components — render(), CSS, stories, tests
└── packages/tools/
    ├── postcss-token/     # PostCSS plugin that compiles token() calls to CSS vars
    ├── swc-tokens/        # Design token generation
    └── swc-vscode-token/  # VS Code token integration
```

Two packages, one dependency direction: **core builds first, swc builds second.** This is enforced by TypeScript project references and the root `yarn build` script.

For detailed guidance on each package, read their own AGENTS.md files:

- [`packages/core/AGENTS.md`](./packages/core/AGENTS.md) — base classes, mixins, types, the core/SWC split
- [`packages/swc/AGENTS.md`](./packages/swc/AGENTS.md) — rendering, CSS, stories, tests, registration

---

## Why 2nd-gen is cleaner

2nd-gen was built with stricter conventions from the start. Some notable differences from 1st-gen:

| Concern          | 1st-gen                      | 2nd-gen                                           |
| ---------------- | ---------------------------- | ------------------------------------------------- |
| Build tool       | Wireit + esbuild             | Vite                                              |
| Test runner      | Web Test Runner              | Vitest + Playwright                               |
| CSS authoring    | PostCSS → `.css.ts`          | `token()` via PostCSS → inline CSS via Lit        |
| Stylelint        | Less strict                  | Enforced property order, token usage, specificity |
| Stories + tests  | Separate concerns            | Stories double as test fixtures                   |
| Monorepo tooling | Wireit task graphs           | Yarn workspaces + TypeScript project references   |
| Component logic  | Mixed into component classes | Split: core (logic) vs SWC (rendering)            |

2nd-gen also has a tighter **stylelint config** that enforces property declaration order, bans hard-coded values in favor of `token()`, and prevents descending specificity. These rules exist to keep CSS predictable and maintainable at scale.

---

## Migration direction

1st-gen components are being migrated to 2nd-gen one at a time. The migration follows a defined phase-by-phase workflow:

1. **Prep** — understand the component, plan breaking changes
2. **Setup** — create core and SWC file structure
3. **API** — migrate properties, types, and deprecations
4. **Styling** — migrate CSS to token-based 2nd-gen structure
5. **Stories, tests, and verification** — full Storybook and test coverage

When a component is fully migrated, the 1st-gen version imports its base class from core and the two generations share logic. Once 1st-gen is deprecated entirely, those base classes will be consolidated.

See the [migration workstream docs](../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) for the full workflow and step-by-step guides.

---

## Commands

```sh
# From 2nd-gen/
yarn build          # Build core then swc
yarn start          # Dev mode: core watch + swc analyze + Storybook
yarn storybook      # Storybook only
yarn test           # Vitest (functional tests)
yarn test:a11y      # Playwright accessibility tests
yarn lint           # ESLint across 2nd-gen
```

Core must always be built before swc. `yarn build` handles this automatically via build order. If swc fails to compile after a core change, rebuild core first.
