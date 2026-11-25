---
"@spectrum-web-components/slider": patch
---

Fixed `<sp-slider>` change events reporting values outside the current bounds when the bounds changed during dragging. This included multi-handle sliders with previous/next constraints.
