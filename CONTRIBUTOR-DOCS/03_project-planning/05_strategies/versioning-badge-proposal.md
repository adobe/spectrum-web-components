<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Proposal: automate the "Since X" version badge on 2nd-gen components

<!-- Document title (editable) -->

# Proposal: automate the "Since X" version badge on 2nd-gen components

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Problem](#problem)
- [Proposal: stamp `@since` on first release](#proposal-stamp-since-on-first-release)
    - [Assumptions in the example](#assumptions-in-the-example)
- [Working example (already built + verified)](#working-example-already-built--verified)
- [What I'd like feedback on](#what-id-like-feedback-on)

</details>

<!-- Document content (editable) -->

**Status:** proposal + working example, for feedback. Not merge-ready.
**Deep dive:** see `research-versioning-automation.md` for the full analysis.

## Problem

Each 2nd-gen component's docs page shows a "Since `<version>`" badge. That version comes from a
hand-typed `@since` JSDoc tag on the component class (extracted into the CEM by
`cem.config.js`, rendered by `StatusBadge.tsx`). Nothing keeps it in sync with releases — it is
copied by hand every beta, so it drifts. We just had to hand-edit 20 components to move the
badge from `2.0.0` to `2.0.0-beta.1`, and a related hand-mirror caused the core/swc CHANGELOG
to disagree (core stuck at beta.0, swc at beta.1).

## Proposal: stamp `@since` on first release

Keep the per-component `@since` badge, but fill it in automatically instead of by hand:

1. New/migrated components author `@since UNRELEASED` (a sentinel), never a real number.
2. At release, a script replaces every `@since UNRELEASED` with the version being released and
   **freezes** it. Components that already carry a version are left untouched.
3. A CI lint fails if any component element is missing `@since`.

"Since X" means "first shipped in X" — a frozen, per-component fact — so we stamp once and
freeze, rather than deriving a rolling number that would change every release.

### Assumptions in the example

- **Frozen on release** (first-shipped), not a rolling current-release number.
- **Stamp the exact prerelease** (`@since 2.0.0-beta.N`).
- **Version source:** the stamp reads the 2nd-gen `package.json` that `changeset version` bumps
  (no computing/predicting). Adopted once the prerelease command is on `main`, where
  `package.json` holds the real version.
- **Stamp step = an explicit step in the release flow**, right after `changeset version` (next
  to `generate-versions.js`). Not an npm lifecycle hook — changesets doesn't fire those.
- **Lint rule** blocks CI when an element lacks `@since`.
- **Staging vs production:** a component merged since the last release shows on staging with an
  **"Unreleased"** badge; production only shows stamped, released values.
- Scope stays narrow: `@since` only. The CHANGELOG is already single-sourced by changesets in
  the on-`main` model, so it is out of scope here.

## Working example (already built + verified)

One small script (`scripts/stamp-since.js`).

We do **not** compute the next version: `changeset version` already writes it into the 2nd-gen
`package.json`, so the stamp step just reads that. Eventual parity: badge, npm publish,
CHANGELOG, and `version.ts` all derive from that one bump once the prerelease command runs on
`main`.

```bash
# At release on main, stamp any @since UNRELEASED with the package.json version;
# already-stamped values are left frozen.
$ node scripts/stamp-since.js
✓ stamped @since -> 2.0.0-beta.2 in 1 file(s):
  - 2nd-gen/packages/swc/components/new-thing/NewThing.ts

# CI guard: fail if any element is missing @since
$ node scripts/stamp-since.js --check
✗ 12 element(s) missing an @since tag: …conversational-ai/*
```

Running `--check` today already surfaces a real gap: **~12 `conversational-ai` pattern elements
have no `@since`** and render no badge.

The docs badge (`StatusBadge.tsx`) is also wired for the sentinel: a component still carrying
`@since UNRELEASED` renders an **"Unreleased"** badge (not the literal "Since UNRELEASED"), so
newer components preview correctly on staging until a release stamps them. Verified end-to-end
through the CEM.

## What I'd like feedback on

1. Agree with stamp-on-release (frozen) over a derived rolling version?
2. Exact wiring point in the on-`main` release flow once the prerelease command moves there.
3. Fix the ~12 missing-`@since` elements in this PR, or a follow-up?
4. Badge label for unreleased-on-staging — "Unreleased" ok, or prefer "Since next"/hidden?
5. OK to adopt this only once pre-mode is on `main` (no interim version bridge), or is a stopgap needed sooner?
