---
component: Avatar
phase: 7 — Documentation
status: in progress
last-updated: 2026-03-31
---

# Avatar — 2nd-Gen Migration Plan

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
| `alt` | `string \| undefined` | `undefined` | No | Replaces `label` + `isDecorative`; pass `alt=""` for decorative |
| `size` | `AvatarSize` (50–1500) | `500` | Yes | Numeric scale extended; invalid values fall back to 500 |
| `overBackground` | `boolean` | `false` | Yes (`over-background`) | New in S2; adds outline for contrast on colored backgrounds |
| `label` _(deprecated)_ | `string \| undefined` | — | No | Shim → sets `alt`; warns in DEBUG mode |

### Dropped from 1st-gen

| Property | Reason |
|---|---|
| `href`, `target`, `rel`, `download`, `referrerpolicy`, `type` | Linked variant dropped — not in Spectrum 2 avatar spec |
| `disabled` | No linked variant; no disabled state in S2 spec |
| `isDecorative` | Replaced by `alt=""` (standard HTML pattern) |

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

All `--mod-avatar-*` customization properties removed. Consumers must migrate to the explicit component-level custom properties (`--swc-avatar-size`, `--swc-avatar-border-color`, `--swc-avatar-border-width`).

### 4.3 Linked Variant Removed

`href` and all `LikeAnchor` properties are not carried forward. The Spectrum 2 avatar spec does not include a linked variant.

### 4.4 `isDecorative` → `alt=""`

`isDecorative` is removed. Pass `alt=""` to mark an avatar as decorative. This aligns with standard HTML `<img>` semantics.

### 4.5 `label` → `alt`

`label` is deprecated with a DEBUG-mode warning shim. Consumers should migrate to `alt`.

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
- [x] Add deprecated `label` shim with DEBUG warning
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

All open questions closed.

| ID | Question | Resolution |
|---|---|---|
| **OQ-1** | Size system: numeric vs T-shirt sizes? | **Closed** — numeric sizes kept and extended to 1500; bespoke getter/setter in `AvatarBase` (no `SizedMixin`) |
| **OQ-2** | `Focusable` mixin needed? | **Closed** — linked variant dropped; avatar is not focusable |
| **OQ-3** | `LikeAnchor` mixin needed? | **Closed** — linked variant dropped; `href` and related props not carried forward |
| **OQ-4** | `is-decorative` attribute name? | **Closed** — dropped entirely; replaced by `alt=""` (standard HTML semantics) |
| **OQ-5** | S2 tokens for sizes 800–1500 exist? | **Closed** — confirmed in `tokens.css`; all size rules implemented |

---

## 7. Reference

- Reference implementation: `2nd-gen/packages/core/components/badge/Badge.base.ts`
- CSS migration guide: `CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md`
- 2nd-gen testing guide: `CONTRIBUTOR-DOCS/01_contributor-guides/11_2ndgen_testing.md`
- 2nd-gen core mixins: `2nd-gen/packages/core/mixins/`
