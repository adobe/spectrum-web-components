---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Accordion` — Stopped rewriting an invalid `size`, including a different letter case such as `"M"`, to a valid size. The value you set stays on the attribute and property, a development warning names it, and the accordion renders at the default size. Items receive the default size instead of the invalid value. An empty `size=""`, which was rewritten to the default, now stays on the attribute and warns too.
