# Change Log

## 1.9.0

### Patch Changes

- [#5721](https://github.com/adobe/spectrum-web-components/pull/5721) [`72d807c`](https://github.com/adobe/spectrum-web-components/commit/72d807c75d04b0fec1794a8d3e68383ca61d9e4c) Thanks [@iuliauta](https://github.com/iuliauta)! - - **Fixed**: Update border radius and border width for different t-shirt sizes for textfield component for S2 and Express themes

- [#5756](https://github.com/adobe/spectrum-web-components/pull/5756) [`14ebeb9`](https://github.com/adobe/spectrum-web-components/commit/14ebeb9e8a24de9c9a80e7f3f0babd19a34e8179) Thanks [@castastrophe](https://github.com/castastrophe)! - - **Fixed**: Update border color and block padding inside the textfield and textarea components for S2 and Express themes

- Updated dependencies [[`bdf54c1`](https://github.com/adobe/spectrum-web-components/commit/bdf54c1bc6d3eb20da1a1bf3b40650e6ab1ba399), [`72d807c`](https://github.com/adobe/spectrum-web-components/commit/72d807c75d04b0fec1794a8d3e68383ca61d9e4c)]:
    - @spectrum-web-components/icons-workflow@1.9.0
    - @spectrum-web-components/help-text@1.9.0
    - @spectrum-web-components/icon@1.9.0
    - @spectrum-web-components/icons-ui@1.9.0
    - @spectrum-web-components/base@1.9.0
    - @spectrum-web-components/shared@1.9.0

## 1.8.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/help-text@1.8.0
    - @spectrum-web-components/icon@1.8.0
    - @spectrum-web-components/icons-ui@1.8.0
    - @spectrum-web-components/icons-workflow@1.8.0
    - @spectrum-web-components/base@1.8.0
    - @spectrum-web-components/shared@1.8.0

## 1.7.0

### Patch Changes

- [#5504](https://github.com/adobe/spectrum-web-components/pull/5504) [`cde976d`](https://github.com/adobe/spectrum-web-components/commit/cde976ddfa71f898e2d0404ecc53150db149a861) Thanks [@castastrophe](https://github.com/castastrophe)! - Replace deprecated `word-break: break-word` with `overflow-wrap: break-word` to align with modern CSS standards and improve cross-browser compatibility. This property was deprecated in Chrome 44 (July 2015) in favor of the standardized `overflow-wrap` property.

- Updated dependencies []:
    - @spectrum-web-components/help-text@1.7.0
    - @spectrum-web-components/icon@1.7.0
    - @spectrum-web-components/icons-ui@1.7.0
    - @spectrum-web-components/icons-workflow@1.7.0
    - @spectrum-web-components/base@1.7.0
    - @spectrum-web-components/shared@1.7.0

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

- Updated dependencies [[`f6cebbd`](https://github.com/adobe/spectrum-web-components/commit/f6cebbd90008a2abb1232c355ae06e8566086093)]:
    - @spectrum-web-components/icons-workflow@1.6.0
    - @spectrum-web-components/help-text@1.6.0
    - @spectrum-web-components/icon@1.6.0
    - @spectrum-web-components/icons-ui@1.6.0
    - @spectrum-web-components/base@1.6.0
    - @spectrum-web-components/shared@1.6.0

## 1.5.0

### Patch Changes

- Updated dependencies [[`165a904`](https://github.com/adobe/spectrum-web-components/commit/165a904bd01fddea922fe87b181bbf41281f81f0)]:
    - @spectrum-web-components/help-text@1.5.0
    - @spectrum-web-components/icon@1.5.0
    - @spectrum-web-components/icons-ui@1.5.0
    - @spectrum-web-components/icons-workflow@1.5.0
    - @spectrum-web-components/base@1.5.0
    - @spectrum-web-components/shared@1.5.0

## 1.4.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/help-text@1.4.0
    - @spectrum-web-components/icon@1.4.0
    - @spectrum-web-components/icons-ui@1.4.0
    - @spectrum-web-components/icons-workflow@1.4.0
    - @spectrum-web-components/base@1.4.0
    - @spectrum-web-components/shared@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/help-text@1.3.0
    - @spectrum-web-components/icon@1.3.0
    - @spectrum-web-components/icons-ui@1.3.0
    - @spectrum-web-components/icons-workflow@1.3.0
    - @spectrum-web-components/base@1.3.0
    - @spectrum-web-components/shared@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

### Features

- **breadcrumbs:** add Breadcrumbs component ([#4578](https://github.com/adobe/spectrum-web-components/issues/4578)) ([acd4b5e](https://github.com/adobe/spectrum-web-components/commit/acd4b5e4401dad8cf26b50ee5dcda80a28b62999))

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

### Bug Fixes

- **number-field:** select full value when using Tab to enter a field with a unit ([#4340](https://github.com/adobe/spectrum-web-components/issues/4340)) ([a9d5cef](https://github.com/adobe/spectrum-web-components/commit/a9d5cef4a69af4f3f357bacbfdae9465d3e80fa5))

### Features

- **contextual-help:** add contextual help pattern ([#4285](https://github.com/adobe/spectrum-web-components/issues/4285)) ([a259aa3](https://github.com/adobe/spectrum-web-components/commit/a259aa35ee4e8a7fba7afb21e806f13bffceeaf3))

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

### Bug Fixes

- **number-field:** select full value when using Tab to enter a field with a unit ([#4340](https://github.com/adobe/spectrum-web-components/issues/4340)) ([a9d5cef](https://github.com/adobe/spectrum-web-components/commit/a9d5cef4a69af4f3f357bacbfdae9465d3e80fa5))

### Features

- **contextual-help:** add contextual help pattern ([#4285](https://github.com/adobe/spectrum-web-components/issues/4285)) ([a259aa3](https://github.com/adobe/spectrum-web-components/commit/a259aa35ee4e8a7fba7afb21e806f13bffceeaf3))

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

### Bug Fixes

- **number-field:** select full value when using Tab to enter a field with a unit ([#4340](https://github.com/adobe/spectrum-web-components/issues/4340)) ([a9d5cef](https://github.com/adobe/spectrum-web-components/commit/a9d5cef4a69af4f3f357bacbfdae9465d3e80fa5))

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

### Bug Fixes

- **textfield:** textarea actually grows with multiline ([#4271](https://github.com/adobe/spectrum-web-components/issues/4271)) ([d8d0e84](https://github.com/adobe/spectrum-web-components/commit/d8d0e843b3bcab345dd7d46ad055e2bb5445ec36))

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

### Bug Fixes

- **textfield:** textarea actually grows with multiline ([#4271](https://github.com/adobe/spectrum-web-components/issues/4271)) ([d8d0e84](https://github.com/adobe/spectrum-web-components/commit/d8d0e843b3bcab345dd7d46ad055e2bb5445ec36))

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

### Bug Fixes

- **textfield:** clearly mark/support "multiline" as a requirement of "grows" ([a3e464d](https://github.com/adobe/spectrum-web-components/commit/a3e464d7ceda90ad241641916180ab6e8ea119dc))

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

### Bug Fixes

- **combobox:** add combobox pattern ([#3894](https://github.com/adobe/spectrum-web-components/issues/3894)) ([47d7d71](https://github.com/adobe/spectrum-web-components/commit/47d7d71bc9e17b67452d45b9495c970dac15ff89)), closes [#3887](https://github.com/adobe/spectrum-web-components/issues/3887)

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

### Features

- **textfield:** added name attribute to textfield ([#3752](https://github.com/adobe/spectrum-web-components/issues/3752)) ([593005a](https://github.com/adobe/spectrum-web-components/commit/593005a8892139beb9ece9342b51a2b43d63cef3))

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Bug Fixes

- correct composition entry of multi-byte numbers ([#3610](https://github.com/adobe/spectrum-web-components/issues/3610)) ([5e11934](https://github.com/adobe/spectrum-web-components/commit/5e1193455dd876a45648b3040688a3bc389819a1))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

### Bug Fixes

- **number-field:** update button label to use number-field-labels as part of the text ([#3474](https://github.com/adobe/spectrum-web-components/issues/3474)) ([b92daf2](https://github.com/adobe/spectrum-web-components/commit/b92daf2f50224a362215477341d7d10a4eb39734))
- setting title when textfield is invalid ([36d0537](https://github.com/adobe/spectrum-web-components/commit/36d05372bd829470ac3e16f52f1fad2a7ea513ba))
- **textfield:** add support for [grows] when [multiline] ([3b306d4](https://github.com/adobe/spectrum-web-components/commit/3b306d434d366ae826ecf7d47e20f7780eb74a28))
- **textfield:** update focus state when [multiline][quiet] ([#3452](https://github.com/adobe/spectrum-web-components/issues/3452)) ([a7f563a](https://github.com/adobe/spectrum-web-components/commit/a7f563a240cda22c58c4a850fc65ed5d867bafb1))

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Bug Fixes

- **number-field,search,textfield:** add t-shirt sizes ([fda8f96](https://github.com/adobe/spectrum-web-components/commit/fda8f96b71b1447a8281f73d885c1c33ae74cfec))
- **textfield:** add rows attribute ([#3356](https://github.com/adobe/spectrum-web-components/issues/3356)) ([1ee1c37](https://github.com/adobe/spectrum-web-components/commit/1ee1c37f219c82fd74ca1b89941d4f59ccfd2785))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

### Bug Fixes

- **number-field:** simplify width management ([ef4765a](https://github.com/adobe/spectrum-web-components/commit/ef4765a33f81d19229d13ea418aa625f5e1e693a))

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

### Features

- **search,textfield:** use core tokens ([2ed5135](https://github.com/adobe/spectrum-web-components/commit/2ed51355c2787ac06274e763ea1eee7bfd0c9c72))

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/textfield

# 0.30.0 (2023-05-03)

### Bug Fixes

- add support for "readonly" attribute ([4bce3b7](https://github.com/adobe/spectrum-web-components/commit/4bce3b7b6910ac50e80efe6a8f63f57843feafb3))
- apply "HelpTextMixin" to form elements ([a952447](https://github.com/adobe/spectrum-web-components/commit/a952447254d091b99fe9270b2857cddc48df7c73))
- apply Focuable styles in class extensions ([38f7afd](https://github.com/adobe/spectrum-web-components/commit/38f7afd7cdb317d5c8b6e69f1301decd21364b1d))
- **button:** relate to this.href correctly ([fade3ea](https://github.com/adobe/spectrum-web-components/commit/fade3ea9bd6bda6192f84a0ab9af4b812517e267))
- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
- correct sp-textfield[multiline][grows] styling and add story for regression testing ([58c9331](https://github.com/adobe/spectrum-web-components/commit/58c9331b75c94d2bcbe1742b023e1bd884c52bb3))
- disallow undefined property for min and maxlength ([21547f7](https://github.com/adobe/spectrum-web-components/commit/21547f70e3e2987ca72f14a294519560bdb901e3))
- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716f2f787deb8d868a78bd28c8e62fe90e21))
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- minlength now accepted as minimum length for value.toString ([bc3b1c2](https://github.com/adobe/spectrum-web-components/commit/bc3b1c2ab56d1b569203ed4fb87e293a4990544a))
- normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cdac98282c886f23c4a8d6cf4910c4a606c))
- **number-field:** process 2 byte characters as their single byte cousins ([f424c0a](https://github.com/adobe/spectrum-web-components/commit/f424c0aa9e04baf24aa3f6c23dd4697ab0699fc0))
- prevent tabindex=-1 elements from placing focus on their host ([1ac1293](https://github.com/adobe/spectrum-web-components/commit/1ac12931771c6d5fdbc99f5d214702ed644cb81a))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- **textfield:** add 'u' flag to keep consistency with native input element ([0af779f](https://github.com/adobe/spectrum-web-components/commit/0af779f040ebe1b2b2a80a19afe1df42201dbe3e))
- **textfield:** add maxlength and minlength attributes ([5326649](https://github.com/adobe/spectrum-web-components/commit/5326649daac788e922a4493b9172cc20518b8abb))
- **textfield:** add select() API mapping to shadow DOM element ([d467a34](https://github.com/adobe/spectrum-web-components/commit/d467a3463f326d839c9d51ffacd24f8fdfb1aff1))
- **textfield:** break very long words within the Textarea's sizer element ([2f95ac0](https://github.com/adobe/spectrum-web-components/commit/2f95ac04a3ad3c200172cd3c364c9014c7d6dfde))
- **textfield:** correct "multiline" and "grows" delivery ([fa0ac34](https://github.com/adobe/spectrum-web-components/commit/fa0ac3437b269f009ef47d080b41996fe0a25779))
- **textfield:** leverage aria-invalid attribute ([e718c0a](https://github.com/adobe/spectrum-web-components/commit/e718c0ac0d9f037b2bb9c6fb53ffc2121298731a))
- **textfield:** prevent IME selection misalignment in Safari when using hiragana input modality ([f8e1e70](https://github.com/adobe/spectrum-web-components/commit/f8e1e709e99d62e67589d8f54f15d49a9ecf2f32))
- **textfield:** process ".is-focused" and ".is-keyboardFocused" styles ([48fd67d](https://github.com/adobe/spectrum-web-components/commit/48fd67d7cdab3aac26c20a8e9232d6320b27fb59))
- **textfield:** reimplement min/maxlength ([23a4c2e](https://github.com/adobe/spectrum-web-components/commit/23a4c2e61dbc399bf9e58bb32952e16b8aa9d5ae))
- **textfield:** remove use of sp-icons-\* ([9a5c213](https://github.com/adobe/spectrum-web-components/commit/9a5c213a886146709601a2878484529c315d9f51))
- **textfield:** respect resize styling ([04993c3](https://github.com/adobe/spectrum-web-components/commit/04993c380d485b0e9b02fd6ad196e5caaf29e0a2))
- **textfield:** respect type=text|url|tel|email|password ([1b7a59a](https://github.com/adobe/spectrum-web-components/commit/1b7a59a208ce00a62c23c80b75bacabf73c3e6ea))
- **textfield:** update for easier extensibility ([9deaf9e](https://github.com/adobe/spectrum-web-components/commit/9deaf9e4f5a476593378f8feaaae352fd8bb80d7))
- **textfield:** update validation path, add "allowed-keys" ([ae9f85d](https://github.com/adobe/spectrum-web-components/commit/ae9f85d3b0ec30bbcf5fbe3d4750a1cd96c990d5))
- **textfield:** Use correct filename in exports field ([637b166](https://github.com/adobe/spectrum-web-components/commit/637b166420e3a0fa41980bfbb24129df77ff4efd))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
- pass through autocomplete attribute to inputs ([5416510](https://github.com/adobe/spectrum-web-components/commit/541651063fb67766426168ef0ad885bb89b6b762))
- **search:** use Spectrum CSS ^3.0.0 ([7830ac0](https://github.com/adobe/spectrum-web-components/commit/7830ac0868e855145cee0922529a0f6d4d3e7f50))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- **textfield:** add support for setSelectionRange ([#2070](https://github.com/adobe/spectrum-web-components/issues/2070)) ([dd17ba0](https://github.com/adobe/spectrum-web-components/commit/dd17ba0f50cc604b4dcd14699d5129710aac121b))
- **textfield:** update spectrum css input ([2ce4ba2](https://github.com/adobe/spectrum-web-components/commit/2ce4ba2e0a9c6dcc6c0041fde02b0d98f08cf6a1))
- **textfield:** use Spectrum CSS ^3.0.0 ([1c1acb9](https://github.com/adobe/spectrum-web-components/commit/1c1acb94577f97c189a5f4e2d34bf81dc169447c))
- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
- use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc77960de8e57dd9c49bb7669df689f0ebaa))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/39188887afad9bec52ef48d4e22596f9b757a9fe))
- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))
- use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0accd643c2f35cbf1ba809b54f52c25628d))

### Reverts

- Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))

## [0.13.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.14...@spectrum-web-components/textfield@0.13.15) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.13...@spectrum-web-components/textfield@0.13.14) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.12...@spectrum-web-components/textfield@0.13.13) (2023-03-22)

### Bug Fixes

- minlength now accepted as minimum length for value.toString ([bc3b1c2](https://github.com/adobe/spectrum-web-components/commit/bc3b1c2ab56d1b569203ed4fb87e293a4990544a))

## [0.13.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.11...@spectrum-web-components/textfield@0.13.12) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.10...@spectrum-web-components/textfield@0.13.11) (2023-02-08)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.9...@spectrum-web-components/textfield@0.13.10) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.8...@spectrum-web-components/textfield@0.13.9) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.7...@spectrum-web-components/textfield@0.13.8) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.6...@spectrum-web-components/textfield@0.13.7) (2022-11-21)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.5...@spectrum-web-components/textfield@0.13.6) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.4...@spectrum-web-components/textfield@0.13.5) (2022-10-28)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.3...@spectrum-web-components/textfield@0.13.4) (2022-10-17)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.2...@spectrum-web-components/textfield@0.13.3) (2022-10-10)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.1...@spectrum-web-components/textfield@0.13.2) (2022-09-14)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.13.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.13.0...@spectrum-web-components/textfield@0.13.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.12.0...@spectrum-web-components/textfield@0.13.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.10...@spectrum-web-components/textfield@0.12.0) (2022-08-04)

### Features

- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))

## [0.11.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.9...@spectrum-web-components/textfield@0.11.10) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.11.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.8...@spectrum-web-components/textfield@0.11.9) (2022-06-29)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.11.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.7...@spectrum-web-components/textfield@0.11.8) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.11.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.6...@spectrum-web-components/textfield@0.11.7) (2022-05-27)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.11.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.5...@spectrum-web-components/textfield@0.11.6) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.11.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.4...@spectrum-web-components/textfield@0.11.5) (2022-04-21)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.11.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.3...@spectrum-web-components/textfield@0.11.4) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.2...@spectrum-web-components/textfield@0.11.3) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.1...@spectrum-web-components/textfield@0.11.2) (2022-03-04)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.11.0...@spectrum-web-components/textfield@0.11.1) (2022-02-22)

### Bug Fixes

- **textfield:** correct "multiline" and "grows" delivery ([fa0ac34](https://github.com/adobe/spectrum-web-components/commit/fa0ac3437b269f009ef47d080b41996fe0a25779))

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.10.2...@spectrum-web-components/textfield@0.11.0) (2022-01-26)

### Bug Fixes

- **number-field:** process 2 byte characters as their single byte cousins ([f424c0a](https://github.com/adobe/spectrum-web-components/commit/f424c0aa9e04baf24aa3f6c23dd4697ab0699fc0))

### Features

- **textfield:** add support for setSelectionRange ([#2070](https://github.com/adobe/spectrum-web-components/issues/2070)) ([dd17ba0](https://github.com/adobe/spectrum-web-components/commit/dd17ba0f50cc604b4dcd14699d5129710aac121b))

## [0.10.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.10.1...@spectrum-web-components/textfield@0.10.2) (2022-01-07)

### Bug Fixes

- **textfield:** prevent IME selection misalignment in Safari when using hiragana input modality ([f8e1e70](https://github.com/adobe/spectrum-web-components/commit/f8e1e709e99d62e67589d8f54f15d49a9ecf2f32))

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.10.0...@spectrum-web-components/textfield@0.10.1) (2021-12-13)

### Bug Fixes

- apply "HelpTextMixin" to form elements ([a952447](https://github.com/adobe/spectrum-web-components/commit/a952447254d091b99fe9270b2857cddc48df7c73))

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.9.1...@spectrum-web-components/textfield@0.10.0) (2021-11-08)

### Features

- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.9.0...@spectrum-web-components/textfield@0.9.1) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.16...@spectrum-web-components/textfield@0.9.0) (2021-11-02)

### Bug Fixes

- **textfield:** respect type=text|url|tel|email|password ([1b7a59a](https://github.com/adobe/spectrum-web-components/commit/1b7a59a208ce00a62c23c80b75bacabf73c3e6ea))

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.8.16](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.15...@spectrum-web-components/textfield@0.8.16) (2021-10-12)

### Bug Fixes

- **textfield:** respect resize styling ([04993c3](https://github.com/adobe/spectrum-web-components/commit/04993c380d485b0e9b02fd6ad196e5caaf29e0a2))

## [0.8.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.14...@spectrum-web-components/textfield@0.8.15) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.8.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.13...@spectrum-web-components/textfield@0.8.14) (2021-09-13)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.8.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.12...@spectrum-web-components/textfield@0.8.13) (2021-08-24)

### Bug Fixes

- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.8.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.11...@spectrum-web-components/textfield@0.8.12) (2021-08-03)

### Bug Fixes

- **textfield:** break very long words within the Textarea's sizer element ([2f95ac0](https://github.com/adobe/spectrum-web-components/commit/2f95ac04a3ad3c200172cd3c364c9014c7d6dfde))

## [0.8.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.10...@spectrum-web-components/textfield@0.8.11) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.8.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.9...@spectrum-web-components/textfield@0.8.10) (2021-07-01)

### Bug Fixes

- correct sp-textfield[multiline][grows] styling and add story for regression testing ([58c9331](https://github.com/adobe/spectrum-web-components/commit/58c9331b75c94d2bcbe1742b023e1bd884c52bb3))

## [0.8.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.8...@spectrum-web-components/textfield@0.8.9) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.8.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.7...@spectrum-web-components/textfield@0.8.8) (2021-06-07)

### Bug Fixes

- **textfield:** add select() API mapping to shadow DOM element ([d467a34](https://github.com/adobe/spectrum-web-components/commit/d467a3463f326d839c9d51ffacd24f8fdfb1aff1))

## [0.8.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.6...@spectrum-web-components/textfield@0.8.7) (2021-05-24)

### Bug Fixes

- prevent tabindex=-1 elements from placing focus on their host ([1ac1293](https://github.com/adobe/spectrum-web-components/commit/1ac12931771c6d5fdbc99f5d214702ed644cb81a))
- **textfield:** update for easier extensibility ([9deaf9e](https://github.com/adobe/spectrum-web-components/commit/9deaf9e4f5a476593378f8feaaae352fd8bb80d7))

## [0.8.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.5...@spectrum-web-components/textfield@0.8.6) (2021-05-12)

### Bug Fixes

- **textfield:** add 'u' flag to keep consistency with native input element ([0af779f](https://github.com/adobe/spectrum-web-components/commit/0af779f040ebe1b2b2a80a19afe1df42201dbe3e))

## [0.8.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.4...@spectrum-web-components/textfield@0.8.5) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.8.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.3...@spectrum-web-components/textfield@0.8.4) (2021-03-29)

### Bug Fixes

- **textfield:** leverage aria-invalid attribute ([e718c0a](https://github.com/adobe/spectrum-web-components/commit/e718c0ac0d9f037b2bb9c6fb53ffc2121298731a))

## [0.8.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.2...@spectrum-web-components/textfield@0.8.3) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.1...@spectrum-web-components/textfield@0.8.2) (2021-03-22)

### Bug Fixes

- add support for "readonly" attribute ([4bce3b7](https://github.com/adobe/spectrum-web-components/commit/4bce3b7b6910ac50e80efe6a8f63f57843feafb3))

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.8.0...@spectrum-web-components/textfield@0.8.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.7.3...@spectrum-web-components/textfield@0.8.0) (2021-03-04)

### Features

- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.7.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.7.2...@spectrum-web-components/textfield@0.7.3) (2021-02-11)

### Bug Fixes

- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

## [0.7.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.7.1...@spectrum-web-components/textfield@0.7.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.7.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.7.0...@spectrum-web-components/textfield@0.7.1) (2021-01-28)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.5.4...@spectrum-web-components/textfield@0.7.0) (2021-01-21)

### Bug Fixes

- disallow undefined property for min and maxlength ([21547f7](https://github.com/adobe/spectrum-web-components/commit/21547f70e3e2987ca72f14a294519560bdb901e3))
- **textfield:** reimplement min/maxlength ([23a4c2e](https://github.com/adobe/spectrum-web-components/commit/23a4c2e61dbc399bf9e58bb32952e16b8aa9d5ae))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- **button:** relate to this.href correctly ([fade3ea](https://github.com/adobe/spectrum-web-components/commit/fade3ea9bd6bda6192f84a0ab9af4b812517e267))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- **textfield:** process ".is-focused" and ".is-keyboardFocused" styles ([48fd67d](https://github.com/adobe/spectrum-web-components/commit/48fd67d7cdab3aac26c20a8e9232d6320b27fb59))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- **textfield:** update spectrum css input ([2ce4ba2](https://github.com/adobe/spectrum-web-components/commit/2ce4ba2e0a9c6dcc6c0041fde02b0d98f08cf6a1))

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.5.4...@spectrum-web-components/textfield@0.6.0) (2021-01-13)

### Bug Fixes

- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- **button:** relate to this.href correctly ([fade3ea](https://github.com/adobe/spectrum-web-components/commit/fade3ea9bd6bda6192f84a0ab9af4b812517e267))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- **textfield:** process ".is-focused" and ".is-keyboardFocused" styles ([48fd67d](https://github.com/adobe/spectrum-web-components/commit/48fd67d7cdab3aac26c20a8e9232d6320b27fb59))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- **textfield:** update spectrum css input ([2ce4ba2](https://github.com/adobe/spectrum-web-components/commit/2ce4ba2e0a9c6dcc6c0041fde02b0d98f08cf6a1))

## [0.5.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.5.3...@spectrum-web-components/textfield@0.5.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.5.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.5.2...@spectrum-web-components/textfield@0.5.3) (2020-10-12)

### Bug Fixes

- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.5.1...@spectrum-web-components/textfield@0.5.2) (2020-09-25)

### Bug Fixes

- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.5.0...@spectrum-web-components/textfield@0.5.1) (2020-09-14)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.4.4...@spectrum-web-components/textfield@0.5.0) (2020-08-31)

### Features

- **search:** use Spectrum CSS ^3.0.0 ([7830ac0](https://github.com/adobe/spectrum-web-components/commit/7830ac0868e855145cee0922529a0f6d4d3e7f50))
- **textfield:** use Spectrum CSS ^3.0.0 ([1c1acb9](https://github.com/adobe/spectrum-web-components/commit/1c1acb94577f97c189a5f4e2d34bf81dc169447c))

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.4.3...@spectrum-web-components/textfield@0.4.4) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.4.2...@spectrum-web-components/textfield@0.4.3) (2020-07-27)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.4.1...@spectrum-web-components/textfield@0.4.2) (2020-07-24)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.4.0...@spectrum-web-components/textfield@0.4.1) (2020-07-22)

### Bug Fixes

- **textfield:** Use correct filename in exports field ([637b166](https://github.com/adobe/spectrum-web-components/commit/637b166420e3a0fa41980bfbb24129df77ff4efd))

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.9...@spectrum-web-components/textfield@0.4.0) (2020-07-17)

### Features

- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.3.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.8...@spectrum-web-components/textfield@0.3.9) (2020-06-08)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.3.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.7...@spectrum-web-components/textfield@0.3.8) (2020-05-08)

### Bug Fixes

- **textfield:** add maxlength and minlength attributes ([5326649](https://github.com/adobe/spectrum-web-components/commit/5326649daac788e922a4493b9172cc20518b8abb))

## [0.3.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.6...@spectrum-web-components/textfield@0.3.7) (2020-04-16)

### Bug Fixes

- **textfield:** remove use of sp-icons-\* ([9a5c213](https://github.com/adobe/spectrum-web-components/commit/9a5c213a886146709601a2878484529c315d9f51))

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.3.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.5...@spectrum-web-components/textfield@0.3.6) (2020-04-10)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.3.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.4...@spectrum-web-components/textfield@0.3.5) (2020-04-07)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.3.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.3...@spectrum-web-components/textfield@0.3.4) (2020-03-25)

### Bug Fixes

- **textfield:** update validation path, add "allowed-keys" ([ae9f85d](https://github.com/adobe/spectrum-web-components/commit/ae9f85d))

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.2...@spectrum-web-components/textfield@0.3.3) (2020-03-11)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.1...@spectrum-web-components/textfield@0.3.2) (2020-02-05)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.3.0...@spectrum-web-components/textfield@0.3.1) (2020-02-01)

**Note:** Version bump only for package @spectrum-web-components/textfield

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.2.4...@spectrum-web-components/textfield@0.3.0) (2020-01-30)

### Features

- pass through autocomplete attribute to inputs ([5416510](https://github.com/adobe/spectrum-web-components/commit/5416510))

## [0.2.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.2.3...@spectrum-web-components/textfield@0.2.4) (2020-01-06)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.2.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.2.2...@spectrum-web-components/textfield@0.2.3) (2019-12-12)

### Bug Fixes

- apply Focuable styles in class extensions ([38f7afd](https://github.com/adobe/spectrum-web-components/commit/38f7afd))

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.2.1...@spectrum-web-components/textfield@0.2.2) (2019-12-02)

### Bug Fixes

- normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cd))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.2.0...@spectrum-web-components/textfield@0.2.1) (2019-11-27)

### Bug Fixes

- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.1.5...@spectrum-web-components/textfield@0.2.0) (2019-11-19)

### Features

- use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc7))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/3918888))

## [0.1.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.1.4...@spectrum-web-components/textfield@0.1.5) (2019-11-01)

**Note:** Version bump only for package @spectrum-web-components/textfield

## [0.1.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/textfield@0.1.3...@spectrum-web-components/textfield@0.1.4) (2019-10-14)

### Performance Improvements

- use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0a))

## 0.1.3 (2019-10-03)

**Note:** Version bump only for package @spectrum-web-components/textfield
