---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Avatar` — Stopped rewriting an invalid `size` to `100`. The value you set stays on the attribute and property, a development warning names it, and the avatar renders at the default size.
