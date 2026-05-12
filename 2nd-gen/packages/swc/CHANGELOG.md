# @adobe/spectrum-wc

## 2.0.0-beta1

First public beta of `@adobe/spectrum-wc` — the 2nd-generation Spectrum Web Components library built on Spectrum 2 design tokens. This release ships 9 components, 1 pattern, and a shared core package. All components move from per-component `@spectrum-web-components/*` packages to a single `@adobe/spectrum-wc` package with subpath imports and are renamed from `sp-*` to `swc-*`.

### Added

- `Button` — Added `<swc-button>` with full Spectrum 2 visual fidelity, global element styles, and consumer migration guide. [#6254](https://github.com/adobe/spectrum-web-components/pull/6254)
- `Avatar` — Added `<swc-avatar>` with Spectrum 2 tokens and updated size API. [#6113](https://github.com/adobe/spectrum-web-components/pull/6113)
- `Badge` — Added `<swc-badge>` with Spectrum 2 tokens and icon support. [#5718](https://github.com/adobe/spectrum-web-components/pull/5718)
- `Divider` — Added `<swc-divider>` with Spectrum 2 tokens and static color support. [#5798](https://github.com/adobe/spectrum-web-components/pull/5798)
- `Illustrated Message` — Added `<swc-illustrated-message>` with slot-based heading API and size/orientation attributes. [#6207](https://github.com/adobe/spectrum-web-components/pull/6207)
- `Progress Circle` — Added `<swc-progress-circle>` with ARIA attributes and Spectrum 2 tokens. [#5743](https://github.com/adobe/spectrum-web-components/pull/5743)
- `Status Light` — Added `<swc-status-light>` with Spectrum 2 tokens and extended color variants. [#5800](https://github.com/adobe/spectrum-web-components/pull/5800)
- `Tabs` — Added `<swc-tabs>`, `<swc-tab>`, and `<swc-tab-panel>` with keyboard navigation and overflow handling. [#6183](https://github.com/adobe/spectrum-web-components/pull/6183)
- `Typography` — Added typography utility classes for Spectrum 2 type scales. [#6031](https://github.com/adobe/spectrum-web-components/pull/6031)
- `Conversational AI` — Added composable AI chat pattern with message, action bar, and scroll components (no Gen1 counterpart). [#6170](https://github.com/adobe/spectrum-web-components/pull/6170)

### Dependencies

- `@spectrum-web-components/core@2.0.0-beta1`
