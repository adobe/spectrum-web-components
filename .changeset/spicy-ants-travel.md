---
'@spectrum-web-components/menu': patch
---

Tapping on an `sp-menu-item` was causing the tap event to propagate to an `sp-checkbox` underneath it, resulting in the checkbox being checked unintentionally. The fix involves capturing the `touchend` event on the `sp-menu` to prevent this propagation.
