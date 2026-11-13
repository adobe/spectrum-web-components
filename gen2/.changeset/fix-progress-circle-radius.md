---
'@adobe/spectrum-wc': patch
---

**fix(progress-circle):** Fixed the `<swc-progress-circle>` rings so their outer edge always meets the edge of the circle. The ring radius now comes from the same thickness that draws the stroke. Before, the radius came from a fixed value per size, so `size="m"` and `size="l"` rings sat up to 1px inside the edge, and a `--swc-progress-circle-thickness` override changed the stroke but not the radius, so thicker rings were clipped. Thicker rings now grow inward, so the circle keeps its size. Set `--swc-progress-circle-thickness` to a length, such as `4px`. A unitless number, which the stroke accepted before, now hides the rings.
