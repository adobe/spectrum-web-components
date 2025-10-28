<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Contributor guides](../README.md) / Authoring contributor docs

<!-- Document title (editable) -->

# Authoring contributor docs

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Writing & editing docs](#writing--editing-docs)
    - [Creating a new doc](#creating-a-new-doc)
    - [Editing existing docs](#editing-existing-docs)
    - [Titles and headings](#titles-and-headings)
    - [Links](#links)
- [Organizing docs](#organizing-docs)
    - [Folder structure](#folder-structure)
    - [Use `README.md` for index files](#use-readmemd-for-index-files)
    - [File and folder naming conventions](#file-and-folder-naming-conventions)
    - [Ordering](#ordering)
- [Updating auto-generated navigation](#updating-auto-generated-navigation)
    - [Verifying and troubleshooting](#verifying-and-troubleshooting)
- [Committing updates](#committing-updates)

</details>

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [AI agent instructions](01_ai-agent-instructions.md)

</details>

<!-- Document content (editable) -->

## Overview

This document provides guidance for maintainers of the Spectrum Web Components contributor docs, which are located in the CONTRIBUTOR_DOCS folder at the root of the repository.

For the most part, the contributor docs are just ordinary Markdown (`.md`) files located in a nested folder structure.

The navigational structure of the docs is derived from the location of the files within the folder structure and the Markdown headings within each doc.

To help with browsability and navigation:

- There are some conventions around file organization and naming (described in this document).
- There is a script that automatically [generates / updates breadcrumbs and TOCs](#updating-auto-generated-navigation).

    You can run this script manually, but we recommend invoking it via an AI agent, so that the agent can help with verification and troubleshooting as needed.

## Writing & editing docs

### Creating a new doc

To create a new doc, just decide where you want to put it (see [Organizing docs](#organizing-docs)), then write a standard Markdown file. This file should contain an H1 heading representing the document title, along with whatever content you want to include.

```markdown
# Your Document Title

Your content goes here.

## Section One

More content...
```

You should not include navigational elements (breadcrumbs and TOCs), as these are [auto-generated and updated](#updating-auto-generated-navigation) upon request.

### Editing existing docs

When you are editing existing docs, you'll find [auto-generated breadcrumbs and TOCs](#updating-auto-generated-navigation) alongside the document content.

Each doc file has the following structure, with markers clearly separating auto-generated and editable content:

```markdown
<!-- Generated breadcrumbs - DO NOT EDIT -->

[Auto-generated breadcrumb navigation]

<!-- Document title (editable) -->

# Your Document Title

<!-- Generated TOC - DO NOT EDIT -->

[Auto-generated table of contents]

<!-- Document content (editable) -->

[Document content]
```

**What's editable:**

- The H1 title (between `<!-- Document title (editable) -->` and the TOC marker)
- All content after `<!-- Document content (editable) -->`

### Titles and headings

- As noted previously, each document should have a title, represented by a Markdown H1 (`#`) heading.

    This title is displayed in the document, and used in generated breadcrumbs and TOCs.

- Within each document, use proper heading hierarchy (don't skip levels).
- Avoid duplicate heading names in the same document (they'll create conflicting anchor links in the TOC).

### Links

- When linking to other doc files, use relative links
- Always link to files, not folders:
    - Correct: `[Workstreams](../../02_project-planning/02_workstreams/README.md)`
    - Incorrect: `[Workstreams](../../02_project-planning/02_workstreams/)`

## Organizing docs

### Folder structure

- Keep the hierarchy shallow when possible (avoid deeply nested structures)
- Group related content into folders

### Use `README.md` for index files

- Although not required, it often makes sense for a folder to have a "main" (index) file. The index file:
    - Serves as a standard place to include overview content for a section of the docs
    - Lets a folder appear as a clickable link in breadcrumbs and TOCs.

- Naming a file `README.md` makes it the index file for the containing folder.

    _We borrow this convention from GitHub, so you'll see the content when navigating to a folder in the GitHub UI._

- If a folder doesn't contain a `README.md` file, the folder name will appear as plain text (no link) in breadcrumbs and TOCs.

### File and folder naming conventions

- File and folder names don't matter very much, since titles are taken from the H1 headings in Markdown files.
- There are two ways in which file and folder names DO matter:
    - File and folder names determine the order of TOC entries (see **Ordering**, below).
    - In breadcrumbs and TOCs, the display name of a folder without a `README.md` file is derived from the folder's name.
- By convention:
    - Use lowercase kebab-case for all file and folder names: `2nd-gen-component-migration`.
    - Exception: `README.md` files use conventional capitalization
    - See **Ordering** for numbering conventions.

### Ordering

- Within each section of the auto-generated TOC, entries are ordered alphanumerically.
- If the order of entries in a given section doesn't matter, there's no need to do anything special; entries will end up in alphabetical order by default.
- Where needed, use numeric prefixes in your file and folder names to specify ordering.
    - Numeric prefixes should be two digits, with leading zeros as needed, and followed by an underscore: `01_important-first.md`, `02_next.md`, etc.

## Updating auto-generated navigation

Request generation of breadcrumbs and TOC when you:

- Add, remove, or rename a file or folder
- Move a file to a different location
- Add, remove, or rename section headings in a document
- Change the organizational structure

You can request an update by asking an AI Agent, pointing it to the [AI Agent Instructions](./01_ai-agent-instructions.md).

> If you're using Cursor, you can just ask an agent to "update the contributor docs"; a project-level Cursor rule will help the agent find the applicable instructions.

> If you don't have access to an AI Agent or prefer not to use one, you can also run the script manually. See [the AI Agent Instructions](./01_ai-agent-instructions.md) for details.

### Verifying and troubleshooting

The logic for generating navigational elements is quite simple, so it's unlikely that things will go wrong, but it's a good idea to do a quick spot-check to ensure that breadcrumbs and TOCs look correct, especially in areas of the docs that you have edited.

If you encounter any issues, try asking an AI agent to help you troubleshoot, pointing the agent to the [AI Agent Instructions](./01_ai-agent-instructions.md).

## Committing updates

Because auto-generated navigation lives in the source files alongside manually edited content, you should [update the navigation](#updating-auto-generated-navigation) before committing any edits. This ensures that, at any given point in the commit history, the navigation will match the content in the docs.
