---
'@adobe/spectrum-wc': patch
---

Fix the global stylesheet generator collapsing reflected ARIA host attributes (`aria-disabled="true"`, `aria-hidden="true"`, etc.) into a shared, meaningless `--true`/`--false` BEM modifier class — `:host([aria-disabled="true"])` and `:host([aria-hidden="true"])` both produced `.swc-Foo--true`, so styling one affected the other. Reflected ARIA attributes are now emitted as native `[attr="value"]` attribute selectors on the block class instead (e.g. `.swc-ActionButton[aria-disabled="true"]`), matching the attributes the generated global element actually carries at runtime. A related collapse that missed attribute-selector suffixes (`.block[open]`) is also fixed so it folds onto the host selector instead of producing an unreachable descendant selector.
