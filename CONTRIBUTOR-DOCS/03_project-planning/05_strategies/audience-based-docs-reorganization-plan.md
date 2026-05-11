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
- [Phases](#phases)
    - [Phase 1 — Branch setup](#phase-1--branch-setup)
    - [Phase 2 — Restructure `CONTRIBUTOR-DOCS/` into audience folders](#phase-2--restructure-contributor-docs-into-audience-folders)
    - [Phase 3 — Update path references in supporting files](#phase-3--update-path-references-in-supporting-files)
    - [Phase 4 — Storybook persona-first sidebar](#phase-4--storybook-persona-first-sidebar)
    - [Phase 5 — Single-source-of-truth generator](#phase-5--single-source-of-truth-generator)
    - [Phase 6 — Consumer landing page](#phase-6--consumer-landing-page)
    - [Phase 7 — Customization cheatsheet](#phase-7--customization-cheatsheet)
    - [Phase 8 — Component status matrix](#phase-8--component-status-matrix)
    - [Phase 9 — Project-fit decision guide ("When to use SWC")](#phase-9--project-fit-decision-guide-when-to-use-swc)
    - [Phase 10 — Validate](#phase-10--validate)
    - [Phase 11 — Commit & PR](#phase-11--commit--pr)
    - [Phase 12 — Deferred: `for-contributors/focus-management.md` review](#phase-12--deferred-for-contributorsfocus-managementmd-review)
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

- Reorganize `CONTRIBUTOR-DOCS/` into audience-first folders (`for-consumers/`, `for-contributors/`, `for-maintainers/`, `project-planning/`, `reference/`). Per-file destinations are locked in the [content audit](./audience-based-docs-content-audit.md).
- Rewire Storybook's sidebar into a persona-first IA (`Get started`, `Components`, `Learn`, `Contribute`, `Reference`)
- Add a single-source-of-truth generator so Storybook contributor docs auto-emit from `CONTRIBUTOR-DOCS/*.md`
- Create a consumer landing page (Storybook `Get started` + `2nd-gen/README.md`) from the same MD source
- Create a customization cheatsheet that replaces the five-page customization sub-tree
- Create a component status matrix as the first `Reference/` audience page
- Restructure the `When to use SWC` project-fit guide from accordion prose into a scannable decision flow
- Update all path references in supporting files (`.ai/` rules and skills, `AGENTS.md`, `PULL_REQUEST_TEMPLATE.md`, root readmes, build configs) so they point at the new audience locations

### Out of scope

- **Changes to how individual components are documented.** No shifts of descriptions, subtitles, or prose between stories and source files. No JSDoc rewrites on component classes. No story restructuring. The only `2nd-gen/packages/swc/components/` diff this plan permits is a single 1-line outbound-link update in `typography.stories.ts` that is forced by the Storybook section rename in Phase 4.
- **Content edits to contributor docs themselves.** The 10 observations captured in the [content audit](./audience-based-docs-content-audit.md) — duplicate-home cleanups, stub READMEs, scope-sharpening for a11y testing docs, the migration step-by-step relocation question, `04_milestones/` content, `tools-vs-packages.md` rename — are explicitly **out of scope for this PR**. They each become their own follow-up content PR after the structural change lands.
- Component implementation, tests, CSS — untouched.
- New CEM tags or block-library extensions — separate concern, future work.
- RFC structure (organizing docs by status: accepted / proposed) — orthogonal to audience reorg, future work.

## End state

```
CONTRIBUTOR-DOCS/
├── README.md                              ← root index, audience-organized
├── for-consumers/
│   ├── customization-cheatsheet.md        ← one-page customization reference
│   ├── get-started.md                     ← consumer quickstart (also delivered to Storybook + 2nd-gen/README.md)
│   └── using-the-issue-tracker.md         ← moved here from old 01_/02_ (primary audience is bug filers / feature requesters)
├── for-contributors/
│   ├── README.md
│   ├── authoring-contributor-docs/
│   │   ├── README.md
│   │   ├── update-nav.js
│   │   ├── verify-links.js
│   │   ├── writing-migration-guides.md    ← moved here from old 01_/13_ (meta-doc)
│   │   └── templates/
│   │       └── consumer-quickstart.md     ← template for future consumer docs
│   ├── focus-management.md
│   ├── getting-involved.md
│   ├── maintaining-stackblitz-examples.md ← clarity rename of 10_using-stackblitz.md
│   ├── making-a-pull-request.md
│   ├── patching-dependencies.md
│   ├── reviewing-pull-requests.md         ← clarity rename of 05_participating-in-pr-reviews.md
│   ├── running-accessibility-tests.md     ← clarity rename of 09_accessibility-testing.md
│   ├── style-guide/
│   │   ├── README.md
│   │   ├── css/
│   │   ├── linting-tools.md
│   │   ├── testing/                       ← includes content folded from old 01_/11_2ndgen_testing.md
│   │   └── typescript/
│   ├── tools-vs-packages.md
│   └── working-in-the-swc-repo.md
├── for-maintainers/                       ← seeded with the only existing maintainer-only doc
│   └── releasing-swc.md                   ← moved from 01_/06_
├── project-planning/                      ← maintainer-facing; numeric prefixes preserved inside
│   ├── README.md
│   ├── 01_objectives-and-strategy.md
│   ├── 02_workstreams/
│   ├── 03_components/
│   ├── 04_milestones/
│   └── 05_strategies/
│       ├── audience-based-docs-reorganization-plan.md   ← this document
│       ├── audience-based-docs-content-audit.md         ← sibling audit
│       └── focus-management-strategy-rfc.md
└── reference/
    ├── component-status.md                ← component status matrix
    └── component-status.data.yml          ← overrides feeding the matrix generator
```

Storybook sidebar end state:

```
Get started                                ← consumer landing, rendered from for-consumers/get-started.md
Components                                 ← unchanged content
Learn
   · About SWC
   · Customization
   · Accessibility guides
   · Framework integrations
Contribute                                 ← rendered from for-contributors/* (auto-generated)
   · Get set up
   · Style guide
   · Project planning                      ← maintainer-only; gated to dev builds
Reference
   · Component status
   · Core package
   · Design tokens
```

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

Update `.gitignore` to ignore the generated Storybook MDX paths added in Phase 5:

```
# Generated by 2nd-gen/packages/swc/.storybook/scripts/generate-contributor-docs.mjs
2nd-gen/packages/swc/.storybook/contributor-docs/
2nd-gen/packages/swc/.storybook/get-started/
2nd-gen/packages/swc/.storybook/learn-about-swc/component-status.mdx
```

### Phase 4 — Storybook persona-first sidebar

Two file edits.

**4a. `2nd-gen/packages/swc/.storybook/main.ts`.**

Replace the existing flat `titlePrefix` list (`Components`, `Core`, `Learn about SWC`, `Guides`, `Contributor docs`) with a persona-first set:

```ts
stories: [
  {
    directory: '../.storybook/get-started',
    titlePrefix: 'Get started',
    files: '**/*.mdx',
  },
  {
    directory: '../components',
    titlePrefix: 'Components',
    files: '**/*.stories.@(ts|js|tsx|jsx|mdx)',
  },
  {
    directory: '../.storybook/learn-about-swc',
    titlePrefix: 'Learn',
    files: '**/*.mdx',
  },
  {
    directory: '../.storybook/guides',
    titlePrefix: 'Learn',
    files: '**/*.mdx',
  },
  {
    directory: '../.storybook/contributor-docs',
    titlePrefix: 'Contribute',
    files: '**/*.mdx',
  },
  // … plus any existing Core / Reference entries, retitled to fit
],
```

Gate maintainer-facing content out of production builds. The repo already has a `storybookMode` env check (see how `*.internal.stories.ts` is excluded today); apply the same gate so `Contribute → Project planning` and any other maintainer-only contributor-docs subtree only renders when `storybookMode !== 'build'`. Local `yarn dev` sees everything; the production Storybook build ships only consumer- and contributor-facing sections.

**4b. `2nd-gen/packages/swc/.storybook/preview.ts`.**

Update `parameters.options.storySort.order` to put `Get started` first and reflect the new persona-first top-level order:

```ts
order: [
  'Get started',
  'Components',
  // … existing component ordering preserved …
  'Learn',
  [
    'Overview',
    'About SWC',
    'Customization',
    'Accessibility guides',
    'Framework integrations',
  ],
  'Contribute',
  [
    // generated from CONTRIBUTOR-DOCS/for-contributors/ subtree (see Phase 5)
  ],
  'Reference',
  [
    'Component status',
    'Core package',
    'Design tokens',
  ],
],
```

**4c. Storybook section rename: customization moves under `Learn`.**

The customization guides currently render under titlePrefix `Guides` (route prefix `/docs/guides-customization-*`). They move under `Learn` (route prefix `/docs/learn-customization-*`) as part of the persona-first IA.

This produces exactly one diff inside `2nd-gen/packages/swc/components/`: a 1-line outbound-link update in `typography.stories.ts`:

```diff
- Learn more about [loading the expected fonts](/docs/guides-customization-fonts--readme).
+ Learn more about [loading the expected fonts](/docs/learn-customization-fonts--readme).
```

This is the only permitted `components/` diff in this plan. It is mechanical — the story's content and shape are unchanged.

### Phase 5 — Single-source-of-truth generator

Extend `2nd-gen/packages/swc/.storybook/scripts/generate-contributor-docs.mjs` so that Storybook's `contributor-docs/`, `get-started/`, and `learn-about-swc/component-status.mdx` are auto-generated from `CONTRIBUTOR-DOCS/*.md`. No more hand-maintained duplicates.

**Generator responsibilities:**

1. Walk `CONTRIBUTOR-DOCS/` and emit one `.mdx` per `.md` to `2nd-gen/packages/swc/.storybook/contributor-docs/`, mirroring the folder tree.
2. Strip auto-generated breadcrumbs and TOC blocks from each MD (those belong on GitHub, not Storybook).
3. Rewrite intra-tree `.md` links to Storybook `/docs/...` paths.
4. Rewrite source-file links (`.ts`, `.js`, `.css`, etc.) to GitHub blob URLs.
5. Pass through stable Storybook paths (`/docs/learn-customization-getting-started--readme`) and absolute URLs unchanged.
6. Sanitize HTML for MDX (self-close void elements, convert bare emails to `mailto:` links, convert HTML comments to JSX comments).
7. Prepend a `<Meta title="..." />` block so Storybook indexes each emitted page.
8. Rename `README.md` → `index.mdx` so each folder has a clean index in Storybook.

**`MIRROR_EMITS` config.** A small declarative table inside the generator that publishes specific MD files to additional Storybook locations beyond their default contributor-docs mirror. Initial entries:

| Source | Mirror output | Storybook title |
|---|---|---|
| `CONTRIBUTOR-DOCS/for-consumers/get-started.md` | `.storybook/get-started/index.mdx` | `Get started` |
| `CONTRIBUTOR-DOCS/reference/component-status.md` | `.storybook/learn-about-swc/component-status.mdx` | `Component status` |

Each `MIRROR_EMITS` entry takes `source`, `outputDir`, `outputFile`, `title`, and optional `heading` overrides.

**Wiring:**

- `package.json` script `generate:contributor-docs` runs the generator.
- Hook it into `prestorybook` and `predev` so `yarn dev` and `yarn storybook` regenerate on every start.
- The generated `.mdx` paths added to `.gitignore` in Phase 3.
- A `storySort` order update inside `preview.ts`, between marker comments `GENERATED:CONTRIBUTOR-DOCS-SORT` and `GENERATED:CONTRIBUTOR-DOCS-SORT-END`, written by the script so the sidebar order tracks the tree automatically.

**Rule update:** `.ai/rules/storybook-mdx-conversion.md` no longer describes a hand-sync process; it points contributors at the generator and notes that `.storybook/contributor-docs/` is gitignored and must not be hand-edited.

### Phase 6 — Consumer landing page

**6a. Author `CONTRIBUTOR-DOCS/for-consumers/get-started.md`.**

This single markdown file is the SSOT for both the Storybook `Get started` page (via Phase 5's `MIRROR_EMITS`) and `2nd-gen/README.md` (via a transclusion or include).

Required sections, in order:

1. **Install** — single code block, vanilla JavaScript only (no framework-specific tabs):
   - `yarn add @adobe/spectrum-wc`
   - Side-effectful import (`import '@adobe/spectrum-wc/badge';`)
   - Stylesheet link (the `<link rel="stylesheet">` against the package's CSS bundle)
2. **First component** — copy-paste working `<swc-badge>` example with rendered output.
3. **Framework note** — one line: "React wrappers are planned; no plans for Vue or Svelte support at this time." No multi-framework tabs, no comparison table.
4. **Where to go next** — four short cards or links:
   - Components — `Components` sidebar section
   - Customization — `Learn → Customization` (see Phase 7's cheatsheet)
   - Accessibility — `Learn → Accessibility guides`
   - Contributing — `Contribute → Get set up`

Keep the page under one screen of reading. Visual hierarchy: H1 + four H2 sections.

**6b. Author the consumer-quickstart template.**

Save the skeleton of the above to `CONTRIBUTOR-DOCS/for-contributors/authoring-contributor-docs/templates/consumer-quickstart.md` so future consumer-facing onboarding docs clone it. Required frontmatter (`audience`, `genre`, `last-reviewed`, `tags`), required sections, and canonical heading names match the get-started page.

**6c. Rewrite `2nd-gen/README.md`.**

Replace the existing 25-line stub with the same content the Storybook `Get started` page renders. Practical mechanism: a thin wrapper file that links to `CONTRIBUTOR-DOCS/for-consumers/get-started.md` for the canonical content, or a `prepack`/`prebuild` step that inlines the MD; either way, the source-of-truth file is the one in `for-consumers/`.

**6d. Decide on `2nd-gen/packages/swc/.storybook/guides/customization/getting-started.mdx`.**

Today this page is framed as stylesheet-setup-after-`<sp-theme>`-deprecation. The consumer landing supersedes its onboarding role. Fold its stylesheet-setup content into Phase 6a's Install section (with a "see Customization for deeper overrides" link out), then delete the file.

### Phase 7 — Customization cheatsheet

Replace the five-page customization sub-tree under `2nd-gen/packages/swc/.storybook/guides/customization/` with one scannable page.

**7a. Author `CONTRIBUTOR-DOCS/for-consumers/customization-cheatsheet.md`.**

One-page reference covering:

- Stylesheet install (already in get-started; brief reminder + deep link)
- `--swc-*` custom property override pattern with a working code example
- Scale modifiers — table of available scale modifier class names + when to use each
- Font loading — short description + link to the Adobe Fonts kit loader (already in the codebase)
- Live example demonstrating a real override end-to-end

**Naming note.** Use "Customization" exclusively. The term "Theming" is 1st-gen vocabulary (there is no `<sp-theme>` context component in 2nd-gen) and should not appear in 2nd-gen consumer docs.

**7b. Delete superseded customization sub-pages.**

Content from these files is either folded into the cheatsheet or into the get-started Install section, then the files are removed:

- `2nd-gen/packages/swc/.storybook/guides/customization/getting-started.mdx`
- `2nd-gen/packages/swc/.storybook/guides/customization/component-styles.mdx`
- `2nd-gen/packages/swc/.storybook/guides/customization/fonts.mdx`
- `2nd-gen/packages/swc/.storybook/guides/customization/global-elements.mdx`
- `2nd-gen/packages/swc/.storybook/guides/customization/theme-scales.mdx`

If any of the above are anchored by `titlePrefix` in `main.ts`, leave the folder in place but empty out the files.

**7c. Storybook delivery.**

The cheatsheet renders at `Learn → Customization` via the generator's `MIRROR_EMITS` (extend the table from Phase 5 if needed). Direct URL: `/docs/learn-customization--readme`.

### Phase 8 — Component status matrix

Establish `CONTRIBUTOR-DOCS/reference/` as a new audience folder for at-a-glance reference content. Populate it with a component status matrix.

**8a. Author `CONTRIBUTOR-DOCS/reference/component-status.md`.**

A single table — rows = components, columns = the at-a-glance facts a reader needs:

| Column | Source |
|---|---|
| Component | CEM `tagName` |
| Status | CEM `@status` JSDoc tag (`preview`, `stable`, etc.) |
| Since | CEM `@since` JSDoc tag |
| RSP 2 parity | YAML override (`partial` default; see 8c) |
| Figma | YAML override (URL) |
| Stackblitz | YAML override (URL) |
| Notes | YAML override (free text) |

**Out of scope for this matrix:** sizes and variants. Those describe API shape and belong on each component's own Storybook page, not on a cross-cutting status table.

**Parity definition:** parity is measured against React Spectrum 2, not against 1st-gen SWC. Default value is `partial` for every migrated component; overrides live in the YAML alongside the matrix data.

**8b. Author the matrix generator.**

New script: `2nd-gen/packages/swc/.storybook/scripts/generate-component-matrix.mjs`.

Responsibilities:

1. Read `2nd-gen/packages/swc/custom-elements.json` (the CEM manifest).
2. Read `CONTRIBUTOR-DOCS/reference/component-status.data.yml` for overrides.
3. Emit `CONTRIBUTOR-DOCS/reference/component-status.md` with the table.
4. Wire into `package.json` as `generate:component-matrix`; chain it into the same `prestorybook`/`predev` step that runs `generate:contributor-docs`.

**8c. Author `CONTRIBUTOR-DOCS/reference/component-status.data.yml`.**

Schema:

```yaml
components:
  badge:
    parity: full
    figma: https://www.figma.com/...
    stackblitz: https://stackblitz.com/...
    notes: ''
  # … one entry per component, missing fields fall back to defaults
defaults:
  parity: partial
  figma: ''
  stackblitz: ''
  notes: ''
```

**8d. Storybook delivery.**

The generated matrix renders at `Reference → Component status` via `MIRROR_EMITS` (extend Phase 5's table). Direct URL: `/docs/reference-component-status--readme`.

### Phase 9 — Project-fit decision guide ("When to use SWC")

The existing `2nd-gen/packages/swc/.storybook/learn-about-swc/when-to-use-swc.mdx` is a consumer-facing project-fit page ("is SWC the right tool for my project?"). It is currently accordion prose that is hard to scan. Restructure into a scannable decision flow.

**Pattern:** convert each accordion into either a comparison table or a short decision tree (mermaid is fine). Keep the page focused on project-fit, not component-selection — "which component do I need?" is a separate concern that lives in the Components sidebar, not here.

**Deliverable:** rewritten `when-to-use-swc.mdx` that a reader can scan in under 60 seconds and reach a yes/no/it-depends answer for their project.

### Phase 10 — Validate

```bash
# From repo root
yarn install
yarn build

# From 2nd-gen/packages/swc
yarn generate:contributor-docs     # generator runs cleanly
yarn generate:component-matrix     # matrix generator runs cleanly
yarn dev                           # Storybook starts; no missing-glob errors
yarn build-storybook               # production build succeeds

# Nav script handles the new tree
node CONTRIBUTOR-DOCS/for-contributors/authoring-contributor-docs/update-nav.js
```

**Manual smoke test in Storybook:**

- `Get started` is first in the sidebar with the consumer landing page rendered
- `Components` ordering is unchanged from current main
- `Learn → Customization` shows the cheatsheet
- `Learn → Customization → Fonts` (or wherever the typography story's link points) resolves; the typography story page loads
- `Contribute → Get set up` shows contributor-doc content from `for-contributors/`
- `Contribute → Project planning` is visible in dev (`yarn dev`) and absent in production build (`yarn build-storybook` output)
- `Reference → Component status` shows the matrix with at least one row per migrated component

**Audience-only scope check:**

```bash
git diff --name-only origin/main..HEAD \
  | grep -E "^2nd-gen/packages/(swc|core)/components/" \
  | grep -v "components/typography/stories/typography.stories.ts"
# expected: empty output
```

The single permitted exception is the 1-line typography link update from Phase 4c. Any other `components/` diff is a scope violation and must be reverted before commit.

### Phase 11 — Commit & PR

**Commit structure:** one commit per phase (Phases 2–9 → eight commits), in order. This makes the PR reviewable chunk-by-chunk while keeping the net diff focused.

**Per-phase review gate (applies to every phase, not just Phase 11).** The agent does the work for a phase in the working tree, runs that phase's verification (link checks, Storybook smoke, etc.), and stops. The human reviews the diff in Cursor/GitHub, gives explicit approval, and only then does the agent stage and commit. No phase's work is committed without human approval. If a phase reveals follow-on work that doesn't fit its scope (e.g. depth-shifted relative links discovered during the rename phase), the agent flags it for the human and waits — it does not silently fold it in.

Each commit message follows conventional commits format:

- `docs: restructure CONTRIBUTOR-DOCS into audience folders`
- `chore: update path references for audience folder restructure`
- `feat(.storybook): persona-first sidebar`
- `feat(.storybook): single-source-of-truth contributor docs generator`
- `docs: add consumer get-started landing page`
- `docs: replace five-page customization sub-tree with one cheatsheet`
- `feat(.storybook): component status matrix generator + reference folder`
- `docs: restructure when-to-use-swc into scannable decision guide`

**PR title:** `docs: reorganize SWC docs by audience`

**PR body:** brief summary; link the four currently-open superseded PRs and note they should be closed after this lands.

### Phase 12 — Deferred: `for-contributors/focus-management.md` review

**This phase is a separate follow-up PR.** It does not block the audience reorg.

**Context.** The file currently at `CONTRIBUTOR-DOCS/01_contributor-guides/13_focus-management.md` (which becomes `for-contributors/focus-management.md` in Phase 2) was modified in earlier work alongside an attempt to introduce an `rfcs/` tree. That `rfcs/` tree is out of scope for this plan, but the modifications to the focus-management doc may have been substantive content improvements, RFC-pointer additions, or both.

**Required research step (no implementation decisions until this is complete):**

1. Pull the prior version of `13_focus-management.md` from the abandoned audience-restructure work (available via the backup tag `backup-before-scope-reduction-1778521887` on the prior branch).
2. Diff it against the merge-base version that arrives in current `origin/main`.
3. Classify each hunk in the diff as **substantive content** (real documentation improvement, keep) vs **RFC-pointer** (added a link or section pointing to the dropped `rfcs/` tree, drop).
4. Document the classification in a new sub-section of this plan or a sibling research doc.

**Decision gate:** no edit to `for-contributors/focus-management.md` until the classification above is reviewed. The remainder of this phase (apply the substantive hunks; ignore the RFC-pointer hunks) is defined by the research outcome.

---

## Resolved decisions

1. ✅ **Branch creation (Phase 1)** — the human creates the branch (`caseyisonit/docs-audience-reorg` off current `origin/main`) and pushes it. The agent verifies it's on that branch before any other phase begins.
2. ✅ **Commit granularity (Phase 11)** — one commit per phase. **Each commit lands only after the human has reviewed that phase's work and given explicit approval.** No autonomous commits at any phase boundary.
3. ✅ **Plan approval (overall)** — implementation does not begin until the human approves this plan. The approval gate at the top of this document is the authoritative trigger.
