<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [Testing guide](README.md) / Visual regression testing

<!-- Document title (editable) -->

# Visual regression testing

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [When to use](#when-to-use)
- [How to author VRT stories](#how-to-author-vrt-stories)
    - [Grouping permutations into rows](#grouping-permutations-into-rows)
- [Tips for reliable VRT](#tips-for-reliable-vrt)

</details>

<!-- Document content (editable) -->

Visual regression testing (VRT) catches rendering changes across browsers and themes. Chromatic captures dedicated Storybook stories and compares screenshots to approved baselines.

## When to use

VRT covers things that are hard to test programmatically:

- Color and styling
- Layout and spacing
- Cross-browser rendering
- Theme support (light, dark, high contrast)
- Animation states

## How to author VRT stories

Author dense visual coverage in `test/vrt/*.vrt.ts` for components and patterns. Keep documentation stories readable; use VRT stories for large matrices.

Aim for maximum meaningful coverage: include every size, variant, state, anatomy, theme, static-color, global-style, custom-property, and component-specific visual axis that can produce a useful visual difference. Cover CJK language rendering explicitly when text metrics can change, e.g. `lang="ja"` / `lang="ko"` / `lang="zh"` line-height, wrapping, or truncation. Skip only impossible, unsupported, or truly redundant combinations.

Use this shape:

- `test/vrt/<component>.vrt.ts` for permutations, states, static colors, forced colors, wrapping, and anatomy.
- `test/vrt/<component>-global-styles.vrt.ts` when the component ships global class styles.
- `test/vrt/<component>-custom-properties.vrt.ts` when public custom properties need visual coverage.

Use shared helpers from `.storybook/helpers`: `createPermutations`, `groupPermutationsBy`, `row`, `theme`, `staticColorBackground`, `forcePseudoStates`, `vrtParameters`, `forcedColorsVrtParameters`, `customPropertyRows`, and `verifyCustomPropertyCoverage`.

Keep component files small: local case lists and component-specific renderers only. Move reusable mechanics to `.storybook/helpers`.

### Grouping permutations into rows

A single dense row of every permutation is hard to scan when reviewing a Chromatic diff. Use `groupPermutationsBy(permutations, key)` to split a flat permutation list into one labeled `row()` per value of `key`, plus a `default` row for permutations that lack the key.

Which key to group by is a per-component decision, not a fixed rule. Pick the axis that carries the most meaning for the component:

- Components with a `variant` axis (button, badge, action button, status light): group by `'variant'`.
- Components whose primary axis is something else: group by that (for example `'size'` or `'direction'`).
- Components with no natural grouping axis (divider, icon, avatar, typography): grouping by a missing key collapses everything into a single `default` row and adds no value, so keep one ungrouped `row()` instead.

Split forced pseudo-states (`data-force-state`) into their own per-state rows (`hover`, `focus-visible`, `active`) rather than folding them into the variant rows. Once the row heading conveys the grouping axis, keep the component's own label plain: the heading and visual rendering already carry the permutation's meaning, so there is no need to print axis values into the component. Label rows with the `swc-Detail` typography classes rather than inline font styles.

For composed patterns, use deterministic realistic content instead of behavior demos: fixed prompts, sources, attachments, feedback states, and response text.

Stories tagged with `'!test'` are excluded from VRT runs. See [Excluding stories from tests](01_testing-overview.md#excluding-stories-from-tests) for when and why to use this tag.

## Tips for reliable VRT

- Use deterministic content (no random data, no timestamps)
- Use static image IDs from picsum.photos (see stories format guide)
- Disable animations in test mode (Playwright config sets `reducedMotion: 'reduce'`)
- Keep stories focused by concern; split large files into permutations, global styles, and custom properties
- For custom properties, compare covered cases against `.storybook/custom-elements.json` so API-table docs and VRT coverage do not drift
