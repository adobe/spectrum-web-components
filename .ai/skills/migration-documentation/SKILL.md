---
name: migration-documentation
description:
  Phase 7 of 1st-gen to 2nd-gen component migration. Use to write JSDoc,
  Storybook stories, and usage docs so the component is usable and
  understandable by others.
---

# Migration documentation ([Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is JSDoc on the public API and Storybook stories covering the main use cases.

See also: [`documentation`](../documentation/SKILL.md) for Adobe content writing standards to follow when writing usage docs.

## Mindset

You are writing for the next contributor, not for yourself. Every story and JSDoc line should answer the question a new engineer would ask six months from now. Avoid restating the implementation. Explain the intent and the constraints. Be sure to follow the `documentation` skill for writing style and content expectations.

Read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available before documenting the component. Use it to understand constraints, behavioral decisions, and deferred work. If it is missing, stale, or intentionally incomplete, derive the needed context from the implemented component and source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

## When to use this skill

- Phase 6 (migration-testing) is complete
- The user asks to "document [component]" or "add stories for [component]"
- The user asks to write JSDoc, add Storybook stories, or document migration
  notes
- The user refers to "Phase 7" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 6 is not complete — tests should pass before documentation is finalized
- You are updating docs for an existing component unrelated to migration

## How to invoke

- "Document [component]"
- "Add stories for [component]"
- "Phase 7 for [component] migration"

---

## Workflow

### Step 0: Check the migration plan documentation checklist

Before writing anything, read the `### Documentation` section of the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md`. Make a note of every unchecked item. These are the documentation gaps Phase 7 must close. Return to this checklist at the end and confirm which items are now covered by stories JSDoc and which remain outstanding.

### Step 1: Ask for guidance resources

Before writing any "when to use" or "why to use" descriptions for sizes, variants, states, or behaviors — **stop and ask the user** for the authoritative source. Acceptable sources include:

- The [Spectrum 2 Design site](https://s2.spectrum.corp.adobe.com/)
- The component's Figma spec
- The 1st-gen component README (`1st-gen/packages/[component]/README.md`)
- An explicit statement in the migration plan

If no source is available at authoring time, limit JSDoc to technically verifiable facts only (see [What NOT to include](#what-not-to-include-in-stories-jsdoc) below). Do not invent guidance. Implementors cannot easily distinguish AI-invented guidance from documented design decisions, which erodes trust in the documentation.

### Step 2: Check for a Phase 5 stories scaffold

If Phase 5 (migration-styling) was completed, `2nd-gen/packages/swc/components/[component]/stories/[component].stories.ts` likely already exists with Playground, Overview, Anatomy, Options, States, and Behaviors stories — all structurally correct but without JSDoc prose. Phase 7's job is to:

1. Add JSDoc comments to every story (except Playground and Overview, which have none by convention).
2. Complete the Accessibility story body — it was left as a `// TODO` comment in Phase 5.
3. Add any stories that were deferred or were not CSS-visible enough to include in Phase 5.
4. For each item in the migration plan's Additive table:
   - If the feature is implemented and has no story yet, add it as a normal
     story in the relevant section (Options, Behaviors, etc.).
   - If the feature is not yet implemented, add it to an `UpcomingFeatures`
     story (tag: `['upcoming', 'description-only']`). Keep it brief and
     bullet-point style — the goal is to signal roadmap intent, not explain
     scope decisions. Write from a consumer's perspective (what it does for
     them) and omit internal framing like "not part of the initial scope" or
     "deferred pending a decision". Do not include ticket numbers or TODO
     language.

If the stories document already exists, do **not** recreate the file from scratch. Augment what is already there.

Follow
**[Phase 7: Documentation](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-7-documentation)**
in the washing machine workflow doc — it covers what to do, what to check,
common problems, and the quality gate for this phase.

If the docs need to describe behavior that differs from the approved migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

### Step 3: Write story JSDoc

Follow the rules in [What NOT to include](#what-not-to-include-in-stories-jsdoc) strictly. Write JSDoc that is technically accurate and sourced. Where no source is available for usage guidance, describe what the attribute does (its effect) rather than when to use it.

### Step 4: Cross-check against the documentation checklist

Return to the list from Step 0. For each unchecked documentation item in the migration plan:

- If it is now covered by a story or JSDoc comment, note it as done.
- If it belongs in the consumer migration guide (breaking changes, migration paths from 1st-gen), note it as deferred to the `consumer-migration-guide` skill — do **not** add it to the stories file.
- If it is genuinely missing from both stories and the consumer guide, flag it to the user.

---

## What NOT to include in stories JSDoc

The following must never appear in `.stories.ts` files:

### Migration notes

Do not include "Migration note:", "replaces legacy X", or "1st-gen vs 2nd-gen" content in story JSDoc. Migration guidance is for developers upgrading from 1st-gen and belongs in the dedicated consumer migration guide produced by the `consumer-migration-guide` skill. Stories are consumed by all users of the component, not only by people migrating.

### Invented usage guidance

Do not write "when to use" guidance without a verified source. Limit descriptions to:

- What values are valid
- What constraints exist between attributes (e.g., `outline` is only supported with `primary` and `secondary`)
- What the component does technically (behavior, ARIA semantics, timing)

```typescript
// ❌ Bad — invented guidance
// Small (s): Compact areas, inline actions, or dense UIs
// Primary: Default neutral family for most actions (e.g., Save, Done, Next)

// ✅ Good — verifiable facts
// Buttons come in four sizes: small (s), medium (m), large (l), and extra-large (xl). Medium is the default.
// Four variants are available: primary (default), secondary, accent, and negative.
// accent and negative are fill-only; fill-style="outline" is not supported for these variants.
```

### Other formatting rules

Em dashes, Jira ticket references, and filler closing sentences are prohibited by the shared formatting rules in `.ai/rules/text-formatting.md` and `.ai/rules/stories-documentation.md`. Those rules are active in context — apply them here.

---

## Common patterns and pitfalls

### Static color stories

The `staticColorsDemo` decorator (`2nd-gen/packages/swc/.storybook/decorators/static-colors-demo.ts`) applies backgrounds using `> *:first-child` (dark, for `static-color="white"`) and `> *:last-child` (light, for `static-color="black"`). It expects **exactly two direct children** — one per color.

If a component supports both `static-color` values **and** multiple fill styles (e.g., fill + outline), render each color group inside its own wrapper `<div>` so the decorator sees two children, not four:

```typescript
// ✅ Correct — two direct children, each color group in its own div
export const StaticColors: Story = {
  render: (args) => html`
    <div
      style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;"
    >
      ${FILL_STYLES.map((fillStyle) =>
        template({ ...args, 'static-color': 'white', 'fill-style': fillStyle })
      )}
    </div>
    <div
      style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;"
    >
      ${FILL_STYLES.map((fillStyle) =>
        template({ ...args, 'static-color': 'black', 'fill-style': fillStyle })
      )}
    </div>
  `,
  parameters: { staticColorsDemo: true },
  tags: ['options', '!test'],
};

// ❌ Wrong — four flat siblings; middle two get no background
export const StaticColors: Story = {
  render: (args) => html`
    ${STATIC_COLORS.flatMap((color) =>
      FILL_STYLES.map((fillStyle) =>
        template({ ...args, 'static-color': color, 'fill-style': fillStyle })
      )
    )}
  `,
  parameters: { staticColorsDemo: true },
  tags: ['options', '!test'],
};
```

If the component only has one fill style (no outline variant), a single flat list of two elements is fine — the first will get the dark background and the last the light background automatically.
