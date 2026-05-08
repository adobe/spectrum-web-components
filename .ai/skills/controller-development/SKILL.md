---
name: controller-development
description: >-
  Scaffolds or revises 2nd-gen Lit controllers under `2nd-gen/packages/core/controllers/` with
  source, `demo-hosts`, Storybook stories, API tables, and tests aligned to the focus group
  navigation controller pattern. Use when adding a new controller, overhauling controller docs,
  or matching an existing controller to project conventions.
---

# Controller development (2nd-gen core)

Use this skill whenever you **add a new Lit reactive controller** under `2nd-gen/packages/core/controllers/` or **bring an existing controller** in line with current project conventions.

## Canonical reference

Treat **`focusgroup-navigation-controller`** as the structural template (not necessarily every API detail):

| Area                     | Reference path                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Controller source        | `2nd-gen/packages/core/controllers/focusgroup-navigation-controller/src/focusgroup-navigation-controller.ts`             |
| Package barrel           | `2nd-gen/packages/core/controllers/focusgroup-navigation-controller/index.ts`                                            |
| Storybook + API metadata | `2nd-gen/packages/core/controllers/focusgroup-navigation-controller/stories/focusgroup-navigation-controller.stories.ts` |
| Live demos               | `2nd-gen/packages/core/controllers/focusgroup-navigation-controller/stories/demo-hosts.ts`                               |
| Tests                    | `2nd-gen/packages/core/controllers/focusgroup-navigation-controller/test/focusgroup-navigation-controller.test.ts`       |
| Core re-export           | `2nd-gen/packages/core/controllers/index.ts`                                                                             |

A second aligned example (post-refactor, no duplicate snippet file): **`radio-controller/`** in the same tree.

## Directory layout (new controller)

Use **kebab-case** folder names matching the public import path segment (e.g. `my-feature-controller/`).

```text
2nd-gen/packages/core/controllers/<controller-name>/
├── index.ts                          # Re-export public API from src/
├── src/
│   └── <controller-name>.ts          # Implementation + JSDoc
├── stories/
│   ├── <controller-name>.stories.ts  # Storybook CSF + controllerApi
│   └── demo-hosts.ts                 # Lit @customElement demo hosts
└── test/
    └── <controller-name>.test.ts     # Vitest / Storybook test stories
```

Wire **`2nd-gen/packages/core/controllers/index.ts`** with explicit named exports (same style as existing controllers).

## Source file (`src/*.ts`)

- Implement as a **Lit `ReactiveController`** (or equivalent) with clear public types exported from **`index.ts`**.
- Document **host contract**, **options**, **events**, and **limitations** in JSDoc on the class and public members.
- Export **event name constants** and **detail types** next to the class when the controller dispatches custom events.
- Keep behavior and eligibility rules **explicit** (what is ignored, what happens on disconnect, etc.).

## `demo-hosts.ts`

- One or more **`@customElement('demo-…')`** `LitElement` hosts that exercise real DOM patterns (toolbar, menu, grid, etc.).
- Declare **`declare global { interface HTMLElementTagNameMap { … } }`** for each demo tag.
- Demos should be **self-contained** and readable; story JSDoc can show short TypeScript excerpts—**avoid** a second parallel “snippets only” source file unless the team explicitly wants that maintenance cost.

## Stories (`*.stories.ts`)

Match the **heading / section structure** used by `focusgroup-navigation-controller.stories.ts` and `DocumentTemplate.mdx`:

1. **API constant** at the top — `const <NAME>_CONTROLLER_API = { … } as const` with:
   - `title` — short label for the API block
   - `options` — constructor options (name, type, defaultValue, description)
   - `methods` — name, signature, returns, description
   - `events` — name, detail, description (if any)
   - `exports` — named exports consumers use (constants, types, helpers)

2. **`meta`**:
   - `title`: `'Controllers/<Human readable name>'` (Storybook sidebar; matches `GettingStarted` import path derivation).
   - `tags`: `['migrated', 'controller']` — do **not** add `docs-getting-started-inline` unless you have a documented reason to suppress the shared Getting started block.
   - `component`: primary demo custom element tag (string), e.g. `'demo-focusgroup-playground'`.
   - `parameters.docs.subtitle` — one-line summary.
   - `parameters.docs.canvas.sourceState`: prefer **`'none'`** for controller READMEs (demos speak for themselves); align with the reference controller unless product asks otherwise.
   - `parameters.controllerApi`: assign the API constant above — **`ApiTable.tsx`** renders controller API tables when this is set (see `2nd-gen/packages/swc/.storybook/blocks/ApiTable.tsx`).
   - **`render` on `meta`**: default canvas for **Playground** and **Overview** (same pattern as focus group).

