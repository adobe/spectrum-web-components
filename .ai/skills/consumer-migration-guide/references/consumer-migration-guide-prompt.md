[Consumer migration guide skill](../SKILL.md) / Full prompt

# Spectrum consumer migration guide prompt

For the **[COMPONENT_NAME]** component(s), create one consumer-facing migration guide per component at `2nd-gen/packages/swc/components/[component-name]/consumer-migration-guide.mdx`.

The file must be **MDX**, not plain Markdown. Storybook's config (`2nd-gen/packages/swc/.storybook/main.ts`) picks up `**/*.mdx` under `../components` with `titlePrefix: 'Components'`, so the guide renders as a docs page at `Components/[Component name]/Consumer migration guide`.

The guide ships alongside the 2nd-gen component source. Do **not** create or move this file under `CONTRIBUTOR-DOCS/`; the maintainer-facing `rendering-and-styling-migration-analysis.md` and `accessibility-migration-analysis.md` stay in `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/`, but the consumer guide lives with the component.

These guides are for **application developers upgrading their code** from 1st-gen Spectrum Web Components to 2nd-gen components. Internal maintainers may also use them, but the primary question every section should answer is:

**"What do I need to change in my product code, styling, tests, and rollout plan?"**

## Documentation goal

The guide should help consumers:

1. Identify the 1st-gen component they are replacing
2. Understand the 2nd-gen replacement and any important conceptual shifts
3. Update markup, attributes, properties, slots, events, and imports
4. Adjust styling and customization patterns that changed in 2nd-gen
5. Validate accessibility and behavior changes in their application
6. Roll out the migration safely with testing and fallback guidance

Do not write this as an internal implementation roadmap. Keep the language practical, direct, and upgrade-oriented.

## Source verification requirements

Before writing, verify the component against the real repo sources that apply:

- **1st-gen component docs and public API**
  - `1st-gen/packages/[component-name]/README.md`
  - public custom element entry points such as `sp-*.ts`
  - stories or tests when needed to confirm public behavior
- **2nd-gen component docs and public API**
  - `2nd-gen/packages/swc/components/[component-name]/src/`
  - stories and tests when needed to confirm public behavior
- **Migration analysis documents** (in `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/`)
  - `rendering-and-styling-migration-analysis.md`
  - `accessibility-migration-analysis.md`

If a claim is not confirmed by source, docs, or related migration analysis, do not present it as fact. Either omit it or call out the uncertainty explicitly.

## File and heading format

- Start every guide with this exact template so Storybook picks it up under the component:

  ```mdx
  import { Meta } from '@storybook/addon-docs/blocks';

  <Meta title="[Component name]/Consumer migration guide" />

  # [Component name] consumer migration guide
  ```

  - Use sentence case for `[Component name]` in both the `<Meta title>` and the H1 (for example `Badge`, `Action button`, `Progress circle`).
  - Do **not** prefix `<Meta title>` with `Components/` — the Storybook config supplies the `Components` title prefix automatically.

- Use sentence case for all other headings too
- Separate major sections with `---`
- Prefer short paragraphs, bullets, tables, and code examples that scan well
- **MDX rules** to keep the file parseable:
  - Wrap bare tag names in inline code (`` `<sp-badge>` ``, `` `<swc-badge>` ``) when referenced in prose
  - Put HTML and JS examples inside fenced code blocks (` ```html ` / ` ```js `)
  - Do not leave loose `{` / `}` outside code blocks; MDX treats them as JS expressions
  - Do not add generated-breadcrumb or TOC blocks from the `CONTRIBUTOR-DOCS` nav script; they are not applicable here

## Required section order

Use this **H2** order:

1. `## Overview`
2. `## Before you migrate`
3. `## What changed`
4. `## Update your code`
5. `## Styling and customization changes`
6. `## Accessibility and behavior changes`
7. `## Testing and rollout guidance`
8. `## Migration checklist`
9. `## References`

Do not skip sections that apply. If a section truly has no component-specific content, say so briefly rather than silently omitting it.

## Section requirements

### 1. Overview

Start with a short paragraph that names:

- the 1st-gen component
- the 2nd-gen replacement
- the purpose of the guide

Use these **`###` subheadings** when they fit:

- `### Also read`
  - Link to the component's `rendering-and-styling-migration-analysis.md` in `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/`
  - Link to `accessibility-migration-analysis.md` in the same `CONTRIBUTOR-DOCS` folder when present
  - Use a repo-root-relative path from the consumer guide's location (e.g. `../../../../../CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/rendering-and-styling-migration-analysis.md`)
