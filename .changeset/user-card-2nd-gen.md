---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

Add the 2nd-gen `<swc-user-card>`, a `Card` variant that identifies a person.

- **API**: extends `CardBase` directly. Supports `primary`/`secondary`/`tertiary` variants only (no `quiet`); all other `CardBase` API (`size`, `density`, `title-as-link`, `selectable`) is shared with `<swc-card>`.
- **Anatomy**: adds an `avatar` glyph slot (expects a [`swc-avatar`](../?path=/docs/components-avatar--docs)) alongside the shared `preview`, `title`, `description`, default, and `footer` slots. The `preview` slot defaults to a `3/1` aspect ratio. The card sets the avatar's own `size` attribute from a fixed scale matching its own `size` (`xs`: `100`, `s`: `300`, `m`: `500`, `l`: `700`, `xl`: `900`) and always sets `outline` with a fixed 2px width, overwriting any `size`/`outline` the consumer sets directly. When a `preview` is present, the avatar overlaps its bottom edge by half its own size.
- **Accessibility**: the avatar's labeling is fully owned by the slotted `swc-avatar`; the card does not add or manage its accessible name.
