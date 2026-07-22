# @adobe/spectrum-wc

## 2.0.0-beta.1

Available on npm under the `beta` tag for development and testing. Breaking changes are expected as the package matures toward a stable release.

### Minor Changes

- [#6340](https://github.com/adobe/spectrum-web-components/pull/6340) [`57a77bc`](https://github.com/adobe/spectrum-web-components/commit/57a77bcee7eeb8f5a7b1084f3ad91543c2f92034) - Added `<swc-action-button>` with full Spectrum 2 visual fidelity, migrated from the Spectrum 1 `<sp-action-button>`. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-action-button--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-action-button-migration-guide--docs).
  - **API**: `accessible-label` replaces `label`; `size` includes `xs` (not on `swc-button`); `quiet` and `static-color` retained as primary visual differentiators; `pending` / `pending-label` added (matching `swc-button`); `aria-haspopup` / `aria-expanded` forwarded to the inner `<button>` for menu-trigger patterns.
  - **Breaking changes**: `toggles`, `selected`, `emphasized`, and `aria-pressed` removed (toggle UX moves to `swc-toggle-button` / `swc-toggle-button-group`); `href` and the link API removed (use native `<a>`); `hold-affordance` / `longpress` deferred; `label` renamed to `accessible-label`.
  - **Accessibility**: semantics and focus land on the internal native `<button>` (`delegatesFocus: true`); host carries no `role="button"`; `aria-disabled="true"` on the inner `<button>` during pending state; dev-mode warning when icon-only usage is missing `accessible-label`.
  - **Styling**: exposes `--swc-action-button-*` custom properties (replaces `--mod-actionbutton-*` / `--spectrum-actionbutton-*`); full Spectrum 2 token coverage across all size × quiet × static-color combinations; Windows High Contrast support.
  - **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.

- [#6454](https://github.com/adobe/spectrum-web-components/pull/6454) [`591fa65`](https://github.com/adobe/spectrum-web-components/commit/591fa65574f7f8175373683e7495059b8ca27fa4) - Added an `actions` slot to `<swc-illustrated-message>` for placing a `<swc-button>` or `<swc-button-group>` below the description. The component automatically propagates its `size` to every slotted element. Also adds `SlotAttributePropagationController`, an internal Lit `ReactiveController` that propagates any host attribute to slotted children; used by `IllustratedMessage` and `ButtonGroup`.

### Patch Changes

- Updated dependencies [[`57a77bc`](https://github.com/adobe/spectrum-web-components/commit/57a77bcee7eeb8f5a7b1084f3ad91543c2f92034), [`591fa65`](https://github.com/adobe/spectrum-web-components/commit/591fa65574f7f8175373683e7495059b8ca27fa4)]:
  - @spectrum-web-components/core@2.0.0-beta.1

## 2.0.0-beta.0

Available on npm under the `beta` tag for development and testing. Breaking changes are expected as the package matures toward a stable release.

### Minor Changes

- [#6268](https://github.com/adobe/spectrum-web-components/pull/6268) [`abe7cbd`](https://github.com/adobe/spectrum-web-components/commit/abe7cbdf7af837633e223ba033e08560111c95ce) - **feat(accordion):** Add 2nd-gen `<swc-accordion>` and `<swc-accordion-item>` with Spectrum 2-oriented behavior. Key changes from 1st-gen `<sp-accordion>` / `<sp-accordion-item>`:
  - Core `AccordionBase` / `AccordionItemBase` with public API: `allow-multiple`, `level`, `size`, `density`, `quiet`, host `disabled`, item `open` / `disabled`, slotted heading (`slot="label"`), optional `slot="actions"`, and cancellable `swc-accordion-item-toggle`
  - APG-aligned accessibility: `<h*>` wrapping a native header `<button>`, `aria-expanded` / `aria-controls`, `role="region"` + `aria-labelledby`, closed panels use `aria-hidden="true"` plus CSS collapse (not HTML `hidden`; supports `calc-size()` height animation), disabled items use `aria-disabled` on the header and `inert` on the panel (no roving `tabindex` or arrow-key header navigation)
  - Space on the header calls `preventDefault()` and toggles without scrolling overflow containers
  - Controlled `open` is frozen while the host or item is disabled (imperative assignment cannot expand or collapse)

  **chore(accordion):** Add Spectrum 2 deprecation warnings in dev mode on 1st-gen accordion for `label`, item `level`, and host `focus()`, with matching tests.

- [#6395](https://github.com/adobe/spectrum-web-components/pull/6395) [`b4740eb`](https://github.com/adobe/spectrum-web-components/commit/b4740eb58f8a9410dbfae2969ca7a21c07bc63bd) - `Button Group` — Added `<swc-button-group>` with full Spectrum 2 visual fidelity. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-button-group--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-button-group-migration-guide--docs).

- [#6382](https://github.com/adobe/spectrum-web-components/pull/6382) [`a314298`](https://github.com/adobe/spectrum-web-components/commit/a3142985a20668ddbc8e9f0fe41c92739f8c4114) - `Link` — Added 2nd-gen link styles for native `<a href>` elements (no `swc-link` custom element). Default prose and link-list appearance ships with Typography; explicit modifiers live in `link.css`, with optional `global-link.css` for application-wide bare-anchor baseline. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-link--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-link-migration-guide--docs). Consumer action: replace `<sp-link>` with native `<a href>` and the classes or Typography wrappers documented in the migration guide.

- [#6370](https://github.com/adobe/spectrum-web-components/pull/6370) [`7c1d0c5`](https://github.com/adobe/spectrum-web-components/commit/7c1d0c574c918474196fa0f6007b9f905455f772) - Add the 2nd-gen `<swc-meter>`, migrated from the Spectrum 1 `<sp-meter>`.
  - **API**: `value` (replaces `progress`) with `min-value` / `max-value` for arbitrary ranges; `variant` (`informative` default, `positive`, `notice`, `negative`) with unknown values normalized to `informative`; `label-position` (`top` / `side`, replaces the `side-label` boolean); `value-label` and `formatOptions` for locale-aware value text; `label` and `description` named slots; `accessible-label` for the no-visible-label case.
  - **Accessibility**: the WAI-ARIA `meter` role and all `aria-value*`, `aria-labelledby`, and `aria-describedby` attributes live on the internal bar element, not the host; non-focusable, read-only; honors `prefers-reduced-motion: reduce` (WCAG 2.3.3) on the shared linear-progress base by dropping the fill transition.
  - **Styling**: exposes the `--swc-linear-progress-*` custom-property surface (replaces `--mod-progressbar-*` / `--mod-meter-*`); adds `static-color="black"` alongside `white`.
  - **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.

- [#6387](https://github.com/adobe/spectrum-web-components/pull/6387) [`64a3d50`](https://github.com/adobe/spectrum-web-components/commit/64a3d50a6f4284cc32b8e13f2c8e05489012cef6) - Add the 2nd-gen `<swc-tooltip>`, migrated from the Spectrum 1 `<sp-tooltip>`.
  - **API**: `for` attribute wires the tooltip to a trigger by ID; `trigger-element` property for programmatic or cross-shadow-root wiring; `manual` opts out of automatic wiring; `delay` (default 1500ms) for hover warm-up; `offset`, `cross-offset`, `container-padding`, and `should-flip` for viewport-aware positioning; `labeling` switches ARIA wiring to `ariaLabelledByElements` for icon-only triggers; `variant` accepts `neutral` (default), `informative`, and `negative`.
  - **Breaking changes from `<sp-tooltip>`**: `slot="icon"` removed; `variant="positive"` removed; `variant="info"` renamed to `variant="informative"`; `self-managed` attribute removed (automatic wiring is now the default; use `manual` to opt out); events renamed from `sp-opened`/`sp-closed` to `swc-open`/`swc-after-open`/`swc-close`/`swc-after-close`; authoring pattern changed — `<swc-tooltip>` is authored as a sibling of the trigger, not nested inside it.
  - **Accessibility**: `role="tooltip"` set on the host; `Element.ariaDescribedByElements` wired on the trigger's inner interactive element on open; `Escape` closes without moving focus via native `popover="auto"`; WCAG 1.4.13 pointer bridge keeps the tooltip open when the pointer moves from the trigger into the bubble; high-contrast border in forced-colors mode.
  - **Controllers**: `HoverController` manages hover and keyboard-focus wiring with warm-up/cooldown timing; `PlacementController` handles viewport-aware pixel positioning via Floating UI with automatic flip on viewport collision.
  - **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.

### Patch Changes

- Updated dependencies [[`b4740eb`](https://github.com/adobe/spectrum-web-components/commit/b4740eb58f8a9410dbfae2969ca7a21c07bc63bd), [`fe85234`](https://github.com/adobe/spectrum-web-components/commit/fe8523478348419aaeb7dc3f925ef00c4b8b40aa), [`7c1d0c5`](https://github.com/adobe/spectrum-web-components/commit/7c1d0c574c918474196fa0f6007b9f905455f772), [`e334d4f`](https://github.com/adobe/spectrum-web-components/commit/e334d4f4d622325984912b9689aae05e5ac179ce), [`64a3d50`](https://github.com/adobe/spectrum-web-components/commit/64a3d50a6f4284cc32b8e13f2c8e05489012cef6)]:
  - @spectrum-web-components/core@2.0.0-beta.0

## 0.2.0

### Minor Changes

- [#6184](https://github.com/adobe/spectrum-web-components/pull/6184) [`68261b1`](https://github.com/adobe/spectrum-web-components/commit/68261b1cf230f385be59f7e4fa1b09fd361b27c6) - `Color Loupe` — Added `<swc-color-loupe>` with Spectrum 2 visual fidelity. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-color-loupe--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-color-loupe-migration-guide--docs).

- [#6224](https://github.com/adobe/spectrum-web-components/pull/6224) [`3ec4028`](https://github.com/adobe/spectrum-web-components/commit/3ec4028bb417b1e0d13f82bdac7d8a34720d8d68) - `Suggestion Group` — Changed heading API to use `slot="heading"` instead of the `heading` string property. Consumer action: replace `heading="…"` with a slotted element like `<h3 slot="heading">…</h3>`.

### Patch Changes

- [#6315](https://github.com/adobe/spectrum-web-components/pull/6315) [`6ac4d14`](https://github.com/adobe/spectrum-web-components/commit/6ac4d1454613edf4134586e4eb67627455081711) - `Conversation Thread` — Simplified focus handling; removed `active-index` attribute and related public surface.

## 0.1.0

### Minor Changes

- [#6254](https://github.com/adobe/spectrum-web-components/pull/6254) [`38a463f`](https://github.com/adobe/spectrum-web-components/commit/38a463f7f4745373d143cdb08c7d87ba932cf1dd) - `Button` — Added `<swc-button>` with full Spectrum 2 visual fidelity. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-button--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-button-migration-guide--docs).

- [#6170](https://github.com/adobe/spectrum-web-components/pull/6170) [`668f357`](https://github.com/adobe/spectrum-web-components/commit/668f3573b881b6362fe5ccc60fc1080017c85cd7) - `Conversational AI` — Added composable AI chat pattern with message, action bar, and scroll components. See the [pattern docs](https://spectrum-web-components.adobe.com/?path=/docs/patterns-conversational-ai-pattern-overview--docs).

- [#6122](https://github.com/adobe/spectrum-web-components/pull/6122) [`7b153b5`](https://github.com/adobe/spectrum-web-components/commit/7b153b5433a8f6d47850f8939b058f7bc431c48c) - `Badge` — Migrated to 2nd-gen with `subtle`/`outline` styles, additional color variants, and updated defaults (`variant="neutral"`, reflected `size="s"`). See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-badge--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-badge-migration-guide--docs).
  `Divider` — Migrated to 2nd-gen; reflects `size="m"` when omitted. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-divider--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-divider-migration-guide--docs).
  `Progress Circle` — Migrated to 2nd-gen; removed `indeterminate` attribute (omit `progress` instead), removed light DOM label rendering. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle-migration-guide--docs).
  `Status Light` — Migrated to 2nd-gen; removed `disabled` attribute and `accent` variant, defaults to `variant="neutral"`. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-status-light--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-status-light-migration-guide--docs).

- [#6183](https://github.com/adobe/spectrum-web-components/pull/6183) [`8aa488e`](https://github.com/adobe/spectrum-web-components/commit/8aa488e3867725b1ed93b2b5c31cba686f116688) - `Tabs` — Added `<swc-tabs>`, `<swc-tab>`, and `<swc-tab-panel>` with Spectrum 2 styling, selection indicator, and keyboard navigation. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-tabs--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-tabs-migration-guide--docs).

### Patch Changes

- Updated dependencies [[`ba14a2b`](https://github.com/adobe/spectrum-web-components/commit/ba14a2b6361a0089a9a8c72232f245cde0716d89), [`f37dec6`](https://github.com/adobe/spectrum-web-components/commit/f37dec6ae39fd89a4c12e084b4a0f4d9092d79b0), [`7b153b5`](https://github.com/adobe/spectrum-web-components/commit/7b153b5433a8f6d47850f8939b058f7bc431c48c), [`8aa488e`](https://github.com/adobe/spectrum-web-components/commit/8aa488e3867725b1ed93b2b5c31cba686f116688)]:
  - @spectrum-web-components/core@0.1.0

## 0.0.4

First public beta of `@adobe/spectrum-wc`.

### Minor Changes

- [#6254](https://github.com/adobe/spectrum-web-components/pull/6254) - `Button` — Added `<swc-button>` with full Spectrum 2 visual fidelity. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-button--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-button-migration-guide--docs).
- [#6113](https://github.com/adobe/spectrum-web-components/pull/6113) - `Avatar` — Added `<swc-avatar>` with Spectrum 2 tokens and updated size API. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-avatar--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-avatar-migration-guide--docs).
- [#5718](https://github.com/adobe/spectrum-web-components/pull/5718) - `Badge` — Added `<swc-badge>` with Spectrum 2 tokens and icon support. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-badge--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-badge-migration-guide--docs).
- [#5798](https://github.com/adobe/spectrum-web-components/pull/5798) - `Divider` — Added `<swc-divider>` with Spectrum 2 tokens and static color support. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-divider--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-divider-migration-guide--docs).
- [#6207](https://github.com/adobe/spectrum-web-components/pull/6207) - `Illustrated Message` — Added `<swc-illustrated-message>` with slot-based heading API and size/orientation attributes. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-illustrated-message--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-illustrated-message-migration-guide--docs).
- [#5743](https://github.com/adobe/spectrum-web-components/pull/5743) - `Progress Circle` — Added `<swc-progress-circle>` with ARIA attributes and Spectrum 2 tokens. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle-migration-guide--docs).
- [#5800](https://github.com/adobe/spectrum-web-components/pull/5800) - `Status Light` — Added `<swc-status-light>` with Spectrum 2 tokens and extended color variants. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-status-light--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-status-light-migration-guide--docs).
- [#6183](https://github.com/adobe/spectrum-web-components/pull/6183) - `Tabs` — Added `<swc-tabs>`, `<swc-tab>`, and `<swc-tab-panel>` with keyboard navigation and overflow handling. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-tabs--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-tabs-migration-guide--docs).
- [#6031](https://github.com/adobe/spectrum-web-components/pull/6031) - `Typography` — Added typography utility classes for Spectrum 2 type scales. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-typography--docs).
- [#6170](https://github.com/adobe/spectrum-web-components/pull/6170) - `Conversational AI` — Added composable AI chat pattern with message, action bar, and scroll components. See the [pattern docs](https://spectrum-web-components.adobe.com/?path=/docs/patterns-conversational-ai-pattern-overview--docs).
