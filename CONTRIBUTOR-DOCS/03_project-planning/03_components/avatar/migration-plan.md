---
component: Avatar
phase: 1 — Preparation
status: draft
last-updated: 2026-03-30
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

### Methods / Lifecycle

| Method | Visibility | Notes |
|---|---|---|
| `render()` | protected | Returns `<img>` or `<a><img></a>` depending on `href` |
| `firstUpdated()` | protected | Sets `size` attribute default; calls `warnMissingAlt()` |
| `updated()` | protected | Calls `warnMissingAlt()` on label / isDecorative / href changes |
| `focusElement` | getter | Returns `<a#link>` if present, else host |
| `warnMissingAlt()` | private | DEBUG-mode warning for missing accessibility attributes |

### Events

None dispatched. Standard DOM events flow through the anchor element when `href` is set.

### Slots

None.

### CSS Custom Properties

**Read from tokens:**

| Property | Purpose |
|---|---|
| `--spectrum-avatar-size-{50–700}` | Dimension per size step |
| `--spectrum-avatar-color-opacity` | Default opacity (1) |
| `--spectrum-avatar-color-opacity-disabled` | Disabled opacity |
| `--spectrum-avatar-opacity-disabled` | Alt disabled opacity |
| `--spectrum-avatar-focus-indicator-thickness` | Focus ring thickness |
| `--spectrum-avatar-focus-indicator-gap` | Focus ring gap |
| `--spectrum-avatar-focus-indicator-color` | Focus ring color |

**Consumed as `--mod-*` customization surface (to be removed in 2nd-gen):**

`--mod-avatar-inline-size`, `--mod-avatar-block-size`, `--mod-avatar-border-radius`,
`--mod-avatar-color-opacity`, `--mod-avatar-color-opacity-disabled`,
`--mod-avatar-focus-indicator-thickness`, `--mod-avatar-focus-indicator-gap`,
`--mod-avatar-focus-indicator-color`

### DOM Structure

```html
<!-- No href -->
<img class="image" alt="[label|'']" src="[src]" />

<!-- With href -->
<a id="link" class="link" href="[href]">
  <img class="image" alt="[label|'']" src="[src]" />
</a>
```

### Accessibility Logic

```
label provided    → alt=label, aria-hidden removed
isDecorative only → alt="", aria-hidden="true"
href + isDecorative (no label) → alt="", aria-hidden="true" + DEBUG warning
neither           → alt="", DEBUG warning
```

---

## 2. Dependencies

| Dependency | 1st-Gen Source | 2nd-Gen Equivalent | Status |
|---|---|---|---|
| `Focusable` mixin | `@spectrum-web-components/shared` | Not yet in `2nd-gen/packages/core` | **Open question — see §5** |
| `LikeAnchor` mixin | `@spectrum-web-components/shared` | Not yet in `2nd-gen/packages/core` | **Open question — see §5** |
| `SizedMixin` | N/A (custom getter/setter in Avatar.ts) | `2nd-gen/packages/core/mixins/sized-mixin.ts` | Available, but uses T-shirt sizes — **breaking** |
| `SpectrumElement` | `@spectrum-web-components/base` | `2nd-gen/packages/core/element/spectrum-element.ts` | Available |
| Spectrum CSS avatar | `spectrum-css` v1 branch | `spectrum-css` `spectrum-two` branch | Must be checked out as sibling |

---

## 3. Breaking Changes

### 3.1 Size System (High Impact)

The 1st-gen avatar uses numeric sizes (`50 | 75 | 100 | 200 | 300 | 400 | 500 | 600 | 700`). The 2nd-gen `SizedMixin` uses T-shirt sizes (`xxs | xs | s | m | l | xl | xxl`). Additionally, Spectrum 2 introduces new size steps not present in 1st-gen: **800, 900, 1000, 1100, 1200, 1300, 1400, 1500**.

**Decision needed:** Does 2nd-gen avatar keep numeric sizes (extending to 1500) or adopt T-shirt sizes? This affects the `AvatarSize` type, the `size` attribute values, and all size-related CSS custom properties. If T-shirt sizes are adopted, a deprecation alias or coercion layer may be needed for 1.x → 2.x migrations.

> See open question OQ-1.

### 3.2 `--mod-*` Properties Removed

All `--mod-avatar-*` customization properties will be removed. Consumers relying on them must migrate to the explicit component-level custom properties exposed by the 2nd-gen component.

### 3.3 `LikeAnchor` / `Focusable` Mixin Shape May Change

The `href`, `target`, `rel`, `download`, `referrerpolicy`, `type`, and `disabled` properties are currently inherited from `LikeAnchor`. The 2nd-gen equivalent mixin (if created) may change the API shape or attribute names. Until the mixin is confirmed in 2nd-gen core, treat these as potentially breaking.

### 3.4 CSS Class Wrapper

2nd-gen components use a `<div class="swc-Avatar">` wrapper element. 1st-gen does not. This changes the shadow DOM structure and may affect consumers targeting shadow parts or relying on `:host` layout.

### 3.5 Attribute Name: `is-decorative` → TBD

`isDecorative` reflects as `is-decorative`. Confirm whether the attribute name is preserved in 2nd-gen or renamed for consistency with other patterns (e.g. `decorative`).

