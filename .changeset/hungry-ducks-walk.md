---
'@spectrum-web-components/menu': patch
---

**Fixed**: `sp-menu` now stops propagation of arrow key events when navigating between menu items. This prevents unintended side effects in layouts or applications that also listen for arrow key events.
