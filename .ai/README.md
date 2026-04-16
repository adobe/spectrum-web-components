# AI and agent documentation

Coding agents should start with [`AGENTS.md`](../AGENTS.md) at the repository root. It summarizes how to use this directory as the canonical source for rules and skills.

This directory contains rules, skills, and accumulated memory that coding agents use to enforce consistent formatting and structure in our codebase.

## Why `.ai/`

All rules and skills now live in **`.ai/`** — a tool-agnostic, plain-markdown directory that any agent or tool can read. IDE-specific directories (`.cursor/`, `.claude/`) become thin adapters that point back to `.ai/` via symlinks:

- Edit once in `.ai/` → all tools see the update automatically
- No sync step, no duplication, no drift between tools
- New contributors or tools start from `AGENTS.md` at the repo root, which bootstraps everything

## Rules

Rules defined in the `config.json` follow this structure:

```json
{
  "version": 1,
  "rules": {
    "category": {
      "rule_name": {
        "enabled": true,
        "pattern": "regex_pattern",
        "message": "Error message"
      }
    }
  }
}
```

Additional, more specific rules can be found in the `rules` directory in either a `json` or `md` format.

### Available rules

#### Text formatting

- **heading_case**: Enforces sentence case in headings with specific exceptions
  - Applies to: `.md`, `.txt`, `.mdx` files
  - Exceptions: Technical terms and acronyms

#### Jira tickets

- **ticket_title**: Validates Jira ticket title format
  - Optional component in brackets
  - Max length: 80 characters
- **required_sections**: Ensures required sections are present
- **templates**: Enforces template structure for different ticket types
- **labels**: Validates that only allowed labels are used
- **issue_types**: Ensures correct issue type selection

#### Styles

- **stylelint_compliance**: Auto-fixes based on `stylelint.config.js` unless rewriting more than 30% of the line
- **copyrights**: Must reflect the current year
- **comments**: Always use sentence case, never title case
- **custom_properties**: Never rename without prompting for approval first
- **media_queries**: Sort high-contrast and other media queries to the bottom of the file
- **duplicate_properties**: Warn about or suggest fixes; keep the definition that honors the CSS cascade
- Applies to: `*.css` files

#### Branch naming

- **branch_format**: Recommends `username/type-description[-swc-XXX]` format
  - Uses conventional commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
  - Commit type list and validation pattern: `.ai/config.json` (`git.types`, `validationPattern`). When adding or removing a type, update both `types` and `validationPattern` together.
  - Lowercase letters and numbers only, words separated by dashes
  - Severity: Warning (recommended, not required)

#### Storybook stories (documentation + format)

These two rules share the same glob (`2nd-gen/**/stories/**`) and work as a pair: `stories-documentation` defines _what_ to document, `stories-format` defines _how_ to structure the file.

- **stories-documentation**: Content patterns for each documentation section
  - Sections: overview, anatomy, options, states, behaviors, accessibility
  - 1st-gen to 2nd-gen comparison guidance
  - Verification process to prevent hallucinated attributes, slots, or ARIA claims
- **stories-format**: File structure and technical conventions
  - Visual separators, meta configuration, required tags, layout parameters
  - `render` vs `args` patterns, `flexLayout` usage, `section-order` parameter
  - Static color three-story pattern, image asset conventions

#### Component README

- **document_structure**: Required sections for 1st-gen component READMEs
  - Sections: overview, usage, anatomy, options, states, behaviors, accessibility
  - Starts with `## Overview`, not `# Component Name`
- **code_examples**: All examples must include accessible labels and unique IDs
- **sp_tabs**: Must include `selected`, `auto`, and `label` attributes
- Applies to: `1st-gen/packages/*/README.md`

#### Contributor docs

- **nav_update**: Run the nav script when adding, removing, renaming, or moving files under `CONTRIBUTOR-DOCS/`
- **link_validation**: Fix broken links automatically when the fix is clear; ask when intent is unclear
- Applies to: `CONTRIBUTOR-DOCS/**`

#### GitHub description

- **title_format**: `[Component] Brief description` in present tense, under 80 characters
- **description_structure**: Must follow the pull request template with motivation, related issues, and acceptance criteria
- **severity_classification**: SEV1 (critical) through SEV5 (trivial)
- **labels**: Use only labels that exist in the repository

#### Storybook MDX conversion

