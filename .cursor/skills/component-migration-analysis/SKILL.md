---
name: component-migration-analysis
description: Create rendering-and-styling migration analysis docs for 2nd-gen component migration. Use when on the "analyze rendering and styling" step for one or more components.
---

# Component migration: analyze rendering and styling

Create comprehensive migration documentation for the **analyze rendering and styling** step of 2nd-gen component migration. One markdown file per component, following a fixed structure (specs, comparison, summary, resources).

## When to use this skill

- You are on the "analyze rendering and styling" step of the 2nd-gen component migration workstream
- The user asks to create rendering-and-styling migration analysis for one or more components
- The user asks to analyze rendering and styling for a component (e.g. "analyze rendering and styling for button", "create migration analysis for dialog")

## How to invoke

- Say "create migration analysis for [component]", "analyze rendering and styling for [component]", or "rendering and styling migration for [component]"
- Or refer to the step "analyze rendering and styling" in the 2nd-gen component migration workstream — the agent should use this skill and read the full prompt

## Quick reference

### Output

- **One markdown file per component** at:
  `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/rendering-and-styling-migration-analysis.md`
- **Structure**: Component specifications (CSS from spectrum-css `spectrum-two` metadata.json; SWC from spectrum-web-components `main` render/slots) → Comparison (DOM structure changes: SWC + CSS main + CSS spectrum-two; CSS⇒SWC mapping table) → Summary of changes → Resources

### Sources and branches

- **CSS specs**: spectrum-css repo, `spectrum-two` branch → `components/[component-name]/metadata.json` (selectors, passthroughs, modifiers)
- **SWC specs**: spectrum-web-components repo, `main` branch → `packages/[component-name]/src/[component-name].ts` (render(), @property, slots)
- **DOM comparison**: SWC render() (main); spectrum-css `main` and `spectrum-two` → `components/[component-name]/stories/template.js` (line-by-line; verify branch after each checkout)

### Important

- Create all files on the **original spectrum-web-components branch** where the session started
- Verify git branch before analyzing any file; perform line-by-line comparisons (don’t assume templates are identical)
- Ask clarifying questions for uncertain mappings instead of guessing

## Full instructions

For the exact document structure, heading levels, collapsible sections, CSS⇒SWC mapping table format (columns, status values, ordering), DOM comparison format, and output format notes, read:

**.cursor/skills/component-migration-analysis/references/migration-analysis-prompt.md**

That document is the single source of truth for file organization, component documentation structure, comparison format, summary sections, and resources placeholder.
