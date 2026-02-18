# Publishing approach for Spectrum Web Components

_A journey through secure, automated npm releases_

## The challenge

We have a monorepo containing multiple generations of Spectrum Web Components with a shared foundation:

### Package architecture

```
spectrum-web-components/
├── 1st-gen/
│   └── packages/
│       ├── action-bar/          → @spectrum-web-components/action-bar
│       ├── action-button/       → @spectrum-web-components/action-button
│       ├── ... (95+ components) → @spectrum-web-components/*
│       └── react/               → @swc-react/* (auto-generated wrappers)
│
└── 2nd-gen/
    └── packages/
        ├── core/                → @spectrum-web-components/core (shared logic)
        └── swc/                 → @adobe/spectrum-wc (all 2nd-gen components)
```

### The three pillars

1. **Core** (`@spectrum-web-components/core`): The foundation package containing shared utilities, base classes, and common logic. Both 1st-gen and 2nd-gen packages depend on this. It lives in `2nd-gen/packages/core/` but is versioned separately and released alongside 1st-gen packages.

2. **1st-gen** (`@spectrum-web-components/*`): The established component library with 95+ individual packages, each published under the `@spectrum-web-components` namespace.

3. **2nd-gen** (`@adobe/spectrum-wc`): The next generation of components, consolidated into a single package under the Adobe namespace. It imports shared logic from `@spectrum-web-components/core`.

4. **React wrappers** (`@swc-react/*`): Auto-generated React/Next.js wrapper packages for 1st-gen components.

### The complexity

Each package group has different requirements:

| Package group  | Namespace                  | Authentication                | Versioning                   |
| -------------- | -------------------------- | ----------------------------- | ---------------------------- |
| Core           | `@spectrum-web-components` | OIDC trusted publishing       | Linked with 2nd-gen          |
| 1st-gen        | `@spectrum-web-components` | OIDC trusted publishing       | Fixed (all version together) |
| 2nd-gen        | `@adobe`                   | Token (`ADOBE_BOT_NPM_TOKEN`) | Linked with Core             |
| React wrappers | `@swc-react`               | OIDC trusted publishing       | Follows 1st-gen versions     |

The `linked` versioning between Core and 2nd-gen means when core changes, 2nd-gen gets the same version bump—ensuring compatibility since 2nd-gen depends on Core.

---

## The solution: unified publishing workflow

Our publishing workflow (`/.github/workflows/publish-1st-gen.yml`) orchestrates the entire release process through a two-job pipeline that handles all package types with their distinct authentication requirements.

### Triggers: when does publishing happen?

The workflow supports three trigger modes:

```yaml
on:
  workflow_dispatch:
    inputs:
      tag:
        description: 'NPM dist-tag (e.g., latest, beta, snapshot)'
        required: false
        default: 'next'
  pull_request:
    types: [labeled, synchronize]
  push:
    branches:
      - main
```

**1. Manual dispatch (`workflow_dispatch`)**: Team members can trigger releases directly from the GitHub Actions UI with an optional custom npm dist-tag. The default tag is `next`.

**2. Pull request (`pull_request`)**: The workflow runs automatically when a PR has the `snapshot-release` label. It triggers on `labeled` (when the label is added) and `synchronize` (when new commits are pushed to the PR). A job-level condition ensures only PRs with the `snapshot-release` label proceed:

```yaml
if: >-
  github.event_name == 'workflow_dispatch' ||
  github.event_name == 'push' ||
  (github.event_name == 'pull_request' &&
  contains(github.event.pull_request.labels.*.name, 'snapshot-release'))
```

**3. Push to main (`push`)**: Automatically triggers on pushes to `main` for continuous delivery after PRs are merged.

### Two-job architecture

The workflow is split into two jobs to avoid unnecessary work when there are no changesets:

```
check-changesets (lightweight) → publish (heavy, only if changesets exist)
```

The `check-changesets` job only checks out the repository and inspects `.changeset/*.md` files. If no changesets are found, the `publish` job is skipped entirely—saving time on setup, build, and authentication.

### The environment protection layer

```yaml
publish:
  needs: check-changesets
  if: needs.check-changesets.outputs.has_changesets == 'true'
  runs-on: ubuntu-latest
  environment: npm-publish
```

The `publish` job uses a GitHub Environment called `npm-publish` for a critical reason: **security**.

#### Why use a protected environment?

1. **Required reviewers**: Publishing to npm is a sensitive operation. The environment can be configured to require approval from designated team members before any workflow run proceeds. This prevents accidental or malicious releases.

2. **Environment-specific secrets**: Tokens required for publishing (such as `ADOBE_BOT_NPM_TOKEN` for the Adobe namespace) can be scoped to this environment, making them accessible only when the workflow runs within the `npm-publish` context.

