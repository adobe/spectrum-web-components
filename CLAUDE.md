# Spectrum Web Components — Claude Code instructions

<!--
  GENERATED FILE — do not edit by hand.
  Source of truth: .ai/rules/*.md (tool-agnostic). Regenerate with `yarn build:claude`.
  CI (`yarn lint:ai`) fails if this file drifts from the rule frontmatter.
  Background on the adapter model: .ai/README.md.
-->

Project rules live in `.ai/rules/` as tool-agnostic markdown. Cursor honors their
`alwaysApply` / `globs` frontmatter live; Claude Code does not, so this file is
compiled from that frontmatter. Always-active rules are imported below; every other
rule is listed with the trigger for when to read it — do not load those preemptively.

## Always active

@.ai/rules/branch-naming.md
@.ai/rules/styles.md

## Read when editing matching files

- `.ai/rules/component-readme.md` — editing `1st-gen/packages/*/README.md`: Guidelines for component README documentation structure and accessibility compliance
- `.ai/rules/contributor-doc-update.md` — editing `CONTRIBUTOR-DOCS/**`: Useful for updating auto-generated navigation and validating links in the contributor docs
- `.ai/rules/stories-documentation.md` — editing `2nd-gen/packages/swc/components/*/*.mdx`, `2nd-gen/packages/swc/patterns/*/*/*.mdx`, `2nd-gen/packages/core/controllers/*/*.mdx`: Authoring guide for the per-unit MDX docs page for 2nd-gen components, internal components, patterns, and controllers. Covers section content, accessible examples, and 1st-gen comparison notes. Story prose lives in MDX, not in JSDoc above story exports.
- `.ai/rules/stories-format.md` — editing `2nd-gen/packages/swc/components/*/stories/**`, `2nd-gen/packages/swc/patterns/*/*/stories/**`, `2nd-gen/packages/core/controllers/*/stories/**`: Enforces consistent file structure, section separators, meta configuration, story tags, and layout parameters for 2nd-gen Storybook stories files. Story prose lives in per-unit MDX; the stories file is definitions-only.
- `.ai/rules/storybook-mdx-conversion.md` — editing `**/*.md`, `**/*.mdx`: Converts contributor documentation from Markdown to MDX for Storybook rendering — adds imports, Meta tag, and converts HTML comments to JSX comments without altering any other content.
- `.ai/rules/text-formatting.md` — editing `**/*.md`, `**/*.txt`, `**/*.mdx`: Text formatting and capitalization rules for documentation and tickets

## Read when the task calls for it

- `.ai/rules/code-conformance.md` — Review 2nd-gen component files against project style guides, run linters, and surface guideline gaps. Apply whenever reviewing or auditing 2nd-gen component code for style conformance.
- `.ai/rules/consistency-pass.md` — Defines when and how to run a consistency and validity self-audit on changed files and the migration plan. Apply before declaring any migration phase or significant implementation task complete.
- `.ai/rules/deep-understanding.md` — Apply intelligently. For non-trivial work, do deep research and write findings to a persistent file (e.g. research.md at repo root) before code. Do not apply for simple, self-contained requests (e.g. creating a regex, one-line fix, single known file).
- `.ai/rules/github-description.md` — Generates GitHub pull request and issue descriptions — title, labels, and body — following Spectrum Web Components conventions. Prompts for a linked ticket if none is provided.
- `.ai/rules/jira-ticket.md` — Guidelines for drafting and formatting Jira tickets
- `.ai/rules/migration-phase-awareness.md` — Keeps multi-phase migration obligations in context during a session. Emits Migration Checkpoint blocks at phase completion for cross-session continuity. Apply whenever any migration-* skill is active or migration files are being edited.
