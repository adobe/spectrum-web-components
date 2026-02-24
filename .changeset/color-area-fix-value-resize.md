---
'@spectrum-web-components/color-area': patch
---

**Fixed**: Corrected the brightness (`v`) value calculation in `ColorArea` — removed the erroneous `(1 - value)` inversion so that dragging the handle now maps correctly to the HSV brightness axis. Also optimized the `ResizeObserver` callback to call `getBoundingClientRect()` directly instead of iterating over entries, ensuring the component always uses an accurate bounding rect after resize. [#6048](https://github.com/adobe/spectrum-web-components/pull/6048)
