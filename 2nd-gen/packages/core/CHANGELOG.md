# @spectrum-web-components/core

## 2.0.0-beta.2

### Minor Changes

- [#6413](https://github.com/adobe/spectrum-web-components/pull/6413) [`b4f454b`](https://github.com/adobe/spectrum-web-components/commit/b4f454b979fe60212d1c7ea4f4b86a29def4666b) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - Add the 2nd-gen `<swc-close-button>`, migrated from the Spectrum 1 `<sp-close-button>`.
  - **API**: `size`, `disabled`, `accessible-label`, and `static-color`; omits the legacy `variant` surface in favor of `static-color`.
  - **Accessibility**: renders a real inner `<button type="button">` with delegated focus; requires `accessible-label` for its icon-only name; the cross icon remains decorative.
  - **Styling**: ships Spectrum 2 sizing and static-color treatments plus the `--swc-close-button-*` custom-property surface for token-aligned overrides.
  - **Docs and tests**: includes Storybook docs, consumer migration guidance, unit coverage, and Playwright accessibility and keyboard tests.

- [#6413](https://github.com/adobe/spectrum-web-components/pull/6413) [`b4f454b`](https://github.com/adobe/spectrum-web-components/commit/b4f454b979fe60212d1c7ea4f4b86a29def4666b) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **feat(color-handle):** Added `<swc-color-handle>`, the Spectrum 2 migration of `sp-color-handle`.

  A non-interactive color-picker primitive exposing `color`, `disabled`, `focused`, `open`, and the new `fill` property, with a built-in `<swc-color-loupe>` and an adaptive white-first dual border that meets WCAG 1.4.11 non-text contrast across the color spectrum. The `--mod-colorhandle-*` custom properties are removed; see the migration guide.

- [#6439](https://github.com/adobe/spectrum-web-components/pull/6439) [`7f0c3e9`](https://github.com/adobe/spectrum-web-components/commit/7f0c3e937e697e3e1d5d3973ce4f709542f1bbef) Thanks [@caseyisonit](https://github.com/caseyisonit)! - Extract the pending (busy) state into reusable, decoupled 2nd-gen core primitives so any pending-capable component can adopt it.
  - **`@adobe/spectrum-wc-core`**: adds `PendingController` (`/controllers/pending-controller`) for the pending state (delayed activation, inline-size freeze, derived busy accessible name), the render-only `renderPendingSpinner` directive (`/directives/pending-spinner`), and `PendingMixin` (`/mixins`) which wires the controller, the `pending` / `pending-label` properties, and click suppression. `ButtonBase` no longer owns pending state.
  - **`@adobe/spectrum-wc`**: `swc-button` and `swc-action-button` now consume these primitives via `PendingMixin`. No public API change — `pending` / `pending-label` and the busy behavior are unchanged.

- [#6413](https://github.com/adobe/spectrum-web-components/pull/6413) [`b4f454b`](https://github.com/adobe/spectrum-web-components/commit/b4f454b979fe60212d1c7ea4f4b86a29def4666b) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **refactor(tabs):** Migrate `<swc-tabs>` keyboard navigation to `FocusgroupNavigationController`.

  Arrow-key, Home, and End navigation is now handled by the controller rather than by manually computed deltas in `handleKeyDown`. The `handleKeyDown` method retains only Enter/Space activation; all roving-tabindex management is delegated to the controller. In automatic activation mode, `focusgroupNavigationActiveChange` events with `source: 'keyboard'` drive selection-follows-focus; events with `source: 'refresh'` or `source: 'programmatic'` are intentionally ignored so that mounting or toggling `disabled` cannot trigger spurious `change` events.

### Patch Changes

- [#6518](https://github.com/adobe/spectrum-web-components/pull/6518) [`36052f3`](https://github.com/adobe/spectrum-web-components/commit/36052f305622ad8f46b44bf5d71e2b02ebd8229c) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - Fix inaccurate API reference tables for several 2nd-gen components by documenting CSS custom properties and JSDoc property descriptions that were missing from the generated Custom Elements Manifest.
  - Added missing `@cssprop` entries: `swc-tabs`/`swc-tab` (5 props), `swc-action-button` and `swc-button` (down-state transform, button also gets `max-inline-size`), `swc-illustrated-message` (10 props covering illustration sizing/color and heading/description typography).
  - Added missing `size`/`variant` property descriptions for `swc-button`, `swc-action-button`, `swc-close-button`, `swc-status-light`, and `swc-badge`.
  - Fixed the Tabs docs page rendering only `swc-tabs`'s API table; `swc-tab` and `swc-tab-panel` (the other two elements of the three-element component) now get their own API tables too, matching the pattern already used by Accordion.

  No component runtime changes; documentation and Storybook docs-page rendering only.

- [#6513](https://github.com/adobe/spectrum-web-components/pull/6513) [`41e0483`](https://github.com/adobe/spectrum-web-components/commit/41e0483f59d3956ce973bbe50b2d54a1d8c73e9f) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **fix(color-loupe):** Added an adaptive white-first inner border to `<swc-color-loupe>` so its chrome meets WCAG 1.4.11 non-text contrast (≥3:1) across the color spectrum.

  The inner border's opacity now escalates above its default floor only when the white outer halo can't itself carry 3:1 contrast against the loupe's color. The outer border, shape, and sizing are unchanged, and there is no public API change. This supersedes the prior practical-limits exception, matching the adaptive dual-border approach already shipped for `<swc-color-handle>`.

- [#6413](https://github.com/adobe/spectrum-web-components/pull/6413) [`b4f454b`](https://github.com/adobe/spectrum-web-components/commit/b4f454b979fe60212d1c7ea4f4b86a29def4666b) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **fix(popover):** Fixed `swc-popover` staying dismissed on the next unrelated outside click after a trigger press was dragged off and released elsewhere.

  A `pointerdown` on the trigger followed by a drag off the trigger and a release elsewhere never dispatches a `click`, so the internal reopen-guard flag was left stuck `true`, misattributing the next unrelated outside light-dismiss to that stale press and swallowing the following legitimate trigger click.

- [#6490](https://github.com/adobe/spectrum-web-components/pull/6490) [`1e053fe`](https://github.com/adobe/spectrum-web-components/commit/1e053fe761c20b1df70c842cb3f9dcee94e02d8d) Thanks [@cdransf](https://github.com/cdransf)! - **fix(slot-attribute-propagation-controller):** Fixed `SlotAttributePropagationController` permanently skipping re-propagation when a repeated value was recorded before its target slot had resolved, and added support for propagating attributes that are only sometimes present on the host.

  `getValue` may now return `null` to remove the propagated attribute from assigned elements instead of setting it to an empty string. The `hostUpdated()` no-op guard now only records a value as applied once the slot actually resolves, so a slot that resolves after an earlier unsuccessful attempt with the same value is no longer skipped forever.

  `SlotAttributePropagationController` is also now a public export of `@adobe/spectrum-wc-core` (`@spectrum-web-components/core/controllers/slot-attribute-propagation-controller.js`), alongside dedicated tests and a Storybook controller docs page. Existing consumers (`<swc-button-group>`, `<swc-illustrated-message>`) are unaffected aside from benefiting from the propagation-guard fix.

- [#6533](https://github.com/adobe/spectrum-web-components/pull/6533) [`5da5474`](https://github.com/adobe/spectrum-web-components/commit/5da54741eadcf61d60fd37d700ff457419a4d2ca) Thanks [@cdransf](https://github.com/cdransf)! - **fix(progress-circle):** Replaced the `animation: none` reduced-motion override on `<swc-progress-circle>`'s indeterminate state with a slowed, single-rotation animation driven by custom properties (`--swc-progress-circle-rotate-start`, `--swc-progress-circle-rotate-end`, `--swc-progress-circle-dashoffset-30`), so `prefers-reduced-motion: reduce` still conveys progress without the distracting spin.

## 2.0.0-beta.1

### Minor Changes

- [#6340](https://github.com/adobe/spectrum-web-components/pull/6340) [`57a77bc`](https://github.com/adobe/spectrum-web-components/commit/57a77bcee7eeb8f5a7b1084f3ad91543c2f92034) Thanks [@cdransf](https://github.com/cdransf)! - Added `<swc-action-button>` with full Spectrum 2 visual fidelity, migrated from the Spectrum 1 `<sp-action-button>`. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-action-button--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-action-button-migration-guide--docs).
  - **API**: `accessible-label` replaces `label`; `size` includes `xs` (not on `swc-button`); `quiet` and `static-color` retained as primary visual differentiators; `pending` / `pending-label` added (matching `swc-button`); `aria-haspopup` / `aria-expanded` forwarded to the inner `<button>` for menu-trigger patterns.
  - **Breaking changes**: `toggles`, `selected`, `emphasized`, and `aria-pressed` removed (toggle UX moves to `swc-toggle-button` / `swc-toggle-button-group`); `href` and the link API removed (use native `<a>`); `hold-affordance` / `longpress` deferred; `label` renamed to `accessible-label`.
  - **Accessibility**: semantics and focus land on the internal native `<button>` (`delegatesFocus: true`); host carries no `role="button"`; `aria-disabled="true"` on the inner `<button>` during pending state; dev-mode warning when icon-only usage is missing `accessible-label`.
  - **Styling**: exposes `--swc-action-button-*` custom properties (replaces `--mod-actionbutton-*` / `--spectrum-actionbutton-*`); full Spectrum 2 token coverage across all size × quiet × static-color combinations; Windows High Contrast support.
  - **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.

- [#6395](https://github.com/adobe/spectrum-web-components/pull/6395) [`b4740eb`](https://github.com/adobe/spectrum-web-components/commit/b4740eb58f8a9410dbfae2969ca7a21c07bc63bd) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - - [#6395](https://github.com/adobe/spectrum-web-components/pull/6395) [`acd555a`](https://github.com/adobe/spectrum-web-components/commit/acd555a975508f9249a1394ac808a62b2d7cbfe3) - `ButtonGroup` — Added `<swc-button-group>` with full Spectrum 2 visual fidelity. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/button-group--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/button-group-migration-guide--docs).

- [#6454](https://github.com/adobe/spectrum-web-components/pull/6454) [`591fa65`](https://github.com/adobe/spectrum-web-components/commit/591fa65574f7f8175373683e7495059b8ca27fa4) Thanks [@cdransf](https://github.com/cdransf)! - Added an `actions` slot to `<swc-illustrated-message>` for placing a `<swc-button>` or `<swc-button-group>` below the description. The component automatically propagates its `size` to every slotted element. Also adds `SlotAttributePropagationController`, an internal Lit `ReactiveController` that propagates any host attribute to slotted children; used by `IllustratedMessage` and `ButtonGroup`.

## 2.0.0-beta.0

### Minor Changes

- [#6395](https://github.com/adobe/spectrum-web-components/pull/6395) [`b4740eb`](https://github.com/adobe/spectrum-web-components/commit/b4740eb58f8a9410dbfae2969ca7a21c07bc63bd) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - `Button Group` — Added `<swc-button-group>` with full Spectrum 2 visual fidelity. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/button-group--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/button-group-migration-guide--docs).

- [#6358](https://github.com/adobe/spectrum-web-components/pull/6358) [`fe85234`](https://github.com/adobe/spectrum-web-components/commit/fe8523478348419aaeb7dc3f925ef00c4b8b40aa) Thanks [@5t3ph](https://github.com/5t3ph)! - Add `HoverController`, a Lit `ReactiveController` that manages hover and keyboard-focus event wiring for components that use the native Popover API, such as Tooltip.

- [#6370](https://github.com/adobe/spectrum-web-components/pull/6370) [`7c1d0c5`](https://github.com/adobe/spectrum-web-components/commit/7c1d0c574c918474196fa0f6007b9f905455f772) Thanks [@blunteshwar](https://github.com/blunteshwar)! - Add the 2nd-gen `<swc-meter>`, migrated from the Spectrum 1 `<sp-meter>`.
  - **API**: `value` (replaces `progress`) with `min-value` / `max-value` for arbitrary ranges; `variant` (`informative` default, `positive`, `notice`, `negative`) with unknown values normalized to `informative`; `label-position` (`top` / `side`, replaces the `side-label` boolean); `value-label` and `formatOptions` for locale-aware value text; `label` and `description` named slots; `accessible-label` for the no-visible-label case.
  - **Accessibility**: the WAI-ARIA `meter` role and all `aria-value*`, `aria-labelledby`, and `aria-describedby` attributes live on the internal bar element, not the host; non-focusable, read-only; honors `prefers-reduced-motion: reduce` (WCAG 2.3.3) on the shared linear-progress base by dropping the fill transition.
  - **Styling**: exposes the `--swc-linear-progress-*` custom-property surface (replaces `--mod-progressbar-*` / `--mod-meter-*`); adds `static-color="black"` alongside `white`.
  - **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.

- [#6337](https://github.com/adobe/spectrum-web-components/pull/6337) [`e334d4f`](https://github.com/adobe/spectrum-web-components/commit/e334d4f4d622325984912b9689aae05e5ac179ce) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - Add `PlacementController`, a Floating UI-backed reactive controller for positioning anchored floating elements relative to a trigger. This adds `@floating-ui/dom` as a runtime dependency of `@spectrum-web-components/core`.

- [#6387](https://github.com/adobe/spectrum-web-components/pull/6387) [`64a3d50`](https://github.com/adobe/spectrum-web-components/commit/64a3d50a6f4284cc32b8e13f2c8e05489012cef6) Thanks [@5t3ph](https://github.com/5t3ph)! - Add the 2nd-gen `<swc-tooltip>`, migrated from the Spectrum 1 `<sp-tooltip>`.
  - **API**: `for` attribute wires the tooltip to a trigger by ID; `trigger-element` property for programmatic or cross-shadow-root wiring; `manual` opts out of automatic wiring; `delay` (default 1500ms) for hover warm-up; `offset`, `cross-offset`, `container-padding`, and `should-flip` for viewport-aware positioning; `labeling` switches ARIA wiring to `ariaLabelledByElements` for icon-only triggers; `variant` accepts `neutral` (default), `informative`, and `negative`.
  - **Breaking changes from `<sp-tooltip>`**: `slot="icon"` removed; `variant="positive"` removed; `variant="info"` renamed to `variant="informative"`; `self-managed` attribute removed (automatic wiring is now the default; use `manual` to opt out); events renamed from `sp-opened`/`sp-closed` to `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close`; authoring pattern changed — `<swc-tooltip>` is authored as a sibling of the trigger, not nested inside it.
  - **Accessibility**: `role="tooltip"` set on the host; `Element.ariaDescribedByElements` wired on the trigger's inner interactive element on open; `Escape` closes without moving focus via native `popover="auto"`; WCAG 1.4.13 pointer bridge keeps the tooltip open when the pointer moves from the trigger into the bubble; high-contrast border in forced-colors mode.
  - **Controllers**: `HoverController` manages hover and keyboard-focus wiring with warm-up/cooldown timing; `PlacementController` handles viewport-aware pixel positioning via Floating UI with automatic flip on viewport collision.
  - **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.

## 0.1.0

### Minor Changes

- [#6067](https://github.com/adobe/spectrum-web-components/pull/6067) [`ba14a2b`](https://github.com/adobe/spectrum-web-components/commit/ba14a2b6361a0089a9a8c72232f245cde0716d89) - `Core` — Refactored size mixin exports and badge type naming for consistency. Replaced `ElementSizes` record with `ELEMENT_SIZES` const array and `DEFAULT_ELEMENT_SIZES`; `VALID_SIZES` typed as `readonly ElementSize[]`. Badge exports renamed: `BADGE_VARIANTS_S2` → `BADGE_VARIANTS`, `BadgeVariantS2` → `BadgeVariant`, `BadgeColorVariantS2` → `BadgeColorVariant`.

- [#6122](https://github.com/adobe/spectrum-web-components/pull/6122) [`7b153b5`](https://github.com/adobe/spectrum-web-components/commit/7b153b5433a8f6d47850f8939b058f7bc431c48c) - `Badge` — Migrated to 2nd-gen with `subtle`/`outline` styles, additional color variants, and updated defaults. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-badge--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-badge-migration-guide--docs).
  `Divider` — Migrated to 2nd-gen. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-divider--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-divider-migration-guide--docs).
  `Progress Circle` — Migrated to 2nd-gen; removed `indeterminate` attribute. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle-migration-guide--docs).
  `Status Light` — Migrated to 2nd-gen; removed `disabled` attribute and `accent` variant. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-status-light--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-status-light-migration-guide--docs).

- [#6183](https://github.com/adobe/spectrum-web-components/pull/6183) [`8aa488e`](https://github.com/adobe/spectrum-web-components/commit/8aa488e3867725b1ed93b2b5c31cba686f116688) - `Tabs` — Added 2nd-gen tabs (`swc-tabs`, `swc-tab`, `swc-tab-panel`) with Spectrum 2 styling, selection indicator, and keyboard navigation. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-tabs--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-tabs-migration-guide--docs).

### Patch Changes

- [#5936](https://github.com/adobe/spectrum-web-components/pull/5936) [`f37dec6`](https://github.com/adobe/spectrum-web-components/commit/f37dec6ae39fd89a4c12e084b4a0f4d9092d79b0) - `Core` — Overhauled text direction management. Replaced active `dir` attribute management with passive CSS `:dir()` pseudo-class and `getComputedStyle(this).direction`; removed `MutationObserver`-based direction tracking and converted physical CSS properties to logical equivalents.

## 0.0.4

### Patch Changes

- [#5998](https://github.com/adobe/spectrum-web-components/pull/5998) [`6f5419a`](https://github.com/adobe/spectrum-web-components/commit/6f5419a4de29a1ee440a36c1a57d8c2e1476e2f6) - `Core` — Fixed missing export for `alert-banner` which could cause build failures in certain environments.

## 0.0.3

### Patch Changes

- [#5993](https://github.com/adobe/spectrum-web-components/pull/5993) [`95e1c25`](https://github.com/adobe/spectrum-web-components/commit/95e1c25672f62f3723dfa66129ae5ecdeabe578a) - `Core` — Replaced wildcard exports with explicit named exports for better bundler compatibility. Changed build target from ES2022 to ES2018. Added `@spectrum-web-components/core` as direct dependency to `@spectrum-web-components/shared`. Added `@lit-labs/observers` as dependency.

## 0.0.2

### Patch Changes

- [#5900](https://github.com/adobe/spectrum-web-components/pull/5900) [`283f0fe`](https://github.com/adobe/spectrum-web-components/commit/283f0fe07533c464e9fe1a3e7edebecb9128e11f) - `Core` — Added missing dependencies to package.json files of several components.

- [#5893](https://github.com/adobe/spectrum-web-components/pull/5893) [`1d76b70`](https://github.com/adobe/spectrum-web-components/commit/1d76b7093d8ff5f9b26f07a69086488341a02650) - `Overlay` — Fixed hover overlays to close with the Esc key when trigger is not focused.

- [#5866](https://github.com/adobe/spectrum-web-components/pull/5866) [`9cb816b`](https://github.com/adobe/spectrum-web-components/commit/9cb816b5ac80387fdc9bb87381f5149fecb1b595) - `Core` — Added `typesVersions` to improve TypeScript module resolution for users with `moduleResolution: "node"`.
