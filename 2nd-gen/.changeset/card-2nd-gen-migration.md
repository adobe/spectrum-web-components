---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

Add the 2nd-gen `<swc-card>`, the Spectrum 2 successor to `<sp-card>`.

- **API**: `variant` (`primary`/`secondary`/`tertiary`/`quiet`), `size` (`xs`–`xl`), `density`, and the `title-as-link` and `selectable` attributes. Content is slot-only (`preview`, `collection`, `media`, `title`, `actions`, `description`, default, `footer`); regular, collection, and gallery layouts are driven by slot presence. `selectable` dispatches `swc-card-click`.
- **Accessibility**: whole-card linking uses a consumer `<a>` in the `title` slot (Card takes no `href`); `selectable` makes the card focusable without setting an ARIA role; nested controls keep their own activation.
- **Styling**: shared CSS Grid layout with the `--swc-card-*` custom-property surface.
- **Core**: `CardBase` and the shared `renderCardTemplate` gain the card behavior and the `collection`/`media`/glyph rendering hooks.

`<swc-user-card>` and `<swc-product-card>` are not part of this release.
