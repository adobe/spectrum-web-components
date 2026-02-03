# Linting tools for the repo

## Executive summary

- Use `ESLint` 9 with flat config (`eslint.config.js`) at the repo root, plus `@typescript-eslint`, `eslint-plugin-lit`, `eslint-plugin-lit-a11y`, `eslint-plugin-wc`, `eslint-plugin-import`, `eslint-plugin-jsdoc`, and `eslint-plugin-simple-import-sort`.
- Use `Stylelint` with `stylelint-config-standard`, `stylelint-order`, and the existing header rule, plus optional token enforcement via `stylelint-declaration-strict-value` for new code only.
- Use `Prettier` as the formatter and remove `eslint-plugin-prettier` from lint runs to keep ESLint fast; keep `eslint-config-prettier` to avoid rule conflicts.
- Keep import sorting in ESLint via `simple-import-sort` to provide stable autofixes and deterministic diffs.
- Gate performance by avoiding type-aware rules by default; enable type-aware linting only in targeted packages or CI.
- Centralize all linting at the repo root and remove package-level configs except for narrow, verified overrides that prevent backwards-compatibility breaks.
- Update all linting packages, plugins, and tools to the latest stable versions as part of the modernization work.

## Current state summary

**Repository scope**

- Root linting runs `lint:2nd-gen` and `lint:1st-gen`, so linting is split across both generations.
- 1st-gen uses `lint-staged` for linting and formatting on staged files.
- 2nd-gen linting runs `eslint 2nd-gen --ext .ts,.js,.json` from the repo root.

**Repo-wide tooling inventory**

| Area | ESLint | Stylelint | Prettier | Config locations |
| --- | --- | --- | --- | --- |
| Root | `eslint@8.57.1` via workspaces | `stylelint@16.24.0` | `prettier@3.6.2` | `.eslintrc.json`, `.stylelintrc.json`, `.prettierrc.yaml` |
| 1st-gen | `eslint@8.57.1` | Uses root | `prettier@3.6.2` | `1st-gen/.eslintrc.json`, `1st-gen/packages/.eslintrc.json`, `1st-gen/tools/.eslintrc.json`, `1st-gen/.prettierrc.yaml` |
| 2nd-gen | `eslint@8.57.1` | Uses root | `prettier@3.6.2` | `2nd-gen/.eslintrc.json`, root `.prettierrc.yaml` |

**Latest stable version policy**

- Update all linting packages, plugins, and tools to the latest stable versions at the time of implementation.
- Record versions in the modernization PR and in the follow-up cleanup PR to keep upgrades auditable.

**Current version gaps (as of this research)**

- ESLint: `8.57.1` in repo, latest stable is `9.x` with flat config defaults.
- Prettier: `3.6.2` in repo, latest stable is `3.8.1`.
- Stylelint: `16.24.0` in repo, latest stable is `17.x`.
- `stylelint-config-standard`: `38.0.0` in repo, latest stable is `40.0.0`.

**2nd-gen**

- ESLint: `2nd-gen/.eslintrc.json` extends `eslint:recommended`, `@typescript-eslint/recommended`, `prettier`, and `lit-a11y`.
- Import sorting: `simple-import-sort` with custom groups.
- A11y: `eslint-plugin-lit-a11y` only, no allow-list in 2nd-gen rules.
- Stylelint: `stylelint-config-standard` with header and custom property pattern, no ordering rules.
- Prettier: Root config only, no CSS overrides.

**1st-gen**

- ESLint: `1st-gen/.eslintrc.json` extends `prettier`, `lit-a11y`, and `require-extensions`.
- Import sorting: `sort-imports` with custom overrides, no `simple-import-sort`.
- A11y: `lit-a11y` with allow-list for click events.
- Stylelint: No 1st-gen specific config (uses root).
- Prettier: Overrides for CSS and `htmlWhitespaceSensitivity: ignore`.

## Comparison of linting options

### ESLint configuration format

