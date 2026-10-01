---
name: verification-before-completion
description: Use when about to claim work is complete, fixed, or passing, before committing, pushing, or opening a PR. Requires running fresh verification commands (lint, lint:ai, targeted Vitest, type-check, VRT) and reading their output before making any success claim, and reporting pre-existing failures separately. Evidence before assertions, always.
license: MIT
metadata:
  source: obra/superpowers
  source-path: skills/verification-before-completion
  source-sha: 5bf4e78011075bcfc0dc295f0724994cd123ee71
---

# Verification Before Completion

## Overview

**Core principle:** Evidence before claims, always.

**Violating the letter of this rule is violating the spirit of this rule.**

## The Iron Law

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

If you haven't run the verification command in this message, you cannot claim it passes.

## The Gate Function

```
BEFORE claiming any status or expressing satisfaction:

1. IDENTIFY: What command proves this claim?
2. RUN: Execute the FULL command (fresh, complete)
3. READ: Full output, check exit code, count failures
4. VERIFY: Does output confirm the claim?
   - If NO: State actual status with evidence
   - If YES: State claim WITH evidence
5. ONLY THEN: Make the claim

Skipping a step means you're guessing, not verifying.
```

## Verification Commands in This Repository

Run the smallest command that proves the claim, then widen only if it fails or the change is broad. Run commands from the repository root.

| Claim                                                | Command                                                                                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lint is clean for the files you changed              | `yarn eslint <paths>`, `yarn stylelint <css paths>`, `yarn prettier --check <paths>`; `yarn lint:gen2`, `yarn lint:1st-gen`, or `yarn lint` for wider changes |
| `.ai/`, `AGENTS.md`, or generated AI files are valid | `yarn lint:ai`                                                                                                                                                |
| A 2nd-gen component's tests pass                     | `yarn workspace @adobe/spectrum-wc test components/<name>`                                                                                                    |
| All 2nd-gen tests pass                               | `yarn test:gen2`                                                                                                                                              |
| 1st-gen tests pass                                   | `yarn test:1st-gen`                                                                                                                                           |
| Types check                                          | `yarn type-check`                                                                                                                                             |
| Accessibility specs pass                             | `yarn test:a11y:gen2` or `yarn test:a11y:1st`                                                                                                                 |
| Visual changes are approved                          | Chromatic VRT on the PR; see [vrt-authoring](../vrt-authoring/SKILL.md)                                                                                       |
| The build works                                      | `yarn build:gen2` or `yarn build:1st-gen`                                                                                                                     |

**Pre-existing failures:** If a command fails on code you didn't change, confirm it also fails on the base branch, then report it separately ("fails on `main` too") instead of hiding it or claiming a clean run.

**Related skills:** [consistency-pass](../consistency-pass/SKILL.md) audits changed files and plans before a phase ends, and [migration-review](../migration-review/SKILL.md) is the final gate for component migrations. This skill is the general rule behind both: no claim without fresh evidence.

## Common Failures

| Claim                 | Requires                        | Not Sufficient                 |
| --------------------- | ------------------------------- | ------------------------------ |
| Tests pass            | Test command output: 0 failures | Previous run, "should pass"    |
| Linter clean          | Linter output: 0 errors         | Partial check, extrapolation   |
| Build succeeds        | Build command: exit 0           | Linter passing, logs look good |
| Bug fixed             | Test original symptom: passes   | Code changed, assumed fixed    |
| Regression test works | Red-green cycle verified        | Test passes once               |
| Agent completed       | VCS diff shows changes          | Agent reports "success"        |
| Requirements met      | Line-by-line checklist          | Tests passing                  |

## Red Flags - STOP

- Using "should", "probably", "seems to"
- Expressing satisfaction before verification ("Great!", "Perfect!", "Done!", etc.)
- About to commit/push/PR without verification
- Trusting agent success reports
- Relying on partial verification
- Thinking "just this once"
- Tired and wanting work over
- **ANY wording implying success without having run verification**

## Rationalization Prevention

| Excuse                                  | Reality                |
| --------------------------------------- | ---------------------- |
| "Should work now"                       | RUN the verification   |
| "I'm confident"                         | Confidence ≠ evidence  |
| "Just this once"                        | No exceptions          |
| "Linter passed"                         | Linter ≠ compiler      |
| "Agent said success"                    | Verify independently   |
| "I'm tired"                             | Exhaustion ≠ excuse    |
| "Partial check is enough"               | Partial proves nothing |
| "Different words so rule doesn't apply" | Spirit over letter     |

## Key Patterns

**Tests:**

```
✅ [Run test command] [See: 34/34 pass] "All tests pass"
❌ "Should pass now" / "Looks correct"
```

**Regression tests (TDD Red-Green):**

```
✅ Write → Run (pass) → Revert fix → Run (MUST FAIL) → Restore → Run (pass)
❌ "I've written a regression test" (without red-green verification)
```

**Build:**

```
✅ [Run build] [See: exit 0] "Build passes"
❌ "Linter passed" (linter doesn't check compilation)
```

**Requirements:**

```
✅ Re-read plan → Create checklist → Verify each → Report gaps or completion
❌ "Tests pass, phase complete"
```

**Agent delegation:**

```
✅ Agent reports success → Check VCS diff → Verify changes → Report actual state
❌ Trust agent report
```

## When To Apply

**ALWAYS before:**

- ANY variation of success/completion claims
- ANY expression of satisfaction
- ANY positive statement about work state
- Committing, PR creation, task completion
- Moving to next task
- Delegating to agents

**Rule applies to:**

- Exact phrases
- Paraphrases and synonyms
- Implications of success
- ANY communication suggesting completion/correctness

## Source and License

Adapted from `skills/verification-before-completion` in [obra/superpowers](https://github.com/obra/superpowers) (MIT). See `.ai/THIRD-PARTY-NOTICES.md`.