- **imports**: Add `Meta` import from `@storybook/addon-docs/blocks`
- **meta_tag**: Add `<Meta title="..." />` matching the document's main heading
- **comments**: Convert all `<!-- -->` HTML comments to `{/* */}` JSX comments
- **preserve_content**: Keep all markdown syntax, HTML elements, links, and formatting unchanged

#### Deep understanding

- **apply_intelligently**: Use for non-trivial work (multiple files, new area, complex behavior); do not use for simple, self-contained requests (e.g. creating a regex, one-line fix, single known file) to avoid wasting tokens and overloading context. Before writing non-trivial code, do deep research on the relevant part of the codebase first.
- **action** (when the rule applies): Scope → deep read → write persistent report (e.g. research.md at repo root) → pause for user review → proceed only after validation. Full workflow in `.ai/skills/deep-understanding/SKILL.md`
- **rationale**: The written report is the review surface; wrong research leads to wrong plan and wrong code (garbage in, garbage out)

### When rules are activated

**Always-applied rules:** Rules use `alwaysApply: true` to activate automatically, or `globs` to activate when matching files are edited.
**On-demand rules:** Rules with `alwaysApply: false` and no globs are on-demand only (activated by `@` mentioning them in chat).
**Config-based rules:** The `config.json` also defines structured validation for editors and other tooling to verify branch names, Jira ticket drafts, text-formatting, etc.:

- **text_formatting.headings**: Sentence case enforcement with technical term exceptions
- **text_formatting.patterns**: File patterns for text formatting (`**/*.md`, `**/*.txt`, `**/*.mdx`)
- **git.validationPattern**: Branch name regex validation
- **git.validationMessage**: Message shown when branch name validation fails
- **git.branchNameTemplate**: Template for branch names (`{username}/{type}-{description}{?-{issue}}`)
- **git.types**: Allowed branch/commit types (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert)
- **jira_tickets.title_format**: Title pattern and max length (80 characters)
- **jira_tickets.required_sections**: Ensures required sections are present
- **jira_tickets.templates**: Template structure for bug and feature ticket types
- **jira_tickets.labels**: Validates allowed label values
- **jira_tickets.issue_types**: Ensures correct issue type selection

| Rule                           | Always applied | On-demand | Config-based | Glob                              |
| ------------------------------ | :------------: | :-------: | :----------: | --------------------------------- |
| text-formatting                |       x        |           |              | `**/*.md`, `**/*.txt`, `**/*.mdx` |
| styles                         |       x        |           |              | `*.css`                           |
| branch-naming                  |       x        |           |              | —                                 |
| stories-documentation          |       x        |           |              | `2nd-gen/**/stories/**`           |
| stories-format                 |       x        |           |              | `2nd-gen/**/stories/**`           |
| deep-understanding             |                |     x     |              | —                                 |
| component-readme               |                |     x     |              | `1st-gen/packages/*/README.md`    |
| contributor-doc-update         |                |     x     |              | `CONTRIBUTOR-DOCS/**`             |
| github-description             |                |     x     |              | —                                 |
| jira-ticket                    |                |     x     |              | —                                 |
| storybook-mdx-conversion       |                |     x     |              | —                                 |
| text_formatting.headings       |                |           |      x       | —                                 |
| text_formatting.patterns       |                |           |      x       | —                                 |
| git.validationPattern          |                |           |      x       | —                                 |
| git.validationMessage          |                |           |      x       | —                                 |
| git.branchNameTemplate         |                |           |      x       | —                                 |
| git.types                      |                |           |      x       | —                                 |
| jira_tickets.title_format      |                |           |      x       | —                                 |
| jira_tickets.required_sections |                |           |      x       | —                                 |
| jira_tickets.templates         |                |           |      x       | —                                 |
| jira_tickets.labels            |                |           |      x       | —                                 |
| jira_tickets.issue_types       |                |           |      x       | —                                 |

### Usage

1. Rules are automatically enforced by your coding agent while editing relevant files; however, if you wish to enable a rule that is not triggered by default, you can do so by mentioning it in the chat (e.g. `@` in Cursor, or by name in Claude Code).
2. Rules can be toggled using the `enabled` flag
3. Custom error messages will be shown when rules are violated
4. Exceptions are handled through the `exceptions` field in relevant rules

### Updating rules

To modify these rules:

1. Edit the `config.json` or the appropriate file in the `rules` directory
2. Try to follow the existing structure and format where possible
3. Ensure valid regex patterns, where applicable
4. Include clear error messages
5. Test changes before committing

