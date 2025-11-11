---
'@spectrum-web-components/overlay': patch
---

Sets this.listenerHost = this.target in overlay-trigger-directive’s overridden update() when a listenerHost is not already defined. This prevents type errors during the reconnected flow when listenerHost is required but unset.
