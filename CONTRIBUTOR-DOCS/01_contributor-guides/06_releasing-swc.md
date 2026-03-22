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
    - [Pre-release (next, beta, rc, etc.)](#pre-release-next-beta-rc-etc)
    - [Production release (latest)](#production-release-latest)
- [Approving the publish job](#approving-the-publish-job)
- [Verifying the release](#verifying-the-release)
- [Publishing the documentation site](#publishing-the-documentation-site)
- [Troubleshooting](#troubleshooting)

</details>

<!-- Document content (editable) -->

## Overview

Releases are fully automated through a GitHub Actions workflow (`.github/workflows/publish-1st-gen.yml`). There is no manual command to run locally — you trigger the release from GitHub and the workflow handles building, versioning, and publishing.

The workflow publishes four package groups:

| Package group | npm namespace | Auth method |
|---|---|---|
| 1st-gen components | `@spectrum-web-components/*` | OIDC trusted publishing |
| Core | `@spectrum-web-components/core` | OIDC trusted publishing |
| 2nd-gen components | `@adobe/spectrum-wc` | npm token (`ADOBE_BOT_NPM_TOKEN`) |
| React wrappers | `@swc-react/*` | OIDC trusted publishing |

> **Note:** React wrappers are only built and published when 1st-gen packages have changesets.

---

## Before you release

### Make sure changesets are in place

The workflow only publishes if there are pending changesets in `.changeset/*.md`. If no changesets exist, the publish job is skipped automatically.

To check what's pending, look at the `.changeset/` directory (exclude `README.md`). Each changeset file lists the packages it affects and the bump type (`patch`, `minor`, or `major`).

**If changesets are missing for packages you expected to update**, add them before triggering the release:

```bash
yarn changeset
```

Follow the prompts to select packages and bump type.

> **Important:** When you modify `@spectrum-web-components/core`, you must **manually add changesets** for any affected 1st-gen components. The `linked` versioning between Core and 2nd-gen handles 2nd-gen automatically, but 1st-gen packages are in a `fixed` group and are not linked to Core.

### Understand the versioning strategy

The `.changeset/config.json` defines how packages version together:

- **Fixed group** – All `@spectrum-web-components/*` packages (except Core) always version together at the same number.
- **Linked group** – `@adobe/spectrum-wc` and `@spectrum-web-components/core` receive the same bump type when either changes.
- **Ignored** – The workspace root packages (`@spectrum-web-components/1st-gen`, `@spectrum-web-components/2nd-gen`) are never published.

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

### Pre-release (next, beta, rc, etc.)

Use this to publish to a dist-tag other than `latest` — for example, before a new major version is ready, or for nightly builds.

**How to trigger:**

1. Go to the repository on GitHub.
2. Navigate to **Actions → Publish Packages**.
3. Click **Run workflow**.
4. Optionally enter a dist-tag in the **NPM dist-tag** field (e.g., `beta`, `rc`, `next`). If left blank, the default is `next`.
5. Click **Run workflow**.

> **Note:** Pushes to `main` also automatically trigger a `next` pre-release if changesets are present.

**What gets published:**

```
@spectrum-web-components/button@1.2.3-next.20260101120000
```

**Install a pre-release version:**

```bash
yarn add @spectrum-web-components/button@next
yarn add @spectrum-web-components/button@beta
```

---

### Production release (latest)

Use this to cut an official release. This publishes to the `latest` dist-tag, commits the version bumps and changelogs back to `main`, and creates a git tag.

> ⚠️ **The `latest` tag can only be published from the `main` branch.** If you attempt it from any other branch, the workflow will fail with an error.

**How to trigger:**

1. Make sure all PRs for the release are merged into `main`.
2. Go to **Actions → Publish Packages**.
3. Click **Run workflow**.
4. Enter `latest` in the **NPM dist-tag** field.
5. Click **Run workflow**.

**What the workflow does after publishing:**

- Commits all version bumps and generated changelogs with the message `chore: release packages #publish`.
- Pushes the commit to `main`.
- Creates git tags (e.g., `v1.2.3`) via `1st-gen/scripts/create-git-tag.js`.

---

## Approving the publish job

The `publish` job runs in a protected GitHub Environment called `npm-publish`. Depending on the environment configuration, **a designated reviewer may need to approve the deployment** before the job proceeds.

If approval is required:

1. You will see a **"Waiting for approval"** status on the workflow run.
2. A reviewer navigates to the workflow run on GitHub and clicks **Review deployments → Approve and deploy**.

This is intentional — it prevents accidental or unauthorized npm publishes.

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
