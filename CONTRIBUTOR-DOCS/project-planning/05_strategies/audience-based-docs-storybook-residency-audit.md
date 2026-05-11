<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Audience-based docs Storybook residency audit

<!-- Document title (editable) -->

# Audience-based docs Storybook residency audit

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Purpose](#purpose)
- [Residency principle](#residency-principle)
    - [What this means concretely](#what-this-means-concretely)
    - [Why all contributor content is gated to dev builds](#why-all-contributor-content-is-gated-to-dev-builds)
- [Classification of the 17 hand-authored MDX files](#classification-of-the-17-hand-authored-mdx-files)
    - [Verdicts](#verdicts)
- [New `.storybook/` layout](#new-storybook-layout)
- [Implications for the plan](#implications-for-the-plan)
- [Out of scope for the structural PR (tracked for follow-up)](#out-of-scope-for-the-structural-pr-tracked-for-follow-up)
    - [Observation 11 — Latent consumer-audience content in `focus-management.md`](#observation-11--latent-consumer-audience-content-in-focus-managementmd)
- [Cross-reference](#cross-reference)

</details>

<!-- Document content (editable) -->

## Purpose

Third artifact in the audience-based docs reorganization, sibling to:

- [audience-based-docs-reorganization-plan.md](./audience-based-docs-reorganization-plan.md) — structural plan
- [audience-based-docs-content-audit.md](./audience-based-docs-content-audit.md) — content classification for `CONTRIBUTOR-DOCS/` files

This audit answers a question the content audit didn't: **for the 17 hand-authored MDX files currently living in `2nd-gen/packages/swc/.storybook/` (outside the auto-generated `contributor-docs/` tree), where should each one live, in what format, and with what relationship to GitHub readers?**

## Residency principle

A doc lives where its **primary audience** finds it natively. The two surfaces serve different audiences with different workflows:

| Surface | Primary audiences |
|---|---|
| **Storybook (published docs site)** | App developers using SWC (consumers), designers, evaluators |
| **GitHub markdown** | Contributors writing code/tests/docs, maintainers running releases, agents/AI doing retrieval |

A doc serves a **Storybook-primary audience** when its readers' workflow centers on the published docs site — they want to see live demos, click through variants, copy code from canvases, share polished URLs. These docs are authored as **MDX in `.storybook/`** so they can use Storybook's interactive features (`<Canvas>`, story imports, live component embeds, addon blocks).

A doc serves a **GitHub-primary audience** when its readers' workflow centers on the repo — they're reviewing PRs, setting up dev environments, running tests, executing release commands, browsing source. These docs are authored as **MD in `CONTRIBUTOR-DOCS/`** so they render natively on GitHub and support the markdown tooling those audiences already use.

The **SSOT lives on the surface that matters most.** Cross-surface mirroring is a convenience for the secondary audience, not a requirement.

### What this means concretely

| Audience folder | Primary surface | SSOT format & location | Mirror? |
|---|---|---|---|
| `for-consumers/` | Storybook | MDX in `.storybook/docs/` | A thin `CONTRIBUTOR-DOCS/for-consumers/README.md` with links to the Storybook URLs; no auto-mirror |
| `for-contributors/` | GitHub | MD in `CONTRIBUTOR-DOCS/for-contributors/` | Yes, auto-generated to `.storybook/docs/contribute/`, gated to dev builds |
| `for-maintainers/` | GitHub | MD in `CONTRIBUTOR-DOCS/for-maintainers/` | Yes, mirrored under `.storybook/docs/contribute/` (maintainer subtree), gated to dev builds |
| `project-planning/` | GitHub-only (working/strategic docs) | MD in `CONTRIBUTOR-DOCS/project-planning/` | Yes, mirrored under `.storybook/docs/contribute/project-planning/`, gated to dev builds |
| `reference/` | Storybook (live demos: badges, swatches, design tokens) | MDX in `.storybook/docs/reference/`; data overrides as YAML in `CONTRIBUTOR-DOCS/reference/` | The data file lives in CONTRIBUTOR-DOCS for PR-discussable changes; the rendered page lives only in Storybook |

### Why all contributor content is gated to dev builds

Contributors are comfortable in code. When they need a contributor doc, they're either browsing the repo on GitHub, cloned locally with `yarn dev` running, or asking an AI agent that retrieves MD. They don't need the published Storybook to serve `/docs/contribute-*` routes.

Gating the whole `Contribute` subtree (contributor guides, style guide, releasing, project planning) to dev builds means:

- Production Storybook ships **only the consumer-facing surface** — clean, polished, no maintainer/contributor clutter
- Local `yarn dev` still shows everything for offline browsing
- Contributors reach contributor docs via GitHub (where they were going anyway) or via the contributor-docs-nav skill (which already operates on the CONTRIBUTOR-DOCS MD files)

This decision is locked. It removes the ambiguity around what's "consumer-facing" in the production Storybook build.

## Classification of the 17 hand-authored MDX files

Each file gets one of three verdicts:

- **Move to CONTRIBUTOR-DOCS as MD** — plain prose with no Storybook-specific features; primary audience would be served fine on GitHub OR via the auto-generated Storybook mirror
- **Stay/move to `.storybook/docs/` as MDX** — uses Storybook-specific features (live `<Canvas>`, story imports, interactive comparisons) OR is consumer-primary content that earns the MDX format for richer UX
- **Stay as a Storybook infrastructure file** — not a doc; supports doc rendering

### Verdicts

| Current path | Verdict | New path | Reasoning |
|---|---|---|---|
| `DocumentTemplate.mdx` | Storybook infra | `.storybook/DocumentTemplate.mdx` (unchanged) | Component-docs page template; imports Storybook addon blocks |
| `learn-about-swc/overview.mdx` | **MDX, move** | `.storybook/docs/learn/about-swc.mdx` | Consumer-primary (about-SWC framing); benefits from live demo of `<swc-badge>` or similar |
| `learn-about-swc/first-gen-vs-second-gen.mdx` | **MDX, move** | `.storybook/docs/learn/first-gen-vs-second-gen.mdx` | Imports live 1st-gen components for side-by-side comparison — genuinely Storybook-only |
| `learn-about-swc/when-to-use-swc.mdx` | **MDX, move** | `.storybook/docs/learn/when-to-use-swc.mdx` | Consumer-primary; uses `<sp-accordion>` for collapsible sections. The Phase 9 restructure happens at this new location |
| `guides/customization/getting-started.mdx` | **MDX, move** | `.storybook/docs/learn/customization/getting-started.mdx` | Consumer-primary customization content. Stays MDX for consistency with siblings |
| `guides/customization/component-styles.mdx` | **MDX, move** | `.storybook/docs/learn/customization/component-styles.mdx` | Consumer-primary; benefits from live override demos |
| `guides/customization/fonts.mdx` | **MDX, move** | `.storybook/docs/learn/customization/fonts.mdx` | Uses live `<Canvas>` of status-light story — genuinely Storybook-only |
| `guides/customization/global-elements.mdx` | **MDX, move** | `.storybook/docs/learn/customization/global-elements.mdx` | Consumer-primary; benefits from live element demos |
| `guides/customization/theme-scales.mdx` | **MDX, move** | `.storybook/docs/learn/customization/theme-scales.mdx` | Consumer-primary; benefits from live scale-toggle demos |
| `guides/accessibility-guides/overview.mdx` | **MDX, move** | `.storybook/docs/learn/accessibility/overview.mdx` | Consumer-primary; may incorporate live ARIA demos |
| `guides/accessibility-guides/semantic_html_aria.mdx` | **MDX, move** | `.storybook/docs/learn/accessibility/semantic-html-and-aria.mdx` | Consumer-primary; filename also hyphenated for consistency |
| `guides/accessibility-guides/keyboard_testing.mdx` | **MDX, move** | `.storybook/docs/learn/accessibility/keyboard-testing.mdx` | Same |
| `guides/accessibility-guides/screen_reader_testing.mdx` | **MDX, move** | `.storybook/docs/learn/accessibility/screen-reader-testing.mdx` | Same |
| `guides/accessibility-guides/wave_toolbar_testing.mdx` | **MDX, move** | `.storybook/docs/learn/accessibility/wave-toolbar-testing.mdx` | Same |
| `guides/accessibility-guides/headings_and_landmarks.mdx` | **MDX, move** | `.storybook/docs/learn/accessibility/headings-and-landmarks.mdx` | Same |
| `guides/accessibility-guides/accessible_pattern_libraries.mdx` | **MDX, move** | `.storybook/docs/learn/accessibility/accessible-pattern-libraries.mdx` | Same |
| `guides/accessibility-guides/accessibility_resources.mdx` | **MDX, move** | `.storybook/docs/learn/accessibility/resources.mdx` | Same; the `accessibility_` prefix is redundant in the new folder |

**Summary:** zero files move to CONTRIBUTOR-DOCS. All 17 stay as MDX, but **all 16 doc files** (everything except `DocumentTemplate.mdx`) move into a new `.storybook/docs/` parent for cleaner organization. The current top-level `learn-about-swc/` and `guides/` directories are retired.

Filename hygiene applied during the move:
- Underscores in filenames become hyphens (matches the audience reorg convention)
- `accessibility-guides/accessibility_resources.mdx` → `accessibility/resources.mdx` (redundant prefix dropped)

## New `.storybook/` layout

```
2nd-gen/packages/swc/.storybook/
├── DocumentTemplate.mdx                ← Storybook component-docs template (infra)
├── main.ts, preview.ts, ...            ← Storybook config (infra)
├── addons/                             ← infra
├── assets/                             ← infra (images, fonts)
├── blocks/                             ← infra (custom MDX blocks: ApiTable, etc.)
├── decorators/                         ← infra
├── helpers/                            ← infra
├── intl/                               ← infra
├── loaders/                            ← infra
├── scripts/                            ← infra (generate-contributor-docs.mjs, etc.)
├── utils/                              ← infra
└── docs/                               ← ALL doc routing lives here
    ├── get-started/                    ← MDX SSOT
    │   └── index.mdx                   ← consumer welcome with live <swc-badge>
    ├── learn/                          ← MDX SSOT for consumer educational content
    │   ├── about-swc.mdx
    │   ├── first-gen-vs-second-gen.mdx
    │   ├── when-to-use-swc.mdx
    │   ├── customization/
    │   │   ├── cheatsheet.mdx          ← NEW (Phase 8): short-form quick reference
    │   │   ├── getting-started.mdx     ← existing, long-form
    │   │   ├── component-styles.mdx    ← existing, long-form
    │   │   ├── fonts.mdx               ← existing, long-form (live Canvas)
    │   │   ├── global-elements.mdx     ← existing, long-form
    │   │   └── theme-scales.mdx        ← existing, long-form
    │   └── accessibility/
    │       ├── overview.mdx
    │       ├── semantic-html-and-aria.mdx
    │       ├── keyboard-testing.mdx
    │       ├── screen-reader-testing.mdx
    │       ├── wave-toolbar-testing.mdx
    │       ├── headings-and-landmarks.mdx
    │       ├── accessible-pattern-libraries.mdx
    │       └── resources.mdx
    ├── reference/                      ← MDX SSOT for consumer reference
    │   ├── component-status.mdx        ← Phase 9: live <swc-badge> per row, reads .data.yml
    │   ├── design-tokens.mdx           ← (future, placeholder)
    │   └── core-package.mdx            ← surfaces 2nd-gen/packages/core/overview.mdx
    └── contribute/                     ← AUTO-GENERATED from CONTRIBUTOR-DOCS; gated to dev builds
        ├── for-contributors/
        ├── for-maintainers/
        └── project-planning/
```

## Implications for the plan

The reorganization plan's phases are restructured to match this residency model. Key changes from the prior plan:

1. **Phase 4 (Storybook sidebar IA)** — `titlePrefix` renames + `Contribute` subtree gating + outbound component-dir link updates. No directory moves yet. The `Guides → Learn` rename forces ~11 outbound link updates across 6 component-dir files (typography stories, status-light stories, button stories, button consumer-migration-guide, progress-circle stories, badge stories). This exceeds the prior plan's "exactly one components/ diff" prediction; the updates are pure-mechanical link redirects, no content change.

2. **Phase 5 (Storybook reorganization)** — moves the 16 doc-MDX files from `.storybook/learn-about-swc/` and `.storybook/guides/` into the new `.storybook/docs/learn/` tree. Updates `main.ts` `directory` entries. Filenames get hyphenated where they had underscores. The existing `<Meta title="..." />` blocks in each file are updated to match the new title segments where needed.

3. **Phase 6 (SSOT generator updates)** — extend `generate-contributor-docs.mjs` so:
   - Output target becomes `.storybook/docs/contribute/` (not the old `.storybook/contributor-docs/`)
   - The whole `contribute/` subtree is gated to `storybookMode !== 'build'`
   - `for-consumers/` is **not** auto-generated to Storybook (consumer content lives as MDX SSOT in `.storybook/docs/`)
   - `for-maintainers/` and `project-planning/` are included in `contribute/` (the broader contributor umbrella)

4. **Phase 7 (Consumer landing)** — `.storybook/docs/get-started/index.mdx` is the SSOT. Hand-authored MDX. `2nd-gen/README.md` becomes a thin landing page linking to the Storybook `Get started` URL rather than duplicating content.

5. **Phase 8 (Customization cheatsheet)** — NEW file at `.storybook/docs/learn/customization/cheatsheet.mdx`. **Does not replace** the existing 5 long-form customization docs; sits alongside them as a quick-reference companion. The cheatsheet is the first child of the `Customization` sidebar section; the long-form docs follow.

6. **Phase 9 (Component status matrix)** — `.storybook/docs/reference/component-status.mdx` is the MDX SSOT. Imports `CONTRIBUTOR-DOCS/reference/component-status.data.yml` (overrides) at build time. Renders each row with a live `<swc-badge>` reflecting status. The matrix demos itself.

7. **Phase 10 (When-to-use restructure)** — happens to the file at its new location `.storybook/docs/learn/when-to-use-swc.mdx`. Content rewrite from accordion prose to scannable decision flow.

## Out of scope for the structural PR (tracked for follow-up)

The residency audit captures one additional observation beyond the content audit's existing 10:

### Observation 11 — Latent consumer-audience content in `focus-management.md`

**File:** `CONTRIBUTOR-DOCS/for-contributors/focus-management.md` (after Phase 2's move).

**Concern:** the file is contributor-primary (how to implement focus correctly when authoring a 2nd-gen component) but contains content that's also valuable to consumers (how SWC components handle focus when integrated into a complex application — e.g. focus traps in modals, focus restoration, keyboard navigation contracts). Today both audiences read the same doc.

**Recommendation:** in a follow-up content PR, split the file. The contributor-facing implementation guide stays where it is. A new consumer-facing companion at `.storybook/docs/learn/focus-management.mdx` covers what consumers need to know about SWC's focus behavior without diving into mixin internals. Cross-link explicitly.

**Not addressed in the structural PR.** The file moves intact during Phase 2 of the reorganization plan.

## Cross-reference

- The structural [reorganization plan](./audience-based-docs-reorganization-plan.md) implements the moves and the SSOT generator changes described above.
- The [content audit](./audience-based-docs-content-audit.md) tracks content-level observations for `CONTRIBUTOR-DOCS/` files; this audit tracks the same kind of observations for `.storybook/` MDX files.
- Direction B (audience-aware SSOT split: consumer-primary content in `.storybook/`, GitHub-primary content in `CONTRIBUTOR-DOCS/`) is the architectural decision both audits assume.