## Skills

Skills are used on-demand. When a task matches a skill’s purpose, the agent reads the skill file for workflows, patterns, and guidance. Skills live in the `skills` directory; each has a `SKILL.md` and may include references or scripts.

### Available skills

#### Accessibility migration analysis

- **purpose**: Create accessibility migration analysis docs for the "analyze accessibility" step of 2nd-gen component migration
- **How to invoke**: Say "create accessibility analysis for [component]", "analyze accessibility for [component]", or "accessibility migration for [component]". Also invoked when you refer to the "analyze accessibility" step in the 2nd-gen component migration workstream.
- Use when: On the analyze-accessibility step for one or more components; creating one markdown file per component at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/accessibility-migration-analysis.md`
- Applies to: `CONTRIBUTOR-DOCS/**/accessibility-migration-analysis.md`
- Provides: Required section order, ARIA recommendations structure, Shadow DOM guidance, keyboard and focus conventions, testing table format, reference examples

#### Accessibility compliance

- **purpose**: Implement WCAG 2.2 compliant interfaces with mobile accessibility, inclusive design patterns, and assistive technology support
- **How to invoke**: Ask for an accessibility audit, ARIA implementation, screen reader support, WCAG compliance, or inclusive UX (e.g. “make this accessible”, “add keyboard nav”). Not tied to a file type; applies to any UI or component work.
- Use when: Auditing accessibility, implementing ARIA patterns, building for screen readers, or ensuring inclusive user experiences
- Provides: WCAG checklist, ARIA patterns (e.g. button, dialog, form), contrast requirements, testing tools

#### Ask questions

- **purpose**: Clarify requirements before implementing when the request is underspecified or ambiguous
- **How to invoke**: Agent-triggered when it detects multiple plausible interpretations or missing key details (scope, constraints, “done”). You can also say “I’m not sure about X” or “clarify before you start” to encourage it.
- Use when: Multiple plausible interpretations exist, or key details (scope, constraints, “done”) are unclear
- Workflow: Decide if underspecified → ask must-have questions → pause until answered → confirm then proceed

#### Contributor docs navigation

- **purpose**: Run the CONTRIBUTOR-DOCS nav script to update breadcrumbs and TOCs, and handle link verification
- **How to invoke**: Say “update contributor docs nav”, “regenerate TOC”, “fix broken links in CONTRIBUTOR-DOCS”, or “run the nav script”. Also invoked when you add, remove, rename, or move files under `CONTRIBUTOR-DOCS/` or change H1/H2/H3 headings (the contributor-doc-update rule may trigger; the skill holds the full workflow).
- Use when: Updating contributor docs structure, regenerating navigation, or fixing reported broken links
- Provides: Operator workflow (run script, verify, fix links), Maintainer workflow (when to update script). Full instructions in `.ai/skills/contributor-docs-nav/references/ai-agent-instructions.md`

#### Component migration (rendering and styling)

- **purpose**: Create rendering-and-styling migration analysis docs for the “analyze rendering and styling” step of 2nd-gen component migration
- **How to invoke**: Say “create migration analysis for [component]”, “analyze rendering and styling for [component]”, or “rendering and styling migration for [component]”. Also invoked when you refer to the “analyze rendering and styling” step in the 2nd-gen component migration workstream.
- Use when: On the analyze-rendering-and-styling step for one or more components; creating one markdown file per component at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/rendering-and-styling-migration-analysis.md`
- Provides: Workflow summary (specs from CSS + SWC, three-way DOM comparison, CSS⇒SWC mapping table, summary). Full instructions in `CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_analyze-rendering-and-styling/cursor_prompt.md`

#### Migration — phase 1: prep (`migration-prep`)

- **purpose**: Understand the component, plan breaking changes, and define scope before any refactoring begins
- **How to invoke**: Say "start migration prep for [component]", "plan the migration for [component]", or "phase 1 migration for [component]"
- Use when: Beginning a 1st-gen → 2nd-gen component migration; before any files are created or code is moved
- Provides: Research checklist (1st-gen API, usage, tests), breaking-change analysis, scope definition, written plan for review

#### Migration — phase 2: setup (`migration-setup`)

- **purpose**: Create the 2nd-gen file and folder structure, wire up exports, and confirm the build passes before implementation begins
- **How to invoke**: Say "set up 2nd-gen structure for [component]", "create the file structure for [component]", or "phase 2 migration for [component]"
- Use when: After prep is complete; creating the scaffolding a component needs before any logic is ported
- Provides: File/folder creation checklist, export wiring steps, build-passes verification

