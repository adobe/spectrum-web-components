---
description: Enforces consistent file structure, section separators, meta configuration, story tags, and layout parameters for 2nd-gen Storybook stories files. Story prose lives in per-unit MDX; the stories file is definitions-only.
globs: 2nd-gen/packages/swc/components/*/stories/**, 2nd-gen/packages/swc/patterns/*/*/stories/**, 2nd-gen/packages/core/controllers/*/stories/**
alwaysApply: false
---

# Storybook stories format standards

Enforce consistent formatting and technical structure for Storybook stories files in 2nd-gen components, patterns, and controllers.

**See also**: `.ai/rules/stories-documentation.md` for guidance on WHAT to author in the per-unit MDX (content, patterns, examples).

## Scope

Apply to all `.stories.ts` files in:

- `2nd-gen/packages/swc/components/*/stories/` (components)
- `2nd-gen/packages/swc/patterns/*/*/stories/` (patterns)
- `2nd-gen/packages/core/controllers/*/stories/` (controllers)

## Source of truth: per-unit MDX, not JSDoc

Long-form documentation lives in a **per-unit MDX file** at the unit's root, not in JSDoc comments above story exports.

| Genre      | MDX location                                |
| ---------- | ------------------------------------------- |
| Component  | `swc/components/<name>/<name>.mdx`          |
| Internal   | `swc/components/<name>/<name>.internal.mdx` |
| Pattern    | `swc/patterns/<group>/<unit>/<unit>.mdx`    |
| Controller | `core/controllers/<name>/<name>.mdx`        |

The stories file contains story **definitions** (render, args, tags, parameters). It does **not** carry prose:

- **Meta-level JSDoc** (above `const meta: Meta = { ... }`) is the only retained JSDoc — it is rendered by the `<Description />` block at the top of the docs page.
- **Story-level JSDoc** (above each `export const Foo: Story = ...`) is **not** authored. Prose for each section and story lives in the per-unit MDX alongside an explicit `<Canvas of={Stories.Foo} />` reference.

Stories without a corresponding `<Canvas>` reference in the MDX do not appear on the docs page (subject to the `'!autodocs'` / `'!dev'` global tag exclusion in `preview.ts`).

Component-specific `.usage.mdx` files are no longer used. Units without a per-unit MDX fall back to `DocumentTemplate.mdx`, which renders sections from story tags via the `SpectrumStories` block.

## File structure

### Stories file (`.stories.ts`)

Required structure with visual separators between sections:

1. **Copyright header** (lines 1-11)
2. **Imports**
3. **METADATA** - Meta object with component configuration
4. **HELPERS** - Shared label mappings and utilities (if needed)
5. **PLAYGROUND STORY** - Playground story
6. **OVERVIEW STORY** - Emblematic default use case shown on the docs page
7. **ANATOMY STORIES** - Component structure (if applicable)
8. **OPTIONS STORIES** - Variants, sizes, styles
9. **STATES STORIES** - Component states (if applicable)
10. **BEHAVIORS STORIES** - Built-in functionality (if applicable)
11. **ACCESSIBILITY STORIES** - A11y demonstration

#### Visual separators

```typescript
// ────────────────
//    METADATA
// ────────────────

// ────────────────────
//    HELPERS
// ────────────────────

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────
```

## Key Principles

### Always Pass Args Through

When using custom `render` functions, **always** spread `...args` into template calls:

```typescript
// ✅ Good - args are passed through
export const MyStory: Story = {
  render: (args) => html`
    ${template({ ...args, size: 's' })}
  `,
};

// ❌ Bad - args are lost
export const MyStory: Story = {
  render: (args) => html`
    ${template({ size: 's' })}
  `,
};
```

This ensures:

- Storybook controls work correctly
- Args from the Playground/global level are respected
- Component defaults can be overridden

### When to Use render vs args

- **Use `args` directly**: When the default render is sufficient (single component, no wrapper)
- **Use `render: (args) =>`**: When you need multiple instances, custom HTML structure, or conditional rendering

```typescript
// ✅ Good - simple case uses args
export const Overview: Story = {
  args: { size: 'm', label: 'Example' },
  tags: ['overview'],
};

// ✅ Good - complex case uses render with args
export const Sizes: Story = {
  render: (args) => html`
    ${template({ ...args, size: 's' })} ${template({ ...args, size: 'm' })}
    ${template({ ...args, size: 'l' })}
  `,
  tags: ['options'],
};
```

### Documentation sections (authored in MDX)

The per-unit MDX file (`<unit>.mdx`) is the source of truth for the docs page layout. Each section is authored as Markdown with an explicit `<Canvas of={Stories.MyStory} />` reference where a story should render:

- **Anatomy** — `## Anatomy` prose + `<Canvas of={Stories.Anatomy} />`
- **Options** — `## Options` heading; for each option story, `### <Story title>` + prose + `<Canvas of={Stories.Sizes} />`
- **States** — same pattern as Options
- **Behaviors** — same pattern as Options
- **Accessibility** — `## Accessibility` prose + `<Canvas of={Stories.Accessibility} />`
- **Upcoming features** — `## Upcoming features` + prose only (no `<Canvas>`); placed before the footer so it reads as forward-looking notes after the current API/behavior
- **API** — handled by `<DocsFooter />` (rendered automatically with `<ApiTable />` for components and patterns; omitted for controllers)

See `.ai/rules/stories-documentation.md` for full per-section authoring patterns including genre-specific notes (component vs pattern vs controller vs internal).

**What you need to do**: tag each story by section (`anatomy`, `options`, `states`, `behaviors`, `a11y`), then reference it from the per-unit MDX via `<Canvas of={Stories.StoryName} />`.

## Meta configuration

### Required fields

```typescript
/**
 * Component description explaining its purpose and key features.
 *
 * This description is displayed in the Overview story. It should provide context about
 * what the component does and when to use it. If referencing other components, link to
 * their Storybook paths using relative URLs (e.g., `<swc-badge>` becomes
 * `[Badge](../?path=/docs/badge--overview)`).
 */
