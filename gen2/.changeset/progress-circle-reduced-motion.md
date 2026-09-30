---
'@adobe/spectrum-wc': patch
'@adobe/spectrum-wc-core': patch
---

**fix(progress-circle):** Replaced the `animation: none` reduced-motion override on `<swc-progress-circle>`'s indeterminate state with a slowed, single-rotation animation driven by custom properties (`--swc-progress-circle-rotate-start`, `--swc-progress-circle-rotate-end`, `--swc-progress-circle-dashoffset-30`), so `prefers-reduced-motion: reduce` still conveys progress without the distracting spin.
