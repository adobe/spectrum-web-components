[Consumer migration guide skill](../SKILL.md) / Full prompt

# Spectrum consumer migration guide prompt

For the **[COMPONENT_NAME]** component(s), create one consumer-facing migration guide per component at `2nd-gen/packages/swc/components/[component-name]/consumer-migration-guide.mdx`.

The file must be **MDX**, not plain Markdown. Storybook's config (`2nd-gen/packages/swc/.storybook/main.ts`) picks up `**/*.mdx` under `../components` with `titlePrefix: 'Components'`, so the guide renders at `Components/[Component name]/Consumer migration guide`.

The guide ships alongside the 2nd-gen component source. Do **not** create or move this file under `CONTRIBUTOR-DOCS/`.

These guides are for **application developers upgrading their code** from 1st-gen to 2nd-gen. The only question each section should answer is: **"What do I change in my product code?"**

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
- Do not include `CONTRIBUTOR-DOCS` breadcrumbs or TOCs

## Required sections

Use exactly this **H2** order. Omit any section that has no component-specific content rather than writing filler.

1. `# [Component name] consumer migration guide` — H1, followed by **one sentence** summarizing the migration.
2. `## What changed` — a single summary table.
3. `## Update your code` — numbered steps in the order the consumer performs them.
4. `## Styling` — only public CSS custom properties and a one-line "don't target internals" caution. Skip if nothing changed.
5. `## Accessibility` — consumer-facing a11y actions only, each with a minimal code example. Skip if nothing changed.
6. `## Checklist` — `- [ ]` task list of the concrete actions the consumer must take.

Do **not** add: `Overview`, `Before you migrate`, `Migration in one sentence`, `Who this guide is for`, `Also read`, `Testing`, `References`, or separator `---` rules between every section. Keep the document tight.

**Testing is out of scope.** Consumers are responsible for updating their own tests; the guide should not include test-update instructions, snapshot guidance, or VRT approval steps.

## Section requirements

### H1 + one-sentence summary

Example:

```mdx
# Badge consumer migration guide

Replace `<sp-badge>` with `<swc-badge>` and update the import. The public API is unchanged.
```

### `## What changed`

A single table with two columns: `Area | Change`. Cover only the areas that actually changed:

- tag name
- import path
- attributes and accepted values
- slots
- events
- anything new in 2nd-gen the consumer may want to adopt
- any constraint the consumer must respect

### `## Update your code`

Numbered `###` subheadings, in the order the consumer performs them, each with a minimal before/after snippet. Typical order:

1. Update the import
2. Rename the tag
3. Fix consumer-facing accessibility gaps (only if applicable)
4. (Optional) Adopt new attributes (only if applicable)

Skip any step that does not apply — do not write "no changes needed" filler.

### `## Styling`

Document the **2nd-gen component's actual public custom properties** — not 1st-gen's. The 2nd-gen implementation supersedes 1st-gen: verify the real property names, prefixes, and behavior directly in `2nd-gen/packages/swc/components/[component-name]/[component].css` and `2nd-gen/packages/core/components/[component-name]/`. Do **not** carry over 1st-gen `--mod-*` names unless the 2nd-gen CSS actually uses them.

Cover only:

- The public custom properties the 2nd-gen component exposes (bulleted list of names).
- If the 1st-gen component used a different prefix (e.g. `--mod-*`) and 2nd-gen does not, call that out explicitly so consumers know to replace their overrides.
- A one-line caution: "Do not target internal classes, private `--_*` properties, or shadow DOM — none are public API."

Skip this section only if the component has no public styling hooks in either version.

### `## Accessibility`

Bulleted list of consumer-facing actions. **Each bullet with a concrete behavior change must include a minimal code example** showing the corrected markup. Non-code bullets (e.g. "refactor interactive uses to X") can remain text-only.

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