const meta: Meta = {
  title: 'Component name',
  component: 'swc-component-name',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    actions: { handles: events }, // If events exist
    docs: {
      subtitle: `Component description`, // Required - displayed in Overview, cannot include links
    },
    design: { type: 'figma', url: 'https://www.figma.com/...' }, // Recommended
    stackblitz: { url: 'https://stackblitz.com/...' }, // Recommended
  },
  tags: ['migrated'],
};
```

**Important notes:**

- **JSDoc description above meta**: Displayed in the Overview story. Can include markdown links to other components.
- **`parameters.docs.subtitle`**: Displayed as the subtitle in the Overview story. Cannot include links (plain text only).
- **Avoid repetition**: The subtitle and JSDoc description should complement each other, not duplicate content. The subtitle is a brief summary; the JSDoc provides fuller context.
- **Component links**: When referencing other components in the JSDoc description, use relative Storybook paths: `[ComponentName](../?path=/docs/component-name--overview)`

### Internal attributes: exclude from the Storybook helper round-trip

If a component manages an **internal DOM attribute directly** via `setAttribute`/`removeAttribute` — i.e. a CSS-only state attribute that is **not** a declared `@property` and not part of the public API (for example Tooltip's `actual-placement`) — you must declare it in `argTypes` with the control disabled, even though it is not a real control.

```typescript
const { args, argTypes, template } = getStorybookHelpers('swc-component-name');

