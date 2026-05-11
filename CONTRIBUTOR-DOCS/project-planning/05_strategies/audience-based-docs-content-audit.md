<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Audience-based docs content audit

<!-- Document title (editable) -->

# Audience-based docs content audit

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Purpose](#purpose)
- [Methodology](#methodology)
- [File-by-file destinations](#file-by-file-destinations)
    - [From `01_contributor-guides/` → `for-contributors/`, `for-consumers/`, `for-maintainers/`](#from-01contributor-guides--for-contributors-for-consumers-for-maintainers)
    - [From `02_style-guide/` → `for-contributors/style-guide/`](#from-02style-guide--for-contributorsstyle-guide)
    - [From `03_project-planning/` → `project-planning/`](#from-03project-planning--project-planning)
    - [From `README.md`](#from-readmemd)
    - [New audience folders](#new-audience-folders)
- [Observations — content concerns for follow-up PRs](#observations--content-concerns-for-follow-up-prs)
    - [Observation 1 — Accessibility testing content has two homes that overlap](#observation-1--accessibility-testing-content-has-two-homes-that-overlap)
    - [Observation 2 — Migration step-by-step lives under project-planning but is operational guidance](#observation-2--migration-step-by-step-lives-under-project-planning-but-is-operational-guidance)
    - [Observation 3 — Tools vs packages overlaps with repo structure](#observation-3--tools-vs-packages-overlaps-with-repo-structure)
    - [Observation 4 — `2ndgen_testing.md` is a stub that duplicates style-guide content](#observation-4--2ndgentestingmd-is-a-stub-that-duplicates-style-guide-content)
    - [Observation 5 — Numeric prefixes inside `project-planning/` are ordering-significant](#observation-5--numeric-prefixes-inside-project-planning-are-ordering-significant)
    - [Observation 6 — Multiple workstream READMEs are empty stubs](#observation-6--multiple-workstream-readmes-are-empty-stubs)
    - [Observation 7 — `04_milestones/` may not have current value](#observation-7--04milestones-may-not-have-current-value)
    - [Observation 8 — Most folder READMEs are shell-only (no intro)](#observation-8--most-folder-readmes-are-shell-only-no-intro)
    - [Observation 9 — Filename typos that survived to `origin/main`](#observation-9--filename-typos-that-survived-to-originmain)
    - [Observation 10 — `12_tools-vs-packages.md` title doesn't match its scope](#observation-10--12tools-vs-packagesmd-title-doesnt-match-its-scope)
    - [Observation 11 — Latent consumer-audience content inside `focus-management.md`](#observation-11--latent-consumer-audience-content-inside-focus-managementmd)
- [Cross-reference](#cross-reference)

</details>

<!-- Document content (editable) -->

## Purpose

Sibling artifact to the [audience-based docs reorganization plan](./audience-based-docs-reorganization-plan.md).

The reorganization plan is **structural**: where files live, how Storybook surfaces them, what generators run.

This audit is **content**: classifies every existing contributor doc by audience, locks each file's destination path in the audience reorg, and captures content-level concerns (duplications, conflicts, stubs, naming inconsistencies) that should be resolved in **follow-up PRs** so they don't block the structural change.

Use this audit as:
- The authoritative source for "where does file X go in the new tree?" (the structural PR follows this)
- The backlog for follow-up content PRs (each "observation" below is a candidate ticket)

## Methodology

Surveyed all 143 markdown files under `CONTRIBUTOR-DOCS/` on `origin/main` at the time of writing. Each file was classified by:

- **Primary audience** — consumer / contributor / maintainer / cross-cutting (some docs serve more than one)
- **Doc type** — operational (how-to), reference (lookup), planning (coordination), strategic (proposal/decision)
- **Topic** — what the doc actually covers

## File-by-file destinations

Renames listed below are categorized:
- **(required)** — fixes a broken path, typo, or filename inconsistency. Must change.
- **(audience)** — change forced by moving into an audience folder. Must change.
- **(clarity)** — optional improvement to a confusing or non-descriptive name. Recommended; flag if you'd rather keep the current name.

### From `01_contributor-guides/` → `for-contributors/`, `for-consumers/`, `for-maintainers/`

| Current path | Audience | Destination | Rename type |
|---|---|---|---|
| `01_contributor-guides/01_getting-involved.md` | contributor | `for-contributors/getting-involved.md` | audience |
| `01_contributor-guides/02_using-the-issue-tracker.md` | consumer + contributor | `for-consumers/using-the-issue-tracker.md` | audience + clarity (the primary audience is anyone filing a bug or feature request — that's consumer territory) |
| `01_contributor-guides/03_working-in-the-swc-repo.md` | contributor | `for-contributors/working-in-the-swc-repo.md` | audience |
| `01_contributor-guides/04_making-a-pull-request.md` | contributor | `for-contributors/making-a-pull-request.md` | audience |
| `01_contributor-guides/05_participating-in-pr-reviews.md` | contributor | `for-contributors/reviewing-pull-requests.md` | clarity (active voice; pairs with `making-a-pull-request.md`) |
| `01_contributor-guides/06_releasing-swc.md` | maintainer | `for-maintainers/releasing-swc.md` | audience (this is the only existing maintainer-only doc; it seeds `for-maintainers/`) |
| `01_contributor-guides/07_authoring-contributor-docs/README.md` | contributor (meta) | `for-contributors/authoring-contributor-docs/README.md` | audience |
| `01_contributor-guides/07_authoring-contributor-docs/update-nav.js` | tooling | `for-contributors/authoring-contributor-docs/update-nav.js` | audience |
| `01_contributor-guides/07_authoring-contributor-docs/verify-links.js` | tooling | `for-contributors/authoring-contributor-docs/verify-links.js` | audience |
| `01_contributor-guides/08_patching-dependencies.md` | contributor | `for-contributors/patching-dependencies.md` | audience |
| `01_contributor-guides/09_accessibility-testing.md` | contributor | `for-contributors/running-accessibility-tests.md` | clarity (pairs with the style-guide doc on *writing* a11y tests — see Observation 1) |
| `01_contributor-guides/10_using-stackblitz.md` | contributor | `for-contributors/maintaining-stackblitz-examples.md` | clarity (the doc's intro says "Maintaining StackBlitz examples"; the current title undersells it) |
| `01_contributor-guides/11_2ndgen_testing.md` | contributor | **Merge → `for-contributors/style-guide/testing/testing-overview.md`** | content (see Observation 4 — this file is only 2 sections and overlaps with the style-guide testing overview) |
| `01_contributor-guides/12_tools-vs-packages.md` | contributor | `for-contributors/tools-vs-packages.md` | audience |
| `01_contributor-guides/13_writing-migration-guides.md` | contributor (meta) | `for-contributors/authoring-contributor-docs/writing-migration-guides.md` | clarity (meta-doc; belongs alongside the other authoring-contributor-docs content) |
| `01_contributor-guides/14_focus-management.md` | contributor | `for-contributors/focus-management.md` | audience |
| `01_contributor-guides/README.md` | — | `for-contributors/README.md` | audience |

### From `02_style-guide/` → `for-contributors/style-guide/`

| Current path | Destination | Rename type |
|---|---|---|
| `02_style-guide/README.md` | `for-contributors/style-guide/README.md` | audience |
| `02_style-guide/01_css/README.md` | `for-contributors/style-guide/css/README.md` | audience |
| `02_style-guide/01_css/01_component-css.md` | `for-contributors/style-guide/css/component-css.md` | audience |
| `02_style-guide/01_css/02_custom-properties.md` | `for-contributors/style-guide/css/custom-properties.md` | audience |
| `02_style-guide/01_css/03_component-css-pr-checklist.md` | `for-contributors/style-guide/css/component-css-pr-checklist.md` | audience |
| `02_style-guide/01_css/04_spectrum-swc-migration.md` | `for-contributors/style-guide/css/spectrum-swc-migration.md` | audience |
| `02_style-guide/01_css/05_anti-patterns.md` | `for-contributors/style-guide/css/anti-patterns.md` | audience |
| `02_style-guide/01_css/06_property-order-quick-reference.md` | `for-contributors/style-guide/css/property-order-quick-reference.md` | audience |
| `02_style-guide/02_typescript/README.md` | `for-contributors/style-guide/typescript/README.md` | audience |
| `02_style-guide/02_typescript/01_file-organization.md` | `for-contributors/style-guide/typescript/file-organization.md` | audience |
| `02_style-guide/02_typescript/02_class-structure.md` | `for-contributors/style-guide/typescript/class-structure.md` | audience |
| `02_style-guide/02_typescript/03_typescript-modifiers.md` | `for-contributors/style-guide/typescript/typescript-modifiers.md` | audience |
| `02_style-guide/02_typescript/04_lit-decorators.md` | `for-contributors/style-guide/typescript/lit-decorators.md` | audience |
| `02_style-guide/02_typescript/05_property-patterns.md` | `for-contributors/style-guide/typescript/property-patterns.md` | audience |
| `02_style-guide/02_typescript/06_method-patterns.md` | `for-contributors/style-guide/typescript/method-patterns.md` | audience |
| `02_style-guide/02_typescript/07_jsdoc-standards.md` | `for-contributors/style-guide/typescript/jsdoc-standards.md` | audience |
| `02_style-guide/02_typescript/08_component-types.md` | `for-contributors/style-guide/typescript/component-types.md` | audience |
| `02_style-guide/02_typescript/09_rendering-patterns.md` | `for-contributors/style-guide/typescript/rendering-patterns.md` | audience |
| `02_style-guide/02_typescript/10_naming-conventions.md` | `for-contributors/style-guide/typescript/naming-conventions.md` | audience |
| `02_style-guide/02_typescript/11_base-vs-concrete.md` | `for-contributors/style-guide/typescript/base-vs-concrete.md` | audience |
| `02_style-guide/02_typescript/12_composition-patterns.md` | `for-contributors/style-guide/typescript/composition-patterns.md` | audience |
| `02_style-guide/02_typescript/13_mixin-composition.md` | `for-contributors/style-guide/typescript/mixin-composition.md` | audience |
| `02_style-guide/02_typescript/14_controller-composition.md` | `for-contributors/style-guide/typescript/controller-composition.md` | audience |
| `02_style-guide/02_typescript/15_directive-composition.md` | `for-contributors/style-guide/typescript/directive-composition.md` | audience |
| `02_style-guide/02_typescript/16_interface-composition.md` | `for-contributors/style-guide/typescript/interface-composition.md` | audience |
| `02_style-guide/02_typescript/17_debug-validation.md` | `for-contributors/style-guide/typescript/debug-validation.md` | audience |
| `02_style-guide/03_linting-tools.md` | `for-contributors/style-guide/linting-tools.md` | audience |
| `02_style-guide/04_testing/README.md` | `for-contributors/style-guide/testing/README.md` | audience |
| `02_style-guide/04_testing/01_testing-overview.md` | `for-contributors/style-guide/testing/testing-overview.md` | audience |
| `02_style-guide/04_testing/02_storybook-testing.md` | `for-contributors/style-guide/testing/storybook-testing.md` | audience |
| `02_style-guide/04_testing/03_playwright-accessbility-testing.md` | `for-contributors/style-guide/testing/playwright-accessibility-testing.md` | required (fix `accessbility` typo) |
| `02_style-guide/04_testing/04_visual-regresssion-testing.md` | `for-contributors/style-guide/testing/visual-regression-testing.md` | required (fix `regresssion` typo) |
| `02_style-guide/04_testing/05_testing-utilities.md` | `for-contributors/style-guide/testing/testing-utilities.md` | audience |
| `02_style-guide/04_testing/06_code-coverage.md` | `for-contributors/style-guide/testing/code-coverage.md` | audience |
| `02_style-guide/04_testing/07_avoiding-flaky-tests.md` | `for-contributors/style-guide/testing/avoiding-flaky-tests.md` | audience |
| `02_style-guide/04_testing/08_running-tests..md` | `for-contributors/style-guide/testing/running-tests.md` | required (fix double-dot) |
| `02_style-guide/04_testing/09_pr_review-checklist.md` | `for-contributors/style-guide/testing/pr-review-checklist.md` | required (underscore → hyphen) |
| `02_style-guide/04_testing/10_resources.md` | `for-contributors/style-guide/testing/resources.md` | audience |

### From `03_project-planning/` → `project-planning/`

Numeric prefixes **preserved inside** project-planning subtree (they encode ordering relevant to maintainers; see Observation 5).

| Current path | Destination | Rename type |
|---|---|---|
| `03_project-planning/*` | `project-planning/*` (all children unchanged) | audience (top-level rename only) |

This covers 73 files: workstreams, per-component migration analyses, milestones, strategies. No internal renames.

### From `README.md`

`CONTRIBUTOR-DOCS/README.md` stays at root. Content is rewritten in Phase 2c of the structural plan to reflect the audience-first tree.

### New audience folders

The structural plan adds three new audience folders that don't exist on `origin/main`:

- `for-consumers/` — created when MVP-1 consumer landing page lands (Phase 6 of the structural plan). Initial seed: `using-the-issue-tracker.md` (moved here per the audit) + `get-started.md` (Phase 6) + `customization-cheatsheet.md` (Phase 7).
- `for-maintainers/` — created with the move of `releasing-swc.md`. Folder will hold one file initially; future maintainer docs (deprecation policy, release cadence) belong here.
- `reference/` — created in Phase 8 (component status matrix). Empty until then.

## Observations — content concerns for follow-up PRs

Each observation is sized as a potential follow-up ticket. **None of these are addressed in the structural reorganization PR**; they're tracked here so they don't get lost.

### Observation 1 — Accessibility testing content has two homes that overlap

**Files:** `01_contributor-guides/09_accessibility-testing.md` and `02_style-guide/04_testing/03_playwright-accessbility-testing.md`.

**Overlap:** both discuss story IDs, helper functions, what to test per component type, ARIA testing patterns. The line between them is fuzzy — "how to run a11y tests" vs "how to write a11y tests" — and neither doc states its scope explicitly.

**Recommendation in this audit:** rename to `running-accessibility-tests.md` (in `for-contributors/`) and `playwright-accessibility-testing.md` (in `style-guide/testing/`) so the operational vs reference distinction is in the filenames. Then in a follow-up content PR, sharpen each doc's scope statement and cross-link explicitly. Consider whether some content should be promoted to a single canonical home with the other linking out.

### Observation 2 — Migration step-by-step lives under project-planning but is operational guidance

**Files:** `03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/*` (7 files, including `01_washing-machine-workflow.md` and 6 phase-specific guides).

**Concern:** these files are *how to perform a migration* — operational guidance for contributors. They sit inside the workstreams subtree because the migration is a workstream, but the content itself is contributor-facing, not maintainer-planning.

**Recommendation:** in a follow-up PR, consider moving `02_step-by-step/` to `for-contributors/migrating-a-component/` (or similar). Leave the workstream README in `project-planning/` to track who is migrating what and when, but the step-by-step *how* belongs with the rest of the contributor authoring guides. The structural reorganization PR does **not** make this move; it preserves the current location to keep scope tight.

### Observation 3 — Tools vs packages overlaps with repo structure

**Files:** `01_contributor-guides/12_tools-vs-packages.md` and `01_contributor-guides/03_working-in-the-swc-repo.md` (which has a `Repository structure` section).

**Overlap:** both explain where code lives in the monorepo. `working-in-the-swc-repo.md` covers it at a high level; `tools-vs-packages.md` goes deeper on the tools-vs-packages decision.

**Recommendation:** keep both for now (the depth of `tools-vs-packages.md` warrants a separate page), but in a follow-up content PR add an explicit "see also" cross-link and ensure they don't contradict each other on classification.

### Observation 4 — `2ndgen_testing.md` is a stub that duplicates style-guide content

**File:** `01_contributor-guides/11_2ndgen_testing.md`.

**Content:** two sections — "Overview" and "Where to put tests". Approximately 30 lines.

**Concern:** the file is so thin it's not pulling its weight, and its content overlaps with `02_style-guide/04_testing/01_testing-overview.md`. Maintaining two files with similar scope guarantees drift.

**Recommendation:** the structural reorganization plan handles this by **merging** the contents into `for-contributors/style-guide/testing/testing-overview.md` (instead of moving the file as its own page). The merge is performed under strict constraints (mirrored from the plan):

- Every paragraph, list item, code block, and section from `11_2ndgen_testing.md` is copy-pasted **verbatim** into `testing-overview.md`. No content is rewritten, paraphrased, summarized, or removed.
- Reorganization is permitted only at the block/section level — rearranging existing chunks within `testing-overview.md` for a sensible read order.
- Any contradictions, duplications, or scope-overlap that surface once both bodies of content are in the same file are **noted, not edited**. They become a follow-up content PR tracked from this audit.

### Observation 5 — Numeric prefixes inside `project-planning/` are ordering-significant

**Files:** `project-planning/01_objectives-and-strategy.md`, `02_workstreams/`, `03_components/`, `04_milestones/`, `05_strategies/`, plus prefixes inside `02_workstreams/` (the five workstream subfolders are numbered 01–05).

**Observation:** unlike the contributor-guides and style-guide trees (where numeric prefixes were used purely for alphabetical sidebar ordering), the project-planning prefixes encode strategic priority/dependency order for maintainers reading the planning content. Dropping them would lose that signal.

**Decision baked into the structural plan:** preserve numeric prefixes inside `project-planning/` and its subtrees. Drop them everywhere else.

### Observation 6 — Multiple workstream READMEs are empty stubs

**Files:** every `03_project-planning/02_workstreams/[NN_workstream-name]/README.md` except `02_2nd-gen-component-migration/README.md` has only the auto-generated breadcrumbs + TOC, no human-written intro.

Also: `03_project-planning/04_milestones/README.md` has a single H2 ("Barebones") and no content.

**Concern:** Empty README files generate empty Storybook pages and broken-feeling navigation.

**Recommendation:** in a follow-up PR, either populate these READMEs with a 1–2 paragraph "what this workstream covers / who is leading / current status" intro, or remove them (and have the parent workstreams README link directly to the meaningful child files).

### Observation 7 — `04_milestones/` may not have current value

**File:** `03_project-planning/04_milestones/README.md` contains only "Barebones".

**Concern:** the milestones folder has not been populated since creation. Without content, it's a navigation dead-end.

**Recommendation:** in a follow-up PR, either fill in the milestones content (link to a current source-of-truth, even if external) or remove the folder. The structural reorganization plan preserves it as-is.

### Observation 8 — Most folder READMEs are shell-only (no intro)

**Files:** most `README.md` files in `CONTRIBUTOR-DOCS/` subfolders contain only the auto-generated breadcrumbs + TOC with no human-written intro paragraph above the TOC. Example: `02_style-guide/README.md`, `02_style-guide/01_css/README.md`, `02_style-guide/02_typescript/README.md`.

**Concern:** the audience reorganization moves these files into audience-named folders, but the lack of a "what this folder is for / who it's for" intro leaves the audience signal half-built.

**Recommendation:** in a follow-up PR, add a 2–4 sentence intro to each audience-folder README explaining the audience and what the folder contains. This is also a good moment to ensure the auto-generated TOC's link order matches the folder's actual reading order.

### Observation 9 — Filename typos that survived to `origin/main`

| File | Typo |
|---|---|
| `02_style-guide/04_testing/03_playwright-accessbility-testing.md` | `accessbility` → `accessibility` |
| `02_style-guide/04_testing/04_visual-regresssion-testing.md` | `regresssion` → `regression` |
| `02_style-guide/04_testing/08_running-tests..md` | `running-tests..md` → `running-tests.md` |
| `02_style-guide/04_testing/09_pr_review-checklist.md` | underscore should be hyphen |
| `01_contributor-guides/11_2ndgen_testing.md` | underscore should be hyphen (mooted by merge per Observation 4) |

**Decision baked into the structural plan:** these are all fixed during Phase 2 as `required` renames.

### Observation 10 — `12_tools-vs-packages.md` title doesn't match its scope

**File:** `01_contributor-guides/12_tools-vs-packages.md`.

**Concern:** the H2 list is `Overview | Decision process | 2nd-gen layout | Abstraction targets (2nd-gen) | Migration and deprecation for reclassified items | Deliverables (code, Storybook, docs)`. The doc is broader than a simple "tools vs packages" reference — it's effectively the contributor-facing guide for choosing where code lives in the 2nd-gen monorepo.

**Recommendation:** in a follow-up content PR, consider renaming to something like `where-code-lives.md` or `choosing-between-tools-and-packages.md` for clarity. The structural reorganization plan preserves the current filename to keep the rename surface contained.

### Observation 11 — Latent consumer-audience content inside `focus-management.md`

**File:** `CONTRIBUTOR-DOCS/for-contributors/focus-management.md` (after Phase 2's move).

**Concern:** the file is contributor-primary (how to implement focus correctly when authoring a 2nd-gen component) but contains content that's also valuable to consumers — how SWC components handle focus when integrated into a complex application (focus traps in modals, focus restoration, keyboard navigation contracts across composed components). Today both audiences read the same doc, which is heavy with mixin internals (`DisabledMixin`, `FocusgroupNavigationController`) that consumers don't need.

**Recommendation:** in a follow-up content PR, split the file. The contributor-facing implementation guide stays where it is. A new consumer-facing companion at `.storybook/docs/learn/focus-management.mdx` covers what consumers need to know about SWC's focus behavior without diving into mixin internals. Cross-link explicitly. This observation also appears in the [storybook residency audit](./audience-based-docs-storybook-residency-audit.md) since the consumer-facing companion would live in the `.storybook/docs/` tree.

**Not addressed in the structural PR.** The file moves intact during Phase 2 of the reorganization plan.

## Cross-reference

The structural reorganization plan ([audience-based-docs-reorganization-plan.md](./audience-based-docs-reorganization-plan.md)) implements every **(required)** and **(audience)** rename above, plus the merge in Observation 4. The **(clarity)** renames are also folded into the same PR because they improve the destination paths' readability and have no content cost.

The [storybook residency audit](./audience-based-docs-storybook-residency-audit.md) is the sibling artifact that handles the same questions for `.storybook/`-resident MDX files.

Every **Observation** above is out of scope for the structural PR and tracked here for follow-up content PRs.
