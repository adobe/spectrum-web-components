---
'@adobe/spectrum-wc': patch
---

**fix(prompt-field):** Attachment-strip fixes for `<swc-prompt-field>`.

- Scroll chevrons now point in opposite directions, use a thinner chevron icon with a translucent (not opaque) background, and are vertically centered on the tile row.
- Clicking empty space in the attachment strip no longer focuses the textarea, and the strip no longer shows a text cursor.
- Single and multiple attachment layouts align horizontally.
- Legal-slot links use the correct typography class.
- The attachment strip no longer snaps to tile edges while scrolling, and no longer shows a scrollbar.
- Where scroll-driven animations are supported, edge fades and chevrons follow the scroll position, as in React Spectrum: they come in as soon as the strip moves, and the chevrons are never shown as disabled, instead of updating after the scroll settles.
- Chevron paging no longer skips a tile: `>` moves the tile that is partly hidden at the trailing edge to the start, and `<` does the same in reverse. It also keeps moving when a tile is wider than the space between the chevrons.
- The last tile's dismiss button focus ring is no longer clipped at the end of the strip.

Also routes the `size="s"` variant's property overrides through private custom properties instead of re-declaring the properties in the variant selector (no visual change).
