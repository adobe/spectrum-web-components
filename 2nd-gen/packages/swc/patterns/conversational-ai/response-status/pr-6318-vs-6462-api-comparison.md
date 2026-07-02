# Response status API comparison: PR #6318 vs PR #6462

This document compares:

- PR #6318 (Aziz): <https://github.com/adobe/spectrum-web-components/pull/6318>
- PR #6462 (Ruben): <https://github.com/adobe/spectrum-web-components/pull/6462>

It focuses on API design, behavior, file scope, and consumer ergonomics so the team can choose a direction before merge.

Important context for this document:

- Neither PR has merged.
- This is a forward-looking design choice, not a backward-compatibility exercise.

## Executive recommendation

Use PR #6462 as the base API direction, then selectively pull back a small subset of behavior from PR #6318 only where needed.

Why:

- The single-status model in #6462 is easier to understand and document.
- It keeps most of the visual/timeline styling work from #6318.
- It removes large prototype/demo surface that is expensive to maintain.
- It reduces long-term API ambiguity (`loading` vs `phase` vs implicit mode).

Where to be careful:

- #6318 and #6462 represent different API philosophies; the team should pick one and avoid carrying both models.
- #6462 still needs final a11y/test/changelog/checklist closure before merge.

## Scope at a glance

### File counts

- PR #6318: 21 files changed
- PR #6462: 14 files changed

### Scope summary table

| Area                                | PR #6318 (Aziz) | PR #6462 (Ruben) | Practical impact                          |
| ----------------------------------- | --------------- | ---------------- | ----------------------------------------- |
| Response status core                | Yes             | Yes              | Both implement agentic response status    |
| Response status step subcomponent   | Yes             | Yes              | Both ship timeline step primitive         |
| Response status tests (unit + a11y) | Yes             | Yes              | Both touch verification surface           |
| Storybook/Vite alias updates        | Yes             | No               | #6318 includes extra tooling config edits |
| Scripted agentic demo files         | Yes             | No               | #6318 has larger prototype/demo surface   |
| System message story updates        | No              | Yes              | #6462 aligns adjacent story docs          |

### Files only in PR #6318

- `2nd-gen/packages/swc/.storybook/main.ts`
- `2nd-gen/packages/swc/.storybook/preview.ts`
- `2nd-gen/packages/swc/vite.config.ts`
- `2nd-gen/packages/swc/patterns/conversational-ai/agentic-demo-flow-script.ts`
- `2nd-gen/packages/swc/patterns/conversational-ai/conversation-thread/stories/agentic-conversation-flow-demo.ts`
- `2nd-gen/packages/swc/patterns/conversational-ai/conversation-thread/stories/agentic-conversation-flow.stories.ts`
- `2nd-gen/packages/swc/patterns/conversational-ai/conversation-turn/conversation-turn.css`
- `2nd-gen/packages/swc/patterns/conversational-ai/response-status/stories/agentic-states.stories.ts`

Interpretation:

- #6318 includes alias/build/storybook adjustments and full scripted demo work.
- #6462 intentionally removes this prototype-heavy surface.

### Files only in PR #6462

- `2nd-gen/packages/swc/patterns/conversational-ai/system-message/stories/system-message.stories.ts`

Interpretation:

- #6462 adds documentation alignment in neighboring stories as part of API review.

## API contract comparison

### API decision matrix (table-first)

| API concern               | PR #6318 (Aziz)                                | PR #6462 (Ruben)             | Pros                                                                                             | Cons                                                                            |
| ------------------------- | ---------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | -------- | ------ | ------- | --------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Lifecycle model           | `loading` + `phase`                            | `status` only                | #6318: expressive split between mode and phase; #6462: simpler single contract                   | #6318: conflicting sources of truth risk; #6462: less explicit phase naming     |
| Agentic states            | `initiating                                    | processing                   | stopped                                                                                          | complete`                                                                       | `pending | active | stopped | complete` | #6318: explicit initiating dwell; #6462: easier state mapping from runtime systems | #6318: more branching; #6462: less explicit initiating phase naming |
| Step title/detail API     | Deprecated `title/detail` plus slots           | Slots-first only             | #6318: easier mixed expression during design iteration; #6462: cleaner long-term API             | #6318: prolonged deprecation burden; #6462: stricter contract adoption required |
| Step detail slot          | Default slot detail                            | `slot="description"`         | #6318: less markup; #6462: explicit semantics and readability                                    | #6318: less explicit templates; #6462: slightly more verbosity                  |
| Accessibility label       | `slot="reasoning-label"`                       | `accessible-label` attribute | #6318: rich slot flexibility; #6462: straightforward usage                                       | #6318: more boilerplate; #6462: less flexible than slot content                 |
| Complete summary          | `duration` helper supported                    | Consumer-supplied label text | #6318: easy elapsed-time copy; #6462: no precedence ambiguity                                    | #6318: precedence logic complexity; #6462: more consumer responsibility         |
| Plain reasoning text mode | Present (via `loading` + default content path) | Not primary model            | #6318: supports prose-style status expression; #6462: keeps contract focused on structured steps | #6318: increases contract breadth; #6462: less flexible for prose-only patterns |