3. **Deployment protection rules**: GitHub allows configuring rules like:
   - Limiting which branches can deploy to this environment
   - Adding wait timers before deployment
   - Restricting deployment to specific actors

4. **Audit trail**: All deployments to protected environments are logged, providing accountability for releases.

5. **Trusted publishing prerequisite**: On npmjs.com, when configuring trusted publishing for a package, you can specify an **environment name**. If configured, npm will only accept OIDC tokens from workflow runs that execute within that specific environment—adding another layer of security.

---

## Trusted publishing: the tokenless future

### What is trusted publishing?

Traditional npm publishing requires storing a long-lived npm token as a repository secret. This approach has risks:

- Tokens can be leaked or compromised
- Tokens require manual rotation
- Anyone with access to the secret can publish packages

**Trusted publishing** (also called OIDC publishing) eliminates these risks by using OpenID Connect (OIDC) tokens. Here's how it works:

1. GitHub Actions generates a short-lived OIDC token that cryptographically proves the workflow's identity
2. npm verifies this token against pre-configured trusted publishers on npmjs.com
3. If verified, npm allows the publish without any stored credentials

### Which packages use trusted publishing?

- **Core** (`@spectrum-web-components/core`): ✅ OIDC trusted publishing
- **1st-gen** (`@spectrum-web-components/*`): ✅ OIDC trusted publishing
- **React wrappers** (`@swc-react/*`): ✅ OIDC trusted publishing
- **2nd-gen** (`@adobe/spectrum-wc`): ❌ Currently uses `ADOBE_BOT_NPM_TOKEN` (general org token for Adobe namespace)

**Note**: The team is working with the Adobe npm namespace administrators to either configure `ADOBE_BOT_NPM_TOKEN` as a proper environment token or enable trusted publishing for the `@adobe` namespace, which would allow 2nd-gen packages to use OIDC authentication as well.

### Configuring trusted publishing

```yaml
permissions:
  id-token: write # Required for OIDC trusted publishing
  contents: write # Required for git push
```

The `id-token: write` permission is essential—it allows the workflow to request OIDC tokens from GitHub.

OIDC verification and NPM token configuration are combined into a single step. If OIDC is unavailable, the step fails and publishing is blocked:

```yaml
- name: Verify OIDC token and configure NPM authentication
  id: npm-auth
  env:
    NPM_TOKEN: ${{ secrets.ADOBE_BOT_NPM_TOKEN }}
  run: |
    if [ -n "$ACTIONS_ID_TOKEN_REQUEST_URL" ]; then
      echo "✓ OIDC token is available for 1st-gen trusted publishing"
    else
      echo "✗ OIDC token NOT available - trusted publishing will fail"
      exit 1
    fi

    echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
    echo "✓ NPM authentication configured for 2nd-gen (Adobe namespace)"
```

The publish step only runs if this combined authentication step succeeds:

```yaml
- name: Publish all packages
  if: steps.npm-auth.outcome == 'success'
```

### npm CLI version requirement

```yaml
- name: Verify npm CLI version for trusted publishing
  run: |
    echo "Current npm version: $(npm --version)"
    npx semver -r ">=11.5.1" "$(npm --version)" || {
      echo "Upgrading npm for trusted publishing support (requires 11.5.1+)"
      npm install -g npm@latest
      echo "Upgraded to npm version: $(npm --version)"
    }
```

Trusted publishing requires npm 11.5.1 or later. The workflow uses `npx semver` for precise version comparison and automatically upgrades npm if needed.

---

## How the release tag is determined

The workflow determines the npm dist-tag through a simple priority system:

```yaml
- name: Determine release tag
  id: extract-tag
  env:
    EVENT_NAME: ${{ github.event_name }}
    INPUT_TAG: ${{ github.event.inputs.tag }}
  run: |
    if [ "$EVENT_NAME" == "pull_request" ]; then
      WORKFLOW_TAG="snapshot-test"
    elif [ -n "$INPUT_TAG" ]; then
      WORKFLOW_TAG="$INPUT_TAG"
    else
      WORKFLOW_TAG="next"
    fi

    echo "tag=$WORKFLOW_TAG" >> $GITHUB_OUTPUT
```

**Tag resolution**:

| Trigger                                    | Tag                                     | Rationale                              |
| ------------------------------------------ | --------------------------------------- | -------------------------------------- |
| Pull request with `snapshot-release` label | `snapshot-test`                         | Safe tag for testing PR changes on npm |
| Manual dispatch with custom input          | User-specified (e.g., `latest`, `beta`) | Full control for intentional releases  |
| Manual dispatch without input              | `next` (default)                        | Safe default for pre-release testing   |
| Push to main                               | `next`                                  | Continuous delivery for merged changes |

### Release tag validation

An additional safety check prevents publishing `latest` from non-main branches:

