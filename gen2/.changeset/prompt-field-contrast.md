---
'@adobe/spectrum-wc': minor
---

**feat(prompt-field):** Increase the container contrast of `<swc-prompt-field>` against the background in the subtle idle state and in the focused state of every variant.

- Adds a `0 8px 32px` transparent-static-black-75 drop shadow (`opacity-75`, 3%) to the container. This is a visual adjustment.
- Raises the container border from 5% to transparent-neutral-125 (`opacity-125`, 6%). This is a design change. The border is black in light mode and white in dark mode.
