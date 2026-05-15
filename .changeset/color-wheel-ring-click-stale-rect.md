---
'@spectrum-web-components/color-wheel': patch
---

- **Fixed**: Clicks on the `<sp-color-wheel>` ring no longer intermittently fail after scrolling or layout shifts. The cached bounding rect used for the ring hit-test is now refreshed on every gradient `pointerdown`, so viewport-relative coordinates stay in sync with the wheel's current on-screen position.
