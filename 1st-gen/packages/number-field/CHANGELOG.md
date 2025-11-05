# Change Log

## 1.10.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.10.0
    - @spectrum-web-components/icon@1.10.0
    - @spectrum-web-components/icons-ui@1.10.0
    - @spectrum-web-components/infield-button@1.10.0
    - @spectrum-web-components/textfield@1.10.0
    - @spectrum-web-components/shared@1.10.0
    - @spectrum-web-components/reactive-controllers@1.10.0

## 1.9.1

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/icon@1.9.1
    - @spectrum-web-components/icons-ui@1.9.1
    - @spectrum-web-components/infield-button@1.9.1
    - @spectrum-web-components/textfield@1.9.1
    - @spectrum-web-components/base@1.9.1
    - @spectrum-web-components/reactive-controllers@1.9.1
    - @spectrum-web-components/shared@1.9.1

## 1.9.0

### Patch Changes

- Updated dependencies [[`72d807c`](https://github.com/adobe/spectrum-web-components/commit/72d807c75d04b0fec1794a8d3e68383ca61d9e4c), [`14ebeb9`](https://github.com/adobe/spectrum-web-components/commit/14ebeb9e8a24de9c9a80e7f3f0babd19a34e8179), [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8)]:
    - @spectrum-web-components/textfield@1.9.0
    - @spectrum-web-components/reactive-controllers@1.9.0
    - @spectrum-web-components/infield-button@1.9.0
    - @spectrum-web-components/icon@1.9.0
    - @spectrum-web-components/icons-ui@1.9.0
    - @spectrum-web-components/base@1.9.0
    - @spectrum-web-components/shared@1.9.0

## 1.8.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/infield-button@1.8.0
    - @spectrum-web-components/icon@1.8.0
    - @spectrum-web-components/icons-ui@1.8.0
    - @spectrum-web-components/textfield@1.8.0
    - @spectrum-web-components/base@1.8.0
    - @spectrum-web-components/reactive-controllers@1.8.0
    - @spectrum-web-components/shared@1.8.0

## 1.7.0

### Patch Changes

- Updated dependencies [[`cde976d`](https://github.com/adobe/spectrum-web-components/commit/cde976ddfa71f898e2d0404ecc53150db149a861)]:
    - @spectrum-web-components/textfield@1.7.0
    - @spectrum-web-components/icon@1.7.0
    - @spectrum-web-components/icons-ui@1.7.0
    - @spectrum-web-components/infield-button@1.7.0
    - @spectrum-web-components/base@1.7.0
    - @spectrum-web-components/reactive-controllers@1.7.0
    - @spectrum-web-components/shared@1.7.0

## 1.6.0

### Patch Changes

- [#5408](https://github.com/adobe/spectrum-web-components/pull/5408) [`74386e8`](https://github.com/adobe/spectrum-web-components/commit/74386e8c5b4717270fcccd9ebb72dab8cf757515) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)! - The changes included resolve UI issues with number-field by proxy of textfield. The validation icons in number-field no longer overlap the infield buttons. The width of the number-field now calculates accurately and can be modified via `--mod-stepper-width` token as it was before.

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

- Updated dependencies [[`9e15a66`](https://github.com/adobe/spectrum-web-components/commit/9e15a66a281745004add414ff977d4a71186aedd)]:
    - @spectrum-web-components/infield-button@1.6.0
    - @spectrum-web-components/textfield@1.6.0
    - @spectrum-web-components/icon@1.6.0
    - @spectrum-web-components/icons-ui@1.6.0
    - @spectrum-web-components/base@1.6.0
    - @spectrum-web-components/reactive-controllers@1.6.0
    - @spectrum-web-components/shared@1.6.0

## 1.5.0

### Minor Changes

- [#5284](https://github.com/adobe/spectrum-web-components/pull/5284) [`5a3bc6d`](https://github.com/adobe/spectrum-web-components/commit/5a3bc6d24ea95f6dd5b5ead9d7eb45c393324ee9) Thanks [@blunteshwar](https://github.com/blunteshwar)! - Fixed keyboard flickering on mobile devices when using NumberField's increment/decrement buttons

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/textfield@1.5.0
    - @spectrum-web-components/infield-button@1.5.0
    - @spectrum-web-components/icon@1.5.0
    - @spectrum-web-components/icons-ui@1.5.0
    - @spectrum-web-components/base@1.5.0
    - @spectrum-web-components/reactive-controllers@1.5.0
    - @spectrum-web-components/shared@1.5.0

## 1.4.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/icon@1.4.0
    - @spectrum-web-components/icons-ui@1.4.0
    - @spectrum-web-components/infield-button@1.4.0
    - @spectrum-web-components/textfield@1.4.0
    - @spectrum-web-components/base@1.4.0
    - @spectrum-web-components/reactive-controllers@1.4.0
    - @spectrum-web-components/shared@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies [[`ea38ef0`](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)]:
    - @spectrum-web-components/reactive-controllers@1.3.0
    - @spectrum-web-components/infield-button@1.3.0
    - @spectrum-web-components/icon@1.3.0
    - @spectrum-web-components/icons-ui@1.3.0
    - @spectrum-web-components/textfield@1.3.0
    - @spectrum-web-components/base@1.3.0
    - @spectrum-web-components/shared@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

### Bug Fixes

- **number-field:** added aria-hidden attribute for inc/dec buttons ([#4933](https://github.com/adobe/spectrum-web-components/issues/4933)) ([b16a839](https://github.com/adobe/spectrum-web-components/commit/b16a839b33cc7d02b42e012afaa6327972eb0c6b))

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

### Bug Fixes

- **number-field, slider:** ensure cached value is cleared when toggling between different steps ([#4846](https://github.com/adobe/spectrum-web-components/issues/4846)) ([1c84c96](https://github.com/adobe/spectrum-web-components/commit/1c84c968f55cde28d0144a78153c9a33a078c726))
- **number-field:** allow only numeric characters for Japanese/Chinese IME ([#4817](https://github.com/adobe/spectrum-web-components/issues/4817)) ([a791bd1](https://github.com/adobe/spectrum-web-components/commit/a791bd1c027ede4c88e8c066ef97610409a0f2c4))

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

### Bug Fixes

- **number-field:** show decimal on iPad minimized keyboard ([#4784](https://github.com/adobe/spectrum-web-components/issues/4784)) ([deb7a1c](https://github.com/adobe/spectrum-web-components/commit/deb7a1cce452f120a9c2c96d73b0d03132c02565))

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

### Bug Fixes

- add null check in updated method of sp-number-field ([#4709](https://github.com/adobe/spectrum-web-components/issues/4709)) ([7b1eeab](https://github.com/adobe/spectrum-web-components/commit/7b1eeab613fffe833ea0f57a23d2cc11bef71ea7))

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

### Bug Fixes

- **number-field:** update IME change detection ([#4672](https://github.com/adobe/spectrum-web-components/issues/4672)) ([de05aee](https://github.com/adobe/spectrum-web-components/commit/de05aee7c414e6cfcd27a12f129b03886311d3bf))

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

### Bug Fixes

- **number-field:** multiple separators use-cases in decimal inputs in iOS devices ([#4571](https://github.com/adobe/spectrum-web-components/issues/4571)) ([6319da8](https://github.com/adobe/spectrum-web-components/commit/6319da80a21511735d9e9518125dbc2a24364f88))

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

### Bug Fixes

- **number-field:** updated number field to respect all locales ([#4508](https://github.com/adobe/spectrum-web-components/issues/4508)) ([cc6e928](https://github.com/adobe/spectrum-web-components/commit/cc6e928bc6797280f119994b1908f17bbcb574e3))

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

### Bug Fixes

- **number-field:** select full value when using Tab to enter a field with a unit ([#4340](https://github.com/adobe/spectrum-web-components/issues/4340)) ([a9d5cef](https://github.com/adobe/spectrum-web-components/commit/a9d5cef4a69af4f3f357bacbfdae9465d3e80fa5))

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

### Bug Fixes

- **number-field, slider:** floating point roundoff precision bug ([#4263](https://github.com/adobe/spectrum-web-components/issues/4263)) ([74480ef](https://github.com/adobe/spectrum-web-components/commit/74480efd47305a7d41d0e20682d8dcba1c129f2f))
- **number-field:** handles values greater than 1000 ([#4417](https://github.com/adobe/spectrum-web-components/issues/4417)) ([45d69d0](https://github.com/adobe/spectrum-web-components/commit/45d69d0bb927bd18c3d58c757c40c14768b70a82))

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

### Bug Fixes

- **number-field, slider:** floating point roundoff precision bug ([#4263](https://github.com/adobe/spectrum-web-components/issues/4263)) ([74480ef](https://github.com/adobe/spectrum-web-components/commit/74480efd47305a7d41d0e20682d8dcba1c129f2f))

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Bug Fixes

- **styles, theme:** surface exports that omit Spectrum Vars proactively ([#4142](https://github.com/adobe/spectrum-web-components/issues/4142)) ([5b524c1](https://github.com/adobe/spectrum-web-components/commit/5b524c1d54a64225cb3b2f71b92f581695985519))

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

### Bug Fixes

- **combobox:** add combobox pattern ([#3894](https://github.com/adobe/spectrum-web-components/issues/3894)) ([47d7d71](https://github.com/adobe/spectrum-web-components/commit/47d7d71bc9e17b67452d45b9495c970dac15ff89)), closes [#3887](https://github.com/adobe/spectrum-web-components/issues/3887)

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

### Bug Fixes

- **number-field:** validate min/max in more contexts ([2328a62](https://github.com/adobe/spectrum-web-components/commit/2328a62daaf9491cdc5de4f46ab422e54c57bc3f))

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

### Bug Fixes

- **number-field:** update display value on scroll and arrow up/down ([fc59a18](https://github.com/adobe/spectrum-web-components/commit/fc59a18c73bb9b63f319d006713a5b5d15778cca))

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

### Bug Fixes

- **infield-button:** add infield-button package ([057b885](https://github.com/adobe/spectrum-web-components/commit/057b885276f3d5dcbe32bab5ab36a2bb82334bc3))

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

### Bug Fixes

- **number-field:** prevent over excited "change" events ([7b93724](https://github.com/adobe/spectrum-web-components/commit/7b937241151cad5cfc9e5a03fa70c4b70ac0cbea))

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

### Bug Fixes

- **number-field:** handle negative numbers ([#3673](https://github.com/adobe/spectrum-web-components/issues/3673)) ([62553dd](https://github.com/adobe/spectrum-web-components/commit/62553dd437efb89b42372553adfdf95fc0be7496))
- **number-field:** update number-field value on pressing "enter" ([#3638](https://github.com/adobe/spectrum-web-components/issues/3638)) ([649eb2f](https://github.com/adobe/spectrum-web-components/commit/649eb2f5dd9e0d08bb18f640565b34e908c5b518))

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Bug Fixes

- correct composition entry of multi-byte numbers ([#3610](https://github.com/adobe/spectrum-web-components/issues/3610)) ([5e11934](https://github.com/adobe/spectrum-web-components/commit/5e1193455dd876a45648b3040688a3bc389819a1))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

### Bug Fixes

- **number-field:** update button label to use number-field-labels as part of the text ([#3474](https://github.com/adobe/spectrum-web-components/issues/3474)) ([b92daf2](https://github.com/adobe/spectrum-web-components/commit/b92daf2f50224a362215477341d7d10a4eb39734))

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Bug Fixes

- **number-field,search,textfield:** add t-shirt sizes ([fda8f96](https://github.com/adobe/spectrum-web-components/commit/fda8f96b71b1447a8281f73d885c1c33ae74cfec))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

### Bug Fixes

- **number-field:** simplify width management ([ef4765a](https://github.com/adobe/spectrum-web-components/commit/ef4765a33f81d19229d13ea418aa625f5e1e693a))

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

### Features

- **number-field:** use core tokens ([23a924e](https://github.com/adobe/spectrum-web-components/commit/23a924ef24ea5adfa0472e8e424bfeec1d184603))

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/number-field

# 0.30.0 (2023-05-03)

### Bug Fixes

- add "editable" option to "sp-slider" ([e86d7fa](https://github.com/adobe/spectrum-web-components/commit/e86d7fa84491b41a39dbab9c8d85eec42df320cd))
- add input validation to Number Field ([b1dd5ea](https://github.com/adobe/spectrum-web-components/commit/b1dd5ea79b079e7ff9a3f850c8589f4295878941))
- allow user input of extemely large number when a max is applied ([0644b7f](https://github.com/adobe/spectrum-web-components/commit/0644b7f5e0d5cbbf27e241d730aaec8c991ff97c))
- allow value when step=0 ([41de75a](https://github.com/adobe/spectrum-web-components/commit/41de75a6cc2c1dd982b30a8281f4a9166e4cd87a))
- apply "HelpTextMixin" to form elements ([a952447](https://github.com/adobe/spectrum-web-components/commit/a952447254d091b99fe9270b2857cddc48df7c73))
- convert the langage resolution workflow to a Reactive Controller ([b7781db](https://github.com/adobe/spectrum-web-components/commit/b7781db820620688f97a40225fb17a10e7881178))
- correct the origin on "maximumFractionDigits" when deciding "inputMode" ([e2fe9c8](https://github.com/adobe/spectrum-web-components/commit/e2fe9c8f71f3cac07905c6e1549594a8f64c8df4))
- ensure "wheel" interactions lead to a "change" event ([3be87cd](https://github.com/adobe/spectrum-web-components/commit/3be87cd0e606a3e96f163e3e14da3ab455bc588d))
- ensure dependencies included in package.json ([eb77858](https://github.com/adobe/spectrum-web-components/commit/eb778588c8bd75a9801d568c348096aecb74614a))
- ensure reactivity of resolved language ([5863a15](https://github.com/adobe/spectrum-web-components/commit/5863a155262d6ba6898f82bff49aed55a6eae4f4))
- ensure streamingListener ends even if pointercancel not fired ([74105f2](https://github.com/adobe/spectrum-web-components/commit/74105f23d30f549f18040cc7d05b99c9b746871a))
- explicitly setting NumberField wheel event handler as not passive ([fad1496](https://github.com/adobe/spectrum-web-components/commit/fad1496b0cfab5c35b2de7447f2f0bee5325dfc2))
- manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))
- move hover/focus hoisting into conditioning ([15ac2f7](https://github.com/adobe/spectrum-web-components/commit/15ac2f7f561b3cb5b865d1539fbd753999f25119))
- normalize wheel input directionally for more predictable input ([e4383a8](https://github.com/adobe/spectrum-web-components/commit/e4383a82a5c287e45ea1b22e592ce5e022125739))
- **number-field:** add an "indeterminate" state ([8bde8a1](https://github.com/adobe/spectrum-web-components/commit/8bde8a1ce54e4966736da6676424db8080c81861))
- **number-field:** add support for modified stepping ([#1534](https://github.com/adobe/spectrum-web-components/issues/1534)) ([f8ec763](https://github.com/adobe/spectrum-web-components/commit/f8ec7635e0771097df592df9f60d042113533c4a))
- **number-field:** added flag to scroll event to allow slider component to update on scroll ([4199eb0](https://github.com/adobe/spectrum-web-components/commit/4199eb0084dcaa9da77f3ff3880dd93f24f72b1d))
- **number-field:** clean up delivery of quiet variant ([cd93964](https://github.com/adobe/spectrum-web-components/commit/cd9396494b838a584e939a573e8baec6ef7c8a4c))
- **number-field:** dispatch input/change events as expected ([4a457ee](https://github.com/adobe/spectrum-web-components/commit/4a457ee4eb9e0056ea25b30796b34fb32ebdf29f))
- **number-field:** ensure "quiet" Number Field is sized correctly in the DOM ([3ea2c8f](https://github.com/adobe/spectrum-web-components/commit/3ea2c8f9f336e9199d184b48c521dd30f833145d))
- **number-field:** include dependancy listings ([5c9031d](https://github.com/adobe/spectrum-web-components/commit/5c9031da3694bfe516d020922b0a2d70660e6cf1))
- **number-field:** prevent changes by user when readonly ([64a7e93](https://github.com/adobe/spectrum-web-components/commit/64a7e93ea81177a545983fdf88a9162ab3bf1ee6))
- **number-field:** prevent interactin with stepper buttons when disabled ([ae20343](https://github.com/adobe/spectrum-web-components/commit/ae2034357fb97314e0f93df1294a6a0273fccd75))
- **number-field:** process 2 byte characters as their single byte cousins ([f424c0a](https://github.com/adobe/spectrum-web-components/commit/f424c0aa9e04baf24aa3f6c23dd4697ab0699fc0))
- **number-field:** readonly - no pointer events for stepper buttons ([05364fb](https://github.com/adobe/spectrum-web-components/commit/05364fb491b381d5ed1be60dc63b9c4158bfbe87))
- **number-field:** support non-supported units in "Intl.numberFormat" ([d846c0b](https://github.com/adobe/spectrum-web-components/commit/d846c0bc75c538b008d6a7f50dc9aecc06a9b606))
- **number-field:** validate value before dispatching "change" event ([8c2ad89](https://github.com/adobe/spectrum-web-components/commit/8c2ad89521b8bc39c3c1a29f6e46e8e2414dcd06))
- prevent console.log in source and test files ([3ee082c](https://github.com/adobe/spectrum-web-components/commit/3ee082ceadd9eeef167bb8ac6241fe1501e4426c))
- **theme:** stop language resolution propagation and demo using local languages ([6b81391](https://github.com/adobe/spectrum-web-components/commit/6b81391c3e4416889daa5627526dc0194f2f5f56))

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- **number-field:** add number field pattern ([384ab34](https://github.com/adobe/spectrum-web-components/commit/384ab34d5aafe54e3206ff6802eb642c4df556c6))
- **number-field:** use new config ([8d42d69](https://github.com/adobe/spectrum-web-components/commit/8d42d693363e69362e18c49f1d7a5c91262f4c38))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- support Spectrum Token consumption and update Action Button to use them ([743ab16](https://github.com/adobe/spectrum-web-components/commit/743ab16d8f05335d320440effbdcb8cd4bffc97d))
- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.6.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.6.1...@spectrum-web-components/number-field@0.6.2) (2023-04-24)

### Bug Fixes

- ensure streamingListener ends even if pointercancel not fired ([74105f2](https://github.com/adobe/spectrum-web-components/commit/74105f23d30f549f18040cc7d05b99c9b746871a))

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.6.0...@spectrum-web-components/number-field@0.6.1) (2023-04-05)

### Bug Fixes

- **theme:** stop language resolution propagation and demo using local languages ([6b81391](https://github.com/adobe/spectrum-web-components/commit/6b81391c3e4416889daa5627526dc0194f2f5f56))

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.13...@spectrum-web-components/number-field@0.6.0) (2023-03-22)

### Bug Fixes

- move hover/focus hoisting into conditioning ([15ac2f7](https://github.com/adobe/spectrum-web-components/commit/15ac2f7f561b3cb5b865d1539fbd753999f25119))

### Features

- **number-field:** use new config ([8d42d69](https://github.com/adobe/spectrum-web-components/commit/8d42d693363e69362e18c49f1d7a5c91262f4c38))

## [0.5.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.12...@spectrum-web-components/number-field@0.5.13) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.5.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.11...@spectrum-web-components/number-field@0.5.12) (2023-02-13)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.5.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.10...@spectrum-web-components/number-field@0.5.11) (2023-02-08)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.5.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.9...@spectrum-web-components/number-field@0.5.10) (2023-01-23)

### Bug Fixes

- ensure "wheel" interactions lead to a "change" event ([3be87cd](https://github.com/adobe/spectrum-web-components/commit/3be87cd0e606a3e96f163e3e14da3ab455bc588d))

## [0.5.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.8...@spectrum-web-components/number-field@0.5.9) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.5.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.7...@spectrum-web-components/number-field@0.5.8) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.5.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.6...@spectrum-web-components/number-field@0.5.7) (2022-11-21)

### Bug Fixes

- ensure dependencies included in package.json ([eb77858](https://github.com/adobe/spectrum-web-components/commit/eb778588c8bd75a9801d568c348096aecb74614a))

## [0.5.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.5...@spectrum-web-components/number-field@0.5.6) (2022-11-14)

### Bug Fixes

- correct the origin on "maximumFractionDigits" when deciding "inputMode" ([e2fe9c8](https://github.com/adobe/spectrum-web-components/commit/e2fe9c8f71f3cac07905c6e1549594a8f64c8df4))
- ensure reactivity of resolved language ([5863a15](https://github.com/adobe/spectrum-web-components/commit/5863a155262d6ba6898f82bff49aed55a6eae4f4))

## [0.5.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.4...@spectrum-web-components/number-field@0.5.5) (2022-10-28)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.5.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.3...@spectrum-web-components/number-field@0.5.4) (2022-10-17)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.5.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.2...@spectrum-web-components/number-field@0.5.3) (2022-10-10)

### Bug Fixes

- convert the langage resolution workflow to a Reactive Controller ([b7781db](https://github.com/adobe/spectrum-web-components/commit/b7781db820620688f97a40225fb17a10e7881178))

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.1...@spectrum-web-components/number-field@0.5.2) (2022-09-14)

### Bug Fixes

- **number-field:** added flag to scroll event to allow slider component to update on scroll ([4199eb0](https://github.com/adobe/spectrum-web-components/commit/4199eb0084dcaa9da77f3ff3880dd93f24f72b1d))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.5.0...@spectrum-web-components/number-field@0.5.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.4.1...@spectrum-web-components/number-field@0.5.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.4.0...@spectrum-web-components/number-field@0.4.1) (2022-08-04)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.13...@spectrum-web-components/number-field@0.4.0) (2022-07-18)

### Bug Fixes

- **number-field:** ensure "quiet" Number Field is sized correctly in the DOM ([3ea2c8f](https://github.com/adobe/spectrum-web-components/commit/3ea2c8f9f336e9199d184b48c521dd30f833145d))

### Features

- support Spectrum Token consumption and update Action Button to use them ([743ab16](https://github.com/adobe/spectrum-web-components/commit/743ab16d8f05335d320440effbdcb8cd4bffc97d))

## [0.3.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.12...@spectrum-web-components/number-field@0.3.13) (2022-06-29)

### Bug Fixes

- explicitly setting NumberField wheel event handler as not passive ([fad1496](https://github.com/adobe/spectrum-web-components/commit/fad1496b0cfab5c35b2de7447f2f0bee5325dfc2))

## [0.3.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.11...@spectrum-web-components/number-field@0.3.12) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.3.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.10...@spectrum-web-components/number-field@0.3.11) (2022-05-27)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.3.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.9...@spectrum-web-components/number-field@0.3.10) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.3.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.8...@spectrum-web-components/number-field@0.3.9) (2022-04-21)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.3.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.7...@spectrum-web-components/number-field@0.3.8) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.3.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.6...@spectrum-web-components/number-field@0.3.7) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.3.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.5...@spectrum-web-components/number-field@0.3.6) (2022-03-04)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.3.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.4...@spectrum-web-components/number-field@0.3.5) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.3.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.3...@spectrum-web-components/number-field@0.3.4) (2022-02-02)

### Bug Fixes

- **number-field:** validate value before dispatching "change" event ([8c2ad89](https://github.com/adobe/spectrum-web-components/commit/8c2ad89521b8bc39c3c1a29f6e46e8e2414dcd06))

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.2...@spectrum-web-components/number-field@0.3.3) (2022-01-26)

### Bug Fixes

- **number-field:** process 2 byte characters as their single byte cousins ([f424c0a](https://github.com/adobe/spectrum-web-components/commit/f424c0aa9e04baf24aa3f6c23dd4697ab0699fc0))

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.1...@spectrum-web-components/number-field@0.3.2) (2022-01-07)

### Bug Fixes

- **number-field:** clean up delivery of quiet variant ([cd93964](https://github.com/adobe/spectrum-web-components/commit/cd9396494b838a584e939a573e8baec6ef7c8a4c))
- allow user input of extemely large number when a max is applied ([0644b7f](https://github.com/adobe/spectrum-web-components/commit/0644b7f5e0d5cbbf27e241d730aaec8c991ff97c))
- allow value when step=0 ([41de75a](https://github.com/adobe/spectrum-web-components/commit/41de75a6cc2c1dd982b30a8281f4a9166e4cd87a))

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.3.0...@spectrum-web-components/number-field@0.3.1) (2021-12-13)

### Bug Fixes

- apply "HelpTextMixin" to form elements ([a952447](https://github.com/adobe/spectrum-web-components/commit/a952447254d091b99fe9270b2857cddc48df7c73))
- **number-field:** prevent interactin with stepper buttons when disabled ([ae20343](https://github.com/adobe/spectrum-web-components/commit/ae2034357fb97314e0f93df1294a6a0273fccd75))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.2.1...@spectrum-web-components/number-field@0.3.0) (2021-11-08)

### Features

- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.2.0...@spectrum-web-components/number-field@0.2.1) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/number-field

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.10...@spectrum-web-components/number-field@0.2.0) (2021-11-02)

### Bug Fixes

- **number-field:** prevent changes by user when readonly ([64a7e93](https://github.com/adobe/spectrum-web-components/commit/64a7e93ea81177a545983fdf88a9162ab3bf1ee6))
- **number-field:** readonly - no pointer events for stepper buttons ([05364fb](https://github.com/adobe/spectrum-web-components/commit/05364fb491b381d5ed1be60dc63b9c4158bfbe87))

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.1.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.9...@spectrum-web-components/number-field@0.1.10) (2021-10-12)

### Bug Fixes

- **number-field:** add an "indeterminate" state ([8bde8a1](https://github.com/adobe/spectrum-web-components/commit/8bde8a1ce54e4966736da6676424db8080c81861))

## [0.1.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.8...@spectrum-web-components/number-field@0.1.9) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.1.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.7...@spectrum-web-components/number-field@0.1.8) (2021-09-13)

### Bug Fixes

- **number-field:** support non-supported units in "Intl.numberFormat" ([d846c0b](https://github.com/adobe/spectrum-web-components/commit/d846c0bc75c538b008d6a7f50dc9aecc06a9b606))
- add input validation to Number Field ([b1dd5ea](https://github.com/adobe/spectrum-web-components/commit/b1dd5ea79b079e7ff9a3f850c8589f4295878941))

## [0.1.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.6...@spectrum-web-components/number-field@0.1.7) (2021-08-24)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.1.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.5...@spectrum-web-components/number-field@0.1.6) (2021-08-17)

### Bug Fixes

- add "editable" option to "sp-slider" ([e86d7fa](https://github.com/adobe/spectrum-web-components/commit/e86d7fa84491b41a39dbab9c8d85eec42df320cd))

## [0.1.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.4...@spectrum-web-components/number-field@0.1.5) (2021-08-03)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.1.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.3...@spectrum-web-components/number-field@0.1.4) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/number-field

## [0.1.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.2...@spectrum-web-components/number-field@0.1.3) (2021-07-01)

### Bug Fixes

- **number-field:** add support for modified stepping ([#1534](https://github.com/adobe/spectrum-web-components/issues/1534)) ([f8ec763](https://github.com/adobe/spectrum-web-components/commit/f8ec7635e0771097df592df9f60d042113533c4a))
- manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))
- normalize wheel input directionally for more predictable input ([e4383a8](https://github.com/adobe/spectrum-web-components/commit/e4383a82a5c287e45ea1b22e592ce5e022125739))

## [0.1.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.1...@spectrum-web-components/number-field@0.1.2) (2021-06-16)

### Bug Fixes

- prevent console.log in source and test files ([3ee082c](https://github.com/adobe/spectrum-web-components/commit/3ee082ceadd9eeef167bb8ac6241fe1501e4426c))

## [0.1.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/number-field@0.1.0...@spectrum-web-components/number-field@0.1.1) (2021-06-07)

### Bug Fixes

- **number-field:** dispatch input/change events as expected ([4a457ee](https://github.com/adobe/spectrum-web-components/commit/4a457ee4eb9e0056ea25b30796b34fb32ebdf29f))
- **number-field:** include dependancy listings ([5c9031d](https://github.com/adobe/spectrum-web-components/commit/5c9031da3694bfe516d020922b0a2d70660e6cf1))

# 0.1.0 (2021-05-24)

### Features

- **number-field:** add number field pattern ([384ab34](https://github.com/adobe/spectrum-web-components/commit/384ab34d5aafe54e3206ff6802eb642c4df556c6))
