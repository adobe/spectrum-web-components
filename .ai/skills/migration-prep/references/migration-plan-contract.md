# Migration plan contract

Use the approved migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` as the planning baseline for all later migration phases.

## What later phases should consume

- `Changes overview` for approved breaking changes, additive changes, and consumer migration impact
- `2nd-gen API decisions` for naming, public API shape, behavior decisions, and confidence levels
- `Architecture: core vs SWC split` for component boundaries and expected file layout
- `Migration checklist` for phase-specific expectations
- `Blockers and open questions` for unresolved items that must not be silently decided in code

## Drift rule

If implementation, tests, docs, or review findings need to deviate from the approved migration plan:

1. Do not silently proceed
2. Call out the drift explicitly
3. Recommend whether the plan or the code/docs/tests should change
4. Align with the user before locking in the divergence

## Review standard

- Treat undocumented drift from the migration plan as a review issue
- Do not silently resolve open questions in code
- Keep docs and tests consistent with the approved migration plan
