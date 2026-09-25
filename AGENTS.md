# Agent instructions

`.ai/` is the canonical, tool-agnostic source for this repository's AI rules, skills, and lessons. Coding agents read it through native discovery paths, symlinks, and generated files, so there's nothing to load by hand. See [`.ai/README.md`](./.ai/README.md) for the catalog and the authoring guide, and [`.ai/ai-system.html`](./.ai/ai-system.html) for a visual overview.

## Where things live

| What                   | Location                                                              | How tools load it                                                 |
| ---------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Always-on instructions | `AGENTS.md` files (this one, plus nested ones in `gen2/`, `1st-gen/`) | Read directly; the nearest one applies to the directory you're in |
| Path-scoped rules      | [`.ai/rules/`](./.ai/rules/)                                          | Loaded when a matching file is in context                         |
| Lessons learned        | [`.ai/memory/`](./.ai/memory/)                                        | Loaded as path-scoped instructions                                |
| Skills                 | [`.ai/skills/`](./.ai/skills/) (`<name>/SKILL.md`)                    | Loaded when a task matches a skill's description, or by name      |
| Generated tool copies  | `.github/instructions/`, `.cursor/rules/`                             | Written by `yarn ai:sync`; never edit these                       |

Edit only `.ai/` sources. The pre-commit hook runs `yarn ai:sync`; run `yarn lint:ai` before you push.

## Conventions

- **Branch names:** follow the `branch-naming` skill (`<username>/<type>-<description>[-swc-<issue>]`). Branches that the Copilot app creates for its own sessions are exempt.
- **Commits:** conventional commits with a lowercase subject, enforced by commitlint. See the `conventional-commit` skill.

## Non-trivial changes

For non-trivial work (multiple files, unfamiliar areas, or complex behavior), follow the [`deep-understanding`](./.ai/skills/deep-understanding/SKILL.md) skill: research first, write findings to a persistent file (for example `research.md` at the repo root) when appropriate, and align with the user before large implementations.
