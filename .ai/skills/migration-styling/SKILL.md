---
name: migration-styling
description: Phase 5 of 1st-gen to 2nd-gen component migration. Use to migrate CSS to the 2nd-gen structure, apply Spectrum 2 tokens, and ensure stylelint passes.
---

# Migration styling ([Phase 5](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 5](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to migrate CSS to the 2nd-gen structure, replace hard-coded values with tokens, and ensure the component's CSS passes stylelint with no errors.

## Mindset

You are translating, not redesigning. Your job is not to invent new visual decisions.

**Before writing any CSS**, read the migration plan at `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md`. It is the scope authority for this phase. For Phase 5, extract:

- **Visual scope** — what visual changes are approved vs. out of scope
- **Custom-property decisions** — which custom properties to keep, rename, or remove
- **Intentional divergences** — places where 2nd-gen deliberately differs from 1st-gen
- **Planned surface-area reductions or splits** — variants, sizes, or features that are being dropped or deferred

If the plan is missing, stale, or intentionally incomplete, derive the needed context from source material, call out the missing plan as a risk, and proceed only for the fields you can resolve confidently. See [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md) for the full drift rule and when to pause.

With that context established, read [`references/tldr-component-css-guidelines.md`](references/tldr-component-css-guidelines.md) — a TL;DR of the most critical rules from `CONTRIBUTOR-DOCS/02_style-guide/` with correct/incorrect code examples and links to the full docs for each rule. This is the CSS rules authority for this phase; follow it in preference to any conflicting guidance in the rendering analysis doc.

Then use the `rendering-and-styling-migration-analysis.md` file for the component-specific technical detail of what to migrate. When a token you need does not exist, use the `ask-questions` skill to flag it with the user.

## When to use this skill

- Phase 4 (migration-a11y) is complete
- The user asks to "migrate styles" or "migrate CSS" for a component
- The user asks to apply Spectrum 2 tokens or fix stylelint errors
- The user refers to "Phase 5" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 4 is not complete — accessibility behavior should be implemented before styling so a11y constraints can inform CSS decisions
- You are working on `render()` or template structure — check the workflow doc for rendering context

## How to invoke

- "Migrate styles for [component]"
- "Phase 5 for [component] migration"
- "Apply Spectrum 2 tokens for [component]"

---

## Workflow

**Step 0 — Read the migration plan first.** Before touching any CSS, open `CONTRIBUTOR-DOCS/03_project-planning/03_components/[component]/migration-plan.md` and extract the four Phase 5 fields listed in the Mindset section above. Note any open questions or intentional divergences so you can surface them proactively rather than discovering drift mid-work.

**Step 1 — Check for drift before committing to an approach.** If your planned CSS changes would exceed the migration plan's approved visual scope or contradict its custom-property decisions, call out the drift explicitly and follow [`migration-plan-contract`](../migration-prep/references/migration-plan-contract.md) before writing any code. Do not silently resolve open questions in CSS.

**Step 2 — Verify or create the stories file.** The Phase 5 quality gate requires visual verification in Storybook, which needs a stories file. Check whether `2nd-gen/packages/swc/components/[component]/stories/[component].stories.ts` exists.

- **If it exists**, confirm it renders the component in Storybook with no console errors before touching CSS.
- **If it does not exist**, create it now using [`assets/stories-template.md`](assets/stories-template.md) before starting CSS work. Follow the template's "Decisions to make" section and its checklist.

