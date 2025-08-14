---
'@spectrum-web-components/menu': minor
---

**Fixed** : Fix iPad scrolling issue in picker dropdown where scrolling through menu items would accidentally select the first touched item and close the picker.

The fix implements touch gesture detection to distinguish between scrolling and selection. Added `isScrolling` getter for public API access. Test on iPad devices with long menus to validate scrolling behavior and selection accuracy.
