# Cursor documentation

This directory contains rules and skills that Cursor uses to enforce consistent formatting and structure in our codebase.

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

Additional, more specific rules can be found in the `rules` directory in either a `json` or `mdc` format.

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
- **issue_types**: Ensures correct issue type selectionc

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

### When rules are activated

**Always-applied rules:** Rules use `alwaysApply: true` to activate automatically, or `globs` to activate when matching files are edited.
**On-demand rules:** Rules with `alwaysApply: false` and no globs are on-demand only (activated by `@` mentioning them in chat).
**Config-based rules:** The `config.json` also defines structured validation for Cursor (or other tooling) to verify branch names, Jira ticket drafts, text-formatting, etc.:

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

1. Cursor will automatically enforce these rules while editing relevant files; however, if you wish to enable a rule that is not triggered by default, you can do so by `@` mentioning it in the chat.
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
- Provides: Operator workflow (run script, verify, fix links), Maintainer workflow (when to update script). Full instructions in `CONTRIBUTOR-DOCS/01_contributor-guides/07_authoring-contributor-docs/01_ai-agent-instructions.md`

#### Component migration (rendering and styling)

- **purpose**: Create rendering-and-styling migration analysis docs for the “analyze rendering and styling” step of 2nd-gen component migration
- **How to invoke**: Say “create migration analysis for [component]”, “analyze rendering and styling for [component]”, or “rendering and styling migration for [component]”. Also invoked when you refer to the “analyze rendering and styling” step in the 2nd-gen component migration workstream.
- Use when: On the analyze-rendering-and-styling step for one or more components; creating one markdown file per component at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component-name]/rendering-and-styling-migration-analysis.md`
- Provides: Workflow summary (specs from CSS + SWC, three-way DOM comparison, CSS⇒SWC mapping table, summary). Full instructions in `CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_analyze-rendering-and-styling/cursor_prompt.md`

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
