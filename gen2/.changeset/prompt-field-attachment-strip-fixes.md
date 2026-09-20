---
'@adobe/spectrum-wc': patch
---

**fix(prompt-field):** Attachment-strip fixes for `<swc-prompt-field>`.

- Scroll chevrons now point in opposite directions, use a thinner chevron icon with a translucent (not opaque) background, and are vertically centered on the tile row.
- Clicking empty space in the attachment strip no longer focuses the textarea, and the strip no longer shows a text cursor.
- Single and multiple attachment layouts align horizontally.
- Legal-slot links use the correct typography class.

Also routes the `size="s"` variant's property overrides through private custom properties instead of re-declaring the properties in the variant selector (no visual change).
