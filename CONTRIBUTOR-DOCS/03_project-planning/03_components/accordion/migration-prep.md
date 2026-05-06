<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Accordion / Accordion migration prep (phase 1)

<!-- Document title (editable) -->

# Accordion migration prep (phase 1)

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Purpose](#purpose)
- [Primary artifacts](#primary-artifacts)
- [Input readiness](#input-readiness)
- [Sequencing and prerequisites](#sequencing-and-prerequisites)
- [Open questions (prep phase)](#open-questions-prep-phase)
- [Next actions before setup (phase 2)](#next-actions-before-setup-phase-2)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Purpose

This document tracks **phase 1 (preparation)** for the accordion 1st-gen → 2nd-gen migration per the [migration prep skill](../../../../.ai/skills/migration-prep/SKILL.md) and [phase 1: preparation](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-1-preparation) in the washing machine workflow. It is a **working** checklist; the approved technical contract remains [migration-plan.md](./migration-plan.md).

**Do not** treat this file as a substitute for peer review of the migration plan.

---

## Primary artifacts

| Artifact | Status | Notes |
|---|---|---|
| [Migration plan](./migration-plan.md) | Draft — expand as decisions land | API, breaking changes, checklist, architecture. |
| [Accessibility migration analysis](./accessibility-migration-analysis.md) | Substantive | WCAG 2.2 AA target behavior. |
| [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md) | **In progress** | Scaffolded with 1st-gen DOM, SWC inventory, resources; Spectrum 2 CSS deep-dive pending **spectrum-css** `spectrum-two` checkout. |

---

## Input readiness

| Input | Required for | Status |
|---|---|---|
| 1st-gen source, tests, README | Plan + implementation | Available under `1st-gen/packages/accordion/`. |
| Accessibility analysis | A11y phase + plan | [accessibility-migration-analysis.md](./accessibility-migration-analysis.md). |
| Rendering roadmap (S2 mapping) | Phase 4 styling | Started — finish selector/token pass against **spectrum-css** `spectrum-two`. |
| **spectrum-css** sibling checkout (`spectrum-two`) | Step 1 QA, Phase 4 | **Confirm** local workspace per [workspace setup](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#workspace-setup). |
| Figma **`S2 / Web (Desktop scale)`** PNG (overview, properties, variants) | Visual API parity | **Pending** — attach to epic or paste when available. |
| **Epic** id (e.g. `SWC-####`) | Plan header, PR linkage | **Pending** — add to [migration-plan.md](./migration-plan.md) opening blockquote when filed. |
| Peer review on migration plan | Gate before Setup | **Pending** — at least one engineer per plan checklist. |

---

## Sequencing and prerequisites

| Prerequisite | Why it matters | Status |
|---|---|---|
| No hard dependency on another **incomplete** 2nd-gen component | Accordion uses base, icons, shared patterns only | **Clear** — follow [badge reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) for core/SWC split. |
| **Illustrated message** / **card** heading-level naming alignment | A11y doc calls for one mental model across components | **Track** — confirm naming (`level` vs `heading-level`) during API phase; link from plan. |
| Rendering analysis complete enough for token work | Unblocks Phase 4 estimates | **In progress** — complete S2 path + mapping table. |

---

## Open questions (prep phase)

These mirror [migration-plan — blockers](./migration-plan.md#blockers-and-open-questions); track owner here during prep.

| ID | Topic | Owner | Next action |
|---|---|---|---|
| Q1 | Standalone `swc-accordion-item` without parent — **`protected` `heading`** default | TBD | Decide default + dev warning vs require parent; update plan. |
| Q2 | `label` vs slot precedence and deprecation window | TBD | Product / API review; ticket if needed. |
| Q3 | Toggle **event** name (`swc-*`) | TBD | Align with 2nd-gen event naming standard. |
| Q4 | **Figma** + epic id | TBD | Add to plan header when supplied. |

---

## Next actions before setup (phase 2)

1. **Engineering:** Peer-review [migration-plan.md](./migration-plan.md) (checklist **Preparation**).
2. **Design / PM:** Provide **Epic** id and **Figma** PNG from `S2 / Web (Desktop scale)` primary frame when ready.
3. **Implementer:** Check out **spectrum-css** on **`spectrum-two`** beside this repo; extend [rendering-and-styling migration analysis](./rendering-and-styling-migration-analysis.md) with S2 component path, selectors from `metadata.json`, and DOM comparison per [analyze rendering and styling](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_analyze-rendering-and-styling/README.md).
4. **Resolve** Q1–Q3 in plan or file follow-up tickets under the epic.

---

## References

- [Accordion migration plan](./migration-plan.md)
- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [Migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Migration prep skill](../../../../.ai/skills/migration-prep/SKILL.md)
