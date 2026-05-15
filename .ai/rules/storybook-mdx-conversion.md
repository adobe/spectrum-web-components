---
description: How CONTRIBUTOR-DOCS Markdown is auto-mirrored into Storybook MDX, and which surfaces are NOT auto-generated.
globs: '**/*.md,**/*.mdx'
alwaysApply: false
---

# Storybook MDX generation (audience-aware SSOT)

SWC's 2nd-gen documentation uses a **dual SSOT** model split by audience. This rule explains which content is auto-generated to Storybook from MD sources, which content is hand-authored MDX directly in `.storybook/`, and which content lives only on GitHub.

See: `CONTRIBUTOR-DOCS/project-planning/05_strategies/audience-based-docs-reorganization-plan.md` and `audience-based-docs-storybook-residency-audit.md` for the full architecture.

## What is auto-generated, what is hand-authored

| Source                                      | Format          | Audience              | How it reaches Storybook                                                                                                                                                                                                   |
| ------------------------------------------- | --------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONTRIBUTOR-DOCS/for-contributors/*.md`    | MD              | Contributors          | **Auto-mirrored** to `.storybook/docs/contribute/for-contributors/` by `generate-contributor-docs.mjs`. Gated to dev builds.                                                                                               |
| `CONTRIBUTOR-DOCS/for-maintainers/*.md`     | MD              | Maintainers           | **Auto-mirrored** to `.storybook/docs/contribute/for-maintainers/`. Gated to dev builds.                                                                                                                                   |
| `CONTRIBUTOR-DOCS/project-planning/**/*.md` | MD              | Maintainers, planning | **Auto-mirrored** to `.storybook/docs/contribute/project-planning/`. Gated to dev builds.                                                                                                                                  |
| `CONTRIBUTOR-DOCS/for-consumers/*.md`       | MD              | Consumers             | **Not** auto-mirrored. Rich consumer content lives as hand-authored MDX in `.storybook/docs/{get-started,learn,reference}/`. `for-consumers/` holds only process docs (e.g. the issue tracker workflow) and a thin README. |
| `CONTRIBUTOR-DOCS/reference/*.{yml,yaml}`   | YAML            | (data)                | Not mirrored. The YAML is consumed by hand-authored MDX in `.storybook/docs/reference/` at build time (e.g. component status matrix).                                                                                      |
| `.storybook/docs/get-started/*.mdx`         | MDX             | Consumers             | **Hand-authored MDX SSOT.** Includes live `<Canvas>`, `<swc-*>` demos.                                                                                                                                                     |
| `.storybook/docs/learn/**/*.mdx`            | MDX             | Consumers, evaluators | **Hand-authored MDX SSOT.** Customization, accessibility, about-SWC. Often uses live component embeds.                                                                                                                     |
| `.storybook/docs/reference/*.mdx`           | MDX             | Consumers, designers  | **Hand-authored MDX SSOT.** Component status matrix with live badges, design tokens, core package overview.                                                                                                                |
| `.storybook/docs/contribute/**/*.mdx`       | MDX (generated) | Contributors          | **DO NOT EDIT.** Regenerated from `CONTRIBUTOR-DOCS/` on every `yarn dev` / `yarn storybook`. Edits will be overwritten.                                                                                                   |
| `.storybook/DocumentTemplate.mdx`           | MDX             | (Storybook infra)     | Hand-authored template that renders the docs page for each component story.                                                                                                                                                |

## The audience-aware SSOT principle

A doc lives where its **primary audience** finds it natively:

- Storybook-primary audiences (consumers, designers, evaluators) → **MDX SSOTs in `.storybook/docs/`** so they can use live `<Canvas>`, story imports, and other Storybook-only features.
- GitHub-primary audiences (contributors, maintainers, planners) → **MD SSOTs in `CONTRIBUTOR-DOCS/`** so they render natively on GitHub during code review and repo exploration. The generator mirrors these into Storybook as a convenience.

Cross-surface mirroring is one-way and only for the GitHub-primary content. Consumer-primary MDX in `.storybook/docs/` is never copied back to CONTRIBUTOR-DOCS.

## The generator

Path: `2nd-gen/packages/swc/.storybook/scripts/generate-contributor-docs.mjs`.

What it does on every run:

1. Walks the **three included audience folders** (`for-contributors/`, `for-maintainers/`, `project-planning/`) inside `CONTRIBUTOR-DOCS/`. Files in other folders are not touched.
2. Emits one `.mdx` per `.md` into `.storybook/docs/contribute/`, mirroring the source folder tree.
3. Strips the generated breadcrumbs + TOC blocks (those belong on GitHub, not Storybook).
4. Rewrites intra-tree `.md` links to Storybook `/docs/contribute-...` routes.
5. Rewrites links to source files (`.ts`, `.css`, etc.) to GitHub `blob/main/...` URLs.
6. Sanitizes HTML for MDX (self-closes void tags, converts angle-bracket emails to mailto links, converts `<!-- -->` to `{/* */}`).
7. Adds a `<Meta title="..." />` block to each emitted MDX.
8. Renames `README.md` → `index.mdx` so each folder has a clean index in Storybook.
9. Updates `preview.ts` `storySort.order` between the `GENERATED:CONTRIBUTOR-DOCS-SORT` marker comments so the sidebar order tracks the source tree.

When the generator runs:

- `yarn generate:contributor-docs` (direct invocation)
- Pre-hook of `yarn storybook` and `yarn dev` (so local dev always sees fresh output)
- Pre-hook of `yarn storybook:build` (so the production build is consistent — but the entire `Contribute` titlePrefix block is gated to non-build mode in `main.ts`, so the generated content is NOT shipped to production Storybook)

## Output gating

The whole `Contribute` titlePrefix is wrapped in `storybookMode !== 'build'` in `main.ts`. Why:

- Contributors are comfortable in code. When they need a contributor doc, they're browsing GitHub, running `yarn dev` locally, or asking an AI agent that retrieves MD.
- Production Storybook (the public docs site) ships **only the consumer-facing surface**: `Get started`, `Components`, `Patterns`, `Learn`, `Reference`.
- This keeps the public site clean and signals appropriate detail to non-contributors.

This decision is locked. Do not relax the gate.

## Do not hand-edit generated MDX

`.storybook/docs/contribute/` is `.gitignore`d. Any hand-edits will be overwritten the next time the generator runs (which happens on every `yarn dev` / `yarn storybook`).

To change contributor-doc content:

1. Edit the corresponding `.md` file under `CONTRIBUTOR-DOCS/`
2. Run the nav script if your edit changed headings or structure: `node CONTRIBUTOR-DOCS/for-contributors/authoring-contributor-docs/update-nav.js`
3. The generator picks up the change on the next `yarn dev` / `yarn storybook` run

## Hand-authored MDX rules

`.storybook/docs/{get-started,learn,reference}/*.mdx` files ARE hand-authored. When editing them:

1. Use the existing `<Meta title="..." />` block to control sidebar placement
2. Use Storybook addon-docs blocks (`<Canvas>`, `<Story>`, `<Description>`, etc.) when embedding live demos
3. Match the URL format the rest of the sidebar uses (titlePrefix-derived); see `preview.ts` `storySort.order` for canonical naming
4. Self-close void HTML tags (`<br />`, `<hr />`, `<img ... />`) — MDX requires it
5. Use JSX comments `{/* */}`, not HTML comments
6. Image imports via Vite (`import bg from '../assets/...'`) work for hand-authored MDX

## Critical rules

1. **One source per audience.** Never duplicate content between `CONTRIBUTOR-DOCS/` and `.storybook/docs/`. Pick the audience-appropriate home and link from the other surface if cross-linking is needed.
2. **Do not edit auto-generated MDX** under `.storybook/docs/contribute/`. Edit the MD source instead.
3. **Do not relax the Contribute gate.** Production Storybook is consumer-only by design.
4. **Do not move consumer content to CONTRIBUTOR-DOCS** to "make it git-reviewable." Consumer content's primary surface is the Storybook docs site; PR review happens on the MDX file in `.storybook/docs/` directly.

## What survived from the prior conversion rule

The previous version of this rule described a manual `.md → .mdx` conversion process for contributor docs. That manual process is replaced by the generator. Authoring rules for hand-authored MDX (Meta block, JSX comments, self-closed void elements) remain valid for `.storybook/docs/{get-started,learn,reference}/` files.
