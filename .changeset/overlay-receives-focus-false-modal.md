---
'@spectrum-web-components/overlay': patch
---

**Fixed**: `receives-focus="false"` on Overlay is now respected for `type="modal"` and `type="page"` overlays. The focus-trap is now created with `initialFocus: false` when `receives-focus="false"`, so <kbd>Tab</kbd> is still trapped inside the modal but focus is not moved on open.
