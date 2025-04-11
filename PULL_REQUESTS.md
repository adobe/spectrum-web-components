# Spectrum Web Components: Pull Request Best Practices

This document outlines our team's expectations and best practices for creating, reviewing, and merging pull requests for Spectrum Web Components.

## Table of Contents

-   [Spectrum Web Components: Pull Request Best Practices](#spectrum-web-components-pull-request-best-practices)
    -   [Table of Contents](#table-of-contents)
    -   [Pull Request Creation](#pull-request-creation)
        -   [Branch Naming](#branch-naming)
        -   [Changeset Requirements](#changeset-requirements)
        -   [Conventional Commits](#conventional-commits)
    -   [Pull Request Template](#pull-request-template)
    -   [Labels and Their Meanings](#labels-and-their-meanings)
    -   [Pull Request Review Process](#pull-request-review-process)
        -   [Review Timing](#review-timing)
        -   [Review Expectations](#review-expectations)
        -   [Review Etiquette](#review-etiquette)
            -   [For Reviewers](#for-reviewers)
            -   [For PR Authors](#for-pr-authors)
            -   [Resolving Disagreements](#resolving-disagreements)
    -   [Merge Criteria](#merge-criteria)
    -   [Specific Requirements by Element Type](#specific-requirements-by-element-type)
        -   [New Components](#new-components)
            -   [Documentation](#documentation)
            -   [API Documentation](#api-documentation)
            -   [Technical Requirements](#technical-requirements)

## Pull Request Creation

### Branch Naming

We use a straightforward branch naming convention:

-   `[username]/[short-description]` (e.g., `alex/fix-dropdown-bug`)
-   If referencing a known issue, incorporate the issue number (e.g., `alex/123-fix-dropdown-bug`)

### Changeset Requirements

For PRs that add or update a component:

-   Must include a changeset to trigger the release train and update the CHANGELOG
-   Changeset type should be one of:
    -   `patch` - for bug fixes only
    -   `minor` - for new components or new APIs in an existing component
    -   `major` - for breaking changes to a component or public library API

### Conventional Commits

We follow the Conventional Commits standard to make change tracking predictable and automate versioning:

Format: `type(component?): subject`

The component is optional but should reference the package you are updating.

Types include:

-   `feat`: New features or enhancements
-   `fix`: Bug fixes
-   `docs`: Documentation changes
-   `style`: Formatting, linting (not CSS changes)
-   `chore`: Build tooling, repo management, dependency updates
-   `perf`: Performance improvements
-   `test`: Adding or updating tests

Examples:

-   `feat(sp-card): add shadow styles for theme consistency`
-   `fix(sp-action-menu): correct arrow key navigation in nested menus`
-   `docs: clarify how to submit bug reports`

For breaking changes, add a `!` after the type/scope:

-   `feat(sp-button)!: change API for icon placement`

## Pull Request Template

When creating a pull request, you'll be presented with our template. Complete all sections to the best of your ability, including:

-   Description of the changes
-   Related issues (using proper GitHub keywords to auto-close issues)
-   Type of change (bug fix, feature, breaking change)
-   Checklist of items completed
-   Screenshots/videos for visual changes
-   Testing information

Incomplete templates will delay the review process.

## Labels and Their Meanings

-   `ready-for-review`: PR is ready for maintainer review
-   `work-in-progress`: PR is still being worked on, not ready for review
-   `needs-changes`: PR requires changes based on review feedback
-   `needs-tests`: PR is missing necessary tests
-   `needs-docs`: PR requires documentation updates
-   `needs-self-review`: PR requires that the author does a self-review of code to answer preliminary questions
-   `needs-style-review`: PR needs to be checked by CSS and/or Design
-   `breaking-change`: PR contains changes that break backward compatibility
-   `help-wanted`: Extra attention is needed on this PR
-   `on-hold`: PR is blocked and/or needs more discussion.
-   `Spectrum CSS`: Contains a version bump of Spectrum CSS and will require a review by CSS expert
-   `Component: [Name]`: PR effects this component

Apply labels promptly to help maintainers prioritize and manage the review queue.

## Pull Request Review Process

### Review Timing

-   Maintainers aim to review PRs within 2 business days
-   If your PR hasn't received attention after 3 business days, feel free to ping the team in the PR comments

### Review Expectations

Reviewers will check for:

1. Adherence to code style and component patterns
2. Proper test coverage
3. Documentation completeness
4. Accessibility compliance
5. Visual regression test coverage
6. Performance considerations

### Review Etiquette

The code review process should be constructive, respectful, and focused on improvement. Both reviewers and PR authors should follow these guidelines:

#### For Reviewers

-   **Be Specific and Constructive**: Provide clear, actionable feedback rather than vague criticisms. Explain why a change is needed.
-   **Prioritize Issues**: Focus on important issues first (architecture, functionality, performance) before minor stylistic concerns.
-   **Ask Questions**: When something isn't clear, ask questions rather than making assumptions about intent.
-   **Suggest Alternatives**: When pointing out issues, suggest possible solutions or approaches.
-   **Recognize Good Work**: Acknowledge well-written code and good design decisions. Positive reinforcement is valuable.
-   **Remember Context**: Consider the PR author's experience level and the scope of changes when providing feedback.
-   **Be Timely**: Complete reviews promptly to avoid blocking progress.
-   **Avoid Nitpicking**: Focus on meaningful improvements rather than personal style preferences that don't violate project standards. Prepend comments with `nit:` to denote its non-blocking feedback.

#### For PR Authors

-   **Be Receptive to Feedback**: Approach review comments with an open mind. The goal is better code, not personal criticism.
-   **Respond to All Comments**: Address each review comment, either with code changes or explanations of your approach.
-   **Ask for Clarification**: If review feedback is unclear, ask questions to understand the concern.
-   **Notify When Ready**: After addressing feedback, notify reviewers that the PR is ready for another look.
-   **Explain Complex Changes**: For non-obvious changes, explain your reasoning in the PR description or comments.
-   **Break Down Large PRs**: When possible, split large changes into smaller, more manageable PRs.
-   **Test Thoroughly**: Before requesting review, ensure your code meets the project's quality standards.

#### Resolving Disagreements

-   **Focus on Data**: Back up opinions with data, documentation, or examples where possible.
-   **Refer to Standards**: Use project conventions and industry best practices to guide decisions.
-   **Compromise When Appropriate**: Be willing to find middle ground when opinions differ.
-   **Escalate Respectfully**: If consensus can't be reached, involve a third team member or technical lead for guidance.
-   **Document Decisions**: Record the reasoning behind significant technical decisions for future reference.

Remember that code reviews are a collaborative process aimed at improving code quality, knowledge sharing, and maintaining project standards. Approaching reviews with empathy and professionalism benefits everyone involved.

## Merge Criteria

A PR is ready to merge when:

1. It has received approval from two maintainers
2. All CI checks are passing
    - Unit tests passing
    - Integration tests passing
    - Visual regression tests passing (VRT golden images should not be updated until an approver confirms they look good)
    - Linting checks passing
3. All requested changes have been addressed
4. PR follows conventional commit standards
5. Includes proper changeset (when applicable)
6. Documentation has been updated as needed

## Specific Requirements by Element Type

### New Components

When creating or reviewing new components, ensure:

#### Documentation

-   README contains a clear description and minimal example
-   Inline documentation for all public APIs
-   Demo page under `/demo` showing all component states

#### API Documentation

-   **Slots**: All slots documented in the element class docblock
-   **CSS Custom Properties**: All public CSS custom properties documented
-   **CSS Shadow Parts**: All shadow parts documented
-   **Events**: All dispatched events documented with `@fires` docblock
-   **Class Fields**: All public/protected fields have proper docblocks
-   **Methods**: All public/protected methods have docblocks with parameters and return types

#### Technical Requirements

-   Component follows established patterns and conventions
-   Accessibility is thoroughly considered
-   Responsive design best practices are followed
-   Cross-browser compatibility is verified
