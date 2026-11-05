---
'@adobe/spectrum-wc': minor
---

**feat(prompt-field):** Make the `collapsed` attribute on `<swc-prompt-field>` public, and restyle the collapsed layout as a compact single-row pill.

- The collapsed field is now 56px tall with fully rounded ends, tighter block padding, and a smaller gap between the text and the inline send/stop button. The outer gradient ring follows the same shape.
- The placeholder truncates to one line with an ellipsis; typed text still wraps and grows the field.
- Attachments stay visible in the collapsed field, with tighter spacing above the strip that still leaves room for the dismiss buttons' focus ring.
- Toggling `collapsed` animates the padding and corner radius together with the action bar.