| Option | Pros | Cons | Recommendation |
| --- | --- | --- | --- |
| Legacy `.eslintrc` | Works with all current plugins, minimal migration work. | ESLint 9 defaults to flat config; `.eslintrc` is deprecated. | Use only if ESLint 9 is deferred. |
| Flat config | Future-proof, clearer scoping, faster config loading. | Migration cost and plugin verification required. | Recommended now based on the "latest version, accept churn" goal. |

### ESLint 9 migration effort and value

**Current version**: 1st-gen and 2nd-gen both use `eslint@8.57.1` (`1st-gen/package.json`, `2nd-gen/package.json`).

**What it would take**:

- Upgrade ESLint to 9.x in 1st-gen and 2nd-gen and align workspace tools to the same major version.
- Migrate `.eslintrc` files to a flat config (`eslint.config.js`) or add an explicit compatibility path to keep legacy config running.
- Verify all plugins support ESLint 9 and flat config:
  - `@typescript-eslint` config packages and parser updates.
  - `eslint-plugin-lit`, `eslint-plugin-lit-a11y`, `eslint-plugin-wc`, `eslint-plugin-jsdoc`, `eslint-plugin-import`, `eslint-plugin-simple-import-sort`.
  - `jsonc-eslint-parser` and `eslint-plugin-jsonc` for JSON overrides.
- Update lint scripts, editor integrations, and CI to point at the new config format.
- Run lint across 1st-gen and 2nd-gen with the new setup and resolve any rule behavior changes.

**Is it worth it now?**

- **Yes.** The goal is to use the most up-to-date packages and accept churn, with a follow-up PR to fix new lint errors.
- **Recommended timing**: Do the ESLint 9 migration as the first modernization PR, then follow with a repo-wide cleanup PR.
- **Value now**: Aligns the repo with ESLint’s current default, reduces future migration risk, and supports a single, centralized config.

### ESLint plugins

| Plugin | Purpose | Maintenance status | Recommendation |
| --- | --- | --- | --- |
| `@typescript-eslint/eslint-plugin` | TypeScript rules and best practices. | Actively maintained. | Keep and consider adding targeted strict rules. |
| `eslint-plugin-lit` | Lit-specific linting (template/unsafe patterns). | Actively maintained (recent npm releases). | Add to 2nd-gen to cover Lit idioms. |
| `eslint-plugin-lit-a11y` | A11y checks for Lit templates. | Maintained via Open WC; slower cadence but active. | Keep and tune allow-lists as needed. |
| `eslint-plugin-wc` | Web Component specific rules. | Actively maintained. | Add, with Lit base class configuration. |
| `eslint-plugin-jsdoc` | JSDoc and API docs hygiene. | Actively maintained. | Add with a limited, low-noise rule set. |
| `eslint-plugin-import` | Import validation, cycles, and ordering support. | Actively maintained. | Keep for import correctness rules. |
| `eslint-plugin-simple-import-sort` | Deterministic import sorting with autofix. | Actively maintained. | Keep as the import sorter. |

### Import sorting tools

| Option | Pros | Cons | Recommendation |
| --- | --- | --- | --- |
| `simple-import-sort` | Fast, deterministic, good autofix. | Requires group config. | Preferred. |
| `import/order` (eslint-plugin-import) | Widely used, flexible. | Slower, less deterministic with complex groups. | Use only for correctness, not sorting. |
| `sort-imports` (ESLint core) | No extra dependency. | No grouping; limited to members. | Avoid for 2nd-gen. |
| Prettier import sorting plugins | Single tool for formatting. | Adds formatting complexity and conflicts. | Avoid. |

### Stylelint plugins

| Plugin | Purpose | Maintenance status | Recommendation |
| --- | --- | --- | --- |
| `stylelint-config-standard` | Baseline CSS rules. | Actively maintained (official Stylelint config). | Keep as base. |
| `stylelint-order` | Property and rule ordering with autofix. | Actively maintained. | Add with a minimal ordering rule. |
| `stylelint-declaration-strict-value` | Enforce token usage for values. | Actively maintained. | Optional, use for new/changed code only. |
| `stylelint-no-unsupported-browser-features` | Browser support checks. | Actively maintained. | Optional, enable in CI or warnings. |

