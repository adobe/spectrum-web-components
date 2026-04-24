<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [RFCs](../README.md) / Proposed / Docs overhaul v2 — audience-based reorganization

<!-- Document title (editable) -->

# Docs overhaul v2 — audience-based reorganization

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Summary](#summary)
- [Motivation](#motivation)
    - [Research synthesis (six peer systems)](#research-synthesis-six-peer-systems)
- [Detailed design](#detailed-design)
    - [The v2 core principle](#the-v2-core-principle)
    - [Audiences — the five tiers](#audiences--the-five-tiers)
    - [New IA — the folder tree](#new-ia--the-folder-tree)
    - [Per-component shape (genre: `component`)](#per-component-shape-genre-component)
    - [Delivery surfaces — explicit separation](#delivery-surfaces--explicit-separation)
    - [MVP sequence](#mvp-sequence)
    - [Recommended v2 PR sequence (after this plan is approved)](#recommended-v2-pr-sequence-after-this-plan-is-approved)
- [Documentation](#documentation)
- [Drawbacks](#drawbacks)
- [Backwards compatibility](#backwards-compatibility)
- [Alternatives](#alternatives)
- [Open questions](#open-questions)
- [Scope exclusions](#scope-exclusions)

</details>

<!-- Document content (editable) -->

**Status:** Proposed
**Author(s):** Casey Eickhoff (@caseyeickhoff) + Claude (Claude Opus 4.7)
**First commit:** 2026-04-22
**Discussion:** On-branch review of `caseyisonit/docs-mvp`. This RFC ratifies the plan via its own process; when accepted it moves to `rfcs/accepted/` and the branch proceeds to MVP-β.
**Supersedes:** Private v1 plan (`~/.claude/plans/i-need-to-quickly-glowing-anchor.md`) — content carried forward; v1 MVPs that shipped on branch are preserved, v1 Phase 3 is superseded by MVP-β below.

## Summary

Reorganize all 2nd-gen documentation around **audience** as the primary axis. Every doc has exactly one primary audience (consumer, contributor, maintainer, SWC-internals, or agent). Folder location encodes audience; filename encodes topic. Content that currently serves multiple audiences in one file gets split across audience-specific files, cross-linked where helpful. Content persists — it redistributes, it does not get cut.

This replaces v1's topic-first IA ("persona sidebar + numeric-prefix folders") with a tree whose folders *are* the audiences. It resolves the structural wall v1 hit at MVP-6b, where a customization cheatsheet tried to collapse five files into one and discovered the input files were audience-mixed, not length-bloated.

## Motivation

The v1 plan shipped six MVPs well but hit a structural wall at MVP-6b (customization cheatsheet). When the five customization MDX files were consolidated into one, the work was treated as an editorial problem — "what can we trim?" — when the real problem was that the input files **mixed audiences**. Fonts content in particular has three audiences collapsed into one file:

- **Consumer** (app dev): "how do I load Adobe Clean Spectrum VF in my app?"
- **Contributor** (Storybook author): "how does the language toolbar load CJK kits?"
- **Maintainer / internals** (SWC framework author): "why dynamic subsetting returns HTTP 412 on CSS endpoints, and how we work around it via `document.fonts`"

All three currently live in the same file because that's where the topic lives, not where the audience lives. v1's "persona-first IA" moved content into the right sidebar bucket but still left the files themselves audience-mixed.

**v2's core move:** distribute content across files by audience, so authors and readers never have to wade past guidance meant for a different role.

### Research synthesis (six peer systems)

Full per-system reports are embedded in the conversation transcript. The distilled cross-system patterns:

#### Universal patterns (worth adopting)

| Pattern | Source | What we take |
|---|---|---|
| **Thin package READMEs, fat site** | All six | `@adobe/spectrum-wc/*` READMEs become ≤20-line stubs; narrative lives in Storybook + CONTRIBUTOR-DOCS |
| **API docs are generated from class JSDoc → CEM → tables** | Shoelace, Nord, RSP, RHDS | Never hand-author attribute/slot/event/CSS-parts tables. One JSDoc source; many surfaces. |
| **Per-component narrative lives in one file** | Shoelace (`<tag>.md`), Nord (CEM `readme` field), RSP (`<Name>.mdx`) | Adopt for SWC: `components/<name>/README.mdx`, genre-templated (per v1 Phase 1) |
| **Stub `CONTRIBUTING.md` that redirects to the site** | RHDS, Shoelace | Already present in spirit; formalize the redirect |
| **Numeric prefixes for intra-folder ordering** | RHDS (`00-`, `10-`, `20-`) | Already present in SWC; keep but move ordering into frontmatter where possible (see Nav below) |

#### High-value patterns worth stealing selectively

| Pattern | Source | How we adapt |
|---|---|---|
| **Cross-cutting topic split by audience** | RHDS `accessibility/{development,design,content}.md` | **This is the v2 core move.** Apply to fonts, a11y, testing, theming, migration. |
| **Frontmatter-driven nav** (`export const section = 'Guides'`) | React Spectrum | Storybook side already has this via generated MDX; CONTRIBUTOR-DOCS side can follow by letting `update-nav.js` read frontmatter `audience:` / `order:` |
| **RFC folder at repo root, GitHub-only, template-driven** | RSP `rfcs/`, Fluent `docs/react-v9/contributing/rfcs/`, Carbon `docs/decisions/` | Add `CONTRIBUTOR-DOCS/rfcs/` with a template. Do NOT surface in Storybook nav. |
| **`data.yaml` sidecar per component** with status, figma, parity, dependencies | RHDS | Extend our `component-matrix.data.yml` to be per-component sidecars (also aligns with future `@RSPparity` JSDoc tag) |
| **Agent-audience tier as a first-class peer** | RSP `skills/`, Nord `/ai`, Carbon/Fluent `AGENTS.md` | Expose `.ai/skills/` to consumers via `llms.txt` + agent-skill install URL |
| **Concept-explainer links at the bottom of every API table** ("Learn more about slots →") | Shoelace | Add to our `<ApiTable>` etc. blocks — teach once, link forever |
| **Single-step scaffolding that modifies `src/` and `docs/` together** | Shoelace plop, Carbon `AGENTS.md` | Wire up in v2 Phase 5 (greenfield component authoring) |
| **Concept-split into `SPEC.md` + `MIGRATION.md` colocated with component** | Fluent's `library/docs/{SPEC,MIGRATION}.md` | Adopt the `docs/` subfolder pattern: `components/<name>/{README.mdx, migration.mdx, spec.md}` |
| **Outward-linking banner at the top of every component page** | Carbon's `[Source] \| [Usage] \| [Accessibility]` | Good glue between Storybook + GitHub + RSP-parity reference |

#### Anti-patterns to avoid

- **Carbon's split tabs** (`/usage`, `/style`, `/code`, `/accessibility`) with no "home" page. Four tabs per component is too much ceremony for SWC's scale. Single-page narrative (Shoelace / Nord model) wins.
- **Privatizing the repo** (Nord). SWC is OSS; maintainer docs must be public even if thin.
- **Leaving legacy spec/decision trees in place when a new location supersedes them** (Fluent's `/specs/`). If we move, we delete or redirect — never both.
- **Hand-authored API tables drifting from code** (noted in Carbon). Generate-only, or lint for drift.
- **Stub CONTRIBUTING files that round-trip to a wiki** (RHDS). Stub is fine; the redirect target must be stable and inside the repo or the docs site.
- **No RFC/ADR process** (Shoelace, Nord). Our plan keeps this; don't regress.

## Detailed design

### The v2 core principle

> **Every piece of documentation has exactly one primary audience. Content serving multiple audiences gets split into multiple files, one per audience, cross-linked where helpful. File location + filename encode audience; nothing else.**

Implications:

- A single topic ("fonts") may land in 2–3 files across 2–3 folders.
- Filenames don't encode topic alone; they encode audience + topic (e.g. `load-fonts.md` for consumers, `font-toolbar.md` for contributors, `fonts-internals.md` for maintainers).
- Authors never have to ask "which file does this belong in?" — they ask "who's reading this?" and the folder answers.
- Readers landing on a page never have to skip paragraphs meant for someone else.

This is RHDS's `accessibility/{development,design,content}.md` pattern, applied across the board.

### Audiences — the five tiers

Distilled from research + user's guidance:

| Tier | Reader | Typical question | Delivery surfaces |
|---|---|---|---|
| **Consumer** | App developer building with SWC | "How do I `<swc-button>` in my app?" "How do I load the fonts?" "Which components exist?" | Storybook (primary), package READMEs (thin), npm search results |
| **Contributor** | Someone contributing a component, bug fix, or doc | "How do I add a new component?" "How does the CEM pipeline work?" "How do I run a11y tests?" | CONTRIBUTOR-DOCS on GitHub (primary); not surfaced in consumer-facing Storybook (production build) |
| **Maintainer** | Release owner, deprecation author, cross-cutting decision-maker | "When's the next release?" "How do we deprecate?" "What's the RSP-parity status of all components?" | CONTRIBUTOR-DOCS (dev-only sections in Storybook; gated via `storybookMode !== 'build'`) |
| **SWC internals** | Person working on the framework itself (base classes, theming scaffolding, font loader, etc.) | "Why does dynamic subsetting return HTTP 412?" "Why is the cascade layer named `swc-global-element-overrides`?" | CONTRIBUTOR-DOCS internals section; JSDoc on framework-internal source; ADRs |
| **Agent / AI** | LLM reading SWC to answer user questions or generate code | "What components exist?" "What's the minimal install for swc-button?" "What's the migration API from sp-badge to swc-badge?" | `llms.txt`, `llms-full.txt`, `.ai/skills/` exposed via `npx skills add` URL (Nord pattern) |

These five map cleanly to folders in the new IA.

### New IA — the folder tree

```
CONTRIBUTOR-DOCS/               (name retained for git-history continuity; no rename)
├── for-consumers/              ← app developers using SWC (Storybook SSOT)
│   ├── get-started.md          ← MVP-1 destination (already shipped; move here)
│   ├── install-stylesheet.md   ← from customization-cheatsheet §Install
│   ├── customize-components.md ← from customization-cheatsheet §Override component styles
│   ├── themes-and-scales.md    ← from customization-cheatsheet §Themes and scales
│   ├── load-fonts.md           ← from customization-cheatsheet §Fonts (consumer-only portion)
│   ├── global-elements.md      ← from customization-cheatsheet §Style native elements
│   ├── framework-integrations.md  (one-line for now: React wrappers planned)
│   ├── accessibility.md        ← consumer-facing a11y (how to use SWC accessibly)
│   └── migrate-from-1st-gen.md ← consumer-side migration summary + links
│
├── for-contributors/           ← people contributing components/bugs
│   ├── get-set-up.md
│   ├── make-a-change.md        ← PR + review + release flow
│   ├── author-a-component.md   ← NEW-component authoring (v1 Phase 5)
│   ├── author-a-doc.md
│   ├── testing/
│   │   ├── unit.md
│   │   ├── accessibility.md    ← contributor-side a11y testing (AVT pattern)
│   │   ├── visual-regression.md
│   │   └── stackblitz.md
│   ├── storybook/
│   │   ├── authoring.md
│   │   ├── language-toolbar.md ← from fonts.mdx contributor-only portion
│   │   └── decorators.md
│   └── style-guide/              ← preserves the existing multi-file structure (see "Style guide organization" below)
│       ├── css/
│       │   ├── README.md
│       │   ├── component-css.md
│       │   ├── custom-properties.md
│       │   ├── component-css-pr-checklist.md
│       │   ├── spectrum-swc-migration.md
│       │   ├── anti-patterns.md
│       │   └── property-order-quick-reference.md
│       ├── typescript/
│       │   ├── README.md
│       │   ├── file-organization.md
│       │   ├── class-structure.md
│       │   ├── typescript-modifiers.md
│       │   ├── lit-decorators.md
│       │   ├── property-patterns.md
│       │   ├── method-patterns.md
│       │   ├── jsdoc-standards.md
│       │   ├── component-types.md
│       │   ├── rendering-patterns.md
│       │   ├── naming-conventions.md
│       │   ├── base-vs-concrete.md
│       │   ├── composition-patterns.md
│       │   ├── mixin-composition.md
│       │   ├── controller-composition.md
│       │   ├── directive-composition.md
│       │   ├── interface-composition.md
│       │   └── debug-validation.md
│       ├── testing/
│       │   ├── README.md
│       │   ├── testing-overview.md
│       │   ├── storybook-testing.md
│       │   ├── playwright-accessibility-testing.md
│       │   ├── visual-regression-testing.md
│       │   ├── testing-utilities.md
│       │   ├── code-coverage.md
│       │   ├── avoiding-flaky-tests.md
│       │   ├── running-tests.md
│       │   ├── pr-review-checklist.md
│       │   └── resources.md
│       └── linting-tools.md
│
├── for-maintainers/            ← release owners, deprecation, ownership
│   ├── release-cadence.md
│   ├── deprecation-process.md
│   ├── ownership.md            ← CODEOWNERS explainer
│   └── docs-health.md          ← freshness report (v1 Phase 7)
│
├── for-internals/              ← SWC framework internals
│   ├── architecture.md         ← (base classes, composite pattern, style scaffolding)
│   ├── theme-scaffolding.md    ← how .swc-theme and dynamic-scaling tokens actually work
│   ├── font-loader.md          ← from fonts.mdx internals portion (dynamic subsetting, CSS Font Loading API, HTTP 412)
│   ├── cem-pipeline.md         ← JSDoc → CEM → blocks flow
│   └── cascade-layer.md        ← why swc-global-element-overrides exists
│
├── for-agents/                 ← AI/LLM audience (Nord pattern)
│   ├── README.md               ← explains how agents consume SWC docs
│   ├── llms-txt.md             ← what's in llms.txt / llms-full.txt
│   └── skill-install.md        ← the `npx skills add` instruction
│
├── rfcs/                       ← NEW (RSP/Fluent/Carbon pattern)
│   ├── template.md
│   ├── README.md               ← RFC process
│   ├── accepted/
│   ├── proposed/
│   └── superseded/
│
├── reference/                  ← cross-audience reference material
│   ├── glossary.md             ← canonical terms (--swc-*, "migration", "entity", etc.)
│   ├── docs-architecture.md    ← this plan's ADR; the system-of-record for docs
│   ├── component-status.md     ← component matrix (already shipped as CONTRIBUTOR-DOCS/00_get-started/component-matrix.md — move)
│   └── principles.md           ← design/engineering principles
│
├── project-planning/           ← kept temporarily; reorganized and audited in MVP-η (final v2 phase). See "Project-planning audit" below.
│   └── (existing content, pending triage in MVP-η)
│
└── README.md                   ← top-level index, persona-first
```

#### What happens to the numeric-prefix folders?

`00_get-started/`, `01_contributor-guides/`, `02_style-guide/`, etc. get retired in favor of audience folders. **Content moves; no content is deleted without explicit review.** Numeric prefixes survive only inside intra-folder ordering if the ordering is obvious and long-lived (e.g. `for-contributors/author-a-component/01-prep.md`, `02-setup.md`). Where ordering isn't essential, frontmatter `order:` replaces the prefix.

#### Filename convention

- **Audience is encoded by folder**, not filename suffix. `for-consumers/load-fonts.md`, not `load-fonts-consumer.md`.
- **Filenames are verb-first task names** ("load-fonts", "author-a-component", "release-cadence") where content is task-shaped.
- **Filenames are topic nouns** ("glossary", "cem-pipeline", "architecture") where content is reference-shaped.
- **No filenames like `getting-started-developers.md` / `getting-started-designers.md`** — that's the RHDS pattern we avoid. Folder encodes audience; filename doesn't repeat it.

#### Style guide organization

The existing style guide is deliberately granular — 7 CSS docs, 17 TypeScript docs, 10 testing docs — each narrow enough to link to from a PR review, a skill, or a lint rule. **We preserve that granularity.** Collapsing into "one big file per focus" loses the single-concept-per-URL property that makes deep linking useful.

Rules for `for-contributors/style-guide/`:

- **One subdirectory per focus** (`css/`, `typescript/`, `testing/`, plus flat `linting-tools.md`). Each focus keeps its own `README.md` as the focus index.
- **Numeric prefixes drop** — ordering moves to frontmatter `order:` fields. This frees file renames from triggering renumbering cascades.
- **Filenames drop the prefix** but keep their descriptive names (e.g. `01_component-css.md` → `component-css.md`).
- **Content is not rewritten in MVP-β** — only moved and renamed. Any content audit/consolidation happens in follow-up PRs per focus, not in the restructure itself.
- **Adding to style-guide does not require a new focus folder.** If `typescript/` grows a cluster of 5+ related files, break them out into a nested folder (e.g. `typescript/composition/`) rather than creating a peer focus folder. Focus folders are for cross-cutting concerns, not any grouping.

#### Project-planning audit (deferred to MVP-η)

The current `CONTRIBUTOR-DOCS/03_project-planning/` directory is under-maintained and has ambiguous scope — it mixes objectives, workstreams, per-component tracking, milestones, and at least one RFC (`05_strategies/focus-management-strategy-rfc.md`). Rather than fold it into an audience folder prematurely and risk misclassifying content, we **defer its audit to the last v2 phase (MVP-η)** so conflicting guidance (if any) surfaces after the audience folders have been populated. At that point we can confidently triage each file: keep, relocate, or delete-as-covered.

Expected triage buckets for MVP-η:

- **Move to `rfcs/`** — anything proposing a new decision, including `focus-management-strategy-rfc.md` (already called out in MVP-α)
- **Move to `for-maintainers/`** — release planning, workstreams, milestones, objectives-and-strategy
- **Move to `reference/component-status.md` sidecars** — per-component tracking data; convert to YAML sidecars (RHDS pattern)
- **Delete** — anything already covered by the new audience-folder structure with no unique information
- **Archive in `project-planning/_archive/`** — historical artifacts that aren't covered elsewhere but aren't worth surfacing in the live tree

### Per-component shape (genre: `component`)

Informed by Shoelace's single-file model + Fluent's `library/docs/` split + RSP's MDX-with-generated-tables pattern. Note the split across two packages: **core holds the base class + types (framework-internals surface); swc holds the composite class, stories, and narrative docs (consumer surface).**

```
2nd-gen/packages/core/components/<name>/
├── <Name>.base.ts                          ← base class; framework-internals JSDoc lives here
├── <Name>.types.ts                         ← types
└── ...

2nd-gen/packages/swc/components/<name>/
├── <Name>.ts                               ← composite class (`@element swc-<name>`) — **class JSDoc is the API + description SSOT** consumed by CEM → Storybook subtitle + docs page
├── README.mdx                              ← narrative SSOT (consumer-audience)
├── docs/
│   ├── migration.mdx                       ← (from 1st-gen; already landed for migrated components)
│   ├── spec.md                             ← optional; design/engineering prior art (Fluent's SPEC.md)
│   └── a11y-notes.md                       ← optional; component-specific contributor-audience a11y (supplements general-purpose for-contributors/testing/accessibility.md)
├── stories/
│   └── <name>.stories.ts                   ← executable-only (prose stripped per MVP-4)
└── ...
```

Rules:

- `README.mdx` is **consumer-audience** and is the content pulled into Storybook's component page.
- `docs/spec.md` is **contributor-audience** and stays GitHub-only (not in Storybook sidebar).
- `docs/a11y-notes.md`, if it exists, is **contributor-audience** — component-specific testing notes that supplement the general `for-contributors/testing/accessibility.md`.
- **Anything intended to render in Storybook (subtitle, overview prose, `@fires` / `@csspart` / `@cssprop` tables) lives on the composite `<Name>.ts` class, not `<Name>.base.ts`.** CEM emits a separate entry per class and does not propagate JSDoc from base to subclass — prose on the base is invisible to Storybook. Framework-internals notes that don't need to render (shared behavior rationale, cross-component invariants) stay on the base class and are consumed by the internals audience via source reading.
- **Discoverability from `CONTRIBUTOR-DOCS/README.md` is automated.** Because `README.mdx` is colocated with component source (not under `CONTRIBUTOR-DOCS/`), a script (`update-nav.js` extension, or a sibling) scans `2nd-gen/packages/swc/components/*/README.mdx` and generates a "Components" section in `CONTRIBUTOR-DOCS/README.md` between generator markers. Adding a new component does not require editing the CONTRIBUTOR-DOCS index by hand.

### Delivery surfaces — explicit separation

| Surface | Primary audience | Content from | What renders |
|---|---|---|---|
| **Storybook (production build)** | Consumer | `for-consumers/` + per-component `README.mdx` + `reference/` (selected) | Consumer docs, component pages, API tables |
| **Storybook (dev build, `yarn dev`)** | Consumer + contributor + maintainer | All of above + `for-contributors/` + `for-maintainers/` + `project-planning/` | Everything; contributor sections gated by `storybookMode !== 'build'` (per v1 MVP-3) |
| **GitHub CONTRIBUTOR-DOCS/ tree** | Contributor + maintainer + internals | Authored MD under `for-contributors/`, `for-maintainers/`, `for-internals/`, `rfcs/` | Rendered by GitHub's Markdown view; linked from README.md |
| **GitHub repo root README** | Everyone | Hand-authored, thin | Project overview + links out |
| **Package READMEs** (`@adobe/spectrum-wc/*`) | Consumer (npm browser) | Generated or thin-stub | 10–20 lines: install, first example, link to Storybook |
| **llms.txt + llms-full.txt** | Agent | **Generated** by `generate-llms-txt.mjs` from `for-agents/` + CEM + selected summaries; wired into `yarn storybook` and `yarn storybook:build` like `generate-contributor-docs.mjs` (no drift possible). CI check in Phase 7 (`validate-llms-txt.js`) confirms files exist and stay under token budgets. | Token-sized summaries, two variants (Nord pattern) |
| **`.ai/skills/` exposed via install URL** | Agent | Hand-authored skill definitions (curated subset — see "Skills publishing strategy" below) | `npx skills add <url>` installs SWC-awareness skills into the user's agent |

#### `.ai/` vs `for-agents/` — two different things

Both tiers deal with agents, but they answer different questions and must not conflict:

| Concern | `.ai/` (repo-internal) | `for-agents/` (docs-public) |
|---|---|---|
| **Audience** | Agents working **inside the SWC repo** (migrating components, authoring stories, updating docs) | Agents working **in a consumer's app** that uses SWC |
| **What lives there** | Rules, skills, scripts, config, handoffs — the contract between Claude/Cursor and this repo | Summaries, quickstart instructions, component inventories, install URLs — what an agent outside the repo needs to reason about SWC |
| **Shipping** | Shipped in the git tree; not published to npm | Published to the docs site + via `llms.txt` + via skill install URL |
| **Drift risk** | Low (used locally; edited alongside code) | High without generation — **`for-agents/README.md` and `llms.txt` must be regenerated from authoritative sources each build** (class JSDoc, CEM, `for-consumers/` content), same way `generate-contributor-docs.mjs` works |
| **Where a thing goes** | Rule for in-repo work → `.ai/rules/`. Skill for in-repo work → `.ai/skills/` | Reference for consumer-agent → `for-agents/`. Token-budget summary for external LLMs → `public/llms.txt` |

**Rule of thumb:** if the artifact is **written for an agent reading the SWC source as it edits it**, it's `.ai/`. If it's **written for an agent reading SWC docs from outside the repo to help someone use SWC**, it's `for-agents/`.

#### Skills publishing strategy

Not every `.ai/skills/*/SKILL.md` should be exposed via `npx skills add`. Curate:

- **Ship publicly:** skills that help a consumer's agent reason about SWC (e.g. `consumer-migration-guide`, a future `install-swc`, a future `pick-a-component`). These are re-homed under a published namespace referenced by `for-agents/skill-install.md`.
- **Keep internal:** skills for SWC maintainers / contributors (migration tooling, contributor-docs-nav, entity-authoring). These stay under `.ai/skills/` without a public install URL.
- **Audit before MVP-ζ:** before wiring the install URL, walk every `.ai/skills/*` and tag each `internal` or `public`. Skills without an explicit tag default to `internal`. Record the split in `for-agents/skill-install.md`.

### MVP sequence

#### Already shipped on `caseyisonit/docs-mvp` (v1)

- ✓ **MVP-1** — Consumer landing + Get started (shipped)
- ✓ **MVP-2** — `generate-contributor-docs.mjs` (shipped; collapses duplicate tree)
- ✓ **MVP-3** — Persona sidebar in Storybook `main.ts` (shipped in part; will need update to new audience folders — see MVP-β below)
- ✓ **MVP-4** — Strip story prose / SSOT description on class JSDoc (shipped)
- ✓ **MVP-6a** — Component matrix (shipped)
- ⚠ **MVP-6b** — Customization cheatsheet (**partially reverted**; MVP-6b coupling in `preview.ts`, `generate-contributor-docs.mjs`, `typography.stories.ts`, `for-consumers.md`, 2 READMEs, and `.gitignore` reverted. The 5 source MDX files (`guides/customization/{getting-started,component-styles,fonts,global-elements,theme-scales}.mdx`) are restored to the working tree as source material for MVP-γ. The consolidated `customization-cheatsheet.md` is kept untracked as an editorial reference.)
- ✓ **MVP-6c** — when-to-use-swc restructure (shipped standalone)

#### Transitional git state (entering v2 MVP-α)

Clean starting point for the next agent:

- `when-to-use-swc.mdx` — **committed** (MVP-6c)
- 5 customization MDX files — **live in working tree**, unmodified from pre-MVP-6b state
- `customization-cheatsheet.md` — **untracked** in `CONTRIBUTOR-DOCS/00_get-started/`, kept as editorial reference for MVP-γ splits
- No MVP-6b coupling in `.gitignore`, `preview.ts`, `generate-contributor-docs.mjs`, `typography.stories.ts`, `for-consumers.md`, or the two `README.md` nav files

#### New v2 MVP sequence

**MVP-α: RFC folder + template + first ADR** (1 day)

Adopt the RSP/Fluent/Carbon pattern.

- `rfcs/template.md` (cribbed from RSP's template: Summary / Motivation / Detailed Design / Documentation / Drawbacks / Backwards Compatibility / Alternatives)
- `rfcs/README.md` explaining the process
- `rfcs/proposed/2026-04-22-docs-overhaul-v2.md` — this plan, seeded as the **first RFC** to validate the template and folder. Committed on the `caseyisonit/docs-mvp` branch, **not merged to main**; merge happens after the RFC review process runs against itself. Moves to `rfcs/accepted/` once the process concludes.
- `rfcs/proposed/2026-04-22-focus-management-strategy.md` — migrated from `CONTRIBUTOR-DOCS/03_project-planning/05_strategies/focus-management-strategy-rfc.md`. This both relocates an existing RFC to its proper home and gives us a second real-world document to stress-test the template on.
- `rfcs/` is **GitHub-only** (not in Storybook sidebar) — not even in the dev build. Contributors discover it via `CONTRIBUTOR-DOCS/README.md`.

**PR boundary.** One PR. Independent of MVP-β sequencing.

---

**MVP-β: Audience-folder restructure of CONTRIBUTOR-DOCS** (3–4 days; structural move)

The core v2 move. Mechanical but high-value.

- Create `for-consumers/`, `for-contributors/`, `for-maintainers/`, `for-internals/`, `for-agents/`, `rfcs/`, `reference/`
- Move existing MD files to their primary-audience folder. **No content deleted; every file either moves or splits.**
- Update intra-doc links (mostly handled by `update-nav.js` once its link-check runs)
- Update `generate-contributor-docs.mjs` path maps (LEARN_OUTPUT_DIR etc.) to consume new paths
- Update `.ai/rules/contributor-doc-update.md` to reference new tree
- Verify no orphan content: everything in the old numeric-prefix folders has a new home

**Expected moves:**

| From | To |
|---|---|
| `00_get-started/for-consumers.md` | `for-consumers/get-started.md` |
| `00_get-started/component-matrix.md` | `reference/component-status.md` |
| `00_get-started/customization-cheatsheet.md` | **SPLIT** — see MVP-γ |
| `01_contributor-guides/*` | `for-contributors/*` |
| `02_style-guide/*` | `for-contributors/style-guide/*` |
| `project-planning/*` | `project-planning/*` (unchanged) |

**PR boundary.** One PR — pure file moves + path-map updates. Reviewable as a git-history-only change; content diff should be ≤0 per file.

---

**MVP-γ: Split the customization cheatsheet by audience** (1–2 days; validates the v2 principle)

The customization cheatsheet that just landed is v2's first real test. Split it:

- **`for-consumers/install-stylesheet.md`** ← from §Install + §Override application background + §PostCSS Preset Env
- **`for-consumers/customize-components.md`** ← from §Override component styles with --swc-*
- **`for-consumers/themes-and-scales.md`** ← from §Themes and scales
- **`for-consumers/load-fonts.md`** ← consumer-only portion of §Fonts: Option 1 (Adobe Fonts), Option 2 (self-hosted), font stacks, one line on CJK (pointing to internals)
- **`for-consumers/global-elements.md`** ← from §Style native elements + §`.swc-Button`
- **`for-consumers/migrate-from-1st-gen.md`** ← §Migration from 1st-gen + pointer to per-component migration.mdx
- **`for-internals/font-loader.md`** ← deep CJK mechanics (HTTP 412, dynamic subsetting, document.fonts, CSS Font Loading API) — the content currently cut from the cheatsheet fonts section
- **`for-contributors/storybook/language-toolbar.md`** ← Storybook Language toolbar preview mechanics (the "when authoring stories, locales load on demand via the toolbar" content)

The single cheatsheet page is **replaced** on the Storybook side by a landing page (`learn-about-swc/customization.mdx`) that is itself a thin index linking to the `for-consumers/` customization files, OR (preferred) lets the sidebar structure carry the navigation and has no landing at all.

**Content source:** the 5 original `guides/customization/*.mdx` files are live in the working tree (restored during git triage before MVP-α). The untracked `CONTRIBUTOR-DOCS/00_get-started/customization-cheatsheet.md` draft serves as an editorial reference for how the consumer portions were already re-worded and trimmed. No `git show` / history recovery needed — both inputs are on disk.

**Content preserved:** every paragraph and code block from the 5 original MDX files lives somewhere in the new tree. Content that MVP-6b's cheatsheet draft cut (fonts internals, Storybook mechanics) routes to `for-internals/` and `for-contributors/storybook/` rather than being dropped.

**PR boundary.** One PR; depends on MVP-β being landed.

---

**MVP-δ: Audience-splits for other cross-cutting topics** (3–4 days, parallelizable)

Apply the MVP-γ pattern to each remaining mixed-audience topic. One PR per topic.

| Topic | Consumer file | Contributor file | Internals file |
|---|---|---|---|
| Accessibility | `for-consumers/accessibility.md` (how to use SWC accessibly) | `for-contributors/testing/accessibility.md` (how to write a11y tests) | `for-internals/a11y-architecture.md` (aria scaffolding, cross-root-aria) |
| Testing | (n/a — consumers don't test SWC internals) | `for-contributors/testing/{unit,visual-regression,stackblitz}.md` | `for-internals/test-infrastructure.md` |
| Theming | `for-consumers/themes-and-scales.md` (MVP-γ already) | (n/a) | `for-internals/theme-scaffolding.md` |
| Tokens | `for-consumers/tokens-reference.md` (or folded into customize-components) | `for-contributors/authoring-tokens.md` | `for-internals/token-pipeline.md` |

Each PR: move/split, cross-link, delete-if-empty.

---

**MVP-ε: Package README slim-down** (1 day)

Universal pattern from all six systems. Package READMEs become 10–20 line stubs:

```markdown
# @adobe/spectrum-wc

Spectrum 2 design system, web components. Full docs at <https://spectrum-web-components.adobe.com/>.

## Install

    yarn add @adobe/spectrum-wc

## First component

    <link rel="stylesheet" href="/node_modules/@adobe/spectrum-wc/swc.css" />
    <script type="module">import '@adobe/spectrum-wc/components/badge';</script>
    <swc-badge>Approved</swc-badge>

See the [Get started](https://spectrum-web-components.adobe.com/?path=/docs/get-started--docs) guide.
```

> Note: 2nd-gen's canonical docs URL is [spectrum-web-components.adobe.com](https://spectrum-web-components.adobe.com/). The legacy `opensource.adobe.com/spectrum-web-components/` URL continues to serve the 1st-gen site; links in v2 assets point to the new host.

- Update all `2nd-gen/packages/*/README.md` to the stub pattern
- Script it where possible (generated stubs); hand-authored where necessary
- Leave 1st-gen READMEs alone; they follow a different `.ai/rules/component-readme.md` contract

**PR boundary.** One PR; scan-review (all files same pattern).

---

**MVP-ζ: Agent audience tier — `/for-agents/` + llms.txt** (2 days)

Adopt the Nord pattern.

- Ship `for-agents/README.md` describing the audience
- Generate `public/llms.txt` (5K-token summary) and `public/llms-full.txt` (full docs digest) from existing content. Script lives at `2nd-gen/packages/swc/scripts/generate-llms-txt.mjs`.
- Expose `.ai/skills/` via a stable URL (already there) + document the `npx skills add` instruction in `for-agents/skill-install.md`
- Add `CONTRIBUTOR-DOCS/for-agents/` links to the repo root README

**Note:** `public/llms.txt` and `public/llms-full.txt` are already in `.gitignore` at line 136–137 — we're already planning for this; just wire it up.

**Relationship to `.ai/`:** see "`.ai/` vs `for-agents/` — two different things" in the Delivery surfaces section above. Summary: `.ai/` is for agents editing the SWC repo; `for-agents/` is for agents reading SWC docs to help someone *use* SWC. They do not conflict because their audiences don't overlap. Prereq for this MVP: run the "Skills publishing strategy" audit first so the install URL exposes a curated subset rather than everything under `.ai/skills/`.

**PR boundary.** One PR.

---

**MVP-η: Project-planning audit** (2–3 days; last v2 MVP)

Runs **last** so the audience folders are already populated and we can confidently decide what in `project-planning/` is genuinely orphaned vs still load-bearing.

- **Inventory.** List every file under `CONTRIBUTOR-DOCS/03_project-planning/` with `last-modified`, `last-author`, and a one-line purpose guess.
- **Triage each file** into the buckets defined in "Project-planning audit" above (move to `rfcs/`, move to `for-maintainers/`, convert to per-component YAML sidecar, delete as covered, archive).
- **Surface conflicts.** When a planning doc contradicts guidance in a new audience folder, capture the conflict, resolve it (the newer/clearer source wins by default), and note the resolution inline.
- **Delete or archive the empty shell.** After triage, either `project-planning/` is empty (delete) or it holds only archive material (rename to `project-planning/_archive/` under `for-maintainers/` or `reference/`).
- **Update `generate-contributor-docs.mjs`** if project-planning was in the path map (it currently is — remove it).

**PR boundary.** One PR. Last in the v2 sequence so we review against the final IA, not a half-migrated one.

---

#### v1 MVPs that carry forward unchanged

These MVPs were authored in the v1 plan and remain valid under v2. They execute after the v2 restructure MVPs (α through η) land, against the new audience-folder tree.

**MVP-5: CEM extension plugin + block library scaffold** (~2 days)

Extends `2nd-gen/packages/swc/cem.config.js` with a plugin that parses new custom JSDoc tags and emits them into the Custom Elements Manifest. Scaffolds the block library with renderers for the highest-traffic blocks so MVP-7 (Badge pilot) can consume them immediately.

*Plugin additions (four new tags):*

- `@genre` — top-level entity type (component, controller, token-family, pattern); attached to the class CEM entry so downstream tooling can filter.
- `@category` — taxonomy string for sidebar grouping.
- `@related` — array of sibling entity names; used by the `<RelatedEntities>` block.
- `@RSPparity` — React Spectrum 2 parity status. Allowed values: `full`, `partial`, `none`, or a short note. Consumed by the component matrix (shipped as `reference/component-status.md` under v2); once this tag is parsed into CEM the existing YAML override file drops its `parity` field.

`@a11yPattern`, structured `@deprecated`, and `@example` can land in a follow-up; the pilot uses them but the CEM plugin can parse them as plain strings initially.

*Block scaffold:*

- `<ApiTable>` — already exists; audit for new-tag support.
- `<EventsTable>` — new; reads `events[]` from CEM.
- `<Subtitle />` — audit to read the class `@summary` from CEM instead of `parameters.docs.subtitle` (per MVP-4, already shipped).
- `<CssPartsTable>`, `<CssPropsTable>`, `<EmbedStory>`, `<RelatedEntities>` — stubs in this PR with TODO comments; fleshed out in v1 Phase 2.

**MVP-7: Badge pilot — full JSDoc contract + first `README.mdx`** (~3 days)

Picks Badge (small, already migrated, already the example in `.ai/rules/`) and takes it end-to-end on the new pattern so it becomes the canonical reference other entities clone. Three deliverables in one PR:

1. **Full JSDoc contract on the composite Badge class** at `2nd-gen/packages/swc/components/badge/Badge.ts`: standard tags (`@fires`, `@csspart`, `@cssprop` with `--swc-*` prefix only, `@slot`, `@summary`) plus the new tags from MVP-5.
2. **New `2nd-gen/packages/swc/components/badge/README.mdx`** using the composed template from Phase 1. Required sections: Overview (from class `@summary`); `<ApiTable>`; `<EventsTable>`; `<CssPartsTable>`; `<CssPropsTable>`; Usage (2–3 stories embedded via `<EmbedStory>` each with up to 3 sentences of per-example prose); Accessibility; Migration (pointer to `migration.mdx` if it exists); `<RelatedEntities>`.
3. **Stories stripped of prose** per MVP-4 (already shipped). Story exports describe executable configurations only.

Depends on MVP-5 being merged first.

#### v1 Phases that carry forward with minor adjustments

Where v1 said "phase," read "multi-week workstream following the restructure." Each phase is its own body of work; within a phase, individual pieces land as separate PRs.

**Phase 1 — SSOT architecture + composed template** (~1 week)

Declares the rules of the road before mass-migrating content, and gives authors one composed template that scales by genre rather than five parallel templates that will drift apart.

*Deliverables:*

- `CONTRIBUTOR-DOCS/reference/docs-architecture.md` — the docs equivalent of an ADR; defines content types and SSOTs (API → class JSDoc → CEM; narrative per entity → `README.mdx`; contributor guides → MD under audience folders), the three-file per-entity shape, delivery surfaces, and an anti-pattern list.
- One composed MDX template at `for-contributors/author-a-doc.md`'s accompanying `templates/entity-readme.mdx`. Single skeleton with required frontmatter (including `genre`); blocks render conditionally based on genre.
- Three MD-only templates alongside: `consumer-quickstart.md` (already seeded in MVP-1), `contributor-howto.md`, `adr.md`.
- Block library at `2nd-gen/packages/swc/.storybook/blocks/` — filled in from MVP-5 stubs.
- `reference/glossary.md` — canonical terms (`--swc-*`, "migration", "entity") with aliases to avoid.
- Frontmatter schema at `.ai/rules/docs-frontmatter.md`: required keys (`audience`, `genre`, `order`, `last-reviewed`, `tags`, `status`), allowed values per key.
- Heading rule at `.ai/rules/docs-headings.md`: keyword-first phrasing, kebab-case anchors, anchor-stability policy.
- `.ai/rules/entity-authoring.md` — codifies the three-file shape and "stories have no prose" contract.
- `.ai/rules/docs-ssot.md` — enforceable rule: "don't duplicate content across MD and MDX; author in MD, generate MDX." Validated by a new check in `.ai/scripts/validate.js`.
- Add an ADR at `rfcs/accepted/` for the SSOT contract.

**Phase 2 — Full JSDoc contract rollout + retire auto-section template** (~2–3 weeks, parallelizable)

Takes all migrated entities to the MVP-7 Badge standard, then retires the old story-tag-driven auto-section mechanism from `DocumentTemplate.mdx` now that every entity has a `README.mdx` of its own.

*Deliverables:*

- Per-entity rollout: bring all migrated components (9 today, more incoming) to the full JSDoc contract from MVP-7. Each entity gets a `README.mdx` using the composed template; stories stripped of prose. Once `@RSPparity` is set on every entity, the `parity` override drops from `component-matrix.data.yml`.
- `.ai/skills/entity-authoring/SKILL.md` — checklist-driven; walks one entity at a time through the three-file shape.
- `.ai/scripts/validate-jsdoc-completeness.js` — CI linter. Fails if a component fires events in code but has no `@fires`, uses `::part(…)` in CSS but no `@csspart`, or has JSDoc prose on story exports.
- `.ai/scripts/validate-entity-shape.js` — ensures each migrated entity has the required three-file shape.
- Retire `DocumentTemplate.mdx` auto-sections: once every entity has its own `README.mdx`, the `ConditionalSection` scaffolding is dead code. Remove it. `DocumentTemplate.mdx` becomes a thin shim that renders the entity's `README.mdx` and any advanced example stories.

*Stopping rule.* Every migrated entity has a `README.mdx`; the block library reports 100% of the real API surface; `DocumentTemplate.mdx` no longer branches on story tags.

**Phase 3 — IA restructure of CONTRIBUTOR-DOCS** — **superseded by MVP-β.** Deleted from the plan; v2's audience-folder restructure is the successor.

**Phase 4 — Visual-first content pass** (ongoing, ~2 weeks concentrated)

The existing `stories-documentation.md` rule pushes toward tables and structure, but most existing prose wasn't written that way. Retrofit high-traffic pages.

For each high-traffic guide, replace prose with one of:

- Comparison table (e.g. size tokens, variant semantics)
- Decision tree (mermaid) (e.g. "picker vs menu vs combobox")
- Before/after pair (e.g. 1st-gen → 2nd-gen migration diffs)
- Live sandbox embed (Storybook's StackBlitz addon)

Add `.ai/rules/visual-first-docs.md` with reusable snippets (mermaid blocks, table templates).

*Targets:* component authoring guide, accessibility testing guide, theming guide, 1st-gen-vs-2nd-gen page. One PR per target page.

**Phase 5 — Authoring greenfield 2nd-gen components** (~1 week)

Current `.ai/skills/migration-*` skills cover 1st→2nd-gen migration. No guide exists for **net-new** components — a discoverability cliff for future contributors.

*Deliverables:*

- `.ai/skills/authoring-2nd-gen-component/SKILL.md` — checklist-driven, maps 1:1 to the migration phases (prep / setup / API / styling / a11y / testing / documentation / review) but starts from an empty folder. Emits the three-file shape from Phase 1.
- A scaffolding script (Plop generator, matching the Shoelace pattern) that emits the file skeleton: `Base.ts`, `Types.ts`, `Component.ts`, `component.css`, `README.mdx`, `stories/component.stories.ts`, test files, changeset.
- `for-contributors/author-a-component.md` — human-facing companion to the skill.

**Phase 6 — Delivery & transform pipeline hardening** (~1 week)

Today's transforms (`update-nav.js`, `generate-contributor-docs.mjs`, CEM, `generate-llms-txt.mjs`) work but aren't wired into CI or to each other. Formalize.

The repo already ships three delivery surfaces (`publish-docs-site.yml`, `publish-2ndgen-docs.yml`, `preview-docs.yml`). This phase wires them to a single source of truth.

*Deliverables:*

- Single `yarn docs:build` in the 2nd-gen workspace that runs: CEM generation → nav update → MD-to-MDX → link verify → llms.txt generation → Storybook build.
- Extend `.github/workflows/lint.yml` to call `docs:build` on every PR touching `CONTRIBUTOR-DOCS/`, `.storybook/`, or `2nd-gen/packages/**/*.{ts,mdx,md}` (via `paths:` filter).
- `publish-docs-site.yml` — ensure its build consumes the same MD SSOT as Storybook.
- `preview-docs.yml` — post preview URLs for both Storybook and docs site in PR comments.

**Phase 7 — Freshness & contract enforcement** (ongoing)

Docs rot is the default. Visible rot is fixable; invisible rot isn't. Contracts only help if they're enforced — otherwise they're aspirations. Three enforcement layers, all real CI:

*CI layer* — new scripts as siblings to existing `.ai/scripts/validate-*.js`, wired into `.ai/scripts/validate.js` (run by `.github/workflows/lint.yml` via `yarn lint:ai`). Block PRs on failure.

- `validate-frontmatter.js` — schema per `.ai/rules/docs-frontmatter.md`.
- `validate-jsdoc-schema.js` — required tags per entity genre; structured `@deprecated` shape; `@cssprop` uses `--swc-*` prefix only; `@example` body is code-only.
- `validate-terminology.js` — flags alias terms where canonical should be used (per glossary).
- `validate-headings.js` — keyword-first check + kebab-case anchor check.
- `validate-anchors.js` — cross-doc links resolve; renamed anchors have `_redirects.yml` entries.
- `validate-markup.js` — backticks/bold/italic conform to `.ai/rules/text-formatting.md`.
- `validate-examples.js` — each `<EmbedStory>` has a preceding `h3` and up to 3 sentences of prose; runnable code fences lint/compile.
- `validate-entity-shape.js` — each migrated entity has class JSDoc + `README.mdx`.
- `validate-ssot.js` — no duplicate content across MD and MDX trees.
- **v2 additions** to this validator set:
  - `validate-audience-folder.js` — every MD under CONTRIBUTOR-DOCS is in exactly one audience folder; filenames don't encode audience redundantly.
  - `validate-package-readme-shape.js` — package READMEs conform to the stub template.
  - `validate-llms-txt.js` — `public/llms.txt` and `public/llms-full.txt` exist and are under their token budgets.
- Existing `verify-links.js` — run in CI, not just locally.

*Pre-commit layer* — `.husky/pre-commit` already exists; extend `lint-staged`:

- Frontmatter / heading / markup validators on staged `.md`/`.mdx` only (fast path).
- Prettier on markdown.
- JSDoc-completeness on staged `.ts`.

*Editor layer*:

- `markdownlint-cli2` with custom rules mirroring the doc validators.
- `.vscode/extensions.json` recommends markdownlint.

*Freshness rhythm:*

- `last-reviewed: YYYY-MM-DD` frontmatter on every guide (Phase 1 schema); `update-nav.js` surfaces pages stale > 6 months in a generated report.
- New CI job (`.github/workflows/docs-health.yml`) runs weekly, opens an issue if stale-count increases.
- Quarterly docs-audit ticket template.

Validators land one at a time in warn-only mode, then flip to error mode after the codebase is cleaned up for that rule. Suggested order, easiest-to-hardest: `validate-frontmatter` → `validate-terminology` → `validate-headings` → `validate-markup` → `validate-anchors` → `validate-audience-folder` → `validate-package-readme-shape` → `validate-jsdoc-schema` → `validate-examples` → `validate-entity-shape` → `validate-ssot` → `validate-llms-txt`.

### Recommended v2 PR sequence (after this plan is approved)

1. **MVP-α** — RFC folder + template + this plan as first (proposed) RFC on the branch. **(Start here to ratify the plan itself via an RFC on-branch.)** Independent; tiny PR.
2. **MVP-β** — Audience-folder restructure. Largest PR; pure file moves + style-guide sub-folder flattening. Must review carefully.
3. **MVP-γ** — Customization cheatsheet split (fixes the shipped-but-audience-mixed content)
4. **MVP-δ** — Other cross-cutting topic splits, one PR per topic, in parallel
5. **MVP-ε** — Package README slim-down, parallel with MVP-δ
6. **MVP-ζ** — Agent tier + llms.txt. Run the skills-publishing audit first. Parallel with MVP-δ.
7. **MVP-η** — Project-planning audit (last v2 MVP; runs after audience folders are populated)
8. **(resume v1)** MVP-5 — CEM extension
9. **MVP-7** — Badge pilot using the new README.mdx shape under the audience-folder structure
10. **Phases 1, 2, 4, 5, 6, 7 (updated)** — as in v1 but with Phase 3 deleted and Phase 7 extended

## Documentation

This RFC itself is the documentation surface for the new architecture. Follow-on doc deltas required to execute it:

- **New:** `CONTRIBUTOR-DOCS/rfcs/README.md` and `rfcs/template.md` (landed in MVP-α alongside this RFC).
- **New:** `CONTRIBUTOR-DOCS/reference/docs-architecture.md` — ADR form of this RFC's decisions, landed alongside MVP-β. Points back to this accepted RFC for historical context.
- **New:** `CONTRIBUTOR-DOCS/reference/glossary.md` — canonical terms (`--swc-*`, "migration", "entity"), landed during MVP-β.
- **Updated:** `.ai/rules/contributor-doc-update.md` — reflect the new tree; Operator instructions for `update-nav.js` no longer reference numeric-prefix folders.
- **Updated:** `.ai/rules/storybook-mdx-conversion.md` — `generate-contributor-docs.mjs` path maps consume new audience folders.
- **Updated:** `CONTRIBUTOR-DOCS/README.md` — persona-first index; auto-generated "Components" section between marker comments.
- **Updated:** `2nd-gen/README.md` — include-by-reference updates for the relocated `for-consumers/get-started.md`.
- **Regenerated every build:** Storybook sidebar via `main.ts` audience-tiered `titlePrefix` values; `public/llms.txt` and `public/llms-full.txt`; auto-generated "Components" index.
- **Existing pages replaced wholesale:** numeric-prefix folders (`00_get-started/`, `01_contributor-guides/`, `02_style-guide/`). Content moves to audience folders; nothing is deleted without explicit review per file.

## Drawbacks

Honest drawbacks — none of these sink the RFC, but each is a real cost:

- **Large one-shot restructure (MVP-β) is risky to review.** A pure-move PR is still hundreds of file renames; reviewers can't "diff the content" because the content is unchanged. Mitigation: land MVP-β as a rename-only PR with no content edits; run `update-nav.js` in a follow-up that's easier to review.
- **Link rot during the transition window.** External blog posts, Slack threads, and tickets link into the old numeric-prefix paths. Until `_redirects.yml` (Phase 7) lands, these break. Mitigation: inventory inbound links before MVP-β, set up GitHub redirect stubs or keep numeric-prefix symlinks for one release.
- **Audience is sometimes fuzzy.** A file like "how to add a new component" arguably serves both contributors and maintainers; "theme-scaffolding" arguably serves both internals and advanced consumers. The rule of "one primary audience" forces a judgment call that will occasionally be wrong. Mitigation: cross-link generously, and let MVP-η surface miscategorizations empirically.
- **Five folders is more than four.** Some projects survive with consumer/contributor only. Adding internals + agent + maintainer introduces cognitive cost for anyone skimming the top-level tree. Mitigation: top-level `CONTRIBUTOR-DOCS/README.md` is persona-first and explains "which one are you?" in the first screen.
- **Composite-class JSDoc as SSOT doubles authoring work when the composite class is genuinely thin.** For components that are pure `extends Base`, writers must still author the Storybook-rendering JSDoc on the composite rather than the base. Mitigation: accept this as the cost of the rule; the alternative (CEM propagating base JSDoc to subclass) is not a lever we control.
- **Style-guide flattening changes every inbound link** to numeric-prefix style-guide files. Mitigation: symlink old paths for one release; Phase 7's `validate-anchors.js` blocks future regressions.

## Backwards compatibility

**Content-preservation contract:** No content is deleted without explicit review. Every paragraph and code block in the old tree has a home in the new tree or moves to `_archive/`. MVP-β is a rename-only PR; the diff-of-diffs on content is zero.

**Consumer-facing URL compatibility:** Storybook URL paths change when `titlePrefix` values change (already partially done in v1 MVP-3; MVP-β finishes it). External inbound links to Storybook paths break. Mitigation options:

- **Soft-redirect via Storybook `refs`** — low fidelity, not pursued
- **Explicit `_redirects.yml` sidecar** — Phase 7 deliverable; blocks on `validate-anchors.js`
- **Accept one-release break** — current default; revisit if analytics show significant inbound traffic

**GitHub blob URL compatibility:** `git mv` preserves history per-file, but external URLs like `github.com/.../CONTRIBUTOR-DOCS/01_contributor-guides/...` 404 after the rename. We do not rewrite external content; inbound SEO and bookmarks break once. This is acceptable for maintainer/contributor-audience content; it is **not** acceptable for consumer-audience content, which lives in Storybook (stable URL per `main.ts`).

**npm package README compatibility:** package READMEs ≤30 lines (MVP-ε) lose detail that was previously on npm's package page. This content is not lost — it moves to `https://spectrum-web-components.adobe.com/`. Acceptable because our npm page is not how consumers find SWC; they land via the docs site.

**No major version bump required.** None of this changes the public component API surface.

## Alternatives

Alternatives considered, with rejection rationale:

**1. Do nothing.** Keep v1's topic-first IA, accept that MVP-6b's consolidation is audience-mixed. *Rejected:* the wall v1 hit is structural, not editorial. More content will keep landing in audience-mixed files, and each landing increases the cost of eventually splitting.

**2. RHDS-style filename-suffix encoding** (`load-fonts-consumer.md`, `load-fonts-internals.md` all in one folder). *Rejected:* loses the "folder answers 'who's reading this'" property. Mixed folders mean readers still skim past content meant for someone else; the suffix is a weaker signal than a folder boundary.

**3. Carbon-style per-component tab split** (`/usage`, `/style`, `/code`, `/accessibility` as four separate pages per component). *Rejected:* ceremony-heavy at SWC's scale. One page per component (Shoelace/Nord model) is sufficient; audience-splitting happens at the cross-cutting docs layer, not per-component.

**4. Privatize maintainer docs** (Nord model). *Rejected:* SWC is OSS; maintainer docs must be public even if thin. The five-tier split does not require privatization — internals docs live in the public repo, they're just signposted as "here be dragons" via folder naming.

**5. Keep `rfcs/` under Storybook sidebar** (surface RFCs to consumers too). *Rejected:* RFCs are proposals, not shipped behavior. Surfacing them to consumers invites confusion ("is this what the component does now?"). GitHub-only mirrors RSP/Fluent/Carbon precedent.

**6. Fold internals back into contributor docs** (four tiers instead of five). *Rejected:* internals content is written for a narrower audience with different depth-vs-approachability tradeoffs. Contributors who will never touch the font loader should not have to skim past `document.fonts` HTTP 412 mechanics; the distinction is load-bearing.

**7. Ratify this plan via direct team review + Slack, skip the RFC ceremony.** *Rejected:* we want RFC muscle-memory for the many decisions that come after this one (focus management, Phase-1 SSOT contract, CEM extension tags). Using this plan as the first RFC stress-tests the template against a real proposal before smaller ones use it.

## Open questions

None — the following were previously open and have been resolved inline in Detailed design:

1. **Folder naming uses the `for-` prefix** (`for-consumers/`, `for-contributors/`, `for-maintainers/`, `for-internals/`, `for-agents/`). Reads naturally; consistent across all five audience folders.
2. **`reference/` exists as a peer of the audience folders.** Cross-audience reference material (glossary, docs-architecture, component-status) lives here because it isn't audience-scoped — everyone reads the glossary.
3. **Per-component `README.mdx` is colocated with component source** under `2nd-gen/packages/swc/components/<name>/`. To avoid manual index maintenance, `CONTRIBUTOR-DOCS/README.md` auto-generates its "Components" section by scanning the component directories (see Per-component shape → Rules).
4. **`for-agents/` ships on the same cadence as the rest of SWC** (same repo, same release). Independent publishing introduces versioning drift against the CEM/components and was not worth the flexibility.
5. **MVP-α ratifies this plan as the first RFC on the branch** (`caseyisonit/docs-mvp`), not merged to main. We use this plan to stress-test the RFC template before MVP-β executes.

Remaining verification items (not "open questions" in the RFC sense; tracked as acceptance criteria below):

- Every file in `CONTRIBUTOR-DOCS/` lives in exactly one audience folder (or `rfcs/`, `reference/`). After MVP-η, `project-planning/` is either gone or renamed to `_archive/`.
- No file contains content for more than one audience — `grep -l "for contributors:" for-consumers/` returns nothing; same check in reverse.
- `generate-contributor-docs.mjs` produces a working Storybook from the new tree; no dead links.
- The customization cheatsheet is gone from the codebase; its content is distributed across five+ audience-specific files with zero content loss.
- Package READMEs are all ≤30 lines and point to [spectrum-web-components.adobe.com](https://spectrum-web-components.adobe.com/).
- `public/llms.txt` exists and is under 5K tokens; `public/llms-full.txt` exists and is under 1M tokens; both regenerate on every `yarn storybook` / `yarn storybook:build`.
- `rfcs/` contains at minimum: `template.md`, `README.md`, `proposed/2026-04-22-docs-overhaul-v2.md` (this RFC), `proposed/2026-04-22-focus-management-strategy.md` (migrated). After this RFC is accepted, it moves to `rfcs/accepted/`.
- `CONTRIBUTOR-DOCS/README.md` has an auto-generated "Components" section between marker comments (no manual maintenance).
- `.ai/skills/*` are each tagged `internal` or `public`; only `public` skills are referenced from `for-agents/skill-install.md`.

## Scope exclusions

To prevent scope creep during implementation:

- **Does not delete 1st-gen docs.** 1st-gen has its own `.ai/rules/component-readme.md` contract and its own READMEs. v2 touches only 2nd-gen + top-level CONTRIBUTOR-DOCS.
- **Does not build a standalone docs site.** `publish-docs-site.yml` exists (1st-gen today) — v1 Phase 6 still governs hardening it for 2nd-gen. v2's five-audience model is compatible with whatever delivery surfaces we choose later.
- **Does not introduce a design-vs-engineering tab split** (Carbon model). SWC's scale and team composition don't justify it; single-page-per-component (Shoelace/Nord) wins.
- **Does not require the monorepo to go private.** Explicitly the opposite — the Nord anti-pattern is called out.
