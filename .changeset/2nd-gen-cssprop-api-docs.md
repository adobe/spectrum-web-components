---
'@adobe/spectrum-wc': patch
'@adobe/spectrum-wc-core': patch
---

Fix inaccurate API reference tables for several 2nd-gen components by documenting CSS custom properties and JSDoc property descriptions that were missing from the generated Custom Elements Manifest.

- Added missing `@cssprop` entries: `swc-tabs`/`swc-tab`/`swc-tab-panel` (6 props), `swc-action-button` and `swc-button` (down-state transform, button also gets `max-inline-size`), `swc-close-button` (focus-indicator thickness/gap), `swc-illustrated-message` (10 props covering illustration sizing/color and heading/description typography).
- Added missing `size`/`variant` property descriptions for `swc-button`, `swc-action-button`, `swc-close-button`, `swc-status-light`, and `swc-badge`.

No behavior changes; documentation only.