### Prettier integration

| Option | Pros | Cons | Recommendation |
| --- | --- | --- | --- |
| `plugin:prettier/recommended` | Easy integration, auto-disables conflicting rules. | Runs Prettier inside ESLint, slower lint runs. | Replace with `eslint-config-prettier` only. |
| Prettier as separate formatter | Faster ESLint, clearer responsibility split. | Requires formatting step in CI and editor. | Preferred for speed and tool separation. |

## Proposed configuration approach

### ESLint

**Move to ESLint 9 flat config at the repo root** and remove package-level configs wherever possible.

Core rules and plugins at root:

- Add `eslint-plugin-lit` and `eslint-plugin-wc` with `plugin:wc/recommended`.
- Add `eslint-plugin-jsdoc` with a focused rule set:
  - `jsdoc/check-alignment`
  - `jsdoc/check-indentation`
  - `jsdoc/check-param-names`
  - `jsdoc/require-param-description`
  - `jsdoc/require-returns-description`
- Keep `eslint-plugin-lit-a11y` and add allow-lists only when unavoidable, scoped by file overrides.
- Prefer `simple-import-sort` for ordering and `eslint-plugin-import` for correctness.
- Keep current custom rules in `@spectrum-web-components`.

**Type-aware rules**:

- Do not enable type-aware rules globally.
- Use targeted overrides for key packages or CI-only strict checks if needed.

### Stylelint

Add `stylelint-order` with a minimal rule:

- Start with `order/properties-alphabetical-order: true` for consistency.
- If this is too noisy, scope to new files or opt-in via overrides.

Optional rules:

- `stylelint-declaration-strict-value` for tokens in new CSS only.
- `stylelint-no-unsupported-browser-features` as a warning in CI.

### Prettier

Keep `.prettierrc.yaml` as the formatter.

- Remove `eslint-plugin-prettier` from lint runs.
- Keep `eslint-config-prettier` in ESLint to avoid conflicts.

### Import sorting

Keep ESLint `simple-import-sort` as the single source of truth.

- Do not use Prettier import sorting to avoid conflicts.
- Keep current group ordering to preserve conventions.

### Monorepo-specific needs

- Use a single root `eslint.config.js` and root `.stylelintrc.json`.
- Add `eslint` and `stylelint` cache configs per package to avoid cross-package invalidation.
- Use `lint-staged` for per-file linting on commit, and full linting in CI.

### Where to define linting configuration

**Recommendation**: Centralize all linting at the root and remove package-level configs, except for necessary overrides to preserve existing behavior.

**Why this approach**:

- Ensures the repo lints the same regardless of the working directory.
- Minimizes config duplication and drift.
- Makes it easier to adopt the latest tool versions.

**Potential 1st-gen overrides that should be preserved to avoid breaking behavior**:

- **Tests and stories**: Disable `@spectrum-web-components/document-active-element`, `lit-a11y/no-autofocus`, `lit-a11y/tabindex-no-positive`, and `import/no-extraneous-dependencies` in `*.test.ts`, `*.stories.ts`, and test/benchmark folders.
- **Icons and elements**: Disable `sort-imports` for `**/icons/*.ts` and `**/src/elements/*.ts`.
- **Stories**: Allow `no-console` in `*.stories.ts`.
- **Picker-specific allow-list**: Keep the `lit-a11y/click-events-have-key-events` allow-list including `sp-popover` for `Picker.ts`.
- **JSON config rules**: Keep `jsonc-eslint-parser` and `jsonc/sort-keys` overrides for `*.json` and `package.json`.
- **Header enforcement**: Preserve `notice/notice` for files that require the header template.
- **Require-extensions plugin**: Preserve if still needed for 1st-gen build assumptions.

These overrides can all live in the root flat config with targeted file patterns so package-level configs can be removed.

**Which overrides should be global?**

