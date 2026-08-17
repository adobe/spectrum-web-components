---
'@adobe/spectrum-wc': patch
---

**fix(\*):** Added explicit `box-sizing: border-box` to `::slotted()` rules that constrain slotted content to a fixed `inline-size`, `block-size`, `aspect-ratio`, or `max-*` size across `<swc-card>`, `<swc-action-button>`, `<swc-button>`, `<swc-infield-button>`, `<swc-tab>`, `<swc-illustrated-message>`, `<swc-icon>`, `<swc-asset>`, and the conversational-ai `<swc-prompt-field>`, `<swc-upload-artifact>`, and `<swc-user-message>` patterns. This prevents slotted elements breaking an aspect ratio or overflowing their container.
