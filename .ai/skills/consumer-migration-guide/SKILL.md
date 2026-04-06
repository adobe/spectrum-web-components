---
name: consumer-migration-guide
description: Use when creating a per-component migration guide for application developers upgrading from 1st-gen Spectrum Web Components to 2nd-gen components.
globs: CONTRIBUTOR-DOCS/**/consumer-migration-guide.md
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

- **One markdown file per component** at:
  `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/consumer-migration-guide.md`
- **Pairing:** Link to `./rendering-and-styling-migration-analysis.md` and `./accessibility-migration-analysis.md` when those docs exist and help the reader
- **Nav:** After adding the file or changing `##` / `###` headings, run `node update-nav.js` from `CONTRIBUTOR-DOCS/01_contributor-guides/07_authoring-contributor-docs`. Register the doc in `03_components/README.md` when introducing a new component folder.

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
