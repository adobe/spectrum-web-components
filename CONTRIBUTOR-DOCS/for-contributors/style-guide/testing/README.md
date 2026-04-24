<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Contributor guides](../../README.md) / [Style guide](../README.md) / Testing guide

<!-- Document title (editable) -->

# Testing guide

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [Avoiding flaky tests](avoiding-flaky-tests.md)
- [Code coverage](code-coverage.md)
- [Playwright accessibility testing](playwright-accessbility-testing.md)
- [PR review checklist](pr-review-checklist.md)
- [Resources](resources.md)
- [Running tests](running-tests.md)
- [Storybook testing](storybook-testing.md)
- [Testing overview](testing-overview.md)
- [Testing utilities](testing-utilities.md)
- [Visual regression testing](visual-regresssion-testing.md)

</details>

<!-- Document content (editable) -->

This guide explains how to write tests for 2nd-gen components. Good tests catch bugs before users see them, make sure components are accessible, document how components should work, and give you confidence when changing code.

We use three types of tests:

| Type | Tool | File pattern | What it covers |
| --- | --- | --- | --- |
| Interaction tests | Storybook play functions | `*.test.ts` | Properties, slots, events, warnings |
| Accessibility tests | Playwright + aXe | `*.a11y.spec.ts` | ARIA tree, WCAG compliance |
| Visual regression tests | Storybook + Chromatic | `*.stories.ts` | Rendering across browsers and themes |
