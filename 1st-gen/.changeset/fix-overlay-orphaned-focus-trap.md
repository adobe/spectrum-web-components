---
'@spectrum-web-components/overlay': patch
---

**fix(overlay):** Do not leave an orphaned focus trap after a modal overlay closes, reopens, or is removed while opening.

Previously, a modal overlay could create its focus trap after it closed or was removed during the lazy `focus-trap` import. It could also replace an active trap without deactivating it when opening restarted. The orphaned trap then blocked later clicks elsewhere on the page. The overlay now creates a trap only while it is still open and connected, and reuses its existing trap when opening restarts.
