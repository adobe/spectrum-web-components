---
'@adobe/spectrum-wc': patch
---

Fix the `swc-prompt-field` multi-attachment strip so a classic (space-consuming) horizontal scrollbar no longer draws over the bottom edge of the artifact tiles. The scroll container now reserves scrollbar room with `scrollbar-gutter: stable`, which has no effect where scrollbars are overlay.
