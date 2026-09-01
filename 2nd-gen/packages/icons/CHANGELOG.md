# @adobe/spectrum-wc-icons

## 2.0.0-beta.3

### Minor Changes

- [#6562](https://github.com/adobe/spectrum-web-components/pull/6562) [`f927ec3`](https://github.com/adobe/spectrum-web-components/commit/f927ec347b6a46f9857759b6830679d4cfdc5c14) Thanks [@caseyisonit](https://github.com/caseyisonit)! - Add `@adobe/spectrum-wc-icons`, a new public package delivering the Spectrum 2 **workflow icons** (the icons consumers pick: star, folder, arrows, and the like). It depends only on `@adobe/spectrum-wc-core`.
  - **Two outputs per icon, neither coupling a consumer to Lit**: a per-icon custom element (`<swc-icon-star>`) that renders in any framework with zero ceremony, and a per-icon SVG-string function (`Icon_Star()`) as the framework-agnostic, tree-shakeable substrate (usable via `innerHTML`, React `dangerouslySetInnerHTML`, Vue `v-html`, or Lit `unsafeSVG`).
  - **API**: every element extends `IconBase`, so it carries `size` (`xs`–`xl`) and host-owned accessibility (`accessible-label` sets `role="img"` + `aria-label`; empty is decorative `aria-hidden`). Color follows CSS `color` with a `--swc-icon-color` override.
  - **Tree-shaking**: per-icon subpath exports (`@adobe/spectrum-wc-icons/swc-icon-star.js`, `@adobe/spectrum-wc-icons/Star.js`) mean an app ships only the icons it imports; a register-all `elements.js` and a `manifest.js` (name + tag list) are provided for galleries and pickers.
  - **Naming**: for an A4U logical name `<Name>`, the function is `Icon_`<Name>`()`, the element class `Icon`<Name>`, and the tag `swc-icon-`<kebab>` (`AddCircle` → `<swc-icon-add-circle>`, `3DAsset` → `<swc-icon-3d-asset>`).
  - **Generation, docs, and tests**: art is generated from the Adobe A4U S2 Icon Global Set (Open Source) by a workflow generator that reuses the shared `icon-source/utils/` cleanup; a custom-elements manifest is produced, a Storybook gallery previews the full set, and the package ships unit, accessibility, VRT, and tree-shaking coverage.

### Patch Changes

- Updated dependencies [[`2b26e0b`](https://github.com/adobe/spectrum-web-components/commit/2b26e0b3b6e25d4852e9984472737bd3caa2dfae), [`346746c`](https://github.com/adobe/spectrum-web-components/commit/346746cacd405fa1cd58b7fae3f164457968dec7), [`3110850`](https://github.com/adobe/spectrum-web-components/commit/31108509505dcaf485e4d2582074ea5fa8189922), [`d429a49`](https://github.com/adobe/spectrum-web-components/commit/d429a4991a51339b5325f726bd39d0d3c4ef447e), [`afe0beb`](https://github.com/adobe/spectrum-web-components/commit/afe0beb9e487d3f2838bb1ec7e98f131f53606af), [`4a30997`](https://github.com/adobe/spectrum-web-components/commit/4a309978f86b9d050cb54ed03db7418e40cb464a), [`74a0c56`](https://github.com/adobe/spectrum-web-components/commit/74a0c56e25be120309a40c540ad750b7f1081f4b), [`9b9695a`](https://github.com/adobe/spectrum-web-components/commit/9b9695a1e157ac300234d56882a4923d81dbf724), [`735a6df`](https://github.com/adobe/spectrum-web-components/commit/735a6dfbd16767af716c5b3fe9a89b09714874a4), [`86f40a1`](https://github.com/adobe/spectrum-web-components/commit/86f40a1e0bc46d74c796e712f47d3428e0e4c7e5), [`bd6c017`](https://github.com/adobe/spectrum-web-components/commit/bd6c017708de0b362c0504ad8b28a7f37a3b17da), [`1f85e54`](https://github.com/adobe/spectrum-web-components/commit/1f85e545d6cf3cff80888995f3184fbaea7fd154)]:
  - @adobe/spectrum-wc-core@2.0.0-beta.3
