---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Text Field` — Stopped rewriting an invalid `size`, including a different letter case such as `"M"`, to a valid size. The value you set stays on the attribute and property, a development warning names it, and the field renders at the default size. Its icons and prefix avatar receive the default size. An empty `size=""`, which was rewritten to the default, now stays on the attribute and warns too.
