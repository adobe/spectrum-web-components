# Component tooling: scripts and templates that cut skill tokens

This document recommends scripts, plop generators, and templates that live **with the product
code** (not in `.ai/`) and that automate the deterministic steps currently performed by hand
inside the migration and authoring skills. The goal is concrete: **reduce the tokens a skill
spends, and make its output predictable**, by moving file creation and mechanical checks out
of agent prose and into version-controlled tooling that both humans and the agent run the same
way.

## Placement rule (the dividing line)

Per the brief, tooling is split by what it keeps correct:

| Tool keeps **`.ai/` files** correct                                         | Tool keeps **product files** correct                                          |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Lives in `.ai/scripts/`                                                     | Lives with the code it governs                                                |
| Examples: config schema, symlink, AGENTS.md path validators (already exist) | plop generators, codemods, eslint/stylelint rules, phase-gate scripts         |
|                                                                             | Homes: `2nd-gen/packages/tools/*`, `2nd-gen/projects/templates/`, `linters/*` |

A clarifying consequence: a validator that checks **stories files, component CSS, or README
structure is checking product code**, so by this rule it should live in `linters/` as an
eslint/stylelint rule, not in `.ai/scripts/`. `.ai/scripts/` should shrink to "things that keep
the `.ai/` contract itself honest." This also matches the recorded tooling direction (a single
evergreen `@adobe/eslint-plugin-spectrum-wc` whose rules aggregate per-component metadata).

## Why this saves tokens and improves predictability

A migration today asks the agent to _author_ deterministic artifacts from prose: the Phase 2
skill describes a ~12-file two-layer skeleton, and the agent recreates all 12 files, derives
every name (kebab tag, PascalCase class, `swc-` prefix), and hand-edits the core
`package.json` export. That is hundreds to thousands of output tokens per component, repeated
for 100+ components, and every repetition is a fresh chance to drift from the reference.

A plop template encodes that skeleton once. The agent runs one command; the files are
byte-identical to the reference every time. The skill prose then only needs the **judgment**
part (the base-vs-concrete split, the breaking-change decisions) instead of the **mechanics**.
Templates are reviewed once in a PR; prose is re-interpreted on every run. That is the
predictability win.

**Rule of thumb for every skill:** if a step's output is fully determined by the inputs (names,
known file layout, fixed boilerplate), it should be a generator or a lint rule, and the skill
should _call_ it, not _describe_ it.

## What already exists to build on

- **1st-gen plop generator** at `1st-gen/projects/templates/plopfile.js` with `.hbs` templates
  in `plop-templates/`. These encode deprecated 1st-gen patterns (buggy custom `className` /
  `displayName` helpers, old file layout) and are **not** a model for 2nd-gen work.
- **`linters/` workspace** already ships `eslint-plugin`, `stylelint-header-plugin`, and
  `stylelint-property-order.js`. New evergreen correctness rules extend these.
- **`2nd-gen/packages/tools/*`** workspace already holds build tooling (`swc-tokens`,
  `postcss-token`, `vite-global-elements-css`). A generators/codemods package fits here.
- **The 2nd-gen `component` generator now exists** at `2nd-gen/scaffolding/` (Recommendation 1,
  shipped). It uses `plop@4.0.5`, aligns with the `badge` reference rather than the 1st-gen plop,
  and is the foundation the remaining recommendations build on.

## The canonical 2nd-gen component skeleton (what a generator must emit)

Verified against the `badge` reference. A component spans two packages:

**Core layer** (`2nd-gen/packages/core/components/<name>/`):

| File               | Content                                          |
| ------------------ | ------------------------------------------------ |
| `<Class>.base.ts`  | base class: logic, properties, no visual surface |
| `<Class>.types.ts` | enums and type unions (size, variant, etc.)      |
| `index.ts`         | re-exports                                       |

**SWC layer** (`2nd-gen/packages/swc/components/<name>/`):

| File                        | Content                                                                          |
| --------------------------- | -------------------------------------------------------------------------------- |
| `<Class>.ts`                | concrete class extending the base, public-API JSDoc                              |
| `index.ts`                  | class re-export only (`export * from './<Class>.js'`)                            |
| `swc-<tag>.ts`              | side-effect entry: `defineElement('swc-<tag>', Class)` + `HTMLElementTagNameMap` |
| `<name>.css`                | styles                                                                           |
| `<name>.mdx`                | docs page (DocsHeader/DocsFooter, Canvas refs)                                   |
| `migration-guide.mdx`       | consumer migration guide                                                         |
| `stories/<name>.stories.ts` | stories with separators, meta, tagged stories                                    |
| `test/<name>.test.ts`       | unit tests                                                                       |
| `test/<name>.a11y.spec.ts`  | Playwright a11y spec                                                             |

**The one non-wildcard wiring step:** the SWC `package.json` uses wildcard `exports`
(`./components/*`, `./components/*.js`), so a new SWC component needs **no** `package.json` edit.
The **core** `package.json` uses **explicit per-component entries** (37 today), so a new core
component **must** add one. That is exactly the deterministic, easy-to-forget edit a plop
`modify` action should perform automatically.

