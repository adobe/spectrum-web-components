---
'@spectrum-web-components/overlay': patch
---

**Fixed**: Overlay positioning on iOS Safari and WKWebView hosts (such as the Adobe Express iOS app). Popovers opened via `Overlay.open()` or the `trigger` Lit directive previously rendered `visualViewport.offsetTop` pixels (typically 30-40 px) below their trigger when the layout viewport diverged from the visual viewport — for example with the URL bar showing, with pinch-zoom, with the virtual keyboard open, or when a host app overlaid a bottom sheet.

`PlacementController` now subtracts `visualViewport.offsetLeft / offsetTop` from the computed coordinates on WebKit (where the popover top layer paints relative to the visual viewport), and subscribes to `visualViewport`'s `resize` and `scroll` so an open overlay re-anchors to its trigger when the viewports realign. Other browsers are unaffected.
