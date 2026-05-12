---
name: consumer-migration-guide
description: Use when creating a per-component migration guide for application developers upgrading from Spectrum 1 Web Components to Spectrum 2 components.
globs: 2nd-gen/packages/swc/components/*/consumer-migration-guide.mdx
alwaysApply: false
---

# Component migration: consumer guide

Create per-component migration guidance for application developers upgrading app code from Spectrum 1 Web Components to Spectrum 2 components. The output should be practical and consumer-facing: what changed, what to update, how to test it, and how to roll it out safely.

## When to use this skill

- The user asks for a migration guide, upgrade guide, or consumer-facing migration doc for one or more components
- You are documenting what application developers need to change when replacing a Spectrum 1 component with its Spectrum 2 equivalent
- The guide needs rollout advice in addition to code updates, such as styling, accessibility, testing, and fallback considerations

## How to invoke

- Say "create a consumer migration guide for [component]"
- Or say "write an upgrade guide for [component]" or "document how consumers migrate [component] from Spectrum 1 to Spectrum 2"
- If the request is about maintainer-facing implementation analysis, use the migration-analysis skills instead

## Quick reference

### Output

- **One `.mdx` file per component** at:
  `2nd-gen/packages/swc/components/[component-name]/consumer-migration-guide.mdx`
- The file is Storybook-renderable MDX. Start every guide with this template so it picks up the `Components` title prefix wired in `2nd-gen/packages/swc/.storybook/main.ts`:

  ```mdx
  import { Meta } from '@storybook/addon-docs/blocks';

  <Meta title="[Component name]/Consumer migration guide" />

  # [Component name] consumer migration guide
  ```

  Use sentence case for `[Component name]` (for example `Badge`, `Action button`). Do **not** include `Components/` in the `<Meta title>` — `titlePrefix` already adds it, so the doc renders at `Components/[Component name]/Consumer migration guide`.

- Consumer migration guides live alongside the Spectrum 2 component source so the doc ships with the component code. Do **not** add them to `CONTRIBUTOR-DOCS/`.
- **Do not link to project-planning / `CONTRIBUTOR-DOCS` docs** from the guide. Those are maintainer-facing; consumers don't need them. Link only to public consumer docs (e.g. the Spectrum 1 README on npm or the Spectrum 2 component Storybook page) when a link genuinely helps.
- **Nav:** The guide lives in the component directory, so the `CONTRIBUTOR-DOCS` `update-nav.js` script does not manage it. Do not register it in `CONTRIBUTOR-DOCS/03_project-planning/03_components/README.md`, and do not include auto-generated breadcrumbs or TOC markers intended for that script.
- **MDX gotchas:** Keep bare tag names (`<sp-badge>`, `<swc-badge>`, etc.) wrapped in backticks in prose, and keep HTML/JS examples inside fenced code blocks. Avoid loose `{` / `}` outside code blocks; MDX parses them as JS expressions.

### Step 0: Read the migration plan first

Before writing anything, read `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md`. Locate every item in the documentation checklist that is flagged as "deferred to consumer migration guide" — these are the breaking changes Phase 7 has already identified as needing coverage here. They are the primary input for this guide's `## What changed` and `## Update your code` sections. If the migration plan is absent, derive the breaking changes from the 1st-gen and 2nd-gen source comparison and note the risk.

### Consistent import and tag patterns

All guides follow the same import and tag name conventions. Do not grep for these — derive them from the component name:

|                    | Spectrum 1                                               | Spectrum 2                       |
| ------------------ | -------------------------------------------------------- | -------------------------------- |
| Tag                | `sp-[component]`                                         | `swc-[component]`                |
| Side-effect import | `@spectrum-web-components/[component]/sp-[component].js` | `@adobe/spectrum-wc/[component]` |

Use the badge guide at `2nd-gen/packages/swc/components/badge/consumer-migration-guide.mdx` as the canonical format reference.

### Required source inputs

Verify claims against the real implementation and docs before writing:

- **Migration plan:** `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` — primary source for what breaking changes to cover (see Step 0 above)
- **Spectrum 1 docs and source:** `1st-gen/packages/[component-name]/README.md`, public element files such as `sp-*.ts`, stories, and tests when needed
- **Spectrum 2 docs and source:** `2nd-gen/packages/swc/components/[component-name]/src/`, stories, tests, and any package README or docs that describe the public API
- **Related migration docs:** the component's `rendering-and-styling-migration-analysis.md` and `accessibility-migration-analysis.md` when present

### Important

- Write for **application developers upgrading their code**, not only for component maintainers
- Prefer **before/after examples**, explicit upgrade actions, and rollout guidance over implementation detail
- Do not invent upgrade paths. If a mapping is uncertain, omit it and ask the user rather than guessing — wrong instructions can break consumer apps
- Em dashes and Jira ticket references are prohibited in this guide; see `.ai/rules/text-formatting.md`

### Scope: minimal, public API only

The guide must be **short, direct, and consumer-focused**. Optimize for scannability: a consumer should be able to complete a simple migration in under 5 minutes of reading. Prefer tables, short numbered steps, and before/after snippets over prose. Cut anything that is not strictly required to update product code.

**Spectrum 2 supersedes Spectrum 1.** Verify every claim — especially styling hooks and public custom property names — against the actual Spectrum 2 source (`2nd-gen/packages/swc/components/[component-name]/` and `2nd-gen/packages/core/components/[component-name]/`). Do not carry Spectrum 1 conventions (e.g. `--mod-*` prefixes) into the guide unless the Spectrum 2 implementation actually uses them.

**Testing is out of scope.** Do not include sections on test selector updates, ARIA snapshot changes, or VRT approval. Consumers own their own tests; the guide's job is to explain what changed in the component, not how to re-test a consumer's app.

**Accessibility bullets do not duplicate code examples.** If an a11y action is already covered as a numbered step in `## Update your code` (which must include before/after snippets), the Accessibility bullet links to that step instead of repeating the snippet. Only include a code example in `## Accessibility` for an action that is not covered in `## Update your code`.

**Do not include an `### Unchanged` sub-section in `## What changed`.** Unchanged API requires no consumer action and adds noise. Limit `## What changed` to `### Renamed`, `### Added in Spectrum 2`, and `### Removed in Spectrum 2` (omit any sub-section with no entries).

**Include (public API):**

- Tag name and import path changes
- Attributes, properties, and their values
- Slots and slot names
- Events
- Supported CSS custom properties (`--mod-*` and documented theming hooks)
- Accessibility expectations that affect the consumer's markup (e.g. `aria-label` on icon-only variants)
- Behavior changes the consumer can observe (focus, wrapping, positioning)

**Exclude (implementation detail):**

- Internal shadow DOM structure or how it changed
- Internal class-name renames (e.g. `spectrum-*` → `swc-*`); a single short "do not target internal classes or shadow DOM" caution is enough
- `::part()` shadow parts unless one is explicitly part of the public API
- Maintainer-facing rationale, migration sequencing, or implementation notes — link to the `rendering-and-styling-migration-analysis.md` instead

**Structure the steps logically.** In "Update your code", present numbered steps in the order a consumer would actually perform them (for example: 1. update imports, 2. rename tags, 3. fix any consumer-facing accessibility gaps, 4. optionally adopt new attributes). Do not split content into parallel subsections when a short numbered flow reads better.

## Full instructions

For the exact document structure, required sections, source-verification expectations, writing rules, and checklist format, read:

**.ai/skills/consumer-migration-guide/references/consumer-migration-guide-prompt.md**
