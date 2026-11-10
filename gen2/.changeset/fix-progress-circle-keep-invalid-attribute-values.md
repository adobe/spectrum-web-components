---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Progress Circle` — Stopped writing a clamped `progress` back to the attribute and property. The value you set is kept, a development warning names an out-of-range value, and the circle and `aria-valuenow` render it clamped to 0–100.
