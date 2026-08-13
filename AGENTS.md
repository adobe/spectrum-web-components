# Agent instructions

Coding agents working in this repository should treat **`.ai/`** as the canonical location for project AI rules, skills, and related configuration. This file is a **bootstrap**: read it first, then follow the detailed catalog and paths below.

## First steps

1. **Read** [`.ai/README.md`](./.ai/README.md) for the full list of rules, skills, when they apply, and how to invoke skills.
2. **Read** all files in [`.ai/memory/`](./.ai/memory/) for accumulated project-specific lessons — non-obvious constraints, tool behaviors, and corrections from previous sessions. Skip this step if the directory does not exist yet.
3. **Apply** the rules that match the files and tasks you touch (see globs and activation notes in that README).
4. **Load** a skill when the task matches its purpose: each skill lives under `.ai/skills/<skill-name>/SKILL.md`.

## Where things live

| What                         | Location                                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| Rule catalog and usage       | [`.ai/README.md`](./.ai/README.md)                                                                 |
| Rule files (`.md`)           | [`.ai/rules/`](./.ai/rules/)                                                                       |
| Structured validation config | [`.ai/config.json`](./.ai/config.json)                                                             |
| Task workflows (skills)      | [`.ai/skills/`](./.ai/skills/) — each skill is typically `SKILL.md` in a subfolder                 |
| Accumulated lessons          | [`.ai/memory/`](./.ai/memory/) — read all files here before starting non-trivial work (if present) |

## Rules vs skills

- **Rules** are always in context — only two exist (`branch-naming`, `styles`), both genuinely `alwaysApply: true`. See [`.ai/README.md`](./.ai/README.md).
- **Skills** are **on-demand** playbooks, including former glob-scoped guidance (documentation shape, CSS-adjacent stylesheet conventions, and similar) as well as task playbooks (for example explain-code, test-driven development, session handoff). A skill's `globs:` field, where present, documents which paths it's relevant to, but — unlike Cursor's rule frontmatter — it is not a guaranteed auto-trigger; the skill must still be matched by description or invoked explicitly. When the user's request fits a skill's description, or you're editing a path a skill's `globs:` names, **read that skill's `SKILL.md`** before doing the work.

## IDE-specific folders

Some editors load extra project config from their own directories (for example `.cursor/` and `.claude/`). Those locations are thin adapters that symlink back to `.ai/`. **`.ai/` remains the portable source of truth** for rules and skills documented here. If instructions conflict, prefer **`.ai/README.md`** and the files under **`.ai/rules/`** and **`.ai/skills/`**.

## Non-trivial changes

For non-trivial work (multiple files, unfamiliar areas, or complex behavior), follow the **deep understanding** guidance in [`.ai/README.md`](./.ai/README.md) and [`.ai/skills/deep-understanding/SKILL.md`](./.ai/skills/deep-understanding/SKILL.md): research first, write findings to a persistent file (for example `research.md` at the repo root) when appropriate, and align with the user before large implementations.
