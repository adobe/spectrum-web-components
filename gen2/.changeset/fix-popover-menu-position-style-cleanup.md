---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(popover, menu):** `<swc-popover>` and `<swc-menu>` now remove their inline position styles once the close transition finishes, the same as `<swc-tooltip>`.

The inline `top`, `left`, and `translate` and the `--swc-placement-available-*` custom properties written while the surface was open, and the popover tip's inline `top`, `left`, and `translate`, used to stay on the closed surface until the next open overwrote them.
