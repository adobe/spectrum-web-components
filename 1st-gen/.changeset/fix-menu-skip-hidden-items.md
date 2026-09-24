---
'@spectrum-web-components/menu': patch
---

**fix(menu):** Fixed keyboard navigation in `sp-menu` landing on `sp-menu-item` elements that have the `hidden` attribute. Hidden items are now skipped the same way disabled items are, including when pressing ArrowDown from the back row in the mobile drill-down view.
