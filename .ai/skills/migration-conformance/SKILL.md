---
name: migration-conformance
description: Sub-task after Phase 6 of 1st-gen to 2nd-gen component migration. Use to verify all migrated files conform to the project style guides, run linters, and surface any guideline gaps as PR comment notes.
---

# Migration conformance (sub-task after Phase 6)

A code-style conformance pass that runs after Phase 6 (testing) and before Phase 7 (documentation). The goal is to verify that all migrated files conform to the project style guides, that all linters pass, and that any guideline gaps are documented for the team.

The per-domain review criteria live in the **`code-conformance` rule** (`.ai/rules/code-conformance.md`). Read and apply that rule as the authoritative checklist for each file type. This skill provides the migration-specific sequencing, scoping, and quality gate.

## Mindset

You are a style guide enforcer, not a feature reviewer. Automated linting catches formatting and rule violations; reading the style guide catches structural and convention issues that linters cannot see. Work through each domain in order and fix violations as you find them — do not batch them for the end.

When the code is correct and appropriate but the guideline does not cover it, surface it to the user rather than silently accepting it or changing the guideline yourself.

## When to use this skill

- Phase 6 (migration-testing) is complete and all tests pass
- The user asks to "check code conformance for [component]", "run conformance checks for [component]", or "style guide review for [component]"
- The user refers to the conformance sub-task of the 2nd-gen component migration workstream

## When NOT to use

- Phase 6 is not complete — tests should pass before conformance review so style issues do not mask test failures
- You are running only the automated linters as a quick fix — just run `yarn lint` directly instead

## How to invoke

- "Check code conformance for [component]"
- "Run conformance checks for [component]"
- "Style guide review for [component]"
- "Conformance for [component] migration"

---

## Workflow

### Step 1: Run all automated linters

Scope the Prettier check to the component under review. Use the standard lint commands from the `code-conformance` rule.

```bash
# ESLint
yarn lint

# Stylelint
yarn lint:css

# Prettier — scoped to the migrated component
yarn prettier --check "2nd-gen/packages/**/components/[component]/**"
yarn prettier --write "2nd-gen/packages/**/components/[component]/**"
```

Resolve every error before moving to the manual review.

### Step 2: Apply the code-conformance rule

**Read `.ai/rules/code-conformance.md` now and apply it to the files below.**

That rule is the authoritative source for what to check in each domain and which style guide documents to read. Do not skip directly to the checklist — read the referenced guide sections for each domain before reviewing the files.

**Files in scope for this component:**

| Domain     | Files                                                                        |
| ---------- | ---------------------------------------------------------------------------- |
| TypeScript | `2nd-gen/packages/core/components/[component]/[Component].base.ts`           |
|            | `2nd-gen/packages/core/components/[component]/[Component].types.ts`          |
|            | `2nd-gen/packages/swc/components/[component]/[Component].ts`                 |
|            | Any mixins, controllers, or directives added for this component              |
| CSS        | `2nd-gen/packages/swc/components/[component]/[component].css`                |
| Tests      | `2nd-gen/packages/swc/components/[component]/[component].test.ts`            |
|            | `2nd-gen/packages/swc/components/[component]/[component].a11y.spec.ts`       |
|            | Play functions within the stories file                                       |
| Stories    | `2nd-gen/packages/swc/components/[component]/stories/[component].stories.ts` |

### Step 3: Surface any guideline gaps

Follow the guideline-gap pattern in the `code-conformance` rule. Report findings to the user as a proposed PR comment; do not block the conformance pass on them.

### Quality gate

Before marking conformance complete, confirm:

- [ ] `yarn lint` passes with no errors
- [ ] `yarn lint:css` passes with no errors
- [ ] Prettier formatting applied to all component files
- [ ] All TypeScript files reviewed against the TypeScript style guide
- [ ] All CSS files reviewed against the CSS style guide
- [ ] All test files reviewed against the testing style guide
- [ ] All story files reviewed against the Storybook authoring guidelines
- [ ] Any guideline gaps surfaced to the user with file, line, pattern, and rationale
