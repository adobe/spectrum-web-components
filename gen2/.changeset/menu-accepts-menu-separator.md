---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

`<swc-menu>` now accepts `<swc-menu-separator>` as a direct child.

- **Validation**: `swc-menu-separator` is added to the allowed default-slot children, so slotting it no longer logs a placement warning.
- **Styling**: the menu supplies the separator's line thickness (the medium divider thickness) through `--swc-menu-separator-thickness`.
