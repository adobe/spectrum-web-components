---
'@spectrum-web-components/overlay': patch
'@spectrum-web-components/picker': patch
---

**Fixed** issue where picker menus inside overlays could not scroll to the bottom after selecting an item and reopening. The problem was caused by the overlay's placement calculation happening before the menu fully rendered, resulting in incorrect height measurements.

This fix ensures picker menus maintain proper scrollable height when reopened, regardless of the selected item's position.
