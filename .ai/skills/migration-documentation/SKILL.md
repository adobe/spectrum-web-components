---
name: migration-documentation
description:
  Phase 7 of 1st-gen to 2nd-gen component migration. Use to author the
  per-component MDX docs page and finalize Storybook stories so the
  component is usable and understandable by others.
---

# Migration documentation ([Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 7](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is the per-component MDX docs page (`<component>.mdx`) authored to render every Storybook section with prose and `<Canvas>` references, plus JSDoc on the public API exposed by `Component.ts` (the source class).

See also:

- [`documentation`](../documentation/SKILL.md) — Adobe content writing standards
- [`.ai/rules/stories-format.md`](../../rules/stories-format.md) — stories file structure
- [`.ai/rules/stories-documentation.md`](../../rules/stories-documentation.md) — per-unit MDX authoring patterns

## Mindset

You are writing for the next contributor, not for yourself. Every MDX section and JSDoc line on a public API member should answer the question a new engineer would ask six months from now. Avoid restating the implementation. Explain the intent and the constraints. Follow the `documentation` skill for writing style and content expectations.

**Where prose lives**: long-form documentation for Storybook is authored in the **per-component MDX file** (`2nd-gen/packages/swc/components/[component]/[component].mdx`), not in JSDoc comments above story exports. JSDoc above story exports is not used in 2nd-gen. The only JSDoc retained in the stories file is the meta-level JSDoc above `const meta: Meta = { ... }`, which is rendered by the `<Description />` block at the top of the docs page.

Read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` when available before documenting the component. Use it to understand constraints, behavioral decisions, and deferred work. If it is missing, stale, or intentionally incomplete, derive the needed context from the implemented component and source material and call out the missing plan as a risk. See also [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

## When to use this skill

- Phase 6 (migration-testing) is complete
- The user asks to "document [component]" or "add stories for [component]"
- The user asks to author the per-component MDX file, add Storybook stories, or document migration notes
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

Before writing anything, read the `### Documentation` section of the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md`. Make a note of every unchecked item. These are the documentation gaps Phase 7 must close. Return to this checklist at the end and confirm which items are now covered by the per-component MDX (or by JSDoc on the public API in `Component.ts`) and which remain outstanding.

### Step 1: Ask for guidance resources

Before writing any "when to use" or "why to use" descriptions for sizes, variants, states, or behaviors — **stop and ask the user** for the authoritative source. Acceptable sources include:

