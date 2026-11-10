---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Thumbnail` — Stopped rewriting an invalid `size` or `fit` to its default. The value you set stays on the attribute and property, a development warning names it, and the thumbnail renders at the default size and fit.
