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

## Must-ask before drafting materially

Before drafting more than scaffold-level content, explicitly ask the user for any missing critical inputs below.

Critical inputs:

- Figma spec images or another approved visual reference
- Epic number
- Ticket numbers and summaries for any known breaking changes, or copied ticket descriptions the agent can evaluate
- Accessibility migration analysis, if not already available
- Confirmation or decision input when a dependency, extension, or shared-base relationship could materially change migration order, API shape, or shared-base strategy

Do not wait until the end of the plan to summarize these gaps. Ask for them early and directly.

If a critical input is missing:

- Pause and ask for it, or
- Offer a concrete fallback the user can provide immediately
- Continue only with clearly labeled provisional scaffolding, not with a review-ready recommendation

## Missing-input severity

Treat missing inputs in two categories:

- Materially blocking: visual references, accessibility analysis, dependency-order decisions, and breaking-change ticket context
- Required before finalizing: Epic number, version strings, exact source paths, and supplementary references

Materially blocking inputs should trigger an immediate user prompt.
Required-before-finalizing inputs may be recorded temporarily, but must still be explicitly requested before finalizing.

## Missing-input prompt style

When a critical input is missing, prompt the user with a direct request that explains why it matters.

Preferred pattern:

- what is missing
- why it materially affects the plan
- what the user can provide right now as the fastest acceptable fallback

Example prompts:

- "Provide Figma spec images or another approved visual reference so I can make a comprehensive recommendation on visual API and supported presentation modes."
- "Provide the Epic number so I can complete the migration plan header and references without leaving hidden placeholders."
- "Provide the ticket numbers and summaries for suspected breaking changes, or paste the ticket descriptions here and I can assess impact and migration risk from that text."
- "This component appears to depend on or extend from [X], which may change migration order and shared-base strategy. Confirm whether that dependency is intentional, or I can recommend a migration order based on the current source relationships."
- "The accessibility migration analysis is missing, and that can materially affect API and behavior decisions. Provide it if available, or I can proceed with provisional notes and explicitly mark accessibility-dependent decisions as unresolved."

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

If a dependency, inheritance, or shared-base relationship could materially change:

- migration order
- API design
- component boundaries
- shared core extraction

do not proceed as if the issue is settled.

Instead:

1. state the dependency clearly
2. ask the user whether a decision already exists
3. if not, offer to recommend a path based on current evidence
4. mark the resulting plan sections as provisional until resolved

## Must-confirm decisions

Do not treat the following as implicitly approved, even if you can make a strong recommendation:

- whether this component should extend from another migrated component or shared base
- whether another component should extend from this one
- whether migration order should change because of a dependency relationship
- whether shared logic should be extracted before this migration proceeds
- whether a major dependency concern should remain separate rather than being unified

For these cases:

1. state the recommendation clearly
2. explain the tradeoff briefly
3. explicitly ask the user to confirm, reject, or request a stronger recommendation
4. mark the affected sections as provisional until the user responds

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
- Do not replace `Epic SWC-####` with `TBD` or another soft placeholder without explicitly prompting the user first

## Template preservation rules

Preserve the template structure unless the user explicitly asks for structural changes.

Do not:

- replace prescribed tables with bullets
- remove pre-populated checklist items that are intended to remain stable
- remove table columns such as `Blocking?` or `Owner`
- rewrite section scaffolding that is marked as stable guidance
- drop pre-populated explanatory text unless it is clearly wrong for the component

You may:

- add rows to existing tables
- add bullets beneath a section when the template invites additive detail
- mark non-applicable items as `N/A` with a brief reason

## Final review prompt

After drafting the plan, always give the user a concise review prompt that:

- summarizes the most important unresolved or provisional decisions
- asks for feedback on any major recommendations
- explicitly invites refinement of the plan before implementation
- calls out any missing critical resources and how to continue once they are available

Preferred pattern:

- what to review now
- what is still provisional
- what to provide next if the user wants the plan tightened further

## Resume hooks for missing resources

If the plan is provisional because critical inputs are missing, end with explicit next-step prompts the user can act on later.

Example resume hooks:

- "When you have Figma spec images or another approved visual reference, send them and I’ll update the visual API and supported presentation modes."
- "When you have the accessibility migration analysis, send it and I’ll tighten the semantics, state, and testing recommendations."
- "When you have the Epic number, send it and I’ll finalize the header and references."
- "If you can paste the breaking-change ticket descriptions, I can evaluate likely impact and update the plan’s migration-risk guidance."
- "If there is already a team decision on the shared dependency / extension relationship, send it and I’ll update the sequencing and architecture sections accordingly."

## Workflow

1. Follow **[Phase 1: Preparation](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-1-preparation)** in the washing machine workflow doc.
2. Gather the required inputs listed above before drafting.
3. Copy [assets/migration-prep-template.md](assets/migration-prep-template.md) to the component's `migration-plan.md`.
4. Resolve the component's actual repo naming before finalizing links and paths. Prefer existing repo paths over the user's phrasing.
5. Fill out the template with concrete references, decisions, breaking changes, and open questions.
6. Mark decisions as confirmed, inferred, or open questions, and cite supporting sources for any breaking-change recommendation.
7. Make dependency-aware sequencing explicit: note whether the component depends on another migration, should become a shared base, or should be migrated ahead of related components.
8. Ask the user early for any missing critical inputs instead of only summarizing them at the end.
9. Make assumptions explicit and link blockers to the relevant section in the plan.
10. Check for contradictions across `Changes overview`, `2nd-gen API decisions`, and `Migration checklist` so the same decision is reflected consistently.
11. Verify key links, remove unresolved placeholders, and ensure each blocker or open question has clear status, owner, and next action where possible.
12. Preserve the template's stable tables, checklist items, and section structure unless the user explicitly asks for structural changes.
13. End with a concise review prompt that asks the user to confirm or refine any major provisional decisions and explains what missing resources can be provided next to tighten the plan.
14. Throughout drafting the plan and at its conclusion, address any drift or inconsistencies introduced through edits.
15. Stop after producing the written plan unless the user explicitly asks to move into implementation.

## Staff review checklist

Before finalizing the plan, assess whether:

- The proposed 2nd-gen API is simpler and clearer than the 1st-gen API
- Naming is consistent across the plan and aligned with the strongest available source material
- Any preserved quirks are intentional and justified, not accidental carryovers
- Breaking changes are minimized where possible, but not avoided at the expense of long-term API quality
- The migration path for consumers is understandable and realistic
- Open questions are the right questions, not placeholders for analysis the agent should have done
- The plan gives reviewers a clear recommendation, not just a list of unresolved facts
