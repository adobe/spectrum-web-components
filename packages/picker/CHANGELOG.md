# Change Log

## 1.9.1

### Patch Changes

- Updated dependencies [[`a19cbe3`](https://github.com/adobe/spectrum-web-components/commit/a19cbe3e8b4690d8abd1530e3930e5d48ae43618)]:
    - @spectrum-web-components/overlay@1.9.1
    - @spectrum-web-components/menu@1.9.1
    - @spectrum-web-components/popover@1.9.1
    - @spectrum-web-components/tooltip@1.9.1
    - @spectrum-web-components/button@1.9.1
    - @spectrum-web-components/field-label@1.9.1
    - @spectrum-web-components/icon@1.9.1
    - @spectrum-web-components/icons-ui@1.9.1
    - @spectrum-web-components/icons-workflow@1.9.1
    - @spectrum-web-components/progress-circle@1.9.1
    - @spectrum-web-components/tray@1.9.1
    - @spectrum-web-components/base@1.9.1
    - @spectrum-web-components/reactive-controllers@1.9.1
    - @spectrum-web-components/shared@1.9.1

## 1.9.0

### Patch Changes

- [#5733](https://github.com/adobe/spectrum-web-components/pull/5733) [`dbba861`](https://github.com/adobe/spectrum-web-components/commit/dbba8617475b9e20b304935ab65ca43f744efe93) Thanks [@iuliauta](https://github.com/iuliauta)! - - **Fixed**: Picker border color should be hidden in S2 theme

- [#5730](https://github.com/adobe/spectrum-web-components/pull/5730) [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8) Thanks [@caseyisonit](https://github.com/caseyisonit)! - - **Fixed**: Pending state handling and accessibility in `<sp-picker>` component.
    - **Changed**: Removed dependency on `PendingStateController` and implemented inline pending state handling
    - **Fixed**: Updated aria-labelledby attribute ordering to improve screen reader experience (`icon label applied-label pending-label`)
    - **Fixed**: Updated progress circle implementation to use `role="presentation"` instead of `aria-valuetext`
    - **Added**: Direct pending state visual rendering with improved accessibility

    These changes improve accessibility for pending states while reducing unnecessary component dependencies.

- Updated dependencies [[`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8), [`4880da4`](https://github.com/adobe/spectrum-web-components/commit/4880da4f80a25ae1b475f52ce4ba7914cdcd9de4), [`bdf54c1`](https://github.com/adobe/spectrum-web-components/commit/bdf54c1bc6d3eb20da1a1bf3b40650e6ab1ba399), [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8), [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8), [`72d807c`](https://github.com/adobe/spectrum-web-components/commit/72d807c75d04b0fec1794a8d3e68383ca61d9e4c)]:
    - @spectrum-web-components/button@1.9.0
    - @spectrum-web-components/menu@1.9.0
    - @spectrum-web-components/icons-workflow@1.9.0
    - @spectrum-web-components/progress-circle@1.9.0
    - @spectrum-web-components/reactive-controllers@1.9.0
    - @spectrum-web-components/field-label@1.9.0
    - @spectrum-web-components/icon@1.9.0
    - @spectrum-web-components/overlay@1.9.0
    - @spectrum-web-components/tooltip@1.9.0
    - @spectrum-web-components/tray@1.9.0
    - @spectrum-web-components/icons-ui@1.9.0
    - @spectrum-web-components/popover@1.9.0
    - @spectrum-web-components/base@1.9.0
    - @spectrum-web-components/shared@1.9.0

## 1.8.0

### Minor Changes

- [#5672](https://github.com/adobe/spectrum-web-components/pull/5672) [`6c2acaf`](https://github.com/adobe/spectrum-web-components/commit/6c2acaf14ca1c210a876bdbd65a273d6a5fc22d0) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **Fixed** escape key behavior in modal overlays containing picker components. Previously, pressing the Escape key when a picker was open inside a modal overlay would not properly close the modal, instead moving focus to the picker. Now, the escape key correctly closes the picker first (if open), then closes the modal overlay on subsequent escape key presses.

    This fix adds a check for `this.open` in the picker's `handleEscape` method to ensure proper modal overlay closure behavior.

### Patch Changes

- Updated dependencies [[`14486d6`](https://github.com/adobe/spectrum-web-components/commit/14486d620e88976c794225edb54eaca8392015c7), [`f27ab09`](https://github.com/adobe/spectrum-web-components/commit/f27ab096f4d53543dc53f75ec196c696b78b3baa), [`ee1bae6`](https://github.com/adobe/spectrum-web-components/commit/ee1bae6f9a7401dc31ebc84e4e27f9d39be692d1), [`15be17d`](https://github.com/adobe/spectrum-web-components/commit/15be17db91f1140ccf3cad52b1f2ed6c4b9e28ba), [`14486d6`](https://github.com/adobe/spectrum-web-components/commit/14486d620e88976c794225edb54eaca8392015c7)]:
    - @spectrum-web-components/overlay@1.8.0
    - @spectrum-web-components/menu@1.8.0
    - @spectrum-web-components/button@1.8.0
    - @spectrum-web-components/popover@1.8.0
    - @spectrum-web-components/tooltip@1.8.0
    - @spectrum-web-components/field-label@1.8.0
    - @spectrum-web-components/icon@1.8.0
    - @spectrum-web-components/icons-ui@1.8.0
    - @spectrum-web-components/icons-workflow@1.8.0
    - @spectrum-web-components/progress-circle@1.8.0
    - @spectrum-web-components/tray@1.8.0
    - @spectrum-web-components/base@1.8.0
    - @spectrum-web-components/reactive-controllers@1.8.0
    - @spectrum-web-components/shared@1.8.0

## 1.7.0

### Patch Changes

- Updated dependencies [[`3aeafdd`](https://github.com/adobe/spectrum-web-components/commit/3aeafddab98fe30f4db538ded9052997aaa05b07), [`a646ae8`](https://github.com/adobe/spectrum-web-components/commit/a646ae8b0e652308d359226740d2cb189e492e45), [`cde976d`](https://github.com/adobe/spectrum-web-components/commit/cde976ddfa71f898e2d0404ecc53150db149a861)]:
    - @spectrum-web-components/menu@1.7.0
    - @spectrum-web-components/overlay@1.7.0
    - @spectrum-web-components/tooltip@1.7.0
    - @spectrum-web-components/popover@1.7.0
    - @spectrum-web-components/button@1.7.0
    - @spectrum-web-components/field-label@1.7.0
    - @spectrum-web-components/icon@1.7.0
    - @spectrum-web-components/icons-ui@1.7.0
    - @spectrum-web-components/icons-workflow@1.7.0
    - @spectrum-web-components/progress-circle@1.7.0
    - @spectrum-web-components/tray@1.7.0
    - @spectrum-web-components/base@1.7.0
    - @spectrum-web-components/reactive-controllers@1.7.0
    - @spectrum-web-components/shared@1.7.0

## 1.6.0

### Patch Changes

- [#5358](https://github.com/adobe/spectrum-web-components/pull/5358) [`3c3bc2b`](https://github.com/adobe/spectrum-web-components/commit/3c3bc2bed9f1c731bc662220fe96f67f03331015) Thanks [@nikkimk](https://github.com/nikkimk)! - `PickerBase`(used in `<sp-picker>` and `sp-action-menu>`):

    Fixes focus so that it is not set on `<sp-menu-item>` elements when opened via mouse.

    A keyboard interaction is the only interaction that should set focus on an `<sp-menu-item>` when the menu is opened. A user with a mouse would expect the focus to stay where the mouse is.

    Fixes: #2950

- Updated dependencies [[`03a4439`](https://github.com/adobe/spectrum-web-components/commit/03a443946b760aedc668630f33ac660443ff915e), [`f6cebbd`](https://github.com/adobe/spectrum-web-components/commit/f6cebbd90008a2abb1232c355ae06e8566086093), [`00eb0a8`](https://github.com/adobe/spectrum-web-components/commit/00eb0a889583dff9d964341d9c1c27048be3d19e), [`700489f`](https://github.com/adobe/spectrum-web-components/commit/700489f87e96b895a687431486fb329c7497f2d6), [`a9727d2`](https://github.com/adobe/spectrum-web-components/commit/a9727d2975b01f440c09789c9e7e0122063b6f7e), [`53f3769`](https://github.com/adobe/spectrum-web-components/commit/53f3769f07b6e7853a8a4c0dc63b21fe14cf3d4b)]:
    - @spectrum-web-components/popover@1.6.0
    - @spectrum-web-components/icons-workflow@1.6.0
    - @spectrum-web-components/button@1.6.0
    - @spectrum-web-components/tooltip@1.6.0
    - @spectrum-web-components/menu@1.6.0
    - @spectrum-web-components/overlay@1.6.0
    - @spectrum-web-components/field-label@1.6.0
    - @spectrum-web-components/icon@1.6.0
    - @spectrum-web-components/icons-ui@1.6.0
    - @spectrum-web-components/progress-circle@1.6.0
    - @spectrum-web-components/tray@1.6.0
    - @spectrum-web-components/base@1.6.0
    - @spectrum-web-components/reactive-controllers@1.6.0
    - @spectrum-web-components/shared@1.6.0

## 1.5.0

### Patch Changes

- Updated dependencies [[`86bcd12`](https://github.com/adobe/spectrum-web-components/commit/86bcd122003e99d490a64d466dab3e7d609a6ff3), [`165a904`](https://github.com/adobe/spectrum-web-components/commit/165a904bd01fddea922fe87b181bbf41281f81f0), [`4e06533`](https://github.com/adobe/spectrum-web-components/commit/4e065332e0236757fc3a050e53747ce82ac40ed5), [`8f8735c`](https://github.com/adobe/spectrum-web-components/commit/8f8735c9ec3eac3b6473424c78257cb46ee17f70), [`4c2f908`](https://github.com/adobe/spectrum-web-components/commit/4c2f908a92b383d49eb7197d954966fe1798aa20), [`a69accb`](https://github.com/adobe/spectrum-web-components/commit/a69accb8b44b2612d53d31ba52c99aa751ce9f3a)]:
    - @spectrum-web-components/menu@1.5.0
    - @spectrum-web-components/field-label@1.5.0
    - @spectrum-web-components/tray@1.5.0
    - @spectrum-web-components/button@1.5.0
    - @spectrum-web-components/overlay@1.5.0
    - @spectrum-web-components/popover@1.5.0
    - @spectrum-web-components/tooltip@1.5.0
    - @spectrum-web-components/icon@1.5.0
    - @spectrum-web-components/icons-ui@1.5.0
    - @spectrum-web-components/icons-workflow@1.5.0
    - @spectrum-web-components/progress-circle@1.5.0
    - @spectrum-web-components/base@1.5.0
    - @spectrum-web-components/reactive-controllers@1.5.0
    - @spectrum-web-components/shared@1.5.0

## 1.4.0

### Minor Changes

- [#5187](https://github.com/adobe/spectrum-web-components/pull/5187) [`2a0422e`](https://github.com/adobe/spectrum-web-components/commit/2a0422ec1b667a9f236858f8cc9dca261ba27f9f) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - Disabled drag and select functionality of picker in mobile devices. This is done to prevent click event being captured behind the menu-tray combination because the menu was closing immediately on pointerup.
    - Fixed a bug where the picker in a dialog was not closing when clicking outside the dialog. ([#5111](https://github.com/adobe/spectrum-web-components/issues/5111))
    - Fixed another bug where the elements behind the menu were receiving click events. ([#5060](https://github.com/adobe/spectrum-web-components/issues/5060))

- [#5247](https://github.com/adobe/spectrum-web-components/pull/5247) [`1fc141c`](https://github.com/adobe/spectrum-web-components/commit/1fc141cefc01b8a98910c43a1e4ffaa61e952225) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - fix: moved tooltip outside of the trigger button content which prevents event propagation issues and fixes CSS hover state problems by properly separating the tooltip from the button's content (it no longer is a direct child in the DOM).

### Patch Changes

- [#5213](https://github.com/adobe/spectrum-web-components/pull/5213) [`82212f4`](https://github.com/adobe/spectrum-web-components/commit/82212f4b67c0514120652e3923cc87f1378809e7) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - Updated the attribute name from `forcePopover` to `force-popover` in the Picker and Action menu documentation

- Updated dependencies [[`2a0422e`](https://github.com/adobe/spectrum-web-components/commit/2a0422ec1b667a9f236858f8cc9dca261ba27f9f), [`46cd782`](https://github.com/adobe/spectrum-web-components/commit/46cd7828f65491fc08790e5ba0aec412ee89199d), [`6618422`](https://github.com/adobe/spectrum-web-components/commit/6618422848df234e420eed95f4a5a30557e1e46f), [`70f5f6f`](https://github.com/adobe/spectrum-web-components/commit/70f5f6f3a97b530fb20f9f5ee049e9a8c124b02d)]:
    - @spectrum-web-components/menu@1.4.0
    - @spectrum-web-components/overlay@1.4.0
    - @spectrum-web-components/popover@1.4.0
    - @spectrum-web-components/tooltip@1.4.0
    - @spectrum-web-components/button@1.4.0
    - @spectrum-web-components/field-label@1.4.0
    - @spectrum-web-components/icon@1.4.0
    - @spectrum-web-components/icons-ui@1.4.0
    - @spectrum-web-components/icons-workflow@1.4.0
    - @spectrum-web-components/progress-circle@1.4.0
    - @spectrum-web-components/tray@1.4.0
    - @spectrum-web-components/base@1.4.0
    - @spectrum-web-components/reactive-controllers@1.4.0
    - @spectrum-web-components/shared@1.4.0

## 1.3.0

### Minor Changes

- [#5031](https://github.com/adobe/spectrum-web-components/pull/5031) [`ea38ef0`](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f) Thanks [@nikkimk](https://github.com/nikkimk)! - Used WAI ARIA Authoring Practices Guide (APG) to make accessibility improvements for `<sp-action-menu>`, `<sp-menu>`, and `<sp-picker>`, including:
    - Numpad keys now work with `<sp-picker>` and `<sp-action-menu>` -`<sp-action-menu>`'s `<sp-menu-item>` elements can now be read by a screen reader ([#4556](https://github.com/adobe/spectrum-web-components/issues/4556))
    - `<sp-menu-item>` href can now be clicked by a screen reader ([#4997](https://github.com/adobe/spectrum-web-components/issues/4997))
    - Opening a `<sp-action-menu>`, `<sp-menu>`, and `<sp-picker>` with a keyboard now sets focus on an item within the menu. ([#4557](https://github.com/adobe/spectrum-web-components/issues/4557))

    See the following APG examples for more information:
    - [Navigation Menu Example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/)
    - [Editor Menubar Example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/)

### Patch Changes

- Updated dependencies [[`ea38ef0`](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f), [`468314f`](https://github.com/adobe/spectrum-web-components/commit/468314f45cf5fedb2e9029da210a5886260abca9)]:
    - @spectrum-web-components/reactive-controllers@1.3.0
    - @spectrum-web-components/menu@1.3.0
    - @spectrum-web-components/overlay@1.3.0
    - @spectrum-web-components/button@1.3.0
    - @spectrum-web-components/field-label@1.3.0
    - @spectrum-web-components/tooltip@1.3.0
    - @spectrum-web-components/tray@1.3.0
    - @spectrum-web-components/popover@1.3.0
    - @spectrum-web-components/icon@1.3.0
    - @spectrum-web-components/icons-ui@1.3.0
    - @spectrum-web-components/icons-workflow@1.3.0
    - @spectrum-web-components/progress-circle@1.3.0
    - @spectrum-web-components/base@1.3.0
    - @spectrum-web-components/shared@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

### Bug Fixes

- **action menu:** keyboard accessibility omnibus ([#5031](https://github.com/adobe/spectrum-web-components/issues/5031)) ([ea38ef0](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)), closes [#4623](https://github.com/adobe/spectrum-web-components/issues/4623)
- **picker:** update picker when menu item icons change ([#5088](https://github.com/adobe/spectrum-web-components/issues/5088)) ([63ef1ad](https://github.com/adobe/spectrum-web-components/commit/63ef1adad473ce58647ffe4d5e2a8727caaee07b))

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

### Bug Fixes

- **overlay:** derive popover placement from host in interaction controller ([#5078](https://github.com/adobe/spectrum-web-components/issues/5078)) ([635cf53](https://github.com/adobe/spectrum-web-components/commit/635cf53df237b7f833633cb05d09c0697e61f6f4))
- **picker:** stop the click events from reaching the elements below picker-tray ([#5060](https://github.com/adobe/spectrum-web-components/issues/5060)) ([7e4fdbf](https://github.com/adobe/spectrum-web-components/commit/7e4fdbf3e4487b4c148368b852129b85f88a620b))

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

### Bug Fixes

- **overlay:** make :focus-visible consistent when using overlay type modal ([#4912](https://github.com/adobe/spectrum-web-components/issues/4912)) ([7a5f786](https://github.com/adobe/spectrum-web-components/commit/7a5f786819ff200f5ae2648e2e2c4db3729050a2)), closes [#5021](https://github.com/adobe/spectrum-web-components/issues/5021)

### Features

- **picker:** add forcePopover property ([#5041](https://github.com/adobe/spectrum-web-components/issues/5041)) ([3651e57](https://github.com/adobe/spectrum-web-components/commit/3651e57a90a05e551e6ee650e8ccc73aa05d3e7c))

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))
- **overlay:** make :focus-visible consistent when using overlay type modal ([#4912](https://github.com/adobe/spectrum-web-components/issues/4912)) ([7a5f786](https://github.com/adobe/spectrum-web-components/commit/7a5f786819ff200f5ae2648e2e2c4db3729050a2)), closes [#5021](https://github.com/adobe/spectrum-web-components/issues/5021)

### Features

- add an optional chromatic vrt action ([7d2f840](https://github.com/adobe/spectrum-web-components/commit/7d2f8401cb05c5e23872424f132a1a8edd95b666))
- **picker:** add forcePopover property ([#5041](https://github.com/adobe/spectrum-web-components/issues/5041)) ([3651e57](https://github.com/adobe/spectrum-web-components/commit/3651e57a90a05e551e6ee650e8ccc73aa05d3e7c))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

**Note:** Version bump only for package @spectrum-web-components/picker

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

### Bug Fixes

- **picker:** don't handle pointerdown for touch devices ([#4850](https://github.com/adobe/spectrum-web-components/issues/4850)) ([3a62d13](https://github.com/adobe/spectrum-web-components/commit/3a62d133b8074e5b40f1eedfa9a5566dc53b30ad))

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

### Bug Fixes

- **action-menu:** dispatch scroll event ([#4715](https://github.com/adobe/spectrum-web-components/issues/4715)) ([c76f3f5](https://github.com/adobe/spectrum-web-components/commit/c76f3f54f5a08df82ea4247252f2e0114836a778))
- **picker:** added a custom class to make `:focus-visible` styles consistent across all browsers ([#4724](https://github.com/adobe/spectrum-web-components/issues/4724)) ([d667d08](https://github.com/adobe/spectrum-web-components/commit/d667d0853b8122008ce8fe50c6c479a42dc96a9f))

### Features

- **reactive-controller:** new pending state controller ([#4605](https://github.com/adobe/spectrum-web-components/issues/4605)) ([68baf94](https://github.com/adobe/spectrum-web-components/commit/68baf94f257b9c7525253819a2ed3c8fa1b6c408))

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

### Bug Fixes

- **picker:** updated type for mobile and desktop ([#4666](https://github.com/adobe/spectrum-web-components/issues/4666)) ([d11da1f](https://github.com/adobe/spectrum-web-components/commit/d11da1ffb7faa7804a1383cffba90277cf401e45))

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

### Bug Fixes

- **picker** pointerup in mobile does not automatically make a selection. ([4227](https://github.com/adobe/spectrum-web-components/issues/4227)) ([56366ce] (https://github.com/adobe/spectrum-web-components/commit/56366ce2750bb4bb5c6e3fa5fe7d809434497adb))

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

### Features

- **action-bar:** support for action-menus ([#3780](https://github.com/adobe/spectrum-web-components/issues/3780)) ([4aff599](https://github.com/adobe/spectrum-web-components/commit/4aff5995f6a22eefae0dd8e580d743c27ceb2c2d))

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

### Bug Fixes

- **action-menu:** allow menu groups to handle their own selections ([#4397](https://github.com/adobe/spectrum-web-components/issues/4397)) ([5a19051](https://github.com/adobe/spectrum-web-components/commit/5a190518814f85cfd2e345ad6a0add1378c05bf4))

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Bug Fixes

- **picker:** add loading state to the picker ([#3110](https://github.com/adobe/spectrum-web-components/issues/3110)) ([d91e2c9](https://github.com/adobe/spectrum-web-components/commit/d91e2c9f3530c3c911832ea3a401fddc23e7854a))
- **picker:** allow open/close in tablet ([dcfc96e](https://github.com/adobe/spectrum-web-components/commit/dcfc96e779c0dd6005f4697450d1edcf7809e8ea))
- **picker:** correctly process the CSS for the quiet hover effect ([#4167](https://github.com/adobe/spectrum-web-components/issues/4167)) ([eb282fa](https://github.com/adobe/spectrum-web-components/commit/eb282fad1d1b4f5e7c2bce65df6ca56f46e6870e))

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

### Bug Fixes

- **overlay:** leverage "transition-behavior" to persist top-layer content while closing ([#4050](https://github.com/adobe/spectrum-web-components/issues/4050)) ([e3dea14](https://github.com/adobe/spectrum-web-components/commit/e3dea14fa382b4e02f61ae8b651e89cd92c348f8))
- **picker:** support inline labeling of quiet Picker ([#3704](https://github.com/adobe/spectrum-web-components/issues/3704)) ([3372286](https://github.com/adobe/spectrum-web-components/commit/337228659bfcd831700ce782254e5cb539c503d2))

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

### Bug Fixes

- **picker:** correct implementation of "disabled", expand stories and documentation ([#4040](https://github.com/adobe/spectrum-web-components/issues/4040)) ([84c2fef](https://github.com/adobe/spectrum-web-components/commit/84c2fef72cb8be6d77ce62c21ed6d9d0d866d849))

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

### Features

- **icon:** use core tokens ([a11ef6b](https://github.com/adobe/spectrum-web-components/commit/a11ef6b45141769b4c73a7c79322e780a8a1fa6e))

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

### Bug Fixes

- **picker,action-menu,split-button:** update interaction model ([#3935](https://github.com/adobe/spectrum-web-components/issues/3935)) ([bae7d52](https://github.com/adobe/spectrum-web-components/commit/bae7d527e513d2588267c62cc70f5e1c1289f903))

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

### Bug Fixes

- **picker:** force close slotted Tooltip elements with disabled when Menu openes ([82c8f12](https://github.com/adobe/spectrum-web-components/commit/82c8f129d8a378f51ca083c4020a15b3cbde1fe7))
- **picker:** prevent the Menu opening until required dependencies are loaded ([55e6174](https://github.com/adobe/spectrum-web-components/commit/55e617497477f2627982f877743f1635e32ee583))

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

### Bug Fixes

- **picker:** ensure menu placement in mobile ([#3835](https://github.com/adobe/spectrum-web-components/issues/3835)) ([4aba1c6](https://github.com/adobe/spectrum-web-components/commit/4aba1c6094e45481dec428fcc95fb4148f62dbc9))

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

### Bug Fixes

- **overlay:** calculate more transforms ([6538a45](https://github.com/adobe/spectrum-web-components/commit/6538a45a036f60c4efce4c3ed3d1d6f2782a188e))

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

### Bug Fixes

- **picker,split-button:** include "tooltip" slot in the main button ([699b8af](https://github.com/adobe/spectrum-web-components/commit/699b8af2612f2dab8f7c65b9c105844f6feaa6ed))

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Bug Fixes

- **action-menu,split-button:** ensure toggling the Menu closed completes ([2dd0f98](https://github.com/adobe/spectrum-web-components/commit/2dd0f9871a4d76a27f5d432ea2df230ab99cbdd1))
- **picker:** ensure the Menu opens in a Tray on mobile ([6be2bed](https://github.com/adobe/spectrum-web-components/commit/6be2bed36b364c5abcd1210db9c95ebc883125ec))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

### Bug Fixes

- allow non-selection carying Picker derivatives to report value ([02c0134](https://github.com/adobe/spectrum-web-components/commit/02c013454cb2189f3026d1d928198fe815dd933d))

### Features

- **picker,action-group,split-button:** leverage Overlay v2 ([170a223](https://github.com/adobe/spectrum-web-components/commit/170a223d74870ed3eda452285943716f8cbf4b7c))

### Performance Improvements

- make lots of things lazy ([b8fa3ad](https://github.com/adobe/spectrum-web-components/commit/b8fa3ada062bf54bbb42e76ab156c716d5820c7c))
- make submenus lazier ([a2d661c](https://github.com/adobe/spectrum-web-components/commit/a2d661cf4095f4ccb826d17b6f2e665c8c5bf70f))

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

### Features

- **menu:** convert to core tokens ([#3254](https://github.com/adobe/spectrum-web-components/issues/3254)) ([da43540](https://github.com/adobe/spectrum-web-components/commit/da43540abcea3db75bf145194be800b61153ebe0))

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Bug Fixes

- **action-button,action-menu,picker,split-button:** expand and update application of aria-\* attributes ([52c0156](https://github.com/adobe/spectrum-web-components/commit/52c015636d42f2baf1524446a0db9d5e5cfeb689))
- **picker:** correct label application for screen readers ([8ce0cb0](https://github.com/adobe/spectrum-web-components/commit/8ce0cb0b76fcb76af34fdd3228ae268509f80ee0))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.33.1](https://github.com/adobe/spectrum-web-components/compare/v0.33.0...v0.33.1) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

### Bug Fixes

- **picker:** correct attribute spelling of "aria-label" in dismiss button ([5fc9b30](https://github.com/adobe/spectrum-web-components/commit/5fc9b30260f7d6df4d6e3cb6a3e49a149ece5458))

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

### Bug Fixes

- generate react/picker and pass react TS checks ([101b88c](https://github.com/adobe/spectrum-web-components/commit/101b88c9d1607023e073a985a2b46d2dce2c9c82))

# 0.30.0 (2023-05-03)

### Bug Fixes

- abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))
- **action-menu:** fix 2510, unable to control top-level action-menu selection ([c9198c2](https://github.com/adobe/spectrum-web-components/commit/c9198c29c0f2f9be83d9e153147e5634c6c00b06))
- **action-menu:** never set item selected values when selects is undefined ([5237fdb](https://github.com/adobe/spectrum-web-components/commit/5237fdb30694364934e1cd30f3d9cf82efa2c5c5))
- **action-menu:** stop stripping selected state from submenu items ([968d1f2](https://github.com/adobe/spectrum-web-components/commit/968d1f26e4f075ad20dbaba07baf73d5a0c4d55c))
- add icon present and icon-only support to Picker ([f6887a3](https://github.com/adobe/spectrum-web-components/commit/f6887a34e228473e33893c81017492bf3e8fd6c3))
- add support for "readonly" attribute ([4bce3b7](https://github.com/adobe/spectrum-web-components/commit/4bce3b7b6910ac50e80efe6a8f63f57843feafb3))
- add t-shirt sizing to Thumbnail and support for "xxs"/"xs" sizes ([520a642](https://github.com/adobe/spectrum-web-components/commit/520a642b33e2ca5a4fdc67c15ace029d33e895ff))
- allow "updateComplete" to resolve to a boolean like the LitElement default ([6127946](https://github.com/adobe/spectrum-web-components/commit/6127946fd3ffd048a30b7eb4bf6aadf9e7c8752a))
- allow Picker to be reparented ([39e7309](https://github.com/adobe/spectrum-web-components/commit/39e73094be38888599fb189ed4d613f09476310f))
- analyze errors, properly this time ([df685a2](https://github.com/adobe/spectrum-web-components/commit/df685a20f57379442d54f026b8ad7cef474a067b))
- analyze type errors, and add deprecated syntax tests ([b7e67a1](https://github.com/adobe/spectrum-web-components/commit/b7e67a103d5a3bb355a8ee4682ef9621d8d59872))
- bad merge conflict resolution ([e408d61](https://github.com/adobe/spectrum-web-components/commit/e408d61c82ee4ea8463be7d76f480b260fd5aa30))
- correct custom property hoisting ([a1d98dc](https://github.com/adobe/spectrum-web-components/commit/a1d98dccadb790afb61d761636754ed337a0d50c))
- correct max size calculation for overlays ([0585f7f](https://github.com/adobe/spectrum-web-components/commit/0585f7f30bf502d147bd467a942ee180656b2413))
- ensure Action Menu Item with [href] close the menu ([6b3d87f](https://github.com/adobe/spectrum-web-components/commit/6b3d87f8c922df782432bca3ef93d21637bad78b))
- ensure correct Menu Items are "selected" when passed into the overlay ([46a25db](https://github.com/adobe/spectrum-web-components/commit/46a25db6303adbbcdfe76cb3bf97541adc418367))
- ensure focus is managed when tabbing out of a menu ([9bfa81d](https://github.com/adobe/spectrum-web-components/commit/9bfa81d8a677d6c0ab5ac5cd618498496761c69b))
- expand sync offering for elements with overlay content ([0195843](https://github.com/adobe/spectrum-web-components/commit/0195843e9efac5760a78fa302d91139c84ea5747))
- give Picker a focus helper to enable tab navigation in Safari ([e796525](https://github.com/adobe/spectrum-web-components/commit/e7965251651b42e28bfbcaf752f2ab9b19700835))
- hopefully fix CI ([ea87245](https://github.com/adobe/spectrum-web-components/commit/ea87245359128ad4f9d790d2dc5d5dd36208bc25))
- include late added items in the item list for the Picker ([9232eb1](https://github.com/adobe/spectrum-web-components/commit/9232eb1009ccbcdf6166e48928bd8416c23d50b2))
- issues with optionsMenu & menuItems ([01a7e35](https://github.com/adobe/spectrum-web-components/commit/01a7e35099cef1d8185e79ee94dfad36ece7ba8d))
- **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))
- **menu:** clarify menu internal focus management via preventScroll option ([9ae092c](https://github.com/adobe/spectrum-web-components/commit/9ae092c7d09ef9359dbf9ed9373aef0650967f40))
- **menu:** ensure active descendant is in view when activated ([6edc351](https://github.com/adobe/spectrum-web-components/commit/6edc3518fd305cbd35b74f013546bb32aef7616b))
- **menu:** only scrollIntoView when keyboard navigating ([f4e9278](https://github.com/adobe/spectrum-web-components/commit/f4e9278048287a45bba2da25144834b0b8297c66))
- **overlay:** move "escape" listener to "keydown" ([813b341](https://github.com/adobe/spectrum-web-components/commit/813b3415ab16391e717e84a61c74b304a67c2e03))
- **picker:** accept new "value" and new option post first render ([8f8c93f](https://github.com/adobe/spectrum-web-components/commit/8f8c93f1045b07d5e108769c4efffa54213d20e3))
- **picker:** add "quick select" action to right/left arrow keys ([21895ee](https://github.com/adobe/spectrum-web-components/commit/21895eed8d194b0a570cbb2bafeaa06c9511bf27))
- **picker:** allow menu items to be added, updated, and removed ([73511ba](https://github.com/adobe/spectrum-web-components/commit/73511ba996154c006602dfd1c7f1d94746049782))
- **picker:** ensure focus visibility application ([2679081](https://github.com/adobe/spectrum-web-components/commit/2679081978788bd68b5e2c9cd1c05161cc571446))
- **picker:** ensure that width is customizable from the outside ([702b052](https://github.com/adobe/spectrum-web-components/commit/702b052f9ea1686d2a964648d4bb1d365178160f))
- **picker:** make "change" event bubbling and composed ([1fdd33d](https://github.com/adobe/spectrum-web-components/commit/1fdd33de0f8a01640b91ecda2cb9e81bd8076adf))
- **picker:** query less strictly to support automatically selecting values ([969f966](https://github.com/adobe/spectrum-web-components/commit/969f966585256c3a496eddb4cb84c0142aa7ae9c))
- **picker:** use "modal" as the menu overlay interaction ([c8fbbe2](https://github.com/adobe/spectrum-web-components/commit/c8fbbe27b19702909855575b1afd38fb064e8378))
- prevent console.log in source and test files ([3ee082c](https://github.com/adobe/spectrum-web-components/commit/3ee082ceadd9eeef167bb8ac6241fe1501e4426c))
- remove `<sp-menu>` usage where deprecated ([387db3b](https://github.com/adobe/spectrum-web-components/commit/387db3be95c98ab220e517fe12a4db7a2496fe5f))
- simplify focus application in Menu ([6140169](https://github.com/adobe/spectrum-web-components/commit/61401699b36298b6f11cc80703aff664cbb867a7))
- simplify optionsMenu usage and fix tests ([91241b7](https://github.com/adobe/spectrum-web-components/commit/91241b7bddc434c7220fc0fbd65389d0ca38f674))
- slot documentation ([0ebd260](https://github.com/adobe/spectrum-web-components/commit/0ebd2609bad9e95ee24428cb2fa666d23bdb85f8))
- split-button tests & lots of cleanup based on review feedback ([10b4a04](https://github.com/adobe/spectrum-web-components/commit/10b4a04c5791d1acd9e59d48a8960b9c17aa89c7)), closes [#1189](https://github.com/adobe/spectrum-web-components/issues/1189)
- style icons in Picker correctly ([0bbdf84](https://github.com/adobe/spectrum-web-components/commit/0bbdf84df595a573b355721698262b1c5a1f3b01))
- support a wider number of sizes ([ee44978](https://github.com/adobe/spectrum-web-components/commit/ee4497830da0d3bc63d4414ad5548291a39588c7))
- update Picker label via MutationObserver instead of "slotchange" ([196998e](https://github.com/adobe/spectrum-web-components/commit/196998e9433dc938d86bfbe77db9e3accd6d9bbc))
- update screen reader interface with menu items list ([16756b5](https://github.com/adobe/spectrum-web-components/commit/16756b56c0f7f9561426acc202997fb098e8f19a))
- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

### Features

- add selects attribute to menu ([bdf2578](https://github.com/adobe/spectrum-web-components/commit/bdf25780e56c7b92368904dce2a02f2594c364a2))
- add t-shirt sizing with visual regressions to checkbox and picker elements ([ce47ec8](https://github.com/adobe/spectrum-web-components/commit/ce47ec88bd2c6c8d236c05826d28b2d0dadf12b8))
- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- conditionally load focus-visible polyfill ([6b5e5cf](https://github.com/adobe/spectrum-web-components/commit/6b5e5cf515f02ef14f072b7aee62feed7a83c281))
- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))
- deprecate sp-menu in PickerBase derived classes ([bbb773c](https://github.com/adobe/spectrum-web-components/commit/bbb773c915587b9d92875e333a6b422ec878a8ea))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))
- **picker:** replace dropdown with picker component ([30b8bc7](https://github.com/adobe/spectrum-web-components/commit/30b8bc791be37ba53a12244f3dd2cccd55c490a3))
- **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))
- **picker:** update "icons-only" to "icons=only" to support more variations ([de16a62](https://github.com/adobe/spectrum-web-components/commit/de16a628f6ec7cfcbe405c71414bef6ed72b1726))
- **picker:** use new tokens ([7d65b69](https://github.com/adobe/spectrum-web-components/commit/7d65b69d47d69a34f75b456a5aa457f22ec04aca))
- reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))
- sets action-menu quiet to false by default, fixes [#3040](https://github.com/adobe/spectrum-web-components/issues/3040) ([8414cab](https://github.com/adobe/spectrum-web-components/commit/8414cab2ef916be40be9f624f485fb02184eec2b))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- **tabs:** add sp-tab-panel element ([b17d276](https://github.com/adobe/spectrum-web-components/commit/b17d2765cf415578a31e5fa23515c25ff4c3922d))
- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

- reorganize inheritance and composition in Menu Items ([d96ccb6](https://github.com/adobe/spectrum-web-components/commit/d96ccb621833277444d69535126c3669343c2eaf))

## [0.15.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.15.1...@spectrum-web-components/picker@0.15.2) (2023-04-24)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.15.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.15.0...@spectrum-web-components/picker@0.15.1) (2023-04-05)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.15.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.14.2...@spectrum-web-components/picker@0.15.0) (2023-03-22)

### Features

- sets action-menu quiet to false by default, fixes [#3040](https://github.com/adobe/spectrum-web-components/issues/3040) ([8414cab](https://github.com/adobe/spectrum-web-components/commit/8414cab2ef916be40be9f624f485fb02184eec2b))

## [0.14.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.14.1...@spectrum-web-components/picker@0.14.2) (2023-03-08)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.14.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.14.0...@spectrum-web-components/picker@0.14.1) (2023-02-13)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.14.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.11...@spectrum-web-components/picker@0.14.0) (2023-02-08)

### Features

- **picker:** use new tokens ([7d65b69](https://github.com/adobe/spectrum-web-components/commit/7d65b69d47d69a34f75b456a5aa457f22ec04aca))

## [0.13.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.10...@spectrum-web-components/picker@0.13.11) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.13.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.9...@spectrum-web-components/picker@0.13.10) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.13.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.8...@spectrum-web-components/picker@0.13.9) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.13.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.7...@spectrum-web-components/picker@0.13.8) (2022-11-21)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.13.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.6...@spectrum-web-components/picker@0.13.7) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.13.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.5...@spectrum-web-components/picker@0.13.6) (2022-10-28)

### Bug Fixes

- ensure Action Menu Item with [href] close the menu ([6b3d87f](https://github.com/adobe/spectrum-web-components/commit/6b3d87f8c922df782432bca3ef93d21637bad78b))

## [0.13.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.4...@spectrum-web-components/picker@0.13.5) (2022-10-17)

### Bug Fixes

- style icons in Picker correctly ([0bbdf84](https://github.com/adobe/spectrum-web-components/commit/0bbdf84df595a573b355721698262b1c5a1f3b01))

## [0.13.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.3...@spectrum-web-components/picker@0.13.4) (2022-10-10)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.13.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.2...@spectrum-web-components/picker@0.13.3) (2022-09-15)

### Bug Fixes

- **action-menu:** fix 2510, unable to control top-level action-menu selection ([c9198c2](https://github.com/adobe/spectrum-web-components/commit/c9198c29c0f2f9be83d9e153147e5634c6c00b06))
- **action-menu:** never set item selected values when selects is undefined ([5237fdb](https://github.com/adobe/spectrum-web-components/commit/5237fdb30694364934e1cd30f3d9cf82efa2c5c5))

## [0.13.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.1...@spectrum-web-components/picker@0.13.2) (2022-09-14)

### Bug Fixes

- **overlay:** move "escape" listener to "keydown" ([813b341](https://github.com/adobe/spectrum-web-components/commit/813b3415ab16391e717e84a61c74b304a67c2e03))

## [0.13.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.13.0...@spectrum-web-components/picker@0.13.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.12.0...@spectrum-web-components/picker@0.13.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.11.5...@spectrum-web-components/picker@0.12.0) (2022-08-04)

### Bug Fixes

- **action-menu:** stop stripping selected state from submenu items ([968d1f2](https://github.com/adobe/spectrum-web-components/commit/968d1f26e4f075ad20dbaba07baf73d5a0c4d55c))
- **picker:** query less strictly to support automatically selecting values ([969f966](https://github.com/adobe/spectrum-web-components/commit/969f966585256c3a496eddb4cb84c0142aa7ae9c))

### Features

- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))

## [0.11.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.11.4...@spectrum-web-components/picker@0.11.5) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.11.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.11.3...@spectrum-web-components/picker@0.11.4) (2022-06-29)

### Bug Fixes

- update Picker label via MutationObserver instead of "slotchange" ([196998e](https://github.com/adobe/spectrum-web-components/commit/196998e9433dc938d86bfbe77db9e3accd6d9bbc))

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.11.2...@spectrum-web-components/picker@0.11.3) (2022-06-07)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.11.1...@spectrum-web-components/picker@0.11.2) (2022-05-27)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.11.0...@spectrum-web-components/picker@0.11.1) (2022-05-12)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.10.6...@spectrum-web-components/picker@0.11.0) (2022-04-21)

### Bug Fixes

- allow Picker to be reparented ([39e7309](https://github.com/adobe/spectrum-web-components/commit/39e73094be38888599fb189ed4d613f09476310f))
- correct custom property hoisting ([a1d98dc](https://github.com/adobe/spectrum-web-components/commit/a1d98dccadb790afb61d761636754ed337a0d50c))
- ensure correct Menu Items are "selected" when passed into the overlay ([46a25db](https://github.com/adobe/spectrum-web-components/commit/46a25db6303adbbcdfe76cb3bf97541adc418367))

### Features

- conditionally load focus-visible polyfill ([6b5e5cf](https://github.com/adobe/spectrum-web-components/commit/6b5e5cf515f02ef14f072b7aee62feed7a83c281))
- reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))

## [0.10.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.10.5...@spectrum-web-components/picker@0.10.6) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.10.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.10.4...@spectrum-web-components/picker@0.10.5) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.10.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.10.3...@spectrum-web-components/picker@0.10.4) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.10.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.10.2...@spectrum-web-components/picker@0.10.3) (2022-03-04)

### Bug Fixes

- **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))

## [0.10.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.10.1...@spectrum-web-components/picker@0.10.2) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.10.0...@spectrum-web-components/picker@0.10.1) (2022-02-03)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.9.4...@spectrum-web-components/picker@0.10.0) (2022-02-02)

### Features

- **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))

## [0.9.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.9.3...@spectrum-web-components/picker@0.9.4) (2022-01-26)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.9.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.9.2...@spectrum-web-components/picker@0.9.3) (2022-01-26)

### Bug Fixes

- **picker:** make "change" event bubbling and composed ([1fdd33d](https://github.com/adobe/spectrum-web-components/commit/1fdd33de0f8a01640b91ecda2cb9e81bd8076adf))

## [0.9.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.9.1...@spectrum-web-components/picker@0.9.2) (2022-01-07)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.9.0...@spectrum-web-components/picker@0.9.1) (2021-12-13)

### Bug Fixes

- add t-shirt sizing to Thumbnail and support for "xxs"/"xs" sizes ([520a642](https://github.com/adobe/spectrum-web-components/commit/520a642b33e2ca5a4fdc67c15ace029d33e895ff))
- **picker:** allow menu items to be added, updated, and removed ([73511ba](https://github.com/adobe/spectrum-web-components/commit/73511ba996154c006602dfd1c7f1d94746049782))

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.8.1...@spectrum-web-components/picker@0.9.0) (2021-11-08)

### Features

- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.8.0...@spectrum-web-components/picker@0.8.1) (2021-11-08)

### Bug Fixes

- abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.7.5...@spectrum-web-components/picker@0.8.0) (2021-11-02)

### Bug Fixes

- update screen reader interface with menu items list ([16756b5](https://github.com/adobe/spectrum-web-components/commit/16756b56c0f7f9561426acc202997fb098e8f19a))
- **picker:** use "modal" as the menu overlay interaction ([c8fbbe2](https://github.com/adobe/spectrum-web-components/commit/c8fbbe27b19702909855575b1afd38fb064e8378))
- include late added items in the item list for the Picker ([9232eb1](https://github.com/adobe/spectrum-web-components/commit/9232eb1009ccbcdf6166e48928bd8416c23d50b2))

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.7.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.7.4...@spectrum-web-components/picker@0.7.5) (2021-10-12)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.7.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.7.3...@spectrum-web-components/picker@0.7.4) (2021-10-05)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.7.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.7.2...@spectrum-web-components/picker@0.7.3) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.7.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.7.1...@spectrum-web-components/picker@0.7.2) (2021-09-13)

### Bug Fixes

- give Picker a focus helper to enable tab navigation in Safari ([e796525](https://github.com/adobe/spectrum-web-components/commit/e7965251651b42e28bfbcaf752f2ab9b19700835))
- simplify focus application in Menu ([6140169](https://github.com/adobe/spectrum-web-components/commit/61401699b36298b6f11cc80703aff664cbb867a7))

## [0.7.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.7.0...@spectrum-web-components/picker@0.7.1) (2021-08-24)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.6.0...@spectrum-web-components/picker@0.7.0) (2021-08-17)

### Features

- **picker:** update "icons-only" to "icons=only" to support more variations ([de16a62](https://github.com/adobe/spectrum-web-components/commit/de16a628f6ec7cfcbe405c71414bef6ed72b1726))

### Performance Improvements

- reorganize inheritance and composition in Menu Items ([d96ccb6](https://github.com/adobe/spectrum-web-components/commit/d96ccb621833277444d69535126c3669343c2eaf))

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.5.4...@spectrum-web-components/picker@0.6.0) (2021-08-03)

### Bug Fixes

- allow "updateComplete" to resolve to a boolean like the LitElement default ([6127946](https://github.com/adobe/spectrum-web-components/commit/6127946fd3ffd048a30b7eb4bf6aadf9e7c8752a))
- expand sync offering for elements with overlay content ([0195843](https://github.com/adobe/spectrum-web-components/commit/0195843e9efac5760a78fa302d91139c84ea5747))

### Features

- add selects attribute to menu ([bdf2578](https://github.com/adobe/spectrum-web-components/commit/bdf25780e56c7b92368904dce2a02f2594c364a2))

## [0.5.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.5.3...@spectrum-web-components/picker@0.5.4) (2021-07-22)

**Note:** Version bump only for package @spectrum-web-components/picker

## [0.5.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.5.2...@spectrum-web-components/picker@0.5.3) (2021-07-01)

### Bug Fixes

- add icon present and icon-only support to Picker ([f6887a3](https://github.com/adobe/spectrum-web-components/commit/f6887a34e228473e33893c81017492bf3e8fd6c3))

## [0.5.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.5.1...@spectrum-web-components/picker@0.5.2) (2021-06-16)

### Bug Fixes

- prevent console.log in source and test files ([3ee082c](https://github.com/adobe/spectrum-web-components/commit/3ee082ceadd9eeef167bb8ac6241fe1501e4426c))

## [0.5.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.5.0...@spectrum-web-components/picker@0.5.1) (2021-06-07)

### Bug Fixes

- **menu:** clarify menu internal focus management via preventScroll option ([9ae092c](https://github.com/adobe/spectrum-web-components/commit/9ae092c7d09ef9359dbf9ed9373aef0650967f40))
- ensure focus is managed when tabbing out of a menu ([9bfa81d](https://github.com/adobe/spectrum-web-components/commit/9bfa81d8a677d6c0ab5ac5cd618498496761c69b))

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.4.5...@spectrum-web-components/picker@0.5.0) (2021-05-24)

### Features

- **tabs:** add sp-tab-panel element ([b17d276](https://github.com/adobe/spectrum-web-components/commit/b17d2765cf415578a31e5fa23515c25ff4c3922d))

## [0.4.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.4.4...@spectrum-web-components/picker@0.4.5) (2021-05-12)

### Bug Fixes

- **picker:** ensure focus visibility application ([2679081](https://github.com/adobe/spectrum-web-components/commit/2679081978788bd68b5e2c9cd1c05161cc571446))

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.4.3...@spectrum-web-components/picker@0.4.4) (2021-04-15)

### Bug Fixes

- **menu:** only scrollIntoView when keyboard navigating ([f4e9278](https://github.com/adobe/spectrum-web-components/commit/f4e9278048287a45bba2da25144834b0b8297c66))

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.4.2...@spectrum-web-components/picker@0.4.3) (2021-04-09)

### Bug Fixes

- **picker:** accept new "value" and new option post first render ([8f8c93f](https://github.com/adobe/spectrum-web-components/commit/8f8c93f1045b07d5e108769c4efffa54213d20e3))

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.4.1...@spectrum-web-components/picker@0.4.2) (2021-03-29)

### Bug Fixes

- correct max size calculation for overlays ([0585f7f](https://github.com/adobe/spectrum-web-components/commit/0585f7f30bf502d147bd467a942ee180656b2413))

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.4.0...@spectrum-web-components/picker@0.4.1) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.3.1...@spectrum-web-components/picker@0.4.0) (2021-03-22)

### Bug Fixes

- add support for "readonly" attribute ([4bce3b7](https://github.com/adobe/spectrum-web-components/commit/4bce3b7b6910ac50e80efe6a8f63f57843feafb3))
- analyze errors, properly this time ([df685a2](https://github.com/adobe/spectrum-web-components/commit/df685a20f57379442d54f026b8ad7cef474a067b))
- analyze type errors, and add deprecated syntax tests ([b7e67a1](https://github.com/adobe/spectrum-web-components/commit/b7e67a103d5a3bb355a8ee4682ef9621d8d59872))
- bad merge conflict resolution ([e408d61](https://github.com/adobe/spectrum-web-components/commit/e408d61c82ee4ea8463be7d76f480b260fd5aa30))
- hopefully fix CI ([ea87245](https://github.com/adobe/spectrum-web-components/commit/ea87245359128ad4f9d790d2dc5d5dd36208bc25))
- issues with optionsMenu & menuItems ([01a7e35](https://github.com/adobe/spectrum-web-components/commit/01a7e35099cef1d8185e79ee94dfad36ece7ba8d))
- remove `<sp-menu>` usage where deprecated ([387db3b](https://github.com/adobe/spectrum-web-components/commit/387db3be95c98ab220e517fe12a4db7a2496fe5f))
- simplify optionsMenu usage and fix tests ([91241b7](https://github.com/adobe/spectrum-web-components/commit/91241b7bddc434c7220fc0fbd65389d0ca38f674))
- slot documentation ([0ebd260](https://github.com/adobe/spectrum-web-components/commit/0ebd2609bad9e95ee24428cb2fa666d23bdb85f8))
- split-button tests & lots of cleanup based on review feedback ([10b4a04](https://github.com/adobe/spectrum-web-components/commit/10b4a04c5791d1acd9e59d48a8960b9c17aa89c7)), closes [#1189](https://github.com/adobe/spectrum-web-components/issues/1189)

### Features

- **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))
- deprecate sp-menu in PickerBase derived classes ([bbb773c](https://github.com/adobe/spectrum-web-components/commit/bbb773c915587b9d92875e333a6b422ec878a8ea))

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.3.0...@spectrum-web-components/picker@0.3.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/picker

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.2.0...@spectrum-web-components/picker@0.3.0) (2021-03-04)

### Bug Fixes

- **menu:** ensure active descendant is in view when activated ([6edc351](https://github.com/adobe/spectrum-web-components/commit/6edc3518fd305cbd35b74f013546bb32aef7616b))
- **picker:** add "quick select" action to right/left arrow keys ([21895ee](https://github.com/adobe/spectrum-web-components/commit/21895eed8d194b0a570cbb2bafeaa06c9511bf27))
- **picker:** ensure that width is customizable from the outside ([702b052](https://github.com/adobe/spectrum-web-components/commit/702b052f9ea1686d2a964648d4bb1d365178160f))
- support a wider number of sizes ([ee44978](https://github.com/adobe/spectrum-web-components/commit/ee4497830da0d3bc63d4414ad5548291a39588c7))

### Features

- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/picker@0.1.0...@spectrum-web-components/picker@0.2.0) (2021-02-11)

### Bug Fixes

- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

### Features

- add t-shirt sizing with visual regressions to checkbox and picker elements ([ce47ec8](https://github.com/adobe/spectrum-web-components/commit/ce47ec88bd2c6c8d236c05826d28b2d0dadf12b8))

# 0.1.0 (2021-02-02)

### Features

- **picker:** replace dropdown with picker component ([30b8bc7](https://github.com/adobe/spectrum-web-components/commit/30b8bc791be37ba53a12244f3dd2cccd55c490a3))
