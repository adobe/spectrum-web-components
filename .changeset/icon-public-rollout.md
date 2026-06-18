---
'@adobe/spectrum-wc': minor
---

Make `<swc-icon>` public with BYO SVG documentation.

- **API**: slot inline SVG via the default slot; `label` and `size` attributes; `--swc-icon-*` custom properties. No iconsets, `name`, or `src`.
- **Packaging**: `@adobe/spectrum-wc/icon` exports `<swc-icon>` only. Internal SVG factories under `elements/` remain monorepo-only.
- **Docs**: public Storybook page, consumer migration guide, and maintainer catalog in `*.internal.*` stories excluded from production builds.
