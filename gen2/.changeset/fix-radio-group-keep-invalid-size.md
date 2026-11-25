---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Radio Group` — Stopped rewriting an invalid `size`, including a different letter case such as `"M"`, to a valid size. The value you set stays on the attribute and property, a development warning names it, and the group renders at the default size. Radios and the necessity icon receive the default size instead of the invalid value, so only the group warns. An empty `size=""` now stays on the attribute and warns too.
