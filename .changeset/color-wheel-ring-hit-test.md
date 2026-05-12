---
'@spectrum-web-components/color-wheel': patch
---

**Fixed**: `<sp-color-wheel>` no longer changes its value when the user clicks outside the visible ring. Pointer events on the gradient slot are now constrained by a geometric hit-test against the ring's inner and outer radii, so clicks in the transparent corners of the component's square bounding box or inside the center hole are ignored.
