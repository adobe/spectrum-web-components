# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

### Bug Fixes

-   address margin effected positioning ([38c8cf2](https://github.com/adobe/spectrum-web-components/commit/38c8cf2dd3f3b45a61062e3cd9b7480f903fae97))
-   ensure submenus stay open when root it clicked again ([83ced1c](https://github.com/adobe/spectrum-web-components/commit/83ced1c913f262620e7b87ad3b7e58dff0697442))
-   handle longpress and over filter overlays ([483e52d](https://github.com/adobe/spectrum-web-components/commit/483e52df24f56be027d8417c1ae530211ef0deb1))

### Features

-   **overlay:** ship Overlay API v2 ([67b5d1b](https://github.com/adobe/spectrum-web-components/commit/67b5d1b02e88dcb5b0b79b5a6c5ead92ad1a5aca))

### Performance Improvements

-   make lots of things lazy ([b8fa3ad](https://github.com/adobe/spectrum-web-components/commit/b8fa3ada062bf54bbb42e76ab156c716d5820c7c))
-   open/close timing update ([d4ebcd3](https://github.com/adobe/spectrum-web-components/commit/d4ebcd36ed5a256f211186e6863c3eee2631fa3f))

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

### Bug Fixes

-   **overlay:** ensure CSS calcs resolve to the expected measurement value ([51a3feb](https://github.com/adobe/spectrum-web-components/commit/51a3feb2a42300de369aba06d7ec1eea92ffbd19))

### Features

-   **popover:** use core tokens ([68328cc](https://github.com/adobe/spectrum-web-components/commit/68328ccd01f44758caf987e02a17d88488f9046c))

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

### Bug Fixes

-   **overlay:** address review comments ([dd8b985](https://github.com/adobe/spectrum-web-components/commit/dd8b98524b5124267531a40b35d6cf542006c7a0))
-   **overlay:** removes use of px units in overlay stack ([122f96c](https://github.com/adobe/spectrum-web-components/commit/122f96c06ac2b5349acff0497fed1697264958f8))
-   **overlay:** stop the tab trapping if shadow root is not found ([4f0ec46](https://github.com/adobe/spectrum-web-components/commit/4f0ec464bcc807e3a789bb5fd323b468d978e4a2))

# 0.30.0 (2023-05-03)

### Bug Fixes

-   abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))
-   add content flow fallbacks to the position manager ([c008957](https://github.com/adobe/spectrum-web-components/commit/c0089571be599577f75b2fe7929b8ee26529358d))
-   allow "updateComplete" to resolve to a boolean like the LitElement default ([6127946](https://github.com/adobe/spectrum-web-components/commit/6127946fd3ffd048a30b7eb4bf6aadf9e7c8752a))
-   allow contextmenu event passing to pierce shadow roots ([05b69e9](https://github.com/adobe/spectrum-web-components/commit/05b69e90a56676c44e4757a6c2e19e6fe333b145))
-   allow detached elements to be used as content for an overlay ([3ad8383](https://github.com/adobe/spectrum-web-components/commit/3ad83837b6c9a693a4fc24501e3fc7fb2383a12b))
-   allow Picker to be reparented ([39e7309](https://github.com/adobe/spectrum-web-components/commit/39e73094be38888599fb189ed4d613f09476310f))
-   centralize updated first focusable selector ([300e84c](https://github.com/adobe/spectrum-web-components/commit/300e84c404d031ddad92b4952e48ad3332c4aafd))
-   close modal overlays with contextmenu events and pass those to the underlying page ([9e83f3c](https://github.com/adobe/spectrum-web-components/commit/9e83f3c0d2398323ebe941ba253d7a0dc0f40ba6))
-   constrain overlay to available window size ([9729b55](https://github.com/adobe/spectrum-web-components/commit/9729b55ef5246662aa50cbc8037bcaeb2f4ac74a))
-   correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
-   correct add/remove timing of overlay events ([474ec6e](https://github.com/adobe/spectrum-web-components/commit/474ec6e85840dc1efee8b134cc6e6163f228920f))
-   correct overlay closure order or operations for manual override ([0b7a8c4](https://github.com/adobe/spectrum-web-components/commit/0b7a8c42866ae4f2d38d90fa7b6dc34ed2c21759))
-   correct the relationship between overlayWillCloseCallback and phased animations ([c63db8d](https://github.com/adobe/spectrum-web-components/commit/c63db8d2ea4c942fbd52c6d5239ddd3f1ccea5b0))
-   delete the used cleanup method ([942ef0f](https://github.com/adobe/spectrum-web-components/commit/942ef0fdc6e7c89e4f554e032c7b9fb760ca47a0))
-   describe longpress button to screen readers ([acdcaf4](https://github.com/adobe/spectrum-web-components/commit/acdcaf49adbc701381bfdf1f95f12ab42f791a67))
-   **dialog:** updates for delivering dialog content accessibly ([f0ed33c](https://github.com/adobe/spectrum-web-components/commit/f0ed33c3351ae9bc2017202ede8cf206fbf395c2))
-   **dropdown:** correct conditional check ([a3a790f](https://github.com/adobe/spectrum-web-components/commit/a3a790f6c3f5f8f0837d619ca57c1090ab14e638))
-   ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
-   ensure focus is managed when tabbing out of a menu ([9bfa81d](https://github.com/adobe/spectrum-web-components/commit/9bfa81d8a677d6c0ab5ac5cd618498496761c69b))
-   ensure Overlay.update bypasses the auto close mechanism ([8f2aa2e](https://github.com/adobe/spectrum-web-components/commit/8f2aa2e98507298182356e8ea62e384680aedd2c))
-   ensure that an overlay can be released even if it does not complete its fade in animation ([4cbb36f](https://github.com/adobe/spectrum-web-components/commit/4cbb36f91569ce9b7f926437142950fc8fbd59f9))
-   ensure that entering an ancestor Menu Item without a submen closes related submenus ([efe5fa1](https://github.com/adobe/spectrum-web-components/commit/efe5fa1ff50c45487f370847444b940e1d6d8a4e))
-   expand sync offering for elements with overlay content ([0195843](https://github.com/adobe/spectrum-web-components/commit/0195843e9efac5760a78fa302d91139c84ea5747))
-   include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
-   include sync builds in publication configuration ([e731673](https://github.com/adobe/spectrum-web-components/commit/e731673e7d171af667fc87c5b6e521450143e8fe))
-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   keep parent overlays open when not closing child hover overlays ([643fcff](https://github.com/adobe/spectrum-web-components/commit/643fcff10b6e455611fda76040ea0d29ecac5df9))
-   leverage "dvh" rather than measured screen height ([84b9df0](https://github.com/adobe/spectrum-web-components/commit/84b9df0d101d9870a1b0c20eb34ba33fcdd0fbe1))
-   manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))
-   **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))
-   **overlay:** add overlay lifecycle methods to stack management ([9361527](https://github.com/adobe/spectrum-web-components/commit/9361527bc63896bcee2933d96b5021aa74386057))
-   **overlay:** allow [type="modal"] hover overlays to be closed ([5a6802b](https://github.com/adobe/spectrum-web-components/commit/5a6802bc06869cd255bdbfcc460f836c247f01fb))
-   **overlay:** allow external style access to "sp-theme" elements in overlays as a CSS part ([a107f66](https://github.com/adobe/spectrum-web-components/commit/a107f66ae171e857e5f84cfff9f7a27cc5bd320d))
-   **overlay:** allow overlay-trigger to declaratively open overlay content ([194a44e](https://github.com/adobe/spectrum-web-components/commit/194a44e78df73ca4a5520e24b308667c23331880))
-   **overlay:** close when overlay-trigger becomes [disabled] ([6f27e25](https://github.com/adobe/spectrum-web-components/commit/6f27e25658dd23949ef07c6df72c43768651482b))
-   **overlay:** correct overlay content sizing ([d9bcd6f](https://github.com/adobe/spectrum-web-components/commit/d9bcd6fd6b4eecae297c6e5cc5330e79a9e198ff))
-   **overlay:** do not focus the trigger when closing an overlay, unless expected ([21d7dfe](https://github.com/adobe/spectrum-web-components/commit/21d7dfeaa94919586bede27a9c7ae077a2d214a5))
-   **overlay:** enforce the full frame ([63628e9](https://github.com/adobe/spectrum-web-components/commit/63628e93de2daec632025f2659a86ff18e487a8e))
-   **overlay:** ensure overlay addition occurs after closing previous ([7d2b102](https://github.com/adobe/spectrum-web-components/commit/7d2b102f30731513639582fed8ed0e1b46d569cf))
-   **overlay:** ensure undefined data is not passed into theme ([3e2e1ca](https://github.com/adobe/spectrum-web-components/commit/3e2e1caa4c37eedf6e569b5124c9e59f207bb92f))
-   **overlay:** export OverlayTriggerInteractions type ([4caec7f](https://github.com/adobe/spectrum-web-components/commit/4caec7f33ec97ba7b21239c0be739b56885dac0a))
-   **overlay:** extend state machine to manage disposal process ([f0f26af](https://github.com/adobe/spectrum-web-components/commit/f0f26afef2870cf545afa120c8ece076ed241f21))
-   **overlay:** focus closure action on ancestor scroll, not participant resize ([925af0a](https://github.com/adobe/spectrum-web-components/commit/925af0af345fd0b9dc532efff052ac26ebdde80b))
-   **overlay:** handle hover/longpress more directly via the "open" attribute ([7b2b64b](https://github.com/adobe/spectrum-web-components/commit/7b2b64b6be931381a1ca1c83f941677fa06750ff))
-   **overlay:** init tab trapping on OverlayStack construction ([a3121e3](https://github.com/adobe/spectrum-web-components/commit/a3121e38df47fb528f8366cdb68e83417d78dc95))
-   **overlay:** measure initial overlay data offscreen ([fecda5a](https://github.com/adobe/spectrum-web-components/commit/fecda5a6f8e34261776c2d71c1f001c0cd76c3ce))
-   **overlay:** move "escape" listener to "keydown" ([813b341](https://github.com/adobe/spectrum-web-components/commit/813b3415ab16391e717e84a61c74b304a67c2e03))
-   **overlay:** new popper version tracks scroll through assigned slots ([ea2bac4](https://github.com/adobe/spectrum-web-components/commit/ea2bac4f7d9c4df98a6a65c19229ef1c18a74791))
-   **overlay:** only "tab trap" when you mean to ([74e1bd2](https://github.com/adobe/spectrum-web-components/commit/74e1bd2182785ec14f944bef8806ecc3e8d15c10))
-   **overlay:** override SpectrumCSS tip rules and process usage in popper ([aad3dec](https://github.com/adobe/spectrum-web-components/commit/aad3dece0f6452c9eef1e0d9b828ca8694c3a9a9))
-   **overlay:** persist hover overlay when there is not click content ([27111a9](https://github.com/adobe/spectrum-web-components/commit/27111a95831dc0dc846af8f889a9479294ab8515))
-   **overlay:** place return focus element on demand ([d262237](https://github.com/adobe/spectrum-web-components/commit/d2622374346c0a0f55419f87dd4399918c3aaa15))
-   **overlay:** reduce DOM and use of "display: contents" for simplicity and accessibility ([2e02075](https://github.com/adobe/spectrum-web-components/commit/2e0207583eb8514a54254b43214f2c9e39d98e81))
-   **overlay:** reduce the control active-overlay places on its content ([9d12571](https://github.com/adobe/spectrum-web-components/commit/9d12571e59dfc7afa52ce14b70f2fdad1b607de1))
-   **overlay:** remove trapped content from a11y tree, manage focus, open projected content ([6c496c0](https://github.com/adobe/spectrum-web-components/commit/6c496c0a930737b7fd74a565766ab41339691551))
-   **overlay:** remove unused dependency ([a3f3a72](https://github.com/adobe/spectrum-web-components/commit/a3f3a72993311e4218e635d4e6e6b1dab0ef5478))
-   **overlay:** reset cached values and applied CSS before "updating" overlays ([b871e52](https://github.com/adobe/spectrum-web-components/commit/b871e52950aaa3b1d7990d77e26b8285040ecb6e))
-   **overlay:** resolve async races with closeOverlays and manageOpen ([ff3738e](https://github.com/adobe/spectrum-web-components/commit/ff3738ea7afc12f258a7745777034ee70d6bf601))
-   **overlay:** track "modalRoots" for expanded overlay management ([dceccb1](https://github.com/adobe/spectrum-web-components/commit/dceccb1617d54da4c0db8035954a4eb4e0367c30))
-   **overlay:** traverse up through shadow roots when determining parent overlay ([27f232c](https://github.com/adobe/spectrum-web-components/commit/27f232c28d30288b75187b80744b2581d6017b77))
-   **overlay:** use esm build from popper and point through to types ([078ca0f](https://github.com/adobe/spectrum-web-components/commit/078ca0fb9bc43d1ee5288e641ff1ec49f40e8df5))
-   **overlay:** use isolatedModules in tsconfig ([48d6069](https://github.com/adobe/spectrum-web-components/commit/48d60694ad5d6014b8664f515e698651f55c9e5f))
-   **overlay:** use tabindex=-1 but always remove it on open ([6047003](https://github.com/adobe/spectrum-web-components/commit/6047003eca58232f90a0c6b2ab0e5bd9fb678eb7))
-   **overlay:** vend a VirtualTrigger for overlays with no element trigger ([a359c60](https://github.com/adobe/spectrum-web-components/commit/a359c6078aa4fac3c9a7bd140609acd4d9aed81d))
-   **picker:** use "modal" as the menu overlay interaction ([c8fbbe2](https://github.com/adobe/spectrum-web-components/commit/c8fbbe27b19702909855575b1afd38fb064e8378))
-   prevent "hover" overlays from receiving focus ([7bd5ac2](https://github.com/adobe/spectrum-web-components/commit/7bd5ac26589f4248bdcde1ee3a168052b5a7bf20))
-   prevent "hover" overlays from returning focus to the root of a parent modal ([ceb8fa7](https://github.com/adobe/spectrum-web-components/commit/ceb8fa73d23f6c9ccb6f2a00c18708d496975473))
-   prevent leaving multiple submenus open at a time ([d2bfbb2](https://github.com/adobe/spectrum-web-components/commit/d2bfbb2d8334ae1a6bd21381092d54914b8f708c))
-   prevent longpress when interacting with context menu ([f8b0732](https://github.com/adobe/spectrum-web-components/commit/f8b07321741ee44515fced9923167b96561cdd48))
-   prevent touch scolling on non-modal content ([e471feb](https://github.com/adobe/spectrum-web-components/commit/e471febf14e64d35b57ebc0c1596c52282a6ff2a))
-   special case the possibility of leaving an overlay trigger by entering its overlay content ([c32a075](https://github.com/adobe/spectrum-web-components/commit/c32a075e0e80d89e9c71dea4a9529971691c1098))
-   **theme:** track default theme values dynamically ([a0c306c](https://github.com/adobe/spectrum-web-components/commit/a0c306c9682d97cefa1258e01ce6eee179f0e071))
-   **tooltip:** correct arrow orientation, remove popper-arrow-rotate ([fcd6ea2](https://github.com/adobe/spectrum-web-components/commit/fcd6ea28ef5e4f06a07994ebd8f8b9be1a934eb2))
-   update "reparentChildren" types for flexibility ([2d358be](https://github.com/adobe/spectrum-web-components/commit/2d358be094cf73785d0858545ccd0f9ca2aa8db0))
-   update presence confirmation so popper is available on update ([24f8380](https://github.com/adobe/spectrum-web-components/commit/24f83800a2011f9181947795d9249b87be99f8ab))
-   update screen reader interface with menu items list ([16756b5](https://github.com/adobe/spectrum-web-components/commit/16756b56c0f7f9561426acc202997fb098e8f19a))
-   update when events are added to manage overlays ([60cddac](https://github.com/adobe/spectrum-web-components/commit/60cddac69554d00095aee492608d85d6513c8928))
-   use "fixed" strategy to prevent unexpected overlay placement ([e39e108](https://github.com/adobe/spectrum-web-components/commit/e39e108def1336adabb21823d1454e917fd38599))
-   use height: 100% to avoid layout breaks ([1498129](https://github.com/adobe/spectrum-web-components/commit/14981291e6d860a8fde7e1746a4a03af4df1e572))
-   use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))
-   use less restrictive overlay sizing ([f6917aa](https://github.com/adobe/spectrum-web-components/commit/f6917aa4ca22360ba66e40fc933c0e994a04b8c9))
-   use typescript@^4.5 for "native" document.fonts typings ([a3e4aea](https://github.com/adobe/spectrum-web-components/commit/a3e4aea802c796e9029b2bc32f58639954db831b))
-   wait for fonts ready before positioning overlays ([cb8026a](https://github.com/adobe/spectrum-web-components/commit/cb8026a1999a4458b442673291214269fc1e1cef))

### Features

-   add open/close events for some menus and overlays ([17f0a58](https://github.com/adobe/spectrum-web-components/commit/17f0a58722fdfee39653c2abde048391f7f24564))
-   add support for Spectrum Express ([12bfe99](https://github.com/adobe/spectrum-web-components/commit/12bfe99570122514fa88ce1a4e4a1591bcc5aa70))
-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
-   allow activation of longpress content ([55e71fd](https://github.com/adobe/spectrum-web-components/commit/55e71fdf9fd5dde489871c3d9798ef8957f4e5b6))
-   delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))
-   **dropdown:** open menu UI with overlay system ([9811eeb](https://github.com/adobe/spectrum-web-components/commit/9811eebc33d892da46752981f5bfa49c42ab1192))
-   **field-group:** add field-group pattern ([f8d265c](https://github.com/adobe/spectrum-web-components/commit/f8d265c3352f4a97fc103a09ce8eb56511dcedbb))
-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
-   join overlay-root and overlay-trigger as overlay ([dcde42c](https://github.com/adobe/spectrum-web-components/commit/dcde42c118b76bf8466c7475611e95783a1dcb3d))
-   leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
-   leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))
-   **overlay:** manage focus throwing and tab trapping ([27a0b53](https://github.com/adobe/spectrum-web-components/commit/27a0b53ea94d19bb18b7d3f89763b06dc1b42b59))
-   **overlay:** move entire package behind dynamic import by default ([9b0a74d](https://github.com/adobe/spectrum-web-components/commit/9b0a74de1f32ccd8cde6cabe4c06f990064f11ae))
-   **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))
-   **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))
-   **progress-bar:** use core tokens ([540552e](https://github.com/adobe/spectrum-web-components/commit/540552ecda4cfab4f26045a6ef2ed58457190ab9))
-   reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))
-   rework overlays to use popper ([e17d1bb](https://github.com/adobe/spectrum-web-components/commit/e17d1bb23082b788ea921ec15315ea955e2596eb))
-   shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
-   **sidenav:** add keyboard accessibility ([6ff622b](https://github.com/adobe/spectrum-web-components/commit/6ff622bf89ad319a7d464fbdd2477c7b55b65cdd))
-   **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))
-   **story-decorator:** add story decorator to replace knobs for theme application ([7c0c6be](https://github.com/adobe/spectrum-web-components/commit/7c0c6be37d58ad3e6d8973e8d4f5ccc587bf55af))
-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
-   use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

-   use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

### Reverts

-   Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))

## [0.19.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.19.4...@spectrum-web-components/overlay@0.19.5) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.19.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.19.3...@spectrum-web-components/overlay@0.19.4) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.19.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.19.2...@spectrum-web-components/overlay@0.19.3) (2023-03-22)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.19.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.19.1...@spectrum-web-components/overlay@0.19.2) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.19.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.19.0...@spectrum-web-components/overlay@0.19.1) (2023-02-13)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.19.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.11...@spectrum-web-components/overlay@0.19.0) (2023-02-08)

### Features

-   **progress-bar:** use core tokens ([540552e](https://github.com/adobe/spectrum-web-components/commit/540552ecda4cfab4f26045a6ef2ed58457190ab9))

## [0.18.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.10...@spectrum-web-components/overlay@0.18.11) (2023-01-23)

### Bug Fixes

-   **overlay:** reset cached values and applied CSS before "updating" overlays ([b871e52](https://github.com/adobe/spectrum-web-components/commit/b871e52950aaa3b1d7990d77e26b8285040ecb6e))

## [0.18.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.9...@spectrum-web-components/overlay@0.18.10) (2023-01-09)

### Bug Fixes

-   use "fixed" strategy to prevent unexpected overlay placement ([e39e108](https://github.com/adobe/spectrum-web-components/commit/e39e108def1336adabb21823d1454e917fd38599))

## [0.18.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.8...@spectrum-web-components/overlay@0.18.9) (2022-12-08)

### Bug Fixes

-   ensure Overlay.update bypasses the auto close mechanism ([8f2aa2e](https://github.com/adobe/spectrum-web-components/commit/8f2aa2e98507298182356e8ea62e384680aedd2c))
-   leverage "dvh" rather than measured screen height ([84b9df0](https://github.com/adobe/spectrum-web-components/commit/84b9df0d101d9870a1b0c20eb34ba33fcdd0fbe1))

## [0.18.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.7...@spectrum-web-components/overlay@0.18.8) (2022-11-21)

### Bug Fixes

-   ensure that an overlay can be released even if it does not complete its fade in animation ([4cbb36f](https://github.com/adobe/spectrum-web-components/commit/4cbb36f91569ce9b7f926437142950fc8fbd59f9))
-   **overlay:** focus closure action on ancestor scroll, not participant resize ([925af0a](https://github.com/adobe/spectrum-web-components/commit/925af0af345fd0b9dc532efff052ac26ebdde80b))

## [0.18.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.6...@spectrum-web-components/overlay@0.18.7) (2022-11-14)

### Bug Fixes

-   keep parent overlays open when not closing child hover overlays ([643fcff](https://github.com/adobe/spectrum-web-components/commit/643fcff10b6e455611fda76040ea0d29ecac5df9))

## [0.18.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.5...@spectrum-web-components/overlay@0.18.6) (2022-10-28)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.18.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.4...@spectrum-web-components/overlay@0.18.5) (2022-10-17)

### Bug Fixes

-   correct the relationship between overlayWillCloseCallback and phased animations ([c63db8d](https://github.com/adobe/spectrum-web-components/commit/c63db8d2ea4c942fbd52c6d5239ddd3f1ccea5b0))
-   **overlay:** init tab trapping on OverlayStack construction ([a3121e3](https://github.com/adobe/spectrum-web-components/commit/a3121e38df47fb528f8366cdb68e83417d78dc95))

## [0.18.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.3...@spectrum-web-components/overlay@0.18.4) (2022-10-10)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.18.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.2...@spectrum-web-components/overlay@0.18.3) (2022-09-15)

### Bug Fixes

-   special case the possibility of leaving an overlay trigger by entering its overlay content ([c32a075](https://github.com/adobe/spectrum-web-components/commit/c32a075e0e80d89e9c71dea4a9529971691c1098))

## [0.18.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.1...@spectrum-web-components/overlay@0.18.2) (2022-09-14)

### Bug Fixes

-   **overlay:** move "escape" listener to "keydown" ([813b341](https://github.com/adobe/spectrum-web-components/commit/813b3415ab16391e717e84a61c74b304a67c2e03))

## [0.18.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.0...@spectrum-web-components/overlay@0.18.1) (2022-08-24)

### Bug Fixes

-   prevent "hover" overlays from returning focus to the root of a parent modal ([ceb8fa7](https://github.com/adobe/spectrum-web-components/commit/ceb8fa73d23f6c9ccb6f2a00c18708d496975473))
-   prevent longpress when interacting with context menu ([f8b0732](https://github.com/adobe/spectrum-web-components/commit/f8b07321741ee44515fced9923167b96561cdd48))

# [0.18.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.17.0...@spectrum-web-components/overlay@0.18.0) (2022-08-09)

### Features

-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

# [0.17.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.5...@spectrum-web-components/overlay@0.17.0) (2022-08-04)

### Bug Fixes

-   **overlay:** export OverlayTriggerInteractions type ([4caec7f](https://github.com/adobe/spectrum-web-components/commit/4caec7f33ec97ba7b21239c0be739b56885dac0a))

### Features

-   delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))

## [0.16.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.4...@spectrum-web-components/overlay@0.16.5) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.16.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.3...@spectrum-web-components/overlay@0.16.4) (2022-06-29)

### Bug Fixes

-   ensure that entering an ancestor Menu Item without a submen closes related submenus ([efe5fa1](https://github.com/adobe/spectrum-web-components/commit/efe5fa1ff50c45487f370847444b940e1d6d8a4e))

## [0.16.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.2...@spectrum-web-components/overlay@0.16.3) (2022-06-07)

### Bug Fixes

-   prevent leaving multiple submenus open at a time ([d2bfbb2](https://github.com/adobe/spectrum-web-components/commit/d2bfbb2d8334ae1a6bd21381092d54914b8f708c))

## [0.16.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.1...@spectrum-web-components/overlay@0.16.2) (2022-05-27)

### Bug Fixes

-   add content flow fallbacks to the position manager ([c008957](https://github.com/adobe/spectrum-web-components/commit/c0089571be599577f75b2fe7929b8ee26529358d))
-   prevent "hover" overlays from receiving focus ([7bd5ac2](https://github.com/adobe/spectrum-web-components/commit/7bd5ac26589f4248bdcde1ee3a168052b5a7bf20))

## [0.16.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.0...@spectrum-web-components/overlay@0.16.1) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.16.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.15.3...@spectrum-web-components/overlay@0.16.0) (2022-04-21)

### Bug Fixes

-   allow Picker to be reparented ([39e7309](https://github.com/adobe/spectrum-web-components/commit/39e73094be38888599fb189ed4d613f09476310f))
-   use less restrictive overlay sizing ([f6917aa](https://github.com/adobe/spectrum-web-components/commit/f6917aa4ca22360ba66e40fc933c0e994a04b8c9))

### Features

-   add support for Spectrum Express ([12bfe99](https://github.com/adobe/spectrum-web-components/commit/12bfe99570122514fa88ce1a4e4a1591bcc5aa70))
-   reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))

## [0.15.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.15.2...@spectrum-web-components/overlay@0.15.3) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.15.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.15.1...@spectrum-web-components/overlay@0.15.2) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.15.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.15.0...@spectrum-web-components/overlay@0.15.1) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.15.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.14.1...@spectrum-web-components/overlay@0.15.0) (2022-03-04)

### Bug Fixes

-   **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))

### Features

-   leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))

## [0.14.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.14.0...@spectrum-web-components/overlay@0.14.1) (2022-02-22)

### Bug Fixes

-   **dialog:** updates for delivering dialog content accessibly ([f0ed33c](https://github.com/adobe/spectrum-web-components/commit/f0ed33c3351ae9bc2017202ede8cf206fbf395c2))
-   **overlay:** measure initial overlay data offscreen ([fecda5a](https://github.com/adobe/spectrum-web-components/commit/fecda5a6f8e34261776c2d71c1f001c0cd76c3ce))

# [0.14.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.4...@spectrum-web-components/overlay@0.14.0) (2022-02-02)

### Features

-   **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))

## [0.13.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.3...@spectrum-web-components/overlay@0.13.4) (2022-01-26)

### Bug Fixes

-   **overlay:** remove unused dependency ([a3f3a72](https://github.com/adobe/spectrum-web-components/commit/a3f3a72993311e4218e635d4e6e6b1dab0ef5478))

## [0.13.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.2...@spectrum-web-components/overlay@0.13.3) (2022-01-26)

### Bug Fixes

-   describe longpress button to screen readers ([acdcaf4](https://github.com/adobe/spectrum-web-components/commit/acdcaf49adbc701381bfdf1f95f12ab42f791a67))

## [0.13.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.1...@spectrum-web-components/overlay@0.13.2) (2022-01-07)

### Bug Fixes

-   **overlay:** reduce DOM and use of "display: contents" for simplicity and accessibility ([2e02075](https://github.com/adobe/spectrum-web-components/commit/2e0207583eb8514a54254b43214f2c9e39d98e81))

## [0.13.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.0...@spectrum-web-components/overlay@0.13.1) (2021-12-13)

### Bug Fixes

-   use typescript@^4.5 for "native" document.fonts typings ([a3e4aea](https://github.com/adobe/spectrum-web-components/commit/a3e4aea802c796e9029b2bc32f58639954db831b))

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.12.1...@spectrum-web-components/overlay@0.13.0) (2021-11-08)

### Features

-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.12.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.12.0...@spectrum-web-components/overlay@0.12.1) (2021-11-08)

### Bug Fixes

-   abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))
-   prevent touch scolling on non-modal content ([e471feb](https://github.com/adobe/spectrum-web-components/commit/e471febf14e64d35b57ebc0c1596c52282a6ff2a))

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.16...@spectrum-web-components/overlay@0.12.0) (2021-11-02)

### Bug Fixes

-   centralize updated first focusable selector ([300e84c](https://github.com/adobe/spectrum-web-components/commit/300e84c404d031ddad92b4952e48ad3332c4aafd))
-   update screen reader interface with menu items list ([16756b5](https://github.com/adobe/spectrum-web-components/commit/16756b56c0f7f9561426acc202997fb098e8f19a))
-   **picker:** use "modal" as the menu overlay interaction ([c8fbbe2](https://github.com/adobe/spectrum-web-components/commit/c8fbbe27b19702909855575b1afd38fb064e8378))

### Features

-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.11.16](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.15...@spectrum-web-components/overlay@0.11.16) (2021-10-12)

### Bug Fixes

-   **overlay:** allow [type="modal"] hover overlays to be closed ([5a6802b](https://github.com/adobe/spectrum-web-components/commit/5a6802bc06869cd255bdbfcc460f836c247f01fb))
-   **overlay:** resolve async races with closeOverlays and manageOpen ([ff3738e](https://github.com/adobe/spectrum-web-components/commit/ff3738ea7afc12f258a7745777034ee70d6bf601))
-   **overlay:** traverse up through shadow roots when determining parent overlay ([27f232c](https://github.com/adobe/spectrum-web-components/commit/27f232c28d30288b75187b80744b2581d6017b77))

## [0.11.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.14...@spectrum-web-components/overlay@0.11.15) (2021-09-20)

### Bug Fixes

-   allow contextmenu event passing to pierce shadow roots ([05b69e9](https://github.com/adobe/spectrum-web-components/commit/05b69e90a56676c44e4757a6c2e19e6fe333b145))
-   correct add/remove timing of overlay events ([474ec6e](https://github.com/adobe/spectrum-web-components/commit/474ec6e85840dc1efee8b134cc6e6163f228920f))

## [0.11.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.13...@spectrum-web-components/overlay@0.11.14) (2021-09-13)

### Bug Fixes

-   close modal overlays with contextmenu events and pass those to the underlying page ([9e83f3c](https://github.com/adobe/spectrum-web-components/commit/9e83f3c0d2398323ebe941ba253d7a0dc0f40ba6))

## [0.11.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.12...@spectrum-web-components/overlay@0.11.13) (2021-08-24)

### Bug Fixes

-   correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.11.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.11...@spectrum-web-components/overlay@0.11.12) (2021-08-17)

### Bug Fixes

-   update when events are added to manage overlays ([60cddac](https://github.com/adobe/spectrum-web-components/commit/60cddac69554d00095aee492608d85d6513c8928))

## [0.11.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.10...@spectrum-web-components/overlay@0.11.11) (2021-08-03)

### Bug Fixes

-   allow "updateComplete" to resolve to a boolean like the LitElement default ([6127946](https://github.com/adobe/spectrum-web-components/commit/6127946fd3ffd048a30b7eb4bf6aadf9e7c8752a))
-   expand sync offering for elements with overlay content ([0195843](https://github.com/adobe/spectrum-web-components/commit/0195843e9efac5760a78fa302d91139c84ea5747))

## [0.11.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.9...@spectrum-web-components/overlay@0.11.10) (2021-07-22)

### Bug Fixes

-   **overlay:** allow external style access to "sp-theme" elements in overlays as a CSS part ([a107f66](https://github.com/adobe/spectrum-web-components/commit/a107f66ae171e857e5f84cfff9f7a27cc5bd320d))
-   delete the used cleanup method ([942ef0f](https://github.com/adobe/spectrum-web-components/commit/942ef0fdc6e7c89e4f554e032c7b9fb760ca47a0))

## [0.11.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.8...@spectrum-web-components/overlay@0.11.9) (2021-07-01)

### Bug Fixes

-   allow detached elements to be used as content for an overlay ([3ad8383](https://github.com/adobe/spectrum-web-components/commit/3ad83837b6c9a693a4fc24501e3fc7fb2383a12b))
-   manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))

## [0.11.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.7...@spectrum-web-components/overlay@0.11.8) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.11.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.6...@spectrum-web-components/overlay@0.11.7) (2021-06-07)

### Bug Fixes

-   ensure focus is managed when tabbing out of a menu ([9bfa81d](https://github.com/adobe/spectrum-web-components/commit/9bfa81d8a677d6c0ab5ac5cd618498496761c69b))
-   **overlay:** vend a VirtualTrigger for overlays with no element trigger ([a359c60](https://github.com/adobe/spectrum-web-components/commit/a359c6078aa4fac3c9a7bd140609acd4d9aed81d))

## [0.11.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.5...@spectrum-web-components/overlay@0.11.6) (2021-05-24)

### Bug Fixes

-   **overlay:** add overlay lifecycle methods to stack management ([9361527](https://github.com/adobe/spectrum-web-components/commit/9361527bc63896bcee2933d96b5021aa74386057))
-   **overlay:** use tabindex=-1 but always remove it on open ([6047003](https://github.com/adobe/spectrum-web-components/commit/6047003eca58232f90a0c6b2ab0e5bd9fb678eb7))

## [0.11.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.4...@spectrum-web-components/overlay@0.11.5) (2021-05-12)

### Bug Fixes

-   **overlay:** reduce the control active-overlay places on its content ([9d12571](https://github.com/adobe/spectrum-web-components/commit/9d12571e59dfc7afa52ce14b70f2fdad1b607de1))
-   update "reparentChildren" types for flexibility ([2d358be](https://github.com/adobe/spectrum-web-components/commit/2d358be094cf73785d0858545ccd0f9ca2aa8db0))
-   update presence confirmation so popper is available on update ([24f8380](https://github.com/adobe/spectrum-web-components/commit/24f83800a2011f9181947795d9249b87be99f8ab))

## [0.11.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.3...@spectrum-web-components/overlay@0.11.4) (2021-04-15)

**Note:** Version bump only for package @spectrum-web-components/overlay

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
