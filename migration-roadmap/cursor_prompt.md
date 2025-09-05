# Spectrum Migration Documentation Prompt

For the **[COMPONENT_NAME]** component(s), create comprehensive migration documentation in individual markdown files within the `migration-roadmap/` directory of the spectrum-web-components repository, following this exact structure:

## File Organization

- **One markdown file per component**
- Use the component/package name from the spectrum-web-components repository:
- File path format: `migration-roadmap/[COMPONENT_NAME].md`
- Example: `migration-roadmap/alert-banner.md`, `migration-roadmap/dialog.md`

## Component Documentation Structure

- Create a Level 1 heading (`#`) with the format: `# [Component name] migration roadmap`
- Example: `# Alert Banner migration roadmap`

### 1. Component Specifications

Create a Level 2 Heading: `## Component specifications`

Within this heading, we'll have a Level 3 heading for CSS (`### CSS`) and one for Spectrum web components (`### SWC`).

#### 1.1 CSS Section

Check out the `spectrum-two` branch of the spectrum-css repository and locate the component's `metadata.json` file in the `components/[component-name]/` directory.

**Required git command**: `git checkout spectrum-two` (verify branch before proceeding)

Create collapsible sections using `<details>` and `<summary>` under `### CSS` for each category:

**CSS Selectors Section:**

- Title: "CSS selectors"
- Extract all selectors from metadata.json

**Passthroughs Section:**

- Title: "Passthroughs"
- Extract all passthroughs from metadata.json

**Modifiers Section:**

- Title: "Modifiers"
- Extract all modifiers from metadata.json

If any of these sections are empty in metadata.json, write for that section only, "None found for this component."

#### 1.2 SWC Section

Check out the `main` branch of the spectrum-web-components repository, analyze the component and create additional collapsible sections under `### SWC`:

**Required source**: `packages/[component-name]/src/[component-name].ts` (analyze the `render()` method)

**Attributes Section:**

- Title: "Attributes"
- Look for `@property` decorators in TypeScript
- For string properties with enumerated values, extract each value as a separate attribute entry

**Slots Section:**

- Title: "Slots"
- Look for `<slot name="...">` patterns in render method

If any of these sections are empty, write for that section only, "None found for this component."

### 2. Comparison

#### 2.1 Visual Comparison

Add a placeholder section for component screenshots:

```markdown
**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->
```

#### 2.2 DOM Structure Changes

**Critical Instruction**: Analyze files from THREE different sources. Always confirm the branch/repository being used.

**Output Format**: Create a side-by-side HTML comparison using markdown code blocks:

**2.2.1 Web Component DOM Structure Analysis**:

- **Source**: `spectrum-web-components/main/packages/[component-name]/src/[component-name].ts` (`main` branch)
- Analyze the component's `render()` method or template structure
- Extract the actual HTML markup that the web component generates
- Document the current DOM structure, including attributes

**2.2.2 CSS DOM Structure Analysis**:

**Branch switching requirements**: You will need to analyze the same component across two different branches of the spectrum-css repository. Use these git commands to switch between branches:

```bash
# For legacy analysis
git checkout main

# For Spectrum 2 analysis
git checkout spectrum-two
```

- **Legacy Source**: `spectrum-css/main/components/[component-name]/stories/template.js`
- **Spectrum 2 Source**: `spectrum-css/spectrum-two/components/[component-name]/stories/template.js`
- **IMPORTANT**: Check both the import statements AND the template logic, as components may be removed from imports
- **Line-by-line comparison required**: Don't assume templates are identical - carefully check imports, component usage, and structure
- Document class application differences
- **Verification step**: After each git checkout, confirm you're viewing the correct branch's files

**Output Format**:

Create a three-way HTML comparison using markdown code blocks:

````markdown
**Spectrum Web Components:**

```html
<!-- Current HTML structure from web component render() method -->
```

**Legacy (CSS main branch):**

```html
<!-- Legacy HTML structure from main branch template.js -->
```

**Spectrum 2 (CSS spectrum-two branch):**

