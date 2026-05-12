[Consumer migration guide skill](../SKILL.md) / Full prompt

# Spectrum consumer migration guide prompt

For the **[COMPONENT_NAME]** component(s), create one consumer-facing migration guide per component at `2nd-gen/packages/swc/components/[component-name]/consumer-migration-guide.mdx`.

The file must be **MDX**, not plain Markdown. Storybook's config (`2nd-gen/packages/swc/.storybook/main.ts`) picks up `**/*.mdx` under `../components` with `titlePrefix: 'Components'`, so the guide renders at `Components/[Component name]/Consumer migration guide`.

The guide ships alongside the Spectrum 2 component source. Do **not** create or move this file under `CONTRIBUTOR-DOCS/`.

These guides are for **application developers upgrading their code** from Spectrum 1 to Spectrum 2. The only question each section should answer is: **"What do I change in my product code?"**

## Scope and length

Keep the guide **short, direct, and scannable**. A consumer should be able to complete a simple migration in under 5 minutes of reading. Prefer a single change table, short numbered steps, and before/after snippets over prose.

### Include (public API only)

- Tag name and import path changes
- Attributes, properties, and accepted values
- Slots and content-rendering properties
- Events
- Supported CSS custom properties (documented `--mod-*` and other public theming hooks)
- Accessibility changes that affect consumer markup (e.g. where to place `aria-label`, when to hide decorative icons)
- Observable behavior changes (focus, wrapping, positioning)

### Exclude

- Internal shadow DOM structure or diffs between versions
- Internal class-name renames (e.g. `spectrum-*` → `swc-*`). One brief "do not target internal classes or shadow DOM" caution is enough
- `::part()` shadow parts unless a part is explicitly public API
- Maintainer-facing migration rationale or sequencing
- **Links to `CONTRIBUTOR-DOCS/` project-planning docs.** Those are maintainer-facing. Do not include them in the guide.

### Structure steps logically

In "Update your code", present **numbered steps in the order the consumer performs them** (for example: 1. update imports, 2. rename tags, 3. fix consumer-facing accessibility gaps, 4. optionally adopt new attributes). Do not split into parallel subsections when a short numbered flow reads better.

## Source verification

Before writing, verify claims against:

- `1st-gen/packages/[component-name]/README.md` and public element files (`sp-*.ts`)
- `2nd-gen/packages/swc/components/[component-name]/src/`, stories, and tests

If a claim is not confirmed by source, omit it.

### Source precedence

When sources disagree, follow this order of authority:

1. **The shipped Spectrum 2 source** (`2nd-gen/packages/swc/components/[component-name]/` and `2nd-gen/packages/core/components/[component-name]/`) — ground truth for what the component actually does.
2. **The CSS style guide** (`CONTRIBUTOR-DOCS/02_style-guide/` and `.ai/rules/styles.md`) — recommendations here **outweigh** anything in a component's `rendering-and-styling-migration-analysis.md`. The analysis docs are early, component-specific planning artifacts; the style guide is the canonical, cross-component rule set and supersedes them when they conflict (for example on custom-property naming, prefixing, and public-vs-private boundaries).
3. **`rendering-and-styling-migration-analysis.md`** and other maintainer-facing analysis docs — use only for context and rationale. If an analysis doc suggests a public API shape that the Spectrum 2 source or the CSS style guide contradicts, trust the source and the style guide, not the analysis.

## File and heading format

Start every guide with this exact template:

```mdx
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="[Component name]/Consumer migration guide" />

# [Component name] consumer migration guide
```

- Use sentence case for `[Component name]` (for example `Badge`, `Action button`).
- Do **not** prefix `<Meta title>` with `Components/` — `titlePrefix` supplies it.
- Use sentence case for all other headings.
- Prefer tables, bullets, and fenced code blocks over prose.

**MDX rules:**

