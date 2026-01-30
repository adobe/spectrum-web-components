# Change Log

## 1.11.0

### Patch Changes

- [#5867](https://github.com/adobe/spectrum-web-components/pull/5867) [`eac97a2`](https://github.com/adobe/spectrum-web-components/commit/eac97a2a4206d1ece946d9bec0e7f462624ced27) Thanks [@shipg22](https://github.com/shipg22)! - **Fixed**: Improved touch interaction handling for submenus to prevent unintended submenu closures.

- [#5965](https://github.com/adobe/spectrum-web-components/pull/5965) [`b95e254`](https://github.com/adobe/spectrum-web-components/commit/b95e25413830825a506b7d4025d6b4d982691771) Thanks [@rubencarvalho](https://github.com/rubencarvalho)! - **Fixed**: `sp-menu` now stops propagation of arrow key events when navigating between menu items. This prevents unintended side effects in layouts or applications that also listen for arrow key events.

- Updated dependencies [[`b95e254`](https://github.com/adobe/spectrum-web-components/commit/b95e25413830825a506b7d4025d6b4d982691771), [`02b2d7d`](https://github.com/adobe/spectrum-web-components/commit/02b2d7d2c7d204d7f0f6501ec075e923f58244c9), [`f07344f`](https://github.com/adobe/spectrum-web-components/commit/f07344f400f64c12f15762e3fedcdab2629e781b), [`1d76b70`](https://github.com/adobe/spectrum-web-components/commit/1d76b7093d8ff5f9b26f07a69086488341a02650), [`f8bdeec`](https://github.com/adobe/spectrum-web-components/commit/f8bdeecf8a230822122a990fb977d3654649f891), [`cadc39e`](https://github.com/adobe/spectrum-web-components/commit/cadc39ea419f572a79451fc886cd45c8d8821cde), [`4cb0b7b`](https://github.com/adobe/spectrum-web-components/commit/4cb0b7b86ebfaad89f1866916415b8578aa6dbea), [`9cb816b`](https://github.com/adobe/spectrum-web-components/commit/9cb816b5ac80387fdc9bb87381f5149fecb1b595)]:
    - @spectrum-web-components/reactive-controllers@1.11.0
    - @spectrum-web-components/overlay@1.11.0
    - @spectrum-web-components/shared@1.11.0
    - @spectrum-web-components/base@1.11.0
    - @spectrum-web-components/icon@1.11.0
    - @spectrum-web-components/popover@1.11.0
    - @spectrum-web-components/divider@1.11.0
    - @spectrum-web-components/action-button@1.11.0
    - @spectrum-web-components/icons-ui@1.11.0

## 1.10.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.10.0
    - @spectrum-web-components/action-button@1.10.0
    - @spectrum-web-components/divider@1.10.0
    - @spectrum-web-components/icon@1.10.0
    - @spectrum-web-components/icons-ui@1.10.0
    - @spectrum-web-components/overlay@1.10.0
    - @spectrum-web-components/popover@1.10.0
    - @spectrum-web-components/shared@1.10.0
    - @spectrum-web-components/reactive-controllers@1.10.0

## 1.9.1

### Patch Changes

- Updated dependencies [[`a19cbe3`](https://github.com/adobe/spectrum-web-components/commit/a19cbe3e8b4690d8abd1530e3930e5d48ae43618)]:
    - @spectrum-web-components/overlay@1.9.1
    - @spectrum-web-components/popover@1.9.1
    - @spectrum-web-components/action-button@1.9.1
    - @spectrum-web-components/divider@1.9.1
    - @spectrum-web-components/icon@1.9.1
    - @spectrum-web-components/icons-ui@1.9.1
    - @spectrum-web-components/base@1.9.1
    - @spectrum-web-components/reactive-controllers@1.9.1
    - @spectrum-web-components/shared@1.9.1

## 1.9.0

### Patch Changes

- [#5732](https://github.com/adobe/spectrum-web-components/pull/5732) [`4880da4`](https://github.com/adobe/spectrum-web-components/commit/4880da4f80a25ae1b475f52ce4ba7914cdcd9de4) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - - **Fixed**: MenuItem focus stealing from input elements on mouseover by enhancing MenuItem's `handleMouseover` method to detect when an input element currently has focus and prevent stealing focus in those cases.

- Updated dependencies [[`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8)]:
    - @spectrum-web-components/reactive-controllers@1.9.0
    - @spectrum-web-components/action-button@1.9.0
    - @spectrum-web-components/icon@1.9.0
    - @spectrum-web-components/overlay@1.9.0
    - @spectrum-web-components/icons-ui@1.9.0
    - @spectrum-web-components/popover@1.9.0
    - @spectrum-web-components/divider@1.9.0
    - @spectrum-web-components/base@1.9.0
    - @spectrum-web-components/shared@1.9.0

## 1.8.0

### Minor Changes

- [#5616](https://github.com/adobe/spectrum-web-components/pull/5616) [`f27ab09`](https://github.com/adobe/spectrum-web-components/commit/f27ab096f4d53543dc53f75ec196c696b78b3baa) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **Fixed** : Fix iPad scrolling issue in picker dropdown where scrolling through menu items would accidentally select the first touched item and close the picker.

    The fix implements touch gesture detection to distinguish between scrolling and selection. Added `isScrolling` getter for public API access. Test on iPad devices with long menus to validate scrolling behavior and selection accuracy.

### Patch Changes

- Updated dependencies [[`14486d6`](https://github.com/adobe/spectrum-web-components/commit/14486d620e88976c794225edb54eaca8392015c7), [`ee1bae6`](https://github.com/adobe/spectrum-web-components/commit/ee1bae6f9a7401dc31ebc84e4e27f9d39be692d1), [`14486d6`](https://github.com/adobe/spectrum-web-components/commit/14486d620e88976c794225edb54eaca8392015c7), [`826a2d5`](https://github.com/adobe/spectrum-web-components/commit/826a2d533e46a6f945daefa8999fadca78bd8688)]:
    - @spectrum-web-components/overlay@1.8.0
    - @spectrum-web-components/divider@1.8.0
    - @spectrum-web-components/popover@1.8.0
    - @spectrum-web-components/action-button@1.8.0
    - @spectrum-web-components/icon@1.8.0
    - @spectrum-web-components/icons-ui@1.8.0
    - @spectrum-web-components/base@1.8.0
    - @spectrum-web-components/reactive-controllers@1.8.0
    - @spectrum-web-components/shared@1.8.0

## 1.7.0

### Patch Changes

- [#5402](https://github.com/adobe/spectrum-web-components/pull/5402) [`3aeafdd`](https://github.com/adobe/spectrum-web-components/commit/3aeafddab98fe30f4db538ded9052997aaa05b07) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - **Fixes**: Icons in menu stories weren't properly responding to theme changes when used in functional story components.
  Switching to class-based LitElement components ensures proper component lifecycle hooks and shadow DOM context for icon initialization and theme integration.
- Updated dependencies [[`a646ae8`](https://github.com/adobe/spectrum-web-components/commit/a646ae8b0e652308d359226740d2cb189e492e45), [`c1669d2`](https://github.com/adobe/spectrum-web-components/commit/c1669d2dc5e1ceeb84486ce49a428f86a3173caa)]:
    - @spectrum-web-components/overlay@1.7.0
    - @spectrum-web-components/action-button@1.7.0
    - @spectrum-web-components/popover@1.7.0
    - @spectrum-web-components/divider@1.7.0
    - @spectrum-web-components/icon@1.7.0
    - @spectrum-web-components/icons-ui@1.7.0
    - @spectrum-web-components/base@1.7.0
    - @spectrum-web-components/reactive-controllers@1.7.0
    - @spectrum-web-components/shared@1.7.0

## 1.6.0

### Patch Changes

- [#5349](https://github.com/adobe/spectrum-web-components/pull/5349) [`a9727d2`](https://github.com/adobe/spectrum-web-components/commit/a9727d2975b01f440c09789c9e7e0122063b6f7e) Thanks [@renovate](https://github.com/apps/renovate)! - Remove unnecessary system theme references to reduce complexity for components that don't need the additional mapping layer.

- Updated dependencies [[`03a4439`](https://github.com/adobe/spectrum-web-components/commit/03a443946b760aedc668630f33ac660443ff915e), [`53f3769`](https://github.com/adobe/spectrum-web-components/commit/53f3769f07b6e7853a8a4c0dc63b21fe14cf3d4b)]:
    - @spectrum-web-components/popover@1.6.0
    - @spectrum-web-components/overlay@1.6.0
    - @spectrum-web-components/action-button@1.6.0
    - @spectrum-web-components/divider@1.6.0
    - @spectrum-web-components/icon@1.6.0
    - @spectrum-web-components/icons-ui@1.6.0
    - @spectrum-web-components/base@1.6.0
    - @spectrum-web-components/reactive-controllers@1.6.0
    - @spectrum-web-components/shared@1.6.0

## 1.5.0

### Minor Changes

- [#5350](https://github.com/adobe/spectrum-web-components/pull/5350) [`86bcd12`](https://github.com/adobe/spectrum-web-components/commit/86bcd122003e99d490a64d466dab3e7d609a6ff3) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - change display property from inline-flex to flex to eliminate unwanted spacing between menu items

### Patch Changes

- [#5313](https://github.com/adobe/spectrum-web-components/pull/5313) [`4c2f908`](https://github.com/adobe/spectrum-web-components/commit/4c2f908a92b383d49eb7197d954966fe1798aa20) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - Tapping on an `sp-menu-item` was causing the tap event to propagate to an `sp-checkbox` underneath it, resulting in the checkbox being checked unintentionally. The fix involves capturing the `touchend` event on the `sp-menu` to prevent this propagation.

- [#5270](https://github.com/adobe/spectrum-web-components/pull/5270) [`a69accb`](https://github.com/adobe/spectrum-web-components/commit/a69accb8b44b2612d53d31ba52c99aa751ce9f3a) Thanks [@nikkimk](https://github.com/nikkimk)! - correctly applies menuitem hover styling with pointerenter actions and only applies menuitem focus styling with keyboard/click action [#5269](https://github.com/adobe/spectrum-web-components/issues/5269)

- Updated dependencies [[`165a904`](https://github.com/adobe/spectrum-web-components/commit/165a904bd01fddea922fe87b181bbf41281f81f0), [`8f8735c`](https://github.com/adobe/spectrum-web-components/commit/8f8735c9ec3eac3b6473424c78257cb46ee17f70), [`6c58f50`](https://github.com/adobe/spectrum-web-components/commit/6c58f50f7b1f5489c11e0d3484e3f4a9d576f1c8)]:
    - @spectrum-web-components/divider@1.5.0
    - @spectrum-web-components/overlay@1.5.0
    - @spectrum-web-components/action-button@1.5.0
    - @spectrum-web-components/popover@1.5.0
    - @spectrum-web-components/icon@1.5.0
    - @spectrum-web-components/icons-ui@1.5.0
    - @spectrum-web-components/base@1.5.0
    - @spectrum-web-components/reactive-controllers@1.5.0
    - @spectrum-web-components/shared@1.5.0

## 1.4.0

### Minor Changes

- [#5187](https://github.com/adobe/spectrum-web-components/pull/5187) [`2a0422e`](https://github.com/adobe/spectrum-web-components/commit/2a0422ec1b667a9f236858f8cc9dca261ba27f9f) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - Disabled drag and select functionality of picker in mobile devices. This is done to prevent click event being captured behind the menu-tray combination because the menu was closing immediately on pointerup.
    - Fixed a bug where the picker in a dialog was not closing when clicking outside the dialog. ([#5111](https://github.com/adobe/spectrum-web-components/issues/5111))
    - Fixed another bug where the elements behind the menu were receiving click events. ([#5060](https://github.com/adobe/spectrum-web-components/issues/5060))

### Patch Changes

- [#5197](https://github.com/adobe/spectrum-web-components/pull/5197) [`6618422`](https://github.com/adobe/spectrum-web-components/commit/6618422848df234e420eed95f4a5a30557e1e46f) Thanks [@nikkimk](https://github.com/nikkimk)! - `<sp-menu>` - fixes `<sp-menu-item>` focus on hover ([#5180](https://github.com/adobe/spectrum-web-components/issues/5180))

- Updated dependencies [[`72dbe62`](https://github.com/adobe/spectrum-web-components/commit/72dbe629cddfc57171eaaadf7206df47c19d3c98), [`46cd782`](https://github.com/adobe/spectrum-web-components/commit/46cd7828f65491fc08790e5ba0aec412ee89199d), [`70f5f6f`](https://github.com/adobe/spectrum-web-components/commit/70f5f6f3a97b530fb20f9f5ee049e9a8c124b02d)]:
    - @spectrum-web-components/action-button@1.4.0
    - @spectrum-web-components/overlay@1.4.0
    - @spectrum-web-components/popover@1.4.0
    - @spectrum-web-components/divider@1.4.0
    - @spectrum-web-components/icon@1.4.0
    - @spectrum-web-components/icons-ui@1.4.0
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

- [#5176](https://github.com/adobe/spectrum-web-components/pull/5176) [`468314f`](https://github.com/adobe/spectrum-web-components/commit/468314f45cf5fedb2e9029da210a5886260abca9) Thanks [@TarunAdobe](https://github.com/TarunAdobe)! - 1. chore(checkbox): updated to latest css v10.1.1 for s2 fast follow 2. chore(dialog):
  The error property was not properly deprecated with a full migration plan in place. This has caused confusion and false sense of urgency for consumers to migrate. We are removing it to eliminate those pain points for consumers while we take a deep look at our dialogs and patterns. 3. chore(menu): updated to latest css v9.1.1 for s2 fast follow 4. fix(overlay):
  sp-overlay with type="manual" should close on pressing ESC key. When the last item is on overlay stack we are triggering the close method on esc key event.

- Updated dependencies [[`ea38ef0`](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f), [`468314f`](https://github.com/adobe/spectrum-web-components/commit/468314f45cf5fedb2e9029da210a5886260abca9)]:
    - @spectrum-web-components/reactive-controllers@1.3.0
    - @spectrum-web-components/overlay@1.3.0
    - @spectrum-web-components/popover@1.3.0
    - @spectrum-web-components/action-button@1.3.0
    - @spectrum-web-components/divider@1.3.0
    - @spectrum-web-components/icon@1.3.0
    - @spectrum-web-components/icons-ui@1.3.0
    - @spectrum-web-components/base@1.3.0
    - @spectrum-web-components/shared@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

### Bug Fixes

- **action menu:** keyboard accessibility omnibus ([#5031](https://github.com/adobe/spectrum-web-components/issues/5031)) ([ea38ef0](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)), closes [#4623](https://github.com/adobe/spectrum-web-components/issues/4623)
- **menu:** make submenu scrollable ([#5082](https://github.com/adobe/spectrum-web-components/issues/5082)) ([a13dac2](https://github.com/adobe/spectrum-web-components/commit/a13dac26e51fa953e36232ce2b10dc0f121ef6a8))
- **picker:** update picker when menu item icons change ([#5088](https://github.com/adobe/spectrum-web-components/issues/5088)) ([63ef1ad](https://github.com/adobe/spectrum-web-components/commit/63ef1adad473ce58647ffe4d5e2a8727caaee07b))

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/menu

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/menu

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))

### Features

- add an optional chromatic vrt action ([7d2f840](https://github.com/adobe/spectrum-web-components/commit/7d2f8401cb05c5e23872424f132a1a8edd95b666))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

**Note:** Version bump only for package @spectrum-web-components/menu

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

### Bug Fixes

- **menu:** prevent sp-menu-item text-align cascading ([#4868](https://github.com/adobe/spectrum-web-components/issues/4868)) ([6663820](https://github.com/adobe/spectrum-web-components/commit/666382067e20a48a91d440ca1427698f9b58bc06))

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

### Bug Fixes

- **menu:** allow menu-item to support arbitrary element as the submenu root ([#4720](https://github.com/adobe/spectrum-web-components/issues/4720)) ([4c6a0dc](https://github.com/adobe/spectrum-web-components/commit/4c6a0dcf7c67560c664c1f7c0f93d0ef3f0005ab))

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

### Features

- **breadcrumbs:** add Breadcrumbs component ([#4578](https://github.com/adobe/spectrum-web-components/issues/4578)) ([acd4b5e](https://github.com/adobe/spectrum-web-components/commit/acd4b5e4401dad8cf26b50ee5dcda80a28b62999))

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

### Bug Fixes

- **menu:** should not make a selection on right click ([#4642](https://github.com/adobe/spectrum-web-components/issues/4642)) ([d269629](https://github.com/adobe/spectrum-web-components/commit/d269629a64063515eddee9b178b6240b92b9bc76))

### Features

- upgrade menu and dialog grid css ([#4638](https://github.com/adobe/spectrum-web-components/issues/4638)) ([ab9d468](https://github.com/adobe/spectrum-web-components/commit/ab9d468a5a1cf5721e169bd8dd8724be78c148a1))

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

### Features

- **action-bar:** support for action-menus ([#3780](https://github.com/adobe/spectrum-web-components/issues/3780)) ([4aff599](https://github.com/adobe/spectrum-web-components/commit/4aff5995f6a22eefae0dd8e580d743c27ceb2c2d))

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

### Bug Fixes

- **menu:** enable numpad arrow and Enter keys ([#4492](https://github.com/adobe/spectrum-web-components/issues/4492)) ([012c411](https://github.com/adobe/spectrum-web-components/commit/012c4116dac62031e5a329cf4da7fb9cd149bfdf))

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

### Bug Fixes

- **action-menu:** allow menu groups to handle their own selections ([#4397](https://github.com/adobe/spectrum-web-components/issues/4397)) ([5a19051](https://github.com/adobe/spectrum-web-components/commit/5a190518814f85cfd2e345ad6a0add1378c05bf4))

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Bug Fixes

- **menu:** release synthetic "click" promise to unblock keyboard interactions ([f8aecf3](https://github.com/adobe/spectrum-web-components/commit/f8aecf33cfa94ee1e1b791dc203fc46ead84eb10))

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

### Bug Fixes

- **menu:** fix css for `disabled` "value" slots in menu items ([#4113](https://github.com/adobe/spectrum-web-components/issues/4113)) ([3c5855d](https://github.com/adobe/spectrum-web-components/commit/3c5855d606739b29c7da7a6250cc7636ee15fad1))

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

### Bug Fixes

- **menu:** correct disabled menu item's chevron to appropriate colour ([#4052](https://github.com/adobe/spectrum-web-components/issues/4052)) ([30f5bb5](https://github.com/adobe/spectrum-web-components/commit/30f5bb58d376822f990545970581ebee943738f7))

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

### Bug Fixes

- support generating random IDs outside of secure contexts ([485a67c](https://github.com/adobe/spectrum-web-components/commit/485a67c5401094705b711350f8ee74182a6dd64b))

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

### Bug Fixes

- **menu:** process ":active" styles ([7917583](https://github.com/adobe/spectrum-web-components/commit/79175833e8121cef1419b547802721324472965d))

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

### Bug Fixes

- **picker,action-menu,split-button:** update interaction model ([#3935](https://github.com/adobe/spectrum-web-components/issues/3935)) ([bae7d52](https://github.com/adobe/spectrum-web-components/commit/bae7d527e513d2588267c62cc70f5e1c1289f903))

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

### Bug Fixes

- **overlay:** move closed overlays to "display: none" ([fc0278b](https://github.com/adobe/spectrum-web-components/commit/fc0278b917759ed58c3ac62a6e962633914481c0))

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

### Bug Fixes

- **menu:** support navigating to and selecting Menu Items in Menu Groups ([8469ab2](https://github.com/adobe/spectrum-web-components/commit/8469ab235bf4049b7ce9fca008494df1cde012a7))

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

### Bug Fixes

- update deps graph, fix imports ([f633005](https://github.com/adobe/spectrum-web-components/commit/f633005e26bff640615f157b54830bfb0677d682))

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

### Bug Fixes

- **menu:** conditionally access slots for their assigned content ([#3717](https://github.com/adobe/spectrum-web-components/issues/3717)) ([c045822](https://github.com/adobe/spectrum-web-components/commit/c04582216c67051fa6c78f27b299a9fdfd076597))

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

### Bug Fixes

- **menu:** allow `change` events to be direct ([#3689](https://github.com/adobe/spectrum-web-components/issues/3689)) ([b2cd3da](https://github.com/adobe/spectrum-web-components/commit/b2cd3da1384c577f27f604c42847953bb7121cb2))

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

### Bug Fixes

- **menu:** allow Menu elements to be controlled ([74ed7fb](https://github.com/adobe/spectrum-web-components/commit/74ed7fb7d593199c333392f89c4827fcb8248cab))
- **menu:** manage deeply slotted menu items and initial focus ([7f9ad69](https://github.com/adobe/spectrum-web-components/commit/7f9ad69282b6e740efb04fa2933d3163164259c7))

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Bug Fixes

- **menu:** added support for menu item description ([#3559](https://github.com/adobe/spectrum-web-components/issues/3559)) ([ce99528](https://github.com/adobe/spectrum-web-components/commit/ce99528b4ad61ba8185cde7eaacfa98a2a9fd619))
- **menu:** correct types import for .d.ts file creation ([a11d264](https://github.com/adobe/spectrum-web-components/commit/a11d2645863d23d3557fdb5803b68365cc373cb6))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

### Bug Fixes

- ensure submenus stay open when root it clicked again ([83ced1c](https://github.com/adobe/spectrum-web-components/commit/83ced1c913f262620e7b87ad3b7e58dff0697442))

### Features

- **menu:** prepare for Overlay v2 and less connnected/disconnected responsibilities ([5dfb71e](https://github.com/adobe/spectrum-web-components/commit/5dfb71e5ed26cf8af83ca335a7658938f3f135a6))

### Performance Improvements

- make lots of things lazy ([b8fa3ad](https://github.com/adobe/spectrum-web-components/commit/b8fa3ada062bf54bbb42e76ab156c716d5820c7c))
- make submenus lazier ([a2d661c](https://github.com/adobe/spectrum-web-components/commit/a2d661cf4095f4ccb826d17b6f2e665c8c5bf70f))
- make submenus lazy ([93531b9](https://github.com/adobe/spectrum-web-components/commit/93531b9624259d519f6f9cab264f8485c9a32fdb))

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

### Features

- **menu:** convert to core tokens ([#3254](https://github.com/adobe/spectrum-web-components/issues/3254)) ([da43540](https://github.com/adobe/spectrum-web-components/commit/da43540abcea3db75bf145194be800b61153ebe0))

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

### Bug Fixes

- menu item missing aria labels ([#3417](https://github.com/adobe/spectrum-web-components/issues/3417)) ([0d04869](https://github.com/adobe/spectrum-web-components/commit/0d048696792522af0d849b64983ae793dfeae289))

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.33.1](https://github.com/adobe/spectrum-web-components/compare/v0.33.0...v0.33.1) (2023-06-14)

### Bug Fixes

- **menu:** [#3164](https://github.com/adobe/spectrum-web-components/issues/3164) plug memory leak with gobal events ([ff589d4](https://github.com/adobe/spectrum-web-components/commit/ff589d4ec86f8dcda15c386907d27c7b3cc8c325))

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

**Note:** Version bump only for package @spectrum-web-components/menu

# 0.30.0 (2023-05-03)

### Bug Fixes

- abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))
- add "value" slot to sp-menu-item ([e1bd264](https://github.com/adobe/spectrum-web-components/commit/e1bd2646a5198d9ef64710ad0a3749606f08c74e))
- add icon present and icon-only support to Picker ([f6887a3](https://github.com/adobe/spectrum-web-components/commit/f6887a34e228473e33893c81017492bf3e8fd6c3))
- add value/selection checks to the tests and fix up the value logic ([933106f](https://github.com/adobe/spectrum-web-components/commit/933106f88dfa99f22fc1046c1395eb53f051b5c4))
- address a11y issues raised by updating our dependencies ([4f06477](https://github.com/adobe/spectrum-web-components/commit/4f0647782eea7fdd85560e1bcb2f8b892f30bc33))
- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
- correctly delivery visuals and mouse interactions for litAnchor and extensions ([0ae889a](https://github.com/adobe/spectrum-web-components/commit/0ae889a8aab9b3417a021b917dfc817a8310f50f))
- **dropdown:** improve accessibility ([389d9d9](https://github.com/adobe/spectrum-web-components/commit/389d9d94a13bf31e10f58ee498bd848929e9d67c))
- ensure Action Menu Item with [href] close the menu ([6b3d87f](https://github.com/adobe/spectrum-web-components/commit/6b3d87f8c922df782432bca3ef93d21637bad78b))
- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
- ensure that an overlay can be released even if it does not complete its fade in animation ([4cbb36f](https://github.com/adobe/spectrum-web-components/commit/4cbb36f91569ce9b7f926437142950fc8fbd59f9))
- ensure that entering an ancestor Menu Item without a submen closes related submenus ([efe5fa1](https://github.com/adobe/spectrum-web-components/commit/efe5fa1ff50c45487f370847444b940e1d6d8a4e))
- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716f2f787deb8d868a78bd28c8e62fe90e21))
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- match "pointerup" listeners with "pointercancel" for full coverage ([7f2ce92](https://github.com/adobe/spectrum-web-components/commit/7f2ce924ce03fb0881505e6f144184bd3d25355d))
- **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))
- **menu:** allow for settign "selected" async from above ([9d7f622](https://github.com/adobe/spectrum-web-components/commit/9d7f6220313278a90d0482f27a507519a77df549))
- **menu:** cache item parent element to correct disconnecting event dispatch ([f375510](https://github.com/adobe/spectrum-web-components/commit/f3755109ebf64623ba4884871ad8f6eb3b02bc33))
- **menu:** clarify menu internal focus management via preventScroll option ([9ae092c](https://github.com/adobe/spectrum-web-components/commit/9ae092c7d09ef9359dbf9ed9373aef0650967f40))
- **menu:** disabled menu-item should not open submenu ([33848bc](https://github.com/adobe/spectrum-web-components/commit/33848bc0aa64733e356831a5f4968fcb01476df4))
- **menu:** ensure active descendant is in view when activated ([6edc351](https://github.com/adobe/spectrum-web-components/commit/6edc3518fd305cbd35b74f013546bb32aef7616b))
- **menu:** ensure that Groups in Action Menus are rendered with the correct width ([a996a10](https://github.com/adobe/spectrum-web-components/commit/a996a1078bd3a00d3025f0eeadb39330bafdc26d))
- **menu:** include all direct dependencies ([aa7327f](https://github.com/adobe/spectrum-web-components/commit/aa7327f748b829fa6f6eec2412ac104e9dbeff76))
- **menu:** manage tabindex and focus entry correctly ([3b1a250](https://github.com/adobe/spectrum-web-components/commit/3b1a250c0ec4ad2b3553bbf100c8c7015ff3cbc6))
- **menu:** only scrollIntoView when keyboard navigating ([f4e9278](https://github.com/adobe/spectrum-web-components/commit/f4e9278048287a45bba2da25144834b0b8297c66))
- **menu:** pass current focus visibility to menu items ([2d3bf80](https://github.com/adobe/spectrum-web-components/commit/2d3bf8046379fe8caff926af81e62806e77f6a49))
- **menu:** patch undefined lastFocusedItem ([772a7ea](https://github.com/adobe/spectrum-web-components/commit/772a7ea63507b69432e8fac33354578873c3585c))
- **menu:** prevent infinite loop when focus() ([e4e98a3](https://github.com/adobe/spectrum-web-components/commit/e4e98a358a1991c1d6048b01e2899dd28d56dc7e))
- **menu:** support menu item list change in deep decendents ([b2b47f3](https://github.com/adobe/spectrum-web-components/commit/b2b47f305cab9720d29b4214b3330b95f33a56d3))
- normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cdac98282c886f23c4a8d6cf4910c4a606c))
- **picker:** allow menu items to be added, updated, and removed ([73511ba](https://github.com/adobe/spectrum-web-components/commit/73511ba996154c006602dfd1c7f1d94746049782))
- prepare for querying child items while disconnected ([f4152a5](https://github.com/adobe/spectrum-web-components/commit/f4152a5474b661d72b69e7a8cab41639ec7fb8c0))
- prevent infinite loops when all children are [disabled] ([2deac3d](https://github.com/adobe/spectrum-web-components/commit/2deac3d88ea7f2f27e74d60793e253952d0d765f))
- prevent leaving multiple submenus open at a time ([d2bfbb2](https://github.com/adobe/spectrum-web-components/commit/d2bfbb2d8334ae1a6bd21381092d54914b8f708c))
- remove `<sp-menu>` usage where deprecated ([387db3b](https://github.com/adobe/spectrum-web-components/commit/387db3be95c98ab220e517fe12a4db7a2496fe5f))
- simplify focus application in Menu ([6140169](https://github.com/adobe/spectrum-web-components/commit/61401699b36298b6f11cc80703aff664cbb867a7))
- **split-button:** hide "selected" item from menu ([322a966](https://github.com/adobe/spectrum-web-components/commit/322a96655855f42b390ba2c94d0b017bf93aebd9))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- style clean up ([49e1537](https://github.com/adobe/spectrum-web-components/commit/49e15377f3a839d0ed5dc2504dd71396aa156eb5))
- update consumption of Spectrum CSS for latest version ([ed2305b](https://github.com/adobe/spectrum-web-components/commit/ed2305b7334c973ea5c8299cbbce33a365896329))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- update Picker label via MutationObserver instead of "slotchange" ([196998e](https://github.com/adobe/spectrum-web-components/commit/196998e9433dc938d86bfbe77db9e3accd6d9bbc))
- update role application logic to not overwrite menu\* roles ([94b6aec](https://github.com/adobe/spectrum-web-components/commit/94b6aecffc1e5686feab09361d4e07ec3e854726))
- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
- add screenshot regression testing to CI ([8205dfe](https://github.com/adobe/spectrum-web-components/commit/8205dfe33c725e13f74f411779c2ff3b6061a913))
- add selects attribute to menu ([bdf2578](https://github.com/adobe/spectrum-web-components/commit/bdf25780e56c7b92368904dce2a02f2594c364a2))
- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- allow dir management by sp-theme elements ([2d10158](https://github.com/adobe/spectrum-web-components/commit/2d1015883bc0c3a03862c0de8b4d996cd954291f))
- conditionally load focus-visible polyfill ([6b5e5cf](https://github.com/adobe/spectrum-web-components/commit/6b5e5cf515f02ef14f072b7aee62feed7a83c281))
- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
- **menu:** update spectrum css input ([8c7e18a](https://github.com/adobe/spectrum-web-components/commit/8c7e18ac16f2747bd2f10173bcac0d5e53a0bcac))
- **overlay:** manage focus throwing and tab trapping ([27a0b53](https://github.com/adobe/spectrum-web-components/commit/27a0b53ea94d19bb18b7d3f89763b06dc1b42b59))
- **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))
- **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))
- reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))
- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
- update Menu Divider for new Spectrum CSS output ([aca7e2d](https://github.com/adobe/spectrum-web-components/commit/aca7e2dd1b42016d16c5e7a3484e0963ffce4d9a))
- update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))
- use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc77960de8e57dd9c49bb7669df689f0ebaa))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/39188887afad9bec52ef48d4e22596f9b757a9fe))
- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

### Performance Improvements

- reorganize inheritance and composition in Menu Items ([d96ccb6](https://github.com/adobe/spectrum-web-components/commit/d96ccb621833277444d69535126c3669343c2eaf))
- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))
- use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0accd643c2f35cbf1ba809b54f52c25628d))

### Reverts

- Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))

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

- **menu:** patch undefined lastFocusedItem ([772a7ea](https://github.com/adobe/spectrum-web-components/commit/772a7ea63507b69432e8fac33354578873c3585c))
- prepare for querying child items while disconnected ([f4152a5](https://github.com/adobe/spectrum-web-components/commit/f4152a5474b661d72b69e7a8cab41639ec7fb8c0))

## [0.16.11](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.10...@spectrum-web-components/menu@0.16.11) (2023-01-23)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.9...@spectrum-web-components/menu@0.16.10) (2023-01-09)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.8...@spectrum-web-components/menu@0.16.9) (2022-12-08)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.7...@spectrum-web-components/menu@0.16.8) (2022-11-21)

### Bug Fixes

- ensure that an overlay can be released even if it does not complete its fade in animation ([4cbb36f](https://github.com/adobe/spectrum-web-components/commit/4cbb36f91569ce9b7f926437142950fc8fbd59f9))

## [0.16.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.6...@spectrum-web-components/menu@0.16.7) (2022-11-14)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.5...@spectrum-web-components/menu@0.16.6) (2022-10-28)

### Bug Fixes

- ensure Action Menu Item with [href] close the menu ([6b3d87f](https://github.com/adobe/spectrum-web-components/commit/6b3d87f8c922df782432bca3ef93d21637bad78b))

## [0.16.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.4...@spectrum-web-components/menu@0.16.5) (2022-10-17)

### Bug Fixes

- **menu:** ensure that Groups in Action Menus are rendered with the correct width ([a996a10](https://github.com/adobe/spectrum-web-components/commit/a996a1078bd3a00d3025f0eeadb39330bafdc26d))

## [0.16.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.3...@spectrum-web-components/menu@0.16.4) (2022-10-10)

### Bug Fixes

- match "pointerup" listeners with "pointercancel" for full coverage ([7f2ce92](https://github.com/adobe/spectrum-web-components/commit/7f2ce924ce03fb0881505e6f144184bd3d25355d))

## [0.16.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.2...@spectrum-web-components/menu@0.16.3) (2022-09-15)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.1...@spectrum-web-components/menu@0.16.2) (2022-09-14)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.16.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.16.0...@spectrum-web-components/menu@0.16.1) (2022-08-24)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.16.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.15.0...@spectrum-web-components/menu@0.16.0) (2022-08-09)

### Features

- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))

# [0.15.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.4...@spectrum-web-components/menu@0.15.0) (2022-08-04)

### Features

- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))

## [0.14.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.3...@spectrum-web-components/menu@0.14.4) (2022-07-18)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.14.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.2...@spectrum-web-components/menu@0.14.3) (2022-06-29)

### Bug Fixes

- ensure that entering an ancestor Menu Item without a submen closes related submenus ([efe5fa1](https://github.com/adobe/spectrum-web-components/commit/efe5fa1ff50c45487f370847444b940e1d6d8a4e))
- update Picker label via MutationObserver instead of "slotchange" ([196998e](https://github.com/adobe/spectrum-web-components/commit/196998e9433dc938d86bfbe77db9e3accd6d9bbc))

## [0.14.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.1...@spectrum-web-components/menu@0.14.2) (2022-06-07)

### Bug Fixes

- prevent leaving multiple submenus open at a time ([d2bfbb2](https://github.com/adobe/spectrum-web-components/commit/d2bfbb2d8334ae1a6bd21381092d54914b8f708c))
- **menu:** disabled menu-item should not open submenu ([33848bc](https://github.com/adobe/spectrum-web-components/commit/33848bc0aa64733e356831a5f4968fcb01476df4))

## [0.14.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.14.0...@spectrum-web-components/menu@0.14.1) (2022-05-27)

### Bug Fixes

- update consumption of Spectrum CSS for latest version ([ed2305b](https://github.com/adobe/spectrum-web-components/commit/ed2305b7334c973ea5c8299cbbce33a365896329))

# [0.14.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.13.0...@spectrum-web-components/menu@0.14.0) (2022-05-12)

### Features

- update Menu Divider for new Spectrum CSS output ([aca7e2d](https://github.com/adobe/spectrum-web-components/commit/aca7e2dd1b42016d16c5e7a3484e0963ffce4d9a))

# [0.13.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.5...@spectrum-web-components/menu@0.13.0) (2022-04-21)

### Features

- conditionally load focus-visible polyfill ([6b5e5cf](https://github.com/adobe/spectrum-web-components/commit/6b5e5cf515f02ef14f072b7aee62feed7a83c281))
- reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))

## [0.12.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.4...@spectrum-web-components/menu@0.12.5) (2022-03-30)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.12.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.3...@spectrum-web-components/menu@0.12.4) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.12.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.2...@spectrum-web-components/menu@0.12.3) (2022-03-08)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.12.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.1...@spectrum-web-components/menu@0.12.2) (2022-03-04)

### Bug Fixes

- **menu:** add support for submenu interactions ([68399af](https://github.com/adobe/spectrum-web-components/commit/68399af396bfb70b9c84c83ee2265aa9daa05e10))

## [0.12.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.12.0...@spectrum-web-components/menu@0.12.1) (2022-02-22)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.12.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.11.3...@spectrum-web-components/menu@0.12.0) (2022-02-02)

### Features

- **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))

## [0.11.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.11.2...@spectrum-web-components/menu@0.11.3) (2022-01-26)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.11.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.11.1...@spectrum-web-components/menu@0.11.2) (2022-01-07)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.11.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.11.0...@spectrum-web-components/menu@0.11.1) (2021-12-13)

### Bug Fixes

- **picker:** allow menu items to be added, updated, and removed ([73511ba](https://github.com/adobe/spectrum-web-components/commit/73511ba996154c006602dfd1c7f1d94746049782))

# [0.11.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.10.1...@spectrum-web-components/menu@0.11.0) (2021-11-08)

### Features

- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))

## [0.10.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.10.0...@spectrum-web-components/menu@0.10.1) (2021-11-08)

### Bug Fixes

- abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))

# [0.10.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.6...@spectrum-web-components/menu@0.10.0) (2021-11-02)

### Features

- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))

## [0.9.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.5...@spectrum-web-components/menu@0.9.6) (2021-10-12)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.9.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.4...@spectrum-web-components/menu@0.9.5) (2021-10-05)

### Bug Fixes

- **menu:** cache item parent element to correct disconnecting event dispatch ([f375510](https://github.com/adobe/spectrum-web-components/commit/f3755109ebf64623ba4884871ad8f6eb3b02bc33))

## [0.9.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.3...@spectrum-web-components/menu@0.9.4) (2021-09-20)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.9.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.2...@spectrum-web-components/menu@0.9.3) (2021-09-13)

### Bug Fixes

- simplify focus application in Menu ([6140169](https://github.com/adobe/spectrum-web-components/commit/61401699b36298b6f11cc80703aff664cbb867a7))

## [0.9.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.1...@spectrum-web-components/menu@0.9.2) (2021-08-24)

### Bug Fixes

- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))

## [0.9.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.9.0...@spectrum-web-components/menu@0.9.1) (2021-08-17)

### Performance Improvements

- reorganize inheritance and composition in Menu Items ([d96ccb6](https://github.com/adobe/spectrum-web-components/commit/d96ccb621833277444d69535126c3669343c2eaf))

# [0.9.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.10...@spectrum-web-components/menu@0.9.0) (2021-08-03)

### Bug Fixes

- add value/selection checks to the tests and fix up the value logic ([933106f](https://github.com/adobe/spectrum-web-components/commit/933106f88dfa99f22fc1046c1395eb53f051b5c4))
- **split-button:** hide "selected" item from menu ([322a966](https://github.com/adobe/spectrum-web-components/commit/322a96655855f42b390ba2c94d0b017bf93aebd9))

### Features

- add selects attribute to menu ([bdf2578](https://github.com/adobe/spectrum-web-components/commit/bdf25780e56c7b92368904dce2a02f2594c364a2))

## [0.8.10](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.9...@spectrum-web-components/menu@0.8.10) (2021-07-22)

### Bug Fixes

- style clean up ([49e1537](https://github.com/adobe/spectrum-web-components/commit/49e15377f3a839d0ed5dc2504dd71396aa156eb5))

## [0.8.9](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.8...@spectrum-web-components/menu@0.8.9) (2021-07-01)

### Bug Fixes

- add "value" slot to sp-menu-item ([e1bd264](https://github.com/adobe/spectrum-web-components/commit/e1bd2646a5198d9ef64710ad0a3749606f08c74e))
- add icon present and icon-only support to Picker ([f6887a3](https://github.com/adobe/spectrum-web-components/commit/f6887a34e228473e33893c81017492bf3e8fd6c3))

## [0.8.8](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.7...@spectrum-web-components/menu@0.8.8) (2021-06-16)

### Bug Fixes

- update role application logic to not overwrite menu\* roles ([94b6aec](https://github.com/adobe/spectrum-web-components/commit/94b6aecffc1e5686feab09361d4e07ec3e854726))

## [0.8.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.6...@spectrum-web-components/menu@0.8.7) (2021-06-07)

### Bug Fixes

- **menu:** clarify menu internal focus management via preventScroll option ([9ae092c](https://github.com/adobe/spectrum-web-components/commit/9ae092c7d09ef9359dbf9ed9373aef0650967f40))

## [0.8.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.5...@spectrum-web-components/menu@0.8.6) (2021-05-24)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.8.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.4...@spectrum-web-components/menu@0.8.5) (2021-05-12)

### Bug Fixes

- **menu:** pass current focus visibility to menu items ([2d3bf80](https://github.com/adobe/spectrum-web-components/commit/2d3bf8046379fe8caff926af81e62806e77f6a49))

## [0.8.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.3...@spectrum-web-components/menu@0.8.4) (2021-04-15)

### Bug Fixes

- **menu:** manage tabindex and focus entry correctly ([3b1a250](https://github.com/adobe/spectrum-web-components/commit/3b1a250c0ec4ad2b3553bbf100c8c7015ff3cbc6))
- **menu:** only scrollIntoView when keyboard navigating ([f4e9278](https://github.com/adobe/spectrum-web-components/commit/f4e9278048287a45bba2da25144834b0b8297c66))

## [0.8.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.2...@spectrum-web-components/menu@0.8.3) (2021-04-09)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.8.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.1...@spectrum-web-components/menu@0.8.2) (2021-03-29)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.8.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.8.0...@spectrum-web-components/menu@0.8.1) (2021-03-22)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.8.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.7.1...@spectrum-web-components/menu@0.8.0) (2021-03-22)

### Bug Fixes

- correctly delivery visuals and mouse interactions for litAnchor and extensions ([0ae889a](https://github.com/adobe/spectrum-web-components/commit/0ae889a8aab9b3417a021b917dfc817a8310f50f))
- remove `<sp-menu>` usage where deprecated ([387db3b](https://github.com/adobe/spectrum-web-components/commit/387db3be95c98ab220e517fe12a4db7a2496fe5f))

### Features

- **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))

## [0.7.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.7.0...@spectrum-web-components/menu@0.7.1) (2021-03-05)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.7.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.6.3...@spectrum-web-components/menu@0.7.0) (2021-03-04)

### Bug Fixes

- **menu:** ensure active descendant is in view when activated ([6edc351](https://github.com/adobe/spectrum-web-components/commit/6edc3518fd305cbd35b74f013546bb32aef7616b))

### Features

- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))

## [0.6.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.6.2...@spectrum-web-components/menu@0.6.3) (2021-02-11)

### Bug Fixes

- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))

## [0.6.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.6.1...@spectrum-web-components/menu@0.6.2) (2021-02-02)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.6.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.6.0...@spectrum-web-components/menu@0.6.1) (2021-01-28)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.6.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.4...@spectrum-web-components/menu@0.6.0) (2021-01-21)

### Bug Fixes

- address a11y issues raised by updating our dependencies ([4f06477](https://github.com/adobe/spectrum-web-components/commit/4f0647782eea7fdd85560e1bcb2f8b892f30bc33))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- prevent infinite loops when all children are [disabled] ([2deac3d](https://github.com/adobe/spectrum-web-components/commit/2deac3d88ea7f2f27e74d60793e253952d0d765f))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- **menu:** prevent infinite loop when focus() ([e4e98a3](https://github.com/adobe/spectrum-web-components/commit/e4e98a358a1991c1d6048b01e2899dd28d56dc7e))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- **menu:** update spectrum css input ([8c7e18a](https://github.com/adobe/spectrum-web-components/commit/8c7e18ac16f2747bd2f10173bcac0d5e53a0bcac))

# [0.5.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.4...@spectrum-web-components/menu@0.5.0) (2021-01-13)

### Bug Fixes

- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- prevent infinite loops when all children are [disabled](<[2deac3d](https://github.com/adobe/spectrum-web-components/commit/2deac3d88ea7f2f27e74d60793e253952d0d765f)>)
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- **menu:** prevent infinite loop when focus() ([e4e98a3](https://github.com/adobe/spectrum-web-components/commit/e4e98a358a1991c1d6048b01e2899dd28d56dc7e))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))

### Features

- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- **menu:** update spectrum css input ([8c7e18a](https://github.com/adobe/spectrum-web-components/commit/8c7e18ac16f2747bd2f10173bcac0d5e53a0bcac))

## [0.4.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.3...@spectrum-web-components/menu@0.4.4) (2020-10-12)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.4.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.2...@spectrum-web-components/menu@0.4.3) (2020-10-12)

### Bug Fixes

- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
- **dropdown:** improve accessibility ([389d9d9](https://github.com/adobe/spectrum-web-components/commit/389d9d94a13bf31e10f58ee498bd848929e9d67c))

## [0.4.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.1...@spectrum-web-components/menu@0.4.2) (2020-09-25)

### Bug Fixes

- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))

## [0.4.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.4.0...@spectrum-web-components/menu@0.4.1) (2020-09-14)

**Note:** Version bump only for package @spectrum-web-components/menu

# [0.4.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.3.2...@spectrum-web-components/menu@0.4.0) (2020-08-31)

### Features

- allow dir management by sp-theme elements ([2d10158](https://github.com/adobe/spectrum-web-components/commit/2d1015883bc0c3a03862c0de8b4d996cd954291f))
- update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))
- **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))

## [0.3.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.3.1...@spectrum-web-components/menu@0.3.2) (2020-08-19)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.3.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.3.0...@spectrum-web-components/menu@0.3.1) (2020-08-13)

### Bug Fixes

- **menu:** include all direct dependencies ([aa7327f](https://github.com/adobe/spectrum-web-components/commit/aa7327f748b829fa6f6eec2412ac104e9dbeff76))
- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))

# [0.3.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.7...@spectrum-web-components/menu@0.3.0) (2020-07-17)

### Features

- **overlay:** manage focus throwing and tab trapping ([27a0b53](https://github.com/adobe/spectrum-web-components/commit/27a0b53ea94d19bb18b7d3f89763b06dc1b42b59))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))

## [0.2.7](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.6...@spectrum-web-components/menu@0.2.7) (2020-06-08)

### Bug Fixes

- **menu:** support menu item list change in deep decendents ([b2b47f3](https://github.com/adobe/spectrum-web-components/commit/b2b47f305cab9720d29b4214b3330b95f33a56d3))

## [0.2.6](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.5...@spectrum-web-components/menu@0.2.6) (2020-04-16)

### Performance Improvements

- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))

## [0.2.5](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.4...@spectrum-web-components/menu@0.2.5) (2020-04-07)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.2.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.3...@spectrum-web-components/menu@0.2.4) (2020-03-11)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.2.3](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.2...@spectrum-web-components/menu@0.2.3) (2020-01-06)

**Note:** Version bump only for package @spectrum-web-components/menu

## [0.2.2](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.1...@spectrum-web-components/menu@0.2.2) (2019-12-02)

### Bug Fixes

- normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cd))

## [0.2.1](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.2.0...@spectrum-web-components/menu@0.2.1) (2019-11-27)

### Bug Fixes

- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716))

# [0.2.0](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.1.4...@spectrum-web-components/menu@0.2.0) (2019-11-19)

### Bug Fixes

- **menu:** allow for settign "selected" async from above ([9d7f622](https://github.com/adobe/spectrum-web-components/commit/9d7f622))

### Features

- add screenshot regression testing to CI ([8205dfe](https://github.com/adobe/spectrum-web-components/commit/8205dfe))
- use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc7))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/3918888))

## [0.1.4](https://github.com/adobe/spectrum-web-components/compare/@spectrum-web-components/menu@0.1.3...@spectrum-web-components/menu@0.1.4) (2019-10-14)

### Performance Improvements

- use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0a))

## 0.1.3 (2019-10-03)

**Note:** Version bump only for package @spectrum-web-components/menu
