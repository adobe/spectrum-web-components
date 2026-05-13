# @adobe/spectrum-wc

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

  See the [consumer migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-button-consumer-migration-guide--readme) for upgrading from 1st-gen `sp-button`.

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

### Patch Changes

- [#5998](https://github.com/adobe/spectrum-web-components/pull/5998) [`6f5419a`](https://github.com/adobe/spectrum-web-components/commit/6f5419a4de29a1ee440a36c1a57d8c2e1476e2f6) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - **Fixed** missing export for `alert-banner` from `@spectrum-web-components/core`, which could cause build failures in certain environments.

- Updated dependencies [[`6f5419a`](https://github.com/adobe/spectrum-web-components/commit/6f5419a4de29a1ee440a36c1a57d8c2e1476e2f6)]:
  - @spectrum-web-components/core@0.0.4

## 0.0.3

### Patch Changes

- Updated dependencies [[`95e1c25`](https://github.com/adobe/spectrum-web-components/commit/95e1c25672f62f3723dfa66129ae5ecdeabe578a)]:
  - @spectrum-web-components/core@0.0.3

## 0.0.2

### Patch Changes

- Updated dependencies [[`283f0fe`](https://github.com/adobe/spectrum-web-components/commit/283f0fe07533c464e9fe1a3e7edebecb9128e11f), [`1d76b70`](https://github.com/adobe/spectrum-web-components/commit/1d76b7093d8ff5f9b26f07a69086488341a02650), [`9cb816b`](https://github.com/adobe/spectrum-web-components/commit/9cb816b5ac80387fdc9bb87381f5149fecb1b595)]:
  - @spectrum-web-components/core@0.0.2
