---
description: Reference for the MD → MDX build step that generates contributor docs and mirrored Storybook landings. The conversion is scripted; do not hand-edit the generated tree.
globs: '**/*.md,**/*.mdx'
alwaysApply: false
---

# Storybook MDX conversion

Contributor docs are converted from Markdown to MDX by a build script, not by hand. This rule exists so agents and contributors know not to hand-edit the generated tree.

## Source of truth

- **Author in Markdown** under `CONTRIBUTOR-DOCS/` — that tree is the SSOT.
- **Do not edit** `.mdx` files under `2nd-gen/packages/swc/.storybook/contributor-docs/` or `2nd-gen/packages/swc/.storybook/get-started/index.mdx`. They are generated and gitignored — edits will be overwritten on the next Storybook run.

## How the conversion runs

The script at `2nd-gen/packages/swc/.storybook/scripts/generate-contributor-docs.mjs` runs automatically via:

```bash
# From 2nd-gen/packages/swc
yarn generate:contributor-docs
```

It is wired into `yarn storybook` and `yarn storybook:build`, so a normal dev loop regenerates on every start. The script:

- Walks `CONTRIBUTOR-DOCS/` and emits one `.mdx` per `.md` under `.storybook/contributor-docs/`
- Emits mirrored copies for files configured in `MIRROR_EMITS` (currently: `00_get-started/for-consumers.md` → `.storybook/get-started/index.mdx` with title `Get started`)
- Strips the auto-generated breadcrumbs + TOC blocks (they belong on GitHub, not Storybook)
- Rewrites `.md` links to Storybook `/docs/...` paths and source-file links to GitHub URLs
- Sanitizes HTML for MDX (self-closes void elements, converts `<user@example.com>` to `mailto:` links)
- Converts HTML comments to JSX comments
- Adds the `<Meta title="..." />` block that Storybook needs
- Renames `README.md` → `index.mdx` so each folder has a clean index
- Updates the `storySort` order in `.storybook/preview.ts` between the `GENERATED:CONTRIBUTOR-DOCS-SORT` markers

## Links in the source Markdown

- **`.md` links** within `CONTRIBUTOR-DOCS/` are rewritten to the target doc's Storybook URL.
- **Source files** (`.ts`, `.js`, `.css`, etc.) are rewritten to GitHub blob URLs.
- **Stable Storybook paths** (e.g., `/docs/guides-customization-getting-started--docs`) pass through unchanged. Use these when linking from CONTRIBUTOR-DOCS Markdown to hand-authored Storybook `.mdx` pages outside the contributor-docs tree.
- **Absolute URLs** (`http://`, `https://`, `#anchor`) pass through unchanged.

## Adding a new mirrored landing page

If a CONTRIBUTOR-DOCS Markdown file should also render at a top-level Storybook location (outside `contributor-docs/`), add an entry to `MIRROR_EMITS` in the script with `source`, `outputDir`, `outputFile`, `title`, and optional `heading`. The source file continues to render in its normal contributor-docs location too.

## Don't

- Don't hand-edit `.mdx` under `.storybook/contributor-docs/` or `.storybook/get-started/`.
- Don't commit those paths — they're in `.gitignore`.
- Don't add the old manual conversion steps (imports + `<Meta>` + HTML-comment rewrites) to your workflow; the script owns them now.