- Wrap bare tag names in backticks in prose (`` `<sp-badge>` ``, `` `<swc-badge>` ``)
- Put all HTML/JS examples inside fenced code blocks
- Do not leave loose `{` / `}` outside code blocks
- Inside JSX elements (e.g. callout `<div>`s), wrap any `<code>` content that contains `*`, `_`, or `<`/`>` in a JSX expression literal (e.g. `<code>{'--mod-badge-*'}</code>`). Otherwise MDX parses the markdown inside the JSX children and throws an "Expected the closing tag" indexing error.
- Do not include `CONTRIBUTOR-DOCS` breadcrumbs or TOCs

## Required sections

Use exactly this **H2** order. Omit any section that has no component-specific content rather than writing filler.

1. `# [Component name] consumer migration guide` — H1, followed by **one sentence** summarizing the migration.
2. `## What changed` — up to three tables (`### Renamed`, `### Added in Spectrum 2`, `### Removed in Spectrum 2`). Omit any sub-section with no entries. **Never** include an `### Unchanged` sub-section.
3. `## Update your code` — numbered steps in the order the consumer performs them. Every step includes a before/after snippet.
4. `## Accessibility` — consumer-facing a11y actions only. Do not repeat code examples already shown in `## Update your code` — link back to the relevant step instead. Skip if nothing changed.
5. `## Styling` — only public CSS custom properties and a one-line "don't target internals" caution. Skip if nothing changed.
6. `## Checklist` — `- [ ]` task list of the concrete actions the consumer must take.

Do **not** add: `Overview`, `Before you migrate`, `Migration in one sentence`, `Who this guide is for`, `Also read`, `Testing`, `References`, `Unchanged`, or separator `---` rules between every section. Keep the document tight.

**Testing is out of scope.** Consumers are responsible for updating their own tests; the guide should not include test-update instructions, snapshot guidance, or VRT approval steps.

## Section requirements

### H1 + one-sentence summary

Example:

```mdx
# Badge consumer migration guide

Replace `<sp-badge>` with `<swc-badge>` and update the import. The public API is unchanged.
```

### `## What changed`

Use up to three `###` sub-section tables — **only include a sub-section if it has entries**. Each sub-section is a table focused on one kind of change:

- **`### Renamed`** — tag, import path, property prefixes, or other 1:1 renames. Columns: `Area | Spectrum 1 | Spectrum 2`.
- **`### Added in Spectrum 2`** — new attributes, variants, slots, or custom properties the consumer may adopt. Columns: `Addition | Notes`.
- **`### Removed in Spectrum 2`** — removed public API with replacement guidance. Columns: `Removed | Replacement`.

Do **not** include an `### Unchanged` sub-section. Unchanged API requires no consumer action and adds noise.

Cover only **public API** — tags, import paths, attributes and accepted values, slots, events, documented CSS custom properties, and consumer-observable behavior. Do not list shadow-DOM internals, private `--_*` properties, internal class renames, or attributes set on shadow-DOM elements that consumers cannot select.

### `## Update your code`

Numbered `###` subheadings, in the order the consumer performs them. **Every step must include a minimal before/after snippet** using `<!-- Before -->` / `<!-- After -->` comments inside a single fenced code block. Typical order:

1. Update the import
2. Rename the tag
3. Fix consumer-facing accessibility gaps (only if applicable)
4. (Optional) Adopt new attributes (only if applicable)

Skip any step that does not apply — do not write "no changes needed" filler. For optional adoption steps, the "before" can be the Spectrum 1 markup without the new attribute and the "after" is the Spectrum 2 markup with it.

### `## Accessibility`

Bulleted list of consumer-facing actions. **Do not duplicate code examples that already appear in `## Update your code`.** If the a11y action is represented as a numbered step above (e.g. "add `aria-label` to icon-only badges"), the bullet should summarize the rule and link to the step (`See [step N](#n-step-slug)`) — no snippet. Only include a code example for a11y actions that are **not** covered in `## Update your code`. Non-code bullets (e.g. "refactor interactive uses to X") remain text-only.

### `## Styling`

