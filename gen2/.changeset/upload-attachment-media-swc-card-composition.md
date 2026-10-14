---
'@adobe/spectrum-wc': minor
---

**feat(upload-attachment):** `type="media"` now composes [`swc-card`](../gen2/packages/swc/components/card) (`variant="quiet"`) internally instead of hand-rolled surface markup, reusing its `preview`/`media` slot and grid machinery. The public slot API (`thumbnail`, `badge`, `title`, `subtitle`, `actions`) is unchanged.

Added:

- `progress` (0-100): shows a `swc-progress-circle` overlay on the `type="media"` preview while an upload is in flight. Hidden when unset or at 100 (complete); the `thumbnail` slot is hidden while loading so the overlay reads against a plain background instead of stacking on the image.
- `size` (`m`/`l`, default `m`): 64px vs. 96px tile for `type="media"`. Has no effect on `type="card"`.

Removed/renamed custom properties (`type="media"` sizing is now driven by `size` instead):

- `--swc-upload-attachment-preview-size` removed; use `size="m"`/`size="l"`.
- `--swc-upload-attachment-card-thumbnail-inline-size` and `--swc-upload-attachment-card-thumbnail-block-size` merged into `--swc-upload-attachment-card-thumbnail-size`.
- `--swc-upload-attachment-dismiss-icon-inline-size` and `--swc-upload-attachment-dismiss-icon-block-size` merged into `--swc-upload-attachment-dismiss-icon-size`.

Also composes [`swc-asset`](../gen2/packages/swc/components/asset) into the `thumbnail` slot in docs/examples for image loading, fit, and background handling, and documents that `badge` should only be used at `size="l"` and above (it crowds the default 64px `size="m"` tile).

Added VRT coverage (`test/vrt/upload-attachment.vrt.ts`, `test/vrt/upload-attachment-custom-properties.vrt.ts`) for both types, both sizes, the badge and progress overlays, title truncation/subtitle overflow, forced `:focus-visible`, forced colors, and CJK text.
