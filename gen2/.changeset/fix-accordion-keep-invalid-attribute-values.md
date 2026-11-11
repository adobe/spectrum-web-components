---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Accordion` — Stopped writing a clamped `level` back to the DOM. The value you set stays on the attribute and property, and a development warning names it. Item headings render the nearest valid level for an out-of-range number (`1` renders `h2`, `7` renders `h6`, as before) and the default `h3` for anything else, which previously rendered a broken `<hNaN>` heading. A numeric string such as `"4"`, as set by frameworks, renders `h4`. `swc-accordion-item` now warns on an invalid `size` and renders its chevron at the default size.
