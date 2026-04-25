---
'@spectrum-web-components/overlay': patch
---

**Fixed**: `receives-focus="false"` on Overlay is now respected for `type="modal"` and `type="page"` overlays. Modals and pages now leave focus on the trigger when receives-focus="false". The focus-trap is still active so Tab/Shift+Tab continue to cycle within the dialog.
