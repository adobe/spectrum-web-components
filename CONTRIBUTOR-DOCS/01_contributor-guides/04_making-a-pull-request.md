<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Making a pull request

<!-- Document title (editable) -->

# Making a pull request

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Scoping and planning your PR](#scoping-and-planning-your-pr)
    - [Testing](#testing)
    - [Documentation](#documentation)
    - [Code formatting](#code-formatting)
    - [Accessibility](#accessibility)
- [Developing your PR](#developing-your-pr)
    - [Branch naming](#branch-naming)
    - [Changeset requirements](#changeset-requirements)
    - [Conventional commits](#conventional-commits)
- [Submitting your PR](#submitting-your-pr)
    - [Pull request template](#pull-request-template)
    - [Labels for PR authors](#labels-for-pr-authors)
- [Specific requirements by element type](#specific-requirements-by-element-type)
    - [New components](#new-components)

</details>

<!-- Document content (editable) -->

This document outlines our team's expectations and best practices for creating and submitting pull requests for Spectrum Web Components.

## Scoping and planning your PR

### Testing

Quality and stability are important. We require writing tests for any fixes or features you introduce. This helps ensure:

- Bugs don't resurface later.
- New features work as intended for all users.
- Overall library reliability remains high.

Read about our testing guidance in the [README.md](../README.md).

If you're unsure how to write tests for certain parts of the library, don't hesitate to ask maintainers for guidance. We appreciate every effort to keep the code solid!

### Documentation

In addition to well-tested code, documentation is crucial. Whenever you add or change a feature, include documentation for it in the relevant areas:

- **README.md**: Each component has a README within its directory. Ensure your changes are included here. This file is used in our generated documentation site.
- **Comment annotations**: We use comment-based documentation ([JSDocs](https://jsdoc.app/)) so that references are generated automatically where possible.

Accessible, helpful docs are a huge win for everyone, especially newcomers.

### Code formatting

We rely on automated tools like Prettier, ESLint, and Stylelint to enforce style preferences. Setting up these tools in your editor saves time and prevents minor style conflicts from slowing down reviews.

### Accessibility

Since this project is used by a diverse audience, the accessibility of our product is of utmost importance. Features will be evaluated for inclusivity by:

- The use of semantic markup.
- Labeled interactive elements with appropriate accordance's.
- Accounting for appropriate states, such as focus and keyboard navigation, according to [standards](https://www.w3.org/WAI/perspective-videos/keyboard/).

If you're unsure about an accessibility detail, the [Web Accessibility Initiative (WAI) ARIA Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/) is a good place to start. You can also open a discussion or ask in your PR.

---

## Developing your PR

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

## Submitting your PR

### Pull request template

When creating a pull request, you'll be presented with our template. Complete all sections to the best of your ability, including:

- Description of the changes
- Related issues (using proper [GitHub keywords](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests#linking-a-pull-request-to-an-issue) to auto-close issues i.e. `fixes`, `resolves`, or `closes`)
- Type of change in the PR title (bug fix, feature, breaking change)
- Steps you took to test your changes that reviewers can follow to also test them
- Checklist of items completed
- Screenshots/videos for visual changes

Incomplete templates may delay the review process.

### Labels for PR authors

As a PR author, you can use these labels to communicate the status of your pull request:

- `ready-for-review`: PR is ready for maintainer review
- `WIP`: PR is still being worked on, not ready for review
- `needs-self-review`: You plan to do a self-review before requesting maintainer review
- `help-wanted`: You need extra attention or assistance on this PR
- `breaking-change`: PR contains changes that break backward compatibility
- `Component: [Name]`: PR affects this component

For a complete list of labels and their meanings, including reviewer-specific labels, see [Participating in PR reviews](05_participating-in-pr-reviews.md#labels-and-their-meanings).

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