Everything above is derivable from a single `name` input. That is the definition of a clean
generator target.

## Recommendation 1 (highest leverage): a 2nd-gen plop generator — **implemented**

**Status: shipped** at `2nd-gen/scaffolding/`. `plop@4.0.5` is a root devDependency and the root
`package.json` exposes:

```jsonc
{
  "scripts": {
    "plop": "plop --plopfile 2nd-gen/scaffolding/plopfile.js --dest .",
  },
}
```

It is **not** modeled on the 1st-gen plop (those are deprecated patterns). It aligns only with the
2nd-gen architecture, the `badge` reference component, and the `stories-format` /
`stories-documentation` / `code-conformance` rules. Name derivation uses plop's built-in case
helpers (`dashCase`, `pascalCase`, `constantCase`) plus two custom helpers: `titleName`
(space-separated proper-noun title, because the built-in `titleCase` keeps the dash and yields
`Action-Button`) and `lb`/`rb` (literal `{`/`}` for `.mdx` JSX expressions next to handlebars).

### The `component` generator (one prompt: name)

It emits the full 11-file two-layer skeleton, matching the `badge` layout exactly:

| Layer                     | Files                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `core/components/<name>/` | `<Pascal>.types.ts`, `<Pascal>.base.ts`, `index.ts`                                                                                                    |
| `swc/components/<name>/`  | `<Pascal>.ts`, `index.ts`, `swc-<name>.ts`, `<name>.css`, `<name>.mdx`, `stories/<name>.stories.ts`, `test/<name>.test.ts`, `test/<name>.a11y.spec.ts` |

The earlier idea of separate `stories` / `test` sub-generators was folded into `component`: the
skeleton is always generated as a unit, since a half-scaffolded component is never the goal. The
`migration-guide` generator was scoped out — that artifact belongs to the `consumer-migration-guide`
skill, not Phase 2 setup.

### Custom plop actions

- `add` from `.hbs` for each of the 11 files (the bulk).
- `wire-core-export`: parses `2nd-gen/packages/core/package.json`, adds the `./components/<name>`
  and `./components/<name>/index.js` entries, and re-sorts the `exports` keys alphabetically. This
  is JSON manipulation, not a regex `modify` — safe because core has no wildcard exports, so key
  order is resolution-irrelevant and sorting keeps the diff minimal (validated: +8 lines, correctly
  placed). The `swc` package uses wildcard exports and needs no edit. This is the deterministic,
  easy-to-forget wiring step humans skip.
- `format-component`: runs `yarn prettier --write` scoped to the two new directories (resilient; a
  failure never aborts the scaffold).

### It runs headless for the agent

```bash
yarn plop component "action-button" --force
```

This makes the generator usable by **both** a human (interactive prompt) and the agent (one
deterministic command). `migration-setup` Phase 2 now reads "run `yarn plop component <name>`, then
apply the plan's base-vs-concrete split" instead of authoring 11 files by hand.

### Validation performed

End-to-end headless run produced all 11 files at the correct paths, wired the core exports
(minimal sorted diff), and Prettier-formatted the output; ESLint, Stylelint, and Prettier all
passed clean on the generated files.

### Token impact

Phase 2 stops emitting file bodies entirely; the skill emits one command plus the judgment
narrative. Across the migration backlog this is the largest single reduction available, and it
makes every scaffold identical to the reference.

## Recommendation 2: a Phase 1 prep extractor (prefill, don't transcribe)

`migration-prep` asks the agent to read the 1st-gen component's API and write it into the plan.
Every 1st-gen package ships a `custom-elements.json` (CEM). A small script can read it and emit a
**prefilled `migration-plan.md` skeleton** (from the existing
`.ai/skills/migration-prep/assets/migration-prep-template.md`) with the properties, slots,
events, and methods tables already populated.

- **Home:** `2nd-gen/packages/tools/generators/` (a Node script, or a plop generator that reads
  CEM in a prompt `filter`).
- **Invocation:** `yarn plop migration-plan <name>` or `node .../prep-from-cem.js <name>`.
- **Token impact:** the agent reviews and critiques a populated table (its actual job, the
  staff-level API judgment) instead of transcribing the surface by hand. Transcription is the
  expensive, error-prone part; this removes it while leaving the judgment in the skill.

## Recommendation 3: evergreen lint rules replace recurring judgment

The most predictable outcome is one a rule enforces deterministically at zero per-run token cost.
Move recurring "check that..." instructions out of skill prose and into `linters/`:

| Rule (config `recommended`)                                                                                                   | Replaces prose in           | Data source                              |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------- |
| icon-only control requires a label                                                                                            | a11y / code-conformance     | rule metadata                            |
| enum attribute values must be valid                                                                                           | api / conformance           | each `<Component>.types.ts`              |
| required slots present                                                                                                        | conformance                 | per-component metadata                   |
| no hard-coded values where a token exists                                                                                     | styling                     | token list (already in `swc-tokens`)     |
| stories structure: no `section-order`, no story-level JSDoc, static `picsum` IDs, MDX `<Canvas>` references each tagged story | stories rules / conformance | stories files                            |
| copyright header is current year                                                                                              | styles                      | (stylelint-header-plugin already exists) |

