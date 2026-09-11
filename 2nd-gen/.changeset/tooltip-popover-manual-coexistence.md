---
'@adobe/spectrum-wc': patch
'@adobe/spectrum-wc-core': patch
---

Tooltip now uses `popover="manual"` instead of `popover="auto"`. Opening a tooltip on hover no longer light-dismisses an open `<swc-popover>` (or menu, picker, or select); a hover tooltip and an open popover coexist in both directions. Escape and close-on-leave are handled internally, so no dismissal behavior is lost. Tooltip also joins the shared dismissible stack, so when a tooltip is open on top of a popover, Escape closes only the tooltip first and leaves the popover open; a second Escape closes the popover.
