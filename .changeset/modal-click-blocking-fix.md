---
'@spectrum-web-components/overlay': minor
---

**Fixed**: Modal and page overlays now properly block external clicks, restoring the expected modal interaction pattern while maintaining the performance benefits of `showPopover()`.

After migrating from `dialog.showModal()` to `dialog.showPopover()` in v1.7.0, modal overlays no longer prevented clicks on elements outside the overlay. This fix manually implements the click-blocking functionality by intercepting pointer and click events in the capture phase and blocking external clicks using `event.composedPath()` to detect if clicks originate inside modal dialogs.
