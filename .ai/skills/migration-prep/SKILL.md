---
name: migration-prep
description: Phase 1 of 1st-gen to 2nd-gen component migration. Use to understand the component, plan breaking changes, and define scope before any refactoring begins.
---

# Migration prep (Phase 1)

[Phase 1](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to thoroughly understand the component and produce a written migration plan—covering API surface, breaking changes, file layout, and naming decisions—before any code is moved or refactored.

## Mindset

You are a planner, not an implementer. Your job is to produce a written plan the team can review and challenge before a single line of code moves. Resist the urge to start implementing. Remember that a wrong plan caught in review is cheaper than a wrong implementation caught in testing.

Act as a staff-level migration partner, not a transcription tool. Critically assess the information going into the plan, identify inconsistencies early, and help the user improve the API, naming, behavior, and migration path where the current state appears weak or ambiguous.

Do not simply record inputs at face value. Explain why something looks inconsistent, what tradeoff it creates, and which resolution path you recommend.

## When to use this skill

- You are starting a 1st-gen → 2nd-gen component migration
- The user asks to "prep" or "prepare" a component for migration
- The user asks to plan or scope a component migration before implementation

## When NOT to use

- You are already past Phase 1 (refactoring, creating files, implementing)

## Partnering expectations

- Treat the user as a design and engineering partner, not just a requester filling in a template
- Challenge weak or inconsistent inputs respectfully and with concrete reasoning
- When an API or naming choice seems likely to confuse consumers, propose a better alternative and explain why
- When sources disagree, do not silently choose one; surface the disagreement, recommend a resolution path, and record it clearly in the plan
- Prefer reducing long-term API complexity over preserving accidental 1st-gen quirks unless compatibility clearly demands otherwise
- Proactively identify opportunities to improve clarity, consistency, accessibility, and migration ergonomics

## How to invoke

- "Prep [component] for migration"
- "Run migration prep for [component]"
- "Phase 1 for [component] migration"
- "Create a migration plan for [component]"
- "Draft the Phase 1 plan for [component]"

---

## Required inputs before drafting

Prompt the user to ensure they have checked out `spectrum-css` at `spectrum-two` branch as sibling directory.

Review these sources before filling out the plan:

- The Phase 1 workflow guidance in **[Phase 1: Preparation](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-1-preparation)**
- The 2nd-gen migration status table in `CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/01_status.md`
- The component's rendering and styling analysis doc in `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/`
- The component's accessibility migration analysis doc in `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/`, if available
- The 1st-gen source, tests, README, and any shared mixins or helpers it depends on
- Relevant bug tickets and prior migration decisions
- Relevant Figma and React Spectrum references for naming, variants, and expected behavior

During discovery, explicitly check whether the component should:

- extend from another 2nd-gen component or shared base that is already planned or in progress
- be migrated before another component that depends on it
- wait on a prerequisite component or shared base to avoid duplicated work or conflicting APIs

Use the status table, existing component analyses, and source relationships to make these dependency and ordering calls explicit in the plan.

## Readiness threshold

You may draft a partial plan with explicit blockers when some inputs are missing, but do not present the plan as review-ready until all of the following are available:

- 1st-gen source
- Rendering and styling migration analysis
- Figma reference image(s) or equivalent approved visual reference
- Epic or ticket context if renames, deprecations, or breaking changes are proposed

If these inputs are missing, keep drafting focused on known facts, mark the gaps clearly, and add them to blockers or prerequisites.

## Source priority

If there are inconsistencies, use category-specific source priority and make explicit in the plan where the recommendation comes from if it introduces a rename, deprecation, or breaking change.

For API naming, behavior, and migration ergonomics:

1. React implementation
2. Figma visual spec
3. `spectrum-css` at `spectrum-two` branch component CSS and the render found in `[component]/stories/template`
4. 1st-gen implementation

For visual decisions and supported presentation modes:

1. Figma visual spec
2. React implementation
3. `spectrum-css` at `spectrum-two` branch component CSS and the render found in `[component]/stories/template`
4. 1st-gen implementation

If a required source is missing, call that out in the plan and add it to blockers or prerequisites. Links to most sources are available in "References" in the plan template.

## Escalate when

Pause and actively discuss with the user when you find any of the following:

- API naming that conflicts with React, Figma, or established repo conventions
- A 1st-gen behavior that appears confusing, inconsistent, or not worth carrying forward
- Multiple plausible component boundaries, such as one component vs several
- A component dependency or extension relationship changes the recommended migration order
- Breaking changes that may be justified now to avoid a worse migration later
- Inconsistencies between source materials that change the recommended API or behavior
- Missing information that prevents a confident recommendation

In these cases, do not just document the ambiguity. Recommend a preferred path, explain the tradeoff, and identify what evidence or review would resolve it.

## Output

- Copy the template at [assets/migration-prep-template.md](assets/migration-prep-template.md)
- Save the filled-in plan to `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md`
- Treat [references/migration-plan-contract.md](references/migration-plan-contract.md) as the shared baseline later migration phases will use to stay aligned with the approved plan
- Replace all `[component]` and `[Component]` placeholders before finalizing
- Prefer marking truly inapplicable sections as `N/A` instead of deleting them unless the user explicitly wants sections removed
- Verify that key references resolve after replacing placeholders. If they do not, try likely repo naming variants such as kebab-case, PascalCase, or the spaced display name before asking the user for the exact component slug or source path
- Do not present inferred details as confirmed. Mark decisions as confirmed, inferred, or open questions based on the quality of the source material
- For any proposed rename, deprecation, or breaking change, include at least one concrete supporting source. If you cannot support it, keep it as an open question instead of presenting it as settled
- Before finalizing, remove or replace unresolved placeholders such as `[component]`, `[Component]`, `[component-version]`, and `Epic SWC-####`
- Before finalizing, verify the highest-value links and references in the completed plan: 1st-gen source, analysis docs, tests, README, workflow doc, and React S2 component docs
- Keep `TL;DR`, `Most blocking open questions`, `Changes overview`, `2nd-gen API decisions`, and `References` populated. If information is unavailable, say so explicitly instead of leaving them blank
- Do not invent slots, events, CSS custom properties, or visual variants that are not supported by source material or guided by the user
- Call out any dependency-aware sequencing decisions, such as whether the component extends from another migrated component, should become a shared base, or should wait on a prerequisite migration

## Workflow

1. Follow **[Phase 1: Preparation](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-1-preparation)** in the washing machine workflow doc.
2. Gather the required inputs listed above before drafting.
3. Copy [assets/migration-prep-template.md](assets/migration-prep-template.md) to the component's `migration-plan.md`.
4. Resolve the component's actual repo naming before finalizing links and paths. Prefer existing repo paths over the user's phrasing.
5. Fill out the template with concrete references, decisions, breaking changes, and open questions.
6. Mark decisions as confirmed, inferred, or open questions, and cite supporting sources for any breaking-change recommendation.
7. Make dependency-aware sequencing explicit: note whether the component depends on another migration, should become a shared base, or should be migrated ahead of related components.
8. Make assumptions explicit and link blockers to the relevant section in the plan.
9. Check for contradictions across `Changes overview`, `2nd-gen API decisions`, and `Migration checklist` so the same decision is reflected consistently.
10. Verify key links, remove unresolved placeholders, and ensure each blocker or open question has clear status, owner, and next action where possible.
11. Throughout drafting the plan and at its conclusion, address any drift or inconsistencies introduced through edits.
12. Stop after producing the written plan unless the user explicitly asks to move into implementation.

## Staff review checklist

Before finalizing the plan, assess whether:

- The proposed 2nd-gen API is simpler and clearer than the 1st-gen API
- Naming is consistent across the plan and aligned with the strongest available source material
- Any preserved quirks are intentional and justified, not accidental carryovers
- Breaking changes are minimized where possible, but not avoided at the expense of long-term API quality
- The migration path for consumers is understandable and realistic
- Open questions are the right questions, not placeholders for analysis the agent should have done
- The plan gives reviewers a clear recommendation, not just a list of unresolved facts
