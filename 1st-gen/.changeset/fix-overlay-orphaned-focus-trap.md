---
'@spectrum-web-components/overlay': patch
---

**fix(overlay):** Do not activate a stale focus trap while a modal overlay is opening.

Previously, a modal overlay could create a focus trap after it was closed, reopened, or removed during a longpress while opening. That orphaned trap could then block later clicks elsewhere on the page. Each open or close operation now stops if a newer operation starts, and the overlay creates a focus trap only while it is connected.
