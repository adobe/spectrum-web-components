---
'@spectrum-web-components/slider': patch
---

**Fixed**: Improved accessibility for multi-handle sliders per WCAG 3.3.2 (Labels or Instructions):

- Added value tooltips that appear on hover/focus for multi-handle sliders when value labels are hidden (`label-visibility="none"` or `label-visibility="text"`)
- Tooltips now display the formatted value for each handle, ensuring users can identify individual handle values
- Added high contrast mode support for value tooltips
- Added debug warning when multi-handle sliders are missing `label` attributes on handles
