---
name: consumer-migration-guide
description: Use when creating a per-component migration guide for application developers upgrading from 1st-gen Spectrum Web Components to 2nd-gen components.
globs: 2nd-gen/packages/swc/components/*/consumer-migration-guide.mdx
alwaysApply: false
---

# Component migration: consumer guide

Create per-component migration guidance for application developers upgrading app code from 1st-gen Spectrum Web Components to 2nd-gen components. The output should be practical and consumer-facing: what changed, what to update, how to test it, and how to roll it out safely.

## When to use this skill

- The user asks for a migration guide, upgrade guide, or consumer-facing migration doc for one or more components
- You are documenting what application developers need to change when replacing a 1st-gen component with its 2nd-gen equivalent
- The guide needs rollout advice in addition to code updates, such as styling, accessibility, testing, and fallback considerations

## How to invoke

- Say "create a consumer migration guide for [component]"
- Or say "write an upgrade guide for [component]" or "document how consumers migrate [component] from 1st-gen to 2nd-gen"
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

- Consumer migration guides live alongside the 2nd-gen component source so the doc ships with the component code. Do **not** add them to `CONTRIBUTOR-DOCS/`.
- **Pairing:** Link to the maintainer-facing analysis docs in `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/` (`rendering-and-styling-migration-analysis.md` and `accessibility-migration-analysis.md`) when those exist and help the reader. Use repo-root-relative paths from the guide's location (e.g. `../../../../../CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/...`).
- **Nav:** The consumer migration guide lives in the component directory, so the `CONTRIBUTOR-DOCS` `update-nav.js` script does not manage it. Do not register it in `CONTRIBUTOR-DOCS/03_project-planning/03_components/README.md`, and do not include auto-generated breadcrumbs or TOC markers intended for that script.
- **MDX gotchas:** Keep bare tag names (`<sp-badge>`, `<swc-badge>`, etc.) wrapped in backticks in prose, and keep HTML/JS examples inside fenced code blocks. Avoid loose `{` / `}` outside code blocks; MDX parses them as JS expressions.

### Required source inputs

Verify claims against the real implementation and docs before writing:

- **1st-gen docs and source:** `1st-gen/packages/[component-name]/README.md`, public element files such as `sp-*.ts`, stories, and tests when needed
- **2nd-gen docs and source:** `2nd-gen/packages/swc/components/[component-name]/src/`, stories, tests, and any package README or docs that describe the public API
- **Related migration docs:** the component's `rendering-and-styling-migration-analysis.md` and `accessibility-migration-analysis.md` when present

### Important

- Write for **application developers upgrading their code**, not only for component maintainers
- Prefer **before/after examples**, explicit upgrade actions, and rollout guidance over implementation detail
- Ask clarifying questions for uncertain mappings instead of guessing

## Full instructions

For the exact document structure, required sections, source-verification expectations, writing rules, and checklist format, read:

**.ai/skills/consumer-migration-guide/references/consumer-migration-guide-prompt.md**
