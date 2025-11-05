# Change Log

## 1.9.1

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/popover@1.9.1
    - @spectrum-web-components/asset@1.9.1
    - @spectrum-web-components/checkbox@1.9.1
    - @spectrum-web-components/divider@1.9.1
    - @spectrum-web-components/icons-workflow@1.9.1
    - @spectrum-web-components/base@1.9.1
    - @spectrum-web-components/shared@1.9.1
    - @spectrum-web-components/styles@1.9.1

## 1.9.0

### Patch Changes

- Updated dependencies [[`bdf54c1`](https://github.com/adobe/spectrum-web-components/commit/bdf54c1bc6d3eb20da1a1bf3b40650e6ab1ba399)]:
    - @spectrum-web-components/icons-workflow@1.9.0
    - @spectrum-web-components/checkbox@1.9.0
    - @spectrum-web-components/popover@1.9.0
    - @spectrum-web-components/asset@1.9.0
    - @spectrum-web-components/divider@1.9.0
    - @spectrum-web-components/base@1.9.0
    - @spectrum-web-components/shared@1.9.0
    - @spectrum-web-components/styles@1.9.0

## 1.8.0

### Minor Changes

- [#5638](https://github.com/adobe/spectrum-web-components/pull/5638) [`f8da034`](https://github.com/adobe/spectrum-web-components/commit/f8da034a2c37a4b7f3d06facf36cdcbc11b79833) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **Fixed** the card component's CSS by moving `block-size: 100%` from the base `:host` selector to only apply to `gallery` and `quiet` variants

- [#5171](https://github.com/adobe/spectrum-web-components/pull/5171) [`eae4332`](https://github.com/adobe/spectrum-web-components/commit/eae433283d09e4b0d72cd5fd21c17c3e6c22543b) Thanks [@majornista](https://github.com/majornista)! - Enhanced the Card component's checkbox functionality with improved screen reader support and keyboard navigation.

### Patch Changes

- Updated dependencies [[`77bdef6`](https://github.com/adobe/spectrum-web-components/commit/77bdef68a40e0f6cd5476271b01b4c0f00531f4f), [`15be17d`](https://github.com/adobe/spectrum-web-components/commit/15be17db91f1140ccf3cad52b1f2ed6c4b9e28ba), [`826a2d5`](https://github.com/adobe/spectrum-web-components/commit/826a2d533e46a6f945daefa8999fadca78bd8688)]:
    - @spectrum-web-components/styles@1.8.0
    - @spectrum-web-components/divider@1.8.0
    - @spectrum-web-components/popover@1.8.0
    - @spectrum-web-components/asset@1.8.0
    - @spectrum-web-components/checkbox@1.8.0
    - @spectrum-web-components/icons-workflow@1.8.0
    - @spectrum-web-components/base@1.8.0
    - @spectrum-web-components/shared@1.8.0

## 1.7.0

### Minor Changes

- [#5521](https://github.com/adobe/spectrum-web-components/pull/5521) [`56f2ff4`](https://github.com/adobe/spectrum-web-components/commit/56f2ff4fa42b1e2e02b1b6b4a7a33f377931bf77) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **Fixed**: On mobile Chrome (both Android and iOS), scrolling on `sp-card` components would inadvertently trigger click events. This was caused by the timing-based click detection (200ms threshold) in the pointer event handling, which could misinterpret quick scrolls as clicks. This issue did not affect Safari on mobile devices.

### Patch Changes

- [#5449](https://github.com/adobe/spectrum-web-components/pull/5449) [`ae9dcf8`](https://github.com/adobe/spectrum-web-components/commit/ae9dcf8812623eb3fedee3ce358689a1528d481e) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - - **Fixed**: `sp-card` component relies on `sp-popover` for certain toggle interactive behaviors, but this dependency was missing from its dependency tree.

- Updated dependencies [[`1126cf2`](https://github.com/adobe/spectrum-web-components/commit/1126cf22c0076c8728b86e9c0bf7f67fdd8fde07)]:
    - @spectrum-web-components/styles@1.7.0
    - @spectrum-web-components/popover@1.7.0
    - @spectrum-web-components/asset@1.7.0
    - @spectrum-web-components/checkbox@1.7.0
    - @spectrum-web-components/divider@1.7.0
    - @spectrum-web-components/icons-workflow@1.7.0
    - @spectrum-web-components/base@1.7.0
    - @spectrum-web-components/shared@1.7.0

## 1.6.0

### Patch Changes

- Updated dependencies [[`f6cebbd`](https://github.com/adobe/spectrum-web-components/commit/f6cebbd90008a2abb1232c355ae06e8566086093), [`9e15a66`](https://github.com/adobe/spectrum-web-components/commit/9e15a66a281745004add414ff977d4a71186aedd), [`a9727d2`](https://github.com/adobe/spectrum-web-components/commit/a9727d2975b01f440c09789c9e7e0122063b6f7e)]:
    - @spectrum-web-components/icons-workflow@1.6.0
    - @spectrum-web-components/styles@1.6.0
    - @spectrum-web-components/asset@1.6.0
    - @spectrum-web-components/checkbox@1.6.0
    - @spectrum-web-components/divider@1.6.0
    - @spectrum-web-components/base@1.6.0
    - @spectrum-web-components/shared@1.6.0

## 1.5.0

### Patch Changes

- [#5271](https://github.com/adobe/spectrum-web-components/pull/5271) [`165a904`](https://github.com/adobe/spectrum-web-components/commit/165a904bd01fddea922fe87b181bbf41281f81f0) Thanks [@renovate](https://github.com/apps/renovate)! - Remove unnecessary system theme references to reduce complexity for components that don't need the additional mapping layer.

- Updated dependencies [[`165a904`](https://github.com/adobe/spectrum-web-components/commit/165a904bd01fddea922fe87b181bbf41281f81f0), [`a4de4c7`](https://github.com/adobe/spectrum-web-components/commit/a4de4c76c38ae274535fc7df8ab32490a796485a), [`4e06533`](https://github.com/adobe/spectrum-web-components/commit/4e065332e0236757fc3a050e53747ce82ac40ed5), [`fa4be70`](https://github.com/adobe/spectrum-web-components/commit/fa4be70e9ab9dbeff26867edd3bdeb3f41c423e3), [`daeb11f`](https://github.com/adobe/spectrum-web-components/commit/daeb11f18792cf650518099fd29857139b6380b4), [`6c58f50`](https://github.com/adobe/spectrum-web-components/commit/6c58f50f7b1f5489c11e0d3484e3f4a9d576f1c8), [`fa4be70`](https://github.com/adobe/spectrum-web-components/commit/fa4be70e9ab9dbeff26867edd3bdeb3f41c423e3)]:
    - @spectrum-web-components/asset@1.5.0
    - @spectrum-web-components/divider@1.5.0
    - @spectrum-web-components/styles@1.5.0
    - @spectrum-web-components/checkbox@1.5.0
    - @spectrum-web-components/icons-workflow@1.5.0
    - @spectrum-web-components/base@1.5.0
    - @spectrum-web-components/shared@1.5.0

## 1.4.0

### Patch Changes

- Updated dependencies [[`3cca7ea`](https://github.com/adobe/spectrum-web-components/commit/3cca7eacf127c3fd759953db38a2b5a561bfb8dc)]:
    - @spectrum-web-components/styles@1.4.0
    - @spectrum-web-components/asset@1.4.0
    - @spectrum-web-components/checkbox@1.4.0
    - @spectrum-web-components/divider@1.4.0
    - @spectrum-web-components/icons-workflow@1.4.0
    - @spectrum-web-components/base@1.4.0
    - @spectrum-web-components/shared@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies [[`468314f`](https://github.com/adobe/spectrum-web-components/commit/468314f45cf5fedb2e9029da210a5886260abca9)]:
    - @spectrum-web-components/checkbox@1.3.0
    - @spectrum-web-components/asset@1.3.0
    - @spectrum-web-components/divider@1.3.0
    - @spectrum-web-components/icons-workflow@1.3.0
    - @spectrum-web-components/base@1.3.0
    - @spectrum-web-components/shared@1.3.0
    - @spectrum-web-components/styles@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

**Note:** Version bump only for package @spectrum-web-components/card

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/card

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/card

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

**Note:** Version bump only for package @spectrum-web-components/card

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

**Note:** Version bump only for package @spectrum-web-components/card

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

### Bug Fixes

- update deps graph, update link docs ([#3709](https://github.com/adobe/spectrum-web-components/issues/3709)) ([2deb284](https://github.com/adobe/spectrum-web-components/commit/2deb2847e6ad458c3cbaec02732fffde133e0c54))

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Features

- **card:** use core tokens ([9cccd26](https://github.com/adobe/spectrum-web-components/commit/9cccd26f00f688cbe1477dc7a9ce01542b179737))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/card

# 0.30.0 (2023-05-03)

### Bug Fixes

- add Grid pattern ([341f493](https://github.com/adobe/spectrum-web-components/commit/341f4932087487be47bde355d1b0894886ed44ad))
- add likeAnchor API to Card element ([5c338fb](https://github.com/adobe/spectrum-web-components/commit/5c338fbfc73d9d20c8f771e11114064cadeeb732))
- **card:** allow for preview or cover-photo ([2d2f42b](https://github.com/adobe/spectrum-web-components/commit/2d2f42bb075c805d9c308d268c5f99a3cb2d0490))
- **card:** correctly apply :focus-visible styling to variants ([d7c7539](https://github.com/adobe/spectrum-web-components/commit/d7c7539727d70f22243bd50bdaf8fbe0d0bbbb80))
- **card:** create no preview image variant of card instead of no imageless variant at all ([7b102b9](https://github.com/adobe/spectrum-web-components/commit/7b102b9dc8460ddd179829b9c80f9b0628abf733))
- **card:** do not transform subheadling text to uppercase ([4244390](https://github.com/adobe/spectrum-web-components/commit/4244390ed83b740c1879d7ee43ead31d520aaa93))
- **card:** include dependencies ([18beaf6](https://github.com/adobe/spectrum-web-components/commit/18beaf61c9af0aeb88b1801e821c1f1c5abb3d63))
- **card:** normalize sizing technique to align with future t-shirt size usage ([6f05b3b](https://github.com/adobe/spectrum-web-components/commit/6f05b3b7c88633b17cd44224af184c37c3d9c8bf))
- **card:** removed empty card from documentation/stories ([8322894](https://github.com/adobe/spectrum-web-components/commit/83228948550dd6fef2a06ddbdc0f9954d8971fac))
- **card:** stop event propogation on handleselectedchange ([0ef95e5](https://github.com/adobe/spectrum-web-components/commit/0ef95e5a933295d7484015273812c3e3374c57ff))
- **dialog:** normalize sizing technique to align with future t-shirt size usage ([da33797](https://github.com/adobe/spectrum-web-components/commit/da33797e724d0943a6abf059c96641a220182e5f))
- ensure that all paths to user change of selected trigger a change event ([2eee81e](https://github.com/adobe/spectrum-web-components/commit/2eee81e280b5c46c71ab09ea93ad1856b9e1ea5b))
- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716f2f787deb8d868a78bd28c8e62fe90e21))
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- match "pointerup" listeners with "pointercancel" for full coverage ([7f2ce92](https://github.com/adobe/spectrum-web-components/commit/7f2ce924ce03fb0881505e6f144184bd3d25355d))
- override and clear text-transform: uppercase ([dddce4b](https://github.com/adobe/spectrum-web-components/commit/dddce4bc438f8cf8df217b062c9681ec52587060))
- remove `<sp-menu>` usage where deprecated ([387db3b](https://github.com/adobe/spectrum-web-components/commit/387db3be95c98ab220e517fe12a4db7a2496fe5f))
- remove standard variant from image getter ([97e4713](https://github.com/adobe/spectrum-web-components/commit/97e47132bad276ef2b2989395622dc57d37efb7c))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- switch to heading/subheading instead of title ([d182a0f](https://github.com/adobe/spectrum-web-components/commit/d182a0f829b21296f07b50f37c8aecda2c0ed137))
- tests weren't fully updated ([22bf3b1](https://github.com/adobe/spectrum-web-components/commit/22bf3b14d304a9106525a05a8c0dc16834648356))
- these selectors didn't actually change ([a5ac275](https://github.com/adobe/spectrum-web-components/commit/a5ac275dfc9873ba65abf7a4d9631cc67fd65aa1))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- add screenshot regression testing to CI ([8205dfe](https://github.com/adobe/spectrum-web-components/commit/8205dfe33c725e13f74f411779c2ff3b6061a913))
- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- allow slotted title for card ([aaf7157](https://github.com/adobe/spectrum-web-components/commit/aaf7157de6070a49bcdcc591f62c85a56622acfb))
- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- **card:** update spectrum css input ([18b6dae](https://github.com/adobe/spectrum-web-components/commit/18b6dae1e89e0cf4dd854d569545c5a3046dbc9f))
- **card:** upgrade to Spectrum CSS v3.0.0 ([84cf1a9](https://github.com/adobe/spectrum-web-components/commit/84cf1a9758b1e357f18efac5763d17d6a4db0578))
- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
- sets action-menu quiet to false by default, fixes [#3040](https://github.com/adobe/spectrum-web-components/issues/3040) ([8414cab](https://github.com/adobe/spectrum-web-components/commit/8414cab2ef916be40be9f624f485fb02184eec2b))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- **styles:** vend CSS literal versions of the typography system ([6406c96](https://github.com/adobe/spectrum-web-components/commit/6406c96377557a88ad7756147e6e5777f5d1f746))
- update card and tabs to latest spectrum-css ([55b8d67](https://github.com/adobe/spectrum-web-components/commit/55b8d67c03349183c3aebb52bbc54f5c58b3fdb4))
- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
- use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc77960de8e57dd9c49bb7669df689f0ebaa))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/39188887afad9bec52ef48d4e22596f9b757a9fe))
- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))
- use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0accd643c2f35cbf1ba809b54f52c25628d))

### Reverts

- Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))

### BREAKING CHANGES

- renamed title/subtitle attributes and slot.

## [0.14.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.14.1...@spectrum-web-components/card@0.14.2) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.14.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.14.0...@spectrum-web-components/card@0.14.1) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.14.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.9...@spectrum-web-components/card@0.14.0) (2023-03-22)

### Features

- sets action-menu quiet to false by default, fixes [#3040](https://github.com/adobe/spectrum-web-components/issues/3040) ([8414cab](https://github.com/adobe/spectrum-web-components/commit/8414cab2ef916be40be9f624f485fb02184eec2b))

## [0.13.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.8...@spectrum-web-components/card@0.13.9) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.13.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.7...@spectrum-web-components/card@0.13.8) (2023-02-23)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.13.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.6...@spectrum-web-components/card@0.13.7) (2023-02-08)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.13.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.5...@spectrum-web-components/card@0.13.6) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.13.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.4...@spectrum-web-components/card@0.13.5) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.13.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.3...@spectrum-web-components/card@0.13.4) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.13.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.2...@spectrum-web-components/card@0.13.3) (2022-11-21)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.13.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.1...@spectrum-web-components/card@0.13.2) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.13.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.13.0...@spectrum-web-components/card@0.13.1) (2022-10-28)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.12.3...@spectrum-web-components/card@0.13.0) (2022-10-17)

### Features

- update card and tabs to latest spectrum-css ([55b8d67](https://github.com/adobe/spectrum-web-components/commit/55b8d67c03349183c3aebb52bbc54f5c58b3fdb4))

## [0.12.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.12.2...@spectrum-web-components/card@0.12.3) (2022-10-10)

### Bug Fixes

- match "pointerup" listeners with "pointercancel" for full coverage ([7f2ce92](https://github.com/adobe/spectrum-web-components/commit/7f2ce924ce03fb0881505e6f144184bd3d25355d))

## [0.12.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.12.1...@spectrum-web-components/card@0.12.2) (2022-09-14)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.12.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.12.0...@spectrum-web-components/card@0.12.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.11.0...@spectrum-web-components/card@0.12.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.13...@spectrum-web-components/card@0.11.0) (2022-08-04)

### Features

- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))

## [0.10.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.12...@spectrum-web-components/card@0.10.13) (2022-07-18)

### Bug Fixes

- **card:** stop event propogation on handleselectedchange ([0ef95e5](https://github.com/adobe/spectrum-web-components/commit/0ef95e5a933295d7484015273812c3e3374c57ff))

## [0.10.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.11...@spectrum-web-components/card@0.10.12) (2022-06-29)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.10...@spectrum-web-components/card@0.10.11) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.9...@spectrum-web-components/card@0.10.10) (2022-05-27)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.8...@spectrum-web-components/card@0.10.9) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.7...@spectrum-web-components/card@0.10.8) (2022-04-21)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.6...@spectrum-web-components/card@0.10.7) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.5...@spectrum-web-components/card@0.10.6) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.4...@spectrum-web-components/card@0.10.5) (2022-03-04)

### Bug Fixes

- add Grid pattern ([341f493](https://github.com/adobe/spectrum-web-components/commit/341f4932087487be47bde355d1b0894886ed44ad))

## [0.10.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.3...@spectrum-web-components/card@0.10.4) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.2...@spectrum-web-components/card@0.10.3) (2022-01-26)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.1...@spectrum-web-components/card@0.10.2) (2022-01-07)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.10.0...@spectrum-web-components/card@0.10.1) (2021-12-13)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.9.1...@spectrum-web-components/card@0.10.0) (2021-11-08)

### Features

- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.9.0...@spectrum-web-components/card@0.9.1) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.18...@spectrum-web-components/card@0.9.0) (2021-11-02)

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.8.18](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.17...@spectrum-web-components/card@0.8.18) (2021-10-12)

### Bug Fixes

- add likeAnchor API to Card element ([5c338fb](https://github.com/adobe/spectrum-web-components/commit/5c338fbfc73d9d20c8f771e11114064cadeeb732))

## [0.8.17](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.16...@spectrum-web-components/card@0.8.17) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.16](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.15...@spectrum-web-components/card@0.8.16) (2021-09-13)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.14...@spectrum-web-components/card@0.8.15) (2021-08-24)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.13...@spectrum-web-components/card@0.8.14) (2021-08-17)

### Bug Fixes

- **card:** normalize sizing technique to align with future t-shirt size usage ([6f05b3b](https://github.com/adobe/spectrum-web-components/commit/6f05b3b7c88633b17cd44224af184c37c3d9c8bf))
- **dialog:** normalize sizing technique to align with future t-shirt size usage ([da33797](https://github.com/adobe/spectrum-web-components/commit/da33797e724d0943a6abf059c96641a220182e5f))

## [0.8.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.12...@spectrum-web-components/card@0.8.13) (2021-08-03)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.11...@spectrum-web-components/card@0.8.12) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.10...@spectrum-web-components/card@0.8.11) (2021-07-01)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.9...@spectrum-web-components/card@0.8.10) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.8...@spectrum-web-components/card@0.8.9) (2021-06-07)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.7...@spectrum-web-components/card@0.8.8) (2021-05-24)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.6...@spectrum-web-components/card@0.8.7) (2021-05-12)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.5...@spectrum-web-components/card@0.8.6) (2021-04-15)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.4...@spectrum-web-components/card@0.8.5) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.3...@spectrum-web-components/card@0.8.4) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.2...@spectrum-web-components/card@0.8.3) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.1...@spectrum-web-components/card@0.8.2) (2021-03-22)

### Bug Fixes

- remove `<sp-menu>` usage where deprecated ([387db3b](https://github.com/adobe/spectrum-web-components/commit/387db3be95c98ab220e517fe12a4db7a2496fe5f))

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.8.0...@spectrum-web-components/card@0.8.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.7.3...@spectrum-web-components/card@0.8.0) (2021-03-04)

### Features

- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.7.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.7.2...@spectrum-web-components/card@0.7.3) (2021-02-11)

### Bug Fixes

- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

## [0.7.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.7.1...@spectrum-web-components/card@0.7.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.7.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.7.0...@spectrum-web-components/card@0.7.1) (2021-01-28)

### Bug Fixes

- **card:** create no preview image variant of card instead of no imageless variant at all ([7b102b9](https://github.com/adobe/spectrum-web-components/commit/7b102b9dc8460ddd179829b9c80f9b0628abf733))
- remove standard variant from image getter ([97e4713](https://github.com/adobe/spectrum-web-components/commit/97e47132bad276ef2b2989395622dc57d37efb7c))
- **card:** allow for preview or cover-photo ([2d2f42b](https://github.com/adobe/spectrum-web-components/commit/2d2f42bb075c805d9c308d268c5f99a3cb2d0490))
- **card:** removed empty card from documentation/stories ([8322894](https://github.com/adobe/spectrum-web-components/commit/83228948550dd6fef2a06ddbdc0f9954d8971fac))

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@1.0.0...@spectrum-web-components/card@0.7.0) (2021-01-21)

### Bug Fixes

- ensure that all paths to user change of selected trigger a change event ([2eee81e](https://github.com/adobe/spectrum-web-components/commit/2eee81e280b5c46c71ab09ea93ad1856b9e1ea5b))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- override and clear text-transform: uppercase ([dddce4b](https://github.com/adobe/spectrum-web-components/commit/dddce4bc438f8cf8df217b062c9681ec52587060))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- **card:** do not transform subheadling text to uppercase ([4244390](https://github.com/adobe/spectrum-web-components/commit/4244390ed83b740c1879d7ee43ead31d520aaa93))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- **card:** update spectrum css input ([18b6dae](https://github.com/adobe/spectrum-web-components/commit/18b6dae1e89e0cf4dd854d569545c5a3046dbc9f))
- **styles:** vend CSS literal versions of the typography system ([6406c96](https://github.com/adobe/spectrum-web-components/commit/6406c96377557a88ad7756147e6e5777f5d1f746))

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.5.4...@spectrum-web-components/card@0.6.0) (2021-01-13)

### Bug Fixes

- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- override and clear text-transform: uppercase ([dddce4b](https://github.com/adobe/spectrum-web-components/commit/dddce4bc438f8cf8df217b062c9681ec52587060))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- switch to heading/subheading instead of title ([d182a0f](https://github.com/adobe/spectrum-web-components/commit/d182a0f829b21296f07b50f37c8aecda2c0ed137))
- tests weren't fully updated ([22bf3b1](https://github.com/adobe/spectrum-web-components/commit/22bf3b14d304a9106525a05a8c0dc16834648356))
- these selectors didn't actually change ([a5ac275](https://github.com/adobe/spectrum-web-components/commit/a5ac275dfc9873ba65abf7a4d9631cc67fd65aa1))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- **card:** do not transform subheadling text to uppercase ([4244390](https://github.com/adobe/spectrum-web-components/commit/4244390ed83b740c1879d7ee43ead31d520aaa93))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- **card:** update spectrum css input ([18b6dae](https://github.com/adobe/spectrum-web-components/commit/18b6dae1e89e0cf4dd854d569545c5a3046dbc9f))
- **styles:** vend CSS literal versions of the typography system ([6406c96](https://github.com/adobe/spectrum-web-components/commit/6406c96377557a88ad7756147e6e5777f5d1f746))

### BREAKING CHANGES

- renamed title/subtitle attributes and slot.

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.5.4...@spectrum-web-components/card@1.0.0) (2020-11-20)

### Bug Fixes

- switch to heading/subheading instead of title ([d182a0f](https://github.com/adobe/spectrum-web-components/commit/d182a0f829b21296f07b50f37c8aecda2c0ed137))
- tests weren't fully updated ([22bf3b1](https://github.com/adobe/spectrum-web-components/commit/22bf3b14d304a9106525a05a8c0dc16834648356))
- these selectors didn't actually change ([a5ac275](https://github.com/adobe/spectrum-web-components/commit/a5ac275dfc9873ba65abf7a4d9631cc67fd65aa1))

### BREAKING CHANGES

- renamed title/subtitle attributes and slot.

## [0.5.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.5.3...@spectrum-web-components/card@0.5.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.5.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.5.2...@spectrum-web-components/card@0.5.3) (2020-10-12)

### Bug Fixes

- **card:** include dependencies ([18beaf6](https://github.com/adobe/spectrum-web-components/commit/18beaf61c9af0aeb88b1801e821c1f1c5abb3d63))
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.5.1...@spectrum-web-components/card@0.5.2) (2020-09-25)

### Bug Fixes

- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.5.0...@spectrum-web-components/card@0.5.1) (2020-09-14)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.4.3...@spectrum-web-components/card@0.5.0) (2020-08-31)

### Features

- **card:** upgrade to Spectrum CSS v3.0.0 ([84cf1a9](https://github.com/adobe/spectrum-web-components/commit/84cf1a9758b1e357f18efac5763d17d6a4db0578))

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.4.2...@spectrum-web-components/card@0.4.3) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.4.1...@spectrum-web-components/card@0.4.2) (2020-07-27)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.4.0...@spectrum-web-components/card@0.4.1) (2020-07-22)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.3.5...@spectrum-web-components/card@0.4.0) (2020-07-17)

### Features

- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.3.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.3.4...@spectrum-web-components/card@0.3.5) (2020-06-08)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.3.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.3.3...@spectrum-web-components/card@0.3.4) (2020-05-08)

### Bug Fixes

- **card:** correctly apply :focus-visible styling to variants ([d7c7539](https://github.com/adobe/spectrum-web-components/commit/d7c7539727d70f22243bd50bdaf8fbe0d0bbbb80))

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.3.2...@spectrum-web-components/card@0.3.3) (2020-04-16)

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.3.1...@spectrum-web-components/card@0.3.2) (2020-04-07)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.3.0...@spectrum-web-components/card@0.3.1) (2020-03-11)

**Note:** Version bump only for package @spectrum-web-components/card

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.2.3...@spectrum-web-components/card@0.3.0) (2020-02-05)

### Features

- allow slotted title for card ([aaf7157](https://github.com/adobe/spectrum-web-components/commit/aaf7157))

## [0.2.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.2.2...@spectrum-web-components/card@0.2.3) (2020-01-30)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.2.1...@spectrum-web-components/card@0.2.2) (2020-01-06)

**Note:** Version bump only for package @spectrum-web-components/card

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.2.0...@spectrum-web-components/card@0.2.1) (2019-11-27)

### Bug Fixes

- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.1.4...@spectrum-web-components/card@0.2.0) (2019-11-19)

### Features

- add screenshot regression testing to CI ([8205dfe](https://github.com/adobe/spectrum-web-components/commit/8205dfe))
- use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc7))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/3918888))

## [0.1.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/card@0.1.3...@spectrum-web-components/card@0.1.4) (2019-10-14)

### Performance Improvements

- use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0a))

## 0.1.3 (2019-10-03)

**Note:** Version bump only for package @spectrum-web-components/card
