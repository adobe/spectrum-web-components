---
name: github-actions-hardening
description: Use when asked to review, audit, harden, or secure a GitHub Actions workflow (.github/workflows/*.yml) or composite action, when writing a new workflow, or for questions like "is this workflow safe?", "why is pull_request_target dangerous here?", "pin my actions", or "lock down GITHUB_TOKEN permissions". Reasons about the Actions threat model that linters miss - script injection via ${{ }} interpolation, pull_request_target and workflow_run privilege escalation, mutable action references, least-privilege permissions, GITHUB_ENV and GITHUB_OUTPUT injection, secret exposure, OIDC, and self-hosted runners on public repositories.
license: MIT
metadata:
  source: github/awesome-copilot
  source-path: skills/github-actions-hardening
  source-sha: d7e4ad98ed8fd72e4744ee604e6277eb36748fe2
---

# GitHub Actions Hardening

A focused security reviewer for GitHub Actions workflows. It reasons about the _Actions-specific_
threat model — where trust boundaries live in trigger types, token scopes, and string
interpolation — rather than the application-code vulnerabilities a general security scanner looks
for. Most workflow risks are invisible to language linters because the dangerous code is the YAML
itself and the way GitHub expands `${{ }}` expressions into a shell before your script runs.

## When to Use This Skill

Use this skill when the request involves:

- Reviewing, auditing, or hardening any file under `.github/workflows/`
- Authoring a new workflow and wanting it secure by default
- A workflow that uses `pull_request_target`, `workflow_run`, or `issue_comment` triggers
- Questions about `GITHUB_TOKEN` permissions or the `permissions:` key
- Pinning actions to commit SHAs vs tags vs branches
- Handling untrusted input (issue titles, PR bodies, branch names, commit messages) in `run:` steps
- OIDC / cloud authentication from Actions, or secret handling in CI
- Self-hosted runners on public repositories
- Any request like "is this workflow safe?", "secure my CI", or "review this GitHub Action"

## In This Repository

Spectrum Web Components is a public repository that accepts pull requests from forks, so the
trigger and token rules below matter here. Before reviewing, read the always-on constraints in the
[`github-actions` rule](../../rules/github-actions.md). Repository specifics:

- Workflows live in `.github/workflows/` (for example `lint.yml`, `type-check.yml`,
  `browser-tests.yml`, `chromatic-vrt.yml`, `publish-gen2.yml`, and `publish-gen2-docs.yml`).
- Node.js and Yarn 4 are set up through the shared composite action `./.github/actions/setup-job`.
  Review composite actions in `.github/actions/` with the same rules, because their inputs are
  interpolated the same way.
- `publish-gen2-docs.yml` uses `workflow_run`. Its job-level `if` limits it to upstream `push`
  events that succeeded, so it never runs for an unreviewed fork commit. Keep that guard when
  editing it, and apply the same pattern to any new privileged trigger.
- Action references are pinned by version tag today (for example `actions/checkout@v4`). Full-SHA
  pinning is a maintainer decision for this repository: report unpinned third-party actions as
  findings with a recommended SHA, but don't rewrite existing references unless a maintainer asks.

## The Core Insight

In a workflow, **`${{ <expr> }}` is expanded by the runner into the script _before_ the shell
executes it.** So a step like:

```yaml
- run: echo "Title: ${{ github.event.issue.title }}"
```

is not passing a variable — it is _pasting attacker-controlled text directly into your shell
command_. An issue titled `"; <attacker-command> #` is concatenated into the script and executed.
This single mechanism is the most common real-world Actions vulnerability, and models routinely
generate it. Treat every
`${{ }}` that contains data an outside contributor can influence as a code-injection sink.

## Execution Workflow

Follow these steps **in order** for every workflow reviewed.

### Step 1 — Map the Triggers and Trust Level

Read every `on:` trigger and classify the workflow's privilege:

- `push`, `pull_request` (from same repo) → runs with the contributor's own trust
- `pull_request` from a **fork** → runs with a **read-only** token, **no secrets** (safe by design)
- `pull_request_target`, `workflow_run`, `issue_comment`, `issues` → run in the context of the
  **base repository** with a **read/write token and full access to secrets**, but can be
  **triggered by outside contributors**. These are the dangerous triggers.

Read [references/triggers-and-privilege.md](references/triggers-and-privilege.md) for the full trust matrix.

### Step 2 — Hunt for Script Injection

For every `run:` block, every `script:` in `actions/github-script`, and every input to a custom
action, list the `${{ }}` expressions and check whether any resolve to attacker-controllable data.
High-risk contexts include:

- `github.event.issue.title`, `github.event.issue.body`
- `github.event.pull_request.title`, `github.event.pull_request.body`, `.head.ref`, `.head.label`
- `github.event.comment.body`, `github.event.review.body`
- `github.event.pages.*.page_name`, `github.event.commits.*.message`, `github.event.head_commit.*`
- `github.head_ref` and any `github.event.*` field a fork author can set

Read [references/injection.md](references/injection.md) for the complete sink list and the safe-pattern fixes.

### Step 3 — Check Privileged Triggers Don't Execute Untrusted Code

If a `pull_request_target` or `workflow_run` workflow checks out PR/fork code
(`ref: ${{ github.event.pull_request.head.sha }}`) **and then runs it** (build, test, install
scripts, `yarn install` with lifecycle scripts, etc.), that is remote code execution against a
privileged token. Flag it as CRITICAL. The safe pattern is to split into two workflows: an
unprivileged `pull_request` workflow that runs the untrusted code, and a privileged
`workflow_run` workflow that only consumes its results.

### Step 4 — Audit `permissions:`

- If there is **no** `permissions:` block, the workflow inherits the repository default, which may
  be read/write to everything. Flag it.
- Recommend a top-level `permissions: {}` (deny-all) or `contents: read`, then grant the minimum
  per job (e.g. `pull-requests: write` only on the job that comments).
- Flag any `permissions: write-all` or broad `write` scopes that the steps don't actually need.

Read [references/permissions-and-tokens.md](references/permissions-and-tokens.md) for the per-scope guidance and OIDC setup.

### Step 5 — Audit Action References (Supply Chain)

For every `uses:`:

- **Third-party actions** (not `actions/*` or `github/*`) should be pinned to a full 40-character
  commit SHA, not a tag or branch. Tags and branches are mutable; a compromised upstream action
  can rewrite `v1` to malicious code that runs with your token and secrets. In this repository,
  pinning policy is set by maintainers (see "In This Repository"), so report the risk and the
  recommended SHA rather than rewriting references unprompted.
- First-party `actions/*` are lower risk but SHA-pinning is still the hardened recommendation.
- Flag `@main`, `@master`, or any branch reference as HIGH — that is "latest" and can change under
  you at any time.
- Note the human-readable version in a trailing comment: `uses: foo/bar@<sha> # v2.1.0`.

Read [references/supply-chain.md](references/supply-chain.md) for pinning, Dependabot for actions, and artifact/cache risks.

### Step 6 — Check Secret and Output Handling

- No secrets echoed, printed, or written to logs; no `set -x` / `bash -x` in steps that touch
  secrets.
- Secrets must not be passed to steps that run untrusted code or to untrusted third-party actions.
- Untrusted multiline data written to `$GITHUB_ENV` or `$GITHUB_OUTPUT` can inject environment
  variables or step outputs — use the random-delimiter heredoc form and never write raw user input.
- `actions/checkout` leaves a token on disk by default; set `persist-credentials: false` when the
  job later runs untrusted code.

### Step 7 — Produce the Report

Output findings using the format in [references/report-format.md](references/report-format.md): a severity summary table first,
then grouped findings with file, the exact offending YAML, the risk in plain English, and a
concrete before/after fix. Never auto-apply changes — present them for review.

## Severity Guide

| Severity    | Meaning                                                       | Example                                                                                                               |
| ----------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 🔴 CRITICAL | Token/secret theft or RCE reachable by an outside contributor | `pull_request_target` checking out and running fork code; `${{ github.event.* }}` in a `run:` on a privileged trigger |
| 🟠 HIGH     | Exploitable supply-chain or scope problem                     | Third-party action on a mutable tag/branch; `write-all` permissions; injection sink on `issue_comment`                |
| 🟡 MEDIUM   | Risk under conditions or chaining                             | Missing `permissions:` block; secret reachable by a non-fork PR author                                                |
| 🔵 LOW      | Hardening gap, low direct risk                                | First-party action not SHA-pinned; `persist-credentials` left default on a non-privileged job                         |
| ⚪ INFO     | Observation, not a vulnerability                              | Version comment missing next to a pinned SHA                                                                          |

## Output Rules

- **Always** show a findings summary table (counts by severity) first.
- **Group by issue type**, not by file.
- **Be exact** — quote the offending line and give the line location.
- **Always** pair every CRITICAL/HIGH with a concrete corrected YAML snippet.
- **Never** claim a fork `pull_request` is dangerous just because it runs untrusted code — it has
  no secrets and a read-only token. Reserve CRITICAL for the privileged triggers.
- If the workflow is already hardened, say so and list what was checked.

## Source and License

Adapted from `skills/github-actions-hardening` in
[github/awesome-copilot](https://github.com/github/awesome-copilot) (MIT). The `references/` files
are copied from the same commit with only Prettier formatting applied. See `.ai/THIRD-PARTY-NOTICES.md`.

## Reference Files

Load these as needed:

- `references/triggers-and-privilege.md` — Trust matrix for every trigger, why `pull_request_target`
  and `workflow_run` are privileged, and the two-workflow safe pattern.
  - Search patterns: `pull_request_target`, `workflow_run`, `issue_comment`, `fork`, `secrets`, `read-only token`, `trust boundary`
- `references/injection.md` — Full list of attacker-controllable `${{ }}` contexts and the
  `env:`-variable safe pattern for each sink (`run`, `github-script`, action inputs).
  - Search patterns: `script injection`, `github.event`, `head_ref`, `issue title`, `env`, `intermediate variable`, `actions/github-script`
- `references/permissions-and-tokens.md` — `GITHUB_TOKEN` scopes, least-privilege `permissions:`
  recipes per job type, and OIDC for cloud auth instead of long-lived secrets.
  - Search patterns: `permissions`, `GITHUB_TOKEN`, `write-all`, `contents: read`, `id-token`, `OIDC`, `least privilege`
- `references/supply-chain.md` — SHA-pinning third-party actions, Dependabot for `github-actions`,
  artifact and cache poisoning across `workflow_run`, and self-hosted runner exposure.
  - Search patterns: `SHA pin`, `uses`, `mutable tag`, `Dependabot`, `download-artifact`, `cache`, `self-hosted runner`
- `references/report-format.md` — Output template: summary table, finding cards, and before/after
  remediation blocks.
  - Search patterns: `report`, `format`, `finding`, `summary`, `remediation`, `before`, `after`
