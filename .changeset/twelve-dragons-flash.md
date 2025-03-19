---
'@spectrum-web-components/combobox': minor
'@spectrum-web-components/styles': minor
---

Styles updated to latest release, graduated from prerelease tag. For more details, please see the [Spectrum CSS Change log](https://github.com/adobe/spectrum-css/releases/tag/%40spectrum-css%2Fcombobox%404.1.2).

[#3609](https://redirect.github.com/adobe/spectrum-css/pull/3609) [851be13](https://github.com/adobe/spectrum-css/commit/851be13295f9d42d548894fee6626009f053de61) Thanks [@​marissahuysentruyt](https://github.com/marissahuysentruyt)!

### Fast follow fixes for combobox

-   Corrects container query for the `--system` reference to "legacy" in the `combobox/themes/spectrum.css` file.
-   Corrects the border colors for several combobox states including `focus`, `keyboardFocus`, `focus` + `hover`, `disabled`, and `read-only` for all themes.
-   Adds `--spectrum-combobox-readonly-input-border-color: var(--spectrum-gray-400)` to the Express theme, so that the default border and read-only border colors are the same.
