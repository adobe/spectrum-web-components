# 2nd-gen scaffolding

A [plop](https://plopjs.com/) scaffolder that produces the deterministic file
skeletons for 2nd-gen components: the component itself, and the **test** and
**VRT** files that go with it.

The generators exist to take the mechanical, every-time-identical part of
authoring off the critical path. They write the boilerplate so a human or an
agent only has to apply the decisions that actually differ between components:
the base-vs-concrete property split, the real Spectrum 2 tokens, the
variant/state API, the assertions, and the docs prose.

## Generators

| Generator   | Scaffolds                                               | Target                            |
| ----------- | ------------------------------------------------------- | --------------------------------- |
| `component` | Core base + SWC concrete + stories, docs, tests         | new component (`core` + `swc`)    |
| `test`      | Unit (`*.test.ts`) + a11y (`*.a11y.spec.ts`) test files | **existing** component (retrofit) |
| `vrt`       | A Chromatic VRT story (`test/vrt/<name>.vrt.ts`)        | **existing** component (retrofit) |

`component` always emits a baseline `test` + `a11y` file. Use the standalone
`test` and `vrt` generators to add coverage to a component that already exists
(for example, one migrated before these generators landed) — `vrt` in particular
fills a gap, since the `component` skeleton ships no `.vrt.ts`.

## Usage

### Interactive (humans)

```bash
yarn plop component
yarn plop test
yarn plop vrt
```

You are prompted for a name (enter it in any form: `action-button`,
`actionButton`, `Action Button`, or `sp-action-button` — the `sp-`/`swc-`
prefix is stripped and the case helpers normalize the rest).

### Headless (agents, scripts, CI)

Pass the name as a positional bypass argument, plus `--force`:

```bash
yarn plop component "action-button" --force
yarn plop test "action-button" --force
yarn plop vrt "action-button" --force
```

Each generator emits a single fixed scaffold (a permutation-grid + forced-colors
story for `vrt`, and a play-function + a11y-snapshot pair for `test`). The output
is lint-clean and formatted; `TODO`s mark where the author fills in the
component-specific detail.

## Retrofit contract (`test`, `vrt`)

`test` and `vrt` add files to a component that **already exists**. They:

- **Guard first.** If `2nd-gen/packages/swc/components/<name>/` is missing, the
  generator aborts with a clear message before writing anything (a typo cannot
  silently scaffold tests for a non-existent component).
- **Never clobber by default.** The `add` actions use `skipIfExists`, so an
  existing test/VRT file is left untouched. Pass `--force` to overwrite, or
  delete the file first to regenerate it.
- **Stay scoped.** They format only the `test/` (or `test/vrt/`) subtree they
  wrote, leaving the surrounding component files untouched.

## What gets wired automatically

- **Core `exports` + `typesVersions`.** The SWC package (`@adobe/spectrum-wc`)
  uses wildcard `exports`, so a new component needs no package.json edit there.
  The core package (`@spectrum-web-components/core`) uses explicit per-component
  entries, so the `component` generator adds both the `exports` and the matching
  `typesVersions` entry for the new component and re-sorts the keys (a minimal,
  deterministic diff). The `test`/`vrt` generators touch no package.json.
- **Formatting.** Each generator runs Prettier on the directories it wrote.

## Custom-element registration

Components are custom elements; the split matters:

- `index.ts` re-exports the class only (no registration).
- `swc-<tag>.ts` is the side-effectful entry: it calls
  `defineElement('swc-<tag>', Class)` (from `@adobe/spectrum-wc-core/element`)
  and augments `HTMLElementTagNameMap`.

## What the generators intentionally do NOT do

The skeletons are starting points, not finished components. After generating,
follow `migration-setup` and the later migration phases (or the `vrt-authoring`
skill for VRT) to move properties/types into the classes, implement semantics and
ARIA, migrate CSS to Spectrum 2 tokens, and flesh out the tests, VRT grids, and
docs prose. Every generated file contains `TODO`/placeholder markers.

## Conventions the templates encode

These mirror the `badge` and `button` reference components and the project rules
in `.ai/`:

- **Two-layer architecture.** Shared, non-visual API lives on the core base
  class; visual and version-specific API lives on the concrete `swc` class.
- **Sizing via host attribute.** `SizedMixin` reflects `size` to the host, styled
  with `:host([size="..."])` selectors, never a modifier class.
- **Public styling API.** Custom properties exposed as `--swc-<name>-*` with a
  `token()` fallback.
- **BEM-ish class block.** The render root carries `swc-<PascalCase>`.
- **Stories + per-unit MDX.** The Playground is tagged `['dev']`; each
  section-tagged story is referenced from the MDX via `<Canvas of={...} />`.
- **Sentence-case titles.** Storybook titles are sentence case (`Action button`),
  matching the project's title rule.

## Editing the templates

Templates live under `templates/` as Handlebars (`.hbs`) files, grouped by
generator:

```
templates/
  component/{core,swc}/*.hbs   the component skeleton
  test/*.hbs                   the standalone test + a11y files
  vrt/vrt.ts.hbs               the VRT story
```

Name derivations use plop's built-in case helpers plus custom helpers defined in
`plopfile.js`:

| Helper                  | `action-button` renders as |
| ----------------------- | -------------------------- |
| `{{dashCase name}}`     | `action-button`            |
| `{{pascalCase name}}`   | `ActionButton`             |
| `{{constantCase name}}` | `ACTION_BUTTON`            |
| `{{titleName name}}`    | `Action button` (custom)   |
| `{{lb}}` / `{{rb}}`     | `{` / `}` (custom)         |

`titleName` produces the space-separated sentence-case title used for Storybook
titles; plop's built-in `titleCase` keeps the dash (`Action-Button`) and must not
be used for titles. `lb`/`rb` emit literal braces in `.mdx` templates, where a
`{` next to a `{{helper}}` would otherwise be parsed as Handlebars.

When you change the file layout, naming, or wiring, update both the templates and
the actions in `plopfile.js`, then regenerate a throwaway component and run
`yarn lint`, `yarn lint:css`, and `yarn lint:docs-pages` on it to confirm the
output still passes. Delete the throwaway component and revert
`2nd-gen/packages/core/package.json` afterward.
