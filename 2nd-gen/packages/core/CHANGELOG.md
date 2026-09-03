# @spectrum-web-components/core

## 2.0.0-beta.3

### Minor Changes

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - Add the 2nd-gen `<swc-close-button>`, migrated from the Spectrum 1 `<sp-close-button>`.
  - **API**: `size`, `disabled`, `accessible-label`, and `static-color`; omits the legacy `variant` surface in favor of `static-color`.
  - **Accessibility**: renders a real inner `<button type="button">` with delegated focus; requires `accessible-label` for its icon-only name; the cross icon remains decorative.
  - **Styling**: ships Spectrum 2 sizing and static-color treatments plus the `--swc-close-button-*` custom-property surface for token-aligned overrides.
  - **Docs and tests**: includes Storybook docs, consumer migration guidance, unit coverage, and Playwright accessibility and keyboard tests.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **feat(color-handle):** Added `<swc-color-handle>`, the Spectrum 2 migration of `sp-color-handle`.

  A non-interactive color-picker primitive exposing `color`, `disabled`, `focused`, `open`, and the new `fill` property, with a built-in `<swc-color-loupe>` and an adaptive white-first dual border that meets WCAG 1.4.11 non-text contrast across the color spectrum. The `--mod-colorhandle-*` custom properties are removed; see the migration guide.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - Extract the pending (busy) state into reusable, decoupled 2nd-gen core primitives so any pending-capable component can adopt it.
  - **`@adobe/spectrum-wc-core`**: adds `PendingController` (`/controllers/pending-controller`) for the pending state (delayed activation, inline-size freeze, derived busy accessible name), the render-only `renderPendingSpinner` directive (`/directives/pending-spinner`), and `PendingMixin` (`/mixins`) which wires the controller, the `pending` / `pending-label` properties, and click suppression. `ButtonBase` no longer owns pending state.
  - **`@adobe/spectrum-wc`**: `swc-button` and `swc-action-button` now consume these primitives via `PendingMixin`. No public API change — `pending` / `pending-label` and the busy behavior are unchanged.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **refactor(tabs):** Migrate `<swc-tabs>` keyboard navigation to `FocusgroupNavigationController`.

  Arrow-key, Home, and End navigation is now handled by the controller rather than by manually computed deltas in `handleKeyDown`. The `handleKeyDown` method retains only Enter/Space activation; all roving-tabindex management is delegated to the controller. In automatic activation mode, `focusgroupNavigationActiveChange` events with `source: 'keyboard'` drive selection-follows-focus; events with `source: 'refresh'` or `source: 'programmatic'` are intentionally ignored so that mounting or toggling `disabled` cannot trigger spurious `change` events.

### Patch Changes

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **fix(color-loupe):** Added an adaptive white-first inner border to `<swc-color-loupe>` so its chrome meets WCAG 1.4.11 non-text contrast (≥3:1) across the color spectrum.

  The inner border's opacity now escalates above its default floor only when the white outer halo can't itself carry 3:1 contrast against the loupe's color. The outer border, shape, and sizing are unchanged, and there is no public API change. This supersedes the prior practical-limits exception, matching the adaptive dual-border approach already shipped for `<swc-color-handle>`.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **fix(popover):** Fixed `swc-popover` staying dismissed on the next unrelated outside click after a trigger press was dragged off and released elsewhere.

  A `pointerdown` on the trigger followed by a drag off the trigger and a release elsewhere never dispatches a `click`, so the internal reopen-guard flag was left stuck `true`, misattributing the next unrelated outside light-dismiss to that stale press and swallowing the following legitimate trigger click.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **fix(slot-attribute-propagation-controller):** Fixed `SlotAttributePropagationController` permanently skipping re-propagation when a repeated value was recorded before its target slot had resolved, and added support for propagating attributes that are only sometimes present on the host.

  `getValue` may now return `null` to remove the propagated attribute from assigned elements instead of setting it to an empty string. The `hostUpdated()` no-op guard now only records a value as applied once the slot actually resolves, so a slot that resolves after an earlier unsuccessful attempt with the same value is no longer skipped forever.

  `SlotAttributePropagationController` is also now a public export of `@adobe/spectrum-wc-core` (`@spectrum-web-components/core/controllers/slot-attribute-propagation-controller.js`), alongside dedicated tests and a Storybook controller docs page. Existing consumers (`<swc-button-group>`, `<swc-illustrated-message>`) are unaffected aside from benefiting from the propagation-guard fix.

