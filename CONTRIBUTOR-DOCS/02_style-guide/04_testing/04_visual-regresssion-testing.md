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
    - [Forced pseudo-states](#forced-pseudo-states)
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

Use shared helpers from `.storybook/helpers`: `createPermutations`, `groupPermutationsBy`, `row`, `theme`, `staticColorBackground`, `forcePseudoStates` (and `forcePseudoState` for individual slotted elements), `vrtParameters`, `forcedColorsVrtParameters`, `customPropertyRows`, and `verifyCustomPropertyCoverage`.

Keep component files small: local case lists and component-specific renderers only. Move reusable mechanics to `.storybook/helpers`.

### Grouping permutations into rows

A single dense row of every permutation is hard to scan when reviewing a Chromatic diff. Use `groupPermutationsBy(permutations, key)` to split a flat permutation list into one labeled `row()` per value of `key`, plus a `default` row for permutations that lack the key.

Which key to group by is a per-component decision, not a fixed rule. Pick the axis that carries the most meaning for the component:

- Components with a `variant` axis (button, badge, action button, status light): group by `'variant'`.
- Components whose primary axis is something else: group by that (for example `'size'` or `'direction'`).
- Components with no natural grouping axis (divider, icon, avatar, typography): grouping by a missing key collapses everything into a single `default` row and adds no value, so keep one ungrouped `row()` instead.

Split forced pseudo-states (`data-force-state`) into their own per-state rows (`hover`, `focus-visible`, `active`) rather than folding them into the variant rows. Once the row heading conveys the grouping axis, keep the component's own label plain: the heading and visual rendering already carry the permutation's meaning, so there is no need to print axis values into the component. Label rows with the `swc-Detail` typography classes rather than inline font styles.

Every item in a row must be identifiable. A single multi-item row is only fine when each item carries visible text that names it (a button label, link text, or a typography sample). When the items render near-identical visuals with no visible label — small controls such as a color handle or color loupe, or fixed-content widgets such as an accordion or avatar in different states — a generic `States` row does not tell a reviewer which item is which. Give each such state its own row labeled with the state name instead.

For composed patterns, use deterministic realistic content instead of behavior demos: fixed prompts, sources, attachments, feedback states, and response text.

Stories tagged with `'!test'` are excluded from VRT runs. See [Excluding stories from tests](01_testing-overview.md#excluding-stories-from-tests) for when and why to use this tag.

### Forced pseudo-states

`:hover`, `:focus-visible`, and `:active` cannot be triggered by synthetic events in a static Chromatic capture. The `forcePseudoStates` helper mirrors a component's own pseudo-state rules into equivalent selectors and applies a `data-forced-<state>` attribute to the target element from the story's `play` function.

The forced state is applied as a `data-*` attribute, never a class, on purpose. Components commonly scope default styles behind a `:not([class])` guard, so that a consumer-supplied class opts out of them. Forcing a state with a class would trip that guard and silently drop the default styling from the snapshot, making the VRT inaccurate. An attribute never sets `class`, so every such guard stays satisfied and no test-only class names need to leak into shipped component CSS.

Force only the states a component actually styles. A forced state with no matching rule just adds a snapshot that can never differ from its unforced counterpart. For example, Card styles hover and focus-visible but has no `:active` rule, so its VRT forces only `hover` and `focus-visible`.

`forcePseudoStates(selector, internalSelector?)` handles the common case: it forces the state on each host matching `selector` (typically `<tag>[data-force-state]`), or on an internal shadow element when `internalSelector` is provided.

#### Forcing state on a child element

`forcePseudoStates` reaches the host and its shadow internals, but not consumer content slotted into the light DOM. When the pseudo-state rule targets slotted content — for example `::slotted(a:hover)` on a linked card title — write a small custom `play` function, named `force<Component>States` by convention, that forces the host and then applies the same forced attribute to the child element itself:

```ts
const forceCardStates = async ({ canvasElement }) => {
  canvasElement
    .querySelectorAll('swc-card[data-force-state]')
    .forEach((host) => {
      const state = host.dataset.forceState;
      if (!state) return;
      forcePseudoState(host, state); // host rules + installs the mirror sheet
      // Slotted `::slotted(a:hover/:focus-visible)` rules match on the anchor's
      // own attribute, not the host's — so force it there too.
      host
        .querySelector('a[slot="title"]')
        ?.setAttribute(`data-forced-${state}`, '');
    });
};
```

Because this uses the same `data-forced-<state>` attribute the shared helper applies, the child still satisfies any `:not([class])` guard on its default styles. This stays component-specific for now — which slotted element carries the pseudo-state rule differs per component — rather than being generalized into the shared helper on a single case.

Pseudo-state rules with nested rules — such as an `::after` focus ring or a nested `&:hover` — are mirrored in full, so their nested appearance renders correctly in the forced snapshot with no extra authoring.

## Tips for reliable VRT

- Use deterministic content (no random data, no timestamps)
- Use static image IDs from picsum.photos (see stories format guide)
- Disable animations in test mode (Playwright config sets `reducedMotion: 'reduce'`)
- Keep stories focused by concern; split large files into permutations, global styles, and custom properties
- For custom properties, compare covered cases against `.storybook/custom-elements.json` so API-table docs and VRT coverage do not drift
- For custom properties, choose an override value that renders obviously different from the default (e.g. `magenta`, `0px`, an exaggerated size). The reference and override cells must look clearly different, so that a property silently ceasing to apply — which would make the override cell match the reference — is caught in visual review
- Render each override in the context that makes its effect visible — some custom properties only apply in a specific state (e.g. a padding token that is live only at a given density, or a property that needs its slot populated to show)
