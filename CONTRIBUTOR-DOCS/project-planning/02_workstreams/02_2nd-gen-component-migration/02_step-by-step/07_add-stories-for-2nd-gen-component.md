<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../../README.md) / [Project planning](../../../README.md) / [Workstreams](../../README.md) / [2nd-gen Component Migration](../README.md) / Step By Step / Add stories for 2nd-gen component

<!-- Document title (editable) -->

# Add stories for 2nd-gen component

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [When is the stories file created?](#when-is-the-stories-file-created)
- [Phase 4: stories scaffold](#phase-4-stories-scaffold)
- [Phase 7: completing the stories](#phase-7-completing-the-stories)
- [File structure](#file-structure)
- [Key patterns](#key-patterns)

</details>

<!-- Document content (editable) -->

## When is the stories file created?

The stories file has two distinct phases of work:

- **Phase 4 (Styling):** A minimal scaffold is created to enable visual verification of CSS in Storybook. It contains the correct structure — HELPERS, Playground, Overview, Anatomy, Options, States, and Behaviors — but no JSDoc prose, and the Accessibility story is left as a `// TODO` comment.
- **Phase 7 (Documentation):** The scaffold is completed with JSDoc on every story (except Playground and Overview), the Accessibility story body is filled in, and any deferred stories are added.

If Phase 4 has been completed, **do not recreate the file** — augment the existing scaffold.

## Phase 4: stories scaffold

Use the `migration-styling` skill's [`assets/stories-template.md`](../../../../../.ai/skills/migration-styling/assets/stories-template.md) to generate the file. The template documents the section order, required stories per type, and the Phase 4 scope boundary.

**Phase 4 scope:**

- Playground (`tags: ['autodocs', 'dev']`)
- Overview (`tags: ['overview']`)
- Anatomy — shows all meaningful slot combinations (`tags: ['anatomy']`)
- Options — one story per constant array in the types file (`tags: ['options']`), with `section-order`, `storyName` where needed, and `staticColorsDemo: true` + `'!test'` for static colors
- States — all interactive states (`tags: ['states']`)
- Behaviors — properties that produce CSS-visible differences (`tags: ['behaviors']`)
- Accessibility section — `// TODO` comment only

## Phase 7: completing the stories

With the Phase 4 scaffold in place:

1. **Add JSDoc to every story except Playground and Overview.** See the [stories documentation standards](../../../../../.ai/rules/stories-documentation.md) for structure and examples.
2. **Complete the Accessibility story body.** Document built-in accessibility features (keyboard, ARIA, focus) and best practices for consumers.
3. **Add any deferred stories** — anatomy combinations that require interaction, behavior stories not visible through CSS alone, etc.

Reference examples: `badge/stories/badge.stories.ts`, `divider/stories/divider.stories.ts`.

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
