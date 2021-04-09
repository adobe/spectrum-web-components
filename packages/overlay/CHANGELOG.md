# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.2...@spectrum-web-components/overlay@0.11.3) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.1...@spectrum-web-components/overlay@0.11.2) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.0...@spectrum-web-components/overlay@0.11.1) (2021-03-22)

### Bug Fixes

-   **overlay:** handle hover/longpress more directly via the "open" attribute ([7b2b64b](https://github.com/adobe/spectrum-web-components/commit/7b2b64b6be931381a1ca1c83f941677fa06750ff))

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.10.1...@spectrum-web-components/overlay@0.11.0) (2021-03-22)

### Bug Fixes

-   **overlay:** allow overlay-trigger to declaratively open overlay content ([194a44e](https://github.com/adobe/spectrum-web-components/commit/194a44e78df73ca4a5520e24b308667c23331880))
-   **overlay:** persist hover overlay when there is not click content ([27111a9](https://github.com/adobe/spectrum-web-components/commit/27111a95831dc0dc846af8f889a9479294ab8515))

### Features

-   **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.10.0...@spectrum-web-components/overlay@0.10.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.9.0...@spectrum-web-components/overlay@0.10.0) (2021-03-04)

### Bug Fixes

-   **overlay:** correct overlay content sizing ([d9bcd6f](https://github.com/adobe/spectrum-web-components/commit/d9bcd6fd6b4eecae297c6e5cc5330e79a9e198ff))
-   **overlay:** track "modalRoots" for expanded overlay management ([dceccb1](https://github.com/adobe/spectrum-web-components/commit/dceccb1617d54da4c0db8035954a4eb4e0367c30))
-   wait for fonts ready before positioning overlays ([cb8026a](https://github.com/adobe/spectrum-web-components/commit/cb8026a1999a4458b442673291214269fc1e1cef))

### Features

-   use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.8.2...@spectrum-web-components/overlay@0.9.0) (2021-02-11)

### Bug Fixes

-   **overlay:** place return focus element on demand ([d262237](https://github.com/adobe/spectrum-web-components/commit/d2622374346c0a0f55419f87dd4399918c3aaa15))

### Features

-   allow activation of longpress content ([55e71fd](https://github.com/adobe/spectrum-web-components/commit/55e71fdf9fd5dde489871c3d9798ef8957f4e5b6))

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.8.1...@spectrum-web-components/overlay@0.8.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.8.0...@spectrum-web-components/overlay@0.8.1) (2021-01-28)

### Bug Fixes

-   **overlay:** remove trapped content from a11y tree, manage focus, open projected content ([6c496c0](https://github.com/adobe/spectrum-web-components/commit/6c496c0a930737b7fd74a565766ab41339691551))
-   **tooltip:** correct arrow orientation, remove popper-arrow-rotate ([fcd6ea2](https://github.com/adobe/spectrum-web-components/commit/fcd6ea28ef5e4f06a07994ebd8f8b9be1a934eb2))

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.4...@spectrum-web-components/overlay@0.8.0) (2021-01-21)

### Bug Fixes

-   **overlay:** do not focus the trigger when closing an overlay, unless expected ([21d7dfe](https://github.com/adobe/spectrum-web-components/commit/21d7dfeaa94919586bede27a9c7ae077a2d214a5))
-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   **overlay:** use esm build from popper and point through to types ([078ca0f](https://github.com/adobe/spectrum-web-components/commit/078ca0fb9bc43d1ee5288e641ff1ec49f40e8df5))
-   **overlay:** use isolatedModules in tsconfig ([48d6069](https://github.com/adobe/spectrum-web-components/commit/48d60694ad5d6014b8664f515e698651f55c9e5f))
-   use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

-   add open/close events for some menus and overlays ([17f0a58](https://github.com/adobe/spectrum-web-components/commit/17f0a58722fdfee39653c2abde048391f7f24564))
-   **field-group:** add field-group pattern ([f8d265c](https://github.com/adobe/spectrum-web-components/commit/f8d265c3352f4a97fc103a09ce8eb56511dcedbb))
-   **story-decorator:** add story decorator to replace knobs for theme application ([7c0c6be](https://github.com/adobe/spectrum-web-components/commit/7c0c6be37d58ad3e6d8973e8d4f5ccc587bf55af))

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.4...@spectrum-web-components/overlay@0.7.0) (2021-01-13)

### Bug Fixes

-   **overlay:** do not focus the trigger when closing an overlay, unless expected ([21d7dfe](https://github.com/adobe/spectrum-web-components/commit/21d7dfeaa94919586bede27a9c7ae077a2d214a5))
-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   **overlay:** use esm build from popper and point through to types ([078ca0f](https://github.com/adobe/spectrum-web-components/commit/078ca0fb9bc43d1ee5288e641ff1ec49f40e8df5))
-   **overlay:** use isolatedModules in tsconfig ([48d6069](https://github.com/adobe/spectrum-web-components/commit/48d60694ad5d6014b8664f515e698651f55c9e5f))
-   use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

-   add open/close events for some menus and overlays ([17f0a58](https://github.com/adobe/spectrum-web-components/commit/17f0a58722fdfee39653c2abde048391f7f24564))
-   **field-group:** add field-group pattern ([f8d265c](https://github.com/adobe/spectrum-web-components/commit/f8d265c3352f4a97fc103a09ce8eb56511dcedbb))
-   **story-decorator:** add story decorator to replace knobs for theme application ([7c0c6be](https://github.com/adobe/spectrum-web-components/commit/7c0c6be37d58ad3e6d8973e8d4f5ccc587bf55af))

## [0.6.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.3...@spectrum-web-components/overlay@0.6.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.6.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.2...@spectrum-web-components/overlay@0.6.3) (2020-10-12)

### Bug Fixes

-   **overlay:** close when overlay-trigger becomes [disabled](<[6f27e25](https://github.com/adobe/spectrum-web-components/commit/6f27e25658dd23949ef07c6df72c43768651482b)>)
-   include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.6.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.1...@spectrum-web-components/overlay@0.6.2) (2020-09-25)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.0...@spectrum-web-components/overlay@0.6.1) (2020-09-15)

### Bug Fixes

-   **overlay:** only "tab trap" when you mean to ([74e1bd2](https://github.com/adobe/spectrum-web-components/commit/74e1bd2182785ec14f944bef8806ecc3e8d15c10))

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.5.2...@spectrum-web-components/overlay@0.6.0) (2020-08-31)

### Bug Fixes

-   correct overlay closure order or operations for manual override ([0b7a8c4](https://github.com/adobe/spectrum-web-components/commit/0b7a8c42866ae4f2d38d90fa7b6dc34ed2c21759))

### Features

-   **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.5.1...@spectrum-web-components/overlay@0.5.2) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.5.0...@spectrum-web-components/overlay@0.5.1) (2020-08-13)

### Bug Fixes

-   include sync builds in publication configuration ([e731673](https://github.com/adobe/spectrum-web-components/commit/e731673e7d171af667fc87c5b6e521450143e8fe))

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.4.3...@spectrum-web-components/overlay@0.5.0) (2020-08-13)

### Bug Fixes

-   **overlay:** enforce the full frame ([63628e9](https://github.com/adobe/spectrum-web-components/commit/63628e93de2daec632025f2659a86ff18e487a8e))
-   **overlay:** ensure overlay addition occurs after closing previous ([7d2b102](https://github.com/adobe/spectrum-web-components/commit/7d2b102f30731513639582fed8ed0e1b46d569cf))

### Features

-   **overlay:** move entire package behind dynamic import by default ([9b0a74d](https://github.com/adobe/spectrum-web-components/commit/9b0a74de1f32ccd8cde6cabe4c06f990064f11ae))

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.4.2...@spectrum-web-components/overlay@0.4.3) (2020-08-05)

### Bug Fixes

-   use height: 100% to avoid layout breaks ([1498129](https://github.com/adobe/spectrum-web-components/commit/14981291e6d860a8fde7e1746a4a03af4df1e572))

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.4.1...@spectrum-web-components/overlay@0.4.2) (2020-07-24)

### Bug Fixes

-   ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.4.0...@spectrum-web-components/overlay@0.4.1) (2020-07-22)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.8...@spectrum-web-components/overlay@0.4.0) (2020-07-17)

### Features

-   **overlay:** manage focus throwing and tab trapping ([27a0b53](https://github.com/adobe/spectrum-web-components/commit/27a0b53ea94d19bb18b7d3f89763b06dc1b42b59))
-   leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.3.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.7...@spectrum-web-components/overlay@0.3.8) (2020-06-08)

### Bug Fixes

-   **overlay:** ensure undefined data is not passed into theme ([3e2e1ca](https://github.com/adobe/spectrum-web-components/commit/3e2e1caa4c37eedf6e569b5124c9e59f207bb92f))

## [0.3.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.6...@spectrum-web-components/overlay@0.3.7) (2020-05-08)

### Bug Fixes

-   **dropdown:** correct conditional check ([a3a790f](https://github.com/adobe/spectrum-web-components/commit/a3a790f6c3f5f8f0837d619ca57c1090ab14e638))

## [0.3.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.5...@spectrum-web-components/overlay@0.3.6) (2020-05-08)

### Bug Fixes

-   constrain overlay to available window size ([9729b55](https://github.com/adobe/spectrum-web-components/commit/9729b55ef5246662aa50cbc8037bcaeb2f4ac74a))

## [0.3.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.4...@spectrum-web-components/overlay@0.3.5) (2020-04-16)

### Performance Improvements

-   use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.3.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.3...@spectrum-web-components/overlay@0.3.4) (2020-04-10)

### Bug Fixes

-   **overlay:** new popper version tracks scroll through assigned slots ([ea2bac4](https://github.com/adobe/spectrum-web-components/commit/ea2bac4f7d9c4df98a6a65c19229ef1c18a74791))

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.2...@spectrum-web-components/overlay@0.3.3) (2020-04-07)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.1...@spectrum-web-components/overlay@0.3.2) (2020-03-16)

### Bug Fixes

-   **theme:** track default theme values dynamically ([a0c306c](https://github.com/adobe/spectrum-web-components/commit/a0c306c))

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.0...@spectrum-web-components/overlay@0.3.1) (2020-03-11)

### Bug Fixes

-   **overlay:** extend state machine to manage disposal process ([f0f26af](https://github.com/adobe/spectrum-web-components/commit/f0f26af))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.2.1...@spectrum-web-components/overlay@0.3.0) (2020-02-24)

### Features

-   **dropdown:** open menu UI with overlay system ([9811eeb](https://github.com/adobe/spectrum-web-components/commit/9811eeb))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.2.0...@spectrum-web-components/overlay@0.2.1) (2020-02-05)

### Bug Fixes

-   **overlay:** override SpectrumCSS tip rules and process usage in popper ([aad3dec](https://github.com/adobe/spectrum-web-components/commit/aad3dec))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.1.0...@spectrum-web-components/overlay@0.2.0) (2020-01-30)

### Features

-   rework overlays to use popper ([e17d1bb](https://github.com/adobe/spectrum-web-components/commit/e17d1bb))

# 0.1.0 (2020-01-06)

### Features

-   join overlay-root and overlay-trigger as overlay ([dcde42c](https://github.com/adobe/spectrum-web-components/commit/dcde42c))
-   **sidenav:** add keyboard accessibility ([6ff622b](https://github.com/adobe/spectrum-web-components/commit/6ff622b))
