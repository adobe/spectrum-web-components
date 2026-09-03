---
'@adobe/spectrum-wc-icons': minor
---

Add `@adobe/spectrum-wc-icons`, a new public package delivering the Spectrum 2 **workflow icons** (the icons consumers pick: star, folder, arrows, and the like). It depends only on `@adobe/spectrum-wc-core`.

- **Two outputs per icon, neither coupling a consumer to Lit**: a per-icon custom element (`<swc-icon-star>`) that renders in any framework with zero ceremony, and a per-icon SVG-string function (`Icon_Star()`) as the framework-agnostic, tree-shakeable substrate (usable via `innerHTML`, React `dangerouslySetInnerHTML`, Vue `v-html`, or Lit `unsafeSVG`).
- **API**: every element extends `IconBase`, so it carries `size` (`xs`–`xl`) and host-owned accessibility (`accessible-label` sets `role="img"` + `aria-label`; empty is decorative `aria-hidden`). Color follows CSS `color` with a `--swc-icon-color` override.
- **Tree-shaking**: per-icon subpath exports (`@adobe/spectrum-wc-icons/swc-icon-star.js`, `@adobe/spectrum-wc-icons/Star.js`) mean an app ships only the icons it imports; a register-all `elements.js` and a `manifest.js` (name + tag list) are provided for galleries and pickers.
- **Naming**: for an A4U logical name `<Name>`, the function is `Icon_`<Name>`()`, the element class `Icon`<Name>`, and the tag `swc-icon-`<kebab>` (`AddCircle` → `<swc-icon-add-circle>`, `3DAsset` → `<swc-icon-3d-asset>`).
- **Generation, docs, and tests**: art is generated from the Adobe A4U S2 Icon Global Set (Open Source) by a workflow generator that reuses the shared `icon-source/utils/` cleanup; a custom-elements manifest is produced, a Storybook gallery previews the full set, and the package ships unit, accessibility, VRT, and tree-shaking coverage.
