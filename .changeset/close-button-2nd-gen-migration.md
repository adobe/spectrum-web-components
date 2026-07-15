---
'@adobe/spectrum-wc': minor
'@spectrum-web-components/core': minor
---

Add the 2nd-gen `<swc-close-button>`, migrated from the Spectrum 1 `<sp-close-button>`.

- **API**: `size`, `disabled`, `accessible-label`, and `static-color`; omits the legacy `variant` surface in favor of `static-color`.
- **Accessibility**: renders a real inner `<button type="button">` with delegated focus; requires `accessible-label` for its icon-only name; the cross icon remains decorative.
- **Styling**: ships Spectrum 2 sizing and static-color treatments plus the `--swc-close-button-*` custom-property surface for token-aligned overrides.
- **Docs and tests**: includes Storybook docs, consumer migration guidance, unit coverage, and Playwright accessibility and keyboard tests.
