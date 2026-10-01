---
name: bug-reproduction-brief
description: Use when a bug report is vague, intermittent, browser-specific, framework-specific, or mixed with an assumed cause, before proposing a fix. Turns the report into a minimal, evidence-backed reproduction (Storybook story or minimal HTML page, browser and version, affected `sp-*` or `swc-*` element) and stops before any repair.
license: MIT
metadata:
  source: github/awesome-copilot
  source-path: skills/bug-reproduction-brief
  source-sha: d7e4ad98ed8fd72e4744ee604e6277eb36748fe2
  upstream: skyestrela/ai-agent-skill-preview
---

# Bug Reproduction Brief

Use this skill when a bug report is incomplete, intermittent, environment-specific, or mixed with an assumed cause. The goal is to prove the smallest observable failure before diagnosis or repair begins. Once the brief exists, hand off to [systematic-debugging](../systematic-debugging/SKILL.md) for root-cause investigation.

## 1. Record the observed failure

Capture the exact error, incorrect output, timestamp, affected story, page, or command, and the smallest known input. Preserve relevant logs without secrets or personal data. Label second-hand descriptions as unverified.

## 2. Identify the environment

Record only facts you can inspect:

- repository and commit;
- the affected element tag (`sp-*` for 1st-gen, `swc-*` for 2nd-gen) and its package version;
- browser, browser version, and operating system (including forced colors, zoom, or reduced motion when relevant);
- the host framework, if the report comes from a consumer app (for example React, Vue, or plain HTML);
- Node.js and Yarn versions for build or test failures;
- the Storybook story, test file, or CI job that shows the failure;
- whether the target is local, a Storybook deploy, CI, or a consumer's production site.

Never guess credentials or production configuration.

## 3. Separate expected from actual behavior

Write two explicit observable statements:

```text
Expected: [observable result]
Actual:   [observable result, including status or error]
```

Do not put the suspected cause in either statement.

## 4. Reduce the reproduction

Start from the reported path, then remove unrelated data, attributes, slotted content, and steps one at a time. Keep the smallest fixture that still fails. If the failure stops, restore the last removed condition and record it.

Prefer an isolated Vitest browser test, a single Storybook story, or a minimal HTML page that imports only the affected element over reproducing inside a consumer's app or production site.

## 5. Prove repeatability

Run the minimal reproduction at least twice where safe. Record commands and outputs. If the failure is intermittent, report the observed frequency and duration instead of calling it deterministic. Test the other supported browsers when the report names only one.

## 6. Stop before repair

A verified reproduction is the deliverable. Do not edit implementation code while building the brief because that can destroy the evidence or mix diagnosis with remediation.

## Output

```markdown
# Bug Reproduction Brief

- Target and commit:
- Element and package version:
- Environment (browser, OS, framework):
- Expected:
- Actual:
- Minimal steps:
- Minimal fixture (story, test, or HTML):
- Reproduced: yes / no / intermittent
- Evidence:
- Unknowns:
- Safe next hypothesis to test:
```

## Safety boundaries

- Do not change production data merely to reproduce a bug.
- Do not publish secrets, customer records, or private source.
- Do not claim a root cause from correlation alone.
- Use read-only or reversible discovery first.
- Stop after a verified reproduction; diagnosis and repair are separate workflows.

## Example prompt

```text
Use the bug-reproduction-brief skill on the report that swc-badge truncates its label in Safari. Do not fix it yet. Reduce it to the smallest failing Storybook story or HTML page and report the exact browser version, steps, expected result, actual result, and remaining unknowns.
```

## Source and license

Adapted from `skills/bug-reproduction-brief` in [github/awesome-copilot](https://github.com/github/awesome-copilot), which adapted it from the MIT-licensed workflow at [skyestrela/ai-agent-skill-preview](https://github.com/skyestrela/ai-agent-skill-preview). See `.ai/THIRD-PARTY-NOTICES.md`.
