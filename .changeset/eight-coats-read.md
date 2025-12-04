---
'@spectrum-web-components/overlay': patch
---

Guards `OverlayTriggerDirective`'s `reconnected()` implementation so it only calls `init()` after an overlay instance exists. This prevents type errors during the reconnected flow when `listenerHost` would otherwise be unset because the overlay is not yet ready.
