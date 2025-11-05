# Change Log

## 1.10.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.10.0
    - @spectrum-web-components/clear-button@1.10.0
    - @spectrum-web-components/close-button@1.10.0
    - @spectrum-web-components/icon@1.10.0
    - @spectrum-web-components/icons-ui@1.10.0
    - @spectrum-web-components/progress-circle@1.10.0
    - @spectrum-web-components/shared@1.10.0
    - @spectrum-web-components/reactive-controllers@1.10.0

## 1.9.1

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/clear-button@1.9.1
    - @spectrum-web-components/close-button@1.9.1
    - @spectrum-web-components/icon@1.9.1
    - @spectrum-web-components/icons-ui@1.9.1
    - @spectrum-web-components/progress-circle@1.9.1
    - @spectrum-web-components/base@1.9.1
    - @spectrum-web-components/reactive-controllers@1.9.1
    - @spectrum-web-components/shared@1.9.1

## 1.9.0

### Patch Changes

- [#5730](https://github.com/adobe/spectrum-web-components/pull/5730) [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8) Thanks [@caseyisonit](https://github.com/caseyisonit)! - - **Fixed**: Aria-label handling in `<sp-button>` component.
    - **Fixed**: Moved aria-label updates to occur after slot content changes are processed to prevent timing issues
    - **Added**: Enhanced `label` property support for programmatic aria-label control
    - **Added**: Comprehensive tests for aria-label behavior during content and pending state changes
    - **Fixed**: Removed duplicate aria-label update logic in `update()` method

    These changes ensure that aria-labels are properly managed and preserved across component state changes, improving accessibility for screen reader users.

- Updated dependencies [[`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8), [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8)]:
    - @spectrum-web-components/progress-circle@1.9.0
    - @spectrum-web-components/reactive-controllers@1.9.0
    - @spectrum-web-components/icon@1.9.0
    - @spectrum-web-components/icons-ui@1.9.0
    - @spectrum-web-components/clear-button@1.9.0
    - @spectrum-web-components/close-button@1.9.0
    - @spectrum-web-components/base@1.9.0
    - @spectrum-web-components/shared@1.9.0

## 1.8.0

### Minor Changes

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

### Patch Changes

- Updated dependencies [[`15be17d`](https://github.com/adobe/spectrum-web-components/commit/15be17db91f1140ccf3cad52b1f2ed6c4b9e28ba)]:
    - @spectrum-web-components/clear-button@1.8.0
    - @spectrum-web-components/close-button@1.8.0
    - @spectrum-web-components/icon@1.8.0
    - @spectrum-web-components/icons-ui@1.8.0
    - @spectrum-web-components/progress-circle@1.8.0
    - @spectrum-web-components/base@1.8.0
    - @spectrum-web-components/reactive-controllers@1.8.0
    - @spectrum-web-components/shared@1.8.0

## 1.7.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/clear-button@1.7.0
    - @spectrum-web-components/close-button@1.7.0
    - @spectrum-web-components/icon@1.7.0
    - @spectrum-web-components/icons-ui@1.7.0
    - @spectrum-web-components/progress-circle@1.7.0
    - @spectrum-web-components/base@1.7.0
    - @spectrum-web-components/reactive-controllers@1.7.0
    - @spectrum-web-components/shared@1.7.0

## 1.6.0

### Patch Changes

- [#5174](https://github.com/adobe/spectrum-web-components/pull/5174) [`00eb0a8`](https://github.com/adobe/spectrum-web-components/commit/00eb0a889583dff9d964341d9c1c27048be3d19e) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - Updated the deprecation warning to allow `variant` and `static-color` exist on the same component.
  Added `primary` and `secondary` stories to `white` and `black` button directories on storybook.
  Updates documentation site to reflect this as well.
- Updated dependencies [[`a9727d2`](https://github.com/adobe/spectrum-web-components/commit/a9727d2975b01f440c09789c9e7e0122063b6f7e)]:
    - @spectrum-web-components/close-button@1.6.0
    - @spectrum-web-components/clear-button@1.6.0
    - @spectrum-web-components/icon@1.6.0
    - @spectrum-web-components/icons-ui@1.6.0
    - @spectrum-web-components/progress-circle@1.6.0
    - @spectrum-web-components/base@1.6.0
    - @spectrum-web-components/reactive-controllers@1.6.0
    - @spectrum-web-components/shared@1.6.0

## 1.5.0

### Patch Changes

- [#5363](https://github.com/adobe/spectrum-web-components/pull/5363) [`4e06533`](https://github.com/adobe/spectrum-web-components/commit/4e065332e0236757fc3a050e53747ce82ac40ed5) Thanks [@castastrophe](https://github.com/castastrophe)!

    Adjust S1/Express static outline variant content color (from transparent-black/white to solid black/white) to fix unintentional regression.

    From [@spectrum-css/button v14.1.6](https://www.npmjs.com/package/@spectrum-css/button/v/14.1.6): [#3665](https://github.com/adobe/spectrum-css/pull/3665) Thanks [@rise-erpelding](https://github.com/rise-erpelding)!

    This update aims to simplify `--mod-*` access by ensuring local variants and states aren't hooking into those custom properties for overrides. This updates all local variants and states to override the `--spectrum-button-*` properties instead and adjusts the specificity to ensure no regressions in rendered results.

    From [@spectrum-css/button v14.1.3](https://www.npmjs.com/package/@spectrum-css/button/v/14.1.3): [#3613](https://github.com/adobe/spectrum-css/pull/3613) Thanks [@​rise-erpelding](https://github.com/rise-erpelding)!

    Adjusts static color buttons to more closely resemble the S2 specifications. There are no expected changes to non-static button variants in S2, and no expected changes to other themes.

    This PR includes changes to:
    - Static white primary button (outline variant), static white secondary button (fill variant), static black primary button (outline variant), static black secondary button (fill variant)
    - Static white secondary button (outline variant) and static black secondary button (outline variant) border and background colors
    - Static color buttons' content color
    - Static white primary button (fill variant) and static black primary button (fill variant) background colors

    From [@spectrum-css/button v14.1.2](https://www.npmjs.com/package/@spectrum-css/button/v/14.1.2): [#​3600](https://github.com/adobe/spectrum-css/pull/3600) Thanks [@​rise-erpelding](https://github.com/rise-erpelding)!

    Adjust border colors for static black and static white outline buttons, primary variant to match S2 specifications.

- Updated dependencies []:
    - @spectrum-web-components/clear-button@1.5.0
    - @spectrum-web-components/close-button@1.5.0
    - @spectrum-web-components/icon@1.5.0
    - @spectrum-web-components/icons-ui@1.5.0
    - @spectrum-web-components/progress-circle@1.5.0
    - @spectrum-web-components/base@1.5.0
    - @spectrum-web-components/reactive-controllers@1.5.0
    - @spectrum-web-components/shared@1.5.0

## 1.4.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/clear-button@1.4.0
    - @spectrum-web-components/close-button@1.4.0
    - @spectrum-web-components/icon@1.4.0
    - @spectrum-web-components/icons-ui@1.4.0
    - @spectrum-web-components/progress-circle@1.4.0
    - @spectrum-web-components/base@1.4.0
    - @spectrum-web-components/reactive-controllers@1.4.0
    - @spectrum-web-components/shared@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies [[`ea38ef0`](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)]:
    - @spectrum-web-components/reactive-controllers@1.3.0
    - @spectrum-web-components/clear-button@1.3.0
    - @spectrum-web-components/close-button@1.3.0
    - @spectrum-web-components/icon@1.3.0
    - @spectrum-web-components/icons-ui@1.3.0
    - @spectrum-web-components/progress-circle@1.3.0
    - @spectrum-web-components/base@1.3.0
    - @spectrum-web-components/shared@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

### Features

- **reactive-controllers:** Migrate to Colorjs from Tinycolor ([#4713](https://github.com/adobe/spectrum-web-components/issues/4713)) ([9d740f0](https://github.com/adobe/spectrum-web-components/commit/9d740f0c830aa44273097181e761e9a92d3df4be))

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/button

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/button

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))
- **overlay:** make :focus-visible consistent when using overlay type modal ([#4912](https://github.com/adobe/spectrum-web-components/issues/4912)) ([7a5f786](https://github.com/adobe/spectrum-web-components/commit/7a5f786819ff200f5ae2648e2e2c4db3729050a2)), closes [#5021](https://github.com/adobe/spectrum-web-components/issues/5021)

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

### Bug Fixes

- **action-button:** action-button with href can be perceived by screen reader ([#4927](https://github.com/adobe/spectrum-web-components/issues/4927)) ([2a0b3a5](https://github.com/adobe/spectrum-web-components/commit/2a0b3a5b300d51c002db60c6d899694d74834d39))

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

**Note:** Version bump only for package @spectrum-web-components/button

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

### BREAKING CHANGES

- remove deprecated 'static' references ([#4818](https://github.com/adobe/spectrum-web-components/issues/4818))

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

### Features

- add `static-color` to replace `static` ([#4808](https://github.com/adobe/spectrum-web-components/issues/4808)) ([43cf086](https://github.com/adobe/spectrum-web-components/commit/43cf0865d902346568c755650f53410c7788f2a1))
- **button:** add noWrap property ([#4779](https://github.com/adobe/spectrum-web-components/issues/4779)) ([6760ec2](https://github.com/adobe/spectrum-web-components/commit/6760ec283ad190f45f9639e636953e90ea562385))

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

### Features

- **reactive-controller:** new pending state controller ([#4605](https://github.com/adobe/spectrum-web-components/issues/4605)) ([68baf94](https://github.com/adobe/spectrum-web-components/commit/68baf94f257b9c7525253819a2ed3c8fa1b6c408))

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

### Bug Fixes

- **shared:** ensure the "updateComplete" in Focusable is stable ([885b4a5](https://github.com/adobe/spectrum-web-components/commit/885b4a5e12430910bb0dbacddc865081fe46d9a1))

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Bug Fixes

- **button:** prevent pointer interaction of child/slotted content ([2cd5823](https://github.com/adobe/spectrum-web-components/commit/2cd5823649f71ca849df0eb39d01d64034a4af70))
- **styles, theme:** surface exports that omit Spectrum Vars proactively ([#4142](https://github.com/adobe/spectrum-web-components/issues/4142)) ([5b524c1](https://github.com/adobe/spectrum-web-components/commit/5b524c1d54a64225cb3b2f71b92f581695985519))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

### Bug Fixes

- **button:** add missing progress-circle dependency ([#4086](https://github.com/adobe/spectrum-web-components/issues/4086)) ([2dfeeb3](https://github.com/adobe/spectrum-web-components/commit/2dfeeb3c5f1febec269fef00933cc65a1d0a0c43))

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

### Bug Fixes

- **progress-circle:** ensure size can be applied to non-"size" attribute bearing elements ([2bc1065](https://github.com/adobe/spectrum-web-components/commit/2bc10652ff9d7337c15eb8b3704678d0f2c700c9))

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

### Features

- **icon:** use core tokens ([a11ef6b](https://github.com/adobe/spectrum-web-components/commit/a11ef6b45141769b4c73a7c79322e780a8a1fa6e))

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

### Bug Fixes

- **button:** use larger icons in Close Button ([c4aa02c](https://github.com/adobe/spectrum-web-components/commit/c4aa02c8a1c6456f8d9805ba02d74c7e4ecefaa3))

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

### Bug Fixes

- **shared:** update and expand attribute coverage in likeAnchor ([5cb5f1d](https://github.com/adobe/spectrum-web-components/commit/5cb5f1d67c3afe4d62941632d65177a2cd8804c6))

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

### Bug Fixes

- **button:** adds pending button, fixes [#3162](https://github.com/adobe/spectrum-web-components/issues/3162) ([#3163](https://github.com/adobe/spectrum-web-components/issues/3163)) ([71254ec](https://github.com/adobe/spectrum-web-components/commit/71254ec2b29f18e62a9a2e5285ca8c35273d8d43))

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

### Bug Fixes

- **button:** support [icon-only] delivery ([#3716](https://github.com/adobe/spectrum-web-components/issues/3716)) ([e236a50](https://github.com/adobe/spectrum-web-components/commit/e236a50d8e51da0d019758f744e1a1a8a9370b1c))

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

### Bug Fixes

- handle longpress and over filter overlays ([483e52d](https://github.com/adobe/spectrum-web-components/commit/483e52df24f56be027d8417c1ae530211ef0deb1))

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

### Features

- **action-bar:** use core tokens ([4e21edf](https://github.com/adobe/spectrum-web-components/commit/4e21edfa369dcdbba823e3cfc1b35d65f48cab6f))

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Bug Fixes

- added role for href button ([5a4ad98](https://github.com/adobe/spectrum-web-components/commit/5a4ad98afa69669a8a4fb2a88d82a837c0c40c55))
- text fixes ([0121fd6](https://github.com/adobe/spectrum-web-components/commit/0121fd6e25755881f5f00c8b7cd989fc47e201d8))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

### Bug Fixes

- **shared:** allow "disabled" first to return to "tabindex=0" in "focusable" ([160bc59](https://github.com/adobe/spectrum-web-components/commit/160bc594f516bfadb754d47ce102a02cbde12fcd))

# 0.30.0 (2023-05-03)

### Bug Fixes

- add t-shirt sizing to Thumbnail and support for "xxs"/"xs" sizes ([520a642](https://github.com/adobe/spectrum-web-components/commit/520a642b33e2ca5a4fdc67c15ace029d33e895ff))
- allow rendered anchors to be aria-hidden ([2e9aa23](https://github.com/adobe/spectrum-web-components/commit/2e9aa2324013e1d2311a8d4307dafe17912328ee))
- allow sp-dropdown to accept focus visibly from sp-field-label ([134bafc](https://github.com/adobe/spectrum-web-components/commit/134bafc9c2e4d06e48107182f82dd7487066b7f1))
- **button:** add "toggles" attribute to action button ([3e2d80c](https://github.com/adobe/spectrum-web-components/commit/3e2d80c5d004eb13b6523ee7e71d550d5e468d07))
- **button:** add excludeSourceSelector to reduce duplication of styles ([683e88e](https://github.com/adobe/spectrum-web-components/commit/683e88e8ac659e789c20d77bf0af602a305b54f9))
- **button:** add multiple ui icon imports to sp-button ([2f17fa9](https://github.com/adobe/spectrum-web-components/commit/2f17fa984fdf198ee8e2104fa14d0673ce348aa6))
- **button:** allow element content in the default/label slot ([7b0ef58](https://github.com/adobe/spectrum-web-components/commit/7b0ef584cc2b946155eaa234269f3e376381bb9f))
- **button:** apply icon as slotted content in action-button styles ([3b1487b](https://github.com/adobe/spectrum-web-components/commit/3b1487b76cd0f703cc95e05a9a8cb3f461a6c281))
- **button:** clean up clear button for reuse across elements ([4c71eb1](https://github.com/adobe/spectrum-web-components/commit/4c71eb12112283ec31a40de38fdb79195ac52fd5))
- **button:** delivery hold affordance when attribute available ([aecc6fe](https://github.com/adobe/spectrum-web-components/commit/aecc6fe7e632fec4556c4425d56a731605492873))
- **button:** include "pointerleave" in management of the "active" state ([2e702e4](https://github.com/adobe/spectrum-web-components/commit/2e702e45516cb736ea930fdf927e457c10439e8e))
- **button:** minor docs spelling fix ([a7a1359](https://github.com/adobe/spectrum-web-components/commit/a7a1359990f54869e116d61f1a53626010db8477))
- **button:** no double link clicks ([02d576c](https://github.com/adobe/spectrum-web-components/commit/02d576c89561ba9459feb1efdba613ea289e808c))
- **button:** prevent default on "space" based activations ([708d587](https://github.com/adobe/spectrum-web-components/commit/708d587385147b02dcb71932c0472b134f15038f))
- **button:** relate to this.href correctly ([fade3ea](https://github.com/adobe/spectrum-web-components/commit/fade3ea9bd6bda6192f84a0ab9af4b812517e267))
- **button:** remove old package export listings ([32e8573](https://github.com/adobe/spectrum-web-components/commit/32e85733e2ed96b6d80ce6c2461f1a98c0f1470a))
- **button:** revert default "variant" application when missing ([fab993e](https://github.com/adobe/spectrum-web-components/commit/fab993e72dad8d7c4962e6d00632803c1a4d30ef))
- **button:** use slot text observer pattern ([a7288c3](https://github.com/adobe/spectrum-web-components/commit/a7288c3f95587f548952a83c78708eef06870fc0))
- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
- correct specificity of webkit appearance work around ([f0d06bf](https://github.com/adobe/spectrum-web-components/commit/f0d06bf17bbf1d7d2a41a3008373a4b0f4097cf9))
- correctly delivery visuals and mouse interactions for litAnchor and extensions ([0ae889a](https://github.com/adobe/spectrum-web-components/commit/0ae889a8aab9b3417a021b917dfc817a8310f50f))
- docs button variant usage ([894282c](https://github.com/adobe/spectrum-web-components/commit/894282c579b39a3d69ff0d401e0598746c78c352))
- **dropdown:** correctly support "quiet" variant ([2a51a2b](https://github.com/adobe/spectrum-web-components/commit/2a51a2bf58d12319ebb328ce6c7298aeb8570507))
- ensure "click" on "NumpadEnter" key press ([450fa01](https://github.com/adobe/spectrum-web-components/commit/450fa019d44f447a349707d77635f95bbc9f1049))
- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
- final prerelease review of canary builds ([1fc032f](https://github.com/adobe/spectrum-web-components/commit/1fc032ff436d8be1817a2784787e30b07a2873c6))
- implement "emphasized" styles ([750bbe7](https://github.com/adobe/spectrum-web-components/commit/750bbe7c6a70ed590c4ea179179bf201c50526ea))
- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716f2f787deb8d868a78bd28c8e62fe90e21))
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- match "pointerup" listeners with "pointercancel" for full coverage ([7f2ce92](https://github.com/adobe/spectrum-web-components/commit/7f2ce924ce03fb0881505e6f144184bd3d25355d))
- prevent default hoisting of custom pseudo elements ([7f66346](https://github.com/adobe/spectrum-web-components/commit/7f6634665fb9fdc530bd3009246e62c24cac1904))
- remove errant readme content, correct icon selector ([3dd1fb1](https://github.com/adobe/spectrum-web-components/commit/3dd1fb1ebd5ce5171345a6c2d4aac08e2d49a5b8))
- **shared:** make Focusable pass disabled always ([a339d6f](https://github.com/adobe/spectrum-web-components/commit/a339d6fb2aa9645e7bca5472487618edff5f1182))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- update consumption of Spectrum CSS for latest version ([ed2305b](https://github.com/adobe/spectrum-web-components/commit/ed2305b7334c973ea5c8299cbbce33a365896329))
- update file path access ([8898bf7](https://github.com/adobe/spectrum-web-components/commit/8898bf707e6e28abb78c92a0a0858d459e65347b))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- update role application logic to not overwrite menu\* roles ([94b6aec](https://github.com/adobe/spectrum-web-components/commit/94b6aecffc1e5686feab09361d4e07ec3e854726))
- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
- updating spectrum-config to support new label styles ([cefeaad](https://github.com/adobe/spectrum-web-components/commit/cefeaade098d246f7b222e54de5ff8becf42d315))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- use the "browsers" listing in postcss-preset-env ([4eaf6a2](https://github.com/adobe/spectrum-web-components/commit/4eaf6a28f7b5eaf60487841d264d6d804ae675ce))
- work around icon positioning error in CSS source ([ef5271c](https://github.com/adobe/spectrum-web-components/commit/ef5271c208569b44166b00692baa2caeb0a30d27))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **action-group:** add action-group pattern ([d2de766](https://github.com/adobe/spectrum-web-components/commit/d2de766efde6dfbaa1cd604f99ae3128b4fc81b5))
- **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
- add and use icons-ui package ([d9c3ab2](https://github.com/adobe/spectrum-web-components/commit/d9c3ab212b4f756334e857fc513ccbf0a4dff9cc))
- add dialog, dialog-wrapped, and underlay elements ([3df9050](https://github.com/adobe/spectrum-web-components/commit/3df9050f65bd3a95f9b986aa728cfc1a2eaee432))
- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- allow activation of longpress content ([55e71fd](https://github.com/adobe/spectrum-web-components/commit/55e71fdf9fd5dde489871c3d9798ef8957f4e5b6))
- apply sizedMixin for t-shirt sizing ([d7b63fb](https://github.com/adobe/spectrum-web-components/commit/d7b63fb0db06b5a8a412fea8370964f4db9d18ae))
- **button-group:** add ButtonGroup pattern ([c4d85b5](https://github.com/adobe/spectrum-web-components/commit/c4d85b5524f6623dbd3cb22c0d6fa8fc00e98733))
- **button:** accept update Spectrum Tokens ([d6d6db1](https://github.com/adobe/spectrum-web-components/commit/d6d6db152ea9a1bf1ca7a475ce847ff3ca471037))
- **button:** action-buttons with icons AND text ([aa788b1](https://github.com/adobe/spectrum-web-components/commit/aa788b106b6d649841f54a61de61e131293a244a))
- **button:** add support for "sp-clear-button" ([9028b6d](https://github.com/adobe/spectrum-web-components/commit/9028b6da78b461d6972ea38a5df28dcdb38f20f6))
- **button:** allow icon only buttons ([25623d6](https://github.com/adobe/spectrum-web-components/commit/25623d686663388ef1fe427e99c9040359516fa7))
- **button:** move "white" and "black" out of "variant" and into "static" ([5cf51df](https://github.com/adobe/spectrum-web-components/commit/5cf51df7db6f010f4c22d125b17a68e54fd507ba))
- **button:** pass "label" property to "aria-label" ([78ae59d](https://github.com/adobe/spectrum-web-components/commit/78ae59d260c7e2c0aec16841d96c0c3177061bab))
- **button:** update spectrum css input ([7b5b200](https://github.com/adobe/spectrum-web-components/commit/7b5b20012621a4a43c8402fb07fe163fe919495d))
- **button:** use latest @spectrum-css/button beta ([b3b20ed](https://github.com/adobe/spectrum-web-components/commit/b3b20ed85923955deca5ca4d18d95ea8c5ce15ea))
- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- **button:** using core-tokens for button ([a4a6d42](https://github.com/adobe/spectrum-web-components/commit/a4a6d42e7615466c6de344ccf36c8d7b4903a921))
- **card:** upgrade to Spectrum CSS v3.0.0 ([84cf1a9](https://github.com/adobe/spectrum-web-components/commit/84cf1a9758b1e357f18efac5763d17d6a4db0578))
- **close-button:** add Close Button pattern ([8e9e1ad](https://github.com/adobe/spectrum-web-components/commit/8e9e1ad1ac84a989c4052f1368d8d3d8ddc5f60e))
- deprecate "icon-right" in buttons as per Spectrum ([064a775](https://github.com/adobe/spectrum-web-components/commit/064a775f9915523a3c9a744f824b5903f26c382e))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
- leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))
- **search:** adds sp-search element ([d484fc2](https://github.com/adobe/spectrum-web-components/commit/d484fc2848a08d52ebb1fc2064202a4288b6b4b3))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))
- support Spectrum Token consumption and update Action Button to use them ([743ab16](https://github.com/adobe/spectrum-web-components/commit/743ab16d8f05335d320440effbdcb8cd4bffc97d))
- support static white and static black variants of Action Button ([7f1e25b](https://github.com/adobe/spectrum-web-components/commit/7f1e25bce122bd3601c6aa5ed505cba436e8b952))
- **tabs:** add sp-tab-panel element ([b17d276](https://github.com/adobe/spectrum-web-components/commit/b17d2765cf415578a31e5fa23515c25ff4c3922d))
- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
- use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc77960de8e57dd9c49bb7669df689f0ebaa))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/39188887afad9bec52ef48d4e22596f9b757a9fe))
- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))
- use SixedMixin to manage "size" property ([8819821](https://github.com/adobe/spectrum-web-components/commit/88198212cb495833ed2e7644f95b43dca915318d))

### Performance Improvements

- accept new Spectrum CSS featuring simpler DOM structure ([a0b042b](https://github.com/adobe/spectrum-web-components/commit/a0b042b1d05bc23b0b824123af94df5bc3e1e0d2))
- **button:** recentralize shared styles in base ([85d3d0a](https://github.com/adobe/spectrum-web-components/commit/85d3d0a3c84301dcf5be492e2b42cd00e8986089))
- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))
- use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0accd643c2f35cbf1ba809b54f52c25628d))

### Reverts

- Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))

## [0.20.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.20.4...@spectrum-web-components/button@0.20.5) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.20.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.20.3...@spectrum-web-components/button@0.20.4) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.20.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.20.2...@spectrum-web-components/button@0.20.3) (2023-03-22)

### Bug Fixes

- prevent default hoisting of custom pseudo elements ([7f66346](https://github.com/adobe/spectrum-web-components/commit/7f6634665fb9fdc530bd3009246e62c24cac1904))

### Performance Improvements

- accept new Spectrum CSS featuring simpler DOM structure ([a0b042b](https://github.com/adobe/spectrum-web-components/commit/a0b042b1d05bc23b0b824123af94df5bc3e1e0d2))

## [0.20.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.20.1...@spectrum-web-components/button@0.20.2) (2023-03-08)

### Bug Fixes

- docs button variant usage ([894282c](https://github.com/adobe/spectrum-web-components/commit/894282c579b39a3d69ff0d401e0598746c78c352))

## [0.20.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.20.0...@spectrum-web-components/button@0.20.1) (2023-02-13)

### Bug Fixes

- **button:** revert default "variant" application when missing ([fab993e](https://github.com/adobe/spectrum-web-components/commit/fab993e72dad8d7c4962e6d00632803c1a4d30ef))

# [0.20.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.10...@spectrum-web-components/button@0.20.0) (2023-02-08)

### Bug Fixes

- updating spectrum-config to support new label styles ([cefeaad](https://github.com/adobe/spectrum-web-components/commit/cefeaade098d246f7b222e54de5ff8becf42d315))
- work around icon positioning error in CSS source ([ef5271c](https://github.com/adobe/spectrum-web-components/commit/ef5271c208569b44166b00692baa2caeb0a30d27))

### Features

- **button:** move "white" and "black" out of "variant" and into "static" ([5cf51df](https://github.com/adobe/spectrum-web-components/commit/5cf51df7db6f010f4c22d125b17a68e54fd507ba))
- **button:** using core-tokens for button ([a4a6d42](https://github.com/adobe/spectrum-web-components/commit/a4a6d42e7615466c6de344ccf36c8d7b4903a921))

## [0.19.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.9...@spectrum-web-components/button@0.19.10) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.19.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.8...@spectrum-web-components/button@0.19.9) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.19.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.7...@spectrum-web-components/button@0.19.8) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.19.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.6...@spectrum-web-components/button@0.19.7) (2022-11-21)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.19.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.5...@spectrum-web-components/button@0.19.6) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.19.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.4...@spectrum-web-components/button@0.19.5) (2022-10-28)

### Bug Fixes

- **button:** minor docs spelling fix ([a7a1359](https://github.com/adobe/spectrum-web-components/commit/a7a1359990f54869e116d61f1a53626010db8477))

## [0.19.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.3...@spectrum-web-components/button@0.19.4) (2022-10-17)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.19.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.2...@spectrum-web-components/button@0.19.3) (2022-10-10)

### Bug Fixes

- match "pointerup" listeners with "pointercancel" for full coverage ([7f2ce92](https://github.com/adobe/spectrum-web-components/commit/7f2ce924ce03fb0881505e6f144184bd3d25355d))

## [0.19.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.1...@spectrum-web-components/button@0.19.2) (2022-09-14)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.19.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.19.0...@spectrum-web-components/button@0.19.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.19.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.18.1...@spectrum-web-components/button@0.19.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

## [0.18.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.18.0...@spectrum-web-components/button@0.18.1) (2022-08-04)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.18.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.17.7...@spectrum-web-components/button@0.18.0) (2022-07-18)

### Features

- support Spectrum Token consumption and update Action Button to use them ([743ab16](https://github.com/adobe/spectrum-web-components/commit/743ab16d8f05335d320440effbdcb8cd4bffc97d))

## [0.17.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.17.6...@spectrum-web-components/button@0.17.7) (2022-06-29)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.17.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.17.5...@spectrum-web-components/button@0.17.6) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.17.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.17.4...@spectrum-web-components/button@0.17.5) (2022-05-27)

### Bug Fixes

- update consumption of Spectrum CSS for latest version ([ed2305b](https://github.com/adobe/spectrum-web-components/commit/ed2305b7334c973ea5c8299cbbce33a365896329))

## [0.17.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.17.3...@spectrum-web-components/button@0.17.4) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.17.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.17.2...@spectrum-web-components/button@0.17.3) (2022-04-21)

### Bug Fixes

- **button:** add multiple ui icon imports to sp-button ([2f17fa9](https://github.com/adobe/spectrum-web-components/commit/2f17fa984fdf198ee8e2104fa14d0673ce348aa6))

## [0.17.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.17.1...@spectrum-web-components/button@0.17.2) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.17.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.17.0...@spectrum-web-components/button@0.17.1) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.17.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.16.4...@spectrum-web-components/button@0.17.0) (2022-03-04)

### Features

- **close-button:** add Close Button pattern ([8e9e1ad](https://github.com/adobe/spectrum-web-components/commit/8e9e1ad1ac84a989c4052f1368d8d3d8ddc5f60e))
- leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))
- support static white and static black variants of Action Button ([7f1e25b](https://github.com/adobe/spectrum-web-components/commit/7f1e25bce122bd3601c6aa5ed505cba436e8b952))

## [0.16.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.16.3...@spectrum-web-components/button@0.16.4) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.16.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.16.2...@spectrum-web-components/button@0.16.3) (2022-01-26)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.16.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.16.1...@spectrum-web-components/button@0.16.2) (2022-01-07)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.16.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.16.0...@spectrum-web-components/button@0.16.1) (2021-12-13)

### Bug Fixes

- add t-shirt sizing to Thumbnail and support for "xxs"/"xs" sizes ([520a642](https://github.com/adobe/spectrum-web-components/commit/520a642b33e2ca5a4fdc67c15ace029d33e895ff))

# [0.16.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.15.1...@spectrum-web-components/button@0.16.0) (2021-11-08)

### Features

- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.15.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.15.0...@spectrum-web-components/button@0.15.1) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.15.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.9...@spectrum-web-components/button@0.15.0) (2021-11-02)

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.14.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.8...@spectrum-web-components/button@0.14.9) (2021-10-12)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.14.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.7...@spectrum-web-components/button@0.14.8) (2021-09-20)

### Bug Fixes

- ensure "click" on "NumpadEnter" key press ([450fa01](https://github.com/adobe/spectrum-web-components/commit/450fa019d44f447a349707d77635f95bbc9f1049))

## [0.14.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.6...@spectrum-web-components/button@0.14.7) (2021-09-13)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.14.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.5...@spectrum-web-components/button@0.14.6) (2021-08-24)

### Bug Fixes

- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.14.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.4...@spectrum-web-components/button@0.14.5) (2021-08-03)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.14.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.3...@spectrum-web-components/button@0.14.4) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.14.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.2...@spectrum-web-components/button@0.14.3) (2021-07-01)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.14.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.1...@spectrum-web-components/button@0.14.2) (2021-06-16)

### Bug Fixes

- update role application logic to not overwrite menu\* roles ([94b6aec](https://github.com/adobe/spectrum-web-components/commit/94b6aecffc1e5686feab09361d4e07ec3e854726))

## [0.14.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.14.0...@spectrum-web-components/button@0.14.1) (2021-06-07)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.14.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.13.7...@spectrum-web-components/button@0.14.0) (2021-05-24)

### Features

- **tabs:** add sp-tab-panel element ([b17d276](https://github.com/adobe/spectrum-web-components/commit/b17d2765cf415578a31e5fa23515c25ff4c3922d))

## [0.13.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.13.6...@spectrum-web-components/button@0.13.7) (2021-05-12)

### Bug Fixes

- allow rendered anchors to be aria-hidden ([2e9aa23](https://github.com/adobe/spectrum-web-components/commit/2e9aa2324013e1d2311a8d4307dafe17912328ee))

## [0.13.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.13.5...@spectrum-web-components/button@0.13.6) (2021-04-15)

### Bug Fixes

- **button:** no double link clicks ([02d576c](https://github.com/adobe/spectrum-web-components/commit/02d576c89561ba9459feb1efdba613ea289e808c))

## [0.13.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.13.4...@spectrum-web-components/button@0.13.5) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.13.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.13.3...@spectrum-web-components/button@0.13.4) (2021-03-29)

### Bug Fixes

- **button:** prevent default on "space" based activations ([708d587](https://github.com/adobe/spectrum-web-components/commit/708d587385147b02dcb71932c0472b134f15038f))

## [0.13.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.13.2...@spectrum-web-components/button@0.13.3) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.13.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.13.1...@spectrum-web-components/button@0.13.2) (2021-03-22)

### Bug Fixes

- correctly delivery visuals and mouse interactions for litAnchor and extensions ([0ae889a](https://github.com/adobe/spectrum-web-components/commit/0ae889a8aab9b3417a021b917dfc817a8310f50f))

## [0.13.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.13.0...@spectrum-web-components/button@0.13.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.12.0...@spectrum-web-components/button@0.13.0) (2021-03-04)

### Bug Fixes

- **button:** include "pointerleave" in management of the "active" state ([2e702e4](https://github.com/adobe/spectrum-web-components/commit/2e702e45516cb736ea930fdf927e457c10439e8e))

### Features

- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.11.2...@spectrum-web-components/button@0.12.0) (2021-02-11)

### Bug Fixes

- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

### Features

- allow activation of longpress content ([55e71fd](https://github.com/adobe/spectrum-web-components/commit/55e71fdf9fd5dde489871c3d9798ef8957f4e5b6))

### Performance Improvements

- **button:** recentralize shared styles in base ([85d3d0a](https://github.com/adobe/spectrum-web-components/commit/85d3d0a3c84301dcf5be492e2b42cd00e8986089))

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.11.1...@spectrum-web-components/button@0.11.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.11.0...@spectrum-web-components/button@0.11.1) (2021-01-28)

### Bug Fixes

- **button:** remove old package export listings ([32e8573](https://github.com/adobe/spectrum-web-components/commit/32e85733e2ed96b6d80ce6c2461f1a98c0f1470a))

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.9.4...@spectrum-web-components/button@0.11.0) (2021-01-21)

### Bug Fixes

- allow sp-dropdown to accept focus visibly from sp-field-label ([134bafc](https://github.com/adobe/spectrum-web-components/commit/134bafc9c2e4d06e48107182f82dd7487066b7f1))
- correct specificity of webkit appearance work around ([f0d06bf](https://github.com/adobe/spectrum-web-components/commit/f0d06bf17bbf1d7d2a41a3008373a4b0f4097cf9))
- final prerelease review of canary builds ([1fc032f](https://github.com/adobe/spectrum-web-components/commit/1fc032ff436d8be1817a2784787e30b07a2873c6))
- implement "emphasized" styles ([750bbe7](https://github.com/adobe/spectrum-web-components/commit/750bbe7c6a70ed590c4ea179179bf201c50526ea))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- update file path access ([8898bf7](https://github.com/adobe/spectrum-web-components/commit/8898bf707e6e28abb78c92a0a0858d459e65347b))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- use the "browsers" listing in postcss-preset-env ([4eaf6a2](https://github.com/adobe/spectrum-web-components/commit/4eaf6a28f7b5eaf60487841d264d6d804ae675ce))
- **button:** delivery hold affordance when attribute available ([aecc6fe](https://github.com/adobe/spectrum-web-components/commit/aecc6fe7e632fec4556c4425d56a731605492873))
- **button:** relate to this.href correctly ([fade3ea](https://github.com/adobe/spectrum-web-components/commit/fade3ea9bd6bda6192f84a0ab9af4b812517e267))

### Features

- apply sizedMixin for t-shirt sizing ([d7b63fb](https://github.com/adobe/spectrum-web-components/commit/d7b63fb0db06b5a8a412fea8370964f4db9d18ae))
- deprecate "icon-right" in buttons as per Spectrum ([064a775](https://github.com/adobe/spectrum-web-components/commit/064a775f9915523a3c9a744f824b5903f26c382e))
- use SixedMixin to manage "size" property ([8819821](https://github.com/adobe/spectrum-web-components/commit/88198212cb495833ed2e7644f95b43dca915318d))
- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
- **button:** update spectrum css input ([7b5b200](https://github.com/adobe/spectrum-web-components/commit/7b5b20012621a4a43c8402fb07fe163fe919495d))
- **button:** use latest @spectrum-css/button beta ([b3b20ed](https://github.com/adobe/spectrum-web-components/commit/b3b20ed85923955deca5ca4d18d95ea8c5ce15ea))
- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.9.4...@spectrum-web-components/button@0.10.0) (2021-01-13)

### Bug Fixes

- final prerelease review of canary builds ([1fc032f](https://github.com/adobe/spectrum-web-components/commit/1fc032ff436d8be1817a2784787e30b07a2873c6))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- **button:** relate to this.href correctly ([fade3ea](https://github.com/adobe/spectrum-web-components/commit/fade3ea9bd6bda6192f84a0ab9af4b812517e267))
- allow sp-dropdown to accept focus visibly from sp-field-label ([134bafc](https://github.com/adobe/spectrum-web-components/commit/134bafc9c2e4d06e48107182f82dd7487066b7f1))
- implement "emphasized" styles ([750bbe7](https://github.com/adobe/spectrum-web-components/commit/750bbe7c6a70ed590c4ea179179bf201c50526ea))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- update file path access ([8898bf7](https://github.com/adobe/spectrum-web-components/commit/8898bf707e6e28abb78c92a0a0858d459e65347b))
- **button:** delivery hold affordance when attribute available ([aecc6fe](https://github.com/adobe/spectrum-web-components/commit/aecc6fe7e632fec4556c4425d56a731605492873))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))

### Features

- apply sizedMixin for t-shirt sizing ([d7b63fb](https://github.com/adobe/spectrum-web-components/commit/d7b63fb0db06b5a8a412fea8370964f4db9d18ae))
- use SixedMixin to manage "size" property ([8819821](https://github.com/adobe/spectrum-web-components/commit/88198212cb495833ed2e7644f95b43dca915318d))
- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
- **button:** update spectrum css input ([7b5b200](https://github.com/adobe/spectrum-web-components/commit/7b5b20012621a4a43c8402fb07fe163fe919495d))
- **button:** use latest @spectrum-css/button beta ([b3b20ed](https://github.com/adobe/spectrum-web-components/commit/b3b20ed85923955deca5ca4d18d95ea8c5ce15ea))
- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))

## [0.9.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.9.3...@spectrum-web-components/button@0.9.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.9.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.9.2...@spectrum-web-components/button@0.9.3) (2020-10-12)

### Bug Fixes

- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.9.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.9.1...@spectrum-web-components/button@0.9.2) (2020-09-25)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.9.0...@spectrum-web-components/button@0.9.1) (2020-09-14)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.8.4...@spectrum-web-components/button@0.9.0) (2020-08-31)

### Features

- **action-group:** add action-group pattern ([d2de766](https://github.com/adobe/spectrum-web-components/commit/d2de766efde6dfbaa1cd604f99ae3128b4fc81b5))
- **card:** upgrade to Spectrum CSS v3.0.0 ([84cf1a9](https://github.com/adobe/spectrum-web-components/commit/84cf1a9758b1e357f18efac5763d17d6a4db0578))
- **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))

## [0.8.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.8.3...@spectrum-web-components/button@0.8.4) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.8.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.8.2...@spectrum-web-components/button@0.8.3) (2020-07-27)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.8.1...@spectrum-web-components/button@0.8.2) (2020-07-24)

### Bug Fixes

- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.8.0...@spectrum-web-components/button@0.8.1) (2020-07-22)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.7.0...@spectrum-web-components/button@0.8.0) (2020-07-17)

### Features

- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.6.0...@spectrum-web-components/button@0.7.0) (2020-06-08)

### Features

- **button-group:** add ButtonGroup pattern ([c4d85b5](https://github.com/adobe/spectrum-web-components/commit/c4d85b5524f6623dbd3cb22c0d6fa8fc00e98733))

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.5.2...@spectrum-web-components/button@0.6.0) (2020-05-12)

### Features

- add dialog, dialog-wrapped, and underlay elements ([3df9050](https://github.com/adobe/spectrum-web-components/commit/3df9050f65bd3a95f9b986aa728cfc1a2eaee432))

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.5.1...@spectrum-web-components/button@0.5.2) (2020-05-08)

### Bug Fixes

- **button:** clean up clear button for reuse across elements ([4c71eb1](https://github.com/adobe/spectrum-web-components/commit/4c71eb12112283ec31a40de38fdb79195ac52fd5))
- remove errant readme content, correct icon selector ([3dd1fb1](https://github.com/adobe/spectrum-web-components/commit/3dd1fb1ebd5ce5171345a6c2d4aac08e2d49a5b8))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.5.0...@spectrum-web-components/button@0.5.1) (2020-04-21)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.4.8...@spectrum-web-components/button@0.5.0) (2020-04-16)

### Bug Fixes

- **button:** add excludeSourceSelector to reduce duplication of styles ([683e88e](https://github.com/adobe/spectrum-web-components/commit/683e88e8ac659e789c20d77bf0af602a305b54f9))

### Features

- add and use icons-ui package ([d9c3ab2](https://github.com/adobe/spectrum-web-components/commit/d9c3ab212b4f756334e857fc513ccbf0a4dff9cc))

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.4.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.4.7...@spectrum-web-components/button@0.4.8) (2020-04-10)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.4.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.4.6...@spectrum-web-components/button@0.4.7) (2020-04-07)

### Bug Fixes

- **button:** add "toggles" attribute to action button ([3e2d80c](https://github.com/adobe/spectrum-web-components/commit/3e2d80c5d004eb13b6523ee7e71d550d5e468d07))

## [0.4.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.4.5...@spectrum-web-components/button@0.4.6) (2020-03-11)

### Bug Fixes

- **dropdown:** correctly support "quiet" variant ([2a51a2b](https://github.com/adobe/spectrum-web-components/commit/2a51a2b))

## [0.4.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.4.4...@spectrum-web-components/button@0.4.5) (2020-02-05)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.4.3...@spectrum-web-components/button@0.4.4) (2020-02-01)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.4.2...@spectrum-web-components/button@0.4.3) (2020-01-30)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.4.1...@spectrum-web-components/button@0.4.2) (2020-01-06)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.4.0...@spectrum-web-components/button@0.4.1) (2019-12-12)

**Note:** Version bump only for package @spectrum-web-components/button

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.3.2...@spectrum-web-components/button@0.4.0) (2019-12-09)

### Features

- **button:** add support for "sp-clear-button" ([9028b6d](https://github.com/adobe/spectrum-web-components/commit/9028b6d))

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.3.1...@spectrum-web-components/button@0.3.2) (2019-12-02)

**Note:** Version bump only for package @spectrum-web-components/button

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.3.0...@spectrum-web-components/button@0.3.1) (2019-11-27)

### Bug Fixes

- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.2.2...@spectrum-web-components/button@0.3.0) (2019-11-19)

### Features

- use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc7))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/3918888))

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.2.1...@spectrum-web-components/button@0.2.2) (2019-11-01)

### Bug Fixes

- **button:** use slot text observer pattern ([a7288c3](https://github.com/adobe/spectrum-web-components/commit/a7288c3))
- **shared:** make Focusable pass disabled always ([a339d6f](https://github.com/adobe/spectrum-web-components/commit/a339d6f))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.2.0...@spectrum-web-components/button@0.2.1) (2019-10-16)

### Bug Fixes

- **button:** allow element content in the default/label slot ([7b0ef58](https://github.com/adobe/spectrum-web-components/commit/7b0ef58))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/button@0.1.3...@spectrum-web-components/button@0.2.0) (2019-10-14)

### Bug Fixes

- **button:** apply icon as slotted content in action-button styles ([3b1487b](https://github.com/adobe/spectrum-web-components/commit/3b1487b))

### Features

- **button:** action-buttons with icons AND text ([aa788b1](https://github.com/adobe/spectrum-web-components/commit/aa788b1))
- **button:** allow icon only buttons ([25623d6](https://github.com/adobe/spectrum-web-components/commit/25623d6))
- **button:** pass "label" property to "aria-label" ([78ae59d](https://github.com/adobe/spectrum-web-components/commit/78ae59d))
- **search:** adds sp-search element ([d484fc2](https://github.com/adobe/spectrum-web-components/commit/d484fc2))

### Performance Improvements

- use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0a))

## 0.1.3 (2019-10-03)

**Note:** Version bump only for package @spectrum-web-components/button
