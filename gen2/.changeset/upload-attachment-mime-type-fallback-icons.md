---
'@adobe/spectrum-wc': minor
---

**feat(upload-attachment):** Added a `mime-type` attribute to `<swc-upload-attachment>` for fallback icons.

When set and no content is slotted into `thumbnail`, renders a matching icon based on the MIME type: `audio/*` shows an audio wave icon, `video/*` shows a play icon, `image/*` shows an image icon, `text/*` shows a file-text icon, and anything else falls back to a generic file icon. Mirrors React Spectrum's `AttachmentPreview` fallback behavior.
