---
'@adobe/spectrum-wc': major
---

`User message`: BREAKING: Added grouped card and media attachment layouts with wrapping and native scrolling. Removed the message-level `title` and `subtitle` slots while preserving `type="copy"` as the default. Consumer action: move attachment titles and subtitles into nested `<swc-upload-attachment>` tiles, and render prompt text in a separate `<swc-user-message>` within the same `<swc-conversation-turn type="user">`.
