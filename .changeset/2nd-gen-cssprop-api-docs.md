---
'@adobe/spectrum-wc': patch
'@adobe/spectrum-wc-core': patch
---

Fix inaccurate API reference tables for several 2nd-gen components by documenting CSS custom properties and JSDoc property descriptions that were missing from the generated Custom Elements Manifest.

- Added missing `@cssprop` entries: `swc-tabs`/`swc-tab`/`swc-tab-panel` (6 props), `swc-action-button` and `swc-button` (down-state transform, button also gets `max-inline-size`), `swc-close-button` (focus-indicator thickness/gap), `swc-illustrated-message` (10 props covering illustration sizing/color and heading/description typography).
- Added missing `size`/`variant` property descriptions for `swc-button`, `swc-action-button`, `swc-close-button`, `swc-status-light`, and `swc-badge`.
- Fixed the Tabs docs page rendering only `swc-tabs`'s API table; `swc-tab` and `swc-tab-panel` (the other two elements of the three-element component) now get their own API tables too, matching the pattern already used by Accordion.

No component runtime changes; documentation and Storybook docs-page rendering only.
