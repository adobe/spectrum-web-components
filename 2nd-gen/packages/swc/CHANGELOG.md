# @adobe/spectrum-wc

## 2.0.0-beta.2

### Minor Changes

- [#6410](https://github.com/adobe/spectrum-web-components/pull/6410) [`b0c6e37`](https://github.com/adobe/spectrum-web-components/commit/b0c6e375760ccc1ec6c1773ed1aa4015aa3b0f03) - Add the 2nd-gen `<swc-close-button>`, migrated from the Spectrum 1 `<sp-close-button>`.
  - **API**: `size`, `disabled`, `accessible-label`, and `static-color`; omits the legacy `variant` surface in favor of `static-color`.
  - **Accessibility**: renders a real inner `<button type="button">` with delegated focus; requires `accessible-label` for its icon-only name; the cross icon remains decorative.
  - **Styling**: ships Spectrum 2 sizing and static-color treatments plus the `--swc-close-button-*` custom-property surface for token-aligned overrides.
  - **Docs and tests**: includes Storybook docs, consumer migration guidance, unit coverage, and Playwright accessibility and keyboard tests.

- [#6480](https://github.com/adobe/spectrum-web-components/pull/6480) [`f27f690`](https://github.com/adobe/spectrum-web-components/commit/f27f6906f142f824dcc28f588e205271a36ec04a) - **feat(color-handle):** Added `<swc-color-handle>`, the Spectrum 2 migration of `sp-color-handle`.

  A non-interactive color-picker primitive exposing `color`, `disabled`, `focused`, `open`, and the new `fill` property, with a built-in `<swc-color-loupe>` and an adaptive white-first dual border that meets WCAG 1.4.11 non-text contrast across the color spectrum. The `--mod-colorhandle-*` custom properties are removed; see the migration guide.

- [#6486](https://github.com/adobe/spectrum-web-components/pull/6486) [`bf02e76`](https://github.com/adobe/spectrum-web-components/commit/bf02e76631132eceab732095587cf3f761fe2e87) - **feat(live-selection-controller):** Added `LiveSelectionController`, a Lit reactive controller that enforces a selection constraint (single or multiple) on a group of items that each own their own selected state.

  Use it for patterns like accordions and disclosure groups where items manage their own `open` or `selected` property and can change that state on their own initiative. Unlike a cache-authoritative controller, it reads item state live from the DOM on each observed event rather than maintaining an internal list, so it stays correct even when items change themselves outside a controller-driven transition.

  The accordion (`swc-accordion`) now uses `LiveSelectionController` internally to enforce its exclusive-open constraint; its public API and behavior are unchanged.

- [#6476](https://github.com/adobe/spectrum-web-components/pull/6476) [`e2a7e4e`](https://github.com/adobe/spectrum-web-components/commit/e2a7e4ef200a88e991ac6f2fcf0098c65df91969) - **fix(tabs):** Changed the default `keyboard-activation` on `<swc-tabs>` from `manual` to `automatic`, aligning with React Spectrum/React Aria `Tabs`.

  `swc-tab-panel` content is always present in the light DOM (not lazily mounted), which is the condition the WAI-ARIA APG recommends for automatic activation. Consumers relying on the previous implicit `manual` default (inherited from 1st-gen `sp-tabs`' `auto = false`) should add `keyboard-activation="manual"` explicitly, particularly if their own panel content is expensive to render or lazy-loaded.

- [#6501](https://github.com/adobe/spectrum-web-components/pull/6501) [`9592f85`](https://github.com/adobe/spectrum-web-components/commit/9592f85192179d3f5c6f42e543ff9aa80f4988ac) - `Spectrum WC` — Added a published Custom Elements Manifest for editor, documentation, and integration tooling.

- [#6488](https://github.com/adobe/spectrum-web-components/pull/6488) [`6eccec9`](https://github.com/adobe/spectrum-web-components/commit/6eccec93116b74d9720bbc11ae7d811b868fddb7) - **feat(progress-bar):** Added `<swc-progress-bar>`, the Spectrum 2 migration of Progress Bar.

  Renames from `<sp-progress-bar>`: `progress` becomes `value`, `side-label` becomes `label-position="side"`, the `label` string attribute becomes a `label` named slot, and `--mod-progressbar-*` custom properties become `--swc-linear-progress-*`. The default `size` is now `'m'`.

  New in Spectrum 2: `min-value` / `max-value` for arbitrary numeric ranges, `static-color="black"`, `value-label`, a `formatOptions` property, `accessible-label`, and a `description` slot. `over-background` is removed in favor of `static-color="white"`, and `role="progressbar"` plus the `aria-value*` attributes now live on an internal element rather than the host. See the Progress Bar migration guide for full upgrade steps.

- [#6494](https://github.com/adobe/spectrum-web-components/pull/6494) [`9e7995a`](https://github.com/adobe/spectrum-web-components/commit/9e7995ad8189970d6788a7872007d611af247663) - **refactor(tabs):** Migrate `<swc-tabs>` keyboard navigation to `FocusgroupNavigationController`.

  Arrow-key, Home, and End navigation is now handled by the controller rather than by manually computed deltas in `handleKeyDown`. The `handleKeyDown` method retains only Enter/Space activation; all roving-tabindex management is delegated to the controller. In automatic activation mode, `focusgroupNavigationActiveChange` events with `source: 'keyboard'` drive selection-follows-focus; events with `source: 'refresh'` or `source: 'programmatic'` are intentionally ignored so that mounting or toggling `disabled` cannot trigger spurious `change` events.

### Patch Changes

- [#6518](https://github.com/adobe/spectrum-web-components/pull/6518) [`36052f3`](https://github.com/adobe/spectrum-web-components/commit/36052f305622ad8f46b44bf5d71e2b02ebd8229c) - Fix inaccurate API reference tables for several 2nd-gen components by documenting CSS custom properties and JSDoc property descriptions that were missing from the generated Custom Elements Manifest.
  - Added missing `@cssprop` entries: `swc-tabs`/`swc-tab` (5 props), `swc-action-button` and `swc-button` (down-state transform, button also gets `max-inline-size`), `swc-illustrated-message` (10 props covering illustration sizing/color and heading/description typography).
  - Added missing `size`/`variant` property descriptions for `swc-button`, `swc-action-button`, `swc-close-button`, `swc-status-light`, and `swc-badge`.
  - Fixed the Tabs docs page rendering only `swc-tabs`'s API table; `swc-tab` and `swc-tab-panel` (the other two elements of the three-element component) now get their own API tables too, matching the pattern already used by Accordion.

  No component runtime changes; documentation and Storybook docs-page rendering only.

- [#6513](https://github.com/adobe/spectrum-web-components/pull/6513) [`41e0483`](https://github.com/adobe/spectrum-web-components/commit/41e0483f59d3956ce973bbe50b2d54a1d8c73e9f) - **fix(color-loupe):** Added an adaptive white-first inner border to `<swc-color-loupe>` so its chrome meets WCAG 1.4.11 non-text contrast (≥3:1) across the color spectrum.

  The inner border's opacity now escalates above its default floor only when the white outer halo can't itself carry 3:1 contrast against the loupe's color. The outer border, shape, and sizing are unchanged, and there is no public API change. This supersedes the prior practical-limits exception, matching the adaptive dual-border approach already shipped for `<swc-color-handle>`.

- [#6519](https://github.com/adobe/spectrum-web-components/pull/6519) [`c28d00c`](https://github.com/adobe/spectrum-web-components/commit/c28d00c474bd0480390984891d35ad50a11608be) - Fix the broken `@import` in the published `global-link.css`. The build flattens all stylesheets into `dist/` root, but `global-link.css` shipped with `@import url("../link.css")` (relative to its source subfolder), which pointed one directory above `dist/` and failed to resolve for consumers of `@adobe/spectrum-wc/global-link.css`. Local `@import` targets are now rewritten to sibling references (`./link.css`) during the flatten.

- [#6457](https://github.com/adobe/spectrum-web-components/pull/6457) [`8c4acae`](https://github.com/adobe/spectrum-web-components/commit/8c4acae801b1d8c43d9e41c79b0afe8bb6eff8f4) - **fix(illustrated-message):** Fixed the `actions` slot content alignment in `<swc-illustrated-message>`.

  The `.swc-IllustratedMessage-content` flex container was missing `align-items: center`, causing slotted actions (e.g. a `<swc-button>` or `<swc-button-group>`) to stretch to the container width instead of centering horizontally.

- [#6506](https://github.com/adobe/spectrum-web-components/pull/6506) [`6049706`](https://github.com/adobe/spectrum-web-components/commit/6049706e5d08bb92cd6531cbf7661c282b3ab409) - **fix(popover):** Fixed `swc-popover` staying dismissed on the next unrelated outside click after a trigger press was dragged off and released elsewhere.

  A `pointerdown` on the trigger followed by a drag off the trigger and a release elsewhere never dispatches a `click`, so the internal reopen-guard flag was left stuck `true`, misattributing the next unrelated outside light-dismiss to that stale press and swallowing the following legitimate trigger click.

- [#6490](https://github.com/adobe/spectrum-web-components/pull/6490) [`1e053fe`](https://github.com/adobe/spectrum-web-components/commit/1e053fe761c20b1df70c842cb3f9dcee94e02d8d) - **fix(slot-attribute-propagation-controller):** Fixed `SlotAttributePropagationController` permanently skipping re-propagation when a repeated value was recorded before its target slot had resolved, and added support for propagating attributes that are only sometimes present on the host.

  `getValue` may now return `null` to remove the propagated attribute from assigned elements instead of setting it to an empty string. The `hostUpdated()` no-op guard now only records a value as applied once the slot actually resolves, so a slot that resolves after an earlier unsuccessful attempt with the same value is no longer skipped forever.

  `SlotAttributePropagationController` is also now a public export of `@adobe/spectrum-wc-core` (`@spectrum-web-components/core/controllers/slot-attribute-propagation-controller.js`), alongside dedicated tests and a Storybook controller docs page. Existing consumers (`<swc-button-group>`, `<swc-illustrated-message>`) are unaffected aside from benefiting from the propagation-guard fix.

- [#6439](https://github.com/adobe/spectrum-web-components/pull/6439) [`7f0c3e9`](https://github.com/adobe/spectrum-web-components/commit/7f0c3e937e697e3e1d5d3973ce4f709542f1bbef) - Extract the pending (busy) state into reusable, decoupled 2nd-gen core primitives so any pending-capable component can adopt it.
  - **`@adobe/spectrum-wc-core`**: adds `PendingController` (`/controllers/pending-controller`) for the pending state (delayed activation, inline-size freeze, derived busy accessible name), the render-only `renderPendingSpinner` directive (`/directives/pending-spinner`), and `PendingMixin` (`/mixins`) which wires the controller, the `pending` / `pending-label` properties, and click suppression. `ButtonBase` no longer owns pending state.
  - **`@adobe/spectrum-wc`**: `swc-button` and `swc-action-button` now consume these primitives via `PendingMixin`. No public API change — `pending` / `pending-label` and the busy behavior are unchanged.

- [#6533](https://github.com/adobe/spectrum-web-components/pull/6533) [`5da5474`](https://github.com/adobe/spectrum-web-components/commit/5da54741eadcf61d60fd37d700ff457419a4d2ca) - **fix(progress-circle):** Replaced the `animation: none` reduced-motion override on `<swc-progress-circle>`'s indeterminate state with a slowed, single-rotation animation driven by custom properties (`--swc-progress-circle-rotate-start`, `--swc-progress-circle-rotate-end`, `--swc-progress-circle-dashoffset-30`), so `prefers-reduced-motion: reduce` still conveys progress without the distracting spin.

- [#6462](https://github.com/adobe/spectrum-web-components/pull/6462) [`2865959`](https://github.com/adobe/spectrum-web-components/commit/286595965919b77dd2a17f4db5169171ca18a4db) - Refine the 2nd-gen response status pattern API, animation, and docs.
  - **Added**: Header label roll animation on text changes; update cadence remains consumer-managed.
  - **Added**: `<swc-response-status-step>` as a dedicated step element with its own styles and exports.
  - **Updated**: Conversational AI stories, docs, and regression/a11y coverage for the new API and behaviors.

- Updated dependencies [[`36052f3`](https://github.com/adobe/spectrum-web-components/commit/36052f305622ad8f46b44bf5d71e2b02ebd8229c), [`b0c6e37`](https://github.com/adobe/spectrum-web-components/commit/b0c6e375760ccc1ec6c1773ed1aa4015aa3b0f03), [`f27f690`](https://github.com/adobe/spectrum-web-components/commit/f27f6906f142f824dcc28f588e205271a36ec04a), [`41e0483`](https://github.com/adobe/spectrum-web-components/commit/41e0483f59d3956ce973bbe50b2d54a1d8c73e9f), [`9e7995a`](https://github.com/adobe/spectrum-web-components/commit/9e7995ad8189970d6788a7872007d611af247663), [`1e053fe`](https://github.com/adobe/spectrum-web-components/commit/1e053fe761c20b1df70c842cb3f9dcee94e02d8d), [`7f0c3e9`](https://github.com/adobe/spectrum-web-components/commit/7f0c3e937e697e3e1d5d3973ce4f709542f1bbef), [`5da5474`](https://github.com/adobe/spectrum-web-components/commit/5da54741eadcf61d60fd37d700ff457419a4d2ca), [`6049706`](https://github.com/adobe/spectrum-web-components/commit/6049706e5d08bb92cd6531cbf7661c282b3ab409)]:
  - @adobe/spectrum-wc-core@2.0.0-beta.2

## 2.0.0-beta.1

### Minor Changes

- [#6268](https://github.com/adobe/spectrum-web-components/pull/6268) [`abe7cbd`](https://github.com/adobe/spectrum-web-components/commit/abe7cbdf7af837633e223ba033e08560111c95ce) Thanks [@rise-erpelding](https://github.com/rise-erpelding)! - **feat(accordion):** Add 2nd-gen `<swc-accordion>` and `<swc-accordion-item>` with Spectrum 2-oriented behavior. Key changes from 1st-gen `<sp-accordion>` / `<sp-accordion-item>`:
  - Core `AccordionBase` / `AccordionItemBase` with public API: `allow-multiple`, `level`, `size`, `density`, `quiet`, host `disabled`, item `open` / `disabled`, slotted heading (`slot="label"`), optional `slot="actions"`, and cancellable `swc-accordion-item-toggle`
  - APG-aligned accessibility: `<h*>` wrapping a native header `<button>`, `aria-expanded` / `aria-controls`, `role="region"` + `aria-labelledby`, closed panels use `aria-hidden="true"` plus CSS collapse (not HTML `hidden`; supports `calc-size()` height animation), disabled items use `aria-disabled` on the header and `inert` on the panel (no roving `tabindex` or arrow-key header navigation)
  - Space on the header calls `preventDefault()` and toggles without scrolling overflow containers (SWC-1487)
  - Controlled `open` is frozen while the host or item is disabled (imperative assignment cannot expand or collapse)

  **chore(accordion):** Add Spectrum 2 deprecation warnings in dev mode on 1st-gen accordion for `label`, item `level`, and host `focus()`, with matching tests.

- [#6340](https://github.com/adobe/spectrum-web-components/pull/6340) [`57a77bc`](https://github.com/adobe/spectrum-web-components/commit/57a77bcee7eeb8f5a7b1084f3ad91543c2f92034) Thanks [@cdransf](https://github.com/cdransf)! - Added `<swc-action-button>` with full Spectrum 2 visual fidelity, migrated from the Spectrum 1 `<sp-action-button>`. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-action-button--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-action-button-migration-guide--docs).
  - **API**: `accessible-label` replaces `label`; `size` includes `xs` (not on `swc-button`); `quiet` and `static-color` retained as primary visual differentiators; `pending` / `pending-label` added (matching `swc-button`); `aria-haspopup` / `aria-expanded` forwarded to the inner `<button>` for menu-trigger patterns.
  - **Breaking changes**: `toggles`, `selected`, `emphasized`, and `aria-pressed` removed (toggle UX moves to `swc-toggle-button` / `swc-toggle-button-group`); `href` and the link API removed (use native `<a>`); `hold-affordance` / `longpress` deferred; `label` renamed to `accessible-label`.
  - **Accessibility**: semantics and focus land on the internal native `<button>` (`delegatesFocus: true`); host carries no `role="button"`; `aria-disabled="true"` on the inner `<button>` during pending state; dev-mode warning when icon-only usage is missing `accessible-label`.
  - **Styling**: exposes `--swc-action-button-*` custom properties (replaces `--mod-actionbutton-*` / `--spectrum-actionbutton-*`); full Spectrum 2 token coverage across all size × quiet × static-color combinations; Windows High Contrast support.
  - **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.

- [#6395](https://github.com/adobe/spectrum-web-components/pull/6395) [`b4740eb`](https://github.com/adobe/spectrum-web-components/commit/b4740eb58f8a9410dbfae2969ca7a21c07bc63bd) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - - [#6395](https://github.com/adobe/spectrum-web-components/pull/6395) [`acd555a`](https://github.com/adobe/spectrum-web-components/commit/acd555a975508f9249a1394ac808a62b2d7cbfe3) - `ButtonGroup` — Added `<swc-button-group>` with full Spectrum 2 visual fidelity. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/button-group--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/button-group-migration-guide--docs).

- [#6454](https://github.com/adobe/spectrum-web-components/pull/6454) [`591fa65`](https://github.com/adobe/spectrum-web-components/commit/591fa65574f7f8175373683e7495059b8ca27fa4) Thanks [@cdransf](https://github.com/cdransf)! - Added an `actions` slot to `<swc-illustrated-message>` for placing a `<swc-button>` or `<swc-button-group>` below the description. The component automatically propagates its `size` to every slotted element. Also adds `SlotAttributePropagationController`, an internal Lit `ReactiveController` that propagates any host attribute to slotted children; used by `IllustratedMessage` and `ButtonGroup`.

- [#6382](https://github.com/adobe/spectrum-web-components/pull/6382) [`a314298`](https://github.com/adobe/spectrum-web-components/commit/a3142985a20668ddbc8e9f0fe41c92739f8c4114) Thanks [@aramos-adobe](https://github.com/aramos-adobe)! - `Link` — Added 2nd-gen link styles for native `<a href>` elements (no `swc-link` custom element). Default prose and link-list appearance ships with Typography; explicit modifiers live in `link.css`, with optional `global-link.css` for application-wide bare-anchor baseline. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-link--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-link-migration-guide--docs). Consumer action: replace `<sp-link>` with native `<a href>` and the classes or Typography wrappers documented in the migration guide.

### Patch Changes

- Updated dependencies [[`57a77bc`](https://github.com/adobe/spectrum-web-components/commit/57a77bcee7eeb8f5a7b1084f3ad91543c2f92034), [`b4740eb`](https://github.com/adobe/spectrum-web-components/commit/b4740eb58f8a9410dbfae2969ca7a21c07bc63bd), [`591fa65`](https://github.com/adobe/spectrum-web-components/commit/591fa65574f7f8175373683e7495059b8ca27fa4)]:
  - @spectrum-web-components/core@2.0.0-beta.1

## 2.0.0-beta.0

### Major Changes

- [`@adobe/spectrum-wc@2.0.0-beta.0`](https://www.npmjs.com/package/@adobe/spectrum-wc/v/2.0.0-beta.0) is now available on npm under the `beta` tag. These releases are made available as release candidates for development and testing purposes — we encourage early adopters to try them out, but note that breaking changes are to be expected as the package matures toward a stable release.

### Minor Changes

- [#6268](https://github.com/adobe/spectrum-web-components/pull/6268) [`abe7cbd`](https://github.com/adobe/spectrum-web-components/commit/abe7cbdf7af837633e223ba033e08560111c95ce) Thanks [@rise-erpelding](https://github.com/rise-erpelding)! - **feat(accordion):** Add 2nd-gen `<swc-accordion>` and `<swc-accordion-item>` with Spectrum 2-oriented behavior. Key changes from 1st-gen `<sp-accordion>` / `<sp-accordion-item>`:
  - Core `AccordionBase` / `AccordionItemBase` with public API: `allow-multiple`, `level`, `size`, `density`, `quiet`, host `disabled`, item `open` / `disabled`, slotted heading (`slot="label"`), optional `slot="actions"`, and cancellable `swc-accordion-item-toggle`
  - APG-aligned accessibility: `<h*>` wrapping a native header `<button>`, `aria-expanded` / `aria-controls`, `role="region"` + `aria-labelledby`, closed panels use `aria-hidden="true"` plus CSS collapse (not HTML `hidden`; supports `calc-size()` height animation), disabled items use `aria-disabled` on the header and `inert` on the panel (no roving `tabindex` or arrow-key header navigation)
  - Space on the header calls `preventDefault()` and toggles without scrolling overflow containers
  - Controlled `open` is frozen while the host or item is disabled (imperative assignment cannot expand or collapse)

  **chore(accordion):** Add Spectrum 2 deprecation warnings in dev mode on 1st-gen accordion for `label`, item `level`, and host `focus()`, with matching tests.

- [#6395](https://github.com/adobe/spectrum-web-components/pull/6395) [`b4740eb`](https://github.com/adobe/spectrum-web-components/commit/b4740eb58f8a9410dbfae2969ca7a21c07bc63bd) - `Button Group` — Added `<swc-button-group>` with full Spectrum 2 visual fidelity. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-button-group--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-button-group-migration-guide--docs).

- [#6382](https://github.com/adobe/spectrum-web-components/pull/6382) [`a314298`](https://github.com/adobe/spectrum-web-components/commit/a3142985a20668ddbc8e9f0fe41c92739f8c4114) Thanks [@aramos-adobe](https://github.com/aramos-adobe)! - `Link` — Added 2nd-gen link styles for native `<a href>` elements (no `swc-link` custom element). Default prose and link-list appearance ships with Typography; explicit modifiers live in `link.css`, with optional `global-link.css` for application-wide bare-anchor baseline. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-link--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-link-migration-guide--docs). Consumer action: replace `<sp-link>` with native `<a href>` and the classes or Typography wrappers documented in the migration guide.

- [#6370](https://github.com/adobe/spectrum-web-components/pull/6370) [`7c1d0c5`](https://github.com/adobe/spectrum-web-components/commit/7c1d0c574c918474196fa0f6007b9f905455f772) Thanks [@blunteshwar](https://github.com/blunteshwar)! - Add the 2nd-gen `<swc-meter>`, migrated from the Spectrum 1 `<sp-meter>`.
  - **API**: `value` (replaces `progress`) with `min-value` / `max-value` for arbitrary ranges; `variant` (`informative` default, `positive`, `notice`, `negative`) with unknown values normalized to `informative`; `label-position` (`top` / `side`, replaces the `side-label` boolean); `value-label` and `formatOptions` for locale-aware value text; `label` and `description` named slots; `accessible-label` for the no-visible-label case.
  - **Accessibility**: the WAI-ARIA `meter` role and all `aria-value*`, `aria-labelledby`, and `aria-describedby` attributes live on the internal bar element, not the host; non-focusable, read-only; honors `prefers-reduced-motion: reduce` (WCAG 2.3.3) on the shared linear-progress base by dropping the fill transition.
  - **Styling**: exposes the `--swc-linear-progress-*` custom-property surface (replaces `--mod-progressbar-*` / `--mod-meter-*`); adds `static-color="black"` alongside `white`.
  - **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.

- [#6387](https://github.com/adobe/spectrum-web-components/pull/6387) [`64a3d50`](https://github.com/adobe/spectrum-web-components/commit/64a3d50a6f4284cc32b8e13f2c8e05489012cef6) Thanks [@5t3ph](https://github.com/5t3ph)! - Add the 2nd-gen `<swc-tooltip>`, migrated from the Spectrum 1 `<sp-tooltip>`.
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
