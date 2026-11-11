---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Progress Circle` — Stopped writing a clamped `progress` back to the attribute and property. The value you set is kept, a development warning names an out-of-range value, and the circle and `aria-valuenow` render it clamped to 0–100. Non-numeric markup such as `progress="banana"` is kept instead of being rewritten to `progress="NaN"`, warns, and renders 0%. Fixed a numeric string such as `"50"`, as set by frameworks, rendering as 0%. Removing `static-color` no longer warns.
