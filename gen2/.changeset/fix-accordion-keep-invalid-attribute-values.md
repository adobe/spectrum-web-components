---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Accordion` — Stopped clamping an invalid `level` into the DOM. The value you set stays on the attribute and property, a development warning names it, and item headings render at the default `h3`. `swc-accordion-item` now warns on an invalid `size` and renders its chevron at the default size.
