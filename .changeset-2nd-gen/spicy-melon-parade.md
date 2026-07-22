---
'@adobe/spectrum-wc': minor
---

**feat(progress-bar):** Added `<swc-progress-bar>`, the Spectrum 2 migration of Progress Bar.

Renames from `<sp-progress-bar>`: `progress` becomes `value`, `side-label` becomes `label-position="side"`, the `label` string attribute becomes a `label` named slot, and `--mod-progressbar-*` custom properties become `--swc-linear-progress-*`. The default `size` is now `'m'`.

New in Spectrum 2: `min-value` / `max-value` for arbitrary numeric ranges, `static-color="black"`, `value-label`, a `formatOptions` property, `accessible-label`, and a `description` slot. `over-background` is removed in favor of `static-color="white"`, and `role="progressbar"` plus the `aria-value*` attributes now live on an internal element rather than the host. See the Progress Bar migration guide for full upgrade steps.
