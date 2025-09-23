# Spectrum 2 migration roadmap

This directory contains comprehensive migration documentation for Spectrum 2 components, serving as a bridge between migrated Spectrum 2 CSS work and corresponding web components. This documentation helps engineers understand what needs to be implemented, updated, or aligned between the two systems to guide development of second-generation web components.

## Purpose

### Why we do this analysis

The migration roadmap addresses a critical need in the Spectrum 2 development process:

- **Development roadmap**: Provides clear guidance for building 2nd generation web components
- **Feature gap analysis**: Identifies all features and capabilities that need implementation to match Spectrum 2 CSS and design specifications
- **API impact assessment**: Establishes implementation requirements and design changes that may lead to breaking changes and/or API changes for the next major version
- **Planning support**: Enables consuming teams to plan for 2nd gen web component adoption and understand migration effort required
- **Transparency**: Provides visibility into what will be available in the next major version

### The bigger picture

When an SWC developer picks up Spectrum 2 implementation work, this documentation provides:

- **Starting point**: Clear entry point for development work
- **Implementation checklist**: Things that probably need to be done
- **Reference materials**: Links to CSS and React implementations, CSS selectors
- **Gap identification**: Analysis of differences that would prevent Spectrum 2 CSS from working in SWC

## What we analyze

### Component specifications

We extract and document:

- **CSS selectors**: All selectors from `metadata.json` in spectrum-css `spectrum-two` branch
- **Passthroughs**: CSS passthrough properties
- **Modifiers**: CSS modifier classes
- **SWC attributes**: Properties with `@property` decorators in TypeScript
- **SWC slots**: Slot patterns from render methods

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

- **Missing from WC**: CSS features without web component equivalents
- **Missing from CSS**: Web component features without CSS support
- **New for Spectrum 2**: Features that need to be added for 2nd gen
- **Deprecated**: Features being removed in Spectrum 2

## How to use this documentation

### For SWC developers

1. **Start here**: Review the component's migration roadmap document
2. **Check specifications**: Understand all CSS selectors and SWC features
3. **Review DOM changes**: Identify structural changes needed in render methods
4. **Analyze mapping table**: Find features that need implementation or removal
5. **Read summary**: Get focused overview of required changes

### For planning

- **API changes**: Look for missing attributes or deprecated features
- **Breaking changes**: Review DOM structure changes and removed features
- **New features**: Identify capabilities being added in Spectrum 2
- **Effort estimation**: Use gap analysis to estimate development work

## Documentation structure

Each component follows this format:

```
# [Component name] migration roadmap

## Component specifications
### CSS
- CSS selectors (collapsible)
- Passthroughs (collapsible)
- Modifiers (collapsible)

### SWC
- Attributes (collapsible)
- Slots (collapsible)

## Comparison
### DOM structure changes
- Spectrum Web Components (collapsible)
- Legacy CSS main branch (collapsible)
- Spectrum 2 CSS spectrum-two branch (collapsible)
- Diff: Legacy → Spectrum 2 (collapsible, if changes exist)

### CSS => SWC mapping
| CSS selector | Attribute or slot | Status |
|--------------|-------------------|---------|
| ... | ... | Implemented/Missing from WC/Missing from CSS/Deprecated |

## Summary of changes
### CSS => SWC implementation gaps
### CSS Spectrum 2 changes

## Resources
- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
```

## How to generate documentation

### Prerequisites

Set up Cursor workspace with both repositories:

- `spectrum-css` (primarily `spectrum-two` branch, with comparisons to `main`)
- `spectrum-web-components` (`main` branch)

### Using the cursor prompt

1. **Load the prompt**: Reference `migration-roadmap/cursor_prompt.md`
2. **Specify component**: Replace `[COMPONENT_NAME]` with the target component
3. **Branch verification**: Ensure correct branches are checked out:
    - spectrum-css: `spectrum-two` for specifications, both `main` and `spectrum-two` for comparisons
    - spectrum-web-components: `main` branch
4. **Generate documentation**: Follow the structured prompt to create component markdown files

### Quality assurance

**Human review is required** for all generated documentation:

- **Verify data accuracy**: Check extracted information against source repositories
- **Validate mappings**: Ensure CSS selector to SWC feature mappings are correct
- **Review summaries**: Confirm summaries provide clear, actionable guidance
- **Check DOM structures**: Verify HTML snippets match actual template/render method output
- **Audit diffs**: Ensure branch comparisons are accurate and meaningful

### Common issues to watch for

- **Branch confusion**: AI may analyze wrong branches or mix up repositories
- **Incomplete mappings**: Missing hover, focus, disabled states in mapping tables
- **Verbose summaries**: Trim AI-generated text to focus on actionable changes
- **DOM accuracy**: Verify render method HTML matches documented structure
- **Missing components**: Note when components don't exist in one system or the other

## Current components

The following components have migration documentation:

- Alert Banner (`alert-banner.md`)
- [Add other completed components here]

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
4. Submit PR to the `2nd-gen-component-analysis` branch

### Updating existing documentation

If a component already exists in the migration-roadmap directory:

- Re-run the prompt to overwrite the component documentation, or
- Manually audit existing documentation for accuracy and completeness

## Resources

- [Cursor prompt template](cursor_prompt.md)
- [Spectrum CSS repository](https://github.com/adobe/spectrum-css)
- [Spectrum Web Components repository](https://github.com/adobe/spectrum-web-components)