## 2.0.0-beta.3

### Minor Changes

- [#6444](https://github.com/adobe/spectrum-web-components/pull/6444) [`2b26e0b`](https://github.com/adobe/spectrum-web-components/commit/2b26e0b3b6e25d4852e9984472737bd3caa2dfae) Add the 2nd-gen `<swc-action-group>` file structure, API, accessibility semantics, and Spectrum 2 styling, migrated from the Spectrum 1 `<sp-action-group>`.
  - **API**: `accessible-label`, `disabled`, `orientation` (`horizontal` / `vertical`), `compact`, `quiet`, `justified`, `size`, `static-color`; children are collected via the default slot (`swc-action-button` / `swc-action-menu`).
  - **Accessibility**: host always `role="group"` (never `toolbar` or `radiogroup`); `accessible-label` reflects to `aria-label`; no `aria-orientation` on the host in either layout, matching `swc-button-group`; group `disabled` sets `aria-disabled="true"` on the host and propagates `aria-disabled` (not native `disabled`) to all children so they remain keyboard-reachable and discoverable per [APG: Focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols); `FocusgroupNavigationController` wired with `skipDisabled: false` so `aria-disabled` children stay in the arrow-key sequence. A focused child's focus ring is no longer hidden behind an adjacent child's border in `compact` mode.
  - **Styling**: full Spectrum 2 token-based CSS — sizes `xs`–`xl`, `orientation`, `justified` (equal-width children), and `compact` (shared-border join with correct corner rounding at the strip's outer edges only, in both orientations); `compact` has no visual effect when `quiet` is also set. Exposes `--swc-action-group-gap` for overriding the spacing between children. `vertical` orientation groups shrink-to-fit the longest child's label by default and stretch to fill an ancestor-imposed width when present (for example, multiple `swc-action-group` elements sharing a toolbar wrapper), so all children and sibling groups end up the same width without an explicit `inline-size`.
  - **`ButtonBase` (core)**: click activation is now suppressed for any button whose host carries `aria-disabled="true"`, matching the existing suppression for `disabled` and `pending`. This is shared behavior for every `ButtonBase` subclass, not just `swc-action-button`.
  - **`swc-action-button`**: added disabled-appearance CSS for the externally-set `aria-disabled` case (e.g. when disabled via a parent `swc-action-group`), including forced-colors system-color overrides. Exposes four logical corner-radius custom properties (`--swc-action-button-border-start-start-radius`, `-start-end-radius`, `-end-start-radius`, `-end-end-radius`), each falling back to the existing `--swc-action-button-border-radius`, so a parent `swc-action-group` can override individual corners in `compact` mode without affecting standalone usage. The button's `inline-size: 100%` (needed so it fills a stretched vertical `swc-action-group` parent) is excluded from the generated global stylesheet, so consumers using global action-button classes outside a component context are not forced full-width.
  - **1st-gen `sp-action-group`**: added `@deprecated` JSDoc to `vertical`, `selects`, `selected`, and `emphasized`, plus a runtime `window.__swc.warn()` deprecation notice on the `selected` setter, ahead of removal in 2nd-gen.

- [#6644](https://github.com/adobe/spectrum-web-components/pull/6644) [`346746c`](https://github.com/adobe/spectrum-web-components/commit/346746cacd405fa1cd58b7fae3f164457968dec7) **feat(prompt-field):** Accept file drops anywhere over `swc-prompt-field` with a high-intensity solid-fill drop target and blue focus ring. The new `DragAndDropController` is exported for reuse by other components.

- [#6555](https://github.com/adobe/spectrum-web-components/pull/6555) [`3110850`](https://github.com/adobe/spectrum-web-components/commit/31108509505dcaf485e4d2582074ea5fa8189922) Add the 2nd-gen `<swc-card>`, the Spectrum 2 successor to `<sp-card>`.
  - **API**: `variant` (`primary`/`secondary`/`tertiary`/`quiet`), `size` (`xs`–`xl`), `density`, and the `title-as-link` and `selectable` attributes. Content is slot-only (`preview`, `collection`, `media`, `title`, `actions`, `description`, default, `footer`); regular, collection, and gallery layouts are driven by slot presence. `selectable` dispatches `swc-card-click`.
  - **Accessibility**: whole-card linking uses a consumer `<a>` in the `title` slot (Card takes no `href`); `selectable` makes the card focusable without setting an ARIA role; nested controls keep their own activation.
  - **Styling**: shared CSS Grid layout with the `--swc-card-*` custom-property surface.
  - **Core**: `CardBase` and the shared `renderCardTemplate` gain the card behavior and the `collection`/`media`/glyph rendering hooks.

  `<swc-user-card>` and `<swc-product-card>` are not part of this release.

- [#6508](https://github.com/adobe/spectrum-web-components/pull/6508) [`d429a49`](https://github.com/adobe/spectrum-web-components/commit/d429a4991a51339b5325f726bd39d0d3c4ef447e) **feat(dev-validation):** Added reusable dev-mode validation helpers (`validateEnum`, `warnIf`, `validateRequiredSlot`, `validateAllowedChildren`) in `@adobe/spectrum-wc-core/utils`, and fixed `window.__swc.warn`'s dedup key so two distinct warnings on the same component no longer suppress each other.

  Component authors should use these helpers instead of hand-rolled `includes()` + `window.__swc.warn()` checks for union/enum values, required and conditionally required properties, mutually exclusive/no-effect combinations, required slots, and allowed slotted children. See the "Reusable validation helpers" and "Slot validation" sections of the [Debug and validation style guide](https://github.com/adobe/spectrum-web-components/blob/main/CONTRIBUTOR-DOCS/02_style-guide/02_typescript/17_debug-validation.md).

- [#6437](https://github.com/adobe/spectrum-web-components/pull/6437) [`afe0beb`](https://github.com/adobe/spectrum-web-components/commit/afe0beb9e487d3f2838bb1ec7e98f131f53606af) Add the 2nd-gen `<swc-dropzone>`, migrated from the Spectrum 1 `<sp-dropzone>`.
  - **API**: `dropEffect`, `dragged`, `filled`, `size` (new), and localizable `dragged-message`/`filled-message`/`replace-message` status text. Renames `isDragged`/`isFilled` to `dragged`/`filled` and events to the `swc-dropzone-*` prefix; adds a dedicated `filled-content` slot instead of restyling the default slot in place.
  - **Accessibility**: fixed `role="group"` host requiring an accessible name, a visually-hidden `role="status"` region announcing drag and drop state changes, and no host `tabindex` (the slotted browse control owns the tab stop).
  - **Styling**: SVG stroke border matching Spectrum 2's dashed-corner treatment, three sizes, and a small `--swc-dropzone-*` custom-property surface.
  - **Docs and tests**: includes Storybook docs, a consumer migration guide, unit and accessibility tests, and dedicated VRT coverage.

  **fix(illustrated-message):** `<swc-illustrated-message>`'s default slot is now reactive to content added after first render. It previously only re-evaluated on `characterData` mutations, missing element insertions such as a dynamically added illustration.

  1st-gen `<sp-dropzone>` gains `@deprecated` JSDoc for `isDragged`/`isFilled`, `onDragOver`/`onDragLeave`/`onDrop`, and the removed `DropzoneEventDetail` type, plus matching development-mode console warnings for the upcoming `swc-dropzone-*` event rename and overriding the drag handler methods. `isDragged`/`isFilled` have no runtime warning: both attributes (`dragged`/`filled`) are unchanged and still valid, so Lit's attribute-to-property sync and (for `isDragged`) the component's own internal drag handling route through the same reactive properties a consumer's JS assignment would use, and a warning there would fire for ordinary, unmigrated attribute/template-binding usage the migration plan explicitly promises is unaffected.

- [#6563](https://github.com/adobe/spectrum-web-components/pull/6563) [`74a0c56`](https://github.com/adobe/spectrum-web-components/commit/74a0c56e25be120309a40c540ad750b7f1081f4b) Add the 2nd-gen `<swc-infield-button>`, the Spectrum 2 net-new icon button for form fields.
  - **API**: `accessible-label` (required, maps to `aria-label` on the inner `<button>`), `size` (`s`/`m`/`l`/`xl`), `quiet`, and `disabled`. Does not inherit the 1st-gen link attributes (`href`, `target`, etc.) or position attributes (`block`, `inline`). Accepts icon content via the named `icon` slot.
  - **Accessibility**: button is set to `tabindex="-1"` (not in the tab order); the parent field owns keyboard behavior and the visible focus ring. Missing `accessible-label` fires a dev-mode console warning.
  - **Styling**: `--swc-infield-button-*` custom-property surface covering background-color and icon-color per interactive state. Quiet treatment removes the background.
  - **Docs and tests**: includes Storybook docs, a consumer migration guide, unit and Playwright accessibility tests.

- [#6522](https://github.com/adobe/spectrum-web-components/pull/6522) [`735a6df`](https://github.com/adobe/spectrum-web-components/commit/735a6dfbd16767af716c5b3fe9a89b09714874a4) **refactor(core):** Replace the `ObserveSlotPresence` and `ObserveSlotText` mixins with reactive controllers, following the mixin-composition guidance to prefer controllers over deep mixin chains.
  - **`@adobe/spectrum-wc-core`**: adds `SlotPresenceController` (`/controllers/slot-presence-controller`), which tracks whether slotted content matching one or more CSS selectors is present in the light DOM, and `SlotTextController` (`/controllers/slot-text-controller`), which tracks whether a slot has meaningful text or element content. Both are documented in the Controllers section of Storybook with stories and tests. The `ObserveSlotPresence` and `ObserveSlotText` mixins and their subpath exports (`/mixins/observe-slot-presence.js`, `/mixins/observe-slot-text.js`) are **removed**; consumers should construct the corresponding controller instead. `SlotTextController` requires binding `handleSlotChange` to the observed slot's `@slotchange` event.
  - **`@adobe/spectrum-wc`**: `swc-badge`, `swc-button` (and its subclasses), `swc-accordion-item`, and the linear-progress components (`swc-progress-bar`, `swc-meter`) now derive their icon/label/actions/slot state from these controllers. No public API or behavioral change — the controllers reproduce the mixins' behavior.

- [#6523](https://github.com/adobe/spectrum-web-components/pull/6523) [`86f40a1`](https://github.com/adobe/spectrum-web-components/commit/86f40a1e0bc46d74c796e712f47d3428e0e4c7e5) **refactor(core):** Leaned out `SpectrumElement`.
  - Removed `hasVisibleFocusInTree()` from `SpectrumMixin` / `SpectrumInterface`. The same behavior is now the standalone `isFocusVisibleInTree(root)` utility exported from `@adobe/spectrum-wc-core/utils`. Call `isFocusVisibleInTree(this.getRootNode() as Document | ShadowRoot)` where a component previously used `this.hasVisibleFocusInTree()`.
  - Removed the `get dir()` override from `SpectrumElement`; `element.dir` now resolves to the standard DOM attribute instead of the computed direction. No 2nd-gen component read this property (2nd-gen resolves direction via `getComputedStyle(...).direction` at each call site).
  - Removed the `SpectrumMixin` and `SpectrumInterface` exports. With `hasVisibleFocusInTree` gone, the mixin only re-typed `shadowRoot` as non-null, which nothing relied on (all reads use `?.`). `SpectrumElement` now extends `LitElement` directly, and `shadowRoot` is `ShadowRoot | null` again as in Lit.

- [#6552](https://github.com/adobe/spectrum-web-components/pull/6552) [`bd6c017`](https://github.com/adobe/spectrum-web-components/commit/bd6c017708de0b362c0504ad8b28a7f37a3b17da) Add the internal 2nd-gen UI icon system: the `<swc-ui-icon>` element plus a build-time generator for the S2 UI icon set.
  - **`<swc-ui-icon>`** (internal): `icon` selects the icon-set, `size` selects the matching optical step, and `accessible-label` drives host-owned accessibility; renders generated Lit templates with no `unsafeSVG` in consuming components.
  - **Generator** (`yarn generate:ui-icons`): converts downloaded A4U source SVGs into per-logical-icon template bundles under `components/ui-icons/icon-set/`, rewriting fills to `var(--swc-icon-color, currentColor)`.
  - **`IconBase`**: refactored to a behavior-only base (`size` + `accessible-label` + host-owned accessibility, with no render or styles); the `<swc-icon>` frame and `<swc-ui-icon>` both extend it and share `stylesheets/_lit-styles/icon-base.css`. The frame uses `accessible-label` for host-owned accessibility (`role="img"` plus `aria-label` when labeled, `aria-hidden` when decorative).

### Patch Changes

- [#6587](https://github.com/adobe/spectrum-web-components/pull/6587) [`4a30997`](https://github.com/adobe/spectrum-web-components/commit/4a309978f86b9d050cb54ed03db7418e40cb464a) **fix(slot-text-controller):** `SlotTextController` no longer counts comment nodes as label content. A `${cond ? nothing : label}` binding leaves a Lit child-part marker (a comment node with non-empty data) in the default slot; its data was previously misread as label text during the controller's initial `host.childNodes` scan.

  For a consumer whose default slot does not bind `@slotchange` (for example an icon-only `<swc-action-button>` with a conditional label), this made `hasContent` stay `true`, so the icon-only presentation was never applied. Only real text nodes now count.

- [#6594](https://github.com/adobe/spectrum-web-components/pull/6594) [`9b9695a`](https://github.com/adobe/spectrum-web-components/commit/9b9695a1e157ac300234d56882a4923d81dbf724) Fix `swc-popover` scrolling the page when closing a light-dismiss popover whose trigger has been scrolled out of view. On close, focus is restored to the trigger with `preventScroll` so the browser no longer scrolls the off-screen trigger back into view. This surfaced on touch devices (e.g. iPad), where tapping outside on non-interactive content does not blur the popover, so focus is still inside when it closes and restoration runs.

- [#6595](https://github.com/adobe/spectrum-web-components/pull/6595) [`1f85e54`](https://github.com/adobe/spectrum-web-components/commit/1f85e545d6cf3cff80888995f3184fbaea7fd154) Tooltip now uses `popover="manual"` instead of `popover="auto"`. Opening a tooltip on hover no longer light-dismisses an open `<swc-popover>` (or menu, picker, or select); a hover tooltip and an open popover coexist in both directions. Escape and close-on-leave are handled internally, so no dismissal behavior is lost. Tooltip also joins the shared dismissible stack, so when a tooltip is open on top of a popover, Escape closes only the tooltip first and leaves the popover open; a second Escape closes the popover.

## 2.0.0-beta.2

### Minor Changes

- [#6410](https://github.com/adobe/spectrum-web-components/pull/6410) [`b0c6e37`](https://github.com/adobe/spectrum-web-components/commit/b0c6e375760ccc1ec6c1773ed1aa4015aa3b0f03) - Add the 2nd-gen `<swc-close-button>`, migrated from the Spectrum 1 `<sp-close-button>`.
  - **API**: `size`, `disabled`, `accessible-label`, and `static-color`; omits the legacy `variant` surface in favor of `static-color`.
  - **Accessibility**: renders a real inner `<button type="button">` with delegated focus; requires `accessible-label` for its icon-only name; the cross icon remains decorative.
  - **Styling**: ships Spectrum 2 sizing and static-color treatments plus the `--swc-close-button-*` custom-property surface for token-aligned overrides.
  - **Docs and tests**: includes Storybook docs, consumer migration guidance, unit coverage, and Playwright accessibility and keyboard tests.

- [#6480](https://github.com/adobe/spectrum-web-components/pull/6480) [`f27f690`](https://github.com/adobe/spectrum-web-components/commit/f27f6906f142f824dcc28f588e205271a36ec04a) - **feat(color-handle):** Added `<swc-color-handle>`, the Spectrum 2 migration of `sp-color-handle`.

  A non-interactive color-picker primitive exposing `color`, `disabled`, `focused`, `open`, and the new `fill` property, with a built-in `<swc-color-loupe>` and an adaptive white-first dual border that meets WCAG 1.4.11 non-text contrast across the color spectrum. The `--mod-colorhandle-*` custom properties are removed; see the migration guide.

- [#6439](https://github.com/adobe/spectrum-web-components/pull/6439) [`7f0c3e9`](https://github.com/adobe/spectrum-web-components/commit/7f0c3e937e697e3e1d5d3973ce4f709542f1bbef) - Extract the pending (busy) state into reusable, decoupled 2nd-gen core primitives so any pending-capable component can adopt it.
  - **`@adobe/spectrum-wc-core`**: adds `PendingController` (`/controllers/pending-controller`) for the pending state (delayed activation, inline-size freeze, derived busy accessible name), the render-only `renderPendingSpinner` directive (`/directives/pending-spinner`), and `PendingMixin` (`/mixins`) which wires the controller, the `pending` / `pending-label` properties, and click suppression. `ButtonBase` no longer owns pending state.
  - **`@adobe/spectrum-wc`**: `swc-button` and `swc-action-button` now consume these primitives via `PendingMixin`. No public API change — `pending` / `pending-label` and the busy behavior are unchanged.

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

- [#6506](https://github.com/adobe/spectrum-web-components/pull/6506) [`6049706`](https://github.com/adobe/spectrum-web-components/commit/6049706e5d08bb92cd6531cbf7661c282b3ab409) - **fix(popover):** Fixed `swc-popover` staying dismissed on the next unrelated outside click after a trigger press was dragged off and released elsewhere.

  A `pointerdown` on the trigger followed by a drag off the trigger and a release elsewhere never dispatches a `click`, so the internal reopen-guard flag was left stuck `true`, misattributing the next unrelated outside light-dismiss to that stale press and swallowing the following legitimate trigger click.

- [#6490](https://github.com/adobe/spectrum-web-components/pull/6490) [`1e053fe`](https://github.com/adobe/spectrum-web-components/commit/1e053fe761c20b1df70c842cb3f9dcee94e02d8d) - **fix(slot-attribute-propagation-controller):** Fixed `SlotAttributePropagationController` permanently skipping re-propagation when a repeated value was recorded before its target slot had resolved, and added support for propagating attributes that are only sometimes present on the host.

  `getValue` may now return `null` to remove the propagated attribute from assigned elements instead of setting it to an empty string. The `hostUpdated()` no-op guard now only records a value as applied once the slot actually resolves, so a slot that resolves after an earlier unsuccessful attempt with the same value is no longer skipped forever.

  `SlotAttributePropagationController` is also now a public export of `@adobe/spectrum-wc-core` (`@spectrum-web-components/core/controllers/slot-attribute-propagation-controller.js`), alongside dedicated tests and a Storybook controller docs page. Existing consumers (`<swc-button-group>`, `<swc-illustrated-message>`) are unaffected aside from benefiting from the propagation-guard fix.

- [#6533](https://github.com/adobe/spectrum-web-components/pull/6533) [`5da5474`](https://github.com/adobe/spectrum-web-components/commit/5da54741eadcf61d60fd37d700ff457419a4d2ca) - **fix(progress-circle):** Replaced the `animation: none` reduced-motion override on `<swc-progress-circle>`'s indeterminate state with a slowed, single-rotation animation driven by custom properties (`--swc-progress-circle-rotate-start`, `--swc-progress-circle-rotate-end`, `--swc-progress-circle-dashoffset-30`), so `prefers-reduced-motion: reduce` still conveys progress without the distracting spin.

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
