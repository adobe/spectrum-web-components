---
'@spectrum-web-components/table': patch
---

**Fixed**: Fixed accessibility violation (WCAG 4.1.2) where table checkbox inputs were missing accessible labels. The axe DevTools "Form elements must have labels" error is now resolved. The fix sets `aria-label` directly on the checkbox's internal input element.
