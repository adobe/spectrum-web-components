<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Writing migration guides

<!-- Document title (editable) -->

# Writing migration guides

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [About this guide](#about-this-guide)
- [When to write a migration guide](#when-to-write-a-migration-guide)
- [File location](#file-location)
- [Document structure](#document-structure)
- [Using AI to generate migration guides](#using-ai-to-generate-migration-guides)
- [Checklist](#checklist)
- [Examples](#examples)

</details>

<!-- Document content (editable) -->

## About this guide

This guide explains when and how to write a consumer-facing migration guide for a 2nd-gen component. Migration guides help consumers move from the 1st-gen `sp-*` components to 2nd-gen `swc-*` components with confidence.

## When to write a migration guide

Write a migration guide when a 2nd-gen component is approaching production readiness and consumers will need to migrate from the equivalent 1st-gen component. A migration guide is required before a component is considered fully production-ready.

You do not need to wait until the component is feature-complete — guides can be updated as the API stabilizes.

## File location

Each migration guide lives alongside the component it documents:

```
2nd-gen/packages/swc/components/[component-name]/migration.md
```

## Document structure

Every migration guide follows a consistent structure. The full format specification — including required sections, code example conventions, table formats, and accuracy requirements — is defined in the AI rule at:

```
.ai/rules/migration-guide.md
```

At a high level, every guide includes:

1. **Title and intro** — component names, both packages
2. **Installation** — remove 1st-gen, add 2nd-gen, update imports
3. **Quick reference** — table of all changes at a glance
4. **Breaking changes** — one subsection per breaking change with before/after examples
5. **New in 2nd-gen** — new attributes, slots, or behaviors (omit if none)
6. **Accessibility** — component-specific a11y notes

Use `---` horizontal rules between all top-level sections. See the examples below for reference.

## Using AI to generate migration guides

An AI agent (Claude Code, Cursor) will automatically follow the format in `.ai/rules/migration-guide.md` when asked to generate a migration guide. A prompt like the following works well:

```
Write a migration guide for swc-[component] following the migration guide rule.
Verify all claims against the component source before writing.
```

The agent will:

- Read the 1st-gen and 2nd-gen component source to identify real breaking changes
- Generate before/after examples for each change
- Build the quick reference table
- Write component-specific accessibility notes

**Always review AI-generated guides against the source.** Verify that attribute names, CSS custom property names, and behavioral descriptions are accurate before merging.

## Checklist

- [ ] File is at `2nd-gen/packages/swc/components/[component]/migration.md`
- [ ] All required sections are present (Installation, Quick reference, Breaking changes, Accessibility)
- [ ] Every breaking change has a before/after code block
- [ ] Quick reference table links to relevant breaking change sections
- [ ] CSS custom properties section includes a full mapping table
- [ ] `## New in 2nd-gen` is present only if new features exist
- [ ] All claims verified against `1st-gen/packages/[component]/` and `2nd-gen/packages/swc/components/[component]/`
- [ ] All code examples are accessible and use meaningful content

## Examples

The following migration guides are good references:

- `2nd-gen/packages/swc/components/avatar/migration.md` — attribute renames, removed variant, CSS custom properties
- `2nd-gen/packages/swc/components/badge/migration.md` — new attributes, expanded variant list, per-variant CSS override notes
- `2nd-gen/packages/swc/components/status-light/migration.md` — removed attribute, removed variant, new color variants
