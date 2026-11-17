---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Tabs` — Stopped rewriting an invalid `direction`, `density`, or `keyboard-activation` to its default. The value you set stays on the attribute and property, a development warning names it, and the tabs render with the default. An invalid `direction` no longer hides the selection indicator.
