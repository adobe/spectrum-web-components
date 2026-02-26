---
'@spectrum-web-components/color-area': patch
---

**Fixed**: Corrected the brightness (`v`) value calculation in `ColorArea` — removed the erroneous `(1 - value)` inversion so dragging the handle maps correctly to the HSV brightness axis. Introduced `getContentBoundingRect()` to compute the content-box rect in viewport coordinates (excluding the element's border), used consistently in `handlePointerdown`, `firstUpdated`, and the `ResizeObserver` callback. This ensures pointer-to-handle mapping is geometrically accurate and the handle centre correctly superimposes with the gradient corners at the extremes. [#6048](https://github.com/adobe/spectrum-web-components/pull/6048)
