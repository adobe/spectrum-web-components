<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Button / Pending controller extraction

<!-- Document title (editable) -->

# Pending controller extraction

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Status](#status)
- [Goal](#goal)
- [Background](#background)
- [Design decisions](#design-decisions)
- [Implementation map](#implementation-map)
- [Public API surface (controller)](#public-api-surface-controller)
- [Checklist](#checklist)
- [Follow-ups / not in scope](#follow-ups--not-in-scope)

</details>

<!-- Document content (editable) -->

Tracking doc for extracting Button's pending (busy) state logic into a reusable Lit reactive controller in `core`. This realizes the reuse deferred during the initial Button migration (see [migration-plan.md](./migration-plan.md), TL;DR and the post-migration update on the architecture section).

## Status

**Implemented.** core + swc build, 22/22 Button tests, 6/6 controller stories (render + axe), lint and `lint:docs-pages` clean.

## Goal

1. Migrate the 1st-gen pending-state reactive controller into `2nd-gen/packages/core/controllers/`.
2. Remove the pending logic from the core Button base class (`ButtonBase`).
3. Drive the pending state in `swc-button` (`Button.ts`) through the new controller.

## Background

| Source | Approach |
| --- | --- |
| 1st-gen `PendingStateController` (`1st-gen/tools/reactive-controllers/src/PendingState.ts`) | Renders `<sp-progress-circle>`, caches/restores the host `aria-label`, requires the host to be the interactive element. |
| 2nd-gen Button (pre-extraction) | Pending logic split across `ButtonBase` (delay timer, `pendingActive`, accessible-name derivation, click suppression, inline-size freeze) and `Button.ts` (inline SVG spinner, aria bindings). Richer and more accessible (`SWC-459`). |

A verbatim 1st-gen port would have regressed the 2nd-gen button (loss of the 1s delay, inline-size freeze, `aria-disabled`, the busy-name work) and reintroduced the shadow-DOM limitation. Decision: build a new 2nd-gen controller that takes the 1st-gen pattern/intent but encapsulates the current 2nd-gen behavior.

## Design decisions

- **Controller renders its own spinner and ships its own styles**, fully decoupled from button. Reusable by any component with a pending state. Themeable via `--swc-pending-spinner-*` custom properties; no design-token dependency.
  - Build constraint: the `core` package's vite config has no `vite-plugin-lit-css` / `postcss-token`, so the controller styles use an inline Lit `css` literal (no `token()` macro), with custom-property theming hooks.
- **`pending` / `pending-label` moved to `swc-button`**; `ButtonBase` is pending-agnostic. Click suppression generalized via a `protected isActivationSuppressed()` hook that `swc-button` overrides to add `pending`.
- **Behavior parity:** `aria-disabled`, the derived busy `aria-label`, and click suppression remain synchronous on `pending`; the visual treatment (disabled palette, spinner, frozen size) keys off the 1s-delayed `pendingActive`. The spinner now renders only while `pendingActive` (previously rendered hidden during the delay) — visually identical.

## Implementation map

| Area | Path |
| --- | --- |
| Controller (logic + styles) | `2nd-gen/packages/core/controllers/pending-controller/src/pending-controller.ts` |
| Controller barrel | `2nd-gen/packages/core/controllers/pending-controller/index.ts` |
| Controllers index + package exports | `2nd-gen/packages/core/controllers/index.ts`, `2nd-gen/packages/core/package.json` |
| Base class (pending removed) | `2nd-gen/packages/core/components/button/Button.base.ts` |
| Concrete button (controller wired) | `2nd-gen/packages/swc/components/button/Button.ts` |
| Button CSS (busy treatment + spinner theming) | `2nd-gen/packages/swc/components/button/button.css` |
| Controller docs + stories | `2nd-gen/packages/core/controllers/pending-controller/pending-controller.mdx`, `.../stories/` |

## Public API surface (controller)

- `PendingController` — `pendingActive` (getter), `getPendingAccessibleName()`, `renderPendingState()`.
- `pendingControllerStyles` — `CSSResult` for the host's `static styles`.
- `PendingControllerHost` — `{ pending, pendingLabel? }`.
- `PendingControllerOptions` — `{ delay?, targetSelector?, resolveAccessibleName? }`.
- Theming: `--swc-pending-spinner-{size,track-color,fill-color,thickness}`, `--swc-pending-inline-size`.

## Checklist

- [x] Controller created in `core/controllers` following the hover/placement conventions (folder, barrel, index, stories, mdx)
- [x] Controller exported from the controllers barrel and `core/package.json` (`exports` + `typesVersions`)
- [x] Pending logic removed from `ButtonBase`; click suppression generalized
- [x] `pending` / `pending-label` declared on `swc-button`; controller wired into render
- [x] `button.css` keeps only button-specific busy treatment + spinner theming; spinner internals moved to the controller
- [x] Stories + per-unit MDX authored (`controller` tag so `ApiTable` is omitted; hand-authored `## API`)
- [x] Builds pass (core, swc); generated `global-button.css` regenerated and in sync
- [x] Tests pass (22 Button, 6 controller stories); lint + `lint:docs-pages` clean
- [x] `migration-plan.md` updated with the post-migration note

## Follow-ups / not in scope

- Migrating other pending-capable 1st-gen components (Combobox, Picker) to this controller; the shadow-DOM interactive-element limitation that blocked the 1st-gen controller does not apply here because the host applies aria in its own template.
- Localizing the `", busy"` suffix (currently hard-coded, matching the initial Button migration).
