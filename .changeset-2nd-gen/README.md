# Changesets (2nd-gen)

This folder holds changesets for 2nd-gen packages only (`@adobe/spectrum-wc`, `@adobe/spectrum-wc-core`). 1st-gen (`@spectrum-web-components/*`) changesets live in [`.changeset/`](../.changeset/README.md).

## Why a separate folder

1st-gen ships to `next`/`latest` from `main`. 2nd-gen ships to `beta` from `gen2-beta` on its own cadence. `@changesets/cli` always reads `.changeset/` at the repo root, so it can't natively watch two folders — the `publish-2nd-gen.yml` workflow copies this folder's contents into `.changeset/` at release time before invoking the CLI. Authors should not rely on that copy step locally; always add changesets to the folder matching the generation you touched.

## Adding a changeset for a 2nd-gen change

```bash
yarn changeset:2nd-gen
```

This runs `yarn changeset` as usual and then moves the generated file from `.changeset/` into `.changeset-2nd-gen/` for you. Follow the same prompts as any other changeset: pick the affected package(s) (`@adobe/spectrum-wc` and/or `@adobe/spectrum-wc-core`), choose `major`/`minor`/`patch`, and write a summary.

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
2. `publish-2nd-gen.yml` (triggered on push to `gen2-beta`, or manually) copies these files into `.changeset/`, runs changesets in pre-release mode, and publishes to the `beta` npm tag.
3. Consumed changesets are removed as part of that release commit on `gen2-beta`.

See [Changesets documentation](https://github.com/changesets/changesets) for details on the underlying tool.
