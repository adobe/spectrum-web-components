---
'@adobe/spectrum-wc': patch
---

**Migrate the `swc-suggestion-item` button to compose `<swc-button variant="secondary">` instead of a bespoke native `<button>`.**

- The button now inherits `swc-button` secondary button's state colors, focus ring, and press animation
- Public API is unchanged
- Adds VRT coverage for `swc-suggestion-group` (heading composition, hidden-title case, multi-button wrapping, RTL).
