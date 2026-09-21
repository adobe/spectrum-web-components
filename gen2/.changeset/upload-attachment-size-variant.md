---
'@adobe/spectrum-wc': minor
---

**feat(upload-attachment):** Added a `size` attribute (`s`/`m`/`l`, default `m`) to `<swc-upload-attachment>` for `type="media"` tiles, sizing them to 48/64/96px. `type="card"` is unaffected; it remains a single size.

`<swc-prompt-field>`'s attachment strip and scroll chevrons now track its own `size` attribute: at `size="s"` the attachment tiles, chevron buttons, and the edge-fade/scroll-padding calculations all shrink to match.
