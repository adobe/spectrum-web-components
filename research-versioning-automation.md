# Versioning automation and the `@since` badge

How the 2nd-gen prerelease version is produced, how it drives the "Since X" docs badge, and how
to make the badge automatic (PR #2).

> **Two release models.** Today the prerelease is built on a side branch (`gen2-beta`) and
> `main` only carries hand-copied versions. The target is to run the prerelease on `main` and
> retire `gen2-beta`. Most of the pain below (the `0.3.0` vs `2.0.0-beta.1` mismatch, the
> core/swc CHANGELOG divergence) is transitional and goes away in the target model.

## The two models at a glance

| "Version"                                         | Today, actual (`gen2-beta`)                            | Target, the goal (`main` pre-mode) |
| ------------------------------------------------- | ------------------------------------------------------ | ---------------------------------- |
| Published version (`package.json` → `version.ts`) | real on `gen2-beta` (`2.0.0-beta.1`); `main` = `0.3.0` | real on `main`                     |
| `@since` badge (hand-typed JSDoc → CEM)           | hand-mirrored onto `main`                              | stamped at release                 |
| CHANGELOG `## 2.0.0-beta.x`                       | generated on `gen2-beta`, hand-mirrored to `main`      | generated on `main` in lockstep    |

**Current model.** `gen2-beta` runs Changesets pre-mode (`.changeset/pre.json`), seeded to the
2.0 line, with `core` and `@adobe/spectrum-wc` **linked** so they bump together.
`scripts/gen2-beta-release.js` versions and publishes under the npm `beta` dist-tag. `main` is
kept a "clean delta" (never bumped, stays `0.3.0`), so any beta version on `main` is hand-copied.

**Target model.** Run pre-mode on `main` and retire `gen2-beta`. Then `main`'s `package.json` /
`version.ts` hold the real version, the docs (built from `main`) have it locally, and the badge
automation is self-contained on `main`.

## How the badge works, and why it drifts

The badge is a manual chain, separate from the version pipeline:

`@since` JSDoc on the class → `cem analyze` (the `statusPlugin` in `cem.config.js` reads
`@status` / `@since`) → `custom-elements.json` (the CEM: a generated, gitignored manifest of
each element's API) → `StatusBadge.tsx` renders `` `Since ${since}` ``.

Nothing bumps `@since`; a human edits it, so it drifts. The core/swc CHANGELOG mismatch is the
same failure: the beta entries were hand-added on `main` and one commit (#6460) updated only
swc. On `gen2-beta` the `linked` config would keep them in lockstep. All of this disappears
once the version lives on `main`.

## Constraint: the docs build from `main`

The docs workflow (`publish-2ndgen-docs.yml`) builds Storybook from `main` and regenerates the
CEM from `main`'s `@since` tags. Two targets:

| Target     | When                                | Shows                                 |
| ---------- | ----------------------------------- | ------------------------------------- |
| Staging    | every push to `main`                | `main` at HEAD, the dev/preview state |
| Production | manual, or a `#gen2-publish` commit | `main` at last publish, the release   |

These can differ between releases: a component merged since the last release shows on staging
(carrying `@since UNRELEASED`) but not on production. That is expected; staging is the preview.

## Proposal: stamp `@since` on first release

1. Authors write `@since UNRELEASED` on a new component, never a real number.
2. At release on `main`, right after `changeset version`, a step replaces every
   `@since UNRELEASED` with the new version and freezes it; already-stamped values are untouched.
3. A lint fails if any element is missing `@since`.

**Why stamp, not derive:** "Since X" means "first shipped in X", a frozen per-component fact.
Deriving from the current version would make every badge change on every release. Stamping
captures the value once.

This fits the docs split: an unreleased component shows "Unreleased" on staging (the sentinel),
and its real version on production once stamped.

## The version source, and eventual parity

Do not compute the next version. `changeset version` already writes it to `package.json`, so
just read that. Once pre-mode is on `main`, one bump feeds everything:

```
    changeset version → package.json (single source)
        ├── npm publish
        ├── CHANGELOG
        ├── version.ts
        └── stamp @since → CEM → "Since X" badge
```

No network, no version math, no mirroring. That is the parity.

**Today's bridge:** `main`'s `package.json` still reads the stable line (`0.3.0`), while the
real beta is the npm `beta` dist-tag (`2.0.0-beta.1`). So the resolver reads `package.json` by
default, with an opt-in `--from-npm` fallback for use until pre-mode lands on `main`. Retire the
fallback (and flip the docs line from `beta` to `latest` at GA) then.

## Prototype (PR #2)

- `scripts/resolve-gen2-version.js` resolves the version: `GEN2_VERSION` override → 2nd-gen
  `package.json` → opt-in `--from-npm` dist-tag.
- `scripts/stamp-since.js` stamps `@since UNRELEASED`; `--check` fails on any element missing
  `@since`.
- `StatusBadge.tsx` renders the `UNRELEASED` sentinel as an "Unreleased" badge.

`--check` already flags ~12 `conversational-ai` elements with no `@since` (no badge today).
Tests are deferred this phase; the scripts keep an injectable version source and a guarded CLI,
so tests drop in later without refactoring.

## Current direction and open questions

Direction: first-shipped and frozen; stamp the exact prerelease (`2.0.0-beta.N`); the stamp
step is a standalone script in the release flow (not an npm lifecycle hook, which changesets
does not fire); `@since` only (changesets owns the CHANGELOG); lint on missing `@since`;
"Unreleased" for the unreleased-on-staging badge.

Open: the exact wiring point in the on-`main` release flow; fix the ~12 missing-`@since`
elements here or as a follow-up; whether to normalize `-beta.N` to `2.0.0` at GA; and whether to
land this now or after pre-mode is on `main`.
