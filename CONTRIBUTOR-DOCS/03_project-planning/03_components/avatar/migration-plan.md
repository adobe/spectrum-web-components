<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Avatar / Avatar — 2nd-Gen Migration Plan

<!-- Document title (editable) -->

# Avatar — 2nd-Gen Migration Plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [1. 1st-Gen API Surface](#1-1st-gen-api-surface)
    - [Properties](#properties)
- [2. 2nd-Gen API Surface (implemented)](#2-2nd-gen-api-surface-implemented)
    - [Properties](#properties)
    - [Dropped from 1st-gen](#dropped-from-1st-gen)
- [3. Dependencies](#3-dependencies)
- [4. Breaking Changes](#4-breaking-changes)
    - [4.1 Size System](#41-size-system)
    - [4.2 `--mod-*` Properties Removed](#42---mod--properties-removed)
    - [4.3 Linked Variant Removed](#43-linked-variant-removed)
    - [4.4 `isDecorative` → `decorative`](#44-isdecorative--decorative)
    - [4.5 `label` → `alt`](#45-label--alt)
    - [4.6 CSS Class Wrapper](#46-css-class-wrapper)
- [5. Migration Checklist](#5-migration-checklist)
    - [Phase 2 — Setup](#phase-2--setup)
    - [Phase 3 — API Migration](#phase-3--api-migration)
    - [Phase 4 — Styling](#phase-4--styling)
    - [Phase 5 — Accessibility](#phase-5--accessibility)
    - [Phase 6 — Testing](#phase-6--testing)
    - [Phase 7 — Documentation](#phase-7--documentation)
    - [Phase 8 — Review](#phase-8--review)
- [6. Open Questions](#6-open-questions)
- [7. Reference](#7-reference)

</details>

<!-- Document content (editable) -->

> **Input documents**
> - [Rendering & Styling Migration Analysis](./rendering-and-styling-migration-analysis.md)
> - [Washing Machine Workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
> - 1st-gen source: `1st-gen/packages/avatar/src/Avatar.ts`
> - 1st-gen tests: `1st-gen/packages/avatar/test/`

---

## 1. 1st-Gen API Surface

### Properties

| Property | Type | Default | Reflected | Source |
|---|---|---|---|---|
| `src` | `string` | `''` | No | `Avatar.ts` |
| `size` | `AvatarSize` (50\|75\|100\|200\|300\|400\|500\|600\|700) | `100` | Yes | `Avatar.ts` |
| `isDecorative` | `boolean` | `false` | Yes (`is-decorative`) | `Avatar.ts` |
| `label` | `string` | — | Yes | `LikeAnchor` mixin |
| `href` | `string` | — | Yes | `LikeAnchor` mixin |
| `disabled` | `boolean` | `false` | Yes | `LikeAnchor` mixin |
| `download` | `string` | — | Yes | `LikeAnchor` mixin |
| `rel` | `string` | — | Yes | `LikeAnchor` mixin |
| `target` | `string` | — | Yes | `LikeAnchor` mixin |
| `referrerpolicy` | `string` | — | Yes | `LikeAnchor` mixin |
| `type` | `string` | — | Yes | `LikeAnchor` mixin |

---

## 2. 2nd-Gen API Surface (implemented)

### Properties

| Property | Type | Default | Reflected | Notes |
|---|---|---|---|---|
| `src` | `string` | `''` | No | Unchanged |
| `alt` | `string \| undefined` | `undefined` | No | Replaces `label`; pass `alt=""` for decorative |
| `size` | `AvatarSize` (50–1500) | `500` | Yes | Numeric scale extended; invalid values fall back to 500 |
| `outline` | `boolean` | `false` | Yes | Renders outline for visual separation; defaults to `true` in Avatar Group |
| `disabled` | `boolean` | `false` | Yes | Renders at reduced opacity; entity is inactive or unavailable |
| `decorative` | `boolean` | `false` | Yes | Marks image as decorative; sets `aria-hidden="true"` on host. Use together with `alt=""` for full semantic correctness. Replaces `isDecorative`. |

### Dropped from 1st-gen

| Property | Reason |
|---|---|
| `href`, `target`, `rel`, `download`, `referrerpolicy`, `type` | Linked variant dropped — not in Spectrum 2 avatar spec |

---

## 3. Dependencies

| Dependency | 1st-Gen Source | 2nd-Gen Equivalent | Status |
|---|---|---|---|
| `Focusable` mixin | `@spectrum-web-components/shared` | Not needed | **Closed — linked variant dropped** |
| `LikeAnchor` mixin | `@spectrum-web-components/shared` | Not needed | **Closed — linked variant dropped** |
| `SizedMixin` | N/A | Not used | **Closed — bespoke numeric getter/setter in `AvatarBase`** |
| `SpectrumElement` | `@spectrum-web-components/base` | `2nd-gen/packages/core/element/spectrum-element.ts` | Done |

---

## 4. Breaking Changes

### 4.1 Size System

Numeric sizes kept (not T-shirt sizes). Scale extended from `50–700` → `50–1500`. Default changed from `100` → `500` (40 px, matching S2 spec). Invalid values fall back to `500`.

### 4.2 `--mod-*` Properties Removed

All `--mod-avatar-*` customization properties removed. Consumers must migrate to the explicit component-level custom properties (`--swc-avatar-size`, `--swc-avatar-outline-color`, `--swc-avatar-outline-width`).

### 4.3 Linked Variant Removed

`href` and all `LikeAnchor` properties are not carried forward. The Spectrum 2 avatar spec does not include a linked variant.

### 4.4 `isDecorative` → `decorative`

`isDecorative` and the `is-decorative` attribute are not carried forward. Consumers must migrate to the `decorative` attribute. Only `decorative` causes the host to receive `aria-hidden="true"`. Include `alt=""` alongside `decorative` for full semantic alignment with HTML `<img>` conventions.

### 4.5 `label` → `alt`

`label` is not carried forward. Consumers must migrate to `alt`.

### 4.6 CSS Class Wrapper

2nd-gen components use a `<div class="swc-Avatar">` wrapper. 1st-gen renders `<img>` directly into the shadow root. Consumers targeting shadow internals will need to update.

---

## 5. Migration Checklist

### Phase 2 — Setup
- [x] Create `2nd-gen/packages/core/components/avatar/` directory
- [x] Create `2nd-gen/packages/swc/components/avatar/` directory
- [x] Stub `Avatar.base.ts`, `Avatar.types.ts`, `index.ts` in core
- [x] Stub `Avatar.ts`, `Avatar.css`, `index.ts` in swc
- [x] Add packages to workspace; verify build passes

### Phase 3 — API Migration
- [x] Define `AvatarSize` type in `Avatar.types.ts`
- [x] Define `AvatarBase` extending `SpectrumElement` with `src`, `alt`, `size`, `overBackground`
- [x] Add `static readonly VALID_SIZES` array
- [x] Implement `firstUpdated` to set `size` attribute if missing

### Phase 4 — Styling
- [x] Add `<div class="swc-Avatar">` wrapper to render output
- [x] Size token mappings for all sizes (50–1500)
- [x] `over-background` outline rules (1px for 50–900, 2px for 1000–1500)
- [x] Remove all `--mod-avatar-*` properties
- [x] Run `stylelint`

### Phase 5 — Accessibility
- [x] `alt` provided → `alt="[value]"` on `<img>`
- [x] `alt=""` (decorative) → `alt=""` + `aria-hidden="true"` on `<img>`
- [x] `alt` omitted → `alt=""` on `<img>` + DEBUG warning
- [x] DEBUG warning for missing `alt`
- [x] Host is not focusable (no `Focusable` mixin, no `tabIndex` set)
- [x] Host exposes no interactive role (`role="button"` / `role="link"`)
- [x] Playwright ARIA snapshot tests

### Phase 6 — Testing
- [x] Port `avatar.test.ts` → `2nd-gen/packages/swc/components/avatar/test/avatar.test.ts`
- [x] Add Playwright `.a11y.spec.ts` file

### Phase 7 — Documentation
- [x] JSDoc on all public properties in `Avatar.base.ts`
- [x] Storybook stories: Playground, Overview, Anatomy, Sizes, Decorative, OverBackground, InActionButton, Accessibility
- [x] Add migration notes for `--mod-*` removal and API changes
- [x] Update migration status doc

### Phase 8 — Review
- [x] Run full lint suite
- [ ] QA all story variants visually
- [ ] At least one engineer review before merging to `main`

---

## 6. Open Questions

| ID | Question | Resolution |
|---|---|---|
| **OQ-1** | Size system: numeric vs T-shirt sizes? | **Closed** — numeric sizes kept and extended to 1500; bespoke getter/setter in `AvatarBase` (no `SizedMixin`) |
| **OQ-2** | `Focusable` mixin needed? | **Closed** — linked variant dropped; avatar is not focusable |
| **OQ-3** | `LikeAnchor` mixin needed? | **Closed** — linked variant dropped; `href` and related props not carried forward |
| **OQ-4** | `is-decorative` attribute name? | **Closed** — dropped entirely; replaced by `alt=""` (standard HTML semantics) |
| **OQ-5** | S2 tokens for sizes 800–1500 exist? | **Closed** — confirmed in `tokens.css`; all size rules implemented |
| **OQ-6** | `image` variant types (gradient, initials, guest)? | **Open** — S2 spec defines four image variants: `user image`, `gradient image`, `initials`, `guest`. Figma shows all four but provides no implementation detail (token names, gradient asset, initials derivation logic, fallback chain). Current implementation only supports `user image` via `src`. Remaining variants are a **known gap** — do not implement until design provides full spec for each variant including tokens, assets, and fallback behavior. |

---

## 7. Reference

- Reference implementation: `2nd-gen/packages/core/components/badge/Badge.base.ts`
- CSS migration guide: `CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md`
- 2nd-gen testing guide: `CONTRIBUTOR-DOCS/01_contributor-guides/11_2ndgen_testing.md`
- 2nd-gen core mixins: `2nd-gen/packages/core/mixins/`
