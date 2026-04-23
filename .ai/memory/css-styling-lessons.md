# CSS Styling Lessons

## Component patterns

**CSS selector syntax — class vs. attribute:** `:not([.swc-Badge--no-label])` uses attribute selector syntax on a class name and always evaluates false; the correct form is `:not(.swc-Badge--no-label)`. When writing negation or `:has()` selectors, use `.class` for BEM modifiers, never `[.class]`.

**Check that every custom property is actually consumed:** Setting `--swc-badge-padding-inline-start` in a `:has()` rule is a silent no-op if the base rule uses `padding-inline` shorthand — the property is never read. Before flagging a missing override as a bug, trace the full consumption path from where the property is set to where it is used.

**Prefer `padding-inline` shorthand when both edges share the same value:** Splitting into `padding-inline-start`/`padding-inline-end` forces every size override block to set two properties instead of one. Keep the shorthand and use a single override hook (`--swc-badge-padding-inline`) that size blocks can update in one line; asymmetric start-edge logic can override `--swc-badge-padding-inline-start` in the fallback chain.

**Fallback chains can propagate size overrides without duplicating properties:** `padding-inline-start: calc(var(--swc-badge-padding-inline-start, var(--swc-badge-padding-inline, token(...))))` means size overrides only need to set `--swc-badge-padding-inline` and both edges stay in sync, while a `:has()` rule can still override the start edge independently via `--swc-badge-padding-inline-start`.

**Fix proposals must account for all variant states:** A fix that adds a property to size override blocks may break the icon state if that same property is already being set to a different value by a `:has()` rule. Think through the full set of states (no icon, with icon, icon-only) before proposing a change.

## CI / build

**commitlint in this project enforces lowercase subjects:** The `subject-case` rule forbids sentence-case, start-case, pascal-case, and upper-case. Commit subjects must start with a lowercase letter — `fix(badge): correct fallbacks...` not `fix(badge): Correct fallbacks...`.

**Stylelint/prettier rewrites files substantially after commits:** The linter hook may revert manual splits back to shorthands, change default scale tokens, or remove entire CSS patterns. Always re-read the file after a commit before writing memory or validation docs — the on-disk state may differ significantly from what was written.

## File operations

**Update memory/validation docs after linter runs:** If a linter rewrites a component CSS file, any memory files or validation docs written before the lint run may describe a state that no longer exists. Re-read the source file and correct the docs in the same session before context is lost.
