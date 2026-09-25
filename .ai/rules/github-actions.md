---
description: Invariant security and consistency constraints for GitHub Actions workflows and composite actions (permissions, untrusted input, shared setup, concurrency, and action pinning).
paths:
  - '.github/workflows/**'
  - '.github/actions/**'
metadata:
  source: github/awesome-copilot
  source-path: instructions/github-actions-ci-cd-best-practices.instructions.md, skills/github-actions-hardening
  source-sha: d7e4ad98ed8fd72e4744ee604e6277eb36748fe2
  license: MIT
---

# GitHub Actions workflows

This is a public repository that accepts pull requests from forks. Apply these constraints whenever you add or edit a workflow or composite action. For a full review, load the `github-actions-hardening` skill.

- **Declare `permissions`.** Set a top-level `permissions: contents: read` (or `{}`), then grant write scopes only on the jobs that need them.
- **Never interpolate untrusted input into `run:`.** Pass `${{ github.event.* }}`, `github.head_ref`, and other contributor-controlled values through `env:` and quote the shell variable. The same applies to `actions/github-script` scripts and composite action inputs.
- **Don't run fork code with privileges.** `pull_request_target` and `workflow_run` jobs must not check out and execute pull request code. Keep the guard in `publish-gen2-docs.yml` that limits `workflow_run` to successful upstream `push` events.
- **Use the shared setup.** Install Node.js and Yarn 4 through `./.github/actions/setup-job` instead of repeating `setup-node` and install steps.
- **Add a `concurrency` group** with `cancel-in-progress: true` to pull request workflows, following `lint.yml` and `type-check.yml`.
- **Pin actions by maintainer policy.** The repository pins by version tag today. Never reference a branch such as `@main`. Full-SHA pinning for third-party actions is recommended; propose it for maintainers to decide rather than rewriting existing references.
