<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Decisions / ADR 0001: Dual-generation release workflows

<!-- Document title (editable) -->

# ADR 0001: Dual-generation release workflows

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Context](#context)
- [Decision](#decision)
- [Consequences](#consequences)
- [Operator commands](#operator-commands)
- [2nd-gen beta cut](#2nd-gen-beta-cut)
- [GA](#ga)

</details>

<!-- Document content (editable) -->

- **Status:** Accepted
- **Date:** 2026-07-16

## Context

Spectrum Web Components ships two generations in parallel through the end of 2026:

- **1st-gen** — `@spectrum-web-components/*` on the `next` dist-tag from `main`
- **2nd-gen** — `@adobe/spectrum-wc-core` and `@adobe/spectrum-wc` on the `beta` dist-tag as `2.0.0-beta.N` from `gen2-beta`

Contributors add changesets on `main` for both generations. Versioning mechanics differ:

- **1st-gen** uses Changesets snapshot or `latest` releases on `main`
- **2nd-gen** uses Changesets **pre-release mode** (`pre.json`, tag `beta`) on `gen2-beta` so versions stay on the `2.0.0-beta.N` line through GA

Each generation uses different npm auth (OIDC for 1st-gen, token for `@adobe/*`) and different dist-tags. A single combined workflow would force scope or branch switching per generation inside one job and risks publishing a package under the wrong dist-tag.

## Decision

Use **two independent CI workflows** on **two branches**:

| Workflow | File | Branch | Trigger | Publishes |
| -------- | ---- | ------ | ------- | --------- |
| Publish Packages | `publish.yml` | `main` | push to `main`, manual dispatch, PR `snapshot-release` label | 1st-gen → `next`, `latest`, or `snapshot-test` |
| Publish 2nd-Gen Packages | `publish-2nd-gen.yml` | `gen2-beta` | manual dispatch | `@adobe/spectrum-wc-core`, `@adobe/spectrum-wc` → `beta` (`2.0.0-beta.N`) |

The operator runs one or both workflows as needed. Two steps are required when both generations ship in the same release.

| Scenario | Result |
| -------- | ------ |
| Both gens have changesets | Run both workflows; 1st-gen → `next`, 2nd-gen → `beta` with pre-mode changelog |
| Only 1st-gen changesets | `publish.yml` ships; `publish-2nd-gen.yml` skips |
| Only 2nd-gen changesets | `publish-2nd-gen.yml` ships; `publish.yml` skips on `main` |
| Prod (`latest`) | `publish.yml` only; never cuts a 2nd-gen beta |
| PR `snapshot-release` | `publish.yml` snapshots both gens under `snapshot-test` |
| Dry run | `publish-2nd-gen.yml` with `dry_run=true` |

Supporting scripts:

| Script | Branch | Purpose |
| ------ | ------ | ------- |
| `yarn release:gen1-prep` | `main` | Hold 2nd-gen-only changesets before `changeset version`; revert 2nd-gen version bumps after |
| `yarn release:gen2-beta` | `gen2-beta` | Bump `2.0.0-beta.N`, write changelogs, prune stale changesets, revert 1st-gen churn |

2nd-gen version line:

```
2.0.0-beta.0 → 2.0.0-beta.1 → … → 2.0.0 (GA)
```

## Consequences

- Shipping both generations requires two workflow runs on two branches
- Changesets are synced from `main` to `gen2-beta` before a beta cut
- `gen2-beta` keeps `.changeset/pre.json` in pre mode until GA
- Prefer separate changeset files per generation when a change touches both
- PR snapshots continue to exercise 2nd-gen packages under `snapshot-test`

## Operator commands

```bash
# 1st-gen (main)
gh workflow run publish.yml --ref main -f tag=next

# 2nd-gen beta — dry run
gh workflow run publish-2nd-gen.yml --ref gen2-beta -f tag=beta -f dry_run=true

# 2nd-gen beta — publish
gh workflow run publish-2nd-gen.yml --ref gen2-beta -f tag=beta
```

## 2nd-gen beta cut

1. Sync pending changesets from `main` into `gen2-beta`
2. Run `publish-2nd-gen.yml` on `gen2-beta` with `tag=beta`
3. CI runs `yarn release:gen2-beta`, publishes, commits back to `gen2-beta`

## GA

When 2nd-gen reaches GA on `gen2-beta`:

```bash
changeset pre exit
changeset version    # → 2.0.0
changeset publish    # latest
```
