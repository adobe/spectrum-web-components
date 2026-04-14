# Component migration guide standards

Use this rule when creating or updating a `migration.md` file for a 2nd-gen component.

## When to apply

Apply when the user requests any of the following:

- Create a migration guide for a component
- Update or review an existing migration guide
- Standardize migration guide format across components

## File location

Each migration guide lives alongside the component it documents:

```
2nd-gen/packages/swc/components/[component-name]/migration.md
```

## Required document structure

Every migration guide must include all of the following sections in this order:

```md
# [Component] migration guide: `sp-[component]` → `swc-[component]`

[Intro paragraph]

---

## Installation

## Quick reference

## Breaking changes

### Tag name

### [One subsection per breaking change]

## New in 2nd-gen (omit if none)

### [One subsection per new feature]

## Accessibility
```

Use `---` horizontal rules between all top-level sections.

## Title and intro format

```md
# Badge migration guide: `sp-badge` → `swc-badge`

This guide covers everything you need to move from the 1st-gen `sp-badge` component
(`@spectrum-web-components/badge`) to the 2nd-gen `swc-badge` component
(`@adobe/spectrum-wc/badge`).
```

- Title uses backtick-wrapped tag names, arrow separator
- Intro names both packages explicitly

## Installation section

Always include the yarn remove/add commands, then the import update. Add the monolithic
package note when the component ships via `@adobe/spectrum-wc`:

````md
## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/[component]

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/[component]/sp-[component].js';

// After
import '@adobe/spectrum-wc/[component]';
```

> **Note:** `@adobe/spectrum-wc` is a monolithic package — installing it makes all
> components available. Importing via a subpath (e.g. `@adobe/spectrum-wc/[component]`)
> routes to that component's dedicated bundle, so only that module is loaded rather
> than the entire package.
````

## Quick reference table

A concise change summary at the top. Always include tag name, package, and CSS custom
properties rows. Add a row for every attribute, slot, or behavior that changed.

Link anchor text in the "After" column to the relevant breaking change section when the
change needs explanation.

```md
## Quick reference

| What changed          | Before (1st-gen)                       | After (2nd-gen)                                            |
| --------------------- | -------------------------------------- | ---------------------------------------------------------- |
| Tag name              | `sp-[component]`                       | `swc-[component]`                                          |
| Package               | `@spectrum-web-components/[component]` | `@adobe/spectrum-wc`                                       |
| `variant` attribute   | Description of old behavior            | Description of new behavior — see [Section title](#anchor) |
| CSS custom properties | `--mod-[component]-*`                  | `--swc-[component]-*`                                      |
```

Use **Removed**, **New**, or **Unchanged** as shorthand in the After column where appropriate.

## Breaking changes section

One `###` subsection per breaking change. Tag name always comes first.

### Tag name subsection (always required)

````md
### Tag name

Find and replace all instances of `sp-[component]` with `swc-[component]` in your
templates and HTML.

```html
<!-- Before -->
<sp-[component]>...</sp-[component]>

<!-- After -->
<swc-[component]>...</swc-[component]>
```
````

### Other breaking change subsections

Each subsection follows this structure:

1. One-sentence description of what changed and why (reference the Spectrum 2 spec when relevant)
2. Before/after code block
3. Migration guidance (what to do, what to remove)
4. Optional blockquote for important notes or caveats

````md
### `[attribute]` renamed to `[new-attribute]`

The `[attribute]` attribute has been renamed to `[new-attribute]` because [reason].

```html
<!-- Before -->
<sp-[component] [attribute]="value"></sp-[component]>

<!-- After -->
<swc-[component] [new-attribute]="value"></swc-[component]>
```
````

````md
### `[attribute]` removed

The `[attribute]` attribute is not part of the Spectrum 2 design specification and has
been removed.

**After:** [Describe the recommended approach to replace the removed behavior.]

```html
<!-- Before -->
<sp-[component] [attribute]>...</sp-[component]>

<!-- After: [brief description of replacement] -->
<swc-[component]>...</swc-[component]>
```
````

### CSS custom properties subsection

Always include a full mapping table followed by a before/after code block:

````md
### CSS custom properties

All `--mod-[component]-*` custom properties have been removed. Replace them with the
`--swc-[component]-*` equivalents in your stylesheets:

| Removed (1st-gen)              | Replacement (2nd-gen)          |
| ------------------------------ | ------------------------------ |
| `--mod-[component]-[property]` | `--swc-[component]-[property]` |

```css
/* Before */
sp-[component] {
  --mod-[component]-[property]: value;
}

/* After */
swc-[component] {
  --swc-[component]-[property]: value;
}
```
````

Add a blockquote for non-obvious override behavior (e.g., attribute-based vs class-based
selector scoping for per-variant overrides).

## New in 2nd-gen section

One `###` subsection per new feature. Omit the section entirely if there are no new
features — do not include it with empty content.

````md
## New in 2nd-gen

### `[attribute]` attribute

A new `[attribute]` boolean attribute [description of what it does and when to use it].

```html
<swc-[component] [attribute]>...</swc-[component]>
```
````

## Accessibility section

A bullet list — no subsections. Cover:

- Whether the component has an implicit ARIA role
- Labeling requirements (what provides the accessible name)
- Color contrast or "color alone" considerations (WCAG 1.4.1) if the component uses color to convey meaning
- Any ARIA attributes that should or should not be added by consumers
- Keyboard behavior if the component is interactive
- Notes specific to removed or changed features that affect AT users

```md
## Accessibility

- [One bullet per a11y consideration, specific to this component]
```

Do not add `role`, `aria-label`, or `aria-live` suggestions that aren't accurate for the component.

## Code example rules

- HTML before/after: use `<!-- Before -->` and `<!-- After -->` comments
- CSS before/after: use `/* Before */` and `/* After */` comments
- TypeScript/JS before/after: use `// Before` and `// After` comments
- Always show complete, working snippets — no abbreviated or placeholder markup
- Use meaningful content in examples (e.g. `Approved`, `Published`) — not `Label` or `Content`
- All examples must be accessible (labels, alt text, etc.)

## Accuracy requirements

Before writing or updating a migration guide, verify claims against source:

1. **Check 1st-gen component** (`1st-gen/packages/[component]/src/`) for actual removed/renamed attributes
2. **Check 2nd-gen component** (`2nd-gen/packages/swc/components/[component]/`) for current API
3. **Check 1st-gen CEM** (`1st-gen/packages/[component]/custom-elements.json`) for complete property list
4. **Check CSS files** for actual custom property names in both generations

Do not claim attributes, properties, or CSS variables that don't exist in the source.

## Checklist

Before completing a migration guide, verify:

- [ ] Starts with `# [Component] migration guide: \`sp-[component]\` → \`swc-[component]\``
- [ ] Intro paragraph names both packages
- [ ] Installation section includes remove, add, and import update
- [ ] Quick reference table covers all changed attributes, slots, and CSS properties
- [ ] Quick reference links to relevant breaking change sections
- [ ] Tag name is the first breaking change
- [ ] Every breaking change has a before/after code block
- [ ] CSS custom properties section includes full mapping table
- [ ] `## New in 2nd-gen` present only if new features exist
- [ ] Accessibility section is component-specific (not generic boilerplate)
- [ ] All examples use meaningful content and are accessible
- [ ] `---` horizontal rules between all top-level sections
- [ ] All claims verified against component source
