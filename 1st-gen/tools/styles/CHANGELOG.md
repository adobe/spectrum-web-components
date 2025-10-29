# Change Log

## 1.9.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.9.0

## 1.8.0

### Patch Changes

- [#5529](https://github.com/adobe/spectrum-web-components/pull/5529) [`77bdef6`](https://github.com/adobe/spectrum-web-components/commit/77bdef68a40e0f6cd5476271b01b4c0f00531f4f) Thanks [@castastrophe](https://github.com/castastrophe)! - Bring the CJK font alias token fix from CSS [#3883](https://github.com/adobe/spectrum-css/pull/3883) [`4e3a120`](https://github.com/adobe/spectrum-css/commit/4e3a120339a6e7e6d0d19e3f2f7f608ab96621ed).

    The `--spectrum-cjk-font` token was incorrectly mapped to the code font-family stack instead of `--spectrum-cjk-font-family-stack`. Thanks [@byteakp](https://github.com/byteakp)!

- [#5320](https://github.com/adobe/spectrum-web-components/pull/5320) [`15be17d`](https://github.com/adobe/spectrum-web-components/commit/15be17db91f1140ccf3cad52b1f2ed6c4b9e28ba) Thanks [@renovate](https://github.com/apps/renovate)! - Clear button styles have been updated to the latest Spectrum CSS version of the clear button. This update includes a major reduction in the number of custom property abstractions needed to support the multiple theming layers (as seen in the `styles` package).

    This update spans the following additional packages:
    - @spectrum-web-components/button
    - @spectrum-web-components/styles

    As the updated styles now offer additional styling options, we have added the following API to the clear button component that exists in the `button` package:
    - `quiet` - when set to true, the button will be rendered as a quiet button. This is useful for cases where you want to use the clear button in a more subtle way.
    - `disabled` - when set to true, the button will be rendered as a disabled button.
    - `static-color` - currently this only supports the `white` context color. This is useful for cases where the button appears on a dark background texture. This is a replacement for the previously used `variant="overBackground"` attribute which is deprecated.

    ### Deprecation

    The `variant="overBackground"` attribute is deprecated; please use the new `static-color="white"` attribute instead. When this property is used in the component, a deprecation warning will be shown in the console when in debug mode. The `variant` attribute will be removed in a future release.

- Updated dependencies []:
    - @spectrum-web-components/base@1.8.0

## 1.7.0

### Patch Changes

- [#5295](https://github.com/adobe/spectrum-web-components/pull/5295) [`1126cf2`](https://github.com/adobe/spectrum-web-components/commit/1126cf22c0076c8728b86e9c0bf7f67fdd8fde07) Thanks [@renovate](https://github.com/apps/renovate)! - Remove unnecessary system theme references to reduce complexity for components that don't need the additional mapping layer.

- Updated dependencies []:
    - @spectrum-web-components/base@1.7.0

## 1.6.0

### Patch Changes

- [#5157](https://github.com/adobe/spectrum-web-components/pull/5157) [`9e15a66`](https://github.com/adobe/spectrum-web-components/commit/9e15a66a281745004add414ff977d4a71186aedd) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - # Release Note

    ## Infield Button

    ### 6.1.2
    - [#3615](https://github.com/adobe/spectrum-css/pull/3615) [`f09c84a`](https://github.com/adobe/spectrum-css/commit/f09c84ae9922d67b6fe237d693afee0fab53fa67) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - ### Infield button fast follows
        - Updated infield button disabled border color to use `-spectrum-gray-300` for spectrum-two theme and `-spectrum-gray-200` for other themes.

    ### 6.1.1

    📝 [#3536](https://github.com/adobe/spectrum-css/pull/3536) [`f77aa72`](https://github.com/adobe/spectrum-css/commit/f77aa72486f98c7b7d4f449c0d54fb6801881b7e) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)!
    - S2 Foundations fixes
        - Adjusts the background-color of the infield button components within stepper to use `gray-100` as opposed to `gray-25`.
            - This corresponds to the background-color updates picker has for S2.
        - Corrects the border color for the default picker for S2 foundations, using `gray-500` (instead of `gray-800`) to align with other field/form components.
        - Refactors the `&.is-keyboardFocused&.is-placeholder` selector to `&.is-keyboardFocused.spectrum-Picker-label.is-placeholder` to avoid unexpectedly targeting the nested placeholder class.

    ### 6.1.0

    📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

    Dependency alignment across the project.
    - Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
        - @spectrum-css/icon@9.1.0
        - @spectrum-css/tokens@16.0.1

    ## Number Field

    Bump @spectrum-css/stepper to 7.1.3

    ### 7.1.3
    - [#3621](https://github.com/adobe/spectrum-css/pull/3621) [`3aec28a`](https://github.com/adobe/spectrum-css/commit/3aec28aac60bdf32a585fa8ff38559d80b57ff86) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)!
        - Updates `-spectrum-stepper-buttons-border-color-keyboard-focus` from `gray-900` to `gray-800` to match the rest of the border color on keyboardFocus.

    ### 7.1.2

    📝 [#3594](https://github.com/adobe/spectrum-css/pull/3594) [`6200a63`](https://github.com/adobe/spectrum-css/commit/6200a63f2c7dc1d2b0481c33b17c86427726c0bd) Thanks [@TarunAdobe](https://github.com/TarunAdobe)!
    - Updates Stepper's key-focus border color (`-spectrum-stepper-border-color-keyboard-focus`) to `-spectrum-gray-800`.

    ### 7.1.1

    📝 [#3536](https://github.com/adobe/spectrum-css/pull/3536) [`f77aa72`](https://github.com/adobe/spectrum-css/commit/f77aa72486f98c7b7d4f449c0d54fb6801881b7e) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)!
    - S2 Foundations fixes
        - Adjusts the background-color of the infield button components within stepper to use `gray-100` as opposed to `gray-25`.
            - This corresponds to the background-color updates picker has for S2.
        - Corrects the border color for the default picker for S2 foundations, using `gray-500` (instead of `gray-800`) to align with other field/form components.
        - Refactors the `&.is-keyboardFocused&.is-placeholder` selector to `&.is-keyboardFocused.spectrum-Picker-label.is-placeholder` to avoid unexpectedly targeting the nested placeholder class.

    ### 7.1.0

    📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

    Dependency alignment across the project.
    - Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`9b108f7`](https://github.com/adobe/spectrum-css/commit/9b108f7e05df1f55ab315dad96736d3ff4757f8c), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
        - @spectrum-css/actionbutton@8.0.0
        - @spectrum-css/icon@9.1.0
        - @spectrum-css/infieldbutton@7.0.0
        - @spectrum-css/textfield@9.0.0
        - @spectrum-css/tokens@16.0.1

    ## Textfield

    ### 8.1.1

    📝 [#3575](https://github.com/adobe/spectrum-css/pull/3575) [`2e17d10`](https://github.com/adobe/spectrum-css/commit/2e17d109ebec3c2745c32a15840af5c636c8dc5d) Thanks [@TarunAdobe](https://github.com/TarunAdobe)!
    - Updated border color on keyboard focus state for textfield in spectrum-two theme.

    ### 8.1.0

    📝 [#3539](https://github.com/adobe/spectrum-css/pull/3539) [`9b108f7`](https://github.com/adobe/spectrum-css/commit/9b108f7e05df1f55ab315dad96736d3ff4757f8c) Thanks [@rise-erpelding](https://github.com/rise-erpelding)!
    - Updates invalid icon spacing to be vertically centered for S2.

    📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!
    - Dependency alignment across the project.

    Set component peerDependencies as optional to reduce console warnings on downstream projects.
    - Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
        - @spectrum-css/helptext@8.0.0
        - @spectrum-css/tokens@16.0.1

    ## Search

    ### 8.1.2
    - [#3658](https://github.com/adobe/spectrum-css/pull/3658) [`e9fde67`](https://github.com/adobe/spectrum-css/commit/e9fde67bf341798a6ab34f227b2e7a417d1e5da7) Thanks [@rise-erpelding](https://github.com/rise-erpelding)! - Change S2 theme border color to gray-800 on keyfocus per design request in order to align with text field.

    ### 8.1.1

    📝 [#3593](https://github.com/adobe/spectrum-css/pull/3593) [`d829abb`](https://github.com/adobe/spectrum-css/commit/d829abb44f1eaa1874090e52caee553d776684e7) Thanks [@TarunAdobe](https://github.com/TarunAdobe)!

    Updated `--spectrum-search-background-color-disabled` to `--spectrum-gray-25` and `--spectrum-search-border-color-disabled` to `--spectrum-gray-300` for the S2 foundations contexts.

    Also defines disabled quiet border and background colors (`--system-search-quiet-background-color-disabled` and `--system-search-quiet-border-color-disabled`) in order to maintain disabled quiet styling.

    ### 8.1.0

    📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

    Dependency alignment across the project.
    - Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`9b108f7`](https://github.com/adobe/spectrum-css/commit/9b108f7e05df1f55ab315dad96736d3ff4757f8c), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
        - @spectrum-css/clearbutton@8.0.0
        - @spectrum-css/icon@9.1.0
        - @spectrum-css/textfield@9.0.0
        - @spectrum-css/tokens@16.0.1

- [#5349](https://github.com/adobe/spectrum-web-components/pull/5349) [`a9727d2`](https://github.com/adobe/spectrum-web-components/commit/a9727d2975b01f440c09789c9e7e0122063b6f7e) Thanks [@renovate](https://github.com/apps/renovate)! - Remove unnecessary system theme references to reduce complexity for components that don't need the additional mapping layer.

- Updated dependencies []:
    - @spectrum-web-components/base@1.6.0

## 1.5.0

### Patch Changes

- [#5271](https://github.com/adobe/spectrum-web-components/pull/5271) [`165a904`](https://github.com/adobe/spectrum-web-components/commit/165a904bd01fddea922fe87b181bbf41281f81f0) Thanks [@renovate](https://github.com/apps/renovate)! - Remove unnecessary system theme references to reduce complexity for components that don't need the additional mapping layer.

- [#5363](https://github.com/adobe/spectrum-web-components/pull/5363) [`4e06533`](https://github.com/adobe/spectrum-web-components/commit/4e065332e0236757fc3a050e53747ce82ac40ed5) Thanks [@castastrophe](https://github.com/castastrophe)! - This update aims to simplify `--mod-*` access by ensuring local variants and states aren't hooking into those custom properties for overrides. This updates all local variants and states to override the `--spectrum-button-*` properties instead and adjusts the specificity to ensure no regressions in rendered results.

    From [@spectrum-css/button v14.1.3](https://www.npmjs.com/package/@spectrum-css/button/v/14.1.3): [#3613](https://github.com/adobe/spectrum-css/pull/3613) Thanks [@​rise-erpelding](https://github.com/rise-erpelding)!

    Adjusts static color buttons to more closely resemble the S2 specifications. There are no expected changes to non-static button variants in S2, and no expected changes to other themes.

    This PR includes changes to:
    - Static white primary button (outline variant), static white secondary button (fill variant), static black primary button (outline variant), static black secondary button (fill variant)
    - Static white secondary button (outline variant) and static black secondary button (outline variant) border and background colors
    - Static color buttons' content color
    - Static white primary button (fill variant) and static black primary button (fill variant) background colors

    From [@spectrum-css/button v14.1.2](https://www.npmjs.com/package/@spectrum-css/button/v/14.1.2): [#​3600](https://github.com/adobe/spectrum-css/pull/3600) Thanks [@​rise-erpelding](https://github.com/rise-erpelding)!

    Adjust border colors for static black and static white outline buttons, primary variant to match S2 specifications.

- [#5202](https://github.com/adobe/spectrum-web-components/pull/5202) [`fa4be70`](https://github.com/adobe/spectrum-web-components/commit/fa4be70e9ab9dbeff26867edd3bdeb3f41c423e3) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - Updates the picker button component from version 6.0.0-s2-foundations.16 to 6.1.2. The update should bring the background colors for the picker button in line with S2-foundations design specs:

    default state: `gray-50` to `gray-100`
    hover state: `gray-100` to `gray-200`
    key-focus state: `gray-100` to `gray-200`

- [#5277](https://github.com/adobe/spectrum-web-components/pull/5277) [`daeb11f`](https://github.com/adobe/spectrum-web-components/commit/daeb11f18792cf650518099fd29857139b6380b4) Thanks [@renovate](https://github.com/apps/renovate)! - /Users/cas/Projects/work/spectrum-web-components/yarn.lock

- [#5325](https://github.com/adobe/spectrum-web-components/pull/5325) [`6c58f50`](https://github.com/adobe/spectrum-web-components/commit/6c58f50f7b1f5489c11e0d3484e3f4a9d576f1c8) Thanks [@renovate](https://github.com/apps/renovate)! - [#​3644](https://github.com/adobe/spectrum-css/pull/3644) Thanks [@​marissahuysentruyt](https://github.com/marissahuysentruyt)!

    This patch update fixes support for `--mod-actionbutton-border-radius` to make sure it is accessible by consumers and overwrites the default border radius setting when used.

- [#5202](https://github.com/adobe/spectrum-web-components/pull/5202) [`fa4be70`](https://github.com/adobe/spectrum-web-components/commit/fa4be70e9ab9dbeff26867edd3bdeb3f41c423e3) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - Updates the combobox component from version 4.0.0-s2-foundations.21 to 4.1.2. This work also addresses the design feedback for combobox in S2 foundations:
    - corrects the border colors for several combobox states including focus, keyboardFocus, focus+hover, disabled, read-only for all themes
    - increases the specificity of the `#textfield:hover .input` selector to `#textfield:hover .input:focus` in order to properly render the focus+hover border color styles (within the `combobox.css` file)
    - adds an additional selector for disabled comboboxes that correctly renders the border colors based on theme context

- Updated dependencies []:
    - @spectrum-web-components/base@1.5.0

## 1.4.0

### Patch Changes

- [#5140](https://github.com/adobe/spectrum-web-components/pull/5140) [`3cca7ea`](https://github.com/adobe/spectrum-web-components/commit/3cca7eacf127c3fd759953db38a2b5a561bfb8dc) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - Contextual help now supports a custom maximum width to be set using the `--mod-spectrum-contextual-help-popover-maximum-width` custom property.

- Updated dependencies []:
    - @spectrum-web-components/base@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

**Note:** Version bump only for package @spectrum-web-components/styles

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/styles

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/styles

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))

### Features

- **opacity-checkerboard:** bump CSS version ([#5040](https://github.com/adobe/spectrum-web-components/issues/5040)) ([e3bf6d3](https://github.com/adobe/spectrum-web-components/commit/e3bf6d3c20c8dab6674ad8b1793082372901d155))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

**Note:** Version bump only for package @spectrum-web-components/styles

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

**Note:** Version bump only for package @spectrum-web-components/styles

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

### Features

- **alert-banner:** add alert banner component ([#4266](https://github.com/adobe/spectrum-web-components/issues/4266)) ([10d456e](https://github.com/adobe/spectrum-web-components/commit/10d456ec3c79f7eb534b0ba66e426c3b0994aab5))

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

### Bug Fixes

- **styles,theme:** add S2 tokens and theme ([#4241](https://github.com/adobe/spectrum-web-components/issues/4241)) ([a29e4a2](https://github.com/adobe/spectrum-web-components/commit/a29e4a298090e39e009c434e48113fb8a7e90d14)), closes [#4232](https://github.com/adobe/spectrum-web-components/issues/4232) [#4228](https://github.com/adobe/spectrum-web-components/issues/4228)

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Bug Fixes

- **styles, theme:** surface exports that omit Spectrum Vars proactively ([#4142](https://github.com/adobe/spectrum-web-components/issues/4142)) ([5b524c1](https://github.com/adobe/spectrum-web-components/commit/5b524c1d54a64225cb3b2f71b92f581695985519))

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

### Bug Fixes

- **split-view:** expand accessible attribute usage and HCM delivery ([cb7c71f](https://github.com/adobe/spectrum-web-components/commit/cb7c71f988df48aceef129665fdf432d5bcef3b0))

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

### Bug Fixes

- **infield-button:** add infield-button package ([057b885](https://github.com/adobe/spectrum-web-components/commit/057b885276f3d5dcbe32bab5ab36a2bb82334bc3))

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Bug Fixes

- **picker:** ensure the Menu opens in a Tray on mobile ([6be2bed](https://github.com/adobe/spectrum-web-components/commit/6be2bed36b364c5abcd1210db9c95ebc883125ec))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

### Features

- **menu:** convert to core tokens ([#3254](https://github.com/adobe/spectrum-web-components/issues/3254)) ([da43540](https://github.com/adobe/spectrum-web-components/commit/da43540abcea3db75bf145194be800b61153ebe0))
- **picker-button:** migrate to core tokens ([b39219c](https://github.com/adobe/spectrum-web-components/commit/b39219cd92f8f17420eadc74a655e0f1d074cae3))
- **sidenav:** migrate to core tokens ([1846aa3](https://github.com/adobe/spectrum-web-components/commit/1846aa30d763b1f88801b9e26c16d2c20d5b4a6a))

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Features

- **accordion:** core token migration ([#3300](https://github.com/adobe/spectrum-web-components/issues/3300)) ([9650b71](https://github.com/adobe/spectrum-web-components/commit/9650b71dd7cf7b93c351ac7b369aaf424c82f47d))
- **tabs,top-nav:** use Core Tokens ([c6ba355](https://github.com/adobe/spectrum-web-components/commit/c6ba355c2160d1a8bda1618b8a9c28213194c7c5))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

### Features

- **search:** use core tokens ([c62a7cd](https://github.com/adobe/spectrum-web-components/commit/c62a7cddae81b9767b0ce83117b790d9a7639547))

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

### Bug Fixes

- **color-handle,color-loupe:** accept updated CSS token names ([8c28f6d](https://github.com/adobe/spectrum-web-components/commit/8c28f6d002973bf7398f134ca4e73be8fee967dd))

### Features

- **dropzone:** use core tokens ([11f7560](https://github.com/adobe/spectrum-web-components/commit/11f7560fcc83c28e84d05bf23699dd6e9cc90fa1))
- **number-field:** use core tokens ([23a924e](https://github.com/adobe/spectrum-web-components/commit/23a924ef24ea5adfa0472e8e424bfeec1d184603))
- **popover:** use core tokens ([68328cc](https://github.com/adobe/spectrum-web-components/commit/68328ccd01f44758caf987e02a17d88488f9046c))
- **search,textfield:** use core tokens ([2ed5135](https://github.com/adobe/spectrum-web-components/commit/2ed51355c2787ac06274e763ea1eee7bfd0c9c72))
- **slider:** use spectrum-tokens ([8b1e72c](https://github.com/adobe/spectrum-web-components/commit/8b1e72c2876a6480421490509eb3b4def00a7a5f))
- **thumbnail:** use core tokens ([e298035](https://github.com/adobe/spectrum-web-components/commit/e2980354e04ab375bdaa8a6fc31141abc31dc802))

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/styles

# 0.30.0 (2023-05-03)

### Bug Fixes

- fast forward changes in [#2905](https://github.com/adobe/spectrum-web-components/issues/2905) ([3a30b27](https://github.com/adobe/spectrum-web-components/commit/3a30b27615aec5642918600727648d3f7a35908c))
- **styles:** add basic color-scheme support ([1ccf110](https://github.com/adobe/spectrum-web-components/commit/1ccf110e75890ecaaa7f160fce09ffeb15c570a3))

### Features

- **avatar:** use core tokens ([6937e68](https://github.com/adobe/spectrum-web-components/commit/6937e684aadd69e825de2b40bfc0366eb8555ef7))
- **button:** accept update Spectrum Tokens ([d6d6db1](https://github.com/adobe/spectrum-web-components/commit/d6d6db152ea9a1bf1ca7a475ce847ff3ca471037))
- **button:** using core-tokens for button ([a4a6d42](https://github.com/adobe/spectrum-web-components/commit/a4a6d42e7615466c6de344ccf36c8d7b4903a921))
- **color-handle:** use core tokens ([e0c1468](https://github.com/adobe/spectrum-web-components/commit/e0c1468285e04f9868ad0eb504f15412cdc22418))
- **color-loupe:** use core tokens ([149165c](https://github.com/adobe/spectrum-web-components/commit/149165c1ea67bc6348f31d79a89ccea8da7e9262))
- **field-group:** use core tokens ([7433e59](https://github.com/adobe/spectrum-web-components/commit/7433e598634adc74eb8d2d6c7794eaa5a2ec27e7))
- **illustrated-message:** use core tokens ([5f34473](https://github.com/adobe/spectrum-web-components/commit/5f34473343bbd40df090c8fe23f8df6dee860598))
- **link:** use core tokens ([510173b](https://github.com/adobe/spectrum-web-components/commit/510173bad82b61138c31d680ca11319590b3aaa3))
- **picker:** use new tokens ([7d65b69](https://github.com/adobe/spectrum-web-components/commit/7d65b69d47d69a34f75b456a5aa457f22ec04aca))
- **progress-bar:** use core tokens ([540552e](https://github.com/adobe/spectrum-web-components/commit/540552ecda4cfab4f26045a6ef2ed58457190ab9))
- **styles:** bump to latest tokens ([077434a](https://github.com/adobe/spectrum-web-components/commit/077434ada01e299a97425bf729014b3c31bd9f56))
- **styles:** update typography to leverage Core Tokens ([2f86560](https://github.com/adobe/spectrum-web-components/commit/2f86560139b98e8e014b69d6b108918010637f3d))

# [0.24.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.23.3...@spectrum-web-components/styles@0.24.0) (2023-04-24)

### Bug Fixes

- fast forward changes in [#2905](https://github.com/adobe/spectrum-web-components/issues/2905) ([3a30b27](https://github.com/adobe/spectrum-web-components/commit/3a30b27615aec5642918600727648d3f7a35908c))

### Features

- **color-handle:** use core tokens ([e0c1468](https://github.com/adobe/spectrum-web-components/commit/e0c1468285e04f9868ad0eb504f15412cdc22418))
- **color-loupe:** use core tokens ([149165c](https://github.com/adobe/spectrum-web-components/commit/149165c1ea67bc6348f31d79a89ccea8da7e9262))
- **illustrated-message:** use core tokens ([5f34473](https://github.com/adobe/spectrum-web-components/commit/5f34473343bbd40df090c8fe23f8df6dee860598))
- **styles:** bump to latest tokens ([077434a](https://github.com/adobe/spectrum-web-components/commit/077434ada01e299a97425bf729014b3c31bd9f56))
- **styles:** update typography to leverage Core Tokens ([2f86560](https://github.com/adobe/spectrum-web-components/commit/2f86560139b98e8e014b69d6b108918010637f3d))

## [0.23.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.23.2...@spectrum-web-components/styles@0.23.3) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.23.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.23.1...@spectrum-web-components/styles@0.23.2) (2023-03-22)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.23.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.23.0...@spectrum-web-components/styles@0.23.1) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.23.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.22.2...@spectrum-web-components/styles@0.23.0) (2023-02-08)

### Features

- **avatar:** use core tokens ([6937e68](https://github.com/adobe/spectrum-web-components/commit/6937e684aadd69e825de2b40bfc0366eb8555ef7))
- **button:** using core-tokens for button ([a4a6d42](https://github.com/adobe/spectrum-web-components/commit/a4a6d42e7615466c6de344ccf36c8d7b4903a921))
- **picker:** use new tokens ([7d65b69](https://github.com/adobe/spectrum-web-components/commit/7d65b69d47d69a34f75b456a5aa457f22ec04aca))
- **progress-bar:** use core tokens ([540552e](https://github.com/adobe/spectrum-web-components/commit/540552ecda4cfab4f26045a6ef2ed58457190ab9))

## [0.22.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.22.1...@spectrum-web-components/styles@0.22.2) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.22.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.22.0...@spectrum-web-components/styles@0.22.1) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.22.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.21.0...@spectrum-web-components/styles@0.22.0) (2022-12-08)

### Bug Fixes

- **styles:** add basic color-scheme support ([1ccf110](https://github.com/adobe/spectrum-web-components/commit/1ccf110e75890ecaaa7f160fce09ffeb15c570a3))

### Features

- **field-group:** use core tokens ([7433e59](https://github.com/adobe/spectrum-web-components/commit/7433e598634adc74eb8d2d6c7794eaa5a2ec27e7))

# [0.21.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.20.1...@spectrum-web-components/styles@0.21.0) (2022-11-21)

### Features

- **link:** use core tokens ([510173b](https://github.com/adobe/spectrum-web-components/commit/510173bad82b61138c31d680ca11319590b3aaa3))

## [0.20.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.20.0...@spectrum-web-components/styles@0.20.1) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.20.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.19.0...@spectrum-web-components/styles@0.20.0) (2022-10-28)

### Features

- **field-label:** use core tokens ([8db7ac4](https://github.com/adobe/spectrum-web-components/commit/8db7ac48badbad06dbcc7665e9a3bd19b271bb45))
- **progress-circle:** use core tokens ([587ac63](https://github.com/adobe/spectrum-web-components/commit/587ac63ed5cf972158fedebdeda944851dd01051))

# [0.19.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.18.0...@spectrum-web-components/styles@0.19.0) (2022-10-17)

### Features

- **action-group:** use core tokens ([73f3b51](https://github.com/adobe/spectrum-web-components/commit/73f3b51becf3c20c387bdf00b4cd54b8839a12da))

# [0.18.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.17.1...@spectrum-web-components/styles@0.18.0) (2022-10-10)

### Features

- **switch:** use core tokens ([8011ead](https://github.com/adobe/spectrum-web-components/commit/8011ead4377b8e8fb5647a7b2984e8f1695bfbf7))

## [0.17.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.17.0...@spectrum-web-components/styles@0.17.1) (2022-09-14)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.17.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.16.0...@spectrum-web-components/styles@0.17.0) (2022-08-24)

### Features

- add t-shirt sizing to the Radio pattern ([fc49343](https://github.com/adobe/spectrum-web-components/commit/fc49343311d4ff95699b455c451514cb7fc62a45))

# [0.16.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.15.1...@spectrum-web-components/styles@0.16.0) (2022-08-09)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.15.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.15.0...@spectrum-web-components/styles@0.15.1) (2022-08-04)

### Bug Fixes

- include the ":root" selector in tokens CSS for use in the docs site ([a51e465](https://github.com/adobe/spectrum-web-components/commit/a51e4653a10ccc3a0ca45b5d6a46f97bd1ff70d8))

# [0.15.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.14.0...@spectrum-web-components/styles@0.15.0) (2022-07-18)

### Features

- support Spectrum Token consumption and update Action Button to use them ([743ab16](https://github.com/adobe/spectrum-web-components/commit/743ab16d8f05335d320440effbdcb8cd4bffc97d))

# [0.14.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.13.2...@spectrum-web-components/styles@0.14.0) (2022-06-29)

### Features

- **theme:** filter css variables ([1761f3a](https://github.com/adobe/spectrum-web-components/commit/1761f3af1594e3c395dee98e7e9b1d616a74a1a1))

## [0.13.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.13.1...@spectrum-web-components/styles@0.13.2) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.13.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.13.0...@spectrum-web-components/styles@0.13.1) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.12.2...@spectrum-web-components/styles@0.13.0) (2022-04-21)

### Features

- add support for Spectrum Express ([12bfe99](https://github.com/adobe/spectrum-web-components/commit/12bfe99570122514fa88ce1a4e4a1591bcc5aa70))

## [0.12.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.12.1...@spectrum-web-components/styles@0.12.2) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.12.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.12.0...@spectrum-web-components/styles@0.12.1) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.11.4...@spectrum-web-components/styles@0.12.0) (2022-03-04)

### Features

- leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))

## [0.11.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.11.3...@spectrum-web-components/styles@0.11.4) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.11.2...@spectrum-web-components/styles@0.11.3) (2022-01-26)

### Bug Fixes

- use CSS Custom Property name supplied by Spectrum for dividers ([e6977c3](https://github.com/adobe/spectrum-web-components/commit/e6977c341cb61b7e99020afdcb739ecc2722bc57))

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.11.1...@spectrum-web-components/styles@0.11.2) (2022-01-07)

### Bug Fixes

- support --spectrum-global-dimension-dividers token ([59fda81](https://github.com/adobe/spectrum-web-components/commit/59fda81db6e2e43c0c51f719b17fb5eba64ff242))

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.11.0...@spectrum-web-components/styles@0.11.1) (2021-12-13)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.10.1...@spectrum-web-components/styles@0.11.0) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.10.0...@spectrum-web-components/styles@0.10.1) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.11...@spectrum-web-components/styles@0.10.0) (2021-11-02)

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.9.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.10...@spectrum-web-components/styles@0.9.11) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.9.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.9...@spectrum-web-components/styles@0.9.10) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.9.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.8...@spectrum-web-components/styles@0.9.9) (2021-07-01)

### Bug Fixes

- export CSS with appropriate scoping ([3cf9f40](https://github.com/adobe/spectrum-web-components/commit/3cf9f40c504c827e14231db23c0f8b9b189b222e))

## [0.9.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.7...@spectrum-web-components/styles@0.9.8) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.9.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.6...@spectrum-web-components/styles@0.9.7) (2021-06-07)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.9.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.5...@spectrum-web-components/styles@0.9.6) (2021-05-12)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.9.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.4...@spectrum-web-components/styles@0.9.5) (2021-04-15)

### Bug Fixes

- **styles:** update exports listing ([535113d](https://github.com/adobe/spectrum-web-components/commit/535113daf33b4bdecda6874f45c44469927469ec))

## [0.9.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.3...@spectrum-web-components/styles@0.9.4) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.9.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.2...@spectrum-web-components/styles@0.9.3) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.9.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.1...@spectrum-web-components/styles@0.9.2) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.9.0...@spectrum-web-components/styles@0.9.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.8.1...@spectrum-web-components/styles@0.9.0) (2021-03-04)

### Bug Fixes

- **styles:** move `@spectrum-web-components/base` from devDependencies to dependencies ([246411c](https://github.com/adobe/spectrum-web-components/commit/246411c63c96cfdabee5ee6ee36659f25cc4e0d4))

### Features

- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.8.0...@spectrum-web-components/styles@0.8.1) (2021-02-11)

### Bug Fixes

- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.6.1...@spectrum-web-components/styles@0.8.0) (2021-01-21)

### Bug Fixes

- **styles:** ensure ",map" file inclusion in the published package ([54a2b13](https://github.com/adobe/spectrum-web-components/commit/54a2b130d5ec943807429420460ffbd93f033d25))
- final prerelease review of canary builds ([1fc032f](https://github.com/adobe/spectrum-web-components/commit/1fc032ff436d8be1817a2784787e30b07a2873c6))
- missing dependency ([bb411b5](https://github.com/adobe/spectrum-web-components/commit/bb411b5691fe8ab095d5de775bf3ec3f20f3e6aa))
- **styles:** process CSS in package for use directly in a browser ([cf52924](https://github.com/adobe/spectrum-web-components/commit/cf52924404112e44a0abc6eacd4092f3ca4a9ea1))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **styles:** update spectrum css input ([88314bb](https://github.com/adobe/spectrum-web-components/commit/88314bb34c3c6f372402ded0b0d7cf97a29a5677))
- **styles:** vend CSS literal versions of the typography system ([6406c96](https://github.com/adobe/spectrum-web-components/commit/6406c96377557a88ad7756147e6e5777f5d1f746))

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.6.1...@spectrum-web-components/styles@0.7.0) (2021-01-13)

### Bug Fixes

- final prerelease review of canary builds ([1fc032f](https://github.com/adobe/spectrum-web-components/commit/1fc032ff436d8be1817a2784787e30b07a2873c6))
- **styles:** process CSS in package for use directly in a browser ([cf52924](https://github.com/adobe/spectrum-web-components/commit/cf52924404112e44a0abc6eacd4092f3ca4a9ea1))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **styles:** update spectrum css input ([88314bb](https://github.com/adobe/spectrum-web-components/commit/88314bb34c3c6f372402ded0b0d7cf97a29a5677))
- **styles:** vend CSS literal versions of the typography system ([6406c96](https://github.com/adobe/spectrum-web-components/commit/6406c96377557a88ad7756147e6e5777f5d1f746))

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.6.0...@spectrum-web-components/styles@0.6.1) (2020-08-31)

**Note:** Version bump only for package @spectrum-web-components/styles

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.5.3...@spectrum-web-components/styles@0.6.0) (2020-07-17)

### Features

- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.5.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.5.2...@spectrum-web-components/styles@0.5.3) (2020-06-08)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.5.1...@spectrum-web-components/styles@0.5.2) (2020-04-16)

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.5.0...@spectrum-web-components/styles@0.5.1) (2020-04-07)

### Bug Fixes

- **link:** correct white space in template/docs site ([a48bd06](https://github.com/adobe/spectrum-web-components/commit/a48bd06a177ed5f6ec52d44676f61f313bc90022))

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.4.3...@spectrum-web-components/styles@0.5.0) (2020-03-11)

### Features

- add "darkest" theme styles ([fe38025](https://github.com/adobe/spectrum-web-components/commit/fe38025))

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.4.2...@spectrum-web-components/styles@0.4.3) (2020-01-06)

**Note:** Version bump only for package @spectrum-web-components/styles

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.4.1...@spectrum-web-components/styles@0.4.2) (2019-12-02)

### Bug Fixes

- code review feedback ([441bbb7](https://github.com/adobe/spectrum-web-components/commit/441bbb7))
- font.css not auto-generated from spectrum-css ([2621a8a](https://github.com/adobe/spectrum-web-components/commit/2621a8a)), closes [#308](https://github.com/adobe/spectrum-web-components/issues/308)
- swap the order here so the variables are defined first ([01d8724](https://github.com/adobe/spectrum-web-components/commit/01d8724))

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.4.0...@spectrum-web-components/styles@0.4.1) (2019-11-27)

### Bug Fixes

- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716))

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.3.0...@spectrum-web-components/styles@0.4.0) (2019-11-19)

### Features

- **styles:** add typography coverage ([e8ab4dd](https://github.com/adobe/spectrum-web-components/commit/e8ab4dd))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.2.0...@spectrum-web-components/styles@0.3.0) (2019-11-19)

### Features

- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/3918888))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/styles@0.1.3...@spectrum-web-components/styles@0.2.0) (2019-10-14)

### Features

- **styles:** process, deliver, document the "large" scale ([89d4911](https://github.com/adobe/spectrum-web-components/commit/89d4911))

## 0.1.3 (2019-10-03)

**Note:** Version bump only for package @spectrum-web-components/styles
