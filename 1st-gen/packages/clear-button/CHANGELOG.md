# Change Log

## 1.10.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.10.0

## 1.9.1

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.9.1

## 1.9.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.9.0

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

- Updated dependencies []:
    - @spectrum-web-components/base@1.8.0

## 1.7.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.7.0

## 1.6.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.6.0

## 1.5.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.5.0

## 1.4.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

### Bug Fixes

- **search:** clear button ui in express ([#4910](https://github.com/adobe/spectrum-web-components/issues/4910)) ([f88e1e2](https://github.com/adobe/spectrum-web-components/commit/f88e1e2c03ed74f8d3f7924d395a34168afd244c))

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Features

- **clear-button:** migrate to core tokens ([64be98a](https://github.com/adobe/spectrum-web-components/commit/64be98ae6cae92c1a8668a8a8b8af58337b4ce0f))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# 0.30.0 (2023-05-03)

### Bug Fixes

- prevent default hoisting of custom pseudo elements ([7f66346](https://github.com/adobe/spectrum-web-components/commit/7f6634665fb9fdc530bd3009246e62c24cac1904))

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))

## [0.2.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.2.8...@spectrum-web-components/clear-button@0.2.9) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.2.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.2.7...@spectrum-web-components/clear-button@0.2.8) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.2.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.2.6...@spectrum-web-components/clear-button@0.2.7) (2023-03-22)

### Bug Fixes

- prevent default hoisting of custom pseudo elements ([7f66346](https://github.com/adobe/spectrum-web-components/commit/7f6634665fb9fdc530bd3009246e62c24cac1904))

## [0.2.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.2.5...@spectrum-web-components/clear-button@0.2.6) (2023-02-08)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.2.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.2.4...@spectrum-web-components/clear-button@0.2.5) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.2.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.2.3...@spectrum-web-components/clear-button@0.2.4) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.2.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.2.2...@spectrum-web-components/clear-button@0.2.3) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.2.1...@spectrum-web-components/clear-button@0.2.2) (2022-11-21)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.2.0...@spectrum-web-components/clear-button@0.2.1) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.1.8...@spectrum-web-components/clear-button@0.2.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

## [0.1.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.1.7...@spectrum-web-components/clear-button@0.1.8) (2022-08-04)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.1.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.1.6...@spectrum-web-components/clear-button@0.1.7) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.1.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.1.5...@spectrum-web-components/clear-button@0.1.6) (2022-06-29)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.1.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.1.4...@spectrum-web-components/clear-button@0.1.5) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.1.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.1.3...@spectrum-web-components/clear-button@0.1.4) (2022-05-27)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.1.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.1.2...@spectrum-web-components/clear-button@0.1.3) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.1.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.1.1...@spectrum-web-components/clear-button@0.1.2) (2022-04-21)

**Note:** Version bump only for package @spectrum-web-components/clear-button

## [0.1.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/clear-button@0.1.0...@spectrum-web-components/clear-button@0.1.1) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/clear-button

# 0.1.0 (2022-03-04)

### Features

- leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))
