<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Workstreams](../README.md) / [2nd-gen Component Migration](README.md) / Migration project planning (Epics and tickets)

<!-- Document title (editable) -->

# Migration project planning (Epics and tickets)

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TODO: Greenfield 2nd-gen contributor guide](#todo-greenfield-2nd-gen-contributor-guide)
- [Epics and tickets](#epics-and-tickets)
    - [Rationale](#rationale)
    - [Epic template](#epic-template)
    - [Ticket list](#ticket-list)
    - [Mapping: tickets to phases](#mapping-tickets-to-phases)
    - [Badge example](#badge-example)
    - [When to split or combine tickets](#when-to-split-or-combine-tickets)
    - [Tracking recommendation](#tracking-recommendation)
    - [Quality gate checklist (for Epic closure)](#quality-gate-checklist-for-epic-closure)

</details>

<!-- Document content (editable) -->

This doc is **project-management guidance** for tracking a component migration in Jira (or similar). For the technical sequence, quality gates, and phase checklists, use the [washing machine workflow](02_step-by-step/01_washing-machine-workflow.md).

## TODO: Greenfield 2nd-gen contributor guide

> **Planned:** A separate contributor guide for **new** 2nd-gen components **without** a 1st-gen counterpart is not written yet (Rise outlined this track). The [washing machine workflow](02_step-by-step/01_washing-machine-workflow.md) applies only when a 1st-gen package exists or is the migration target. **Add the Jira epic or ticket link here** when it is filed.

---

## Epics and tickets

Use one **Epic** per component migration and create **standard tickets** aligned to the 8 washing machine phases. This keeps scope clear, makes progress visible, and gives a consistent structure for planning and review.

- **Ticket 8 (Phase 8: Review):** After **all seven** prior phase PRs are merged into the feature branch, run **final QA** on the full integration (lint, tests, Storybook, checklist, status table—see the [washing machine workflow](02_step-by-step/01_washing-machine-workflow.md) Phase 8). Then **merge the feature branch to `main`**. Phase 8 is the last gate before that merge.

- **One feature branch per Epic** (e.g. `2nd-gen/migrate-<component>`). All migration work lands there first—not on `main` until the Epic is finished.
- **Tickets 1–7:** Each ticket is delivered as a **PR merged into that feature branch**. Close the ticket when the PR is merged; the branch should always carry the integrated result of completed phases.
- **Ticket 8 (Phase 8: Review):** After **all seven** prior phase PRs are merged into the feature branch, run **final Q&A** on the full integration (lint, tests, Storybook, checklist, status table—see the [washing machine workflow](02_step-by-step/01_washing-machine-workflow.md) Phase 8). Then **merge the feature branch to `main`** (or your repo’s default integration branch). Phase 8 is the last gate before that merge.

### Rationale

- **One Epic per component:** One migration = one Epic. All phase-level work is linked under it, so backlogs and boards stay easy to filter and report on.
- **Tickets aligned to phases:** Each phase becomes a ticket (or a small set). Acceptance criteria map to the phase’s “What to do” and quality gate in the [washing machine workflow](02_step-by-step/01_washing-machine-workflow.md), so the guide and the tickets stay in sync.
- **Consistent naming:** Same ticket titles across components (e.g. “Migrate [Component] — API”) so teams know what to expect and can reuse templates.

### Epic template

**Title:** `[Migration] 2nd-gen [Component]`

- Branching: use a **dedicated feature branch** for this Epic; **tickets 1–7** merge via PR into that branch; **ticket 8** is final QA on the integrated branch, then **merge the feature branch to `main`**.

- Migrate [Component] from 1st-gen to 2nd-gen following the [washing machine workflow](02_step-by-step/01_washing-machine-workflow.md).
- Scope: core base + types, SWC component, styles, a11y, tests, stories, and PR.
- Branching: use a **dedicated feature branch** for this Epic; **tickets 1–7** merge via PR into that branch; **ticket 8** is final Q&A on the integrated branch, then **merge the feature branch to `main`**.
- Reference: 2nd-gen Badge (`2nd-gen/packages/core/components/badge/`, `2nd-gen/packages/swc/components/badge/`).

**Child issues:** Link the 8 phase tickets (or combined tickets) as subtasks or “is blocked by” / “blocks” as appropriate. Ticket 8 should depend on tickets 1–7 being merged into the feature branch.

### Ticket list

Create one ticket per phase (or combine where it makes sense; see guidance below). Treat **each ticket as one PR** that merges into the Epic’s **feature branch**—except that **ticket 8** is the **final Q&A on that branch** and ends with **merging the feature branch to `main`**.

| # | Ticket title | Aligned phase |
|---|---------------|----------------|
| 1 | Migrate [Component] — Preparation | Phase 1: Preparation |
| 2 | Migrate [Component] — Setup | Phase 2: Setup |
| 3 | Migrate [Component] — API migration | Phase 3: API migration |
| 4 | Migrate [Component] — Styling | Phase 4: Styling |
| 5 | Migrate [Component] — Accessibility | Phase 5: Accessibility |
| 6 | Migrate [Component] — Testing | Phase 6: Testing |
| 7 | Migrate [Component] — Documentation | Phase 7: Documentation |
| 8 | Migrate [Component] — Review & PR | Phase 8: Review (final Q&A → merge feature branch to `main`) |

Copy the corresponding phase’s “What to do,” “What to check,” and “Quality gate” from the [washing machine workflow](02_step-by-step/01_washing-machine-workflow.md) into each ticket’s description or acceptance criteria.

### Mapping: tickets to phases

| Ticket | Phase | Key deliverables |
|--------|--------|-------------------|
| Preparation | 1 | Migration plan; component analysis read or created; breaking changes listed. |
| Setup | 2 | Core and SWC folders and files created; build passes; component importable. |
| API migration | 3 | Types in core; base and SWC API; JSDoc and @internal. |
| Styling | 4 | CSS migrated; tokens and variants; render() with classMap. |
| Accessibility | 5 | APG pattern applied; ARIA and keyboard; a11y tests. |
| Testing | 6 | Unit and a11y tests pass; coverage in place. |
| Documentation | 7 | JSDoc; Storybook stories; migration notes if needed. |
| Review & PR | 8 | Final Q&A on feature branch with phases 1–7 merged; checklist and status table done; **feature branch merged to `main`**. |

### Badge example

- **Epic:** `[Migration] 2nd-gen Badge`
- **Tickets:** “Migrate Badge — Preparation,” “Migrate Badge — Setup,” … “Migrate Badge — Review & PR.”
- Link each ticket to the [washing machine workflow](02_step-by-step/01_washing-machine-workflow.md) and to the Badge paths (core and SWC). Use the [Reference: Badge migration](02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) table in that guide as an acceptance-criteria reference.

### When to split or combine tickets

- **Split a phase** when the work is large or done by different people (e.g. “Migrate [Component] — Styling (tokens)” and “Migrate [Component] — Styling (variants & render)”). Link the sub-tickets to the same phase in the guide and keep the phase quality gate as the overall exit condition.
- **Combine phases** only when scope is small and one ticket is clearer (e.g. “Migrate [Component] — Documentation & review” for a trivial component). In the combined ticket, list acceptance criteria from both phases and still run both quality gates before closing.
- **Keep Preparation and Review separate:** Do not merge Phase 1 or Phase 8 into others; they bookend the migration and should stay visible.

### Tracking recommendation

- **Board/view:** Filter by the migration Epic so all phase tickets for one component appear together.
- **Status:** Use the [status table](01_status.md) to mark steps (Analyze, Factor, Move to Core, etc.); use ticket status for phase-level “To Do / In progress / Done.”
- **Done definition:** For **tickets 1–7**, the ticket is done when its quality gate in the [washing machine workflow](02_step-by-step/01_washing-machine-workflow.md) is met and the **PR is merged into the migration feature branch**. For **ticket 8**, done when **final Q&A** on that branch is complete and the **feature branch is merged to `main`** (or in the same PR as the following phase when phases are combined—still land on the feature branch first until the final merge to `main`).

### Quality gate checklist (for Epic closure)

Before closing the migration Epic, confirm:

- [ ] Tickets 1–7 are done: each phase’s PR merged into the **migration feature branch**.
- [ ] Phase 8 (Review) is complete: **final Q&A** on the integrated feature branch; **feature branch merged to `main`**.
- [ ] Component row in the [status table](01_status.md) is updated with checkmarks for all steps.
- [ ] No open blocking issues or follow-ups that belong to the same migration.
