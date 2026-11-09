---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(popover, menu):** Fixed `<swc-popover>` and `<swc-menu>` keeping their inline position styles after they closed, and dispatching `swc-after-close` before the exit fade finished when they were closed during their entrance animation. No consumer action required.

The inline `top`, `left`, and `translate` and the `--swc-placement-available-*` custom properties (and the popover tip's inline `top`, `left`, and `translate`) stayed on the closed surface until the next open overwrote them. They're now removed once the close transition finishes, the same as `<swc-tooltip>`. Closing during the entrance cancelled the entrance transition, and that cancel was treated as the end of the close.
