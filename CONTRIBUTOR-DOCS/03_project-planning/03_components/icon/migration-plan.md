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

## References

- [`2nd-gen/packages/swc/components/icon/`](../../../../2nd-gen/packages/swc/components/icon/)
- [`1st-gen/packages/icon/src/Icon.ts`](../../../../1st-gen/packages/icon/src/Icon.ts)
- [`.storybook/main.ts`](../../../../2nd-gen/packages/swc/.storybook/main.ts) — `*.internal.*` exclusion
