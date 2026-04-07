[PR review skill](../SKILL.md) / Full prompt

# Spectrum PR review prompt

Create a pre-PR review report for the current branch, comparing against `main` by default unless the user specifies a different base branch.

The report lives in `.ai/pr-feedback/pr-feedback-#.md` and is meant to give the author a rigorous first round of review before asking teammates for review.

## Review goal

The report should answer:

- What issues should be fixed before team review?
- What risks still need verification?
- Which repo guidelines apply to the changed files?
- What tests or checks are missing or insufficient?

This is a code review artifact, not a status update. Lead with findings.

## Required workflow

1. Create the next numbered report in `.ai/pr-feedback/`
2. Resolve the base branch, defaulting to `main`
3. Gather the diff and changed-file list
4. Classify the changed files
5. Read the relevant contributor and style-guide docs
6. Run targeted checks where they materially improve confidence
7. Write the report with findings ordered by severity

## File classification

Use the diff to decide which guidance and checks apply.

- **2nd-gen component code**
  - `2nd-gen/packages/swc/components/**`
- **Tests**
  - `*.test.ts`
  - `*.a11y.spec.ts`
  - `*.stories.ts`
- **CSS**
  - `*.css`
- **TypeScript**
  - `*.ts`
- **Contributor docs or migration docs**
  - `CONTRIBUTOR-DOCS/**`
  - `.ai/**`

## Guidance to consult

Always read:

- `CONTRIBUTOR-DOCS/01_contributor-guides/05_participating-in-pr-reviews.md`

When 2nd-gen components or tests changed, read:

- `CONTRIBUTOR-DOCS/01_contributor-guides/11_2ndgen_testing.md`
- `CONTRIBUTOR-DOCS/02_style-guide/04_testing/README.md`
- `CONTRIBUTOR-DOCS/02_style-guide/04_testing/09_pr_review-checklist.md`
- `CONTRIBUTOR-DOCS/02_style-guide/04_testing/03_playwright-accessbility-testing.md` when accessibility coverage or interaction semantics matter

When CSS changed, read:

- `CONTRIBUTOR-DOCS/02_style-guide/01_css/README.md`
- `CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md`
- `CONTRIBUTOR-DOCS/02_style-guide/01_css/03_component-css-pr-checklist.md`
- `CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md` when specificity, host styling, or selector patterns look risky

When TypeScript changed in 2nd-gen code, read the most relevant parts of:

- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/README.md`
- `01_file-organization.md`
- `03_typescript-modifiers.md`
- `04_lit-decorators.md`
- `05_property-patterns.md`
- `06_method-patterns.md`
- `09_rendering-patterns.md`
- `10_naming-conventions.md`
- `15_directive-composition.md`

When accessibility behavior changed, also read:

- `CONTRIBUTOR-DOCS/01_contributor-guides/09_accessibility-testing.md`

## Expected checks

Run the narrowest commands that can validate the changed area. Examples include:

- diff and file list commands
- targeted lint for changed files or directories
- targeted 2nd-gen tests
- targeted accessibility tests
- format or static checks when style compliance is in doubt

Do not claim that a check passed unless you actually ran it.

If you skip a relevant check, say why.

## Review priorities

Prioritize issues in this order:

1. correctness, regressions, and broken behavior
2. accessibility gaps or incorrect semantics
3. missing, weak, or flaky 2nd-gen tests
4. CSS style-guide violations or risky styling patterns
5. TypeScript, Lit, or component-pattern mismatches
6. missing docs, migration notes, or rollout guidance

## Required report structure

Use this exact H2 order:

1. `## Scope`
2. `## Checks run`
3. `## Findings`
4. `## Accessibility review notes`
5. `## 2nd-gen testing review notes`
6. `## CSS review notes`
7. `## TypeScript review notes`
8. `## Open questions`
9. `## Suggested next actions`

## Section requirements

### 1. Scope

State:

- current branch
- base branch
- files reviewed
- any review limits, such as "reviewed only files changed against main"

### 2. Checks run

List the commands you ran and the result of each:

- passed
- failed
- skipped

If a command failed because of environment or setup, say that explicitly.

### 3. Findings

This is the main review section.

Rules:

- Put findings first
- Order by severity
- Use one bullet per finding
- Include file references and line numbers when possible
- State the impact and the recommended fix
- If there are no findings, say `No blocking or major findings identified.`

Use these severity labels:

- `Blocking`
- `Major`
- `Minor`
- `Nit`

Only include `Nit` items if they are grounded in repo guidance, not personal preference.

### 4. Accessibility review notes

Summarize whether the diff appears to:

- add or change interactive behavior
- affect labels, roles, states, or focus management
- add or change a11y tests
- require manual verification beyond automation

Call out missing coverage or incomplete validation.

### 5. 2nd-gen testing review notes

Assess whether the branch follows the 2nd-gen testing guidance.

Check for issues such as:

- missing story-based interaction tests
- missing Playwright accessibility tests
- weak assertions
- missing descriptive `expect()` messages
- raw `querySelector` usage instead of `getComponent` or `getComponents`
- property mutations without `await element.updateComplete`
- missing ARIA snapshots after state changes
- timeout-based or flaky testing patterns

### 6. CSS review notes

Assess changed CSS against the 2nd-gen CSS guide.

Check for issues such as:

- visual styles on `:host` instead of layout participation only
- selector specificity that exceeds repo guidance without justification
- misuse of classes versus host attributes
- missing or misordered forced-colors handling
- property-order problems
- comment style or naming-pattern mismatches

### 7. TypeScript review notes

Assess changed TypeScript against the 2nd-gen TypeScript guidance.

Check for issues such as:

- import ordering or file organization problems
- missing `override` where required
- weak or inconsistent `@property()` usage
- public API patterns that do not match repo conventions
- rendering patterns that should use Lit directives such as `classMap`
- naming mismatches between file types, classes, and exported symbols

### 8. Open questions

Capture uncertainties that should be resolved before team review.

Use this section when:

- a mapping or intent is unclear
- a missing test might be intentional but is not documented
- a behavior change needs confirmation from design or accessibility review

### 9. Suggested next actions

Give a short actionable list for the author.

Prefer concrete next steps such as:

- add or update a specific test
- change a selector or property pattern
- rerun a targeted command
- document a manual accessibility verification step

## Writing style

- Be direct, specific, and evidence-based
- Review against repo standards, not personal taste
- Prefer file references over vague descriptions
- Do not bury findings under summary text
