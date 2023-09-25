# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

### Bug Fixes

-   **color-wheel:** reorient reactively to "dir" changes ([#3319](https://github.com/adobe/spectrum-web-components/issues/3319)) ([6a9dcec](https://github.com/adobe/spectrum-web-components/commit/6a9dcecbd1cff5dc0ea42c9288d1898072301045))

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Bug Fixes

-   **color-area,color-slider:** color-area labeling, RTL support, vertical slider orientation([#3315](https://github.com/adobe/spectrum-web-components/issues/3315)) ([ca2acda](https://github.com/adobe/spectrum-web-components/commit/ca2acdafe004cb962c00ebb7f79c5b6061dc6843)), closes [#3313](https://github.com/adobe/spectrum-web-components/issues/3313)
-   **color-slider,color-wheel:** fix focused state [#3278](https://github.com/adobe/spectrum-web-components/issues/3278) ([96b83f7](https://github.com/adobe/spectrum-web-components/commit/96b83f7eb6ead1de2b30f1483478a2e5d6195349))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# 0.30.0 (2023-05-03)

### Bug Fixes

-   abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))
-   address westbrooks comments ([634af60](https://github.com/adobe/spectrum-web-components/commit/634af60f88b0c998b30697dfbd13c9c466ed539d))
-   **color-wheel:** use correct focus events in test ([f6f35ec](https://github.com/adobe/spectrum-web-components/commit/f6f35ec5359c717331200b8d13dc58d3c4b3ff7a))
-   ensure color wheel in not opinionated about saturation and lightness ([8e0fd9c](https://github.com/adobe/spectrum-web-components/commit/8e0fd9ca4b341d497b1fd6092ba88e321ee7044a))
-   ensure streamingListener ends even if pointercancel not fired ([74105f2](https://github.com/adobe/spectrum-web-components/commit/74105f23d30f549f18040cc7d05b99c9b746871a))
-   expand support for maintaining hue and saturation across customization ([fe18944](https://github.com/adobe/spectrum-web-components/commit/fe18944da268bd16fbb3e643fa4695d7e2d0e5d7))
-   include touch-action rule for draggable content ([3f507e6](https://github.com/adobe/spectrum-web-components/commit/3f507e6dba718ae2b7415454eba859a9790e43e7))
-   key interaction handling no longer prevents "tab" presses ([b542ce8](https://github.com/adobe/spectrum-web-components/commit/b542ce8f98a8a26badfa856f2e09ebda16dbcbb1))
-   leverage Color Controller to unify color interface across packages ([fb71690](https://github.com/adobe/spectrum-web-components/commit/fb7169066fd4f15aee594c463cc4cdbf7f550a5e))
-   manage "focused" across more contexts ([9273c15](https://github.com/adobe/spectrum-web-components/commit/9273c15144323bd8d62626b4e35b1975bffabf2a))
-   normalize focus passing during and after pointer events ([357931b](https://github.com/adobe/spectrum-web-components/commit/357931b6eb803759925b10b629d21878e8249678))
-   prevent tabindex=-1 elements from placing focus on their host ([1ac1293](https://github.com/adobe/spectrum-web-components/commit/1ac12931771c6d5fdbc99f5d214702ed644cb81a))
-   remove right click value setting ([a44968d](https://github.com/adobe/spectrum-web-components/commit/a44968d09120ad9b54915438fb5a134f306fdab2))
-   update colour slider ([9acda67](https://github.com/adobe/spectrum-web-components/commit/9acda673d98e39a9928166806926689020dc0577))
-   use hue normalized color in handle and allow focus ([f9e1fa2](https://github.com/adobe/spectrum-web-components/commit/f9e1fa24afd091334341610a49331fc0ec5f8573))

### Features

-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
-   **color-wheel:** add color-wheel pattern ([8b2a56d](https://github.com/adobe/spectrum-web-components/commit/8b2a56de9765cca69f9b84a6a32832971f3814ca))
-   **color-wheel:** use core tokens ([57159a2](https://github.com/adobe/spectrum-web-components/commit/57159a2443b776b78128bfd9a83b2aa3de1a8342))
-   debug colour elements for a11y ([7008f7c](https://github.com/adobe/spectrum-web-components/commit/7008f7c0c0b719f6978a8f158bfea4434d1580af))
-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
-   shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.5.1...@spectrum-web-components/color-wheel@0.5.2) (2023-04-24)

### Bug Fixes

-   ensure streamingListener ends even if pointercancel not fired ([74105f2](https://github.com/adobe/spectrum-web-components/commit/74105f23d30f549f18040cc7d05b99c9b746871a))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.5.0...@spectrum-web-components/color-wheel@0.5.1) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.9...@spectrum-web-components/color-wheel@0.5.0) (2023-03-22)

### Features

-   **color-wheel:** use core tokens ([57159a2](https://github.com/adobe/spectrum-web-components/commit/57159a2443b776b78128bfd9a83b2aa3de1a8342))

## [0.4.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.8...@spectrum-web-components/color-wheel@0.4.9) (2023-02-08)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.4.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.7...@spectrum-web-components/color-wheel@0.4.8) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.4.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.6...@spectrum-web-components/color-wheel@0.4.7) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.4.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.5...@spectrum-web-components/color-wheel@0.4.6) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.4.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.4...@spectrum-web-components/color-wheel@0.4.5) (2022-11-21)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.3...@spectrum-web-components/color-wheel@0.4.4) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.2...@spectrum-web-components/color-wheel@0.4.3) (2022-10-28)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.1...@spectrum-web-components/color-wheel@0.4.2) (2022-10-17)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.4.0...@spectrum-web-components/color-wheel@0.4.1) (2022-10-10)

### Bug Fixes

-   leverage Color Controller to unify color interface across packages ([fb71690](https://github.com/adobe/spectrum-web-components/commit/fb7169066fd4f15aee594c463cc4cdbf7f550a5e))

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.13...@spectrum-web-components/color-wheel@0.4.0) (2022-08-09)

### Features

-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

## [0.3.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.12...@spectrum-web-components/color-wheel@0.3.13) (2022-08-04)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.11...@spectrum-web-components/color-wheel@0.3.12) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.10...@spectrum-web-components/color-wheel@0.3.11) (2022-06-29)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.9...@spectrum-web-components/color-wheel@0.3.10) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.8...@spectrum-web-components/color-wheel@0.3.9) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.7...@spectrum-web-components/color-wheel@0.3.8) (2022-04-21)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.6...@spectrum-web-components/color-wheel@0.3.7) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.5...@spectrum-web-components/color-wheel@0.3.6) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.4...@spectrum-web-components/color-wheel@0.3.5) (2022-03-04)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.3...@spectrum-web-components/color-wheel@0.3.4) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.2...@spectrum-web-components/color-wheel@0.3.3) (2022-01-26)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.1...@spectrum-web-components/color-wheel@0.3.2) (2022-01-07)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.3.0...@spectrum-web-components/color-wheel@0.3.1) (2021-12-13)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.2.1...@spectrum-web-components/color-wheel@0.3.0) (2021-11-08)

### Features

-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.2.0...@spectrum-web-components/color-wheel@0.2.1) (2021-11-08)

### Bug Fixes

-   abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.13...@spectrum-web-components/color-wheel@0.2.0) (2021-11-02)

### Features

-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.1.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.12...@spectrum-web-components/color-wheel@0.1.13) (2021-10-12)

### Bug Fixes

-   **color-wheel:** use correct focus events in test ([f6f35ec](https://github.com/adobe/spectrum-web-components/commit/f6f35ec5359c717331200b8d13dc58d3c4b3ff7a))

## [0.1.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.11...@spectrum-web-components/color-wheel@0.1.12) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.1.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.10...@spectrum-web-components/color-wheel@0.1.11) (2021-09-13)

### Bug Fixes

-   manage "focused" across more contexts ([9273c15](https://github.com/adobe/spectrum-web-components/commit/9273c15144323bd8d62626b4e35b1975bffabf2a))

## [0.1.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.9...@spectrum-web-components/color-wheel@0.1.10) (2021-08-24)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.1.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.8...@spectrum-web-components/color-wheel@0.1.9) (2021-08-17)

### Bug Fixes

-   key interaction handling no longer prevents "tab" presses ([b542ce8](https://github.com/adobe/spectrum-web-components/commit/b542ce8f98a8a26badfa856f2e09ebda16dbcbb1))

## [0.1.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.7...@spectrum-web-components/color-wheel@0.1.8) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.1.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.6...@spectrum-web-components/color-wheel@0.1.7) (2021-07-01)

### Bug Fixes

-   expand support for maintaining hue and saturation across customization ([fe18944](https://github.com/adobe/spectrum-web-components/commit/fe18944da268bd16fbb3e643fa4695d7e2d0e5d7))
-   normalize focus passing during and after pointer events ([357931b](https://github.com/adobe/spectrum-web-components/commit/357931b6eb803759925b10b629d21878e8249678))

## [0.1.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.5...@spectrum-web-components/color-wheel@0.1.6) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.1.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.4...@spectrum-web-components/color-wheel@0.1.5) (2021-05-24)

### Bug Fixes

-   prevent tabindex=-1 elements from placing focus on their host ([1ac1293](https://github.com/adobe/spectrum-web-components/commit/1ac12931771c6d5fdbc99f5d214702ed644cb81a))

## [0.1.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.3...@spectrum-web-components/color-wheel@0.1.4) (2021-05-12)

### Bug Fixes

-   include touch-action rule for draggable content ([3f507e6](https://github.com/adobe/spectrum-web-components/commit/3f507e6dba718ae2b7415454eba859a9790e43e7))

## [0.1.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.2...@spectrum-web-components/color-wheel@0.1.3) (2021-04-09)

### Bug Fixes

-   ensure color wheel in not opinionated about saturation and lightness ([8e0fd9c](https://github.com/adobe/spectrum-web-components/commit/8e0fd9ca4b341d497b1fd6092ba88e321ee7044a))
-   use hue normalized color in handle and allow focus ([f9e1fa2](https://github.com/adobe/spectrum-web-components/commit/f9e1fa24afd091334341610a49331fc0ec5f8573))

## [0.1.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.1...@spectrum-web-components/color-wheel@0.1.2) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/color-wheel

## [0.1.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/color-wheel@0.1.0...@spectrum-web-components/color-wheel@0.1.1) (2021-03-22)

### Bug Fixes

-   remove right click value setting ([a44968d](https://github.com/adobe/spectrum-web-components/commit/a44968d09120ad9b54915438fb5a134f306fdab2))

# 0.1.0 (2021-03-05)

### Bug Fixes

-   address westbrooks comments ([634af60](https://github.com/adobe/spectrum-web-components/commit/634af60f88b0c998b30697dfbd13c9c466ed539d))
-   update colour slider ([9acda67](https://github.com/adobe/spectrum-web-components/commit/9acda673d98e39a9928166806926689020dc0577))

### Features

-   debug colour elements for a11y ([7008f7c](https://github.com/adobe/spectrum-web-components/commit/7008f7c0c0b719f6978a8f158bfea4434d1580af))
-   **color-wheel:** add color-wheel pattern ([8b2a56d](https://github.com/adobe/spectrum-web-components/commit/8b2a56de9765cca69f9b84a6a32832971f3814ca))
