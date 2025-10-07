<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Organization and Formatting Rules](../README.md) / [Contributor docs](README.md) / Maintainer instructions

<!-- Document title (editable) -->

# Maintainer instructions

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Understanding auto-generated content](#understanding-auto-generated-content)
- [When to request regeneration](#when-to-request-regeneration)
- [File organization guidelines](#file-organization-guidelines)
    - [Naming conventions](#naming-conventions)
    - [Numbering](#numbering)
    - [Folder structure](#folder-structure)
    - [Document structure](#document-structure)
- [Content guidelines](#content-guidelines)
    - [Headings and display names](#headings-and-display-names)
    - [Links](#links)
- [Adding new content](#adding-new-content)
- [Working with AI agents](#working-with-ai-agents)
    - [Best practices](#best-practices)
    - [Common requests](#common-requests)
    - [Verifying AI output](#verifying-ai-output)
- [Troubleshooting](#troubleshooting)
    - [Broken links](#broken-links)
    - [Incorrect TOC](#incorrect-toc)
    - [Missing content in TOC](#missing-content-in-toc)

</details>

<!-- Document content (editable) -->

This document provides guidance for maintainers of the CONTRIBUTOR-DOCS structure.

## Understanding auto-generated content

Files in CONTRIBUTOR-DOCS contain both auto-generated and manually-maintained content.

**When creating new files:**

Simply write standard Markdown with an H1 heading and your content:

```markdown
# Your Document Title

Your content goes here.

## Section One

More content...
```

The regeneration script will automatically add all necessary markers on first run.

**After the script runs:**

The file will have this structure with markers clearly separating auto-generated and editable content:

```markdown
<!-- Generated breadcrumbs - DO NOT EDIT -->

[Auto-generated breadcrumb navigation]

<!-- Document title (editable) -->

# Your Document Title

<!-- Generated TOC - DO NOT EDIT -->

[Auto-generated table of contents]

<!-- Document content (editable) -->

[Your manually-maintained content]
```

**What's editable:**

- The H1 title (between `<!-- Document title (editable) -->` and the TOC marker)
- All content after `<!-- Document content (editable) -->`

**What's auto-generated** (DO NOT EDIT manually):

- Breadcrumbs
- Table of contents (TOC)

## When to request regeneration

Request AI regeneration of breadcrumbs and TOC when you:

- Add, remove, or rename a file or folder
- Move a file to a different location
- Add, remove, or rename section headings in a document
- Change the organizational structure

You can request regeneration by asking an AI agent: "Please regenerate the breadcrumbs and TOC for the CONTRIBUTOR-DOCS folder following the guidelines in `AI-Agent-Instructions.md`."

## File organization guidelines

### Naming conventions

- Use lowercase kebab-case for all files and folders: `2nd-gen-component-migration`
- Exception: `README.md` files use conventional capitalization

### Numbering

- Number files only when ordering matters: `01_important-first.md`, `02_next.md`
- Numbers should be two digits, with leading zeros as needed, and followed by an underscore
- Unnumbered files are allowed and will sort alphanumerically
- Folders can contain mix of numbered and unnumbered files, though this may be uncommon

### Folder structure

- Keep the hierarchy shallow when possible (avoid deeply nested structures)
- Group related content into folders
- `README.md` files are optional; if absent, folder links in TOC/breadcrumbs appear as plain text (no link)

### Document structure

Every documentation file should:

1. Start with auto-generated breadcrumbs and TOC (handled by AI)
2. Have a clear H1 title (use `#` not `##`)
3. Use heading hierarchy properly (H2 for main sections, H3 for subsections)

## Content guidelines

### Headings and display names

- Document titles come from H1 headings, not filenames
- Use proper heading hierarchy (don't skip levels like H2 to H4)
- Avoid duplicate headings in the same document (they'll create conflicting anchor links in the TOC)

### Links

- Always use relative links for internal documentation
- When manually creating links to folders with README.md, link to the README.md file:
    - Correct: `[Workstream Info](./03_workstream-info/README.md)`
    - Incorrect: `[Workstream Info](./03_workstream-info/)`
- For folders without README.md, AI-generated TOCs/breadcrumbs will show the folder name as plain text (no link)

## Adding new content

**Recommended workflow:**

1. Determine the appropriate location in the hierarchy
2. Create the file with proper naming conventions (lowercase kebab-case, numbered only if ordering matters)
3. Write your content as standard Markdown:
    - Start with a clear H1 title (`# Title`) - this becomes the display name in TOCs/breadcrumbs
    - Add your content sections with H2 (`##`) and H3 (`###`) headings as needed
    - No need to add any HTML comment markers - the script will add them automatically
4. Request AI regeneration of breadcrumbs/TOC
5. Review the generated output to ensure it looks correct

**What happens:**

- The script detects your plain Markdown file
- It extracts your H1 and content
- It adds all necessary markers and generates breadcrumbs/TOC
- Your content is preserved exactly as written

## Working with AI agents

### Best practices

- Provide clear, specific instructions
- Reference the AI-Agent-Instructions.md document
- Review generated content for accuracy
- Make corrections if the AI misunderstands the structure

### Common requests

- "Regenerate breadcrumbs and TOC for all files in CONTRIBUTOR-DOCS"
- "Add breadcrumbs and TOC to the new file I just created at [path]"
- "Update the TOC in [file] to reflect the new headings I added"

### Verifying AI output

After AI regeneration, check:

- [ ] All links are valid and point to existing files
- [ ] Relative paths are correct
- [ ] Display names are readable and accurate
- [ ] Hierarchy/indentation is correct
- [ ] No folders are linked directly (should link to README.md)
- [ ] Current page is not linked in breadcrumbs

## Troubleshooting

### Broken links

- Verify file paths are correct (check for typos)
- Ensure you're linking to README.md in folders, not the folder itself
- Check that relative paths account for the current file's location

### Incorrect TOC

- Verify heading structure in the document
- Ensure headings follow proper Markdown syntax
- Check that file/folder names match the filesystem

### Missing content in TOC

- Verify files are properly numbered
- Check that child files/folders exist in the expected location
- Ensure README.md files exist for all folders that need them