- `### Who this guide is for`
  - State that it is for application developers upgrading product code
- `### Migration in one sentence`
  - Give a concise summary of the main shift, for example API rename, markup change, styling model change, or behavior change

### 2. Before you migrate

Prepare the consumer before they start editing code.

Use these **`###` subheadings**:

- `### Confirm the replacement component`
  - State the target 2nd-gen component and note if there is not a one-to-one mapping
- `### Inventory your current usage`
  - Tell readers what to search for in their codebase: tag names, attributes, slot usage, CSS selectors, tests, and any wrappers
- `### Plan the migration strategy`
  - Call out whether migration is usually straightforward, staged, or likely to need wrapper components, feature flags, or coordinated visual QA

### 3. What changed

Summarize changes in a **table** with these columns:

`Area | What changed | What consumers need to do`

Cover the areas that apply:

- element or import name
- markup structure
- attributes and properties
- slots or content model
- events
- styling hooks, classes, or CSS custom properties
- accessibility semantics
- test assumptions

This section is the executive summary. Keep it tight and actionable.

### 4. Update your code

This is the main consumer migration section.

Use these **`###` subheadings** in order when they apply:

- `### Replace the component in markup`
- `### Update attributes, properties, and events`
- `### Update slots and content structure`
- `### Before and after examples`

Requirements:

- Use concrete before/after code snippets
- Prefer real tag names and realistic usage patterns from the repo
- If multiple common migration patterns exist, show more than one example
- If something from 1st-gen has no 2nd-gen equivalent, say that plainly and give the recommended replacement or workaround

### 5. Styling and customization changes

Explain how consumers need to update app-level styling or customization.

Use these **`###` subheadings** when they apply:

- `### CSS classes and DOM assumptions`
- `### CSS custom properties, tokens, and supported theming hooks`
- `### Unsupported customization patterns`

Requirements:

- Call out when 1st-gen consumers relied on internal Shadow DOM structure, classes, or selectors that should no longer be targeted
- Explain any move from ad hoc styling to supported tokens, component APIs, or documented hooks
- If styling customization is intentionally more constrained in 2nd-gen, say so directly
- Link back to the rendering-and-styling migration analysis doc for deeper maintainer detail instead of duplicating it

### 6. Accessibility and behavior changes

Explain changes that affect product behavior or accessibility expectations.

Use these **`###` subheadings** when they apply:

- `### Accessibility improvements and new expectations`
- `### Behavior changes to validate in product`
- `### Cases that may need product review`

Requirements:

- Focus on what consumers need to validate in their application, not only on implementation details
- Call out changed semantics, focus behavior, labels, announcements, or interaction patterns
- Mention when consumers may need to update surrounding markup, accessible names, helper text, or testing expectations
- Link to the accessibility migration analysis doc for deeper background when available

### 7. Testing and rollout guidance

This section must include practical rollout advice, not just test reminders.

Use these **`###` subheadings** in order:

- `### Visual QA`
- `### Accessibility QA`
- `### Automated tests to update`
- `### Rollout and fallback strategy`

Requirements:

- Tell consumers what visual changes to expect and verify
- Include accessibility checks that matter for this component
- Call out test categories likely to break: selectors, snapshots, ARIA assertions, event expectations, or interaction flows
- When appropriate, recommend phased rollout, wrapper-based fallback, feature flags, or side-by-side verification
- If fallback guidance is not component-specific, provide a concise default recommendation rather than leaving the section empty

### 8. Migration checklist

Use a markdown task list (`- [ ]`) with concrete, verifiable actions. Cover:

- code updates
- styling updates
- accessibility review
- automated test updates
- rollout or release readiness

### 9. References

Include the most relevant sources used to write the guide.

At minimum, link to:

- the component's 1st-gen README or public docs when available
- the component's related migration analysis docs when available
- any relevant internal contributor docs that support the migration guidance

## Writing style

- Write for readers who are migrating product code, not building the component internals
- Prefer direct instructions such as "Replace", "Remove", "Verify", and "Do not rely on"
- Avoid vague statements like "may differ" when the source shows exactly what changed
- Avoid duplicating deep implementation detail from the analysis docs; summarize the impact and link out
- Use Adobe documentation standards and plain, scannable wording

## Quality bar

Before finishing, confirm the guide answers these questions clearly:

- What component should I migrate to?
- What code do I need to change?
- What styling assumptions might break?
- What accessibility or behavior changes should I verify?
- What tests do I need to update?
- How should I roll this out safely?
