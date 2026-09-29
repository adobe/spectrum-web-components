---
'@spectrum-web-components/overlay': patch
---

**fix(overlay):** Do not activate a focus trap after a modal overlay closes while opening.

Previously, closing or disconnecting a modal overlay while the `focus-trap` module was loading could still create and activate its trap. That orphaned trap then blocked later clicks elsewhere on the page. The overlay now checks its open state again after loading the module.
