---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**chore(deps):** Update runtime dependencies to their latest versions: `@floating-ui/dom` 1.8.0, `@lit-labs/observers` 2.1.0, and `colorjs.io` 0.7.1. `colorjs.io` 0.6 and later represents `none` coordinates (for example, the hue of an achromatic color) as `null` instead of `NaN`, so `ColorController#hue` now returns `0` instead of `NaN` for grays.
