# Change Log

## 1.10.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/progress-circle@1.10.0

## 1.9.1

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/progress-circle@1.9.1

## 1.9.0

### Patch Changes

- [#5730](https://github.com/adobe/spectrum-web-components/pull/5730) [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8) Thanks [@caseyisonit](https://github.com/caseyisonit)! - - **Fixed**: Accessibility and caching in `PendingStateController`.
    - **Fixed**: Updated progress circle to use `role="presentation"` for better accessibility compliance
    - **Fixed**: Improved aria-label caching logic to better handle dynamic label changes
    - **Added**: Documentation noting the controller is primarily used by `<sp-button>` component
    - **Fixed**: Enhanced caching mechanism to preserve user-set aria-labels during pending states

    These changes improve accessibility compliance and aria-label management for components using the pending state controller.

- Updated dependencies [[`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8)]:
    - @spectrum-web-components/progress-circle@1.9.0

## 1.8.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/progress-circle@1.8.0

## 1.7.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/progress-circle@1.7.0

## 1.6.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/progress-circle@1.6.0

## 1.5.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/progress-circle@1.5.0

## 1.4.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/progress-circle@1.4.0

## 1.3.0

### Minor Changes

- [#5031](https://github.com/adobe/spectrum-web-components/pull/5031) [`ea38ef0`](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f) Thanks [@nikkimk](https://github.com/nikkimk)! - Used WAI ARIA Authoring Practices Guide (APG) to make accessibility improvements for `<sp-action-menu>`, `<sp-menu>`, and `<sp-picker>`, including:
    - Numpad keys now work with `<sp-picker>` and `<sp-action-menu>` -`<sp-action-menu>`'s `<sp-menu-item>` elements can now be read by a screen reader ([#4556](https://github.com/adobe/spectrum-web-components/issues/4556))
    - `<sp-menu-item>` href can now be clicked by a screen reader ([#4997](https://github.com/adobe/spectrum-web-components/issues/4997))
    - Opening a `<sp-action-menu>`, `<sp-menu>`, and `<sp-picker>` with a keyboard now sets focus on an item within the menu. ([#4557](https://github.com/adobe/spectrum-web-components/issues/4557))

    See the following APG examples for more information:
    - [Navigation Menu Example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/)
    - [Editor Menubar Example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/)

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/progress-circle@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

### Bug Fixes

- **action menu:** keyboard accessibility omnibus ([#5031](https://github.com/adobe/spectrum-web-components/issues/5031)) ([ea38ef0](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)), closes [#4623](https://github.com/adobe/spectrum-web-components/issues/4623)

### Features

- **reactive-controllers:** Migrate to Colorjs from Tinycolor ([#4713](https://github.com/adobe/spectrum-web-components/issues/4713)) ([9d740f0](https://github.com/adobe/spectrum-web-components/commit/9d740f0c830aa44273097181e761e9a92d3df4be))

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

### Features

- **reactive-controller:** new pending state controller ([#4605](https://github.com/adobe/spectrum-web-components/issues/4605)) ([68baf94](https://github.com/adobe/spectrum-web-components/commit/68baf94f257b9c7525253819a2ed3c8fa1b6c408))

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

### Bug Fixes

- **reactive-controllers:** update focusable element's tab-index to 0 on accepting focus ([#4630](https://github.com/adobe/spectrum-web-components/issues/4630)) ([d359e84](https://github.com/adobe/spectrum-web-components/commit/d359e844fb00ff3a52f7f4346038aa8d5b620025))

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

### Features

- **breadcrumbs:** add Breadcrumbs component ([#4578](https://github.com/adobe/spectrum-web-components/issues/4578)) ([acd4b5e](https://github.com/adobe/spectrum-web-components/commit/acd4b5e4401dad8cf26b50ee5dcda80a28b62999))

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

### Features

- **action-bar:** support for action-menus ([#3780](https://github.com/adobe/spectrum-web-components/issues/3780)) ([4aff599](https://github.com/adobe/spectrum-web-components/commit/4aff5995f6a22eefae0dd8e580d743c27ceb2c2d))

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

### Bug Fixes

- **reactive-controllers:** add DependencyManagerController ([c7f7dea](https://github.com/adobe/spectrum-web-components/commit/c7f7dead131c9c2594a181ac62294683b6c7fd63))

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

### Bug Fixes

- support numeric IDs when resolving elements ([f62bf0d](https://github.com/adobe/spectrum-web-components/commit/f62bf0d24191ef47a4d7f9172c40570e052808a2))

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

### Bug Fixes

- **grid:** grid focusgroup fix on mutationObserver ([#3684](https://github.com/adobe/spectrum-web-components/issues/3684)) ([5d47db5](https://github.com/adobe/spectrum-web-components/commit/5d47db52b99ccd1cc58d9044781f3f1e38744bd6))

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

### Features

- **overlay:** ship Overlay API v2 ([67b5d1b](https://github.com/adobe/spectrum-web-components/commit/67b5d1b02e88dcb5b0b79b5a6c5ead92ad1a5aca))

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

### Bug Fixes

- added default focus in focus group ([cd59f18](https://github.com/adobe/spectrum-web-components/commit/cd59f180afacaa719c01a8001bf8a656b4bbcb80))
- added Mutation Observer in the tags workflow ([3af1861](https://github.com/adobe/spectrum-web-components/commit/3af1861a09aa7eac6cd4eb0dbb7cce8ab057efec))
- **reactive-controllers:** functionality debugged ([f98013b](https://github.com/adobe/spectrum-web-components/commit/f98013bceced7e4d2759c698cdff7f9fe1d43c68))
- **reactive-controllers:** handleItemMutation ([d0e32a2](https://github.com/adobe/spectrum-web-components/commit/d0e32a255483c605bbbfc804f1c56c401b00ffe9))
- removed disabled property check ([816732f](https://github.com/adobe/spectrum-web-components/commit/816732f03fb271dbefe3ac7a0412cd5ec6479635))
- removed mutation controller from tags and added to focusgroup ([aaa1bc0](https://github.com/adobe/spectrum-web-components/commit/aaa1bc04437585a0d8f30e885e076868ecb1defa))
- **tags:** corner cases handled ([8ec6b6a](https://github.com/adobe/spectrum-web-components/commit/8ec6b6a0288629e1006b5d1c3ee17d162dd97d23))
- **tags:** delete functionality working ([60e6c2e](https://github.com/adobe/spectrum-web-components/commit/60e6c2e92e30c833d572d34ad6d41e94568a40d6))
- **tags:** documented the function ([f97c7a7](https://github.com/adobe/spectrum-web-components/commit/f97c7a77eb1dce32f8ec3202fe839dd0a9f0fdc8))
- **tags:** handled corner cases ([55a95b7](https://github.com/adobe/spectrum-web-components/commit/55a95b757baf89cab4261d50c2cf279471e7ef01))
- **tags:** performed the suggested changes ([6e3ef36](https://github.com/adobe/spectrum-web-components/commit/6e3ef36e8f423f08c2537eb2d075bec4118f2e86))
- **tags:** removed comment ([771dc0e](https://github.com/adobe/spectrum-web-components/commit/771dc0e63617e29c6777eb7bf3470c46ac9f7d17))
- **tags:** some extra chnages ([45f1a9d](https://github.com/adobe/spectrum-web-components/commit/45f1a9d846e8d717bdd3fae999639b2419d53fc3))
- **tags:** some minor chnages ([36886fc](https://github.com/adobe/spectrum-web-components/commit/36886fc1fabecf23f99c5f23e8a9eae718f981b1))
- **tags:** suggested changes done ([8aca49e](https://github.com/adobe/spectrum-web-components/commit/8aca49e5249af235f20cf83cfee156336b3ca76f))

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

# 0.30.0 (2023-05-03)

### Bug Fixes

- add Grid pattern ([341f493](https://github.com/adobe/spectrum-web-components/commit/341f4932087487be47bde355d1b0894886ed44ad))
- add support for Element Resolution ([d6a65d0](https://github.com/adobe/spectrum-web-components/commit/d6a65d0ce26da864729e707f62683585fe5e49c4))
- convert the langage resolution workflow to a Reactive Controller ([b7781db](https://github.com/adobe/spectrum-web-components/commit/b7781db820620688f97a40225fb17a10e7881178))
- ensure reactivity of resolved language ([5863a15](https://github.com/adobe/spectrum-web-components/commit/5863a155262d6ba6898f82bff49aed55a6eae4f4))
- leverage Color Controller to unify color interface across packages ([fb71690](https://github.com/adobe/spectrum-web-components/commit/fb7169066fd4f15aee594c463cc4cdbf7f550a5e))
- manage updated node types ([0517fc1](https://github.com/adobe/spectrum-web-components/commit/0517fc19536325332543f95f5ecc0d6cb0c786c5))
- **table:** add resize controller to TableBody for a11y reasons ([85dd406](https://github.com/adobe/spectrum-web-components/commit/85dd4066328afeacf978acc3fc9acd57436900a1))

### Features

- add reactive controllers package ([d434e9d](https://github.com/adobe/spectrum-web-components/commit/d434e9df151991bac031a0e8c1bde10ebecb5047))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- modified .selected to make `<sp-action-group>` a controllable component ([#2006](https://github.com/adobe/spectrum-web-components/issues/2006)) ([4c69b25](https://github.com/adobe/spectrum-web-components/commit/4c69b251fdf09fe898ce98482881e647b857205d))
- **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))

## [0.3.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.3.4...@spectrum-web-components/reactive-controllers@0.3.5) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.3.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.3.3...@spectrum-web-components/reactive-controllers@0.3.4) (2022-11-21)

### Bug Fixes

- add support for Element Resolution ([d6a65d0](https://github.com/adobe/spectrum-web-components/commit/d6a65d0ce26da864729e707f62683585fe5e49c4))

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.3.2...@spectrum-web-components/reactive-controllers@0.3.3) (2022-11-14)

### Bug Fixes

- ensure reactivity of resolved language ([5863a15](https://github.com/adobe/spectrum-web-components/commit/5863a155262d6ba6898f82bff49aed55a6eae4f4))

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.3.1...@spectrum-web-components/reactive-controllers@0.3.2) (2022-10-28)

### Bug Fixes

- manage updated node types ([0517fc1](https://github.com/adobe/spectrum-web-components/commit/0517fc19536325332543f95f5ecc0d6cb0c786c5))

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.3.0...@spectrum-web-components/reactive-controllers@0.3.1) (2022-10-10)

### Bug Fixes

- convert the langage resolution workflow to a Reactive Controller ([b7781db](https://github.com/adobe/spectrum-web-components/commit/b7781db820620688f97a40225fb17a10e7881178))
- leverage Color Controller to unify color interface across packages ([fb71690](https://github.com/adobe/spectrum-web-components/commit/fb7169066fd4f15aee594c463cc4cdbf7f550a5e))
- **table:** add resize controller to TableBody for a11y reasons ([85dd406](https://github.com/adobe/spectrum-web-components/commit/85dd4066328afeacf978acc3fc9acd57436900a1))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.2.5...@spectrum-web-components/reactive-controllers@0.3.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

## [0.2.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.2.4...@spectrum-web-components/reactive-controllers@0.2.5) (2022-08-04)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.2.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.2.3...@spectrum-web-components/reactive-controllers@0.2.4) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.2.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.2.2...@spectrum-web-components/reactive-controllers@0.2.3) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.2.1...@spectrum-web-components/reactive-controllers@0.2.2) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/reactive-controllers

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.2.0...@spectrum-web-components/reactive-controllers@0.2.1) (2022-03-04)

### Bug Fixes

- add Grid pattern ([341f493](https://github.com/adobe/spectrum-web-components/commit/341f4932087487be47bde355d1b0894886ed44ad))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/reactive-controllers@0.1.0...@spectrum-web-components/reactive-controllers@0.2.0) (2022-02-02)

### Features

- **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))

# 0.1.0 (2022-01-26)

### Features

- add reactive controllers package ([d434e9d](https://github.com/adobe/spectrum-web-components/commit/d434e9df151991bac031a0e8c1bde10ebecb5047))
- modified .selected to make `<sp-action-group>` a controllable component ([#2006](https://github.com/adobe/spectrum-web-components/issues/2006)) ([4c69b25](https://github.com/adobe/spectrum-web-components/commit/4c69b251fdf09fe898ce98482881e647b857205d))
