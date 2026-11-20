---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-icons': patch
---

- **Updated**: Component hosts now match their rendered box in flex and grid parents. Centering no longer collapses a divider, progress bar, or drop zone, and a taller sibling no longer stretches buttons, badges, status lights, or other inline components.
- **Updated**: `<swc-icon>` and the workflow icons are now `display: inline-block` and no longer shrink in a flex row.
- **Added**: `--swc-divider-minimum-inline-size` and `--swc-divider-minimum-block-size` on `<swc-divider>`.
- **Removed**: `--swc-accordion-min-inline-size`. Set `min-inline-size` on `<swc-accordion>` instead.