**Step 2b — Scaffold the VRT testing grid when the migration plan calls for it.** Read the **Visual regression** section of the migration plan. When it specifies a VRT testing grid (see `migration-prep` → [VRT testing grid scope](../migration-prep/SKILL.md#vrt-testing-grid-scope)), add the Chromatic matrix alongside the Phase 5 stories scaffold:

1. `stories/[component].template.ts` — pure Lit `Template()` for grid cells (not `getStorybookHelpers().template`, which breaks React hooks in large grids). Wrap each cell in `div.vrt-cell` with `data-vrt-*` attributes — see [`.storybook/helpers/README.md`](../../../2nd-gen/packages/swc/.storybook/helpers/README.md).
2. `test/[component].vrt.ts` — `Variants()`, `ArgGrid`, `Container`, `States`, and `testData` / `stateData` for the dimensions listed in the plan. Export the render function (e.g. `ButtonVRTRender`).
3. In `[component].stories.ts` — add a dev-only `VRTGrid` story: `render` from the VRT file, `storyName: TESTING_GRID_STORY_NAME`, spread `TESTING_GRID_STORY_PARAMETERS`, and `play: applyTestingGridPseudoStates` for forced hover/focus/active cells.

Use `components/button/` as the reference (`button.template.ts`, `test/button.vrt.ts`, `VRT Grid` story). Skip this step when the plan explicitly defers VRT or says docs stories are sufficient.

**Phase 5 stories scope** — the stories file at this phase should contain: Playground, Overview, Anatomy, Options (one story per constant array in the types file), States, and any Behaviors that exercise CSS-visible properties. Do **not** add story-level JSDoc and do **not** write the Accessibility story body — these are deferred to Phase 7, which authors the per-component MDX file (`<component>.mdx`) as the docs surface. Leave a `// TODO` comment referencing Phase 7. When a VRT grid is in scope, add the `VRT Grid` story as a separate dev/Chromatic entry (not a docs section).

**Step 3 — Align render template class names with CSS selectors.** Before writing CSS, read the component's `render()` method and note every class name emitted. The CSS you write must use those exact names. Mismatches cause styles to silently not apply — there is no error.

Common case: confirming that subcomponent class names follow the single-hyphen separator convention (e.g. `.swc-Button-label`, `.swc-Badge-label`) — not BEM double-underscore. If any class name in `render()` uses `__`, rename it to `-` in both the template and the CSS at the same time. Check both directions:

- CSS selector → does `render()` emit this class?
- `render()` class name → does the CSS have a matching selector?

If a rename is needed, make the template change first, confirm the component still renders correctly in Storybook, then write the CSS.

**Step 3.5 — Check for shared CSS.** If the component shares structural CSS with one or more other components (for example, a shared bar/track layout), check `2nd-gen/packages/swc/stylesheets/_lit-styles/` for an existing shared fragment before duplicating rules. Files in `_lit-styles/` are Lit CSS fragments composed into component `static styles` arrays; they reach inside shadow roots and are never emitted as standalone CSS. To use one, import it as a JS module in the component's TypeScript file — do **not** use a CSS `@import` statement:

```ts
import sharedStyles from '../../stylesheets/_lit-styles/[name].css';
import styles from './[component].css';

public static override get styles(): CSSResultArray {
  return [sharedStyles, styles];
}
```

If no fragment exists yet but the shared pattern is real, create a new file in `_lit-styles/` and wire it up in all consuming components. Do not put `_lit-styles/` files in `core/` — they depend on `--swc-*` design tokens, which live in the `swc/` layer. See [Non-component stylesheets](../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/07_stylesheets.md#adding-a-shared-lit-css-fragment) for full guidance.

**Step 4 — Execute the phase.** Follow **[Phase 5: Styling](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#phase-5-styling)** in the washing machine workflow doc — it covers what to do, what to check, common problems, and the quality gate for this phase.

Before finalizing the CSS, check for a Spectrum 2 design guideline that is not visible from token diffs: **text-based components must have no block padding.** If the component has no visible bounding box (no background color, no border on its outer container — status light, checkbox, radio, and field label are the canonical cases), remove any `min-block-size` and `padding-block` rules. The block height must derive from `font-size` and `line-height` alone. Keeping those rules is a migration artifact, not a valid override. See [anti-pattern 12](../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md#12-block-padding-on-text-based-components) for the full rationale and correct approach.

When converting `--spectrum-*` properties to `token()` calls (by stripping the `--spectrum-` prefix), verify each resulting token name against the known-valid set. If a `token()` call produces an error in the VS Code extension, run the `fix:tokens` script first before doing any manual correction:

```bash
# From 2nd-gen/packages/tools/swc-tokens/:
node scripts/fix-token-refs.js --dry-run   # preview changes
node scripts/fix-token-refs.js             # apply
```

The script reads `renamed` and `deleted` maps from the installed token data and handles all mechanical cases automatically:

- **Renamed token**: `token("old")` → `token("new")` (authoritative, no review needed)
- **Deleted, `"0"` replacement**: `token("zero-val")` → `0` (zero-pixel spacing; do not use `token("0")`)
- **Deleted, named replacement**: `token("old")` → `token("suggestion")` (curated; verify semantics)
- **Deleted, `null` replacement**: adds a `/* TODO */` inline comment for manual review

Only address `/* TODO */` comments manually — those are tokens with no known replacement where you must decide whether to drop the property, restructure, or hardcode a specific value.

**Step 5 — Document exposed custom properties.** After writing the CSS, add a `@cssprop` JSDoc tag to the SWC component class (`2nd-gen/packages/swc/components/[component]/[Component].ts`) for every exposed `--swc-*` property. Place all `@cssprop` tags on the primary SWC class export (not the core base class). Each tag should name the property and give a one-line description of what it controls, including its default token where relevant.

```ts
/**
 * @cssprop --swc-badge-height - Block size of the badge. Defaults to the medium component height token.
 * @cssprop --swc-badge-background-color - Background fill. Defaults to the neutral subdued background token.
 */
export class Badge extends BadgeBase { … }
```

Storybook picks these up automatically and surfaces them in the API docs panel. Do not add `@cssprop` tags for private `--_swc-*` properties — those are internal only.
