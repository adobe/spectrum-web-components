<!--
AGENT / CONTRIBUTOR QUICK START:
1. Copy this template to `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` before editing.
2. Replace `[component]`, `[Component]`, and `Epic SWC-####` with the correct values.
3. Do not edit or remove sections marked `DO NOT EDIT`.
4. Preserve the template structure: keep prescribed tables, stable checklist items, and blocker columns unless the user explicitly wants structural changes.
5. If materially blocking inputs are missing, stop early and ask for them with a numbered action list instead of burying them in a closing summary.
6. Do not replace `Epic SWC-####` with `TBD` without explicitly prompting the user first.
7. For full workflow, escalation rules, and review posture, refer to `.ai/skills/migration-prep/SKILL.md`.
-->

<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / [Component] / [Component] Migration Plan

<!-- Document title (editable) -->

# [Component] migration plan

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
- [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)
- [Changes overview](#changes-overview)
  - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
  - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
  - [Public API](#public-api)
  - [Behavioral semantics](#behavioral-semantics)
  - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
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

> **Epic SWC-####** · Planning output. Must be reviewed before implementation begins.
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
<!-- Use the exact same `Q{#}` IDs that appear later in `Blockers and open questions`. Do not renumber them here and do not switch to a different naming scheme. -->
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

## Migration sequencing and prerequisites

<!-- Document whether this component should extend from another 2nd-gen component or shared base, whether another migration depends on it, and whether migration order should change as a result. Use the status table and related analyses as evidence. -->
<!-- If this materially changes the plan, ask the user whether a decision already exists. If not, offer to recommend a migration order or shared-base strategy based on current evidence. -->

### Dependency-aware recommendation

<!-- Example directions: migrate first because other components should extend from it; wait until a shared base exists; proceed independently; split shared logic into a prerequisite utility/base. -->

### Related components and ordering notes

<!-- List related components, shared bases, or prerequisite migrations that affect sequencing or API decisions. -->

### User confirmation needed

<!-- Record any sequencing, shared-base, inheritance, or dependency recommendation that requires explicit user or team approval before this plan is treated as settled. -->

---

## Changes overview

> **Priority framing:**
>
> - Use the component's full feature/functionality inventory to decide what belongs here; do not classify scope without first identifying the full surface area.
> - **Must ship** items define the in-scope work required for this migration.
> - **Additive** items are typically deferred or out of scope for this migration unless the user explicitly pulls them in.
> - **Additive / deferred** does not mean deprecated or dropped; it usually means not required to meet the baseline 80% consumer-use needs for this migration.
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second, more disruptive migration event later.
> - **Additive changes** can be deferred and will not cause consumer breakage when they do ship.

### Must ship — breaking or a11y-required

<!--
Summarize must-ship aspects across the following categories.

# Format: **B#**
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

# Format: **A#**
-->
<!-- These items are usually deferred or out of scope for the current migration unless explicitly included. They are additive/deferred, not deprecated or removed. -->

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
Refer to the following example content for this section. If not applicable, mark as N/A with a brief reason rather than removing the section.

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

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for [Component] is a small reviewed set.

### Behavioral semantics

<!-- Include as many sections as are necessary to address the component's unique aspects. Callout any non-obvious implementation details. -->

### Accessibility semantics notes (2nd-gen)

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

<!-- Use the prescribed table format below; do not convert this section to bullets or another schema. -->

| Layer    | Path                                            | Contains                                                                                                                                                                                                                                          |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/[component]/` | `[Component].base.ts`, `[Component].types.ts`, validation, state, accessible-name logic, attribute forwarding, pending-label behavior, and other reusable semantic rules. No rendering. Add component-specific reusable behaviors here as needed. |
| **SWC**  | `2nd-gen/packages/swc/components/[component]/`  | `[Component].ts`, `[component].css`, element registration, stories, tests, and the specific S2 rendering/styling for `sp-[component]`.                                                                                                            |

<!-- Retain this section with any clarifying notes, using existing bullets as a starting point. -->

Planned rendering shape:

- Core owns API normalization and warnings
- SWC renders: <!-- [describe the specific rendering responsibilities for this component] -->

<!-- Add any subsections to cover implementation concerns that don't fit neatly into prior sections and require explanation for successful implementation and reviewer consensus. -->

---

## Migration checklist

<!-- Adjust the following checklists as needed. New sections may be added under API for clarity. Keep the stable baseline checklist items unless they are truly not applicable; prefer additive edits over removing them. -->

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
- [ ] Add `@cssprop` JSDoc tag to the primary SWC component class for every exposed `--swc-*` property (e.g. `@cssprop --swc-[component]-height - Block size of the [component].`)
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
Retain this section for any components with visual rendering, modifying as needed for the component's specs and variants.  Replace the example bullets below with VRT items that match this component, and reference real bug tickets only when they apply to this component.

- [ ] Add VRT coverage for the component's size, variant, treatment, and state combinations
- [ ] Add visual regression coverage for any static color treatments on their approved backgrounds, including hover state (`SWC-####`)
- [ ] Add visual/high-contrast coverage for any state that relies on shared styling (e.g. pending using disabled styling) (`SWC-####`)
- [ ] Add focus-visible regression coverage where the focus ring may be clipped or obscured (`SWC-####`)
-->

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
- [ ] PR created with description referencing Epic SWC-####
- [ ] Peer engineer sign-off

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. In the final review-ready plan, once core migration questions are resolved and deferred tickets exist, replace those drafting-time rows with a concise deferred-ticket table.

<!--
Include the sections for clarity according to area of concern for the question.

Owner examples:
- Design + implementation
- Design + accessibility reviewer
- CSS reviewer
- Accessibility reviewer
- Architecture reviewer
- Ticket owner

# Format: **Q#** (sequential across sections, do not start re-numbering under a new section, and do not create per-question anchor links)
-->

<!-- Keep the table structure and columns (`Blocking?`, `Status`, `Owner`). Add rows rather than replacing the schema with prose or a different format. -->
<!-- During drafting, use the tables below for active blockers and open questions. Once all core migration questions are resolved and deferred-item tickets exist, replace the drafting-time rows with a concise deferred-ticket table in this section. -->

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
<!-- Final-state deferred-ticket table columns: `Ticket`, `Deferred item`, `Why deferred`, `Related plan section`. -->

---

## References

<!-- IMPORTANT: Use as references for compiling data and details and informing decisions for all other sections of this plan. -->
<!-- Do not leave this section sparse. Include the analysis docs, 1st-gen implementation references, relevant design references, and any bug tickets that informed decisions. -->

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md) - include only if available, otherwise mark as TODO and leave as plain text
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/[component]/src/[Component].ts)
- [1st-gen shared base / mixins](../../../../1st-gen/packages/[component]/src/) — include only if the component has shared base or mixin files
- [1st-gen tests](../../../../1st-gen/packages/[component]/test/[component].test.ts) — include only if a test file exists
- [1st-gen README](../../../../1st-gen/packages/[component]/README.md) — include only if a README exists
- [React Spectrum S2 [Component]](https://react-spectrum.adobe.com/[Component]) — confirm the URL slug matches the actual React Spectrum docs page
- [Spectrum CSS — `spectrum-two` branch](https://github.com/adobe/spectrum-css/tree/spectrum-two) — S2 styling source of truth for the component. Replace this generic repo link with the explicit component source you reviewed when possible, typically `spectrum-css/components/[component]/index.css` from a sibling checkout on **`spectrum-two`** (not `/dist`). See the [Setup](#setup) checklist.
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: SWC-#### - [Component] epic

<!-- Include in the list bug tickets with summary if applicable, ex. "SWC-459: pending state a11y criteria" -->
