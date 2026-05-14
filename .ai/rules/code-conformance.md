---
description: Review 2nd-gen component files against project style guides, run linters, and surface guideline gaps. Apply whenever reviewing or auditing 2nd-gen component code for style conformance.
alwaysApply: false
---

# Code conformance

Use this rule when auditing 2nd-gen component files for alignment with project style guides. It covers four domains: TypeScript, CSS, test files, and Storybook stories. Always run automated linters first, then perform the manual review for each domain.

## Linting commands

```bash
# ESLint — TypeScript and test files
yarn lint

# Stylelint — CSS files
yarn lint:css

# Prettier — check and fix formatting
yarn prettier --check "path/to/files"
yarn prettier --write "path/to/files"
```

Resolve every linting error before beginning the manual review. If a lint rule must be disabled, add an inline comment with a clear reason and flag it for reviewer awareness.

Reference: [Linting tools](../../CONTRIBUTOR-DOCS/02_style-guide/03_linting-tools.md)

## TypeScript

**Style guide:**

- [File organization](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/01_file-organization.md)
- [Class structure](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/02_class-structure.md)
- [TypeScript modifiers](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/03_typescript-modifiers.md)
- [Lit decorators](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/04_lit-decorators.md)
- [Property patterns](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/05_property-patterns.md)
- [Method patterns](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/06_method-patterns.md)
- [JSDoc standards](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/07_jsdoc-standards.md)
- [Component types](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/08_component-types.md)
- [Rendering patterns](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/09_rendering-patterns.md)
- [Naming conventions](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/10_naming-conventions.md)
- [Base class vs concrete class](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/11_base-vs-concrete.md)
- [Composition patterns](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/12_composition-patterns.md) and related composition docs

**What to check:**

- File organization matches the documented section order
- Class structure follows the prescribed ordering: decorators, properties, lifecycle, render
- Properties use the correct decorator patterns and reflect values
- Methods follow visibility and naming conventions
- JSDoc is present and well-formed on public API members
- No patterns listed as anti-patterns or discouraged in the guide

## CSS

**Style guide:**

- [Component CSS](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md)
- [Custom properties](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md)
- [Component CSS PR checklist](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/03_component-css-pr-checklist.md)
- [Spectrum CSS to SWC migration](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md)
- [Styling anti-patterns](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md)
- [Property order quick reference](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/06_property-order-quick-reference.md)

**What to check:**

- CSS property ordering matches the documented order
- Custom property naming follows the convention
- No patterns from the anti-patterns guide are present
- Forced-colors media query is present and correct (if applicable)
- High-contrast and other media queries are sorted to the bottom of the file
- No hard-coded values where design tokens are available

## Test files

**Style guide:**

- [Testing overview](../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/01_testing-overview.md)
- [Storybook testing](../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/02_storybook-testing.md)
- [Playwright accessibility testing](../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/03_playwright-accessbility-testing.md)
- [Testing utilities](../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/05_testing-utilities.md)
- [Avoiding flaky tests](../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/07_avoiding-flaky-tests.md)
- [PR review checklist](../../CONTRIBUTOR-DOCS/02_style-guide/04_testing/09_pr_review-checklist.md)

**What to check:**

- Describe/it block naming follows the documented naming conventions
- Assertions use the prescribed utilities and matchers, not raw DOM assertions where a helper exists
- No patterns from the flaky-tests guide are present
- Test isolation is correct: no shared mutable state between tests
- Coverage is meaningful — each test would catch a real regression if the behavior changed

## Storybook stories

**Authoring guidelines:**

- Stories format: `.ai/rules/stories-format.md` — file structure, meta, tags, layout, visual separators
- Stories documentation: `.ai/rules/stories-documentation.md` — section content, anatomy, options, states, behaviors, accessibility

**What to check:**

- File has the correct section order and visual separators
- Meta has all required fields: `title`, `component`, `args`, `argTypes`, `render`, `parameters.docs.subtitle`, `tags: ['migrated']`
- All stories have correct tags: `anatomy`, `options`, `states`, `behaviors`, `a11y`, etc.
- JSDoc comments are present on all stories except Playground and Overview
- JSDoc headings start at level 3 (`###`) or deeper
- `flexLayout: 'row-wrap'` is used for multi-item stories
- All examples use accessible, meaningful content: no placeholder text, no missing labels
- Image assets use `picsum.photos` with static IDs

## Guideline gaps

If the code is already correct and appropriate but the relevant style guide does not cover the pattern, do not change the guideline and do not block the review on it. Instead, surface it to the user with:

- The file and line where the uncovered pattern appears
- The uncovered pattern itself
- A clear rationale for why it should be added to the guide

**Example PR comment format:**

```
## Potential guideline improvements

- `Component.base.ts:42` — The TypeScript guide does not cover the pattern for Lit reactive
  controllers that hold both state and refs. A note clarifying the preferred approach would
  prevent inconsistency across future migrations.
```
