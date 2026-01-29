# Change Log

## 1.11.0

### Patch Changes

- Updated dependencies [[`9cb816b`](https://github.com/adobe/spectrum-web-components/commit/9cb816b5ac80387fdc9bb87381f5149fecb1b595)]:
    - @spectrum-web-components/base@1.11.0
    - @spectrum-web-components/textfield@1.11.0
    - @spectrum-web-components/button@1.11.0
    - @spectrum-web-components/icon@1.11.0
    - @spectrum-web-components/icons-workflow@1.11.0

## 1.10.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.10.0
    - @spectrum-web-components/button@1.10.0
    - @spectrum-web-components/icon@1.10.0
    - @spectrum-web-components/icons-workflow@1.10.0
    - @spectrum-web-components/textfield@1.10.0

## 1.9.1

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/button@1.9.1
    - @spectrum-web-components/icon@1.9.1
    - @spectrum-web-components/icons-workflow@1.9.1
    - @spectrum-web-components/textfield@1.9.1
    - @spectrum-web-components/base@1.9.1

## 1.9.0

### Patch Changes

- Updated dependencies [[`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8), [`bdf54c1`](https://github.com/adobe/spectrum-web-components/commit/bdf54c1bc6d3eb20da1a1bf3b40650e6ab1ba399), [`72d807c`](https://github.com/adobe/spectrum-web-components/commit/72d807c75d04b0fec1794a8d3e68383ca61d9e4c), [`14ebeb9`](https://github.com/adobe/spectrum-web-components/commit/14ebeb9e8a24de9c9a80e7f3f0babd19a34e8179)]:
    - @spectrum-web-components/button@1.9.0
    - @spectrum-web-components/icons-workflow@1.9.0
    - @spectrum-web-components/textfield@1.9.0
    - @spectrum-web-components/icon@1.9.0
    - @spectrum-web-components/base@1.9.0

## 1.8.0

### Patch Changes

- Updated dependencies [[`15be17d`](https://github.com/adobe/spectrum-web-components/commit/15be17db91f1140ccf3cad52b1f2ed6c4b9e28ba)]:
    - @spectrum-web-components/button@1.8.0
    - @spectrum-web-components/icon@1.8.0
    - @spectrum-web-components/icons-workflow@1.8.0
    - @spectrum-web-components/textfield@1.8.0
    - @spectrum-web-components/base@1.8.0

## 1.7.0

### Patch Changes

- Updated dependencies [[`cde976d`](https://github.com/adobe/spectrum-web-components/commit/cde976ddfa71f898e2d0404ecc53150db149a861)]:
    - @spectrum-web-components/textfield@1.7.0
    - @spectrum-web-components/button@1.7.0
    - @spectrum-web-components/icon@1.7.0
    - @spectrum-web-components/icons-workflow@1.7.0
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

- Updated dependencies [[`f6cebbd`](https://github.com/adobe/spectrum-web-components/commit/f6cebbd90008a2abb1232c355ae06e8566086093), [`00eb0a8`](https://github.com/adobe/spectrum-web-components/commit/00eb0a889583dff9d964341d9c1c27048be3d19e), [`9e15a66`](https://github.com/adobe/spectrum-web-components/commit/9e15a66a281745004add414ff977d4a71186aedd)]:
    - @spectrum-web-components/icons-workflow@1.6.0
    - @spectrum-web-components/button@1.6.0
    - @spectrum-web-components/textfield@1.6.0
    - @spectrum-web-components/icon@1.6.0
    - @spectrum-web-components/base@1.6.0

## 1.5.0

### Patch Changes

- Updated dependencies [[`4e06533`](https://github.com/adobe/spectrum-web-components/commit/4e065332e0236757fc3a050e53747ce82ac40ed5)]:
    - @spectrum-web-components/button@1.5.0
    - @spectrum-web-components/textfield@1.5.0
    - @spectrum-web-components/icon@1.5.0
    - @spectrum-web-components/icons-workflow@1.5.0
    - @spectrum-web-components/base@1.5.0

## 1.4.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/button@1.4.0
    - @spectrum-web-components/icon@1.4.0
    - @spectrum-web-components/icons-workflow@1.4.0
    - @spectrum-web-components/textfield@1.4.0
    - @spectrum-web-components/base@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/button@1.3.0
    - @spectrum-web-components/icon@1.3.0
    - @spectrum-web-components/icons-workflow@1.3.0
    - @spectrum-web-components/textfield@1.3.0
    - @spectrum-web-components/base@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

**Note:** Version bump only for package @spectrum-web-components/search

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/search

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/search

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

**Note:** Version bump only for package @spectrum-web-components/search

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

### Bug Fixes

- **search:** clear button ui in express ([#4910](https://github.com/adobe/spectrum-web-components/issues/4910)) ([f88e1e2](https://github.com/adobe/spectrum-web-components/commit/f88e1e2c03ed74f8d3f7924d395a34168afd244c))

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

### Features

- **icon:** use core tokens ([a11ef6b](https://github.com/adobe/spectrum-web-components/commit/a11ef6b45141769b4c73a7c79322e780a8a1fa6e))

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Bug Fixes

- **search:** add mod to remove clear button padding ([65168fe](https://github.com/adobe/spectrum-web-components/commit/65168fe546ca271cd68722f0c3f4a0be8d4a3253))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Bug Fixes

- **number-field,search,textfield:** add t-shirt sizes ([fda8f96](https://github.com/adobe/spectrum-web-components/commit/fda8f96b71b1447a8281f73d885c1c33ae74cfec))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

### Features

- **search:** use core tokens ([c62a7cd](https://github.com/adobe/spectrum-web-components/commit/c62a7cddae81b9767b0ce83117b790d9a7639547))

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

### Features

- **search,textfield:** use core tokens ([2ed5135](https://github.com/adobe/spectrum-web-components/commit/2ed51355c2787ac06274e763ea1eee7bfd0c9c72))

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/search

# 0.30.0 (2023-05-03)

### Bug Fixes

- add tslib as dependency where needed ([78885d9](https://github.com/adobe/spectrum-web-components/commit/78885d9ca7192a053d3b380c338ad5570da474f9))
- apply "HelpTextMixin" to form elements ([a952447](https://github.com/adobe/spectrum-web-components/commit/a952447254d091b99fe9270b2857cddc48df7c73))
- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
- ensure CCX search visual delivery ([22b90b9](https://github.com/adobe/spectrum-web-components/commit/22b90b901071d8cdbee8a0f6ac2d6fe8acb6dbf0))
- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716f2f787deb8d868a78bd28c8e62fe90e21))
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cdac98282c886f23c4a8d6cf4910c4a606c))
- **search:** ensure "reset" surfaces "input" and "change" events ([d8204a9](https://github.com/adobe/spectrum-web-components/commit/d8204a9cf05605696cab02c1e47edb4fad36e9ed))
- **search:** prevent overflow content from going behind clear button ([956f947](https://github.com/adobe/spectrum-web-components/commit/956f947533fa37cdbd9852ad5ae8eb984e9965f6))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))
- use type="search" for nicer virtual keyboards ([c439eb3](https://github.com/adobe/spectrum-web-components/commit/c439eb3b5d0b9dbc628691a5215d65c936c3939e))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- add and use icons-ui package ([d9c3ab2](https://github.com/adobe/spectrum-web-components/commit/d9c3ab212b4f756334e857fc513ccbf0a4dff9cc))
- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- conditionally load focus-visible polyfill ([6b5e5cf](https://github.com/adobe/spectrum-web-components/commit/6b5e5cf515f02ef14f072b7aee62feed7a83c281))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
- **search:** adds sp-search element ([d484fc2](https://github.com/adobe/spectrum-web-components/commit/d484fc2848a08d52ebb1fc2064202a4288b6b4b3))
- **search:** introduce API to control form interactions ([42fac00](https://github.com/adobe/spectrum-web-components/commit/42fac00ac071e87f9f80ae45212ea469d4d05fb0))
- **search:** submit will bubble ([8014345](https://github.com/adobe/spectrum-web-components/commit/801434548576daf4c31dc99eb6972ea140c68943))
- **search:** support "quiet" variant ([d0f85f1](https://github.com/adobe/spectrum-web-components/commit/d0f85f18887731f80d26eaec84ae601f4e433196))
- **search:** update spectrum css input ([05d8131](https://github.com/adobe/spectrum-web-components/commit/05d813121075a96652b122c7bb9aafa375dc97ad))
- **search:** use Spectrum CSS ^3.0.0 ([7830ac0](https://github.com/adobe/spectrum-web-components/commit/7830ac0868e855145cee0922529a0f6d4d3e7f50))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/39188887afad9bec52ef48d4e22596f9b757a9fe))
- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

### Reverts

- Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))

## [0.12.16](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.15...@spectrum-web-components/search@0.12.16) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.14...@spectrum-web-components/search@0.12.15) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.13...@spectrum-web-components/search@0.12.14) (2023-03-22)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.12...@spectrum-web-components/search@0.12.13) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.11...@spectrum-web-components/search@0.12.12) (2023-02-13)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.10...@spectrum-web-components/search@0.12.11) (2023-02-08)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.9...@spectrum-web-components/search@0.12.10) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.8...@spectrum-web-components/search@0.12.9) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.7...@spectrum-web-components/search@0.12.8) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.6...@spectrum-web-components/search@0.12.7) (2022-11-21)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.5...@spectrum-web-components/search@0.12.6) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.4...@spectrum-web-components/search@0.12.5) (2022-10-28)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.3...@spectrum-web-components/search@0.12.4) (2022-10-17)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.2...@spectrum-web-components/search@0.12.3) (2022-10-10)

### Bug Fixes

- **search:** prevent overflow content from going behind clear button ([956f947](https://github.com/adobe/spectrum-web-components/commit/956f947533fa37cdbd9852ad5ae8eb984e9965f6))

## [0.12.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.1...@spectrum-web-components/search@0.12.2) (2022-09-14)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.12.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.12.0...@spectrum-web-components/search@0.12.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.11.6...@spectrum-web-components/search@0.12.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

## [0.11.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.11.5...@spectrum-web-components/search@0.11.6) (2022-08-04)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.11.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.11.4...@spectrum-web-components/search@0.11.5) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.11.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.11.3...@spectrum-web-components/search@0.11.4) (2022-06-29)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.11.2...@spectrum-web-components/search@0.11.3) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.11.1...@spectrum-web-components/search@0.11.2) (2022-05-27)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.11.0...@spectrum-web-components/search@0.11.1) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.10.7...@spectrum-web-components/search@0.11.0) (2022-04-21)

### Bug Fixes

- ensure CCX search visual delivery ([22b90b9](https://github.com/adobe/spectrum-web-components/commit/22b90b901071d8cdbee8a0f6ac2d6fe8acb6dbf0))

### Features

- conditionally load focus-visible polyfill ([6b5e5cf](https://github.com/adobe/spectrum-web-components/commit/6b5e5cf515f02ef14f072b7aee62feed7a83c281))

## [0.10.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.10.6...@spectrum-web-components/search@0.10.7) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.10.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.10.5...@spectrum-web-components/search@0.10.6) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.10.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.10.4...@spectrum-web-components/search@0.10.5) (2022-03-04)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.10.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.10.3...@spectrum-web-components/search@0.10.4) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.10.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.10.2...@spectrum-web-components/search@0.10.3) (2022-01-26)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.10.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.10.1...@spectrum-web-components/search@0.10.2) (2022-01-07)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.10.0...@spectrum-web-components/search@0.10.1) (2021-12-13)

### Bug Fixes

- apply "HelpTextMixin" to form elements ([a952447](https://github.com/adobe/spectrum-web-components/commit/a952447254d091b99fe9270b2857cddc48df7c73))

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.9.1...@spectrum-web-components/search@0.10.0) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.9.0...@spectrum-web-components/search@0.9.1) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.18...@spectrum-web-components/search@0.9.0) (2021-11-02)

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.8.18](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.17...@spectrum-web-components/search@0.8.18) (2021-10-12)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.17](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.16...@spectrum-web-components/search@0.8.17) (2021-10-05)

### Bug Fixes

- use type="search" for nicer virtual keyboards ([c439eb3](https://github.com/adobe/spectrum-web-components/commit/c439eb3b5d0b9dbc628691a5215d65c936c3939e))

## [0.8.16](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.15...@spectrum-web-components/search@0.8.16) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.14...@spectrum-web-components/search@0.8.15) (2021-09-13)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.13...@spectrum-web-components/search@0.8.14) (2021-08-24)

### Bug Fixes

- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.8.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.12...@spectrum-web-components/search@0.8.13) (2021-08-03)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.11...@spectrum-web-components/search@0.8.12) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.10...@spectrum-web-components/search@0.8.11) (2021-07-01)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.9...@spectrum-web-components/search@0.8.10) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.8...@spectrum-web-components/search@0.8.9) (2021-06-07)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.7...@spectrum-web-components/search@0.8.8) (2021-05-24)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.6...@spectrum-web-components/search@0.8.7) (2021-05-12)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.5...@spectrum-web-components/search@0.8.6) (2021-04-15)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.4...@spectrum-web-components/search@0.8.5) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.3...@spectrum-web-components/search@0.8.4) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.2...@spectrum-web-components/search@0.8.3) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.1...@spectrum-web-components/search@0.8.2) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.8.0...@spectrum-web-components/search@0.8.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.7.3...@spectrum-web-components/search@0.8.0) (2021-03-04)

### Features

- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.7.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.7.2...@spectrum-web-components/search@0.7.3) (2021-02-11)

### Bug Fixes

- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

## [0.7.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.7.1...@spectrum-web-components/search@0.7.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.7.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.7.0...@spectrum-web-components/search@0.7.1) (2021-01-28)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.5.4...@spectrum-web-components/search@0.7.0) (2021-01-21)

### Bug Fixes

- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- **search:** update spectrum css input ([05d8131](https://github.com/adobe/spectrum-web-components/commit/05d813121075a96652b122c7bb9aafa375dc97ad))

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.5.4...@spectrum-web-components/search@0.6.0) (2021-01-13)

### Bug Fixes

- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- **search:** update spectrum css input ([05d8131](https://github.com/adobe/spectrum-web-components/commit/05d813121075a96652b122c7bb9aafa375dc97ad))

## [0.5.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.5.3...@spectrum-web-components/search@0.5.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.5.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.5.2...@spectrum-web-components/search@0.5.3) (2020-10-12)

### Bug Fixes

- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.5.1...@spectrum-web-components/search@0.5.2) (2020-09-25)

### Bug Fixes

- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.5.0...@spectrum-web-components/search@0.5.1) (2020-09-14)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.4.4...@spectrum-web-components/search@0.5.0) (2020-08-31)

### Features

- **search:** use Spectrum CSS ^3.0.0 ([7830ac0](https://github.com/adobe/spectrum-web-components/commit/7830ac0868e855145cee0922529a0f6d4d3e7f50))

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.4.3...@spectrum-web-components/search@0.4.4) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.4.2...@spectrum-web-components/search@0.4.3) (2020-07-27)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.4.1...@spectrum-web-components/search@0.4.2) (2020-07-24)

### Bug Fixes

- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.4.0...@spectrum-web-components/search@0.4.1) (2020-07-22)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.3.4...@spectrum-web-components/search@0.4.0) (2020-07-17)

### Features

- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.3.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.3.3...@spectrum-web-components/search@0.3.4) (2020-06-08)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.3.2...@spectrum-web-components/search@0.3.3) (2020-05-12)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.3.1...@spectrum-web-components/search@0.3.2) (2020-05-08)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.3.0...@spectrum-web-components/search@0.3.1) (2020-04-21)

**Note:** Version bump only for package @spectrum-web-components/search

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.12...@spectrum-web-components/search@0.3.0) (2020-04-16)

### Features

- add and use icons-ui package ([d9c3ab2](https://github.com/adobe/spectrum-web-components/commit/d9c3ab212b4f756334e857fc513ccbf0a4dff9cc))

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.2.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.11...@spectrum-web-components/search@0.2.12) (2020-04-10)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.2.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.10...@spectrum-web-components/search@0.2.11) (2020-04-07)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.2.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.9...@spectrum-web-components/search@0.2.10) (2020-03-25)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.2.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.8...@spectrum-web-components/search@0.2.9) (2020-03-11)

### Bug Fixes

- **search:** ensure "reset" surfaces "input" and "change" events ([d8204a9](https://github.com/adobe/spectrum-web-components/commit/d8204a9))

## [0.2.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.7...@spectrum-web-components/search@0.2.8) (2020-02-05)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.2.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.6...@spectrum-web-components/search@0.2.7) (2020-02-01)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.2.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.5...@spectrum-web-components/search@0.2.6) (2020-01-30)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.2.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.4...@spectrum-web-components/search@0.2.5) (2020-01-06)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.2.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.3...@spectrum-web-components/search@0.2.4) (2019-12-12)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.2.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.2...@spectrum-web-components/search@0.2.3) (2019-12-09)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.1...@spectrum-web-components/search@0.2.2) (2019-12-02)

### Bug Fixes

- normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cd))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.2.0...@spectrum-web-components/search@0.2.1) (2019-11-27)

### Bug Fixes

- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.1.3...@spectrum-web-components/search@0.2.0) (2019-11-19)

### Features

- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/3918888))

## [0.1.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.1.2...@spectrum-web-components/search@0.1.3) (2019-11-01)

**Note:** Version bump only for package @spectrum-web-components/search

## [0.1.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.1.1...@spectrum-web-components/search@0.1.2) (2019-10-16)

### Bug Fixes

- add tslib as dependency where needed ([78885d9](https://github.com/adobe/spectrum-web-components/commit/78885d9))

## [0.1.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/search@0.1.0...@spectrum-web-components/search@0.1.1) (2019-10-16)

**Note:** Version bump only for package @spectrum-web-components/search

# 0.1.0 (2019-10-14)

### Features

- **search:** adds sp-search element ([d484fc2](https://github.com/adobe/spectrum-web-components/commit/d484fc2))
- **search:** introduce API to control form interactions ([42fac00](https://github.com/adobe/spectrum-web-components/commit/42fac00))
- **search:** submit will bubble ([8014345](https://github.com/adobe/spectrum-web-components/commit/8014345))
- **search:** support "quiet" variant ([d0f85f1](https://github.com/adobe/spectrum-web-components/commit/d0f85f1))
