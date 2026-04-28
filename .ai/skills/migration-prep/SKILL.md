---
name: migration-prep
description: Phase 1 of 1st-gen to 2nd-gen component migration. Use to understand the component, plan breaking changes, and define scope before any refactoring begins.
---

# Migration prep (Phase 1)

[Phase 1](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to thoroughly understand the component and produce a written migration plan—covering API surface, breaking changes, file layout, and naming decisions—before any code is moved or refactored.

## Mindset

You are a planner, not an implementer. Your job is to produce a written plan the team can review and challenge before a single line of code moves. Resist the urge to start implementing. Remember that a wrong plan caught in review is cheaper than a wrong implementation caught in testing.

Act as a staff-level migration partner, not a transcription tool. Critically assess the information going into the plan, identify inconsistencies early, and help the user improve the API, naming, behavior, and migration path where the current state appears weak or ambiguous.

Do not simply record inputs at face value. Explain why something looks inconsistent, what tradeoff it creates, and which resolution path you recommend. Pause and ask the user for input when needed, especially at the critical-input and must-confirm checkpoints below. It is more difficult for the user to review a large document for change suggestions when instead they could have provided clarifying input sooner in the process.

Before deciding scope, identify the component's feature and functionality surface as completely as the available evidence allows. Then use that inventory to decide what belongs in `Must ship`, `Additive`, and open-question buckets in the plan.

Actively watch for drift as you draft. Decisions recorded early can conflict with conclusions reached later — check for consistency across sections before finalizing.

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

- "Prepare [component] migration"
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

For the Figma reference specifically, ask for images from the internal Figma file **`S2 / Web (Desktop scale)`**. The preferred artifact is a PNG copied from the **primary frame** that includes the component's **overview**, **properties**, and **variants**. Ask the user to use Figma's **Copy as PNG** on that frame.

When evaluating `rendering-and-styling-migration-analysis.md`, **do not use the CSS => SWC mapping table**. Use only these sections:

- `SWC`
- `DOM Structure changes` — detail and summary content only
- `Summary of changes`
- `Resources`

Use these sources to build a full-enough feature/functionality inventory first, then classify items through:

- `Must ship` for in-scope work required in this migration
- `Additive` for deferred or out-of-scope work that is not required for the baseline migration
- open questions / blockers where scope still needs a decision

During discovery, explicitly check whether the component should:

- extend from another 2nd-gen component or shared base that is already planned or in progress
- be migrated before another component that depends on it
- wait on a prerequisite component or shared base to avoid duplicated work or conflicting APIs

Use the status table, existing component analyses, and source relationships to make these dependency and ordering calls explicit in the plan.

Do not jump straight to in-scope work without first inventorying what exists today or is expected in 2nd-gen.

Treat the accessibility migration analysis as a separate-workstream input. If it is missing, do not create it as part of `migration-prep`. Instead, ask the user to provide the existing analysis, or proceed only with clearly provisional accessibility-dependent notes if the user explicitly wants that.

## Readiness threshold

Do not present the plan as review-ready until all of the following are available:

- 1st-gen source
- Rendering and styling migration analysis
- Figma reference image(s) from **`S2 / Web (Desktop scale)`**, copied as PNG from the primary frame that includes overview, properties, and variants
- Epic or ticket context if renames, deprecations, or breaking changes are proposed

If any are missing, follow `Critical missing-input handling`.

## Must-ask before drafting materially

Before drafting more than scaffold-level content, explicitly ask the user for any missing critical inputs below.

Critical inputs:

- Figma PNG reference from **`S2 / Web (Desktop scale)`**, copied from the primary frame that includes overview, properties, and variants
- Epic number
- Ticket numbers and summaries for any known breaking changes, or copied ticket descriptions the agent can evaluate
- Accessibility migration analysis, if not already available
- Confirmation or decision input when a dependency, extension, or shared-base relationship could materially change migration order, API shape, or shared-base strategy

Do not wait until the end of the plan to summarize these gaps. Ask for them early and directly.

If a critical input is missing:

- Pause and ask for it, or
- Offer a concrete fallback the user can provide immediately
- Continue only with clearly labeled provisional scaffolding, not with a review-ready recommendation

Do not resolve a missing accessibility migration analysis by running the accessibility-migration-analysis skill from within this skill. That analysis belongs to a separate workstream and review path.

## Critical missing-input handling

This section specifies how to respond to the gaps identified in `Must-ask before drafting materially`.

When a critical input is missing, decide first whether it is materially blocking or only required before finalizing.

Materially blocking inputs:

- Figma PNG visual references from **`S2 / Web (Desktop scale)`**, copied from the primary frame that includes overview, properties, and variants
- accessibility analysis
- dependency-order or shared-base decisions
- breaking-change ticket context

Required-before-finalizing inputs:

- Epic number
- version strings
- exact source paths
- supplementary references

### For materially blocking inputs

Stop before drafting substantial recommendations.

Prompt the user immediately with a numbered action list.

The prompt must:

1. state that the plan cannot yet be comprehensive or review-ready
2. list each missing item as a numbered action
3. explain why each item materially affects the plan
4. offer the fastest acceptable fallback the user can provide now
5. ask whether the user wants to provide the inputs now or proceed explicitly with a provisional plan

Do not bury materially blocking inputs in a closing summary sentence.

### For required-before-finalizing inputs

You may continue with provisional scaffolding, but you must still explicitly request the missing information before finalizing. Do not silently replace placeholders such as `Epic SWC-####` with soft values like `TBD`.

### Preferred prompt pattern

Use this structure:

- short blocker statement
- numbered list of required next actions so the user can easily respond by referencing the number
- one sentence on how the user can resume once they have the inputs

Example:

"I’m missing a few materially blocking inputs, so I should pause before treating this plan as comprehensive or review-ready.

Please provide these to continue:

1. Approved visual reference
   Send a PNG copied from the internal Figma file `S2 / Web (Desktop scale)`, using `Copy as PNG` on the primary frame that includes overview, properties, and variants, so I can validate visual API and supported presentation modes.
2. Accessibility migration analysis
   Send the analysis if available, or confirm that I should proceed provisionally and leave accessibility-dependent recommendations unresolved.
3. Breaking-change ticket context
   Send ticket numbers and summaries, or paste the ticket descriptions here and I can assess likely impact from that text.

If you want to proceed provisionally instead, tell me that explicitly and I’ll keep the unresolved areas clearly marked."

For accessibility analysis specifically:

- ask the user to provide the existing accessibility migration analysis if it exists
- otherwise ask whether they want to pause until that separate workstream is completed, or proceed with accessibility-dependent recommendations explicitly marked as provisional

Do not generate that analysis inside `migration-prep`.

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

### Must-confirm decisions

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

## Output

- Copy the template at [assets/migration-prep-template.md](assets/migration-prep-template.md)
- Save the filled-in plan to `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md`
- Treat [references/migration-plan-contract.md](references/migration-plan-contract.md) as the shared baseline later migration phases will use to stay aligned with the approved plan
- In `References`, prefer explicit source entries over generic repo-level links when the exact artifact is known. For Spectrum CSS, use the reviewed component source path when possible (typically `spectrum-css/components/[component]/index.css` on the `spectrum-two` branch) rather than only linking the repo root or branch overview
- Replace all `[component]` and `[Component]` placeholders before finalizing
- Prefer marking truly inapplicable sections as `N/A` instead of deleting them unless the user explicitly wants sections removed
- Verify that key references resolve after replacing placeholders. If they do not, try likely repo naming variants such as kebab-case, PascalCase, or the spaced display name before asking the user for the exact component slug or source path
- Do not present inferred details as confirmed. Mark decisions as confirmed, inferred, or open questions based on the quality of the source material
- For any proposed rename, deprecation, or breaking change, include at least one concrete supporting source. If you cannot support it, keep it as an open question instead of presenting it as settled
- Before finalizing, remove or replace unresolved placeholders such as `[component]`, `[Component]`, `[component-version]`, and `Epic SWC-####`
- Before finalizing, verify the highest-value links and references in the completed plan: 1st-gen source, analysis docs, tests, README, workflow doc, and React S2 component docs
- Keep `TL;DR`, `Most blocking open questions`, `Changes overview`, `2nd-gen API decisions`, and `References` populated. If information is unavailable, say so explicitly instead of leaving them blank
- Keep blocker numbering in the template's required `Q{#}` format. Number open questions sequentially across all blocker sections, and reuse those exact `Q{#}` IDs in `Most blocking open questions`. Do not invent a second numbering scheme there or deviate from the existing `Q{#}` format. Do not create empty links for questions.
- Do not invent slots, events, CSS custom properties, or visual variants that are not supported by source material or guided by the user
- Call out any dependency-aware sequencing decisions, such as whether the component extends from another migrated component, should become a shared base, or should wait on a prerequisite migration
- Do not replace `Epic SWC-####` with `TBD` or another soft placeholder without explicitly prompting the user first
- Make the feature/functionality inventory explicit enough to support `Must ship`, `Additive`, and open-question calls before treating the plan as review-ready

## Definition of done

Before the plan is considered complete:

- key references have been verified (links resolve, anchors exist, version strings are real)
- unresolved placeholders have been removed or explicitly addressed with the user (`[component]`, `[Component]`, `[component-version]`, `Epic SWC-####`)
- required sections are populated or explicitly marked with a reason (`TL;DR`, `Most blocking open questions`, `Changes overview`, `2nd-gen API decisions`, `References`)
- the feature/functionality inventory is documented well enough across `1st-gen API surface`, `Dependencies`, and `Changes overview` to support `Must ship`, `Additive`, and open-question decisions
- dependency-aware sequencing decisions are called out
- major provisional decisions are surfaced back to the user for review
- all `Must ship` / core migration questions are resolved and documented inline in the section they affect, rather than left only in `Blockers and open questions`
- `Blockers and open questions` no longer contains unresolved items that would materially change the core migration recommendation
- once core migration questions are resolved and deferred-item tickets exist, replace the drafting-time open-question rows in `Blockers and open questions` with a concise deferred-ticket table
- the deferred-ticket table should include ticket ID, deferred item summary, why it is deferred, and the migration-plan section it came from

## Template preservation rules

Preserve the template structure unless the user explicitly asks for structural changes.

Do not:

- replace prescribed tables with bullets or prose
- remove pre-populated checklist items that are intended to remain stable
- remove table columns such as `Blocking?` or `Owner`
- rewrite section scaffolding that is marked as stable guidance
- drop pre-populated text unless it is clearly wrong for the component

You may:

- add rows to existing tables
- add bullets beneath a section when the template invites additive detail
- mark non-applicable items as `N/A` with a brief reason

## Resume hooks for missing resources

If the plan is provisional because critical inputs are missing, end with explicit next-step prompts the user can act on later.

Example resume hooks:

- "When you have the Figma PNG from `S2 / Web (Desktop scale)` copied from the primary frame with overview, properties, and variants, send it and I’ll update the visual API and supported presentation modes."
- "When you have the accessibility migration analysis, send it and I’ll tighten the semantics, state, and testing recommendations."
- "When you have the Epic number, send it and I’ll finalize the header and references."
- "If you can paste the breaking-change ticket descriptions, I can evaluate likely impact and update the plan’s migration-risk guidance."
- "If there is already a team decision on the shared dependency / extension relationship, send it and I’ll update the sequencing and architecture sections accordingly."

## Workflow

1. Follow **[Phase 1: Preparation](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-1-preparation)** in the washing machine workflow doc.
2. Gather the required inputs listed above before drafting.
3. Copy [assets/migration-prep-template.md](assets/migration-prep-template.md) to the component's `migration-plan.md`.
4. Resolve the component's actual repo naming before finalizing links and paths. Prefer existing repo paths over the user's phrasing.
5. Build a feature/functionality inventory from the available sources before deciding what belongs in `Must ship`, `Additive`, or open-question buckets.
6. Fill out the template with concrete references, decisions, breaking changes, and open questions.
7. Mark decisions as confirmed, inferred, or open questions, and cite supporting sources for any breaking-change recommendation.
8. Make dependency-aware sequencing explicit: note whether the component depends on another migration, should become a shared base, or should be migrated ahead of related components.
9. If materially blocking inputs are missing, follow `Critical missing-input handling` before drafting substantial recommendations.
10. Ask the user early for any missing critical inputs instead of only summarizing them at the end.
11. Make assumptions explicit and link blockers to the relevant section in the plan.
12. Check for contradictions across `Changes overview`, `2nd-gen API decisions`, and `Migration checklist` so the same decision is reflected consistently.
13. Ensure each blocker or open question has clear status, owner, and next action where possible.
14. Preserve the template's stable tables, checklist items, and section structure unless the user explicitly asks for structural changes.
15. End with a concise review prompt that asks the user to confirm or refine any major provisional decisions and explains what missing resources can be provided next to tighten the plan.
16. Stop after producing the written plan unless the user explicitly asks to move into implementation.

## Final review checklist

This is the **quality reflection** the agent must perform after `Definition of done` is satisfied and before handing the plan to the user for review. Where `Definition of done` is mechanical, this checklist is judgmental — surface concerns to the user when any answer is "no" or unclear, and capture the unresolved item in `Most blocking open questions` if it materially affects the recommendation.

Before finalizing the plan, assess whether:

- The proposed 2nd-gen API is simpler and clearer than the 1st-gen API
- Naming is consistent across the plan and aligned with the strongest available source material
- Any preserved quirks are intentional and justified, not accidental carryovers
- Breaking changes are minimized where possible, but not avoided at the expense of long-term API quality
- The migration path for consumers is understandable and realistic
- Open questions are the right questions, not placeholders for analysis the agent should have done
- The plan gives reviewers a clear recommendation, not just a list of unresolved facts

## Final review prompt

After drafting the plan, always end with a structured review prompt. Present it as three clearly labeled sections so the user can act on each area independently — do not collapse them into a single paragraph.

**Required sections:**

1. **Breaking changes to verify** — list each proposed breaking change and ask the user to confirm it is accurately scoped, that a ticket exists or is needed, and whether any requires team sign-off before the plan is treated as settled
2. **What is still provisional** — call out every decision marked as inferred or open question that could materially change the plan; name which sections would be affected if the decision resolves differently
3. **What to provide next** — list missing resources or unresolved blockers as numbered actions the user can respond to by number, explain what each unlocks in the plan, and include a call to create Jira tickets under the migration Epic for deferred items using the `deferred` label. Once those tickets exist, the final plan should replace drafting-time deferred open questions with a concise deferred-ticket table in `Blockers and open questions`

If there are no breaking changes, say so explicitly rather than omitting the section.
