---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Divider` — Stopped rewriting an invalid `size`, including a different letter case such as `"M"`, to a valid size. The value you set stays on the attribute and property, a development warning names it, and the divider renders at the default size. An empty `size=""`, which was rewritten to the default, now stays on the attribute and warns too.
