---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

Add the internal 2nd-gen UI icon system: the `<swc-ui-icon>` element plus a build-time generator for the S2 UI icon set.

- **`<swc-ui-icon>`** (internal): `icon` selects the icon-set, `size` selects the matching optical step, and `accessible-label` drives host-owned accessibility; renders generated Lit templates with no `unsafeSVG` in consuming components.
- **Generator** (`yarn generate:ui-icons`): converts downloaded A4U source SVGs into per-logical-icon template bundles under `components/ui-icons/icon-set/`, rewriting fills to `var(--swc-icon-color, currentColor)`.
- **`IconBase`**: refactored to a behavior-only base (`size` + `accessible-label` + host-owned accessibility, with no render or styles); the `<swc-icon>` frame and `<swc-ui-icon>` both extend it and share `stylesheets/_lit-styles/icon-base.css`. The frame uses `accessible-label` for host-owned accessibility (`role="img"` plus `aria-label` when labeled, `aria-hidden` when decorative).
