# @spectrum-web-components/core

## 2.0.0-beta.0

### Major Changes

- Gen2 2.0.0 milestone. Establishes the 2.0.0 major line for the 2nd-gen component set; beta releases are cut as `2.0.0-beta.N` via Changesets pre-release mode.

### Minor Changes

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
