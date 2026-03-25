---
name: migration-prep
description: Phase 1 of 1st-gen to 2nd-gen component migration. Use to understand the component, plan breaking changes, and define scope before any refactoring begins.
---

# Migration prep (Phase 1)

[Phase 1](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to thoroughly understand the component and produce a written migration plan—covering API surface, breaking changes, file layout, and naming decisions—before any code is moved or refactored.

## When to use this skill

- You are starting a 1st-gen → 2nd-gen component migration
- The user asks to "prep" or "prepare" a component for migration
- The user asks to plan or scope a component migration before implementation

## When NOT to use

- The component analysis (Step 1) hasn't been run yet — do that first
- You are already past Phase 1 (refactoring, creating files, implementing)

## How to invoke

- "Prep [component] for migration"
- "Run migration prep for [component]"
- "Phase 1 for [component] migration"

---

## Background: core vs SWC split

Before starting, understand where code goes:

| Layer | Location                                   | Contains                                                                                    |
| ----- | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Core  | `2nd-gen/packages/core/components/<name>/` | Shared logic, no rendering. Base class, types, validation, mixins.                          |
| SWC   | `2nd-gen/packages/swc/components/<name>/`  | Rendering, styling, element registration. Extends core base; adds `render()`, CSS, stories. |

- **Base class (core):** Properties, getters/setters, lifecycle, validation. Use `@internal` for non-public API.
- **Concrete class (SWC):** Extends the base; adds styles, `render()`, and any SWC-only props.
- **Types:** In core (e.g. `Badge.types.ts`) so both 1st-gen and 2nd-gen can share or extend.

**Expected file layout:**

```
core/  Component.base.ts, Component.types.ts, index.ts
SWC/   Component.ts, component.css, index.ts, stories/, test/
```

## Workflow

### 1. Read or generate the component analysis

- Analysis docs live under `CONTRIBUTOR-DOCS/03_project-planning/03_components/<component>/rendering-and-styling-migration-analysis.md`.
- If the doc doesn't exist, use the [`component-migration-analysis`](../component-migration-analysis/SKILL.md) skill (or the Step 1 prompt) to generate it. Get user confirmation and approval of the rendering and styling doc before treating it as final.
- Have spectrum-css in the same workspace so comparisons to Spectrum 2 sources are practical.

### 2. Read 1st-gen code and dependencies

- Read the 1st-gen component source, mixins, and shared modules it depends on. Follow import paths. Be able to explain the code with analogies and/or at a 6th grade reading level.

### 3. List breaking changes and bugs

- Identify all breaking API changes the migration will introduce.
- Check JIRA for existing bug tickets; note severity and whether fixes require breaking changes.

### 4. Write the migration plan

Cover all of the following:

- Full public API: attributes, properties, slots, events
- Breaking changes and how they'll be handled
- File layout (what goes in core, what goes in SWC)
- "API washing" / naming: alignment with Figma option names, React Spectrum where relevant, possible component splits (e.g. menu vs listbox), overlay/event conventions (`sp-opened`, `sp-closed`)
- Risks and order of work

**Stop and ask:** Should this be one component or several? If the answer is "split," agree with the user/user on new component names and APIs before Phase 2.

---

## Decision trees

### Should this component be split into multiple components?

- **Two or more distinct patterns** (e.g. a component that acts as both a button and a link) → Consider splitting (e.g. base + Button + Link variants as separate elements).
- **One clear concept with variants** (e.g. a badge that is neutral, positive, or negative) → Keep as one component.
- **Stop and ask** if the team has already decided — check the migration plan or the relevant ticket before proceeding.

### Should this component be combined with another?

- **Always used together, or nearly identical API** → Consider one component with a unified prop-based API.
- **Separate in Spectrum design, or used in different contexts** → Keep separate.

### 5. Get user review

Get user sign-off on the plan—especially naming, splits, and overlay/event decisions—before large refactors so downstream phases stay aligned.

---

## Checklist

- [ ] I have read the component analysis doc (or generated one via Step 1)
- [ ] I know the full public API: attributes, properties, slots, events
- [ ] I know all JIRA bugs for this component and their severity
- [ ] I know which parts are S1-only vs S2-only (if both exist)
- [ ] I have a list of files to create in core and SWC
- [ ] The migration plan is written and covers: API surface, breaking changes, file layout, naming/split/overlay-event decisions
- [ ] The plan has been reviewed by the user before major refactors begin

---

## Common problems

| Problem                   | Solution                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| No component analysis doc | Use [Badge](../../../2nd-gen/packages/swc/components/badge) as reference; run the Analyze step prompt to generate one, or compare 1st-gen vs 2nd-gen structure manually. |
| Existing 1st-gen bugs     | Consider severity and whether fixes require breaking changes before deciding how to proceed.                                                                             |
| Many variants or modes    | Plan a decision tree: one component vs several. If splitting, agree on names and APIs with the user first.                                                               |

---

## Quality gate

Phase 1 is complete when:

> The migration plan is written and covers: API surface, breaking changes, file layout (core vs SWC), and—where applicable—naming/split/overlay-event decisions, with user review completed before major refactors begin.
