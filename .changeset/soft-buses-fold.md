---
'@spectrum-web-components/infield-button': patch
'@spectrum-web-components/number-field': patch
'@spectrum-web-components/textfield': patch
'@spectrum-web-components/search': patch
'@spectrum-web-components/styles': patch
---

# Release Note

## Infield Button

### 6.1.2

-   [#3615](https://github.com/adobe/spectrum-css/pull/3615) [`f09c84a`](https://github.com/adobe/spectrum-css/commit/f09c84ae9922d67b6fe237d693afee0fab53fa67) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - ### Infield button fast follows
    -   Updated infield button disabled border color to use `-spectrum-gray-300` for spectrum-two theme and `-spectrum-gray-200` for other themes.

### 6.1.1

📝 [#3536](https://github.com/adobe/spectrum-css/pull/3536) [`f77aa72`](https://github.com/adobe/spectrum-css/commit/f77aa72486f98c7b7d4f449c0d54fb6801881b7e) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)!

-   S2 Foundations fixes
    -   Adjusts the background-color of the infield button components within stepper to use `gray-100` as opposed to `gray-25`.
        -   This corresponds to the background-color updates picker has for S2.
    -   Corrects the border color for the default picker for S2 foundations, using `gray-500` (instead of `gray-800`) to align with other field/form components.
    -   Refactors the `&.is-keyboardFocused&.is-placeholder` selector to `&.is-keyboardFocused.spectrum-Picker-label.is-placeholder` to avoid unexpectedly targeting the nested placeholder class.

### 6.1.0

📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

Dependency alignment across the project.

-   Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
    -   @spectrum-css/icon@9.1.0
    -   @spectrum-css/tokens@16.0.1

## Number Field

Bump @spectrum-css/stepper to 7.1.3

### 7.1.3

-   [#3621](https://github.com/adobe/spectrum-css/pull/3621) [`3aec28a`](https://github.com/adobe/spectrum-css/commit/3aec28aac60bdf32a585fa8ff38559d80b57ff86) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)!

    -   Updates `-spectrum-stepper-buttons-border-color-keyboard-focus` from `gray-900` to `gray-800` to match the rest of the border color on keyboardFocus.

### 7.1.2

📝 [#3594](https://github.com/adobe/spectrum-css/pull/3594) [`6200a63`](https://github.com/adobe/spectrum-css/commit/6200a63f2c7dc1d2b0481c33b17c86427726c0bd) Thanks [@TarunAdobe](https://github.com/TarunAdobe)!

-   Updates Stepper's key-focus border color (`-spectrum-stepper-border-color-keyboard-focus`) to `-spectrum-gray-800`.

### 7.1.1

📝 [#3536](https://github.com/adobe/spectrum-css/pull/3536) [`f77aa72`](https://github.com/adobe/spectrum-css/commit/f77aa72486f98c7b7d4f449c0d54fb6801881b7e) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)!

-   S2 Foundations fixes
    -   Adjusts the background-color of the infield button components within stepper to use `gray-100` as opposed to `gray-25`.
        -   This corresponds to the background-color updates picker has for S2.
    -   Corrects the border color for the default picker for S2 foundations, using `gray-500` (instead of `gray-800`) to align with other field/form components.
    -   Refactors the `&.is-keyboardFocused&.is-placeholder` selector to `&.is-keyboardFocused.spectrum-Picker-label.is-placeholder` to avoid unexpectedly targeting the nested placeholder class.

### 7.1.0

📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

Dependency alignment across the project.

-   Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`9b108f7`](https://github.com/adobe/spectrum-css/commit/9b108f7e05df1f55ab315dad96736d3ff4757f8c), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
    -   @spectrum-css/actionbutton@8.0.0
    -   @spectrum-css/icon@9.1.0
    -   @spectrum-css/infieldbutton@7.0.0
    -   @spectrum-css/textfield@9.0.0
    -   @spectrum-css/tokens@16.0.1

## Textfield

### 8.1.1

📝 [#3575](https://github.com/adobe/spectrum-css/pull/3575) [`2e17d10`](https://github.com/adobe/spectrum-css/commit/2e17d109ebec3c2745c32a15840af5c636c8dc5d) Thanks [@TarunAdobe](https://github.com/TarunAdobe)!

-   Updated border color on keyboard focus state for textfield in spectrum-two theme.

### 8.1.0

📝 [#3539](https://github.com/adobe/spectrum-css/pull/3539) [`9b108f7`](https://github.com/adobe/spectrum-css/commit/9b108f7e05df1f55ab315dad96736d3ff4757f8c) Thanks [@rise-erpelding](https://github.com/rise-erpelding)!

-   Updates invalid icon spacing to be vertically centered for S2.

📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

-   Dependency alignment across the project.

Set component peerDependencies as optional to reduce console warnings on downstream projects.

-   Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
    -   @spectrum-css/helptext@8.0.0
    -   @spectrum-css/tokens@16.0.1

## Search

### 8.1.2

-   [#3658](https://github.com/adobe/spectrum-css/pull/3658) [`e9fde67`](https://github.com/adobe/spectrum-css/commit/e9fde67bf341798a6ab34f227b2e7a417d1e5da7) Thanks [@rise-erpelding](https://github.com/rise-erpelding)! - Change S2 theme border color to gray-800 on keyfocus per design request in order to align with text field.

### 8.1.1

📝 [#3593](https://github.com/adobe/spectrum-css/pull/3593) [`d829abb`](https://github.com/adobe/spectrum-css/commit/d829abb44f1eaa1874090e52caee553d776684e7) Thanks [@TarunAdobe](https://github.com/TarunAdobe)!

Updated `--spectrum-search-background-color-disabled` to `--spectrum-gray-25` and `--spectrum-search-border-color-disabled` to `--spectrum-gray-300` for the S2 foundations contexts.

Also defines disabled quiet border and background colors (`--system-search-quiet-background-color-disabled` and `--system-search-quiet-border-color-disabled`) in order to maintain disabled quiet styling.

### 8.1.0

📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

Dependency alignment across the project.

-   Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`9b108f7`](https://github.com/adobe/spectrum-css/commit/9b108f7e05df1f55ab315dad96736d3ff4757f8c), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
    -   @spectrum-css/clearbutton@8.0.0
    -   @spectrum-css/icon@9.1.0
    -   @spectrum-css/textfield@9.0.0
    -   @spectrum-css/tokens@16.0.1
