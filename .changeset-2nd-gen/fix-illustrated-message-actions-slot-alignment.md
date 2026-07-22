---
'@adobe/spectrum-wc': patch
---

**fix(illustrated-message):** Fixed the `actions` slot content alignment in `<swc-illustrated-message>`.

The `.swc-IllustratedMessage-content` flex container was missing `align-items: center`, causing slotted actions (e.g. a `<swc-button>` or `<swc-button-group>`) to stretch to the container width instead of centering horizontally.
