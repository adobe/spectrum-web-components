---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-icons': patch
---

- **Updated**: Component hosts now match their rendered box in flex and grid parents. Centering no longer collapses a divider, progress bar, or drop zone, and a taller sibling no longer stretches buttons, badges, status lights, or other inline components. Avatar, badge, status light, tab, and progress circle no longer set `place-self`, so they follow the parent's alignment; set `place-self: center` on a progress circle to keep it centered in a flex or grid parent. AI toolkit patterns are unchanged.
- **Updated**: Outside flex and grid parents, `<swc-action-group>`, `<swc-progress-bar>`, `<swc-meter>`, `<swc-avatar>`, and `<swc-progress-circle>` are now block-level instead of inline, so avatars and progress circles stack in block flow instead of sitting side by side. Button, action button, close button, and status light now align to the text baseline instead of `vertical-align: top` or `middle`. Set `vertical-align` on the host to restore the previous alignment.
- **Updated**: `<swc-icon>` and the workflow icons are now `display: inline-block` and no longer shrink in a flex row.
- **Added**: `--swc-divider-minimum-inline-size` and `--swc-divider-minimum-block-size` on `<swc-divider>`.
- **Removed**: `--swc-accordion-min-inline-size`. Set `min-inline-size` on `<swc-accordion>` instead.
