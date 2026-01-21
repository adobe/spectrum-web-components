---
'@spectrum-web-components/overlay': patch
---

**Fixed**: Modal overlays now properly close when clicking the backdrop, while page overlays correctly remain blocking.

The `modal-backdrop` click handler now correctly distinguishes between overlay types:

- Modal overlays close on backdrop click (light dismiss behavior)
- Page overlays remain blocking and do not close on backdrop click
