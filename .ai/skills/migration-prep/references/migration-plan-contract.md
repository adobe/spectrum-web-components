# Migration plan contract

Use the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` as the preferred planning baseline for all later migration phases when it is available and current.

## What later phases should consume

- `Changes overview` for approved breaking changes, additive changes, and consumer migration impact
- `2nd-gen API decisions` for naming, public API shape, behavior decisions, and confidence levels
- `Architecture: core vs SWC split` for component boundaries and expected file layout
- `Migration checklist` for phase-specific expectations
- `Blockers and open questions` for unresolved items that must not be silently decided in code during drafting, or the deferred-ticket table in that section once the plan is finalized

## Drift rule

If implementation, tests, docs, or review findings need to deviate from the approved migration plan:

1. Do not silently proceed
2. Call out the drift explicitly
3. Recommend whether the plan or the code/docs/tests should change
4. Align with the user before locking in the divergence

## When the migration plan is missing or intentionally incomplete

The migration plan is the preferred planning baseline, not an automatic blocker for later phases.

If it is missing, stale, or intentionally incomplete:

1. Gather the minimum required context directly from source material for the current phase
2. Call out that the phase is proceeding without a complete approved migration plan
3. Treat any resulting ambiguity or drift risk as an explicit caveat
4. Pause only if the missing plan prevents a confident recommendation or would materially affect API, behavior, accessibility, testing scope, documentation guidance, or review outcomes

## Review standard

- Treat undocumented drift from the migration plan as a review issue
- Do not silently resolve open questions in code
- Keep docs and tests consistent with the approved migration plan
