# The Decision Record — Next-Gen Spectrum Web Components

> Derived from codebase state as of 2026-03-30. Covers **root** and **2nd-gen** only. 1st-gen is excluded.
>
> **Legend:**
>
> - ✅ **Firm** — Implemented and visible in the codebase
> - 🔄 **Flexible** — In place but open to revision
> - ⬜ **OPEN** — No decision found; needs to be made

---

## Planets of Decision

1. [Repository Structure & Organization](#1-repository-structure--organization)
2. [Component Architecture & Design](#2-component-architecture--design)
3. [Design Token Integration](#3-design-token-integration)
4. [Development Experience & Tooling](#4-development-experience--tooling)
5. [Testing Strategy](#5-testing-strategy)
6. [Documentation & Developer Experience](#6-documentation--developer-experience)
7. [Distribution & Packaging](#7-distribution--packaging)
8. [Migration Strategy](#8-migration-strategy)
9. [Performance & Optimization](#9-performance--optimization)
10. [Accessibility & Standards](#10-accessibility--standards)
11. [Integration & Compatibility](#11-integration--compatibility)
12. [Governance & Maintenance](#12-governance--maintenance)
13. [Monitoring & Analytics](#13-monitoring--analytics)

---

## 1. Repository Structure & Organization

### Code Organization

#### ✅ Firm — Monorepo (2026-03-30)

**What:** Single monorepo containing both 1st-gen (legacy) and 2nd-gen workspaces under one repository.
**Impacts on system:** Shared tooling config (ESLint, Prettier, Stylelint, Husky) at root. Yarn workspaces orchestrate builds across generations.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ✅ Firm — Directory Structure (2026-03-30)

**What:** 2nd-gen lives under `2nd-gen/packages/` split into `core/` (abstract base classes, mixins, controllers, utils) and `swc/` (concrete implementations, stories, tests, stylesheets) and `tools/` (tokens CLI, postcss plugin).
**Impacts on system:** Clear separation between framework-agnostic logic (core) and rendered implementation (swc). Teams owning each layer can work independently.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ✅ Firm — Component Grouping (2026-03-30)

**What:** Components are organized alphabetically within `2nd-gen/packages/swc/components/` and `2nd-gen/packages/core/components/`.
**Impacts on system:** Consistent file discovery; each component directory contains implementation, stories, and tests co-located.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ✅ Firm — Shared Utilities Location (2026-03-30)

**What:** Shared helpers, mixins, and base classes live in `2nd-gen/packages/core/` under sub-directories: `element/`, `mixins/`, `controllers/`, `utils/`.
**Impacts on system:** Published as `@spectrum-web-components/core`. `@adobe/spectrum-wc` imports from this package for all shared logic.
**Date:** 2026-03-30 (inferred from codebase)

---

### Package Architecture

#### ✅ Firm — Package Splitting Strategy (2026-03-30)

**What:** Multiple packages — `@spectrum-web-components/core` (base layer) and `@adobe/spectrum-wc` (concrete components). A `tools/` workspace holds private build utilities (tokens CLI, PostCSS plugin).
**Impacts on system:** Consumers can depend on `@adobe/spectrum-wc` for rendered components or `@spectrum-web-components/core` to build alternative implementations.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ✅ Firm — Package Naming Convention (2026-03-30)

**What:** Scoped packages. Core: `@spectrum-web-components/core`. Implementation: `@adobe/spectrum-wc`.
**Impacts on system:** Both scopes publish to the public NPM registry. Adobe's `@adobe` namespace used for the consumer-facing package.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ✅ Firm — Versioning Strategy (2026-03-30)

**What:** Changesets-managed versioning with `@adobe/spectrum-wc` and `@spectrum-web-components/core` linked (they always version together). Snapshot releases available for PR testing via `snapshot-release` PR label.
**Impacts on system:** Prevents version drift between core and implementation. CI publishes on push to `main`; snapshots tagged `snapshot-test` for PR previews.
**Date:** 2026-03-30 (inferred from `.changeset/config.json`)

---

## 2. Component Architecture & Design

### Component Structure

#### ✅ Firm — Base Component Pattern (2026-03-30)

**What:** Two-layer architecture. Abstract base classes (e.g., `BadgeBase`) in `@spectrum-web-components/core` contain properties, attributes, validation, and lifecycle logic. Concrete classes in `@adobe/spectrum-wc` extend base classes to add rendering (Lit templates) and styles.
**Impacts on system:** Supports multiple visual implementations of the same logical component. Base classes cannot be instantiated directly.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ✅ Firm — Props/Attributes Design (2026-03-30)

**What:** Lit `@property()` decorator with `reflect: true` for attributes that must be CSS-queryable or exposed to HTML. Properties that are internal state or complex objects are not reflected.
**Impacts on system:** Attributes mirror properties for styling hooks (`:host([variant="accent"])`). Boolean attributes follow web standard conventions.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ⬜ OPEN — Event Naming Conventions

No documented convention found for custom event prefixes, bubbling strategy, or event naming patterns in the 2nd-gen codebase.

---

#### ✅ Firm — Slot Strategy (2026-03-30)

**What:** Named slots for specific content (e.g., `<slot name="icon">`), default slot for primary content. Slot presence is tracked via `ObserveSlotPresence` and `ObserveSlotText` mixins so components can conditionally alter layout/style.
**Impacts on system:** Components react to slotted content changes without consumer intervention.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ✅ Firm — CSS Custom Properties Approach (2026-03-30)

**What:** Components expose theming hooks using `--swc-{component}-{property}` naming (e.g., `--swc-badge-background-color`). Internal private variables prefixed with `--_swc-`. Size variants use suffix modifiers (`--swc-badge-height` driven by `[size="s"]` host attribute).
**Impacts on system:** Consumers can override any exposed property without reaching into shadow DOM. Internal variables are not part of the public API.
**Date:** 2026-03-30 (inferred from component CSS files)

---

#### ✅ Firm — Shadow DOM Strategy (2026-03-30)

**What:** Open shadow DOM (LitElement default). `shadowRoot` is accessed directly for focus management across shadow boundaries.
**Impacts on system:** External tools and tests can access shadow internals. Required for `SpectrumMixin` focus visibility tracking.
**Date:** 2026-03-30 (inferred from `spectrum-element.ts`)

---

### Component API Design

#### ✅ Firm — Prop Validation (2026-03-30)

**What:** Runtime validation in `update()` lifecycle via `window.__swc.warn()` for invalid attribute values (e.g., unknown `variant`). TypeScript union types enforce valid values at compile time.
**Impacts on system:** Developers get console warnings in development for misconfigured components; TypeScript catches errors at authoring time.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ✅ Firm — Default Values Strategy (2026-03-30)

**What:** Default property values defined inline on class property declarations (e.g., `public variant: BadgeVariant = 'informative'`).
**Impacts on system:** Defaults are always set; consumers only need to pass non-default values.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ✅ Firm — Reactive Property Patterns (2026-03-30)

**What:** All properties that trigger re-renders are decorated with `@property()` or `@state()` from `lit/decorators.js`. Properties in base classes use `@property()`; ephemeral internal state uses `@state()`.
**Impacts on system:** Lit schedules efficient batch updates; only changed properties cause re-renders.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ⬜ OPEN — Method Exposure

No documented policy found for which internal component methods (if any) are part of the public API vs. internal implementation details.

---

#### ✅ Firm — Lifecycle Management (2026-03-30)

**What:** Lit lifecycle hooks (`update`, `updated`, `connectedCallback`, `disconnectedCallback`) used consistently. Base classes override lifecycle methods and call `super` to chain behavior.
**Impacts on system:** Predictable lifecycle; mixins and base classes compose without lifecycle conflicts.
**Date:** 2026-03-30 (inferred from codebase)

---

### State Management

#### ✅ Firm — Internal State Patterns (2026-03-30)

**What:** Components manage their own state via Lit reactive properties (`@state()` for private, `@property()` for public). No external state library.
**Impacts on system:** Components are self-contained; no dependency on React state, Redux, or similar.
**Date:** 2026-03-30 (inferred from codebase)

---

#### ⬜ OPEN — Cross-Component Communication

No pattern established for how components communicate with each other (event buses, context providers, or external state). Needs a decision before building composite/compound components.

---

#### ⬜ OPEN — Form Integration

No decision found on how form components (inputs, checkboxes, selects) integrate with native HTML form behavior (ElementInternals / form-associated custom elements).

---

#### ✅ Firm — Data Binding Patterns (2026-03-30)

**What:** One-way data binding following Lit's unidirectional model. Parent passes data down via properties/attributes; components communicate up via custom events.
**Impacts on system:** Consistent with standard web component and Lit patterns; no two-way binding complexity.
**Date:** 2026-03-30 (inferred from Lit usage patterns)

---

## 3. Design Token Integration

### Token Implementation

#### ✅ Firm — Token Consumption Method (2026-03-30)

**What:** CSS custom properties consumed via a `token()` function syntax in component CSS files, processed at build time by the `@adobe/postcss-token` PostCSS plugin. Output is standard CSS custom property references.
**Impacts on system:** Token names are resolved at build time; runtime CSS reflects actual CSS variable values. Authoring uses semantic `token("accent-background-color-default")` instead of raw variable names.
**Date:** 2026-03-30 (inferred from PostCSS config and component CSS)

---

#### ⬜ OPEN — Token Updating Strategy

No documented process for how components stay in sync when the token library updates (e.g., automated CI check, manual update script, or token subscription pattern).

---

#### ⬜ OPEN — Runtime Theming

No decision found on whether dynamic theme switching (light/dark, brand overrides) at runtime is supported, and if so, how it is implemented.

---

#### 🔄 Flexible — Token Validation (2026-03-30)

**What:** Stylelint enforces design token usage for color, background, font properties via `stylelint-declaration-strict-value` at **warning** level (not error).
**Impacts on system:** Developers are warned but not blocked when bypassing tokens. Warning level may be promoted to error as the system matures.
**Date:** 2026-03-30 (inferred from Stylelint config)

---

#### ⬜ OPEN — Fallback Strategies

No documented behavior for what happens when a design token is missing or invalid at runtime.

---

### Theming Architecture

#### ⬜ OPEN — Theme Structure

No decision found on how light/dark/brand themes are organized, structured, or loaded.

---

#### ✅ Firm — Component-Specific Tokens (2026-03-30)

**What:** Each component exposes its own CSS custom property surface using `--swc-{component}-{property}` naming. These are distinct from global design tokens and allow per-component overrides.
**Impacts on system:** Consumers can target a single component's appearance without affecting others.
**Date:** 2026-03-30 (inferred from component CSS files)

---

#### ⬜ OPEN — Token Inheritance

No decision found on how child components inherit parent theme context (e.g., via CSS cascade, CSS custom property inheritance, or a context controller).

---

#### ✅ Firm — CSS Custom Property Naming (2026-03-30)

**What:** Public: `--swc-{component}-{property}` (e.g., `--swc-badge-background-color`). Private/internal: `--_swc-{component}-{property}`. Size-variant suffixes appended where applicable.
**Impacts on system:** Consistent, discoverable property names. Leading underscore signals "not part of public API."
**Date:** 2026-03-30 (inferred from component CSS and Stylelint config)

---

## 4. Development Experience & Tooling

### Build System

#### ✅ Firm — Build Tool (2026-03-30)

**What:** Vite 7 in library mode with ES module output and `preserveModules: true`. Both `core` and `swc` packages use `vite build`. Entry points are discovered dynamically via filesystem glob patterns.
**Impacts on system:** Fast builds, native ESM output, no CommonJS or UMD artifacts. Each module file is preserved in output for optimal tree shaking.
**Date:** 2026-03-30 (inferred from `vite.config.js/ts` in both packages)

---

#### ✅ Firm — TypeScript Configuration (2026-03-30)

**What:** Strict mode enabled. Target: ES2018. Module: ESNext, `moduleResolution: bundler`. Experimental decorators enabled. `useDefineForClassFields: false` (required for Lit property decorators). Project references used for cross-package type checking.
**Impacts on system:** Maximum type safety. Decorator syntax required for Lit `@property()` and `@state()` works correctly with `useDefineForClassFields: false`.
**Date:** 2026-03-30 (inferred from `tsconfig.base.json`)

---

#### ✅ Firm — CSS Processing (2026-03-30)

**What:** PostCSS with `@adobe/postcss-token` (design token resolution), `autoprefixer`, and `postcss-preset-env` (limited feature set). `vite-plugin-lit-css` injects component CSS into Lit `CSSResultArray`.
**Impacts on system:** Token function syntax processed at build time. Standard CSS custom properties in output. Autoprefixer handles vendor prefixes automatically.
**Date:** 2026-03-30 (inferred from Vite/PostCSS config)

---

#### ✅ Firm — Bundle Splitting (2026-03-30)

**What:** `preserveModules: true` in Vite library config. Each source file becomes its own output module. No single bundled file.
**Impacts on system:** Consumers import only what they use; bundlers can tree-shake effectively. No `index.js` megabundle.
**Date:** 2026-03-30 (inferred from `vite.config.js`)

---

#### ✅ Firm — Source Maps (2026-03-30)

**What:** Source maps generated and included in package output.
**Impacts on system:** Consumers get meaningful stack traces pointing to original TypeScript source.
**Date:** 2026-03-30 (inferred from Vite config)

---

### Development Environment

#### ✅ Firm — Local Development Setup (2026-03-30)

**What:** Storybook dev server (via `@storybook/web-components-vite`) used as the primary local development environment. Hot module replacement provided by Vite.
**Impacts on system:** No separate dev server needed; Storybook serves as the component development playground.
**Date:** 2026-03-30 (inferred from Storybook config)

---

#### ✅ Firm — Storybook Integration (2026-03-30)

**What:** Storybook 10 with `@storybook/web-components-vite` framework. Three modes: `dev` (full local with guides and test stories), `build` (production docs excluding test stories), `ci-a11y` (minimal, component-only for CI accessibility checks). Addons: docs, a11y, designs (Figma), Vitest integration.
**Impacts on system:** Single tool serves development, documentation, and testing.
**Date:** 2026-03-30 (inferred from `.storybook/main.ts`)

---

#### ✅ Firm — Playground/Sandbox (2026-03-30)

**What:** Storybook serves as the interactive component sandbox. Stories include controls auto-generated from the Custom Elements Manifest.
**Impacts on system:** No separate sandbox environment needed.
**Date:** 2026-03-30 (inferred from Storybook + `getStorybookHelpers` usage)

---

#### ✅ Firm — TypeScript Tooling (2026-03-30)

**What:** `vite-plugin-dts` generates `.d.ts` type declaration files alongside build output. Custom Elements Manifest (`cem.config.js` + `@custom-elements-manifest/analyzer`) generates `custom-elements.json` for Storybook and external tooling.
**Impacts on system:** Full IDE type support for consumers. Storybook auto-generates controls from CEM.
**Date:** 2026-03-30 (inferred from build configs)

---

### Code Quality

#### ✅ Firm — Linting Configuration (2026-03-30)

**What:** ESLint 9 flat config (`eslint.config.js`) with plugins: `@typescript-eslint`, `eslint-plugin-lit`, `eslint-plugin-lit-a11y`, `eslint-plugin-wc`, `eslint-plugin-jsdoc`, `eslint-plugin-import`, `simple-import-sort`, `eslint-plugin-jsonc`, `eslint-plugin-storybook`, `@spectrum-web-components/eslint-plugin` (custom). Stylelint 17 for CSS with `stylelint-order`, `stylelint-declaration-strict-value`, and a custom license header plugin.
**Impacts on system:** Accessibility violations caught at lint time. Import order enforced automatically. CSS property ordering enforced.
**Date:** 2026-03-30 (inferred from lint configs)

---

#### ✅ Firm — Pre-commit Hooks (2026-03-30)

**What:** Husky 9 + lint-staged. Runs ESLint, Stylelint, and Prettier on staged files before each commit.
**Impacts on system:** No malformatted or lint-failing code reaches the repository.
**Date:** 2026-03-30 (inferred from `package.json` devDependencies and Husky config)

---

#### ✅ Firm — Code Formatting (2026-03-30)

**What:** Prettier 3 with: `printWidth: 80`, `tabWidth: 2`, `semi: true`, `singleQuote: true`, `trailingComma: es5`. CSS files use `printWidth: 500` (managed by Stylelint instead).
**Impacts on system:** Consistent code style across all TypeScript, HTML, and JSON files. CSS formatting deferred to Stylelint.
**Date:** 2026-03-30 (inferred from Prettier config)

---

#### ✅ Firm — Import Organization (2026-03-30)

**What:** `simple-import-sort` ESLint plugin enforces consistent import order. `eslint-plugin-import` prevents duplicate imports and enforces module resolution.
**Impacts on system:** Imports are auto-sorted on save/lint-fix; no manual import ordering needed.
**Date:** 2026-03-30 (inferred from ESLint config)

---

## 5. Testing Strategy

### Testing Levels

#### ✅ Firm — Unit/Integration Testing Framework (2026-03-30)

**What:** Vitest 4 with `@storybook/addon-vitest`. Component tests are written as Storybook `play` functions in `.test.ts` story files. Tests run in a real browser context via Playwright.
**Impacts on system:** No jsdom; tests run against actual browser rendering. Stories double as both documentation and test cases.
**Date:** 2026-03-30 (inferred from `vitest.config.js` and test file patterns)

---

#### ✅ Firm — Visual Regression Testing (2026-03-30)

**What:** Chromatic VRT configured via `.github/workflows/chromatic-vrt.yml`.
**Impacts on system:** Screenshot comparisons run in CI against Storybook stories. Catches unintended visual regressions.
**Date:** 2026-03-30 (inferred from CI workflows)

---

#### ✅ Firm — End-to-End / Accessibility Testing (2026-03-30)

**What:** Playwright with `@axe-core/playwright` for accessibility tests. A11y tests live in `test/<component>.a11y.spec.ts`. CI runs a dedicated `ci-a11y` Storybook mode.
**Impacts on system:** Automated WCAG violation detection integrated into CI pipeline.
**Date:** 2026-03-30 (inferred from test file patterns and CI config)

---

#### ✅ Firm — Performance Testing (2026-03-30)

**What:** Tachometer benchmarks run in CI via `browser-tests.yml` (manual trigger). Compares against the latest published release across Firefox and Chrome.
**Impacts on system:** Performance regressions are detectable before merge, but the trigger is manual rather than automatic on every PR.
**Date:** 2026-03-30 (inferred from `.github/workflows/browser-tests.yml`)

---

### Testing Infrastructure

#### ✅ Firm — Test Environment (2026-03-30)

**What:** Real browser testing via `@vitest/browser-playwright`. Supported browsers: Chromium (default), Firefox, WebKit. Configurable via `VITEST_BROWSER_INSTANCES` environment variable.
**Impacts on system:** No jsdom approximations; tests reflect real browser behavior including shadow DOM.
**Date:** 2026-03-30 (inferred from `vitest.config.js`)

---

#### ⬜ OPEN — Mock Strategies

No documented convention for mocking external dependencies, APIs, or inter-component dependencies in tests.

---

#### ⬜ OPEN — Test Data Management

No documented pattern for test fixtures, factories, or shared test data.

---

#### ✅ Firm — Accessibility Testing (2026-03-30)

**What:** `@axe-core/playwright` runs automated a11y checks in `.a11y.spec.ts` test files. Storybook `@storybook/addon-a11y` provides in-browser a11y panel during development.
**Impacts on system:** Dual layer: authoring-time feedback in Storybook; CI-enforced axe checks in automated tests.
**Date:** 2026-03-30 (inferred from test config and Storybook addons)

---

#### ✅ Firm — Cross-Browser Testing (2026-03-30)

**What:** Chromium, Firefox, and WebKit via Playwright. Browser matrix configurable per run.
**Impacts on system:** Coverage across all major browser engines without requiring physical browsers in CI.
**Date:** 2026-03-30 (inferred from `vitest.config.js`)

---

### Testing Patterns

#### ✅ Firm — Component Testing Patterns (2026-03-30)

**What:** Storybook play functions with `@storybook/test` utilities (userEvent, expect). Tests co-located with stories in `components/<name>/test/<name>.test.ts`.
**Impacts on system:** Tests exercise the full rendered component in browser context. Story + test separation keeps documentation stories clean.
**Date:** 2026-03-30 (inferred from file structure and test files)

---

#### ⬜ OPEN — Event Testing

No documented pattern for how to test custom events (dispatch, payload, bubbling) in the 2nd-gen test suite.

---

#### ✅ Firm — Coverage Thresholds (2026-03-30)

**What:** 98% line/function/statement coverage required for SWC components and Core components. 70% for infrastructure (controllers, element base, mixins, utils). Thresholds auto-ratchet upward as coverage improves.
**Impacts on system:** High bar enforced automatically; cannot regress coverage without a deliberate threshold change.
**Date:** 2026-03-30 (inferred from `vitest.config.js`)

---

## 6. Documentation & Developer Experience

### Documentation Strategy

#### ✅ Firm — Documentation Site (2026-03-30)

**What:** Storybook is the primary documentation site. Component markdown files are also served as static docs (see `serve-component-docs` script). Storybook build mode excludes dev-only stories.
**Impacts on system:** No separate static site generator (e.g., Docusaurus, VitePress) needed; Storybook is the single source of truth for component docs.
**Date:** 2026-03-30 (inferred from Storybook config and CI workflow `publish-2ndgen-docs.yml`)

---

#### ✅ Firm — API Documentation (2026-03-30)

**What:** Auto-generated from TypeScript and JSDoc via `@custom-elements-manifest/analyzer` (`cem.config.js`). Output: `.storybook/custom-elements.json`. Storybook `getStorybookHelpers` consumes CEM to auto-generate story controls and argTypes.
**Impacts on system:** API docs stay in sync with code; no manual API documentation needed.
**Date:** 2026-03-30 (inferred from `cem.config.js` and Storybook helpers)

---

#### ✅ Firm — Usage Examples (2026-03-30)

**What:** Storybook stories (`<component>.stories.ts`) serve as interactive usage examples with live controls. Stories cover default, variant, and edge case states.
**Impacts on system:** Examples are always accurate because they render the actual component.
**Date:** 2026-03-30 (inferred from story file patterns)

---

#### ⬜ OPEN — Migration Guides (Consumer-Facing)

No consumer-facing migration guide found for teams moving from 1st-gen components to 2nd-gen equivalents. (Note: The washing machine guide exists for contributor workflow only, not for consumers.)

---

#### ✅ Firm — Contribution Guidelines (2026-03-30)

**What:** `CONTRIBUTOR-DOCS/` directory contains contributor guides (setup, workflow, testing), style guides (TypeScript, Storybook automation), and project planning docs.
**Impacts on system:** Internal contributor onboarding documented. Defines code standards and workflow expectations.
**Date:** 2026-03-30 (inferred from repo structure)

---

#### ⬜ OPEN — Component Status Indicators

No system found for indicating component status (stable, experimental, deprecated) to consumers in the 2nd-gen ecosystem.

---

### Developer Resources

#### ⬜ OPEN — Design Guidelines (When/How to Use Each Component)

No consumer-facing design usage guidelines found linking components to UX decision criteria.

---

#### ⬜ OPEN — Troubleshooting Guides

No troubleshooting documentation found for common issues consumers might encounter.

---

## 7. Distribution & Packaging

### Package Distribution

#### ✅ Firm — Registry (2026-03-30)

**What:** Public NPM registry (`https://registry.npmjs.org/`) for both `@adobe/spectrum-wc` and `@spectrum-web-components/core`. Both packages have `publishConfig.access: "public"`.
**Impacts on system:** No private registry infrastructure needed. Any consumer can install without special registry configuration.
**Date:** 2026-03-30 (inferred from `package.json` and `.npmrc`)

---

#### ✅ Firm — Package Formats (2026-03-30)

**What:** ESM only. No CommonJS or UMD output. Vite library mode outputs ES modules with `preserveModules`.
**Impacts on system:** Consumers must use a bundler that supports ESM (Vite, webpack 5, Rollup, esbuild). No direct `<script>` tag usage without a bundler or importmap.
**Date:** 2026-03-30 (inferred from Vite config)

---

#### ⬜ OPEN — CDN Strategy

No decision found on CDN distribution (unpkg, jsDelivr, or a custom CDN endpoint).

---

#### ⬜ OPEN — Asset Handling

No decision found on how CSS stylesheets, fonts, and icons are distributed alongside JavaScript packages.

---

#### ✅ Firm — Tree Shaking (2026-03-30)

**What:** `preserveModules: true` and ESM output ensure packages are fully tree-shakeable. Each component is its own module file.
**Impacts on system:** Consumers pay only for components they import.
**Date:** 2026-03-30 (inferred from Vite config)

---

### Release Strategy

#### ✅ Firm — Release Cadence (2026-03-30)

**What:** Releases triggered by: (1) push to `main` branch, (2) manual workflow dispatch, or (3) PRs labeled `snapshot-release` (for snapshot pre-releases). No fixed schedule.
**Impacts on system:** Continuous delivery model. Teams can get snapshot releases during development via PR label.
**Date:** 2026-03-30 (inferred from `.github/workflows/publish.yml`)

---

#### ✅ Firm — Versioning Scheme (2026-03-30)

**What:** Semantic versioning via Changesets. `@adobe/spectrum-wc` and `@spectrum-web-components/core` are linked (version together). Snapshot releases use `{tag}.{datetime}` template.
**Impacts on system:** Breaking changes require major bumps via Changesets. Consumers can subscribe to stable releases or test snapshots.
**Date:** 2026-03-30 (inferred from `.changeset/config.json`)

---

#### ✅ Firm — Release Notes (2026-03-30)

**What:** Automated via `@changesets/changelog-github`. Contributors add changesets files; GitHub generates formatted release notes from them.
**Impacts on system:** Release notes are linked to PRs and authors automatically.
**Date:** 2026-03-30 (inferred from `.changeset/config.json`)

---

#### ✅ Firm — Beta/Alpha/Snapshot Releases (2026-03-30)

**What:** Snapshot releases published with `snapshot-test` or `snapshot` tag on NPM when PRs are labeled `snapshot-release`. Calculated version used (no manual version bumps for snapshots).
**Impacts on system:** Teams can test unreleased changes from a real NPM package without waiting for a stable release.
**Date:** 2026-03-30 (inferred from `.changeset/config.json` and CI workflow)

---

#### ⬜ OPEN — Deprecation Strategy

No documented process for how 2nd-gen components or APIs will be deprecated and removed.

---

### Browser Support

#### ✅ Firm — Target Browsers (2026-03-30)

**What:** Last 2 versions of Chrome, Firefox, Edge, Safari, and iOS Safari. No IE 11 support.
**Impacts on system:** Modern browser APIs (Custom Elements, Shadow DOM, CSS custom properties) available without polyfills. ES2018 target aligns with this support matrix.
**Date:** 2026-03-30 (inferred from `.browserslistrc`)

---

#### ⬜ OPEN — Polyfill Strategy

No documented stance on whether any polyfills are shipped, recommended, or the consumer's responsibility.

---

#### ⬜ OPEN — Progressive Enhancement

No documented fallback strategy for browsers that partially support required APIs.

---

#### ⬜ OPEN — Bundle Size Targets

No explicit maximum bundle size targets defined. Coverage thresholds exist (98%) but no KB/size budget per component.

---

## 8. Migration Strategy

### Migration Planning

#### ⬜ OPEN — Migration Timeline

No phased migration plan or timeline defined for consumer teams moving from 1st-gen to 2nd-gen components.

---

#### ⬜ OPEN — Compatibility Layers

No decision on whether temporary compatibility bridges (e.g., alias packages, shim components) will be provided for consumers during migration.

---

#### ⬜ OPEN — Component Mapping

No documented one-to-one mapping between 1st-gen components and their 2nd-gen equivalents.

---

#### ⬜ OPEN — Breaking Changes Policy (Consumer-Facing)

No documented policy for how unavoidable breaking changes in 2nd-gen will be communicated to and handled by consumer teams.

---

#### ⬜ OPEN — Migration Tooling

No codemods or automated migration scripts found for 1st-gen → 2nd-gen migration.

---

### Transition Support

#### ✅ Firm — Dual System Support (2026-03-30)

**What:** 1st-gen and 2nd-gen coexist in the same monorepo as separate Yarn workspaces. They are independently buildable and publishable.
**Impacts on system:** No forced cutover; teams can adopt 2nd-gen incrementally while 1st-gen remains functional.
**Date:** 2026-03-30 (inferred from monorepo structure)

---

#### ⬜ OPEN — Consumer Migration Documentation

No consumer-facing step-by-step migration guide found. (Washing machine guide is for contributors building 2nd-gen components, not for teams consuming them.)

---

#### ⬜ OPEN — Support Channels During Migration

No documented support channel, escalation path, or office hours defined for consumer teams migrating to 2nd-gen.

---

#### ⬜ OPEN — Old Component Sunset Timeline

No timeline defined for when 1st-gen components will be deprecated and removed.

---

## 9. Performance & Optimization

### Runtime Performance

#### ✅ Firm — Bundle Size Optimization (2026-03-30)

**What:** `preserveModules: true` + ESM-only output + tree-shaking-safe package structure. No dead code shipped; each component is independently importable.
**Impacts on system:** Consumers bundle only what they use. No shared bundle bloat.
**Date:** 2026-03-30 (inferred from Vite config)

---

#### ⬜ OPEN — Loading Strategy

No decision found on lazy loading, preloading, or critical-path optimization guidance for consumers.

---

#### ✅ Firm — Rendering Performance (2026-03-30)

**What:** Lit's templating system with direct DOM manipulation (no virtual DOM diffing). Lit schedules batch updates via microtask queue; only changed properties trigger re-renders.
**Impacts on system:** Efficient rendering without the overhead of virtual DOM libraries.
**Date:** 2026-03-30 (inferred from Lit framework choice)

---

#### ⬜ OPEN — Memory Management

No documented patterns for preventing memory leaks (e.g., event listener cleanup in `disconnectedCallback`).

---

#### ⬜ OPEN — Animation Performance

No documented policy on CSS vs JavaScript animations or `will-change` usage in components.

---

### Build Performance

#### ✅ Firm — Build Speed Optimization (2026-03-30)

**What:** Vite provides fast incremental builds with native ESM dev serving and esbuild-based transpilation. Yarn caches at `~/.cache/yarn`.
**Impacts on system:** Developer feedback loop is fast. No Webpack-style slow full rebuilds.
**Date:** 2026-03-30 (inferred from Vite + Yarn config)

---

#### ⬜ OPEN — CI/CD Build Optimization

No explicit CI caching strategy found for build artifacts, node_modules, or Yarn cache in GitHub Actions workflows.

---

## 10. Accessibility & Standards

### Accessibility Strategy

#### ⬜ OPEN — WCAG Compliance Level

No explicit WCAG compliance target (AA vs AAA) documented. Axe-core tests run but the target conformance level is not declared.

---

#### ✅ Firm — Keyboard Navigation (2026-03-30)

**What:** `SpectrumMixin` tracks focus visibility across shadow DOM boundaries. `hasVisibleFocusInTree()` method enables components to show/hide focus rings based on keyboard vs. pointer input.
**Impacts on system:** Consistent focus ring behavior across all components without per-component implementation.
**Date:** 2026-03-30 (inferred from `spectrum-element.ts` and `SpectrumMixin`)

---

#### ✅ Firm — Screen Reader Support (2026-03-30)

**What:** `eslint-plugin-lit-a11y` enforces ARIA attributes at lint time. `@axe-core/playwright` catches violations in CI. `aria-query` library used for ARIA role validation.
**Impacts on system:** Screen reader support is enforced at both authoring time (lint) and CI (axe tests), not just aspirationally.
**Date:** 2026-03-30 (inferred from ESLint config and test setup)

---

#### ⬜ OPEN — Color Contrast Policy

Design tokens are used for color, but no explicit contrast ratio enforcement policy found (e.g., automated contrast checks in CI or Stylelint rules).

---

#### ⬜ OPEN — Motion Preferences

No documented policy or implementation for `prefers-reduced-motion` media query support in components.

---

### Web Standards

#### ✅ Firm — HTML Semantics (2026-03-30)

**What:** Standard semantic HTML used in Lit render templates. `eslint-plugin-lit-a11y` and `eslint-plugin-wc` enforce semantic correctness.
**Impacts on system:** Components produce accessible, semantic markup inside shadow DOM.
**Date:** 2026-03-30 (inferred from ESLint plugins and component templates)

---

#### ✅ Firm — CSS Standards (2026-03-30)

**What:** Modern CSS with `postcss-preset-env` (limited feature set). Autoprefixer handles vendor prefixes. Stylelint 17 with standard config enforces CSS quality.
**Impacts on system:** CSS is standards-compliant and vendor-prefix-clean automatically.
**Date:** 2026-03-30 (inferred from PostCSS and Stylelint config)

---

#### ✅ Firm — JavaScript Standards (2026-03-30)

**What:** ES2018 target (TypeScript `compilerOptions.target`). ESNext modules. Aligns with last-2-versions browser support matrix.
**Impacts on system:** Modern JS syntax available; no legacy transpilation overhead.
**Date:** 2026-03-30 (inferred from `tsconfig.base.json`)

---

#### ✅ Firm — Web Platform APIs (2026-03-30)

**What:** Custom Elements v1, Shadow DOM (open), HTML Slots, CSS Custom Properties. No polyfills shipped by the library; browser support matrix (last 2 versions) ensures native API availability.
**Impacts on system:** Components are standards-based and framework-agnostic.
**Date:** 2026-03-30 (inferred from Lit usage and browser target)

---

## 11. Integration & Compatibility

### Framework Integration

#### ⬜ OPEN — React Integration

No decision found on whether React wrapper components will be provided, auto-generated, or left to consumers.

---

#### ⬜ OPEN — Vue Integration

No decision found on Vue plugin development or SSR considerations.

---

#### ⬜ OPEN — Angular Integration

No decision found on Angular custom elements schema or change detection compatibility.

---

#### ✅ Firm — Vanilla JavaScript Usage (2026-03-30)

**What:** Components are standard Custom Elements and work without any framework. Import the component module; call `defineElement()` or use auto-registration.
**Impacts on system:** Zero framework dependency for basic usage.
**Date:** 2026-03-30 (inferred from component architecture)

---

#### ⬜ OPEN — Server-Side Rendering (SSR)

No decision found on SSR support strategy (Declarative Shadow DOM, SSR-compatible Lit, or explicit "client-only" stance).

---

### Platform Compatibility

#### ⬜ OPEN — Mobile Considerations

No documented policy on touch interaction patterns, viewport handling, or mobile-specific component behavior.

---

#### ⬜ OPEN — Content Security Policy (CSP)

No documented CSP compliance strategy for component styles (injected via Lit's `adoptedStyleSheets` or `<style>` tags in shadow DOM).

---

## 12. Governance & Maintenance

### Project Governance

#### ⬜ OPEN — Maintainer Structure

No documented core team structure, decision-making authority, or community contributor roles for the 2nd-gen system.

---

#### ⬜ OPEN — RFC Process

No documented process for proposing and approving major architectural changes to the 2nd-gen system.

---

#### ⬜ OPEN — Breaking Change Policy

No documented policy defining when breaking changes are permitted and what process governs them (beyond Changesets tracking them).

---

#### ⬜ OPEN — Component Lifecycle Stages

No formal lifecycle stage system found (e.g., proposal → development → stable → deprecated → removed) with associated criteria for each stage.

---

#### ✅ Firm — Contribution Standards (2026-03-30)

**What:** PR template requires conventional commit format, linked Jira ticket, accessibility testing (keyboard + screen reader), VRT sign-off, and cross-device/browser validation. Changesets required for publishable changes.
**Impacts on system:** Consistent quality bar enforced at PR level before merge.
**Date:** 2026-03-30 (inferred from `.github/PULL_REQUEST_TEMPLATE.md`)

---

### Long-term Maintenance

#### ⬜ OPEN — Security Update Process

No documented process for handling security vulnerabilities in components or dependencies.

---

#### ✅ Firm — Dependency Management (2026-03-30)

**What:** Yarn 4 workspaces with lockfile. Husky hooks prevent committing code that fails lint/format checks. Node >= 24.11.1 and Yarn >= 4.6.0 required.
**Impacts on system:** Dependency versions are locked and consistent across environments. Upgrading requires deliberate lockfile update.
**Date:** 2026-03-30 (inferred from `.yarnrc.yml` and `package.json` engines)

---

#### ⬜ OPEN — Technical Debt Process

No documented cadence or process for refactoring, addressing tech debt, or improving the 2nd-gen codebase over time.

---

### Quality Assurance

#### ✅ Firm — Code Review Requirements (2026-03-30)

**What:** PR template defines a contributor and reviewer checklist covering: conventional commits, changesets, a11y testing, VRT, multi-device/browser testing, and Jira ticket linkage.
**Impacts on system:** Reviewers have a structured checklist; nothing merges without explicit sign-off on a11y and visual regression.
**Date:** 2026-03-30 (inferred from PR template)

---

#### ⬜ OPEN — Design Review Process

No documented process for ensuring 2nd-gen components match design specs before release.

---

#### ⬜ OPEN — Bug Triage Process

No documented process for how bugs are prioritized, assigned, or tracked for the 2nd-gen system.

---

#### ⬜ OPEN — Feature Request Process

No documented process for how new component proposals or API changes are evaluated and scheduled.

---

## 13. Monitoring & Analytics

#### ⬜ OPEN — Adoption Metrics

No system found for tracking which 2nd-gen components are most/least used across consumer teams.

---

#### ⬜ OPEN — Real-World Performance Monitoring

No instrumentation found for collecting real-world component performance data from production.

---

#### ⬜ OPEN — Error Tracking

No runtime error tracking configured for component failures in production.

---

#### ⬜ OPEN — Bundle Analysis (Production)

No tooling found for analyzing actual bundle sizes in consumer production builds.

---

#### ⬜ OPEN — Feedback Channels

No documented channel (GitHub Discussions, Slack, surveys) specifically designated for 2nd-gen consumer feedback.

---

#### ⬜ OPEN — Developer Satisfaction / Success Metrics

No defined metrics for measuring developer experience, adoption rate, or productivity impact of the 2nd-gen system.

---

*Generated from codebase state on 2026-03-30. All ✅ Firm decisions are inferred from the current state of the `root` and `2nd-gen` directories. All ⬜ OPEN items represent decisions with no visible implementation or documentation in the codebase.*
