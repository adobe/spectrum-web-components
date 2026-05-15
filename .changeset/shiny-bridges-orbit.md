---
'@adobe/spectrum-wc': minor
---

**feat(color-loupe):** Add 2nd-gen `<swc-color-loupe>` with Spectrum 2 visual fidelity. Key changes from 1st-gen `<sp-color-loupe>`:

- Pure visual, non-interactive component — accessibility semantics are delegated to the parent color picker or color field
- SVG loupe graphic carries `aria-hidden="true"`; no role, label, or tab stop on the host
- `open` property controls visibility via CSS opacity and transform transitions
- `color` property accepts any valid CSS color string, including colors with alpha transparency revealed over an opacity checkerboard

See the [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/color-components-color-loupe-migration-guide--docs) for upgrading from 1st-gen `sp-color-loupe`.
