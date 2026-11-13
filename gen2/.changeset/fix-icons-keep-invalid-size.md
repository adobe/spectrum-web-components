---
'@adobe/spectrum-wc-icons': patch
---

**fix(icons):** Stopped rewriting an invalid `size` on workflow icons, including a different letter case such as `"M"`, to a valid size. The value you set stays on the attribute and property, a development warning names it, and the icon renders at the default size. An empty `size=""`, which was rewritten to the default, now stays on the attribute and warns too.