```yaml
- name: Validate release tag
  env:
    TAG: ${{ steps.extract-tag.outputs.tag }}
    GIT_REF: ${{ github.ref }}
  run: |
    if [ "$TAG" == "latest" ] && [ "$GIT_REF" != "refs/heads/main" ]; then
      echo "ERROR: Cannot publish 'latest' from non-main branch"
      exit 1
    fi
```

This ensures production releases (`latest`) can only originate from `main`, preventing accidental stable releases from feature branches.

---

## Changeset configuration: how versioning works

The `.changeset/config.json` defines how packages are versioned together:

```json
{
  "fixed": [
    [
      "@spectrum-web-components/*",
      "!@spectrum-web-components/core",
      "!@spectrum-web-components/1st-gen",
      "!@spectrum-web-components/2nd-gen"
    ]
  ],
  "linked": [["@adobe/spectrum-wc", "@spectrum-web-components/core"]],
  "ignore": [
    "@spectrum-web-components/1st-gen",
    "@spectrum-web-components/2nd-gen"
  ]
}
```

### Understanding the versioning strategy

**Fixed group** (1st-gen packages):
All `@spectrum-web-components/*` packages (except Core and workspace roots) version together at the **same version number**. When any package in this group changes, all packages bump to the same version.

**Linked group** (Core + 2nd-gen):
`@adobe/spectrum-wc` and `@spectrum-web-components/core` are **linked**—they can have different absolute version numbers, but when either changes, both receive the same type of bump. This ensures 2nd-gen always has a compatible Core version.

**Ignored packages**:
Workspace root packages (`@spectrum-web-components/1st-gen`, `@spectrum-web-components/2nd-gen`) are never published.

### Why Core isn't linked with 1st-gen packages

You might notice that Core is **linked** with 2nd-gen (`@adobe/spectrum-wc`) but **not** with 1st-gen packages, even though both generations depend on Core. This is due to a changesets limitation: **a package cannot be both "fixed" and "linked" simultaneously**.

Since 1st-gen packages must remain in a fixed versioning group (all components version together), Core cannot be linked with them. This creates an important workflow requirement:

**When modifying Core, you must manually add changesets for affected 1st-gen components.**

#### Example workflow

If you modify `buttonbase` (a Core utility used by button components):

1. **Add a changeset for Core**: `@spectrum-web-components/core`
2. **Add a changeset for 1st-gen button**: `@spectrum-web-components/button`
3. **Add a changeset for 2nd-gen** (optional): Because 2nd-gen is **linked** to Core, it will automatically receive the same version bump even if you forget to add a changeset

#### Why this matters

- **2nd-gen (linked)**: Forgetting to add a changeset is safe—the linked property ensures automatic bumps
- **1st-gen (fixed, not linked)**: Forgetting to add a changeset means the component won't reflect the Core changes in its version, potentially causing confusion about which version includes the Core update

Always review which 1st-gen components depend on the Core changes you're making and add corresponding changesets.

---

## Publish summary

Every workflow run writes a summary to the GitHub Actions job summary page. This makes it easy to identify what triggered a release, which PR it came from, and which npm tag was used—especially useful for PR-triggered snapshot releases.

For pull request triggers, the summary includes:

| Field       | Value                         |
| ----------- | ----------------------------- |
| **Trigger** | Pull request                  |
| **PR**      | #142 — Add new button variant |
| **Branch**  | `feat/new-button` → `main`    |
| **NPM tag** | `snapshot-test`               |
| **Author**  | @contributor                  |

The summary is written using `$GITHUB_STEP_SUMMARY` and runs with `if: always()` so it appears even when earlier steps fail, showing whether NPM authentication succeeded or not.

---

