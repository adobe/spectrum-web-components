<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Contributor guides](../README.md) / [Authoring contributor docs](README.md) / AI agent instructions

<!-- Document title (editable) -->

# AI agent instructions

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Role 1: Operator](#role-1-operator)
    - [When to run](#when-to-run)
    - [How to run](#how-to-run)
    - [Responsibilities](#responsibilities)
    - [Debugging errors](#debugging-errors)
    - [Debugging output issues](#debugging-output-issues)
    - [Handling link verification errors](#handling-link-verification-errors)
- [Role 2: Maintainer](#role-2-maintainer)
    - [Requirements and specifications](#requirements-and-specifications)
    - [When to maintain](#when-to-maintain)
    - [Maintenance process](#maintenance-process)
    - [Script architecture](#script-architecture)
- [Script behavior details](#script-behavior-details)
    - [What the script does](#what-the-script-does)
    - [Breadcrumb format](#breadcrumb-format)
    - [TOC format](#toc-format)
    - [Display name derivation](#display-name-derivation)
- [Testing checklist](#testing-checklist)

</details>

<!-- Document content (editable) -->

This document defines two distinct roles for AI agents working with the CONTRIBUTOR-DOCS navigation system.

## Role 1: Operator

Run the regeneration script to update breadcrumbs and TOCs.

### When to run

Execute the script when:

- A file or folder is added, removed, or renamed
- A file is moved to a different location
- Document H1 headings are changed (these become display names)
- Document H2/H3 headings are added, removed, or changed
- The folder structure changes
- A human maintainer or another AI agent requests it

### How to run

```bash
cd CONTRIBUTOR-DOCS/01_contributor-guides/07_authoring-contributor-docs
node update-nav.js ../../
```

**Expected time:** ~20-200ms for entire CONTRIBUTOR-DOCS tree (includes automatic link verification)

### Responsibilities

1. **Execute** the script with appropriate parameters
2. **Verify success** - check that the script completed without errors
3. **Report results** - show the output summary (files updated, time taken)
4. **Debug if needed** - if errors occur, investigate and fix or report to the user

### Debugging errors

If the script fails:

1. **Check the error message** - the script provides clear error output
2. **Verify file structure** - ensure all markdown files have the `` marker
3. **Check file permissions** - ensure files are writable
4. **Validate markdown** - ensure H1 headings use proper syntax (`# Title`, not `##`)
5. **Report to user** - if you can't resolve, explain what you found

### Debugging output issues

When the auto-generated navigation appears incorrect or malformed:

1. **First, investigate the script** - Check if the issue can be fixed by updating `update-nav.js`
    - Read the script to understand how it processes the problematic content
    - Look for edge cases or patterns it doesn't handle correctly
    - Consider whether a fix to the script would allow the current document structure to work

2. **Only suggest content changes as a last resort** - Don't immediately suggest modifying document content
    - Document authors may have good reasons for their structure choices
    - Script improvements benefit all documents, not just one
    - Content changes may limit what authors can express in their docs

3. **Example**: If headings with links generate malformed TOC entries:
    - ✅ Good: Investigate the script's heading extraction, find it doesn't strip link syntax, add a fix
    - ❌ Bad: Tell the user to remove links from their headings

**Philosophy:** The script should adapt to reasonable document structures, not the other way around.

### Handling link verification errors

The script automatically verifies all internal markdown links after updating navigation. When broken links are found, they are reported in the script output with structured error details.

**Your role as an AI agent:**

1. **Analyze each error** - Review the error details provided by the script
2. **Fix straightforward cases automatically** - Don't ask for human input when the fix is clear:
    - File was renamed/moved → Find new location in metadata and update link
    - Anchor was renamed → Find matching or similar anchor in target file
    - Wrong relative path depth → Recalculate correct relative path
    - Case sensitivity issues → Fix capitalization
    - Missing or incorrect file extension → Add `.md` extension if needed

3. **Consult human for ambiguous cases** - Ask for guidance when:
    - Target file was completely removed (need decision on alternative link target)
    - Multiple possible anchor matches exist with similar names
    - Link intent is unclear or may need conceptual rethinking
    - You cannot determine the correct fix with high confidence

4. **Report fixes clearly** - After fixing, summarize:
    - How many links were broken
    - What fixes were applied
    - Any remaining issues that need human review

**Example workflow:**

```
Script reports: "File not found: ../migration/overview.md"
→ Search metadata for files matching "migration" or "overview"
→ Find: "03_project-planning/01_migration-status.md"
→ Update link with correct relative path
→ Report: "Fixed broken link: updated path to migration status doc"
```

---

## Role 2: Maintainer

Review and update the regeneration script when requirements or specifications change.

### Requirements and specifications

The script's behavior is defined by:

1. **Human maintainer instructions** (`human-maintainer-instructions.md`)
    - File and folder naming conventions
    - Numbering rules
    - Document structure requirements
    - Display name derivation rules

2. **File structure conventions** (implicit in the codebase)
    - README.md files as folder overviews
    - Lowercase kebab-case naming
    - Optional sequential numbering
    - HTML comment markers for separating content

3. **Output format requirements**
    - Breadcrumb format and linking rules
    - TOC structure ("In this doc" and "Beneath this doc" sections)
    - Collapsible `<details>` elements
    - GitHub-style anchor links

### When to maintain

Update the script when:

- Naming or numbering conventions change
- Breadcrumb or TOC format requirements change
- New edge cases are discovered
- Display name derivation rules change
- File structure conventions evolve
- Performance optimizations are needed

### Maintenance process

1. **Review the change request**
    - Understand what requirement or specification has changed
    - Identify which part of the script needs updating

2. **Update the script** (`update-nav.js`)
    - Modify the relevant functions
    - Maintain code quality and comments
    - Preserve existing functionality where applicable

3. **Test thoroughly**
    - Run the script on the entire CONTRIBUTOR-DOCS tree
    - Verify output matches new requirements
    - Check that existing functionality still works
    - Spot-check several files manually

4. **Update documentation**
    - Update this file if the operator role changes
    - Update human maintainer instructions if conventions change
    - Add comments in the script explaining non-obvious logic

5. **Report changes**
    - Summarize what was changed and why
    - Note any breaking changes or new behaviors
    - Provide examples of the new output format

### Script architecture

The script (`update-nav.js`) is organized into several sections:

1. **Configuration** - Constants for markers and behavior settings
2. **Utility Functions** - Helper functions for text processing and code block detection
3. **Metadata Extraction** - Scans the documentation tree and builds relationships
4. **Navigation Generation** - Creates breadcrumbs and table of contents
5. **File Update** - Replaces auto-generated content while preserving manual edits

For implementation details, see the script source code which includes inline comments explaining the logic.

---

## Script behavior details

### What the script does

**Step 1: Extract metadata** (~10-15ms)

- Walks the entire documentation tree
- Extracts H1 headings (used as display names)
- Extracts H2/H3 headings (for "In this doc" TOC section)
- Maps parent-child relationships
- Identifies folders with/without README files

**Step 2: Generate navigation** (~2-4ms)
For each file:

- Creates breadcrumbs linking to parent READMEs
- Creates "In this doc" TOC from H2/H3 headings
- Creates "Beneath this doc" TOC from child files/folders
- Wraps TOC in collapsible `<details>` element

**Step 3: Update files** (~2-4ms)

- Finds `` marker
- Replaces everything above it with new breadcrumbs and TOC
- Preserves all content below the marker
- Handles edge cases (duplicate markers in code blocks)

**Step 4: Verify links** (~10-150ms)

- Extracts all markdown links from document content (excluding auto-generated sections and code blocks)
- Validates that target files exist
- Validates that anchor references point to existing headings
- Reports any broken links with detailed error information

### Breadcrumb format

```markdown
[ROOT](../../README.md) / [Parent](../README.md) / Current Page
```

**Rules:**

- Root is always `CONTRIBUTOR-DOCS` linking to root README.md
- Parent folders link to their README.md (if it exists)
- Folders without README show as plain text (no link)
- Current page is plain text (not linked)
- Display names from H1 headings, not filenames

### TOC format

```markdown
<details open>
<summary><strong>Contents</strong></summary>

- **In this doc**
    - [Section heading](#section-heading)
- **Beneath this doc**
    - [Child file](./child.md)
    - [Child folder](./folder/README.md)

</details>
```

**Rules:**

- Omit "In this doc" if no H2/H3 headings exist
- Omit "Beneath this doc" if no child files/folders exist
- Omit entire TOC if both sections would be empty
- Use GitHub-style anchors (lowercase, hyphens, no special chars)
- Recursively include grandchildren with proper indentation

### Display name derivation

**For files:** Extract H1 heading

- `# Migration Status` → "Migration Status"

**For folders with README:** Extract H1 from README.md

- README contains `# Workstream Info` → "Workstream Info"

**For folders without README:** Derive from folder name

1. Remove number prefix: `02_project-planning` → `project-planning`
2. Replace hyphens with spaces: `project-planning` → `project planning`
3. Apply title case: `workstream info` → `Workstream Info`

---

## Testing checklist

After running or modifying the script:

- [ ] Script completed without errors
- [ ] All files were updated (check the count in output)
- [ ] Link verification completed (check counts of valid/broken links)
- [ ] Spot-check breadcrumbs are correct and links work
- [ ] Spot-check TOCs reflect current structure
- [ ] Display names are human-readable (from H1 headings)
- [ ] Folders without README show as plain text (no link)
- [ ] Collapsible TOC sections work properly
- [ ] Manual content below `` is preserved
- [ ] No trailing spaces or formatting issues
- [ ] Any broken links reported have been addressed