#### Migration — phase 3: API (`migration-api`)

- **purpose**: Move properties, methods, and types from 1st-gen to 2nd-gen while maintaining a clear public API
- **How to invoke**: Say "migrate the API for [component]", "port properties and methods for [component]", or "phase 3 migration for [component]"
- Use when: Scaffolding is in place and it's time to define the component's public contract in 2nd-gen
- Provides: Property/method porting workflow, type definition guidance, API contract review

#### Migration — phase 4: styling (`migration-styling`)

- **purpose**: Migrate CSS to the 2nd-gen structure, apply Spectrum 2 tokens, and ensure stylelint passes
- **How to invoke**: Say "migrate styling for [component]", "port CSS for [component]", or "phase 4 migration for [component]"
- Use when: API is in place; translating 1st-gen CSS to 2nd-gen with Spectrum 2 design tokens
- Provides: CSS migration checklist, token mapping guidance, stylelint validation steps

#### Migration — phase 5: accessibility (`migration-a11y`)

- **purpose**: Implement WCAG-aligned semantics, ARIA, keyboard support, and focus management, and document accessibility behavior
- **How to invoke**: Say "migrate accessibility for [component]", "implement a11y for [component]", or "phase 5 migration for [component]"
- Use when: Styling is complete; hardening the component's accessibility implementation
- Provides: WCAG checklist, ARIA pattern guidance, keyboard/focus requirements, a11y documentation template

#### Migration — phase 6: testing (`migration-testing`)

- **purpose**: Write unit tests, accessibility tests, and Storybook play functions for a migrated component
- **How to invoke**: Say "write tests for [component] migration", "add migration tests for [component]", or "phase 6 migration for [component]"
- Use when: Implementation is feature-complete; adding test coverage before review
- Provides: Test coverage checklist, unit/a11y/play-function patterns, test-running verification

#### Migration — phase 7: documentation (`migration-documentation`)

- **purpose**: Write JSDoc, Storybook stories, and usage docs so the component is usable and understandable by others
- **How to invoke**: Say "write docs for [component] migration", "document [component] for 2nd-gen", or "phase 7 migration for [component]"
- Use when: Tests pass; creating the Storybook stories and usage documentation for the migrated component
- Provides: JSDoc guidelines, stories scaffolding, README/usage doc structure, documentation checklist

#### Migration — phase 8: review (`migration-review`)

- **purpose**: Run final checks, verify lint/tests/build/Storybook, update the workstream status table, and open a PR
- **How to invoke**: Say "review [component] migration", "final checks for [component]", or "phase 8 migration for [component]"
- Use when: Documentation is complete; preparing the migration for code review and merge
- Provides: Pre-PR checklist (lint, tests, build, Storybook), workstream status update steps, PR description guidance

#### Deep understanding

- **purpose**: Require a thorough deep-read of the relevant codebase before planning or implementing; write findings to a persistent markdown file (e.g. `research.md`) so the user can review and correct before any work proceeds
- **How to invoke**: Enforced by an **always-applied rule** — at session start and before any code writing, the agent does deep research and writes a report; no need to ask. You can still say “read this folder in depth and write research.md” or “study [system] in great detail” to scope or reinforce.
- Use when: Every session and whenever the task touches non-trivial code; the written report is required before planning or implementation
- Provides: Workflow (scope → deep read → write report → pause for review → proceed only after validation). Written artifact is the review surface

#### Conventional commits

- **purpose**: Create conventional commit messages following the conventional commits specification
- **How to invoke**: Ask for a commit message when committing (e.g. “write a commit message for these changes”, “commit this”, “suggest a commit message”). Not tied to a file type; applies when you’re about to run `git commit`.
- Use when: Committing code changes, writing commit messages, or formatting git history
- Provides: Format (type(scope): subject, body, footer), type list (feat, fix, docs, etc.), examples including breaking changes

#### Documentation

- **purpose**: Follow Adobe content writing standards when writing documentation
- **How to invoke**: Use when writing or editing docs — e.g. story JSDoc (`.stories.ts`), README/changeset/Jira/PR (`.md`, `.mdx`), or when you say “write the PR description”, “draft the Jira ticket”, “add JSDoc to this story”.
- Use when: Writing story JSDoc, 1st-gen docs, changesets, Jira tickets, or PR descriptions
- Provides: Voice and tone, grammar and mechanics, markdown/JSDoc reference, links to Spectrum design system content guidelines

