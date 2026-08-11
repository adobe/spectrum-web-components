<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Releasing SWC

<!-- Document title (editable) -->

# Releasing SWC

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Before you release](#before-you-release)
    - [Make sure changesets are in place](#make-sure-changesets-are-in-place)
    - [Understand the versioning strategy](#understand-the-versioning-strategy)
- [Release types](#release-types)
    - [Snapshot release (for testing a PR)](#snapshot-release-for-testing-a-pr)
    - [Pre-release (`next` throwaway snapshot)](#pre-release-next-throwaway-snapshot)
    - [Planned release (Version PR)](#planned-release-version-pr)
    - [Production release (1st-gen `latest`)](#production-release-1st-gen-latest)
- [Approving the publish job](#approving-the-publish-job)
- [Verifying the release](#verifying-the-release)
- [Publishing the documentation site](#publishing-the-documentation-site)
- [Troubleshooting](#troubleshooting)

</details>

<!-- Document content (editable) -->

> ⚠️ **This page is out of date and pending a rewrite.** It still describes the release-branch-lock/direct-push model. As of the Version-PR split, both generations release via a bot-opened pull request instead of a direct push to `main`:
>
> | | Workflow | Changesets | Real-release branch | Ships to |
> |---|---|---|---|---|
> | 1st-gen | `.github/workflows/publish.yml` | `1st-gen/.changeset/` | `changeset-release/main` → PR to `main` | `latest` |
> | 2nd-gen | `.github/workflows/publish-2nd-gen.yml` | `2nd-gen/.changeset/` | `changeset-release/main` → PR to `main` | `beta` (persistent pre-release) |
>
> The sections below still describe the old branch-lock/direct-push model in places and should not be relied on until this page is rewritten to match.

## Overview

Releases are fully automated through GitHub Actions workflows — see the table above for which workflow covers which generation. There is no manual command to run locally — you trigger the release from GitHub and the workflow handles building, versioning, and publishing.

The workflow publishes four package groups:

| Package group | npm namespace | Auth method |
|---|---|---|
| 1st-gen components | `@spectrum-web-components/*` | OIDC trusted publishing |
| Core | `@adobe/spectrum-wc-core` | OIDC trusted publishing |
| 2nd-gen components | `@adobe/spectrum-wc` | npm token (`ADOBE_BOT_NPM_TOKEN`) |
| React wrappers | `@swc-react/*` | OIDC trusted publishing |

> **Note:** React wrappers are only built and published when 1st-gen packages have changesets.

---

## Before you release

### Make sure changesets are in place

> For the 2nd-gen changeset format and how entries flow into the CHANGELOG, see the [Changelog strategy](15_changelog-strategy.md).

Each workflow only publishes if there are pending changesets in its own folder — `1st-gen/.changeset/*.md` for `publish.yml`, `2nd-gen/.changeset/*.md` for `publish-2nd-gen.yml`. If no changesets exist for that generation, its publish job is skipped automatically.

To check what's pending, look at the relevant `.changeset/` directory (exclude `README.md`). Each changeset file lists the packages it affects and the bump type (`patch`, `minor`, or `major`).

**If changesets are missing for packages you expected to update**, add them before triggering the release:

```bash
yarn changeset:1st-gen
yarn changeset:2nd-gen
```

Follow the prompts to select packages and bump type.

> **Note:** 1st-gen and 2nd-gen are independent. Changes to `@adobe/spectrum-wc-core` only affect 2nd-gen. The `linked` versioning between Core and 2nd-gen handles this automatically. 1st-gen packages are in a separate `fixed` group.

### Understand the versioning strategy

Each generation has its own `config.json` (`1st-gen/.changeset/config.json`, `2nd-gen/.changeset/config.json`) defining how its own packages version together:

- **Fixed group** (1st-gen) – All `@spectrum-web-components/*` packages always version together at the same number.
- **Linked group** (2nd-gen) – `@adobe/spectrum-wc` and `@adobe/spectrum-wc-core` receive the same bump type when either changes.

---

## Release types

### Snapshot release (for testing a PR)

Use this to publish a test version of your changes to npm before merging. This is safe — it publishes under the `snapshot-test` dist-tag and does not affect `latest`.

**How to trigger:**

1. Open your pull request on GitHub.
2. Add the `snapshot-release` label to the PR.
3. The workflow triggers automatically. Every subsequent push to the PR also re-triggers it (as long as the label remains).

**What gets published:**

```
@spectrum-web-components/button@0.0.0-snapshot-test-20260101120000
@adobe/spectrum-wc@0.0.0-snapshot-test-20260101120000
```

**Install a snapshot version:**

```bash
yarn add @spectrum-web-components/button@snapshot-test
```

---

### Pre-release (`next` throwaway snapshot)

Every push to `main` also publishes a throwaway `next` snapshot for both generations — this is unrelated to the Version PR flow below and never touches `main`'s protection or history.

**What gets published:**

```
@spectrum-web-components/button@1.2.3-next.20260101120000
@adobe/spectrum-wc@0.0.0-next-20260101120000
```

**Install a pre-release version:**

```bash
yarn add @spectrum-web-components/button@next
```

### Planned release (Version PR)

Both generations use [`changesets/action`](https://github.com/changesets/action) to turn pending changesets into a pull request instead of pushing version bumps directly to `main`.

**How it works:**

1. Every push to `main` that has pending changesets (in `1st-gen/.changeset/` or `2nd-gen/.changeset/`) opens or updates a bot-authored pull request against `main`. The PR title is `chore: release 1st-gen packages` for 1st-gen or `chore: release 2nd-gen packages (beta)` for 2nd-gen (note the `(beta)` suffix). The PR contains the version bumps and changelog entries `yarn changeset version` would produce.
2. A reviewer reviews and merges that pull request like any other PR — this is the audit trail: the exact diff that will ship is visible and approved before anything is published.
3. Merging the Version PR is itself a push to `main`. That push has no pending changesets left (the merged PR consumed them), so the same workflow instead runs the generation's publish script: builds, `yarn changeset publish`, and (1st-gen only) builds and publishes the React wrappers and creates a git tag.

**Gen2's `beta` channel** is a persistent pre-release (`2nd-gen/.changeset/pre.json`, entered automatically the first time the Version PR flow runs) — there is no `latest` channel for 2nd-gen yet. Gen1's Version PR ships straight to `latest`.

**Install a pre-release version:**

```bash
yarn add @adobe/spectrum-wc@beta
```

---

### Production release (1st-gen `latest`)

There is no manual trigger for this anymore. Merge the open Version PR (see "Planned release" above) — the resulting push to `main` publishes to `latest`, commits nothing further back (the version bumps already landed via the merged PR), and creates a git tag via `1st-gen/scripts/create-git-tag.js`.

---

## Approving the publish job

The `release` job runs in a protected GitHub Environment called `npm-publish`. Depending on the environment configuration, **a designated reviewer may need to approve the deployment** before the job proceeds — this applies both when it opens/updates the Version PR and when it runs the actual publish after that PR merges.

This is intentional — it prevents accidental or unauthorized npm publishes.

Note the review point has effectively doubled: a human approves the **code diff** by merging the Version PR, and (if environment protection is configured) a human separately approves the **deployment** that runs after the merge.

---

## Verifying the release

After the workflow completes, verify the following:

1. **Workflow summary** – Open the completed workflow run on GitHub Actions. The job summary shows the trigger, branch, npm tag, and whether publishing succeeded.
2. **npm packages** – Search for the package on [npmjs.com](https://www.npmjs.com) or run:
    ```bash
    npm view @spectrum-web-components/button versions --json
    ```
3. **Git tags** (production releases only) – Check the [tags page](https://github.com/adobe/spectrum-web-components/tags) for the new version tag.
4. **`main` branch** (production releases only) – Confirm the version bump commit (`chore: release packages #publish`) is visible in the commit history.

---

## Publishing the documentation site

The documentation site publishes automatically on any push to `main` whose commit message contains `#publish`, `docs:`, or `docs(`. This happens automatically as part of every production release (the version commit uses `#publish`).

To publish the docs site manually:

**From GitHub:**
1. Navigate to **Actions → Publish Documentation Site**.
2. Click **Run workflow**, select `main`, and click **Run workflow**.

**From the terminal** (requires [GitHub CLI](https://cli.github.com)):

```bash
gh workflow run publish-docs-site.yml --ref main
```

---

## Troubleshooting

- **The publish job was skipped entirely** — The `check-changesets` job found no pending changesets. Add a changeset with `yarn changeset` and push the change.

- **"Cannot publish 'latest' from non-main branch"** — You entered `latest` as the dist-tag but the workflow was triggered from a branch other than `main`. Merge your changes into `main` first, then re-run the workflow from `main`.

- **"OIDC token NOT available – trusted publishing will fail"** — The workflow requires `id-token: write` permissions. Ensure the workflow is running in the `npm-publish` environment and that the repository's GitHub Actions permissions allow OIDC token generation.

- **Publishing succeeded but React wrappers were skipped** — React wrappers are only built and published when 1st-gen packages (`@spectrum-web-components/*`) have changesets. If only Core or 2nd-gen changed, the React wrapper step is intentionally skipped.

- **A React wrapper package failed to publish mid-run** — The workflow retries each package up to 3 times with exponential backoff (2s, 4s). If it still fails after 3 attempts, the workflow exits. Re-triggering the workflow is safe — changeset will skip already-published packages.

- **The workflow ran but versions weren't bumped on `main`** — Version commits and git tags are only created for `latest` releases. Pre-releases (`next`, `beta`, `snapshot-test`, etc.) intentionally skip the commit and tag steps.

- **A Version PR opened but nothing happens after I merge it** — Confirm the merge actually landed on `main` (not squashed into a differently-named branch) and that `1st-gen/.changeset/*.md` / `2nd-gen/.changeset/*.md` are empty afterward (the merge should have deleted them). If changesets remain, the next push will just update the Version PR again instead of publishing.

- **The publish step ran again on an unrelated push and did nothing** — Expected. `changesets/action` runs its publish script on every push to `main` where no changesets are pending, not only immediately after a Version PR merge. `yarn changeset publish` and the git-tag check in `publish.yml`'s publish script are both designed to no-op safely when there's nothing new to release.
