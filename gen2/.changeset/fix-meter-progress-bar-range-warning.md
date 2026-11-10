---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Meter`, `Progress Bar` — Added a development warning when `min-value` is greater than `max-value` or either bound is not a number. Both values stay as set, and the bar renders the corrected range.
