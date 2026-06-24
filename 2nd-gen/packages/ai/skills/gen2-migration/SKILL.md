---
name: 'migrate-swc-gen1-to-gen2'
description: 'Upgrade Spectrum 1 (sp-* elements, @spectrum-web-components/*) to Spectrum 2 (swc-* elements, @adobe/spectrum-wc). Use when developers need to migrate from Spectrum 1 to Spectrum 2 web components, or when they mention @spectrum-web-components, sp-* elements, or Spectrum 1.'
license: 'Apache-2.0'
kind: 'migration'
metadata:
  author: 'Adobe'
  website: 'https://spectrum-web-components.adobe.com'
---

# Spectrum 1 → Spectrum 2 migration

Upgrade `sp-*` Spectrum 1 components (`@spectrum-web-components/*`) to
`swc-*` Spectrum 2 components (`@adobe/spectrum-wc`).

**You do not have to migrate everything at once.** Gen 1 and Gen 2 coexist in
the same app — `<sp-badge>` and `<swc-badge>` are independent custom elements.
Migrate one component (or one screen) at a time.

## TL;DR

1. Install `@adobe/spectrum-wc` alongside your existing `@spectrum-web-components/*` packages.
2. Switch Gen 1 to the `spectrum-two` theme so it aligns visually with Gen 2.
3. Add the Gen 2 stylesheet and `swc-theme` classes to your application root.
4. Load Adobe Clean Spectrum VF (the Spectrum 2 font).
5. Replace `<sp-*>` elements with `<swc-*>` one component at a time, following
   each component's migration guide.
6. Once no `<sp-*>` elements remain, remove Gen 1 packages, theme imports, and
   `<sp-theme>`.

For the full coexistence walkthrough — including font setup, `--mod-*` → `--swc-*`
CSS mapping, and decommissioning Gen 1 — read
[Migrate from Gen1](references/guides/migrate-from-gen1.md) first.

## Scope

This skill covers the Spectrum 1 → Spectrum 2 migration only. Do **not** perform
major framework upgrades (e.g. React version bumps) as part of this migration;
note them as recommended follow-ups in the final report instead.

## Step 1 — Read the overarching migration guide

Before starting, read [Migrate from Gen1](references/guides/migrate-from-gen1.md).
It covers the coexistence model, theme bridging, font loading, CSS namespace
changes, and decommissioning. Understanding this context prevents common mistakes.

## Step 2 — Identify what is being migrated

- Search package manifests for `@spectrum-web-components/*` dependencies.
- Note the package manager (npm / yarn / pnpm) from the lockfile.
- Find app entrypoints, root providers, and any `<sp-theme>` usages.
- Check each `sp-*` component against the list of available migration guides below.
  Components without a guide are still Gen 1 only — keep them installed.

## Step 3 — Install Gen 2

```bash
npm install @adobe/spectrum-wc
yarn add @adobe/spectrum-wc
pnpm add @adobe/spectrum-wc
```

Keep existing `@spectrum-web-components/*` packages. Gen 2 ships as a single
monorepo package; import individual components from subpaths.

## Step 4 — Align Gen 1 visually with Spectrum 2

Switch the existing `<sp-theme>` to `system="spectrum-two"` to keep Gen 1
components visually consistent with their `<swc-*>` neighbors:

```ts
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/spectrum-two/themes.js';
```

```html
<sp-theme system="spectrum-two" color="light" scale="medium">
  <!-- existing sp-* components -->
</sp-theme>
```

## Step 5 — Add the Gen 2 stylesheet and theme classes

```ts
// App entry — import once
import '@adobe/spectrum-wc/swc.css';
```

```html
<html class="swc-theme swc-theme--light">
  <body>
    <!-- your app -->
  </body>
</html>
```

Theme classes: `swc-theme--light`, `swc-theme--dark`, `swc-theme--adaptive`.
See [Theme and scales](references/guides/customization-theme-scales.md).

## Step 6 — Load Adobe Clean Spectrum VF

Gen 2 uses Adobe Clean Spectrum VF (the Spectrum 2 font family). See
[Fonts](references/guides/customization-fonts.md) for Adobe Fonts, CDN, and
self-hosted setup instructions.

## Step 7 — Replace components one at a time

For each component to migrate:

1. Open the component's migration guide from `references/components/` (e.g.
   `references/components/badge.md`). It lists renamed attributes, removed
   features, new additions, and a CSS custom property mapping table.
2. Update the import:

   ```ts
   // Before
   import '@spectrum-web-components/badge/sp-badge.js';

   // After
   import '@adobe/spectrum-wc/components/badge/swc-badge.js';
   ```

3. Rename the tag (`<sp-badge>` → `<swc-badge>`) and apply attribute renames.
4. Replace `--mod-badge-*` CSS overrides with `--swc-badge-*` equivalents.
   See [Component styles](references/guides/customization-component-styles.md).

The tag prefix always changes from `sp-` to `swc-` across all components.

## Step 8 — Validate

1. Type-check: `tsc --noEmit`
2. Run tests covering the migrated components.
3. Run the build and verify output.

Fix all failures before declaring the migration complete.

## Step 9 — Decommission Gen 1 (when ready)

Once no `<sp-*>` elements remain:

1. Remove `@spectrum-web-components/*` from `package.json`.
2. Remove `<sp-theme>` and its imports.
3. Remove remaining `--mod-*` CSS overrides.

## Step 10 — Generate final report

Summarise:

**Changes made**

- Packages added and removed
- Components migrated (before/after tag names)
- Attributes renamed or removed
- CSS custom property renames applied

**Remaining items**

- Components with no Gen 2 equivalent yet (still on Gen 1)
- Any open questions or gaps

**Recommended follow-ups**

- Any major dependency upgrades that were out of scope

## Documentation structure

### Overarching guides

{{MIGRATION_GUIDE_LIST}}

### Per-component migration guides

One file per migrated component in `references/components/`.
Read the guide for a component to see its exact breaking changes and CSS mapping.

Components with a migration guide: {{MIGRATION_COMPONENT_NAMES}}.

Components **without** a migration guide are still Gen 1 only. Keep
`@spectrum-web-components/[name]` installed until a Gen 2 equivalent ships.

{{MIGRATION_COMPONENT_LIST}}
