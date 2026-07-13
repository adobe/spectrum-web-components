---
name: vrt-authoring
description: Author dedicated Storybook visual regression stories for 2nd-gen components. Use when adding or reviewing `.vrt.ts` files, Chromatic VRT coverage, forced-colors coverage, pseudo-state snapshots, global stylesheet coverage, or custom-property VRT coverage.
---

# VRT authoring

## Pattern

- Put VRT stories in `2nd-gen/packages/swc/components/<component>/test/vrt/*.vrt.ts` or `2nd-gen/packages/swc/patterns/<pattern>/test/vrt/*.vrt.ts`.
- Keep docs stories for examples; keep `.vrt.ts` stories for dense visual coverage.
- Aim for maximum meaningful coverage: include every size, variant, state, anatomy, theme, static-color, global-style, custom-property, and component-specific visual axis that can produce a useful visual difference. Cover CJK language rendering explicitly when text metrics can change, e.g. `lang="ja"` / `lang="ko"` / `lang="zh"` line-height, wrapping, or truncation. Skip only impossible, unsupported, or truly redundant combinations.
- Use shared helpers from `.storybook/helpers`: `createPermutations`, `row`, `theme`, `staticColorBackground`, `forcePseudoStates`, `vrtParameters`, and `forcedColorsVrtParameters`.
- Keep unit files data-driven: local case lists and renderers only. Move reusable mechanics to `.storybook/helpers`.
- For composed patterns, prefer deterministic realistic content over behavior demos: fixed prompts, sources, attachments, feedback states, and response text.
- Before skipping global styles, check `2nd-gen/packages/swc/stylesheets/global/` for a matching generated stylesheet such as `global-<component>.css` and cover its plain-class API when present.

## Story shape

- `<component>.vrt.ts`: permutations for size, variant, state, anatomy, static-color, wrapping, and truncation.
- `*-global-styles.vrt.ts`: plain global class coverage for `<a>` / `<button>` or equivalent elements.
- `*-custom-properties.vrt.ts`: one reference/override row per public custom property.

## Custom properties

- Use `customPropertyRows()` to render reference vs override rows.
- Use `coveredCustomProperties()` plus `verifyCustomPropertyCoverage()` in the story `play` function.
- Compare against `.storybook/custom-elements.json` so documented API-table custom properties cannot drift from VRT coverage.