#### Explain code

- **purpose**: Explain code with visual diagrams and analogies
- **How to invoke**: Ask “how does this work?”, “explain this code”, “walk me through this”, or “what does this do?”. Not tied to a file type; use on any code or file you want explained.
- Use when: Explaining how code works, teaching about the codebase, or when the user asks “how does this work?”
- Approach: Analogy → diagram → step-by-step walkthrough → highlight gotchas

#### Session handoff

- **purpose**: Create handoff documents so another agent (or a later session) can continue work with full context
- **How to invoke**: Say “create handoff”, “save state”, “I need to pause”, “context is getting full”, or “load handoff” / “resume from” / “continue where we left off”. The agent may also suggest a handoff after substantial work (e.g. many file edits, complex debugging).
- Use when: User requests handoff/save state, context is getting full, major milestone reached, or resuming with “load handoff” / “continue where we left off”
- Provides: CREATE and RESUME workflows, scripts (create, list, validate, check staleness), handoff chaining

#### Test-driven development

- **purpose**: Write a failing test first, then minimal code to pass, then refactor (red–green–refactor)
- **How to invoke**: Ask to implement a feature or fix a bug (e.g. “add feature X”, “fix this bug”); the agent may use TDD by default. To invoke explicitly, say “use TDD”, “write tests first”, or “red-green-refactor”.
- Use when: Implementing any feature or bugfix, before writing implementation code
- Provides: TDD cycle, verification checklist, good/bad test examples, anti-patterns to avoid

## Using rules and skills across tools and IDEs

Canonical content lives in **`.ai/`** (this directory). Tool-specific directories (`.cursor/`, `.claude/`) are thin adapters that point back here via symlinks — edit files in `.ai/`, never in the adapter directories.

### Current symlink structure

```text
.ai/rules/
└── *.md                          ← canonical, tool-agnostic source of truth

.ai/skills/
└── <skill-name>/SKILL.md         ← canonical, tool-agnostic source of truth

.cursor/rules/
└── *.mdc → ../../.ai/rules/*.md  (per-file symlinks; Cursor expects .mdc)
.cursor/skills/ → ../.ai/skills/  (directory symlink)

.claude/rules/ → ../.ai/rules/    (directory symlink; Claude Code reads .md)
.claude/skills/ → ../.ai/skills/  (directory symlink)
```

Editing any `.ai/rules/*.md` file immediately updates what both Cursor and Claude Code see — no sync step required.

### Adding a new rule

1. Create `rule-name.md` in `.ai/rules/` with YAML frontmatter (`globs`, `alwaysApply`).
2. Add one per-file symlink for Cursor (required — Cursor needs `.mdc` extension):

   ```sh
   ln -s “../../.ai/rules/rule-name.md” “.cursor/rules/rule-name.mdc”
   ```

   `.claude/rules/` is a directory symlink pointing at `.ai/rules/`, so it picks up the new file automatically — no extra step needed.

3. Register it in the tables in this README (rules catalog) and in [`AGENTS.md`](../AGENTS.md).

### Adding a new skill

1. Create `.ai/skills/<skill-name>/SKILL.md`.
2. Register it in the skills catalog below and in [`AGENTS.md`](../AGENTS.md).
3. Both `.cursor/skills/` and `.claude/skills/` pick it up automatically via directory symlinks.

### Using rules and skills in other environments

If you use a tool that does not read `.cursor/` or `.claude/`, point it at `.ai/` directly:

- **Start from [`AGENTS.md`](../AGENTS.md)** at the repository root.
- **Reference files when prompting** — for example: “Follow the rules in `.ai/rules/` and load `.ai/skills/deep-understanding/SKILL.md` for this task.”
- **Copy or adapt** the markdown and JSON content into your tool’s own config format as needed.

## MCPs

When developing for the SWC project, there may be instances where your coding agent needs context from external sources. Contributors and maintainers can configure [MCP (Model Context Protocol) servers](https://modelcontextprotocol.io/docs/getting-started/intro) via [Easy MCP](https://wiki.corp.adobe.com/display/assetscollab/Cursor+integration+with+Easy+MCP). Some recommended MCP servers might include:

- Figma
- Corp Jira
- Adobe Wiki Confluence
- React Spectrum 2
