# Change Log

## 1.11.0

### Patch Changes

- Updated dependencies [[`eac97a2`](https://github.com/adobe/spectrum-web-components/commit/eac97a2a4206d1ece946d9bec0e7f462624ced27), [`b95e254`](https://github.com/adobe/spectrum-web-components/commit/b95e25413830825a506b7d4025d6b4d982691771), [`02b2d7d`](https://github.com/adobe/spectrum-web-components/commit/02b2d7d2c7d204d7f0f6501ec075e923f58244c9), [`f07344f`](https://github.com/adobe/spectrum-web-components/commit/f07344f400f64c12f15762e3fedcdab2629e781b), [`1d76b70`](https://github.com/adobe/spectrum-web-components/commit/1d76b7093d8ff5f9b26f07a69086488341a02650), [`b95e254`](https://github.com/adobe/spectrum-web-components/commit/b95e25413830825a506b7d4025d6b4d982691771), [`cadc39e`](https://github.com/adobe/spectrum-web-components/commit/cadc39ea419f572a79451fc886cd45c8d8821cde), [`4cb0b7b`](https://github.com/adobe/spectrum-web-components/commit/4cb0b7b86ebfaad89f1866916415b8578aa6dbea), [`9cb816b`](https://github.com/adobe/spectrum-web-components/commit/9cb816b5ac80387fdc9bb87381f5149fecb1b595)]:
    - @spectrum-web-components/menu@1.11.0
    - @spectrum-web-components/reactive-controllers@1.11.0
    - @spectrum-web-components/overlay@1.11.0
    - @spectrum-web-components/base@1.11.0
    - @spectrum-web-components/textfield@1.11.0
    - @spectrum-web-components/icon@1.11.0
    - @spectrum-web-components/popover@1.11.0
    - @spectrum-web-components/progress-circle@1.11.0
    - @spectrum-web-components/action-button@1.11.0
    - @spectrum-web-components/picker-button@1.11.0
    - @spectrum-web-components/icons-ui@1.11.0

## 1.10.0

### Patch Changes

- Updated dependencies []:
    - @spectrum-web-components/base@1.10.0
    - @spectrum-web-components/action-button@1.10.0
    - @spectrum-web-components/icon@1.10.0
    - @spectrum-web-components/icons-ui@1.10.0
    - @spectrum-web-components/menu@1.10.0
    - @spectrum-web-components/overlay@1.10.0
    - @spectrum-web-components/picker-button@1.10.0
    - @spectrum-web-components/popover@1.10.0
    - @spectrum-web-components/progress-circle@1.10.0
    - @spectrum-web-components/textfield@1.10.0
    - @spectrum-web-components/reactive-controllers@1.10.0

## 1.9.1

### Patch Changes

- Updated dependencies [[`a19cbe3`](https://github.com/adobe/spectrum-web-components/commit/a19cbe3e8b4690d8abd1530e3930e5d48ae43618)]:
    - @spectrum-web-components/overlay@1.9.1
    - @spectrum-web-components/menu@1.9.1
    - @spectrum-web-components/popover@1.9.1
    - @spectrum-web-components/action-button@1.9.1
    - @spectrum-web-components/icon@1.9.1
    - @spectrum-web-components/icons-ui@1.9.1
    - @spectrum-web-components/picker-button@1.9.1
    - @spectrum-web-components/progress-circle@1.9.1
    - @spectrum-web-components/textfield@1.9.1
    - @spectrum-web-components/base@1.9.1
    - @spectrum-web-components/reactive-controllers@1.9.1

## 1.9.0

### Patch Changes

- [#5730](https://github.com/adobe/spectrum-web-components/pull/5730) [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8) Thanks [@caseyisonit](https://github.com/caseyisonit)! - - **Fixed**: Pending state handling and accessibility in `<sp-combobox>` component.
    - **Changed**: Removed dependency on `PendingStateController` and implemented inline pending state handling
    - **Fixed**: Updated aria-labelledby attribute ordering to improve screen reader experience (`label applied-label pending-label`)
    - **Fixed**: Updated progress circle implementation to use `role="presentation"` instead of `aria-valuetext`
    - **Added**: Direct pending state visual rendering with improved accessibility

    These changes improve accessibility for pending states while reducing unnecessary component dependencies.

- Updated dependencies [[`4880da4`](https://github.com/adobe/spectrum-web-components/commit/4880da4f80a25ae1b475f52ce4ba7914cdcd9de4), [`72d807c`](https://github.com/adobe/spectrum-web-components/commit/72d807c75d04b0fec1794a8d3e68383ca61d9e4c), [`14ebeb9`](https://github.com/adobe/spectrum-web-components/commit/14ebeb9e8a24de9c9a80e7f3f0babd19a34e8179), [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8), [`7d23140`](https://github.com/adobe/spectrum-web-components/commit/7d23140c21f0006ddea8a5cf39478ff36acbfbb8)]:
    - @spectrum-web-components/menu@1.9.0
    - @spectrum-web-components/textfield@1.9.0
    - @spectrum-web-components/progress-circle@1.9.0
    - @spectrum-web-components/reactive-controllers@1.9.0
    - @spectrum-web-components/action-button@1.9.0
    - @spectrum-web-components/picker-button@1.9.0
    - @spectrum-web-components/icon@1.9.0
    - @spectrum-web-components/overlay@1.9.0
    - @spectrum-web-components/icons-ui@1.9.0
    - @spectrum-web-components/popover@1.9.0
    - @spectrum-web-components/base@1.9.0

## 1.8.0

### Patch Changes

- [#5538](https://github.com/adobe/spectrum-web-components/pull/5538) [`cc6e91e`](https://github.com/adobe/spectrum-web-components/commit/cc6e91eca2b5d84769d2ed42758299e2ec57e3b2) Thanks [@tjgupta](https://github.com/tjgupta)! - Replace the use of offsetWidth with a resizeObserver to avoid unecessary, performance-impacting layout reflows.

- Updated dependencies [[`14486d6`](https://github.com/adobe/spectrum-web-components/commit/14486d620e88976c794225edb54eaca8392015c7), [`f27ab09`](https://github.com/adobe/spectrum-web-components/commit/f27ab096f4d53543dc53f75ec196c696b78b3baa), [`ee1bae6`](https://github.com/adobe/spectrum-web-components/commit/ee1bae6f9a7401dc31ebc84e4e27f9d39be692d1), [`14486d6`](https://github.com/adobe/spectrum-web-components/commit/14486d620e88976c794225edb54eaca8392015c7)]:
    - @spectrum-web-components/overlay@1.8.0
    - @spectrum-web-components/menu@1.8.0
    - @spectrum-web-components/popover@1.8.0
    - @spectrum-web-components/action-button@1.8.0
    - @spectrum-web-components/picker-button@1.8.0
    - @spectrum-web-components/icon@1.8.0
    - @spectrum-web-components/icons-ui@1.8.0
    - @spectrum-web-components/progress-circle@1.8.0
    - @spectrum-web-components/textfield@1.8.0
    - @spectrum-web-components/base@1.8.0
    - @spectrum-web-components/reactive-controllers@1.8.0

## 1.7.0

### Patch Changes

- Updated dependencies [[`3aeafdd`](https://github.com/adobe/spectrum-web-components/commit/3aeafddab98fe30f4db538ded9052997aaa05b07), [`a646ae8`](https://github.com/adobe/spectrum-web-components/commit/a646ae8b0e652308d359226740d2cb189e492e45), [`c1669d2`](https://github.com/adobe/spectrum-web-components/commit/c1669d2dc5e1ceeb84486ce49a428f86a3173caa), [`cde976d`](https://github.com/adobe/spectrum-web-components/commit/cde976ddfa71f898e2d0404ecc53150db149a861)]:
    - @spectrum-web-components/menu@1.7.0
    - @spectrum-web-components/overlay@1.7.0
    - @spectrum-web-components/action-button@1.7.0
    - @spectrum-web-components/textfield@1.7.0
    - @spectrum-web-components/popover@1.7.0
    - @spectrum-web-components/icon@1.7.0
    - @spectrum-web-components/icons-ui@1.7.0
    - @spectrum-web-components/picker-button@1.7.0
    - @spectrum-web-components/progress-circle@1.7.0
    - @spectrum-web-components/base@1.7.0

## 1.6.0

### Patch Changes

- Updated dependencies [[`03a4439`](https://github.com/adobe/spectrum-web-components/commit/03a443946b760aedc668630f33ac660443ff915e), [`9e15a66`](https://github.com/adobe/spectrum-web-components/commit/9e15a66a281745004add414ff977d4a71186aedd), [`a9727d2`](https://github.com/adobe/spectrum-web-components/commit/a9727d2975b01f440c09789c9e7e0122063b6f7e), [`53f3769`](https://github.com/adobe/spectrum-web-components/commit/53f3769f07b6e7853a8a4c0dc63b21fe14cf3d4b)]:
    - @spectrum-web-components/popover@1.6.0
    - @spectrum-web-components/textfield@1.6.0
    - @spectrum-web-components/menu@1.6.0
    - @spectrum-web-components/overlay@1.6.0
    - @spectrum-web-components/action-button@1.6.0
    - @spectrum-web-components/picker-button@1.6.0
    - @spectrum-web-components/icon@1.6.0
    - @spectrum-web-components/icons-ui@1.6.0
    - @spectrum-web-components/progress-circle@1.6.0
    - @spectrum-web-components/base@1.6.0

## 1.5.0

### Minor Changes

- [#5202](https://github.com/adobe/spectrum-web-components/pull/5202) [`fa4be70`](https://github.com/adobe/spectrum-web-components/commit/fa4be70e9ab9dbeff26867edd3bdeb3f41c423e3) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - Updates the combobox component from version 4.0.0-s2-foundations.21 to 4.1.2. This work also addresses the design feedback for combobox in S2 foundations:
    - corrects the border colors for several combobox states including focus, keyboardFocus, focus+hover, disabled, read-only for all themes
    - increases the specificity of the `#textfield:hover .input` selector to `#textfield:hover .input:focus` in order to properly render the focus+hover border color styles (within the `combobox.css` file)
    - adds an additional selector for disabled comboboxes that correctly renders the border colors based on theme context

### Patch Changes

- Updated dependencies [[`86bcd12`](https://github.com/adobe/spectrum-web-components/commit/86bcd122003e99d490a64d466dab3e7d609a6ff3), [`fa4be70`](https://github.com/adobe/spectrum-web-components/commit/fa4be70e9ab9dbeff26867edd3bdeb3f41c423e3), [`8f8735c`](https://github.com/adobe/spectrum-web-components/commit/8f8735c9ec3eac3b6473424c78257cb46ee17f70), [`6c58f50`](https://github.com/adobe/spectrum-web-components/commit/6c58f50f7b1f5489c11e0d3484e3f4a9d576f1c8), [`4c2f908`](https://github.com/adobe/spectrum-web-components/commit/4c2f908a92b383d49eb7197d954966fe1798aa20), [`a69accb`](https://github.com/adobe/spectrum-web-components/commit/a69accb8b44b2612d53d31ba52c99aa751ce9f3a)]:
    - @spectrum-web-components/menu@1.5.0
    - @spectrum-web-components/picker-button@1.5.0
    - @spectrum-web-components/overlay@1.5.0
    - @spectrum-web-components/action-button@1.5.0
    - @spectrum-web-components/textfield@1.5.0
    - @spectrum-web-components/popover@1.5.0
    - @spectrum-web-components/icon@1.5.0
    - @spectrum-web-components/icons-ui@1.5.0
    - @spectrum-web-components/progress-circle@1.5.0
    - @spectrum-web-components/base@1.5.0

## 1.4.0

### Patch Changes

- Updated dependencies [[`2a0422e`](https://github.com/adobe/spectrum-web-components/commit/2a0422ec1b667a9f236858f8cc9dca261ba27f9f), [`72dbe62`](https://github.com/adobe/spectrum-web-components/commit/72dbe629cddfc57171eaaadf7206df47c19d3c98), [`46cd782`](https://github.com/adobe/spectrum-web-components/commit/46cd7828f65491fc08790e5ba0aec412ee89199d), [`6618422`](https://github.com/adobe/spectrum-web-components/commit/6618422848df234e420eed95f4a5a30557e1e46f), [`70f5f6f`](https://github.com/adobe/spectrum-web-components/commit/70f5f6f3a97b530fb20f9f5ee049e9a8c124b02d)]:
    - @spectrum-web-components/menu@1.4.0
    - @spectrum-web-components/action-button@1.4.0
    - @spectrum-web-components/overlay@1.4.0
    - @spectrum-web-components/popover@1.4.0
    - @spectrum-web-components/icon@1.4.0
    - @spectrum-web-components/icons-ui@1.4.0
    - @spectrum-web-components/picker-button@1.4.0
    - @spectrum-web-components/progress-circle@1.4.0
    - @spectrum-web-components/textfield@1.4.0
    - @spectrum-web-components/base@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies [[`ea38ef0`](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f), [`468314f`](https://github.com/adobe/spectrum-web-components/commit/468314f45cf5fedb2e9029da210a5886260abca9)]:
    - @spectrum-web-components/menu@1.3.0
    - @spectrum-web-components/overlay@1.3.0
    - @spectrum-web-components/popover@1.3.0
    - @spectrum-web-components/action-button@1.3.0
    - @spectrum-web-components/picker-button@1.3.0
    - @spectrum-web-components/icon@1.3.0
    - @spectrum-web-components/icons-ui@1.3.0
    - @spectrum-web-components/progress-circle@1.3.0
    - @spectrum-web-components/textfield@1.3.0
    - @spectrum-web-components/base@1.3.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

### Bug Fixes

- **action menu:** keyboard accessibility omnibus ([#5031](https://github.com/adobe/spectrum-web-components/issues/5031)) ([ea38ef0](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)), closes [#4623](https://github.com/adobe/spectrum-web-components/issues/4623)

### Features

- **combobox:** allow support for disabled items ([#5104](https://github.com/adobe/spectrum-web-components/issues/5104)) ([b78d412](https://github.com/adobe/spectrum-web-components/commit/b78d4125a90266059746207ffafc0c4c22f2b0a4))

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

**Note:** Version bump only for package @spectrum-web-components/combobox

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

**Note:** Version bump only for package @spectrum-web-components/combobox

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))

### Features

- add an optional chromatic vrt action ([7d2f840](https://github.com/adobe/spectrum-web-components/commit/7d2f8401cb05c5e23872424f132a1a8edd95b666))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

### Bug Fixes

- **overlay:** overlay scroll in safari and firefox ([#4969](https://github.com/adobe/spectrum-web-components/issues/4969)) ([05d24ff](https://github.com/adobe/spectrum-web-components/commit/05d24ffc4dc8e9b0281b90c768b7f983fe890def))

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

**Note:** Version bump only for package @spectrum-web-components/combobox

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

**Note:** Version bump only for package @spectrum-web-components/combobox

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

**Note:** Version bump only for package @spectrum-web-components/combobox

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

**Note:** Version bump only for package @spectrum-web-components/combobox

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

### Bug Fixes

- **combobox:** update selected item state in menu ([#4730](https://github.com/adobe/spectrum-web-components/issues/4730)) ([c4cfd2a](https://github.com/adobe/spectrum-web-components/commit/c4cfd2a5a2b1d48727488023d1361e3a5b7c32db))

### Features

- **reactive-controller:** new pending state controller ([#4605](https://github.com/adobe/spectrum-web-components/issues/4605)) ([68baf94](https://github.com/adobe/spectrum-web-components/commit/68baf94f257b9c7525253819a2ed3c8fa1b6c408))

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

**Note:** Version bump only for package @spectrum-web-components/combobox

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

### Bug Fixes

- **reactive-controllers:** update focusable element's tab-index to 0 on accepting focus ([#4630](https://github.com/adobe/spectrum-web-components/issues/4630)) ([d359e84](https://github.com/adobe/spectrum-web-components/commit/d359e844fb00ff3a52f7f4346038aa8d5b620025))

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

**Note:** Version bump only for package @spectrum-web-components/combobox

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

**Note:** Version bump only for package @spectrum-web-components/combobox

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

**Note:** Version bump only for package @spectrum-web-components/combobox

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

### Features

- **combobox:** add `pending` state ([#4462](https://github.com/adobe/spectrum-web-components/issues/4462)) ([2d0c388](https://github.com/adobe/spectrum-web-components/commit/2d0c388cfde52bd5695b3d6db4b0425987ea6f85))

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

**Note:** Version bump only for package @spectrum-web-components/combobox

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

### Bug Fixes

- **combobox:** allow numeric values and trigger change event on keybo… ([#4405](https://github.com/adobe/spectrum-web-components/issues/4405)) ([235ae7c](https://github.com/adobe/spectrum-web-components/commit/235ae7ca9eed35800a834af1005eb0c8d892b9f1))
- **combobox:** correct package.json listings ([35a69a2](https://github.com/adobe/spectrum-web-components/commit/35a69a2923eec3f9f7bac867752d869e5fe988c1))
- **combobox:** process styles for invalid state ([#4344](https://github.com/adobe/spectrum-web-components/issues/4344)) ([c2b952e](https://github.com/adobe/spectrum-web-components/commit/c2b952e4e6558c99e15e2503702375bc9b0539d5))

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

### Bug Fixes

- **combobox:** correct package.json listings ([35a69a2](https://github.com/adobe/spectrum-web-components/commit/35a69a2923eec3f9f7bac867752d869e5fe988c1))

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @spectrum-web-components/combobox

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

**Note:** Version bump only for package @spectrum-web-components/combobox

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

**Note:** Version bump only for package @spectrum-web-components/combobox

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

**Note:** Version bump only for package @spectrum-web-components/combobox

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

### Features

- **icon:** use core tokens ([a11ef6b](https://github.com/adobe/spectrum-web-components/commit/a11ef6b45141769b4c73a7c79322e780a8a1fa6e))

### Performance Improvements

- **combobox:** prevent initial list render and update tests to prove that reduces render time ([3dc5b1f](https://github.com/adobe/spectrum-web-components/commit/3dc5b1f77fbe9d5b20178a3641b0c73da0cdad35))

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

### Bug Fixes

- **combobox:** add combobox pattern ([#3894](https://github.com/adobe/spectrum-web-components/issues/3894)) ([47d7d71](https://github.com/adobe/spectrum-web-components/commit/47d7d71bc9e17b67452d45b9495c970dac15ff89)), closes [#3887](https://github.com/adobe/spectrum-web-components/issues/3887)
