# Change Log

## 1.11.0

### Patch Changes

- Updated dependencies [[`b95e254`](https://github.com/adobe/spectrum-web-components/commit/b95e25413830825a506b7d4025d6b4d982691771), [`f8bdeec`](https://github.com/adobe/spectrum-web-components/commit/f8bdeecf8a230822122a990fb977d3654649f891), [`9cb816b`](https://github.com/adobe/spectrum-web-components/commit/9cb816b5ac80387fdc9bb87381f5149fecb1b595)]:
    - @spectrum-web-components/reactive-controllers@1.11.0
    - @spectrum-web-components/shared@1.11.0
    - @spectrum-web-components/base@1.11.0
    - @spectrum-web-components/icon@1.11.0
    - @spectrum-web-components/action-button@1.11.0
    - @spectrum-web-components/icons-ui@1.11.0

## 1.10.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.10.0
    - @spectrum-web-components/action-button@1.10.0
    - @spectrum-web-components/icon@1.10.0
    - @spectrum-web-components/icons-ui@1.10.0
    - @spectrum-web-components/shared@1.10.0
    - @spectrum-web-components/reactive-controllers@1.10.0

## 1.9.1

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/action-button@1.9.1
    - @spectrum-web-components/icon@1.9.1
    - @spectrum-web-components/icons-ui@1.9.1
    - @spectrum-web-components/base@1.9.1
    - @spectrum-web-components/reactive-controllers@1.9.1
    - @spectrum-web-components/shared@1.9.1

## 1.9.0

### Patch Changes

- Updated dependencies [[`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8)]:
    - @spectrum-web-components/reactive-controllers@1.9.0
    - @spectrum-web-components/action-button@1.9.0
    - @spectrum-web-components/icon@1.9.0
    - @spectrum-web-components/icons-ui@1.9.0
    - @spectrum-web-components/base@1.9.0
    - @spectrum-web-components/shared@1.9.0

## 1.8.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/action-button@1.8.0
    - @spectrum-web-components/icon@1.8.0
    - @spectrum-web-components/icons-ui@1.8.0
    - @spectrum-web-components/base@1.8.0
    - @spectrum-web-components/reactive-controllers@1.8.0
    - @spectrum-web-components/shared@1.8.0

## 1.7.0

### Patch Changes

- [#5429](https://github.com/adobe/spectrum-web-components/pull/5429) [`8da375b`](https://github.com/adobe/spectrum-web-components/commit/8da375be5530f56d6f37fe370913193ed373df12) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - Added `@spectrum-web-components/action-button` as a dependency for Tabs as its used in the direction button.

- Updated dependencies [[`c1669d2`](https://github.com/adobe/spectrum-web-components/commit/c1669d2dc5e1ceeb84486ce49a428f86a3173caa)]:
    - @spectrum-web-components/action-button@1.7.0
    - @spectrum-web-components/icon@1.7.0
    - @spectrum-web-components/icons-ui@1.7.0
    - @spectrum-web-components/base@1.7.0
    - @spectrum-web-components/reactive-controllers@1.7.0
    - @spectrum-web-components/shared@1.7.0

## 1.6.0

### Patch Changes

- [#5349](https://github.com/adobe/spectrum-web-components/pull/5349) [`a9727d2`](https://github.com/adobe/spectrum-web-components/commit/a9727d2975b01f440c09789c9e7e0122063b6f7e) Thanks [@renovate](https://github.com/apps/renovate)! - Remove unnecessary system theme references to reduce complexity for components that don't need the additional mapping layer.

- Updated dependencies []:
    - @spectrum-web-components/icon@1.6.0
    - @spectrum-web-components/icons-ui@1.6.0
    - @spectrum-web-components/base@1.6.0
    - @spectrum-web-components/reactive-controllers@1.6.0
    - @spectrum-web-components/shared@1.6.0

## 1.5.0

### Patch Changes

- [#5323](https://github.com/adobe/spectrum-web-components/pull/5323) [`c7efe31`](https://github.com/adobe/spectrum-web-components/commit/c7efe314c5954c20e65302544cb0577580ba0b7b) Thanks [@mizgaionutalexandru](https://github.com/mizgaionutalexandru)! - Fixed a bug where removing the `disabled` attribute (or setting it to `false`) on an `sp-tabs` element would not correctly enable the selected `sp-tab`. The fix updates the `focusInIndex` method in the component's `RovingTabindexController` to properly identify the selected tab that should become focusable when the parent tabs component is enabled.

- Updated dependencies []:
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
    - @spectrum-web-components/base@1.4.0
    - @spectrum-web-components/reactive-controllers@1.4.0
    - @spectrum-web-components/shared@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies [[`ea38ef0`](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)]:
    - @spectrum-web-components/reactive-controllers@1.3.0
    - @spectrum-web-components/icon@1.3.0
    - @spectrum-web-components/icons-ui@1.3.0
    - @spectrum-web-components/base@1.3.0
    - @spectrum-web-components/shared@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

### Bug Fixes

- **action menu:** keyboard accessibility omnibus ([#5031](https://github.com/adobe/spectrum-web-components/issues/5031)) ([ea38ef0](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)), closes [#4623](https://github.com/adobe/spectrum-web-components/issues/4623)

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

### Bug Fixes

- **tabs:** scroll exceeding tabs limit ([#4722](https://github.com/adobe/spectrum-web-components/issues/4722)) ([fc9a448](https://github.com/adobe/spectrum-web-components/commit/fc9a4489c13e2471226e0f79a1197a61ef8242a7))

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

### Bug Fixes

- **tabs:** prevent vertical auto scroll ([#4613](https://github.com/adobe/spectrum-web-components/issues/4613)) ([e1ef097](https://github.com/adobe/spectrum-web-components/commit/e1ef097bc4c4a1e888de028f40b6f2bb5ea2d7b8))

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Bug Fixes

- **styles, theme:** surface exports that omit Spectrum Vars proactively ([#4142](https://github.com/adobe/spectrum-web-components/issues/4142)) ([5b524c1](https://github.com/adobe/spectrum-web-components/commit/5b524c1d54a64225cb3b2f71b92f581695985519))
- **tab-overflow:** improve tab navigation experience and support custom aria labels ([#4165](https://github.com/adobe/spectrum-web-components/issues/4165)) ([9c9bf95](https://github.com/adobe/spectrum-web-components/commit/9c9bf952cf2a1e4a0c5bc35e63e46f5d5bd6afe8))

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

### Bug Fixes

- **tabs:** bring selected tab into view ([#4032](https://github.com/adobe/spectrum-web-components/issues/4032)) ([a187057](https://github.com/adobe/spectrum-web-components/commit/a187057afa7ac073fe45117ebd0bc2315e6fea5e))

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

### Bug Fixes

- **tabs:** account for the indicator bar in the overflow decorator ([f4a8744](https://github.com/adobe/spectrum-web-components/commit/f4a8744ed5cb38608ae856539ce7c34ca212b3d4))

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

### Bug Fixes

- **tabs:** prevent vertical scrolling in overflow tabs ([eb0592f](https://github.com/adobe/spectrum-web-components/commit/eb0592f87c1f52fe34745af030331060b3641a59))

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

### Bug Fixes

- **tabs:** allow bi-directional arrow key navigation in both orientations ([#3410](https://github.com/adobe/spectrum-web-components/issues/3410)) ([ea10049](https://github.com/adobe/spectrum-web-components/commit/ea10049c4d9eea0ef619cdd41fae2e1152455570))

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Features

- **tabs,top-nav:** use Core Tokens ([c6ba355](https://github.com/adobe/spectrum-web-components/commit/c6ba355c2160d1a8bda1618b8a9c28213194c7c5))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/tabs

# 0.30.0 (2023-05-03)

### Bug Fixes

- allow "updateComplete" to resolve to a boolean like the LitElement default ([6127946](https://github.com/adobe/spectrum-web-components/commit/6127946fd3ffd048a30b7eb4bf6aadf9e7c8752a))
- allow Tab elements to accept slotted DOM content ([29c9517](https://github.com/adobe/spectrum-web-components/commit/29c951790159d9e02b9850f5739ecaeb486e82b1))
- check if current selected value exists before setting selected attr ([1878ca3](https://github.com/adobe/spectrum-web-components/commit/1878ca339626253ce3a664d42702b374fd4fff54))
- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
- ensure that updates to Tab element content update the Selection Indicator ([94891eb](https://github.com/adobe/spectrum-web-components/commit/94891eb06022f8744558137d9fa237fd541ebca2))
- extract and share tshirt size styles ([3acfc30](https://github.com/adobe/spectrum-web-components/commit/3acfc308efea0993f00e7be01ee2fb49bd092449))
- extract and share tshirt size styles ([b1440f7](https://github.com/adobe/spectrum-web-components/commit/b1440f7e828f525a101ffba69df16984be154da1))
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- keep compact property ([904df71](https://github.com/adobe/spectrum-web-components/commit/904df71d63d542d6f8cf724dbfb81347d0f0de1b))
- keep compact property ([b5af15f](https://github.com/adobe/spectrum-web-components/commit/b5af15fb1fa6794cee0a88ffa9839921c2b21508))
- manually support WHCM in tabs ([11884f1](https://github.com/adobe/spectrum-web-components/commit/11884f13655db88041d0470c48dee22c4bd8ec83))
- move hover/focus hoisting into conditioning ([15ac2f7](https://github.com/adobe/spectrum-web-components/commit/15ac2f7f561b3cb5b865d1539fbd753999f25119))
- proper overflow rtl support ([9b1c9d4](https://github.com/adobe/spectrum-web-components/commit/9b1c9d4470051e059c8e22b544dee7f46d03593a))
- remove attribute binding logic ([1f6833f](https://github.com/adobe/spectrum-web-components/commit/1f6833f6f1058b7c91aec45ba51330c9dfbe6372))
- remove attribute binding logic ([7bce0ae](https://github.com/adobe/spectrum-web-components/commit/7bce0ae239e55a6479268ab76a992199452c0cb5))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- support matching keydown to [dir] ([70b40a9](https://github.com/adobe/spectrum-web-components/commit/70b40a9d3bb5fe2d12208365abf132260270721b))
- tab indicator positioning ([8c20769](https://github.com/adobe/spectrum-web-components/commit/8c20769030c3c90620f1f2e397f5f5b83b2a49c9))
- **tabs:** add "emphasized" and correct WHCM delivery ([27940bd](https://github.com/adobe/spectrum-web-components/commit/27940bde2444040910bf772c757514fbabdee85c))
- **tabs:** add "quiet", "compact", and "emphasized" "direction=vertical" ([26fff53](https://github.com/adobe/spectrum-web-components/commit/26fff53d8d64c508be66406d00e6e45e48c15278))
- **tabs:** add "tablist" part to manage list styles ([bbf8074](https://github.com/adobe/spectrum-web-components/commit/bbf8074b177f51929ec3bddbffcd2c22ad1971b5))
- **tabs:** added test ([7d5f41f](https://github.com/adobe/spectrum-web-components/commit/7d5f41f74d2467e9d12a1a2328db1ff3dd6a8a71))
- **tabs:** bind tabindicator update to dir value ([09598b5](https://github.com/adobe/spectrum-web-components/commit/09598b59f1198b7ebc8067834681000ceee0918e))
- **tabs:** bind tabs overflow state with sp-tabs ([a07c45b](https://github.com/adobe/spectrum-web-components/commit/a07c45bdce27a7b0bed3faf46bd638ebab9b42d9))
- **tabs:** bind tabs overflow state with sp-tabs ([570a2cd](https://github.com/adobe/spectrum-web-components/commit/570a2cdaf282ef0f565574c65eef619c82ef2a60))
- **tabs:** correct entry focus element ([64407d3](https://github.com/adobe/spectrum-web-components/commit/64407d37fd09d3d598253a66c3b342882d51a826))
- **tabs:** correct indicator size by scaling from 100px ([a3fb68b](https://github.com/adobe/spectrum-web-components/commit/a3fb68bb8103bc87a9c1e14e3bca8a5476e3a2f1))
- **tabs:** ensure only one active tab stop in the tabs ([68b2523](https://github.com/adobe/spectrum-web-components/commit/68b2523d2287ad8bdb82d2c8b0e79b30129317c4))
- **tabs:** ensure tabs has layout ([7aba515](https://github.com/adobe/spectrum-web-components/commit/7aba51561965342ea3e18404621659aa32c2ed8f))
- **tabs:** ensure that "auto" attribute is respected ([d200775](https://github.com/adobe/spectrum-web-components/commit/d20077516fadeb42b8814416f87689254e4e0381))
- **tabs:** error on click - undefined tab target ([9742227](https://github.com/adobe/spectrum-web-components/commit/974222739745e1a8c082ed77e3e68199907f7890))
- **tabs:** include sp-tab-panel.js in the export map ([1619ae8](https://github.com/adobe/spectrum-web-components/commit/1619ae876d70d35eaff38aa955f3cd307f4a5c54))
- **tabs:** manage disabled state on tabs and tab elements ([58def1f](https://github.com/adobe/spectrum-web-components/commit/58def1fd7a724cc078459c56f39c19ebe2005f97))
- **tabs:** update css workarounds ([c2a17e0](https://github.com/adobe/spectrum-web-components/commit/c2a17e02ac019dc7a28411bdc2f666f8c27c26b8))
- **top-nav:** prototype top-nav pattern ([9708f6f](https://github.com/adobe/spectrum-web-components/commit/9708f6f63e080c0ec91c11763d3121a407349d1a))
- update indicator animation for loading and content direction ([f607f8b](https://github.com/adobe/spectrum-web-components/commit/f607f8b4fca280b7aa5eae835554ea62845abd1c))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
- use CSS position relative and revert Tabs.ts changes ([a682bcf](https://github.com/adobe/spectrum-web-components/commit/a682bcf149bc8d7e09875838323145883dbd3cbd))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))
- use ObserveSlotText mixin to prevent white space from overriding label attribute ([610fb4b](https://github.com/adobe/spectrum-web-components/commit/610fb4b5b392b7e3673c7d46bf8f9f5f79f27ca9))
- use typescript@^4.5 for "native" document.fonts typings ([a3e4aea](https://github.com/adobe/spectrum-web-components/commit/a3e4aea802c796e9029b2bc32f58639954db831b))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- apply sizedMixin for t-shirt sizing ([d7b63fb](https://github.com/adobe/spectrum-web-components/commit/d7b63fb0db06b5a8a412fea8370964f4db9d18ae))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- **tabs-overflow:** address comments ([b0e3398](https://github.com/adobe/spectrum-web-components/commit/b0e3398518d8c8d72dc901bd3c137a7c4c8f4b54))
- **tabs-overflow:** first round implementation of sp-tabs-overflow ([c5b589a](https://github.com/adobe/spectrum-web-components/commit/c5b589a41d74e61edfd1a10f012f70052ae39f6d))
- **tabs:** add sp-tab-panel element ([b17d276](https://github.com/adobe/spectrum-web-components/commit/b17d2765cf415578a31e5fa23515c25ff4c3922d))
- **tabs:** add test coverage, remove unused property from component class ([9933ad8](https://github.com/adobe/spectrum-web-components/commit/9933ad83dea315533bd749be9a25a15d9a33b24a))
- **tabs:** add test coverage, update import paths ([d104b52](https://github.com/adobe/spectrum-web-components/commit/d104b520f1ae0892f4905b6ba4e5d41d13e2fa76))
- **tabs:** moving tabs overflow under tabs package ([a18c692](https://github.com/adobe/spectrum-web-components/commit/a18c692a858163859cc73c86755a078ee003d67f))
- **tabs:** update bundle setup and readme ([0249b94](https://github.com/adobe/spectrum-web-components/commit/0249b94d36567f9a1e6c9de35a56ffeb1163df1b))
- **tabs:** update imports to get correct coverage ([2e421cd](https://github.com/adobe/spectrum-web-components/commit/2e421cda336833b55ba67f0e69bc76195e2b5a0a))
- **tabs:** update spectrum css input ([d875a0c](https://github.com/adobe/spectrum-web-components/commit/d875a0cdeba6e798ff129409b2b809d9d8adaae3))
- update card and tabs to latest spectrum-css ([55b8d67](https://github.com/adobe/spectrum-web-components/commit/55b8d67c03349183c3aebb52bbc54f5c58b3fdb4))
- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
- update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))
- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))
- use SixedMixin to manage "size" property ([8819821](https://github.com/adobe/spectrum-web-components/commit/88198212cb495833ed2e7644f95b43dca915318d))

### Performance Improvements

- reduce render cycles when managing "dir" attribute ([7b28309](https://github.com/adobe/spectrum-web-components/commit/7b28309ff2b977ad8a61d9e6c41737abfbb111bf))

## [0.11.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.11.3...@spectrum-web-components/tabs@0.11.4) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.11.2...@spectrum-web-components/tabs@0.11.3) (2023-04-05)

### Performance Improvements

- reduce render cycles when managing "dir" attribute ([7b28309](https://github.com/adobe/spectrum-web-components/commit/7b28309ff2b977ad8a61d9e6c41737abfbb111bf))

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.11.1...@spectrum-web-components/tabs@0.11.2) (2023-03-22)

### Bug Fixes

- extract and share tshirt size styles ([3acfc30](https://github.com/adobe/spectrum-web-components/commit/3acfc308efea0993f00e7be01ee2fb49bd092449))
- extract and share tshirt size styles ([b1440f7](https://github.com/adobe/spectrum-web-components/commit/b1440f7e828f525a101ffba69df16984be154da1))
- keep compact property ([904df71](https://github.com/adobe/spectrum-web-components/commit/904df71d63d542d6f8cf724dbfb81347d0f0de1b))
- keep compact property ([b5af15f](https://github.com/adobe/spectrum-web-components/commit/b5af15fb1fa6794cee0a88ffa9839921c2b21508))
- move hover/focus hoisting into conditioning ([15ac2f7](https://github.com/adobe/spectrum-web-components/commit/15ac2f7f561b3cb5b865d1539fbd753999f25119))
- proper overflow rtl support ([9b1c9d4](https://github.com/adobe/spectrum-web-components/commit/9b1c9d4470051e059c8e22b544dee7f46d03593a))
- remove attribute binding logic ([1f6833f](https://github.com/adobe/spectrum-web-components/commit/1f6833f6f1058b7c91aec45ba51330c9dfbe6372))
- remove attribute binding logic ([7bce0ae](https://github.com/adobe/spectrum-web-components/commit/7bce0ae239e55a6479268ab76a992199452c0cb5))
- **tabs:** bind tabs overflow state with sp-tabs ([a07c45b](https://github.com/adobe/spectrum-web-components/commit/a07c45bdce27a7b0bed3faf46bd638ebab9b42d9))
- **tabs:** bind tabs overflow state with sp-tabs ([570a2cd](https://github.com/adobe/spectrum-web-components/commit/570a2cdaf282ef0f565574c65eef619c82ef2a60))

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.11.0...@spectrum-web-components/tabs@0.11.1) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.10.7...@spectrum-web-components/tabs@0.11.0) (2023-02-21)

### Features

- **tabs-overflow:** address comments ([b0e3398](https://github.com/adobe/spectrum-web-components/commit/b0e3398518d8c8d72dc901bd3c137a7c4c8f4b54))
- **tabs-overflow:** first round implementation of sp-tabs-overflow ([c5b589a](https://github.com/adobe/spectrum-web-components/commit/c5b589a41d74e61edfd1a10f012f70052ae39f6d))
- **tabs:** add test coverage, remove unused property from component class ([9933ad8](https://github.com/adobe/spectrum-web-components/commit/9933ad83dea315533bd749be9a25a15d9a33b24a))
- **tabs:** add test coverage, update import paths ([d104b52](https://github.com/adobe/spectrum-web-components/commit/d104b520f1ae0892f4905b6ba4e5d41d13e2fa76))
- **tabs:** moving tabs overflow under tabs package ([a18c692](https://github.com/adobe/spectrum-web-components/commit/a18c692a858163859cc73c86755a078ee003d67f))
- **tabs:** update bundle setup and readme ([0249b94](https://github.com/adobe/spectrum-web-components/commit/0249b94d36567f9a1e6c9de35a56ffeb1163df1b))
- **tabs:** update imports to get correct coverage ([2e421cd](https://github.com/adobe/spectrum-web-components/commit/2e421cda336833b55ba67f0e69bc76195e2b5a0a))

## [0.10.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.10.6...@spectrum-web-components/tabs@0.10.7) (2023-02-08)

### Bug Fixes

- **tabs:** correct indicator size by scaling from 100px ([a3fb68b](https://github.com/adobe/spectrum-web-components/commit/a3fb68bb8103bc87a9c1e14e3bca8a5476e3a2f1))

## [0.10.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.10.5...@spectrum-web-components/tabs@0.10.6) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.10.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.10.4...@spectrum-web-components/tabs@0.10.5) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.10.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.10.3...@spectrum-web-components/tabs@0.10.4) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.10.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.10.2...@spectrum-web-components/tabs@0.10.3) (2022-11-21)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.10.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.10.1...@spectrum-web-components/tabs@0.10.2) (2022-11-14)

### Bug Fixes

- tab indicator positioning ([8c20769](https://github.com/adobe/spectrum-web-components/commit/8c20769030c3c90620f1f2e397f5f5b83b2a49c9))
- use CSS position relative and revert Tabs.ts changes ([a682bcf](https://github.com/adobe/spectrum-web-components/commit/a682bcf149bc8d7e09875838323145883dbd3cbd))

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.10.0...@spectrum-web-components/tabs@0.10.1) (2022-10-28)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.9.2...@spectrum-web-components/tabs@0.10.0) (2022-10-17)

### Bug Fixes

- **tabs:** update css workarounds ([c2a17e0](https://github.com/adobe/spectrum-web-components/commit/c2a17e02ac019dc7a28411bdc2f666f8c27c26b8))

### Features

- update card and tabs to latest spectrum-css ([55b8d67](https://github.com/adobe/spectrum-web-components/commit/55b8d67c03349183c3aebb52bbc54f5c58b3fdb4))

## [0.9.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.9.1...@spectrum-web-components/tabs@0.9.2) (2022-10-10)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.9.0...@spectrum-web-components/tabs@0.9.1) (2022-09-14)

### Bug Fixes

- **tabs:** add "quiet", "compact", and "emphasized" "direction=vertical" ([26fff53](https://github.com/adobe/spectrum-web-components/commit/26fff53d8d64c508be66406d00e6e45e48c15278))

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.15...@spectrum-web-components/tabs@0.9.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

## [0.8.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.14...@spectrum-web-components/tabs@0.8.15) (2022-08-04)

### Bug Fixes

- **tabs:** add "tablist" part to manage list styles ([bbf8074](https://github.com/adobe/spectrum-web-components/commit/bbf8074b177f51929ec3bddbffcd2c22ad1971b5))

## [0.8.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.13...@spectrum-web-components/tabs@0.8.14) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.8.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.12...@spectrum-web-components/tabs@0.8.13) (2022-06-29)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.8.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.11...@spectrum-web-components/tabs@0.8.12) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.8.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.10...@spectrum-web-components/tabs@0.8.11) (2022-05-27)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.8.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.9...@spectrum-web-components/tabs@0.8.10) (2022-05-12)

### Bug Fixes

- **tabs:** add "emphasized" and correct WHCM delivery ([27940bd](https://github.com/adobe/spectrum-web-components/commit/27940bde2444040910bf772c757514fbabdee85c))

## [0.8.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.8...@spectrum-web-components/tabs@0.8.9) (2022-04-21)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.8.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.7...@spectrum-web-components/tabs@0.8.8) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.8.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.6...@spectrum-web-components/tabs@0.8.7) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.8.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.5...@spectrum-web-components/tabs@0.8.6) (2022-03-04)

### Bug Fixes

- manually support WHCM in tabs ([11884f1](https://github.com/adobe/spectrum-web-components/commit/11884f13655db88041d0470c48dee22c4bd8ec83))

## [0.8.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.4...@spectrum-web-components/tabs@0.8.5) (2022-02-22)

### Bug Fixes

- **tabs:** ensure that "auto" attribute is respected ([d200775](https://github.com/adobe/spectrum-web-components/commit/d20077516fadeb42b8814416f87689254e4e0381))

## [0.8.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.3...@spectrum-web-components/tabs@0.8.4) (2022-02-02)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.8.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.2...@spectrum-web-components/tabs@0.8.3) (2022-01-26)

### Bug Fixes

- **tabs:** added test ([7d5f41f](https://github.com/adobe/spectrum-web-components/commit/7d5f41f74d2467e9d12a1a2328db1ff3dd6a8a71))
- **tabs:** error on click - undefined tab target ([9742227](https://github.com/adobe/spectrum-web-components/commit/974222739745e1a8c082ed77e3e68199907f7890))

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.1...@spectrum-web-components/tabs@0.8.2) (2022-01-07)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.8.0...@spectrum-web-components/tabs@0.8.1) (2021-12-13)

### Bug Fixes

- allow Tab elements to accept slotted DOM content ([29c9517](https://github.com/adobe/spectrum-web-components/commit/29c951790159d9e02b9850f5739ecaeb486e82b1))
- ensure that updates to Tab element content update the Selection Indicator ([94891eb](https://github.com/adobe/spectrum-web-components/commit/94891eb06022f8744558137d9fa237fd541ebca2))
- use typescript@^4.5 for "native" document.fonts typings ([a3e4aea](https://github.com/adobe/spectrum-web-components/commit/a3e4aea802c796e9029b2bc32f58639954db831b))

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.7.1...@spectrum-web-components/tabs@0.8.0) (2021-11-08)

### Features

- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.7.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.7.0...@spectrum-web-components/tabs@0.7.1) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.10...@spectrum-web-components/tabs@0.7.0) (2021-11-02)

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.6.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.9...@spectrum-web-components/tabs@0.6.10) (2021-10-12)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.6.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.8...@spectrum-web-components/tabs@0.6.9) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.6.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.7...@spectrum-web-components/tabs@0.6.8) (2021-09-13)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.6.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.6...@spectrum-web-components/tabs@0.6.7) (2021-08-24)

### Bug Fixes

- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.6.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.5...@spectrum-web-components/tabs@0.6.6) (2021-08-03)

### Bug Fixes

- allow "updateComplete" to resolve to a boolean like the LitElement default ([6127946](https://github.com/adobe/spectrum-web-components/commit/6127946fd3ffd048a30b7eb4bf6aadf9e7c8752a))

## [0.6.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.4...@spectrum-web-components/tabs@0.6.5) (2021-07-22)

### Bug Fixes

- **tabs:** ensure tabs has layout ([7aba515](https://github.com/adobe/spectrum-web-components/commit/7aba51561965342ea3e18404621659aa32c2ed8f))
- **tabs:** manage disabled state on tabs and tab elements ([58def1f](https://github.com/adobe/spectrum-web-components/commit/58def1fd7a724cc078459c56f39c19ebe2005f97))

## [0.6.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.3...@spectrum-web-components/tabs@0.6.4) (2021-07-01)

### Bug Fixes

- update indicator animation for loading and content direction ([f607f8b](https://github.com/adobe/spectrum-web-components/commit/f607f8b4fca280b7aa5eae835554ea62845abd1c))

## [0.6.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.2...@spectrum-web-components/tabs@0.6.3) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.6.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.1...@spectrum-web-components/tabs@0.6.2) (2021-06-07)

### Bug Fixes

- use ObserveSlotText mixin to prevent white space from overriding label attribute ([610fb4b](https://github.com/adobe/spectrum-web-components/commit/610fb4b5b392b7e3673c7d46bf8f9f5f79f27ca9))

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.6.0...@spectrum-web-components/tabs@0.6.1) (2021-05-25)

### Bug Fixes

- **tabs:** include sp-tab-panel.js in the export map ([1619ae8](https://github.com/adobe/spectrum-web-components/commit/1619ae876d70d35eaff38aa955f3cd307f4a5c54))

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.5.6...@spectrum-web-components/tabs@0.6.0) (2021-05-24)

### Features

- **tabs:** add sp-tab-panel element ([b17d276](https://github.com/adobe/spectrum-web-components/commit/b17d2765cf415578a31e5fa23515c25ff4c3922d))

## [0.5.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.5.5...@spectrum-web-components/tabs@0.5.6) (2021-05-12)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.5.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.5.4...@spectrum-web-components/tabs@0.5.5) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.5.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.5.3...@spectrum-web-components/tabs@0.5.4) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.5.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.5.2...@spectrum-web-components/tabs@0.5.3) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.5.1...@spectrum-web-components/tabs@0.5.2) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.5.0...@spectrum-web-components/tabs@0.5.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.4.3...@spectrum-web-components/tabs@0.5.0) (2021-03-04)

### Features

- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.4.2...@spectrum-web-components/tabs@0.4.3) (2021-02-11)

### Bug Fixes

- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.4.1...@spectrum-web-components/tabs@0.4.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.4.0...@spectrum-web-components/tabs@0.4.1) (2021-01-28)

**Note:** Version bump only for package @spectrum-web-components/tabs

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.2.4...@spectrum-web-components/tabs@0.4.0) (2021-01-21)

### Bug Fixes

- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- apply sizedMixin for t-shirt sizing ([d7b63fb](https://github.com/adobe/spectrum-web-components/commit/d7b63fb0db06b5a8a412fea8370964f4db9d18ae))
- use SixedMixin to manage "size" property ([8819821](https://github.com/adobe/spectrum-web-components/commit/88198212cb495833ed2e7644f95b43dca915318d))
- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- **tabs:** update spectrum css input ([d875a0c](https://github.com/adobe/spectrum-web-components/commit/d875a0cdeba6e798ff129409b2b809d9d8adaae3))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.2.4...@spectrum-web-components/tabs@0.3.0) (2021-01-13)

### Bug Fixes

- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- apply sizedMixin for t-shirt sizing ([d7b63fb](https://github.com/adobe/spectrum-web-components/commit/d7b63fb0db06b5a8a412fea8370964f4db9d18ae))
- use SixedMixin to manage "size" property ([8819821](https://github.com/adobe/spectrum-web-components/commit/88198212cb495833ed2e7644f95b43dca915318d))
- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- **tabs:** update spectrum css input ([d875a0c](https://github.com/adobe/spectrum-web-components/commit/d875a0cdeba6e798ff129409b2b809d9d8adaae3))

## [0.2.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.2.3...@spectrum-web-components/tabs@0.2.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.2.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.2.2...@spectrum-web-components/tabs@0.2.3) (2020-10-12)

### Bug Fixes

- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.2.1...@spectrum-web-components/tabs@0.2.2) (2020-09-25)

### Bug Fixes

- check if current selected value exists before setting selected attr ([1878ca3](https://github.com/adobe/spectrum-web-components/commit/1878ca339626253ce3a664d42702b374fd4fff54))
- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.2.0...@spectrum-web-components/tabs@0.2.1) (2020-09-14)

### Bug Fixes

- **top-nav:** prototype top-nav pattern ([9708f6f](https://github.com/adobe/spectrum-web-components/commit/9708f6f63e080c0ec91c11763d3121a407349d1a))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.1.3...@spectrum-web-components/tabs@0.2.0) (2020-08-31)

### Bug Fixes

- **tabs:** bind tabindicator update to dir value ([09598b5](https://github.com/adobe/spectrum-web-components/commit/09598b59f1198b7ebc8067834681000ceee0918e))
- support matching keydown to [dir](<[70b40a9](https://github.com/adobe/spectrum-web-components/commit/70b40a9d3bb5fe2d12208365abf132260270721b)>)

### Features

- update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))

## [0.1.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.1.2...@spectrum-web-components/tabs@0.1.3) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/tabs

## [0.1.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.1.1...@spectrum-web-components/tabs@0.1.2) (2020-07-27)

### Bug Fixes

- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))

## [0.1.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/tabs@0.1.0...@spectrum-web-components/tabs@0.1.1) (2020-07-22)

### Bug Fixes

- **tabs:** correct entry focus element ([64407d3](https://github.com/adobe/spectrum-web-components/commit/64407d37fd09d3d598253a66c3b342882d51a826))

# 0.1.0 (2020-07-17)

### Bug Fixes

- **tabs:** ensure only one active tab stop in the tabs ([68b2523](https://github.com/adobe/spectrum-web-components/commit/68b2523d2287ad8bdb82d2c8b0e79b30129317c4))

### Features

- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
