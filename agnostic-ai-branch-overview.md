# Agnostic AI branch overview

Branch: `marissahuysentruyt/feat-agnostic-folder-ai-stuff`

---

## The problem this solves

Our AI rules, skills, and agent config previously lived in `.cursor/` — a Cursor-specific directory. That meant everything was coupled to one IDE. Contributors using Claude Code, Gemini CLI, Codex, or any other agent wouldn't reliably find or use the same rules and workflows.

---

## The core idea: `.ai/` as the source of truth

All rules and skills now live in **`.ai/`** — a tool-agnostic, plain-markdown directory that any agent or tool can read. IDE-specific directories (`.cursor/`, `.claude/`) become thin adapters that point back to `.ai/` via symlinks.

- Edit once in `.ai/` → all tools see the update automatically
- No sync step, no duplication, no drift between tools
- New contributors or tools start from `AGENTS.md` at the repo root, which bootstraps everything

---

## What's in `.ai/`

### Rules (`/.ai/rules/`)

Markdown files that enforce consistency. Some apply automatically when matching files are edited; others are invoked on-demand.

- **Stories** — what to document and how to structure Storybook story files
- **CSS styles** — stylelint compliance, copyright year, custom property conventions, media query ordering
- **Branch naming** — `username/type-description[-ticket]` convention
- **Accessibility migration analysis** — required structure and content for per-component a11y docs
- **Contributor docs** — nav script requirements, link validation
- **Jira tickets** — title format, required sections, label validation
- **GitHub descriptions** — PR title and description structure, severity classification
- And more (component README, text formatting, deep understanding, MDX conversion)

### Skills (`/.ai/skills/`)

On-demand playbooks — the agent reads the skill before doing the work. 19 skills total, including:

- **Component migration skills** — 8 phase-by-phase skills covering the full 1st-gen → 2nd-gen migration workflow (prep, setup, API, styling, accessibility, testing, documentation, review) (via a separate branch)
- **Session retrospective** — agent self-documents lessons learned into `.ai/memory/` after corrections or surprising constraints
- **Session handoff** — creates a context snapshot so another session can pick up exactly where this one left off
- **Conventional commits** — enforces the project's commit message format
- **Deep understanding** — requires thorough codebase research before planning or writing code
- **Accessibility compliance**, **test-driven development**, **explain code**, and others

### Memory (`/.ai/memory/`)

Persistent lesson files written by the agent across sessions — non-obvious constraints, tool behaviors, and corrections that would otherwise need to be re-learned from scratch each time.

- `agnostic-lessons.md` — project structure, path quirks, agent tooling behaviors, CI notes
- `css-styling-lessons.md` — learnings from CSS style validation work (badge, divider)

---

## How the symlinks work

```
.ai/rules/*.md          ← canonical source (edit here)

.cursor/rules/*.mdc     ← per-file symlinks (Cursor expects .mdc extension)
.claude/rules/          ← directory symlink → .ai/rules/
.claude/skills/         ← directory symlink → .ai/skills/
```

Cursor gets per-file symlinks because it expects `.mdc` extension. Currently, there's no "auto add a new symlink" if a new rule gets added for Cursor, so those need to be run manually (and perhaps we can mitigate some of this with the AI checks during CI). Claude Code gets directory-level symlinks because it reads `.md` natively. Either way, changes to `.ai/` typically propagate instantly to both.

---

## AGENTS.md files

A new set of `AGENTS.md` files are placed at key locations in the repo tree. These give coding agents immediate context about the purpose and conventions of each directory — without having to read every file.

- Repo root `AGENTS.md` — bootstrap: points to `.ai/`, summarizes where things live
- `2nd-gen/AGENTS.md`, `2nd-gen/packages/core/AGENTS.md`, `2nd-gen/packages/swc/AGENTS.md`
- `1st-gen/AGENTS.md`, `1st-gen/packages/AGENTS.md`, `1st-gen/tools/AGENTS.md`, `1st-gen/projects/AGENTS.md`

---

## Component styling validation script (first draft, NOT final or vetted)

A new Playwright-based script (`2nd-gen/packages/swc/scripts/validate-component-styling.mjs`) validates that a component's actual rendered CSS token values match a `{component}-styling-validation.md` spec file. Run with:

```sh
yarn validate:component-styling -- --badge
yarn validate:component-styling -- --divider
```

Strategy files live in `scripts/styling-validation/strategies/` — adding a new component means adding a strategy and a validation doc. This was an experiment in trying to get an agent to validate proper token usage in the stylesheets.

---

## CI integration

- `yarn lint:ai` runs `.ai/scripts/validate.js`, which checks story tags, AGENTS.md paths, and config schema — catches broken internal links and misconfigured rules before merge
- Pre-commit hook runs the contributor docs nav script to keep breadcrumbs and TOCs in sync automatically

---

## What stays the same

- All component source code, tests, and stories are unchanged by this branch
- Existing Cursor rules still work exactly as before — they're now symlinked rather than authored in `.cursor/`
- No changes to `package.json` dependencies beyond adding the validation script entry

---

## Key takeaway for the team

This branch makes our AI tooling a first-class, shared project asset — not a personal Cursor setup. Any contributor, any agent, any tool can start from `AGENTS.md` and immediately find the rules, skills, and accumulated lessons that keep the codebase consistent.
