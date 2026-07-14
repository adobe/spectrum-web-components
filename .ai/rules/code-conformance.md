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
- Dev-warning validation (enum values, required/conditionally required properties, mutually exclusive combinations, required slots, allowed children) uses the shared helpers in `@spectrum-web-components/core/utils` (`validateEnum`, `warnIf`, `validateRequiredSlot`, `validateAllowedChildren`), not hand-rolled `includes()` + `window.__swc.warn()` checks. See [Debug and validation](../../CONTRIBUTOR-DOCS/02_style-guide/02_typescript/17_debug-validation.md#reusable-validation-helpers).

## CSS

**Style guide:**

- [Component CSS](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md)
- [Custom properties](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md)
- [Component CSS PR checklist](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/03_component-css-pr-checklist.md)
- [Spectrum CSS to SWC migration](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md)
- [Styling anti-patterns](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md)
- [Property order quick reference](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/06_property-order-quick-reference.md)
- [Non-component stylesheets](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/07_stylesheets.md) — applies when the changed file is in `swc/stylesheets/` rather than a component package

**What to check:**

- Every item in the Component CSS PR checklist passes — work through it explicitly, do not skim
- CSS property ordering matches the documented order
- Custom property naming follows the convention
- No patterns from the anti-patterns guide are present
- Forced-colors media query is present and correct (if applicable)
- High-contrast and other media queries are sorted to the bottom of the file
- No hard-coded values where design tokens are available
- For files in `swc/stylesheets/`: placement, index registration, generated file conventions, and `_lit-styles/` import patterns match [Non-component stylesheets](../../CONTRIBUTOR-DOCS/02_style-guide/01_css/07_stylesheets.md)

## Test files

**Vitest reference:** see [.ai/references/vitest.md](../references/vitest.md) for the canonical AI-friendly Vitest docs (index + per-page fetch pattern) and project-specific config notes.

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
- Stories documentation: `.ai/rules/stories-documentation.md` — per-unit MDX authoring (section content, anatomy, options, states, behaviors, accessibility)

**What to check (`<unit>.stories.ts`):**

- File has the correct section order and visual separators
- Meta has all required fields: `title`, `component`, `args`, `argTypes`, `render`, `parameters.docs.subtitle`, `tags: ['migrated']` (or `'controller'`)
- All stories have correct section tags: `anatomy`, `options`, `states`, `behaviors`, `a11y`, etc.
- Playground uses `tags: ['dev']` when the unit has a per-unit MDX file (no `'autodocs'` to avoid a duplicate Docs entry)
- No story-level JSDoc comments above any `export const` — only the meta-level JSDoc remains
- No `section-order` parameter; no `description-only` tag
- `flexLayout: 'row-wrap'` is used for multi-item stories
- Internal DOM attributes the component writes itself via `setAttribute` (not declared `@property`, e.g. Tooltip's `actual-placement`) are declared in `argTypes` with `{ table: { disable: true }, control: false }`; otherwise the Storybook helper's attribute observer round-trips them through `args` and re-applies stale values via its `spread` directive, clobbering the component's own state
- All examples use accessible, meaningful content: no placeholder text, no missing labels
- Image assets use `picsum.photos` with static IDs

**What to check (`<unit>.mdx`):**

- Per-unit MDX file exists at the unit root with the correct relative import path for `DocsHeader` / `DocsFooter`
- `<Meta of={Stories} />` declared exactly once
- `<DocsHeader />` at the top, `<DocsFooter />` at the bottom
- Sections appear in canonical order (Anatomy → Usage → Options → States → Behaviors → Accessibility → Full pattern → Upcoming features → API → Appendix → Feedback)
- Every section-tagged story is referenced via `<Canvas of={Stories.StoryName} />`
- Per-story `### Title` headings match Storybook's rendered story names
- No `<Canvas>` references to untagged stories
- Controllers: hand-authored `## API` section is present and `meta.tags` includes `'controller'` so `<ApiTable />` is omitted by `<DocsFooter />`
- MDX heading levels start at `###` inside section prose (top-level sections use `##`)

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
