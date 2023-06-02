# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

### Bug Fixes

-   **action-group:** update application/management of "role" on group and buttons ([533873b](https://github.com/adobe/spectrum-web-components/commit/533873be83da30e032fbb89a993f5c4e0c1c8086)), closes [#3221](https://github.com/adobe/spectrum-web-components/issues/3221) [#3221](https://github.com/adobe/spectrum-web-components/issues/3221) [#3221](https://github.com/adobe/spectrum-web-components/issues/3221)

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/action-group

# 0.30.0 (2023-05-03)

### Bug Fixes

-   **action-group:** add custom focus() method and use sendKeys for correct "Enter" key testing ([638aa35](https://github.com/adobe/spectrum-web-components/commit/638aa3551f359951d926e2b7c9773aafab1402f0))
-   **action-group:** allow direct setting aria-label on first update ([84f7fdd](https://github.com/adobe/spectrum-web-components/commit/84f7fdd17145208055b685b6bdf3a6d2e986f21b))
-   **action-group:** allow for initial button being "disabled" ([a1e3939](https://github.com/adobe/spectrum-web-components/commit/a1e393940daf5d0bb7783511d7b5255e24611033))
-   **action-group:** allow quiet and emphasized attributes to be passed to slotted action buttons ([aadfddb](https://github.com/adobe/spectrum-web-components/commit/aadfddb8e92136e78c577fb70e0f9c2c1ee176b9))
-   **action-group:** pass styles to nested children, too ([12f1be3](https://github.com/adobe/spectrum-web-components/commit/12f1be3cfd932b10e4b9aa18f8a89aeed6a09df4))
-   **action-group:** support ActionButtons that are not direct children ([1d4efd5](https://github.com/adobe/spectrum-web-components/commit/1d4efd58386ebfb940763911cb90878cafcf6938))
-   **action-group:** use the correct role for buttons when not selects ([0aae8ed](https://github.com/adobe/spectrum-web-components/commit/0aae8edcf582858c6dc0168942383ff9116bb319))
-   correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
-   ensure that "selected" can be set more than once from the outside ([5f1996c](https://github.com/adobe/spectrum-web-components/commit/5f1996cbb5e371719814c47c236a8fc1e2ef78ad))
-   include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
-   **textfield:** respect type=text|url|tel|email|password ([1b7a59a](https://github.com/adobe/spectrum-web-components/commit/1b7a59a208ce00a62c23c80b75bacabf73c3e6ea))
-   update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
-   update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
-   update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
-   use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
-   use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

-   **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
-   **action-group:** add action-group pattern ([d2de766](https://github.com/adobe/spectrum-web-components/commit/d2de766efde6dfbaa1cd604f99ae3128b4fc81b5))
-   **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
-   **action-group:** update spectrum css input ([9840b19](https://github.com/adobe/spectrum-web-components/commit/9840b19576510d417387194846fb3aa6e4228759))
-   **action-group:** use core tokens ([73f3b51](https://github.com/adobe/spectrum-web-components/commit/73f3b51becf3c20c387bdf00b4cd54b8839a12da))
-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
-   **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
-   **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
-   leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))
-   modified .selected to make <sp-action-group> a controllable component ([#2006](https://github.com/adobe/spectrum-web-components/issues/2006)) ([4c69b25](https://github.com/adobe/spectrum-web-components/commit/4c69b251fdf09fe898ce98482881e647b857205d))
-   shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
-   support Spectrum Token consumption and update Action Button to use them ([743ab16](https://github.com/adobe/spectrum-web-components/commit/743ab16d8f05335d320440effbdcb8cd4bffc97d))
-   **theme:** filter css variables ([1761f3a](https://github.com/adobe/spectrum-web-components/commit/1761f3af1594e3c395dee98e7e9b1d616a74a1a1))
-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
-   use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

-   reorganize inheritance and composition in Menu Items ([d96ccb6](https://github.com/adobe/spectrum-web-components/commit/d96ccb621833277444d69535126c3669343c2eaf))

## [0.12.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.11...@spectrum-web-components/action-group@0.12.12) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.10...@spectrum-web-components/action-group@0.12.11) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.9...@spectrum-web-components/action-group@0.12.10) (2023-03-22)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.8...@spectrum-web-components/action-group@0.12.9) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.7...@spectrum-web-components/action-group@0.12.8) (2023-02-13)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.6...@spectrum-web-components/action-group@0.12.7) (2023-02-08)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.5...@spectrum-web-components/action-group@0.12.6) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.4...@spectrum-web-components/action-group@0.12.5) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.3...@spectrum-web-components/action-group@0.12.4) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.2...@spectrum-web-components/action-group@0.12.3) (2022-11-21)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.1...@spectrum-web-components/action-group@0.12.2) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.12.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.12.0...@spectrum-web-components/action-group@0.12.1) (2022-10-28)

**Note:** Version bump only for package @spectrum-web-components/action-group

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.11.3...@spectrum-web-components/action-group@0.12.0) (2022-10-17)

### Features

-   **action-group:** use core tokens ([73f3b51](https://github.com/adobe/spectrum-web-components/commit/73f3b51becf3c20c387bdf00b4cd54b8839a12da))

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.11.2...@spectrum-web-components/action-group@0.11.3) (2022-10-10)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.11.1...@spectrum-web-components/action-group@0.11.2) (2022-09-14)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.11.0...@spectrum-web-components/action-group@0.11.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/action-group

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.10.1...@spectrum-web-components/action-group@0.11.0) (2022-08-09)

### Features

-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.10.0...@spectrum-web-components/action-group@0.10.1) (2022-08-04)

**Note:** Version bump only for package @spectrum-web-components/action-group

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.9.0...@spectrum-web-components/action-group@0.10.0) (2022-07-18)

### Features

-   support Spectrum Token consumption and update Action Button to use them ([743ab16](https://github.com/adobe/spectrum-web-components/commit/743ab16d8f05335d320440effbdcb8cd4bffc97d))

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.8.6...@spectrum-web-components/action-group@0.9.0) (2022-06-29)

### Features

-   **theme:** filter css variables ([1761f3a](https://github.com/adobe/spectrum-web-components/commit/1761f3af1594e3c395dee98e7e9b1d616a74a1a1))

## [0.8.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.8.5...@spectrum-web-components/action-group@0.8.6) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.8.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.8.4...@spectrum-web-components/action-group@0.8.5) (2022-05-27)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.8.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.8.3...@spectrum-web-components/action-group@0.8.4) (2022-05-12)

### Bug Fixes

-   ensure that "selected" can be set more than once from the outside ([5f1996c](https://github.com/adobe/spectrum-web-components/commit/5f1996cbb5e371719814c47c236a8fc1e2ef78ad))

## [0.8.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.8.2...@spectrum-web-components/action-group@0.8.3) (2022-04-21)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.8.1...@spectrum-web-components/action-group@0.8.2) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.8.0...@spectrum-web-components/action-group@0.8.1) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/action-group

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.7.2...@spectrum-web-components/action-group@0.8.0) (2022-03-04)

### Features

-   leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))

## [0.7.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.7.1...@spectrum-web-components/action-group@0.7.2) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.7.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.7.0...@spectrum-web-components/action-group@0.7.1) (2022-02-02)

**Note:** Version bump only for package @spectrum-web-components/action-group

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.6.2...@spectrum-web-components/action-group@0.7.0) (2022-01-26)

### Features

-   modified .selected to make <sp-action-group> a controllable component ([#2006](https://github.com/adobe/spectrum-web-components/issues/2006)) ([4c69b25](https://github.com/adobe/spectrum-web-components/commit/4c69b251fdf09fe898ce98482881e647b857205d))

## [0.6.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.6.1...@spectrum-web-components/action-group@0.6.2) (2022-01-07)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.6.0...@spectrum-web-components/action-group@0.6.1) (2021-12-13)

**Note:** Version bump only for package @spectrum-web-components/action-group

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.5.1...@spectrum-web-components/action-group@0.6.0) (2021-11-08)

### Features

-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.5.0...@spectrum-web-components/action-group@0.5.1) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/action-group

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.18...@spectrum-web-components/action-group@0.5.0) (2021-11-02)

### Bug Fixes

-   **textfield:** respect type=text|url|tel|email|password ([1b7a59a](https://github.com/adobe/spectrum-web-components/commit/1b7a59a208ce00a62c23c80b75bacabf73c3e6ea))

### Features

-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.4.18](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.17...@spectrum-web-components/action-group@0.4.18) (2021-10-12)

### Bug Fixes

-   **action-group:** allow quiet and emphasized attributes to be passed to slotted action buttons ([aadfddb](https://github.com/adobe/spectrum-web-components/commit/aadfddb8e92136e78c577fb70e0f9c2c1ee176b9))

## [0.4.17](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.16...@spectrum-web-components/action-group@0.4.17) (2021-10-05)

### Bug Fixes

-   **action-group:** add custom focus() method and use sendKeys for correct "Enter" key testing ([638aa35](https://github.com/adobe/spectrum-web-components/commit/638aa3551f359951d926e2b7c9773aafab1402f0))

## [0.4.16](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.15...@spectrum-web-components/action-group@0.4.16) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.14...@spectrum-web-components/action-group@0.4.15) (2021-09-13)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.13...@spectrum-web-components/action-group@0.4.14) (2021-08-24)

### Bug Fixes

-   correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

### Performance Improvements

-   reorganize inheritance and composition in Menu Items ([d96ccb6](https://github.com/adobe/spectrum-web-components/commit/d96ccb621833277444d69535126c3669343c2eaf))

## [0.4.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.12...@spectrum-web-components/action-group@0.4.13) (2021-08-03)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.11...@spectrum-web-components/action-group@0.4.12) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.10...@spectrum-web-components/action-group@0.4.11) (2021-07-01)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.9...@spectrum-web-components/action-group@0.4.10) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.8...@spectrum-web-components/action-group@0.4.9) (2021-06-07)

### Bug Fixes

-   **action-group:** pass styles to nested children, too ([12f1be3](https://github.com/adobe/spectrum-web-components/commit/12f1be3cfd932b10e4b9aa18f8a89aeed6a09df4))

## [0.4.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.7...@spectrum-web-components/action-group@0.4.8) (2021-05-24)

### Bug Fixes

-   **action-group:** allow direct setting aria-label on first update ([84f7fdd](https://github.com/adobe/spectrum-web-components/commit/84f7fdd17145208055b685b6bdf3a6d2e986f21b))
-   **action-group:** use the correct role for buttons when not selects ([0aae8ed](https://github.com/adobe/spectrum-web-components/commit/0aae8edcf582858c6dc0168942383ff9116bb319))

## [0.4.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.6...@spectrum-web-components/action-group@0.4.7) (2021-05-12)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.5...@spectrum-web-components/action-group@0.4.6) (2021-04-15)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.4...@spectrum-web-components/action-group@0.4.5) (2021-04-09)

### Bug Fixes

-   **action-group:** allow for initial button being "disabled" ([a1e3939](https://github.com/adobe/spectrum-web-components/commit/a1e393940daf5d0bb7783511d7b5255e24611033))

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.3...@spectrum-web-components/action-group@0.4.4) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.2...@spectrum-web-components/action-group@0.4.3) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.1...@spectrum-web-components/action-group@0.4.2) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.4.0...@spectrum-web-components/action-group@0.4.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/action-group

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.3.3...@spectrum-web-components/action-group@0.4.0) (2021-03-04)

### Bug Fixes

-   **action-group:** support ActionButtons that are not direct children ([1d4efd5](https://github.com/adobe/spectrum-web-components/commit/1d4efd58386ebfb940763911cb90878cafcf6938))

### Features

-   use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.3.2...@spectrum-web-components/action-group@0.3.3) (2021-02-11)

### Bug Fixes

-   update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.3.1...@spectrum-web-components/action-group@0.3.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.3.0...@spectrum-web-components/action-group@0.3.1) (2021-01-28)

**Note:** Version bump only for package @spectrum-web-components/action-group

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.1.4...@spectrum-web-components/action-group@0.3.0) (2021-01-21)

### Bug Fixes

-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
-   update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
-   use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
-   use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

-   **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
-   **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
-   **action-group:** update spectrum css input ([9840b19](https://github.com/adobe/spectrum-web-components/commit/9840b19576510d417387194846fb3aa6e4228759))
-   **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
-   **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.1.4...@spectrum-web-components/action-group@0.2.0) (2021-01-13)

### Bug Fixes

-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
-   update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
-   use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
-   use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

-   **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
-   **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
-   **action-group:** update spectrum css input ([9840b19](https://github.com/adobe/spectrum-web-components/commit/9840b19576510d417387194846fb3aa6e4228759))
-   **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
-   **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))

## [0.1.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.1.3...@spectrum-web-components/action-group@0.1.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/action-group

## [0.1.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.1.2...@spectrum-web-components/action-group@0.1.3) (2020-10-12)

### Bug Fixes

-   include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.1.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.1.1...@spectrum-web-components/action-group@0.1.2) (2020-09-25)

### Bug Fixes

-   update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))

## [0.1.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/action-group@0.1.0...@spectrum-web-components/action-group@0.1.1) (2020-09-14)

**Note:** Version bump only for package @spectrum-web-components/action-group

# 0.1.0 (2020-08-31)

### Features

-   **action-group:** add action-group pattern ([d2de766](https://github.com/adobe/spectrum-web-components/commit/d2de766efde6dfbaa1cd604f99ae3128b4fc81b5))
