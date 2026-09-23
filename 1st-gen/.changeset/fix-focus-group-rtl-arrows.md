---
'@spectrum-web-components/reactive-controllers': patch
---

**fix(reactive-controllers):** `FocusGroupController` now mirrors <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> when the host resolves to `dir="rtl"`, so keyboard navigation follows the visual order in components such as `sp-swatch-group`, `sp-radio-group`, `sp-tabs` and `sp-action-group`.
