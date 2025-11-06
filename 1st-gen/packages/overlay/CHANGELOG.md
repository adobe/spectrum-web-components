# Change Log

## 1.10.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.10.0
    - @spectrum-web-components/action-button@1.10.0
    - @spectrum-web-components/shared@1.10.0
    - @spectrum-web-components/theme@1.10.0
    - @spectrum-web-components/reactive-controllers@1.10.0

## 1.9.1

### Patch Changes

- [#5806](https://github.com/adobe/spectrum-web-components/pull/5806) [`a19cbe3`](https://github.com/adobe/spectrum-web-components/commit/a19cbe3e8b4690d8abd1530e3930e5d48ae43618) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - - **Fixed**: Expanded `<overlay-trigger>` `type` property to accept all overlay types ('auto', 'hint', 'manual', 'modal', 'page') instead of the incorrect, previous restricted subset.

- Updated dependencies []:
    - @spectrum-web-components/action-button@1.9.1
    - @spectrum-web-components/base@1.9.1
    - @spectrum-web-components/reactive-controllers@1.9.1
    - @spectrum-web-components/shared@1.9.1
    - @spectrum-web-components/theme@1.9.1

## 1.9.0

### Patch Changes

- Updated dependencies [[`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8)]:
    - @spectrum-web-components/reactive-controllers@1.9.0
    - @spectrum-web-components/action-button@1.9.0
    - @spectrum-web-components/base@1.9.0
    - @spectrum-web-components/shared@1.9.0
    - @spectrum-web-components/theme@1.9.0

## 1.8.0

### Minor Changes

- [#5670](https://github.com/adobe/spectrum-web-components/pull/5670) [`14486d6`](https://github.com/adobe/spectrum-web-components/commit/14486d620e88976c794225edb54eaca8392015c7) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - Added `allow-outside-click` property to `<sp-overlay>` with deprecation notice. This property allows clicks outside the overlay to close it, but is not recommended for accessibility reasons and will be removed in a future version.

    This property is being added as deprecated to support the fallback for `showModal()` which was removed as part of performance optimization. We will no longer support outside clicks for modal overlays as they violate accessibility guidelines.

    The property defaults to `false` and shows deprecation warnings when used. Consider using explicit close buttons or modal/page overlay types instead for better accessibility.

- [#5710](https://github.com/adobe/spectrum-web-components/pull/5710) [`ee1bae6`](https://github.com/adobe/spectrum-web-components/commit/ee1bae6f9a7401dc31ebc84e4e27f9d39be692d1) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **Fixed** : Added body scroll prevention for modal and page overlays. Overlay automatically blocks body scroll when modal or page overlays are open and restores the original scroll state when they are closed, improving user experience and accessibility for modal dialogs.

- [#5670](https://github.com/adobe/spectrum-web-components/pull/5670) [`14486d6`](https://github.com/adobe/spectrum-web-components/commit/14486d620e88976c794225edb54eaca8392015c7) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **Fixed** : external click registration behavior in the `sp-overlay` component. Programmatic clicks on elements outside of modal overlays now properly register and close the overlay, while user-initiated clicks are prevented from doing so.

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/theme@1.8.0
    - @spectrum-web-components/action-button@1.8.0
    - @spectrum-web-components/base@1.8.0
    - @spectrum-web-components/reactive-controllers@1.8.0
    - @spectrum-web-components/shared@1.8.0

## 1.7.0

### Minor Changes

- [#5477](https://github.com/adobe/spectrum-web-components/pull/5477) [`a646ae8`](https://github.com/adobe/spectrum-web-components/commit/a646ae8b0e652308d359226740d2cb189e492e45) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **Fixed** : Overlays (like pickers and action menus) were incorrectly closing when scrolling occurred within components. The fix ensures the `handleScroll` method in `OverlayStack` only responds to document/body scrolling events and ignores component-level scrolling events, which was the original intention.

### Patch Changes

- Updated dependencies [[`c1669d2`](https://github.com/adobe/spectrum-web-components/commit/c1669d2dc5e1ceeb84486ce49a428f86a3173caa)]:
    - @spectrum-web-components/action-button@1.7.0
    - @spectrum-web-components/theme@1.7.0
    - @spectrum-web-components/base@1.7.0
    - @spectrum-web-components/reactive-controllers@1.7.0
    - @spectrum-web-components/shared@1.7.0

## 1.6.0

### Patch Changes

- [#5392](https://github.com/adobe/spectrum-web-components/pull/5392) [`53f3769`](https://github.com/adobe/spectrum-web-components/commit/53f3769f07b6e7853a8a4c0dc63b21fe14cf3d4b) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - Fixed layout issues in Safari when an `sp-tray` is nested inside a dialog-type `sp-overlay`.

- Updated dependencies []:
    - @spectrum-web-components/action-button@1.6.0
    - @spectrum-web-components/theme@1.6.0
    - @spectrum-web-components/base@1.6.0
    - @spectrum-web-components/reactive-controllers@1.6.0
    - @spectrum-web-components/shared@1.6.0

## 1.5.0

### Minor Changes

- [#5308](https://github.com/adobe/spectrum-web-components/pull/5308) [`8f8735c`](https://github.com/adobe/spectrum-web-components/commit/8f8735c9ec3eac3b6473424c78257cb46ee17f70) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - prevent overlay close on document scroll

### Patch Changes

- Updated dependencies [[`6c58f50`](https://github.com/adobe/spectrum-web-components/commit/6c58f50f7b1f5489c11e0d3484e3f4a9d576f1c8)]:
    - @spectrum-web-components/action-button@1.5.0
    - @spectrum-web-components/theme@1.5.0
    - @spectrum-web-components/base@1.5.0
    - @spectrum-web-components/reactive-controllers@1.5.0
    - @spectrum-web-components/shared@1.5.0

## 1.4.0

### Minor Changes

- [#5223](https://github.com/adobe/spectrum-web-components/pull/5223) [`46cd782`](https://github.com/adobe/spectrum-web-components/commit/46cd7828f65491fc08790e5ba0aec412ee89199d) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - Removed pointer-events:none from the slot-trigger under overlay-trigger to disable the overlay content and not the trigger element.

- [#5248](https://github.com/adobe/spectrum-web-components/pull/5248) [`70f5f6f`](https://github.com/adobe/spectrum-web-components/commit/70f5f6f3a97b530fb20f9f5ee049e9a8c124b02d) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - overlay type auto stays open when interacting with elements inside

### Patch Changes

- Updated dependencies [[`72dbe62`](https://github.com/adobe/spectrum-web-components/commit/72dbe629cddfc57171eaaadf7206df47c19d3c98)]:
    - @spectrum-web-components/action-button@1.4.0
    - @spectrum-web-components/theme@1.4.0
    - @spectrum-web-components/base@1.4.0
    - @spectrum-web-components/reactive-controllers@1.4.0
    - @spectrum-web-components/shared@1.4.0

## 1.3.0

### Patch Changes

- [#5176](https://github.com/adobe/spectrum-web-components/pull/5176) [`468314f`](https://github.com/adobe/spectrum-web-components/commit/468314f45cf5fedb2e9029da210a5886260abca9) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - 1. chore(checkbox): updated to latest css v10.1.1 for s2 fast follow 2. chore(dialog):
  The error property was not properly deprecated with a full migration plan in place. This has caused confusion and false sense of urgency for consumers to migrate. We are removing it to eliminate those pain points for consumers while we take a deep look at our dialogs and patterns. 3. chore(menu): updated to latest css v9.1.1 for s2 fast follow 4. fix(overlay):
  sp-overlay with type="manual" should close on pressing ESC key. When the last item is on overlay stack we are triggering the close method on esc key event.

- Updated dependencies [[`ea38ef0`](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)]:
    - @spectrum-web-components/reactive-controllers@1.3.0
    - @spectrum-web-components/action-button@1.3.0
    - @spectrum-web-components/base@1.3.0
    - @spectrum-web-components/shared@1.3.0
    - @spectrum-web-components/theme@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

### Bug Fixes

- **action menu:** keyboard accessibility omnibus ([#5031](https://github.com/adobe/spectrum-web-components/issues/5031)) ([ea38ef0](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)), closes [#4623](https://github.com/adobe/spectrum-web-components/issues/4623)

### Features

- **overlay:** add triggeredBy property to overlay-trigger for performance optimization ([#5046](https://github.com/adobe/spectrum-web-components/issues/5046)) ([fd504aa](https://github.com/adobe/spectrum-web-components/commit/fd504aa4c83d6961abfb7db955483bf1ede6734f))

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

### Bug Fixes

- **picker:** stop the click events from reaching the elements below picker-tray ([#5060](https://github.com/adobe/spectrum-web-components/issues/5060)) ([7e4fdbf](https://github.com/adobe/spectrum-web-components/commit/7e4fdbf3e4487b4c148368b852129b85f88a620b))

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

### Bug Fixes

- **overlay:** make :focus-visible consistent when using overlay type modal ([#4912](https://github.com/adobe/spectrum-web-components/issues/4912)) ([7a5f786](https://github.com/adobe/spectrum-web-components/commit/7a5f786819ff200f5ae2648e2e2c4db3729050a2)), closes [#5021](https://github.com/adobe/spectrum-web-components/issues/5021)

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- **overlay:** make :focus-visible consistent when using overlay type modal ([#4912](https://github.com/adobe/spectrum-web-components/issues/4912)) ([7a5f786](https://github.com/adobe/spectrum-web-components/commit/7a5f786819ff200f5ae2648e2e2c4db3729050a2)), closes [#5021](https://github.com/adobe/spectrum-web-components/issues/5021)

### Features

- add an optional chromatic vrt action ([7d2f840](https://github.com/adobe/spectrum-web-components/commit/7d2f8401cb05c5e23872424f132a1a8edd95b666))
- **picker:** add forcePopover property ([#5041](https://github.com/adobe/spectrum-web-components/issues/5041)) ([3651e57](https://github.com/adobe/spectrum-web-components/commit/3651e57a90a05e551e6ee650e8ccc73aa05d3e7c))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

### Bug Fixes

- **overlay:** overlay scroll in safari and firefox ([#4969](https://github.com/adobe/spectrum-web-components/issues/4969)) ([05d24ff](https://github.com/adobe/spectrum-web-components/commit/05d24ffc4dc8e9b0281b90c768b7f983fe890def))

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

### Bug Fixes

- **overlay:** ensure smooth animation when opening modal overlays ([#4879](https://github.com/adobe/spectrum-web-components/issues/4879)) ([cd8dad7](https://github.com/adobe/spectrum-web-components/commit/cd8dad7b08c822a8224834b8775b0ab74bbaf3b6))
- **overlay:** overlay closing another overlay ([#4880](https://github.com/adobe/spectrum-web-components/issues/4880)) ([30434fa](https://github.com/adobe/spectrum-web-components/commit/30434fa52194884befd528ab88842092798859cc))
- **overlay:** remove flex display for dialog ([#4902](https://github.com/adobe/spectrum-web-components/issues/4902)) ([48448ea](https://github.com/adobe/spectrum-web-components/commit/48448ea75d7ffa61422947a18c3ea1ebf9ca25b7))

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

### Features

- **breadcrumbs:** add Breadcrumbs component ([#4578](https://github.com/adobe/spectrum-web-components/issues/4578)) ([acd4b5e](https://github.com/adobe/spectrum-web-components/commit/acd4b5e4401dad8cf26b50ee5dcda80a28b62999))

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

### Bug Fixes

- **overlay** replace at() polyfill ([#4628](https://github.com/adobe/spectrum-web-components/issues/4628)) ([8cef2c6](https://github.com/adobe/spectrum-web-components/commit/8cef2c639433248257a72bfc2c98d0663e265b09))
  **Note:** Version bump only for package @spectrum-web-components/overlay

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

### Bug Fixes

- **coachmark,overlay:** adjust imports of overlay and coachmark ([#4455](https://github.com/adobe/spectrum-web-components/issues/4455)) ([39706da](https://github.com/adobe/spectrum-web-components/commit/39706dafe58a598a86d7dc33629409f086a9694e))
- **overlay:** ensure hint Overlays within shadow roots open as expected ([#4443](https://github.com/adobe/spectrum-web-components/issues/4443)) ([7dd64b9](https://github.com/adobe/spectrum-web-components/commit/7dd64b92e58ad2fd3a36986f24022728e3cb4c36))
- **overlay:** ensure that passing "open" to the directive manages a single strategy ([#4474](https://github.com/adobe/spectrum-web-components/issues/4474)) ([15d6ac7](https://github.com/adobe/spectrum-web-components/commit/15d6ac71d586eb496b591fa5b097707961600f75))
- **overlay:** persist "host" in directive rendered Overlay content ([#4475](https://github.com/adobe/spectrum-web-components/issues/4475)) ([5d189c2](https://github.com/adobe/spectrum-web-components/commit/5d189c2adf91545eb64a0136fa02d7c8caee8f48))

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

### Bug Fixes

- **action-menu:** allow menu groups to handle their own selections ([#4397](https://github.com/adobe/spectrum-web-components/issues/4397)) ([5a19051](https://github.com/adobe/spectrum-web-components/commit/5a190518814f85cfd2e345ad6a0add1378c05bf4))
- **base:** move lit imports to base ([#4416](https://github.com/adobe/spectrum-web-components/issues/4416)) ([b7cb07e](https://github.com/adobe/spectrum-web-components/commit/b7cb07e98e17754c83d3e0112aac9728139e043b))
- **overlay:** prevent "receivesFocus=false" overlays from returning focus ([607819f](https://github.com/adobe/spectrum-web-components/commit/607819f053113a21cccfbc97d775551ef11bfc4a))
- **slider,overlay:** ensure that pointer events in Slider are handled as expected in Overlay ([#4438](https://github.com/adobe/spectrum-web-components/issues/4438)) ([db193e8](https://github.com/adobe/spectrum-web-components/commit/db193e84d1ee300faaed47a5a4026b73a8d9fb30))
- **styles,theme:** add S2 tokens and theme ([#4241](https://github.com/adobe/spectrum-web-components/issues/4241)) ([a29e4a2](https://github.com/adobe/spectrum-web-components/commit/a29e4a298090e39e009c434e48113fb8a7e90d14)), closes [#4232](https://github.com/adobe/spectrum-web-components/issues/4232) [#4228](https://github.com/adobe/spectrum-web-components/issues/4228)
- **theme:** deprecate `theme` property for `system` ([#4230](https://github.com/adobe/spectrum-web-components/issues/4230)) ([ac26168](https://github.com/adobe/spectrum-web-components/commit/ac2616878e90314e5ed307442ac026c9e4ac707a))

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

### Bug Fixes

- **overlay:** prevent "receivesFocus=false" overlays from returning focus ([607819f](https://github.com/adobe/spectrum-web-components/commit/607819f053113a21cccfbc97d775551ef11bfc4a))
- **theme:** deprecate `theme` property for `system` ([#4230](https://github.com/adobe/spectrum-web-components/issues/4230)) ([ac26168](https://github.com/adobe/spectrum-web-components/commit/ac2616878e90314e5ed307442ac026c9e4ac707a))

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Bug Fixes

- **overlay:** prevent focus based hover interaction without :focus-visible ([79337ff](https://github.com/adobe/spectrum-web-components/commit/79337ff0c8df69203877732ce0541d9f1d49f33d))
- **overlay:** prioritize non-"hint" Overlays on the same trigger ([b9833f3](https://github.com/adobe/spectrum-web-components/commit/b9833f3e22cfc89c34a98bd235c30f207b013781))
- **picker:** add loading state to the picker ([#3110](https://github.com/adobe/spectrum-web-components/issues/3110)) ([d91e2c9](https://github.com/adobe/spectrum-web-components/commit/d91e2c9f3530c3c911832ea3a401fddc23e7854a))
- **styles, theme:** surface exports that omit Spectrum Vars proactively ([#4142](https://github.com/adobe/spectrum-web-components/issues/4142)) ([5b524c1](https://github.com/adobe/spectrum-web-components/commit/5b524c1d54a64225cb3b2f71b92f581695985519))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

### Bug Fixes

- **overlay:** ensure "manual" Overlays ignore "light dismiss" when [popover] is not supported ([#4121](https://github.com/adobe/spectrum-web-components/issues/4121)) ([eb5e1ad](https://github.com/adobe/spectrum-web-components/commit/eb5e1ad78ebde99443929aa985a38297ebb16f4e))
- **overlay:** leverage "transition-behavior" to persist top-layer content while closing ([#4050](https://github.com/adobe/spectrum-web-components/issues/4050)) ([e3dea14](https://github.com/adobe/spectrum-web-components/commit/e3dea14fa382b4e02f61ae8b651e89cd92c348f8))
- **slider:** double click on slider handle to reset slider position ([#3991](https://github.com/adobe/spectrum-web-components/issues/3991)) ([64c594a](https://github.com/adobe/spectrum-web-components/commit/64c594a7c305bd4946bb5801341366a1e751a614))

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

### Bug Fixes

- support generating random IDs outside of secure contexts ([485a67c](https://github.com/adobe/spectrum-web-components/commit/485a67c5401094705b711350f8ee74182a6dd64b))

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

### Bug Fixes

- **overlay:** clean position data on close ([edac590](https://github.com/adobe/spectrum-web-components/commit/edac59003ecc1af8dc4aa91c00c9593e8792e63f))

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

### Bug Fixes

- **overlay:** automatically reposition overlay when the contents resize ([83be807](https://github.com/adobe/spectrum-web-components/commit/83be807996ace4609486cc9d3bbf1723b3a531ad))
- **overlay:** move closed overlays to "display: none" ([fc0278b](https://github.com/adobe/spectrum-web-components/commit/fc0278b917759ed58c3ac62a6e962633914481c0))
- **overlay:** normalize popover toggling between native and synthetic [popover] usage ([26fa692](https://github.com/adobe/spectrum-web-components/commit/26fa6925f7f88959ba4d969c882daf7cb881c2d4))
- **overlay:** support positioning overlays within parents leveraging container-type rules ([21044b3](https://github.com/adobe/spectrum-web-components/commit/21044b3c8b5bed0af02f836b6ee6796554a90325))
- **overlay:** surface "overlay" property to "sp-opened" and "sp-closed" events ([957f8e9](https://github.com/adobe/spectrum-web-components/commit/957f8e9b42f5ad4672fe128fc42693d0065bb2d5))

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

### Bug Fixes

- **overlay:** ensure events are only bound once ([abe57ce](https://github.com/adobe/spectrum-web-components/commit/abe57cedcc18a309f3acf1b664bfa561f13b4f8f))

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

### Bug Fixes

- **overlay:** ensure manual overlays persist through interactions outside of their subtree ([#3788](https://github.com/adobe/spectrum-web-components/issues/3788)) ([ef5617f](https://github.com/adobe/spectrum-web-components/commit/ef5617f81b205b8bcf0a79e2b8a810cc65f13c3d))

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

### Bug Fixes

- **overlay:** add delay resolution from overlaid content ([#3748](https://github.com/adobe/spectrum-web-components/issues/3748)) ([5c4f1f6](https://github.com/adobe/spectrum-web-components/commit/5c4f1f6f87cac60cb1884f59aa29d256f7baabb8))
- **overlay:** calculate more transforms ([6538a45](https://github.com/adobe/spectrum-web-components/commit/6538a45a036f60c4efce4c3ed3d1d6f2782a188e))
- **overlay:** place longpress helper content in a more accessible, less layout affecting location ([dd12c23](https://github.com/adobe/spectrum-web-components/commit/dd12c2346142a107ee9c7824410dff5ae660e574))

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

### Bug Fixes

- **overlay:** allow overlay to persist on hover ([#3706](https://github.com/adobe/spectrum-web-components/issues/3706)) ([7707040](https://github.com/adobe/spectrum-web-components/commit/77070405fdb0d6a2bca5d5e33fe03a856f1cef6c))

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

### Bug Fixes

- **overlay:** allow "receives-focus" to target the root of an overlay ([#3658](https://github.com/adobe/spectrum-web-components/issues/3658)) ([0db1025](https://github.com/adobe/spectrum-web-components/commit/0db10258d84409d364b5e1bad57e71683de93fea))
- **overlay:** ensure position when closing overlays over the top-layer ([55fab0d](https://github.com/adobe/spectrum-web-components/commit/55fab0d49047c64849ed9c8001b79b793440da48))
- **overlay:** reduce circular dependencies ([25eeb71](https://github.com/adobe/spectrum-web-components/commit/25eeb7138b19ba0c1a6543d1f37c4e8cea2cdbd6))

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Bug Fixes

- **action-menu:** added static attribute support ([#3573](https://github.com/adobe/spectrum-web-components/issues/3573)) ([25889a8](https://github.com/adobe/spectrum-web-components/commit/25889a808d6dcf11779d5c716f1b7522050ddf2b))
- **overlay:** position for transformed and contained parents ([ca8fd8a](https://github.com/adobe/spectrum-web-components/commit/ca8fd8a48a5f4b7bbc97b5641082cf48f6869529))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

### Bug Fixes

- address margin effected positioning ([38c8cf2](https://github.com/adobe/spectrum-web-components/commit/38c8cf2dd3f3b45a61062e3cd9b7480f903fae97))
- ensure submenus stay open when root it clicked again ([83ced1c](https://github.com/adobe/spectrum-web-components/commit/83ced1c913f262620e7b87ad3b7e58dff0697442))
- handle longpress and over filter overlays ([483e52d](https://github.com/adobe/spectrum-web-components/commit/483e52df24f56be027d8417c1ae530211ef0deb1))

### Features

- **overlay:** ship Overlay API v2 ([67b5d1b](https://github.com/adobe/spectrum-web-components/commit/67b5d1b02e88dcb5b0b79b5a6c5ead92ad1a5aca))

### Performance Improvements

- make lots of things lazy ([b8fa3ad](https://github.com/adobe/spectrum-web-components/commit/b8fa3ada062bf54bbb42e76ab156c716d5820c7c))
- open/close timing update ([d4ebcd3](https://github.com/adobe/spectrum-web-components/commit/d4ebcd36ed5a256f211186e6863c3eee2631fa3f))

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

- **overlay:** ensure CSS calcs resolve to the expected measurement value ([51a3feb](https://github.com/adobe/spectrum-web-components/commit/51a3feb2a42300de369aba06d7ec1eea92ffbd19))

### Features

- **popover:** use core tokens ([68328cc](https://github.com/adobe/spectrum-web-components/commit/68328ccd01f44758caf987e02a17d88488f9046c))

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

### Bug Fixes

- **overlay:** address review comments ([dd8b985](https://github.com/adobe/spectrum-web-components/commit/dd8b98524b5124267531a40b35d6cf542006c7a0))
- **overlay:** removes use of px units in overlay stack ([122f96c](https://github.com/adobe/spectrum-web-components/commit/122f96c06ac2b5349acff0497fed1697264958f8))
- **overlay:** stop the tab trapping if shadow root is not found ([4f0ec46](https://github.com/adobe/spectrum-web-components/commit/4f0ec464bcc807e3a789bb5fd323b468d978e4a2))

# 0.30.0 (2023-05-03)

### Bug Fixes

- abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))
- add content flow fallbacks to the position manager ([c008957](https://github.com/adobe/spectrum-web-components/commit/c0089571be599577f75b2fe7929b8ee26529358d))
- allow "updateComplete" to resolve to a boolean like the LitElement default ([6127946](https://github.com/adobe/spectrum-web-components/commit/6127946fd3ffd048a30b7eb4bf6aadf9e7c8752a))
- allow contextmenu event passing to pierce shadow roots ([05b69e9](https://github.com/adobe/spectrum-web-components/commit/05b69e90a56676c44e4757a6c2e19e6fe333b145))
- allow detached elements to be used as content for an overlay ([3ad8383](https://github.com/adobe/spectrum-web-components/commit/3ad83837b6c9a693a4fc24501e3fc7fb2383a12b))
- allow Picker to be reparented ([39e7309](https://github.com/adobe/spectrum-web-components/commit/39e73094be38888599fb189ed4d613f09476310f))
- centralize updated first focusable selector ([300e84c](https://github.com/adobe/spectrum-web-components/commit/300e84c404d031ddad92b4952e48ad3332c4aafd))
- close modal overlays with contextmenu events and pass those to the underlying page ([9e83f3c](https://github.com/adobe/spectrum-web-components/commit/9e83f3c0d2398323ebe941ba253d7a0dc0f40ba6))
- constrain overlay to available window size ([9729b55](https://github.com/adobe/spectrum-web-components/commit/9729b55ef5246662aa50cbc8037bcaeb2f4ac74a))
- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
- correct add/remove timing of overlay events ([474ec6e](https://github.com/adobe/spectrum-web-components/commit/474ec6e85840dc1efee8b134cc6e6163f228920f))
- correct overlay closure order or operations for manual override ([0b7a8c4](https://github.com/adobe/spectrum-web-components/commit/0b7a8c42866ae4f2d38d90fa7b6dc34ed2c21759))
- correct the relationship between overlayWillCloseCallback and phased animations ([c63db8d](https://github.com/adobe/spectrum-web-components/commit/c63db8d2ea4c942fbd52c6d5239ddd3f1ccea5b0))
- delete the used cleanup method ([942ef0f](https://github.com/adobe/spectrum-web-components/commit/942ef0fdc6e7c89e4f554e032c7b9fb760ca47a0))
- describe longpress button to screen readers ([acdcaf4](https://github.com/adobe/spectrum-web-components/commit/acdcaf49adbc701381bfdf1f95f12ab42f791a67))
- **dialog:** updates for delivering dialog content accessibly ([f0ed33c](https://github.com/adobe/spectrum-web-components/commit/f0ed33c3351ae9bc2017202ede8cf206fbf395c2))
- **dropdown:** correct conditional check ([a3a790f](https://github.com/adobe/spectrum-web-components/commit/a3a790f6c3f5f8f0837d619ca57c1090ab14e638))
- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
- ensure focus is managed when tabbing out of a menu ([9bfa81d](https://github.com/adobe/spectrum-web-components/commit/9bfa81d8a677d6c0ab5ac5cd618498496761c69b))
- ensure Overlay.update bypasses the auto close mechanism ([8f2aa2e](https://github.com/adobe/spectrum-web-components/commit/8f2aa2e98507298182356e8ea62e384680aedd2c))
- ensure that an overlay can be released even if it does not complete its fade in animation ([4cbb36f](https://github.com/adobe/spectrum-web-components/commit/4cbb36f91569ce9b7f926437142950fc8fbd59f9))
- ensure that entering an ancestor Menu Item without a submen closes related submenus ([efe5fa1](https://github.com/adobe/spectrum-web-components/commit/efe5fa1ff50c45487f370847444b940e1d6d8a4e))
- expand sync offering for elements with overlay content ([0195843](https://github.com/adobe/spectrum-web-components/commit/0195843e9efac5760a78fa302d91139c84ea5747))
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
- include sync builds in publication configuration ([e731673](https://github.com/adobe/spectrum-web-components/commit/e731673e7d171af667fc87c5b6e521450143e8fe))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- keep parent overlays open when not closing child hover overlays ([643fcff](https://github.com/adobe/spectrum-web-components/commit/643fcff10b6e455611fda76040ea0d29ecac5df9))
- leverage "dvh" rather than measured screen height ([84b9df0](https://github.com/adobe/spectrum-web-components/commit/84b9df0d101d9870a1b0c20eb34ba33fcdd0fbe1))
- manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))
- **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))
- **overlay:** add overlay lifecycle methods to stack management ([9361527](https://github.com/adobe/spectrum-web-components/commit/9361527bc63896bcee2933d96b5021aa74386057))
- **overlay:** allow [type="modal"] hover overlays to be closed ([5a6802b](https://github.com/adobe/spectrum-web-components/commit/5a6802bc06869cd255bdbfcc460f836c247f01fb))
- **overlay:** allow external style access to "sp-theme" elements in overlays as a CSS part ([a107f66](https://github.com/adobe/spectrum-web-components/commit/a107f66ae171e857e5f84cfff9f7a27cc5bd320d))
- **overlay:** allow overlay-trigger to declaratively open overlay content ([194a44e](https://github.com/adobe/spectrum-web-components/commit/194a44e78df73ca4a5520e24b308667c23331880))
- **overlay:** close when overlay-trigger becomes [disabled] ([6f27e25](https://github.com/adobe/spectrum-web-components/commit/6f27e25658dd23949ef07c6df72c43768651482b))
- **overlay:** correct overlay content sizing ([d9bcd6f](https://github.com/adobe/spectrum-web-components/commit/d9bcd6fd6b4eecae297c6e5cc5330e79a9e198ff))
- **overlay:** do not focus the trigger when closing an overlay, unless expected ([21d7dfe](https://github.com/adobe/spectrum-web-components/commit/21d7dfeaa94919586bede27a9c7ae077a2d214a5))
- **overlay:** enforce the full frame ([63628e9](https://github.com/adobe/spectrum-web-components/commit/63628e93de2daec632025f2659a86ff18e487a8e))
- **overlay:** ensure overlay addition occurs after closing previous ([7d2b102](https://github.com/adobe/spectrum-web-components/commit/7d2b102f30731513639582fed8ed0e1b46d569cf))
- **overlay:** ensure undefined data is not passed into theme ([3e2e1ca](https://github.com/adobe/spectrum-web-components/commit/3e2e1caa4c37eedf6e569b5124c9e59f207bb92f))
- **overlay:** export OverlayTriggerInteractions type ([4caec7f](https://github.com/adobe/spectrum-web-components/commit/4caec7f33ec97ba7b21239c0be739b56885dac0a))
- **overlay:** extend state machine to manage disposal process ([f0f26af](https://github.com/adobe/spectrum-web-components/commit/f0f26afef2870cf545afa120c8ece076ed241f21))
- **overlay:** focus closure action on ancestor scroll, not participant resize ([925af0a](https://github.com/adobe/spectrum-web-components/commit/925af0af345fd0b9dc532efff052ac26ebdde80b))
- **overlay:** handle hover/longpress more directly via the "open" attribute ([7b2b64b](https://github.com/adobe/spectrum-web-components/commit/7b2b64b6be931381a1ca1c83f941677fa06750ff))
- **overlay:** init tab trapping on OverlayStack construction ([a3121e3](https://github.com/adobe/spectrum-web-components/commit/a3121e38df47fb528f8366cdb68e83417d78dc95))
- **overlay:** measure initial overlay data offscreen ([fecda5a](https://github.com/adobe/spectrum-web-components/commit/fecda5a6f8e34261776c2d71c1f001c0cd76c3ce))
- **overlay:** move "escape" listener to "keydown" ([813b341](https://github.com/adobe/spectrum-web-components/commit/813b3415ab16391e717e84a61c74b304a67c2e03))
- **overlay:** new popper version tracks scroll through assigned slots ([ea2bac4](https://github.com/adobe/spectrum-web-components/commit/ea2bac4f7d9c4df98a6a65c19229ef1c18a74791))
- **overlay:** only "tab trap" when you mean to ([74e1bd2](https://github.com/adobe/spectrum-web-components/commit/74e1bd2182785ec14f944bef8806ecc3e8d15c10))
- **overlay:** override SpectrumCSS tip rules and process usage in popper ([aad3dec](https://github.com/adobe/spectrum-web-components/commit/aad3dece0f6452c9eef1e0d9b828ca8694c3a9a9))
- **overlay:** persist hover overlay when there is not click content ([27111a9](https://github.com/adobe/spectrum-web-components/commit/27111a95831dc0dc846af8f889a9479294ab8515))
- **overlay:** place return focus element on demand ([d262237](https://github.com/adobe/spectrum-web-components/commit/d2622374346c0a0f55419f87dd4399918c3aaa15))
- **overlay:** reduce DOM and use of "display: contents" for simplicity and accessibility ([2e02075](https://github.com/adobe/spectrum-web-components/commit/2e0207583eb8514a54254b43214f2c9e39d98e81))
- **overlay:** reduce the control active-overlay places on its content ([9d12571](https://github.com/adobe/spectrum-web-components/commit/9d12571e59dfc7afa52ce14b70f2fdad1b607de1))
- **overlay:** remove trapped content from a11y tree, manage focus, open projected content ([6c496c0](https://github.com/adobe/spectrum-web-components/commit/6c496c0a930737b7fd74a565766ab41339691551))
- **overlay:** remove unused dependency ([a3f3a72](https://github.com/adobe/spectrum-web-components/commit/a3f3a72993311e4218e635d4e6e6b1dab0ef5478))
- **overlay:** reset cached values and applied CSS before "updating" overlays ([b871e52](https://github.com/adobe/spectrum-web-components/commit/b871e52950aaa3b1d7990d77e26b8285040ecb6e))
- **overlay:** resolve async races with closeOverlays and manageOpen ([ff3738e](https://github.com/adobe/spectrum-web-components/commit/ff3738ea7afc12f258a7745777034ee70d6bf601))
- **overlay:** track "modalRoots" for expanded overlay management ([dceccb1](https://github.com/adobe/spectrum-web-components/commit/dceccb1617d54da4c0db8035954a4eb4e0367c30))
- **overlay:** traverse up through shadow roots when determining parent overlay ([27f232c](https://github.com/adobe/spectrum-web-components/commit/27f232c28d30288b75187b80744b2581d6017b77))
- **overlay:** use esm build from popper and point through to types ([078ca0f](https://github.com/adobe/spectrum-web-components/commit/078ca0fb9bc43d1ee5288e641ff1ec49f40e8df5))
- **overlay:** use isolatedModules in tsconfig ([48d6069](https://github.com/adobe/spectrum-web-components/commit/48d60694ad5d6014b8664f515e698651f55c9e5f))
- **overlay:** use tabindex=-1 but always remove it on open ([6047003](https://github.com/adobe/spectrum-web-components/commit/6047003eca58232f90a0c6b2ab0e5bd9fb678eb7))
- **overlay:** vend a VirtualTrigger for overlays with no element trigger ([a359c60](https://github.com/adobe/spectrum-web-components/commit/a359c6078aa4fac3c9a7bd140609acd4d9aed81d))
- **picker:** use "modal" as the menu overlay interaction ([c8fbbe2](https://github.com/adobe/spectrum-web-components/commit/c8fbbe27b19702909855575b1afd38fb064e8378))
- prevent "hover" overlays from receiving focus ([7bd5ac2](https://github.com/adobe/spectrum-web-components/commit/7bd5ac26589f4248bdcde1ee3a168052b5a7bf20))
- prevent "hover" overlays from returning focus to the root of a parent modal ([ceb8fa7](https://github.com/adobe/spectrum-web-components/commit/ceb8fa73d23f6c9ccb6f2a00c18708d496975473))
- prevent leaving multiple submenus open at a time ([d2bfbb2](https://github.com/adobe/spectrum-web-components/commit/d2bfbb2d8334ae1a6bd21381092d54914b8f708c))
- prevent longpress when interacting with context menu ([f8b0732](https://github.com/adobe/spectrum-web-components/commit/f8b07321741ee44515fced9923167b96561cdd48))
- prevent touch scolling on non-modal content ([e471feb](https://github.com/adobe/spectrum-web-components/commit/e471febf14e64d35b57ebc0c1596c52282a6ff2a))
- special case the possibility of leaving an overlay trigger by entering its overlay content ([c32a075](https://github.com/adobe/spectrum-web-components/commit/c32a075e0e80d89e9c71dea4a9529971691c1098))
- **theme:** track default theme values dynamically ([a0c306c](https://github.com/adobe/spectrum-web-components/commit/a0c306c9682d97cefa1258e01ce6eee179f0e071))
- **tooltip:** correct arrow orientation, remove popper-arrow-rotate ([fcd6ea2](https://github.com/adobe/spectrum-web-components/commit/fcd6ea28ef5e4f06a07994ebd8f8b9be1a934eb2))
- update "reparentChildren" types for flexibility ([2d358be](https://github.com/adobe/spectrum-web-components/commit/2d358be094cf73785d0858545ccd0f9ca2aa8db0))
- update presence confirmation so popper is available on update ([24f8380](https://github.com/adobe/spectrum-web-components/commit/24f83800a2011f9181947795d9249b87be99f8ab))
- update screen reader interface with menu items list ([16756b5](https://github.com/adobe/spectrum-web-components/commit/16756b56c0f7f9561426acc202997fb098e8f19a))
- update when events are added to manage overlays ([60cddac](https://github.com/adobe/spectrum-web-components/commit/60cddac69554d00095aee492608d85d6513c8928))
- use "fixed" strategy to prevent unexpected overlay placement ([e39e108](https://github.com/adobe/spectrum-web-components/commit/e39e108def1336adabb21823d1454e917fd38599))
- use height: 100% to avoid layout breaks ([1498129](https://github.com/adobe/spectrum-web-components/commit/14981291e6d860a8fde7e1746a4a03af4df1e572))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))
- use less restrictive overlay sizing ([f6917aa](https://github.com/adobe/spectrum-web-components/commit/f6917aa4ca22360ba66e40fc933c0e994a04b8c9))
- use typescript@^4.5 for "native" document.fonts typings ([a3e4aea](https://github.com/adobe/spectrum-web-components/commit/a3e4aea802c796e9029b2bc32f58639954db831b))
- wait for fonts ready before positioning overlays ([cb8026a](https://github.com/adobe/spectrum-web-components/commit/cb8026a1999a4458b442673291214269fc1e1cef))

### Features

- add open/close events for some menus and overlays ([17f0a58](https://github.com/adobe/spectrum-web-components/commit/17f0a58722fdfee39653c2abde048391f7f24564))
- add support for Spectrum Express ([12bfe99](https://github.com/adobe/spectrum-web-components/commit/12bfe99570122514fa88ce1a4e4a1591bcc5aa70))
- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- allow activation of longpress content ([55e71fd](https://github.com/adobe/spectrum-web-components/commit/55e71fdf9fd5dde489871c3d9798ef8957f4e5b6))
- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))
- **dropdown:** open menu UI with overlay system ([9811eeb](https://github.com/adobe/spectrum-web-components/commit/9811eebc33d892da46752981f5bfa49c42ab1192))
- **field-group:** add field-group pattern ([f8d265c](https://github.com/adobe/spectrum-web-components/commit/f8d265c3352f4a97fc103a09ce8eb56511dcedbb))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- join overlay-root and overlay-trigger as overlay ([dcde42c](https://github.com/adobe/spectrum-web-components/commit/dcde42c118b76bf8466c7475611e95783a1dcb3d))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
- leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))
- **overlay:** manage focus throwing and tab trapping ([27a0b53](https://github.com/adobe/spectrum-web-components/commit/27a0b53ea94d19bb18b7d3f89763b06dc1b42b59))
- **overlay:** move entire package behind dynamic import by default ([9b0a74d](https://github.com/adobe/spectrum-web-components/commit/9b0a74de1f32ccd8cde6cabe4c06f990064f11ae))
- **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))
- **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))
- **progress-bar:** use core tokens ([540552e](https://github.com/adobe/spectrum-web-components/commit/540552ecda4cfab4f26045a6ef2ed58457190ab9))
- reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))
- rework overlays to use popper ([e17d1bb](https://github.com/adobe/spectrum-web-components/commit/e17d1bb23082b788ea921ec15315ea955e2596eb))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- **sidenav:** add keyboard accessibility ([6ff622b](https://github.com/adobe/spectrum-web-components/commit/6ff622bf89ad319a7d464fbdd2477c7b55b65cdd))
- **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))
- **story-decorator:** add story decorator to replace knobs for theme application ([7c0c6be](https://github.com/adobe/spectrum-web-components/commit/7c0c6be37d58ad3e6d8973e8d4f5ccc587bf55af))
- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

### Reverts

- Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))

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

- **progress-bar:** use core tokens ([540552e](https://github.com/adobe/spectrum-web-components/commit/540552ecda4cfab4f26045a6ef2ed58457190ab9))

## [0.18.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.10...@spectrum-web-components/overlay@0.18.11) (2023-01-23)

### Bug Fixes

- **overlay:** reset cached values and applied CSS before "updating" overlays ([b871e52](https://github.com/adobe/spectrum-web-components/commit/b871e52950aaa3b1d7990d77e26b8285040ecb6e))

## [0.18.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.9...@spectrum-web-components/overlay@0.18.10) (2023-01-09)

### Bug Fixes

- use "fixed" strategy to prevent unexpected overlay placement ([e39e108](https://github.com/adobe/spectrum-web-components/commit/e39e108def1336adabb21823d1454e917fd38599))

## [0.18.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.8...@spectrum-web-components/overlay@0.18.9) (2022-12-08)

### Bug Fixes

- ensure Overlay.update bypasses the auto close mechanism ([8f2aa2e](https://github.com/adobe/spectrum-web-components/commit/8f2aa2e98507298182356e8ea62e384680aedd2c))
- leverage "dvh" rather than measured screen height ([84b9df0](https://github.com/adobe/spectrum-web-components/commit/84b9df0d101d9870a1b0c20eb34ba33fcdd0fbe1))

## [0.18.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.7...@spectrum-web-components/overlay@0.18.8) (2022-11-21)

### Bug Fixes

- ensure that an overlay can be released even if it does not complete its fade in animation ([4cbb36f](https://github.com/adobe/spectrum-web-components/commit/4cbb36f91569ce9b7f926437142950fc8fbd59f9))
- **overlay:** focus closure action on ancestor scroll, not participant resize ([925af0a](https://github.com/adobe/spectrum-web-components/commit/925af0af345fd0b9dc532efff052ac26ebdde80b))

## [0.18.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.6...@spectrum-web-components/overlay@0.18.7) (2022-11-14)

### Bug Fixes

- keep parent overlays open when not closing child hover overlays ([643fcff](https://github.com/adobe/spectrum-web-components/commit/643fcff10b6e455611fda76040ea0d29ecac5df9))

## [0.18.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.5...@spectrum-web-components/overlay@0.18.6) (2022-10-28)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.18.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.4...@spectrum-web-components/overlay@0.18.5) (2022-10-17)

### Bug Fixes

- correct the relationship between overlayWillCloseCallback and phased animations ([c63db8d](https://github.com/adobe/spectrum-web-components/commit/c63db8d2ea4c942fbd52c6d5239ddd3f1ccea5b0))
- **overlay:** init tab trapping on OverlayStack construction ([a3121e3](https://github.com/adobe/spectrum-web-components/commit/a3121e38df47fb528f8366cdb68e83417d78dc95))

## [0.18.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.3...@spectrum-web-components/overlay@0.18.4) (2022-10-10)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.18.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.2...@spectrum-web-components/overlay@0.18.3) (2022-09-15)

### Bug Fixes

- special case the possibility of leaving an overlay trigger by entering its overlay content ([c32a075](https://github.com/adobe/spectrum-web-components/commit/c32a075e0e80d89e9c71dea4a9529971691c1098))

## [0.18.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.1...@spectrum-web-components/overlay@0.18.2) (2022-09-14)

### Bug Fixes

- **overlay:** move "escape" listener to "keydown" ([813b341](https://github.com/adobe/spectrum-web-components/commit/813b3415ab16391e717e84a61c74b304a67c2e03))

## [0.18.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.18.0...@spectrum-web-components/overlay@0.18.1) (2022-08-24)

### Bug Fixes

- prevent "hover" overlays from returning focus to the root of a parent modal ([ceb8fa7](https://github.com/adobe/spectrum-web-components/commit/ceb8fa73d23f6c9ccb6f2a00c18708d496975473))
- prevent longpress when interacting with context menu ([f8b0732](https://github.com/adobe/spectrum-web-components/commit/f8b07321741ee44515fced9923167b96561cdd48))

# [0.18.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.17.0...@spectrum-web-components/overlay@0.18.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

# [0.17.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.5...@spectrum-web-components/overlay@0.17.0) (2022-08-04)

### Bug Fixes

- **overlay:** export OverlayTriggerInteractions type ([4caec7f](https://github.com/adobe/spectrum-web-components/commit/4caec7f33ec97ba7b21239c0be739b56885dac0a))

### Features

- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))

## [0.16.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.4...@spectrum-web-components/overlay@0.16.5) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.16.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.3...@spectrum-web-components/overlay@0.16.4) (2022-06-29)

### Bug Fixes

- ensure that entering an ancestor Menu Item without a submen closes related submenus ([efe5fa1](https://github.com/adobe/spectrum-web-components/commit/efe5fa1ff50c45487f370847444b940e1d6d8a4e))

## [0.16.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.2...@spectrum-web-components/overlay@0.16.3) (2022-06-07)

### Bug Fixes

- prevent leaving multiple submenus open at a time ([d2bfbb2](https://github.com/adobe/spectrum-web-components/commit/d2bfbb2d8334ae1a6bd21381092d54914b8f708c))

## [0.16.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.1...@spectrum-web-components/overlay@0.16.2) (2022-05-27)

### Bug Fixes

- add content flow fallbacks to the position manager ([c008957](https://github.com/adobe/spectrum-web-components/commit/c0089571be599577f75b2fe7929b8ee26529358d))
- prevent "hover" overlays from receiving focus ([7bd5ac2](https://github.com/adobe/spectrum-web-components/commit/7bd5ac26589f4248bdcde1ee3a168052b5a7bf20))

## [0.16.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.16.0...@spectrum-web-components/overlay@0.16.1) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.16.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.15.3...@spectrum-web-components/overlay@0.16.0) (2022-04-21)

### Bug Fixes

- allow Picker to be reparented ([39e7309](https://github.com/adobe/spectrum-web-components/commit/39e73094be38888599fb189ed4d613f09476310f))
- use less restrictive overlay sizing ([f6917aa](https://github.com/adobe/spectrum-web-components/commit/f6917aa4ca22360ba66e40fc933c0e994a04b8c9))

### Features

- add support for Spectrum Express ([12bfe99](https://github.com/adobe/spectrum-web-components/commit/12bfe99570122514fa88ce1a4e4a1591bcc5aa70))
- reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))

## [0.15.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.15.2...@spectrum-web-components/overlay@0.15.3) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.15.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.15.1...@spectrum-web-components/overlay@0.15.2) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.15.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.15.0...@spectrum-web-components/overlay@0.15.1) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.15.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.14.1...@spectrum-web-components/overlay@0.15.0) (2022-03-04)

### Bug Fixes

- **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))

### Features

- leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))

## [0.14.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.14.0...@spectrum-web-components/overlay@0.14.1) (2022-02-22)

### Bug Fixes

- **dialog:** updates for delivering dialog content accessibly ([f0ed33c](https://github.com/adobe/spectrum-web-components/commit/f0ed33c3351ae9bc2017202ede8cf206fbf395c2))
- **overlay:** measure initial overlay data offscreen ([fecda5a](https://github.com/adobe/spectrum-web-components/commit/fecda5a6f8e34261776c2d71c1f001c0cd76c3ce))

# [0.14.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.4...@spectrum-web-components/overlay@0.14.0) (2022-02-02)

### Features

- **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))

## [0.13.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.3...@spectrum-web-components/overlay@0.13.4) (2022-01-26)

### Bug Fixes

- **overlay:** remove unused dependency ([a3f3a72](https://github.com/adobe/spectrum-web-components/commit/a3f3a72993311e4218e635d4e6e6b1dab0ef5478))

## [0.13.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.2...@spectrum-web-components/overlay@0.13.3) (2022-01-26)

### Bug Fixes

- describe longpress button to screen readers ([acdcaf4](https://github.com/adobe/spectrum-web-components/commit/acdcaf49adbc701381bfdf1f95f12ab42f791a67))

## [0.13.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.1...@spectrum-web-components/overlay@0.13.2) (2022-01-07)

### Bug Fixes

- **overlay:** reduce DOM and use of "display: contents" for simplicity and accessibility ([2e02075](https://github.com/adobe/spectrum-web-components/commit/2e0207583eb8514a54254b43214f2c9e39d98e81))

## [0.13.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.13.0...@spectrum-web-components/overlay@0.13.1) (2021-12-13)

### Bug Fixes

- use typescript@^4.5 for "native" document.fonts typings ([a3e4aea](https://github.com/adobe/spectrum-web-components/commit/a3e4aea802c796e9029b2bc32f58639954db831b))

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.12.1...@spectrum-web-components/overlay@0.13.0) (2021-11-08)

### Features

- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.12.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.12.0...@spectrum-web-components/overlay@0.12.1) (2021-11-08)

### Bug Fixes

- abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))
- prevent touch scolling on non-modal content ([e471feb](https://github.com/adobe/spectrum-web-components/commit/e471febf14e64d35b57ebc0c1596c52282a6ff2a))

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.16...@spectrum-web-components/overlay@0.12.0) (2021-11-02)

### Bug Fixes

- centralize updated first focusable selector ([300e84c](https://github.com/adobe/spectrum-web-components/commit/300e84c404d031ddad92b4952e48ad3332c4aafd))
- update screen reader interface with menu items list ([16756b5](https://github.com/adobe/spectrum-web-components/commit/16756b56c0f7f9561426acc202997fb098e8f19a))
- **picker:** use "modal" as the menu overlay interaction ([c8fbbe2](https://github.com/adobe/spectrum-web-components/commit/c8fbbe27b19702909855575b1afd38fb064e8378))

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.11.16](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.15...@spectrum-web-components/overlay@0.11.16) (2021-10-12)

### Bug Fixes

- **overlay:** allow [type="modal"] hover overlays to be closed ([5a6802b](https://github.com/adobe/spectrum-web-components/commit/5a6802bc06869cd255bdbfcc460f836c247f01fb))
- **overlay:** resolve async races with closeOverlays and manageOpen ([ff3738e](https://github.com/adobe/spectrum-web-components/commit/ff3738ea7afc12f258a7745777034ee70d6bf601))
- **overlay:** traverse up through shadow roots when determining parent overlay ([27f232c](https://github.com/adobe/spectrum-web-components/commit/27f232c28d30288b75187b80744b2581d6017b77))

## [0.11.15](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.14...@spectrum-web-components/overlay@0.11.15) (2021-09-20)

### Bug Fixes

- allow contextmenu event passing to pierce shadow roots ([05b69e9](https://github.com/adobe/spectrum-web-components/commit/05b69e90a56676c44e4757a6c2e19e6fe333b145))
- correct add/remove timing of overlay events ([474ec6e](https://github.com/adobe/spectrum-web-components/commit/474ec6e85840dc1efee8b134cc6e6163f228920f))

## [0.11.14](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.13...@spectrum-web-components/overlay@0.11.14) (2021-09-13)

### Bug Fixes

- close modal overlays with contextmenu events and pass those to the underlying page ([9e83f3c](https://github.com/adobe/spectrum-web-components/commit/9e83f3c0d2398323ebe941ba253d7a0dc0f40ba6))

## [0.11.13](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.12...@spectrum-web-components/overlay@0.11.13) (2021-08-24)

### Bug Fixes

- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.11.12](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.11...@spectrum-web-components/overlay@0.11.12) (2021-08-17)

### Bug Fixes

- update when events are added to manage overlays ([60cddac](https://github.com/adobe/spectrum-web-components/commit/60cddac69554d00095aee492608d85d6513c8928))

## [0.11.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.10...@spectrum-web-components/overlay@0.11.11) (2021-08-03)

### Bug Fixes

- allow "updateComplete" to resolve to a boolean like the LitElement default ([6127946](https://github.com/adobe/spectrum-web-components/commit/6127946fd3ffd048a30b7eb4bf6aadf9e7c8752a))
- expand sync offering for elements with overlay content ([0195843](https://github.com/adobe/spectrum-web-components/commit/0195843e9efac5760a78fa302d91139c84ea5747))

## [0.11.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.9...@spectrum-web-components/overlay@0.11.10) (2021-07-22)

### Bug Fixes

- **overlay:** allow external style access to "sp-theme" elements in overlays as a CSS part ([a107f66](https://github.com/adobe/spectrum-web-components/commit/a107f66ae171e857e5f84cfff9f7a27cc5bd320d))
- delete the used cleanup method ([942ef0f](https://github.com/adobe/spectrum-web-components/commit/942ef0fdc6e7c89e4f554e032c7b9fb760ca47a0))

## [0.11.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.8...@spectrum-web-components/overlay@0.11.9) (2021-07-01)

### Bug Fixes

- allow detached elements to be used as content for an overlay ([3ad8383](https://github.com/adobe/spectrum-web-components/commit/3ad83837b6c9a693a4fc24501e3fc7fb2383a12b))
- manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))

## [0.11.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.7...@spectrum-web-components/overlay@0.11.8) (2021-06-16)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.11.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.6...@spectrum-web-components/overlay@0.11.7) (2021-06-07)

### Bug Fixes

- ensure focus is managed when tabbing out of a menu ([9bfa81d](https://github.com/adobe/spectrum-web-components/commit/9bfa81d8a677d6c0ab5ac5cd618498496761c69b))
- **overlay:** vend a VirtualTrigger for overlays with no element trigger ([a359c60](https://github.com/adobe/spectrum-web-components/commit/a359c6078aa4fac3c9a7bd140609acd4d9aed81d))

## [0.11.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.5...@spectrum-web-components/overlay@0.11.6) (2021-05-24)

### Bug Fixes

- **overlay:** add overlay lifecycle methods to stack management ([9361527](https://github.com/adobe/spectrum-web-components/commit/9361527bc63896bcee2933d96b5021aa74386057))
- **overlay:** use tabindex=-1 but always remove it on open ([6047003](https://github.com/adobe/spectrum-web-components/commit/6047003eca58232f90a0c6b2ab0e5bd9fb678eb7))

## [0.11.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.4...@spectrum-web-components/overlay@0.11.5) (2021-05-12)

### Bug Fixes

- **overlay:** reduce the control active-overlay places on its content ([9d12571](https://github.com/adobe/spectrum-web-components/commit/9d12571e59dfc7afa52ce14b70f2fdad1b607de1))
- update "reparentChildren" types for flexibility ([2d358be](https://github.com/adobe/spectrum-web-components/commit/2d358be094cf73785d0858545ccd0f9ca2aa8db0))
- update presence confirmation so popper is available on update ([24f8380](https://github.com/adobe/spectrum-web-components/commit/24f83800a2011f9181947795d9249b87be99f8ab))

## [0.11.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.3...@spectrum-web-components/overlay@0.11.4) (2021-04-15)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.2...@spectrum-web-components/overlay@0.11.3) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.1...@spectrum-web-components/overlay@0.11.2) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.11.0...@spectrum-web-components/overlay@0.11.1) (2021-03-22)

### Bug Fixes

- **overlay:** handle hover/longpress more directly via the "open" attribute ([7b2b64b](https://github.com/adobe/spectrum-web-components/commit/7b2b64b6be931381a1ca1c83f941677fa06750ff))

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.10.1...@spectrum-web-components/overlay@0.11.0) (2021-03-22)

### Bug Fixes

- **overlay:** allow overlay-trigger to declaratively open overlay content ([194a44e](https://github.com/adobe/spectrum-web-components/commit/194a44e78df73ca4a5520e24b308667c23331880))
- **overlay:** persist hover overlay when there is not click content ([27111a9](https://github.com/adobe/spectrum-web-components/commit/27111a95831dc0dc846af8f889a9479294ab8515))

### Features

- **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.10.0...@spectrum-web-components/overlay@0.10.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.9.0...@spectrum-web-components/overlay@0.10.0) (2021-03-04)

### Bug Fixes

- **overlay:** correct overlay content sizing ([d9bcd6f](https://github.com/adobe/spectrum-web-components/commit/d9bcd6fd6b4eecae297c6e5cc5330e79a9e198ff))
- **overlay:** track "modalRoots" for expanded overlay management ([dceccb1](https://github.com/adobe/spectrum-web-components/commit/dceccb1617d54da4c0db8035954a4eb4e0367c30))
- wait for fonts ready before positioning overlays ([cb8026a](https://github.com/adobe/spectrum-web-components/commit/cb8026a1999a4458b442673291214269fc1e1cef))

### Features

- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.8.2...@spectrum-web-components/overlay@0.9.0) (2021-02-11)

### Bug Fixes

- **overlay:** place return focus element on demand ([d262237](https://github.com/adobe/spectrum-web-components/commit/d2622374346c0a0f55419f87dd4399918c3aaa15))

### Features

- allow activation of longpress content ([55e71fd](https://github.com/adobe/spectrum-web-components/commit/55e71fdf9fd5dde489871c3d9798ef8957f4e5b6))

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.8.1...@spectrum-web-components/overlay@0.8.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.8.0...@spectrum-web-components/overlay@0.8.1) (2021-01-28)

### Bug Fixes

- **overlay:** remove trapped content from a11y tree, manage focus, open projected content ([6c496c0](https://github.com/adobe/spectrum-web-components/commit/6c496c0a930737b7fd74a565766ab41339691551))
- **tooltip:** correct arrow orientation, remove popper-arrow-rotate ([fcd6ea2](https://github.com/adobe/spectrum-web-components/commit/fcd6ea28ef5e4f06a07994ebd8f8b9be1a934eb2))

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.4...@spectrum-web-components/overlay@0.8.0) (2021-01-21)

### Bug Fixes

- **overlay:** do not focus the trigger when closing an overlay, unless expected ([21d7dfe](https://github.com/adobe/spectrum-web-components/commit/21d7dfeaa94919586bede27a9c7ae077a2d214a5))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- **overlay:** use esm build from popper and point through to types ([078ca0f](https://github.com/adobe/spectrum-web-components/commit/078ca0fb9bc43d1ee5288e641ff1ec49f40e8df5))
- **overlay:** use isolatedModules in tsconfig ([48d6069](https://github.com/adobe/spectrum-web-components/commit/48d60694ad5d6014b8664f515e698651f55c9e5f))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- add open/close events for some menus and overlays ([17f0a58](https://github.com/adobe/spectrum-web-components/commit/17f0a58722fdfee39653c2abde048391f7f24564))
- **field-group:** add field-group pattern ([f8d265c](https://github.com/adobe/spectrum-web-components/commit/f8d265c3352f4a97fc103a09ce8eb56511dcedbb))
- **story-decorator:** add story decorator to replace knobs for theme application ([7c0c6be](https://github.com/adobe/spectrum-web-components/commit/7c0c6be37d58ad3e6d8973e8d4f5ccc587bf55af))

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.4...@spectrum-web-components/overlay@0.7.0) (2021-01-13)

### Bug Fixes

- **overlay:** do not focus the trigger when closing an overlay, unless expected ([21d7dfe](https://github.com/adobe/spectrum-web-components/commit/21d7dfeaa94919586bede27a9c7ae077a2d214a5))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- **overlay:** use esm build from popper and point through to types ([078ca0f](https://github.com/adobe/spectrum-web-components/commit/078ca0fb9bc43d1ee5288e641ff1ec49f40e8df5))
- **overlay:** use isolatedModules in tsconfig ([48d6069](https://github.com/adobe/spectrum-web-components/commit/48d60694ad5d6014b8664f515e698651f55c9e5f))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- add open/close events for some menus and overlays ([17f0a58](https://github.com/adobe/spectrum-web-components/commit/17f0a58722fdfee39653c2abde048391f7f24564))
- **field-group:** add field-group pattern ([f8d265c](https://github.com/adobe/spectrum-web-components/commit/f8d265c3352f4a97fc103a09ce8eb56511dcedbb))
- **story-decorator:** add story decorator to replace knobs for theme application ([7c0c6be](https://github.com/adobe/spectrum-web-components/commit/7c0c6be37d58ad3e6d8973e8d4f5ccc587bf55af))

## [0.6.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.3...@spectrum-web-components/overlay@0.6.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.6.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.2...@spectrum-web-components/overlay@0.6.3) (2020-10-12)

### Bug Fixes

- **overlay:** close when overlay-trigger becomes [disabled](<[6f27e25](https://github.com/adobe/spectrum-web-components/commit/6f27e25658dd23949ef07c6df72c43768651482b)>)
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))

## [0.6.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.1...@spectrum-web-components/overlay@0.6.2) (2020-09-25)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.6.0...@spectrum-web-components/overlay@0.6.1) (2020-09-15)

### Bug Fixes

- **overlay:** only "tab trap" when you mean to ([74e1bd2](https://github.com/adobe/spectrum-web-components/commit/74e1bd2182785ec14f944bef8806ecc3e8d15c10))

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.5.2...@spectrum-web-components/overlay@0.6.0) (2020-08-31)

### Bug Fixes

- correct overlay closure order or operations for manual override ([0b7a8c4](https://github.com/adobe/spectrum-web-components/commit/0b7a8c42866ae4f2d38d90fa7b6dc34ed2c21759))

### Features

- **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.5.1...@spectrum-web-components/overlay@0.5.2) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.5.0...@spectrum-web-components/overlay@0.5.1) (2020-08-13)

### Bug Fixes

- include sync builds in publication configuration ([e731673](https://github.com/adobe/spectrum-web-components/commit/e731673e7d171af667fc87c5b6e521450143e8fe))

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.4.3...@spectrum-web-components/overlay@0.5.0) (2020-08-13)

### Bug Fixes

- **overlay:** enforce the full frame ([63628e9](https://github.com/adobe/spectrum-web-components/commit/63628e93de2daec632025f2659a86ff18e487a8e))
- **overlay:** ensure overlay addition occurs after closing previous ([7d2b102](https://github.com/adobe/spectrum-web-components/commit/7d2b102f30731513639582fed8ed0e1b46d569cf))

### Features

- **overlay:** move entire package behind dynamic import by default ([9b0a74d](https://github.com/adobe/spectrum-web-components/commit/9b0a74de1f32ccd8cde6cabe4c06f990064f11ae))

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.4.2...@spectrum-web-components/overlay@0.4.3) (2020-08-05)

### Bug Fixes

- use height: 100% to avoid layout breaks ([1498129](https://github.com/adobe/spectrum-web-components/commit/14981291e6d860a8fde7e1746a4a03af4df1e572))

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.4.1...@spectrum-web-components/overlay@0.4.2) (2020-07-24)

### Bug Fixes

- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.4.0...@spectrum-web-components/overlay@0.4.1) (2020-07-22)

**Note:** Version bump only for package @spectrum-web-components/overlay

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.8...@spectrum-web-components/overlay@0.4.0) (2020-07-17)

### Features

- **overlay:** manage focus throwing and tab trapping ([27a0b53](https://github.com/adobe/spectrum-web-components/commit/27a0b53ea94d19bb18b7d3f89763b06dc1b42b59))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.3.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.7...@spectrum-web-components/overlay@0.3.8) (2020-06-08)

### Bug Fixes

- **overlay:** ensure undefined data is not passed into theme ([3e2e1ca](https://github.com/adobe/spectrum-web-components/commit/3e2e1caa4c37eedf6e569b5124c9e59f207bb92f))

## [0.3.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.6...@spectrum-web-components/overlay@0.3.7) (2020-05-08)

### Bug Fixes

- **dropdown:** correct conditional check ([a3a790f](https://github.com/adobe/spectrum-web-components/commit/a3a790f6c3f5f8f0837d619ca57c1090ab14e638))

## [0.3.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.5...@spectrum-web-components/overlay@0.3.6) (2020-05-08)

### Bug Fixes

- constrain overlay to available window size ([9729b55](https://github.com/adobe/spectrum-web-components/commit/9729b55ef5246662aa50cbc8037bcaeb2f4ac74a))

## [0.3.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.4...@spectrum-web-components/overlay@0.3.5) (2020-04-16)

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.3.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.3...@spectrum-web-components/overlay@0.3.4) (2020-04-10)

### Bug Fixes

- **overlay:** new popper version tracks scroll through assigned slots ([ea2bac4](https://github.com/adobe/spectrum-web-components/commit/ea2bac4f7d9c4df98a6a65c19229ef1c18a74791))

## [0.3.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.2...@spectrum-web-components/overlay@0.3.3) (2020-04-07)

**Note:** Version bump only for package @spectrum-web-components/overlay

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.1...@spectrum-web-components/overlay@0.3.2) (2020-03-16)

### Bug Fixes

- **theme:** track default theme values dynamically ([a0c306c](https://github.com/adobe/spectrum-web-components/commit/a0c306c))

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.3.0...@spectrum-web-components/overlay@0.3.1) (2020-03-11)

### Bug Fixes

- **overlay:** extend state machine to manage disposal process ([f0f26af](https://github.com/adobe/spectrum-web-components/commit/f0f26af))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.2.1...@spectrum-web-components/overlay@0.3.0) (2020-02-24)

### Features

- **dropdown:** open menu UI with overlay system ([9811eeb](https://github.com/adobe/spectrum-web-components/commit/9811eeb))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.2.0...@spectrum-web-components/overlay@0.2.1) (2020-02-05)

### Bug Fixes

- **overlay:** override SpectrumCSS tip rules and process usage in popper ([aad3dec](https://github.com/adobe/spectrum-web-components/commit/aad3dec))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/overlay@0.1.0...@spectrum-web-components/overlay@0.2.0) (2020-01-30)

### Features

- rework overlays to use popper ([e17d1bb](https://github.com/adobe/spectrum-web-components/commit/e17d1bb))

# 0.1.0 (2020-01-06)

### Features

- join overlay-root and overlay-trigger as overlay ([dcde42c](https://github.com/adobe/spectrum-web-components/commit/dcde42c))
- **sidenav:** add keyboard accessibility ([6ff622b](https://github.com/adobe/spectrum-web-components/commit/6ff622b))
