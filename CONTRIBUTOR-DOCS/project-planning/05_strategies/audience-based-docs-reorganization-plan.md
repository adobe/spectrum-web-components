<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Audience-based docs reorganization plan

<!-- Document title (editable) -->

# Audience-based docs reorganization plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Goal](#goal)
- [Why this work matters](#why-this-work-matters)
- [Guiding principles](#guiding-principles)
- [Scope](#scope)
    - [In scope](#in-scope)
    - [Out of scope](#out-of-scope)
- [End state](#end-state)
    - [`CONTRIBUTOR-DOCS/` tree (GitHub-primary SSOTs)](#contributor-docs-tree-github-primary-ssots)
    - [`.storybook/` tree (Storybook-primary SSOTs + Storybook config)](#storybook-tree-storybook-primary-ssots--storybook-config)
    - [Storybook sidebar end state](#storybook-sidebar-end-state)
- [Phases](#phases)
    - [Phase 1 — Branch setup](#phase-1--branch-setup)
    - [Phase 2 — Restructure `CONTRIBUTOR-DOCS/` into audience folders](#phase-2--restructure-contributor-docs-into-audience-folders)
    - [Phase 3 — Update path references in supporting files](#phase-3--update-path-references-in-supporting-files)
    - [Phase 4 — Storybook persona-first sidebar IA (titlePrefix renames + gating)](#phase-4--storybook-persona-first-sidebar-ia-titleprefix-renames--gating)
    - [Phase 5 — Storybook directory reorganization](#phase-5--storybook-directory-reorganization)
    - [Phase 6 — SSOT generator updates (selective + gated)](#phase-6--ssot-generator-updates-selective--gated)
    - [Phase 7 — Consumer landing page](#phase-7--consumer-landing-page)
    - [Phase 8 — Customization cheatsheet](#phase-8--customization-cheatsheet)
    - [Phase 9 — Component status matrix](#phase-9--component-status-matrix)
    - [Phase 10 — Project-fit decision guide ("When to use SWC")](#phase-10--project-fit-decision-guide-when-to-use-swc)
    - [Phase 11 — Validate](#phase-11--validate)
    - [Phase 12 — Commit & PR](#phase-12--commit--pr)
    - [Phase 13 — Deferred: `for-contributors/focus-management.md` review](#phase-13--deferred-for-contributorsfocus-managementmd-review)
- [Resolved decisions](#resolved-decisions)

</details>

<!-- Document content (editable) -->

> **Approval gate.** This plan is not approved for execution until the human says so explicitly. Do not run renames, edits, scripts, or commits before approval. After approval, every phase has its own review gate — the agent stages the work, the human reviews, and the human approves before a commit lands. No autonomous commits.

## Goal

Restructure Spectrum Web Components (2nd-gen) documentation so every reader — consumer, contributor, maintainer — has a clear path from "I am this kind of person and need this" to the docs they need. Replace the current mix of numerically-prefixed contributor folders and a topic-mixed Storybook sidebar with an audience-first information architecture that holds in both `CONTRIBUTOR-DOCS/` (GitHub view) and Storybook (the production-facing view), generated from a single source.

## Why this work matters

The codebase already has the doc infrastructure — `CONTRIBUTOR-DOCS/` (100+ MD files), a Storybook with a `DocumentTemplate.mdx` that auto-renders sections from story tags, a CEM pipeline, an `.ai/rules/` system, and CI validation — but its surface is fragmented across overlapping trees, authored in mixed formats, and **no reader has a clean entry point**. Four concrete symptoms:

1. **No consumer landing.** `/2nd-gen/README.md` is 25 lines and points back to `CONTRIBUTOR-DOCS/`. A developer who wants to use `<swc-button>` in their app has nowhere to land.
2. **Duplicate trees that drift.** Contributor docs live in both `CONTRIBUTOR-DOCS/*.md` and `2nd-gen/packages/swc/.storybook/contributor-docs/*.mdx`, synced by hand. Every edit on one side that misses the other puts the two surfaces out of sync.
3. **Information architecture mixes audiences.** `CONTRIBUTOR-DOCS/01_contributor-guides/`, `02_style-guide/`, `03_project-planning/` lump consumer-relevant, contributor-relevant, and maintainer-relevant docs at the same level. Storybook's sidebar has five titlePrefixes (`Components`, `Core`, `Learn about SWC`, `Guides`, `Contributor docs`) without a persona hierarchy.
4. **Reference content has nowhere to live.** Quick-reference content (component status, customization recipes) currently either doesn't exist or is buried inside multi-page authoring guides that nobody reads end-to-end.

## Guiding principles

- **Persona-first IA.** Every top-level entry answers "who are you and what do you need?" before "what do we want to tell you?"
- **One source, many deliveries.** Write each piece of content in one location; transform to other surfaces (Storybook, GitHub readers, npm README) at build time. Never hand-sync two copies.
- **Visual > prose.** Where a table, decision tree, or live example will do, use it. Reserve prose for *why*.
- **Delete before you add.** Every phase either removes a duplication, replaces a stale surface, or earns the addition by displacing prose with structure.

## Scope

### In scope

- **Audience-aware SSOT split** (see [storybook residency audit](./audience-based-docs-storybook-residency-audit.md)):
  - GitHub-primary audiences (contributors, maintainers, planning) → MD SSOTs in `CONTRIBUTOR-DOCS/` (with auto-generated Storybook mirror, gated to dev builds)
  - Storybook-primary audiences (consumers, designers, evaluators) → MDX SSOTs in `.storybook/docs/` (no auto-mirror; CONTRIBUTOR-DOCS holds only thin landing/index)
- Reorganize `CONTRIBUTOR-DOCS/` into audience-first folders (`for-consumers/`, `for-contributors/`, `for-maintainers/`, `project-planning/`, `reference/`). Per-file destinations are locked in the [content audit](./audience-based-docs-content-audit.md).
- Rewire Storybook's sidebar into a persona-first IA (`Get started`, `Components`, `Patterns`, `Learn`, `Reference`, `Contribute`). **The entire `Contribute` subtree (contributor guides, style guide, releasing, project planning) is gated to dev builds** — production Storybook ships only the consumer-facing surface.
- Reorganize `.storybook/` so all docs live under a single `.storybook/docs/` parent (`get-started/`, `learn/`, `reference/`, `contribute/`). Existing top-level `learn-about-swc/` and `guides/` doc directories retire. Per-file destinations are locked in the [storybook residency audit](./audience-based-docs-storybook-residency-audit.md).
- Extend the SSOT generator (`generate-contributor-docs.mjs`) to emit `CONTRIBUTOR-DOCS/for-contributors/`, `for-maintainers/`, and `project-planning/` into `.storybook/docs/contribute/`, gated to dev builds.
- Create a consumer landing page in `.storybook/docs/get-started/` (MDX SSOT with live `<swc-badge>` demo); `2nd-gen/README.md` becomes a thin pointer to the Storybook URL.
- Add a customization cheatsheet as the first page of the `Customization` section in `.storybook/docs/learn/customization/cheatsheet.mdx`. **Does not replace** the existing 5 long-form customization docs; sits alongside them as a quick-reference companion.
- Add a component status matrix at `.storybook/docs/reference/component-status.mdx` (MDX SSOT). Reads overrides from `CONTRIBUTOR-DOCS/reference/component-status.data.yml`. Renders each row with a live `<swc-badge>` reflecting status — the matrix demos itself.
- Restructure the `When to use SWC` project-fit guide from accordion prose into a scannable decision flow.
- Update all path references in supporting files (`.ai/` rules and skills, `AGENTS.md`, `PULL_REQUEST_TEMPLATE.md`, root readmes, build configs) so they point at the new audience locations.

### Out of scope

- **Changes to how individual components are documented.** No shifts of descriptions, subtitles, or prose between stories and source files. No JSDoc rewrites on component classes. No story restructuring. **Permitted exception:** Phase 4's titlePrefix renames force ~11 outbound-link updates across 6 component-dir files (typography stories, button stories, status-light stories, progress-circle stories, badge stories, button consumer-migration-guide) — these are mechanical path swaps with no content change, forced by the Storybook IA shift.
- **Content edits to contributor docs themselves.** The 11 observations captured in the [content audit](./audience-based-docs-content-audit.md) and the [storybook residency audit](./audience-based-docs-storybook-residency-audit.md) — duplicate-home cleanups, stub READMEs, scope-sharpening for a11y testing docs, the migration step-by-step relocation question, `04_milestones/` content, `tools-vs-packages.md` rename, the latent consumer chunk in `focus-management.md` — are explicitly **out of scope for this PR**. They each become their own follow-up content PR after the structural change lands.
- Component implementation, tests, CSS — untouched.
- New CEM tags or block-library extensions — separate concern, future work.
- RFC structure (organizing docs by status: accepted / proposed) — orthogonal to audience reorg, future work.

## End state

### `CONTRIBUTOR-DOCS/` tree (GitHub-primary SSOTs)

```
CONTRIBUTOR-DOCS/
├── README.md                              ← root index, audience-organized
├── for-consumers/                         ← small folder; rich consumer content lives in .storybook/docs/
│   ├── README.md                          ← audience landing page; links out to the Storybook URLs
│   └── using-the-issue-tracker.md         ← process workflow; MD-friendly
├── for-contributors/                      ← full SSOT; MD; mirrored to Storybook (gated to dev)
│   ├── README.md
│   ├── authoring-contributor-docs/
│   │   ├── README.md
│   │   ├── update-nav.js
│   │   ├── verify-links.js
│   │   ├── writing-migration-guides.md
│   │   └── templates/
│   │       └── consumer-quickstart.md
│   ├── focus-management.md
│   ├── getting-involved.md
│   ├── maintaining-stackblitz-examples.md
│   ├── making-a-pull-request.md
│   ├── patching-dependencies.md
│   ├── reviewing-pull-requests.md
│   ├── running-accessibility-tests.md
│   ├── style-guide/
│   │   ├── README.md
│   │   ├── css/
│   │   ├── linting-tools.md
│   │   ├── testing/
│   │   └── typescript/
│   ├── tools-vs-packages.md
│   └── working-in-the-swc-repo.md
├── for-maintainers/
│   └── releasing-swc.md
├── project-planning/                      ← internal/strategic; numeric prefixes preserved
│   ├── README.md
│   ├── 01_objectives-and-strategy.md
│   ├── 02_workstreams/
│   ├── 03_components/
│   ├── 04_milestones/
│   └── 05_strategies/
│       ├── audience-based-docs-reorganization-plan.md       ← this document
│       ├── audience-based-docs-content-audit.md             ← sibling content audit
│       ├── audience-based-docs-storybook-residency-audit.md ← sibling residency audit
│       └── focus-management-strategy-rfc.md
└── reference/
    └── component-status.data.yml          ← overrides only; consumed by the MDX page in .storybook/
```

### `.storybook/` tree (Storybook-primary SSOTs + Storybook config)

```
2nd-gen/packages/swc/.storybook/
├── DocumentTemplate.mdx                   ← Storybook component-docs template (infra)
├── main.ts, preview.ts, ...               ← Storybook config (infra)
├── addons/, blocks/, decorators/, helpers/, intl/, loaders/, scripts/, utils/, assets/
│                                          ← infra (unchanged top-level directories)
└── docs/                                  ← ALL doc routing lives here
    ├── get-started/
    │   └── index.mdx                      ← consumer welcome with live <swc-badge>
    ├── learn/
    │   ├── about-swc.mdx
    │   ├── first-gen-vs-second-gen.mdx
    │   ├── when-to-use-swc.mdx
    │   ├── customization/
    │   │   ├── cheatsheet.mdx             ← NEW (Phase 8); first child of Customization
    │   │   ├── getting-started.mdx
    │   │   ├── component-styles.mdx
    │   │   ├── fonts.mdx
    │   │   ├── global-elements.mdx
    │   │   └── theme-scales.mdx
    │   └── accessibility/
    │       ├── overview.mdx
    │       ├── semantic-html-and-aria.mdx
    │       ├── keyboard-testing.mdx
    │       ├── screen-reader-testing.mdx
    │       ├── wave-toolbar-testing.mdx
    │       ├── headings-and-landmarks.mdx
    │       ├── accessible-pattern-libraries.mdx
    │       └── resources.mdx
    ├── reference/
    │   ├── component-status.mdx           ← live <swc-badge> per row; reads .data.yml
    │   ├── design-tokens.mdx              ← future placeholder
    │   └── core-package.mdx               ← surfaces 2nd-gen/packages/core/overview.mdx
    └── contribute/                        ← AUTO-GENERATED from CONTRIBUTOR-DOCS; gated to dev builds
        ├── for-contributors/
        ├── for-maintainers/
        └── project-planning/
```

### Storybook sidebar end state

**Production build (`yarn build-storybook`):**

```
Get started
   · Welcome (live <swc-badge> demo)
Components
   · (all migrated component stories)
Patterns
   · (cross-component patterns)
Learn
   · About SWC
   · 1st-gen vs 2nd-gen
   · When to use SWC
   · Customization
        · Cheatsheet
        · Getting started
        · Component styles
        · Fonts
        · Global elements
        · Theme and scales
   · Accessibility
        · Overview
        · Semantic HTML & ARIA
        · Keyboard testing
        · Screen reader testing
        · Wave toolbar testing
        · Headings & landmarks
        · Accessible pattern libraries
        · Resources
Reference
   · Component status         (live <swc-badge>s)
   · Design tokens             (future)
   · Core package
```

**Dev build (`yarn dev`):** everything above **plus** the gated `Contribute` subtree:

```
Contribute                                    ← gated to storybookMode !== 'build'
   · Contributor guides
        · Getting involved
        · Working in the SWC repo
        · Making a pull request
        · Reviewing pull requests
        · Running accessibility tests
        · Maintaining StackBlitz examples
        · Patching dependencies
        · Tools vs packages
        · Focus management
        · Authoring contributor docs
   · Style guide
        · CSS, TypeScript, Testing, Linting tools
   · Releasing SWC
   · Project planning
        · (strategic/coordination content)
```

**Rationale for gating:** contributors are comfortable in code. When they need a contributor doc, they're either browsing GitHub, running `yarn dev` locally, or using AI retrieval against the MD source. They don't need the public Storybook to serve `/docs/contribute-*` routes. Gating keeps the production surface clean for consumers/designers/evaluators while preserving full visibility for contributors working locally.

---

## Phases

### Phase 1 — Branch setup

**The human creates the branch.** Before any other phase begins, you create `caseyisonit/docs-audience-reorg` from current `origin/main` and push it (so it appears in Cursor and remote tooling immediately). The agent confirms it's on the right branch before doing anything else.

### Phase 2 — Restructure `CONTRIBUTOR-DOCS/` into audience folders

Three parts: 2a (file moves), 2b (intra-doc link rewrites + empty-dir cleanup), 2c (root README rewrite). All three commit together so the working tree is never left with broken links.

**Every file's destination is locked in the [content audit](./audience-based-docs-content-audit.md).** The audit's "File-by-file destinations" tables are the authoritative rename map. The audit also identifies one **content merge** (Observation 4: `01_contributor-guides/11_2ndgen_testing.md` folds into `for-contributors/style-guide/testing/testing-overview.md` instead of moving as its own file) and the renaming categories applied:

- **(required)** — fixes a typo, double-dot, or underscore-vs-hyphen inconsistency
- **(audience)** — forced by moving into an audience folder
- **(clarity)** — destination name reads more clearly than the source

**2a. File moves.**

Following the audit's destination tables:

- `01_contributor-guides/*` → `for-contributors/*` (with two exceptions, both flagged in the audit)
  - `02_using-the-issue-tracker.md` → `for-consumers/using-the-issue-tracker.md` (audit: this is consumer territory)
  - `06_releasing-swc.md` → `for-maintainers/releasing-swc.md` (audit: only maintainer-only doc; seeds `for-maintainers/`)
- `01_contributor-guides/13_writing-migration-guides.md` → `for-contributors/authoring-contributor-docs/writing-migration-guides.md` (audit: meta-doc belongs with the other authoring meta-docs)
- `02_style-guide/*` → `for-contributors/style-guide/*` (top-level numeric prefixes stripped throughout this subtree)
- `03_project-planning/*` → `project-planning/*` (numeric prefixes preserved inside — see audit Observation 5)
- The single merge: `01_contributor-guides/11_2ndgen_testing.md` contents fold into `for-contributors/style-guide/testing/testing-overview.md`; the source file is deleted. **Merge constraints (strict):**
  - Every paragraph, list item, code block, and section from `11_2ndgen_testing.md` is copy-pasted verbatim into `testing-overview.md`. No content is rewritten, paraphrased, summarized, or removed — not even to fix a small phrasing inconsistency.
  - Reorganization is permitted **only at the block/section level**: rearranging existing chunks within `testing-overview.md` to make a sensible read order for the contributor audience.
  - If the merge surfaces something that reads as contradictory or duplicative when read end-to-end, that conflict is noted in a follow-up content PR (linked from the audit) and left untouched here.

Numeric prefix policy:
- **Drop NN_ prefixes** inside `for-contributors/`, `for-consumers/`, `for-maintainers/`, `reference/`, and inside `for-contributors/style-guide/`
- **Preserve NN_ prefixes** inside `project-planning/` and its subtrees (they encode strategic priority order)

Required typo fixes (all in `for-contributors/style-guide/testing/`):
- `03_playwright-accessbility-testing.md` → `playwright-accessibility-testing.md`
- `04_visual-regresssion-testing.md` → `visual-regression-testing.md`
- `08_running-tests..md` → `running-tests.md`
- `09_pr_review-checklist.md` → `pr-review-checklist.md`

Clarity renames (audit-approved):
- `05_participating-in-pr-reviews.md` → `reviewing-pull-requests.md`
- `09_accessibility-testing.md` → `running-accessibility-tests.md` (pairs with style-guide's `playwright-accessibility-testing.md`)
- `10_using-stackblitz.md` → `maintaining-stackblitz-examples.md`

**2b. Intra-doc link rewrites + empty-dir cleanup.**

After the file moves, ~157 internal markdown links across the moved files still point at the old `01_*/`, `02_*/`, `03_*/` paths. Also, files under `02_style-guide/*` move from depth 3 to depth 4 inside `CONTRIBUTOR-DOCS/`, which means any outbound `../../../2nd-gen/...` paths from those files need an extra `../`.

Mechanically:
- Run an audit-aware link rewriter that, for each moved file, resolves every relative link against the file's OLD location, finds the target's NEW location via the rename map, and writes a new relative link from the file's NEW location to the target's NEW location.
- Delete empty old directories left after `git mv` (`01_contributor-guides/`, `02_style-guide/01_css/`, etc.) — these otherwise pollute the auto-generated TOCs.

Verification gate: `node CONTRIBUTOR-DOCS/for-contributors/authoring-contributor-docs/update-nav.js` must finish with `✅ All links valid!` before this phase is staged for review.

**2c. Root `CONTRIBUTOR-DOCS/README.md` rewrite.**

The root README's `Beneath this doc` block is auto-regenerated by `update-nav.js` against the new audience tree. The intro and `About these docs` sections (above the TOC and below the markers) are hand-edited to:

- Replace references to `01_contributor-guides/`, `02_style-guide/`, `03_project-planning/` paths with the new audience-folder paths
- Reframe `About these docs` around the audiences (For consumers / For contributors / For maintainers / Project planning) instead of the old topic groupings

No new audience-folder index READMEs are created in this phase — the existing READMEs (formerly `01_contributor-guides/README.md`, etc.) come along via rename and are auto-regenerated by `update-nav.js`. Adding human-written intros to those READMEs is a follow-up content PR (audit Observation 8).

**2b. Add audience-folder index READMEs (5 new files).**

Each is a short index page listing the children in its folder with one-line descriptions. The intent is to make every audience folder navigable on GitHub without relying on file alphabetization.

- `CONTRIBUTOR-DOCS/for-contributors/README.md`
- `CONTRIBUTOR-DOCS/for-contributors/style-guide/README.md`
- `CONTRIBUTOR-DOCS/for-contributors/style-guide/css/README.md`
- `CONTRIBUTOR-DOCS/for-contributors/style-guide/testing/testing-overview.md`
- `CONTRIBUTOR-DOCS/for-contributors/style-guide/typescript/README.md`

Each follows this shape:

```markdown
# <Folder title>

<1–2 sentence overview of what this folder contains and who it's for>

## In this folder

- [Page title](page-slug.md) — One-line description
- [Subfolder name](subfolder/README.md) — One-line description
```

**2c. Rewrite root `CONTRIBUTOR-DOCS/README.md`.**

Replace the existing root readme with an audience-organized index that lists each audience folder, its children, and one-line descriptions. No prose beyond a short intro framing the four audiences.

### Phase 3 — Update path references in supporting files

Mechanical pass: every file in the repo that references `CONTRIBUTOR-DOCS/0X_*/` paths must be updated to reference the new audience locations. No content changes, just path swaps.

Files that need path-reference updates (verified against current `origin/main`):

- `.ai/README.md`
- `.ai/rules/contributor-doc-update.md`
- `.ai/rules/github-description.md`
- `.ai/rules/storybook-mdx-conversion.md`
- `.ai/rules/styles.md`
- `.ai/skills/accessibility-migration-analysis/SKILL.md`
- `.ai/skills/component-migration-analysis/SKILL.md`
- `.ai/skills/component-migration-analysis/references/migration-analysis-prompt.md`
- `.ai/skills/consumer-migration-guide/SKILL.md`
- `.ai/skills/consumer-migration-guide/references/consumer-migration-guide-prompt.md`
- `.ai/skills/contributor-docs-nav/SKILL.md`
- `.ai/skills/contributor-docs-nav/references/ai-agent-instructions.md`
- `.ai/skills/migration-a11y/SKILL.md`
- `.ai/skills/migration-api/SKILL.md`
- `.ai/skills/migration-documentation/SKILL.md`
- `.ai/skills/migration-prep/SKILL.md`
- `.ai/skills/migration-review/SKILL.md`
- `.ai/skills/migration-setup/SKILL.md`
- `.ai/skills/migration-styling/SKILL.md`
- `.ai/skills/migration-testing/SKILL.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.husky/pre-commit`
- `1st-gen/AGENTS.md`
- `2nd-gen/AGENTS.md`

Search-and-replace patterns (all lower-case, exact path segments):

| Old | New |
|---|---|
| `CONTRIBUTOR-DOCS/01_contributor-guides/` | `CONTRIBUTOR-DOCS/for-contributors/` |
| `CONTRIBUTOR-DOCS/01_contributor-guides/07_authoring-contributor-docs/` | `CONTRIBUTOR-DOCS/for-contributors/authoring-contributor-docs/` |
| `CONTRIBUTOR-DOCS/02_style-guide/` | `CONTRIBUTOR-DOCS/for-contributors/style-guide/` |
| `CONTRIBUTOR-DOCS/03_project-planning/` | `CONTRIBUTOR-DOCS/project-planning/` |

Additionally, any per-file numeric prefixes inside the contributor-guides or style-guide subtrees must be stripped from references (e.g. `01_getting-involved.md` → `getting-involved.md`).

Update `.gitignore` to ignore the generated Storybook MDX paths added in Phase 6:

```
# Generated by 2nd-gen/packages/swc/.storybook/scripts/generate-contributor-docs.mjs
2nd-gen/packages/swc/.storybook/docs/contribute/
```

(Only `contribute/` under `.storybook/docs/` is generated. The rest of `.storybook/docs/` — `get-started/`, `learn/`, `reference/` — is hand-authored MDX, checked into git.)

### Phase 4 — Storybook persona-first sidebar IA (titlePrefix renames + gating)

**Phase 4 changes the sidebar architecture at the Storybook config level only.** No files move yet (Phase 5 does the physical reorganization). Outbound component-dir links break when titlePrefixes change and get updated in this same commit.

**4a. `2nd-gen/packages/swc/.storybook/main.ts`.**

Refactor `stories[]` so:

- Current `Learn about SWC` titlePrefix (on `learn-about-swc/`) becomes `Learn`
- Current `Guides` titlePrefix (on `guides/`) becomes `Learn` (consolidating into the same persona section)
- Current `Contributor docs` titlePrefix (on `contributor-docs/`) becomes `Contribute`
- Current `Core` titlePrefix stays `Core` for now; Phase 9's component-status work establishes `Reference` properly when it lands
- New `Get started` titlePrefix added pointing at `get-started/` (the directory exists but is empty until Phase 7 lands content)
- The entire `Contribute` titlePrefix block (rendered from `.storybook/contributor-docs/`) is wrapped in a `storybookMode !== 'build'` gate so production Storybook does not ship contributor content

After Phase 5's directory restructure, the `directory` paths in this config will get a follow-up update to point at the new `.storybook/docs/` tree. This phase only changes the titlePrefix labels.

**4b. `2nd-gen/packages/swc/.storybook/preview.ts`.**

Update `parameters.options.storySort.order` to put `Get started` first and reflect the new persona-first top-level order:

```ts
order: [
  'Get started',
  'Components',
  // … existing component ordering preserved …
  'Patterns',
  'Learn',
  [
    'Overview',
    'About SWC',
    '1st-gen vs 2nd-gen',
    'When to use SWC',
    'Customization',
    'Accessibility',
    'Framework integrations',
  ],
  'Reference',
  [
    'Component status',
    'Design tokens',
    'Core package',
  ],
  'Contribute',
  [
    // generated subtree; ordering managed by the SSOT generator between marker comments
  ],
],
```

**4c. Outbound-link updates inside `2nd-gen/packages/swc/components/`.**

The titlePrefix renames change Storybook route prefixes. Component-dir files that link to those routes break. Update them as part of this commit (mechanical path swaps, no content/structure change):

| File | Affected links | Change |
|---|---|---|
| `typography/stories/typography.stories.ts` | 1 | `/docs/guides-customization-fonts--readme` → `/docs/learn-customization-fonts--readme` |
| `status-light/stories/status-light.stories.ts` | 2 | `/docs/guides-customization-fonts--readme` and `/docs/guides-accessibility-guides-screen-reader-testing--readme` → `/docs/learn-customization-fonts--readme` and `/docs/learn-accessibility-screen-reader-testing--readme` |
| `progress-circle/stories/progress-circle.stories.ts` | 1 | `/docs/guides-accessibility-guides-screen-reader-testing--readme` → `/docs/learn-accessibility-screen-reader-testing--readme` |
| `badge/stories/badge.stories.ts` | 1 | same accessibility-guides redirect |
| `button/stories/button.stories.ts` | 4 | `/docs/guides-customization-global-element-styling--readme` → `/docs/learn-customization-global-elements--readme` (note: also picks up the `global-elements` filename hygiene from Phase 5) |
| `button/consumer-migration-guide.mdx` | 2 | same global-elements redirect |

Total: 11 link updates across 6 files. These are the only `components/` diffs in the entire reorganization PR. No prose, JSDoc, or story shape changes.

**4d. Cross-link updates inside `.storybook/` MDX files.**

Within `.storybook/learn-about-swc/` and `.storybook/guides/`, MDX files cross-link to each other via the old `/docs/learn-about-swc-*` and `/docs/guides-*` route prefixes. Update all such cross-links to use the new `Learn` route prefix. No file moves in this phase — only outbound-link rewrites.

### Phase 5 — Storybook directory reorganization

Physically move the 16 hand-authored MDX doc files from `.storybook/learn-about-swc/` and `.storybook/guides/` into the new `.storybook/docs/learn/` tree, per the destinations locked in the [storybook residency audit](./audience-based-docs-storybook-residency-audit.md).

**5a. Create the new layout.**

```
.storybook/
└── docs/
    ├── get-started/       (placeholder — empty until Phase 7)
    ├── learn/
    │   ├── about-swc.mdx
    │   ├── first-gen-vs-second-gen.mdx
    │   ├── when-to-use-swc.mdx
    │   ├── customization/
    │   │   ├── getting-started.mdx
    │   │   ├── component-styles.mdx
    │   │   ├── fonts.mdx
    │   │   ├── global-elements.mdx
    │   │   └── theme-scales.mdx
    │   └── accessibility/
    │       ├── overview.mdx
    │       ├── semantic-html-and-aria.mdx
    │       ├── keyboard-testing.mdx
    │       ├── screen-reader-testing.mdx
    │       ├── wave-toolbar-testing.mdx
    │       ├── headings-and-landmarks.mdx
    │       ├── accessible-pattern-libraries.mdx
    │       └── resources.mdx
    └── reference/         (placeholder — populated in Phase 9 for component-status; design-tokens / core-package may stay empty for now)
```

Filename hygiene during the move:

- Underscores in filenames become hyphens (`semantic_html_aria.mdx` → `semantic-html-and-aria.mdx`, etc.)
- `accessibility-guides/accessibility_resources.mdx` → `accessibility/resources.mdx` (redundant prefix dropped)
- `learn-about-swc/overview.mdx` → `learn/about-swc.mdx` (renamed to make sidebar title less generic)

**5b. Update `<Meta title="..." />` blocks in each moved file.**

The `<Meta title="..." />` inside each MDX determines the sidebar title segment under the `Learn` titlePrefix. Verify each moved file has a title matching the new IA:

- `learn/about-swc.mdx` → `<Meta title="About SWC" />`
- `learn/first-gen-vs-second-gen.mdx` → `<Meta title="1st-gen vs 2nd-gen" />`
- `learn/when-to-use-swc.mdx` → `<Meta title="When to use SWC" />`
- `learn/customization/<slug>.mdx` → `<Meta title="Customization/<Page>" />`
- `learn/accessibility/<slug>.mdx` → `<Meta title="Accessibility/<Page>" />`

**5c. Update `main.ts` `directory` paths.**

Refactor the `stories[]` entries created in Phase 4 to point at the new `.storybook/docs/...` directories. Retire the entries pointing at `learn-about-swc/` and `guides/`.

**5d. Delete the now-empty old directories.**

`.storybook/learn-about-swc/` and `.storybook/guides/` should be empty after the moves. Remove them.

**5e. Verify routes.**

The titlePrefix is `Learn` (set in Phase 4). The `<Meta title="..." />` strings from 5b set the sub-segment. Routes:

- `learn/about-swc.mdx` → `/docs/learn-about-swc--<meta-or-readme>`
- `learn/customization/fonts.mdx` → `/docs/learn-customization-fonts--<meta-or-readme>`
- `learn/accessibility/screen-reader-testing.mdx` → `/docs/learn-accessibility-screen-reader-testing--<meta-or-readme>`

These match the outbound-link targets updated in Phase 4c. Confirm Storybook builds and the routes resolve.

### Phase 6 — SSOT generator updates (selective + gated)

Update `2nd-gen/packages/swc/.storybook/scripts/generate-contributor-docs.mjs` so it:

1. Walks **only** the GitHub-primary audience folders inside `CONTRIBUTOR-DOCS/`:
   - `for-contributors/`
   - `for-maintainers/`
   - `project-planning/`
2. Does **not** walk `for-consumers/` or `reference/` (those have MDX SSOTs in `.storybook/docs/`)
3. Emits to `.storybook/docs/contribute/` (not the old `.storybook/contributor-docs/`)
4. Preserves the audience folder structure under `contribute/`:
   ```
   .storybook/docs/contribute/
   ├── for-contributors/
   ├── for-maintainers/
   └── project-planning/
   ```
5. Sets a `Contribute` titlePrefix-derived title for each emitted MDX (paths produce `/docs/contribute-for-contributors-*`, etc.)
6. Strips breadcrumbs + TOCs (existing behavior)
7. Rewrites intra-tree `.md` links to Storybook `/docs/contribute-...` paths (existing behavior, adapted to new output path)
8. Sanitizes HTML for MDX (existing behavior)

**Gating.** The whole `contribute/` output is gated to `storybookMode !== 'build'`. Two options:

- The generator only writes when invoked in dev mode (no-op in prod)
- main.ts gates the `directory: '.storybook/docs/contribute/'` block to dev mode (preferred — keeps the gate at the Storybook-config level where it's visible)

**Delete the old generated tree.** `.storybook/contributor-docs/` no longer exists after this phase. The `.gitignore` entry for it is replaced with one for `.storybook/docs/contribute/`.

**Rule update.** `.ai/rules/storybook-mdx-conversion.md` is rewritten to describe:

- The audience-aware SSOT model
- Which CONTRIBUTOR-DOCS folders are auto-generated to Storybook and which aren't
- The dev-only gating
- Hand-authored MDX in `.storybook/docs/` (do not edit auto-generated content; do edit hand-authored content)

### Phase 7 — Consumer landing page

**7a. Author `.storybook/docs/get-started/index.mdx`.**

MDX SSOT for the consumer welcome page. Includes a live `<swc-badge>` demo.

Required sections, in order:

1. **Welcome** (H1) + 1-sentence framing
2. **Install** — single code block, vanilla JavaScript only:
   - `yarn add @adobe/spectrum-wc`
   - Side-effectful import
   - Stylesheet link
3. **Your first component** — copy-paste working `<swc-badge>` example, rendered live via `<Canvas>` or inline MDX so consumers see the badge they're about to copy
4. **Framework note** — one line: React wrappers planned; no Vue/Svelte plans
5. **Where to go next** — four short cards or links:
   - Components — sidebar section
   - Customization — `Learn → Customization → Cheatsheet`
   - Accessibility — `Learn → Accessibility → Overview`
   - Contributing — link to GitHub repo (since `Contribute` isn't visible in production Storybook)

Keep the page under one screen of reading.

**7b. Update `2nd-gen/README.md`.**

Replace the existing 25-line stub with a short README that points at the Storybook URL for full onboarding, plus a minimal install snippet for readers who never leave GitHub. This is NOT a mirror of the Storybook content — it's an honest pointer.

**7c. Author the consumer-quickstart authoring template.**

Save the skeleton of `get-started/index.mdx` to `CONTRIBUTOR-DOCS/for-contributors/authoring-contributor-docs/templates/consumer-quickstart.md`. Required frontmatter, required sections, canonical heading names. Future consumer onboarding docs clone this.

**7d. Update `CONTRIBUTOR-DOCS/for-consumers/README.md`.**

Make the audience landing a short index pointing at the Storybook URLs for consumer content (`Get started`, `Learn → Customization → Cheatsheet`, etc.) plus the one MD file that lives in the folder (`using-the-issue-tracker.md`).

### Phase 8 — Customization cheatsheet

**8a. Author `.storybook/docs/learn/customization/cheatsheet.mdx`.**

A short-form scannable quick reference that **summarizes** the five long-form customization docs that follow it in the sidebar. Does **not** replace them.

Required content:

- **At a glance:** one-paragraph framing of what customization in 2nd-gen SWC means
- **Quick reference table:** what you'd customize (font, scale, custom property, global element, component style) → which long-form doc explains it → a 2-line example
- **Common one-liners:** the three or four most-asked-for customization snippets, copy-paste ready
- **Where to go next:** explicit links to the five long-form docs

The cheatsheet is the FIRST entry in the `Customization` section. The five existing long-form docs (`getting-started.mdx`, `component-styles.mdx`, `fonts.mdx`, `global-elements.mdx`, `theme-scales.mdx`) follow, **unchanged in scope or content**. They were moved to `.storybook/docs/learn/customization/` in Phase 5.

**Naming note.** Use "Customization" exclusively. The term "Theming" is 1st-gen vocabulary (no `<sp-theme>` context component in 2nd-gen) and should not appear in 2nd-gen consumer docs.

**8b. Storybook delivery.**

The cheatsheet renders at `Learn → Customization → Cheatsheet`. Direct URL: `/docs/learn-customization-cheatsheet--<meta-or-readme>`. Verify the storySort order places `Cheatsheet` first in the section.

### Phase 9 — Component status matrix

**9a. Author `.storybook/docs/reference/component-status.mdx`.**

MDX SSOT for the matrix. Imports `CONTRIBUTOR-DOCS/reference/component-status.data.yml` overrides and the CEM manifest, then renders a table where each row's status cell is a live `<swc-badge>`.

Columns:

| Column | Source |
|---|---|
| Component | CEM `tagName` |
| Status | CEM `@status` JSDoc tag → rendered as live `<swc-badge variant="...">{status}</swc-badge>` (positive for stable, notice for preview, etc.) |
| Since | CEM `@since` JSDoc tag |
| RSP 2 parity | YAML override (`partial` default) |
| Figma | YAML override (URL) |
| Stackblitz | YAML override (URL) |
| Notes | YAML override (free text) |

**Out of scope for this matrix:** sizes and variants. Those describe API shape and belong on each component's own Storybook page.

**Parity definition:** measured against React Spectrum 2, not against 1st-gen SWC. Default `partial`; overrides in the YAML.

**9b. Author `CONTRIBUTOR-DOCS/reference/component-status.data.yml`.**

```yaml
components:
  badge:
    parity: full
    figma: https://www.figma.com/...
    stackblitz: https://stackblitz.com/...
    notes: ''
defaults:
  parity: partial
  figma: ''
  stackblitz: ''
  notes: ''
```

The YAML lives in CONTRIBUTOR-DOCS so overrides are PR-discussable and git-reviewable. The MDX page imports it via Vite at build time.

**9c. Storybook delivery.**

Renders at `Reference → Component status`. Direct URL: `/docs/reference-component-status--<meta-or-readme>`. The matrix dogfoods the library — readers see live badges proving the components render.

### Phase 10 — Project-fit decision guide ("When to use SWC")

The MDX file at `.storybook/docs/learn/when-to-use-swc.mdx` (moved there in Phase 5) is a consumer-facing project-fit page. Currently accordion prose. Restructure into a scannable decision flow.

**Pattern:** convert each accordion into either a comparison table or a short decision tree (mermaid is fine). Keep the page focused on project-fit, not component-selection.

**Deliverable:** rewritten `when-to-use-swc.mdx` that a reader can scan in under 60 seconds and reach a yes/no/it-depends answer for their project.

### Phase 11 — Validate

The validation gate has three programmatic checks (hard fail) and two manual checks (eye-test). All five must pass before Phase 12 (commit + PR) starts.

**Programmatic gates (hard fail if any reports an error):**

```bash
# Gate 1 — CONTRIBUTOR-DOCS link integrity
node CONTRIBUTOR-DOCS/for-contributors/authoring-contributor-docs/update-nav.js
# expected: "✅ All links valid!"

# Gate 2 — Storybook auto-generated content emits cleanly
cd 2nd-gen/packages/swc && yarn generate:contributor-docs
# expected: "Generated N .mdx files in .storybook/docs/contribute" — no warnings about
# unresolvable links other than the known plan-template placeholders

# Gate 3 — Storybook DEV build starts AND indexes every page cleanly
cd 2nd-gen/packages/swc && yarn storybook
# Watch the startup output. The gate FAILS if any of these appear:
#   "🚨 Unable to index ./.storybook/..."   (MDX parse / JSX import error)
#   "Could not parse expression with acorn" (raw JSX comment or stray conflict marker)
#   "Cannot find module"                    (broken relative import — story / asset / data file)
#   "Module not found"                      (same)
#   "Custom element ... already defined"    (double-registration; usually fine but a smell)
# expected: "Storybook ready! - Local: http://localhost:6006/" with no 🚨 above it

# Gate 4 — Storybook PRODUCTION build succeeds AND ships only the consumer surface
cd 2nd-gen/packages/swc && yarn storybook:build
# Inspect storybook-static/index.json (or open the built site):
#   - The route prefixes /docs/contribute-* must be ABSENT
#   - The route prefixes /docs/core-* must be ABSENT
#   - The route prefixes /docs/get-started-*, /docs/learn-*, /docs/reference-*,
#     /docs/resources-*, /docs/components-* must all be PRESENT
# expected: production build completes; gated routes excluded
```

**Why each gate matters (lessons from this branch):**

- Gate 1 was the only check we ran for most of the build; it catches CONTRIBUTOR-DOCS link rot but says nothing about Storybook's MDX layer.
- Gate 2 catches generator regressions (wrong output path, missing folder, malformed MDX emission).
- Gate 3 catches every class of breakage that bit us during the merge with main:
  - Stale conflict markers that slip past the standard 7-char grep (rename/rename conflicts use 8-char markers)
  - Broken relative imports in MDX (depth-shifted `../assets/` or `../../../components/` paths)
  - Imports of files that don't define what they used to (e.g. `components/badge/index.js` no longer registers `<swc-badge>` after the per-element side-effect refactor in #6273 — must import `swc-badge.js` for registration)
  - JSX/MDX syntax errors in hand-authored content
  Storybook reports each as `🚨 Unable to index ./.storybook/...`. **One such message = gate failure.**
- Gate 4 catches the consumer-surface contract (Contribute and Core must be hidden from the public site).

**Manual smoke test in `yarn dev` (after Gate 3 passes):**

- `Get started` is first in the sidebar with the consumer landing page rendered and the live `<swc-badge>` visible (proves runtime element registration + asset imports work)
- `Components` ordering is unchanged from current main
- `Learn → Customization → Cheat sheet` is the first child, followed by the five long-form docs (Getting started, Component styles, Fonts, Global elements, Theme and scales)
- `Learn → Accessibility → Cheat sheet` is the first child, followed by the eight long-form docs
- `Learn → Customization → Fonts` (or wherever the typography story's link points) resolves; the typography story page loads
- Button stories' `/docs/learn-customization-global-elements--docs` links resolve
- `Reference → Component status` shows the matrix with **live `<swc-badge>` per row** (proves the matrix's custom-element registration works — this specifically caught us mid-merge when the badge import broke)
- `Resources → Migrate from Gen1` (and siblings) render
- `Contribute` section is visible in dev with `For contributors`, `For maintainers`, `Project planning` subtrees

**Manual smoke test in `yarn storybook:build` output (after Gate 4 passes):**

- `Contribute` section is **absent** from the built Storybook output
- `Core` is **absent** from the built Storybook output
- All consumer-facing routes still resolve in the built site

**Scope check (last):**

```bash
git diff --name-only origin/main..HEAD \
  | grep -E "^2nd-gen/packages/(swc|core)/components/" \
  | grep -v "components/typography/stories/typography.stories.ts" \
  | grep -v "components/status-light/stories/status-light.stories.ts" \
  | grep -v "components/progress-circle/stories/progress-circle.stories.ts" \
  | grep -v "components/badge/stories/badge.stories.ts" \
  | grep -v "components/button/stories/button.stories.ts" \
  | grep -v "components/button/migration-guide.mdx"
# expected: empty output
```

The six permitted `components/` exceptions are all from Phase 4c's outbound-link updates. Any other `components/` diff is a scope violation and must be reverted before commit. (Note: the button migration guide was renamed in main from `consumer-migration-guide.mdx` to `migration-guide.mdx` during the merge; the scope check honors the new filename.)

### Phase 12 — Commit & PR

**Commit structure:** one commit per phase (Phases 2–10 → nine commits), in order. This makes the PR reviewable chunk-by-chunk while keeping the net diff focused.

**Per-phase review gate (applies to every phase, not just Phase 12).** The agent does the work for a phase in the working tree, runs that phase's verification (link checks, Storybook smoke, etc.), and stops. The human reviews the diff in Cursor/GitHub, gives explicit approval, and only then does the agent stage and commit. No phase's work is committed without human approval. If a phase reveals follow-on work that doesn't fit its scope (e.g. depth-shifted relative links discovered during the rename phase), the agent flags it for the human and waits — it does not silently fold it in.

Each commit message follows conventional commits format:

- `docs: restructure CONTRIBUTOR-DOCS into audience folders` (Phase 2)
- `chore: update path references for audience folder restructure` (Phase 3)
- `feat(.storybook): persona-first sidebar IA + contribute gating` (Phase 4)
- `refactor(.storybook): consolidate docs under .storybook/docs/` (Phase 5)
- `feat(.storybook): selective SSOT generator emits Contribute (dev-gated)` (Phase 6)
- `docs(.storybook): add consumer get-started landing with live badge demo` (Phase 7)
- `docs(.storybook): add customization cheatsheet alongside long-form docs` (Phase 8)
- `feat(.storybook): live component status matrix in Reference` (Phase 9)
- `docs(.storybook): restructure when-to-use-swc into scannable decision guide` (Phase 10)

**PR title:** `docs: reorganize SWC docs by audience`

**PR body:** brief summary; link the four currently-open superseded PRs and note they should be closed after this lands.

### Phase 13 — Deferred: `for-contributors/focus-management.md` review

**This phase is a separate follow-up PR.** It does not block the audience reorg.

**Context.** The file currently at `CONTRIBUTOR-DOCS/01_contributor-guides/13_focus-management.md` (which becomes `for-contributors/focus-management.md` in Phase 2) was modified in earlier work alongside an attempt to introduce an `rfcs/` tree. That `rfcs/` tree is out of scope for this plan, but the modifications to the focus-management doc may have been substantive content improvements, RFC-pointer additions, or both.

Additionally, the [storybook residency audit](./audience-based-docs-storybook-residency-audit.md) Observation 11 identifies latent consumer-audience content inside this file (focus-behavior contracts useful to consumers, not just implementation guidance for contributors). A content-split companion may be authored in `.storybook/docs/learn/focus-management.mdx`.

**Required research step (no implementation decisions until this is complete):**

1. Pull the prior version of `13_focus-management.md` from the abandoned audience-restructure work (available via the backup tag `backup-before-scope-reduction-1778521887` on the prior branch).
2. Diff it against the merge-base version that arrives in current `origin/main`.
3. Classify each hunk in the diff as **substantive content** (real documentation improvement, keep) vs **RFC-pointer** (added a link or section pointing to the dropped `rfcs/` tree, drop).
4. Identify which content chunks (if any) are consumer-audience (per residency audit Observation 11) and would belong in a Storybook companion file.
5. Document the classification in a new sub-section of this plan or a sibling research doc.

**Decision gate:** no edit to `for-contributors/focus-management.md` until the classification above is reviewed. The remainder of this phase (apply the substantive hunks; ignore the RFC-pointer hunks; optionally author the consumer companion) is defined by the research outcome.

---

## Resolved decisions

1. ✅ **Branch creation (Phase 1)** — the human creates the branch (`caseyisonit/docs-audience-reorg` off current `origin/main`) and pushes it. The agent verifies it's on that branch before any other phase begins.
2. ✅ **Commit granularity (Phase 11)** — one commit per phase. **Each commit lands only after the human has reviewed that phase's work and given explicit approval.** No autonomous commits at any phase boundary.
3. ✅ **Plan approval (overall)** — implementation does not begin until the human approves this plan. The approval gate at the top of this document is the authoritative trigger.