```html
<!-- Spectrum 2 HTML structure from spectrum-two branch template.js -->
```
````

#### 3.3 CSS => SWC mapping

Create a markdown table with these exact column headers:

- Column 1: "CSS selector"
- Column 2: "Attribute or slot"
- Column 3: "Status"

**Status Values (use exactly as written):**

- "Implemented" - CSS selector has corresponding web component feature
- "Missing from WC" - CSS exists but no web component equivalent
- "Missing from CSS" - Web component feature exists but no CSS support
- "Deprecated" - Being removed in Spectrum 2

**Mapping Logic:**

- **Variants to Attributes**: CSS selectors with variants (noted after double dash `--`) likely map to component attributes
- **Base Elements to Slots**: Selectors with base class + single dash `-` (e.g., `.spectrum-button-label`) likely map to slots
- **Language Selectors**: Group all selectors containing `:lang` together on a single row, comma-separated

**Language Selector Example Row:**

```
.spectrum-Search:lang(ja), .spectrum-Search:lang(ko), .spectrum-Search:lang(zh) | Language-specific styling | Implemented
```

**Table Organization Order:**

1. Mapped pairs (CSS selector ↔ Attribute/Slot) with appropriate status
2. Unmapped selectors (empty "Attribute or slot" column, "Missing from WC" status)
3. Unmapped attributes/slots (empty "CSS selector" column, "Missing from CSS" status)

### 4. Key Structural Changes

After the comparison table, provide a focused summary of DOM changes that will impact SWC engineers:

**Element Hierarchy Changes:**

Compare **Spectrum Web Components DOM** with **Spectrum CSS spectrum-two DOM** only. Note: Use mapping logic from section 3.3 - web components use `<sp-icon-*>` where CSS uses `.spectrum-Icon` classes, attributes vs classes, etc.

- Document any changes in nesting depth or parent-child relationships
- Note new wrapper elements or removed containers
- Focus only on significant structural differences

**Class Name Changes:**

Compare **Spectrum CSS main branch** with **Spectrum CSS spectrum-two branch** only.

- List renamed, added, or removed CSS classes
- Highlight changes in class application patterns
- If there are none, write: "No class name changes found for this component."

**Attribute Changes:**

- Document new required attributes or removed attributes
- Note changes in attribute naming or values

**Slot/Content Changes:**

- Identify changes in how content is structured or slotted
- Document new content containers or removed content areas

**Migration Impact:**

- Summarize the most critical changes that will require template updates
- Flag any breaking changes in component structure

### 5. Implementation Gaps Analysis

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

### 6. Action Items Summary

Create a Level 3 heading (`###`) titled "Action Items for Web Component Maintainers"

Provide clear, actionable next steps:

**Required Additions:**

- Web component features that need to be implemented to match CSS capabilities

**Required Removals:**

- Legacy features that should be removed or deprecated

**Breaking Changes:**

- Changes that will affect existing web component consumers
- Migration guidance where applicable

## Processing Instructions for AI

### Critical Requirements:

1. **Always verify git branch** before analyzing any file
2. **Extract actual code content** - never generate placeholder or example content
3. **Perform line-by-line comparisons** - don't assume files are similar
4. **Ask clarifying questions** for uncertain mappings instead of guessing
5. **Use exact file paths** specified in this prompt

### Quality Verification Checklist:

- [ ] Correct branches used: spectrum-css/spectrum-two for CSS analysis, spectrum-css/main for legacy, spectrum-web-components/main for SWC
- [ ] All three DOM structures extracted from actual source code
- [ ] Mapping table complete with proper status values
- [ ] metadata.json content extracted accurately

### Common Code Patterns:

- TypeScript property: `@property({ type: String })` → Component attribute
- Render method slot: `<slot name="icon">` → Component slot
- CSS variant: `.spectrum-Button--cta` → `variant="cta"` attribute
- CSS element: `.spectrum-Button-label` → `label` slot

## Example Usage

```
Generate migration documentation for the "button" component
```

Expected output: `migration-roadmap/button.md` following this exact structure.
