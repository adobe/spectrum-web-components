---
'@spectrum-web-components/button': minor
'@spectrum-web-components/styles': minor
'@spectrum-web-components/theme': patch
---

- **Added**: Introduced global button element styles in `@spectrum-web-components/styles` via `global-button.css` and `global-elements.css` (including public exports), enabling native links with `.spectrum-Button*` classes to render with Spectrum button styling.
- **Updated**: `@spectrum-web-components/theme` now imports `@spectrum-web-components/styles/global-elements.css` so button-styled native links are styled automatically when used inside `<sp-theme>`.
- **Documented**: Added 1st-gen button guidance and Storybook examples for rendering native `<a>` links as static button-styled UI, including limitations (for example, no disabled or pending support for link-based buttons).
