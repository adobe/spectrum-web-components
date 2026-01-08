---
'@spectrum-web-components/overlay': patch
---

Fixes overlay trigger directive behavior when used with Lit's `cache()` directive. When the trigger element is disconnected and reconnected (as happens with `cache()`), the directive now properly cleans up and recreates the overlay state. On disconnect, the overlay is closed, removed from the DOM, and its reference is cleared from the strategy. This ensures that when the trigger reconnects, a fresh overlay will be created on the next open, preventing stale state and console errors.
