---
name: migration-a11y
description: Phase 5 of 1st-gen to 2nd-gen component migration. Use to implement WCAG-aligned semantics, ARIA, keyboard support, and focus management, and document accessibility behavior.
---

# Migration a11y ([Phase 5](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 5](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to implement WCAG-aligned behavior — semantics, ARIA, keyboard support, and focus management — and verify it with assistive technology and automated tests.

See also: [`accessibility-compliance`](../accessibility-compliance/SKILL.md) for general WCAG 2.2 patterns, ARIA reference, and testing tools.

## Mindset

You are an implementer working from evidence, not assumptions. Read the accessibility migration analysis doc first. Every ARIA attribute you add must be justified by the APG pattern or WCAG criterion. If there is no analysis doc yet, stop and create one using the `accessibility-migration-analysis` skill before implementing.

## When to use this skill

- Phase 4 (migration-styling) is complete
- The user asks to "implement accessibility" or "add a11y" for a component
- The user asks to add keyboard support, ARIA, or screen reader behavior
- The user refers to "Phase 5" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 4 is not complete — styling should be in place before a11y testing
- You need general WCAG or ARIA reference — use the [`accessibility-compliance`](../accessibility-compliance/SKILL.md) skill

## How to invoke

- "Implement accessibility for [component]"
- "Add a11y for [component]"
- "Phase 5 for [component] migration"

---

## Workflow

Follow **[Phase 5: Accessibility](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-5-accessibility)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.