Per the recorded direction, each component contributes its own metadata (enums, required slots)
colocated with its source, and the plugin aggregates: adding a component is a single-file change,
no runner edits. These run in the IDE, in CI, and when the agent runs `yarn lint` — so the skill
stops re-explaining them and the conformance phase becomes "fix what lint reports."

## Recommendation 4: per-phase gate scripts (one command per quality gate)

Each migration phase ends with a quality gate the agent currently runs as a sequence of commands
and prose checks. Wrap the deterministic part of each gate as a scoped script so the skill calls
one command:

| Script                   | Runs                                                                                                                         | Used by              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `swc:verify <name>`      | build + import check for the new component paths                                                                             | Phase 2 gate         |
| `swc:conformance <name>` | eslint + stylelint + prettier scoped to the component (carries over the earlier `ai:conformance` idea, now component-scoped) | conformance sub-task |
| `swc:gate <name>`        | lint + unit test + a11y spec + storybook build for that component, then assert the status-table row exists                   | Phase 8 review       |

These are thin `run-s`/`run-p` wrappers over tools that already exist (`yarn lint`,
`test:2nd-gen`, `test:a11y:2nd`, storybook build). The value is that the skill names one command
and the human and agent get the identical gate.

## Recommendation 5: the consumer codemod package (ties the loop together)

The recorded direction calls for `@adobe/spectrum-wc-codemods` at
`2nd-gen/packages/tools/codemods/`, aggregating a per-component `migration.config.ts` (tag rename

- import rewrite as the automated baseline; semantic/a11y changes flagged, not rewritten). When it
  lands:

* the `component` plop generator should also emit the `migration.config.ts` stub, and
* the `consumer-migration-guide` skill should reference the codemod as "step 0" and emit the stub
  alongside the MDX.

This keeps tooling completeness tracking component completeness in the same changeset, and means
the consumer-guide skill describes the upgrade narrative while the codemod performs the mechanical
rewrite.

## Roadmap (leverage vs effort)

| #    | Tool                                                                         | Home                                 | Effort     | Token / predictability payoff                  |
| ---- | ---------------------------------------------------------------------------- | ------------------------------------ | ---------- | ---------------------------------------------- |
| 1 ✅ | 2nd-gen `component` plop generator + `wire-core-export` action (**shipped**) | `2nd-gen/scaffolding/`               | medium     | very high (kills Phase 2 file authoring)       |
| 2    | CEM-based prep prefill                                                       | `2nd-gen/packages/tools/generators/` | low–medium | high (removes Phase 1 transcription)           |
| 4    | per-phase gate scripts                                                       | root `package.json`                  | low        | medium (consistent gates)                      |
| 3    | evergreen lint rules (`recommended` config)                                  | `linters/eslint-plugin`              | high       | very high (zero per-run tokens, deterministic) |
| 5    | codemods package + `migration.config.ts` stub in generator                   | `2nd-gen/packages/tools/codemods/`   | high       | high (consumer-facing automation)              |

Do 1 and 2 first: highest payoff for least effort, and together they gut the two most
token-heavy phases (setup and prep). 4 is a quick consistency win. 3 and 5 are the larger,
evergreen investments that also serve long-term design-system correctness.

## Conventions any new tool must follow

1. **Align with 2nd-gen patterns, not the 1st-gen plop.** Model generators on the `badge`
   reference component, the two-layer core/SWC architecture, and the `.ai/` rules — not on the
   deprecated 1st-gen plopfile. Prefer plop's built-in case helpers over custom name helpers; add a
   custom helper only where a built-in is wrong (e.g. `titleName`).
2. **Apache copyright header, current year**, in every generated file and every script.
3. **Generators and scripts must run headless** (positional bypass args, no required TTY) so the
   agent can invoke them inside a skill.
4. **Read shared data from source, not hard-codes:** enums from `<Component>.types.ts`, tokens
   from `swc-tokens`, names from one input. Aggregation, not per-tool lists.
5. **Skills call tools, they don't reproduce them.** When a tool ships, edit the skill to invoke
   it and delete the prose it replaces. That deletion is where the token saving is realized.
6. **Product-code validators belong in `linters/`**, not `.ai/scripts/`. Reserve `.ai/scripts/`
   for the `.ai/`-contract validators (config schema, symlinks, AGENTS.md paths) that already
   live there.

## Footnote: the `.ai/`-maintenance scripts (stay in `.ai/scripts/`)

These keep the `.ai/` contract correct and are the only scripts that should remain under
`.ai/scripts/`. They already exist and run via `yarn lint:ai`: config-schema validation, symlink
validation, and AGENTS.md path validation. The earlier draft of this analysis proposed putting
product-code validators (stories, README, branch name) here too; under the placement rule above,
those should instead become `linters/` rules. Branch-name and conventional-commit checks are
git-hook concerns (husky already present) rather than `.ai/` maintenance, so they also live
outside `.ai/`.
