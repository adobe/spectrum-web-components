---
name: vrt-authoring
description: Author dedicated Storybook visual regression stories for 2nd-gen components. Use when adding or reviewing `.vrt.ts` files, Chromatic VRT coverage, forced-colors coverage, pseudo-state snapshots, global stylesheet coverage, or custom-property VRT coverage.
---

# VRT authoring

This skill is the quick reference. The authoritative guide is `CONTRIBUTOR-DOCS/02_style-guide/04_testing/04_visual-regresssion-testing.md` — when detail and this skill disagree, the guide wins, and new long-form guidance belongs there with a pointer here.

## Pattern

- Put VRT stories in `2nd-gen/packages/swc/components/<component>/test/vrt/*.vrt.ts` or `2nd-gen/packages/swc/patterns/<pattern>/test/vrt/*.vrt.ts`.
- Keep docs stories for examples; keep `.vrt.ts` stories for dense visual coverage.
- Aim for maximum meaningful coverage: include every size, variant, state, anatomy, theme, static-color, global-style, custom-property, and component-specific visual axis that can produce a useful visual difference. Cover CJK language rendering explicitly when text metrics can change, e.g. `lang="ja"` / `lang="ko"` / `lang="zh"` line-height, wrapping, or truncation. Skip only impossible, unsupported, or truly redundant combinations.
- Use shared helpers from `.storybook/helpers`: `createPermutations`, `groupPermutationsBy`, `row`, `theme`, `staticColorBackground`, `forcePseudoStates` (and `forcePseudoState` for forcing state on individual slotted elements), `vrtParameters`, and `forcedColorsVrtParameters`.
- Keep unit files data-driven: local case lists and renderers only. Move reusable mechanics to `.storybook/helpers`.

## Grouping permutations into rows

A single dense row of every permutation is hard to scan in a Chromatic diff. Use `groupPermutationsBy(permutations, key)` to split one flat permutation list into one labeled `row()` per value of `key` (e.g. one row per variant), plus a `default` row for permutations that lack the key.

- **Choosing the grouping key is a per-component decision, not a fixed rule.** Group by the axis that carries the most meaning for that component:
  - Components with a `variant` axis (button, badge, action-button, status-light): group by `'variant'`.
  - Components whose primary axis is something else: group by that instead (e.g. `'size'`, `'direction'`).
  - Components with no natural grouping axis (divider, icon, avatar, typography): grouping by a missing key collapses everything into one `default` row, which adds no value. Prefer a single ungrouped `row()` in that case.
- Split forced pseudo-states (`data-force-state`) into their own per-state rows (`hover`, `focus-visible`, `active`) rather than folding them into the variant rows; filter them out of the main grouping first.
- **Every item in a row must be identifiable.** A single multi-item row is only fine when each item carries visible text that names it (a button label, link text, typography sample). When items render near-identical visuals with no visible label — small controls (color handle, color loupe), or fixed-content widgets (accordion, avatar states) — a generic `States` row tells a reviewer nothing about which item is which. Give each such state its own row labeled with the state name instead.
- Once the row heading conveys the grouping axis (variant/state), keep the component's own label plain (e.g. `Button`). Do not print the permutation's axis values into the component — the row heading and visual rendering already carry that.
- Label rows with the `swc-Detail` typography classes (`swc-Detail swc-Detail--sizeM`), not inline font styles. `staticColorBackground` stacks its rows vertically and overrides `--swc-detail-font-color: currentColor` so labels stay legible on the contrast backgrounds.
- For composed patterns, prefer deterministic realistic content over behavior demos: fixed prompts, sources, attachments, feedback states, and response text.
- Before skipping global styles, check `2nd-gen/packages/swc/stylesheets/global/` for a matching generated stylesheet such as `global-<component>.css` and cover its plain-class API when present.

## Story shape

- `<component>.vrt.ts`: permutations for size, variant, state, anatomy, static-color, wrapping, and truncation.
- `*-global-styles.vrt.ts`: plain global class coverage for `<a>` / `<button>` or equivalent elements.
- `*-custom-properties.vrt.ts`: one reference/override row per public custom property.

## Forced pseudo-states

`:hover` / `:focus-visible` / `:active` can't be triggered in a static Chromatic capture, so `forcePseudoStates` mirrors the component's own pseudo-state rules and applies a `data-forced-<state>` **attribute** (never a class — a class trips `:not([class])` default-style guards and drops default styling from the snapshot) from the story's `play`. Quick reference:

- Tag permutations with `data-force-state`; `forcePseudoStates('<tag>[data-force-state]', internalSelector?)` forces the host, or a shadow-internal element when `internalSelector` is given (e.g. Button's `.swc-Button`).
- Force only the states a component actually styles — a forced state with no matching rule just adds a snapshot that can never differ (e.g. Card has no `:active` rule, so it forces only `hover`/`focus-visible`).
- To force a state on a **slotted light-DOM child** the shared helper can't reach (e.g. `::slotted(a:hover)` on a linked title), write a small custom `force<Component>States` play function that also sets `data-forced-<state>` on that element.
- Forced-colors mode gets its own story (`forcedColorsVrtParameters`), since it replaces the whole page palette.

Full rationale (attribute-vs-class, nested-rule mirroring, the custom-function pattern) lives in the VRT testing guide: `CONTRIBUTOR-DOCS/02_style-guide/04_testing/04_visual-regresssion-testing.md`.

## Custom properties

- Use `customPropertyRows()` to render reference vs override rows.
- Use `coveredCustomProperties()` plus `verifyCustomPropertyCoverage()` in the story `play` function.
- Compare against `.storybook/custom-elements.json` so documented API-table custom properties cannot drift from VRT coverage.
- Choose an override value that renders **obviously different** from the default (e.g. `magenta`, `0px`, an exaggerated size) so the reference and override cells are visibly distinct. If a property silently stops applying, its override cell collapses to match the reference — a distinct value is what makes that regression catchable by visual review.
- Render each override in a context where its effect actually shows (e.g. a padding token that is only live at a given density, or a property that needs its slot populated).
