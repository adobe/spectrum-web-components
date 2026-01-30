# Spectrum Migration Documentation Prompt

For the **[COMPONENT_NAME]** component(s), create comprehensive migration documentation in individual markdown files within the `migration-roadmap/` directory of the spectrum-web-components repository, following this exact structure:

**IMPORTANT**: All files must be created on the original spectrum-web-components branch where the session started.

## Documentation goal

The purpose of this documentation is to help SWC engineers understand:

1. **What API changes are needed** to migrate to Spectrum 2
2. **What features are new** and need implementation
3. **What features are deprecated** and should be removed or flagged
4. **What structural changes** affect render methods

Write for an engineer who will scan this document to estimate migration work. Every section should answer: "What do I need to change in the web component?"

For additional context on goals and common pitfalls, reference `migration-roadmap/README.md`.

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
- Organize selectors into logical groups with bold headers for scannability:

**Base component:**

- The root selector (e.g., `.spectrum-Component`)

**Subcomponents:**

- Child element selectors (e.g., `.spectrum-Component-label`, `.spectrum-Component-icon`)

**Variants:**

- Selectors with `--` modifier notation (e.g., `.spectrum-Component--quiet`, `.spectrum-Component--sizeL`)

**States:**

- Interactive state selectors (e.g., `.is-disabled`, `.is-selected`, `:hover`, `:focus-visible`)

**Language-specific:**

- Internationalization selectors (e.g., `:lang(ja)`, `:lang(ko)`, `:lang(zh)`)

**Compound selectors:**

- Complex selectors combining multiple conditions (group these last)

Not all components will have selectors in every category. Omit empty categories.

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

#### 2.1 DOM Structure Changes

**Critical Instruction**: Analyze files from THREE different sources. Always confirm the branch and repository being used.

**2.1.1 Web Component DOM Structure Analysis**:

- **Source**: spectrum-web-components `main` branch, `/packages/[component-name]/src/[component-name].ts` (`main` branch)
- Analyze the component's `render()` method or template structure
- Extract the actual HTML markup that the web component generates
- Document the current DOM structure, including attributes

**2.1.2 CSS DOM Structure Analysis**:

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

**Branch verification protocol (required)**:

Before documenting each CSS DOM structure, you MUST provide proof of correct branch:

1. Run `git branch --show-current` and confirm the output matches the expected branch
2. Quote the first 2-3 import statements from the template.js file you are reading
3. If imports are identical between branches, identify a distinguishing parameter name or feature (e.g., `hasClearButton` vs `isRemovable`, presence/absence of a variant) that proves you are on the correct branch

This verification prevents accidentally documenting the same branch twice, which produces incorrect "no changes" conclusions.

**Mandatory diff generation**:

After documenting both CSS structures, generate an actual diff to verify your comparison:

```bash
git diff main:components/[component-name]/stories/template.js spectrum-two:components/[component-name]/stories/template.js
```

Review this diff output to ensure your documented structures accurately reflect the differences. Do NOT rely solely on manual comparison.

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
--- Legacy DOM structure (main branch)
+++ Spectrum 2 DOM structure (spectrum-two branch)
@@ -1,8 +1,10 @@
-<div class="spectrum-Component spectrum-Component--sizeM is-invalid">
+<div class="spectrum-Component spectrum-Component--sizeM is-hover">
   <label class="spectrum-FieldLabel">
-    <div class="spectrum-FieldLabel-text">Label</div>
-  </label>
+    Label
+  </label>
+  <div class="spectrum-Component-newElement">
+    <!-- New in Spectrum 2 -->
+  </div>
   <span class="spectrum-Component-content">Content</span>
 </div>
