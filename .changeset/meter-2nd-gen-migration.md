---
'@adobe/spectrum-wc': minor
'@spectrum-web-components/core': minor
---

Add the 2nd-gen `<swc-meter>`, migrated from the Spectrum 1 `<sp-meter>`.

- **API**: `value` (replaces `progress`) with `min-value` / `max-value` for arbitrary ranges; `variant` (`informative` default, `positive`, `notice`, `negative`) with unknown values normalized to `informative`; `label-position` (`top` / `side`, replaces the `side-label` boolean); `value-label` and `formatOptions` for locale-aware value text; `label` and `description` named slots; `accessible-label` for the no-visible-label case.
- **Accessibility**: the WAI-ARIA `meter` role and all `aria-value*`, `aria-labelledby`, and `aria-describedby` attributes live on the internal bar element, not the host; non-focusable, read-only; honors `prefers-reduced-motion: reduce` (WCAG 2.3.3) on the shared linear-progress base by dropping the fill transition.
- **Styling**: exposes the `--swc-linear-progress-*` custom-property surface (replaces `--mod-progressbar-*` / `--mod-meter-*`); adds `static-color="black"` alongside `white`.
- **Docs and tests**: per-component Storybook docs page, consumer migration guide, and full unit + accessibility test coverage.
