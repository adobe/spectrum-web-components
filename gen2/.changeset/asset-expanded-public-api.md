---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

**feat(asset):** Expanded `<swc-asset>` from a minimal file/folder-icon-or-slot component into a general image/media primitive, and promoted it from the internal genre to public.

Adds sizing (`aspect-ratio`/`width`/`height`), `fit`, `background`, `decorative`, a generalized `accessible-label` fallback, and a `load-state` property with `swc-asset-load`/`swc-asset-error` events. The `variant` (`file`/`folder`) icon API is removed. See the Asset migration guide for full upgrade steps from `sp-asset`.
