---
name: migration-styling
description: Phase 4 of 1st-gen to 2nd-gen component migration. Use to migrate CSS to the 2nd-gen structure, apply Spectrum 2 tokens, and ensure stylelint passes.
---

# Migration styling ([Phase 4](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 4](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to migrate CSS to the 2nd-gen structure, replace hard-coded values with tokens, and ensure the component's CSS passes stylelint with no errors.

## When to use this skill

- Phase 3 (migration-api) is complete
- The user asks to "migrate styles" or "migrate CSS" for a component
- The user asks to apply Spectrum 2 tokens or fix stylelint errors
- The user refers to "Phase 4" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 3 is not complete — the API must be migrated first
- You are working on `render()` or template structure — check the [full migration steps](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/06_migrate-rendering-and-styles.md) for rendering context

## How to invoke

- "Migrate styles for [component]"
- "Phase 4 for [component] migration"
- "Apply Spectrum 2 tokens for [component]"

---

## Prerequisites

- A local spectrum-css checkout next to this repo is required — <!-- TODO: link to Workspace setup once PR is merged -->see Workspace setup in the migration README.
- Copy S2 styles from your spectrum-css clone, `spectrum-two` branch, `component index.css` (not `dist`).
- Use `03_components/` analysis docs for spectrum-two alignment.

---

## Workflow

### 1. Follow the migration steps

Follow [Step 6](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/06_migrate-rendering-and-styles.md) and the [full migration steps](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/06_migrate-rendering-and-styles.md) for rendering, templates, `render()`, icons (inline SVG), and detailed examples.

### 2. Replace hard-coded values with tokens

- Replace all hard-coded colors, font sizes, and other theme/size values with `token(...)`.
- Follow the [component CSS](../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md) and [custom properties](../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md) guidelines.

### 3. Run stylelint and fix all errors

Run `nx run swc:lint` after updating CSS. The 2nd-gen config enforces:

| Rule                            | What it checks                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `order/properties-order`        | Declaration order (see [`linters/stylelint-property-order.js`](../../../linters/stylelint-property-order.js)) |
| `no-descending-specificity`     | Lower-specificity selectors must come before higher-specificity ones                                          |
| `declaration-empty-line-before` | Empty line required between declaration groups                                                                |
| Token usage                     | `token("...")` required for color, font-size, etc.                                                            |

---

## Checklist

- [ ] No inline styles for theme/size; CSS and classes are used instead
- [ ] Tokens and custom properties align with Spectrum 2
- [ ] Follows the [full migration steps](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/06_migrate-rendering-and-styles.md)
- [ ] Adheres to the [component styling guidelines](../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/README.md)
- [ ] `nx run swc:lint` passes: no `order/properties-order`, `no-descending-specificity`, `declaration-empty-line-before`, or token-usage errors in the component's `.css` file

---

## Common problems

| Problem                                   | Solution                                                                                                                                                                                                                                                          |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `order/properties-order` errors           | Reorder declarations to match [`linters/stylelint-property-order.js`](../../../linters/stylelint-property-order.js) (e.g. `display` → `position` → `flex` → box sizing → `margin` → font → `overflow` → `pointer-events` → `content` → `opacity` → `transition`). |
| `no-descending-specificity` errors        | Place lower-specificity selectors first (e.g. `:host([disabled])` before `:host([checked][disabled])`); split rule blocks if needed so order is consistent.                                                                                                       |
| Token / `declaration-strict-value` errors | Replace hard-coded colors, font sizes, etc. with `token("...")`.                                                                                                                                                                                                  |

For additional troubleshooting and detailed patterns (e.g. 1st-gen Constructable Stylesheets vs plain `.css`, variant classes, size/density), see the [full migration steps](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/06_migrate-rendering-and-styles.md) and [component styling guidelines](../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/README.md).

---

## Quality gate

Phase 4 is complete when:

> The component follows the [full migration steps](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/06_migrate-rendering-and-styles.md) and [styling guidelines](../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/README.md), and stylelint passes with no 2nd-gen CSS lint errors.
