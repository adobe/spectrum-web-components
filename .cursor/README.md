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
