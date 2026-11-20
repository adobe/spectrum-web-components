---
'@adobe/spectrum-wc': patch
---

**fix(prompt-field):** Added a development warning for an invalid `size` on `<swc-prompt-field>`, including a different letter case such as `"S"`. The value stays on the attribute and property, the field renders at the default size, and its action buttons receive the default size instead of the invalid value. An empty `size=""` warns too. Removing `size` resets it to `m` without a warning.
