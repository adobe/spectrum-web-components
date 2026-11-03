---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

Add the gen2 `<swc-menu-separator>`, the Spectrum 2 successor to `<sp-menu-divider>`.

- **API**: no attributes, properties, slots, or events. The `size` option and `--mod-*` custom properties are not carried over.
- **Accessibility**: sets `role="separator"` on the host. It has no accessible name and is not focusable.
- **Styling**: Spectrum 2 line centered in the 12px section-divider container, with forced-colors support. The line thickness comes from the parent `swc-menu` through `--swc-menu-separator-thickness`.
- **Core**: adds `MenuSeparatorBase`.
- **Docs and tests**: Storybook docs page, consumer migration guide, unit coverage, and Playwright accessibility tests.
