# @adobe/spectrum-wc

## 2.0.0-beta.3

### Minor Changes

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - Add the 2nd-gen `<swc-close-button>`, migrated from the Spectrum 1 `<sp-close-button>`.
  - **API**: `size`, `disabled`, `accessible-label`, and `static-color`; omits the legacy `variant` surface in favor of `static-color`.
  - **Accessibility**: renders a real inner `<button type="button">` with delegated focus; requires `accessible-label` for its icon-only name; the cross icon remains decorative.
  - **Styling**: ships Spectrum 2 sizing and static-color treatments plus the `--swc-close-button-*` custom-property surface for token-aligned overrides.
  - **Docs and tests**: includes Storybook docs, consumer migration guidance, unit coverage, and Playwright accessibility and keyboard tests.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **feat(color-handle):** Added `<swc-color-handle>`, the Spectrum 2 migration of `sp-color-handle`.

  A non-interactive color-picker primitive exposing `color`, `disabled`, `focused`, `open`, and the new `fill` property, with a built-in `<swc-color-loupe>` and an adaptive white-first dual border that meets WCAG 1.4.11 non-text contrast across the color spectrum. The `--mod-colorhandle-*` custom properties are removed; see the migration guide.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **feat(live-selection-controller):** Added `LiveSelectionController`, a Lit reactive controller that enforces a selection constraint (single or multiple) on a group of items that each own their own selected state.

  Use it for patterns like accordions and disclosure groups where items manage their own `open` or `selected` property and can change that state on their own initiative. Unlike a cache-authoritative controller, it reads item state live from the DOM on each observed event rather than maintaining an internal list, so it stays correct even when items change themselves outside a controller-driven transition.

  The accordion (`swc-accordion`) now uses `LiveSelectionController` internally to enforce its exclusive-open constraint; its public API and behavior are unchanged.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **fix(tabs):** Changed the default `keyboard-activation` on `<swc-tabs>` from `manual` to `automatic`, aligning with React Spectrum/React Aria `Tabs`.

  `swc-tab-panel` content is always present in the light DOM (not lazily mounted), which is the condition the WAI-ARIA APG recommends for automatic activation. Consumers relying on the previous implicit `manual` default (inherited from 1st-gen `sp-tabs`' `auto = false`) should add `keyboard-activation="manual"` explicitly, particularly if their own panel content is expensive to render or lazy-loaded.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - `Spectrum WC` — Added a published Custom Elements Manifest for editor, documentation, and integration tooling.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **feat(progress-bar):** Added `<swc-progress-bar>`, the Spectrum 2 migration of Progress Bar.

  Renames from `<sp-progress-bar>`: `progress` becomes `value`, `side-label` becomes `label-position="side"`, the `label` string attribute becomes a `label` named slot, and `--mod-progressbar-*` custom properties become `--swc-linear-progress-*`. The default `size` is now `'m'`.

  New in Spectrum 2: `min-value` / `max-value` for arbitrary numeric ranges, `static-color="black"`, `value-label`, a `formatOptions` property, `accessible-label`, and a `description` slot. `over-background` is removed in favor of `static-color="white"`, and `role="progressbar"` plus the `aria-value*` attributes now live on an internal element rather than the host. See the Progress Bar migration guide for full upgrade steps.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **refactor(tabs):** Migrate `<swc-tabs>` keyboard navigation to `FocusgroupNavigationController`.

  Arrow-key, Home, and End navigation is now handled by the controller rather than by manually computed deltas in `handleKeyDown`. The `handleKeyDown` method retains only Enter/Space activation; all roving-tabindex management is delegated to the controller. In automatic activation mode, `focusgroupNavigationActiveChange` events with `source: 'keyboard'` drive selection-follows-focus; events with `source: 'refresh'` or `source: 'programmatic'` are intentionally ignored so that mounting or toggling `disabled` cannot trigger spurious `change` events.

### Patch Changes

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **fix(color-loupe):** Added an adaptive white-first inner border to `<swc-color-loupe>` so its chrome meets WCAG 1.4.11 non-text contrast (≥3:1) across the color spectrum.

  The inner border's opacity now escalates above its default floor only when the white outer halo can't itself carry 3:1 contrast against the loupe's color. The outer border, shape, and sizing are unchanged, and there is no public API change. This supersedes the prior practical-limits exception, matching the adaptive dual-border approach already shipped for `<swc-color-handle>`.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - Fix the broken `@import` in the published `global-link.css`. The build flattens all stylesheets into `dist/` root, but `global-link.css` shipped with `@import url("../link.css")` (relative to its source subfolder), which pointed one directory above `dist/` and failed to resolve for consumers of `@adobe/spectrum-wc/global-link.css`. Local `@import` targets are now rewritten to sibling references (`./link.css`) during the flatten.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **fix(illustrated-message):** Fixed the `actions` slot content alignment in `<swc-illustrated-message>`.

  The `.swc-IllustratedMessage-content` flex container was missing `align-items: center`, causing slotted actions (e.g. a `<swc-button>` or `<swc-button-group>`) to stretch to the container width instead of centering horizontally.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **fix(popover):** Fixed `swc-popover` staying dismissed on the next unrelated outside click after a trigger press was dragged off and released elsewhere.

  A `pointerdown` on the trigger followed by a drag off the trigger and a release elsewhere never dispatches a `click`, so the internal reopen-guard flag was left stuck `true`, misattributing the next unrelated outside light-dismiss to that stale press and swallowing the following legitimate trigger click.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **fix(slot-attribute-propagation-controller):** Fixed `SlotAttributePropagationController` permanently skipping re-propagation when a repeated value was recorded before its target slot had resolved, and added support for propagating attributes that are only sometimes present on the host.

  `getValue` may now return `null` to remove the propagated attribute from assigned elements instead of setting it to an empty string. The `hostUpdated()` no-op guard now only records a value as applied once the slot actually resolves, so a slot that resolves after an earlier unsuccessful attempt with the same value is no longer skipped forever.

  `SlotAttributePropagationController` is also now a public export of `@adobe/spectrum-wc-core` (`@spectrum-web-components/core/controllers/slot-attribute-propagation-controller.js`), alongside dedicated tests and a Storybook controller docs page. Existing consumers (`<swc-button-group>`, `<swc-illustrated-message>`) are unaffected aside from benefiting from the propagation-guard fix.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - Extract the pending (busy) state into reusable, decoupled 2nd-gen core primitives so any pending-capable component can adopt it.
  - **`@adobe/spectrum-wc-core`**: adds `PendingController` (`/controllers/pending-controller`) for the pending state (delayed activation, inline-size freeze, derived busy accessible name), the render-only `renderPendingSpinner` directive (`/directives/pending-spinner`), and `PendingMixin` (`/mixins`) which wires the controller, the `pending` / `pending-label` properties, and click suppression. `ButtonBase` no longer owns pending state.
  - **`@adobe/spectrum-wc`**: `swc-button` and `swc-action-button` now consume these primitives via `PendingMixin`. No public API change — `pending` / `pending-label` and the busy behavior are unchanged.

- [#6607](https://github.com/adobe/spectrum-web-components/pull/6607) [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc) Thanks [@blunteshwar](https://github.com/blunteshwar)! - Refine the 2nd-gen response status pattern API, animation, and docs.
  - **Added**: Header label roll animation on text changes; update cadence remains consumer-managed.
  - **Added**: `<swc-response-status-step>` as a dedicated step element with its own styles and exports.
  - **Updated**: AI stories, docs, and regression/a11y coverage for the new API and behaviors.

- [#6638](https://github.com/adobe/spectrum-web-components/pull/6638) [`031004c`](https://github.com/adobe/spectrum-web-components/commit/031004cffdaec3bc25384e6209986328b8f7d6a0) Thanks [@blunteshwar](https://github.com/blunteshwar)! - testing

- [#6638](https://github.com/adobe/spectrum-web-components/pull/6638) [`031004c`](https://github.com/adobe/spectrum-web-components/commit/031004cffdaec3bc25384e6209986328b8f7d6a0) Thanks [@blunteshwar](https://github.com/blunteshwar)! - testing

- Updated dependencies [[`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc), [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc), [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc), [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc), [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc), [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc), [`9316a9a`](https://github.com/adobe/spectrum-web-components/commit/9316a9a559a233e6648334e69cc8a54305fe31bc)]:
  - @adobe/spectrum-wc-core@2.0.0-beta.3

## 2.0.0-beta.3

### Minor Changes

- **AI Toolkit** — as of this release, the pattern (renamed from `conversational-ai` to `ai-toolkit` in [#6654](https://github.com/adobe/spectrum-web-components/pull/6654)) ships the following components: `swc-prompt-field`, `swc-upload-attachment`, `swc-conversation-thread`, `swc-conversation-turn`, `swc-user-message`, `swc-system-message`, `swc-response-status`, `swc-message-feedback`, `swc-message-sources`, `swc-suggestion-group`, `swc-suggestion-item`, and `swc-pixel-loader`. See the [pattern docs](https://spectrum-web-components.adobe.com/?path=/docs/patterns-ai-toolkit-pattern-overview--docs).

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

- [#6639](https://github.com/adobe/spectrum-web-components/pull/6639) [`aadfa31`](https://github.com/adobe/spectrum-web-components/commit/aadfa3176862555d7d9f699e94aef39efecfe67a) **feat(prompt-field):** `<swc-prompt-field>` now renders `<swc-pixel-loader>` as its status indicator at the start of the input row, resting on a settled frame while idle and animating while `generating`.

  A single **`loader`** attribute sets the loader artwork:
  - An **icon name** (default `aiLogo`): a single static icon.
  - A **preset name** (`cc`, `dc`, `exp`, `analyze`, `mega`): a themed icon sequence cycled one per loop.

  The icon and preset name sets are disjoint, so one attribute covers both; it is routed to the loader's `icon` or `preset` internally. The indicator is decorative (`aria-hidden`); the generating state is conveyed to assistive technology by the stop button that replaces send.

- [#6523](https://github.com/adobe/spectrum-web-components/pull/6523) [`86f40a1`](https://github.com/adobe/spectrum-web-components/commit/86f40a1e0bc46d74c796e712f47d3428e0e4c7e5) **refactor(core):** Leaned out `SpectrumElement`.
  - Removed `hasVisibleFocusInTree()` from `SpectrumMixin` / `SpectrumInterface`. The same behavior is now the standalone `isFocusVisibleInTree(root)` utility exported from `@adobe/spectrum-wc-core/utils`. Call `isFocusVisibleInTree(this.getRootNode() as Document | ShadowRoot)` where a component previously used `this.hasVisibleFocusInTree()`.
  - Removed the `get dir()` override from `SpectrumElement`; `element.dir` now resolves to the standard DOM attribute instead of the computed direction. No 2nd-gen component read this property (2nd-gen resolves direction via `getComputedStyle(...).direction` at each call site).
  - Removed the `SpectrumMixin` and `SpectrumInterface` exports. With `hasVisibleFocusInTree` gone, the mixin only re-typed `shadowRoot` as non-null, which nothing relied on (all reads use `?.`). `SpectrumElement` now extends `LitElement` directly, and `shadowRoot` is `ShadowRoot | null` again as in Lit.

- [#6552](https://github.com/adobe/spectrum-web-components/pull/6552) [`bd6c017`](https://github.com/adobe/spectrum-web-components/commit/bd6c017708de0b362c0504ad8b28a7f37a3b17da) Add the internal 2nd-gen UI icon system: the `<swc-ui-icon>` element plus a build-time generator for the S2 UI icon set.
  - **`<swc-ui-icon>`** (internal): `icon` selects the icon-set, `size` selects the matching optical step, and `accessible-label` drives host-owned accessibility; renders generated Lit templates with no `unsafeSVG` in consuming components.
  - **Generator** (`yarn generate:ui-icons`): converts downloaded A4U source SVGs into per-logical-icon template bundles under `components/ui-icons/icon-set/`, rewriting fills to `var(--swc-icon-color, currentColor)`.
  - **`IconBase`**: refactored to a behavior-only base (`size` + `accessible-label` + host-owned accessibility, with no render or styles); the `<swc-icon>` frame and `<swc-ui-icon>` both extend it and share `stylesheets/_lit-styles/icon-base.css`. The frame uses `accessible-label` for host-owned accessibility (`role="img"` plus `aria-label` when labeled, `aria-hidden` when decorative).

- [#6653](https://github.com/adobe/spectrum-web-components/pull/6653) [`06a3cc2`](https://github.com/adobe/spectrum-web-components/commit/06a3cc20a4562d0a49568671ea415fff0bbdd0d6) **feat(tokens):** Update `@adobe/spectrum-tokens` to 15.2.0. This adds the new `opacity-*` scale as custom properties and refreshes component token values. The token loader now auto-discovers the per-component token files introduced in the 15.x file split (previously the single `color-component.json` / `layout-component.json` files).

  **feat(prompt-field):** Adopt the new `opacity-*` tokens for the surface transparencies that map exactly to the scale (`--_swc-prompt-field-inset-shadow-color` → `opacity-100`, outer recede stop → `opacity-50`). No visual change.

### Patch Changes

- [#6592](https://github.com/adobe/spectrum-web-components/pull/6592) [`885a79f`](https://github.com/adobe/spectrum-web-components/commit/885a79fbeec4329ea4955016678bb85615d68499) Fix `swc-divider[vertical]` rendering with zero height inside flex/grid containers with an indefinite parent height (e.g. an auto-height flex toolbar).

- [#6587](https://github.com/adobe/spectrum-web-components/pull/6587) [`4a30997`](https://github.com/adobe/spectrum-web-components/commit/4a309978f86b9d050cb54ed03db7418e40cb464a) **fix(action-button):** A `<swc-avatar>` slotted into `<swc-action-button>`'s `icon` slot now automatically scales to match the button's icon size.

  Previously, Avatar's own `size` attribute controlled its rendered size regardless of the action button's size, since Avatar's `:host([size])` sizing rule won the specificity contest with the icon slot's generic sizing rule for the avatar's _host box_ only — the visible image inside Avatar's shadow root ignored that squeeze entirely and rendered at its own `size`, causing it to overflow. Consumers previously had to manually pair an avatar `size` with the action-button `size` (e.g. `xl` action button with avatar `size="1000"`) to avoid a visual mismatch.

  The icon slot now also sets `--swc-avatar-size` directly (the same way it already sets its own internal icon-size custom properties), which wins over Avatar's own `:host([size])` rule for a slotted avatar specifically because of how shadow-tree custom property cascading resolves rules matching via `::slotted()` against rules from the slotted element's own shadow tree. Avatar's `size` attribute becomes a no-op when slotted into an action button's icon slot; standalone avatar sizing is unaffected.

- [#6586](https://github.com/adobe/spectrum-web-components/pull/6586) [`5bcaa04`](https://github.com/adobe/spectrum-web-components/commit/5bcaa040715cd9523091eacd1df67b49486a9175) **fix(action-button):** `<swc-action-button>` now tracks label content added or removed after the initial render.

  The default slot wasn't bound to `SlotTextController`'s `handleSlotChange`, so `hasLabel` only reflected content present at connect. Dynamically clearing or setting the label in a consumer app (e.g. a framework re-render) left the `swc-ActionButton--iconOnly` class and its spacing stale until an unrelated property change forced a re-render.

- [#6587](https://github.com/adobe/spectrum-web-components/pull/6587) [`4a30997`](https://github.com/adobe/spectrum-web-components/commit/4a309978f86b9d050cb54ed03db7418e40cb464a) **fix(slot-text-controller):** `SlotTextController` no longer counts comment nodes as label content. A `${cond ? nothing : label}` binding leaves a Lit child-part marker (a comment node with non-empty data) in the default slot; its data was previously misread as label text during the controller's initial `host.childNodes` scan.

  For a consumer whose default slot does not bind `@slotchange` (for example an icon-only `<swc-action-button>` with a conditional label), this made `hasContent` stay `true`, so the icon-only presentation was never applied. Only real text nodes now count.

- [#6626](https://github.com/adobe/spectrum-web-components/pull/6626) [`d33a47e`](https://github.com/adobe/spectrum-web-components/commit/d33a47e26509b0bc0cee67d18195e5619a990758) **fix(\*):** Added explicit `box-sizing: border-box` to `::slotted()` rules that constrain slotted content to a fixed `inline-size`, `block-size`, `aspect-ratio`, or `max-*` size across `<swc-card>`, `<swc-action-button>`, `<swc-button>`, `<swc-infield-button>`, `<swc-tab>`, `<swc-illustrated-message>`, `<swc-icon>`, `<swc-asset>`, and the ai `<swc-prompt-field>`, `<swc-upload-attachment>`, and `<swc-user-message>` patterns. This prevents slotted elements breaking an aspect ratio or overflowing their container.

- [#6594](https://github.com/adobe/spectrum-web-components/pull/6594) [`9b9695a`](https://github.com/adobe/spectrum-web-components/commit/9b9695a1e157ac300234d56882a4923d81dbf724) Fix `swc-popover` scrolling the page when closing a light-dismiss popover whose trigger has been scrolled out of view. On close, focus is restored to the trigger with `preventScroll` so the browser no longer scrolls the off-screen trigger back into view. This surfaced on touch devices (e.g. iPad), where tapping outside on non-interactive content does not blur the popover, so focus is still inside when it closes and restoration runs.

- [#6654](https://github.com/adobe/spectrum-web-components/pull/6654) [`33b5f68`](https://github.com/adobe/spectrum-web-components/commit/33b5f68f979775e2fa91d699129e8c8387d2e0e9) Rename the pattern namespace from `patterns/conversational-ai` to `patterns/ai-toolkit` across imports, documentation, Storybook, tests, and tooling.

- [#6522](https://github.com/adobe/spectrum-web-components/pull/6522) [`735a6df`](https://github.com/adobe/spectrum-web-components/commit/735a6dfbd16767af716c5b3fe9a89b09714874a4) **refactor(core):** Replace the `ObserveSlotPresence` and `ObserveSlotText` mixins with reactive controllers, following the mixin-composition guidance to prefer controllers over deep mixin chains.
  - **`@adobe/spectrum-wc-core`**: adds `SlotPresenceController` (`/controllers/slot-presence-controller`), which tracks whether slotted content matching one or more CSS selectors is present in the light DOM, and `SlotTextController` (`/controllers/slot-text-controller`), which tracks whether a slot has meaningful text or element content. Both are documented in the Controllers section of Storybook with stories and tests. The `ObserveSlotPresence` and `ObserveSlotText` mixins and their subpath exports (`/mixins/observe-slot-presence.js`, `/mixins/observe-slot-text.js`) are **removed**; consumers should construct the corresponding controller instead. `SlotTextController` requires binding `handleSlotChange` to the observed slot's `@slotchange` event.
  - **`@adobe/spectrum-wc`**: `swc-badge`, `swc-button` (and its subclasses), `swc-accordion-item`, and the linear-progress components (`swc-progress-bar`, `swc-meter`) now derive their icon/label/actions/slot state from these controllers. No public API or behavioral change — the controllers reproduce the mixins' behavior.

- [#6621](https://github.com/adobe/spectrum-web-components/pull/6621) [`95b2829`](https://github.com/adobe/spectrum-web-components/commit/95b28298571f690a3c3438f96475d2d796225ecb) Refine 2nd-gen tabs styling: `swc-tab` labels now use `cjk-line-height-100` for Japanese, Chinese, and Korean text so CJK glyphs are not vertically clipped, and `swc-tab-panel` top padding uses the `spacing-200` token via a private `--_swc-tab-panel-padding-top` custom property instead of a hardcoded `12px` fallback.

- [#6595](https://github.com/adobe/spectrum-web-components/pull/6595) [`1f85e54`](https://github.com/adobe/spectrum-web-components/commit/1f85e545d6cf3cff80888995f3184fbaea7fd154) Tooltip now uses `popover="manual"` instead of `popover="auto"`. Opening a tooltip on hover no longer light-dismisses an open `<swc-popover>` (or menu, picker, or select); a hover tooltip and an open popover coexist in both directions. Escape and close-on-leave are handled internally, so no dismissal behavior is lost. Tooltip also joins the shared dismissible stack, so when a tooltip is open on top of a popover, Escape closes only the tooltip first and leaves the popover open; a second Escape closes the popover.

- Updated dependencies [[`2b26e0b`](https://github.com/adobe/spectrum-web-components/commit/2b26e0b3b6e25d4852e9984472737bd3caa2dfae), [`346746c`](https://github.com/adobe/spectrum-web-components/commit/346746cacd405fa1cd58b7fae3f164457968dec7), [`3110850`](https://github.com/adobe/spectrum-web-components/commit/31108509505dcaf485e4d2582074ea5fa8189922), [`d429a49`](https://github.com/adobe/spectrum-web-components/commit/d429a4991a51339b5325f726bd39d0d3c4ef447e), [`afe0beb`](https://github.com/adobe/spectrum-web-components/commit/afe0beb9e487d3f2838bb1ec7e98f131f53606af), [`4a30997`](https://github.com/adobe/spectrum-web-components/commit/4a309978f86b9d050cb54ed03db7418e40cb464a), [`74a0c56`](https://github.com/adobe/spectrum-web-components/commit/74a0c56e25be120309a40c540ad750b7f1081f4b), [`9b9695a`](https://github.com/adobe/spectrum-web-components/commit/9b9695a1e157ac300234d56882a4923d81dbf724), [`735a6df`](https://github.com/adobe/spectrum-web-components/commit/735a6dfbd16767af716c5b3fe9a89b09714874a4), [`86f40a1`](https://github.com/adobe/spectrum-web-components/commit/86f40a1e0bc46d74c796e712f47d3428e0e4c7e5), [`bd6c017`](https://github.com/adobe/spectrum-web-components/commit/bd6c017708de0b362c0504ad8b28a7f37a3b17da), [`1f85e54`](https://github.com/adobe/spectrum-web-components/commit/1f85e545d6cf3cff80888995f3184fbaea7fd154)]:
  - @adobe/spectrum-wc-core@2.0.0-beta.3

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
  - **Updated**: AI stories, docs, and regression/a11y coverage for the new API and behaviors.

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

- [#6170](https://github.com/adobe/spectrum-web-components/pull/6170) [`668f357`](https://github.com/adobe/spectrum-web-components/commit/668f3573b881b6362fe5ccc60fc1080017c85cd7) - `AI Toolkit` — Added composable AI Toolkit chat pattern with message, action bar, and scroll components. See the [pattern docs](https://spectrum-web-components.adobe.com/?path=/docs/patterns-ai-toolkit-pattern-overview--docs).

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
- [#6170](https://github.com/adobe/spectrum-web-components/pull/6170) - `AI Toolkit` — Added composable AI Toolkit chat pattern with message, action bar, and scroll components. See the [pattern docs](https://spectrum-web-components.adobe.com/?path=/docs/patterns-ai-toolkit-pattern-overview--docs).
