# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

### Bug Fixes

-   **base:** ensure streaming listener "streams" on the animation frame ([1478db1](https://github.com/adobe/spectrum-web-components/commit/1478db115cfe3aa9278bcfafb57b1d8b77d25b32))

### Features

-   **popover:** use core tokens ([68328cc](https://github.com/adobe/spectrum-web-components/commit/68328ccd01f44758caf987e02a17d88488f9046c))
-   **slider:** use spectrum-tokens ([8b1e72c](https://github.com/adobe/spectrum-web-components/commit/8b1e72c2876a6480421490509eb3b4def00a7a5f))

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/slider

# 0.30.0 (2023-05-03)

### Bug Fixes

-   add "editable" option to "sp-slider" ([e86d7fa](https://github.com/adobe/spectrum-web-components/commit/e86d7fa84491b41a39dbab9c8d85eec42df320cd))
-   allow tick labels to start counting from "min" ([e7e44e3](https://github.com/adobe/spectrum-web-components/commit/e7e44e31fcb4c77259990777ca24fb22db54c40a))
-   apply Focuable styles in class extensions ([38f7afd](https://github.com/adobe/spectrum-web-components/commit/38f7afd7cdb317d5c8b6e69f1301decd21364b1d))
-   convert the langage resolution workflow to a Reactive Controller ([b7781db](https://github.com/adobe/spectrum-web-components/commit/b7781db820620688f97a40225fb17a10e7881178))
-   correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
-   correct slider math in RTL contexts ([4d73fa9](https://github.com/adobe/spectrum-web-components/commit/4d73fa9716293fdf415943586a01d96ede251032))
-   ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
-   ensure dependencies included in package.json ([eb77858](https://github.com/adobe/spectrum-web-components/commit/eb778588c8bd75a9801d568c348096aecb74614a))
-   ensure lazily loaded focusElements do not crash ([64f2a54](https://github.com/adobe/spectrum-web-components/commit/64f2a54a5a6934306e97433e8102da6fe38b2660))
-   ensure reactivity of resolved language ([5863a15](https://github.com/adobe/spectrum-web-components/commit/5863a155262d6ba6898f82bff49aed55a6eae4f4))
-   ensure streamingListener ends even if pointercancel not fired ([74105f2](https://github.com/adobe/spectrum-web-components/commit/74105f23d30f549f18040cc7d05b99c9b746871a))
-   fast forward changes in [#2905](https://github.com/adobe/spectrum-web-components/issues/2905) ([3a30b27](https://github.com/adobe/spectrum-web-components/commit/3a30b27615aec5642918600727648d3f7a35908c))
-   flappy Slider/Color Area tests ([c769c87](https://github.com/adobe/spectrum-web-components/commit/c769c8750a66139588191a8289abf13df7012c46))
-   include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716f2f787deb8d868a78bd28c8e62fe90e21))
-   include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   include touch-action rule for draggable content ([53221da](https://github.com/adobe/spectrum-web-components/commit/53221dabc8911749372994cc0fabe55f36858680))
-   include touch-action rule for draggable content ([3f507e6](https://github.com/adobe/spectrum-web-components/commit/3f507e6dba718ae2b7415454eba859a9790e43e7))
-   manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))
-   manage updated node types ([0517fc1](https://github.com/adobe/spectrum-web-components/commit/0517fc19536325332543f95f5ecc0d6cb0c786c5))
-   normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cdac98282c886f23c4a8d6cf4910c4a606c))
-   prevent active pointer events when slider toggles to [disabled] ([ceb4d74](https://github.com/adobe/spectrum-web-components/commit/ceb4d74abdbfb622e4a3cc17fc1e0b248af4df12))
-   prevent mobile interactions from triggering the virtual keyboard ([d06ad17](https://github.com/adobe/spectrum-web-components/commit/d06ad17f12b77f791c8710567ae9bf2d4b26278f))
-   prevent tabindex=-1 elements from placing focus on their host ([1ac1293](https://github.com/adobe/spectrum-web-components/commit/1ac12931771c6d5fdbc99f5d214702ed644cb81a))
-   remove right click value setting ([a44968d](https://github.com/adobe/spectrum-web-components/commit/a44968d09120ad9b54915438fb5a134f306fdab2))
-   resolve "updateComplete" with a boolean like LitElement ([2ebcd44](https://github.com/adobe/spectrum-web-components/commit/2ebcd449185a2a26b8ca60441793048a76bb3ed7))
-   simplify touch-action application ([d23f735](https://github.com/adobe/spectrum-web-components/commit/d23f735db3cea01c2243e0485448d1598c6a8692))
-   **slider:** add less visually effectacious style to the slider output when editable ([8702294](https://github.com/adobe/spectrum-web-components/commit/8702294fb19da70a70ddadb1e9ed1b401ccc8d91))
-   **slider:** add quiet and indeterminate ([8990573](https://github.com/adobe/spectrum-web-components/commit/8990573a4d946920b97117e87f8776c0e7214b04))
-   **slider:** allow irregular tick spacing and correct RTL value application ([a83f879](https://github.com/adobe/spectrum-web-components/commit/a83f879bfef87b928452104a47b45201ab30ee89))
-   **slider:** allow pointer interactions that start at the very begin/end to be tracked ([ff8c95c](https://github.com/adobe/spectrum-web-components/commit/ff8c95c6a1c7be3da0bed162064302591712d275))
-   **slider:** allow slot based label content ([d2d474e](https://github.com/adobe/spectrum-web-components/commit/d2d474e9385b3445aff3ca152c70ee12ecf6b3fb))
-   **slider:** apply "handle.highlight = true" when using the keyboard to interact with handles ([94e6349](https://github.com/adobe/spectrum-web-components/commit/94e6349a7750b43c455377cb096a24072d668056))
-   **slider:** dispatch synthetic pointerdown event ([7dc74af](https://github.com/adobe/spectrum-web-components/commit/7dc74afdda380184906cceadf4eb528b6106792c))
-   **slider:** ensure "sp-slider:input" is dispatched appropriately ([ded5440](https://github.com/adobe/spectrum-web-components/commit/ded544078d56d4358e6767e2a68d5151787695da))
-   **slider:** ensure min/max/value application order ([80e8cb5](https://github.com/adobe/spectrum-web-components/commit/80e8cb54d0868ce3f4451c3451e95a89b8b5a229))
-   **slider:** ensure pointer events on the track and handle act the same ([03adb36](https://github.com/adobe/spectrum-web-components/commit/03adb367fd945c2c07cc8e6179207fc4e654fc0a))
-   **slider:** ensure that handles are upgraded before extracting a model from them ([bbbb21f](https://github.com/adobe/spectrum-web-components/commit/bbbb21faba2111480441a30224a3c26ad9858441))
-   **slider:** ensure track widths follow dynamic Spectrum CSS values ([5ad1c1a](https://github.com/adobe/spectrum-web-components/commit/5ad1c1aef32cd2988fd86a4c48f19173d6c9c0c2))
-   **slider:** ensure value is bound as a property ([96bd01a](https://github.com/adobe/spectrum-web-components/commit/96bd01aacfddfe3a51524c59d346f57e0ac346b0))
-   **slider:** fixes usage of aria-valuetext, adds aria-valuenow ([4b25a89](https://github.com/adobe/spectrum-web-components/commit/4b25a89d6018a8929c3b777cc196354d93d0af69))
-   **slider:** make implicit dependency on sp-slider-handle explicit ([cb8d84b](https://github.com/adobe/spectrum-web-components/commit/cb8d84b55beb968fcb92198854321d66ce01cbf4))
-   **slider:** manage focus more like a native rage input ([865115e](https://github.com/adobe/spectrum-web-components/commit/865115e1e43e164952eeca01b473c9606762377a))
-   **slider:** manage value and max changing in unison ([4359fbe](https://github.com/adobe/spectrum-web-components/commit/4359fbee9ce545064f35aee5e0c6a1dadd11ddd6))
-   **slider:** prevent pointercancel events by container touch-action ([4687d03](https://github.com/adobe/spectrum-web-components/commit/4687d03c2b1ea1de3cb76d6ed3782e56153d271f))
-   **slider:** renamed flag from stepperActive to managed input to allow verified (scroll) input event ([89d6ac5](https://github.com/adobe/spectrum-web-components/commit/89d6ac5a197c55ff8dae9932996fbb8c953bcfb2))
-   **slider:** response to orientation changes when measuring the bounding box ([c1412f1](https://github.com/adobe/spectrum-web-components/commit/c1412f19a5e91dd518b51277d3bbed3aff6dafac))
-   **slider:** simplify application of the gradient backgrounds ([f96a97e](https://github.com/adobe/spectrum-web-components/commit/f96a97eafab63358de3b438d84a2af521250f4ed))
-   **slider:** support customizing visible label delivery ([a55b585](https://github.com/adobe/spectrum-web-components/commit/a55b58517f0f20df356a523a14550d8870b7282a))
-   **slider:** support non-supported units in "Intl.numberFormat" ([ac32355](https://github.com/adobe/spectrum-web-components/commit/ac32355f3d6459937b025d2fce9f006b0226622e))
-   **slider:** update a11y tree and default max value ([3cbf222](https://github.com/adobe/spectrum-web-components/commit/3cbf222386d53cdd77847bb9093f494e542c9195))
-   **slider:** use internal "input" for value sanitation ([dd588c9](https://github.com/adobe/spectrum-web-components/commit/dd588c93003a9e9c10da4832590403ebc9e46020))
-   **slider:** use standard "change" and "input" events ([59cf786](https://github.com/adobe/spectrum-web-components/commit/59cf7866a9b7b7368ccf01d237534a495274af32))
-   **slider:** work around Spectrum CSS bug in variant="range" styling ([e5810a9](https://github.com/adobe/spectrum-web-components/commit/e5810a9c8304f90a2d6f78ea9f1c911fb37d037f))
-   stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
-   update consumption of Spectrum CSS for latest version ([ed2305b](https://github.com/adobe/spectrum-web-components/commit/ed2305b7334c973ea5c8299cbbce33a365896329))
-   update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
-   update method extension types to match ([6eb686f](https://github.com/adobe/spectrum-web-components/commit/6eb686fbc7ad336ec245fbf2edd6aa769486533c))
-   update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
-   update spelling ([283d10a](https://github.com/adobe/spectrum-web-components/commit/283d10acf09f1c3a2575d5dd263559d0c63a69fa))
-   update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
-   use ObserveSlotText mixin to prevent white space from overriding label attribute ([610fb4b](https://github.com/adobe/spectrum-web-components/commit/610fb4b5b392b7e3673c7d46bf8f9f5f79f27ca9))
-   use the "browsers" listing in postcss-preset-env ([4eaf6a2](https://github.com/adobe/spectrum-web-components/commit/4eaf6a28f7b5eaf60487841d264d6d804ae675ce))

### Features

-   **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
-   delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))
-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
-   leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
-   multi-handle slider implementation ([8d5a743](https://github.com/adobe/spectrum-web-components/commit/8d5a74309ec171107a9504695216cb90abe39023)), closes [#1385](https://github.com/adobe/spectrum-web-components/issues/1385)
-   shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
-   **slider:** add "ramp" and "tick" variant support ([bb98bb6](https://github.com/adobe/spectrum-web-components/commit/bb98bb6e1e7ac7b795c29b5085e7ebef57d8ca94))
-   **slider:** adds getAriaValueText property, fixes [#381](https://github.com/adobe/spectrum-web-components/issues/381) ([5800915](https://github.com/adobe/spectrum-web-components/commit/5800915bb805022cbe4c8ea822631c11da03fc98))
-   **slider:** mouse event fallback from pointer events ([b69e7fc](https://github.com/adobe/spectrum-web-components/commit/b69e7fc23966386097e0cad22c56ab02f70abcae))
-   **slider:** support tick labels and tick steps ([1ccf8d6](https://github.com/adobe/spectrum-web-components/commit/1ccf8d6f2ac33843c6cb27e2e86f0943aab31a6d))
-   **slider:** update "value" default to match browser native range input ([0050f63](https://github.com/adobe/spectrum-web-components/commit/0050f633ad2a0d7db192af0e8a77f6b7c646a256))
-   **slider:** update spectrum css input ([21ebe36](https://github.com/adobe/spectrum-web-components/commit/21ebe36d600501771c3382e987f4e22753c36262))
-   **slider:** use latest @spectrum-css/slider beta ([9f29bbe](https://github.com/adobe/spectrum-web-components/commit/9f29bbee3a43c092f4ee141e18a96fe0dfa4fba4))
-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
-   update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))
-   use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc77960de8e57dd9c49bb7669df689f0ebaa))
-   use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/39188887afad9bec52ef48d4e22596f9b757a9fe))
-   use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

-   use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))
-   use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0accd643c2f35cbf1ba809b54f52c25628d))

### Reverts

-   Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))

## [0.15.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.10...@spectrum-web-components/slider@0.15.11) (2023-04-24)

### Bug Fixes

-   ensure streamingListener ends even if pointercancel not fired ([74105f2](https://github.com/adobe/spectrum-web-components/commit/74105f23d30f549f18040cc7d05b99c9b746871a))
-   fast forward changes in [#2905](https://github.com/adobe/spectrum-web-components/issues/2905) ([3a30b27](https://github.com/adobe/spectrum-web-components/commit/3a30b27615aec5642918600727648d3f7a35908c))

## [0.15.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.9...@spectrum-web-components/slider@0.15.10) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.15.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.8...@spectrum-web-components/slider@0.15.9) (2023-03-22)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.15.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.7...@spectrum-web-components/slider@0.15.8) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.15.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.6...@spectrum-web-components/slider@0.15.7) (2023-02-13)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.15.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.5...@spectrum-web-components/slider@0.15.6) (2023-02-08)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.15.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.4...@spectrum-web-components/slider@0.15.5) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.15.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.3...@spectrum-web-components/slider@0.15.4) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.15.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.2...@spectrum-web-components/slider@0.15.3) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.15.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.1...@spectrum-web-components/slider@0.15.2) (2022-11-21)

### Bug Fixes

-   ensure dependencies included in package.json ([eb77858](https://github.com/adobe/spectrum-web-components/commit/eb778588c8bd75a9801d568c348096aecb74614a))

## [0.15.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.15.0...@spectrum-web-components/slider@0.15.1) (2022-11-14)

### Bug Fixes

-   ensure reactivity of resolved language ([5863a15](https://github.com/adobe/spectrum-web-components/commit/5863a155262d6ba6898f82bff49aed55a6eae4f4))
-   **slider:** add less visually effectacious style to the slider output when editable ([8702294](https://github.com/adobe/spectrum-web-components/commit/8702294fb19da70a70ddadb1e9ed1b401ccc8d91))

# [0.15.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.14.4...@spectrum-web-components/slider@0.15.0) (2022-10-28)

### Bug Fixes

-   manage updated node types ([0517fc1](https://github.com/adobe/spectrum-web-components/commit/0517fc19536325332543f95f5ecc0d6cb0c786c5))

### Features

-   **slider:** update "value" default to match browser native range input ([0050f63](https://github.com/adobe/spectrum-web-components/commit/0050f633ad2a0d7db192af0e8a77f6b7c646a256))

## [0.14.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.14.3...@spectrum-web-components/slider@0.14.4) (2022-10-17)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.14.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.14.2...@spectrum-web-components/slider@0.14.3) (2022-10-10)

### Bug Fixes

-   convert the langage resolution workflow to a Reactive Controller ([b7781db](https://github.com/adobe/spectrum-web-components/commit/b7781db820620688f97a40225fb17a10e7881178))
-   prevent mobile interactions from triggering the virtual keyboard ([d06ad17](https://github.com/adobe/spectrum-web-components/commit/d06ad17f12b77f791c8710567ae9bf2d4b26278f))

## [0.14.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.14.1...@spectrum-web-components/slider@0.14.2) (2022-09-14)

### Bug Fixes

-   update spelling ([283d10a](https://github.com/adobe/spectrum-web-components/commit/283d10acf09f1c3a2575d5dd263559d0c63a69fa))
-   **slider:** renamed flag from stepperActive to managed input to allow verified (scroll) input event ([89d6ac5](https://github.com/adobe/spectrum-web-components/commit/89d6ac5a197c55ff8dae9932996fbb8c953bcfb2))

## [0.14.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.14.0...@spectrum-web-components/slider@0.14.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/slider

# [0.14.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.13.0...@spectrum-web-components/slider@0.14.0) (2022-08-09)

### Features

-   include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.14...@spectrum-web-components/slider@0.13.0) (2022-08-04)

### Features

-   delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))

## [0.12.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.13...@spectrum-web-components/slider@0.12.14) (2022-07-18)

### Bug Fixes

-   **slider:** add quiet and indeterminate ([8990573](https://github.com/adobe/spectrum-web-components/commit/8990573a4d946920b97117e87f8776c0e7214b04))

## [0.12.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.12...@spectrum-web-components/slider@0.12.13) (2022-06-29)

### Bug Fixes

-   correct slider math in RTL contexts ([4d73fa9](https://github.com/adobe/spectrum-web-components/commit/4d73fa9716293fdf415943586a01d96ede251032))

## [0.12.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.11...@spectrum-web-components/slider@0.12.12) (2022-06-07)

### Bug Fixes

-   update method extension types to match ([6eb686f](https://github.com/adobe/spectrum-web-components/commit/6eb686fbc7ad336ec245fbf2edd6aa769486533c))

## [0.12.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.10...@spectrum-web-components/slider@0.12.11) (2022-05-27)

### Bug Fixes

-   update consumption of Spectrum CSS for latest version ([ed2305b](https://github.com/adobe/spectrum-web-components/commit/ed2305b7334c973ea5c8299cbbce33a365896329))

## [0.12.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.9...@spectrum-web-components/slider@0.12.10) (2022-05-12)

### Bug Fixes

-   allow tick labels to start counting from "min" ([e7e44e3](https://github.com/adobe/spectrum-web-components/commit/e7e44e31fcb4c77259990777ca24fb22db54c40a))
-   prevent active pointer events when slider toggles to [disabled] ([ceb4d74](https://github.com/adobe/spectrum-web-components/commit/ceb4d74abdbfb622e4a3cc17fc1e0b248af4df12))

## [0.12.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.8...@spectrum-web-components/slider@0.12.9) (2022-04-21)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.12.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.7...@spectrum-web-components/slider@0.12.8) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.12.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.6...@spectrum-web-components/slider@0.12.7) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.12.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.5...@spectrum-web-components/slider@0.12.6) (2022-03-04)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.12.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.4...@spectrum-web-components/slider@0.12.5) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.12.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.3...@spectrum-web-components/slider@0.12.4) (2022-02-02)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.12.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.2...@spectrum-web-components/slider@0.12.3) (2022-01-26)

### Bug Fixes

-   **slider:** ensure that handles are upgraded before extracting a model from them ([bbbb21f](https://github.com/adobe/spectrum-web-components/commit/bbbb21faba2111480441a30224a3c26ad9858441))

## [0.12.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.1...@spectrum-web-components/slider@0.12.2) (2022-01-07)

### Bug Fixes

-   simplify touch-action application ([d23f735](https://github.com/adobe/spectrum-web-components/commit/d23f735db3cea01c2243e0485448d1598c6a8692))

## [0.12.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.12.0...@spectrum-web-components/slider@0.12.1) (2021-12-13)

### Bug Fixes

-   **slider:** response to orientation changes when measuring the bounding box ([c1412f1](https://github.com/adobe/spectrum-web-components/commit/c1412f19a5e91dd518b51277d3bbed3aff6dafac))

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.11.1...@spectrum-web-components/slider@0.12.0) (2021-11-08)

### Features

-   update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.11.0...@spectrum-web-components/slider@0.11.1) (2021-11-08)

**Note:** Version bump only for package @spectrum-web-components/slider

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.10...@spectrum-web-components/slider@0.11.0) (2021-11-02)

### Features

-   adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.10.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.9...@spectrum-web-components/slider@0.10.10) (2021-10-12)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.10.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.8...@spectrum-web-components/slider@0.10.9) (2021-10-05)

### Bug Fixes

-   **slider:** make implicit dependency on sp-slider-handle explicit ([cb8d84b](https://github.com/adobe/spectrum-web-components/commit/cb8d84b55beb968fcb92198854321d66ce01cbf4))

## [0.10.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.7...@spectrum-web-components/slider@0.10.8) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.10.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.6...@spectrum-web-components/slider@0.10.7) (2021-09-13)

### Bug Fixes

-   **slider:** support non-supported units in "Intl.numberFormat" ([ac32355](https://github.com/adobe/spectrum-web-components/commit/ac32355f3d6459937b025d2fce9f006b0226622e))
-   ensure lazily loaded focusElements do not crash ([64f2a54](https://github.com/adobe/spectrum-web-components/commit/64f2a54a5a6934306e97433e8102da6fe38b2660))
-   flappy Slider/Color Area tests ([c769c87](https://github.com/adobe/spectrum-web-components/commit/c769c8750a66139588191a8289abf13df7012c46))

## [0.10.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.5...@spectrum-web-components/slider@0.10.6) (2021-08-24)

### Bug Fixes

-   correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.10.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.4...@spectrum-web-components/slider@0.10.5) (2021-08-17)

### Bug Fixes

-   add "editable" option to "sp-slider" ([e86d7fa](https://github.com/adobe/spectrum-web-components/commit/e86d7fa84491b41a39dbab9c8d85eec42df320cd))
-   **slider:** support customizing visible label delivery ([a55b585](https://github.com/adobe/spectrum-web-components/commit/a55b58517f0f20df356a523a14550d8870b7282a))

## [0.10.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.3...@spectrum-web-components/slider@0.10.4) (2021-08-03)

### Bug Fixes

-   resolve "updateComplete" with a boolean like LitElement ([2ebcd44](https://github.com/adobe/spectrum-web-components/commit/2ebcd449185a2a26b8ca60441793048a76bb3ed7))

## [0.10.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.2...@spectrum-web-components/slider@0.10.3) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.10.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.1...@spectrum-web-components/slider@0.10.2) (2021-07-01)

### Bug Fixes

-   manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.10.0...@spectrum-web-components/slider@0.10.1) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/slider

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.9.7...@spectrum-web-components/slider@0.10.0) (2021-06-11)

### Bug Fixes

-   **slider:** apply "handle.highlight = true" when using the keyboard to interact with handles ([94e6349](https://github.com/adobe/spectrum-web-components/commit/94e6349a7750b43c455377cb096a24072d668056))
-   **slider:** work around Spectrum CSS bug in variant="range" styling ([e5810a9](https://github.com/adobe/spectrum-web-components/commit/e5810a9c8304f90a2d6f78ea9f1c911fb37d037f))

### Features

-   multi-handle slider implementation ([8d5a743](https://github.com/adobe/spectrum-web-components/commit/8d5a74309ec171107a9504695216cb90abe39023)), closes [#1385](https://github.com/adobe/spectrum-web-components/issues/1385)

## [0.9.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.9.6...@spectrum-web-components/slider@0.9.7) (2021-06-07)

### Bug Fixes

-   use ObserveSlotText mixin to prevent white space from overriding label attribute ([610fb4b](https://github.com/adobe/spectrum-web-components/commit/610fb4b5b392b7e3673c7d46bf8f9f5f79f27ca9))

## [0.9.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.9.5...@spectrum-web-components/slider@0.9.6) (2021-05-24)

### Bug Fixes

-   prevent tabindex=-1 elements from placing focus on their host ([1ac1293](https://github.com/adobe/spectrum-web-components/commit/1ac12931771c6d5fdbc99f5d214702ed644cb81a))

## [0.9.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.9.4...@spectrum-web-components/slider@0.9.5) (2021-05-12)

### Bug Fixes

-   include touch-action rule for draggable content ([53221da](https://github.com/adobe/spectrum-web-components/commit/53221dabc8911749372994cc0fabe55f36858680))
-   include touch-action rule for draggable content ([3f507e6](https://github.com/adobe/spectrum-web-components/commit/3f507e6dba718ae2b7415454eba859a9790e43e7))
-   **slider:** ensure min/max/value application order ([80e8cb5](https://github.com/adobe/spectrum-web-components/commit/80e8cb54d0868ce3f4451c3451e95a89b8b5a229))
-   **slider:** ensure pointer events on the track and handle act the same ([03adb36](https://github.com/adobe/spectrum-web-components/commit/03adb367fd945c2c07cc8e6179207fc4e654fc0a))
-   **slider:** ensure value is bound as a property ([96bd01a](https://github.com/adobe/spectrum-web-components/commit/96bd01aacfddfe3a51524c59d346f57e0ac346b0))

## [0.9.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.9.3...@spectrum-web-components/slider@0.9.4) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.9.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.9.2...@spectrum-web-components/slider@0.9.3) (2021-03-29)

### Bug Fixes

-   **slider:** update a11y tree and default max value ([3cbf222](https://github.com/adobe/spectrum-web-components/commit/3cbf222386d53cdd77847bb9093f494e542c9195))

## [0.9.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.9.1...@spectrum-web-components/slider@0.9.2) (2021-03-22)

### Bug Fixes

-   remove right click value setting ([a44968d](https://github.com/adobe/spectrum-web-components/commit/a44968d09120ad9b54915438fb5a134f306fdab2))

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.9.0...@spectrum-web-components/slider@0.9.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/slider

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.8.2...@spectrum-web-components/slider@0.9.0) (2021-03-04)

### Features

-   use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.8.1...@spectrum-web-components/slider@0.8.2) (2021-02-11)

### Bug Fixes

-   update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.8.0...@spectrum-web-components/slider@0.8.1) (2021-01-28)

### Bug Fixes

-   **slider:** manage focus more like a native rage input ([865115e](https://github.com/adobe/spectrum-web-components/commit/865115e1e43e164952eeca01b473c9606762377a))

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.6.4...@spectrum-web-components/slider@0.8.0) (2021-01-21)

### Bug Fixes

-   use the "browsers" listing in postcss-preset-env ([4eaf6a2](https://github.com/adobe/spectrum-web-components/commit/4eaf6a28f7b5eaf60487841d264d6d804ae675ce))
-   **slider:** allow irregular tick spacing and correct RTL value application ([a83f879](https://github.com/adobe/spectrum-web-components/commit/a83f879bfef87b928452104a47b45201ab30ee89))
-   **slider:** allow pointer interactions that start at the very begin/end to be tracked ([ff8c95c](https://github.com/adobe/spectrum-web-components/commit/ff8c95c6a1c7be3da0bed162064302591712d275))
-   **slider:** allow slot based label content ([d2d474e](https://github.com/adobe/spectrum-web-components/commit/d2d474e9385b3445aff3ca152c70ee12ecf6b3fb))
-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
-   update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
-   **slider:** prevent pointercancel events by container touch-action ([4687d03](https://github.com/adobe/spectrum-web-components/commit/4687d03c2b1ea1de3cb76d6ed3782e56153d271f))

### Features

-   **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
-   **slider:** update spectrum css input ([21ebe36](https://github.com/adobe/spectrum-web-components/commit/21ebe36d600501771c3382e987f4e22753c36262))
-   **slider:** use latest @spectrum-css/slider beta ([9f29bbe](https://github.com/adobe/spectrum-web-components/commit/9f29bbee3a43c092f4ee141e18a96fe0dfa4fba4))

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.6.4...@spectrum-web-components/slider@0.7.0) (2021-01-13)

### Bug Fixes

-   **slider:** allow irregular tick spacing and correct RTL value application ([a83f879](https://github.com/adobe/spectrum-web-components/commit/a83f879bfef87b928452104a47b45201ab30ee89))
-   **slider:** allow pointer interactions that start at the very begin/end to be tracked ([ff8c95c](https://github.com/adobe/spectrum-web-components/commit/ff8c95c6a1c7be3da0bed162064302591712d275))
-   **slider:** allow slot based label content ([d2d474e](https://github.com/adobe/spectrum-web-components/commit/d2d474e9385b3445aff3ca152c70ee12ecf6b3fb))
-   include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
-   stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
-   update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
-   **slider:** prevent pointercancel events by container touch-action ([4687d03](https://github.com/adobe/spectrum-web-components/commit/4687d03c2b1ea1de3cb76d6ed3782e56153d271f))

### Features

-   **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
-   **slider:** update spectrum css input ([21ebe36](https://github.com/adobe/spectrum-web-components/commit/21ebe36d600501771c3382e987f4e22753c36262))
-   **slider:** use latest @spectrum-css/slider beta ([9f29bbe](https://github.com/adobe/spectrum-web-components/commit/9f29bbee3a43c092f4ee141e18a96fe0dfa4fba4))

## [0.6.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.6.3...@spectrum-web-components/slider@0.6.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.6.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.6.2...@spectrum-web-components/slider@0.6.3) (2020-10-12)

### Bug Fixes

-   include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.6.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.6.1...@spectrum-web-components/slider@0.6.2) (2020-09-25)

### Bug Fixes

-   update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
-   **slider:** simplify application of the gradient backgrounds ([f96a97e](https://github.com/adobe/spectrum-web-components/commit/f96a97eafab63358de3b438d84a2af521250f4ed))

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.6.0...@spectrum-web-components/slider@0.6.1) (2020-09-14)

**Note:** Version bump only for package @spectrum-web-components/slider

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.5.4...@spectrum-web-components/slider@0.6.0) (2020-08-31)

### Features

-   update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))

## [0.5.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.5.3...@spectrum-web-components/slider@0.5.4) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.5.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.5.2...@spectrum-web-components/slider@0.5.3) (2020-07-27)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.5.1...@spectrum-web-components/slider@0.5.2) (2020-07-24)

### Bug Fixes

-   ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.5.0...@spectrum-web-components/slider@0.5.1) (2020-07-22)

**Note:** Version bump only for package @spectrum-web-components/slider

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.9...@spectrum-web-components/slider@0.5.0) (2020-07-17)

### Features

-   leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.4.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.8...@spectrum-web-components/slider@0.4.9) (2020-06-08)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.4.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.7...@spectrum-web-components/slider@0.4.8) (2020-04-16)

### Performance Improvements

-   use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.4.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.6...@spectrum-web-components/slider@0.4.7) (2020-04-10)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.4.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.5...@spectrum-web-components/slider@0.4.6) (2020-04-07)

### Bug Fixes

-   **slider:** dispatch synthetic pointerdown event ([7dc74af](https://github.com/adobe/spectrum-web-components/commit/7dc74afdda380184906cceadf4eb528b6106792c))

## [0.4.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.4...@spectrum-web-components/slider@0.4.5) (2020-03-27)

### Bug Fixes

-   **slider:** use internal "input" for value sanitation ([dd588c9](https://github.com/adobe/spectrum-web-components/commit/dd588c9))

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.3...@spectrum-web-components/slider@0.4.4) (2020-03-11)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.2...@spectrum-web-components/slider@0.4.3) (2020-02-05)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.1...@spectrum-web-components/slider@0.4.2) (2020-02-01)

**Note:** Version bump only for package @spectrum-web-components/slider

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.4.0...@spectrum-web-components/slider@0.4.1) (2020-01-30)

**Note:** Version bump only for package @spectrum-web-components/slider

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.3.3...@spectrum-web-components/slider@0.4.0) (2020-01-06)

### Bug Fixes

-   **slider:** fixes usage of aria-valuetext, adds aria-valuenow ([4b25a89](https://github.com/adobe/spectrum-web-components/commit/4b25a89))

### Features

-   **slider:** adds getAriaValueText property, fixes [#381](https://github.com/adobe/spectrum-web-components/issues/381) ([5800915](https://github.com/adobe/spectrum-web-components/commit/5800915))

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.3.2...@spectrum-web-components/slider@0.3.3) (2019-12-12)

### Bug Fixes

-   apply Focuable styles in class extensions ([38f7afd](https://github.com/adobe/spectrum-web-components/commit/38f7afd))

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.3.1...@spectrum-web-components/slider@0.3.2) (2019-12-02)

### Bug Fixes

-   normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cd))

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.3.0...@spectrum-web-components/slider@0.3.1) (2019-11-27)

### Bug Fixes

-   include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.2.2...@spectrum-web-components/slider@0.3.0) (2019-11-19)

### Features

-   use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc7))
-   use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/3918888))

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.2.1...@spectrum-web-components/slider@0.2.2) (2019-11-01)

### Bug Fixes

-   **slider:** ensure track widths follow dynamic Spectrum CSS values ([5ad1c1a](https://github.com/adobe/spectrum-web-components/commit/5ad1c1a))
-   **slider:** use standard "change" and "input" events ([59cf786](https://github.com/adobe/spectrum-web-components/commit/59cf786))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.2.0...@spectrum-web-components/slider@0.2.1) (2019-10-23)

### Bug Fixes

-   **slider:** ensure "sp-slider:input" is dispatched appropriately ([ded5440](https://github.com/adobe/spectrum-web-components/commit/ded5440))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/slider@0.1.3...@spectrum-web-components/slider@0.2.0) (2019-10-14)

### Bug Fixes

-   **slider:** manage value and max changing in unison ([4359fbe](https://github.com/adobe/spectrum-web-components/commit/4359fbe))

### Features

-   **slider:** add "ramp" and "tick" variant support ([bb98bb6](https://github.com/adobe/spectrum-web-components/commit/bb98bb6))
-   **slider:** mouse event fallback from pointer events ([b69e7fc](https://github.com/adobe/spectrum-web-components/commit/b69e7fc))
-   **slider:** support tick labels and tick steps ([1ccf8d6](https://github.com/adobe/spectrum-web-components/commit/1ccf8d6))

### Performance Improvements

-   use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0a))

## 0.1.3 (2019-10-03)

**Note:** Version bump only for package @spectrum-web-components/slider