- **Make global**:
  - `notice/notice` header rule for all source files (requested).
  - JSONC parsing and `jsonc/sort-keys` for `*.json` and `package.json`.
  - Test and story relaxations (`*.test.ts`, `*.stories.ts`, `**/test/**`, `**/benchmark/**`, `**/stories/**`) because these patterns exist across the repo.
  - Allow `no-console` for stories across the repo.

- **Keep scoped**:
  - `Picker.ts` allow-list for `lit-a11y/click-events-have-key-events` (component-specific).
  - `sort-imports` off for `**/icons/*.ts` and `**/src/elements/*.ts` (1st-gen structure).
  - `@typescript-eslint/no-explicit-any` off for `react/**/*.ts` (1st-gen only).
  - `scripts/*` allow `no-console` (root or 1st-gen scripts only).
  - `require-extensions` plugin rules (only if 1st-gen still relies on it).

**Follow-up PR strategy**:

- This PR migrates to ESLint 9 flat config and centralizes rules with minimal behavior changes.
- A follow-up PR enables linting across the entire code base and addresses pre-existing issues in a controlled cleanup pass.

### IDE integration requirements

- Use the ESLint extension with workspace settings and `eslint.workingDirectories` for monorepo packages.
- Use the Stylelint extension for `.css` files with the workspace config.
- Use the Prettier extension as the default formatter, not ESLint.

## Answers to key questions

**Should we use ESLint flat config?**  
Yes. Given the goal to use the latest tools and accept churn, the recommendation is to migrate to ESLint 9 with flat config now and follow with a cleanup PR.

**Do we need custom ESLint rules for component patterns?**  
Yes, but keep them narrow. Retain `@spectrum-web-components` rules and add `eslint-plugin-wc` for Web Component-specific correctness.

**Should import sorting be handled by ESLint or Prettier?**  
ESLint. Use `simple-import-sort` only, and do not add Prettier import sorting to avoid conflicts.

**What JSDoc linting rules should we enforce?**  
Use a minimal, consistency-focused set in `eslint-plugin-jsdoc` (alignment, indentation, param and return descriptions). Avoid heavy requirements for private/internal functions.

**Should we lint CSS property order?**  
Yes, with a minimal alphabetical rule using `stylelint-order`, scoped to new/changed files or warnings first to minimize churn.

**How should we handle monorepo-specific linting needs?**  
Use a single root flat config with targeted overrides for 1st-gen exceptions, maintain cache per package, and use `lint-staged` for quick feedback while keeping CI as the full gate.

## Performance considerations

- Prefer ESLint without type-aware rules for day-to-day development.
- Use `eslint --cache` and `stylelint --cache` in CI and local runs.
- Keep Prettier separate from ESLint to reduce lint run time.
- Use `lint-staged` to run lint only on changed files in pre-commit hooks.

## Migration plan for existing code

1. Update all linting packages, plugins, and tools to the latest stable versions.
2. Upgrade to ESLint 9 and create a root `eslint.config.js`.
3. Move shared rules to the root and delete package-level ESLint configs, preserving required overrides.
4. Introduce `eslint-plugin-wc` and `eslint-plugin-lit` with recommended configs.
5. Add `eslint-plugin-jsdoc` with minimal rule set and limit to public API files first.
6. Add `stylelint-order` as warnings, then flip to errors after clean-up.
7. Optionally add `stylelint-declaration-strict-value` for tokens in new files only.
8. Document allow-lists for `lit-a11y` per component as needed.

## Estimated effort

- ESLint plugin additions and config updates: 1 to 2 days.
- Stylelint ordering and optional token rules: 1 to 2 days.
- Cleanup and autofix passes: 2 to 4 days depending on churn.
- CI and lint-staged updates: 0.5 to 1 day.

## Review and approval checklist

- [ ] Review and approve by two engineers.
- [ ] Validate tool compatibility in at least one 2nd-gen package.
- [ ] Confirm performance impact stays within current lint times.
- [ ] Confirm recommendations work for both human and AI contributors.
