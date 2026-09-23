---
name: github-description
description: Generates GitHub pull request and issue descriptions — title, labels, and body — following Spectrum Web Components conventions and the repository's pull request template. Prompts for a linked ticket if none is provided. Use when asked to write or draft a PR description, PR body, or GitHub issue.
---

# GitHub description guidelines

## When to use this skill

- Drafting a GitHub PR description or issue description
- Filling in the accessibility testing checklist, author/reviewer checklists, or manual test cases for a PR body

## How to invoke

- Say "write a PR description", "draft a GitHub issue for this", or "create the PR body"
- If no linked ticket (GitHub issue or Jira ticket) is provided, prompt the user to supply one before generating the description or pull request content

When prompted to create a GitHub description, output the following:

- Title
- Labels
- Description

Output results in the chat window in a way that can be copied and pasted into GitHub.

## GitHub markdown formatting rules

Use these syntax rules when writing GitHub descriptions:

- `##` through `######` - Headings (use `##` for main, `###` for secondary, etc.)
- `**text**` - Bold text
- `` `code` `` - Inline code
- `` `language` `` - Language-specific code blocks
- `[text](url)` - Links
- `-` - Bullet points
- `1.` - Numbered list items
- `>` - Blockquotes for important notes
- `~~text~~` - Strikethrough for deprecated content

## Title format

- Use the format: `[Component] Brief description of change or issue`
- Keep titles concise but descriptive (under 80 characters)
- Use present tense for the description (e.g., "Add" not "Added")
- For PRs, include the component name in brackets if applicable

## Description structure

- Present title, labels, and type before description content
- Description format and structure should follow the repository's pull request template (`.github/PULL_REQUEST_TEMPLATE.md`); see Templates below
- Accessibility testing checklist is required. Populate keyboard and screen reader with component-specific numbered
  steps (Storybook paths, expected focus behavior, what should be announced). For non-interactive components (e.g. static
  elements, dividers), state that clearly under Keyboard (e.g. no focusable parts; confirm no regressions in surrounding
  examples) and still document Screen reader checks (roles, structure, labels).
- Include links to related issues, RFCs, or documentation when applicable
- All descriptions must include clear acceptance criteria or expected outcomes
- Provide enough context so anyone can understand the objective
- Use prefixes in titles: [Bug], [Fix], [Docs], [Refactor], [Research], [S2], [Test]

Examples:

- [bug]:
- [Bug(component)]:
- [fix]:
- [Fix(component)]:
- [docs]:
- [Docs(component)]:

## Severity classification

- SEV1: Critical - System down, data loss, security breach
- SEV2: High - Major feature broken, significant user impact
- SEV3: Medium - Feature partially broken, moderate impact
- SEV4: Low - Minor issues, minimal user impact
- SEV5: Trivial - Cosmetic issues, no functional impact

## Best practices

- Link to relevant issues using the format: `#issue-number`
- Include component name in brackets if applicable: `[sp-button]`
- Add relevant labels for easier filtering
- Attach screenshots or videos for visual changes
- Reference design specs or documentation when available
- Use descriptive commit messages when linking to PRs
- Include reproduction steps for bugs
- Add environment information when relevant

## Acceptance criteria

- Write criteria in "Given/When/Then" format
- Make criteria specific and testable
- Include edge cases and error scenarios
- Consider accessibility requirements
- Include performance considerations when relevant

## Labels

Use the following labels to categorize pull requests. Only use labels that exist in the repository. GitHub labels are separate from Jira labels; for Jira tickets use the jira-ticket skill and `config.json`.

### Priority and release labels

- `1.0.0`: Issues that should be addressed for a 1.0 release
- `2.0.0`: Issues for 2.0 release
- `Breaking`: Breaking changes

### Platform and browser labels

- `Android`: Android-specific issues
- `Browser: Chrome`: Chrome browser issues
- `Browser: Edge (Legacy)`: Issue with pre-chromium Edge
- `Browser: FireFox`: Firefox browser issues
- `Browser: Safari`: Safari browser issues
- `iOS`: iOS-specific issues and bugs

### Development and process labels

- `a11y`: Issues related to accessibility
- `API`: Changes to component APIs or interfaces

### Additional labels (partial list)

Note: The repository has 160 labels total. For a complete list, visit [https://github.com/adobe/spectrum-web-components/labels](https://github.com/adobe/spectrum-web-components/labels)

Common additional labels include:

- `chore`: Routine tasks, maintenance, or non-feature changes
- `dependencies`: Updates or changes to project dependencies
- `Documentation`: Documentation updates or improvements
- `feature`: New feature implementations or improvements to existing features
- `i18n`: Internationalization and localization work
- `mobile`: Mobile platform issues and responsive design
- `performance`: Performance-related improvements or regressions
- `refactor`: Code restructuring and refactoring work
- `regression`: Previously working functionality that is now broken
- `release`: Release process or versioning changes
- `research`: Tasks requiring investigation or research
- `RFC`: Request for Comments or design discussions
- `testing`: Test implementation or testing infrastructure work

## Pull request guidelines

- Include the Accessibility testing checklist section in every drafted PR body (see Description structure and `.github/PULL_REQUEST_TEMPLATE.md`).
- Use conventional commit messages
- Keep PRs focused and small when possible
- Include tests for new features
- Update documentation when APIs change
- Add screenshots for visual changes
- Link to related issues using keywords like "Fixes #123" or "Closes #456"
- Request reviews from appropriate team members
- Use draft PRs for work in progress

## Templates

### Pull request template

**Note:** All pull requests should include the `Status:Ready for review` label.

**When returning the template, check off the author requirements in the Author's checklist section. Do not check off the Manual review test cases or Device review sections as these are for reviewers to complete. Fill in the **Accessibility testing checklist** with concrete steps; leave its checkboxes unchecked unless the user confirms testing is done.**

Read the repository's pull request template at `.github/PULL_REQUEST_TEMPLATE.md` and follow it exactly: keep every section, heading, and HTML comment in order, and fill in each section. Don't work from a remembered or copied version of the template, because the file is the single source and it changes.
