---
name: migration-a11y
description: Phase 4 of 1st-gen to 2nd-gen component migration. Use to implement WCAG-aligned semantics, ARIA, keyboard support, and focus management, and document accessibility behavior.
---

# Migration a11y ([Phase 4](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 4](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to implement WCAG-aligned behavior — semantics, ARIA, keyboard support, and focus management — and verify it with assistive technology and automated tests.

See also: [`accessibility-compliance`](../accessibility-compliance/SKILL.md) for general WCAG 2.2 patterns, ARIA reference, and testing tools.

## Mindset

You are an implementer working from evidence, not assumptions. Read the accessibility migration analysis doc first. Every ARIA attribute you add must be justified by the APG pattern or WCAG criterion. If there is no analysis doc yet, stop and create one using the `accessibility-migration-analysis` skill before implementing.

Also read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available for must-ship accessibility changes, behavior changes that affect semantics, renamed states or props, and unresolved questions that may impact keyboard or focus behavior. If it is missing, stale, or intentionally incomplete, derive the needed context from source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

## When to use this skill

- Phase 3 (migration-api) is complete
- The user asks to "implement accessibility" or "add a11y" for a component
- The user asks to add keyboard support, ARIA, or screen reader behavior
- The user refers to "Phase 4" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 3 is not complete — the public API should be migrated before implementing a11y behavior on top of it
- You need general WCAG or ARIA reference — use the [`accessibility-compliance`](../accessibility-compliance/SKILL.md) skill

## How to invoke

- "Implement accessibility for [component]"
- "Add a11y for [component]"
- "Phase 4 for [component] migration"

---

## Workflow

Follow **[Phase 4: Accessibility](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-4-accessibility)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.

**Phase 4 often requires TypeScript changes, not only documentation.** Common examples:

- **Implement semantics, ARIA, keyboard, and focus management** — prefer native HTML semantics; add ARIA only where the analysis specifies; implement keyboard support and focus management (trap in overlays). Test with assistive tech; document in JSDoc.
- **Native vs custom controls** — native form control (e.g. Checkbox) → `delegatesFocus: true`; custom control (e.g. Radio) → `role` and `aria-*` on host, manage focus/keyboard. See Checkbox and Radio as reference implementations.
- **`delegatesFocus: true`** — If the component wraps a native control in its shadow DOM, add `createRenderRoot()` returning `this.attachShadow({ mode: 'open', delegatesFocus: true })`. This routes host focus to the internal native control. Add it in the base class if all subclasses share the same host-wraps-native-control structure.
- **Accessible name forwarding across the shadow boundary** — Attributes like `aria-label` on the host are not automatically visible to the internal control. Forward them in the render template or via a protected helper method (e.g. `getResolvedAccessibleName()`). If the pattern is shared across multiple like components, put the helper in the base class.

If accessibility implementation needs to deviate from the migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).
