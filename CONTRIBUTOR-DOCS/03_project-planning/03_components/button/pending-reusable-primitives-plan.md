<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Button / Pending reusable primitives plan

<!-- Document title (editable) -->

# Pending reusable primitives plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Goal (unchanged)](#goal-unchanged)
- [Current state on `main` (starting point)](#current-state-on-main-starting-point)
    - [Gap vs. goal](#gap-vs-goal)
- [Proposed primitives](#proposed-primitives)
- [Behavior parity (must hold)](#behavior-parity-must-hold)
- [Scope](#scope)
- [Decisions (confirmed)](#decisions-confirmed)
- [Risks](#risks)
- [Checklist](#checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

Plan to extract the pending (busy) state into reusable, decoupled 2nd-gen primitives so any pending-capable component can adopt it, not just `ButtonBase` subclasses. Tracked as [SWC-2296](https://jira.corp.adobe.com/browse/SWC-2296).

Status: **planned — decisions confirmed, ready to implement.** This plan starts from the current `main` and supersedes the earlier exploration on `caseyisonit/pending-controller` / [PR #6393](https://github.com/adobe/spectrum-web-components/pull/6393), which diverged from a competing pending refactor that has since landed on `main`. Implementation branch: `caseyisonit/refactor-pending-primitives-swc-2296`.

## Goal (unchanged)

Provide reusable, decoupled pending primitives in 2nd-gen so any component with a busy state gets the agreed behavior without re-implementing it:

- 1-second delayed busy visual (no flash for quick operations).
- Inline-size freeze so the host does not resize when its label/icon hide.
- Derived busy accessible name (`"<name>, busy"`) with `pending-label` override.
- `aria-disabled` while focusable (not native `disabled`); activation suppressed.
- An animated, themeable spinner.

## Current state on `main` (starting point)

`main` already shares pending three ways, but two of them are coupled to button:

| Concern | Where it lives on `main` | Reusable by non-button components? |
| --- | --- | --- |
| State (delay timer, `pendingActive`, inline-size freeze, `getPendingAccessibleName`, `aria-disabled`, click suppression) | `core/components/button/Button.base.ts` (`ButtonBase`) | ❌ only via `extends ButtonBase` |
| Spinner render | `swc/components/button/pending-spinner.ts` → `renderPendingSpinner(pending, pendingActive)` | ⚠️ only by importing from the button package |
| Spinner styles | `swc/stylesheets/_lit-styles/pending-spinner.css` (`pendingSpinnerStyles`) | ✅ already in a neutral shared dir |

Consumers today: `swc-button` and `swc-action-button` both `extends ButtonBase` and call `renderPendingSpinner(...)` + import `pendingSpinnerStyles`.

### Gap vs. goal

1. The **state logic is inheritance-locked** to `ButtonBase`. A pending-capable component that is not button-like (or that already has a different base) cannot reuse it.
2. The **render helper lives in the button component package**, so reusing it from elsewhere couples that component to button.

## Proposed primitives

1. **`PendingController`** (`core/controllers/pending-controller`) — owns the reusable *state*: the delayed `pendingActive` flag, the timer, the inline-size freeze (writes `--swc-pending-inline-size` on a configurable target), and `getPendingAccessibleName()` (via a `resolveAccessibleName` option). Rendering-agnostic; no token/styles dependency.
2. **`pendingSpinner` directive** (`core/directives/pending-spinner`) — move the render out of `swc/components/button/` into a render-only core directive (no token dependency) so any component can consume it without importing from the button package. The token-based spinner CSS stays as the `swc` `_lit-styles/pending-spinner.css` fragment.
3. **`PendingMixin`** (`core/mixins`) — a thin mixin that declares the `pending` / `pending-label` reactive properties, instantiates the controller, and wires click suppression, so a host opts in with one mixin.
4. **`ButtonBase` stays pending-agnostic** — it gains no pending logic. `swc-button` and `swc-action-button` each apply `PendingMixin` to opt in. Other `ButtonBase` subclasses that do not need pending (e.g. `CloseButton`) are unaffected.

## Behavior parity (must hold)

- ARIA (`aria-disabled`, busy `aria-label`) stays synchronous on `pending`; the visual treatment keys off the delayed `pendingActive`.
- Focusable while busy; activation suppressed; no native `disabled`.
- Static-color, reduced-motion, and forced-colors spinner treatments preserved.
- No public API change to `swc-button` / `swc-action-button` (`pending` / `pending-label` keep identical reflected attributes).

## Scope

In scope: the three primitives above; refactor `ButtonBase`; verify `swc-button` + `swc-action-button`; controller stories + per-unit MDX; tests; regenerate `global-*.css`.

Out of scope (follow-ups): migrating other pending-capable components (Combobox, Picker); localizing the `", busy"` suffix.

## Decisions (confirmed)

1. **State primitive shape:** `PendingController` (state) **plus** a thin `PendingMixin` (one-line opt-in). Non-button hosts may use the controller directly.
2. **Spinner render home:** a **`core` directive** (`core/directives/pending-spinner`), render-only and token-free; the token-based CSS stays as the `swc` `_lit-styles/pending-spinner.css` fragment.
3. **`ButtonBase` role:** **stays fully pending-agnostic.** `swc-button` and `swc-action-button` each apply `PendingMixin`; subclasses that do not need pending (e.g. `CloseButton`) are unaffected. (This is the key change from `main`, where pending state lives in `ButtonBase` and is inherited by all subclasses.)
4. **Delivery:** **one PR** — controller + directive + mixin + both consumers together, so `main` is never left half-migrated.

## Risks

- Two components (`swc-button`, `swc-action-button`) and their generated `global-*.css` must stay visually identical — VRT/tests gate this.
- Relocating `renderPendingSpinner` touches both components' imports; the shared CSS fragment path may also move.
- `core` has no `token()`/`lit-css` build step, so any styles that move to `core` must be token-free; the token-based spinner CSS therefore stays in `swc` `_lit-styles`.

## Checklist

- [ ] `PendingController` in `core/controllers/pending-controller` (+ barrel + `core/package.json` exports + `typesVersions`)
- [ ] `pendingSpinner` directive in `core/directives/pending-spinner` (+ barrel + exports); `swc-button` + `swc-action-button` import it instead of `swc/components/button/pending-spinner.ts`; remove the old button-package helper
- [ ] `PendingMixin` in `core/mixins` (declares `pending`/`pending-label`, instantiates the controller, wires click suppression)
- [ ] `ButtonBase` left pending-agnostic (no pending code); `swc-button` + `swc-action-button` apply `PendingMixin`; confirm `CloseButton` and other non-pending subclasses are unaffected
- [ ] Controller stories + per-unit MDX; tests for controller, directive, and the two consumers
- [ ] core + swc build; `global-button.css` / `global-action-button.css` regenerated; lint + `lint:docs-pages` clean; VRT/behavior parity confirmed
- [ ] `SWC-2296` updated; this plan's checklist completed

## References

- Jira: [SWC-2296](https://jira.corp.adobe.com/browse/SWC-2296)
- Superseded exploration: [PR #6393](https://github.com/adobe/spectrum-web-components/pull/6393) (branch `caseyisonit/pending-controller`)
- Button migration plan: [migration-plan.md](./migration-plan.md)
- Current `main` implementation: `core/components/button/Button.base.ts`, `swc/components/button/pending-spinner.ts`, `swc/stylesheets/_lit-styles/pending-spinner.css`
