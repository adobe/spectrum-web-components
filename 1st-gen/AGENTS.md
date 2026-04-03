# 1st-Gen Package — Agent Guide

**This is the past.** 1st-gen is being actively migrated to 2nd-gen and will be deprecated once that migration is complete. Do not add new features or components here. Bug fixes and migration work are the only reasons to make changes in this directory.

If you are working on a component that exists in both generations, prefer making logic changes in `2nd-gen/packages/core/` so both generations benefit. If you find yourself adding something that only exists in 1st-gen, ask whether it belongs in core instead.

See [`2nd-gen/AGENTS.md`](../2nd-gen/AGENTS.md) for the future direction, and the [migration workstream docs](../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) for the component-by-component migration workflow.

---

This is the 1st-generation Spectrum Web Components library — 69 component packages built on Lit, organized as a Yarn workspaces monorepo. Components here extend abstract base classes from `@spectrum-web-components/core` (the 2nd-gen core package) for shared logic, then add 1st-gen styling and rendering on top.

---

## Directory structure

```text
1st-gen/
├── packages/     # 69 component packages (badge, button, accordion, ...)
├── tools/        # Shared internal tooling (base, theme, styles, reactive-controllers, ...)
├── projects/     # Non-component workspaces (documentation, VRT, story decorator, types)
├── storybook/    # Storybook configuration (webpack5)
├── test/         # Global test infrastructure
└── scripts/      # Build and utility scripts
```

**Components always live in `packages/`.** Tools and projects are not components — do not look for component logic there.

---

## How to find a component

Every component is a self-contained package under `packages/<component-name>/`:

```text
packages/badge/
├── src/
│   ├── Badge.ts              # Component class (the main file to read/edit)
│   ├── index.ts              # Export entry point
│   ├── badge.css             # Component styles
│   └── spectrum-badge.css    # Spectrum CSS base
├── stories/
│   └── badge.stories.ts      # Storybook stories
├── test/
│   ├── badge.test.ts         # Unit tests
│   └── badge.a11y.spec.ts    # Accessibility snapshot tests
├── sp-badge.ts               # Custom element registration
└── package.json
```

The component class is always in `src/<ComponentName>.ts`. More complex packages may have multiple classes (e.g. `Accordion.ts` + `AccordionItem.ts`, `Button.ts` + `ButtonBase.ts`).

---

## Relationship to 2nd-gen core

1st-gen component classes **extend base classes from `@spectrum-web-components/core`** — the 2nd-gen core package. Core provides shared properties, types, validation, and mixins. 1st-gen adds its own `render()`, CSS, and S1-specific variants.

```typescript
// packages/badge/src/Badge.ts
import {
  BadgeBase,
  BADGE_VARIANTS_S1,
  BADGE_VARIANTS_COLOR_S1,
  type BadgeVariantS1,
} from '@spectrum-web-components/core/components/badge';

export class Badge extends BadgeBase {
  static override readonly VARIANTS = BADGE_VARIANTS_S1;
  static override readonly VARIANTS_COLOR = BADGE_VARIANTS_COLOR_S1;

  @property({ type: String, reflect: true })
  public override variant: BadgeVariantS1 = 'informative';

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult { ... }
}
```

The path alias `@spectrum-web-components/core/*` resolves to `../2nd-gen/packages/core/*/dist` via `tsconfig.json`. **Core must be built before 1st-gen can compile.** The `prebuild` script handles this automatically.

**What stays in core vs 1st-gen:**

| Concern                                   | Where it lives                                          |
| ----------------------------------------- | ------------------------------------------------------- |
| Base class, shared properties, validation | `2nd-gen/packages/core/`                                |
| S1-specific variant lists and types       | `core/components/<name>/Component.types.ts` (S1 arrays) |
| 1st-gen `render()` and CSS                | `1st-gen/packages/<name>/src/`                          |
| Element registration (`sp-<name>`)        | `1st-gen/packages/<name>/sp-<name>.ts`                  |

---

## Build system

1st-gen uses **Yarn workspaces v4** + **Wireit** for build orchestration.

```sh
yarn build          # Compile TypeScript + generate types
yarn build:css      # Process .css → .css.ts (Lit css`` wrappers)
yarn start          # Run core in dev mode + Storybook on port 8080
```

**Build pipeline:** CSS build → TypeScript (esbuild, fast) → Type declarations (tsc)

CSS files are processed by PostCSS into `.css.ts` files that wrap styles in Lit's `css` template tag. You will see `import styles from './badge.css.js'` in component classes — this refers to the generated `.css.ts` output.

**Important:** 2nd-gen core must be built first. Run `yarn build` in `2nd-gen/packages/core/` if core is out of date.

---

## Testing

```sh
yarn test           # Unit tests via Web Test Runner (Playwright — Chrome, Firefox, WebKit)
yarn test:visual    # Visual regression tests
```

| File                              | What it tests                                                          |
| --------------------------------- | ---------------------------------------------------------------------- |
| `test/<component>.test.ts`        | Unit tests — DOM, properties, events (Mocha + Chai + @open-wc/testing) |
| `test/<component>.a11y.spec.ts`   | Accessibility tree snapshots                                           |
| `test/<component>-memory.test.ts` | Memory leak detection                                                  |
| `test/benchmark/`                 | Performance benchmarks (Tachometer)                                    |

---

## Storybook

```sh
yarn storybook      # Start Storybook on port 8080
```

Stories live in `packages/<component>/stories/<component>.stories.ts`. Storybook scans `packages/*/stories/*.stories.js` automatically — no manual registration needed.

---

## Key conventions

- **Element tag names:** `sp-<component>` (e.g. `sp-badge`, `sp-button`)
- **Package names:** `@spectrum-web-components/<component>`
- **CSS:** Source `.css` files are processed to `.css.ts` at build time — edit the `.css` source, not the generated file
- **Deprecated exports:** Standalone type and const exports from 1st-gen packages are deprecated in favor of static properties on the element class (e.g. `Badge.VARIANTS` instead of importing `BADGE_VARIANTS_S1` directly). New code should follow this pattern.
