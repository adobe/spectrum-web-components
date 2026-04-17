<!--
AGENT TEMPLATE PREP INSTRUCTIONS (delete this comment block after copying the template):
1. Ensure you have the component name to use for filepath/naming purposes, ex. "Button" as well as the Jira Epic ticket number.
2. Copy this template to `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md`
3. Find/replace all [component] and [Component] with the correctly case-matched versions of the component name acquired from step 1. This will also help resolve any links that depend on the correct component name. Also update [Epic SWC-####] to the received ticket number, such as SWC-####.
4. The areas marked "DO NOT EDIT" will be updated by another process, you do not need to manually manage them. Also do not remove them or add extra content.
5. Refer to HTML comments throughout for additional guidance on filling out that section. Any non-commented content is intended to be fairly stable, unless it really doesn't make sense for the component.
6. Ensure you receive the required inputs, which are linked in the References section with the exception of Figma, which the user will need to provide spec images from.
7. If a section is not applicable, prefer writing "N/A" with a brief reason instead of removing the section unless the user explicitly asks for a different structure.
8. If links or file paths do not resolve after replacing placeholders, verify the actual repo naming before proceeding. Try likely variants such as kebab-case (`action-button`), PascalCase (`ActionButton`), or the spaced display name (`Action Button`). Prefer real existing repo paths over user phrasing. If multiple matches exist or none resolve, pause and ask the user for the exact component slug or source path.
9. Mark recommendations and decisions as confirmed, inferred, or open questions based on the quality of the source material. Do not present inferred details as settled facts.
10. If proposing a rename, deprecation, or breaking change, include at least one concrete supporting source. If no support is available, keep it as an open question.
11. Before finalizing, sweep for unresolved placeholders such as `[component]`, `[Component]`, `[component-version]`, and `[Epic SWC-####]`.
12. Before finalizing, check that `TL;DR`, `Most blocking open questions`, `Changes overview`, `2nd-gen API decisions`, and `References` are populated. If information is missing, say so explicitly instead of leaving sections blank.
13. Check for contradictions across `Changes overview`, `2nd-gen API decisions`, and `Migration checklist` so the same decision is reflected consistently.
14. Do not invent slots, events, CSS custom properties, or visual variants that are not supported by source material.
15. Throughout drafting the plan and at its conclusion, address any drift or inconsistencies introduced through edits.
16. For fuller workflow, review posture, and escalation guidance, refer to `.ai/skills/migration-prep/SKILL.md`.
17. Later migration phases should also follow `.ai/skills/migration-prep/references/migration-plan-contract.md` so implementation, tests, docs, and review stay aligned with this approved plan.
-->

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / [Component] / [Component] Migration Plan

<!-- Document title (editable) -->

# [Component] Migration Plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
  - [Most blocking open questions](#most-blocking-open-questions)
- [1st-gen API surface](#1st-gen-api-surface)
  - [Properties / attributes](#properties--attributes)
  - [Methods](#methods)
  - [Events](#events)
  - [Slots](#slots)
  - [CSS custom properties](#css-custom-properties)
  - [Shadow DOM output (rendered HTML)](#shadow-dom-output-rendered-html)
- [Dependencies](#dependencies)
- [Changes overview](#changes-overview)
  - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
  - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
  - [Public API](#public-api)
  - [Behavioral semantics](#behavioral-semantics)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Migration checklist](#migration-checklist)
  - [Preparation (this ticket)](#preparation-this-ticket)
  - [Setup](#setup)
  - [API](#api)
  - [Styling](#styling)
  - [Accessibility](#accessibility)
  - [Testing](#testing)
  - [Documentation](#documentation)
  - [Review](#review)
- [Blockers and open questions](#blockers-and-open-questions)
  - [Design](#design)
  - [Architecture and behavior](#architecture-and-behavior)
  - [Scope and prerequisites](#scope-and-prerequisites)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **[Epic SWC-####]** · Planning output. Must be reviewed before implementation begins.
>
> Copy this template into `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` before editing so the relative links, breadcrumbs, and generated sections resolve correctly.
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.

---

## TL;DR

<!-- High-level overview of the plan, once completed, to help reviewers gain context quickly and understand the most critical aspects -->
<!-- Do not leave this section blank. Summarize the must-ship changes, largest risks, and major open decisions in 3-6 bullets or short paragraphs. -->

### Most blocking open questions

<!-- List of links and summaries of specific questions that are identified as blocking for the "must do" work. Example format: "Q1-Q2 in [Design](#design): public naming for the neutral family and whether to keep `treatment` or adopt `fillStyle`" -->
<!-- Do not leave this section blank. If there are no blockers, write "None currently." -->
<!-- Each listed blocker should link to the detailed open question entry and summarize why it blocks must-ship work. -->

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/[component]/src/[Component].ts`](../../../../1st-gen/packages/[component]/src/[Component].ts)
**Version:** `@spectrum-web-components/[component]@[component-version]`
**Custom element tag:** `sp-[component]`

### Properties / attributes

<!-- Fill in 1st-gen properties / attributes -->

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |

### Methods

<!-- Fill in 1st-gen methods -->

| Method | Signature | Notes |
| ------ | --------- | ----- |

### Events

<!-- Fill in 1st-gen events -->

### Slots

<!-- Fill in 1st-gen slots -->

| Slot | Content | Notes |
| ---- | ------- | ----- |

### CSS custom properties

<!-- 1st-gen - very surface level overview of highlights from the associated rendering-and-styling-migration-analysis.md -->

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

<!-- Fill in 1st-gen HTML output, may be multiple versions -->

```html

```

---

## Dependencies

<!-- Fill in 1st-gen dependencies -->

| Package | Version | Role |
| ------- | ------- | ---- |

---

## Changes overview

> **Priority framing:**
>
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second, more disruptive migration event later.
> - **Additive changes** can be deferred and will not cause consumer breakage when they do ship.

### Must ship — breaking or a11y-required

<!--
Summarize must-ship aspects across the following categories.

# Format: **B{#}**
-->

#### API and naming

<!-- Prefer a short source note in the "What changes" or "Notes" text when a breaking change is recommended, especially for renames or deprecations. -->

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

<!--
Summarize additive aspects across the following categories.

# Format: **A{#}**
-->

| #   | What is added | Notes |
| --- | ------------- | ----- |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, current deprecations, the Figma Desktop [component] spec, the React S2 implementation, and the rendering roadmap. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

Use lightweight confidence labels where helpful:

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |

#### Visual matrix (2nd-gen)

<!--
Example content for this section - may be ommitted if not relevant.

Based on the visual spec, the supported visual combinations should be planned as:

| Visual family | Fill | Outline | Static white | Static black |
| ------------- | ---- | ------- | ------------ | ------------ |
| `default`     | Yes  | Yes     | Yes          | Yes          |
| `secondary`   | Yes  | Yes     | Yes          | Yes          |
| `accent`      | Yes  | No      | No           | No           |
| `negative`    | Yes  | No      | No           | No           |

Additional Figma-confirmed presentation modes:

- Label only
- Icon + label
- Icon only
- Text wrap
- Truncate
- Pending
- Disabled
- Hover -->

#### Slots (2nd-gen)

<!--

Example content for this section

| Slot    | Content                   | Notes                                        |
| ------- | ------------------------- | -------------------------------------------- |
| default | Visible [component] label | **Confirmed.**                               |
| `icon`  | Leading icon              | **Confirmed.** Keep the existing named slot. |

-->

#### CSS custom properties (2nd-gen)

<!-- This statement should stay mostly consistent for all components, per the linked guidelines -->

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Initial expectation for [Component] is a small reviewed set.

### Behavioral semantics

<!-- Include as many sections as are necessary to address the component's unique aspects. Callout any non-obvious implementation details. -->

### Accessibility semantics notes (2nd-gen)

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

<!-- This table should stay fairly consistent, update if needed. -->

| Layer    | Path                                            | Contains                                                                                                                                                                                |
| -------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/[component]/` | `[Component].base.ts`, `[Component].types.ts`, validation, state, accessible-name logic, attribute forwarding, pending-label behavior, and other reusable semantic rules. No rendering. |
| **SWC**  | `2nd-gen/packages/swc/components/[component]/`  | `[Component].ts`, `[component].css`, element registration, stories, tests, and the specific S2 rendering/styling for `sp-[component]`.                                                  |

Planned rendering shape:

<!-- Add any clarifying notes -->

- Core owns API normalization and warnings
- SWC renders ...

<!-- Add any subsections to cover implementation concerns that don't fit neatly into prior sections and require explanation for successful implementation and reviewer consensus. -->

---

## Migration checklist

<!-- Adjust the following checklists as needed. New sections may be added under API for clarity. -->

### Preparation (this ticket)

- [ ] 1st-gen API surface documented
- [ ] Dependencies identified
- [ ] Breaking changes documented
- [ ] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/[component]/`
- [ ] Create `2nd-gen/packages/swc/components/[component]/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [ ] `[Component].types.ts`: define...
- [ ] `[Component].base.ts`: retain...

#### Alignment checks

<!-- Callout any alignment verification needed with Figma/Design and/or React. These should also be open questions. -->

### Styling

<!-- These should stay consistent across components; items may be added if addressing unique needs.-->

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-[Component]` to the internal semantic `<[component]>` in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `[component].css` as baseline

#### Visual model and regressions

<!-- Most components will need these items; add others as needed -->

- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

<!-- Accessibility checklist items should be sourced from the `accessibility-migration-analysis.md` which is a pre-requisite to this migration plan. If it is not available, include a checklist item/open question requiring it before this plan is considered complete. -->

#### Naming and semantics

#### State verification

### Testing

<!-- Fill in comprehensive test cases -->

- [ ] Port `1st-gen/packages/[component]/test/[component].test.ts` coverage that still applies
- [ ] Add Playwright `[component].a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

#### Visual regression

<!--
Example content for this section.

- [ ] Add VRT coverage for size, variant, treatment, static color, and pending combinations
- [ ] Add visual regression coverage for static white outline on its approved background, including hover state (`SWC-1139`)
- [ ] Add visual/high-contrast coverage for the pending state using disabled styling (`SWC-459`)
- [ ] Add focus-visible regression coverage for truncated buttons so the ring is not clipped (`SWC-886`) -->

### Documentation

<!-- Notes of what to include in documentation -->

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] Storybook stories for...

#### Breaking changes

### Review

<!-- These should be stable across components -->

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing [Epic SWC-####]
- [ ] Peer engineer sign-off

---

## Blockers and open questions

<!--
Include the sections for clarity according to area of concern for the question.

Owner examples:
- Design + implementation
- Design + accessibility reviewer
- CSS reviewer
- Accessibility reviewer
- Architecture reviewer
- Ticket owner

# Format: **Q{#}** (sequential across sections, do not start re-numbering under a new section)
-->

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |

<!-- Where possible, include the next action in the Item text or Status so reviewers know how to resolve the question. -->

---

## References

<!-- IMPORTANT: Use as references for compiling data and details and informing decisions for all other sections of this plan. -->
<!-- Do not leave this section sparse. Include the analysis docs, 1st-gen implementation references, relevant design references, and any bug tickets that informed decisions. -->

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/[component]/src/[Component].ts)
- [1st-gen shared base / mixins](../../../../1st-gen/packages/[component]/src/)
- [1st-gen tests](../../../../1st-gen/packages/[component]/test/[component].test.ts)
- [1st-gen README](../../../../1st-gen/packages/[component]/README.md)
- [React Spectrum S2 [Component]](https://react-spectrum.adobe.com/[Component])
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [Epic SWC-####]: [Component] Epic

<!-- Include in the list bug tickets with summary if applicable, ex. "SWC-459: pending state a11y criteria" -->
