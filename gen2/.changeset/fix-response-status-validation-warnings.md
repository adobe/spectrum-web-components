---
'@adobe/spectrum-wc': patch
---

`Response Status` — Added development warnings for an invalid `loader` or `status` on `swc-response-status` and an invalid `status` on `swc-response-status-step`. The values stay as set, and the component renders the `mega` loader and `active` status. Removing `loader` or `status` resets it to its default without a warning.