- The [Spectrum 2 Design site](https://s2.spectrum.corp.adobe.com/)
- The component's Figma spec
- The 1st-gen component README (`1st-gen/packages/[component]/README.md`)
- An explicit statement in the migration plan

If no source is available at authoring time, limit the prose to technically verifiable facts only (see [What NOT to include](#what-not-to-include-in-mdx-or-jsdoc) below). Do not invent guidance. Implementors cannot easily distinguish AI-invented guidance from documented design decisions, which erodes trust in the documentation.

### Step 2: Check for a Phase 5 stories scaffold

If Phase 5 (migration-styling) was completed, `2nd-gen/packages/swc/components/[component]/stories/[component].stories.ts` likely already exists with Playground, Overview, Anatomy, Options, States, and Behaviors stories — all structurally correct, no story-level JSDoc, and the Accessibility story body left as a `// TODO` comment. Phase 7's job is to:

1. Create (or augment) `2nd-gen/packages/swc/components/[component]/[component].mdx` as the per-component docs page — see [`stories-documentation`](../../rules/stories-documentation.md) for the full template, including the canonical section order, required imports, `<DocsHeader />` / `<DocsFooter />` placement, and per-section authoring patterns.
2. Author the prose for each section (`## Anatomy`, `## Options`, `## States`, `## Behaviors`, `## Accessibility`) in the per-component MDX, with a `<Canvas of={Stories.StoryName} />` reference under each `### Story Title` heading (for `hideTitle=false` sections) or directly under the `## Section` heading (for `hideTitle=true` sections like Anatomy and Accessibility).
3. Complete the Accessibility story body in the stories file — it was left as a `// TODO` in Phase 5. Add the Features / Best practices prose into `## Accessibility` in the MDX.
4. Add any stories that were deferred or were not CSS-visible enough to include in Phase 5. For each new story, add a `<Canvas>` reference and accompanying prose to the MDX.
5. For each item in the migration plan's Additive table:
   - If the feature is implemented and has no story yet, add a story in the relevant section (Options, Behaviors, etc.) and reference it from the MDX with a `<Canvas of={Stories.NewStory} />`.
   - If the feature is not yet implemented, add an `## Upcoming features` section to the per-component MDX with bullet-point prose describing the roadmap intent. Do **not** create a story export to hang the prose on — MDX renders prose-only sections directly without a story. Keep it brief and consumer-focused (what it does for them); omit internal framing like "not part of the initial scope" or "deferred pending a decision". Do not include ticket numbers or TODO language.

If the stories file or the per-component MDX already exists, do **not** recreate them from scratch. Augment what is already there.

**Step 2b — Verify or update the VRT testing grid.** When the migration plan's **Visual regression** section calls for a VRT grid, confirm Phase 5 scaffolded:

- `stories/[component].template.ts` with correct `data-vrt-host`, `data-vrt-control`, and optional `data-vrt-state` / `data-vrt-layout-classes`
- `test/[component].vrt.ts` covering the plan's variant × state × size matrix
- `VRT Grid` story in `stories/[component].vrt.stories.ts` with `TESTING_GRID_STORY_PARAMETERS` and `applyTestingGridPseudoStates`

If Phase 7 adds or changes Options, States, or Behaviors stories (new variants, fill styles, static colors, icon-only layouts, pending, etc.), update the VRT case list and template so Chromatic still captures the full matrix. Reference [`.storybook/helpers/README.md`](../../../2nd-gen/packages/swc/.storybook/helpers/README.md) and `components/button/` when unsure. If the plan deferred VRT, skip this step.

Follow
**[Phase 7: Documentation](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-7-documentation)**
in the washing machine workflow doc — it covers what to do, what to check,
common problems, and the quality gate for this phase.

If the docs need to describe behavior that differs from the approved migration plan, follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md).

### Step 3: Write the per-component MDX prose and finalize JSDoc on `Component.ts`

Author the prose for each section in the per-component MDX following the patterns in [`stories-documentation`](../../rules/stories-documentation.md). Drop the `'autodocs'` tag from the Playground story (keep `'dev'`) so the MDX is the unit's Docs page rather than a duplicate.

Then add or update JSDoc on the public API surface in `2nd-gen/packages/swc/components/[component]/Component.ts` — `@property` decorators, public methods, dispatched events, slots. This is the developer-facing API doc that the `<ApiTable />` block renders from the Custom Elements Manifest. It is **not** the same as story-level JSDoc (which is not used).

Follow the rules in [What NOT to include](#what-not-to-include-in-mdx-or-jsdoc) strictly. Write prose and JSDoc that is technically accurate and sourced. Where no source is available for usage guidance, describe what the attribute does (its effect) rather than when to use it.

### Step 4: Cross-check against the documentation checklist

Return to the list from Step 0. For each unchecked documentation item in the migration plan:

- If it is now covered by an MDX section, a Canvas reference, or a JSDoc comment on the public API in `Component.ts`, note it as done.
- If it belongs in the consumer migration guide (breaking changes, migration paths from 1st-gen), note it as deferred to the `consumer-migration-guide` skill — do **not** add it to the per-component MDX or the stories file.
- If it is genuinely missing from both the docs and the consumer guide, flag it to the user.

**Verify VRT testing grid alignment (when in scope).** If the migration plan required a VRT grid, confirm `test/[component].vrt.ts` and `[component].template.ts` still reflect every variant, state, size, and behavior story finalized in Phase 7. Flag gaps (e.g. a new Options story with no matching `ArgGrid` row) before marking Phase 7 complete.

**Verify `@cssprop` completeness and accuracy.** Read the component's CSS file (`2nd-gen/packages/swc/components/[component]/[component].css`) and list every exposed `--swc-*` property. Then read the SWC class (`2nd-gen/packages/swc/components/[component]/[Component].ts`) and confirm:

- Every exposed property has a `@cssprop` tag on the primary class export.
- Each description is accurate: it names what the property controls and its default token, with no stale or invented values.
- No `--_swc-*` private properties are tagged.

Fix any missing or inaccurate `@cssprop` tags before marking Phase 7 complete. If Phase 5 was skipped or the tags were never added, add them now.

---

## What NOT to include in MDX or JSDoc

The following must never appear in the per-component MDX, in the meta-level JSDoc, or in JSDoc on the public API in `Component.ts`:

### Story-level JSDoc

Do not author JSDoc comments above any `export const Foo: Story = ...` declaration in `.stories.ts` files. Story prose lives in the per-component MDX. The only JSDoc retained in the stories file is the meta-level JSDoc above `const meta: Meta = { ... }` (rendered by `<Description />` at the top of the docs page).

### Migration notes

Do not include "Migration note:", "replaces legacy X", or "1st-gen vs 2nd-gen" content in the per-component MDX or in stories-file JSDoc. Migration guidance is for developers upgrading from 1st-gen and belongs in the dedicated consumer migration guide produced by the `consumer-migration-guide` skill. The Storybook docs page is consumed by all users of the component, not only by people migrating.

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
