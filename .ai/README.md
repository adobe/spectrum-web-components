# AI and agent documentation

Coding agents should start with [`AGENTS.md`](../AGENTS.md) at the repository root. It summarizes how to use this directory as the canonical source for rules and skills.

This directory contains rules, skills, and accumulated memory that coding agents use to enforce consistent formatting and structure in our codebase.

## Why `.ai/`

All rules and skills now live in **`.ai/`** — a tool-agnostic, plain-markdown directory that any agent or tool can read. IDE-specific directories (`.cursor/`, `.claude/`) become thin adapters that point back to `.ai/` via symlinks:

- Edit once in `.ai/` → all tools see the update automatically
- No sync step, no duplication, no drift between tools
- New contributors or tools start from `AGENTS.md` at the repo root, which bootstraps everything

### Rules carry `paths:` frontmatter; tool copies are generated

Every rule in `.ai/rules/` has a `description` and a quoted `paths:` list of globs. `yarn ai:sync` (`.ai/scripts/sync.js`) generates the tool-specific copies from that one source:

- `.github/instructions/<name>.instructions.md` with `applyTo` for GitHub Copilot (CLI, app, VS Code, cloud agent, and code review)
- `.cursor/rules/<name>.mdc` with `globs` for Cursor
- Claude Code reads `.ai/rules/` directly through the `.claude/rules` symlink, because `paths:` is its own key

Glob semantics follow GitHub's `applyTo`: `*` stays within one directory and `**` crosses directories, so `*.css` matches only root-level files and `**/*.css` matches CSS anywhere. `yarn lint:ai` fails when a glob matches no tracked file, and when a generated file doesn't match its source. The pre-commit hook runs `yarn ai:sync` whenever `.ai/` or an `AGENTS.md` file is staged.

### Rules vs. skills: how to choose

- **Path-scoped rule** — the guidance is tied to a specific set of file paths (e.g. "when editing a `.stories.ts` file" or "when editing a component README"). Give it a `paths:` list so it loads deterministically whenever a matching file is in context, in every tool — no risk of it going unread just because a task's intent wasn't explicit.
- **Skill** — the guidance is tied to a task or intent, not a file path (e.g. "draft a Jira ticket", "run a consistency pass"). There's no glob to scope it by, so it's invoked on demand: the agent matches the task to the skill's description, or the user names it explicitly.

Getting this wrong in either direction has a real cost: forcing task-scoped guidance into a rule with no natural `paths:` value means it's either always-inlined (wasting tokens) or never triggers; forcing file-scoped guidance into a skill loses the deterministic trigger a path-scoped rule gives you and depends on the agent guessing intent.

## CI integration

- `yarn lint:ai` runs `.ai/scripts/validate.js`, which checks story tags, links, config schema, instruction and skill frontmatter, symlinks, generated files, and per-unit MDX docs pages. The header of `validate.js` lists each check.
- `yarn lint:docs-pages` runs the per-unit MDX docs-page check in isolation. Use during authoring to catch missing `<Canvas>` references, unknown `##` section headings, or out-of-order sections in a single component / pattern / controller MDX
- Pre-commit hook runs the contributor docs nav script to keep breadcrumbs and TOCs in sync automatically

## Rules

`.ai/config.json` holds structured, config-based validation data that editors and tooling read directly — branch naming pattern, Jira ticket templates and labels, text-formatting exceptions, and editor/language preferences. It's flat top-level sections, not a generic rule registry:

```json
{
  "git": {
    "validationPattern": "^[a-z0-9]+\\/(feat|fix|...)-[a-z0-9-]+(-swc-[0-9]+)?$",
    "types": ["feat", "fix", "docs", "..."]
  },
  "jira_tickets": {
    "title_format": { "max_length": 80 },
    "labels": { "...": "..." }
  },
  "text_formatting": { "headings": { "case": "sentence" } }
}
```

