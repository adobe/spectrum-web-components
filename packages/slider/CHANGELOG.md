# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.13.1](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.13.0...@future-ui/slider@0.13.1) (2021-10-15)

**Note:** Version bump only for package @future-ui/slider





# 0.13.0 (2021-10-14)


### Bug Fixes

* **slider:** make implicit dependency on sp-slider-handle explicit ([cb8d84b](https://github.com/adobe/spectrum-web-components/commit/cb8d84b55beb968fcb92198854321d66ce01cbf4))
* **slider:** support non-supported units in "Intl.numberFormat" ([ac32355](https://github.com/adobe/spectrum-web-components/commit/ac32355f3d6459937b025d2fce9f006b0226622e))
* add "editable" option to "sp-slider" ([e86d7fa](https://github.com/adobe/spectrum-web-components/commit/e86d7fa84491b41a39dbab9c8d85eec42df320cd))
* correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
* ensure lazily loaded focusElements do not crash ([64f2a54](https://github.com/adobe/spectrum-web-components/commit/64f2a54a5a6934306e97433e8102da6fe38b2660))
* flappy Slider/Color Area tests ([c769c87](https://github.com/adobe/spectrum-web-components/commit/c769c8750a66139588191a8289abf13df7012c46))
* **slider:** allow irregular tick spacing and correct RTL value application ([a83f879](https://github.com/adobe/spectrum-web-components/commit/a83f879bfef87b928452104a47b45201ab30ee89))
* **slider:** allow pointer interactions that start at the very begin/end to be tracked ([ff8c95c](https://github.com/adobe/spectrum-web-components/commit/ff8c95c6a1c7be3da0bed162064302591712d275))
* **slider:** dispatch synthetic pointerdown event ([7dc74af](https://github.com/adobe/spectrum-web-components/commit/7dc74afdda380184906cceadf4eb528b6106792c))
* **slider:** support customizing visible label delivery ([a55b585](https://github.com/adobe/spectrum-web-components/commit/a55b58517f0f20df356a523a14550d8870b7282a))
* include touch-action rule for draggable content ([3f507e6](https://github.com/adobe/spectrum-web-components/commit/3f507e6dba718ae2b7415454eba859a9790e43e7))
* manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))
* remove right click value setting ([a44968d](https://github.com/adobe/spectrum-web-components/commit/a44968d09120ad9b54915438fb5a134f306fdab2))
* resolve "updateComplete" with a boolean like LitElement ([2ebcd44](https://github.com/adobe/spectrum-web-components/commit/2ebcd449185a2a26b8ca60441793048a76bb3ed7))
* **slider:** allow slot based label content ([d2d474e](https://github.com/adobe/spectrum-web-components/commit/d2d474e9385b3445aff3ca152c70ee12ecf6b3fb))
* **slider:** apply "handle.highlight = true" when using the keyboard to interact with handles ([94e6349](https://github.com/adobe/spectrum-web-components/commit/94e6349a7750b43c455377cb096a24072d668056))
* **slider:** ensure "sp-slider:input" is dispatched appropriately ([ded5440](https://github.com/adobe/spectrum-web-components/commit/ded544078d56d4358e6767e2a68d5151787695da))
* **slider:** ensure min/max/value application order ([80e8cb5](https://github.com/adobe/spectrum-web-components/commit/80e8cb54d0868ce3f4451c3451e95a89b8b5a229))
* **slider:** ensure pointer events on the track and handle act the same ([03adb36](https://github.com/adobe/spectrum-web-components/commit/03adb367fd945c2c07cc8e6179207fc4e654fc0a))
* **slider:** ensure track widths follow dynamic Spectrum CSS values ([5ad1c1a](https://github.com/adobe/spectrum-web-components/commit/5ad1c1aef32cd2988fd86a4c48f19173d6c9c0c2))
* **slider:** ensure value is bound as a property ([96bd01a](https://github.com/adobe/spectrum-web-components/commit/96bd01aacfddfe3a51524c59d346f57e0ac346b0))
* **slider:** manage focus more like a native rage input ([865115e](https://github.com/adobe/spectrum-web-components/commit/865115e1e43e164952eeca01b473c9606762377a))
* **slider:** update a11y tree and default max value ([3cbf222](https://github.com/adobe/spectrum-web-components/commit/3cbf222386d53cdd77847bb9093f494e542c9195))
* **slider:** work around Spectrum CSS bug in variant="range" styling ([e5810a9](https://github.com/adobe/spectrum-web-components/commit/e5810a9c8304f90a2d6f78ea9f1c911fb37d037f))
* apply Focuable styles in class extensions ([38f7afd](https://github.com/adobe/spectrum-web-components/commit/38f7afd7cdb317d5c8b6e69f1301decd21364b1d))
* ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
* include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716f2f787deb8d868a78bd28c8e62fe90e21))
* include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
* include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
* include touch-action rule for draggable content ([53221da](https://github.com/adobe/spectrum-web-components/commit/53221dabc8911749372994cc0fabe55f36858680))
* normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cdac98282c886f23c4a8d6cf4910c4a606c))
* prevent tabindex=-1 elements from placing focus on their host ([1ac1293](https://github.com/adobe/spectrum-web-components/commit/1ac12931771c6d5fdbc99f5d214702ed644cb81a))
* stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
* update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
* update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
* update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
* use ObserveSlotText mixin to prevent white space from overriding label attribute ([610fb4b](https://github.com/adobe/spectrum-web-components/commit/610fb4b5b392b7e3673c7d46bf8f9f5f79f27ca9))
* use the "browsers" listing in postcss-preset-env ([4eaf6a2](https://github.com/adobe/spectrum-web-components/commit/4eaf6a28f7b5eaf60487841d264d6d804ae675ce))
* **slider:** fixes usage of aria-valuetext, adds aria-valuenow ([4b25a89](https://github.com/adobe/spectrum-web-components/commit/4b25a89d6018a8929c3b777cc196354d93d0af69))
* **slider:** manage value and max changing in unison ([4359fbe](https://github.com/adobe/spectrum-web-components/commit/4359fbee9ce545064f35aee5e0c6a1dadd11ddd6))
* **slider:** prevent pointercancel events by container touch-action ([4687d03](https://github.com/adobe/spectrum-web-components/commit/4687d03c2b1ea1de3cb76d6ed3782e56153d271f))
* **slider:** simplify application of the gradient backgrounds ([f96a97e](https://github.com/adobe/spectrum-web-components/commit/f96a97eafab63358de3b438d84a2af521250f4ed))
* **slider:** use internal "input" for value sanitation ([dd588c9](https://github.com/adobe/spectrum-web-components/commit/dd588c93003a9e9c10da4832590403ebc9e46020))
* **slider:** use standard "change" and "input" events ([59cf786](https://github.com/adobe/spectrum-web-components/commit/59cf7866a9b7b7368ccf01d237534a495274af32))


### Features

* multi-handle slider implementation ([8d5a743](https://github.com/adobe/spectrum-web-components/commit/8d5a74309ec171107a9504695216cb90abe39023)), closes [#1385](https://github.com/adobe/spectrum-web-components/issues/1385)
* update lit-* dependencies, wip ([aad74d6](https://github.com/adobe/spectrum-web-components/commit/aad74d6ac41d8450aee82d73aaf58ab949b72a00))
* use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))
* **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
* **slider:** add "ramp" and "tick" variant support ([bb98bb6](https://github.com/adobe/spectrum-web-components/commit/bb98bb6e1e7ac7b795c29b5085e7ebef57d8ca94))
* **slider:** adds getAriaValueText property, fixes [#381](https://github.com/adobe/spectrum-web-components/issues/381) ([5800915](https://github.com/adobe/spectrum-web-components/commit/5800915bb805022cbe4c8ea822631c11da03fc98))
* **slider:** mouse event fallback from pointer events ([b69e7fc](https://github.com/adobe/spectrum-web-components/commit/b69e7fc23966386097e0cad22c56ab02f70abcae))
* **slider:** support tick labels and tick steps ([1ccf8d6](https://github.com/adobe/spectrum-web-components/commit/1ccf8d6f2ac33843c6cb27e2e86f0943aab31a6d))
* **slider:** update spectrum css input ([21ebe36](https://github.com/adobe/spectrum-web-components/commit/21ebe36d600501771c3382e987f4e22753c36262))
* **slider:** use latest @spectrum-css/slider beta ([9f29bbe](https://github.com/adobe/spectrum-web-components/commit/9f29bbee3a43c092f4ee141e18a96fe0dfa4fba4))
* leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
* update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))
* use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc77960de8e57dd9c49bb7669df689f0ebaa))
* use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/39188887afad9bec52ef48d4e22596f9b757a9fe))


### Performance Improvements

* use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))
* use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0accd643c2f35cbf1ba809b54f52c25628d))


### Reverts

* Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))





# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.10...@future-ui/slider@0.12.0) (2021-10-14)

### Features

-   update lit-\* dependencies, wip ([aad74d6](https://github.com/adobe/spectrum-web-components/commit/aad74d6ac41d8450aee82d73aaf58ab949b72a00))

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.10...@future-ui/slider@0.11.0) (2021-10-14)

### Features

-   update lit-\* dependencies, wip ([aad74d6](https://github.com/adobe/spectrum-web-components/commit/aad74d6ac41d8450aee82d73aaf58ab949b72a00))

## [0.10.10](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.9...@future-ui/slider@0.10.10) (2021-10-12)

**Note:** Version bump only for package @future-ui/slider

## [0.10.9](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.8...@future-ui/slider@0.10.9) (2021-10-05)

### Bug Fixes

-   **slider:** make implicit dependency on sp-slider-handle explicit ([cb8d84b](https://github.com/adobe/spectrum-web-components/commit/cb8d84b55beb968fcb92198854321d66ce01cbf4))

## [0.10.8](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.7...@future-ui/slider@0.10.8) (2021-09-20)

**Note:** Version bump only for package @future-ui/slider

## [0.10.7](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.6...@future-ui/slider@0.10.7) (2021-09-13)

### Bug Fixes

-   **slider:** support non-supported units in "Intl.numberFormat" ([ac32355](https://github.com/adobe/spectrum-web-components/commit/ac32355f3d6459937b025d2fce9f006b0226622e))
-   ensure lazily loaded focusElements do not crash ([64f2a54](https://github.com/adobe/spectrum-web-components/commit/64f2a54a5a6934306e97433e8102da6fe38b2660))
-   flappy Slider/Color Area tests ([c769c87](https://github.com/adobe/spectrum-web-components/commit/c769c8750a66139588191a8289abf13df7012c46))

## [0.10.6](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.5...@future-ui/slider@0.10.6) (2021-08-24)

### Bug Fixes

-   correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.10.5](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.4...@future-ui/slider@0.10.5) (2021-08-17)

### Bug Fixes

-   add "editable" option to "sp-slider" ([e86d7fa](https://github.com/adobe/spectrum-web-components/commit/e86d7fa84491b41a39dbab9c8d85eec42df320cd))
-   **slider:** support customizing visible label delivery ([a55b585](https://github.com/adobe/spectrum-web-components/commit/a55b58517f0f20df356a523a14550d8870b7282a))

## [0.10.4](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.3...@future-ui/slider@0.10.4) (2021-08-03)

### Bug Fixes

-   resolve "updateComplete" with a boolean like LitElement ([2ebcd44](https://github.com/adobe/spectrum-web-components/commit/2ebcd449185a2a26b8ca60441793048a76bb3ed7))

## [0.10.3](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.2...@future-ui/slider@0.10.3) (2021-07-22)

**Note:** Version bump only for package @future-ui/slider

## [0.10.2](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.1...@future-ui/slider@0.10.2) (2021-07-01)

### Bug Fixes

-   manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.10.0...@future-ui/slider@0.10.1) (2021-06-16)

**Note:** Version bump only for package @future-ui/slider

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.9.7...@future-ui/slider@0.10.0) (2021-06-11)

### Bug Fixes

-   **slider:** apply "handle.highlight = true" when using the keyboard to interact with handles ([94e6349](https://github.com/adobe/spectrum-web-components/commit/94e6349a7750b43c455377cb096a24072d668056))
-   **slider:** work around Spectrum CSS bug in variant="range" styling ([e5810a9](https://github.com/adobe/spectrum-web-components/commit/e5810a9c8304f90a2d6f78ea9f1c911fb37d037f))

### Features

-   multi-handle slider implementation ([8d5a743](https://github.com/adobe/spectrum-web-components/commit/8d5a74309ec171107a9504695216cb90abe39023)), closes [#1385](https://github.com/adobe/spectrum-web-components/issues/1385)

## [0.9.7](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.9.6...@future-ui/slider@0.9.7) (2021-06-07)

### Bug Fixes

-   use ObserveSlotText mixin to prevent white space from overriding label attribute ([610fb4b](https://github.com/adobe/spectrum-web-components/commit/610fb4b5b392b7e3673c7d46bf8f9f5f79f27ca9))

## [0.9.6](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.9.5...@future-ui/slider@0.9.6) (2021-05-24)

### Bug Fixes

-   prevent tabindex=-1 elements from placing focus on their host ([1ac1293](https://github.com/adobe/spectrum-web-components/commit/1ac12931771c6d5fdbc99f5d214702ed644cb81a))

## [0.9.5](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.9.4...@future-ui/slider@0.9.5) (2021-05-12)

### Bug Fixes

-   include touch-action rule for draggable content ([53221da](https://github.com/adobe/spectrum-web-components/commit/53221dabc8911749372994cc0fabe55f36858680))
-   include touch-action rule for draggable content ([3f507e6](https://github.com/adobe/spectrum-web-components/commit/3f507e6dba718ae2b7415454eba859a9790e43e7))
-   **slider:** ensure min/max/value application order ([80e8cb5](https://github.com/adobe/spectrum-web-components/commit/80e8cb54d0868ce3f4451c3451e95a89b8b5a229))
-   **slider:** ensure pointer events on the track and handle act the same ([03adb36](https://github.com/adobe/spectrum-web-components/commit/03adb367fd945c2c07cc8e6179207fc4e654fc0a))
-   **slider:** ensure value is bound as a property ([96bd01a](https://github.com/adobe/spectrum-web-components/commit/96bd01aacfddfe3a51524c59d346f57e0ac346b0))

## [0.9.4](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.9.3...@future-ui/slider@0.9.4) (2021-04-09)

**Note:** Version bump only for package @future-ui/slider

## [0.9.3](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.9.2...@future-ui/slider@0.9.3) (2021-03-29)

### Bug Fixes

-   **slider:** update a11y tree and default max value ([3cbf222](https://github.com/adobe/spectrum-web-components/commit/3cbf222386d53cdd77847bb9093f494e542c9195))

## [0.9.2](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.9.1...@future-ui/slider@0.9.2) (2021-03-22)

### Bug Fixes

-   remove right click value setting ([a44968d](https://github.com/adobe/spectrum-web-components/commit/a44968d09120ad9b54915438fb5a134f306fdab2))

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.9.0...@future-ui/slider@0.9.1) (2021-03-05)

**Note:** Version bump only for package @future-ui/slider

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.8.2...@future-ui/slider@0.9.0) (2021-03-04)

### Features

-   use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.8.1...@future-ui/slider@0.8.2) (2021-02-11)

### Bug Fixes

-   update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.8.0...@future-ui/slider@0.8.1) (2021-01-28)

### Bug Fixes

-   **slider:** manage focus more like a native rage input ([865115e](https://github.com/adobe/spectrum-web-components/commit/865115e1e43e164952eeca01b473c9606762377a))

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.6.4...@future-ui/slider@0.8.0) (2021-01-21)

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

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.6.4...@future-ui/slider@0.7.0) (2021-01-13)

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

## [0.6.4](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.6.3...@future-ui/slider@0.6.4) (2020-10-12)

**Note:** Version bump only for package @future-ui/slider

## [0.6.3](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.6.2...@future-ui/slider@0.6.3) (2020-10-12)

### Bug Fixes

-   include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.6.2](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.6.1...@future-ui/slider@0.6.2) (2020-09-25)

### Bug Fixes

-   update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
-   **slider:** simplify application of the gradient backgrounds ([f96a97e](https://github.com/adobe/spectrum-web-components/commit/f96a97eafab63358de3b438d84a2af521250f4ed))

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.6.0...@future-ui/slider@0.6.1) (2020-09-14)

**Note:** Version bump only for package @future-ui/slider

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.5.4...@future-ui/slider@0.6.0) (2020-08-31)

### Features

-   update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))

## [0.5.4](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.5.3...@future-ui/slider@0.5.4) (2020-08-19)

**Note:** Version bump only for package @future-ui/slider

## [0.5.3](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.5.2...@future-ui/slider@0.5.3) (2020-07-27)

**Note:** Version bump only for package @future-ui/slider

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.5.1...@future-ui/slider@0.5.2) (2020-07-24)

### Bug Fixes

-   ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.5.0...@future-ui/slider@0.5.1) (2020-07-22)

**Note:** Version bump only for package @future-ui/slider

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.9...@future-ui/slider@0.5.0) (2020-07-17)

### Features

-   leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.4.9](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.8...@future-ui/slider@0.4.9) (2020-06-08)

**Note:** Version bump only for package @future-ui/slider

## [0.4.8](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.7...@future-ui/slider@0.4.8) (2020-04-16)

### Performance Improvements

-   use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.4.7](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.6...@future-ui/slider@0.4.7) (2020-04-10)

**Note:** Version bump only for package @future-ui/slider

## [0.4.6](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.5...@future-ui/slider@0.4.6) (2020-04-07)

### Bug Fixes

-   **slider:** dispatch synthetic pointerdown event ([7dc74af](https://github.com/adobe/spectrum-web-components/commit/7dc74afdda380184906cceadf4eb528b6106792c))

## [0.4.5](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.4...@future-ui/slider@0.4.5) (2020-03-27)

### Bug Fixes

-   **slider:** use internal "input" for value sanitation ([dd588c9](https://github.com/adobe/spectrum-web-components/commit/dd588c9))

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.3...@future-ui/slider@0.4.4) (2020-03-11)

**Note:** Version bump only for package @future-ui/slider

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.2...@future-ui/slider@0.4.3) (2020-02-05)

**Note:** Version bump only for package @future-ui/slider

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.1...@future-ui/slider@0.4.2) (2020-02-01)

**Note:** Version bump only for package @future-ui/slider

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.4.0...@future-ui/slider@0.4.1) (2020-01-30)

**Note:** Version bump only for package @future-ui/slider

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.3.3...@future-ui/slider@0.4.0) (2020-01-06)

### Bug Fixes

-   **slider:** fixes usage of aria-valuetext, adds aria-valuenow ([4b25a89](https://github.com/adobe/spectrum-web-components/commit/4b25a89))

### Features

-   **slider:** adds getAriaValueText property, fixes [#381](https://github.com/adobe/spectrum-web-components/issues/381) ([5800915](https://github.com/adobe/spectrum-web-components/commit/5800915))

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.3.2...@future-ui/slider@0.3.3) (2019-12-12)

### Bug Fixes

-   apply Focuable styles in class extensions ([38f7afd](https://github.com/adobe/spectrum-web-components/commit/38f7afd))

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.3.1...@future-ui/slider@0.3.2) (2019-12-02)

### Bug Fixes

-   normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cd))

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.3.0...@future-ui/slider@0.3.1) (2019-11-27)

### Bug Fixes

-   include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.2.2...@future-ui/slider@0.3.0) (2019-11-19)

### Features

-   use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc7))
-   use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/3918888))

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.2.1...@future-ui/slider@0.2.2) (2019-11-01)

### Bug Fixes

-   **slider:** ensure track widths follow dynamic Spectrum CSS values ([5ad1c1a](https://github.com/adobe/spectrum-web-components/commit/5ad1c1a))
-   **slider:** use standard "change" and "input" events ([59cf786](https://github.com/adobe/spectrum-web-components/commit/59cf786))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.2.0...@future-ui/slider@0.2.1) (2019-10-23)

### Bug Fixes

-   **slider:** ensure "sp-slider:input" is dispatched appropriately ([ded5440](https://github.com/adobe/spectrum-web-components/commit/ded5440))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@future-ui/slider@0.1.3...@future-ui/slider@0.2.0) (2019-10-14)

### Bug Fixes

-   **slider:** manage value and max changing in unison ([4359fbe](https://github.com/adobe/spectrum-web-components/commit/4359fbe))

### Features

-   **slider:** add "ramp" and "tick" variant support ([bb98bb6](https://github.com/adobe/spectrum-web-components/commit/bb98bb6))
-   **slider:** mouse event fallback from pointer events ([b69e7fc](https://github.com/adobe/spectrum-web-components/commit/b69e7fc))
-   **slider:** support tick labels and tick steps ([1ccf8d6](https://github.com/adobe/spectrum-web-components/commit/1ccf8d6))

### Performance Improvements

-   use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0a))

## 0.1.3 (2019-10-03)

**Note:** Version bump only for package @future-ui/slider
