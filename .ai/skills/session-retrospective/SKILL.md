---
name: session-retrospective
description: Document lessons learned after completing work, especially when the user corrected planning documents or implementation. Creates and maintains topic lessons files in .ai/memory/ that load as path-scoped instructions. Use when the user says "remember this", "log this lesson", "save this for next time", "add to memory", or "review the session and update memory", when the user corrects your work, or after substantial work.
---

# Session retrospective

## Mindset

You are a continuous improvement engineer. Every correction the user makes is signal, not noise. Capture it while the context is fresh — a two-sentence lesson now prevents hours of repeated mistakes in every future session.

## When to use

**Triggered by:**

- User corrects your work — wrong path, wrong assumption, wrong approach
- User says "document what you learned", "add to lessons", or "remember this"
- You encounter a tool limitation, surprising behavior, or non-obvious constraint
- End of a session where substantial work was done and corrections were made

**Proactively suggest** when the user corrects the same type of mistake more than once in a session.

## When NOT to use

- Trivial typo fixes with no future relevance
- Corrections that are specific to a one-off task and won't recur
- Preserving project state for continuing work — use `session-handoff` for that

---

## Workflow

### 1. Identify what to capture

For each correction or surprise, ask: **what would have prevented this mistake?**

| What happened                   | What to document                                    |
| ------------------------------- | --------------------------------------------------- |
| Wrong file path                 | The correct path and why the wrong one seemed right |
| Wrong tool usage                | The correct usage and the constraint                |
| Misunderstood project structure | Where things actually live                          |
| Tool limitation hit             | What the tool can't do and the workaround           |
| Assumption that didn't hold     | The actual rule or constraint                       |

Skip corrections that are one-offs or already obvious from the error message.

### 2. Check existing lessons first

Read every file in `.ai/memory/` before writing. Update an existing lesson if the new information adds nuance or corrects it. Never create a duplicate entry.

### 3. Write to the matching `.ai/memory/<descriptor>-lessons.md` file

Group lessons by **category**, not by date. Categories:

- **File operations** — tool behavior, read-before-edit, parallel edit failures
- **Path resolution** — relative vs absolute, directory depth, symlinks
- **Project structure** — where things actually live vs where they seem to be
- **Tool limitations** — what tools can/can't do, workarounds
- **CI / build** — what passes/fails, why, which scripts exist
- **Component patterns** — SWC-specific conventions (tags, stories structure, etc.)
- **Agent tooling** — `.ai/` rules, `AGENTS.md`, skills behavior, config

Add new categories when none of the above fit.

### 4. Format

Each lesson is **one or two sentences**:

1. **Bold subject** — the trigger condition or context
2. Plain sentence — what to do (or not do)

**Good:**

> **Edit tool requires a prior read**: The Edit tool fails with "file not read yet" if the file wasn't read in the current conversation. Read all files you plan to edit before starting work.

**Bad:**

> We had an issue with editing files.

Lessons should be actionable. A future agent reading them should know exactly what to do differently.

### 5. Keep it scannable

- Max 1–2 sentences per lesson
- Update existing lessons rather than appending duplicates
- If a lesson turns out to be wrong, remove or correct it — stale lessons cause the same problems they were meant to prevent
- Keep the total file under ~100 lines; if it grows past that, consolidate or remove stale entries

---

## Output location

**`.ai/memory/<descriptor>-lessons.md`** — co-located with agent tooling, readable by all agents regardless of tool. Use a descriptor that reflects the theme of the lessons (e.g. `agnostic-lessons.md` for tool-agnostic AI setup work, `migration-lessons.md` for migration-specific patterns). Create a new file when lessons belong to a clearly distinct topic rather than appending to an existing one.

Every lessons file needs instruction frontmatter so it loads automatically for matching files, and `yarn lint:ai` fails without it:

```yaml
---
description: Accumulated lessons about <topic> in this repository.
paths:
  - '**' # or a narrower glob, such as '**/*.css'
excludeAgent: code-review # optional; omit it if code review should use the lessons
---
```

After editing, run `yarn ai:sync` (the pre-commit hook does this) to regenerate the `memory-<descriptor>` instruction files.

---

## Checklist

- [ ] Lessons are in `.ai/memory/<descriptor>-lessons.md`, not in a session-specific file
- [ ] The file has instruction frontmatter (`description`, quoted `paths`) and `yarn lint:ai` passes
- [ ] Each lesson is in the correct category
- [ ] Each lesson is 1–2 sentences and actionable
- [ ] No duplicates — existing entries were checked and updated if needed
- [ ] Stale or incorrect lessons were removed or corrected

---

## Quality gate

A retrospective is complete when:

> Every significant correction from the session is captured as an actionable lesson in the correct category; no duplicates exist; lessons are scannable in under 60 seconds.
