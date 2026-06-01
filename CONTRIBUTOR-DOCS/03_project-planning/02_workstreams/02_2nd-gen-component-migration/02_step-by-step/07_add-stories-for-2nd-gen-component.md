<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../../README.md) / [Project planning](../../../README.md) / [Workstreams](../../README.md) / [2nd-gen Component Migration](../README.md) / Step By Step / Add stories for 2nd-gen component

<!-- Document title (editable) -->

# Add stories for 2nd-gen component

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [When is the stories file created?](#when-is-the-stories-file-created)
- [Phase 4: stories scaffold](#phase-4-stories-scaffold)
- [Phase 7: completing the stories and authoring the docs page](#phase-7-completing-the-stories-and-authoring-the-docs-page)
- [File structure](#file-structure)
- [Key patterns](#key-patterns)

</details>

<!-- Document content (editable) -->

## When is the stories file created?

The stories file has two distinct phases of work:

- **Phase 4 (Styling):** A minimal scaffold is created to enable visual verification of CSS in Storybook. It contains the correct structure — HELPERS, Playground, Overview, Anatomy, Options, States, and Behaviors — with no story-level JSDoc, and the Accessibility story is left as a `// TODO` comment.
- **Phase 7 (Documentation):** Authors the per-component MDX docs page (`<component>.mdx`) at the component root and finalizes the stories file (complete the Accessibility story, add any deferred stories). Story prose lives in MDX, not in JSDoc above story exports. The meta-level JSDoc above `const meta` is the only retained JSDoc — it powers the docs-page `<Description />`. See `.ai/rules/stories-documentation.md` for the per-component MDX template.

If Phase 4 has been completed, **do not recreate the file** — augment the existing scaffold.

## Phase 4: stories scaffold

Use the `migration-styling` skill's [`assets/stories-template.md`](../../../../../.ai/skills/migration-styling/assets/stories-template.md) to generate the file. The template documents the section order, required stories per type, and the Phase 4 scope boundary.

**Phase 4 scope:**

- Playground (`tags: ['dev']`; omit `'autodocs'` when the component has a per-component MDX file)
- Overview (`tags: ['overview']`)
- Anatomy — shows all meaningful slot combinations (`tags: ['anatomy']`)
- Options — one story per constant array in the types file (`tags: ['options']`), with `storyName` where needed, and `staticColorsDemo: true` + `'!test'` for static colors. Section ordering is hand-authored in the per-component MDX, not via story parameters.
- States — all interactive states (`tags: ['states']`)
- Behaviors — properties that produce CSS-visible differences (`tags: ['behaviors']`)
- Accessibility section — `// TODO` comment only

## Phase 7: completing the stories and authoring the docs page

With the Phase 4 scaffold in place:

1. **Author the per-component MDX docs page** (`<component>.mdx` at the component root). This is the docs surface: it composes `<DocsHeader />`, prose for each section (`## Anatomy`, `## Options`, `## States`, `## Behaviors`, `## Accessibility`), `<Canvas of={Stories.MyStory} />` references for each tagged story, and `<DocsFooter />`. See the [stories documentation standards](../../../../../.ai/rules/stories-documentation.md) for the full template and per-section authoring patterns.
2. **Complete the Accessibility story body** in the stories file. Document built-in accessibility features (keyboard, ARIA, focus) and best practices in the `## Accessibility` section of the per-component MDX; the story itself just provides the canvas.
3. **Drop the `'autodocs'` tag** from the Playground story (keep `'dev'`) so the per-component MDX is the unit's Docs page rather than a duplicate auto-generated one.
4. **Add or update the meta-level JSDoc** above `const meta: Meta = { ... }` to describe the component's purpose and link to related components. This is the only JSDoc retained in the stories file; it renders via `<Description />` at the top of the docs page. Do **not** add JSDoc above any individual story export.
5. **Add any deferred stories** — anatomy combinations that require interaction, behavior stories not visible through CSS alone, etc. — and reference each from the MDX with `<Canvas of={Stories.NewStory} />`.

Reference examples: `badge/stories/badge.stories.ts` + `badge/badge.mdx`, `divider/stories/divider.stories.ts` + `divider/divider.mdx`.

## File structure

```text
stories/
  [component].stories.ts   ← single file; no .usage.mdx needed
```

Section order within the file:

```typescript
// ────────────────
//    METADATA
// ────────────────

// ────────────────────
//    HELPERS
// ────────────────────

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

// ──────────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────────

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────
```

## Key patterns

- Use `getStorybookHelpers('swc-[component]')` for args, argTypes, and template.
- Override `argTypes` for any attribute that needs explicit options or a control type; source options from the constant array in the types file, not a hand-written list.
- Define label maps in HELPERS using `as const satisfies Record<Type, string>` for type safety.
- Prefer `template({ ...args, propName: value })` over raw `html` tagged template literals — use raw html only when slot content (e.g. inline SVG with `slot="icon"`) cannot flow through `template()`.
- Add `storyName` for any PascalCase export that would not render as sentence case (e.g. `StaticColors.storyName = 'Static colors'`).
- `StaticColors` stories use `parameters: { staticColorsDemo: true }` and `tags: ['options', '!test']`.