Document the **Spectrum 2 component's actual public custom properties** — not Spectrum 1's. The Spectrum 2 implementation supersedes Spectrum 1: verify the real property names, prefixes, and behavior directly in `2nd-gen/packages/swc/components/[component-name]/[component].css` and `2nd-gen/packages/core/components/[component-name]/`. Do **not** carry over Spectrum 1 `--mod-*` names unless the Spectrum 2 CSS actually uses them.

Cover only:

- The public custom properties the Spectrum 2 component exposes, as a table. Use two columns (`Custom property | Description`) when no properties have scope constraints. Add a third `Notes` column only when at least one property needs it (e.g. "semantic variants only", "outline variants only", exclusions mandated by the CSS style guide). Do not include a Notes column with all-empty cells.
- Include this JSX comment immediately above the table so future passes can replace the hand-written descriptions with the canonical copy once it lands:

  ```mdx
  {/* @todo Replace the Description column with the `@cssproperty` JSDoc descriptions from `<swc-[component]>`'s CEM entry once they are added in a follow-up PR. */}
  ```

- **Required amber "breaking change" callout at the top** (immediately after the section intro sentence, before the property list) **if** the Spectrum 1 component used a different custom-property prefix (e.g. `--mod-*`) and Spectrum 2 does not. Tells consumers their Spectrum 1 overrides won't apply. Template:

  ```mdx
  <div
    style={{
      borderLeft: '4px solid #dba842',
      background: 'rgba(219, 168, 66, 0.12)',
      padding: '12px 16px',
      margin: '16px 0',
      borderRadius: '4px',
    }}
  >
    <strong>⚠️ Breaking change.</strong> Spectrum 1{' '}
    <code>{'--mod-[component]-*'}</code> properties{' '}
    <strong>do not apply</strong> to <code>{'<swc-[component]>'}</code>. Remove
    or replace every <code>{'--mod-[component]-*'}</code> override with the{' '}
    <code>{'--swc-[component]-*'}</code> equivalents below. Not every Spectrum 1
    property has a 1:1 replacement, so read the list below carefully.
  </div>
  ```

- **Required red "do not target internals" callout at the bottom** of the section, always — regardless of whether custom properties changed. Template:

  ```mdx
  <div
    style={{
      borderLeft: '4px solid #e34850',
      background: 'rgba(227, 72, 80, 0.10)',
      padding: '12px 16px',
      margin: '16px 0',
      borderRadius: '4px',
    }}
  >
    <strong>🚫 Do not target internals.</strong> Internal classes,{' '}
    <code>{'--_swc-[component]-*'}</code> private properties, and shadow DOM are{' '}
    <strong>not public API</strong>. Styling applied to them will break without
    warning on minor releases.
  </div>
  ```

  Replace `[component]` in each template with the Spectrum 2 tag root (e.g. `badge` → `<swc-badge>`, `--_swc-badge-*`, `--mod-badge-*`). Both callouts use inline-styled JSX divs, not blockquotes — blockquotes are not visually distinct enough for consumer-critical warnings.

  Immediately before the first callout in the section, include this JSX comment so every guide carries the same follow-up task:

  ```mdx
  {/* @todo Replace the inline-styled callouts in this section with `<swc-inline-alert>` once it is migrated to Spectrum 2. */}
  ```

Skip this section only if the component has no public styling hooks in either version.

### `## Checklist`

`- [ ]` task list of the concrete actions the consumer must take. Each item should map 1:1 to a step above. Keep it to the minimum viable list — no "consider" or "review" filler.

## Writing style

- Use imperative voice: "Replace", "Rename", "Add", "Do not".
- Cut adjectives, hedges, and any sentence that does not tell the consumer what to do.
- Do not duplicate information across sections.
- Do not include rollout playbooks, fallback strategies, or staged-migration advice unless the component genuinely requires it.

## Quality bar

Before finishing, confirm:

- The guide fits on roughly one screen when scrolled, or reads in under 5 minutes.
- Every sentence tells the consumer something they must do, check, or know to migrate.
- No shadow DOM, internal class, or maintainer-facing content is present.
- No links to `CONTRIBUTOR-DOCS/` are present.
