---
'@spectrum-web-components/picker': patch
---

**Fixed**: Changed `composed` from `true` to `false` on the synthetic `scroll` event dispatched by the Picker's internal scroll handler. This prevents the event from crossing shadow DOM boundaries, which under certain edge cases could cause ancestor scrollable containers (e.g., overlays or popovers) to close unexpectedly when scrolling within the Picker's menu.
