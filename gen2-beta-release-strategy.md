# Gen2 beta release strategy (for team review)

> Status: proposal / for cross-verification. The `gen2-beta` branch is pushed (PR #6413); nothing has been published to npm yet.

## Goal

Ship the 2nd-gen component set as a **private beta** (through ~mid-July) under semver-correct
pre-release versions, leading up to a clean `2.0.0` GA. 1st-gen continues to release on `next`
and is unaffected.

Target version shape:

```
2.0.0-beta.0  ->  2.0.0-beta.1  ->  2.0.0-beta.2  ->  ...  ->  2.0.0 (GA)
```

## Why pre-release mode (not snapshot, not 0.x)

- **Snapshot mode** (`changeset version --snapshot beta`) produces timestamped, unordered tags
  like `0.0.0-beta-20260617...`. Fine for throwaway dev builds, not for a real beta line.
- **`0.x-beta`** understates stability. Per semver, `0.x` signals "initial development, anything
  may change". A `-beta` pre-release of `2.0.0` more accurately signals "API is stabilizing,
  leading up to a release". See semver [item 4](https://semver.org/#spec-item-4) and
  [item 9](https://semver.org/#spec-item-9).
- **Changesets pre-release mode** gives ordered, incrementing, semver-correct pre-releases
  (`2.0.0-beta.N`) and a clean exit to `2.0.0`. This is the documented changesets workflow for
  exactly this scenario.

## Scope

Only the **publishable** 2nd-gen packages are in the beta line:

| Package                            | Published                                      | Beta version              |
| ---------------------------------- | ---------------------------------------------- | ------------------------- |
| `@spectrum-web-components/core`    | yes (OIDC trusted publishing)                  | `2.0.0-beta.0`            |
| `@adobe/spectrum-wc`               | yes (npm token auth)                           | `2.0.0-beta.0`            |
| `@spectrum-web-components/2nd-gen` | **no** — `private: true`, no `exports`/`files` | n/a (workspace root only) |

1st-gen packages: untouched, continue on `next`.

## How the version lands exactly on `2.0.0-beta.0`

The two packages are a **linked** changesets group, so they version in lockstep. To make a major
bump resolve to `2.0.0` (not `1.0.0` from the current `0.x`), we baseline both to `1.0.0`, then a
single `major` changeset takes the linked group to `2.0.0`. Pre-release mode then holds the base at
`2.0.0` and only advances the `-beta.N` counter until GA.

Setup performed on the `gen2-beta` branch (PR #6413):

1. Baseline `@spectrum-web-components/core` and `@adobe/spectrum-wc` to `1.0.0`
   (and the swc -> core internal dependency).
2. Add one `major` changeset for the Gen2 2.0.0 milestone.
3. `changeset pre enter beta` (writes `.changeset/pre.json`, tag `beta`).
4. `changeset version` -> both packages become `2.0.0-beta.0`, internal dep and `yarn.lock`
   updated, CHANGELOGs generated.

Net diff is small and contains no reformatting: two version bumps, one dep bump, a 2-line
`yarn.lock` change, two CHANGELOG entries, plus `pre.json` and the milestone changeset.

## Release mechanics

**Cut the next beta** (`2.0.0-beta.1`, `.2`, ...):

```bash
# on gen2-beta, with a new changeset present for the work being released
changeset version      # NOT --snapshot; pre mode advances the -beta.N counter
git commit ...         # commit the bump + changelog
changeset publish --tag beta   # (via CI for core's OIDC; see "open items")
```

**Promote to GA (`2.0.0`)** when ready:

```bash
changeset pre exit     # leaves pre mode
changeset version      # -> 2.0.0
changeset publish      # latest tag
```

## How to cross-verify this yourself

Anyone can reproduce the proof in a throwaway worktree (no risk to `main`):

```bash
git worktree add -b verify-beta /tmp/verify-beta origin/main
cd /tmp/verify-beta
# baseline core + swc to 1.0.0 (and swc -> core dep), add one `major` changeset, then:
node ../../<repo>/node_modules/@changesets/cli/bin.js pre enter beta
node .../bin.js version   # -> 2.0.0-beta.0
# add a changeset, version again -> 2.0.0-beta.1; again -> 2.0.0-beta.2
node .../bin.js pre exit && node .../bin.js version   # -> clean 2.0.0
```

Observed result:

| Step                         | core           | @adobe/spectrum-wc |
| ---------------------------- | -------------- | ------------------ |
| `pre enter beta` + `version` | `2.0.0-beta.0` | `2.0.0-beta.0`     |
| add changeset + `version`    | —              | `2.0.0-beta.1`     |
| add changeset + `version`    | —              | `2.0.0-beta.2`     |
| `pre exit` + `version`       | `2.0.0`        | `2.0.0`            |

Things to check on the branch:

- both published package.json versions are `2.0.0-beta.0`
- swc's `@spectrum-web-components/core` dependency is `2.0.0-beta.0`
- both CHANGELOGs top with `## 2.0.0-beta.0`; swc's "Updated dependencies" cites `core@2.0.0-beta.0`
- `yarn.lock` core descriptor is `@spectrum-web-components/core@npm:2.0.0-beta.0`
- `.changeset/pre.json` exists with `"mode": "pre"`, `"tag": "beta"`

## Open items / decisions for the team

1. **Counter starts at `.0`, not `.1`** — changesets/npm convention. Cosmetic only; not changing it.
2. **Publish workflow wiring** — `publish.yml` on `main` runs `changeset version --snapshot` for
   non-`latest` tags, which would clobber the committed `2.0.0-beta.0`. To publish the real beta we
   use the **scope=2nd-gen** path (from the in-flight workflow PR) that packs from `package.json`
   and `npm publish --tag beta` without re-versioning. That requires re-adding the
   "skip `changeset version` for scope=2nd-gen" gate and bringing that workflow onto `gen2-beta`.
3. **Branch home** — `gen2-beta` is a long-lived release branch (per changesets pre-release docs).
   Lives on the canonical repo as `gen2-beta` (PR #6413).
4. **Pre mode is stateful** — while `pre.json` exists, every `changeset version` produces a beta.
   Do not run a "normal" release from this branch without `changeset pre exit` first.

## Risks / caveats

- Pre mode keeps consumed changeset `.md` files until `pre exit`; this is expected and lets the
  counter increment correctly. Don't manually delete them.
- The `1.0.0` baseline is transient — it only exists to make the `major` bump resolve to `2.0.0`.
  After the first `changeset version` the committed versions are `2.0.0-beta.0`.
- Keep 1st-gen out of the beta: only `core` + `@adobe/spectrum-wc` changesets should be present on
  `gen2-beta` when cutting a beta.
