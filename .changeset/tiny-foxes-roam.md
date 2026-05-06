---
'@spectrum-web-components/illustrated-message': minor
---

Migrated `<sp-illustrated-message>` to Spectrum 2 (2nd-gen) architecture.

- **Added**: 2nd-gen `<swc-illustrated-message>` component with Spectrum 2 design tokens and styling
- **Added**: `size` attribute (`s`, `m`, `l`) for controlling component size
- **Added**: `orientation` attribute (`vertical`, `horizontal`) for layout control
- **Added**: `heading` slot as the preferred API for providing heading content
- **Deprecated**: `heading` attribute on `<sp-illustrated-message>` in favor of the `heading` slot; a dev mode warning is emitted when the attribute is used
