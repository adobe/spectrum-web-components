---
name: vrt-authoring
description: Author dedicated Storybook visual regression stories for 2nd-gen components. Use when adding or reviewing `.vrt.ts` files, Chromatic VRT coverage, forced-colors coverage, pseudo-state snapshots, global stylesheet coverage, or custom-property VRT coverage.
---

# VRT authoring

## Pattern

- Put VRT stories in `2nd-gen/packages/swc/components/<component>/test/vrt/*.vrt.ts`.
- Keep docs stories for examples; keep `.vrt.ts` stories for dense visual coverage.
- Use shared helpers from `.storybook/helpers`: `createPermutations`, `row`, `theme`, `staticColorBackground`, `forcePseudoStates`, `vrtParameters`, and `forcedColorsVrtParameters`.
- Keep component files data-driven: local case lists and component renderers only. Move reusable mechanics to `.storybook/helpers`.

## Story shape

- `button.vrt.ts`-style permutations: size, variant, state, anatomy, static-color, wrapping, and truncation.
- `*-global-styles.vrt.ts`: plain global class coverage for `<a>` / `<button>` or equivalent elements.
- `*-custom-properties.vrt.ts`: one reference/override row per public custom property.

## Custom properties

- Use `customPropertyRows()` to render reference vs override rows.
- Use `coveredCustomProperties()` plus `verifyCustomPropertyCoverage()` in the story `play` function.
- Compare against `.storybook/custom-elements.json` so documented API-table custom properties cannot drift from VRT coverage.
