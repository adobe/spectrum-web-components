<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Icon / Icon migration plan

<!-- Document title (editable) -->

# Icon migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
- [Decisions](#decisions)
- [Breaking changes (consumer)](#breaking-changes-consumer)
- [Checklist](#checklist)
- [How we'll achieve it](#how-well-achieve-it)
    - [1. Package export (`index.ts`)](#1-package-export-indexts)
    - [2. Monorepo imports (patterns)](#2-monorepo-imports-patterns)
    - [3. JSDoc (`Icon.ts`)](#3-jsdoc-iconts)
    - [4. Public Storybook (`icon.stories.ts` + `icon.mdx`)](#4-public-storybook-iconstoriests--iconmdx)
    - [5. Consumer migration guide](#5-consumer-migration-guide)
    - [6. Tests and story IDs](#6-tests-and-story-ids)
    - [7. Downstream doc audit](#7-downstream-doc-audit)
    - [8. Ship](#8-ship)
- [References](#references)

</details>

<!-- Document content (editable) -->

> One PR. Component already exists; this is go-public + docs + export boundary.

---

## TL;DR

- **Public:** `<swc-icon>` — slot your own SVG (`label`, `size`, `--swc-icon-*`). Same shape as badge/button docs.
- **Private:** `components/icon/elements/*` — monorepo + dev Storybook (`*.internal.*`) only. No iconsets, no `name`/`src`.
- **Packaging fix:** `index.ts` must export `Icon` only. `package.json` `exports` already has no `elements/` path; the barrel re-export is the leak. Vite glob stays as-is.

---

## Decisions

- Ship `<swc-icon>`; do not ship or document `elements/*` as npm API.
- Public docs: `icon.stories.ts`, `icon.mdx`, `migration-guide.mdx` (BYO SVG; promote from `.internal`, strip elements import guidance).
- Keep `icon.internal.*` for maintainer catalog in local Storybook (prod build already excludes `*.internal.*`).
- Monorepo: relative imports to `elements/` (badge pattern). Fix `@adobe/spectrum-wc/icon/elements` in conversational-ai patterns.

---

## Breaking changes (consumer)

| Removed (`sp-icon`) | Use instead |
| --- | --- |
| `name` + iconsets | Default slot: inline `<svg>` |
| `src` | Slot `<svg>` or standalone `<img>` |
| `error` event | — |
| `xxs` / `xxl` | `xs` / `xl` |
| `--mod-icon-*` | `--swc-icon-*` |

Detail lives in the consumer [`migration-guide.mdx`](../../../../2nd-gen/packages/swc/components/icon/migration-guide.internal.mdx) once promoted (follow [`badge/migration-guide.mdx`](../../../../2nd-gen/packages/swc/components/badge/migration-guide.mdx)).

---

## Checklist

**Done:** core + SWC implementation, a11y behavior, unit + playwright tests, `@status internal` removed from JSDoc.

**This PR:**

- [ ] `index.ts` — export `Icon` only
- [ ] Pattern imports — relative paths to `elements/`, not `@adobe/spectrum-wc/icon/elements`
- [ ] JSDoc `@example` — inline SVG only (drop `Chevron100Icon` example)
- [ ] Public `icon.stories.ts` + `icon.mdx` (BYO SVG)
- [ ] `migration-guide.internal.mdx` → `migration-guide.mdx` (no public elements path)
- [ ] Trim `icon.internal.mdx` to catalog-only
- [ ] Spot-check badge (and other) MDX for correct `<swc-icon>` guidance
- [ ] `yarn lint:docs-pages`, tests, Storybook build
- [ ] Changeset

---

## How we'll achieve it

Follow [`badge/`](../../../../2nd-gen/packages/swc/components/badge/) and [`divider/`](../../../../2nd-gen/packages/swc/components/divider/) for public docs shape. Keep [`icon.internal.*`](../../../../2nd-gen/packages/swc/components/icon/) for the maintainer catalog.

### 1. Package export (`index.ts`)

In [`components/icon/index.ts`](../../../../2nd-gen/packages/swc/components/icon/index.ts), drop the elements re-export:

```ts
export * from './Icon.js';
// remove: export * from './elements/index.js';
```

No `package.json` or `vite.config.ts` change. `@adobe/spectrum-wc/icon` stops exposing factories; `elements/` files may still land in `dist/` for monorepo imports but stay unsupported.

### 2. Monorepo imports (patterns)

Replace package-path element imports with relative paths (same as [`badge/stories/badge.stories.ts`](../../../../2nd-gen/packages/swc/components/badge/stories/badge.stories.ts)):

```ts
// Before
import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';

// After (from patterns/conversational-ai/response-status/)
import { Chevron75Icon } from '../../../components/icon/elements/index.js';
```

Files today: `ResponseStatus.ts`, `MessageSources.ts`. Grep for `@adobe/spectrum-wc/icon/elements` before merge.

### 3. JSDoc (`Icon.ts`)

In [`Icon.ts`](../../../../2nd-gen/packages/swc/components/icon/Icon.ts), keep one `@example` with inline `<svg>`. Remove the `Chevron100Icon` factory example.

### 4. Public Storybook (`icon.stories.ts` + `icon.mdx`)

**Stories:** Copy [`icon.internal.stories.ts`](../../../../2nd-gen/packages/swc/components/icon/stories/icon.internal.stories.ts) → `icon.stories.ts`, then:

- Update meta JSDoc: public component, BYO SVG (not “internal-only”).
- Use a shared inline SVG helper in stories (search icon path already in tests) for Overview, Anatomy, Sizes, Accessibility.
- **Do not** copy `Sources`, `SharedTemplates`, or `AvailableIcons` to the public file; those stay in `.internal.stories.ts`.
- Tags: `overview`, `anatomy`, `options`, `a11y`; Playground `['dev']`; meta `tags: ['migrated']`.

**MDX:** Add `icon.mdx` beside [`Icon.ts`](../../../../2nd-gen/packages/swc/components/icon/Icon.ts), wired to `icon.stories.ts` (`<Meta of={Stories} />`, `<DocsHeader />`, `<DocsFooter />`). Sections: Anatomy, Options (Sizes + inline SVG source), Accessibility. Pattern: [`divider.mdx`](../../../../2nd-gen/packages/swc/components/divider/divider.mdx).

**Internal docs:** Strip catalog prose from [`icon.internal.mdx`](../../../../2nd-gen/packages/swc/components/icon/icon.internal.mdx); keep Shared templates / Available icons canvases pointing at `.internal.stories.ts`.

Prod Storybook already skips `*.internal.*` via [`.storybook/main.ts`](../../../../2nd-gen/packages/swc/.storybook/main.ts).

### 5. Consumer migration guide

Copy [`migration-guide.internal.mdx`](../../../../2nd-gen/packages/swc/components/icon/migration-guide.internal.mdx) → `migration-guide.mdx`:

- Keep: tag/import rename, removed `name`/`src`, size table, `--mod-icon-*` → `--swc-icon-*`, a11y, checklist.
- **Remove:** any `@adobe/spectrum-wc/.../elements` import guidance and “icon factory” migration path.
- **Add:** BYO SVG as the primary migration path (inline slot + optional Lit `` html`<svg>…` `` template).
- Shape: [`badge/migration-guide.mdx`](../../../../2nd-gen/packages/swc/components/badge/migration-guide.mdx).

Delete or keep `migration-guide.internal.mdx` only if nothing references it; prefer single public file.

### 6. Tests and story IDs

- [`icon.test.ts`](../../../../2nd-gen/packages/swc/components/icon/test/icon.test.ts): point at `icon.stories.js` after rename; keep inline SVG renders.
- [`icon.a11y.spec.ts`](../../../../2nd-gen/packages/swc/components/icon/test/icon.a11y.spec.ts): update story IDs if public story slug changes (e.g. still `components-icon--overview` if title stays `Icon`).
- Run `yarn test` and `yarn test:a11y` in `2nd-gen/packages/swc`.

### 7. Downstream doc audit

Grep public MDX for `elements/` and wrong icon guidance:

```bash
rg 'icon/elements|@adobe/spectrum-wc/icon/elements' 2nd-gen/packages/swc/components --glob '*.mdx'
```

[`badge.mdx`](../../../../2nd-gen/packages/swc/components/badge/badge.mdx) is the reference: icon slot + `aria-hidden` when paired with text; `role="img"` + `aria-label` on badge for icon-only. Fix only if something contradicts that.

### 8. Ship

- `yarn lint:docs-pages` in repo root (validates `icon.mdx` section order and canvases).
- `yarn storybook:build` in `2nd-gen/packages/swc` (confirms public Icon page, no internal catalog in prod).
- Add a `@adobe/spectrum-wc` changeset (`minor`: public `swc-icon` documentation and export surface).

---

## References

- [`2nd-gen/packages/swc/components/icon/`](../../../../2nd-gen/packages/swc/components/icon/)
- [`1st-gen/packages/icon/src/Icon.ts`](../../../../1st-gen/packages/icon/src/Icon.ts)
- [`.storybook/main.ts`](../../../../2nd-gen/packages/swc/.storybook/main.ts) — `*.internal.*` exclusion
