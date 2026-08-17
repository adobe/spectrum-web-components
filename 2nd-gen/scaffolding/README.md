# 2nd-gen scaffolding

A [plop](https://plopjs.com/) generator that produces the deterministic file
skeleton for a 2nd-gen component: the `core` base layer, the `swc` concrete
layer, and the stories, docs, and test files that go with them.

The generator exists to take the mechanical, every-time-identical part of
Phase 2 (`migration-setup`) off the critical path. It writes the boilerplate so
a human or an agent only has to apply the decisions that actually differ between
components: the base-vs-concrete property split, the real Spectrum 2 tokens, the
variant and state API, and the prose in the docs page.

## Usage

### Interactive (humans)

```bash
yarn plop component
```

You will be prompted for a component name. Enter it in any form: `action-button`,
`actionButton`, `Action Button`, or even `sp-action-button` (the `sp-`/`swc-`
prefix is stripped). The name is normalized by the built-in case helpers, so the
output is identical regardless of how you type it.

### Headless (agents, scripts, CI)

Pass the name as a bypass argument and `--force` to skip the interactive
confirmation:

```bash
yarn plop component "action-button" --force
```

## What it generates

For a component named `action-button`:

```
2nd-gen/packages/core/components/action-button/
  ActionButton.types.ts     VALID_SIZES + Size type
  ActionButton.base.ts       abstract base class (SizedMixin + SpectrumElement)
  index.ts                   re-exports base + types

2nd-gen/packages/swc/components/action-button/
  ActionButton.ts            concrete class, render(), styles getter
  index.ts                   re-exports the concrete class
  swc-action-button.ts       defineElement registration + tag-name map
  action-button.css          :host + .swc-ActionButton block, token() scaffolding
  action-button.mdx          per-unit docs page (DocsHeader/Canvas/DocsFooter)
  stories/action-button.stories.ts   Playground/Overview/Anatomy/Sizes/States/Accessibility
  test/action-button.test.ts          Vitest play function reusing the Overview story
  test/action-button.a11y.spec.ts      Playwright ARIA-snapshot accessibility test
```

It also wires the core package's `exports` map: the `swc` package uses wildcard
exports and needs no edit, but `@spectrum-web-components/core` uses explicit
per-component entries, so the generator adds `./components/action-button` and
`./components/action-button/index.js` and re-sorts the `exports` keys
alphabetically (a minimal, deterministic diff). Finally it runs Prettier on the
two new directories so the output lands pre-formatted.

## What it intentionally does NOT do

The skeleton is a starting point, not a finished component. After generating,
follow `migration-setup` and the later migration phases to:

- Move properties, methods, and types from 1st-gen into the base and concrete
  classes (Phase 3, `migration-api`).
- Implement semantics, ARIA, and keyboard support (Phase 4, `migration-a11y`).
- Replace the placeholder CSS with migrated Spectrum 2 tokens (Phase 5,
  `migration-styling`).
- Flesh out the tests and stories (Phase 6, `migration-testing`).
- Write the docs prose and any `migration-guide.mdx` (Phase 7,
  `migration-documentation`; the consumer guide is owned by the
  `consumer-migration-guide` skill, so it is not scaffolded here).

Every generated file contains `TODO`/placeholder markers showing where this work
goes.

## Conventions the templates encode

These mirror the `badge` reference component and the project rules in `.ai/`:

- **Two-layer architecture.** Shared, non-visual API lives on the core base
  class; visual and version-specific API lives on the concrete `swc` class.
- **Sizing via host attribute.** `SizedMixin` reflects `size` to the host, so
  size is styled with `:host([size="..."])` selectors, never a modifier class.
- **Public styling API.** Custom properties are exposed as `--swc-<name>-*` with
  a `token()` fallback.
- **BEM-ish class block.** The render root carries `swc-<PascalCase>`.
- **Stories + per-unit MDX.** The Playground is tagged `['dev']` (not
  `['autodocs', 'dev']`) because the generated `.mdx` is the docs page; each
  section-tagged story is referenced from the MDX via `<Canvas of={...} />`.

## Editing the templates

Templates live in `templates/component/` as Handlebars (`.hbs`) files. Name
derivations use plop's built-in case helpers plus two custom helpers defined in
`plopfile.js`:

| Helper                  | `action-button` renders as |
| ----------------------- | -------------------------- |
| `{{dashCase name}}`     | `action-button`            |
| `{{pascalCase name}}`   | `ActionButton`             |
| `{{constantCase name}}` | `ACTION_BUTTON`            |
| `{{titleName name}}`    | `Action Button` (custom)   |
| `{{lb}}` / `{{rb}}`     | `{` / `}` (custom)         |

`titleName` produces the space-separated proper-noun title used for Storybook
titles; plop's built-in `titleCase` keeps the dash (`Action-Button`) and must not
be used for titles. `lb`/`rb` emit literal braces in `.mdx` templates, where a
bare `{` next to a `{{helper}}` would otherwise be parsed as Handlebars.

When you change the file layout, naming, or wiring, update both the templates and
the `add` actions in `plopfile.js`, then regenerate a throwaway component and run
`yarn lint` / `yarn lint:css` on it to confirm the output still passes.
