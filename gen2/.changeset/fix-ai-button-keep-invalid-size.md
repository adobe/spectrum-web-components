---
'@adobe/spectrum-wc': patch
---

**fix(ai-button):** Stopped rewriting an invalid `size` on `<swc-ai-button>`, including the unsupported `s` and a different letter case such as `"M"`, to `m`. The value you set stays on the attribute and property, a development warning names it, and the button renders at the default medium size.