3. **Story exports** (order and tags matter for docs):

   | Export                   | Tags                                            | Notes                                                                                                                     |
   | ------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
   | `Playground`             | `['autodocs', 'dev']`                           | Often empty body — inherits `meta.render`. Optional `args` / `argTypes` when the controller exposes tunable demo options. |
   | `Overview`               | `['overview']`                                  | Inherits `meta.render`; hero canvas comes from `OverviewStory` in the docs template.                                      |
   | `Usage`                  | `['usage', 'description-only']`                 | Long-form **how to adopt** prose + fenced TypeScript in JSDoc only (no canvas).                                           |
   | Each interactive example | `['behaviors']` + `parameters['section-order']` | `render` returns the right `<demo-…>`; JSDoc holds short **pattern-specific** code samples.                               |
   | `API`                    | `['api', 'description-only']`                   | Supplementary tables or narrative; the machine-readable contract remains in `controllerApi`.                              |
   | `Accessibility`          | `['a11y', 'description-only']`                  | AT / keyboard / ARIA notes.                                                                                               |
   | `Appendix`               | `['description-only', 'appendix']`              | Links, background, non-normative notes.                                                                                   |

Docs sections **`Usage`**, **`Behaviors`**, **`Accessibility`**, **`Appendix`** come from **`ConditionalSection` + `SpectrumStories`** in `2nd-gen/packages/swc/.storybook/DocumentTemplate.mdx`. **Do not** rely on per-story `dev` tags to force the bottom `<Stories />` list unless you have a one-off reason; the section tags are the supported layout.

## Tests (`test/*.test.ts`)

Follow **`focusgroup-navigation-controller.test.ts`**:

- **`import <meta default> from '../stories/<name>.stories.js'`** and spread into `export default { … }` with `title: '…/Tests'`, **`docs: { disable: true, page: null }`**, and any test-only parameters.
- **`import '../stories/demo-hosts.js'`** so custom elements are defined.
- Import **named behavior stories** when using **`@storybook/test`** `play` functions against real story ids.
- Prefer **fixture elements** in the same test file (or colocated) for unit-level assertions; use **demo hosts** for integration-style behavior aligned with Storybook.

## Revising an existing controller

1. Diff its **stories file** against `focusgroup-navigation-controller.stories.ts` for **meta shape**, **story tags**, and **section comments**.
2. Ensure **`controllerApi`** matches the real `src` export surface; update rows when options/methods/events change.
3. Normalize **demo-host** naming and **story `render`** targets.
4. Run **`yarn build`** from `2nd-gen/packages/core` and the relevant **Storybook** / **test** commands your change touches.

## Anti-patterns (avoid)

- Custom per-story **`parameters.docs.description`** blobs that duplicate **Usage** / **Behaviors** unless migrating incrementally—prefer **JSDoc on stories** like the reference.
- A separate **`implementation-snippets.ts`** that mirrors **`demo-hosts.ts`** (two sources of truth).
- Meta tags **`docs-getting-started-inline`** or **`docs-skip-overview-canvas`** unless there is a team-approved exception (they change global docs behavior).
- Scatter **`tags: ['dev']`** across every story to fix docs layout—fix **structure** (usage / behaviors / api) instead.

## Cross-links

- Storybook template: `2nd-gen/packages/swc/.storybook/DocumentTemplate.mdx`
- Getting started for controllers: `2nd-gen/packages/swc/.storybook/blocks/GettingStarted.tsx` (branch on `tags.includes('controller')`)
- API rendering: `2nd-gen/packages/swc/.storybook/blocks/ApiTable.tsx` (`controllerApi` branch)

## Checklist (new controller)

- [ ] `src/<name>.ts` + types + event constants as needed
- [ ] `index.ts` barrel exports
- [ ] `controllers/index.ts` re-exports
- [ ] `stories/demo-hosts.ts` with `HTMLElementTagNameMap`
- [ ] `stories/<name>.stories.ts` with `controllerApi`, meta `render`/`component`, Playground, Overview, Usage, behaviors, API, Accessibility, Appendix
- [ ] `test/<name>.test.ts` spreading story meta, docs disabled
- [ ] Build passes; Storybook README sections render as expected
