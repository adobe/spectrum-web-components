---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Accordion` — Stopped writing a clamped `level` back to the DOM. The value you set stays on the attribute and property, and a development warning names it. Item headings render the nearest valid level for any other number, rounded and then clamped (`1` renders `h2` and `7` renders `h6`, as before; `4.6` renders `h5`), and the default `h3` for anything else, which previously rendered a broken heading such as `<hNaN>`. A numeric string such as `"4"`, as set by frameworks, renders `h4` without a warning. Removing `level` or `density` resets it to its default without a warning. `swc-accordion-item` now warns on an invalid `size` and renders its chevron at the default size.