---

## 4. Migration Checklist

### Phase 2 — Setup
- [ ] Create `2nd-gen/packages/core/components/avatar/` directory
- [ ] Create `2nd-gen/packages/swc/components/avatar/` directory
- [ ] Stub `Avatar.base.ts`, `Avatar.types.ts`, `index.ts` in core
- [ ] Stub `Avatar.ts`, `Avatar.css`, `index.ts` in swc
- [ ] Add packages to workspace; verify build passes

### Phase 3 — API Migration
- [ ] Define `AvatarSize` type in `Avatar.types.ts` (resolve size-system decision first)
- [ ] Define `AvatarBase` extending `SpectrumElement` with `src`, `size`, `isDecorative` properties
- [ ] Implement `LikeAnchor`-equivalent link behavior (pending 2nd-gen mixin or inline)
- [ ] Implement `Focusable`-equivalent focus management (pending 2nd-gen mixin or inline)
- [ ] Implement `warnMissingAlt()` debug warning
- [ ] Add `static readonly VALID_SIZES` array

### Phase 4 — Styling
- [ ] Confirm `spectrum-css` checkout on `spectrum-two` branch (sibling to this repo)
- [ ] Copy `packages/avatar/index.css` from spectrum-css `spectrum-two` branch (not `/dist`)
- [ ] Add `<div class="swc-Avatar">` wrapper to render output
- [ ] Replace `:host` selectors with `.swc-Avatar`
- [ ] Remove all `--mod-avatar-*` properties; replace with explicit component custom properties
- [ ] Add size token mappings for all new S2 sizes (800–1500) if staying numeric
- [ ] Remove `avatar-overrides.css`; clean up legacy classes
- [ ] Run `stylelint` (property order, no-descending-specificity, token usage checks)

### Phase 5 — Accessibility

> Full requirements: [accessibility-migration-analysis.md](./accessibility-migration-analysis.md)

- [ ] Non-linked: `label` → `alt="[label]"`, not focusable
- [ ] Non-linked: `is-decorative` (no label) → `alt=""` + `aria-hidden="true"` on `<img>`, not focusable
- [ ] Non-linked: neither → `alt=""` + DEBUG warning
- [ ] Linked: `label` → `<a><img alt="[label]"></a>`, focusable, Enter activates
- [ ] Linked: `is-decorative` + no `label` → DEBUG warning (invalid combination)
- [ ] `disabled` + `href` → no `<a>` rendered, removed from tab order (already implemented in Phase 2 stub)
- [ ] Focus ring visible on `.swc-Avatar-link:focus-visible`, meets WCAG 1.4.3 contrast
- [ ] Run axe-core against all story variants
- [ ] Playwright ARIA snapshot tests cover all states above

### Phase 6 — Testing
- [ ] Port `avatar.test.ts` → `2nd-gen/packages/swc/components/avatar/test/avatar.test.ts`
- [ ] Port `avatar-memory.test.ts` memory leak tests
- [ ] Add Playwright `.a11y.spec.ts` file
- [ ] Add Storybook play functions for interaction coverage

### Phase 7 — Documentation
- [ ] Add JSDoc to all public properties in `Avatar.base.ts` and `Avatar.ts`
- [ ] Write Storybook stories covering all sizes, linked, disabled, decorative variants
- [ ] Add migration notes for `--mod-*` removal and any size-system change
- [ ] Update `CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/01_status.md`

### Phase 8 — Review
- [ ] Run full lint suite
- [ ] QA all story variants visually
- [ ] At least one engineer review before merging to `main`

---

## 5. Open Questions / Blockers

| ID | Question | Impact | Owner |
|---|---|---|---|
| **OQ-1** | **Size system:** Keep numeric sizes (50–1500) or migrate to T-shirt sizes? If numeric, can we extend `SizedMixin` or do we need a bespoke implementation? | High — affects API, CSS, type definitions, and consumer migration path | Needs team decision |
| **OQ-2** | **`Focusable` mixin:** Is a 2nd-gen equivalent planned or should Avatar inline the focus management logic? | Medium — no existing 2nd-gen mixin; linking behavior depends on answer | Needs architecture decision |
| **OQ-3** | **`LikeAnchor` mixin:** Same question as OQ-2 — does 2nd-gen plan a shared mixin for anchor-like elements? | Medium — affects multiple components (Button, Tag, etc.) | Coordinate with team |
| **OQ-4** | **`is-decorative` attribute name:** Preserve as-is or rename to `decorative` for consistency? | Low — minor breaking change if renamed | Product decision |
| **OQ-5** | **New S2 sizes 800–1500:** Confirm token values exist in spectrum-css `spectrum-two` branch for all new size steps | Medium — blocks Phase 4 if tokens are missing | Check spectrum-css branch |

---

## 6. Reference

- Reference implementation: `2nd-gen/packages/core/components/badge/Badge.base.ts`
- CSS migration guide: `CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md`
- 2nd-gen testing guide: `CONTRIBUTOR-DOCS/01_contributor-guides/11_2ndgen_testing.md`
- 2nd-gen core mixins: `2nd-gen/packages/core/mixins/`
