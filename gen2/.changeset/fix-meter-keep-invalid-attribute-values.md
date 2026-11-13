---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Meter` — Stopped rewriting an invalid `variant` to `informative`. The value you set stays on the attribute and property, a development warning names it, and the fill renders in the default informative color.
