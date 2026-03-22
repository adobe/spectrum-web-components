---
'@spectrum-web-components/progress-bar': patch
'@spectrum-web-components/progress-circle': patch
---

**Fixed**: Added `aria-valuetext` attribute to `<sp-progress-bar>` and `<sp-progress-circle>` to provide human-readable percentage values for screen readers. Screen readers now announce "50 percent" instead of just "50", improving accessibility for users with vision disabilities. The attribute uses localized percentage formatting via `Intl.NumberFormat` and updates automatically when progress changes.

**Fixed**: Added `aria-valuemin` and `aria-valuemax` attributes to `<sp-progress-circle>` to align with WAI-ARIA progressbar specification, matching the existing implementation in `<sp-progress-bar>`.
