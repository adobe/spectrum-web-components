## 0.1.0

### Minor Changes

- [#6067](https://github.com/adobe/spectrum-web-components/pull/6067) [`ba14a2b`](https://github.com/adobe/spectrum-web-components/commit/ba14a2b6361a0089a9a8c72232f245cde0716d89) Thanks [@caseyisonit](https://github.com/caseyisonit)! - Refactored size mixin exports and badge type naming for consistency.

  **@spectrum-web-components/base (1st-gen)**
  - **Added**: New exports `ELEMENT_SIZES` and `DEFAULT_ELEMENT_SIZES` for typed size arrays
  - **Deprecated**: `ElementSizes` record is now deprecated in favor of `ELEMENT_SIZES`. The export is preserved for backward compatibility but will be removed in a future major release.

  **@spectrum-web-components/core (2nd-gen)**
  - **Changed**: Replaced `ElementSizes` record with `ELEMENT_SIZES` const array and `DEFAULT_ELEMENT_SIZES`
  - **Changed**: `VALID_SIZES` arrays are now typed as `readonly ElementSize[]` for better type safety
  - **Changed**: Badge type exports renamed for consistency:
    - `BADGE_VARIANTS_S2` → `BADGE_VARIANTS`
    - `BADGE_VARIANTS_COLOR_S2` → `BADGE_VARIANTS_COLOR`
    - `BadgeVariantS2` → `BadgeVariant`
    - `BadgeColorVariantS2` → `BadgeColorVariant`

- [#6122](https://github.com/adobe/spectrum-web-components/pull/6122) [`7b153b5`](https://github.com/adobe/spectrum-web-components/commit/7b153b5433a8f6d47850f8939b058f7bc431c48c) Thanks [@rise-erpelding](https://github.com/rise-erpelding)! - **Breaking**: `<swc-badge>` migration includes new `subtle`/`outline` styles, additional non-semantic color variants, and default behavior updates (`variant="neutral"` and reflected `size="s"` when omitted). `--mod-badge-*` hooks are removed, and `--swc-badge-*` hooks are **not** a strict 1:1 replacement surface for every previous override. See the badge consumer migration guide.

  **Breaking**: `<swc-divider>` migration reflects `size="m"` when omitted (visual medium behavior remains unchanged). `--mod-divider-*` hooks are removed, and the new public styling surface (`--swc-divider-thickness`, `--swc-divider-background-color`) is **not** a strict 1:1 replacement for prior size/static-color-specific overrides. See the divider consumer migration guide.

  **Breaking**: `<swc-progress-circle>` migration removes the `indeterminate` attribute (omit `progress` or set `progress = null` instead), no longer renders light DOM children as labels (use `label`/`aria-label`), and adds `static-color="black"` support. `--mod-progress-circle-*` hooks are removed, and `--swc-progress-circle-*` hooks are **not** a strict 1:1 replacement for all prior behavior. See the progress circle consumer migration guide.

  **Breaking**: `<swc-status-light>` migration removes the deprecated `disabled` attribute, removes the `accent` variant, and updates default behavior (`variant="neutral"` when omitted). `--mod-status-light-*` hooks are removed, and `--swc-status-light-*` hooks are **not** a strict 1:1 replacement for every previous override pattern. `StatusLightSize` is exported from core for typed usage. See the status light consumer migration guide.

- [#6183](https://github.com/adobe/spectrum-web-components/pull/6183) [`8aa488e`](https://github.com/adobe/spectrum-web-components/commit/8aa488e3867725b1ed93b2b5c31cba686f116688) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **feat(tabs):** Add 2nd-gen tabs (`swc-tabs`, `swc-tab`, `swc-tab-panel`) with Spectrum 2 styling, selection indicator, and WAI-ARIA tabs keyboard behavior. A single side-effect import `@adobe/spectrum-wc/components/tabs/swc-tabs.js` registers all three elements. See `components/tabs/migration.md` for migration from 1st-gen `sp-tabs`.

### Patch Changes

- [#5936](https://github.com/adobe/spectrum-web-components/pull/5936) [`f37dec6`](https://github.com/adobe/spectrum-web-components/commit/f37dec6ae39fd89a4c12e084b4a0f4d9092d79b0) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - **Refactored**: Overhauled text direction management across the component library. Previously, `SpectrumElement` and `sp-theme` actively managed `dir` by traversing the DOM on connect, setting `dir` attributes on every component, and observing changes via `MutationObserver`. This has been replaced with a passive approach that relies on the native CSS `:dir()` pseudo-class and `getComputedStyle(this).direction` for JavaScript access, letting the browser's built-in direction inheritance do the work. Removed redundant `dir` property overrides from individual components, replaced `[dir]` attribute selectors with `:dir()` in stylesheets, and converted physical CSS properties to logical equivalents where applicable.

# [0.1.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/core@0.0.4...@spectrum-web-components/core@0.1.0) (2026-05-12)

### Minor Changes

Refactored size mixin exports and badge type naming for consistency.

**@spectrum-web-components/base (1st-gen)**

- **Added**: New exports `ELEMENT_SIZES` and `DEFAULT_ELEMENT_SIZES` for typed size arrays
- **Deprecated**: `ElementSizes` record is now deprecated in favor of `ELEMENT_SIZES`. The export is preserved for backward compatibility but will be removed in a future major release.

**@spectrum-web-components/core (2nd-gen)**

- **Changed**: Replaced `ElementSizes` record with `ELEMENT_SIZES` const array and `DEFAULT_ELEMENT_SIZES`
- **Changed**: `VALID_SIZES` arrays are now typed as `readonly ElementSize[]` for better type safety
- **Changed**: Badge type exports renamed for consistency:
  - `BADGE_VARIANTS_S2` → `BADGE_VARIANTS`
  - `BADGE_VARIANTS_COLOR_S2` → `BADGE_VARIANTS_COLOR`
  - `BadgeVariantS2` → `BadgeVariant`
  - `BadgeColorVariantS2` → `BadgeColorVariant`

**Breaking**: `<swc-badge>` migration includes new `subtle`/`outline` styles, additional non-semantic color variants, and default behavior updates (`variant="neutral"` and reflected `size="s"` when omitted). `--mod-badge-*` hooks are removed, and `--swc-badge-*` hooks are **not** a strict 1:1 replacement surface for every previous override. See the badge consumer migration guide.

**Breaking**: `<swc-divider>` migration reflects `size="m"` when omitted (visual medium behavior remains unchanged). `--mod-divider-*` hooks are removed, and the new public styling surface (`--swc-divider-thickness`, `--swc-divider-background-color`) is **not** a strict 1:1 replacement for prior size/static-color-specific overrides. See the divider consumer migration guide.

**Breaking**: `<swc-progress-circle>` migration removes the `indeterminate` attribute (omit `progress` or set `progress = null` instead), no longer renders light DOM children as labels (use `label`/`aria-label`), and adds `static-color="black"` support. `--mod-progress-circle-*` hooks are removed, and `--swc-progress-circle-*` hooks are **not** a strict 1:1 replacement for all prior behavior. See the progress circle consumer migration guide.

**Breaking**: `<swc-status-light>` migration removes the deprecated `disabled` attribute, removes the `accent` variant, and updates default behavior (`variant="neutral"` when omitted). `--mod-status-light-*` hooks are removed, and `--swc-status-light-*` hooks are **not** a strict 1:1 replacement for every previous override pattern. `StatusLightSize` is exported from core for typed usage. See the status light consumer migration guide.

**feat(tabs):** Add 2nd-gen tabs (`swc-tabs`, `swc-tab`, `swc-tab-panel`) with Spectrum 2 styling, selection indicator, and WAI-ARIA tabs keyboard behavior. A single side-effect import `@adobe/spectrum-wc/components/tabs/swc-tabs.js` registers all three elements. See `components/tabs/migration.md` for migration from 1st-gen `sp-tabs`.

### Patch Changes

**Refactored**: Overhauled text direction management across the component library. Previously, `SpectrumElement` and `sp-theme` actively managed `dir` by traversing the DOM on connect, setting `dir` attributes on every component, and observing changes via `MutationObserver`. This has been replaced with a passive approach that relies on the native CSS `:dir()` pseudo-class and `getComputedStyle(this).direction` for JavaScript access, letting the browser's built-in direction inheritance do the work. Removed redundant `dir` property overrides from individual components, replaced `[dir]` attribute selectors with `:dir()` in stylesheets, and converted physical CSS properties to logical equivalents where applicable.

## 0.0.4

### Patch Changes

- [#5998](https://github.com/adobe/spectrum-web-components/pull/5998) [`6f5419a`](https://github.com/adobe/spectrum-web-components/commit/6f5419a4de29a1ee440a36c1a57d8c2e1476e2f6) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - **Fixed** missing export for `alert-banner` from `@spectrum-web-components/core`, which could cause build failures in certain environments.

# [0.0.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/core@0.0.3...@spectrum-web-components/core@0.0.4) (2026-02-03)

### Patch Changes

**Fixed** missing export for `alert-banner` from `@spectrum-web-components/core`, which could cause build failures in certain environments.

## 0.0.3

### Patch Changes

- [#5993](https://github.com/adobe/spectrum-web-components/pull/5993) [`95e1c25`](https://github.com/adobe/spectrum-web-components/commit/95e1c25672f62f3723dfa66129ae5ecdeabe578a) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - - **Fixed**: Replaced wildcard exports from `@spectrum-web-components/core` with explicit named exports for better bundler compatibility
  - **Fixed**: Changed build target from ES2022 to ES2018 to support Vitest and other consumer environments
  - **Fixed**: Added `@spectrum-web-components/core` as direct dependency to `@spectrum-web-components/shared` to resolve module resolution issues in strict dependency environments
  - **Fixed**: Added `@lit-labs/observers` as dependency and externalized it in Vite build config

# [0.0.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/core@0.0.2...@spectrum-web-components/core@0.0.3) (2026-02-02)

### Patch Changes

- **Fixed**: Replaced wildcard exports from `@spectrum-web-components/core` with explicit named exports for better bundler compatibility
- **Fixed**: Changed build target from ES2022 to ES2018 to support Vitest and other consumer environments
- **Fixed**: Added `@spectrum-web-components/core` as direct dependency to `@spectrum-web-components/shared` to resolve module resolution issues in strict dependency environments
- **Fixed**: Added `@lit-labs/observers` as dependency and externalized it in Vite build config

## 0.0.2

### Patch Changes

- [#5900](https://github.com/adobe/spectrum-web-components/pull/5900) [`283f0fe`](https://github.com/adobe/spectrum-web-components/commit/283f0fe07533c464e9fe1a3e7edebecb9128e11f) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - Added missing dependencies to the package.json files of several components to align with their usage in source code.

- [#5893](https://github.com/adobe/spectrum-web-components/pull/5893) [`1d76b70`](https://github.com/adobe/spectrum-web-components/commit/1d76b7093d8ff5f9b26f07a69086488341a02650) Thanks [@majornista](https://github.com/majornista)! - hover overlays should close with the Esc key when trigger is not focused

- [#5866](https://github.com/adobe/spectrum-web-components/pull/5866) [`9cb816b`](https://github.com/adobe/spectrum-web-components/commit/9cb816b5ac80387fdc9bb87381f5149fecb1b595) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - - **Fixed**: Added `typesVersions` to `@spectrum-web-components/core` to improve TypeScript module resolution for users with `moduleResolution: "node"`. This provides a fallback mechanism when the `exports` field resolution encounters issues, ensuring type declarations are properly resolved across different TypeScript configurations.

# [0.0.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/core@0.0.1...@spectrum-web-components/core@0.0.2) (2026-01-27)

### Patch Changes

Added missing dependencies to the package.json files of several components to align with their usage in source code.

hover overlays should close with the Esc key when trigger is not focused

- **Fixed**: Added `typesVersions` to `@spectrum-web-components/core` to improve TypeScript module resolution for users with `moduleResolution: "node"`. This provides a fallback mechanism when the `exports` field resolution encounters issues, ensuring type declarations are properly resolved across different TypeScript configurations.
