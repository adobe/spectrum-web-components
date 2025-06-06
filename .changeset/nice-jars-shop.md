---
'@spectrum-web-components/card': minor
---

**Fixed**: On mobile Chrome (both Android and iOS), scrolling on `sp-card` components would inadvertently trigger click events. This was caused by the timing-based click detection (200ms threshold) in the pointer event handling, which could misinterpret quick scrolls as clicks. This issue did not affect Safari on mobile devices.
