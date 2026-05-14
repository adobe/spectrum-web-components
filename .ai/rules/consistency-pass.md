---
description: Defines when and how to run a consistency and validity self-audit on changed files and the migration plan. Apply before declaring any migration phase or significant implementation task complete.
alwaysApply: false
---

# Consistency and validity pass

A consistency and validity pass has two parts:

1. **Code conformance** — are the changed files aligned with project style guides?
2. **Plan validity** — does the migration plan still accurately reflect what was built?

Run both proactively, not only when asked. The per-domain code checklist lives in `.ai/rules/code-conformance.md`. The plan validity check is defined here.

## When to run

Run a consistency and validity pass:

1. **When explicitly asked** — "check my work", "consistency pass", "validity pass", "check this against the style guide"
2. **Before declaring a migration phase complete** — especially Phases 3 (API), 5 (styling), 6 (testing), and 7 (documentation), where both code drift and plan staleness are most likely
3. **After making implementation changes** to TypeScript, CSS, test, or stories files during a migration session, even if not completing a formal phase

If you are in a migration session and a pass is due but the user has not asked for one, run it — do not wait to be asked.

## Part 1: Code conformance

Apply the full checklist from `.ai/rules/code-conformance.md` to the files changed in the current task or phase. Read that rule before starting. Scope the check to changed files only unless a broader audit was requested.

Run automated linters first, then the manual review:

```bash
yarn lint
yarn lint:css
yarn prettier --check "path/to/changed/files"
```

Fix every automated error before doing the manual review. A manual review on top of failing linters is wasted effort.

## Part 2: Plan validity

If a migration plan exists at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md`, read the full plan and check for two categories of issues.

### The plan is authoritative

The migration plan represents the agreed design. When the implementation diverges from the plan, the default assumption is that the implementation drifted — not that the plan should be updated to match. Flag implementation divergence to the user rather than silently updating the plan to reflect it.

The only time the plan should be updated to reflect a change is when that change was explicitly confirmed during the current session — for example, a PR reviewer requested a rename, or the team decided during this session to remove a dependency. Session-confirmed changes should be written back to the plan.

### Check 1: Implementation vs. plan

Read the plan sections covering the current phase and verify the implementation matches:

- API shape, attribute names, property types, and default values match the plan
- Behavior and state handling match the plan
- Breaking changes are implemented as the plan specifies (no additions or removals without confirmation)
- Accessibility decisions match the plan's a11y section

Flag any divergence. If a change was confirmed in-session, update the plan and proceed to Check 2.

Once implementation and plan are aligned, update the plan's checklists for the current phase to reflect the work completed. Mark off completed items, fill in any "to be determined" fields that were resolved during this phase, and note any decisions made. The plan checklists are the record that this phase was done and what was produced — keep them current.

### Check 2: Intra-plan consistency (cascading updates)

When any part of the plan changes — whether from a session-confirmed decision or a correction — scan the entire plan for other sections affected by that change. Plans are multi-section documents where a single decision can appear in several places.

Common cascading patterns to check:

- **Renamed attribute or property**: search every section of the plan for the old name; update all references, including code examples, breaking change entries, migration guidance, and accessibility notes
- **Removed dependency or feature**: find every section that assumed that dependency exists — behavior descriptions, constraints, examples — and update or remove them
- **Changed default value**: find every section that states or relies on the old default, including examples and migration guidance
- **Added or removed breaking change**: verify the breaking changes section, the migration guide section, and any consumer-facing notes are consistent with each other
- **Renamed slot or CSS custom property**: check that examples, anatomy descriptions, and migration notes all reflect the new name

This check also applies during plan authoring. If you are writing or editing the plan in Phase 1 and make a change, run the same cascading scan before completing the phase.

## Reporting format

Report both parts together before ending your response:

```
**Consistency and validity pass — [component], Phase [N]**

Code conformance:
- ✅ [domain]: passes
- ⚠️ [file:line] — [issue; what the style guide says; what to change]
- ❌ [file:line] — [critical issue blocking completion]

Plan validity:
- ✅ Implementation matches plan for this phase
- ✅ Phase checklist updated
- ✅ No cascading inconsistencies found
- ⚠️ [plan section] — [implementation diverges from plan; flagging for confirmation before updating]
- ⚠️ [plan section] — [cascading effect of confirmed change X; updated]
- ⚠️ Phase checklist — [items that could not be marked complete; reason]
- ❌ [plan section] — [implementation diverges in a way that may require re-alignment]
```

Fix or flag all ⚠️ and ❌ items before reporting the phase or task complete. Items that cannot be resolved immediately must be noted in the Migration Checkpoint.

## Guideline gaps

If the code is correct and appropriate but no style guide rule covers the pattern, follow the guideline-gap reporting format in `.ai/rules/code-conformance.md` and surface it to the user.
