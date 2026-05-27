# @adobe/spectrum-wc

## 0.2.0

### Minor Changes

- [#6184](https://github.com/adobe/spectrum-web-components/pull/6184) [`68261b1`](https://github.com/adobe/spectrum-web-components/commit/68261b1cf230f385be59f7e4fa1b09fd361b27c6) Thanks [@blunteshwar](https://github.com/blunteshwar)! - **feat(color-loupe):** Add 2nd-gen `<swc-color-loupe>` with Spectrum 2 visual fidelity. Key changes from 1st-gen `<sp-color-loupe>`:
  - Pure visual, non-interactive component — accessibility semantics are delegated to the parent color picker or color field
  - SVG loupe graphic carries `aria-hidden="true"`; no role, label, or tab stop on the host
  - `open` property controls visibility via CSS opacity and transform transitions
  - `color` property accepts any valid CSS color string, including colors with alpha transparency revealed over an opacity checkerboard

  See the [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/color-components-color-loupe-migration-guide--docs) for upgrading from 1st-gen `sp-color-loupe`.

- [#6224](https://github.com/adobe/spectrum-web-components/pull/6224) [`3ec4028`](https://github.com/adobe/spectrum-web-components/commit/3ec4028bb417b1e0d13f82bdac7d8a34720d8d68) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - **fix(suggestion-group):** require heading via `slot="heading"` instead of the `heading` string property.
  - Removed the `heading` property; consumers now provide heading content and semantics via `<h3 slot="heading">`...</h3>` (or any element)
  - `accessible-label` takes explicit precedence over heading-derived labeling when both are present
  - Host exposes `role="group"` with `aria-labelledby` pointing at the slotted heading so the accessible name resolves across the shadow boundary
  - Component still imposes heading typography (i.e. `font-size: token("font-size-200")`)

### Patch Changes

- [#6315](https://github.com/adobe/spectrum-web-components/pull/6315) [`6ac4d14`](https://github.com/adobe/spectrum-web-components/commit/6ac4d1454613edf4134586e4eb67627455081711) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - **refactor(conversational-ai):** Tighten `swc-conversation-thread` focus handling and story layout for conversational AI.
  - Roving focus for the thread is driven only by `FocusgroupNavigationController`; the reflected `active-index` attribute and related public surface are removed.
  - Conversation thread stories avoid host inline layout styles in favor of neutral wrappers where needed.
  - `swc-user-message` no longer applies host `margin-inline-end` gutter; rely on thread or app shell spacing for edge inset.

## 0.1.0

### Minor Changes

- [#6254](https://github.com/adobe/spectrum-web-components/pull/6254) [`38a463f`](https://github.com/adobe/spectrum-web-components/commit/38a463f7f4745373d143cdb08c7d87ba932cf1dd) Thanks [@5t3ph](https://github.com/5t3ph)! - **feat(button):** Add 2nd-gen `<swc-button>` with full Spectrum 2 visual fidelity. Key changes from 1st-gen `<sp-button>`:
  - Renders an internal native `<button>` as the semantic control; the custom-element host carries no button role or tab stop (`delegatesFocus: true`)
  - `ButtonBase` in `core` owns accessible-name resolution, pending-label behavior, and attribute-forwarding so future button-like components can reuse the semantic contract
  - `fill-style` replaces `treatment`; `accessible-label` replaces `label`; `truncate` replaces `no-wrap`; `justified` is new
  - Link API (`href`, `target`, `download`, etc.) removed — use a native `<a>` with global button styles instead
  - Pending state sets `aria-disabled="true"`, derives a descriptive default busy label (`"${name}, busy"`), and remains focusable (fixes SWC-459)
  - Focus indication uses `outline` so the ring is not clipped by truncated overflow (fixes SWC-886)
  - Button label inherits host `visibility` (fixes SWC-701)
  - Static white outline is demonstrated on approved background colors to maintain hover contrast (fixes SWC-1139)
  - `global-button.css` is now auto-generated from `button.css` by the new `@adobe/vite-global-elements-css` plugin, eliminating drift between the component and global-element styling

  See the [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-button-migration-guide--docs) for upgrading from 1st-gen `sp-button`.

- [#6170](https://github.com/adobe/spectrum-web-components/pull/6170) [`668f357`](https://github.com/adobe/spectrum-web-components/commit/668f3573b881b6362fe5ccc60fc1080017c85cd7) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - Add the new Conversational AI pattern and component set to @adobe/spectrum-wc with docs, stories, and test coverage.

- [#6122](https://github.com/adobe/spectrum-web-components/pull/6122) [`7b153b5`](https://github.com/adobe/spectrum-web-components/commit/7b153b5433a8f6d47850f8939b058f7bc431c48c) Thanks [@rise-erpelding](https://github.com/rise-erpelding)! - **Breaking**: `<swc-badge>` migration includes new `subtle`/`outline` styles, additional non-semantic color variants, and default behavior updates (`variant="neutral"` and reflected `size="s"` when omitted). `--mod-badge-*` hooks are removed, and `--swc-badge-*` hooks are **not** a strict 1:1 replacement surface for every previous override. See the badge consumer migration guide.

  **Breaking**: `<swc-divider>` migration reflects `size="m"` when omitted (visual medium behavior remains unchanged). `--mod-divider-*` hooks are removed, and the new public styling surface (`--swc-divider-thickness`, `--swc-divider-background-color`) is **not** a strict 1:1 replacement for prior size/static-color-specific overrides. See the divider consumer migration guide.

  **Breaking**: `<swc-progress-circle>` migration removes the `indeterminate` attribute (omit `progress` or set `progress = null` instead), no longer renders light DOM children as labels (use `label`/`aria-label`), and adds `static-color="black"` support. `--mod-progress-circle-*` hooks are removed, and `--swc-progress-circle-*` hooks are **not** a strict 1:1 replacement for all prior behavior. See the progress circle consumer migration guide.

  **Breaking**: `<swc-status-light>` migration removes the deprecated `disabled` attribute, removes the `accent` variant, and updates default behavior (`variant="neutral"` when omitted). `--mod-status-light-*` hooks are removed, and `--swc-status-light-*` hooks are **not** a strict 1:1 replacement for every previous override pattern. `StatusLightSize` is exported from core for typed usage. See the status light consumer migration guide.

- [#6183](https://github.com/adobe/spectrum-web-components/pull/6183) [`8aa488e`](https://github.com/adobe/spectrum-web-components/commit/8aa488e3867725b1ed93b2b5c31cba686f116688) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **feat(tabs):** Add 2nd-gen tabs (`swc-tabs`, `swc-tab`, `swc-tab-panel`) with Spectrum 2 styling, selection indicator, and WAI-ARIA tabs keyboard behavior. A single side-effect import `@adobe/spectrum-wc/components/tabs/swc-tabs.js` registers all three elements. See `components/tabs/migration.md` for migration from 1st-gen `sp-tabs`.

### Patch Changes

- Updated dependencies [[`ba14a2b`](https://github.com/adobe/spectrum-web-components/commit/ba14a2b6361a0089a9a8c72232f245cde0716d89), [`f37dec6`](https://github.com/adobe/spectrum-web-components/commit/f37dec6ae39fd89a4c12e084b4a0f4d9092d79b0), [`7b153b5`](https://github.com/adobe/spectrum-web-components/commit/7b153b5433a8f6d47850f8939b058f7bc431c48c), [`8aa488e`](https://github.com/adobe/spectrum-web-components/commit/8aa488e3867725b1ed93b2b5c31cba686f116688)]:
  - @spectrum-web-components/core@0.1.0

## 0.0.4

First public beta of `@adobe/spectrum-wc` — the 2nd-generation Spectrum Web Components library built on Spectrum 2 design tokens. This release ships 9 components, 1 pattern, and a shared core package. All components move from per-component `@spectrum-web-components/*` packages to a single `@adobe/spectrum-wc` package with subpath imports and are renamed from `sp-*` to `swc-*`.

### Added

- `Button` — Added `<swc-button>` with full Spectrum 2 visual fidelity. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-button--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-button-migration-guide--docs). [#6254](https://github.com/adobe/spectrum-web-components/pull/6254)
- `Avatar` — Added `<swc-avatar>` with Spectrum 2 tokens and updated size API. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-avatar--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-avatar-migration-guide--docs). [#6113](https://github.com/adobe/spectrum-web-components/pull/6113)
- `Badge` — Added `<swc-badge>` with Spectrum 2 tokens and icon support. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-badge--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-badge-migration-guide--docs). [#5718](https://github.com/adobe/spectrum-web-components/pull/5718)
- `Divider` — Added `<swc-divider>` with Spectrum 2 tokens and static color support. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-divider--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-divider-migration-guide--docs). [#5798](https://github.com/adobe/spectrum-web-components/pull/5798)
- `Illustrated Message` — Added `<swc-illustrated-message>` with slot-based heading API and size/orientation attributes. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-illustrated-message--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-illustrated-message-migration-guide--docs). [#6207](https://github.com/adobe/spectrum-web-components/pull/6207)
- `Progress Circle` — Added `<swc-progress-circle>` with ARIA attributes and Spectrum 2 tokens. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-progress-circle-migration-guide--docs). [#5743](https://github.com/adobe/spectrum-web-components/pull/5743)
- `Status Light` — Added `<swc-status-light>` with Spectrum 2 tokens and extended color variants. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-status-light--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-status-light-migration-guide--docs). [#5800](https://github.com/adobe/spectrum-web-components/pull/5800)
- `Tabs` — Added `<swc-tabs>`, `<swc-tab>`, and `<swc-tab-panel>` with keyboard navigation and overflow handling. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-tabs--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-tabs-migration-guide--docs). [#6183](https://github.com/adobe/spectrum-web-components/pull/6183)
- `Typography` — Added typography utility classes for Spectrum 2 type scales. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-typography--docs). [#6031](https://github.com/adobe/spectrum-web-components/pull/6031)
- `Conversational AI` — Added composable AI chat pattern with message, action bar, and scroll components (no Gen1 counterpart). See the [pattern docs](https://spectrum-web-components.adobe.com/?path=/docs/patterns-conversational-ai--docs). [#6170](https://github.com/adobe/spectrum-web-components/pull/6170)

### Dependencies

- `@spectrum-web-components/core@2.0.0-beta1`
