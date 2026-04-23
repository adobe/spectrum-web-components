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
2nd-gen/packages/swc/components/[component-name]/consumer-migration-guide.mdx
```

The file is MDX. Storybook's config picks it up automatically and renders it at `Components / [Component name] / Consumer migration guide`.

## Document structure

Every migration guide follows a consistent structure. The full format specification — including required sections, code example conventions, table formats, and accuracy requirements — is defined in the skill at:

```
.ai/skills/consumer-migration-guide/references/consumer-migration-guide-prompt.md
```

At a high level, every guide includes:

1. **H1 + one-sentence summary** — what the consumer needs to do, in one line
2. **What changed** — up to three tables: Renamed, Added in Spectrum 2, Removed in Spectrum 2
3. **Update your code** — numbered steps in the order the consumer performs them, each with a before/after snippet
4. **Accessibility** — consumer-facing a11y actions only (omit if nothing changed)
5. **Styling** — public CSS custom properties and a "do not target internals" callout (omit if nothing changed)
6. **Checklist** — concrete task list mapping 1:1 to the steps above

Do not include: Installation instructions repeated across every section, `### Unchanged` sub-sections, links to `CONTRIBUTOR-DOCS/`, or test-update instructions.

## Using AI to generate migration guides

Use the `consumer-migration-guide` skill in Claude Code:

```
/consumer-migration-guide [component-name]
```

The agent will:

- Read the 1st-gen and 2nd-gen component source to identify real API changes
- Generate before/after examples for each change
- Build the What changed tables
- Write component-specific accessibility and styling notes

**Always review AI-generated guides against the source.** Verify that attribute names, CSS custom property names, and behavioral descriptions are accurate before merging.

## Checklist

- [ ] File is at `2nd-gen/packages/swc/components/[component]/consumer-migration-guide.mdx`
- [ ] Starts with the correct MDX header (`import { Meta }` + `<Meta title="...">`)
- [ ] All required sections are present (What changed, Update your code, Checklist)
- [ ] Every step in Update your code has a before/after code block
- [ ] Accessibility section does not duplicate snippets already in Update your code
- [ ] Styling section lists only public `--swc-*` custom properties verified against the Spectrum 2 source
- [ ] All claims verified against `1st-gen/packages/[component]/` and `2nd-gen/packages/swc/components/[component]/`
- [ ] All code examples are accessible and use meaningful content

## Examples

The following migration guides are good references:

- `2nd-gen/packages/swc/components/badge/consumer-migration-guide.mdx` — default variant change, new attributes, CSS custom properties
- `2nd-gen/packages/swc/components/avatar/consumer-migration-guide.mdx` — attribute renames, removed feature, CSS custom properties
- `2nd-gen/packages/swc/components/status-light/consumer-migration-guide.mdx` — removed attribute, new color variants
