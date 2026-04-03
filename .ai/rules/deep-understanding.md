---
description: Apply intelligently. For non-trivial work, do deep research and write findings to a persistent file (e.g. research.md at repo root) before code. Do not apply for simple, self-contained requests (e.g. creating a regex, one-line fix, single known file).
alwaysApply: false
---

# Deep understanding

**Apply intelligently.** Use this rule when the task is non-trivial (multiple files, new or unfamiliar area, complex behavior, or would benefit from a shared understanding document). Do not apply for simple, self-contained requests — e.g. creating a regex pattern, a one-line fix, a single known file, or a quick question — to avoid wasting tokens and overloading context.

When the rule applies, do deep research before writing any code:

1. **Scope** the relevant folder, flow, or system from the user’s request.
2. **Deep read** that area — understand how it works in depth, not at signature level only. Do not skip to planning or code.
3. **Write** your findings to a persistent markdown file (e.g. `research.md` at repo root). No verbal-only summary; the file is the artifact.
4. **Pause for review** — present the report to the user and do not proceed to planning or implementation until they have reviewed (or explicitly approve).
5. **Proceed only after validation** — if the user corrects the report, update it; only then move on to code.

**Trivial tasks:** For very small, single-file edits (e.g. typo, one-line fix), a short in-chat confirmation of understanding in the form of a question is acceptable instead of a full research report. Confirm in chat before editing code.

Follow the full workflow and rationale in `.ai/skills/deep-understanding/SKILL.md`. The written report is the review surface; wrong research leads to incorrect planning and wasted implementation time.
