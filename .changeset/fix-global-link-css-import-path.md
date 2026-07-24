---
'@adobe/spectrum-wc': patch
---

Fix the broken `@import` in the published `global-link.css`. The build flattens all stylesheets into `dist/` root, but `global-link.css` shipped with `@import url("../link.css")` (relative to its source subfolder), which pointed one directory above `dist/` and failed to resolve for consumers of `@adobe/spectrum-wc/global-link.css`. Local `@import` targets are now rewritten to sibling references (`./link.css`) during the flatten.
