# Spectrum Migration Documentation Prompt

For the **\_\_** component(s), create comprehensive migration documentation in individual markdown files within the `migration-roadmap/` directory of the spectrum-web-components repository, following this exact structure:

## File Organization

Create a separate markdown file for each component using the component/package name from the spectrum-web-components repository:

- File path: `migration-roadmap/[COMPONENT_NAME].md`
- Example: `migration-roadmap/alert-banner.md`, `migration-roadmap/dialog.md`

## Component Documentation Structure

### 1. Component Heading

- Create a Level 1 heading (`#`) with the format: "[Component name] migration roadmap"
- Example: `# Alert Banner migration roadmap`

### 2. Metadata Extraction (spectrum-css repository)

From the `spectrum-two` branch of the spectrum-css repository, locate the component's `metadata.json` file in the `components/[component-name]/` directory.

**Additional Context**: Review the component's CHANGELOG file (if available) for historical context on changes, deprecations, and new features that may inform the migration documentation.

Create collapsible sections using `<details>` and `<summary>` for each category:

**CSS Selectors Section:**

- Title: "CSS selectors"
- Extract all selectors from metadata.json
- If empty, write: "No CSS selectors found for this component."

**Passthroughs Section:**

- Title: "Passthroughs"
- Extract all passthroughs from metadata.json
- If empty, write: "No passthroughs found for this component."

**Modifiers Section (ALWAYS LAST):**

- Title: "Modifiers"
- Extract all modifiers from metadata.json
- If empty, write: "No modifiers found for this component."
- **Important**: This section must always be the final `<details><summary>` list

### 3. Web Component Analysis (spectrum-web-components repository)

From the spectrum-web-components repository, analyze the component and create additional collapsible sections:

**Attributes Section:**

- Title: "Attributes"
- List all component attributes
- For string properties with enumerated values, extract each value as a separate attribute entry
- If empty, write: "No attributes found for this component."

**Slots Section:**

- Title: "Slots"
- List all component slots
- If empty, write: "No slots found for this component."

**Ensure modifiers remain the final section after adding attributes and slots.**

### 4. Visual Comparison Section

Create a Level 2 heading (`##`) titled "Visual Comparison"

Add a placeholder section for component screenshots:

```markdown
### Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->
```

### 5. DOM Structure Analysis

Create a Level 2 heading (`##`) titled "DOM Structure Changes"

**Branch Switching Requirements**:
You will need to analyze the same component across two different branches of the spectrum-css repository. Use these git commands to switch between branches:

```bash
# For legacy analysis
git checkout main

# For Spectrum 2 analysis
git checkout spectrum-two
```

**Source Analysis**:

- Compare the component's `stories/template.js` file between the `main` branch and `spectrum-two` branch of spectrum-css
- Analyze generated HTML patterns from Storybook stories
- Document class application differences

**Analysis Process**:

1. Switch to `main` branch and analyze the component's template structure
2. Switch to `spectrum-two` branch and analyze the updated template structure
3. Document the differences between both versions

**Output Format**:
Create a side-by-side HTML comparison using markdown code blocks:

````markdown
**Legacy (main branch):**

```html
<!-- Legacy HTML structure from main branch -->
```
````

**Spectrum 2 (spectrum-two branch):**

```html
<!-- Spectrum 2 HTML structure from spectrum-two branch -->
```

### 6. Comparison Table

Create a Level 2 heading (`##`) titled "Comparison"

Below the collapsible sections, create a markdown table with:

- Column 1: "CSS selector"
- Column 2: "Attribute or slot"
- Column 3: "Status"

**Status Values:**

- "Implemented" - CSS selector has corresponding web component feature
- "Missing from WC" - CSS exists but no web component equivalent
- "Missing from CSS" - Web component feature exists but no CSS support
- "Deprecated" - Being removed in Spectrum 2

**Mapping Logic:**

- **Variants to Attributes**: CSS selectors with variants (noted after "—") likely map to component attributes
- **Base Elements to Slots**: Selectors with base class + single "-" (e.g., `.spectrum-button-label`) likely map to slots
- **Language Selectors**: Group all selectors containing `:lang` together on a single row, comma-separated, as they serve the same internationalization purpose and are typically implemented as a block

**Language Selector Formatting Example:**

```
`.spectrum-Search:lang(ja)`, `.spectrum-Search:lang(ko)`, `.spectrum-Search:lang(zh)` | Language-specific styling | Implemented
```

**Table Organization:**

1. Mapped pairs (CSS selector ↔ Attribute/Slot) with appropriate status
2. Unmapped selectors (empty "Attribute or slot" column, "Missing from WC" status)
3. Unmapped attributes/slots (empty "CSS selector" column, "Missing from CSS" status)

## Additional Requirements

### Clarifying Questions

If you encounter any ambiguities, edge cases, or unclear mappings during documentation, please ask clarifying questions rather than making assumptions. This includes:

- Uncertain CSS selector to attribute/slot mappings
- Components with unusual metadata structure
- Missing or incomplete metadata.json files
- Conflicting information between repositories

### Property Change Documentation

When documenting modifiers, include analysis of:

- Properties that were renamed/restructured
- Properties that were removed entirely
- New properties that were added
- Changes in default values or behavior

### 7. Structural Changes Summary

Create a Level 2 heading (`##`) titled "Key Structural Changes"

After the comparison table, provide a focused summary of DOM changes that will impact SWC engineers:

**Element Hierarchy Changes:**

- Document any changes in nesting depth or parent-child relationships
- Note new wrapper elements or removed containers

**Class Name Changes:**

- List renamed, added, or removed CSS classes
- Highlight changes in class application patterns

**Attribute Changes:**

- Document new required attributes or removed attributes
- Note changes in attribute naming or values

**Slot/Content Changes:**

- Identify changes in how content is structured or slotted
- Document new content containers or removed content areas

**Migration Impact:**

- Summarize the most critical changes that will require template updates
- Flag any breaking changes in component structure

### 8. Implementation Gaps Analysis

Create a Level 3 heading (`###`) titled "Implementation Gaps"

Analyze and document the following subsections:

**CSS Features Missing from Web Component:**

- List CSS selectors/features that have no web component equivalent
- Include any new Spectrum 2 capabilities not yet implemented

**Web Component Features Missing from CSS:**

- List web component attributes/slots that have no CSS equivalent
- Include legacy features that may no longer be supported

**Features Being Deprecated/Removed:**

- List any legacy web component features being removed in Spectrum 2
- Note any breaking changes in functionality

### 9. Action Items Summary

Create a Level 3 heading (`###`) titled "Action Items for Web Component Maintainers"

Provide clear, actionable next steps:

**Required Additions:**

- Web component features that need to be implemented to match CSS capabilities

**Required Removals:**

- Legacy features that should be removed or deprecated

**Breaking Changes:**

- Changes that will affect existing web component consumers
- Migration guidance where applicable

### Integration Guidance

Where applicable, include brief notes on:

- Usage pattern differences between legacy and Spectrum 2
- Integration considerations for web component consumers

## Output Format

- Create individual markdown files in the `migration-roadmap/` directory
- Use component names from spectrum-web-components repository for filenames
- Use proper markdown formatting with Level 1 heading for component name
- Ensure all `<details>` elements are properly closed
- Use consistent table formatting
- Maintain hierarchical heading structure (Level 1 for component, Level 2 for major sections)
- Keep modifiers section as the final collapsible section in each component