## The complete flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         TRIGGERS                                 │
│  • workflow_dispatch (manual, default tag: next)                │
│  • pull_request with snapshot-release label (tag: snapshot-test)│
│  • push to main (tag: next)                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  JOB 1: check-changesets                        │
│  • Checkout repository                                          │
│  • Inspect .changeset/*.md files                                │
│  • Output: has_changesets, has_1st_gen_changesets               │
│  • If no changesets → publish job is skipped entirely           │
└─────────────────────────────────────────────────────────────────┘
                              │
                    (only if changesets exist)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              JOB 2: publish (environment: npm-publish)           │
│  • Required reviewers (if configured)                           │
│  • Scoped secrets access                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SETUP                                                           │
│  1. Checkout repository with full history                       │
│  2. Setup Node.js from .nvmrc + install dependencies            │
│  3. Verify/upgrade npm to 11.5.1+ (semver check)               │
│  4. Determine release tag (PR → manual input → default)        │
│  5. Validate tag (latest only allowed from main)                │
│  6. Verify OIDC + configure NPM token (single step)            │
│                                                                  │
│  BUILD                                                           │
│  7. Build all packages (Core, 1st-gen, 2nd-gen)                │
│  8. Generate custom elements manifests                           │
│  9. Confirm build artifacts                                      │
│  10. Version packages via changeset                              │
│  11. Refresh lockfile and rebuild                                │
│                                                                  │
│  PUBLISH                                                         │
│  12. Publish all packages (gated on npm-auth success):          │
│      ┌────────────────────────────────────────────────────────┐ │
│      │ @spectrum-web-components/core  → OIDC trusted publish  │ │
│      │ @spectrum-web-components/*     → OIDC trusted publish  │ │
│      │ @adobe/spectrum-wc             → Token authentication  │ │
│      └────────────────────────────────────────────────────────┘ │
│  13. Build React wrappers (only if 1st-gen has changesets)      │
│  14. Publish React wrappers with retry (only if 1st-gen)        │
│                                                                  │
│  SUMMARY                                                         │
│  15. Write publish summary (trigger, PR info, tag, status)      │
│                                                                  │
│  FINALIZE (latest tag only)                                      │
│  16. Commit version bumps and changelog updates                  │
│  17. Push changes to branch                                      │
│  18. Create git tag for release                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Security summary

| Layer              | Protection                                                                     |
| ------------------ | ------------------------------------------------------------------------------ |
| GitHub Environment | Required reviewers before publishing                                           |
| Tag validation     | `latest` blocked from non-main branches                                        |
| Trusted publishing | No long-lived tokens for Core, 1st-gen, and React wrappers                     |
| OIDC verification  | Cryptographic proof of workflow identity                                       |
| Gated publishing   | Publish step only runs if auth step succeeds                                   |
| Provenance         | Signed attestation linking packages to source code                             |
| Token security     | Working to migrate Adobe namespace to environment tokens or trusted publishing |

---

## Conclusion

Our publishing workflow balances security with flexibility across a complex package architecture:

- **Core** provides shared logic to both generations and is released with 1st-gen
- **1st-gen** packages (95+) version together as a fixed group
- **2nd-gen** (`@adobe/spectrum-wc`) versions with Core as a linked group
- **React wrappers** are auto-generated and follow 1st-gen versions

The two-job architecture ensures fast feedback when there are no changesets to publish, while the full pipeline handles build, version, and publish for all package types.

Security is layered through:

- **Protected environments** ensure human oversight for releases
- **Trusted publishing** eliminates token management for most packages
- **Dual authentication** handles different namespace requirements (OIDC for `@spectrum-web-components` and `@swc-react`, token for `@adobe`)
- **Tag validation** prevents accidental production releases from feature branches
- **Flexible tagging** supports various release scenarios (latest, next, beta, snapshot-test)

The journey to this solution involved debugging bash quirks, TypeScript configuration, npm authentication, and provenance validation—but the result is a robust, secure publishing pipeline that serves all generations of Spectrum Web Components.

## Author's checklist

- [x] I have read the **[CONTRIBUTING](<(https://github.com/adobe/spectrum-web-components/blob/main/CONTRIBUTING.md)>)** and **[PULL_REQUESTS](<(https://github.com/adobe/spectrum-web-components/blob/main/PULL_REQUESTS.md)>)** documents.
- [x] I have reviewed at the Accessibility Practices for this feature, see: [Aria Practices](https://www.w3.org/TR/wai-aria-practices/)
- [ ] I have added automated tests to cover my changes.
- [ ] I have included a well-written changeset if my change needs to be published.
- [x] I have included updated documentation if my change required it.

---

## Reviewer's checklist

- [ ] Includes a Github Issue with appropriate flag or Jira ticket number without a link
- [ ] Includes thoughtfully written changeset if changes suggested include `patch`, `minor`, or `major` features
- [ ] Automated tests cover all use cases and follow best practices for writing
- [ ] Validated on all supported browsers
- [ ] All VRTs are approved before the author can update Golden Hash

### Manual review test cases

Verify that the GitHub Actions workflow for publishing is working correctly:

1. **PR trigger**: Add the `snapshot-release` label to a test PR and confirm the workflow triggers, runs both jobs, and publishes with the `snapshot-test` tag
2. **Manual dispatch**: Trigger the workflow manually from the Actions tab with a custom tag (e.g., `beta`) and verify the correct tag is used
3. **Push trigger**: Push to `main` and verify the workflow runs with the `next` tag
4. **No changesets**: Verify the `publish` job is skipped when no changesets exist (only `check-changesets` runs)
5. **Tag validation**: Attempt a manual dispatch with `latest` from a non-main branch and confirm it fails
6. **Publish summary**: Check the workflow run summary page for correct trigger info, PR details, and npm tag

### Device review

- [ ] Did it pass in Desktop?
- [ ] Did it pass in (emulated) Mobile?
- [ ] Did it pass in (emulated) iPad?
