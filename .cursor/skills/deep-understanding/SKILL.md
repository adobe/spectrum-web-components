---
name: deep-understanding
description: Require a thorough deep-read of the relevant codebase before planning or implementing; write findings to a persistent markdown file (e.g. research.md) so the user can review and correct before any work proceeds.
---

# Deep understanding

Every meaningful task that touches non-trivial code should start with a **deep-read directive**: thoroughly understand the relevant part of the codebase before doing anything else. Findings must be written into a **persistent markdown file**, never only a verbal summary in chat. That file is the user’s review surface — they can verify understanding and correct misunderstandings before any planning or implementation.

**Rule:** The deep-understanding rule (`.cursor/rules/deep-understanding.mdc`) is **applied intelligently**. Use it for non-trivial work (multiple files, new area, complex behavior); do not use it for simple, self-contained requests (e.g. creating a regex, one-line fix, single known file) to avoid wasting tokens and overloading context. This skill documents the full workflow and rationale.

## When to use this skill

- The task involves a folder, flow, or system the agent may not already understand in depth
- The user asks to "understand deeply", "research first", "study before implementing", or to produce a research/report before planning
- The work is non-trivial (multiple files, non-obvious behavior, possible bugs) and surface-level reading would be risky
- The user wants a written artifact they can review and correct before implementation

## When NOT to use

- Simple, self-contained requests (e.g. creating a regex pattern, one-line fix, single known file, quick question)
- Trivial, single-file changes where a quick read is enough
- The user explicitly says to skip research or already has a detailed spec
- The relevant code is already well understood and documented in context

## How to invoke

Use explicit depth language so surface-level reading is not acceptable. Examples:

- "Read this folder in depth, understand how it works deeply and all its specificities. When done, write a detailed report of your learnings in **research.md**."
- "Study the [system/flow/folder] in great detail; understand its intricacies and write a detailed **research.md** with everything there is to know about how it works."
- "Go through the [flow] deeply and look for potential bugs. Keep researching until you find them. When done, write a detailed report of your findings in **research.md**."

Phrases that signal depth: **"deeply"**, **"in great detail"**, **"intricacies"**, **"go through everything"**, **"don’t stop until"**. Without them, the agent may skim (signature-level reading and move on).

## Workflow

### 1. Scope the research

- Identify the folder, flow, or system to understand (from the user’s request or by asking once if unclear).
- Agree on the output file path (default: `research.md` in the relevant directory or repo root; user can specify another path).

### 2. Deep read before acting

- Read the relevant code **in depth**: control flow, data flow, edge cases, dependencies, and how pieces interact.
- Do not rely on signatures or file names alone; follow calls, state, and side effects as needed.
- Treat "understand deeply" as: no planning or implementation until the read is done and written up.

### 3. Write a persistent report

- Write a **detailed report** to the agreed markdown file (e.g. `research.md`).
- Include: what the system does, how it works, main components, important details, quirks, and (if requested) bugs or risks.
- Do **not** substitute a chat summary for the file. The file is the primary artifact.

### 4. Pause for review

- Present the report to the user (e.g. "I’ve written the report to `research.md`. Please review and correct any misunderstandings before we plan or implement.").
- Do not proceed to planning or implementation until the user has had a chance to review (or explicitly approves).

### 5. Proceed only after validation

- If the user corrects the report, update the file and re-pause if needed.
- Only after the research is validated (or approved) should you move on to planning and implementation.

## Why the written artifact matters

- **Review surface**: The user can read the file, verify that the agent actually understood the system, and fix errors before any plan is made.
- **Understanding**: If the research is wrong, the plan will be wrong and the implementation will be wrong. Correct understanding first.
- **Traceability**: The report stays in the repo; later sessions or humans can see what was assumed and what was learned.

## Output file

- **Default**: `research.md` (in the folder under study, or repo root if scope is broad).
- **User can specify**: e.g. `docs/notifications-research.md`, `CONTRIBUTOR-DOCS/.../findings.md`.
- **Format**: Markdown with clear headings (overview, how it works, components, specifics, bugs/risks if applicable, open questions).