```

**Required**: This diff section MUST be included. If no structural differences exist between branches, explicitly state: "No structural differences found between main and spectrum-two branches." Do not omit this section.

</details>
````

#### 2.2 CSS => SWC mapping

Create a markdown table with these exact column headers:

- Column 1: "CSS selector"
- Column 2: "Attribute or slot"
- Column 3: "Status"

**Status Values (use exactly as written):**

- "Implemented" - CSS selector has corresponding web component feature
- "Missing from WC" - CSS exists but no web component equivalent
- "Missing from CSS" - Web component feature exists but no CSS support
- "Deprecated" - Being removed in Spectrum 2

**Deprecation detection**:

Mark features as "Deprecated" (not "Missing from CSS") when:

1. Feature exists in SWC AND was intentionally removed in Spectrum 2 CSS
2. Variant exists in CSS main branch but not in spectrum-two branch
3. Import or component was removed between CSS branches

Examples requiring "Deprecated" status:

- SWC has `variant="positive"` but spectrum-two removed `.spectrum-Tooltip--positive` → Deprecated
- SWC has `icon` slot but spectrum-two removed icon rendering → Deprecated
- CSS main has `is-invalid` state but spectrum-two removed it → Deprecated

The key question: "Was this intentionally removed as part of Spectrum 2?" If yes → Deprecated.

**Mapping Logic:**

- **Variants to Attributes**: CSS selectors with variants (noted after double dash `--`) likely map to component attributes
- **Base Elements to Slots**: Selectors with base class + single dash `-` (e.g., `.spectrum-button-label`) likely map to slots
- **Language Selectors**: Group all selectors containing :lang together on a single row, comma-separated, as they serve the same internationalization purpose and are typically implemented as a block

**Name equivalence mapping**:

CSS and SWC often use different names for the same concept. When mapping:

1. **Look for functional equivalence**, not just naming similarity:
    - CSS `hasClearButton` / `isRemovable` → SWC `deletable`
    - CSS `is-invalid` state → SWC `invalid` attribute
    - CSS `-clearButton` subcomponent → SWC `deletable` attribute triggers its render

2. **Document name differences** in the mapping table:
    - If a CSS selector maps to a differently-named SWC feature, note the relationship
    - Example: `.spectrum-Tag-clearButton` | `deletable` (renders clear button) | Implemented

3. **Do not mark as "Missing"** if the feature exists under a different name. A feature is only "Missing from WC" if no equivalent functionality exists.

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

#### CSS => SWC implementation gaps

Summarize changes in **CSS => SWC mapping** section above. Note any statuses that are missing, and whether they are missing from WC or CSS.

Entries with status indicating that they appear in WC but not CSS might be an indication of implementation differences, but could also be an indication of a deprecated feature.

Entries with status indicating that they appear in CSS but not WC are often an indication of new features that may need to be added when migrating WC to 2nd gen.

#### CSS Spectrum 2 changes

Analyze the differences between CSS `main` and CSS `spectrum-two` branches surfaced in the DOM structure comparison and document them in this section.

**Summary writing guidelines**:

- **One bullet per change**: Each bullet should describe a specific change (group similar changes together)
- **Change-focused**: Only document what CHANGED between branches, not what exists
- **Action-oriented**: Frame changes in terms of migration impact for SWC engineers

**Do NOT include**:

- General component structure descriptions (these belong in the DOM structure section)
- Lists of features that remained unchanged
- Explanations of what the component does

**Good example**:

> - **Icon removal**: Variant icons (Info, Alert) no longer render; icon slot may need deprecation
> - **Structural wrapper added**: Tags now wrapped in `.spectrum-TagGroup-tags` container

**Bad example**:

> **Component structure:**
>
> - Wrapper element with `spectrum-TagGroup` class
> - Optional `spectrum-TagGroup-label` for field labels
> - [describing what exists, not what changed...]

**Types of changes to document**:

- Elements added or removed between branches
- Changes in element attributes or class names
- Structural changes (different nesting, wrapper elements)
- Conditional logic changes (e.g., `isInvalid` removed)
- Import differences that affect rendered output

**Note**: Changes to `--mod-*` custom properties between branches can signal new or deprecated features. If --mod changes reveal something not already captured above, include it.

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
