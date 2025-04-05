---
'@spectrum-web-components/number-field': patch
'@spectrum-web-components/styles': patch
---

📝 [#​3621](https://github.com/adobe/spectrum-css/pull/​3621) Thanks [@​marissahuysentruyt](https://github.com/​marissahuysentruyt)!

-   Updates `--spectrum-stepper-border-color-focus-hover` from `gray-800` to `gray-900`.
-   Updates `--spectrum-stepper-buttons-border-color-keyboard-focus` from `gray-900` to `gray-800` to match the rest of the border color on keyboard focus.

📝 [#​3594](https://github.com/adobe/spectrum-css/pull/​3594) Thanks [@​TarunAdobe](https://github.com/TarunAdobe)!

Updates stepper's key-focus border color (`--spectrum-stepper-border-color-keyboard-focus`) to `--spectrum-gray-800`.

📝 [#​3536](https://github.com/adobe/spectrum-css/pull/​3536) Thanks [@​marissahuysentruyt](https://github.com/​marissahuysentruyt)!

-   Adjusts the background-color of the infield button components within stepper to use `gray-100` as opposed to `gray-25`.
-   This corresponds to the background-color updates picker has for S2.
-   Corrects the border color for the default picker for S2 foundations, using `gray-500` (instead of `gray-800`) to align with other field/form components.
-   Refactors the keyboard-focused placeholder selector to include the label to avoid unexpectedly targeting the nested placeholder class.