See [Config-based rules](#when-rules-and-skills-are-activated) below for the full key list. Narrative, per-topic guidance — the kind a human or agent reads rather than a validator parses — lives in the `.ai/rules/` and `.ai/skills/` markdown files instead.

### Available rules

Every rule is a **path-scoped rule**: it carries a `paths:` list so it loads only when a matching file is in context, in every tool. Guidance with no natural file-path scope is a skill instead — see [Available skills](#available-skills). `branch-naming` and `storybook-mdx-conversion` were rules and are now skills.

#### Path-scoped rules

##### Styles

- **stylelint_compliance**: Auto-fixes based on `stylelint.config.js` unless rewriting more than 30% of the line
- **copyrights**: Must reflect the current year
- **comments**: Always use sentence case, never title case
- **custom_properties**: Never rename without prompting for approval first
- **media_queries**: Sort high-contrast and other media queries to the bottom of the file
- **duplicate_properties**: Warn about or suggest fixes; keep the definition that honors the CSS cascade
- Applies to: `**/*.css`

##### Text formatting

- **heading_case**: Enforces sentence case in headings with specific exceptions
- Applies to: `**/*.md`, `**/*.txt`, `**/*.mdx`

##### Storybook stories (documentation + format)

These two rules share the same glob/path set (`gen2/**/stories/**` and `gen2/**/*.mdx` respectively) and work as a pair: `stories-documentation` defines _what_ to document, `stories-format` defines _how_ to structure the file.

- **stories-documentation**: Content patterns for each documentation section
  - Sections: overview, anatomy, options, states, behaviors, accessibility
  - 1st-gen to gen2 comparison guidance
  - Verification process to prevent hallucinated attributes, slots, or ARIA claims
  - Applies to: `gen2/packages/swc/components/*/*.mdx`, `gen2/packages/swc/patterns/*/*/*.mdx`, `gen2/packages/core/controllers/*/*.mdx`
- **stories-format**: File structure and technical conventions
  - Visual separators, meta configuration, required tags, layout parameters
  - `render` vs `args` patterns, `flexLayout` usage
  - Static color single-story pattern, image asset conventions
  - Applies to: `gen2/packages/swc/components/*/stories/**`, `gen2/packages/swc/patterns/*/*/stories/**`, `gen2/packages/core/controllers/*/stories/**`

##### Component README

- **document_structure**: Required sections for 1st-gen component READMEs
  - Sections: overview, usage, anatomy, options, states, behaviors, accessibility
  - Starts with `## Overview`, not `# Component Name`
- **code_examples**: All examples must include accessible labels and unique IDs
- **sp_tabs**: Must include `selected`, `auto`, and `label` attributes
- Applies to: `1st-gen/packages/*/README.md`

##### Contributor docs

- **nav_update**: Run the nav script when adding, removing, renaming, or moving files under `CONTRIBUTOR-DOCS/`
- **link_validation**: Fix broken links automatically when the fix is clear; ask when intent is unclear
- Applies to: `CONTRIBUTOR-DOCS/**`
- Points to the `contributor-docs-nav` skill for the full Operator/Maintainer workflow

### When rules and skills are activated

**Path-scoped rules:** `styles`, `text-formatting`, `stories-documentation`, `stories-format`, `component-readme`, and `contributor-doc-update` carry a `paths:` list — loaded only when a matching file is in context, deterministically, in every tool. Always-on guidance belongs in `AGENTS.md`, not in a rule.
**Skills:** Guidance with no natural file-path scope — `branch-naming`, `storybook-mdx-conversion`, `jira-ticket`, `github-description`, `code-conformance`, `consistency-pass`, `deep-understanding`, `migration-phase-awareness`, `contributor-docs-nav`, and the rest of the [Available skills](#available-skills) catalog — invoked on demand by the agent matching task intent, or by explicit request.
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

| Rule/skill                     | Always active | Path-scoped rule | Skill (on-demand) | Config-based | Glob / paths                      |
| ------------------------------ | :-----------: | :--------------: | :---------------: | :----------: | --------------------------------- |
| branch-naming                  |               |                  |         x         |              | —                                 |
| styles                         |               |        x         |                   |              | `**/*.css`                        |
| text-formatting                |               |        x         |                   |              | `**/*.md`, `**/*.txt`, `**/*.mdx` |
| stories-documentation          |               |        x         |                   |              | `gen2/packages/…/*.mdx` (3 globs) |
| stories-format                 |               |        x         |                   |              | `gen2/packages/…/stories/**` (3)  |
| component-readme               |               |        x         |                   |              | `1st-gen/packages/*/README.md`    |
| contributor-doc-update         |               |        x         |                   |              | `CONTRIBUTOR-DOCS/**`             |
| storybook-mdx-conversion       |               |                  |         x         |              | —                                 |
| contributor-docs-nav           |               |                  |         x         |              | —                                 |
| deep-understanding             |               |                  |         x         |              | —                                 |
| code-conformance               |               |                  |         x         |              | —                                 |
| consistency-pass               |               |                  |         x         |              | —                                 |
| migration-phase-awareness      |               |                  |         x         |              | —                                 |
| github-description             |               |                  |         x         |              | —                                 |
| jira-ticket                    |               |                  |         x         |              | —                                 |
| text_formatting.headings       |               |                  |                   |      x       | —                                 |
| text_formatting.patterns       |               |                  |                   |      x       | —                                 |
| git.validationPattern          |               |                  |                   |      x       | —                                 |
| git.validationMessage          |               |                  |                   |      x       | —                                 |
| git.branchNameTemplate         |               |                  |                   |      x       | —                                 |
| git.types                      |               |                  |                   |      x       | —                                 |
| jira_tickets.title_format      |               |                  |                   |      x       | —                                 |
| jira_tickets.required_sections |               |                  |                   |      x       | —                                 |
| jira_tickets.templates         |               |                  |                   |      x       | —                                 |
| jira_tickets.labels            |               |                  |                   |      x       | —                                 |
| jira_tickets.issue_types       |               |                  |                   |      x       | —                                 |

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

- **purpose**: Create accessibility migration analysis docs for the "analyze accessibility" step of gen2 component migration
- **How to invoke**: Say "create accessibility analysis for [component]", "analyze accessibility for [component]", or "accessibility migration for [component]". Also invoked when you refer to the "analyze accessibility" step in the gen2 component migration workstream.
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
- **How to invoke**: Say “update contributor docs nav”, “regenerate TOC”, “fix broken links in CONTRIBUTOR-DOCS”, or “run the nav script”. Also pointed to by the `contributor-doc-update` path-scoped rule, which fires whenever a `CONTRIBUTOR-DOCS/**` file is in context.
- Use when: Updating contributor docs structure, regenerating navigation, or fixing reported broken links
- Provides: Operator workflow (run script, verify, fix links), Maintainer workflow (when to update script). Full instructions in `.ai/skills/contributor-docs-nav/references/ai-agent-instructions.md`

#### Jira ticket

- **purpose**: Draft and format Jira tickets — title, labels, severity, description — following Spectrum Web Components conventions
- **How to invoke**: Ask to create, draft, or format a Jira ticket (bug, RFC, or feature/research ticket)
- Use when: Writing a Jira ticket for a bug report, RFC, or feature/research request
- Provides: Jira markup syntax rules, title format, general/bug/RFC templates (RFC generates three sequential tickets: authoring, internal shepherding, external shepherding), severity classification (SEV1–SEV5), allowed labels and issue types (`.ai/config.json` `jira_tickets`)

#### GitHub description

- **purpose**: Generate GitHub PR and issue descriptions — title, labels, and body — following Spectrum Web Components conventions
- **How to invoke**: Ask to create a GitHub PR or issue description; prompts for a linked ticket if none is provided
- Use when: Drafting a PR or issue description, including the required accessibility testing checklist
- Provides: Title format, PR template (author/reviewer checklists, manual test cases, accessibility testing checklist), severity classification, allowed labels

#### Code conformance

- **purpose**: Review gen2 component files against project style guides, run linters, and surface guideline gaps
- **How to invoke**: Say "check code conformance", "audit this component's style", or as part of the `migration-conformance` sub-task
- Use when: Reviewing or auditing gen2 TypeScript, CSS, test, or Storybook story files for style conformance
- Provides: Per-domain review checklists (TypeScript, CSS, tests, stories) with style-guide links, lint commands to run first, guideline-gap reporting format

#### Consistency pass

- **purpose**: Run a consistency and validity self-audit on changed files and the migration plan
- **How to invoke**: Say "consistency pass", "check my work", or "validity pass"; also run proactively before declaring a migration phase or significant task complete
- Use when: Before declaring any migration phase (especially API, styling, testing, documentation) or significant implementation task complete
- Provides: Code-conformance check (delegates to `code-conformance`), plan-validity check (implementation vs. plan, cascading updates across plan sections), reporting format

#### Migration phase awareness

- **purpose**: Keep multi-phase migration obligations in context during a session and emit Migration Checkpoint blocks at phase completion
- **How to invoke**: Active whenever a `migration-*` skill is in use or migration files are being edited
- Use when: Declaring a migration phase complete, or when work drifts away from an in-progress migration
- Provides: Phase-completion checklist (skill quality gate, plan alignment, plan checklist update, consistency pass, status table), Migration Checkpoint block format, resume-prompt format for drifted work

#### Component migration (rendering and styling)

- **purpose**: Create rendering-and-styling migration analysis docs for the “analyze rendering and styling” step of gen2 component migration
- **How to invoke**: Say “create migration analysis for [component]”, “analyze rendering and styling for [component]”, or “rendering and styling migration for [component]”. Also invoked when you refer to the “analyze rendering and styling” step in the gen2 component migration workstream.
- Use when: On the analyze-rendering-and-styling step for one or more components; creating one markdown file per component at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/rendering-and-styling-migration-analysis.md`
- Provides: Workflow summary (specs from CSS + SWC, three-way DOM comparison, CSS⇒SWC mapping table, summary). Full instructions in `CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_gen2-component-migration/02_step-by-step/01_analyze-rendering-and-styling/cursor_prompt.md`

#### Consumer migration guide

- **purpose**: Create per-component migration guides for application developers upgrading from 1st-gen Spectrum Web Components to gen2 components
- **How to invoke**: Say “create a consumer migration guide for [component]”, “write an upgrade guide for [component]”, or “document how consumers migrate [component] from 1st-gen to gen2”.
- Use when: Writing one Storybook-renderable MDX file per component at `gen2/packages/swc/components/[component-name]/migration-guide.mdx` with code updates, styling guidance, accessibility notes, and rollout advice
- Provides: Workflow summary (verified source inputs, required section order, before/after examples, migration checklist, rollout guidance). Full instructions in `.ai/skills/consumer-migration-guide/references/consumer-migration-guide-prompt.md`

#### Washing machine migration workflow

#### Migration — phase 1: prep (`migration-prep`)

- **purpose**: Understand the component, critically assess the current API and behavior, plan breaking changes, and define migration scope before any refactoring begins
- **How to invoke**: Say "start migration prep for [component]", "plan the migration for [component]", "create a migration plan for [component]", "draft the Phase 1 plan for [component]", or "phase 1 migration for [component]"
- Use when: Beginning a 1st-gen → gen2 component migration; before any files are created or code is moved
- Provides: Template-backed migration plan workflow, research checklist (1st-gen API, usage, tests, analyses, React/Figma references), breaking-change analysis, source-confidence and contradiction checks, path/link verification, and staff-level API/naming review with explicit escalation for inconsistencies

#### Migration — phase 2: setup (`migration-setup`)

- **purpose**: Create the gen2 file and folder structure, wire up exports, and confirm the build passes before implementation begins
- **How to invoke**: Say "set up gen2 structure for [component]", "create the file structure for [component]", or "phase 2 migration for [component]"
- Use when: After prep is complete and the approved `migration-plan.md` is available; creating the scaffolding a component needs before any logic is ported
- Provides: File/folder creation checklist, export wiring steps, build-passes verification, and plan-aligned naming/structure setup

#### Migration — phase 3: API (`migration-api`)

- **purpose**: Move properties, methods, and types from 1st-gen to gen2 while maintaining a clear public API
- **How to invoke**: Say "migrate the API for [component]", "port properties and methods for [component]", or "phase 3 migration for [component]"
- Use when: Scaffolding is in place and the approved `migration-plan.md` defines the intended public contract for gen2
- Provides: Property/method porting workflow, type definition guidance, API contract review, and drift detection against the approved migration plan

#### Migration — phase 4: accessibility (`migration-a11y`)

- **purpose**: Implement WCAG-aligned semantics, ARIA, keyboard support, and focus management, and document accessibility behavior
- **How to invoke**: Say "migrate accessibility for [component]", "implement a11y for [component]", or "phase 4 migration for [component]"
- Use when: API is in place and the approved `migration-plan.md` plus accessibility analysis define the must-ship semantics and behavior
- Provides: WCAG checklist, ARIA pattern guidance, keyboard/focus requirements, a11y documentation template, and checks against approved accessibility changes in the migration plan

#### Migration — phase 5: styling (`migration-styling`)

- **purpose**: Migrate CSS to the gen2 structure, apply Spectrum 2 tokens, and ensure stylelint passes
- **How to invoke**: Say "migrate styling for [component]", "port CSS for [component]", or "phase 5 migration for [component]"
- Use when: Accessibility is complete and the approved `migration-plan.md` defines the intended visual scope; translating 1st-gen CSS to gen2 with Spectrum 2 design tokens
- Provides: CSS migration checklist, token mapping guidance, stylelint validation steps, and checks against approved visual scope and custom-property decisions

#### Migration — phase 6: testing (`migration-testing`)

- **purpose**: Write unit tests, accessibility tests, and Storybook play functions for a migrated component
- **How to invoke**: Say "write tests for [component] migration", "add migration tests for [component]", or "phase 6 migration for [component]"
- Use when: Implementation is feature-complete and the approved `migration-plan.md` can be used to derive the must-ship test matrix before review
- Provides: Test coverage checklist, unit/a11y/play-function patterns, test-running verification, and plan-driven coverage checks for breaking changes and regressions

#### VRT authoring (`vrt-authoring`)

- **purpose**: Author dedicated Storybook visual regression stories for gen2 components
- **How to invoke**: Say "add VRT for [component]", "write visual regression stories", or mention `.vrt.ts`, Chromatic, forced-colors VRT, global styles VRT, or custom-property VRT
- Use when: Adding or reviewing `test/vrt/*.vrt.ts` files during migration or test cleanup
- Provides: Dedicated VRT file shape, shared helper usage, pseudo-state/forced-colors patterns, and custom-property coverage checks against the generated API metadata

#### Migration — conformance sub-task (`migration-conformance`)

- **purpose**: Verify all migrated files conform to project style guides, run all linters, and surface any guideline gaps as PR comment notes
- **How to invoke**: Say "check code conformance for [component]", "run conformance checks for [component]", "style guide review for [component]", or "conformance for [component] migration"
- Use when: Phase 6 (migration-testing) is complete and all tests pass; reviewing TypeScript, CSS, test files, and Storybook stories against their respective style guides before documentation
- Provides: Four-domain review workflow (TypeScript, CSS, tests, stories), linter run commands, per-file-type style guide references, and a guideline-gap documentation pattern for surfacing improvements in the PR

#### Migration — phase 7: documentation (`migration-documentation`)

- **purpose**: Author the per-component MDX docs page and finalize Storybook stories + public-API JSDoc so the component is usable and understandable by others
- **How to invoke**: Say "write docs for [component] migration", "document [component] for gen2", or "phase 7 migration for [component]"
- Use when: Tests pass and the approved `migration-plan.md` can be used as the source of truth for migration notes and rationale
- Provides: per-component MDX authoring (`<component>.mdx`), public-API JSDoc guidelines on `Component.ts`, stories file finalization (drop `'autodocs'` from Playground, complete Accessibility story), documentation checklist, and plan-aligned migration-note guidance

#### Migration — phase 8: review (`migration-review`)

- **purpose**: Run final checks, verify lint/tests/build/Storybook, update the workstream status table, and open a PR
- **How to invoke**: Say "review [component] migration", "final checks for [component]", or "phase 8 migration for [component]"
- Use when: Documentation is complete and the approved `migration-plan.md` can be used as the review baseline; preparing the migration for code review and merge
- Provides: Pre-PR checklist (lint, tests, build, Storybook), workstream status update steps, PR description guidance, and verification that code/docs/tests still match the approved migration plan

#### Deep understanding (`deep-understanding`)

- **purpose**: Require a thorough deep-read of the relevant codebase before planning or implementing; write findings to a persistent markdown file (e.g. `research.md`) so the user can review and correct before any work proceeds
- **How to invoke**: Applied intelligently by the agent for non-trivial work (multiple files, new area, complex behavior) before planning or writing code — no rule enforces this automatically. Say “read this folder in depth and write research.md” or “study [system] in great detail” to invoke or reinforce it explicitly.
- Use when: The task is non-trivial and would benefit from a written understanding pass first; skip it for simple, self-contained requests (a one-line fix, a single known file, a quick question)
- Provides: Workflow (scope → deep read → write report → pause for review → proceed only after validation). Written artifact is the review surface

#### Conventional commits

- **purpose**: Create conventional commit messages following the conventional commits specification
- **How to invoke**: Ask for a commit message when committing (e.g. “write a commit message for these changes”, “commit this”, “suggest a commit message”). Not tied to a file type; applies when you’re about to run `git commit`.
- Use when: Committing code changes, writing commit messages, or formatting git history
- Provides: Format (type(scope): subject, body, footer), type list (feat, fix, docs, etc.), examples including breaking changes

#### Documentation

- **purpose**: Follow Adobe content writing standards when writing documentation
- **How to invoke**: Use when writing or editing docs — e.g. per-unit MDX docs pages (`<unit>.mdx`), public-API JSDoc in `Component.ts`, the meta-level JSDoc in `.stories.ts`, README/changeset/Jira/PR (`.md`, `.mdx`), or when you say “write the PR description”, “draft the Jira ticket”, “write the docs for this component”.
- Use when: Authoring gen2 docs pages, writing 1st-gen docs, changesets, Jira tickets, or PR descriptions
- Provides: Voice and tone, grammar and mechanics, markdown/JSDoc reference, links to Spectrum design system content guidelines

#### Explain code

- **purpose**: Explain code with visual diagrams and analogies
- **How to invoke**: Ask “how does this work?”, “explain this code”, “walk me through this”, or “what does this do?”. Not tied to a file type; use on any code or file you want explained.
- Use when: Explaining how code works, teaching about the codebase, or when the user asks “how does this work?”
- Approach: Analogy → diagram → step-by-step walkthrough → highlight gotchas

#### Session retrospective

- **purpose**: Document lessons learned after completing work, especially when the user corrected planning documents or implementation; maintains persistent lesson files in `.ai/memory/` that future agents read at session start
- **How to invoke**: Say "document what you learned", "add to lessons", "remember this", or "run a retrospective". Also triggered when the user corrects your work or you encounter a surprising constraint.
- Use when: User corrects your work, you hit a non-obvious tool limitation, or at session end after substantial work
- Provides: Workflow for capturing lessons, format guidelines, naming convention (`<descriptor>-lessons.md` in `.ai/memory/`)

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

## Workflows

Workflows are reference documents that support agent and contributor workflows. They live in `.ai/workflows/`.

### Available workflows

#### Reusable prompts

- **File**: `.ai/workflows/reusable-prompts.md`
- **Purpose**: A reference list of natural-language phrases that trigger each skill or phase. Use these as copy-paste shortcuts when invoking skills in chat (e.g. "Phase 4 migration for [component]" triggers `migration-a11y`).
- **Covers**: Memory/lesson capture, all 8 washing-machine migration phases, and the most common invocation phrases for each

## Using rules and skills across tools and IDEs

Canonical content lives in **`.ai/`** (this directory). Tool-specific directories (`.cursor/`, `.claude/`) are thin adapters that point back here via symlinks — edit files in `.ai/`, never in the adapter directories.

### Current adapter structure

```text
.ai/rules/
└── *.md                          ← canonical, tool-agnostic source of truth (edit these)

.ai/skills/
└── <skill-name>/SKILL.md         ← canonical, tool-agnostic source of truth (edit these)

.github/instructions/
└── *.instructions.md             GENERATED by `yarn ai:sync` (Copilot reads `applyTo`)

.cursor/rules/
└── *.mdc                         GENERATED by `yarn ai:sync` (Cursor reads `globs`)
.cursor/skills/ → ../.ai/skills/  (directory symlink)

.claude/rules/ → ../.ai/rules/    (directory symlink; Claude Code reads `paths`)
.claude/skills/ → ../.ai/skills/  (directory symlink; also how Copilot discovers skills)
```

Edit only `.ai/`. Generated files start with a `GENERATED by .ai/scripts/sync.js` comment; `yarn lint:ai` fails if one is edited by hand or falls out of date.

### Adding a new rule

> Before adding a rule, decide whether the guidance has a natural file-path scope. If it does, give it a `paths:` list so it loads deterministically in every tool (see [Rules vs. skills: how to choose](#rules-vs-skills-how-to-choose)). If it doesn't — the guidance is about a task or intent, not a file path — write it as a skill instead. Guidance that must always apply goes in [`AGENTS.md`](../AGENTS.md).

1. Create `rule-name.md` in `.ai/rules/` with YAML frontmatter:
   - `description:` — what the rule covers
   - `paths:` — a YAML list of globs, one item per glob. **Quote each item** — an unquoted value starting with `*` (e.g. `**/*.mdx`) parses as an invalid YAML alias, not a literal string. Use `**/` to match in any directory; `*` alone stays in one directory
   - `excludeAgent:` — optional; `code-review` or `cloud-agent` when that GitHub agent shouldn't use the rule
2. Run `yarn ai:sync` to generate `.github/instructions/rule-name.instructions.md` and `.cursor/rules/rule-name.mdc`, and commit them with the source. The pre-commit hook does this for you.
3. Run `yarn lint:ai`. It fails if a glob matches no tracked file.
4. Register it in the tables in this README (rules catalog).

### Adding a new skill

1. Create `.ai/skills/<skill-name>/SKILL.md` with `name` and `description` frontmatter. Skills are for task/intent-scoped guidance with no natural file-path trigger — if the guidance belongs to a specific set of files, write a path-scoped rule instead (see above) so it loads deterministically rather than depending on the agent matching intent.
2. Register it in the skills catalog below and in [`AGENTS.md`](../AGENTS.md).
3. Both `.cursor/skills/` and `.claude/skills/` pick it up automatically via directory symlinks.

### Symlink setup

The three directory symlinks (`.claude/rules`, `.claude/skills`, and `.cursor/skills`) are committed to the repo, so **no setup is required after cloning**. Cursor rules are generated files, not symlinks.

#### Recreating broken symlinks

If a symlink is accidentally deleted or broken, recreate it from the repository root:

```sh
mkdir -p .claude .cursor
ln -s ../.ai/rules .claude/rules
ln -s ../.ai/skills .claude/skills
ln -s ../.ai/skills .cursor/skills
```

Verify with `ls -la .claude/ .cursor/`, then run `yarn lint:ai`. If Cursor rules are missing or stale, run `yarn ai:sync`. If Cursor doesn't pick up changes, reload the window: `Cmd+Shift+P` → "Developer: Reload Window".

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
