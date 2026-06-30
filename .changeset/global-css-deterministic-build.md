---
'@adobe/spectrum-wc': patch
---

**fix(global-css):** generated `global-*.css` files are now byte-stable across builds.

The `vite-global-elements-css` plugin ran a best-effort `stylelint --fix` on each generated file to reorder properties. That subprocess ignored its exit code and swallowed errors, so when it was skipped (binary not found, or killed under parallel-build load) the raw, unordered output was written instead, leaving the checked-in files modified after a local build. The reorder is removed; the directory is already `.stylelintignore`'d, so property order on these do-not-edit, machine-generated files is unenforced and functionally irrelevant (the cascade is unaffected and duplicate declarations are already deduped during generation). Output is now deterministic.
