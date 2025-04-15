---
'@spectrum-web-components/button': patch
---

📝 [#3665](https://github.com/adobe/spectrum-css/pull/3665) [`56e143a`](https://github.com/adobe/spectrum-css/commit/56e143a6ac9efda0eaec7a4d1cde01319985b2e2) Thanks [@rise-erpelding](https://github.com/rise-erpelding)!

Adjust S1/Express static outline variant content color (from transparent-black/white to solid black/white) to fix unintentional regression.

📝 [#3662](https://github.com/adobe/spectrum-css/pull/3662) [`79e3363`](https://github.com/adobe/spectrum-css/commit/79e336369700b9eded8fb7154995abee3789b545) Thanks [@castastrophe](https://github.com/castastrophe)!

This update aims to simplify --mod-_ access by ensuring local variants and states aren't hooking into those custom properties for overrides. This updates all local variants and states to override the --spectrum-button-_ properties instead and adjusts the specificity to ensure no regressions in rendered results.
