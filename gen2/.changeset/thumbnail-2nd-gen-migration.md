---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

Add the gen2 `<swc-thumbnail>`, migrated from the Spectrum 1 `<sp-thumbnail>`.

- **API**: numeric `size` (`50`–`1000`, default `500`) and `fit` (`contain` or `cover`, default `contain`). Replaces the boolean `cover` with `fit="cover"`; drops `background`, `layer`, and the CSS-only `disabled`, `focused`, and `selected` attributes.
- **Accessibility**: new `decorative` attribute hides the thumbnail with `aria-hidden="true"` and gives the slotted `<img>` `alt=""` when it has none. A dev-mode warning fires when a non-decorative image has no `alt`, `aria-label`, or `aria-labelledby`.
- **Styling**: Spectrum 2 tokens with an opacity checkerboard frame, a forced-colors border, and one public custom property, `--swc-thumbnail-size`. Spectrum 1 `--mod-thumbnail-*` properties are not supported.
- **Docs and tests**: includes Storybook docs, a consumer migration guide, unit and accessibility tests, and VRT coverage.
