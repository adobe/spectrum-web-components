---
name: swc-consumer-migration
description: Use when a consumer of Spectrum Web Components wants to migrate their application from Spectrum 1 (1st-gen, @spectrum-web-components/*) to Spectrum 2 (2nd-gen, @adobe/spectrum-wc). The skill collects per-component consumer migration guides shipped inside node_modules, detects which components the consumer uses from their package.json, and applies each migration component-by-component with explicit checkpoints. Triggers include "migrate spectrum web components", "migrate swc to 2nd gen", "upgrade @spectrum-web-components", "swc 2nd gen migration", "migrate from spectrum 1 to spectrum 2".
alwaysApply: false
---

# Spectrum Web Components consumer migration

Help an application developer migrate their codebase from 1st-gen Spectrum Web Components (`@spectrum-web-components/*`) to 2nd-gen (`@adobe/spectrum-wc`) by reading the per-component consumer migration guides that ship inside their installed `node_modules` and applying each guide to the consumer's source.

This skill is intended to run inside the **consumer's project**, not the spectrum-web-components repo. It is invoked from Claude Code, Cursor, or Codex.

## When to use

- Consumer's `package.json` lists one or more `@spectrum-web-components/*` dependencies and they want to move to `@adobe/spectrum-wc`.
- Consumer asks for a guided, component-by-component migration with checkpoints.
- Do NOT use this skill to author migration guides — that is `.ai/skills/consumer-migration-guide` in the spectrum-web-components repo.

## Preflight

Before any other step, confirm:

1. Current working directory is the **consumer project root** (contains a `package.json`).
2. `node_modules/` exists. If not, ask the user to run their install command (`npm install`, `yarn`, or `pnpm install`) and stop.
3. At least one of `node_modules/@spectrum-web-components/` or `node_modules/@adobe/spectrum-wc/` exists. If neither exists, stop and tell the user nothing to migrate.

If any check fails, stop and surface the issue. Do not proceed.

## Step 1: Collect guides

Run the bundled collection script. The script is dependency-free Node and works from any consumer project root:

```bash
node <skill-dir>/scripts/collect-guides.mjs
```

`<skill-dir>` is wherever this skill's files live in the consumer project. The script resolves all paths relative to `process.cwd()` so it works whether the skill files were copied into the consumer project or symlinked.

The script:

- Walks the consumer's `node_modules/` (including hoisted and nested workspace layouts).
- Finds every `@spectrum-web-components/*` package and the `@adobe/spectrum-wc` package.
- Locates each consumer migration guide by checking these candidate paths inside each package, in order, first match wins:
  1. `<pkg>/consumer-migration-guide.mdx`
  2. `<pkg>/dist/consumer-migration-guide.mdx`
  3. `<pkg>/components/<name>/consumer-migration-guide.mdx`
  4. `<pkg>/dist/components/<name>/consumer-migration-guide.mdx`
  5. `<pkg>/docs/consumer-migration-guide.md`
  6. `<pkg>/CONSUMER-MIGRATION.md`
- Copies every found guide to `<cwd>/.swc-migration/guides/<component>.md`.
- Writes `<cwd>/.swc-migration/manifest.json` listing every package, with `guidePath: null` for packages that ship no guide.

If a guide is missing from `node_modules/` because the published package does not yet ship it, the user can re-run with a local checkout fallback:

```bash
node <skill-dir>/scripts/collect-guides.mjs --repo=/path/to/spectrum-web-components
```

After the script finishes, read `manifest.json` and report a summary to the user: how many packages were detected, how many guides were collected, and which packages have no guide. Do not proceed if zero guides were collected.

## Step 2: Detect used components

Read the consumer's `package.json` from the project root. If the project is a workspace (`workspaces` field present), also read each workspace package's `package.json`.

From every dependency map (`dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`), collect:

- Every entry whose name starts with `@spectrum-web-components/`.
- Whether `@adobe/spectrum-wc` is already present (and at what version).

Cross-reference with the manifest from Step 1. Build a list:

| Component | 1st-gen pkg                    | Installed version | Guide available |
| --------- | ------------------------------ | ----------------- | --------------- |
| badge     | @spectrum-web-components/badge | 1.11.2            | yes             |
| ...       | ...                            | ...               | ...             |

Show this list to the user. **Stop and ask for confirmation** before making any code changes. Confirm:

- Which components to migrate (default: all that have a guide).
- Whether to migrate in one pass or interactively per component.
- Which directories the agent is allowed to edit (default: `src/`).

## Step 3: Per-component migration

For each confirmed component, in dependency-safe order (alphabetical is fine for first pass):

1. Read `<cwd>/.swc-migration/guides/<component>.md`.
2. Parse the guide for: package changes, import changes, tag-name changes, prop / attribute changes, removed APIs, codemod hints. The expected guide structure is documented in `references/template.md`.
3. Search the consumer's allowed source directories for usages:
   - Imports of `@spectrum-web-components/<component>` and its sub-paths.
   - The 1st-gen tag name (e.g. `<sp-badge>`) in `.html`, `.htm`, `.tsx`, `.jsx`, `.ts`, `.js`, `.lit`, `.svelte`, `.vue`, `.mdx` files.
   - The 1st-gen JS/TS class name if present in the guide.
4. Apply the guide's transformations using the consumer's editor tools. Prefer minimal edits.
5. After each component, surface a diff-style summary to the user: files touched, count of replacements, anything skipped or flagged for manual review. **Stop and ask** before continuing to the next component unless the user explicitly chose batch mode in Step 2.

After all components are migrated, run the post-migration checklist in `references/usage.md` and report results.

## Stop conditions

The skill MUST stop and ask the user explicitly before any of the following:

- Deleting any file.
- Modifying `package.json` dependency versions, adding `@adobe/spectrum-wc`, or removing `@spectrum-web-components/*` entries.
- Modifying lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`).
- Running `npm`, `yarn`, or `pnpm` install / add / remove commands.
- Touching files outside the consumer's confirmed source directories.
- Migrating a component for which `manifest.json` reports `guidePath: null`.

The script and skill never auto-commit. They never push. They never bump versions silently.

## Failure modes

- **Guide missing for a detected package.** Skip that component, log it in the final report under "Manual migration required", and continue with the rest.
- **Workspace setup with multiple `package.json` files.** Aggregate dependency lists across workspaces. Show the per-workspace breakdown in Step 2 and confirm scope before editing.
- **Multiple installed versions of the same package** (deduplication failed in `node_modules`). Surface every version found in the manifest. Migrate against the highest version's guide and warn the user about the duplicates — they likely need to dedupe before publishing.
- **Guide refers to a tag/component the consumer never used.** Skip the unused parts silently. Only report changes the consumer actually has source for.
- **Consumer source uses a 1st-gen API that the guide marks as removed with no replacement.** Do not silently delete code. Insert a `TODO(swc-migration):` comment near the usage, list it in the final report under "Removed APIs requiring redesign", and move on.

## References

- `references/usage.md` — what each section of a guide means, a worked example, and the post-migration checklist.
- `references/template.md` — canonical guide structure that the skill knows how to parse. Component authors copy this when authoring a new guide.
- `scripts/collect-guides.mjs` — the collection script. Run with `--help` for options.
