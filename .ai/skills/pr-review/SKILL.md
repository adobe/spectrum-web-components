---
name: pr-review
description: Use when performing a pre-PR or PR review of a feature branch against main, especially for 2nd-gen component changes that need code review, accessibility testing review, testing review, and CSS or TypeScript style checks.
---

# PR review

Perform a first-round code review before the PR is opened to the team. By default, compare the current branch against `main`, inspect the diff, run targeted checks, and write the review to a numbered markdown file in `.ai/pr-feedback/`.

## When to use this skill

- The user asks for a PR review, code review, or pre-review of the current branch
- The user wants a first-pass review before requesting team review
- The branch includes 2nd-gen component work, accessibility changes, test changes, CSS updates, or TypeScript updates that should be checked against repo guidance

## How to invoke

- Say "perform a PR review of this branch"
- Or say "review this branch against main" or "do a first-round code review before I open the PR"
- If the user gives a different base branch, use that instead of `main`

## Workflow

### Step 1: Create the report scaffold

From the project root, run:

```bash
python3 .ai/skills/pr-review/scripts/create_pr_feedback.py --base main
```

If the user specified a different base branch:

```bash
python3 .ai/skills/pr-review/scripts/create_pr_feedback.py --base <branch>
```

The script will:

- create `.ai/pr-feedback/` if needed
- create the next numbered file: `pr-feedback-1.md`, `pr-feedback-2.md`, and so on
- record the current branch and base branch
- scaffold the required review sections

If Python is unavailable, create the file manually using the template in [references/pr-feedback-template.md](references/pr-feedback-template.md).

### Step 2: Gather the review scope

By default, compare the current branch against `main`:

```bash
git diff --name-only main...HEAD
git diff --stat main...HEAD
git diff --unified=0 main...HEAD
```

Use the narrowest meaningful diff when the user specifies files, a commit range, or a different base branch.

### Step 3: Read the relevant guidance

Always read:

- `CONTRIBUTOR-DOCS/01_contributor-guides/05_participating-in-pr-reviews.md`

Read these when relevant:

- `CONTRIBUTOR-DOCS/01_contributor-guides/09_accessibility-testing.md`
- `CONTRIBUTOR-DOCS/01_contributor-guides/11_2ndgen_testing.md`
- `CONTRIBUTOR-DOCS/02_style-guide/04_testing/README.md`
- `CONTRIBUTOR-DOCS/02_style-guide/04_testing/09_pr_review-checklist.md`
- `CONTRIBUTOR-DOCS/02_style-guide/01_css/README.md`
- `CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md`
- `CONTRIBUTOR-DOCS/02_style-guide/01_css/03_component-css-pr-checklist.md`
- `CONTRIBUTOR-DOCS/02_style-guide/02_typescript/README.md`
- the most relevant 2nd-gen TypeScript sub-guides for the changed files

### Step 4: Run targeted checks

Run commands when they materially support the review. Prefer the narrowest useful scope over full-repo checks.

Examples:

- targeted lint for changed areas
- targeted test runs for changed 2nd-gen components
- accessibility-focused tests when interactive behavior changed
- formatting or static checks that confirm suspected style issues

Document every command you ran in the review report, including commands that failed or were skipped.

### Step 5: Write the review

Write findings to the scaffolded `.ai/pr-feedback/pr-feedback-#.md` file using the required structure from [references/pr-review-prompt.md](references/pr-review-prompt.md).

Focus on:

- correctness and regressions
- accessibility risks
- missing or weak 2nd-gen tests
- CSS style-guide mismatches
- TypeScript and Lit pattern mismatches
- missing documentation or rollout notes when relevant

## Review standards

- Findings come first, ordered by severity
- Each finding should include file references and line numbers when possible
- Distinguish confirmed issues from risks, questions, or missing verification
- Keep the tone direct and actionable
- Do not pad the report with praise or filler

## Storage

Review reports live in `.ai/pr-feedback/` and are intentionally gitignored.

Naming convention:

- `pr-feedback-1.md`
- `pr-feedback-2.md`
- `pr-feedback-3.md`

Each file is a new review pass. Do not overwrite earlier reports.
