---
'@spectrum-web-components/reactive-controllers': patch
---

Add IS_TOUCH_DEVICE media query constant

- Added IS_TOUCH_DEVICE constant: '(hover: none) and (pointer: coarse)'
- Detects any touch-capable device regardless of screen size
- Unlike IS_MOBILE (max-width: 743px), this matches iPads and all tablets
