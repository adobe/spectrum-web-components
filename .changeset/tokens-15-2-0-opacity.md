---
'@adobe/spectrum-wc': minor
---

**feat(tokens):** Update `@adobe/spectrum-tokens` to 15.2.0. This adds the new `opacity-*` scale as custom properties and refreshes component token values. The token loader now auto-discovers the per-component token files introduced in the 15.x file split (previously the single `color-component.json` / `layout-component.json` files).

**feat(prompt-field):** Adopt the new `opacity-*` tokens for the surface transparencies that map exactly to the scale (`--_swc-prompt-field-inset-shadow-color` → `opacity-100`, outer recede stop → `opacity-50`). No visual change.