// Internal CSS-only attribute the component writes itself; not a public control.
argTypes['internal-attribute'] = {
  table: { disable: true },
  control: false,
};
```

**Why this is required.** `@wc-toolkit/storybook-helpers` installs a `MutationObserver` that watches **every** attribute on the element and writes each change back into Storybook `args`. Any `args` key that is not a declared `argType` is then re-applied to the element through the helper's `spread` directive on the next render. For an attribute the component mutates at runtime, the helper re-applies a **stale** value and clobbers the component's own state — e.g. a flipped Tooltip whose `actual-placement` reverts from `bottom` to its declared `top`, breaking the arrow direction. Declaring the attribute in `argTypes` makes the helper exclude it from the `spread`. This only affects Storybook; plain consumers do not round-trip attributes.

### Title naming conventions

These rules apply to every `title` field in meta objects and every `<Meta title="..." />` in MDX files.

- **Component names are proper nouns — keep their title case.** `'Action Button'`, `'Illustrated Message'`, `'Color Loupe'`. Each word in the component name is capitalised.
- **Everything else uses sentence case.** Page labels, section names, and group names that are not component names: `'Pattern overview'`, `'Migration guide'`.
- **No filename as label.** Never use a bare filename (`README`, `CHANGELOG`) as a Storybook title or page name. Use a descriptive label: `'Pattern overview'`, `'Migration guide'`.
- **Flatten single-component groups.** If a Storybook group contains only one component, do not nest it. Use a flat title (`'Color Loupe'`) rather than a group path (`'Color Components/Color Loupe'`).

| ❌ Don't                         | ✅ Do                                  |
| -------------------------------- | -------------------------------------- |
| `'Color Components/Color Loupe'` | `'Color Loupe'` (flattened)            |
| `'Conversational AI/README'`     | `'Conversational AI/Pattern overview'` |
| `'Badge/Migration Guide'`        | `'Badge/Migration guide'`              |
| `'Pattern Overview'`             | `'Pattern overview'`                   |

## Layout and decorators

Use `flexLayout: 'row-wrap'` for stories displaying multiple items (sizes, variants, states). This applies flex layout with consistent spacing.

```typescript
export const Sizes: Story = {
  render: () => html`
    <swc-badge size="s">Small</swc-badge>
    <swc-badge size="m">Medium</swc-badge>
    <swc-badge size="l">Large</swc-badge>
    <swc-badge size="xl">Extra-large</swc-badge>
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};
```

### Customizing layout

Extend with `parameters.styles` or use styles alone for custom layouts:

```typescript
export const Sizes: Story = {
  parameters: {
    flexLayout: 'row-wrap',
    styles: {
      'flex-wrap': 'wrap',
      'max-inline-size': '80ch',
    },
  },
};

// Or fully custom (no flex defaults):
export const GridLayout: Story = {
  parameters: {
    styles: {
      display: 'grid',
      'grid-template-columns': 'repeat(3, 1fr)',
    },
  },
};
```

### Static color decorator

For static color stories, use `staticColorsDemo: true` with `flexLayout: 'row-wrap'`:

```typescript
export const StaticColors: Story = {
    render: (args) => html`
        ${['white', 'black'].map((color) => template({ 'static-color': color }),
    parameters: {
        flexLayout: 'row-wrap',
        staticColorsDemo: true
    },
    tags: ['options', '!test'],
};
```

The decorator displays two background zones—dark gradient for `static-color="white"` content, light gradient for `static-color="black"` content.

## Story naming

When the camelCase export name does not produce a readable display name — for example, `TextWrapping` for a story that should appear as "Text wrapping" — set the display name via `storyName` assigned after the export:

```typescript
/**
 * When the pointer moves from the trigger into the popover bubble, the popover stays
 * open...
 */
export const TextWrapping: Story = {
  tags: ['behaviors'],
};
TextWrapping.storyName = 'Text wrapping';
```

Do **not** use a `### Heading` at the top of a JSDoc comment as a proxy for the story's display name. JSDoc H3 headings are only appropriate for sub-sections within the documentation body (for example, `### Features` and `### Best practices` inside an Accessibility story).

## Story ordering

Section ordering is hand-authored in each component's per-component MDX file (`<component>.mdx` at the component root). Inside an MDX page, sections appear in the order they are written; story-level parameters do not control rendering order.

Do not use a `section-order` parameter on stories. The previous `section-order` workaround is retired now that MDX is the source of truth for documentation layout.

## Tags

### Required tags

| Tag            | Usage                                                                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'dev'`        | Playground story only. Drop `'autodocs'` when the unit has a per-unit MDX file (`<unit>.mdx`); the MDX is the docs page and `'autodocs'` would create a duplicate Docs entry. |
| `'overview'`   | Overview story                                                                                                                                                                |
| `'anatomy'`    | Anatomy stories                                                                                                                                                               |
| `'options'`    | Variant, size, and style stories                                                                                                                                              |
| `'states'`     | State demonstration stories                                                                                                                                                   |
| `'behaviors'`  | Method, event, and automatic behavior stories                                                                                                                                 |
| `'a11y'`       | Accessibility story                                                                                                                                                           |
| `'migrated'`   | On meta object (components and patterns)                                                                                                                                      |
| `'controller'` | On meta object (controllers; `DocsFooter` reads this to omit `<ApiTable />`)                                                                                                  |

### Optional tags

- `'upcoming'` - Story demonstrates a feature or variant that is not yet available

> The previous `'description-only'` tag is retired. Prose-only sections live in the per-component MDX (`<component>.mdx`) as Markdown without a `<Canvas>` reference, not as story exports.

### Exclusion tags

- `'!dev'` - Exclude from the development Storybook sidebar without affecting tests
- `'!test'` - Exclude from **all three** automated test runners simultaneously: Vitest play functions, aXe WCAG compliance, and VRT snapshots. Use only when testing would produce false positives due to context the test runner cannot see — the canonical case is static-color stories, where axe evaluates contrast against the page background rather than the decorator gradient. **When you apply `'!test'` to a story, you must add a corresponding test story with a custom render and `parameters: { staticColorsDemo: true }` to restore behavioral coverage.** Do not apply `'!test'` because a story is complex, has no `play` function, or has a real accessibility issue. See [Excluding stories from tests](../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/01_testing-overview.md#excluding-stories-from-tests).

## Story types

> Story-level JSDoc comments are **not** authored above story exports. Long-form prose lives in the per-unit MDX file. The only JSDoc that remains is the **meta-level JSDoc** above the `const meta: Meta = { ... }` declaration — that prose is read by the `<Description />` block at the top of the docs page (rendered via `<DocsHeader />`).

### Playground

First story after meta. No story-level JSDoc. Set args to the most common use case — this appears as the Playground/Controls preview.

```typescript
export const Playground: Story = {
  args: {
    /* most common use case */
  },
  tags: ['dev'],
};
```

**Notes:**

- Use `args` directly (not `render`) when the default render is sufficient. Only use `render: (args) => html` when you need custom rendering.
- Use `tags: ['dev']` (without `'autodocs'`) when the unit has a per-unit MDX file. The MDX is the Docs page; `'autodocs'` would error with "duplicate docs entry".
- For units without an MDX (still rendering through `DocumentTemplate.mdx`), keep `tags: ['autodocs', 'dev']`.

### Overview

Quick introduction showing the component in its most common use case. No story-level JSDoc. Rendered into the docs page header by `<OverviewStory />` inside `<DocsHeader />`.

```typescript
export const Overview: Story = {
  args: {
    // Most common/representative configuration
  },
  tags: ['overview'],
};
```

**Note**: Use `args` directly when possible. Only use `render: (args) =>` if you need custom HTML structure around the component.

### Anatomy

Document all slots and content-rendering properties (e.g., `label`, `icon`, `src`). Combine variations into one story.

**Important**: When using `render: (args) =>`, **always** spread `...args` into template calls to ensure Storybook controls work correctly.

```typescript
/**
 * A component-name consists of:
 *
 * - **Default slot**: Primary content
 * - **icon slot**: Optional icon element
 * - **label**: Text label rendered by the component
 */
export const Anatomy: Story = {
  render: (args) => html`
    ${template({ ...args /* text only */ })}
    ${template({ ...args /* icon only */ })}
    ${template({ ...args /* text + icon */ })}
  `,
  tags: ['anatomy'],
  parameters: { flexLayout: 'row-wrap' },
};
```

### Options

Document every attribute/property not covered in Anatomy, States, or Behaviors. Consolidate related options into single stories. The recommended canonical order, mirrored in the per-component MDX, is:

| Story                     | Content                                           |
| ------------------------- | ------------------------------------------------- |
| `Sizes`                   | All size variants                                 |
| `SemanticVariants`        | Positive, informative, negative, notice, neutral  |
| `NonSemanticVariants`     | Color-coded categories (seafoam, indigo, etc.)    |
| `StaticColors`            | Static color pattern (see below)                  |
| `Quiet/Subtle/Emphasized` | Quiet, subtle, emphasized variants                |
| `Outline`                 | Outline variants                                  |
| `Positioning`             | Positioning modifiers (fixed, absolute, relative) |

```typescript
export const Sizes: Story = {
  render: (args) => html`
    ${template({ ...args, size: 's', label: 'Small' })}
    ${template({ ...args, size: 'm', label: 'Medium' })}
    ${template({ ...args, size: 'l', label: 'Large' })}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const SemanticVariants: Story = {
  render: (args) => html`
    ${template({ ...args, variant: 'positive' })}
    ${template({ ...args, variant: 'informative' })}
    ${template({ ...args, variant: 'negative' })}
    ${template({ ...args, variant: 'notice' })}
    ${template({ ...args, variant: 'neutral' })}
  `,
  tags: ['options'],
};

export const NonSemanticVariants: Story = {
  render: (args) => html`
    ${template({ ...args, variant: 'seafoam' })}
    ${template({ ...args, variant: 'indigo' })} ${/* ... other colors */ ''}
  `,
  tags: ['options'],
};
```

Prose for each story (e.g. the description of size choices, semantic variant meanings) lives in the per-unit MDX under `### Sizes`, `### Semantic variants`, etc.

#### Static color pattern

For components with a `static-color` attribute, use whichever of these two patterns best fits the component's visual surface:

**Three-story pattern** — use when each color can be shown independently (simple components with a single fill style):

1. **`StaticBlack`** - `static-color="black"` on light background
2. **`StaticWhite`** - `static-color="white"` on dark background
3. **`StaticColors`** - Both variants side-by-side

```typescript
export const StaticBlack: Story = {
  args: { 'static-color': 'black' },
  parameters: { styles: { color: 'black' } },
  tags: ['options'],
};

export const StaticWhite: Story = {
  args: { 'static-color': 'white' },
  parameters: { styles: { color: 'white' } },
  tags: ['options'],
};

export const StaticColors: Story = {
  render: (args) => html`
    ${['white', 'black'].map(
      (color) => html`
        ${template({ ...args, 'static-color': color })}
      `
    )}
  `,
  parameters: { flexLayout: 'row-wrap', staticColorsDemo: true },
  tags: ['options', '!test'],
};
```

**Combined-story pattern** — use when the component has additional dimensions (e.g., fill styles) that are most clearly shown together in a single story. Use structural `<div>` wrappers instead of `flexLayout` here: the `staticColorsDemo` decorator targets `:first-child` and `:last-child` to apply the dark/light background zones, so the two color groups must be direct children of the render output.

```typescript
export const StaticColors: Story = {
  render: (args) => html`
    <div
      style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;"
    >
      ${FILL_STYLES.map((fillStyle) =>
        template({ ...args, 'static-color': 'white', 'fill-style': fillStyle })
      )}
    </div>
    <div
      style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;"
    >
      ${FILL_STYLES.map((fillStyle) =>
        template({ ...args, 'static-color': 'black', 'fill-style': fillStyle })
      )}
    </div>
  `,
  parameters: { staticColorsDemo: true },
  tags: ['options', '!test'],
};
```

In the three-story pattern, `staticColorsDemo: true` enables the background zone decorator and `flexLayout: 'row-wrap'` handles item spacing. In the combined-story pattern, use structural `<div>` children instead of `flexLayout` so the decorator's `:first-child`/`:last-child` zone targeting is preserved.

### States

Combine all states into one story when possible.

```typescript
export const States: Story = {
  render: (args) => html`
    ${template({ ...args })} ${template({ ...args, selected: true })}
    ${template({ ...args, disabled: true })}
  `,
  tags: ['states'],
  parameters: { flexLayout: 'row-wrap' },
};
```

Complex states (e.g., animated indeterminate) may warrant separate stories.

```typescript
export const Indeterminate: Story = {
  tags: ['states'],
  args: {
    indeterminate: true,
  },
};
```

### Behaviors

Document automatic (built-in) behaviors, like text-wrapping, as well as, all methods, and all events.

```typescript
export const TextWrapping: Story = {
  render: (args) => html`
    ${template({ 'default-slot': 'Long text that wraps to multiple lines' })}
  `,
  tags: ['behaviors'],
};
```

### Accessibility

Required for every component. Document features and best practices in the per-unit MDX (`## Accessibility` section).

```typescript
export const Accessibility: Story = {
  tags: ['a11y'],
};
```

The Accessibility features list and best practices for the unit live in `## Accessibility` in the per-unit MDX, not above this story export.

## JSDoc requirements

Only the **meta-level JSDoc** above the `const meta: Meta = { ... }` declaration is authored. It is rendered by the `<Description />` block at the top of the docs page (inside `<DocsHeader />`). It should describe the component's purpose, primary use case, and link to related components.

Do **not** add JSDoc comments above any individual `export const Foo: Story = ...` declaration. Story prose lives in the per-unit MDX file alongside the corresponding `<Canvas of={Stories.Foo} />` reference.

```typescript
/**
 * A `<swc-badge>` is a non-interactive visual label that displays a status,
 * category, or attribute. For interactive labels, see
 * [Button](../?path=/docs/button--docs).
 */
const meta: Meta = {
  title: 'Badge',
  component: 'swc-badge',
  // ...
};
```

## Accessibility requirements

All stories must demonstrate accessible usage:

1. **Include required labels** - `label`, `aria-label`, or slot content as needed
2. **Use meaningful content** - No "Lorem ipsum" placeholder text
3. **Show proper ARIA usage** - Correct attributes when applicable
4. **Never show inaccessible patterns**

| Component type      | Required                     |
| ------------------- | ---------------------------- |
| Progress indicators | `label` attribute            |
| Buttons/actions     | Visible text or `aria-label` |
| Form fields         | `<label>` or `aria-label`    |
| Images/icons        | `alt` or `aria-label`        |

```typescript
// ✅ Good
export const Sizes: Story = {
  render: (args) => html`
    ${template({ ...args, size: 's', label: 'Uploading file' })}
    ${template({ ...args, size: 'm', label: 'Processing request' })}
  `,
};

// ❌ Bad - missing required label
export const Sizes: Story = {
  render: (args) => html`
    ${template({ ...args, size: 's' })} ${template({ ...args, size: 'm' })}
  `,
};
```

## Image assets

When stories require placeholder images, use the [picsum.photos](https://picsum.photos/) API instead of local image assets. This keeps the repository lightweight and provides consistent, high-quality images.

### Use static IDs for VRT consistency

**Always use static image IDs** to ensure visual regression tests (VRTs) produce consistent snapshots. Random images cause false positives in VRT comparisons.

**URL format**: `https://picsum.photos/id/{ID}/{WIDTH}/{HEIGHT}`

```typescript
// ✅ Good - static ID ensures consistent VRT snapshots
'default-slot': `<img src="https://picsum.photos/id/64/80/80" alt="User avatar" />`

// ✅ Good - with blur effect
'default-slot': `<img src="https://picsum.photos/id/56/80/80/?blur=2" alt="Background preview" />`

// ❌ Bad - random image causes VRT failures
'default-slot': `<img src="https://picsum.photos/80/80" alt="Random image" />`
```

### Recommended static IDs

Use these IDs for common use cases:

| ID  | Description        | Example URL                          |
| --- | ------------------ | ------------------------------------ |
| 64  | Portrait/avatar    | `https://picsum.photos/id/64/80/80`  |
| 56  | Background/texture | `https://picsum.photos/id/56/80/80`  |
| 823 | Person/profile     | `https://picsum.photos/id/823/80/80` |

### Example usage

```typescript
const anatomyArgs = [
  {
    variant: 'file',
    label: 'README.md',
  },
  {
    label: 'User avatar',
    'default-slot': `<img src="https://picsum.photos/id/64/80/80" alt="User avatar preview" />`,
  },
];

export const Anatomy: Story = {
  render: (args) => html`
    ${anatomyArgs.map((arg) => template({ ...args, ...arg }))}
  `,
  tags: ['anatomy'],
};
```

See `asset.stories.ts` for complete examples.

## Quick reference

### ❌ Don't

- Add JSDoc above any individual story export (Playground, Overview, or any other)
- Use the `'usage'` tag for new units (deprecated)
- Use the `'description-only'` tag (retired — prose-only sections live in MDX)
- Use the `'section-order'` parameter (retired — section order is hand-authored in MDX)
- Use `tags: ['autodocs', 'dev']` on a unit that has a per-unit MDX file (creates a duplicate Docs entry — use `['dev']`)
- Omit `subtitle` in meta parameters
- Use placeholder text
- Demonstrate inaccessible patterns

### ✅ Do

- Tag stories correctly: `anatomy`, `options`, `states`, `behaviors`, `a11y`
- Use `flexLayout: 'row-wrap'` for multi-item stories
- Author all story prose in the per-unit MDX file (`<unit>.mdx`)
- Keep the meta-level JSDoc above `const meta` — it drives the `<Description />` block at the top of the docs page
- Use meaningful, realistic content
- Reference each tagged story from MDX via `<Canvas of={Stories.StoryName} />`

## Checklist

- [ ] Copyright header (current year)
- [ ] Visual separators between sections
- [ ] Meta: title, component, args, argTypes, render, `parameters.docs.subtitle`, `tags: ['migrated']` (or `'controller'`)
- [ ] Internal attributes the component manages via `setAttribute` (not declared `@property`) are declared in `argTypes` with `{ table: { disable: true }, control: false }` so the Storybook helper does not round-trip and clobber them
- [ ] `title` uses sentence case, no filename labels, group is not a single-component wrapper
- [ ] Meta JSDoc description above meta object (with component links if applicable)
- [ ] Subtitle is concise and non-repetitive (plain text only, no links)
- [ ] Playground: `['dev']` tag when an MDX exists (or `['autodocs', 'dev']` for template-only fallback), no JSDoc, common use case args
- [ ] Overview: `['overview']` tag, common use case args, no JSDoc on story itself
- [ ] Anatomy: all slots + content properties, `['anatomy']` tag, `flexLayout: 'row-wrap'`
- [ ] Options: all uncovered attributes, `['options']` tag, `flexLayout: 'row-wrap'`
- [ ] States: consolidated states, `['states']` tag, `flexLayout: 'row-wrap'` (if applicable)
- [ ] Behaviors: `['behaviors']` tag (if applicable)
- [ ] Accessibility: `['a11y']` tag (prose lives in MDX)
- [ ] Static colors: three-story or combined-story pattern with `staticColorsDemo` (if applicable)
- [ ] No story-level JSDoc comments above any `export const`
- [ ] No `section-order` parameter on any story
- [ ] No `description-only` tag on any story
- [ ] All stories accessible with meaningful content
- [ ] Image assets: use `picsum.photos` with static IDs (if applicable)
- [ ] Per-unit MDX file exists at the unit root and references each section-tagged story via `<Canvas of={Stories.StoryName} />` (see `.ai/rules/stories-documentation.md`)
