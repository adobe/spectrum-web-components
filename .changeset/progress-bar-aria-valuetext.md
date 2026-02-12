---
'@spectrum-web-components/progress-bar': patch
---

**Fixed**: Added `aria-valuetext` attribute to `<sp-progress-bar>` to provide human-readable percentage values for screen readers. Screen readers now announce "50 percent" instead of just "50", improving accessibility for users with vision disabilities. The attribute uses localized percentage formatting via `Intl.NumberFormat` and updates automatically when progress changes.
