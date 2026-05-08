---
'@spectrum-web-components/menu': patch
---

- **Added**: Mobile drill-down navigation for `<sp-menu>` via the `mobile-view` attribute. Submenus replace the current menu content with a back button and the submenu's items instead of opening a flyout overlay, which is friendlier on small screens. Honors `prefers-reduced-motion` for the slide animation, supports localized back labels via `mobile-back-label`, and mirrors the back-arrow icon in RTL.
