# Spectrum 2 migration roadmap

This directory contains comprehensive migration documentation for 2nd generation Spectrum Web Components based on the implementation of Spectrum 2 components that were previously migrated in [Spectrum CSS](https://github.com/adobe/spectrum-css/tree/spectrum-two). It helps engineers understand what needs to be implemented, updated, or aligned between the two systems to guide development of 2nd generation web components.

## Purpose

### Why we do this analysis

The migration roadmap facilitates development of 2nd generation, full-fidelity Spectrum 2 web components by providing:

- **Feature gap analysis**: Identifies new features and capabilities needed to match Spectrum 2 design specifications
- **Implementation comparison**: Maps CSS selectors to existing SWC properties and notes markup differences between systems
- **Deprecation tracking**: Documents features or variants being removed in Spectrum 2
- **Planning guidance**: High-level overview of changes to assist with estimating migration effort

### The bigger picture

When engineers begin 2nd generation Spectrum 2 implementation work, this documentation provides:

- **Clear starting point**: Entry point for development work that identifies specific areas needing adjustment
- **Gap analysis**: Differences that would prevent Spectrum 2 CSS from working in SWC
- **Reference materials**: Links to CSS and React implementations, and previous migration work

## What we analyze

### Component specifications

We extract and document:

- **CSS selectors**: All selectors from `metadata.json` in the spectrum-css `spectrum-two` branch
- **Passthroughs**: CSS passthrough custom properties
- **Modifiers**: CSS modifier custom properties (note that `--mod` properties will be deprecated in the 2nd-gen implementation)
- **SWC attributes**: Properties with `@property` decorators (which use getter/setter patterns) in TypeScript
- **SWC slots**: Slot patterns from render methods
- **Nested components**: Child components used within the component

### DOM structure comparison

We analyze markup from three sources:

1. **Spectrum Web Components**: Current HTML structure from web component `render()` method
2. **Legacy CSS**: HTML structure from spectrum-css `main` branch template files
3. **Spectrum 2 CSS**: HTML structure from spectrum-css `spectrum-two` branch template files

This three-way comparison reveals:

- DOM changes specific to Spectrum 2 features (Legacy → Spectrum 2)
- Structural differences between CSS and SWC implementations
- Additional work needed for SWC render methods beyond new features

### CSS to SWC mapping

We create mapping tables that connect:

- **CSS selectors** to **SWC attributes or slots**
- **Variants** (CSS selectors with `--` notation) typically map to component attributes
- **Base elements** (selectors with single `-`) typically map to slots
- **Status tracking** for implementation gaps

### Implementation gaps

The analysis surfaces:

- **Missing from SWC**: CSS features without web component equivalents
- **Missing from CSS**: Web component features without CSS support
- **New for Spectrum 2**: Features that need to be added for 2nd generation
- **Deprecated**: Features being removed in Spectrum 2

## Documentation structure

Each component follows this format:

```markdown
# [Component name] migration roadmap

## Component specifications

**Note**: CSS selectors and attributes/slots are often grouped by elements, states, variants, or other logical categories to improve readability.

### CSS

- CSS selectors (collapsible)
- Passthroughs (collapsible)
- Modifiers (deprecated) (collapsible)

### SWC

- Attributes (collapsible)
- Slots (collapsible)

## Comparison

### DOM structure changes

- Spectrum Web Components (collapsible)
- Legacy CSS main branch (collapsible)
- Spectrum 2 CSS spectrum-two branch (collapsible)
- Diff: Legacy → Spectrum 2, based on changes made to template in CSS migration work (collapsible, if changes exist)

### CSS => SWC mapping

| CSS selector | Attribute or slot | Status                                                  |
| ------------ | ----------------- | ------------------------------------------------------- |
| ...          | ...               | Implemented/Missing from WC/Missing from CSS/Deprecated |

## Summary of changes

### CSS => SWC implementation gaps

### CSS Spectrum 2 changes

**Note**: Some of this information may be summarized in the component's changelog in the spectrum-two branch.

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
```

## How to generate documentation

### Prerequisites

Set up a Cursor workspace with both repositories:

- `spectrum-css` (primarily `spectrum-two` branch, with comparisons to `main`)
- `spectrum-web-components` (`main` branch)

### Using the cursor prompt

**Model recommendation**: This type of detailed migration analysis is better handled by slower but more advanced thinking models like Claude or GPT-5, which can provide more thorough analysis and better understand complex component relationships.

1. **Load the prompt**: Reference `migration-roadmap/cursor_prompt.md`
2. **Specify component**: Replace `[COMPONENT_NAME]` with the target component
3. **Branch verification**: Ensure correct branches are checked out:
    - `spectrum-css`: `spectrum-two` for specifications, both `main` and `spectrum-two` for comparisons
    - `spectrum-web-components`: `main` branch
4. **Generate documentation**: Follow the structured prompt to create component markdown files

### Quality assurance

**Human review is required** for all generated documentation:

- **Verify data accuracy**: Check extracted information against source repositories/branches
- **Validate mappings**: Ensure CSS selector to SWC feature mappings are correct
- **Review summaries**: Confirm summaries provide clear, actionable guidance
- **Check DOM structures**: Verify HTML snippets match actual template/render method output
- **Audit diffs**: Ensure branch comparisons are accurate and meaningful

### Common issues to watch for

- **Branch confusion**: AI may analyze wrong branches or mix up repositories
- **Incomplete mappings**: AI may incorrectly mark implemented states or variants as missing in mapping tables
- **Verbose summaries**: Trim AI-generated text to focus on actionable changes and human readability
- **DOM accuracy**: Verify render method HTML matches documented structure
- **Missing components**: Note when components don't exist in one system or the other

## Contributing

### Modifying the cursor prompt

The cursor prompt template (`cursor_prompt.md`) can be modified to improve AI performance. Consider updates for:

- Better mapping accuracy
- Clearer summary generation
- Additional analysis sections
- Improved error handling

### Adding new components

1. Use the cursor prompt with the target component name
2. Generate the markdown file in `migration-roadmap/[component-name].md`
3. Review and validate all sections for accuracy
4. Submit a PR to the `2nd-gen-component-analysis` branch

## Resources

- [Cursor prompt template](cursor_prompt.md)
- [Spectrum CSS repository](https://github.com/adobe/spectrum-css)
- [Spectrum Web Components repository](https://github.com/adobe/spectrum-web-components)
