<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / [2nd-Gen CSS](README.md) / Non-component stylesheets

<!-- Document title (editable) -->

# Non-component stylesheets

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Choosing a sub-area](#choosing-a-sub-area)
- [Sub-areas](#sub-areas)
    - [App setup](#app-setup)
    - [Component replacements](#component-replacements)
    - [Global element styles (`global/`)](#global-element-styles-global)
    - [Shared Lit CSS fragments (`_lit-styles/`)](#shared-lit-css-fragments-lit-styles)
- [Adding new files](#adding-new-files)
    - [Adding a component replacement](#adding-a-component-replacement)
    - [Adding a global element stylesheet](#adding-a-global-element-stylesheet)
    - [Adding a shared Lit CSS fragment](#adding-a-shared-lit-css-fragment)

</details>

<!-- Document content (editable) -->

## Overview

`2nd-gen/packages/swc/stylesheets/` holds CSS that depends on the rendering layer (Spectrum tokens, theming) but is not scoped to a single component package. All files here are processed by the `swc` Vite build.

Use this guide when adding, editing, or reviewing files in `stylesheets/`. For CSS that lives inside a component package (shadow DOM styles), see [Component CSS](01_component-css.md).

> **Build note:** `vite-plugin-lit-css` processes every CSS file it finds unless excluded. All existing sub-areas except `_lit-styles/` are already covered by the `exclude` list in `vite.config.ts` (`./stylesheets/*.css`, `./stylesheets/global/**/*.css`). If a new subdirectory is ever added, add a corresponding glob to that list so its files are treated as standalone CSS rather than Lit CSS modules.

## Choosing a sub-area

| Question | Answer | Sub-area |
| --- | --- | --- |
| Does this CSS implement the full visual design for an element type that has no custom element and never will? | Yes | Root (component replacement) |
| Does this CSS style a native element globally — either as a classless baseline reset or as a class set that mirrors a custom element? | Yes | `global/` |
| Does this CSS need to reach inside shadow roots and is shared across two or more components? | Yes | `_lit-styles/` |
| Is this foundational app-level setup (token imports, base application styles)? | Yes | Root (app setup) |

When both "component replacement" and `global/` seem to fit: a component replacement provides a complete class-based design for an element with no custom element counterpart (typography, heading classes). A `global/` file provides element-level styling in the context of the design system — either as a global reset (`global-link.css` for bare `<a>`) or as a class set derived from a custom element (`global-button.css` paired with `swc-button`). If there is a matching custom element or a global-reset use case, use `global/`. If the stylesheet is a self-contained class vocabulary with no custom element counterpart, use root.

## Sub-areas

### App setup

**Files:** `swc.css`, `tokens.css`

Foundational stylesheets loaded once at the page/app level. They establish token imports and base application styles; `preview.ts` imports them to bootstrap Storybook. These are not typically modified during component migrations.

**Build treatment:** processed by `processStylesheets` (PostCSS) and emitted to `dist/` as standalone CSS.

### Component replacements

**Files:** `typography.css`, `link.css`

CSS utility classes for Spectrum elements that have no custom element counterpart. Authors opt in by applying BEM-style class names in the light DOM. These stylesheets are the single source of truth for their element type; there is no companion `swc-*` custom element.

Examples:

- `typography.css` — heading, body, code, and detail type classes
- `link.css` — variant modifier classes for `<a>` elements

**Build treatment:** same as app setup — processed by `processStylesheets` and emitted to `dist/` as standalone CSS.

**Stories:** component replacements are documented in Storybook with consumer-facing stories in their component directory (for example, `components/typography/stories/`). See [Adding a component replacement](#adding-a-component-replacement).

### Global element styles (`global/`)

**Files:** `global-button.css`, `global-elements.css`, `global-link.css`

Per-element light DOM styles. Loaded once globally; rules may act as "resets" for elements without extra class names, or provide BEM-style utility classes, depending on the stylesheet. These are the stylesheets consumers import when they want global element styling without a custom element.

`global-elements.css` is a single-entry-point index that `@import`s each individual global stylesheet. Consumers can import this one file to get all global element styles.

**Build treatment:** processed by `processStylesheets` and emitted to `dist/` as standalone CSS.

#### Two authoring modes:

- **Generated** — when a matching custom element exists (for example, `global-button.css` paired with `swc-button`), the file is generated by the [`vite-global-elements-css`](../../../2nd-gen/packages/tools/vite-global-elements-css/README.md) build plugin. The plugin derives the global stylesheet from the component's shadow DOM CSS via deterministic selector transformations and wraps all rules in `@layer swc-global-elements`. Generated files carry a `DO NOT EDIT` header and must be committed as stable build output.
- **Hand-authored** — when no matching custom element exists (for example, `global-link.css`), write the CSS directly.

See the Storybook docs page at [Customization/Global Element Styling](../../../2nd-gen/packages/swc/.storybook/guides/customization/global-elements.mdx) for the consumer-facing reference on how global element styles are used.

### Shared Lit CSS fragments (`_lit-styles/`)

**Files:** `linear-progress-base.css`, `opacity-checkerboard.css`

Reusable CSS fragments that are composed into one or more component's `static styles` arrays, reaching inside shadow roots. These are **not** standalone stylesheets — they are imported as JavaScript modules by the consuming component's TypeScript file.

`_lit-styles/` files depend on `--swc-*` design tokens, which is why they live in `swc/` rather than `core/`. They encode structural rules shared across multiple components (for example, the bar/track layout used by both `meter` and `progress-bar`). They should not include variant fill colors, animations, or any rules that belong to a single component.

**Build treatment:** processed only by `vite-plugin-lit-css`, which converts each file into a Lit `css` tagged-template module. They are **not** processed by `processStylesheets` and **not** emitted as standalone CSS in `dist/`.

## Adding new files

### Adding a component replacement

Use this when the element is pure CSS (no custom element) and consumers apply it via class names.

1. Author the CSS in `stylesheets/[name].css`. Use BEM-style class names prefixed with `swc-`.
2. Create a component directory at `components/[name]/` with:
   - `stories/[name].stories.ts` — consumer-facing stories demonstrating all classes and variants
   - `stories/[name].template.ts` — shared template helper
   - `[name].mdx` — per-unit docs page
   - `test/[name].test.ts` — tests
3. Stories for component replacements follow the same format as web component stories; the component name in `meta` will match the CSS class root rather than a custom element tag.

Reference: `components/typography/` for a complete example.

### Adding a global element stylesheet

Use this when styling a native HTML element globally, either with or without a matching custom element.

**Step 1 — Author or generate the stylesheet.**

- **With a matching custom element:** add the component to the `elements` array in `vite.config.ts`:

  ```ts
  globalElementCSS({
    elements: [
      { component: 'button' },
      { component: 'your-component' }, // add here
    ],
  }),
  ```

  Then add `@global-exclude` fences in the component CSS to mark blocks that have no global equivalent (for example, pending-state animations):

  ```css
  /* @global-exclude: pending state requires JS runtime */
  @keyframes swc-pending-spinner-rotate { ... }
  /* @global-exclude-end */
  ```

  The plugin generates `stylesheets/global/global-[component].css` automatically at build time and during dev. Commit the generated file.

- **Without a matching custom element:** hand-author `stylesheets/global/global-[name].css`. Wrap all rules in `@layer swc-global-elements` to match the generated file convention.

**Step 2 — Register in the index.**

Add an `@import` to `stylesheets/global/global-elements.css`:

```css
@import url("./global-[name].css");
```

**Step 3 — Document in Storybook.**

Add a section to `2nd-gen/packages/swc/.storybook/guides/customization/global-elements.mdx` demonstrating the classes and their usage. Follow the existing Button Styles section as a reference.

### Adding a shared Lit CSS fragment

Use this when two or more components share a structural CSS pattern that should not be duplicated.

**Step 1 — Name the fragment.**

Choose a name that is distinct from any existing component name. The fragment name should describe the shared abstraction, not any one consumer (for example, `linear-progress` rather than `meter` or `progress-bar`). When the fragment has an associated mixin or controller in `core/`, align the name with that abstraction so the CSS and logic layers are clearly paired. This name must be used consistently in three places:

- the filename: `_lit-styles/[name].css`
- any CSS class names within the fragment: `.swc-[Name]-*`
- any exposed custom properties: `--swc-[name]-*`

Using a unique name makes it easy to trace where styles come from and keeps each concern distinct as more consumers are added.

**Step 2 — Create the fragment.**

Add the CSS file at `stylesheets/_lit-styles/[name].css`. Include only shared structural rules; do not include variant fill colors, animations, or component-specific overrides.

**Step 3 — Import in consuming components.**

In each consuming component's TypeScript file, import the fragment as a JavaScript module:

```ts
import sharedStyles from '../../stylesheets/_lit-styles/[name].css';
import styles from './[component].css';
```

Then add it to the `styles()` array:

```ts
public static override get styles(): CSSResultArray {
  return [sharedStyles, styles];
}
```

Do **not** use a CSS `@import` statement for `_lit-styles/` files. They are Lit CSS modules, not standalone stylesheets; a CSS-level import would break the build.

Reference: `components/meter/Meter.ts` and `stylesheets/_lit-styles/linear-progress-base.css` for a complete example.
