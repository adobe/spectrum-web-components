---
'@adobe/spectrum-wc': patch
---

**fix(prompt-field):** `swc.css` no longer ships an incomplete `@property --swc-prompt-field-brand-color` rule without `syntax` and `inherits` inside `@media (color-gamut: p3)`, which strict CSS minifiers reject. The display-p3 override is now a complete registration.
