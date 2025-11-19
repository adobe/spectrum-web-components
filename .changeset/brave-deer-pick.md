---
'@spectrum-web-components/picker': patch
---

Fix iPad menu item click events not working

- Changed from isMobile to isTouchDevice for shouldSupportDragAndSelect property
- Fixes issue where menu items in action menus on iPad/tablets would not dispatch click events
- All touch devices (including iPads with screen widths >743px) now correctly use click events instead of drag-and-select behavior
