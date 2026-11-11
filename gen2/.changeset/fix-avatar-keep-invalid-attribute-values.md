---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Avatar` — Stopped rewriting an invalid `size` to `100`. The value you set stays on the attribute and property, a development warning names it, and the avatar renders at the default size. Invalid markup such as `size="banana"` is no longer rewritten to `size="NaN"`. A numeric string such as `"200"`, as set by frameworks, no longer warns; the property returns it as set.
