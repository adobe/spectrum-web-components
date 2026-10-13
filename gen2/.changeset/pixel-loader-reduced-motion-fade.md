---
'@adobe/spectrum-wc': patch
---

**fix(pixel-loader):** `<swc-pixel-loader>`'s `prefers-reduced-motion: reduce` state now fades the whole grid in and out together instead of revealing it row by row, so the reduced-motion cadence reads as a single fade rather than a staggered build.