### Full property and attribute matrix

#### `swc-response-status`

| API surface        | Type                           | PR #6318                | PR #6462                        | Design impact                                                   |
| ------------------ | ------------------------------ | ----------------------- | ------------------------------- | --------------------------------------------------------------- | ---------- | --------- | -------------------------------------------------------- |
| `loading`          | Property + reflected attribute | Yes (`boolean`)         | No                              | Keeps a dedicated loading primitive if team wants dual-mode API |
| `phase`            | Property + reflected attribute | Yes (`initiating        | processing                      | stopped                                                         | complete`) | No        | Supports explicit phase semantics independent of loading |
| `duration`         | Property + reflected attribute | Yes (`number`)          | No                              | Built-in computed complete-copy path                            |
| `status`           | Property + reflected attribute | No                      | Yes (`pending                   | active                                                          | complete   | stopped`) | Single source of truth for lifecycle in #6462            |
| `open`             | Property + reflected attribute | Yes (`boolean`)         | Yes (`boolean`)                 | Stable across both options                                      |
| `accessible-label` | Property/attribute             | No                      | Yes (`string`, non-reflected)   | Attribute-based a11y naming in #6462                            |
| `loading-label`    | Property/attribute             | No                      | No                              | Not part of either proposed API                                 |
| `complete-label`   | Property/attribute             | No                      | No                              | Not part of either proposed API                                 |
| `reasoning-label`  | Property/attribute             | No (slot-based instead) | No (attribute approach instead) | Naming strategy differs: slot in #6318 vs attribute in #6462    |

#### `swc-response-status-step`

| API surface          | Type                           | PR #6318         | PR #6462                                           | Design impact                                                                 |
| -------------------- | ------------------------------ | ---------------- | -------------------------------------------------- | ----------------------------------------------------------------------------- | --------- | ------------- | ------ | -------- | --------- | -------------------------- |
| `status`             | Property + reflected attribute | Yes (`pending    | active                                             | complete                                                                      | stopped`) | Yes (`pending | active | complete | stopped`) | Stable across both options |
| `title`              | Property + reflected attribute | Yes (deprecated) | No                                                 | #6318 offers deprecated property path; #6462 avoids attribute-style step API  |
| `detail`             | Property + reflected attribute | Yes (deprecated) | No                                                 | #6318 offers deprecated property path; #6462 favors explicit slots            |
| `slot="label"`       | Slot                           | Yes              | Yes                                                | Stable title slot                                                             |
| Default slot detail  | Slot                           | Yes              | Supported fallback, but `description` is preferred | #6318 keeps concise default-slot detail; #6462 nudges explicit slot semantics |
| `slot="description"` | Slot                           | No               | Yes                                                | New explicit detail slot in #6462                                             |

### API equivalence map

| API expression in #6318                           | Equivalent expression in #6462                                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `<swc-response-status loading>`                   | `<swc-response-status status="active">`                                                                             |
| `phase="initiating"`                              | `status="pending"` + optional `slot="summary"`                                                                      |
| `phase="processing"`                              | `status="active"`                                                                                                   |
| `duration="9"`                                    | `<span slot="label">Thought for 9 seconds</span>`                                                                   |
| `<swc-response-status-step title="X" detail="Y">` | `<swc-response-status-step><span slot="label">X</span><span slot="description">Y</span></swc-response-status-step>` |

### Consumer impact table

| Consumer scenario                                  | PR #6318                                    | PR #6462                              | Design fit                                 |
| -------------------------------------------------- | ------------------------------------------- | ------------------------------------- | ------------------------------------------ |
| Team wants prose-only status expression            | Direct support via `loading` + content path | Not primary pattern (steps-first)     | Better fit in #6318                        |
| New app implementing agentic timeline from scratch | Works                                       | Works                                 | Similar                                    |
| Team wants built-in elapsed-time copy              | Built-in via `duration`                     | Label text owned by consumer template | Better fit in #6318 unless helper is added |
| App wants strict explicit markup contract          | Mixed old+new paths                         | Clean slot-first API                  | Lower long-term cost in #6462              |

### Lifecycle model

#### PR #6318

- Uses dual model:
  - `loading` boolean
  - Agentic: `phase="initiating|processing|stopped|complete"`

Pros:

- Expressive split between loading flag and explicit phase.
- Explicit `initiating` phase can express pre-step dwell well.

Cons:

- Multiple ways to represent state can conflict.
- Harder for consumers to know which props are authoritative.
- More test permutations and docs overhead.

#### PR #6462

- Uses one lifecycle property:
  - `status="pending|active|complete|stopped"`

Pros:

- Single mental model, simpler integration.
- Less internal branching logic.
- Better long-term maintainability for SDK-driven updates.

Cons:

- Requires team agreement that one status axis is sufficient for all target flows.

### Step API

#### PR #6318

- `swc-response-status-step` keeps deprecated property path:
  - `title` (deprecated)
  - `detail` (deprecated)
- Slots:
  - `slot="label"` for title
  - default slot for detail

Pros:

- Easier to keep both property-style and slot-style expression during iteration.

Cons:

