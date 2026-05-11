# Lessons learned

Accumulated lessons from working sessions on this project. Grouped by category. Update in place — do not append chronologically.

---

## File operations

- **Edit tool requires a prior read**: The Edit tool fails with "file not read yet" if the file wasn't read in the current conversation, even if you wrote it in the same session. Read every file you plan to edit before starting work.
- **Parallel edits can fail with "modified since read"**: When editing multiple files in the same batch, if one edit changes the file order or content, subsequent edits in the same pass may fail. Re-read the file and retry individually.

---

## Path resolution

- **`2nd-gen/packages/swc/AGENTS.md` is 3 levels deep**: Relative paths from this file need `../../../` to reach the repo root — not `../../`. Wrong: `../../linters/foo.js`. Correct: `../../../linters/foo.js`.
- **Symlink removal with `rm`**: `rm` on a symlink removes only the pointer, not the target directory or files. Safe to use when cleaning up a symlink.
- **Git stores symlinks as text blobs**: Staged symlinks appear as the raw target path string in the index, not the resolved content. This is why Cursor shows "Apply Manually" on staged symlink files — it reads the index, not the filesystem.

---

## Project structure

- **Root `package.json` has `"type": "module"`**: All `.js` scripts in this repo use ESM `import`/`export` syntax. Write new scripts with `import`, not `require`.
- **`linters/` is at the repo root**: The `stylelint-property-order.js` and ESLint plugin live at `linters/`, not inside `2nd-gen/` or `1st-gen/`.
- **`.ai/memory/` is the persistent lessons store**: Lessons and cross-session notes belong here, not in session-handoff documents or code comments.

---

## Component patterns

- **`.internal.stories.ts` files don't need `migrated` tag**: Files named `*.internal.stories.ts` (e.g. `icon.internal.stories.ts`) are dev-only and are exempt from the `tags: ['migrated']` requirement on the meta object.
- **`utility` is a valid meta tag**: The `typography` component uses `tags: ['migrated', 'utility']` on its meta — `utility` is a legitimate tag alongside `migrated`.

---

## Agent tooling

- **Claude Code does not auto-discover `SKILL.md` files**: Skills must be explicitly loaded via `AGENTS.md` context or manual invocation. There is no automatic glob-based discovery.
- **Per-file symlinks allow different extensions**: `.cursor/rules/*.mdc` can symlink to `.ai/rules/*.md` — this lets Cursor find its expected `.mdc` format while the canonical source stays as `.md`.
- **Cursor reads the git index for staged symlinks**: At commit time Cursor sees the symlink path string, not the resolved content, so rules appear as "Apply Manually". At runtime on the filesystem, symlinks resolve correctly.

---

## Documentation

- **Contributor migration-analysis markdown**: Prefer plain sentences with backticks for roles, elements, and code. Bold is fine sparingly for scanning cues; follow `accessibility-migration-analysis` skill (≈30% cap on bold markup for body prose, single spans for multi-word emphasis).

---

## CI / build

- **`yarn lint:ai` runs the AI tooling validator**: `node .ai/scripts/validate.js` checks story tags, AGENTS.md paths, and config schema. Run it locally before pushing with `yarn lint:ai`.
- **Validator found a real broken link on first run**: The `2nd-gen/packages/swc/AGENTS.md` path to `stylelint-property-order.js` was genuinely wrong — the CI check is worth running even on mature files.
