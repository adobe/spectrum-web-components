# Changesets (2nd-gen)

This folder is an independent `@changesets/cli` setup for 2nd-gen packages only (`@adobe/spectrum-wc`, `@adobe/spectrum-wc-core`), with its own `config.json`. 1st-gen (`@spectrum-web-components/*`) has its own separate setup in [`1st-gen/.changeset/`](../../1st-gen/.changeset/README.md) — the two do not share a config, a folder, or a versioning run.

## Why a separate setup

1st-gen ships to `next`/`latest` from `main`. 2nd-gen ships to `beta` from `gen2-beta` on its own cadence, using changesets pre-release mode. `@changesets/cli` resolves `.changeset/` relative to wherever it's invoked from, so each generation gets its own instance by living in its own package directory (`2nd-gen/`) rather than sharing one at the repo root.

## Adding a changeset for a 2nd-gen change

```bash
yarn changeset:2nd-gen
```

This runs `yarn changeset` from within `2nd-gen/`, so the file lands here automatically — no manual routing needed. Follow the usual prompts: pick the affected package(s) (`@adobe/spectrum-wc` and/or `@adobe/spectrum-wc-core`), choose `major`/`minor`/`patch`, and write a summary.

## Important: `@adobe/spectrum-wc-core` and component updates

When a change touches `@adobe/spectrum-wc-core`, include the corresponding `@adobe/spectrum-wc` bump in the same changeset so the change shows up in the component-facing changelog — core changes are internal and don't otherwise surface there.

## Example changeset

```markdown
---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': minor
---

- **Added**: Added new variant `tertiary` to `<swc-button>` [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

## Publishing process

1. Changesets accumulate here as gen2 PRs merge to `main`.
2. An operator syncs `main` into `gen2-beta` when ready to cut a release.
3. `publish-2nd-gen.yml` (triggered on push to `gen2-beta`, or manually) runs changesets from within `2nd-gen/` in pre-release mode and publishes to the `beta` npm tag.
4. Consumed changesets are removed as part of that release commit on `gen2-beta`.

See [Changesets documentation](https://github.com/changesets/changesets) for details on the underlying tool.