- Mixed old/new shape prolongs deprecation burden.
- Default-slot detail can be less explicit in templates.

#### PR #6462

- Step API is slot-first and explicit:
  - `slot="label"`
  - `slot="description"`
  - `status` on step

Pros:

- Clear, explicit semantic contract.
- Better readability in consumer templates.

Cons:

- Less permissive for mixed property/default-slot usage patterns.

### Accessibility label API

#### PR #6318

- Uses `slot="reasoning-label"` for panel/list naming.

Pros:

- Flexible for rich slotted content.

Cons:

- Slightly more boilerplate than an attribute.

#### PR #6462

- Uses `accessible-label` attribute.

Pros:

- Simple and direct for most use cases.

Cons:

- Less flexible than full slot content.

### Complete state summary

#### PR #6318

- Supports `duration` and computes summary like `Thought for N seconds`.

Pros:

- Convenient for telemetry-driven elapsed-time display.

Cons:

- Adds precedence complexity with labels/summary customizations.

#### PR #6462

- Consumer owns complete label content via slot text.

Pros:

- No hidden formatting precedence rules.
- Fully explicit output copy.

Cons:

- Slightly more work for consumers that only have numeric duration.

## Consumer usage examples

### PR #6318 style (dual mode)

```html
<!-- Legacy mode -->
<swc-response-status loading open>
  Generating with reasoning...
</swc-response-status>

<!-- Agentic mode -->
<swc-response-status phase="processing" open duration="9">
  <span slot="summary">Processing request</span>
  <span slot="reasoning-label">Execution steps</span>

  <swc-response-status-step status="active">
    <span slot="label">Searching repositories for Europe trips</span>
    Checking internal repositories and templates.
  </swc-response-status-step>
</swc-response-status>
```

### PR #6462 style (single status)

```html
<swc-response-status status="active" open accessible-label="Execution steps">
  <span slot="summary">Processing request</span>

  <swc-response-status-step status="active">
    <span slot="label">Searching repositories for Europe trips</span>
    <span slot="description">
      Checking internal repositories and templates.
    </span>
  </swc-response-status-step>
</swc-response-status>

<swc-response-status status="complete">
  <span slot="label">Thought for 9 seconds</span>
  <swc-response-status-step status="complete">
    <span slot="label">Compose response</span>
    <span slot="description">Compiled and formatted final answer.</span>
  </swc-response-status-step>
</swc-response-status>
```

## Behavior and styling differences

Both PRs include the core visual system for agentic status:

- Step timeline rail and connectors
- Three-dot active loader
- Step icon states (`pending`, `active`, `complete`, `stopped`)
- Response-status and step CSS structure

Notable differences:

- #6462 removes some earlier rolling-label CSS classes and keeps a simplified roll implementation.
- #6462 updates deprecated token usage (for example icon-size token alignment).
- #6318 carries additional prototype/demo files and import-alias setup.

## Risk assessment

### Risks if choosing PR #6318 as-is

- Higher API complexity due to dual state model.
- Longer docs/testing burden because dual behaviors coexist.
- Extra demo/build configuration surface may distract from production API.

### Risks if choosing PR #6462 as-is

- Requires explicit team agreement to commit to the single-status structure.
- Some use cases that prefer prose-only status expression may need a documented pattern.
- Must close CI and review follow-ups before merge.

## Suggested path (option C: pragmatic hybrid)

Start from #6462, then add only the minimum additional API surface needed by product requirements.

### Keep from #6462

- Single lifecycle property (`status`)
- Explicit step slots (`label` + `description`)
- Leaner stories focused on production API
- Simplified docs and testing matrix

### Recommended final contract table

| Contract area          | Recommended final choice                                    | Reason                                      |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------- |
| Lifecycle prop         | `status` only                                               | Avoid dual-mode ambiguity                   |
| Step detail shape      | `slot="description"`                                        | Explicit, readable, and testable            |
| Accessibility naming   | `accessible-label`                                          | Simple default ergonomics                   |
| Prose-only status path | Optional, only if product explicitly wants it               | Avoid accidental broadening of API contract |
| Duration copy          | Keep consumer-owned by default; add helper only if demanded | Minimize precedence complexity              |

### Consider re-adding from #6318 only if requested

- Plain-text reasoning pathway if the team decides this is part of the target API
- `duration` helper API if consumers strongly need computed summary copy
- Storybook/Vite alias changes only if unresolved import scenarios require them

### Do not reintroduce by default

- Prototype scripted demo files that are not needed for the shipping API contract

## Decision checklist for the team

Before implementation continues, confirm these explicitly:

1. Do we want a dual API (`loading`/`phase`) or a single API (`status`)?
2. Do we want a first-class `duration` API, or should copy be consumer-owned?
3. Should step detail be explicit `slot="description"` only?
4. Is `accessible-label` sufficient, or do we require slot-based panel naming?
5. Do we keep any of the prototype stories for QA/demo purposes?

## Final recommendation

Pick #6462 as the base and ship a refined single-status API.

If the team wants selected ergonomics from #6318 (for example `duration` or prose-style status content), add them intentionally as part of the target contract rather than carrying two full API models.
