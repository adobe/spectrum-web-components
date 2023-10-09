# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

### Bug Fixes

-   **menu:** allow `change` events to be direct ([#3689](https://github.com/adobe/spectrum-web-components/issues/3689)) ([b2cd3da](https://github.com/adobe/spectrum-web-components/commit/b2cd3da1384c577f27f604c42847953bb7121cb2))

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

### Bug Fixes

-   **menu:** allow Menu elements to be controlled ([74ed7fb](https://github.com/adobe/spectrum-web-components/commit/74ed7fb7d593199c333392f89c4827fcb8248cab))
-   **menu:** manage deeply slotted menu items and initial focus ([7f9ad69](https://github.com/adobe/spectrum-web-components/commit/7f9ad69282b6e740efb04fa2933d3163164259c7))

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Bug Fixes

-   **menu:** added support for menu item description ([#3559](https://github.com/adobe/spectrum-web-components/issues/3559)) ([ce99528](https://github.com/adobe/spectrum-web-components/commit/ce99528b4ad61ba8185cde7eaacfa98a2a9fd619))
-   **menu:** correct types import for .d.ts file creation ([a11d264](https://github.com/adobe/spectrum-web-components/commit/a11d2645863d23d3557fdb5803b68365cc373cb6))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

### Bug Fixes

-   ensure submenus stay open when root it clicked again ([83ced1c](https://github.com/adobe/spectrum-web-components/commit/83ced1c913f262620e7b87ad3b7e58dff0697442))

### Features

-   **menu:** prepare for Overlay v2 and less connnected/disconnected responsibilities ([5dfb71e](https://github.com/adobe/spectrum-web-components/commit/5dfb71e5ed26cf8af83ca335a7658938f3f135a6))

### Performance Improvements

-   make lots of things lazy ([b8fa3ad](https://github.com/adobe/spectrum-web-components/commit/b8fa3ada062bf54bbb42e76ab156c716d5820c7c))
-   make submenus lazier ([a2d661c](https://github.com/adobe/spectrum-web-components/commit/a2d661cf4095f4ccb826d17b6f2e665c8c5bf70f))
-   make submenus lazy ([93531b9](https://github.com/adobe/spectrum-web-components/commit/93531b9624259d519f6f9cab264f8485c9a32fdb))

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

### Features

-   **menu:** convert to core tokens ([#3254](https://github.com/adobe/spectrum-web-components/issues/3254)) ([da43540](https://github.com/adobe/spectrum-web-components/commit/da43540abcea3db75bf145194be800b61153ebe0))

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

### Bug Fixes

-   menu item missing aria labels ([#3417](https://github.com/adobe/spectrum-web-components/issues/3417)) ([0d04869](https://github.com/adobe/spectrum-web-components/commit/0d048696792522af0d849b64983ae793dfeae289))

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.33.1](https://github.com/adobe/spectrum-web-components/compare/v0.33.0...v0.33.1) (2023-06-14)

### Bug Fixes

-   **menu:** [#3164](https://github.com/adobe/spectrum-web-components/issues/3164) plug memory leak with gobal events ([ff589d4](https://github.com/adobe/spectrum-web-components/commit/ff589d4ec86f8dcda15c386907d27c7b3cc8c325))

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/menu

# 0.30.0 (2023-05-03)

### Bug Fixes

-   abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))
-   add "value" slot to sp-menu-item ([e1bd264](https://github.com/adobe/spectrum-web-components/commit/e1bd2646a5198d9ef64710ad0a3749606f08c74e))
-   add icon present and icon-only support to Picker ([f6887a3](https://github.com/adobe/spectrum-web-components/commit/f6887a34e228473e33893c81017492bf3e8fd6c3))
-   add value/selection checks to the tests and fix up the value logic ([933106f](https://github.com/adobe/spectrum-web-components/commit/933106f88dfa99f22fc1046c1395eb53f051b5c4))
-   address a11y issues raised by updating our dependencies ([4f06477](https://github.com/adobe/spectrum-web-components/commit/4f0647782eea7fdd85560e1bcb2f8b892f30bc33))
-   correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
-   correctly delivery visuals and mouse interactions for litAnchor and extensions ([0ae889a](https://github.com/adobe/spectrum-web-components/commit/0ae889a8aab9b3417a021b917dfc817a8310f50f))
-   **dropdown:** improve accessibility ([389d9d9](https://github.com/adobe/spectrum-web-components/commit/389d9d94a13bf31e10f58ee498bd848929e9d67c))
-   ensure Action Menu Item with [href] close the menu ([6b3d87f](https://github.com/adobe/spectrum-web-components/commit/6b3d87f8c922df782432bca3ef93d21637bad78b))
-   ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
-   ensure that an overlay can be released even if it does not complete its fade in animation ([4cbb36f](https://github.com/adobe/spectrum-web-components/commit/4cbb36f91569ce9b7f926437142950fc8fbd59f9))
-   ensure that entering an ancestor Menu Item without a submen closes related submenus ([efe5fa1](https://github.com/adobe/spectrum-web-components/commit/efe5fa1ff50c45487f370847444b940e1d6d8a4e))
-   include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716f2f787deb8d868a78bd28c8e62fe90e21))
-   include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   match "pointerup" listeners with "pointercancel" for full coverage ([7f2ce92](https://github.com/adobe/spectrum-web-components/commit/7f2ce924ce03fb0881505e6f144184bd3d25355d))
-   **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))
-   **menu:** allow for settign "selected" async from above ([9d7f622](https://github.com/adobe/spectrum-web-components/commit/9d7f6220313278a90d0482f27a507519a77df549))
-   **menu:** cache item parent element to correct disconnecting event dispatch ([f375510](https://github.com/adobe/spectrum-web-components/commit/f3755109ebf64623ba4884871ad8f6eb3b02bc33))
-   **menu:** clarify menu internal focus management via preventScroll option ([9ae092c](https://github.com/adobe/spectrum-web-components/commit/9ae092c7d09ef9359dbf9ed9373aef0650967f40))
-   **menu:** disabled menu-item should not open submenu ([33848bc](https://github.com/adobe/spectrum-web-components/commit/33848bc0aa64733e356831a5f4968fcb01476df4))
-   **menu:** ensure active descendant is in view when activated ([6edc351](https://github.com/adobe/spectrum-web-components/commit/6edc3518fd305cbd35b74f013546bb32aef7616b))
-   **menu:** ensure that Groups in Action Menus are rendered with the correct width ([a996a10](https://github.com/adobe/spectrum-web-components/commit/a996a1078bd3a00d3025f0eeadb39330bafdc26d))
-   **menu:** include all direct dependencies ([aa7327f](https://github.com/adobe/spectrum-web-components/commit/aa7327f748b829fa6f6eec2412ac104e9dbeff76))
-   **menu:** manage tabindex and focus entry correctly ([3b1a250](https://github.com/adobe/spectrum-web-components/commit/3b1a250c0ec4ad2b3553bbf100c8c7015ff3cbc6))
-   **menu:** only scrollIntoView when keyboard navigating ([f4e9278](https://github.com/adobe/spectrum-web-components/commit/f4e9278048287a45bba2da25144834b0b8297c66))
-   **menu:** pass current focus visibility to menu items ([2d3bf80](https://github.com/adobe/spectrum-web-components/commit/2d3bf8046379fe8caff926af81e62806e77f6a49))
-   **menu:** patch undefined lastFocusedItem ([772a7ea](https://github.com/adobe/spectrum-web-components/commit/772a7ea63507b69432e8fac33354578873c3585c))
-   **menu:** prevent infinite loop when focus() ([e4e98a3](https://github.com/adobe/spectrum-web-components/commit/e4e98a358a1991c1d6048b01e2899dd28d56dc7e))
-   **menu:** support menu item list change in deep decendents ([b2b47f3](https://github.com/adobe/spectrum-web-components/commit/b2b47f305cab9720d29b4214b3330b95f33a56d3))
-   normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cdac98282c886f23c4a8d6cf4910c4a606c))
-   **picker:** allow menu items to be added, updated, and removed ([73511ba](https://github.com/adobe/spectrum-web-components/commit/73511ba996154c006602dfd1c7f1d94746049782))
-   prepare for querying child items while disconnected ([f4152a5](https://github.com/adobe/spectrum-web-components/commit/f4152a5474b661d72b69e7a8cab41639ec7fb8c0))
-   prevent infinite loops when all children are [disabled] ([2deac3d](https://github.com/adobe/spectrum-web-components/commit/2deac3d88ea7f2f27e74d60793e253952d0d765f))
-   prevent leaving multiple submenus open at a time ([d2bfbb2](https://github.com/adobe/spectrum-web-components/commit/d2bfbb2d8334ae1a6bd21381092d54914b8f708c))
-   remove <sp-menu> usage where deprecated ([387db3b](https://github.com/adobe/spectrum-web-components/commit/387db3be95c98ab220e517fe12a4db7a2496fe5f))
-   simplify focus application in Menu ([6140169](https://github.com/adobe/spectrum-web-components/commit/61401699b36298b6f11cc80703aff664cbb867a7))
-   **split-button:** hide "selected" item from menu ([322a966](https://github.com/adobe/spectrum-web-components/commit/322a96655855f42b390ba2c94d0b017bf93aebd9))
-   stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
-   style clean up ([49e1537](https://github.com/adobe/spectrum-web-components/commit/49e15377f3a839d0ed5dc2504dd71396aa156eb5))
-   update consumption of Spectrum CSS for latest version ([ed2305b](https://github.com/adobe/spectrum-web-components/commit/ed2305b7334c973ea5c8299cbbce33a365896329))
-   update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
-   update Picker label via MutationObserver instead of "slotchange" ([196998e](https://github.com/adobe/spectrum-web-components/commit/196998e9433dc938d86bfbe77db9e3accd6d9bbc))
-   update role application logic to not overwrite menu\* roles ([94b6aec](https://github.com/adobe/spectrum-web-components/commit/94b6aecffc1e5686feab09361d4e07ec3e854726))
-   update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
-   update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
-   use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
-   use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

-   **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
-   **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
-   add screenshot regression testing to CI ([8205dfe](https://github.com/adobe/spectrum-web-components/commit/8205dfe33c725e13f74f411779c2ff3b6061a913))
-   add selects attribute to menu ([bdf2578](https://github.com/adobe/spectrum-web-components/commit/bdf25780e56c7b92368904dce2a02f2594c364a2))
-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
-   allow dir management by sp-theme elements ([2d10158](https://github.com/adobe/spectrum-web-components/commit/2d1015883bc0c3a03862c0de8b4d996cd954291f))
-   conditionally load focus-visible polyfill ([6b5e5cf](https://github.com/adobe/spectrum-web-components/commit/6b5e5cf515f02ef14f072b7aee62feed7a83c281))
-   delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))
-   **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
-   leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
-   **menu:** update spectrum css input ([8c7e18a](https://github.com/adobe/spectrum-web-components/commit/8c7e18ac16f2747bd2f10173bcac0d5e53a0bcac))
-   **overlay:** manage focus throwing and tab trapping ([27a0b53](https://github.com/adobe/spectrum-web-components/commit/27a0b53ea94d19bb18b7d3f89763b06dc1b42b59))
-   **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))
-   **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))
-   reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))
-   shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
-   **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))
-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
-   update Menu Divider for new Spectrum CSS output ([aca7e2d](https://github.com/adobe/spectrum-web-components/commit/aca7e2dd1b42016d16c5e7a3484e0963ffce4d9a))
-   update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))
-   use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc77960de8e57dd9c49bb7669df689f0ebaa))
-   use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/39188887afad9bec52ef48d4e22596f9b757a9fe))
-   use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

-   reorganize inheritance and composition in Menu Items ([d96ccb6](https://github.com/adobe/spectrum-web-components/commit/d96ccb621833277444d69535126c3669343c2eaf))
-   use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))
-   use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0accd643c2f35cbf1ba809b54f52c25628d))

### Reverts

-   Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))

## [0.16.17](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.16...@spectrum-web-components/menu@0.16.17) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.16](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.15...@spectrum-web-components/menu@0.16.16) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.14...@spectrum-web-components/menu@0.16.15) (2023-03-22)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.13...@spectrum-web-components/menu@0.16.14) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.12...@spectrum-web-components/menu@0.16.13) (2023-02-13)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.11...@spectrum-web-components/menu@0.16.12) (2023-02-08)

### Bug Fixes

-   **menu:** patch undefined lastFocusedItem ([772a7ea](https://github.com/adobe/spectrum-web-components/commit/772a7ea63507b69432e8fac33354578873c3585c))
-   prepare for querying child items while disconnected ([f4152a5](https://github.com/adobe/spectrum-web-components/commit/f4152a5474b661d72b69e7a8cab41639ec7fb8c0))

## [0.16.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.10...@spectrum-web-components/menu@0.16.11) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.9...@spectrum-web-components/menu@0.16.10) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.8...@spectrum-web-components/menu@0.16.9) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.7...@spectrum-web-components/menu@0.16.8) (2022-11-21)

### Bug Fixes

-   ensure that an overlay can be released even if it does not complete its fade in animation ([4cbb36f](https://github.com/adobe/spectrum-web-components/commit/4cbb36f91569ce9b7f926437142950fc8fbd59f9))

## [0.16.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.6...@spectrum-web-components/menu@0.16.7) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.5...@spectrum-web-components/menu@0.16.6) (2022-10-28)

### Bug Fixes

-   ensure Action Menu Item with [href] close the menu ([6b3d87f](https://github.com/adobe/spectrum-web-components/commit/6b3d87f8c922df782432bca3ef93d21637bad78b))

## [0.16.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.4...@spectrum-web-components/menu@0.16.5) (2022-10-17)

### Bug Fixes

-   **menu:** ensure that Groups in Action Menus are rendered with the correct width ([a996a10](https://github.com/adobe/spectrum-web-components/commit/a996a1078bd3a00d3025f0eeadb39330bafdc26d))

## [0.16.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.3...@spectrum-web-components/menu@0.16.4) (2022-10-10)

### Bug Fixes

-   match "pointerup" listeners with "pointercancel" for full coverage ([7f2ce92](https://github.com/adobe/spectrum-web-components/commit/7f2ce924ce03fb0881505e6f144184bd3d25355d))

## [0.16.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.2...@spectrum-web-components/menu@0.16.3) (2022-09-15)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.1...@spectrum-web-components/menu@0.16.2) (2022-09-14)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.0...@spectrum-web-components/menu@0.16.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.16.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.15.0...@spectrum-web-components/menu@0.16.0) (2022-08-09)

### Features

-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

# [0.15.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.4...@spectrum-web-components/menu@0.15.0) (2022-08-04)

### Features

-   delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))

## [0.14.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.3...@spectrum-web-components/menu@0.14.4) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.14.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.2...@spectrum-web-components/menu@0.14.3) (2022-06-29)

### Bug Fixes

-   ensure that entering an ancestor Menu Item without a submen closes related submenus ([efe5fa1](https://github.com/adobe/spectrum-web-components/commit/efe5fa1ff50c45487f370847444b940e1d6d8a4e))
-   update Picker label via MutationObserver instead of "slotchange" ([196998e](https://github.com/adobe/spectrum-web-components/commit/196998e9433dc938d86bfbe77db9e3accd6d9bbc))

## [0.14.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.1...@spectrum-web-components/menu@0.14.2) (2022-06-07)

### Bug Fixes

-   prevent leaving multiple submenus open at a time ([d2bfbb2](https://github.com/adobe/spectrum-web-components/commit/d2bfbb2d8334ae1a6bd21381092d54914b8f708c))
-   **menu:** disabled menu-item should not open submenu ([33848bc](https://github.com/adobe/spectrum-web-components/commit/33848bc0aa64733e356831a5f4968fcb01476df4))

## [0.14.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.0...@spectrum-web-components/menu@0.14.1) (2022-05-27)

### Bug Fixes

-   update consumption of Spectrum CSS for latest version ([ed2305b](https://github.com/adobe/spectrum-web-components/commit/ed2305b7334c973ea5c8299cbbce33a365896329))

# [0.14.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.13.0...@spectrum-web-components/menu@0.14.0) (2022-05-12)

### Features

-   update Menu Divider for new Spectrum CSS output ([aca7e2d](https://github.com/adobe/spectrum-web-components/commit/aca7e2dd1b42016d16c5e7a3484e0963ffce4d9a))

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.5...@spectrum-web-components/menu@0.13.0) (2022-04-21)

### Features

-   conditionally load focus-visible polyfill ([6b5e5cf](https://github.com/adobe/spectrum-web-components/commit/6b5e5cf515f02ef14f072b7aee62feed7a83c281))
-   reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))

## [0.12.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.4...@spectrum-web-components/menu@0.12.5) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.12.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.3...@spectrum-web-components/menu@0.12.4) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.12.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.2...@spectrum-web-components/menu@0.12.3) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.12.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.1...@spectrum-web-components/menu@0.12.2) (2022-03-04)

### Bug Fixes

-   **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))

## [0.12.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.0...@spectrum-web-components/menu@0.12.1) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.11.3...@spectrum-web-components/menu@0.12.0) (2022-02-02)

### Features

-   **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.11.2...@spectrum-web-components/menu@0.11.3) (2022-01-26)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.11.1...@spectrum-web-components/menu@0.11.2) (2022-01-07)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.11.0...@spectrum-web-components/menu@0.11.1) (2021-12-13)

### Bug Fixes

-   **picker:** allow menu items to be added, updated, and removed ([73511ba](https://github.com/adobe/spectrum-web-components/commit/73511ba996154c006602dfd1c7f1d94746049782))

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.10.1...@spectrum-web-components/menu@0.11.0) (2021-11-08)

### Features

-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.10.0...@spectrum-web-components/menu@0.10.1) (2021-11-08)

### Bug Fixes

-   abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.6...@spectrum-web-components/menu@0.10.0) (2021-11-02)

### Features

-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.9.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.5...@spectrum-web-components/menu@0.9.6) (2021-10-12)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.9.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.4...@spectrum-web-components/menu@0.9.5) (2021-10-05)

### Bug Fixes

-   **menu:** cache item parent element to correct disconnecting event dispatch ([f375510](https://github.com/adobe/spectrum-web-components/commit/f3755109ebf64623ba4884871ad8f6eb3b02bc33))

## [0.9.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.3...@spectrum-web-components/menu@0.9.4) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.9.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.2...@spectrum-web-components/menu@0.9.3) (2021-09-13)

### Bug Fixes

-   simplify focus application in Menu ([6140169](https://github.com/adobe/spectrum-web-components/commit/61401699b36298b6f11cc80703aff664cbb867a7))

## [0.9.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.1...@spectrum-web-components/menu@0.9.2) (2021-08-24)

### Bug Fixes

-   correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.0...@spectrum-web-components/menu@0.9.1) (2021-08-17)

### Performance Improvements

-   reorganize inheritance and composition in Menu Items ([d96ccb6](https://github.com/adobe/spectrum-web-components/commit/d96ccb621833277444d69535126c3669343c2eaf))

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.10...@spectrum-web-components/menu@0.9.0) (2021-08-03)

### Bug Fixes

-   add value/selection checks to the tests and fix up the value logic ([933106f](https://github.com/adobe/spectrum-web-components/commit/933106f88dfa99f22fc1046c1395eb53f051b5c4))
-   **split-button:** hide "selected" item from menu ([322a966](https://github.com/adobe/spectrum-web-components/commit/322a96655855f42b390ba2c94d0b017bf93aebd9))

### Features

-   add selects attribute to menu ([bdf2578](https://github.com/adobe/spectrum-web-components/commit/bdf25780e56c7b92368904dce2a02f2594c364a2))

## [0.8.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.9...@spectrum-web-components/menu@0.8.10) (2021-07-22)

### Bug Fixes

-   style clean up ([49e1537](https://github.com/adobe/spectrum-web-components/commit/49e15377f3a839d0ed5dc2504dd71396aa156eb5))

## [0.8.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.8...@spectrum-web-components/menu@0.8.9) (2021-07-01)

### Bug Fixes

-   add "value" slot to sp-menu-item ([e1bd264](https://github.com/adobe/spectrum-web-components/commit/e1bd2646a5198d9ef64710ad0a3749606f08c74e))
-   add icon present and icon-only support to Picker ([f6887a3](https://github.com/adobe/spectrum-web-components/commit/f6887a34e228473e33893c81017492bf3e8fd6c3))

## [0.8.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.7...@spectrum-web-components/menu@0.8.8) (2021-06-16)

### Bug Fixes

-   update role application logic to not overwrite menu\* roles ([94b6aec](https://github.com/adobe/spectrum-web-components/commit/94b6aecffc1e5686feab09361d4e07ec3e854726))

## [0.8.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.6...@spectrum-web-components/menu@0.8.7) (2021-06-07)

### Bug Fixes

-   **menu:** clarify menu internal focus management via preventScroll option ([9ae092c](https://github.com/adobe/spectrum-web-components/commit/9ae092c7d09ef9359dbf9ed9373aef0650967f40))

## [0.8.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.5...@spectrum-web-components/menu@0.8.6) (2021-05-24)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.8.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.4...@spectrum-web-components/menu@0.8.5) (2021-05-12)

### Bug Fixes

-   **menu:** pass current focus visibility to menu items ([2d3bf80](https://github.com/adobe/spectrum-web-components/commit/2d3bf8046379fe8caff926af81e62806e77f6a49))

## [0.8.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.3...@spectrum-web-components/menu@0.8.4) (2021-04-15)

### Bug Fixes

-   **menu:** manage tabindex and focus entry correctly ([3b1a250](https://github.com/adobe/spectrum-web-components/commit/3b1a250c0ec4ad2b3553bbf100c8c7015ff3cbc6))
-   **menu:** only scrollIntoView when keyboard navigating ([f4e9278](https://github.com/adobe/spectrum-web-components/commit/f4e9278048287a45bba2da25144834b0b8297c66))

## [0.8.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.2...@spectrum-web-components/menu@0.8.3) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.1...@spectrum-web-components/menu@0.8.2) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.0...@spectrum-web-components/menu@0.8.1) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.7.1...@spectrum-web-components/menu@0.8.0) (2021-03-22)

### Bug Fixes

-   correctly delivery visuals and mouse interactions for litAnchor and extensions ([0ae889a](https://github.com/adobe/spectrum-web-components/commit/0ae889a8aab9b3417a021b917dfc817a8310f50f))
-   remove <sp-menu> usage where deprecated ([387db3b](https://github.com/adobe/spectrum-web-components/commit/387db3be95c98ab220e517fe12a4db7a2496fe5f))

### Features

-   **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))

## [0.7.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.7.0...@spectrum-web-components/menu@0.7.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.6.3...@spectrum-web-components/menu@0.7.0) (2021-03-04)

### Bug Fixes

-   **menu:** ensure active descendant is in view when activated ([6edc351](https://github.com/adobe/spectrum-web-components/commit/6edc3518fd305cbd35b74f013546bb32aef7616b))

### Features

-   use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.6.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.6.2...@spectrum-web-components/menu@0.6.3) (2021-02-11)

### Bug Fixes

-   update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

## [0.6.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.6.1...@spectrum-web-components/menu@0.6.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.6.0...@spectrum-web-components/menu@0.6.1) (2021-01-28)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.4...@spectrum-web-components/menu@0.6.0) (2021-01-21)

### Bug Fixes

-   address a11y issues raised by updating our dependencies ([4f06477](https://github.com/adobe/spectrum-web-components/commit/4f0647782eea7fdd85560e1bcb2f8b892f30bc33))
-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   prevent infinite loops when all children are [disabled] ([2deac3d](https://github.com/adobe/spectrum-web-components/commit/2deac3d88ea7f2f27e74d60793e253952d0d765f))
-   stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
-   use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
-   **menu:** prevent infinite loop when focus() ([e4e98a3](https://github.com/adobe/spectrum-web-components/commit/e4e98a358a1991c1d6048b01e2899dd28d56dc7e))
-   update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
-   use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

-   **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
-   **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
-   **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
-   **menu:** update spectrum css input ([8c7e18a](https://github.com/adobe/spectrum-web-components/commit/8c7e18ac16f2747bd2f10173bcac0d5e53a0bcac))

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.4...@spectrum-web-components/menu@0.5.0) (2021-01-13)

### Bug Fixes

-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   prevent infinite loops when all children are [disabled](<[2deac3d](https://github.com/adobe/spectrum-web-components/commit/2deac3d88ea7f2f27e74d60793e253952d0d765f)>)
-   stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
-   use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
-   **menu:** prevent infinite loop when focus() ([e4e98a3](https://github.com/adobe/spectrum-web-components/commit/e4e98a358a1991c1d6048b01e2899dd28d56dc7e))
-   update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
-   use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

-   **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
-   **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
-   **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
-   **menu:** update spectrum css input ([8c7e18a](https://github.com/adobe/spectrum-web-components/commit/8c7e18ac16f2747bd2f10173bcac0d5e53a0bcac))

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.3...@spectrum-web-components/menu@0.4.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.2...@spectrum-web-components/menu@0.4.3) (2020-10-12)

### Bug Fixes

-   include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
-   **dropdown:** improve accessibility ([389d9d9](https://github.com/adobe/spectrum-web-components/commit/389d9d94a13bf31e10f58ee498bd848929e9d67c))

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.1...@spectrum-web-components/menu@0.4.2) (2020-09-25)

### Bug Fixes

-   update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.0...@spectrum-web-components/menu@0.4.1) (2020-09-14)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.3.2...@spectrum-web-components/menu@0.4.0) (2020-08-31)

### Features

-   allow dir management by sp-theme elements ([2d10158](https://github.com/adobe/spectrum-web-components/commit/2d1015883bc0c3a03862c0de8b4d996cd954291f))
-   update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))
-   **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.3.1...@spectrum-web-components/menu@0.3.2) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.3.0...@spectrum-web-components/menu@0.3.1) (2020-08-13)

### Bug Fixes

-   **menu:** include all direct dependencies ([aa7327f](https://github.com/adobe/spectrum-web-components/commit/aa7327f748b829fa6f6eec2412ac104e9dbeff76))
-   ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.7...@spectrum-web-components/menu@0.3.0) (2020-07-17)

### Features

-   **overlay:** manage focus throwing and tab trapping ([27a0b53](https://github.com/adobe/spectrum-web-components/commit/27a0b53ea94d19bb18b7d3f89763b06dc1b42b59))
-   leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.2.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.6...@spectrum-web-components/menu@0.2.7) (2020-06-08)

### Bug Fixes

-   **menu:** support menu item list change in deep decendents ([b2b47f3](https://github.com/adobe/spectrum-web-components/commit/b2b47f305cab9720d29b4214b3330b95f33a56d3))

## [0.2.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.5...@spectrum-web-components/menu@0.2.6) (2020-04-16)

### Performance Improvements

-   use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.2.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.4...@spectrum-web-components/menu@0.2.5) (2020-04-07)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.2.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.3...@spectrum-web-components/menu@0.2.4) (2020-03-11)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.2.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.2...@spectrum-web-components/menu@0.2.3) (2020-01-06)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.1...@spectrum-web-components/menu@0.2.2) (2019-12-02)

### Bug Fixes

-   normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cd))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.0...@spectrum-web-components/menu@0.2.1) (2019-11-27)

### Bug Fixes

-   include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.1.4...@spectrum-web-components/menu@0.2.0) (2019-11-19)

### Bug Fixes

-   **menu:** allow for settign "selected" async from above ([9d7f622](https://github.com/adobe/spectrum-web-components/commit/9d7f622))

### Features

-   add screenshot regression testing to CI ([8205dfe](https://github.com/adobe/spectrum-web-components/commit/8205dfe))
-   use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc7))
-   use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/3918888))

## [0.1.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.1.3...@spectrum-web-components/menu@0.1.4) (2019-10-14)

### Performance Improvements

-   use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0a))

## 0.1.3 (2019-10-03)

**Note:** Version bump only for package @spectrum-web-components/menu
