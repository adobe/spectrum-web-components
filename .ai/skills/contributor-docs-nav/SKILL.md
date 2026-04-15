---
name: contributor-docs-nav
description: Run the CONTRIBUTOR-DOCS nav script to update breadcrumbs and TOCs, and handle link verification. Use when updating contributor docs structure, regenerating navigation, or fixing broken links.
---

# Contributor docs navigation

Run the regeneration script to update breadcrumbs and TOCs in CONTRIBUTOR-DOCS, and handle link verification. Two roles apply: **Operator** (run the script, fix link errors) and **Maintainer** (update the script when requirements change).

## When to use this skill

- A file or folder under CONTRIBUTOR-DOCS is added, removed, renamed, or moved
- Document H1, H2, or H3 headings are changed
- The user asks to update contributor docs navigation, regenerate TOC, or fix broken links in CONTRIBUTOR-DOCS
- The contributor-doc-update rule is triggered (editing CONTRIBUTOR-DOCS structure)

## How to invoke

- Say "update contributor docs nav", "regenerate TOC", "fix broken links in CONTRIBUTOR-DOCS", or "run the nav script"
- Or add, remove, rename, or move files under `CONTRIBUTOR-DOCS/` or change H1/H2/H3 headings — the agent should run the nav script and may use this skill

## Quick reference

### Operator: run the script

1. **When to run**: File/folder add/remove/rename/move; heading changes; folder structure changes; or user request.
2. **How to run** (from project root):
   ```bash
   cd CONTRIBUTOR-DOCS/01_contributor-guides/07_authoring-contributor-docs
   node update-nav.js
   ```
3. **After running**: Verify success, report results (files updated, link counts). Fix straightforward link errors automatically; ask the user when the fix is ambiguous (e.g. target file removed, multiple anchor matches).

### Maintainer: update the script

- **When**: Naming/convention changes, breadcrumb/TOC format changes, new edge cases, or display-name rule changes.
- **Process**: Review change → update `update-nav.js` → test on full tree → update docs and report.

## Full instructions

For complete Operator and Maintainer workflows, debugging, link-verification handling, script behavior details, and the testing checklist, read:

**.ai/skills/contributor-docs-nav/references/ai-agent-instructions.md**

That document is the single source of truth for when to run, how to run, responsibilities, debugging, handling link verification errors, maintainer process, script architecture, and testing checklist.
