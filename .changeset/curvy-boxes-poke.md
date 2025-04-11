---
'@spectrum-web-components/button': patch
'@spectrum-web-components/styles': patch
---

This update aims to simplify `--mod-*` access by ensuring local variants and states aren't hooking into those custom properties for overrides. This updates all local variants and states to override the `--spectrum-button-*` properties instead and adjusts the specificity to ensure no regressions in rendered results.

From [@spectrum-css/button v14.1.3](https://www.npmjs.com/package/@spectrum-css/button/v/14.1.3): [#3613](https://github.com/adobe/spectrum-css/pull/3613) Thanks [@​rise-erpelding](https://github.com/rise-erpelding)!

Adjusts static color buttons to more closely resemble the S2 specifications. There are no expected changes to non-static button variants in S2, and no expected changes to other themes.

This PR includes changes to:

-   Static white primary button (outline variant), static white secondary button (fill variant), static black primary button (outline variant), static black secondary button (fill variant)
-   Static white secondary button (outline variant) and static black secondary button (outline variant) border and background colors
-   Static color buttons' content color
-   Static white primary button (fill variant) and static black primary button (fill variant) background colors

From [@spectrum-css/button v14.1.2](https://www.npmjs.com/package/@spectrum-css/button/v/14.1.2): [#​3600](https://github.com/adobe/spectrum-css/pull/3600) Thanks [@​rise-erpelding](https://github.com/rise-erpelding)!

Adjust border colors for static black and static white outline buttons, primary variant to match S2 specifications.
