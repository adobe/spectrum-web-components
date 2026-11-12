---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Tooltip` — Fixed removing the `variant` or `placement` attribute emitting a development warning. Removing either now resets it to its default (`neutral` or `top`).
