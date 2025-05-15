---
'@spectrum-web-components/overlay': major
---

**Fixed** : Overlays (like pickers and action menus) were incorrectly closing when scrolling occurred within components. The fix ensures the `handleScroll` method in `OverlayStack` only responds to document/body scrolling events and ignores component-level scrolling events, which was the original intention.
