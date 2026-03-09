<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Style guide](../README.md) / Testing guide

<!-- Document title (editable) -->

# Testing guide

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>Beneath this doc</strong></summary>

- [Testing overview](01_testing-overview.md)
- [Storybook testing](02_storybook-testing.md)
- [Playwright accessibility testing](03_playwright-accessbility-testing.md)
- [Visual regression testing](04_visual-regresssion-testing.md)
- [Testing utilities](05_testing-utilities.md)
- [Code coverage](06_code-coverage.md)
- [Avoiding flaky tests](07_avoiding-flaky-tests.md)
- [Running tests](08_running-tests..md)
- [PR review checklist](09_pr_review-checklist.md)
- [Resources](10_resources.md)

</details>

<!-- Document content (editable) -->

This guide explains how to write tests for 2nd-gen components. Good tests catch bugs before users see them, make sure components are accessible, document how components should work, and give you confidence when changing code.

We use three types of tests:

| Type | Tool | File pattern | What it covers |
| --- | --- | --- | --- |
| Interaction tests | Storybook play functions | `*.test.ts` | Properties, slots, events, warnings |
| Accessibility tests | Playwright + aXe | `*.a11y.spec.ts` | ARIA tree, WCAG compliance |
| Visual regression tests | Storybook + Chromatic | `*.stories.ts` | Rendering across browsers and themes |
