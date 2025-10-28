<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Participating in pull requests

<!-- Document title (editable) -->

# Participating in pull requests

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Pull request creation](#pull-request-creation)
    - [Branch naming](#branch-naming)
    - [Changeset requirements](#changeset-requirements)
    - [Conventional commits](#conventional-commits)
- [Pull request template](#pull-request-template)
- [Labels and their meanings](#labels-and-their-meanings)
- [Pull request review process](#pull-request-review-process)
    - [Review timing](#review-timing)
    - [Review expectations](#review-expectations)
    - [Review etiquette](#review-etiquette)
- [Merge criteria](#merge-criteria)
- [Specific requirements by element type](#specific-requirements-by-element-type)
    - [New components](#new-components)

</details>

<!-- Document content (editable) -->

This document outlines our team's expectations and best practices for creating, reviewing, and merging pull requests for Spectrum Web Components.

## Pull request creation

### Branch naming

We use a straightforward branch naming convention:

- `[username]/[short-description]` (e.g., `alex/fix-dropdown-bug`)
- If referencing a known issue, incorporate the issue number (e.g., `alex/123-fix-dropdown-bug`)

### Changeset requirements

For PRs that add or update a component:

- Must include a changeset to trigger the release train and update the CHANGELOG
- Changeset type should be one of:
    - `patch` - for bug fixes only
    - `minor` - for new components or new APIs in an existing component
    - `major` - for breaking changes to a component or public library API

### Conventional commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification to make change tracking predictable:

Format: `type(component?): subject`

The component is optional but should reference the package you are updating.

Types include:

- `feat`: New features or enhancements
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Formatting, linting (not CSS changes)
- `chore`: Build tooling, repo management, dependency updates
- `perf`: Performance improvements
- `test`: Adding or updating tests

Examples:

- `feat(sp-card): add shadow styles for theme consistency`
- `fix(sp-action-menu): correct arrow key navigation in nested menus`
- `docs: clarify how to submit bug reports`

For breaking changes, add a `!` after the type/scope:

- `feat(sp-button)!: change API for icon placement`

---

## Pull request template

When creating a pull request, you'll be presented with our template. Complete all sections to the best of your ability, including:

- Description of the changes
- Related issues (using proper [GitHub keywords](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests#linking-a-pull-request-to-an-issue) to auto-close issues i.e. `fixes`, `resolves`, or `closes`)
- Type of change in the PR title (bug fix, feature, breaking change)
- Steps you took to test your changes that reviewers can follow to also test them
- Checklist of items completed
- Screenshots/videos for visual changes

Incomplete templates may delay the review process.

---

## Labels and their meanings

- `ready-for-review`: PR is ready for maintainer review
- `ready-for-merge`: PR has two approvals and all tests pass. This label will keep the base of the PR up-to-date with main until it's merged.
- `WIP`: PR is still being worked on, not ready for review
- `blocked`: PR is blocked for some reason i.e. another PR needs to go in first
- `needs-tests`: PR is missing necessary tests
- `needs-docs`: PR requires documentation updates
- `needs-self-review`: PR requires that the author does a self-review of code to answer preliminary questions
- `needs-style-review`: PR needs to be checked by a CSS expert
- `needs-design-review`: PR needs to be checked by the Spectrum Design team
- `breaking-change`: PR contains changes that break backward compatibility
- `help-wanted`: Extra attention is needed on this PR
- `on-hold`: PR needs more discussion.
- `Component: [Name]`: PR effects this component
- `auto-update`: Keep the base of the PR up-to-date with main automatically if there are no conflicts.

Apply labels promptly to help maintainers prioritize and manage the review queue.

---

## Pull request review process

### Review timing

- Maintainers aim to review PRs in a timely manner
- If your PR hasn't received attention, feel free to ping the team in the PR comments

### Review expectations

Reviewers will check for:

- Adherence to code style and component patterns
- Proper test coverage
- Documentation completeness
- Accessibility compliance
- Visual regression test coverage
- Performance considerations

### Review etiquette

Pull requests are the start of a conversation. During the process, we aim to provide feedback that is constructive, respectful, and actionable. Suggestions will be focused on team coding standards but not on an individual's coding preferences unless there are specific considerations or risks in one approach over another.

Both reviewers and PR authors should follow these guidelines:

#### For reviewers

- **Maintain momentum**: Complete reviews in a timely manner to keep the project moving forward.
- **Provide clear, actionable feedback**: Help contributors succeed by offering specific guidance and explaining the reasoning behind suggested changes.
- **Offer solutions**: When identifying areas for improvement, suggest alternative approaches and use code suggestions to make implementation easier.
- **Seek understanding**: Ask questions to clarify intent and approach, fostering a collaborative environment for learning and improvement.
- **Recognize excellence**: Celebrate well-written code and thoughtful design decisions to encourage continued high-quality contributions.
- **Focus on impact**: Prioritize feedback on architecture, functionality, and performance to ensure the most important aspects are addressed first.
- **Focus on value**: Prioritize feedback that improves code quality and maintainability over personal style preferences. If you make a suggestion that is non-blocking feedback, prepend the comment with `nit:`.
- **Consider context**: Tailor feedback to the PR author's experience level and the scope of changes.
- **Use changes requested thoughtfully**: Reserve the Changes Requested status for instances where critical issues need to be addressed.
- **Review VRTs with care**: Thoroughly examine visual regression test results and communicate approval status to authors.

#### For PR authors

- **Self review your PR**: Authors should take a first pass as reviewing and commenting on their submission. This provides reviewers faster context for the thinking that went in to the code and preemptively answer questions they may have.
- **Be receptive to feedback**: Approach review comments with an open mind. The goal is better code, not personal criticism.
- **Resolve/respond to all comments**: Address each review comment, either with code changes or explanations of your approach.
- **Ask for clarification**: If review feedback is unclear, ask questions to understand the concern.
- **Notify when ready**: After addressing feedback, notify reviewers that the PR is ready for another look either in Slack or by requesting a new review in GitHub.
- **Explain complex changes**: For non-obvious changes, explain your reasoning in the PR description or comments.
- **Break down large PRs**: When possible, split large changes into smaller, more manageable PRs.
- **Test thoroughly**: Before requesting review, ensure your code meets the project's quality standards.

#### Resolving disagreements

- **Focus on data**: Back up opinions with data, documentation, or examples where possible.
- **Refer to standards**: Use project conventions and industry best practices to guide decisions.
- **Compromise when appropriate**: Be willing to find middle ground when opinions differ.
- **Escalate respectfully**: If consensus can't be reached, involve a third team member or technical lead for guidance.
- **Document decisions**: Record the reasoning behind significant technical decisions for future reference.

Remember that code reviews are a collaborative process aimed at improving code quality, knowledge sharing, and maintaining project standards. Approaching reviews with empathy and professionalism benefits everyone involved.

---

## Merge criteria

A PR is ready to merge when:

1. It has received approval from two maintainers
2. All CI checks are passing
    - Unit tests passing
    - Integration tests passing
    - Visual regression tests passing (**VRT golden images should not be updated until an approver confirms they look good**)
    - Linting checks passing
3. All requested changes have been addressed
4. PR follows conventional commit standards
5. Includes proper changeset (when applicable)
6. Documentation has been updated as needed

---

## Specific requirements by element type

### New components

When creating or reviewing new components, ensure:

#### Documentation

- README contains a clear description and minimal example
- Inline documentation for all public APIs
- Accessibility documentation that aligns with WCAG patterns

See [Documenting a component](https://opensource.adobe.com/spectrum-web-components/guides/adding-component/#documenting-the-component) for more information on our documentation standards and structure.

#### API documentation utilizing JSDocs

- **Slots**: All slots documented in the element class docblock
- **Events**: All dispatched events documented with `@fires` docblock
- **Class fields**: All public/protected fields have proper docblocks
- **Methods**: All public/protected methods have docblocks with parameters and return types
- **CSS custom properties**: All public CSS custom properties documented
- **CSS shadow parts**: All shadow parts documented

#### Technical requirements

- Component follows established patterns and conventions
- Accessibility is thoroughly considered
- Responsive design best practices are followed
- Supported cross-browser compatibility is verified
