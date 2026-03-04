<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / 2nd gen testing

<!-- Document title (editable) -->

# 2nd gen testing

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Where to put tests](#where-to-put-tests)
- [Quick reference](#quick-reference)

</details>

<!-- Document content (editable) -->

## Overview

2nd gen components use three types of tests: Storybook play functions for interaction tests, Playwright for accessibility tests, and visual regression testing through stories. The full testing guide — including file structure, test patterns, assertion conventions, accessibility testing, coverage thresholds, flaky test prevention, and more — lives in the [Testing guide](../02_style-guide/04_testing/README.md).

## Where to put tests

- Keep docs stories in `2nd-gen/packages/swc/components/<component>/stories/<component>.stories.ts`.
- Add test stories in `2nd-gen/packages/swc/components/<component>/test/<component>.test.ts`.
- Add accessibility tests in `2nd-gen/packages/swc/components/<component>/test/<component>.a11y.spec.ts`.
- Reuse the base stories and metadata from the main stories file.
- Test stories run in development Storybook only and are excluded from `storybook:build`.