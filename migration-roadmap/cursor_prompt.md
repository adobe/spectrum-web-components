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

Create a Level 2 Heading: `## Comparison`

#### 2.1 Visual Comparison

Add a placeholder section for component screenshots:

```markdown
**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->
```

#### 2.2 DOM Structure Changes

**Critical Instruction**: Analyze files from THREE different sources. Always confirm the branch and repository being used.

**2.2.1 Web Component DOM Structure Analysis**:

- **Source**: spectrum-web-components `main` branch, `/packages/[component-name]/src/[component-name].ts` (`main` branch)
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

- **Legacy Source**: spectrum-css `main` branch, `/components/[component-name]/stories/template.js`
- **Spectrum 2 Source**: spectrum-css `spectrum-two` branch, `/components/[component-name]/stories/template.js`
- **IMPORTANT**: Check both the import statements AND the template logic, as components may be removed from imports between sources
- **Line-by-line comparison required**: Don't assume templates are identical - carefully check imports, component usage, and structure
- Document class application differences
- **Verification steps**: After each git checkout, confirm you're viewing the correct branch's files. After documenting each DOM structure, verify the accuracy by re-reading the actual template files to ensure the HTML matches exactly what's in the source code for that branch.
- **Final accuracy check**: Before completing the documentation, re-read each template file one more time to verify the DOM structures are 100% accurate. Any discrepancies between documented HTML and actual template code will require correction.

**Output Format**:

Create a three-way HTML comparison using markdown code blocks. Use collapsible sections using `<details>` and `<summary>` under `### DOM Structure changes` for each category:

````markdown
<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- Current HTML structure from web component render() method -->
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<!-- Legacy HTML structure from main branch template.js -->
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<!-- Spectrum 2 HTML structure from spectrum-two branch template.js -->
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
<!-- Show only the differences between main and spectrum-two branches using diff format -->
<!-- Use - for removed elements, + for added elements, no prefix for unchanged elements -->
<!-- Only include this section if there are actual differences between the branches -->
```

</details>
````

#### 2.3 CSS => SWC mapping

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
- **Language Selectors**: Group all selectors containing :lang together on a single row, comma-separated, as they serve the same internationalization purpose and are typically implemented as a block

**Language Selector Formatting example:**

```markdown
.spectrum-Search:lang(ja), .spectrum-Search:lang(ko), .spectrum-Search:lang(zh) | Language-specific styling | Implemented
```

**Table Organization Order:**

1. Mapped pairs (CSS selector ↔ Attribute/Slot) with appropriate status
2. Unmapped selectors (empty "Attribute or slot" column, "Missing from WC" status)
3. Unmapped attributes/slots (empty "CSS selector" column, "Missing from CSS" status)

### 3. Summary of changes

Create a Level 2 Heading: `## Summary of changes`

After the comparison table, create a new section that provide a focused summary of changes that will impact SWC engineers:

**CSS => SWC changes:**

Summarize changes in **CSS => SWC mapping** section above. Note any statuses that are missing, and whether they are missing from WC or CSS.

Entries with status indicating that they appear in WC but not CSS might be an indication of implementation differences, but could also be an indication of a deprecated feature.

Entries with status indicating that they appear in CSS but not WC are often an indication of new features that may need to be added when migrating WC to 2nd gen.

**CSS DOM structure changes:**

Analyze the differences between CSS `main` and CSS `spectrum-two` branches surfaced in the DOM structure comparison and document them in this section:

- **Required**: Compare the HTML structures from main vs spectrum-two templates line by line
- **Document**: Any elements that are added, removed, or modified between branches
- **Include**: Changes in element attributes, class names, or structural differences
- **Note**: Even subtle differences like conditional elements or missing components must be documented
- **Focus on changes in Spectrum CSS**, not changes between spectrum web components and CSS.

Be sure to note:

- Elements present in main but missing in spectrum-two
- Elements present in spectrum-two but missing in main
- Changes in element attributes or class names
- Structural changes (different nesting, wrapper elements)
- Conditional elements that differ between branches
- Import differences that affect rendered output

### 4. Resources section

Create a Level 2 Heading: `## Resources`

Under this heading, add a placeholder section for resources with a bulleted list that can be filled in:

```markdown
- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
```

## Output format notes

- Create individual markdown files in the migration-roadmap/ directory
- Use component names from spectrum-web-components repository for filenames
- Use proper markdown formatting with Level 1 heading for component name
- Ensure all <details> elements are properly closed
- Use consistent table formatting
- Maintain hierarchical heading structure
- Always verify git branch before analyzing any file
- Perform line-by-line comparisons - don't assume files are similar
- Ask clarifying questions for uncertain mappings instead of guessing
- Use exact file paths specified in this prompt
