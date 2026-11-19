---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Meter`, `Progress Bar` — Added a development warning when `min-value` is greater than `max-value`, when either bound is not a number, or when `value` is not a number. The values stay as set, and the bar renders the corrected range and value. Non-numeric markup such as `value="banana"` is no longer rewritten to `value="NaN"`. Fixed numeric strings such as `"50"`, as set by frameworks, rendering as 0. Removing `value`, `min-value`, `max-value`, `label-position`, or `static-color` now resets it to its default without a warning.
