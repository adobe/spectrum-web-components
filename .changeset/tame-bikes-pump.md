---
'@adobe/spectrum-wc': minor
---

**fix(suggestion-group):** require heading via `slot="heading"` instead of the `heading` string property.

- Removed the `heading` property; consumers now provide heading content and semantics via `<h3 slot="heading">`...</h3>` (or any element)
- `accessible-label` takes explicit precedence over heading-derived labeling when both are present
- Host exposes `role="group"` with `aria-labelledby` pointing at the slotted heading so the accessible name resolves across the shadow boundary
- Component still imposes heading typography (i.e. `font-size: token("font-size-200")`)
