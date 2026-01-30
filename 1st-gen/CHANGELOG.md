# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.11.0](https://github.com/adobe/spectrum-web-components/compare/v1.10.0...v1.11.0) (2026-01-27)

## Minor Changes

**sp-reactive-controllers**: **Added**: `FocusGroupController` now supports a `stopKeyEventPropagation` config option. When set to `true`, arrow key events will stop propagation after being handled, preventing them from bubbling up to parent elements.

**sp-tray**: **Added**: Automatic dismiss button detection and visually-hidden helpers for screen reader accessibility

- **Added**: `<sp-tray>` now automatically detects keyboard-accessible dismiss buttons (like `<sp-button>`, `<sp-close-button>`, or HTML `<button>` elements) in slotted content
- **Added**: When no dismiss buttons are detected, the tray automatically renders visually-hidden dismiss buttons before and after its content to support mobile screen readers (particularly VoiceOver on iOS)
- **Added**: New `has-keyboard-dismiss` boolean attribute to manually override auto-detection when slotted content has custom dismiss functionality that cannot be automatically detected
- **Added**: Auto-detection recognizes `<sp-dialog dismissable>` and `<sp-dialog-wrapper dismissable>` components with built-in dismiss functionality in shadow DOM
- **Enhanced**: Improved mobile screen reader accessibility by ensuring dismissal options are always available when appropriate

**sp-close-button**: Added visually hidden default slot rendering to sp-close-button so text content is accessible to screen readers while remaining invisible to sighted users.

**sp-styles**: Manually adds the s2 static color values from [Spectrum Tokens](https://github.com/adobe/spectrum-tokens/blob/04cf6eb95ece7f3320e0e2babd6a51db8edfc950/packages/tokens/src/color-palette.json#L6491)

### Added

- `--spectrum-static-blue-900-rgb: 59 99 251;`
- `--spectrum-static-blue-900: rgb(var(--spectrum-static-blue-900-rgb));`
- `--spectrum-static-blue-1000-rgb: 39 77 234;`
- `--spectrum-static-blue-1000: rgb(var(--spectrum-static-blue-1000-rgb));`
- `--spectrum-static-fuchsia-400-rgb: 247 181 255;`
- `--spectrum-static-fuchsia-400: rgb(var(--spectrum-static-fuchsia-400-rgb));`
- `--spectrum-static-fuchsia-600-rgb: 236 105 255;`
- `--spectrum-static-fuchsia-600: rgb(var(--spectrum-static-fuchsia-600-rgb));`
- `--spectrum-static-fuchsia-800-rgb: 200 68 220;`
- `--spectrum-static-fuchsia-800: rgb(var(--spectrum-static-fuchsia-800-rgb));`
- `--spectrum-static-fuchsia-900-rgb: 181 57 200;`
- `--spectrum-static-fuchsia-900: rgb(var(--spectrum-static-fuchsia-900-rgb));`
- `--spectrum-static-fuchsia-1000-rgb: 156 40 175;`
- `--spectrum-static-fuchsia-1000: rgb(var(--spectrum-static-fuchsia-1000-rgb));`
- `--spectrum-static-indigo-400-rgb: 192 201 255;`
- `--spectrum-static-indigo-400: rgb(var(--spectrum-static-indigo-400-rgb));`
- `--spectrum-static-indigo-600-rgb: 145 151 254;`
- `--spectrum-static-indigo-600: rgb(var(--spectrum-static-indigo-600-rgb));`
- `--spectrum-static-indigo-800-rgb: 122 106 253;`
- `--spectrum-static-indigo-800: rgb(var(--spectrum-static-indigo-800-rgb));`
- `--spectrum-static-indigo-900-rgb: 113 85 250;`
- `--spectrum-static-indigo-900: rgb(var(--spectrum-static-indigo-900-rgb));`
- `--spectrum-static-indigo-1000-rgb: 99 56 238;`
- `--spectrum-static-indigo-1000: rgb(var(--spectrum-static-indigo-1000-rgb));`
- `--spectrum-static-magenta-400-rgb: 255 185 208;`
- `--spectrum-static-magenta-400: rgb(var(--spectrum-static-magenta-400-rgb));`
- `--spectrum-static-magenta-600-rgb: 255 112 159;`
- `--spectrum-static-magenta-600: rgb(var(--spectrum-static-magenta-600-rgb));`
- `--spectrum-static-magenta-800-rgb: 240 45 110;`
- `--spectrum-static-magenta-800: rgb(var(--spectrum-static-magenta-800-rgb));`
- `--spectrum-static-magenta-900-rgb: 217 35 97;`
- `--spectrum-static-magenta-900: rgb(var(--spectrum-static-magenta-900-rgb));`
- `--spectrum-static-magenta-1000-rgb: 186 22 80;`
- `--spectrum-static-magenta-1000: rgb(var(--spectrum-static-magenta-1000-rgb));`
- `--spectrum-static-red-400-rgb: 255 188 180;`
- `--spectrum-static-red-400: rgb(var(--spectrum-static-red-400-rgb));`
- `--spectrum-static-red-600-rgb: 255 118 101;`
- `--spectrum-static-red-600: rgb(var(--spectrum-static-red-600-rgb));`
- `--spectrum-static-red-800-rgb: 240 56 35;`
- `--spectrum-static-red-800: rgb(var(--spectrum-static-red-800-rgb));`
- `--spectrum-static-red-900-rgb: 215 50 32;`
- `--spectrum-static-red-900: rgb(var(--spectrum-static-red-900-rgb));`
- `--spectrum-static-red-1000-rgb: 183 40 24;`
- `--spectrum-static-red-1000: rgb(var(--spectrum-static-red-1000-rgb));`
- `--spectrum-static-cyan-400-rgb: 138 213 255;`
- `--spectrum-static-cyan-400: rgb(var(--spectrum-static-cyan-400-rgb));`
- `--spectrum-static-cyan-600-rgb: 48 167 254;`
- `--spectrum-static-cyan-600: rgb(var(--spectrum-static-cyan-600-rgb));`
- `--spectrum-static-cyan-800-rgb: 18 134 205;`
- `--spectrum-static-cyan-800: rgb(var(--spectrum-static-cyan-800-rgb));`
- `--spectrum-static-chartreuse-400-rgb: 182 219 0;`
- `--spectrum-static-chartreuse-400: rgb(var(--spectrum-static-chartreuse-400-rgb));`
- `--spectrum-static-chartreuse-600-rgb: 143 172 0;`
- `--spectrum-static-chartreuse-600: rgb(var(--spectrum-static-chartreuse-600-rgb));`
- `--spectrum-static-chartreuse-800-rgb: 114 137 0;`
- `--spectrum-static-chartreuse-800: rgb(var(--spectrum-static-chartreuse-800-rgb));`
- `--spectrum-static-green-400-rgb: 107 227 162;`
- `--spectrum-static-green-400: rgb(var(--spectrum-static-green-400-rgb));`
- `--spectrum-static-green-600-rgb: 18 184 103;`
- `--spectrum-static-green-600: rgb(var(--spectrum-static-green-600-rgb));`
- `--spectrum-static-green-800-rgb: 7 147 85;`
- `--spectrum-static-green-800: rgb(var(--spectrum-static-green-800-rgb));`
- `--spectrum-static-orange-400-rgb: 255 193 94;`
- `--spectrum-static-orange-400: rgb(var(--spectrum-static-orange-400-rgb));`
- `--spectrum-static-orange-600-rgb: 252 125 0;`
- `--spectrum-static-orange-600: rgb(var(--spectrum-static-orange-600-rgb));`
- `--spectrum-static-orange-800-rgb: 212 91 0;`
- `--spectrum-static-orange-800: rgb(var(--spectrum-static-orange-800-rgb));`
- `--spectrum-static-purple-400-rgb: 221 193 246;`
- `--spectrum-static-purple-400: rgb(var(--spectrum-static-purple-400-rgb));`
- `--spectrum-static-purple-600-rgb: 191 138 238;`
- `--spectrum-static-purple-600: rgb(var(--spectrum-static-purple-600-rgb));`
- `--spectrum-static-purple-800-rgb: 166 92 231;`
- `--spectrum-static-purple-800: rgb(var(--spectrum-static-purple-800-rgb));`
- `--spectrum-static-turquoise-400-rgb: 111 221 228;`
- `--spectrum-static-turquoise-400: rgb(var(--spectrum-static-turquoise-400-rgb));`
- `--spectrum-static-turquoise-600-rgb: 15 177 192;`
- `--spectrum-static-turquoise-600: rgb(var(--spectrum-static-turquoise-600-rgb));`
- `--spectrum-static-turquoise-800-rgb: 10 141 153;`
- `--spectrum-static-turquoise-800: rgb(var(--spectrum-static-turquoise-800-rgb));`

## Patch Changes

**sp-avatar**: **Added**: `is-decorative` attribute to `<sp-avatar>` to allow developers to explicitly mark avatars as decorative. When set, the avatar is hidden from screen readers with `alt=""` and `aria-hidden="true"`.

**Fixed**: Fixed accessibility violation where `<sp-avatar>` rendered an underlying `img` without any `alt` attribute when no `label` was provided. The component now defaults to `alt=""` when neither `label` nor `is-decorative` is provided, and logs a dev mode warning to help developers catch missing accessibility attributes.

**sp-field-label**: Fix missing CSS custom property overrides for field-label and help-text components

Previously, these components had empty override files despite having corresponding `--system-*` tokens defined in the system theme bridge. This caused the components to not properly apply size-specific spacing tokens for top and bottom text positioning. The fix adds the missing CSS custom property mappings to ensure proper theming across all component sizes (s, m, l, xl).

**sp-help-text**: Fix missing CSS custom property overrides for field-label and help-text components

Previously, these components had empty override files despite having corresponding `--system-*` tokens defined in the system theme bridge. This caused the components to not properly apply size-specific spacing tokens for top and bottom text positioning. The fix adds the missing CSS custom property mappings to ensure proper theming across all component sizes (s, m, l, xl).

**sp-picker**: **Fixed**: click events are now dispatched from menu-items on touch devices

- All touch devices (including iPads with screen widths >743px) now correctly use click events instead of drag-and-select behavior

**sp-menu**: **Fixed**: Improved touch interaction handling for submenus to prevent unintended submenu closures.

**sp-overlay**: Fixes overlay trigger directive behavior when used with Lit's `cache()` directive. When the trigger element is disconnected and reconnected (as happens with `cache()`), the directive now properly cleans up and recreates the overlay state. On disconnect, the overlay is closed, removed from the DOM, and its reference is cleared from the strategy. This ensures that when the trigger reconnects, a fresh overlay will be created on the next open, preventing stale state and console errors.

**sp-picker**: **Fixed**: Arrow key events now stop propagation when handled by the picker, preventing them from bubbling up to parent elements.

Previously, arrow key events (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) would propagate to ancestor containers even when the picker was actively handling them. This could cause unintended side effects in layouts or applications that also listen for arrow key events.

**sp-action-menu**: Added missing dependencies to the package.json files of several components to align with their usage in source code.

**sp-breadcrumbs**: Added missing dependencies to the package.json files of several components to align with their usage in source code.

**sp-action-bar**: Added missing dependencies to the package.json files of several components to align with their usage in source code.

**sp-coachmark**: Added missing dependencies to the package.json files of several components to align with their usage in source code.

**sp-core**: Added missing dependencies to the package.json files of several components to align with their usage in source code.

**sp-overlay**: **Fixed** issue where picker menus inside overlays could not scroll to the bottom after selecting an item and reopening. The problem was caused by the overlay's placement calculation happening before the menu fully rendered, resulting in incorrect height measurements.

This fix ensures picker menus maintain proper scrollable height when reopened, regardless of the selected item's position.

**sp-picker**: **Fixed** issue where picker menus inside overlays could not scroll to the bottom after selecting an item and reopening. The problem was caused by the overlay's placement calculation happening before the menu fully rendered, resulting in incorrect height measurements.

This fix ensures picker menus maintain proper scrollable height when reopened, regardless of the selected item's position.

**sp-picker**: **Fixed**: Safari + VoiceOver crash when opening Picker and ActionMenu. The issue was caused by an imperative `render()` call that mutated the DOM during the render cycle, causing Safari to crash while VoiceOver scanned the accessibility tree.

**sp-action-menu**: **Fixed**: Safari + VoiceOver crash when opening Picker and ActionMenu. The issue was caused by an imperative `render()` call that mutated the DOM during the render cycle, causing Safari to crash while VoiceOver scanned the accessibility tree.

**sp-overlay**: hover overlays should close with the Esc key when trigger is not focused

**sp-core**: hover overlays should close with the Esc key when trigger is not focused

**sp-shared**: Improve reliability when composing components and mixins that observe slot presence.

**sp-menu**: **Fixed**: `sp-menu` now stops propagation of arrow key events when navigating between menu items. This prevents unintended side effects in layouts or applications that also listen for arrow key events.

**sp-overlay**: **Fixed**: Modal overlays now properly close when clicking the backdrop, while page overlays correctly remain blocking.

The `modal-backdrop` click handler now correctly distinguishes between overlay types:

- Modal overlays close on backdrop click (light dismiss behavior)
- Page overlays remain blocking and do not close on backdrop click

**sp-tooltip**: **Fixed**: Fixed an issue with text overflow in `sp-tooltip`: long, unbroken words were not wrapping and overflowed the container.

**sp-slider**: **Fixed**: Arrow key events now stop propagation when handled by the slider, preventing them from bubbling up to parent elements.

Previously, arrow key events (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) would propagate to ancestor containers even when the slider was actively handling value adjustments. This could cause unintended side effects in layouts or applications that also listen for arrow key events.

**sp-overlay**: **Fixed**: Third-level submenus now open correctly on Safari.
Simplified the WebKit layout timing fix in `computePlacement()` to ensure consistent overlay positioning for deeply nested menus.

**sp-core**: - **Fixed**: Added `typesVersions` to `@spectrum-web-components/core` to improve TypeScript module resolution for users with `moduleResolution: "node"`. This provides a fallback mechanism when the `exports` field resolution encounters issues, ensuring type declarations are properly resolved across different TypeScript configurations.

**sp-base**: - **Fixed**: Added `typesVersions` to `@spectrum-web-components/core` to improve TypeScript module resolution for users with `moduleResolution: "node"`. This provides a fallback mechanism when the `exports` field resolution encounters issues, ensuring type declarations are properly resolved across different TypeScript configurations.

**sp-contextual-help**: ## Changeset

**Fix: Contextual Help popover inaccessible to screen readers**

Adds required ARIA attributes to associate the trigger button with popover content, enabling screen readers to announce the heading and body text when the popover opens.

# [1.10.0](https://github.com/adobe/spectrum-web-components/compare/v1.9.1...v1.10.0) (2025-11-05)

## Minor Changes

**sp-base**: No customer-facing changes.

Introduced architectural changes to support side-by-side development of 1st-gen and 2nd-gen components.

# [1.9.1](https://github.com/adobe/spectrum-web-components/compare/v1.9.0...v1.9.1) (2025-11-05)

## Patch Changes

**sp-status-light**: **Fixed**: Added missing `accent` and `cyan` variant to status light.

**sp-overlay**: - **Fixed**: Expanded `<overlay-trigger>` `type` property to accept all overlay types ('auto', 'hint', 'manual', 'modal', 'page') instead of the incorrect, previous restricted subset.

# [1.9.0](https://github.com/adobe/spectrum-web-components/compare/v1.8.0...v1.9.0) (2025-10-13)

## Minor Changes

**sp-icons-workflow**: - Upgraded to `@adobe/spectrum-css-workflow-icons@5.0.0`. - Includes changes from previous a4u upstream releases: - Added `S2_Icon_HeartFilled_20_N.svg`, updated `S2_Icon_SpeedFast_20_N.svg`. - Replaced all 22×20px Cloud State icons with 20px variants. - Removed deprecated multi-colored error icon. Added new Cloud State icons (`Disconnected`, `Error`, `InProgress`, `Online`, `Paused`, `Pending`, `SlowConnection`). - Updated several other icons (`CloseCaptions`, `CommentHide`, `Community`, etc.).

- For the full changelog, see: https://github.com/adobe/spectrum-css-workflow-icons/pull/50

## Patch Changes

**sp-button**: - **Fixed**: Aria-label handling in `<sp-button>` component.

- **Fixed**: Moved aria-label updates to occur after slot content changes are processed to prevent timing issues
- **Added**: Enhanced `label` property support for programmatic aria-label control
- **Added**: Comprehensive tests for aria-label behavior during content and pending state changes
- **Fixed**: Removed duplicate aria-label update logic in `update()` method

These changes ensure that aria-labels are properly managed and preserved across component state changes, improving accessibility for screen reader users.

**sp-combobox**: - **Fixed**: Pending state handling and accessibility in `<sp-combobox>` component.

- **Changed**: Removed dependency on `PendingStateController` and implemented inline pending state handling
- **Fixed**: Updated aria-labelledby attribute ordering to improve screen reader experience (`label applied-label pending-label`)
- **Fixed**: Updated progress circle implementation to use `role="presentation"` instead of `aria-valuetext`
- **Added**: Direct pending state visual rendering with improved accessibility

These changes improve accessibility for pending states while reducing unnecessary component dependencies.

**sp-menu**: - **Fixed**: MenuItem focus stealing from input elements on mouseover by enhancing MenuItem's `handleMouseover` method to detect when an input element currently has focus and prevent stealing focus in those cases.

**sp-alert-dialog**: - **Fixed**: Make the divider color transparent only for Spectrum 2 theme

**sp-picker**: - **Fixed**: Picker border color should be hidden in S2 theme

**sp-textfield**: - **Fixed**: Update border radius and border width for different t-shirt sizes for textfield component for S2 and Express themes

**sp-textfield**: - **Fixed**: Update border color and block padding inside the textfield and textarea components for S2 and Express themes

**sp-picker**: - **Fixed**: Pending state handling and accessibility in `<sp-picker>` component.

- **Changed**: Removed dependency on `PendingStateController` and implemented inline pending state handling
- **Fixed**: Updated aria-labelledby attribute ordering to improve screen reader experience (`icon label applied-label pending-label`)
- **Fixed**: Updated progress circle implementation to use `role="presentation"` instead of `aria-valuetext`
- **Added**: Direct pending state visual rendering with improved accessibility

These changes improve accessibility for pending states while reducing unnecessary component dependencies.

**sp-progress-circle**: - **Fixed**: Accessibility warning logic in `<sp-progress-circle>` component.

- **Fixed**: Updated accessibility warning logic to only apply when `role="progressbar"` is explicitly set
- **Fixed**: Improved label validation for better accessibility compliance

These changes ensure accessibility warnings are only shown when appropriate and improve overall accessibility compliance.

**sp-reactive-controllers**: - **Fixed**: Accessibility and caching in `PendingStateController`.

- **Fixed**: Updated progress circle to use `role="presentation"` for better accessibility compliance
- **Fixed**: Improved aria-label caching logic to better handle dynamic label changes
- **Added**: Documentation noting the controller is primarily used by `<sp-button>` component
- **Fixed**: Enhanced caching mechanism to preserve user-set aria-labels during pending states

These changes improve accessibility compliance and aria-label management for components using the pending state controller.

**sp-help-text**: - **Fixed**: Update block paddings for S2 and Express themes

**sp-field-label**: - **Fixed**: Update block paddings for S2 and Express themes

# [1.8.0](https://github.com/adobe/spectrum-web-components/compare/v1.7.0...v1.8.0) (2025-09-23)

## Minor Changes

**sp-picker**: **Fixed** escape key behavior in modal overlays containing picker components. Previously, pressing the Escape key when a picker was open inside a modal overlay would not properly close the modal, instead moving focus to the picker. Now, the escape key correctly closes the picker first (if open), then closes the modal overlay on subsequent escape key presses.

This fix adds a check for `this.open` in the picker's `handleEscape` method to ensure proper modal overlay closure behavior.

**sp-overlay**: Added `allow-outside-click` property to `<sp-overlay>` with deprecation notice. This property allows clicks outside the overlay to close it, but is not recommended for accessibility reasons and will be removed in a future version.

This property is being added as deprecated to support the fallback for `showModal()` which was removed as part of performance optimization. We will no longer support outside clicks for modal overlays as they violate accessibility guidelines.

The property defaults to `false` and shows deprecation warnings when used. Consider using explicit close buttons or modal/page overlay types instead for better accessibility.

**sp-menu**: **Fixed** : Fix iPad scrolling issue in picker dropdown where scrolling through menu items would accidentally select the first touched item and close the picker.

The fix implements touch gesture detection to distinguish between scrolling and selection. Added `isScrolling` getter for public API access. Test on iPad devices with long menus to validate scrolling behavior and selection accuracy.

**sp-overlay**: **Fixed** : Added body scroll prevention for modal and page overlays. Overlay automatically blocks body scroll when modal or page overlays are open and restores the original scroll state when they are closed, improving user experience and accessibility for modal dialogs.

**sp-clear-button**: Clear button styles have been updated to the latest Spectrum CSS version of the clear button. This update includes a major reduction in the number of custom property abstractions needed to support the multiple theming layers (as seen in the `styles` package).

This update spans the following additional packages:

- @spectrum-web-components/button
- @spectrum-web-components/styles

As the updated styles now offer additional styling options, we have added the following API to the clear button component that exists in the `button` package:

- `quiet` - when set to true, the button will be rendered as a quiet button. This is useful for cases where you want to use the clear button in a more subtle way.
- `disabled` - when set to true, the button will be rendered as a disabled button.
- `static-color` - currently this only supports the `white` context color. This is useful for cases where the button appears on a dark background texture. This is a replacement for the previously used `variant="overBackground"` attribute which is deprecated.

### Deprecation

The `variant="overBackground"` attribute is deprecated; please use the new `static-color="white"` attribute instead. When this property is used in the component, a deprecation warning will be shown in the console when in debug mode. The `variant` attribute will be removed in a future release.

**sp-card**: **Fixed** the card component's CSS by moving `block-size: 100%` from the base `:host` selector to only apply to `gallery` and `quiet` variants

**sp-overlay**: **Fixed** : external click registration behavior in the `sp-overlay` component. Programmatic clicks on elements outside of modal overlays now properly register and close the overlay, while user-initiated clicks are prevented from doing so.

**sp-card**: Enhanced the Card component's checkbox functionality with improved screen reader support and keyboard navigation.

## Patch Changes

**sp-progress-bar**: **Added**: Deprecation warning for the over-background attribute.

**sp-combobox**: Replace the use of offsetWidth with a resizeObserver to avoid unecessary, performance-impacting layout reflows.

**sp-styles**: Bring the CJK font alias token fix from CSS [#3883](https://github.com/adobe/spectrum-css/pull/3883) [`4e3a120`](https://github.com/adobe/spectrum-css/commit/4e3a120339a6e7e6d0d19e3f2f7f608ab96621ed).

The `--spectrum-cjk-font` token was incorrectly mapped to the code font-family stack instead of `--spectrum-cjk-font-family-stack`. Thanks [@byteakp](https://github.com/byteakp)!

**sp-color-wheel**: Fixed `<sp-color-wheel>` step attribute functionality for keyboard navigation. The step attribute now properly controls the increment size when using arrow keys to navigate the color wheel.

**sp-switch**: ### Fix down state colors for switch

Because the `postcss-hover-media-feature` plugin converts hover styles into a media query for devices that support hover, the hover styles were overriding any active/down state styles. We needed to target the active/down states of the switch with additional active state selectors, in order to ensure that the active state takes precedence over the hover state, maintaining the correct visual behavior of the switch component across different interaction states.

This fix should address hover + active state discrepancies in S1 and S2 foundations.

**sp-contextual-help**: Fixed a typo in the default `info` variant label from "Informations" to "Information".

Additionally, added package dependency for `@spectrum-web-components/reactive-controllers@1.7.0`.

**sp-slider**: Editable sliders will now reliably emit `input` events when interaction starts with the track.

**sp-link**: **Fixed** quiet variant links not showing keyboard focus state in Safari. Links with the `quiet` attribute now properly display focus indicators when navigating with keyboard, improving accessibility for keyboard users.

**sp-progress-bar**: Smooths the transition animation of indeterminate progress bar by overriding the incoming CSS, and positioning the animating fill element completely off of the progress bar track in both LTR and RTL languages. Before, the fill element was automatically starting on the track which led to a jarring animation loop.

**sp-divider**: **Added**: `staticColor` property to the Divider component, enabling programmatic control of the existing static color functionality.

# [1.7.0](https://github.com/adobe/spectrum-web-components/compare/v1.6.0...v1.7.0) (2025-06-11)

## Minor Changes

**sp-overlay**: **Fixed** : Overlays (like pickers and action menus) were incorrectly closing when scrolling occurred within components. The fix ensures the `handleScroll` method in `OverlayStack` only responds to document/body scrolling events and ignores component-level scrolling events, which was the original intention.

**sp-card**: **Fixed**: On mobile Chrome (both Android and iOS), scrolling on `sp-card` components would inadvertently trigger click events. This was caused by the timing-based click detection (200ms threshold) in the pointer event handling, which could misinterpret quick scrolls as clicks. This issue did not affect Safari on mobile devices.

**sp-action-button**: - **Fixed** : Action buttons with href attributes now properly detects modifier keys and skips the proxy click, allowing only native browser behavior to proceed.

## Patch Changes

**sp-styles**: Remove unnecessary system theme references to reduce complexity for components that don't need the additional mapping layer.

**sp-card**: - **Fixed**: `sp-card` component relies on `sp-popover` for certain toggle interactive behaviors, but this dependency was missing from its dependency tree.

**sp-menu**: **Fixes**: Icons in menu stories weren't properly responding to theme changes when used in functional story components.
Switching to class-based LitElement components ensures proper component lifecycle hooks and shadow DOM context for icon initialization and theme integration.

**sp-tabs**: Added `@spectrum-web-components/action-button` as a dependency for Tabs as its used in the direction button.

**sp-split-view**: Added @spectrum-web-components/shared dependency in splitview since it uses ranDomId from the shared package

**sp-textfield**: Replace deprecated `word-break: break-word` with `overflow-wrap: break-word` to align with modern CSS standards and improve cross-browser compatibility. This property was deprecated in Chrome 44 (July 2015) in favor of the standardized `overflow-wrap` property.

# [1.6.0](https://github.com/adobe/spectrum-web-components/compare/v1.5.0...v1.6.0) (2025-05-01) — ([f2b6a32](https://github.com/adobe/spectrum-web-components/commit/f2b6a322c379752f4f7dfcd02b3007c4130dc1e0))

### Minor Fixes

- **icons-workflow**: added missing S2 icons

### Patch Fixes

- **slider**: ensure tracks become properly rounded when offset variant is activated
- **popover**: prevent overflow clipping in Safari with translateZ and visible tips
- **picker**: fix focus to prevent setting focus on menu items when opened via mouse
- **button**: update deprecation warning to allow variant and static-color to coexist
- **number-field**: fix UI issues and improve width calculation
- **tooltip**: add DelayedTooltipWithOverlay story for handling interactions
- **infield-button, number-field, textfield, search, styles**: update disabled border colors and styling across components
- **close-button, dropzone, illustrated-message, menu, status-light, styles, switch, table, tabs, toast, tooltip**: remove unnecessary system theme references
- **overlay**: fix layout issues in Safari for nested trays in dialogs

# [1.5.0](https://github.com/adobe/spectrum-web-components/compare/v1.4.0...v1.5.0) (2025-04-15)

## Minor Changes

**sp-icons-workflow**: Added missing S2 icons

## Patch Changes

**sp-popover**: 📝 #[​3566](https://github.com/adobe/spectrum-css/pull/3566) Thanks [@​aramos-adobe](https://github.com/aramos-adobe)!

Popover overflow bug on Safari

- `translateZ` has been added to the open popover to prevent clipping of the `filter: drop-shadow` when overflow is applied. `translateZ` or `translate3d` on the open state accelerates the component to the GPU layer maintaining any transformations and animations.
- `overflow: visible` applied to CSS `*--withTip` so the tip is still visible if overflow is applied to the component.

**sp-picker**: `PickerBase`(used in `<sp-picker>` and `sp-action-menu>`):

Fixes focus so that it is not set on `<sp-menu-item>` elements when opened via mouse.

A keyboard interaction is the only interaction that should set focus on an `<sp-menu-item>` when the menu is opened. A user with a mouse would expect the focus to stay where the mouse is.

Fixes: #2950

**sp-button**: Updated the deprecation warning to allow `variant` and `static-color` exist on the same component.
Added `primary` and `secondary` stories to `white` and `black` button directories on storybook.
Updates documentation site to reflect this as well.

**sp-infield-button**: # Release Note

## Infield Button

### 6.1.2

- [#3615](https://github.com/adobe/spectrum-css/pull/3615) [`f09c84a`](https://github.com/adobe/spectrum-css/commit/f09c84ae9922d67b6fe237d693afee0fab53fa67) Thanks [@Rajdeepc](https://github.com/Rajdeepc)! - ### Infield button fast follows
    - Updated infield button disabled border color to use `-spectrum-gray-300` for spectrum-two theme and `-spectrum-gray-200` for other themes.

### 6.1.1

📝 [#3536](https://github.com/adobe/spectrum-css/pull/3536) [`f77aa72`](https://github.com/adobe/spectrum-css/commit/f77aa72486f98c7b7d4f449c0d54fb6801881b7e) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)!

- S2 Foundations fixes
    - Adjusts the background-color of the infield button components within stepper to use `gray-100` as opposed to `gray-25`.
        - This corresponds to the background-color updates picker has for S2.
    - Corrects the border color for the default picker for S2 foundations, using `gray-500` (instead of `gray-800`) to align with other field/form components.
    - Refactors the `&.is-keyboardFocused&.is-placeholder` selector to `&.is-keyboardFocused.spectrum-Picker-label.is-placeholder` to avoid unexpectedly targeting the nested placeholder class.

### 6.1.0

📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

Dependency alignment across the project.

- Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
    - @spectrum-css/icon@9.1.0
    - @spectrum-css/tokens@16.0.1

## Number Field

Bump @spectrum-css/stepper to 7.1.3

### 7.1.3

- [#3621](https://github.com/adobe/spectrum-css/pull/3621) [`3aec28a`](https://github.com/adobe/spectrum-css/commit/3aec28aac60bdf32a585fa8ff38559d80b57ff86) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)!
    - Updates `-spectrum-stepper-buttons-border-color-keyboard-focus` from `gray-900` to `gray-800` to match the rest of the border color on keyboardFocus.

### 7.1.2

📝 [#3594](https://github.com/adobe/spectrum-css/pull/3594) [`6200a63`](https://github.com/adobe/spectrum-css/commit/6200a63f2c7dc1d2b0481c33b17c86427726c0bd) Thanks [@TarunAdobe](https://github.com/TarunAdobe)!

- Updates Stepper's key-focus border color (`-spectrum-stepper-border-color-keyboard-focus`) to `-spectrum-gray-800`.

### 7.1.1

📝 [#3536](https://github.com/adobe/spectrum-css/pull/3536) [`f77aa72`](https://github.com/adobe/spectrum-css/commit/f77aa72486f98c7b7d4f449c0d54fb6801881b7e) Thanks [@marissahuysentruyt](https://github.com/marissahuysentruyt)!

- S2 Foundations fixes
    - Adjusts the background-color of the infield button components within stepper to use `gray-100` as opposed to `gray-25`.
        - This corresponds to the background-color updates picker has for S2.
    - Corrects the border color for the default picker for S2 foundations, using `gray-500` (instead of `gray-800`) to align with other field/form components.
    - Refactors the `&.is-keyboardFocused&.is-placeholder` selector to `&.is-keyboardFocused.spectrum-Picker-label.is-placeholder` to avoid unexpectedly targeting the nested placeholder class.

### 7.1.0

📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

Dependency alignment across the project.

- Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`9b108f7`](https://github.com/adobe/spectrum-css/commit/9b108f7e05df1f55ab315dad96736d3ff4757f8c), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
    - @spectrum-css/actionbutton@8.0.0
    - @spectrum-css/icon@9.1.0
    - @spectrum-css/infieldbutton@7.0.0
    - @spectrum-css/textfield@9.0.0
    - @spectrum-css/tokens@16.0.1

## Textfield

### 8.1.1

📝 [#3575](https://github.com/adobe/spectrum-css/pull/3575) [`2e17d10`](https://github.com/adobe/spectrum-css/commit/2e17d109ebec3c2745c32a15840af5c636c8dc5d) Thanks [@TarunAdobe](https://github.com/TarunAdobe)!

- Updated border color on keyboard focus state for textfield in spectrum-two theme.

### 8.1.0

📝 [#3539](https://github.com/adobe/spectrum-css/pull/3539) [`9b108f7`](https://github.com/adobe/spectrum-css/commit/9b108f7e05df1f55ab315dad96736d3ff4757f8c) Thanks [@rise-erpelding](https://github.com/rise-erpelding)!

- Updates invalid icon spacing to be vertically centered for S2.

📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

- Dependency alignment across the project.

Set component peerDependencies as optional to reduce console warnings on downstream projects.

- Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
    - @spectrum-css/helptext@8.0.0
    - @spectrum-css/tokens@16.0.1

## Search

### 8.1.2

- [#3658](https://github.com/adobe/spectrum-css/pull/3658) [`e9fde67`](https://github.com/adobe/spectrum-css/commit/e9fde67bf341798a6ab34f227b2e7a417d1e5da7) Thanks [@rise-erpelding](https://github.com/rise-erpelding)! - Change S2 theme border color to gray-800 on keyfocus per design request in order to align with text field.

### 8.1.1

📝 [#3593](https://github.com/adobe/spectrum-css/pull/3593) [`d829abb`](https://github.com/adobe/spectrum-css/commit/d829abb44f1eaa1874090e52caee553d776684e7) Thanks [@TarunAdobe](https://github.com/TarunAdobe)!

Updated `--spectrum-search-background-color-disabled` to `--spectrum-gray-25` and `--spectrum-search-border-color-disabled` to `--spectrum-gray-300` for the S2 foundations contexts.

Also defines disabled quiet border and background colors (`--system-search-quiet-background-color-disabled` and `--system-search-quiet-border-color-disabled`) in order to maintain disabled quiet styling.

### 8.1.0

📝 [#3541](https://github.com/adobe/spectrum-css/pull/3541) [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d) Thanks [@castastrophe](https://github.com/castastrophe)!

Dependency alignment across the project.

- Updated dependencies [[`205182b`](https://github.com/adobe/spectrum-css/commit/205182bebcbe82813457aa098d8799b0a23423ee), [`9b108f7`](https://github.com/adobe/spectrum-css/commit/9b108f7e05df1f55ab315dad96736d3ff4757f8c), [`1a3245c`](https://github.com/adobe/spectrum-css/commit/1a3245c3a660bc52ed260f18b6cceab5ee81541d)]:
    - @spectrum-css/clearbutton@8.0.0
    - @spectrum-css/icon@9.1.0
    - @spectrum-css/textfield@9.0.0
    - @spectrum-css/tokens@16.0.1

**sp-close-button**: Remove unnecessary system theme references to reduce complexity for components that don't need the additional mapping layer.

# [1.4.0](https://github.com/adobe/spectrum-web-components/compare/v1.3.0...v1.4.0) (2025-03-26)

### Bug Fixes

- **split-view,styles**: use latest CSS ([`fccb0a5c72`](https://github.com/adobe/spectrum-web-components/commit/fccb0a5c72))
- **menu**: menuitem focus and hover styles (#5270) ([`a69accb8b4`](https://github.com/adobe/spectrum-web-components/commit/a69accb8b4))
- **alert-banner,styles**: style updates from latest release ([`7d091c2702`](https://github.com/adobe/spectrum-web-components/commit/7d091c2702))
- **menu**: capture touchend on mobile (#5313) ([`4c2f908a92`](https://github.com/adobe/spectrum-web-components/commit/4c2f908a92))
- **sidenav,styles**: remove unneeded system layer ([`fd41b13f8e`](https://github.com/adobe/spectrum-web-components/commit/fd41b13f8e))
- **help-text,styles**: remove unneeded system layer ([`be0ae4c899`](https://github.com/adobe/spectrum-web-components/commit/be0ae4c899))
- **tags,styles**: remove unneeded system layer ([`03340e94ed`](https://github.com/adobe/spectrum-web-components/commit/03340e94ed))
- **color-wheel,styles**: use latest CSS ([`fb62c6a93a`](https://github.com/adobe/spectrum-web-components/commit/fb62c6a93a))
- **color-slider,styles**: remove unneeded system layer ([`d48ba7aa4c`](https://github.com/adobe/spectrum-web-components/commit/d48ba7aa4c))
- **overlay**: prevent overlay close on document scroll (#5308) ([`8f8735c9ec`](https://github.com/adobe/spectrum-web-components/commit/8f8735c9ec))
- **buttongroup,styles**: use latest CSS ([`a05dceaffd`](https://github.com/adobe/spectrum-web-components/commit/a05dceaffd))
- **card,styles**: use latest CSS ([`9eed256391`](https://github.com/adobe/spectrum-web-components/commit/9eed256391))
- **tray,styles**: use latest CSS ([`f9f3e6e60e`](https://github.com/adobe/spectrum-web-components/commit/f9f3e6e60e))
- **action-bar,styles**: bump to latest release for action-bar ([`b6cd115cda`](https://github.com/adobe/spectrum-web-components/commit/b6cd115cda))
- **color-loupe,styles**: use latest CSS ([`4a796cffc1`](https://github.com/adobe/spectrum-web-components/commit/4a796cffc1))
- **color-handle,styles**: use latest CSS ([`600d80700f`](https://github.com/adobe/spectrum-web-components/commit/600d80700f))
- **breadcrumb,styles**: use latest CSS ([`daeb11f187`](https://github.com/adobe/spectrum-web-components/commit/daeb11f187))
- **badge,styles**: bump to latest release ([`95c511ef62`](https://github.com/adobe/spectrum-web-components/commit/95c511ef62))
- **avatar,styles**: bump to latest release ([`3899709eb8`](https://github.com/adobe/spectrum-web-components/commit/3899709eb8))
- **asset,styles**: bump to latest release ([`f9861fddff`](https://github.com/adobe/spectrum-web-components/commit/f9861fddff))
- **alert-dialog,styles**: bump to latest release ([`0c088ae3a2`](https://github.com/adobe/spectrum-web-components/commit/0c088ae3a2))
- **number-field**: prevent keyboard on mobile devices by setting inpu… (#5284) ([`5a3bc6d24e`](https://github.com/adobe/spectrum-web-components/commit/5a3bc6d24e))
- **tachometer**: update file path pattern for tachometer (#5287) ([`50d20bb8e5`](https://github.com/adobe/spectrum-web-components/commit/50d20bb8e5))
- **modal,styles**: remove unneeded system layer ([`5bc73542fa`](https://github.com/adobe/spectrum-web-components/commit/5bc73542fa))
- **pre-commit**: update linting commands for to be compatible with POSIX (#5286) ([`24e7e47ab4`](https://github.com/adobe/spectrum-web-components/commit/24e7e47ab4))
- **accordion,styles**: remove unneeded system layer ([`165a904bd0`](https://github.com/adobe/spectrum-web-components/commit/165a904bd0))
- **field-label,styles**: remove unneeded system layer ([`8931718347`](https://github.com/adobe/spectrum-web-components/commit/8931718347))
- **link,styles**: remove unneeded system layer ([`186774daa2`](https://github.com/adobe/spectrum-web-components/commit/186774daa2))
- **help-text,styles**: remove unneeded system layer ([`ff56ea2fa5`](https://github.com/adobe/spectrum-web-components/commit/ff56ea2fa5))
- **opacity-checkerboard**: bring in styles from latest tag ([`f26b2ccf3b`](https://github.com/adobe/spectrum-web-components/commit/f26b2ccf3b))
- **illustrated-message,styles**: remove unneeded system layer ([`f8b4560852`](https://github.com/adobe/spectrum-web-components/commit/f8b4560852))
- **picker**: disable drag and select for mobile picker (#5187) ([`2a0422ec1b`](https://github.com/adobe/spectrum-web-components/commit/2a0422ec1b))
- **overlay**: stays open when interacting with elements inside (#5248) ([`70f5f6f3a9`](https://github.com/adobe/spectrum-web-components/commit/70f5f6f3a9))
- **color-field**: respects alpha value in hex form (#5246) ([`e247de9a2e`](https://github.com/adobe/spectrum-web-components/commit/e247de9a2e))
- **picker**: move tooltip outside of action menu's button (#5077) ([`549ff4ac36`](https://github.com/adobe/spectrum-web-components/commit/549ff4ac36))
- **overlay**: remove pointer events from disabled overlay trigger (#5205) ([`cf8db5e94b`](https://github.com/adobe/spectrum-web-components/commit/cf8db5e94b))
- **menu**: focuson mouseover (#5197) ([`6618422848`](https://github.com/adobe/spectrum-web-components/commit/6618422848))

### Features

- **sp-contextual-help**: stays open when interacting with elements inside.([#5248](https://github.com/adobe/spectrum-web-components/issues/5248)) ([3cca7ea](https://github.com/adobe/spectrum-web-components/commit/3cca7eacf127c3fd759953db38a2b5a561bfb8dc))

# [1.3.0](https://github.com/adobe/spectrum-web-components/compare/v1.2.0...v1.3.0) (2025-03-13)

### Bug Fixes

- **overlay** sp-overlay with type="manual" should close on pressing ESC key. ([#5160](https://github.com/adobe/spectrum-web-components/issues/5160)) ([be28fdd](https://github.com/adobe/spectrum-web-components/commit/be28fdd6cede4f4784afe6d617077007071d48a4))
- **sp-slider**: Now correctly centers alignment for a slider with no visible label ([#5144](https://github.com/adobe/spectrum-web-components/issues/5144)) ([946899d](https://github.com/adobe/spectrum-web-components/commit/946899d1203ca0670d080c50264f8b4ec03c9e4f))
- **sp-dialog, sp-dialog-wrapper**: The error property deprecation has been removed to prevent confusion and false urgency in migration.([#5156](https://github.com/adobe/spectrum-web-components/issues/5156)) ([596f864](https://github.com/adobe/spectrum-web-components/commit/596f864f7733f1d17d1f166245dadda2ba46a79c))
- **sp-picker**: Added Spectrum 2 corrected border-radius and background-color.([#5153](https://github.com/adobe/spectrum-web-components/issues/5153)) ([d780fd1](https://github.com/adobe/spectrum-web-components/commit/d780fd1ecd2951f1af9438f77ec4ab5efa04e757))

# [1.2.0](https://github.com/adobe/spectrum-web-components/compare/v1.1.2...v1.2.0) (2025-02-27)

### Bug Fixes

- **action menu:** keyboard accessibility omnibus ([#5031](https://github.com/adobe/spectrum-web-components/issues/5031)) ([ea38ef0](https://github.com/adobe/spectrum-web-components/commit/ea38ef0db33b251a054d50abf5cffc04e32f579f)), closes [#4623](https://github.com/adobe/spectrum-web-components/issues/4623)
- **breadcrumbs:** show maxvisibleitems on dynamic updates ([#5100](https://github.com/adobe/spectrum-web-components/issues/5100)) ([199f989](https://github.com/adobe/spectrum-web-components/commit/199f989b04fd77e2ebf72c95da6c5cd5a199f680))
- **menu:** make submenu scrollable ([#5082](https://github.com/adobe/spectrum-web-components/issues/5082)) ([a13dac2](https://github.com/adobe/spectrum-web-components/commit/a13dac26e51fa953e36232ce2b10dc0f121ef6a8))
- **picker:** update picker when menu item icons change ([#5088](https://github.com/adobe/spectrum-web-components/issues/5088)) ([63ef1ad](https://github.com/adobe/spectrum-web-components/commit/63ef1adad473ce58647ffe4d5e2a8727caaee07b))
- **slider:** make label not disappear when using overlays in Safari ([#5118](https://github.com/adobe/spectrum-web-components/issues/5118)) ([191a15b](https://github.com/adobe/spectrum-web-components/commit/191a15bd951780b555ae1022297bdf42ceff9181))

### Features

- **combobox:** allow support for disabled items ([#5104](https://github.com/adobe/spectrum-web-components/issues/5104)) ([b78d412](https://github.com/adobe/spectrum-web-components/commit/b78d4125a90266059746207ffafc0c4c22f2b0a4))
- **overlay:** add triggeredBy property to overlay-trigger for performance optimization ([#5046](https://github.com/adobe/spectrum-web-components/issues/5046)) ([fd504aa](https://github.com/adobe/spectrum-web-components/commit/fd504aa4c83d6961abfb7db955483bf1ede6734f))
- **reactive-controllers:** Migrate to Colorjs from Tinycolor ([#4713](https://github.com/adobe/spectrum-web-components/issues/4713)) ([9d740f0](https://github.com/adobe/spectrum-web-components/commit/9d740f0c830aa44273097181e761e9a92d3df4be))

## [1.1.2](https://github.com/adobe/spectrum-web-components/compare/v1.1.1...v1.1.2) (2025-02-12)

### Bug Fixes

- **overlay:** derive popover placement from host in interaction controller ([#5078](https://github.com/adobe/spectrum-web-components/issues/5078)) ([635cf53](https://github.com/adobe/spectrum-web-components/commit/635cf53df237b7f833633cb05d09c0697e61f6f4))
- **picker:** stop the click events from reaching the elements below picker-tray ([#5060](https://github.com/adobe/spectrum-web-components/issues/5060)) ([7e4fdbf](https://github.com/adobe/spectrum-web-components/commit/7e4fdbf3e4487b4c148368b852129b85f88a620b))
- **tooltip:** make tooltip delivery consistent across all browsers ([#5056](https://github.com/adobe/spectrum-web-components/issues/5056)) ([d01d5cd](https://github.com/adobe/spectrum-web-components/commit/d01d5cd7aad818b4d2bdd718f59715f65d6a25d0))

## [1.1.1](https://github.com/adobe/spectrum-web-components/compare/v1.1.0...v1.1.1) (2025-01-29)

### Bug Fixes

- **overlay:** make :focus-visible consistent when using overlay type modal ([#4912](https://github.com/adobe/spectrum-web-components/issues/4912)) ([7a5f786](https://github.com/adobe/spectrum-web-components/commit/7a5f786819ff200f5ae2648e2e2c4db3729050a2)), closes [#5021](https://github.com/adobe/spectrum-web-components/issues/5021)

### Features

- **opacity-checkerboard:** bump CSS version ([#5040](https://github.com/adobe/spectrum-web-components/issues/5040)) ([e3bf6d3](https://github.com/adobe/spectrum-web-components/commit/e3bf6d3c20c8dab6674ad8b1793082372901d155))
- **picker:** add forcePopover property ([#5041](https://github.com/adobe/spectrum-web-components/issues/5041)) ([3651e57](https://github.com/adobe/spectrum-web-components/commit/3651e57a90a05e551e6ee650e8ccc73aa05d3e7c))
- **sp-button-group:** sp-button-group react to size updates ([#5037](https://github.com/adobe/spectrum-web-components/issues/5037)) ([63bc618](https://github.com/adobe/spectrum-web-components/commit/63bc618c18e9d8e39155cc7544814564673893a7))
- **thumbnail:** bump thumbnail to use foundations release ([7490324](https://github.com/adobe/spectrum-web-components/commit/74903245d8dd8e3d39653a7f5296fa91e4562877))

# [1.1.0](https://github.com/adobe/spectrum-web-components/compare/v1.0.3...v1.1.0) (2025-01-29)

### Bug Fixes

- lock prerelease versions for Spectrum CSS ([#5014](https://github.com/adobe/spectrum-web-components/issues/5014)) ([8aa7734](https://github.com/adobe/spectrum-web-components/commit/8aa77342f169b75ecbd1c07a2a1050860b182822))
- **overlay:** make :focus-visible consistent when using overlay type modal ([#4912](https://github.com/adobe/spectrum-web-components/issues/4912)) ([7a5f786](https://github.com/adobe/spectrum-web-components/commit/7a5f786819ff200f5ae2648e2e2c4db3729050a2)), closes [#5021](https://github.com/adobe/spectrum-web-components/issues/5021)

### Features

- add an optional chromatic vrt action ([7d2f840](https://github.com/adobe/spectrum-web-components/commit/7d2f8401cb05c5e23872424f132a1a8edd95b666))
- **opacity-checkerboard:** bump CSS version ([#5040](https://github.com/adobe/spectrum-web-components/issues/5040)) ([e3bf6d3](https://github.com/adobe/spectrum-web-components/commit/e3bf6d3c20c8dab6674ad8b1793082372901d155))
- **picker:** add forcePopover property ([#5041](https://github.com/adobe/spectrum-web-components/issues/5041)) ([3651e57](https://github.com/adobe/spectrum-web-components/commit/3651e57a90a05e551e6ee650e8ccc73aa05d3e7c))
- **sp-button-group:** sp-button-group react to size updates ([#5037](https://github.com/adobe/spectrum-web-components/issues/5037)) ([63bc618](https://github.com/adobe/spectrum-web-components/commit/63bc618c18e9d8e39155cc7544814564673893a7))
- **thumbnail:** bump thumbnail to use foundations release ([7490324](https://github.com/adobe/spectrum-web-components/commit/74903245d8dd8e3d39653a7f5296fa91e4562877))
- use globals to enable VRT modes in chromatic ([5b674b4](https://github.com/adobe/spectrum-web-components/commit/5b674b46841155762a6e5f9ebd566a0110279384))

## [1.0.3](https://github.com/adobe/spectrum-web-components/compare/v1.0.1...v1.0.3) (2024-12-09)

### Bug Fixes

- **action-button:** action-button with href can be perceived by screen reader ([#4927](https://github.com/adobe/spectrum-web-components/issues/4927)) ([2a0b3a5](https://github.com/adobe/spectrum-web-components/commit/2a0b3a5b300d51c002db60c6d899694d74834d39))
- **dialog:** fade-out animation when lazy loaded on popover overlays ([#4937](https://github.com/adobe/spectrum-web-components/issues/4937)) ([d36fc6e](https://github.com/adobe/spectrum-web-components/commit/d36fc6ee30bd6a028351eebc0486c0ec5e6bd082))
- **number-field:** added aria-hidden attribute for inc/dec buttons ([#4933](https://github.com/adobe/spectrum-web-components/issues/4933)) ([b16a839](https://github.com/adobe/spectrum-web-components/commit/b16a839b33cc7d02b42e012afaa6327972eb0c6b))
- **overlay:** overlay scroll in safari and firefox ([#4969](https://github.com/adobe/spectrum-web-components/issues/4969)) ([05d24ff](https://github.com/adobe/spectrum-web-components/commit/05d24ffc4dc8e9b0281b90c768b7f983fe890def))
- **toast:** adds iconLabel to address accessibility ([#4944](https://github.com/adobe/spectrum-web-components/issues/4944)) ([8121057](https://github.com/adobe/spectrum-web-components/commit/8121057518062fb000279659b9597396753e21b7))

## [1.0.1](https://github.com/adobe/spectrum-web-components/compare/v1.0.0...v1.0.1) (2024-11-11)

### Bug Fixes

- **action-group:** add null check for slotElement in manageButtons ([#4924](https://github.com/adobe/spectrum-web-components/issues/4924)) ([60db5ab](https://github.com/adobe/spectrum-web-components/commit/60db5ab86155a1fea13452752c8995bf6da26cd5))
- **icon:** remove size300 suffix from chevron and checkmark icons in Spectrum 2 ([#4904](https://github.com/adobe/spectrum-web-components/issues/4904)) ([a22f42b](https://github.com/adobe/spectrum-web-components/commit/a22f42bf508e1d0f2ddc9824b0f4d4e08eac659a))
- **menu:** prevent sp-menu-item text-align cascading ([#4868](https://github.com/adobe/spectrum-web-components/issues/4868)) ([6663820](https://github.com/adobe/spectrum-web-components/commit/666382067e20a48a91d440ca1427698f9b58bc06))
- **number-field, slider:** ensure cached value is cleared when toggling between different steps ([#4846](https://github.com/adobe/spectrum-web-components/issues/4846)) ([1c84c96](https://github.com/adobe/spectrum-web-components/commit/1c84c968f55cde28d0144a78153c9a33a078c726))
- **number-field:** allow only numeric characters for Japanese/Chinese IME ([#4817](https://github.com/adobe/spectrum-web-components/issues/4817)) ([a791bd1](https://github.com/adobe/spectrum-web-components/commit/a791bd1c027ede4c88e8c066ef97610409a0f2c4))
- **overlay:** ensure smooth animation when opening modal overlays ([#4879](https://github.com/adobe/spectrum-web-components/issues/4879)) ([cd8dad7](https://github.com/adobe/spectrum-web-components/commit/cd8dad7b08c822a8224834b8775b0ab74bbaf3b6))
- **overlay:** overlay closing another overlay ([#4880](https://github.com/adobe/spectrum-web-components/issues/4880)) ([30434fa](https://github.com/adobe/spectrum-web-components/commit/30434fa52194884befd528ab88842092798859cc))
- **overlay:** remove flex display for dialog ([#4902](https://github.com/adobe/spectrum-web-components/issues/4902)) ([48448ea](https://github.com/adobe/spectrum-web-components/commit/48448ea75d7ffa61422947a18c3ea1ebf9ca25b7))
- **picker:** don't handle pointerdown for touch devices ([#4850](https://github.com/adobe/spectrum-web-components/issues/4850)) ([3a62d13](https://github.com/adobe/spectrum-web-components/commit/3a62d133b8074e5b40f1eedfa9a5566dc53b30ad))
- **search:** clear button ui in express ([#4910](https://github.com/adobe/spectrum-web-components/issues/4910)) ([f88e1e2](https://github.com/adobe/spectrum-web-components/commit/f88e1e2c03ed74f8d3f7924d395a34168afd244c))
- **slider:** update slider config to process the tick css correctly ([#4905](https://github.com/adobe/spectrum-web-components/issues/4905)) ([7b1dfd0](https://github.com/adobe/spectrum-web-components/commit/7b1dfd0c12a15f5c3696f162347e5aace1d9c92e))

# [1.0.0](https://github.com/adobe/spectrum-web-components/compare/v0.49.0...v1.0.0) (2024-10-31)

### Bug Fixes

- **dialog-wrapper:** update heading to fully span grid area ([#4810](https://github.com/adobe/spectrum-web-components/issues/4810)) ([7d1f461](https://github.com/adobe/spectrum-web-components/commit/7d1f4612046ed5aedd8b3ff7db4cfa3e183b30a8))
- **help-text:** apply aria-live to ensure full help text is read to user ([#4210](https://github.com/adobe/spectrum-web-components/issues/4210)) ([049dc56](https://github.com/adobe/spectrum-web-components/commit/049dc568ddef88bdde0a72d26ced150c8edfc727))

### Features

- spectrum-web-components now supports Spectrum 2 system ([#4829](https://github.com/adobe/spectrum-web-components/issues/4829))

### BREAKING CHANGES

- coach-indicator: remove 'variant' and 'static' attributes from coach-indicator ([#4772](https://github.com/adobe/spectrum-web-components/issues/4772))
- split-button: remove split-button component ([#4729](https://github.com/adobe/spectrum-web-components/issues/4729))
- banner: remove banner component ([#4723](https://github.com/adobe/spectrum-web-components/issues/4723))
- badge: remove deprecated badge values ([#4742](https://github.com/adobe/spectrum-web-components/issues/4742))
- quick-actions: remove sp-quick-actions ([#4761](https://github.com/adobe/spectrum-web-components/issues/4761))
- popover: remove popover's dialog property ([#4751](https://github.com/adobe/spectrum-web-components/issues/4751))
- thumbnail: remove thumbnail deprecated sizes ([#4760](https://github.com/adobe/spectrum-web-components/issues/4760))
- progress-circle: remove progress-circle overBackground property ([#4750](https://github.com/adobe/spectrum-web-components/issues/4750))
- action-button, action-group, action-menu, button, link, meter, progress-bar: remove deprecated 'static' references ([#4818](https://github.com/adobe/spectrum-web-components/issues/4818))
- action-button: remove action-button variant property ([#4741](https://github.com/adobe/spectrum-web-components/issues/4741))
- theme: remove 'theme' attribute from sp-theme ([#4765](https://github.com/adobe/spectrum-web-components/issues/4765))

# [0.49.0](https://github.com/adobe/spectrum-web-components/compare/v0.48.1...v0.49.0) (2024-10-15)

### Bug Fixes

- **number-field:** show decimal on iPad minimized keyboard ([#4784](https://github.com/adobe/spectrum-web-components/issues/4784)) ([deb7a1c](https://github.com/adobe/spectrum-web-components/commit/deb7a1cce452f120a9c2c96d73b0d03132c02565))
- **tabs:** scroll exceeding tabs limit ([#4722](https://github.com/adobe/spectrum-web-components/issues/4722)) ([fc9a448](https://github.com/adobe/spectrum-web-components/commit/fc9a4489c13e2471226e0f79a1197a61ef8242a7))

### Features

- add `static-color` to replace `static` ([#4808](https://github.com/adobe/spectrum-web-components/issues/4808)) ([43cf086](https://github.com/adobe/spectrum-web-components/commit/43cf0865d902346568c755650f53410c7788f2a1))
- **button:** add noWrap property ([#4779](https://github.com/adobe/spectrum-web-components/issues/4779)) ([6760ec2](https://github.com/adobe/spectrum-web-components/commit/6760ec283ad190f45f9639e636953e90ea562385))

## [0.48.1](https://github.com/adobe/spectrum-web-components/compare/v0.48.0...v0.48.1) (2024-10-01)

### Bug Fixes

- add file extension to Theme imports and respective eslint rule ([#4771](https://github.com/adobe/spectrum-web-components/issues/4771)) ([a2b6bea](https://github.com/adobe/spectrum-web-components/commit/a2b6bea7142930d8143d9ca887e2c56ffa71a669))
- **breadcrumbs:** trigger change event on breadcrumbs via keyboard ([#4769](https://github.com/adobe/spectrum-web-components/issues/4769)) ([e14d082](https://github.com/adobe/spectrum-web-components/commit/e14d0827cd5a190e63b14418b8dd89fe2cab49ac))

# [0.48.0](https://github.com/adobe/spectrum-web-components/compare/v0.47.2...v0.48.0) (2024-09-17)

### Bug Fixes

- **action-menu:** dispatch scroll event ([#4715](https://github.com/adobe/spectrum-web-components/issues/4715)) ([c76f3f5](https://github.com/adobe/spectrum-web-components/commit/c76f3f54f5a08df82ea4247252f2e0114836a778))
- add null check in updated method of sp-number-field ([#4709](https://github.com/adobe/spectrum-web-components/issues/4709)) ([7b1eeab](https://github.com/adobe/spectrum-web-components/commit/7b1eeab613fffe833ea0f57a23d2cc11bef71ea7))
- **combobox:** update selected item state in menu ([#4730](https://github.com/adobe/spectrum-web-components/issues/4730)) ([c4cfd2a](https://github.com/adobe/spectrum-web-components/commit/c4cfd2a5a2b1d48727488023d1361e3a5b7c32db))
- **menu:** allow menu-item to support arbitrary element as the submenu root ([#4720](https://github.com/adobe/spectrum-web-components/issues/4720)) ([4c6a0dc](https://github.com/adobe/spectrum-web-components/commit/4c6a0dcf7c67560c664c1f7c0f93d0ef3f0005ab))
- **picker:** added a custom class to make `:focus-visible` styles consistent across all browsers ([#4724](https://github.com/adobe/spectrum-web-components/issues/4724)) ([d667d08](https://github.com/adobe/spectrum-web-components/commit/d667d0853b8122008ce8fe50c6c479a42dc96a9f))
- **toast:** added ability to wrap toast content with long words ([#4738](https://github.com/adobe/spectrum-web-components/issues/4738)) ([302d6fe](https://github.com/adobe/spectrum-web-components/commit/302d6fe927baff3a08dd567718eba8ee34473ac4))

### Features

- locale picker in the storybook's decorator ([#4687](https://github.com/adobe/spectrum-web-components/issues/4687)) ([9e0cd08](https://github.com/adobe/spectrum-web-components/commit/9e0cd08d68cad858bbdc53e8b01b7eeabfde59fb))
- **reactive-controller:** new pending state controller ([#4605](https://github.com/adobe/spectrum-web-components/issues/4605)) ([68baf94](https://github.com/adobe/spectrum-web-components/commit/68baf94f257b9c7525253819a2ed3c8fa1b6c408))

## [0.47.2](https://github.com/adobe/spectrum-web-components/compare/v0.47.1...v0.47.2) (2024-09-03)

### Bug Fixes

- **slider:** update variant attribute correctly ([#4714](https://github.com/adobe/spectrum-web-components/issues/4714)) ([9c22dd6](https://github.com/adobe/spectrum-web-components/commit/9c22dd6b749a3c80dc516db616f8ac68d30136cf))

## [0.47.1](https://github.com/adobe/spectrum-web-components/compare/v0.47.0...v0.47.1) (2024-08-27)

### Bug Fixes

- **breadcrumbs:** adjust ref directives imports ([#4681](https://github.com/adobe/spectrum-web-components/issues/4681)) ([6e7ba13](https://github.com/adobe/spectrum-web-components/commit/6e7ba132cecfb9089cda4598986161104992345d))
- **reactive-controllers:** update focusable element's tab-index to 0 on accepting focus ([#4630](https://github.com/adobe/spectrum-web-components/issues/4630)) ([d359e84](https://github.com/adobe/spectrum-web-components/commit/d359e844fb00ff3a52f7f4346038aa8d5b620025))
- **slider:** bump css version to increase slider z-index ([#4682](https://github.com/adobe/spectrum-web-components/issues/4682)) ([04bba95](https://github.com/adobe/spectrum-web-components/commit/04bba95bcc0946bf8f7172830f2127ed41a89d8c))

# [0.47.0](https://github.com/adobe/spectrum-web-components/compare/v0.46.0...v0.47.0) (2024-08-20)

### Bug Fixes

- **number-field:** update IME change detection ([#4672](https://github.com/adobe/spectrum-web-components/issues/4672)) ([de05aee](https://github.com/adobe/spectrum-web-components/commit/de05aee7c414e6cfcd27a12f129b03886311d3bf))
- **picker:** updated type for mobile and desktop ([#4666](https://github.com/adobe/spectrum-web-components/issues/4666)) ([d11da1f](https://github.com/adobe/spectrum-web-components/commit/d11da1ffb7faa7804a1383cffba90277cf401e45))
- **tray:** removed nonNull operator and initialized resolveTransitionPromise with dummy func ([#4658](https://github.com/adobe/spectrum-web-components/issues/4658)) ([1a8a479](https://github.com/adobe/spectrum-web-components/commit/1a8a4794c8601decd204db19302a296ed75c4deb))

### Features

- **breadcrumbs:** add Breadcrumbs component ([#4578](https://github.com/adobe/spectrum-web-components/issues/4578)) ([acd4b5e](https://github.com/adobe/spectrum-web-components/commit/acd4b5e4401dad8cf26b50ee5dcda80a28b62999))

# [0.46.0](https://github.com/adobe/spectrum-web-components/compare/v0.45.0...v0.46.0) (2024-08-08)

### Bug Fixes

- **contextual-help:** export typings ([#4655](https://github.com/adobe/spectrum-web-components/issues/4655)) ([8febc38](https://github.com/adobe/spectrum-web-components/commit/8febc383afa7fb67573c56ea4704d7397f07b661))
- docummentation demo controls should should have their changes reflected ([#4636](https://github.com/adobe/spectrum-web-components/issues/4636)) ([adc8af9](https://github.com/adobe/spectrum-web-components/commit/adc8af98e1a59c399551885506c9d68edb840fd0))
- **menu:** should not make a selection on right click ([#4642](https://github.com/adobe/spectrum-web-components/issues/4642)) ([d269629](https://github.com/adobe/spectrum-web-components/commit/d269629a64063515eddee9b178b6240b92b9bc76))
- rtl mobile layout view ([#4645](https://github.com/adobe/spectrum-web-components/issues/4645)) ([4b2d688](https://github.com/adobe/spectrum-web-components/commit/4b2d68826b064b6d36970793ae7fa54a7f83917e))

### Features

- upgrade menu and dialog grid css ([#4638](https://github.com/adobe/spectrum-web-components/issues/4638)) ([ab9d468](https://github.com/adobe/spectrum-web-components/commit/ab9d468a5a1cf5721e169bd8dd8724be78c148a1))

# [0.45.0](https://github.com/adobe/spectrum-web-components/compare/v0.44.0...v0.45.0) (2024-07-30)

### Bug Fixes

- **progress-bar:** removed duplicate label ([#4494](https://github.com/adobe/spectrum-web-components/issues/4494)) ([39b6622](https://github.com/adobe/spectrum-web-components/commit/39b6622658270400c6e44909096d0c6a9be5a040))
- **tabs:** prevent vertical auto scroll ([#4613](https://github.com/adobe/spectrum-web-components/issues/4613)) ([e1ef097](https://github.com/adobe/spectrum-web-components/commit/e1ef097bc4c4a1e888de028f40b6f2bb5ea2d7b8))
- **overlay** replace at() polyfill ([#4628](https://github.com/adobe/spectrum-web-components/issues/4628)) ([8cef2c6](https://github.com/adobe/spectrum-web-components/commit/8cef2c639433248257a72bfc2c98d0663e265b09))
- **picker** pointerup in mobile does not automatically make a selection ([4227](https://github.com/adobe/spectrum-web-components/issues/4227)) ([56366ce] (https://github.com/adobe/spectrum-web-components/commit/56366ce2750bb4bb5c6e3fa5fe7d809434497adb))
- **action-menu** clicking a menu item in an action menu tray doesn't register a click behind it ([4461] (https://github.com/adobe/spectrum-web-components/issues/4461)) ([56366ce] (https://github.com/adobe/spectrum-web-components/commit/56366ce2750bb4bb5c6e3fa5fe7d809434497adb))
- **tray** sp-tray now doesn't automatically retract when opened with fewer items in the iOS simulator ([4572] (https://github.com/adobe/spectrum-web-components/issues/4572)) ([56366ce] (https://github.com/adobe/spectrum-web-components/commit/56366ce2750bb4bb5c6e3fa5fe7d809434497adb))
- **action-menu** ActionMenu tray in mobile device doesn't dispatch multiple events ([4459] (https://github.com/adobe/spectrum-web-components/issues/4459)) ([56366ce] (https://github.com/adobe/spectrum-web-components/commit/56366ce2750bb4bb5c6e3fa5fe7d809434497adb))

### Features

- add filled state to dropzone component ([#4617](https://github.com/adobe/spectrum-web-components/issues/4617)) ([f6b7144](https://github.com/adobe/spectrum-web-components/commit/f6b7144efde6507b2690f011af00b9529112c373))

# [0.44.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.44.0) (2024-07-15)

### Bug Fixes

- add keyboard handlers to sp-table-cell-head ([#4473](https://github.com/adobe/spectrum-web-components/issues/4473)) ([794263e](https://github.com/adobe/spectrum-web-components/commit/794263ed93fb498a8f4c9f22a02408c6ebbf5170))
- **number-field:** multiple separators use-cases in decimal inputs in iOS devices ([#4571](https://github.com/adobe/spectrum-web-components/issues/4571)) ([6319da8](https://github.com/adobe/spectrum-web-components/commit/6319da80a21511735d9e9518125dbc2a24364f88))

### Features

- **action-bar:** support for action-menus ([#3780](https://github.com/adobe/spectrum-web-components/issues/3780)) ([4aff599](https://github.com/adobe/spectrum-web-components/commit/4aff5995f6a22eefae0dd8e580d743c27ceb2c2d))
- **alert-banner:** add alert banner component ([#4266](https://github.com/adobe/spectrum-web-components/issues/4266)) ([10d456e](https://github.com/adobe/spectrum-web-components/commit/10d456ec3c79f7eb534b0ba66e426c3b0994aab5))
- **sp-slider:** adjust fillStart calculation for value=0 and normalization function ([#4573](https://github.com/adobe/spectrum-web-components/issues/4573)) ([369fee7](https://github.com/adobe/spectrum-web-components/commit/369fee7065f42008d9b356a98235ac8180655a96)), closes [#4558](https://github.com/adobe/spectrum-web-components/issues/4558)

# [0.43.0](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.43.0) (2024-06-11)

### Bug Fixes

- duplicate code to empty global-vars before generating ([#4507](https://github.com/adobe/spectrum-web-components/issues/4507)) ([83215b6](https://github.com/adobe/spectrum-web-components/commit/83215b6cf47b13b5632e02e7d647fede4314be99))
- **menu:** enable numpad arrow and Enter keys ([#4492](https://github.com/adobe/spectrum-web-components/issues/4492)) ([012c411](https://github.com/adobe/spectrum-web-components/commit/012c4116dac62031e5a329cf4da7fb9cd149bfdf))
- **number-field:** updated number field to respect all locales ([#4508](https://github.com/adobe/spectrum-web-components/issues/4508)) ([cc6e928](https://github.com/adobe/spectrum-web-components/commit/cc6e928bc6797280f119994b1908f17bbcb574e3))
- **swatch:** sync aria-label with changes in label, color, and mixed state ([#4519](https://github.com/adobe/spectrum-web-components/issues/4519)) ([50aef31](https://github.com/adobe/spectrum-web-components/commit/50aef31ab049fecb3567cd5df9613b1d9bffb593))

### Features

- **combobox:** add `pending` state ([#4462](https://github.com/adobe/spectrum-web-components/issues/4462)) ([2d0c388](https://github.com/adobe/spectrum-web-components/commit/2d0c388cfde52bd5695b3d6db4b0425987ea6f85))
- **contextual-help:** add contextual help pattern ([#4285](https://github.com/adobe/spectrum-web-components/issues/4285)) ([a259aa3](https://github.com/adobe/spectrum-web-components/commit/a259aa35ee4e8a7fba7afb21e806f13bffceeaf3))

## [0.42.5](https://github.com/adobe/spectrum-web-components/compare/v0.42.4...v0.42.5) (2024-05-24)

### Bug Fixes

- **coachmark,overlay:** adjust imports of overlay and coachmark ([#4455](https://github.com/adobe/spectrum-web-components/issues/4455)) ([39706da](https://github.com/adobe/spectrum-web-components/commit/39706dafe58a598a86d7dc33629409f086a9694e))
- **number-field:** select full value when using Tab to enter a field with a unit ([#4340](https://github.com/adobe/spectrum-web-components/issues/4340)) ([a9d5cef](https://github.com/adobe/spectrum-web-components/commit/a9d5cef4a69af4f3f357bacbfdae9465d3e80fa5))
- **overlay:** ensure hint Overlays within shadow roots open as expected ([#4443](https://github.com/adobe/spectrum-web-components/issues/4443)) ([7dd64b9](https://github.com/adobe/spectrum-web-components/commit/7dd64b92e58ad2fd3a36986f24022728e3cb4c36))
- **overlay:** ensure that passing "open" to the directive manages a single strategy ([#4474](https://github.com/adobe/spectrum-web-components/issues/4474)) ([15d6ac7](https://github.com/adobe/spectrum-web-components/commit/15d6ac71d586eb496b591fa5b097707961600f75))
- **overlay:** persist "host" in directive rendered Overlay content ([#4475](https://github.com/adobe/spectrum-web-components/issues/4475)) ([5d189c2](https://github.com/adobe/spectrum-web-components/commit/5d189c2adf91545eb64a0136fa02d7c8caee8f48))

## [0.42.4](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.4) (2024-05-14)

### Bug Fixes

- **action-bar:** include focus-visible polyfilling ([#4273](https://github.com/adobe/spectrum-web-components/issues/4273)) ([fd71ca1](https://github.com/adobe/spectrum-web-components/commit/fd71ca1d8482026d8ddc9f6fa11553cdbecdac48))
- **action-menu:** allow menu groups to handle their own selections ([#4397](https://github.com/adobe/spectrum-web-components/issues/4397)) ([5a19051](https://github.com/adobe/spectrum-web-components/commit/5a190518814f85cfd2e345ad6a0add1378c05bf4))
- **base:** move lit imports to base ([#4416](https://github.com/adobe/spectrum-web-components/issues/4416)) ([b7cb07e](https://github.com/adobe/spectrum-web-components/commit/b7cb07e98e17754c83d3e0112aac9728139e043b))
- **color-area:** providing x and y attributes renders color handle correctly ([#4240](https://github.com/adobe/spectrum-web-components/issues/4240)) ([9eb5056](https://github.com/adobe/spectrum-web-components/commit/9eb5056d962dd2694e4a2d6100388a5becba91fe))
- **combobox:** add missing React TS typings ([#4419](https://github.com/adobe/spectrum-web-components/issues/4419)) ([fd9b485](https://github.com/adobe/spectrum-web-components/commit/fd9b485ee969318d21b0f79ec0c0f902034eccde))
- **combobox:** allow numeric values and trigger change event on keybo… ([#4405](https://github.com/adobe/spectrum-web-components/issues/4405)) ([235ae7c](https://github.com/adobe/spectrum-web-components/commit/235ae7ca9eed35800a834af1005eb0c8d892b9f1))
- **combobox:** correct package.json listings ([35a69a2](https://github.com/adobe/spectrum-web-components/commit/35a69a2923eec3f9f7bac867752d869e5fe988c1))
- **combobox:** process styles for invalid state ([#4344](https://github.com/adobe/spectrum-web-components/issues/4344)) ([c2b952e](https://github.com/adobe/spectrum-web-components/commit/c2b952e4e6558c99e15e2503702375bc9b0539d5))
- **link:** added feature to stop click propagation for disabled link ([#4251](https://github.com/adobe/spectrum-web-components/issues/4251)) ([64f26a5](https://github.com/adobe/spectrum-web-components/commit/64f26a5d2dd729d5cbae2418fd8bca8481ed6cf6))
- **number-field, slider:** floating point roundoff precision bug ([#4263](https://github.com/adobe/spectrum-web-components/issues/4263)) ([74480ef](https://github.com/adobe/spectrum-web-components/commit/74480efd47305a7d41d0e20682d8dcba1c129f2f))
- **number-field:** handles values greater than 1000 ([#4417](https://github.com/adobe/spectrum-web-components/issues/4417)) ([45d69d0](https://github.com/adobe/spectrum-web-components/commit/45d69d0bb927bd18c3d58c757c40c14768b70a82))
- **overlay:** prevent "receivesFocus=false" overlays from returning focus ([607819f](https://github.com/adobe/spectrum-web-components/commit/607819f053113a21cccfbc97d775551ef11bfc4a))
- **picker-button:** update quiet styles ([#4383](https://github.com/adobe/spectrum-web-components/issues/4383)) ([42bf291](https://github.com/adobe/spectrum-web-components/commit/42bf291f9301c139c960cfc7ffb69ece08d945f3))
- revert back netlify to v15 ([#4446](https://github.com/adobe/spectrum-web-components/issues/4446)) ([7835eb8](https://github.com/adobe/spectrum-web-components/commit/7835eb828af5ae1ea442e8e2897bff1829ea335a))
- **slider,overlay:** ensure that pointer events in Slider are handled as expected in Overlay ([#4438](https://github.com/adobe/spectrum-web-components/issues/4438)) ([db193e8](https://github.com/adobe/spectrum-web-components/commit/db193e84d1ee300faaed47a5a4026b73a8d9fb30))
- **styles,theme:** add S2 tokens and theme ([#4241](https://github.com/adobe/spectrum-web-components/issues/4241)) ([a29e4a2](https://github.com/adobe/spectrum-web-components/commit/a29e4a298090e39e009c434e48113fb8a7e90d14)), closes [#4232](https://github.com/adobe/spectrum-web-components/issues/4232) [#4228](https://github.com/adobe/spectrum-web-components/issues/4228)
- **textfield:** textarea actually grows with multiline ([#4271](https://github.com/adobe/spectrum-web-components/issues/4271)) ([d8d0e84](https://github.com/adobe/spectrum-web-components/commit/d8d0e843b3bcab345dd7d46ad055e2bb5445ec36))
- **theme:** deprecate `theme` property for `system` ([#4230](https://github.com/adobe/spectrum-web-components/issues/4230)) ([ac26168](https://github.com/adobe/spectrum-web-components/commit/ac2616878e90314e5ed307442ac026c9e4ac707a))
- **tooltip:** fix infinite loop in self-managed tooltips ([#4269](https://github.com/adobe/spectrum-web-components/issues/4269)) ([b66ee49](https://github.com/adobe/spectrum-web-components/commit/b66ee495029cd8af8a20e6d450301c4368330c3b))
- update dependency @ctrl/tinycolor to v4.1.0 ([#4357](https://github.com/adobe/spectrum-web-components/issues/4357)) ([a0e2182](https://github.com/adobe/spectrum-web-components/commit/a0e21829d5ed6da7502fca3a06a19e3613125ba3))
- update dependency @floating-ui/dom to v1.6.3 ([#4322](https://github.com/adobe/spectrum-web-components/issues/4322)) ([3ba0018](https://github.com/adobe/spectrum-web-components/commit/3ba001825bf91ce1eddd8a576e6762292fff479b))
- update dependency @floating-ui/dom to v1.6.4 ([#4326](https://github.com/adobe/spectrum-web-components/issues/4326)) ([8183df3](https://github.com/adobe/spectrum-web-components/commit/8183df3590ae948260503372a9455616f2869c4c))
- update dependency @floating-ui/dom to v1.6.5 ([#4399](https://github.com/adobe/spectrum-web-components/issues/4399)) ([bc8df32](https://github.com/adobe/spectrum-web-components/commit/bc8df3287f6b1500b0a98f2e59aebbe88f7d6096))
- update dependency @floating-ui/utils to v0.2.2 ([#4327](https://github.com/adobe/spectrum-web-components/issues/4327)) ([81b570d](https://github.com/adobe/spectrum-web-components/commit/81b570d48a7c6a5c82e414621e1d67501a3bbd63))
- update dependency @internationalized/number to v3.5.1 ([#4323](https://github.com/adobe/spectrum-web-components/issues/4323)) ([56d5a63](https://github.com/adobe/spectrum-web-components/commit/56d5a63ac2f86dc3eb136ef208791b9555f79ce3))
- update dependency @internationalized/number to v3.5.2 ([#4390](https://github.com/adobe/spectrum-web-components/issues/4390)) ([4d10460](https://github.com/adobe/spectrum-web-components/commit/4d1046079d948fb00ba5f3ff6b26ff50236a4387))
- update dependency @web/dev-server-rollup to v0.6.2 ([#4400](https://github.com/adobe/spectrum-web-components/issues/4400)) ([08ee7f7](https://github.com/adobe/spectrum-web-components/commit/08ee7f7786412465a16ff085bbf9ace127cb2f08))

## [0.42.3](https://github.com/adobe/spectrum-web-components/compare/v0.42.2...v0.42.3) (2024-05-01)

### Bug Fixes

- **color-area:** providing x and y attributes renders color handle correctly ([#4240](https://github.com/adobe/spectrum-web-components/issues/4240)) ([9eb5056](https://github.com/adobe/spectrum-web-components/commit/9eb5056d962dd2694e4a2d6100388a5becba91fe))
- **combobox:** correct package.json listings ([35a69a2](https://github.com/adobe/spectrum-web-components/commit/35a69a2923eec3f9f7bac867752d869e5fe988c1))
- **link:** added feature to stop click propagation for disabled link ([#4251](https://github.com/adobe/spectrum-web-components/issues/4251)) ([64f26a5](https://github.com/adobe/spectrum-web-components/commit/64f26a5d2dd729d5cbae2418fd8bca8481ed6cf6))
- **number-field, slider:** floating point roundoff precision bug ([#4263](https://github.com/adobe/spectrum-web-components/issues/4263)) ([74480ef](https://github.com/adobe/spectrum-web-components/commit/74480efd47305a7d41d0e20682d8dcba1c129f2f))
- **overlay:** prevent "receivesFocus=false" overlays from returning focus ([607819f](https://github.com/adobe/spectrum-web-components/commit/607819f053113a21cccfbc97d775551ef11bfc4a))
- **textfield:** textarea actually grows with multiline ([#4271](https://github.com/adobe/spectrum-web-components/issues/4271)) ([d8d0e84](https://github.com/adobe/spectrum-web-components/commit/d8d0e843b3bcab345dd7d46ad055e2bb5445ec36))
- **theme:** deprecate `theme` property for `system` ([#4230](https://github.com/adobe/spectrum-web-components/issues/4230)) ([ac26168](https://github.com/adobe/spectrum-web-components/commit/ac2616878e90314e5ed307442ac026c9e4ac707a))
- **tooltip:** fix infinite loop in self-managed tooltips ([#4269](https://github.com/adobe/spectrum-web-components/issues/4269)) ([b66ee49](https://github.com/adobe/spectrum-web-components/commit/b66ee495029cd8af8a20e6d450301c4368330c3b))
- update dependency @ctrl/tinycolor to v4.1.0 ([#4357](https://github.com/adobe/spectrum-web-components/issues/4357)) ([a0e2182](https://github.com/adobe/spectrum-web-components/commit/a0e21829d5ed6da7502fca3a06a19e3613125ba3))
- update dependency @floating-ui/dom to v1.6.3 ([#4322](https://github.com/adobe/spectrum-web-components/issues/4322)) ([3ba0018](https://github.com/adobe/spectrum-web-components/commit/3ba001825bf91ce1eddd8a576e6762292fff479b))
- update dependency @floating-ui/dom to v1.6.4 ([#4326](https://github.com/adobe/spectrum-web-components/issues/4326)) ([8183df3](https://github.com/adobe/spectrum-web-components/commit/8183df3590ae948260503372a9455616f2869c4c))
- update dependency @floating-ui/utils to v0.2.2 ([#4327](https://github.com/adobe/spectrum-web-components/issues/4327)) ([81b570d](https://github.com/adobe/spectrum-web-components/commit/81b570d48a7c6a5c82e414621e1d67501a3bbd63))
- update dependency @internationalized/number to v3.5.1 ([#4323](https://github.com/adobe/spectrum-web-components/issues/4323)) ([56d5a63](https://github.com/adobe/spectrum-web-components/commit/56d5a63ac2f86dc3eb136ef208791b9555f79ce3))

## [0.42.2](https://github.com/adobe/spectrum-web-components/compare/v0.42.1...v0.42.2) (2024-04-03)

**Note:** Version bump only for package @adobe/spectrum-web-components

## [0.42.1](https://github.com/adobe/spectrum-web-components/compare/v0.42.0...v0.42.1) (2024-04-02)

### Bug Fixes

- **coachmark:** add "step-count" slot for custom/internationalized pagination content ([#4215](https://github.com/adobe/spectrum-web-components/issues/4215)) ([f4136a6](https://github.com/adobe/spectrum-web-components/commit/f4136a61d1e43ea32a4d9b8d83da3df828b32094))
- **dialog-wrapper:** add dismiss-label attribute for the close button's label ([#4154](https://github.com/adobe/spectrum-web-components/issues/4154)) ([c450a09](https://github.com/adobe/spectrum-web-components/commit/c450a098addaa1442f619cf892cdab1de96dbcaa))
- **reactive-controllers:** add DependencyManagerController ([c7f7dea](https://github.com/adobe/spectrum-web-components/commit/c7f7dead131c9c2594a181ac62294683b6c7fd63))
- **shared:** ensure the "updateComplete" in Focusable is stable ([885b4a5](https://github.com/adobe/spectrum-web-components/commit/885b4a5e12430910bb0dbacddc865081fe46d9a1))
- **slider:** skip variant="filled" css when fill-start ([#4217](https://github.com/adobe/spectrum-web-components/issues/4217)) ([b6d389d](https://github.com/adobe/spectrum-web-components/commit/b6d389d1be04284b30e395bd2fab2dcd2c65da63))
- **table:** Add aria-rowcount to virtualized tables ([#4156](https://github.com/adobe/spectrum-web-components/issues/4156)) ([b4136ab](https://github.com/adobe/spectrum-web-components/commit/b4136abf29bae6c7a5358bb8f4211feb95ca7690))

# [0.42.0](https://github.com/adobe/spectrum-web-components/compare/v0.41.2...v0.42.0) (2024-03-19)

### Bug Fixes

- **action-group:** manage Action Button selection through multiple slots ([4d02b46](https://github.com/adobe/spectrum-web-components/commit/4d02b469ffee693d23b67e68b1b63ad0b5c5eccc))
- allowing split view to have a custom aria label ([#4155](https://github.com/adobe/spectrum-web-components/issues/4155)) ([d9abed7](https://github.com/adobe/spectrum-web-components/commit/d9abed716633b10fa3e985e91239f4ebad3f6c91))
- **badge:** expand and update variant availability and mod override usage ([#4162](https://github.com/adobe/spectrum-web-components/issues/4162)) ([19e1a49](https://github.com/adobe/spectrum-web-components/commit/19e1a49079f67d5946a6779bd70838b69c726c4a))
- **button:** prevent pointer interaction of child/slotted content ([2cd5823](https://github.com/adobe/spectrum-web-components/commit/2cd5823649f71ca849df0eb39d01d64034a4af70))
- **color-field:** added missing dependencies ([#4141](https://github.com/adobe/spectrum-web-components/issues/4141)) ([b3bb23a](https://github.com/adobe/spectrum-web-components/commit/b3bb23a68958e728b2133dc5e5d309b8975f6da9))
- **menu:** release synthetic "click" promise to unblock keyboard interactions ([f8aecf3](https://github.com/adobe/spectrum-web-components/commit/f8aecf33cfa94ee1e1b791dc203fc46ead84eb10))
- **overlay:** prevent focus based hover interaction without :focus-visible ([79337ff](https://github.com/adobe/spectrum-web-components/commit/79337ff0c8df69203877732ce0541d9f1d49f33d))
- **overlay:** prioritize non-"hint" Overlays on the same trigger ([b9833f3](https://github.com/adobe/spectrum-web-components/commit/b9833f3e22cfc89c34a98bd235c30f207b013781))
- **picker:** add loading state to the picker ([#3110](https://github.com/adobe/spectrum-web-components/issues/3110)) ([d91e2c9](https://github.com/adobe/spectrum-web-components/commit/d91e2c9f3530c3c911832ea3a401fddc23e7854a))
- **picker:** allow open/close in tablet ([dcfc96e](https://github.com/adobe/spectrum-web-components/commit/dcfc96e779c0dd6005f4697450d1edcf7809e8ea))
- **picker:** correctly process the CSS for the quiet hover effect ([#4167](https://github.com/adobe/spectrum-web-components/issues/4167)) ([eb282fa](https://github.com/adobe/spectrum-web-components/commit/eb282fad1d1b4f5e7c2bce65df6ca56f46e6870e))
- **progress-bar:** remove aria-label only if set by label and label is empty; add tests ([d351451](https://github.com/adobe/spectrum-web-components/commit/d351451bba6be99eeddbf9fe55a29104fd86d809))
- **progress-circle:** remove aria-label only when set by label and changed label is empty ([cdd181a](https://github.com/adobe/spectrum-web-components/commit/cdd181abec29d90b6adea24569b05400f931b3ae))
- **styles, theme:** surface exports that omit Spectrum Vars proactively ([#4142](https://github.com/adobe/spectrum-web-components/issues/4142)) ([5b524c1](https://github.com/adobe/spectrum-web-components/commit/5b524c1d54a64225cb3b2f71b92f581695985519))
- **swatch:** allow Swatch Group to manage selection through multiple slots ([f333379](https://github.com/adobe/spectrum-web-components/commit/f3333795070c009523c4af750480ae288e17091f))
- **tab-overflow:** improve tab navigation experience and support custom aria labels ([#4165](https://github.com/adobe/spectrum-web-components/issues/4165)) ([9c9bf95](https://github.com/adobe/spectrum-web-components/commit/9c9bf952cf2a1e4a0c5bc35e63e46f5d5bd6afe8))
- **theme:** deprecate lightest and darkest color stops ([#4179](https://github.com/adobe/spectrum-web-components/issues/4179)) ([0c01a66](https://github.com/adobe/spectrum-web-components/commit/0c01a66627bbc46b459bda7680c6dcb9ea9c1b66))
- **truncated:** add truncated package ([#4163](https://github.com/adobe/spectrum-web-components/issues/4163)) ([4ba0480](https://github.com/adobe/spectrum-web-components/commit/4ba0480e2c471d8bba14eb898963ab0dca2f2d5a))

### Features

- **asset:** use core tokens ([99e76f4](https://github.com/adobe/spectrum-web-components/commit/99e76f4d32e990960b7fa2f0613ed4144adc4f6e))

### Reverts

- Revert "Truncated element (#4125)" (#4160) ([da88bbe](https://github.com/adobe/spectrum-web-components/commit/da88bbe416a3ee5a991acdbceec2d698222e5f6a)), closes [#4125](https://github.com/adobe/spectrum-web-components/issues/4125) [#4160](https://github.com/adobe/spectrum-web-components/issues/4160)

## [0.41.2](https://github.com/adobe/spectrum-web-components/compare/v0.41.1...v0.41.2) (2024-03-05)

### Bug Fixes

- **button:** add missing progress-circle dependency ([#4086](https://github.com/adobe/spectrum-web-components/issues/4086)) ([2dfeeb3](https://github.com/adobe/spectrum-web-components/commit/2dfeeb3c5f1febec269fef00933cc65a1d0a0c43))
- **color-field:** add color-field package ([#3870](https://github.com/adobe/spectrum-web-components/issues/3870)) ([5081634](https://github.com/adobe/spectrum-web-components/commit/508163476cbe47a4450b2448fcd47ecd237c8085))
- **menu:** fix css for `disabled` "value" slots in menu items ([#4113](https://github.com/adobe/spectrum-web-components/issues/4113)) ([3c5855d](https://github.com/adobe/spectrum-web-components/commit/3c5855d606739b29c7da7a6250cc7636ee15fad1))
- **overlay:** ensure "manual" Overlays ignore "light dismiss" when [popover] is not supported ([#4121](https://github.com/adobe/spectrum-web-components/issues/4121)) ([eb5e1ad](https://github.com/adobe/spectrum-web-components/commit/eb5e1ad78ebde99443929aa985a38297ebb16f4e))
- **overlay:** leverage "transition-behavior" to persist top-layer content while closing ([#4050](https://github.com/adobe/spectrum-web-components/issues/4050)) ([e3dea14](https://github.com/adobe/spectrum-web-components/commit/e3dea14fa382b4e02f61ae8b651e89cd92c348f8))
- **picker:** support inline labeling of quiet Picker ([#3704](https://github.com/adobe/spectrum-web-components/issues/3704)) ([3372286](https://github.com/adobe/spectrum-web-components/commit/337228659bfcd831700ce782254e5cb539c503d2))
- **slider:** double click on slider handle to reset slider position ([#3991](https://github.com/adobe/spectrum-web-components/issues/3991)) ([64c594a](https://github.com/adobe/spectrum-web-components/commit/64c594a7c305bd4946bb5801341366a1e751a614))

## [0.41.1](https://github.com/adobe/spectrum-web-components/compare/v0.41.0...v0.41.1) (2024-02-22)

### Bug Fixes

- **menu:** correct disabled menu item's chevron to appropriate colour ([#4052](https://github.com/adobe/spectrum-web-components/issues/4052)) ([30f5bb5](https://github.com/adobe/spectrum-web-components/commit/30f5bb58d376822f990545970581ebee943738f7))
- **picker:** correct implementation of "disabled", expand stories and documentation ([#4040](https://github.com/adobe/spectrum-web-components/issues/4040)) ([84c2fef](https://github.com/adobe/spectrum-web-components/commit/84c2fef72cb8be6d77ce62c21ed6d9d0d866d849))
- **progress-circle:** ensure size can be applied to non-"size" attribute bearing elements ([2bc1065](https://github.com/adobe/spectrum-web-components/commit/2bc10652ff9d7337c15eb8b3704678d0f2c700c9))
- **slider:** revert handle ui at min/max values ([#4042](https://github.com/adobe/spectrum-web-components/issues/4042)) ([da13af7](https://github.com/adobe/spectrum-web-components/commit/da13af78feb313a2c0aade65f87404cfa81fac72))
- **tabs:** bring selected tab into view ([#4032](https://github.com/adobe/spectrum-web-components/issues/4032)) ([a187057](https://github.com/adobe/spectrum-web-components/commit/a187057afa7ac073fe45117ebd0bc2315e6fea5e))
- **textfield:** clearly mark/support "multiline" as a requirement of "grows" ([a3e464d](https://github.com/adobe/spectrum-web-components/commit/a3e464d7ceda90ad241641916180ab6e8ea119dc))
- **top-nav:** focus loupe on :focus-visible only ([50d6870](https://github.com/adobe/spectrum-web-components/commit/50d687075257db5dd9ab121a980c9d27418a33d3))

# [0.41.0](https://github.com/adobe/spectrum-web-components/compare/v0.40.5...v0.41.0) (2024-02-13)

### Bug Fixes

- **popover:** correct tip delivery size ([#4018](https://github.com/adobe/spectrum-web-components/issues/4018)) ([4ff403e](https://github.com/adobe/spectrum-web-components/commit/4ff403e0d58c3014a7adedd6b22dd164e23cdfd2))
- **slider:** high contrast improvements for filled track ([#3952](https://github.com/adobe/spectrum-web-components/issues/3952)) ([782560d](https://github.com/adobe/spectrum-web-components/commit/782560d98c3431c9f4467c4b93857133f30dc0d6))
- support generating random IDs outside of secure contexts ([485a67c](https://github.com/adobe/spectrum-web-components/commit/485a67c5401094705b711350f8ee74182a6dd64b))
- **tray:** only allow "click" events when they "pointerdown"ed on the Underlay ([#4020](https://github.com/adobe/spectrum-web-components/issues/4020)) ([4f9aa4a](https://github.com/adobe/spectrum-web-components/commit/4f9aa4aac837fc56ab1876aa693bd9d82f0ba26f))

### Features

- **coachmark:** rename "sp-coachmark" to "sp-coachmark-indicator", add "sp-coachmark" ([#3639](https://github.com/adobe/spectrum-web-components/issues/3639)) ([a94389c](https://github.com/adobe/spectrum-web-components/commit/a94389cac1a31e5f0b02b187c93fd3489dc0f40f))
- **icon:** use core tokens ([a11ef6b](https://github.com/adobe/spectrum-web-components/commit/a11ef6b45141769b4c73a7c79322e780a8a1fa6e))

### Performance Improvements

- **combobox:** prevent initial list render and update tests to prove that reduces render time ([3dc5b1f](https://github.com/adobe/spectrum-web-components/commit/3dc5b1f77fbe9d5b20178a3641b0c73da0cdad35))

## [0.40.5](https://github.com/adobe/spectrum-web-components/compare/v0.40.4...v0.40.5) (2024-02-05)

### Bug Fixes

- **button:** use larger icons in Close Button ([c4aa02c](https://github.com/adobe/spectrum-web-components/commit/c4aa02c8a1c6456f8d9805ba02d74c7e4ecefaa3))
- **combobox:** add combobox pattern ([#3894](https://github.com/adobe/spectrum-web-components/issues/3894)) ([47d7d71](https://github.com/adobe/spectrum-web-components/commit/47d7d71bc9e17b67452d45b9495c970dac15ff89)), closes [#3887](https://github.com/adobe/spectrum-web-components/issues/3887)
- **menu:** process ":active" styles ([7917583](https://github.com/adobe/spectrum-web-components/commit/79175833e8121cef1419b547802721324472965d))
- **slider:** reimplement gradient slider track application ([a10b91e](https://github.com/adobe/spectrum-web-components/commit/a10b91ed168ba58f02349e05e1c49898e8686206))
- **tabs:** account for the indicator bar in the overflow decorator ([f4a8744](https://github.com/adobe/spectrum-web-components/commit/f4a8744ed5cb38608ae856539ce7c34ca212b3d4))
- **theme:** expose version property ([#3978](https://github.com/adobe/spectrum-web-components/issues/3978)) ([d42bb71](https://github.com/adobe/spectrum-web-components/commit/d42bb710fab1857dabad80b982ad046a41251569))
- **theme:** include custom Spectrum color tokens in Express color tokens ([370a1f1](https://github.com/adobe/spectrum-web-components/commit/370a1f1df67dba51fd1110a5e850a8600f5a03dd))

## [0.40.4](https://github.com/adobe/spectrum-web-components/compare/v0.40.3...v0.40.4) (2024-01-29)

### Bug Fixes

- **overlay:** clean position data on close ([edac590](https://github.com/adobe/spectrum-web-components/commit/edac59003ecc1af8dc4aa91c00c9593e8792e63f))
- **picker,action-menu,split-button:** update interaction model ([#3935](https://github.com/adobe/spectrum-web-components/issues/3935)) ([bae7d52](https://github.com/adobe/spectrum-web-components/commit/bae7d527e513d2588267c62cc70f5e1c1289f903))
- **shared:** update and expand attribute coverage in likeAnchor ([5cb5f1d](https://github.com/adobe/spectrum-web-components/commit/5cb5f1d67c3afe4d62941632d65177a2cd8804c6))
- **slider:** add "fill-start" attribute/property and associated "variant="filled" visual delivery ([#3876](https://github.com/adobe/spectrum-web-components/issues/3876)) ([2c3e35e](https://github.com/adobe/spectrum-web-components/commit/2c3e35e858bbc10f162f719ada1356c516111050))

## [0.40.3](https://github.com/adobe/spectrum-web-components/compare/v0.40.2...v0.40.3) (2024-01-11)

### Bug Fixes

- **button:** adds pending button, fixes [#3162](https://github.com/adobe/spectrum-web-components/issues/3162) ([#3163](https://github.com/adobe/spectrum-web-components/issues/3163)) ([71254ec](https://github.com/adobe/spectrum-web-components/commit/71254ec2b29f18e62a9a2e5285ca8c35273d8d43))
- **overlay:** automatically reposition overlay when the contents resize ([83be807](https://github.com/adobe/spectrum-web-components/commit/83be807996ace4609486cc9d3bbf1723b3a531ad))
- **overlay:** move closed overlays to "display: none" ([fc0278b](https://github.com/adobe/spectrum-web-components/commit/fc0278b917759ed58c3ac62a6e962633914481c0))
- **overlay:** normalize popover toggling between native and synthetic [popover] usage ([26fa692](https://github.com/adobe/spectrum-web-components/commit/26fa6925f7f88959ba4d969c882daf7cb881c2d4))
- **overlay:** support positioning overlays within parents leveraging container-type rules ([21044b3](https://github.com/adobe/spectrum-web-components/commit/21044b3c8b5bed0af02f836b6ee6796554a90325))
- **overlay:** surface "overlay" property to "sp-opened" and "sp-closed" events ([957f8e9](https://github.com/adobe/spectrum-web-components/commit/957f8e9b42f5ad4672fe128fc42693d0065bb2d5))
- **picker:** force close slotted Tooltip elements with disabled when Menu openes ([82c8f12](https://github.com/adobe/spectrum-web-components/commit/82c8f129d8a378f51ca083c4020a15b3cbde1fe7))
- **picker:** prevent the Menu opening until required dependencies are loaded ([55e6174](https://github.com/adobe/spectrum-web-components/commit/55e617497477f2627982f877743f1635e32ee583))
- **tooltip:** surface "delayed" and "disabled" functionality ([#3882](https://github.com/adobe/spectrum-web-components/issues/3882)) ([ae9fcd2](https://github.com/adobe/spectrum-web-components/commit/ae9fcd2d742ae507c9dcd6c11478a1c8b13d1fc0))
- **top-nav:** allow consumers to "ignore-url-parts" or "search" or "hash" ([#3923](https://github.com/adobe/spectrum-web-components/issues/3923)) ([83bf70b](https://github.com/adobe/spectrum-web-components/commit/83bf70b7751d2f5b4ab617480bdb8b6252b3b2c6))

## [0.40.2](https://github.com/adobe/spectrum-web-components/compare/v0.40.1...v0.40.2) (2023-12-18)

### Bug Fixes

- **checkbox:** add missing readonly prop ([#3859](https://github.com/adobe/spectrum-web-components/issues/3859)) ([35b5649](https://github.com/adobe/spectrum-web-components/commit/35b56490e9c03dccbb852935caf51bc52f922143))
- **menu:** support navigating to and selecting Menu Items in Menu Groups ([8469ab2](https://github.com/adobe/spectrum-web-components/commit/8469ab235bf4049b7ce9fca008494df1cde012a7))
- **number-field:** validate min/max in more contexts ([2328a62](https://github.com/adobe/spectrum-web-components/commit/2328a62daaf9491cdc5de4f46ab422e54c57bc3f))
- **slider:** update handle alignment and color application ([#3860](https://github.com/adobe/spectrum-web-components/issues/3860)) ([bed73c0](https://github.com/adobe/spectrum-web-components/commit/bed73c03827766fc9802840795df2b43be4f090a))

## [0.40.1](https://github.com/adobe/spectrum-web-components/compare/v0.40.0...v0.40.1) (2023-12-05)

### Bug Fixes

- **action-menu:** allow tray to display full width ([31415e4](https://github.com/adobe/spectrum-web-components/commit/31415e4ebe6b5369775074e52ed92fcd6b70c932))
- **overlay:** ensure events are only bound once ([abe57ce](https://github.com/adobe/spectrum-web-components/commit/abe57cedcc18a309f3acf1b664bfa561f13b4f8f))
- **picker:** ensure menu placement in mobile ([#3835](https://github.com/adobe/spectrum-web-components/issues/3835)) ([4aba1c6](https://github.com/adobe/spectrum-web-components/commit/4aba1c6094e45481dec428fcc95fb4148f62dbc9))
- **slider:** align editable slider when no label provided ([#3816](https://github.com/adobe/spectrum-web-components/issues/3816)) ([a5f4900](https://github.com/adobe/spectrum-web-components/commit/a5f49009d4acc1e8c5403a08b127769e18bda56c))
- **tabs:** prevent vertical scrolling in overflow tabs ([eb0592f](https://github.com/adobe/spectrum-web-components/commit/eb0592f87c1f52fe34745af030331060b3641a59))

### Performance Improvements

- **checkbox:** refactor architecture for more rendering perf and DOM element count ([7c2277f](https://github.com/adobe/spectrum-web-components/commit/7c2277f1a21e2e886678c3a3ad1d454cbd6637e0))

# [0.40.0](https://github.com/adobe/spectrum-web-components/compare/v0.39.4...v0.40.0) (2023-11-16)

### Bug Fixes

- **button:** support [icon-only] delivery ([#3716](https://github.com/adobe/spectrum-web-components/issues/3716)) ([e236a50](https://github.com/adobe/spectrum-web-components/commit/e236a50d8e51da0d019758f744e1a1a8a9370b1c))
- **field-group:** apply role when none present ([3616199](https://github.com/adobe/spectrum-web-components/commit/36161997825b77b3a31a4090e273c12329be9d8c))
- **number-field:** update display value on scroll and arrow up/down ([fc59a18](https://github.com/adobe/spectrum-web-components/commit/fc59a18c73bb9b63f319d006713a5b5d15778cca))
- **overlay:** ensure manual overlays persist through interactions outside of their subtree ([#3788](https://github.com/adobe/spectrum-web-components/issues/3788)) ([ef5617f](https://github.com/adobe/spectrum-web-components/commit/ef5617f81b205b8bcf0a79e2b8a810cc65f13c3d))
- **split-view:** expand accessible attribute usage and HCM delivery ([cb7c71f](https://github.com/adobe/spectrum-web-components/commit/cb7c71f988df48aceef129665fdf432d5bcef3b0))
- **tags:** make the 'delete' event cancelable ([#3778](https://github.com/adobe/spectrum-web-components/issues/3778)) ([d9afd41](https://github.com/adobe/spectrum-web-components/commit/d9afd4183f85dfdfdd759236c3f77f7e7841b7c0))

### Features

- **textfield:** added name attribute to textfield ([#3752](https://github.com/adobe/spectrum-web-components/issues/3752)) ([593005a](https://github.com/adobe/spectrum-web-components/commit/593005a8892139beb9ece9342b51a2b43d63cef3))

## [0.39.4](https://github.com/adobe/spectrum-web-components/compare/v0.39.3...v0.39.4) (2023-11-02)

### Bug Fixes

- **action-bar:** allow "close" event to be cancelled ([17cf55e](https://github.com/adobe/spectrum-web-components/commit/17cf55e5117d632e612e2055c77f6fcc4dadbe4c))
- **infield-button:** add infield-button package ([057b885](https://github.com/adobe/spectrum-web-components/commit/057b885276f3d5dcbe32bab5ab36a2bb82334bc3))
- **overlay:** add delay resolution from overlaid content ([#3748](https://github.com/adobe/spectrum-web-components/issues/3748)) ([5c4f1f6](https://github.com/adobe/spectrum-web-components/commit/5c4f1f6f87cac60cb1884f59aa29d256f7baabb8))
- **overlay:** calculate more transforms ([6538a45](https://github.com/adobe/spectrum-web-components/commit/6538a45a036f60c4efce4c3ed3d1d6f2782a188e))
- **overlay:** place longpress helper content in a more accessible, less layout affecting location ([dd12c23](https://github.com/adobe/spectrum-web-components/commit/dd12c2346142a107ee9c7824410dff5ae660e574))
- support numeric IDs when resolving elements ([f62bf0d](https://github.com/adobe/spectrum-web-components/commit/f62bf0d24191ef47a4d7f9172c40570e052808a2))
- **table:** update row selection aria ([6c8c706](https://github.com/adobe/spectrum-web-components/commit/6c8c70688c1df59b6e7a7a9cbf562b7171e710c1))
- **top-nav:** default to role="navigation", sprout aria-label when "label" applied ([bbcea4a](https://github.com/adobe/spectrum-web-components/commit/bbcea4a65d1e3c0053962777ee3482a22572f193))

## [0.39.3](https://github.com/adobe/spectrum-web-components/compare/v0.39.2...v0.39.3) (2023-10-18)

### Bug Fixes

- **grid:** plug a mememory leak from the render process ([4414bd9](https://github.com/adobe/spectrum-web-components/commit/4414bd960d7695b98b283c90f7233b3ce047401a))
- **number-field:** prevent over excited "change" events ([7b93724](https://github.com/adobe/spectrum-web-components/commit/7b937241151cad5cfc9e5a03fa70c4b70ac0cbea))
- update deps graph, fix imports ([f633005](https://github.com/adobe/spectrum-web-components/commit/f633005e26bff640615f157b54830bfb0677d682))

## [0.39.2](https://github.com/adobe/spectrum-web-components/compare/v0.39.1...v0.39.2) (2023-10-13)

### Bug Fixes

- **menu:** conditionally access slots for their assigned content ([#3717](https://github.com/adobe/spectrum-web-components/issues/3717)) ([c045822](https://github.com/adobe/spectrum-web-components/commit/c04582216c67051fa6c78f27b299a9fdfd076597))
- **overlay:** allow overlay to persist on hover ([#3706](https://github.com/adobe/spectrum-web-components/issues/3706)) ([7707040](https://github.com/adobe/spectrum-web-components/commit/77070405fdb0d6a2bca5d5e33fe03a856f1cef6c))
- update deps graph, update link docs ([#3709](https://github.com/adobe/spectrum-web-components/issues/3709)) ([2deb284](https://github.com/adobe/spectrum-web-components/commit/2deb2847e6ad458c3cbaec02732fffde133e0c54))

## [0.39.1](https://github.com/adobe/spectrum-web-components/compare/v0.39.0...v0.39.1) (2023-10-06)

### Bug Fixes

- **action-button:** allow change events to bubble and pierce shadowdom ([#3614](https://github.com/adobe/spectrum-web-components/issues/3614)) ([3f76e04](https://github.com/adobe/spectrum-web-components/commit/3f76e04fb71ad263e067838050bd550c009b1a69))
- **alert-dialog:** use resize observer in place of page resize event for content measurement work ([b963813](https://github.com/adobe/spectrum-web-components/commit/b963813156489370f0b0fa4390cb0df0891070c9))
- **grid:** grid focusgroup fix on mutationObserver ([#3684](https://github.com/adobe/spectrum-web-components/issues/3684)) ([5d47db5](https://github.com/adobe/spectrum-web-components/commit/5d47db52b99ccd1cc58d9044781f3f1e38744bd6))
- **menu:** allow `change` events to be direct ([#3689](https://github.com/adobe/spectrum-web-components/issues/3689)) ([b2cd3da](https://github.com/adobe/spectrum-web-components/commit/b2cd3da1384c577f27f604c42847953bb7121cb2))
- **number-field:** handle negative numbers ([#3673](https://github.com/adobe/spectrum-web-components/issues/3673)) ([62553dd](https://github.com/adobe/spectrum-web-components/commit/62553dd437efb89b42372553adfdf95fc0be7496))
- **number-field:** update number-field value on pressing "enter" ([#3638](https://github.com/adobe/spectrum-web-components/issues/3638)) ([649eb2f](https://github.com/adobe/spectrum-web-components/commit/649eb2f5dd9e0d08bb18f640565b34e908c5b518))
- **progress-circle,toast,tooltip:** ensure complete dependency graph ([#3701](https://github.com/adobe/spectrum-web-components/issues/3701)) ([a5dfada](https://github.com/adobe/spectrum-web-components/commit/a5dfada0578afd5d5065d0fb7a44eb557979d292))
- **slider:** ensure z-index in Express theme ([c0cc655](https://github.com/adobe/spectrum-web-components/commit/c0cc655bd834188e26850309d71fbd0fb63ee7f5))

# [0.39.0](https://github.com/adobe/spectrum-web-components/compare/v0.38.0...v0.39.0) (2023-09-25)

### Bug Fixes

- **action-menu:** stack a "label-only" slot on top of the others to allow no icon menu buttons ([6b5817d](https://github.com/adobe/spectrum-web-components/commit/6b5817d34ff664ce0855f84165306731875e48a3))
- **alert-dialog:** add Alert Dialog package ([#3501](https://github.com/adobe/spectrum-web-components/issues/3501)) ([1062847](https://github.com/adobe/spectrum-web-components/commit/10628476d39ef45c23efa8b6ac53d4a2e334a92f))
- **base:** add re-export of lit/directive.js ([#3616](https://github.com/adobe/spectrum-web-components/issues/3616)) ([d2e237f](https://github.com/adobe/spectrum-web-components/commit/d2e237fe0fedf12ffe5fdcb726fdf31601409cb9))
- **base:** introduce static version property for component class ([#3582](https://github.com/adobe/spectrum-web-components/issues/3582)) ([e7e2b76](https://github.com/adobe/spectrum-web-components/commit/e7e2b769d21dc0317c3d38d02ee327b019871055))
- **color-handle,color-loupe,swatch,thumbnail:** use the Opacity Checkerboard package ([47e1fc4](https://github.com/adobe/spectrum-web-components/commit/47e1fc4c86f736f2fa27cb6644320577717f827e))
- **menu:** allow Menu elements to be controlled ([74ed7fb](https://github.com/adobe/spectrum-web-components/commit/74ed7fb7d593199c333392f89c4827fcb8248cab))
- **menu:** manage deeply slotted menu items and initial focus ([7f9ad69](https://github.com/adobe/spectrum-web-components/commit/7f9ad69282b6e740efb04fa2933d3163164259c7))
- opacity checkerboard inclusion order ([#3651](https://github.com/adobe/spectrum-web-components/issues/3651)) ([4f417dc](https://github.com/adobe/spectrum-web-components/commit/4f417dc046d7d80d3c32e6286c71ee0311cf8a98))
- **overlay:** allow "receives-focus" to target the root of an overlay ([#3658](https://github.com/adobe/spectrum-web-components/issues/3658)) ([0db1025](https://github.com/adobe/spectrum-web-components/commit/0db10258d84409d364b5e1bad57e71683de93fea))
- **overlay:** ensure position when closing overlays over the top-layer ([55fab0d](https://github.com/adobe/spectrum-web-components/commit/55fab0d49047c64849ed9c8001b79b793440da48))
- **overlay:** reduce circular dependencies ([25eeb71](https://github.com/adobe/spectrum-web-components/commit/25eeb7138b19ba0c1a6543d1f37c4e8cea2cdbd6))
- **picker,split-button:** include "tooltip" slot in the main button ([699b8af](https://github.com/adobe/spectrum-web-components/commit/699b8af2612f2dab8f7c65b9c105844f6feaa6ed))
- **shared:** scope querySelector to direct children, like slots are ([515eaee](https://github.com/adobe/spectrum-web-components/commit/515eaee4ec8522f0389f967420f75cbf3545b58c))
- **slider:** add t-shirt sizing ([24dac78](https://github.com/adobe/spectrum-web-components/commit/24dac789239bc154e97b3062fa4a91b2174f685e))

### Features

- **color-slider:** migrate to core tokens ([#3507](https://github.com/adobe/spectrum-web-components/issues/3507)) ([96d0d40](https://github.com/adobe/spectrum-web-components/commit/96d0d40419e9f0b2d1ed77528dc062b1e62aeea5))
- **meter:** add "variant" (coalescing various boolean attributes) and remove "over-background" attributes ([#3514](https://github.com/adobe/spectrum-web-components/issues/3514)) ([40e5f8a](https://github.com/adobe/spectrum-web-components/commit/40e5f8ae476a590bb3df52d7281f76f5908b8672))
- **table:** migrate to core tokens ([#3441](https://github.com/adobe/spectrum-web-components/issues/3441)) ([b866bab](https://github.com/adobe/spectrum-web-components/commit/b866bab30a56da1474d533221afd3ed536c31871))
- **underlay:** use core tokens ([9c555ab](https://github.com/adobe/spectrum-web-components/commit/9c555ab6afba738e8ac34ccda196d4775e97e30d))

# [0.38.0](https://github.com/adobe/spectrum-web-components/compare/v0.37.0...v0.38.0) (2023-09-05)

### Bug Fixes

- **action-menu,split-button:** ensure toggling the Menu closed completes ([2dd0f98](https://github.com/adobe/spectrum-web-components/commit/2dd0f9871a4d76a27f5d432ea2df230ab99cbdd1))
- **action-menu:** added static attribute support ([#3573](https://github.com/adobe/spectrum-web-components/issues/3573)) ([25889a8](https://github.com/adobe/spectrum-web-components/commit/25889a808d6dcf11779d5c716f1b7522050ddf2b))
- correct composition entry of multi-byte numbers ([#3610](https://github.com/adobe/spectrum-web-components/issues/3610)) ([5e11934](https://github.com/adobe/spectrum-web-components/commit/5e1193455dd876a45648b3040688a3bc389819a1))
- **dialog:** include tab order management at slotchange time ([0c7a079](https://github.com/adobe/spectrum-web-components/commit/0c7a07998343516b16d85fabfc60d1d6b6ff87dd))
- **menu:** added support for menu item description ([#3559](https://github.com/adobe/spectrum-web-components/issues/3559)) ([ce99528](https://github.com/adobe/spectrum-web-components/commit/ce99528b4ad61ba8185cde7eaacfa98a2a9fd619))
- **menu:** correct types import for .d.ts file creation ([a11d264](https://github.com/adobe/spectrum-web-components/commit/a11d2645863d23d3557fdb5803b68365cc373cb6))
- **overlay:** position for transformed and contained parents ([ca8fd8a](https://github.com/adobe/spectrum-web-components/commit/ca8fd8a48a5f4b7bbc97b5641082cf48f6869529))
- **picker:** ensure the Menu opens in a Tray on mobile ([6be2bed](https://github.com/adobe/spectrum-web-components/commit/6be2bed36b364c5abcd1210db9c95ebc883125ec))
- **radio-group:** onChange event not triggering on keyboard navigation ([#3592](https://github.com/adobe/spectrum-web-components/issues/3592)) ([8501239](https://github.com/adobe/spectrum-web-components/commit/850123925c567ca9713f68a49879651d1249f769))
- **search:** add mod to remove clear button padding ([65168fe](https://github.com/adobe/spectrum-web-components/commit/65168fe546ca271cd68722f0c3f4a0be8d4a3253))
- **sidenav:** reintroduce support for slotted label content ([26c7e6e](https://github.com/adobe/spectrum-web-components/commit/26c7e6e5c6065e7e8e44700fb03092b12d267a94))
- **slider:** ensure first render when no "value" is supplied ([eed860b](https://github.com/adobe/spectrum-web-components/commit/eed860b28321a250a9160c2b597b12cdd2aea9c0))
- **slider:** update CSS conversion for more correct visual delivery ([99c83e4](https://github.com/adobe/spectrum-web-components/commit/99c83e46d138c5bbfa43c519c38770d7fbe34ca5))
- **tags:** add mod for clear button width ([bea891f](https://github.com/adobe/spectrum-web-components/commit/bea891fdbf69390a1321400bd17bcd77f91cf914))

### Features

- **clear-button:** migrate to core tokens ([64be98a](https://github.com/adobe/spectrum-web-components/commit/64be98ae6cae92c1a8668a8a8b8af58337b4ce0f))

# [0.37.0](https://github.com/adobe/spectrum-web-components/compare/v0.36.0...v0.37.0) (2023-08-18)

### Bug Fixes

- address margin effected positioning ([38c8cf2](https://github.com/adobe/spectrum-web-components/commit/38c8cf2dd3f3b45a61062e3cd9b7480f903fae97))
- allow non-selection carying Picker derivatives to report value ([02c0134](https://github.com/adobe/spectrum-web-components/commit/02c013454cb2189f3026d1d928198fe815dd933d))
- ensure submenus stay open when root it clicked again ([83ced1c](https://github.com/adobe/spectrum-web-components/commit/83ced1c913f262620e7b87ad3b7e58dff0697442))
- handle longpress and over filter overlays ([483e52d](https://github.com/adobe/spectrum-web-components/commit/483e52df24f56be027d8417c1ae530211ef0deb1))

### Features

- **dialog:** leverage Overlay v2 ([5c21ab5](https://github.com/adobe/spectrum-web-components/commit/5c21ab551836af3d6d2bcc3b21e1aa116fb80181))
- **menu:** prepare for Overlay v2 and less connnected/disconnected responsibilities ([5dfb71e](https://github.com/adobe/spectrum-web-components/commit/5dfb71e5ed26cf8af83ca335a7658938f3f135a6))
- **overlay:** ship Overlay API v2 ([67b5d1b](https://github.com/adobe/spectrum-web-components/commit/67b5d1b02e88dcb5b0b79b5a6c5ead92ad1a5aca))
- **picker,action-group,split-button:** leverage Overlay v2 ([170a223](https://github.com/adobe/spectrum-web-components/commit/170a223d74870ed3eda452285943716f8cbf4b7c))
- **popover:** leverage Overlay v2 ([cde0a16](https://github.com/adobe/spectrum-web-components/commit/cde0a168642c4eedbbd29613bb65b13a4c3f3132))
- **tooltip:** leverage Overlay v2 ([346edac](https://github.com/adobe/spectrum-web-components/commit/346edacc5a3c40aaefa622db67219f5f8cc8ae5c))

### Performance Improvements

- make lots of things lazy ([b8fa3ad](https://github.com/adobe/spectrum-web-components/commit/b8fa3ada062bf54bbb42e76ab156c716d5820c7c))
- make submenus lazier ([a2d661c](https://github.com/adobe/spectrum-web-components/commit/a2d661cf4095f4ccb826d17b6f2e665c8c5bf70f))
- make submenus lazy ([93531b9](https://github.com/adobe/spectrum-web-components/commit/93531b9624259d519f6f9cab264f8485c9a32fdb))
- open/close timing update ([d4ebcd3](https://github.com/adobe/spectrum-web-components/commit/d4ebcd36ed5a256f211186e6863c3eee2631fa3f))

# [0.36.0](https://github.com/adobe/spectrum-web-components/compare/v0.35.0...v0.36.0) (2023-08-18)

### Bug Fixes

- **action-group:** separate first selection management from later selection management ([783b206](https://github.com/adobe/spectrum-web-components/commit/783b2067be23bf82eb222a361e5c899d89f05005))
- **action-menu:** add a slot for Tooltip content ([#3488](https://github.com/adobe/spectrum-web-components/issues/3488)) ([23cef3a](https://github.com/adobe/spectrum-web-components/commit/23cef3ad0393055a9285a0292667e657bd813c59))
- added default focus in focus group ([1abe7e7](https://github.com/adobe/spectrum-web-components/commit/1abe7e7ecc74d9f1323474505e7a182b9aefda1b))
- added default focus in focus group ([cd59f18](https://github.com/adobe/spectrum-web-components/commit/cd59f180afacaa719c01a8001bf8a656b4bbcb80))
- added Mutation Observer in the tags workflow ([3af1861](https://github.com/adobe/spectrum-web-components/commit/3af1861a09aa7eac6cd4eb0dbb7cce8ab057efec))
- close button static white ([d324017](https://github.com/adobe/spectrum-web-components/commit/d324017a5abcacf669ed56d9a878d9ae707b5c8e))
- parentNode declaration ([c45fdc3](https://github.com/adobe/spectrum-web-components/commit/c45fdc364fa6142fa7847f9b21179787880702dd))
- **picker-button:** include missing dependency on @spectrum-web-components/button ([#3515](https://github.com/adobe/spectrum-web-components/issues/3515)) ([ed44c2b](https://github.com/adobe/spectrum-web-components/commit/ed44c2bd5c729d8a563d9bd25e5d61f58ba1d074))
- **radio:** aria-disabled misspelling ([b3fbd25](https://github.com/adobe/spectrum-web-components/commit/b3fbd25cfa839ec9d4fc20b256755cfb538779a6)), closes [adobe/spectrum-web-components#3526](https://github.com/adobe/spectrum-web-components/issues/3526)
- **reactive-controllers:** functionality debugged ([f98013b](https://github.com/adobe/spectrum-web-components/commit/f98013bceced7e4d2759c698cdff7f9fe1d43c68))
- **reactive-controllers:** handleItemMutation ([d0e32a2](https://github.com/adobe/spectrum-web-components/commit/d0e32a255483c605bbbfc804f1c56c401b00ffe9))
- removed disabled property check ([816732f](https://github.com/adobe/spectrum-web-components/commit/816732f03fb271dbefe3ac7a0412cd5ec6479635))
- removed mutation controller from tags and added to focusgroup ([aaa1bc0](https://github.com/adobe/spectrum-web-components/commit/aaa1bc04437585a0d8f30e885e076868ecb1defa))
- **tags:** corner cases handled ([8ec6b6a](https://github.com/adobe/spectrum-web-components/commit/8ec6b6a0288629e1006b5d1c3ee17d162dd97d23))
- **tags:** delete functionality working ([60e6c2e](https://github.com/adobe/spectrum-web-components/commit/60e6c2e92e30c833d572d34ad6d41e94568a40d6))
- **tags:** documented the function ([f97c7a7](https://github.com/adobe/spectrum-web-components/commit/f97c7a77eb1dce32f8ec3202fe839dd0a9f0fdc8))
- **tags:** handled corner cases ([55a95b7](https://github.com/adobe/spectrum-web-components/commit/55a95b757baf89cab4261d50c2cf279471e7ef01))
- **tags:** performed the suggested changes ([6e3ef36](https://github.com/adobe/spectrum-web-components/commit/6e3ef36e8f423f08c2537eb2d075bec4118f2e86))
- **tags:** removed comment ([771dc0e](https://github.com/adobe/spectrum-web-components/commit/771dc0e63617e29c6777eb7bf3470c46ac9f7d17))
- **tags:** removed extra white spaces ([196bdae](https://github.com/adobe/spectrum-web-components/commit/196bdaef2fa5e2924676018b0ee147033237b32d))
- **tags:** some extra chnages ([45f1a9d](https://github.com/adobe/spectrum-web-components/commit/45f1a9d846e8d717bdd3fae999639b2419d53fc3))
- **tags:** some minor chnages ([36886fc](https://github.com/adobe/spectrum-web-components/commit/36886fc1fabecf23f99c5f23e8a9eae718f981b1))
- **tags:** suggested changes done ([8aca49e](https://github.com/adobe/spectrum-web-components/commit/8aca49e5249af235f20cf83cfee156336b3ca76f))
- **toast:** switches toast[open] to use visibility hidden to fix overlay handling ([#3511](https://github.com/adobe/spectrum-web-components/issues/3511)) ([8428cad](https://github.com/adobe/spectrum-web-components/commit/8428cadce83f2dd12b14bc29a28d6c43a6432bf0)), closes [#3510](https://github.com/adobe/spectrum-web-components/issues/3510)

### Features

- **menu:** convert to core tokens ([#3254](https://github.com/adobe/spectrum-web-components/issues/3254)) ([da43540](https://github.com/adobe/spectrum-web-components/commit/da43540abcea3db75bf145194be800b61153ebe0))
- **opacity-checkerboard:** add component ([#3416](https://github.com/adobe/spectrum-web-components/issues/3416)) ([90202f9](https://github.com/adobe/spectrum-web-components/commit/90202f9b3e11d6ac4bd85c24e814d9300314bf5a))
- **picker-button:** migrate to core tokens ([b39219c](https://github.com/adobe/spectrum-web-components/commit/b39219cd92f8f17420eadc74a655e0f1d074cae3))
- **sidenav:** migrate to core tokens ([1846aa3](https://github.com/adobe/spectrum-web-components/commit/1846aa30d763b1f88801b9e26c16d2c20d5b4a6a))

# [0.35.0](https://github.com/adobe/spectrum-web-components/compare/v0.34.0...v0.35.0) (2023-07-31)

### Bug Fixes

- **color-wheel:** reorient reactively to "dir" changes ([#3319](https://github.com/adobe/spectrum-web-components/issues/3319)) ([6a9dcec](https://github.com/adobe/spectrum-web-components/commit/6a9dcecbd1cff5dc0ea42c9288d1898072301045))
- **grid:** added lit dependency ([#3489](https://github.com/adobe/spectrum-web-components/issues/3489)) ([fb5f166](https://github.com/adobe/spectrum-web-components/commit/fb5f1664022a457620f5be097a47fa6381d4f8aa))
- menu item missing aria labels ([#3417](https://github.com/adobe/spectrum-web-components/issues/3417)) ([0d04869](https://github.com/adobe/spectrum-web-components/commit/0d048696792522af0d849b64983ae793dfeae289))
- **meter, progress-bar, progress-circle:** use innerText when label is not provided ([#3483](https://github.com/adobe/spectrum-web-components/issues/3483)) ([59358c7](https://github.com/adobe/spectrum-web-components/commit/59358c7ada3283e2fdb08793d4c4160dcfe7aee2))
- **meter:** added role meter progressbar in meter component ([#3459](https://github.com/adobe/spectrum-web-components/issues/3459)) ([d2eccef](https://github.com/adobe/spectrum-web-components/commit/d2eccef6de8a1c7a0f09bcae9618b4aff2109edd))
- **number-field:** update button label to use number-field-labels as part of the text ([#3474](https://github.com/adobe/spectrum-web-components/issues/3474)) ([b92daf2](https://github.com/adobe/spectrum-web-components/commit/b92daf2f50224a362215477341d7d10a4eb39734))
- setting title when textfield is invalid ([36d0537](https://github.com/adobe/spectrum-web-components/commit/36d05372bd829470ac3e16f52f1fad2a7ea513ba))
- **split-button:** update more button label application ([#3354](https://github.com/adobe/spectrum-web-components/issues/3354)) ([b4c9595](https://github.com/adobe/spectrum-web-components/commit/b4c959526580848dcbe56bd57191144610c07742)), closes [#3305](https://github.com/adobe/spectrum-web-components/issues/3305)
- **swatch:** clear previously selected children when updating `selected` ([ce1bd36](https://github.com/adobe/spectrum-web-components/commit/ce1bd360dcb1ae0afdf694f4eeabbf735d1b6c74))
- **swatch:** warn when mixed-value used with selects !== 'multiple' ([#3460](https://github.com/adobe/spectrum-web-components/issues/3460)) ([89c288e](https://github.com/adobe/spectrum-web-components/commit/89c288ef12e8d879f6e3c12a1e0ea94828797b50))
- **tabs:** allow bi-directional arrow key navigation in both orientations ([#3410](https://github.com/adobe/spectrum-web-components/issues/3410)) ([ea10049](https://github.com/adobe/spectrum-web-components/commit/ea10049c4d9eea0ef619cdd41fae2e1152455570))
- **textfield:** add support for [grows] when [multiline] ([3b306d4](https://github.com/adobe/spectrum-web-components/commit/3b306d434d366ae826ecf7d47e20f7780eb74a28))
- **textfield:** update focus state when [multiline][quiet] ([#3452](https://github.com/adobe/spectrum-web-components/issues/3452)) ([a7f563a](https://github.com/adobe/spectrum-web-components/commit/a7f563a240cda22c58c4a850fc65ed5d867bafb1))

### Features

- **action-bar:** use core tokens ([4e21edf](https://github.com/adobe/spectrum-web-components/commit/4e21edfa369dcdbba823e3cfc1b35d65f48cab6f))

# [0.34.0](https://github.com/adobe/spectrum-web-components/compare/v0.33.2...v0.34.0) (2023-07-11)

### Bug Fixes

- **action-button,action-menu,picker,split-button:** expand and update application of aria-\* attributes ([52c0156](https://github.com/adobe/spectrum-web-components/commit/52c015636d42f2baf1524446a0db9d5e5cfeb689))
- **action-group:** ensure Action Button clicks are attributed to the right element ([#3292](https://github.com/adobe/spectrum-web-components/issues/3292)) ([ddccab7](https://github.com/adobe/spectrum-web-components/commit/ddccab766498a6da6ca29d9bbe9cebd7924e81e0))
- added role for href button ([5a4ad98](https://github.com/adobe/spectrum-web-components/commit/5a4ad98afa69669a8a4fb2a88d82a837c0c40c55))
- **color-area,color-slider:** color-area labeling, RTL support, vertical slider orientation([#3315](https://github.com/adobe/spectrum-web-components/issues/3315)) ([ca2acda](https://github.com/adobe/spectrum-web-components/commit/ca2acdafe004cb962c00ebb7f79c5b6061dc6843)), closes [#3313](https://github.com/adobe/spectrum-web-components/issues/3313)
- **color-loupe:** hide svg from screen readers ([#3318](https://github.com/adobe/spectrum-web-components/issues/3318)) ([01e75b7](https://github.com/adobe/spectrum-web-components/commit/01e75b7f0dbf1096976c290ad360534847781fee))
- **color-slider,color-wheel:** fix focused state [#3278](https://github.com/adobe/spectrum-web-components/issues/3278) ([96b83f7](https://github.com/adobe/spectrum-web-components/commit/96b83f7eb6ead1de2b30f1483478a2e5d6195349))
- **color-slider:** announce new value on change after keydown ([#3304](https://github.com/adobe/spectrum-web-components/issues/3304)) ([d70d0ae](https://github.com/adobe/spectrum-web-components/commit/d70d0aefdc03524192c3b8a0d6cb901cf49d37a9)), closes [#3303](https://github.com/adobe/spectrum-web-components/issues/3303)
- **number-field,search,textfield:** add t-shirt sizes ([fda8f96](https://github.com/adobe/spectrum-web-components/commit/fda8f96b71b1447a8281f73d885c1c33ae74cfec))
- **picker:** correct label application for screen readers ([8ce0cb0](https://github.com/adobe/spectrum-web-components/commit/8ce0cb0b76fcb76af34fdd3228ae268509f80ee0))
- **radio:** fix radio documentation usage of sp-field-label[for] and sp-radio-group[id] ([60f54fb](https://github.com/adobe/spectrum-web-components/commit/60f54fb2c5f656cc775d52637e1ef95bde5949f5))
- **sidenav:** express hierarchy using list and listitem ([f9019d7](https://github.com/adobe/spectrum-web-components/commit/f9019d7f5a37c81b61395d5329b251317497a685)), closes [#3348](https://github.com/adobe/spectrum-web-components/issues/3348) [#3348](https://github.com/adobe/spectrum-web-components/issues/3348)
- **slider:** [#3340](https://github.com/adobe/spectrum-web-components/issues/3340) fix visual regression ([88e0bda](https://github.com/adobe/spectrum-web-components/commit/88e0bda41df9f1ebb21debf97db05b0fd144deb7))
- **slider:** slider input aria-valuetext omits formatOptions for unit [#3340](https://github.com/adobe/spectrum-web-components/issues/3340) ([d5ff7e6](https://github.com/adobe/spectrum-web-components/commit/d5ff7e6e0196580f25941caa1a304557cb0f5088))
- **swatch:** mixed-value state must be conveyed to screen readers using ARIA ([#3330](https://github.com/adobe/spectrum-web-components/issues/3330)) ([7711264](https://github.com/adobe/spectrum-web-components/commit/7711264850f54794fc2fcc343a81c5ff1f64c907))
- **table:** include all dependencies, @lit-labs/observers was missing ([98d0370](https://github.com/adobe/spectrum-web-components/commit/98d03701b05101bae4a9e1f4d554bf0648979884))
- text fixes ([0121fd6](https://github.com/adobe/spectrum-web-components/commit/0121fd6e25755881f5f00c8b7cd989fc47e201d8))
- **textfield:** add rows attribute ([#3356](https://github.com/adobe/spectrum-web-components/issues/3356)) ([1ee1c37](https://github.com/adobe/spectrum-web-components/commit/1ee1c37f219c82fd74ca1b89941d4f59ccfd2785))
- **vrt-compare:** updating the readme about vrt tests ([#3380](https://github.com/adobe/spectrum-web-components/issues/3380)) ([8eb28c8](https://github.com/adobe/spectrum-web-components/commit/8eb28c866c960b2cf27930cc1eab8f96e2c057d9))

### Features

- **accordion:** core token migration ([#3300](https://github.com/adobe/spectrum-web-components/issues/3300)) ([9650b71](https://github.com/adobe/spectrum-web-components/commit/9650b71dd7cf7b93c351ac7b369aaf424c82f47d))
- **card:** use core tokens ([9cccd26](https://github.com/adobe/spectrum-web-components/commit/9cccd26f00f688cbe1477dc7a9ce01542b179737))
- **tabs,top-nav:** use Core Tokens ([c6ba355](https://github.com/adobe/spectrum-web-components/commit/c6ba355c2160d1a8bda1618b8a9c28213194c7c5))

## [0.33.2](https://github.com/adobe/spectrum-web-components/compare/v0.33.1...v0.33.2) (2023-06-14)

**Note:** Version bump only for package @adobe/spectrum-web-components

## [0.33.1](https://github.com/adobe/spectrum-web-components/compare/v0.33.0...v0.33.1) (2023-06-14)

### Bug Fixes

- **color-slider:** use inset-block-_ and inset-inline-_ and fix RTL orientation and behavior [#3301](https://github.com/adobe/spectrum-web-components/issues/3301) ([52aa328](https://github.com/adobe/spectrum-web-components/commit/52aa328ea7e4c2e40c7688ce9daa233cc9936be0))
- **menu:** [#3164](https://github.com/adobe/spectrum-web-components/issues/3164) plug memory leak with gobal events ([ff589d4](https://github.com/adobe/spectrum-web-components/commit/ff589d4ec86f8dcda15c386907d27c7b3cc8c325))

### Reverts

- Revert "chore: bump @playwright/test from 1.30.0 to 1.35.0" ([0fa99a7](https://github.com/adobe/spectrum-web-components/commit/0fa99a79c04635adb682a54cfbdd3fc1bc05b9fd))

# [0.33.0](https://github.com/adobe/spectrum-web-components/compare/v0.32.0...v0.33.0) (2023-06-08)

### Bug Fixes

- **color-slider:** vertical variant orientation is upside down [#3291](https://github.com/adobe/spectrum-web-components/issues/3291) ([67c7e0a](https://github.com/adobe/spectrum-web-components/commit/67c7e0a426b74aec9e74ca50d0e4f77bb76a0064))
- **number-field:** simplify width management ([ef4765a](https://github.com/adobe/spectrum-web-components/commit/ef4765a33f81d19229d13ea418aa625f5e1e693a))
- removed usage of id in accordion ([c26c81f](https://github.com/adobe/spectrum-web-components/commit/c26c81f7dfb8a29e7c3019adda5d0faee9fffe11))

### Features

- **search:** use core tokens ([c62a7cd](https://github.com/adobe/spectrum-web-components/commit/c62a7cddae81b9767b0ce83117b790d9a7639547))

# [0.32.0](https://github.com/adobe/spectrum-web-components/compare/v0.31.0...v0.32.0) (2023-06-01)

### Bug Fixes

- **action-group:** update application/management of "role" on group and buttons ([533873b](https://github.com/adobe/spectrum-web-components/commit/533873be83da30e032fbb89a993f5c4e0c1c8086)), closes [#3221](https://github.com/adobe/spectrum-web-components/issues/3221) [#3221](https://github.com/adobe/spectrum-web-components/issues/3221) [#3221](https://github.com/adobe/spectrum-web-components/issues/3221)
- **base:** ensure streaming listener "streams" on the animation frame ([1478db1](https://github.com/adobe/spectrum-web-components/commit/1478db115cfe3aa9278bcfafb57b1d8b77d25b32))
- **color-handle,color-loupe:** accept updated CSS token names ([8c28f6d](https://github.com/adobe/spectrum-web-components/commit/8c28f6d002973bf7398f134ca4e73be8fee967dd))
- **overlay:** ensure CSS calcs resolve to the expected measurement value ([51a3feb](https://github.com/adobe/spectrum-web-components/commit/51a3feb2a42300de369aba06d7ec1eea92ffbd19))
- **picker:** correct attribute spelling of "aria-label" in dismiss button ([5fc9b30](https://github.com/adobe/spectrum-web-components/commit/5fc9b30260f7d6df4d6e3cb6a3e49a149ece5458))
- process "defineElement()" to CEM files ([cd8c99f](https://github.com/adobe/spectrum-web-components/commit/cd8c99f3451ad8cde4d561c14d911b4060c2bca9))

### Features

- **dropzone:** use core tokens ([11f7560](https://github.com/adobe/spectrum-web-components/commit/11f7560fcc83c28e84d05bf23699dd6e9cc90fa1))
- initial impl of next.js wrapper for the swc ([af911e0](https://github.com/adobe/spectrum-web-components/commit/af911e0fc4ba55f6f4f01825ea619f366828252b))
- **number-field:** use core tokens ([23a924e](https://github.com/adobe/spectrum-web-components/commit/23a924ef24ea5adfa0472e8e424bfeec1d184603))
- **popover:** use core tokens ([68328cc](https://github.com/adobe/spectrum-web-components/commit/68328ccd01f44758caf987e02a17d88488f9046c))
- **search,textfield:** use core tokens ([2ed5135](https://github.com/adobe/spectrum-web-components/commit/2ed51355c2787ac06274e763ea1eee7bfd0c9c72))
- **slider:** use spectrum-tokens ([8b1e72c](https://github.com/adobe/spectrum-web-components/commit/8b1e72c2876a6480421490509eb3b4def00a7a5f))
- **thumbnail:** use core tokens ([e298035](https://github.com/adobe/spectrum-web-components/commit/e2980354e04ab375bdaa8a6fc31141abc31dc802))

# [0.31.0](https://github.com/adobe/spectrum-web-components/compare/v0.30.0...v0.31.0) (2023-05-17)

### Bug Fixes

- generate react/picker and pass react TS checks ([101b88c](https://github.com/adobe/spectrum-web-components/commit/101b88c9d1607023e073a985a2b46d2dce2c9c82))
- **meter,progress-bar:** add i18n to progress delivery ([c7e4020](https://github.com/adobe/spectrum-web-components/commit/c7e4020dc3120f7e6e366bcc89dd523dea3ba821))
- **overlay:** address review comments ([dd8b985](https://github.com/adobe/spectrum-web-components/commit/dd8b98524b5124267531a40b35d6cf542006c7a0))
- **overlay:** removes use of px units in overlay stack ([122f96c](https://github.com/adobe/spectrum-web-components/commit/122f96c06ac2b5349acff0497fed1697264958f8))
- **overlay:** stop the tab trapping if shadow root is not found ([4f0ec46](https://github.com/adobe/spectrum-web-components/commit/4f0ec464bcc807e3a789bb5fd323b468d978e4a2))
- **shared:** allow "disabled" first to return to "tabindex=0" in "focusable" ([160bc59](https://github.com/adobe/spectrum-web-components/commit/160bc594f516bfadb754d47ce102a02cbde12fcd))

### Features

- **icon:** image src invalid error api ([19e06f9](https://github.com/adobe/spectrum-web-components/commit/19e06f92ee5f90c149fb1fcf68eb47384ac2a97d))
- **icon:** review comment changes ([ba75d94](https://github.com/adobe/spectrum-web-components/commit/ba75d9407635ed0f36d7568c4b1f508e08008d70))
- **icon:** review comment changes ([4597713](https://github.com/adobe/spectrum-web-components/commit/4597713ec2a15235aa504114d161740e8df4b2a1))
- **icon:** review comment changes ([19287fb](https://github.com/adobe/spectrum-web-components/commit/19287fbfd2f7ddf1686fc9f3d48e14809e461deb))
- **icon:** review comment changes ([dee1929](https://github.com/adobe/spectrum-web-components/commit/dee192910a466bd47a6cbd3892516923be09ead0))
- **icon:** review comment changes ([cb41b33](https://github.com/adobe/spectrum-web-components/commit/cb41b33e5fe480ce8512bc5a683237047affce85))
- **icon:** skipping test case for webkit ([fa4b903](https://github.com/adobe/spectrum-web-components/commit/fa4b9034a719863d30f751d1628753931a3a944f))

# 0.30.0 (2023-05-03)

### Bug Fixes

- [#2933](https://github.com/adobe/spectrum-web-components/issues/2933) by adding optional variant property to SideNav ([9c45c33](https://github.com/adobe/spectrum-web-components/commit/9c45c337e0434045729de2acafa2218817890261))
- [#353](https://github.com/adobe/spectrum-web-components/issues/353) with a temporary override ([e6b4e37](https://github.com/adobe/spectrum-web-components/commit/e6b4e37dbdefe03f1a0f023a26149c5cea7531be))
- abstract "hasVisibleFocusInTree" functionality and return trigger focus after close ([4f39f2c](https://github.com/adobe/spectrum-web-components/commit/4f39f2c506066b789834584d2c9c24185ea57118))
- **accordion:** ensure item toggle events can be prevented from the outside ([30dbfc8](https://github.com/adobe/spectrum-web-components/commit/30dbfc8435c298e8f68083553ddc0fca1309fdf8))
- **accordion:** update a11y tree to not double label ([cc91a6b](https://github.com/adobe/spectrum-web-components/commit/cc91a6bc597582ef08a5d3cf1a329b9866b3cbf1))
- **action-button:** add support for XS t-shirt size ([75440ce](https://github.com/adobe/spectrum-web-components/commit/75440ced6f5cc5dbcd2c3bbfe650ca8c78514467))
- **action-button:** all "selected" Action Buttons should be "aria-pressed=true" ([d85e235](https://github.com/adobe/spectrum-web-components/commit/d85e23552aa8f15dfdf069b7cba8fa7b8909190a))
- **action-button:** ensure disabled buttons are not interactable ([b81c3ba](https://github.com/adobe/spectrum-web-components/commit/b81c3ba7961234ebfe83caec3e2b43d0d885cfbb))
- **action-button:** expand Spectrum CSS processing ([ff1a424](https://github.com/adobe/spectrum-web-components/commit/ff1a4243c00b3774a6afa5e535c414f252dc87dd))
- **action-group:** add custom focus() method and use sendKeys for correct "Enter" key testing ([638aa35](https://github.com/adobe/spectrum-web-components/commit/638aa3551f359951d926e2b7c9773aafab1402f0))
- **action-group:** allow direct setting aria-label on first update ([84f7fdd](https://github.com/adobe/spectrum-web-components/commit/84f7fdd17145208055b685b6bdf3a6d2e986f21b))
- **action-group:** allow for initial button being "disabled" ([a1e3939](https://github.com/adobe/spectrum-web-components/commit/a1e393940daf5d0bb7783511d7b5255e24611033))
- **action-group:** allow quiet and emphasized attributes to be passed to slotted action buttons ([aadfddb](https://github.com/adobe/spectrum-web-components/commit/aadfddb8e92136e78c577fb70e0f9c2c1ee176b9))
- **action-group:** pass styles to nested children, too ([12f1be3](https://github.com/adobe/spectrum-web-components/commit/12f1be3cfd932b10e4b9aa18f8a89aeed6a09df4))
- **action-group:** support ActionButtons that are not direct children ([1d4efd5](https://github.com/adobe/spectrum-web-components/commit/1d4efd58386ebfb940763911cb90878cafcf6938))
- **action-group:** use the correct role for buttons when not selects ([0aae8ed](https://github.com/adobe/spectrum-web-components/commit/0aae8edcf582858c6dc0168942383ff9116bb319))
- **action-menu:** apply slot text observer pattern ([bbe6bb5](https://github.com/adobe/spectrum-web-components/commit/bbe6bb51caf62c51cff40e2e315c043f31bc6d00))
- **action-menu:** call super.firstUpdated for focus control ([88bad85](https://github.com/adobe/spectrum-web-components/commit/88bad85f2e6dbd5820bebd20f5d920704b7710d7))
- **action-menu:** fix 2510, unable to control top-level action-menu selection ([c9198c2](https://github.com/adobe/spectrum-web-components/commit/c9198c29c0f2f9be83d9e153147e5634c6c00b06))
- **action-menu:** never set item selected values when selects is undefined ([5237fdb](https://github.com/adobe/spectrum-web-components/commit/5237fdb30694364934e1cd30f3d9cf82efa2c5c5))
- **action-menu:** provide action menu size to action button ([b963f57](https://github.com/adobe/spectrum-web-components/commit/b963f5799ebd4ef8bba61cc57d6da668d2c8bf89))
- **action-menu:** spectrum adherence update ([6eb1860](https://github.com/adobe/spectrum-web-components/commit/6eb1860ca613a24c262a6551b221b409e4a28afc))
- **action-menu:** stop stripping selected state from submenu items ([968d1f2](https://github.com/adobe/spectrum-web-components/commit/968d1f26e4f075ad20dbaba07baf73d5a0c4d55c))
- **actionbar:** include dependencies and outline API ([2fc42e5](https://github.com/adobe/spectrum-web-components/commit/2fc42e56e1b8c6744ffa0b430c26581f59cc26c5))
- **actionbar:** reflect "open" property to attribute ([ec9979e](https://github.com/adobe/spectrum-web-components/commit/ec9979e535f12e354c660a2874bd1f962431bcc2))
- adapt and improve css ([649eeed](https://github.com/adobe/spectrum-web-components/commit/649eeeda637b8528217e18b6145d37e71b2c60c2))
- adapt golden hash of new images for split-view visual stories ([0135d03](https://github.com/adobe/spectrum-web-components/commit/0135d0385f555c42fcd3b4382703d10653ce2910))
- adapt tests ([88a2ff7](https://github.com/adobe/spectrum-web-components/commit/88a2ff717f297aef830f47865c105dfec2d080ac))
- add "editable" option to "sp-slider" ([e86d7fa](https://github.com/adobe/spectrum-web-components/commit/e86d7fa84491b41a39dbab9c8d85eec42df320cd))
- add "value" slot to sp-menu-item ([e1bd264](https://github.com/adobe/spectrum-web-components/commit/e1bd2646a5198d9ef64710ad0a3749606f08c74e))
- add [@slot](https://github.com/slot) description ([03019d6](https://github.com/adobe/spectrum-web-components/commit/03019d68c096bfb3171b52904dc66eef31320445))
- add content flow fallbacks to the position manager ([c008957](https://github.com/adobe/spectrum-web-components/commit/c0089571be599577f75b2fe7929b8ee26529358d))
- add docs and address PR comments ([568062a](https://github.com/adobe/spectrum-web-components/commit/568062a7e5106f2a8f570f3650342bab09dd158e))
- add grid areas workaround locally until available in Spectrum CSS ([4c5ed9d](https://github.com/adobe/spectrum-web-components/commit/4c5ed9dab27e96edae57ab8912fe598cd5cfc85e))
- add Grid pattern ([341f493](https://github.com/adobe/spectrum-web-components/commit/341f4932087487be47bde355d1b0894886ed44ad))
- add icon present and icon-only support to Picker ([f6887a3](https://github.com/adobe/spectrum-web-components/commit/f6887a34e228473e33893c81017492bf3e8fd6c3))
- add input validation to Number Field ([b1dd5ea](https://github.com/adobe/spectrum-web-components/commit/b1dd5ea79b079e7ff9a3f850c8589f4295878941))
- add likeAnchor API to Card element ([5c338fb](https://github.com/adobe/spectrum-web-components/commit/5c338fbfc73d9d20c8f771e11114064cadeeb732))
- add missing "elements.js" export for sp-table component ([ab8e2a7](https://github.com/adobe/spectrum-web-components/commit/ab8e2a7dc54bcccfa5c060d6361091b4cf83e8c1))
- add missing dependency ([9f74e7d](https://github.com/adobe/spectrum-web-components/commit/9f74e7de9dbf37046b1957d708bd9fdd6d8dec0b))
- add support for "padding" attribute ([e43078f](https://github.com/adobe/spectrum-web-components/commit/e43078f0e14a909fb5e38428222a05d8c4754288))
- add support for "readonly" attribute ([4bce3b7](https://github.com/adobe/spectrum-web-components/commit/4bce3b7b6910ac50e80efe6a8f63f57843feafb3))
- add support for Element Resolution ([d6a65d0](https://github.com/adobe/spectrum-web-components/commit/d6a65d0ce26da864729e707f62683585fe5e49c4))
- add t-shirt sizing to Thumbnail and support for "xxs"/"xs" sizes ([520a642](https://github.com/adobe/spectrum-web-components/commit/520a642b33e2ca5a4fdc67c15ace029d33e895ff))
- add tabs sizes to TopNav ([159bc89](https://github.com/adobe/spectrum-web-components/commit/159bc897cd9c14ef058c86b2493c4f52b608a203))
- add the missing quiet property to Link component ([867ea43](https://github.com/adobe/spectrum-web-components/commit/867ea43bc609b2516142c08ee90c598a1531fb99))
- add tslib as dependency where needed ([78885d9](https://github.com/adobe/spectrum-web-components/commit/78885d9ca7192a053d3b380c338ad5570da474f9))
- add value/selection checks to the tests and fix up the value logic ([933106f](https://github.com/adobe/spectrum-web-components/commit/933106f88dfa99f22fc1046c1395eb53f051b5c4))
- add when directive ([18b7405](https://github.com/adobe/spectrum-web-components/commit/18b74058d84acda1ec96f6a17cd81ba472304026))
- address a11y issues raised by updating our dependencies ([4f06477](https://github.com/adobe/spectrum-web-components/commit/4f0647782eea7fdd85560e1bcb2f8b892f30bc33))
- address westbrooks comments ([634af60](https://github.com/adobe/spectrum-web-components/commit/634af60f88b0c998b30697dfbd13c9c466ed539d))
- allow "updateComplete" to resolve to a boolean like the LitElement default ([6127946](https://github.com/adobe/spectrum-web-components/commit/6127946fd3ffd048a30b7eb4bf6aadf9e7c8752a))
- allow ActiveOverlay to manage open state ([a7c4cff](https://github.com/adobe/spectrum-web-components/commit/a7c4cffec56a7efc86b6409e3bc692574713a6bc))
- allow contextmenu event passing to pierce shadow roots ([05b69e9](https://github.com/adobe/spectrum-web-components/commit/05b69e90a56676c44e4757a6c2e19e6fe333b145))
- allow detached elements to be used as content for an overlay ([3ad8383](https://github.com/adobe/spectrum-web-components/commit/3ad83837b6c9a693a4fc24501e3fc7fb2383a12b))
- allow dir to be managed across multiple connections and disconnections ([6d93170](https://github.com/adobe/spectrum-web-components/commit/6d931708e8af1b3d5b9318f1d2c33bb1210d2145))
- allow direct child selectors when processing Spectrum CSS ([0ce79be](https://github.com/adobe/spectrum-web-components/commit/0ce79beb16314d8491299be0b9ef3d657bed5c66))
- allow for late loading theme scopes ([4c7a124](https://github.com/adobe/spectrum-web-components/commit/4c7a1248c4b3917de97b0f34d3cebdf1505cc2dc))
- allow Picker to be reparented ([39e7309](https://github.com/adobe/spectrum-web-components/commit/39e73094be38888599fb189ed4d613f09476310f))
- allow rendered anchors to be aria-hidden ([2e9aa23](https://github.com/adobe/spectrum-web-components/commit/2e9aa2324013e1d2311a8d4307dafe17912328ee))
- allow sp-dropdown to accept focus visibly from sp-field-label ([134bafc](https://github.com/adobe/spectrum-web-components/commit/134bafc9c2e4d06e48107182f82dd7487066b7f1))
- allow sp-dropdown to accept focus visibly from sp-field-label ([31e6fdf](https://github.com/adobe/spectrum-web-components/commit/31e6fdf8a05a01b7c7b541ea3795284c501763d0))
- allow Tab elements to accept slotted DOM content ([29c9517](https://github.com/adobe/spectrum-web-components/commit/29c951790159d9e02b9850f5739ecaeb486e82b1))
- allow tick labels to start counting from "min" ([e7e44e3](https://github.com/adobe/spectrum-web-components/commit/e7e44e31fcb4c77259990777ca24fb22db54c40a))
- allow user input of extemely large number when a max is applied ([0644b7f](https://github.com/adobe/spectrum-web-components/commit/0644b7f5e0d5cbbf27e241d730aaec8c991ff97c))
- allow value when step=0 ([41de75a](https://github.com/adobe/spectrum-web-components/commit/41de75a6cc2c1dd982b30a8281f4a9166e4cd87a))
- analyze errors, properly this time ([df685a2](https://github.com/adobe/spectrum-web-components/commit/df685a20f57379442d54f026b8ad7cef474a067b))
- analyze type errors, and add deprecated syntax tests ([b7e67a1](https://github.com/adobe/spectrum-web-components/commit/b7e67a103d5a3bb355a8ee4682ef9621d8d59872))
- apply "HelpTextMixin" to form elements ([a952447](https://github.com/adobe/spectrum-web-components/commit/a952447254d091b99fe9270b2857cddc48df7c73))
- apply Focuable styles in class extensions ([38f7afd](https://github.com/adobe/spectrum-web-components/commit/38f7afd7cdb317d5c8b6e69f1301decd21364b1d))
- **asset:** include alternative text for the file/folder versions ([92a091c](https://github.com/adobe/spectrum-web-components/commit/92a091c67b9f09eee820987c096f5dd1ce60df5b))
- **asset:** include alternative text for the file/folder versions ([7bf317e](https://github.com/adobe/spectrum-web-components/commit/7bf317e187152b1e810b0760e6e08510823d51de))
- **asset:** surface label attribute for folder/file "assets" ([861696b](https://github.com/adobe/spectrum-web-components/commit/861696b354639841753418cf1c27fc319e970b04))
- **avatar:** ensure there is ALWAYS a focusElement ([c1c8644](https://github.com/adobe/spectrum-web-components/commit/c1c864466a6f241bf12965e580ad5a6618bc26a0))
- avoid registering lit-virtualizer globally ([281071f](https://github.com/adobe/spectrum-web-components/commit/281071fc551b189afa0ef9ef21e542c27661d567))
- bad merge conflict resolution ([e408d61](https://github.com/adobe/spectrum-web-components/commit/e408d61c82ee4ea8463be7d76f480b260fd5aa30))
- **badge:** ensure built assets as publish time ([0b13319](https://github.com/adobe/spectrum-web-components/commit/0b13319c4d72f9c6550ac941eeef58cb6fe9ffb4))
- **base:** use full file extension ([6ea4d9d](https://github.com/adobe/spectrum-web-components/commit/6ea4d9d299dc805a0b1743c43e5b67d07b0a47b9))
- **bundle:** bundle does not export its own custom-elements.json ([a362886](https://github.com/adobe/spectrum-web-components/commit/a362886b19ae6878d4969d48bac07686f66e40bf))
- **button:** add "toggles" attribute to action button ([3e2d80c](https://github.com/adobe/spectrum-web-components/commit/3e2d80c5d004eb13b6523ee7e71d550d5e468d07))
- **button:** add excludeSourceSelector to reduce duplication of styles ([683e88e](https://github.com/adobe/spectrum-web-components/commit/683e88e8ac659e789c20d77bf0af602a305b54f9))
- **button:** add multiple ui icon imports to sp-button ([2f17fa9](https://github.com/adobe/spectrum-web-components/commit/2f17fa984fdf198ee8e2104fa14d0673ce348aa6))
- **button:** allow element content in the default/label slot ([7b0ef58](https://github.com/adobe/spectrum-web-components/commit/7b0ef584cc2b946155eaa234269f3e376381bb9f))
- **button:** apply icon as slotted content in action-button styles ([3b1487b](https://github.com/adobe/spectrum-web-components/commit/3b1487b76cd0f703cc95e05a9a8cb3f461a6c281))
- **button:** clean up clear button for reuse across elements ([4c71eb1](https://github.com/adobe/spectrum-web-components/commit/4c71eb12112283ec31a40de38fdb79195ac52fd5))
- **button:** delivery hold affordance when attribute available ([aecc6fe](https://github.com/adobe/spectrum-web-components/commit/aecc6fe7e632fec4556c4425d56a731605492873))
- **button:** delivery hold affordance when attribute available ([8efbf0d](https://github.com/adobe/spectrum-web-components/commit/8efbf0d38f683f688b2c9ad9790d44633d04eaf2))
- **button:** include "pointerleave" in management of the "active" state ([2e702e4](https://github.com/adobe/spectrum-web-components/commit/2e702e45516cb736ea930fdf927e457c10439e8e))
- **button:** minor docs spelling fix ([a7a1359](https://github.com/adobe/spectrum-web-components/commit/a7a1359990f54869e116d61f1a53626010db8477))
- **button:** no double link clicks ([02d576c](https://github.com/adobe/spectrum-web-components/commit/02d576c89561ba9459feb1efdba613ea289e808c))
- **button:** prevent default on "space" based activations ([708d587](https://github.com/adobe/spectrum-web-components/commit/708d587385147b02dcb71932c0472b134f15038f))
- **button:** relate to this.href correctly ([fade3ea](https://github.com/adobe/spectrum-web-components/commit/fade3ea9bd6bda6192f84a0ab9af4b812517e267))
- **button:** remove old package export listings ([32e8573](https://github.com/adobe/spectrum-web-components/commit/32e85733e2ed96b6d80ce6c2461f1a98c0f1470a))
- **button:** revert default "variant" application when missing ([fab993e](https://github.com/adobe/spectrum-web-components/commit/fab993e72dad8d7c4962e6d00632803c1a4d30ef))
- **button:** use slot text observer pattern ([a7288c3](https://github.com/adobe/spectrum-web-components/commit/a7288c3f95587f548952a83c78708eef06870fc0))
- **card:** allow for preview or cover-photo ([2d2f42b](https://github.com/adobe/spectrum-web-components/commit/2d2f42bb075c805d9c308d268c5f99a3cb2d0490))
- **card:** correctly apply :focus-visible styling to variants ([d7c7539](https://github.com/adobe/spectrum-web-components/commit/d7c7539727d70f22243bd50bdaf8fbe0d0bbbb80))
- **card:** create no preview image variant of card instead of no imageless variant at all ([7b102b9](https://github.com/adobe/spectrum-web-components/commit/7b102b9dc8460ddd179829b9c80f9b0628abf733))
- **card:** do not transform subheadling text to uppercase ([4244390](https://github.com/adobe/spectrum-web-components/commit/4244390ed83b740c1879d7ee43ead31d520aaa93))
- **card:** do not transform subheadling text to uppercase ([ea3119b](https://github.com/adobe/spectrum-web-components/commit/ea3119b7ca46b4731db20134dfae54d993e6a1de))
- **card:** include dependencies ([18beaf6](https://github.com/adobe/spectrum-web-components/commit/18beaf61c9af0aeb88b1801e821c1f1c5abb3d63))
- **card:** normalize sizing technique to align with future t-shirt size usage ([6f05b3b](https://github.com/adobe/spectrum-web-components/commit/6f05b3b7c88633b17cd44224af184c37c3d9c8bf))
- **card:** remove duplicate stories ([f266e41](https://github.com/adobe/spectrum-web-components/commit/f266e41753172b1262c0b079fd20a191ad9afa0c))
- **card:** removed empty card from documentation/stories ([8322894](https://github.com/adobe/spectrum-web-components/commit/83228948550dd6fef2a06ddbdc0f9954d8971fac))
- **card:** stop event propogation on handleselectedchange ([0ef95e5](https://github.com/adobe/spectrum-web-components/commit/0ef95e5a933295d7484015273812c3e3374c57ff))
- **card:** update golden image cache ([b06e92d](https://github.com/adobe/spectrum-web-components/commit/b06e92d43a921bd53b47f635bc7c11e54a3b52c4))
- centralize updated first focusable selector ([300e84c](https://github.com/adobe/spectrum-web-components/commit/300e84c404d031ddad92b4952e48ad3332c4aafd))
- check if current selected value exists before setting selected attr ([1878ca3](https://github.com/adobe/spectrum-web-components/commit/1878ca339626253ce3a664d42702b374fd4fff54))
- **checkbox:** allow events to be cancelled on checkboxbase ([aab568c](https://github.com/adobe/spectrum-web-components/commit/aab568c9588717b9d0be0c9b9ccf61b80531fb0a))
- **checkbox:** work around specificity changes when processing Spectrum CSS and cover with tests ([d53a871](https://github.com/adobe/spectrum-web-components/commit/d53a871f1ef5117c69ac5c4fc3b31aa9f151515c))
- cleaning up spectrum-config ([0fde625](https://github.com/adobe/spectrum-web-components/commit/0fde6250911bde7d0496880bebf6c32f897be6b3))
- click on docs sidenav links in Edge ([fc999bf](https://github.com/adobe/spectrum-web-components/commit/fc999bfda0690a6f4f652596e10054a103c215fb))
- close modal overlays with contextmenu events and pass those to the underlying page ([9e83f3c](https://github.com/adobe/spectrum-web-components/commit/9e83f3c0d2398323ebe941ba253d7a0dc0f40ba6))
- code review feedback ([23b84fc](https://github.com/adobe/spectrum-web-components/commit/23b84fc4c3244716325e0be7abadab6c476d834a))
- code review feedback ([441bbb7](https://github.com/adobe/spectrum-web-components/commit/441bbb7fac435924adbdd2277fae1f3bf6441c6c))
- **color-area:** fix hue value for hsv and hsl ([a66e111](https://github.com/adobe/spectrum-web-components/commit/a66e111c05571e3abac8f2940f11442e6f9e67b2))
- **color-area:** up and down arrows now work properly ([44b9f74](https://github.com/adobe/spectrum-web-components/commit/44b9f741a3bc4d746505a8ad3ca2e0f3ef6bfc05))
- **color-slider:** use correct focus events in test ([b974c12](https://github.com/adobe/spectrum-web-components/commit/b974c129c1860eafe920028b20401616f77eca4c))
- **color-wheel:** use correct focus events in test ([f6f35ec](https://github.com/adobe/spectrum-web-components/commit/f6f35ec5359c717331200b8d13dc58d3c4b3ff7a))
- complete deprecation of "quiet" attribute in checkbox and radio ([29d8452](https://github.com/adobe/spectrum-web-components/commit/29d84526cd63fe3217937119e85d8a1a87aa0d27))
- constrain overlay to available window size ([9729b55](https://github.com/adobe/spectrum-web-components/commit/9729b55ef5246662aa50cbc8037bcaeb2f4ac74a))
- contain activation to header content ([10183ce](https://github.com/adobe/spectrum-web-components/commit/10183ceb08745b544b5f338324ff7eeea1b3589d))
- convert the langage resolution workflow to a Reactive Controller ([b7781db](https://github.com/adobe/spectrum-web-components/commit/b7781db820620688f97a40225fb17a10e7881178))
- correct [@element](https://github.com/element) jsDoc listing across library ([c97a632](https://github.com/adobe/spectrum-web-components/commit/c97a6320c16a2b3053637e22bca0d56ce0cd5ae5))
- correct a11y representation of a radio group ([24ed0b8](https://github.com/adobe/spectrum-web-components/commit/24ed0b8850efc5ff8b2dc3c9916554f6907d2469))
- correct a11y tree ([f7e54e5](https://github.com/adobe/spectrum-web-components/commit/f7e54e5b07c7f374952ad1558ab44880b08f5e7d))
- correct add/remove timing of overlay events ([474ec6e](https://github.com/adobe/spectrum-web-components/commit/474ec6e85840dc1efee8b134cc6e6163f228920f))
- correct calculation of height when using primary-size='auto' ([0ff67c0](https://github.com/adobe/spectrum-web-components/commit/0ff67c0c09fd8d2edf133fb2bf63476b49845794))
- correct custom property hoisting ([a1d98dc](https://github.com/adobe/spectrum-web-components/commit/a1d98dccadb790afb61d761636754ed337a0d50c))
- correct dependency graph ([69165eb](https://github.com/adobe/spectrum-web-components/commit/69165eb7444aea66fd1041996c44ed43e39c3ebc))
- correct max size calculation for overlays ([0585f7f](https://github.com/adobe/spectrum-web-components/commit/0585f7f30bf502d147bd467a942ee180656b2413))
- correct overlay closure order or operations for manual override ([0b7a8c4](https://github.com/adobe/spectrum-web-components/commit/0b7a8c42866ae4f2d38d90fa7b6dc34ed2c21759))
- correct sizing of sp-theme in storybook ([976e691](https://github.com/adobe/spectrum-web-components/commit/976e691196848c3ddc7a4c0ba1af2221e5895777))
- correct slider math in RTL contexts ([4d73fa9](https://github.com/adobe/spectrum-web-components/commit/4d73fa9716293fdf415943586a01d96ede251032))
- correct sp-textfield[multiline][grows] styling and add story for regression testing ([58c9331](https://github.com/adobe/spectrum-web-components/commit/58c9331b75c94d2bcbe1742b023e1bd884c52bb3))
- correct specificity of webkit appearance work around ([f0d06bf](https://github.com/adobe/spectrum-web-components/commit/f0d06bf17bbf1d7d2a41a3008373a4b0f4097cf9))
- correct the origin on "maximumFractionDigits" when deciding "inputMode" ([e2fe9c8](https://github.com/adobe/spectrum-web-components/commit/e2fe9c8f71f3cac07905c6e1549594a8f64c8df4))
- correct the relationship between overlayWillCloseCallback and phased animations ([c63db8d](https://github.com/adobe/spectrum-web-components/commit/c63db8d2ea4c942fbd52c6d5239ddd3f1ccea5b0))
- correct theme calculation for triggering warnings ([5576329](https://github.com/adobe/spectrum-web-components/commit/557632990faca6f96e6a019180586ae5e9a1624b))
- correct viewSize calc and test ([2befdd5](https://github.com/adobe/spectrum-web-components/commit/2befdd5533de0551664d52d72cadc0431ab07139))
- correct yarn.lock branch ([47e419f](https://github.com/adobe/spectrum-web-components/commit/47e419f6e8105354cb38c284967d4caa99052993))
- correctly apply CSS Custom Props to docs site ([e87911f](https://github.com/adobe/spectrum-web-components/commit/e87911f2b0b54ed3fedf4f16d87f9d64c8f5e21c))
- correctly apply tab order to Accordion Items ([fd7a7f9](https://github.com/adobe/spectrum-web-components/commit/fd7a7f91769ab5bf0e22afb4cfab51329f5b198d))
- correctly delivery visuals and mouse interactions for litAnchor and extensions ([0ae889a](https://github.com/adobe/spectrum-web-components/commit/0ae889a8aab9b3417a021b917dfc817a8310f50f))
- correctly track "activeElement" across shadow boundaries ([8b9f93a](https://github.com/adobe/spectrum-web-components/commit/8b9f93ad5a66515f95053f559bc9e04d96063f0a))
- css fixes for action-menu ([8c804c8](https://github.com/adobe/spectrum-web-components/commit/8c804c808695a889aebd6a2170aa9d42f904187a))
- delete the used cleanup method ([942ef0f](https://github.com/adobe/spectrum-web-components/commit/942ef0fdc6e7c89e4f554e032c7b9fb760ca47a0))
- describe longpress button to screen readers ([acdcaf4](https://github.com/adobe/spectrum-web-components/commit/acdcaf49adbc701381bfdf1f95f12ab42f791a67))
- **dialog:** dialog wrapper headline a11y ([205e8f7](https://github.com/adobe/spectrum-web-components/commit/205e8f7a7e92fd7545d2810d79e429881061025a))
- **dialog:** don't show DialogWrapper divider when there's no headline ([b46f724](https://github.com/adobe/spectrum-web-components/commit/b46f724401ce1cfa2829af63378cde063ad98073))
- **dialog:** ensure :focus-visible polyfill availability ([b50e396](https://github.com/adobe/spectrum-web-components/commit/b50e39641b32d38e9ac1ce4211ee4aedb1705181))
- **dialog:** include all dependencies ([9be0da0](https://github.com/adobe/spectrum-web-components/commit/9be0da01556a5dae741bac8b4057fd3f16227ed7))
- **dialog:** include all dependencies ([7090320](https://github.com/adobe/spectrum-web-components/commit/709032010d15b3e85f0ba3a4f2de626f6650e042))
- **dialog:** more complete support for Spectrum CSS input ([925934a](https://github.com/adobe/spectrum-web-components/commit/925934aaf3e21d990a48775b05116fafe5abf1c4))
- **dialog:** more complete support for Spectrum CSS input ([c77a00c](https://github.com/adobe/spectrum-web-components/commit/c77a00c92e95cb95c6872991e4abd8845e46b59b))
- **dialog:** normalize sizing technique to align with future t-shirt size usage ([da33797](https://github.com/adobe/spectrum-web-components/commit/da33797e724d0943a6abf059c96641a220182e5f))
- **dialog:** prevent "fullscreen\*" dialogs from being "dissmisable" ([c3a6420](https://github.com/adobe/spectrum-web-components/commit/c3a642093e9cd17c3ef18cfe02f142bf9a055702))
- **dialog:** support "error" in wrapper, prevent undelay closure when not dismissable ([6789102](https://github.com/adobe/spectrum-web-components/commit/67891021a505213adcfa088cc7b4715b6119e37d))
- **dialog:** support "error" in wrapper, prevent undelay closure when not dismissable ([f52d428](https://github.com/adobe/spectrum-web-components/commit/f52d428f98110a47d3d24946c68873bdf195d703))
- **dialog:** swap secondary and cancel button order ([3df1705](https://github.com/adobe/spectrum-web-components/commit/3df1705e7d1dad1d0336a6f9e3b2011e4c16283d))
- **dialog:** updates for delivering dialog content accessibly ([f0ed33c](https://github.com/adobe/spectrum-web-components/commit/f0ed33c3351ae9bc2017202ede8cf206fbf395c2))
- **dialog:** use default value for "resolveTransitionPromise" for open by default dialogs ([7317a3f](https://github.com/adobe/spectrum-web-components/commit/7317a3f11f4e8160b149429841bac016708caaf8))
- **dialog:** use styles from the modal package ([0f04ce1](https://github.com/adobe/spectrum-web-components/commit/0f04ce1e3123af198830c126e8f0df76ae8eaec9))
- **dialog:** use styles from the modal package ([d98f812](https://github.com/adobe/spectrum-web-components/commit/d98f81268950439f484c645bcb93e7ac08196904))
- dir should never fall back to null ([6b16c6d](https://github.com/adobe/spectrum-web-components/commit/6b16c6dc41e0d4990d07d5de0d762316b324f260))
- disallow undefined property for min and maxlength ([21547f7](https://github.com/adobe/spectrum-web-components/commit/21547f70e3e2987ca72f14a294519560bdb901e3))
- **divider:** update a11y semantics ([46e6a12](https://github.com/adobe/spectrum-web-components/commit/46e6a1257135389e72a09f376f6b9149573873e6))
- docs button variant usage ([894282c](https://github.com/adobe/spectrum-web-components/commit/894282c579b39a3d69ff0d401e0598746c78c352))
- **docs:** revert greenkeeper so that docs can be built again ([b29b432](https://github.com/adobe/spectrum-web-components/commit/b29b432f83ed75c8a4678a74138f842ae4a06fab))
- **documentation:** add base search url ([#2799](https://github.com/adobe/spectrum-web-components/issues/2799)) ([f7af7cd](https://github.com/adobe/spectrum-web-components/commit/f7af7cdeeff481e68d55028650f7a01d687df6f0))
- **dropdown:** connect "label" attribute to "aria-label" ([49b89a9](https://github.com/adobe/spectrum-web-components/commit/49b89a904965502ba21b5f59803e2134b1bcf0ec))
- **dropdown:** correct conditional check ([a3a790f](https://github.com/adobe/spectrum-web-components/commit/a3a790f6c3f5f8f0837d619ca57c1090ab14e638))
- **dropdown:** correctly support "quiet" variant ([2a51a2b](https://github.com/adobe/spectrum-web-components/commit/2a51a2bf58d12319ebb328ce6c7298aeb8570507))
- **dropdown:** improve accessibility ([389d9d9](https://github.com/adobe/spectrum-web-components/commit/389d9d94a13bf31e10f58ee498bd848929e9d67c))
- **dropdown:** remove unexpected width constraint ([c625853](https://github.com/adobe/spectrum-web-components/commit/c625853011d22ad60aaf0325c3211f73d77eb35f))
- **dropzone:** show dragged color in new illustratedmessage version ([0591acf](https://github.com/adobe/spectrum-web-components/commit/0591acf92e5f458ac90ab2f8938142c06683c80a))
- ensure "click" on "NumpadEnter" key press ([450fa01](https://github.com/adobe/spectrum-web-components/commit/450fa019d44f447a349707d77635f95bbc9f1049))
- ensure "wheel" interactions lead to a "change" event ([3be87cd](https://github.com/adobe/spectrum-web-components/commit/3be87cd0e606a3e96f163e3e14da3ab455bc588d))
- ensure [disabled] styling ([4c067eb](https://github.com/adobe/spectrum-web-components/commit/4c067eb82dcfc5f1aaf3ecedfbfc83f4ffb90a22))
- ensure Action Menu Item with [href] close the menu ([6b3d87f](https://github.com/adobe/spectrum-web-components/commit/6b3d87f8c922df782432bca3ef93d21637bad78b))
- ensure all theme data is exported and listed for side effects ([14efdc7](https://github.com/adobe/spectrum-web-components/commit/14efdc71a9c1c72030aadb44bdc614cd2610d394))
- ensure aria attributes based on state ([6369ff3](https://github.com/adobe/spectrum-web-components/commit/6369ff3f35b2ed26777bdbd16bae3b3acd816bf6))
- ensure aria attributes based on state ([6ee43de](https://github.com/adobe/spectrum-web-components/commit/6ee43de23254f612759cc258705dfe6eed30c418))
- ensure browser understandable extensions ([f4e59f7](https://github.com/adobe/spectrum-web-components/commit/f4e59f76f86369593810463c6406565e28ad97e9))
- ensure CCX search visual delivery ([22b90b9](https://github.com/adobe/spectrum-web-components/commit/22b90b901071d8cdbee8a0f6ac2d6fe8acb6dbf0))
- ensure color wheel in not opinionated about saturation and lightness ([8e0fd9c](https://github.com/adobe/spectrum-web-components/commit/8e0fd9ca4b341d497b1fd6092ba88e321ee7044a))
- ensure correct Menu Items are "selected" when passed into the overlay ([46a25db](https://github.com/adobe/spectrum-web-components/commit/46a25db6303adbbcdfe76cb3bf97541adc418367))
- ensure dependencies included in package.json ([eb77858](https://github.com/adobe/spectrum-web-components/commit/eb778588c8bd75a9801d568c348096aecb74614a))
- ensure focus is managed when tabbing out of a menu ([9bfa81d](https://github.com/adobe/spectrum-web-components/commit/9bfa81d8a677d6c0ab5ac5cd618498496761c69b))
- ensure icon packages get properly processed for custom-elements.json listings ([38a5706](https://github.com/adobe/spectrum-web-components/commit/38a5706b4a59e2285af012f5c0804440a906cd16))
- ensure item exists when attempting to acquire next item to focus ([fb52cea](https://github.com/adobe/spectrum-web-components/commit/fb52ceac75f76943788411b206fd39739ff66a54))
- ensure lazily loaded focusElements do not crash ([64f2a54](https://github.com/adobe/spectrum-web-components/commit/64f2a54a5a6934306e97433e8102da6fe38b2660))
- ensure library readiness on "yarn install" ([fde2408](https://github.com/adobe/spectrum-web-components/commit/fde2408c04c843ec7f2e6b851cccc46b9c2f3c1c))
- ensure library readiness on "yarn install" ([#265](https://github.com/adobe/spectrum-web-components/issues/265)) ([26f0fc7](https://github.com/adobe/spectrum-web-components/commit/26f0fc759f5858255d97748bead52a7b9db25d4c))
- ensure Overlay.update bypasses the auto close mechanism ([8f2aa2e](https://github.com/adobe/spectrum-web-components/commit/8f2aa2e98507298182356e8ea62e384680aedd2c))
- ensure reactivity of resolved language ([5863a15](https://github.com/adobe/spectrum-web-components/commit/5863a155262d6ba6898f82bff49aed55a6eae4f4))
- ensure streamingListener ends even if pointercancel not fired ([74105f2](https://github.com/adobe/spectrum-web-components/commit/74105f23d30f549f18040cc7d05b99c9b746871a))
- ensure that "selected" can be set more than once from the outside ([5f1996c](https://github.com/adobe/spectrum-web-components/commit/5f1996cbb5e371719814c47c236a8fc1e2ef78ad))
- ensure that all paths to user change of selected trigger a change event ([2eee81e](https://github.com/adobe/spectrum-web-components/commit/2eee81e280b5c46c71ab09ea93ad1856b9e1ea5b))
- ensure that an overlay can be released even if it does not complete its fade in animation ([4cbb36f](https://github.com/adobe/spectrum-web-components/commit/4cbb36f91569ce9b7f926437142950fc8fbd59f9))
- ensure that entering an ancestor Menu Item without a submen closes related submenus ([efe5fa1](https://github.com/adobe/spectrum-web-components/commit/efe5fa1ff50c45487f370847444b940e1d6d8a4e))
- ensure that updates to Tab element content update the Selection Indicator ([94891eb](https://github.com/adobe/spectrum-web-components/commit/94891eb06022f8744558137d9fa237fd541ebca2))
- ensure themes are registered before adopting ([a7ffb84](https://github.com/adobe/spectrum-web-components/commit/a7ffb8420c7fdb045b837ea733694e1f48192578))
- excluded custom-vars-viewer from gen-react-wrapper ([9f748e7](https://github.com/adobe/spectrum-web-components/commit/9f748e739f83a5a9bc493aa407288338eb827ba1))
- expand sized functionality to support no default and returning to default values ([acf3cfb](https://github.com/adobe/spectrum-web-components/commit/acf3cfb000033d1ef1e22ca571cb8dbbeaadae77))
- expand support for maintaining hue and saturation across customization ([fe18944](https://github.com/adobe/spectrum-web-components/commit/fe18944da268bd16fbb3e643fa4695d7e2d0e5d7))
- expand sync offering for elements with overlay content ([0195843](https://github.com/adobe/spectrum-web-components/commit/0195843e9efac5760a78fa302d91139c84ea5747))
- explicitly setting NumberField wheel event handler as not passive ([fad1496](https://github.com/adobe/spectrum-web-components/commit/fad1496b0cfab5c35b2de7447f2f0bee5325dfc2))
- export CSS with appropriate scoping ([3cf9f40](https://github.com/adobe/spectrum-web-components/commit/3cf9f40c504c827e14231db23c0f8b9b189b222e))
- extract and share tshirt size styles ([3acfc30](https://github.com/adobe/spectrum-web-components/commit/3acfc308efea0993f00e7be01ee2fb49bd092449))
- extract and share tshirt size styles ([b1440f7](https://github.com/adobe/spectrum-web-components/commit/b1440f7e828f525a101ffba69df16984be154da1))
- factor theme to use a single DOM node ([7641228](https://github.com/adobe/spectrum-web-components/commit/7641228705bc5f1ba51dbec8a3d3943db540ad90)), closes [#154](https://github.com/adobe/spectrum-web-components/issues/154)
- fast forward changes in [#2905](https://github.com/adobe/spectrum-web-components/issues/2905) ([3a30b27](https://github.com/adobe/spectrum-web-components/commit/3a30b27615aec5642918600727648d3f7a35908c))
- **field-label:** do not assume a target is available and surface t-shirt sizing ([c5daead](https://github.com/adobe/spectrum-web-components/commit/c5daead76698733ce52878fc50e01cdb640396cc))
- final prerelease review of canary builds ([1fc032f](https://github.com/adobe/spectrum-web-components/commit/1fc032ff436d8be1817a2784787e30b07a2873c6))
- fix expanding sidenav item that has no value ([b28cdac](https://github.com/adobe/spectrum-web-components/commit/b28cdacf3b8a5d5676af57a47f3d9d8c6d4b876e))
- flappy Slider/Color Area tests ([c769c87](https://github.com/adobe/spectrum-web-components/commit/c769c8750a66139588191a8289abf13df7012c46))
- flatten assigned nodes to observe text of nested slots ([08ffd68](https://github.com/adobe/spectrum-web-components/commit/08ffd68bf31222019ec947b6aa32feada39f4fd2))
- focusable style ([48ea3e7](https://github.com/adobe/spectrum-web-components/commit/48ea3e79828b737ad3df9e0fcac5e48c50124085))
- font.css not auto-generated from spectrum-css ([2621a8a](https://github.com/adobe/spectrum-web-components/commit/2621a8a7064da074c4993f51eda66fc437cc8137)), closes [#308](https://github.com/adobe/spectrum-web-components/issues/308)
- for docs, add webcomponent polyfill for Edge ([6edc30b](https://github.com/adobe/spectrum-web-components/commit/6edc30bf120ce3750ac1d60c1c976c74893b0b87))
- get theme element working in storybook ([4c5e478](https://github.com/adobe/spectrum-web-components/commit/4c5e478474abe6c0842c41e9a9d3710f8f5a548e))
- give Picker a focus helper to enable tab navigation in Safari ([e796525](https://github.com/adobe/spectrum-web-components/commit/e7965251651b42e28bfbcaf752f2ab9b19700835))
- handle ta[ highlight color for android ([fe9d430](https://github.com/adobe/spectrum-web-components/commit/fe9d430fb7c8a1c706e1a300768ef0155f5f1aa3))
- have sp-dialog-wrapper confirm scroll management of its dialog when opening ([fed9536](https://github.com/adobe/spectrum-web-components/commit/fed953672722dde152b66614141bfd1c3bb824a1))
- hopefully fix CI ([ea87245](https://github.com/adobe/spectrum-web-components/commit/ea87245359128ad4f9d790d2dc5d5dd36208bc25))
- **icon:** clean up docs and types for available size values ([c38850d](https://github.com/adobe/spectrum-web-components/commit/c38850d1120a8599d8c623302bbc2c21485c99bc))
- **icon:** prevent async race resulting in multiple inner SVG elements ([b05e2d5](https://github.com/adobe/spectrum-web-components/commit/b05e2d5c7891026fa5b9585b03444b6728a30d0a))
- **icons-workflow:** rename icons/files to avoid ad blocking ([842b081](https://github.com/adobe/spectrum-web-components/commit/842b0810089b567b5d3dfca70ddc5935c4c6f477))
- **icons:** process icons for use as UIIcons ([47a43d7](https://github.com/adobe/spectrum-web-components/commit/47a43d7ef2c89d1510abb8bef3a42425781aeff6))
- **illustrated-message:** use accessibile tagnames ([e47b469](https://github.com/adobe/spectrum-web-components/commit/e47b469b5e1b9465b7bf0c4574f0ccb57acbb4f7))
- implement "emphasized" styles ([750bbe7](https://github.com/adobe/spectrum-web-components/commit/750bbe7c6a70ed590c4ea179179bf201c50526ea))
- implement "emphasized" styles ([74a7bfb](https://github.com/adobe/spectrum-web-components/commit/74a7bfb32b829ffe14fe53fb15a877cefc8b3f51))
- import LitVirtualizer from @lit-labs/virtualizer@0.7.0-pre.3 ([9886ce4](https://github.com/adobe/spectrum-web-components/commit/9886ce4a6fd612bae33feffea26f8dbe8af9d690))
- improve accessibility through aria-label attribute usage ([66752b7](https://github.com/adobe/spectrum-web-components/commit/66752b762604ff80d191172b315d2ef20bd6081d))
- improve css class handling, %-test and increase base dependency ([2f2c28d](https://github.com/adobe/spectrum-web-components/commit/2f2c28dd2636266f75fd74a3af445d40ba55d760))
- improve css, simplify attributes & properties ([6ddd47c](https://github.com/adobe/spectrum-web-components/commit/6ddd47c93784a5d8f36aada726701c5035040b34))
- include "type" in package.json, generate custom-elements.json ([1a8d716](https://github.com/adobe/spectrum-web-components/commit/1a8d716f2f787deb8d868a78bd28c8e62fe90e21))
- include all dependencies ([c80d244](https://github.com/adobe/spectrum-web-components/commit/c80d24483b440c634ebc0add27f35ae84c4d6260))
- include default export in the "exports" fields ([f32407d](https://github.com/adobe/spectrum-web-components/commit/f32407d7bbfd18e72c35b6f27740549e79957858))
- include element is bundle side effects ([ce320f8](https://github.com/adobe/spectrum-web-components/commit/ce320f859d43c08954b6d5c3f628db9319c11307))
- include late added items in the item list for the Picker ([9232eb1](https://github.com/adobe/spectrum-web-components/commit/9232eb1009ccbcdf6166e48928bd8416c23d50b2))
- include sync builds in publication configuration ([e731673](https://github.com/adobe/spectrum-web-components/commit/e731673e7d171af667fc87c5b6e521450143e8fe))
- include the ":root" selector in tokens CSS for use in the docs site ([a51e465](https://github.com/adobe/spectrum-web-components/commit/a51e4653a10ccc3a0ca45b5d6a46f97bd1ff70d8))
- include the "types" entry in package.json files ([b432f59](https://github.com/adobe/spectrum-web-components/commit/b432f5982b3b79f80af12f6d0312cbe2285e608b))
- include the "types" entry in package.json files ([a1f91f4](https://github.com/adobe/spectrum-web-components/commit/a1f91f47751d2806ba79fa7d7629d68bb3e3cbc7))
- include touch-action rule for draggable content ([53221da](https://github.com/adobe/spectrum-web-components/commit/53221dabc8911749372994cc0fabe55f36858680))
- include touch-action rule for draggable content ([3f507e6](https://github.com/adobe/spectrum-web-components/commit/3f507e6dba718ae2b7415454eba859a9790e43e7))
- issues with optionsMenu & menuItems ([01a7e35](https://github.com/adobe/spectrum-web-components/commit/01a7e35099cef1d8185e79ee94dfad36ece7ba8d))
- keep compact property ([904df71](https://github.com/adobe/spectrum-web-components/commit/904df71d63d542d6f8cf724dbfb81347d0f0de1b))
- keep compact property ([b5af15f](https://github.com/adobe/spectrum-web-components/commit/b5af15fb1fa6794cee0a88ffa9839921c2b21508))
- keep parent overlays open when not closing child hover overlays ([643fcff](https://github.com/adobe/spectrum-web-components/commit/643fcff10b6e455611fda76040ea0d29ecac5df9))
- key interaction handling no longer prevents "tab" presses ([b542ce8](https://github.com/adobe/spectrum-web-components/commit/b542ce8f98a8a26badfa856f2e09ebda16dbcbb1))
- leverage "dvh" rather than measured screen height ([84b9df0](https://github.com/adobe/spectrum-web-components/commit/84b9df0d101d9870a1b0c20eb34ba33fcdd0fbe1))
- leverage Color Controller to unify color interface across packages ([fb71690](https://github.com/adobe/spectrum-web-components/commit/fb7169066fd4f15aee594c463cc4cdbf7f550a5e))
- **link:** correct custom CSS processing configuration ([2a24d5a](https://github.com/adobe/spectrum-web-components/commit/2a24d5a034ea185c385fe09feafa3b3f094c848e))
- **link:** correct white space in template/docs site ([a48bd06](https://github.com/adobe/spectrum-web-components/commit/a48bd06a177ed5f6ec52d44676f61f313bc90022))
- **link:** correct white space management ([a7a63dc](https://github.com/adobe/spectrum-web-components/commit/a7a63dcbb5f048a9f7178861e4f5d9dbde63ad04))
- **link:** process Spectrum CSS without overwriting specificity ([9eb3d5c](https://github.com/adobe/spectrum-web-components/commit/9eb3d5c1ef535d61133ce745059bfc7193e32dd4))
- **link:** support "secondary" variant ([3808b96](https://github.com/adobe/spectrum-web-components/commit/3808b968f483748e98b6e4d3ea6640c63e29cc5f))
- **link:** test inner anchor attribute by accessing via focusElement ([f4e97a1](https://github.com/adobe/spectrum-web-components/commit/f4e97a1a4958a979a391d5bb330bc67289e354c0))
- lint away debugger statements ([34a498e](https://github.com/adobe/spectrum-web-components/commit/34a498e784221f98dbf26e9366114c82fabc9c5b))
- make overlays open in correct position on Edge ([5e57b0a](https://github.com/adobe/spectrum-web-components/commit/5e57b0a089e4d63085e919ac0c3e773272bb4a77))
- make sp-tab-list work in Edge ([948559a](https://github.com/adobe/spectrum-web-components/commit/948559a189448a2dde452ab367d9cbe8f337fccf))
- manage "focused" across more contexts ([9273c15](https://github.com/adobe/spectrum-web-components/commit/9273c15144323bd8d62626b4e35b1975bffabf2a))
- manage "lang" via context provided by "sp-theme" ([b1e3457](https://github.com/adobe/spectrum-web-components/commit/b1e3457ae447427c54f8645c478866340329750c))
- manage updated node types ([0517fc1](https://github.com/adobe/spectrum-web-components/commit/0517fc19536325332543f95f5ecc0d6cb0c786c5))
- manually support WHCM in tabs ([11884f1](https://github.com/adobe/spectrum-web-components/commit/11884f13655db88041d0470c48dee22c4bd8ec83))
- match "pointerup" listeners with "pointercancel" for full coverage ([7f2ce92](https://github.com/adobe/spectrum-web-components/commit/7f2ce924ce03fb0881505e6f144184bd3d25355d))
- match footer default color to content ([fd2b6f9](https://github.com/adobe/spectrum-web-components/commit/fd2b6f9552662365a982f534eac8f9d535a123f6))
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
- **menu:** prevent infinite loop when focus() ([98cc45b](https://github.com/adobe/spectrum-web-components/commit/98cc45b95e99a53e39576ecc43365f9c020d3409))
- **menu:** support menu item list change in deep decendents ([b2b47f3](https://github.com/adobe/spectrum-web-components/commit/b2b47f305cab9720d29b4214b3330b95f33a56d3))
- **meter:** remove comment ([27687ec](https://github.com/adobe/spectrum-web-components/commit/27687eca42f37cd06f3ae5a18910b632215a5c6a))
- **meter:** remove comment ([df726a6](https://github.com/adobe/spectrum-web-components/commit/df726a60e61dd4f084a10a650b052b2d55047b8a))
- minlength now accepted as minimum length for value.toString ([bc3b1c2](https://github.com/adobe/spectrum-web-components/commit/bc3b1c2ab56d1b569203ed4fb87e293a4990544a))
- missed ActionMenu for type changes ([fa66d56](https://github.com/adobe/spectrum-web-components/commit/fa66d56ea2296270bcba87e62d12a7837d1c3417))
- missing dependency ([bb411b5](https://github.com/adobe/spectrum-web-components/commit/bb411b5691fe8ab095d5de775bf3ec3f20f3e6aa))
- missing new-line preventing commits ([d88e2a9](https://github.com/adobe/spectrum-web-components/commit/d88e2a909ec0972373fa1ef7147b255ace59d0bd))
- modify overrides for new Button CSS ([8a36124](https://github.com/adobe/spectrum-web-components/commit/8a36124a78bbf4ff3b65dc169af62e9379b30c85))
- move hover/focus hoisting into conditioning ([15ac2f7](https://github.com/adobe/spectrum-web-components/commit/15ac2f7f561b3cb5b865d1539fbd753999f25119))
- move property management into update or willUpdate ([f66069f](https://github.com/adobe/spectrum-web-components/commit/f66069f2e38ea89de67d649b3b0bb84cc726ed73))
- no scroll update when managing elements outside of the tab order ([144c548](https://github.com/adobe/spectrum-web-components/commit/144c548d3eeeaec6054057f124e73bbb8928c73b))
- normalize "event" and "error" argument names ([8d382cd](https://github.com/adobe/spectrum-web-components/commit/8d382cdac98282c886f23c4a8d6cf4910c4a606c))
- normalize "lit" dependency versions ([9e09b0c](https://github.com/adobe/spectrum-web-components/commit/9e09b0c08e28c5ca85648f558db429bb01d38c06))
- normalize focus passing during and after pointer events ([357931b](https://github.com/adobe/spectrum-web-components/commit/357931b6eb803759925b10b629d21878e8249678))
- normalize wheel input directionally for more predictable input ([e4383a8](https://github.com/adobe/spectrum-web-components/commit/e4383a82a5c287e45ea1b22e592ce5e022125739))
- **number-field:** add an "indeterminate" state ([8bde8a1](https://github.com/adobe/spectrum-web-components/commit/8bde8a1ce54e4966736da6676424db8080c81861))
- **number-field:** add support for modified stepping ([#1534](https://github.com/adobe/spectrum-web-components/issues/1534)) ([f8ec763](https://github.com/adobe/spectrum-web-components/commit/f8ec7635e0771097df592df9f60d042113533c4a))
- **number-field:** added flag to scroll event to allow slider component to update on scroll ([4199eb0](https://github.com/adobe/spectrum-web-components/commit/4199eb0084dcaa9da77f3ff3880dd93f24f72b1d))
- **number-field:** clean up delivery of quiet variant ([cd93964](https://github.com/adobe/spectrum-web-components/commit/cd9396494b838a584e939a573e8baec6ef7c8a4c))
- **number-field:** dispatch input/change events as expected ([4a457ee](https://github.com/adobe/spectrum-web-components/commit/4a457ee4eb9e0056ea25b30796b34fb32ebdf29f))
- **number-field:** ensure "quiet" Number Field is sized correctly in the DOM ([3ea2c8f](https://github.com/adobe/spectrum-web-components/commit/3ea2c8f9f336e9199d184b48c521dd30f833145d))
- **number-field:** include dependancy listings ([5c9031d](https://github.com/adobe/spectrum-web-components/commit/5c9031da3694bfe516d020922b0a2d70660e6cf1))
- **number-field:** prevent changes by user when readonly ([64a7e93](https://github.com/adobe/spectrum-web-components/commit/64a7e93ea81177a545983fdf88a9162ab3bf1ee6))
- **number-field:** prevent interactin with stepper buttons when disabled ([ae20343](https://github.com/adobe/spectrum-web-components/commit/ae2034357fb97314e0f93df1294a6a0273fccd75))
- **number-field:** process 2 byte characters as their single byte cousins ([f424c0a](https://github.com/adobe/spectrum-web-components/commit/f424c0aa9e04baf24aa3f6c23dd4697ab0699fc0))
- **number-field:** readonly - no pointer events for stepper buttons ([05364fb](https://github.com/adobe/spectrum-web-components/commit/05364fb491b381d5ed1be60dc63b9c4158bfbe87))
- **number-field:** support non-supported units in "Intl.numberFormat" ([d846c0b](https://github.com/adobe/spectrum-web-components/commit/d846c0bc75c538b008d6a7f50dc9aecc06a9b606))
- **number-field:** validate value before dispatching "change" event ([8c2ad89](https://github.com/adobe/spectrum-web-components/commit/8c2ad89521b8bc39c3c1a29f6e46e8e2414dcd06))
- overlay react wrapper generation ([922e30f](https://github.com/adobe/spectrum-web-components/commit/922e30f8a9e5700a47bfdaadfe8caa1992402114))
- **overlay-root:** measure "active-overlay" after styles are applied ([d1a9e38](https://github.com/adobe/spectrum-web-components/commit/d1a9e38662232bab7381248f19ed50c7de6c8617))
- **overlay-root:** open/close with the same scheduling consideration ([919b64e](https://github.com/adobe/spectrum-web-components/commit/919b64e023c9b610acab5fe25322fdabfbc2fa37))
- **overlay-trigger:** allow trigger to be [disabled] ([fe9541e](https://github.com/adobe/spectrum-web-components/commit/fe9541e53852a54da3ae73488d5487c91ecc78f7))
- **overlay:** add overlay lifecycle methods to stack management ([9361527](https://github.com/adobe/spectrum-web-components/commit/9361527bc63896bcee2933d96b5021aa74386057))
- **overlay:** allow [type="modal"] hover overlays to be closed ([5a6802b](https://github.com/adobe/spectrum-web-components/commit/5a6802bc06869cd255bdbfcc460f836c247f01fb))
- **overlay:** allow external style access to "sp-theme" elements in overlays as a CSS part ([a107f66](https://github.com/adobe/spectrum-web-components/commit/a107f66ae171e857e5f84cfff9f7a27cc5bd320d))
- **overlay:** allow overlay-trigger to declaratively open overlay content ([194a44e](https://github.com/adobe/spectrum-web-components/commit/194a44e78df73ca4a5520e24b308667c23331880))
- **overlay:** close when overlay-trigger becomes [disabled] ([6f27e25](https://github.com/adobe/spectrum-web-components/commit/6f27e25658dd23949ef07c6df72c43768651482b))
- **overlay:** correct overlay content sizing ([d9bcd6f](https://github.com/adobe/spectrum-web-components/commit/d9bcd6fd6b4eecae297c6e5cc5330e79a9e198ff))
- **overlay:** do not focus the trigger when closing an overlay, unless expected ([21d7dfe](https://github.com/adobe/spectrum-web-components/commit/21d7dfeaa94919586bede27a9c7ae077a2d214a5))
- **overlay:** do not focus the trigger when closing an overlay, unless expected ([bed817f](https://github.com/adobe/spectrum-web-components/commit/bed817fcc1c14395822a08e1ddb44c42d41c21e4))
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
- **overlay:** use esm build from popper and point through to types ([853f77f](https://github.com/adobe/spectrum-web-components/commit/853f77fe2515d1331b07dc7b1434c6d6fd324410))
- **overlay:** use isolatedModules in tsconfig ([48d6069](https://github.com/adobe/spectrum-web-components/commit/48d60694ad5d6014b8664f515e698651f55c9e5f))
- **overlay:** use isolatedModules in tsconfig ([ad376a4](https://github.com/adobe/spectrum-web-components/commit/ad376a40cc1d48e271ddd3cb3e866c8f4ca2d83a))
- **overlay:** use tabindex=-1 but always remove it on open ([6047003](https://github.com/adobe/spectrum-web-components/commit/6047003eca58232f90a0c6b2ab0e5bd9fb678eb7))
- **overlay:** vend a VirtualTrigger for overlays with no element trigger ([a359c60](https://github.com/adobe/spectrum-web-components/commit/a359c6078aa4fac3c9a7bd140609acd4d9aed81d))
- override and clear text-transform: uppercase ([dddce4b](https://github.com/adobe/spectrum-web-components/commit/dddce4bc438f8cf8df217b062c9681ec52587060))
- **package:** update @spectrum-web-components/button to version 0.3.1 ([37a9c0e](https://github.com/adobe/spectrum-web-components/commit/37a9c0e9f1f8b2d996bda78476c4b7044fb5355e))
- **package:** update @spectrum-web-components/button to version 0.4.1 ([e8540b7](https://github.com/adobe/spectrum-web-components/commit/e8540b701b06f77ea494617701e36f7343994c8a))
- **package:** update @spectrum-web-components/styles to version 0.4.1 ([2b1f1fa](https://github.com/adobe/spectrum-web-components/commit/2b1f1fa2c6c6bc1aa619d7b02019c20d1b4f762c))
- **picker:** accept new "value" and new option post first render ([8f8c93f](https://github.com/adobe/spectrum-web-components/commit/8f8c93f1045b07d5e108769c4efffa54213d20e3))
- **picker:** add "quick select" action to right/left arrow keys ([21895ee](https://github.com/adobe/spectrum-web-components/commit/21895eed8d194b0a570cbb2bafeaa06c9511bf27))
- **picker:** allow menu items to be added, updated, and removed ([73511ba](https://github.com/adobe/spectrum-web-components/commit/73511ba996154c006602dfd1c7f1d94746049782))
- **picker:** ensure focus visibility application ([2679081](https://github.com/adobe/spectrum-web-components/commit/2679081978788bd68b5e2c9cd1c05161cc571446))
- **picker:** ensure that width is customizable from the outside ([702b052](https://github.com/adobe/spectrum-web-components/commit/702b052f9ea1686d2a964648d4bb1d365178160f))
- **picker:** make "change" event bubbling and composed ([1fdd33d](https://github.com/adobe/spectrum-web-components/commit/1fdd33de0f8a01640b91ecda2cb9e81bd8076adf))
- **picker:** query less strictly to support automatically selecting values ([969f966](https://github.com/adobe/spectrum-web-components/commit/969f966585256c3a496eddb4cb84c0142aa7ae9c))
- **picker:** use "modal" as the menu overlay interaction ([c8fbbe2](https://github.com/adobe/spectrum-web-components/commit/c8fbbe27b19702909855575b1afd38fb064e8378))
- pin back gh-pages to allow publishing ([d7a0c59](https://github.com/adobe/spectrum-web-components/commit/d7a0c595b8255776bda907d3e5c4c93d65da17ee))
- polishing ([d112875](https://github.com/adobe/spectrum-web-components/commit/d1128752a329462f835003e2343f5fe674d8cd0c))
- position tip shapes for bi-directional delivery ([35654de](https://github.com/adobe/spectrum-web-components/commit/35654decb855ffeef0c56c2958244dd240d3bbef))
- prepare for future core token consumption that leverages component names ([99f466b](https://github.com/adobe/spectrum-web-components/commit/99f466b0da832437fc2483b10cc1e9d0385434fb))
- prepare for querying child items while disconnected ([f4152a5](https://github.com/adobe/spectrum-web-components/commit/f4152a5474b661d72b69e7a8cab41639ec7fb8c0))
- prevent "hover" overlays from receiving focus ([7bd5ac2](https://github.com/adobe/spectrum-web-components/commit/7bd5ac26589f4248bdcde1ee3a168052b5a7bf20))
- prevent "hover" overlays from returning focus to the root of a parent modal ([ceb8fa7](https://github.com/adobe/spectrum-web-components/commit/ceb8fa73d23f6c9ccb6f2a00c18708d496975473))
- prevent active pointer events when slider toggles to [disabled] ([ceb4d74](https://github.com/adobe/spectrum-web-components/commit/ceb4d74abdbfb622e4a3cc17fc1e0b248af4df12))
- prevent console.log in source and test files ([3ee082c](https://github.com/adobe/spectrum-web-components/commit/3ee082ceadd9eeef167bb8ac6241fe1501e4426c))
- prevent default hoisting of custom pseudo elements ([7f66346](https://github.com/adobe/spectrum-web-components/commit/7f6634665fb9fdc530bd3009246e62c24cac1904))
- prevent Dialog Wrapper from dispatching two "close" events ([be6d23b](https://github.com/adobe/spectrum-web-components/commit/be6d23b472e1e7ac0dcba5140d9f8a0bd1ce8bdc))
- prevent focus outline ([af2b077](https://github.com/adobe/spectrum-web-components/commit/af2b07704ae01409649be3ee1b45c15463cd9baf))
- prevent Grid clicks from throwing focus unexpectedly ([872e9fd](https://github.com/adobe/spectrum-web-components/commit/872e9fd6c83cbd223430c9c9f7706fe359932038))
- prevent infinite loops when all children are [disabled] ([2deac3d](https://github.com/adobe/spectrum-web-components/commit/2deac3d88ea7f2f27e74d60793e253952d0d765f))
- prevent leaving multiple submenus open at a time ([d2bfbb2](https://github.com/adobe/spectrum-web-components/commit/d2bfbb2d8334ae1a6bd21381092d54914b8f708c))
- prevent longpress when interacting with context menu ([f8b0732](https://github.com/adobe/spectrum-web-components/commit/f8b07321741ee44515fced9923167b96561cdd48))
- prevent mobile interactions from triggering the virtual keyboard ([d06ad17](https://github.com/adobe/spectrum-web-components/commit/d06ad17f12b77f791c8710567ae9bf2d4b26278f))
- prevent reuse of applied IDs when associating Dialogs to their content ([962c3e8](https://github.com/adobe/spectrum-web-components/commit/962c3e8b42a761da0a860a2ec4b9265c847ac536))
- prevent runaway event listeners by not rendering while disconnected ([aa8e8b2](https://github.com/adobe/spectrum-web-components/commit/aa8e8b25bb29ec386de38f12a76fd1eb15d0bc6a))
- prevent tabindex=-1 elements from placing focus on their host ([1ac1293](https://github.com/adobe/spectrum-web-components/commit/1ac12931771c6d5fdbc99f5d214702ed644cb81a))
- prevent touch scolling on non-modal content ([e471feb](https://github.com/adobe/spectrum-web-components/commit/e471febf14e64d35b57ebc0c1596c52282a6ff2a))
- proper overflow rtl support ([9b1c9d4](https://github.com/adobe/spectrum-web-components/commit/9b1c9d4470051e059c8e22b544dee7f46d03593a))
- propogate open to child sp-popover ([ae97677](https://github.com/adobe/spectrum-web-components/commit/ae97677d0db26f4ae68fa47fc561e58490adaf9b))
- pull out rendering for Dialog into individual methods ([84aa3ec](https://github.com/adobe/spectrum-web-components/commit/84aa3ecdf9a4cf6ac6f412e54aa32c99446600c2))
- **radio:** ensure radio-group first selected value is followed ([074bff8](https://github.com/adobe/spectrum-web-components/commit/074bff8466a4bb546c675fb301782bac4c735da5))
- **radio:** process :focus and :focus-visible ([77bc0e9](https://github.com/adobe/spectrum-web-components/commit/77bc0e9f22e9e3d00b7a3d831e59221bc117fd0c))
- **radio:** select in response to arrow keys not focus ([b6acb59](https://github.com/adobe/spectrum-web-components/commit/b6acb59fe4b097c478f09d0b79a76857ccb38066))
- **README:** broken link to documentation site ([1784344](https://github.com/adobe/spectrum-web-components/commit/178434463af47904d424a8d49f61f96095c7baa0))
- reduce cycles ([66a4efb](https://github.com/adobe/spectrum-web-components/commit/66a4efbc55c108e886699ce9dd0eb1c7e57e5a7d))
- reduce cycles ([8917a5e](https://github.com/adobe/spectrum-web-components/commit/8917a5efb28d2e3fcc68c9e25ae98c3b824d7fe4))
- remove ":" based namespacing of events ([d77a843](https://github.com/adobe/spectrum-web-components/commit/d77a843a049a6a37bbeee7bbfb50b4d5eb24f3fd))
- remove "type: "module"" in package.json for node 12 ([c9f76e2](https://github.com/adobe/spectrum-web-components/commit/c9f76e21e24bb844466158fe96512ab19c37c5a9))
- remove `<sp-menu>` usage where deprecated ([387db3b](https://github.com/adobe/spectrum-web-components/commit/387db3be95c98ab220e517fe12a4db7a2496fe5f))
- remove attribute binding logic ([1f6833f](https://github.com/adobe/spectrum-web-components/commit/1f6833f6f1058b7c91aec45ba51330c9dfbe6372))
- remove attribute binding logic ([7bce0ae](https://github.com/adobe/spectrum-web-components/commit/7bce0ae239e55a6479268ab76a992199452c0cb5))
- remove duplicate box-sizing style from storybook-decorator ([3f45dd7](https://github.com/adobe/spectrum-web-components/commit/3f45dd7fbdca6ffd4d811fd4805ad24b885ef09f))
- remove errant readme content, correct icon selector ([3dd1fb1](https://github.com/adobe/spectrum-web-components/commit/3dd1fb1ebd5ce5171345a6c2d4aac08e2d49a5b8))
- remove nothing update ([b066ebc](https://github.com/adobe/spectrum-web-components/commit/b066ebcfa92abe916b7fb7b80b67598042117148))
- remove outdated CEM listing ([2e110d9](https://github.com/adobe/spectrum-web-components/commit/2e110d9f63522efdf93cefc118d54fef4365e5b2))
- remove right click value setting ([a44968d](https://github.com/adobe/spectrum-web-components/commit/a44968d09120ad9b54915438fb5a134f306fdab2))
- remove standard variant from image getter ([97e4713](https://github.com/adobe/spectrum-web-components/commit/97e47132bad276ef2b2989395622dc57d37efb7c))
- remove unused dependencies and imports ([fad4c9b](https://github.com/adobe/spectrum-web-components/commit/fad4c9b3316362b9285a240f64517b80b453835b))
- renamed the file but not this ([ad94e53](https://github.com/adobe/spectrum-web-components/commit/ad94e53a8932b395d916693b147eee3eef4ca043))
- replace missing globby.sync with fg.sync in build:component-inventory ([d180658](https://github.com/adobe/spectrum-web-components/commit/d18065854b321cd709088e9518f0f189a4098b44))
- resolve "updateComplete" with a boolean like LitElement ([2ebcd44](https://github.com/adobe/spectrum-web-components/commit/2ebcd449185a2a26b8ca60441793048a76bb3ed7))
- review deque accessibility testing of docs site ([31f43aa](https://github.com/adobe/spectrum-web-components/commit/31f43aaf0c4092a2aca209538e48417a159dbd0b))
- **search:** ensure "reset" surfaces "input" and "change" events ([d8204a9](https://github.com/adobe/spectrum-web-components/commit/d8204a9cf05605696cab02c1e47edb4fad36e9ed))
- **search:** prevent overflow content from going behind clear button ([956f947](https://github.com/adobe/spectrum-web-components/commit/956f947533fa37cdbd9852ad5ae8eb984e9965f6))
- **shared:** fixes focus-visible types in test ([0dc7d68](https://github.com/adobe/spectrum-web-components/commit/0dc7d6822820bd6fdb53bc21f37b4f8eb55d2bfd))
- **shared:** fixes search input - fixes [#463](https://github.com/adobe/spectrum-web-components/issues/463) ([6833944](https://github.com/adobe/spectrum-web-components/commit/68339448bdcc86dd6478f0f5e78c0b93a75e2110))
- **shared:** further tweaks for test types ([ee45173](https://github.com/adobe/spectrum-web-components/commit/ee45173aec7d755b9fb7af2ef1cd93641de00117))
- **shared:** improves types for focus-visible ([b980f2a](https://github.com/adobe/spectrum-web-components/commit/b980f2af2c6635ec6cb2d367b673b08d8e1c4482))
- **shared:** include an actual entry point for bundlephobia ([00fd6ab](https://github.com/adobe/spectrum-web-components/commit/00fd6abb070e1eddfb8a640f19548289ef6e7acc))
- **shared:** make Focusable pass disabled always ([a339d6f](https://github.com/adobe/spectrum-web-components/commit/a339d6fb2aa9645e7bca5472487618edff5f1182))
- **shared:** prevent focusable returning focus to host ([745f7b0](https://github.com/adobe/spectrum-web-components/commit/745f7b0d23c14efd937e4a0be4d488c5d0865f34))
- **shared:** prevent focusing focusable root on second click ([0fb5006](https://github.com/adobe/spectrum-web-components/commit/0fb50068c844de91134f4dd15e7fef1df5ef354b))
- **shared:** quiet the angry soul of the explicit any linter ([c278263](https://github.com/adobe/spectrum-web-components/commit/c2782634dd0478c20ff3972398909b334aad5cb0))
- **shared:** removes mousedown event handling in focusable ([4e90d4c](https://github.com/adobe/spectrum-web-components/commit/4e90d4c7a8bf2887f372d3e0f38083c2424c4f66))
- **shared:** removes unnecessary global module definition ([07ec506](https://github.com/adobe/spectrum-web-components/commit/07ec50614763640e545204106428d8117a0da88f))
- **sidenav:** add aria-current when using href with sidenav-item ([9172639](https://github.com/adobe/spectrum-web-components/commit/9172639f54cad57111d3ced348a747e8ea5a285a))
- **sidenav:** add support for icons and document icons/headlines ([9ddb363](https://github.com/adobe/spectrum-web-components/commit/9ddb3630020b2ea669411b73fc4ecc9cee917014))
- **sidenav:** manage tabindex when interacting with keyboard ([ea977cf](https://github.com/adobe/spectrum-web-components/commit/ea977cf1ceac9b74fb1789bf8f72bfe1d3c72b03))
- **sidenav:** prevent items with hrefs from toggling expanded or selection ([7ff4920](https://github.com/adobe/spectrum-web-components/commit/7ff4920bc14aac7709f1c588078730aa9054bae3))
- **sidenav:** tighten Spectrum adherence and sharpen docs delivery ([d4c70cd](https://github.com/adobe/spectrum-web-components/commit/d4c70cd73b506cec103ef47bd2ec6f6bacebf9c7))
- simplify focus application in Menu ([6140169](https://github.com/adobe/spectrum-web-components/commit/61401699b36298b6f11cc80703aff664cbb867a7))
- simplify optionsMenu usage and fix tests ([91241b7](https://github.com/adobe/spectrum-web-components/commit/91241b7bddc434c7220fc0fbd65389d0ca38f674))
- simplify touch-action application ([d23f735](https://github.com/adobe/spectrum-web-components/commit/d23f735db3cea01c2243e0485448d1598c6a8692))
- **slider:** add less visually effectacious style to the slider output when editable ([8702294](https://github.com/adobe/spectrum-web-components/commit/8702294fb19da70a70ddadb1e9ed1b401ccc8d91))
- **slider:** add quiet and indeterminate ([8990573](https://github.com/adobe/spectrum-web-components/commit/8990573a4d946920b97117e87f8776c0e7214b04))
- **slider:** allow irregular tick spacing and correct RTL value application ([a83f879](https://github.com/adobe/spectrum-web-components/commit/a83f879bfef87b928452104a47b45201ab30ee89))
- **slider:** allow irregular tick spacing and correct RTL value application ([ca0c937](https://github.com/adobe/spectrum-web-components/commit/ca0c93727aa38ee0558710720d68c5253c1dfbbd))
- **slider:** allow pointer interactions that start at the very begin/end to be tracked ([ff8c95c](https://github.com/adobe/spectrum-web-components/commit/ff8c95c6a1c7be3da0bed162064302591712d275))
- **slider:** allow pointer interactions that start at the very begin/end to be tracked ([28c5ef4](https://github.com/adobe/spectrum-web-components/commit/28c5ef4f31476179d1f4ce9e9bf7fabfb6f21f6e))
- **slider:** allow slot based label content ([d2d474e](https://github.com/adobe/spectrum-web-components/commit/d2d474e9385b3445aff3ca152c70ee12ecf6b3fb))
- **slider:** apply "handle.highlight = true" when using the keyboard to interact with handles ([94e6349](https://github.com/adobe/spectrum-web-components/commit/94e6349a7750b43c455377cb096a24072d668056))
- **slider:** dispatch synthetic pointerdown event ([7dc74af](https://github.com/adobe/spectrum-web-components/commit/7dc74afdda380184906cceadf4eb528b6106792c))
- **slider:** ensure "sp-slider:input" is dispatched appropriately ([ded5440](https://github.com/adobe/spectrum-web-components/commit/ded544078d56d4358e6767e2a68d5151787695da))
- **slider:** ensure min/max/value application order ([80e8cb5](https://github.com/adobe/spectrum-web-components/commit/80e8cb54d0868ce3f4451c3451e95a89b8b5a229))
- **slider:** ensure pointer events on the track and handle act the same ([03adb36](https://github.com/adobe/spectrum-web-components/commit/03adb367fd945c2c07cc8e6179207fc4e654fc0a))
- **slider:** ensure that handles are upgraded before extracting a model from them ([bbbb21f](https://github.com/adobe/spectrum-web-components/commit/bbbb21faba2111480441a30224a3c26ad9858441))
- **slider:** ensure track widths follow dynamic Spectrum CSS values ([5ad1c1a](https://github.com/adobe/spectrum-web-components/commit/5ad1c1aef32cd2988fd86a4c48f19173d6c9c0c2))
- **slider:** ensure value is bound as a property ([96bd01a](https://github.com/adobe/spectrum-web-components/commit/96bd01aacfddfe3a51524c59d346f57e0ac346b0))
- **slider:** fixes usage of aria-valuetext, adds aria-valuenow ([4b25a89](https://github.com/adobe/spectrum-web-components/commit/4b25a89d6018a8929c3b777cc196354d93d0af69))
- **slider:** make implicit dependency on sp-slider-handle explicit ([cb8d84b](https://github.com/adobe/spectrum-web-components/commit/cb8d84b55beb968fcb92198854321d66ce01cbf4))
- **slider:** manage focus more like a native rage input ([865115e](https://github.com/adobe/spectrum-web-components/commit/865115e1e43e164952eeca01b473c9606762377a))
- **slider:** manage value and max changing in unison ([4359fbe](https://github.com/adobe/spectrum-web-components/commit/4359fbee9ce545064f35aee5e0c6a1dadd11ddd6))
- **slider:** prevent pointercancel events by container touch-action ([4687d03](https://github.com/adobe/spectrum-web-components/commit/4687d03c2b1ea1de3cb76d6ed3782e56153d271f))
- **slider:** prevent pointercancel events by container touch-action ([9f55520](https://github.com/adobe/spectrum-web-components/commit/9f555207da4ae26b65cf02aebf2f0783adb33d8c))
- **slider:** renamed flag from stepperActive to managed input to allow verified (scroll) input event ([89d6ac5](https://github.com/adobe/spectrum-web-components/commit/89d6ac5a197c55ff8dae9932996fbb8c953bcfb2))
- **slider:** response to orientation changes when measuring the bounding box ([c1412f1](https://github.com/adobe/spectrum-web-components/commit/c1412f19a5e91dd518b51277d3bbed3aff6dafac))
- **slider:** simplify application of the gradient backgrounds ([f96a97e](https://github.com/adobe/spectrum-web-components/commit/f96a97eafab63358de3b438d84a2af521250f4ed))
- **slider:** support customizing visible label delivery ([a55b585](https://github.com/adobe/spectrum-web-components/commit/a55b58517f0f20df356a523a14550d8870b7282a))
- **slider:** support non-supported units in "Intl.numberFormat" ([ac32355](https://github.com/adobe/spectrum-web-components/commit/ac32355f3d6459937b025d2fce9f006b0226622e))
- **slider:** update a11y tree and default max value ([3cbf222](https://github.com/adobe/spectrum-web-components/commit/3cbf222386d53cdd77847bb9093f494e542c9195))
- **slider:** use internal "input" for value sanitation ([dd588c9](https://github.com/adobe/spectrum-web-components/commit/dd588c93003a9e9c10da4832590403ebc9e46020))
- **slider:** use standard "change" and "input" events ([59cf786](https://github.com/adobe/spectrum-web-components/commit/59cf7866a9b7b7368ccf01d237534a495274af32))
- **slider:** work around Spectrum CSS bug in variant="range" styling ([e5810a9](https://github.com/adobe/spectrum-web-components/commit/e5810a9c8304f90a2d6f78ea9f1c911fb37d037f))
- slot documentation ([0ebd260](https://github.com/adobe/spectrum-web-components/commit/0ebd2609bad9e95ee24428cb2fa666d23bdb85f8))
- special case the possibility of leaving an overlay trigger by entering its overlay content ([c32a075](https://github.com/adobe/spectrum-web-components/commit/c32a075e0e80d89e9c71dea4a9529971691c1098))
- split-button tests & lots of cleanup based on review feedback ([10b4a04](https://github.com/adobe/spectrum-web-components/commit/10b4a04c5791d1acd9e59d48a8960b9c17aa89c7)), closes [#1189](https://github.com/adobe/spectrum-web-components/issues/1189)
- **split-button:** correct style application ([a954fdf](https://github.com/adobe/spectrum-web-components/commit/a954fdf9994aa20045e152860bdc2f3153c4af16))
- **split-button:** follow visible tab order ([966d3b6](https://github.com/adobe/spectrum-web-components/commit/966d3b601a1eda5bf45394fad3bb7d100c7d3b84))
- **split-button:** hide "selected" item from menu ([322a966](https://github.com/adobe/spectrum-web-components/commit/322a96655855f42b390ba2c94d0b017bf93aebd9))
- **split-button:** remove "popover" from render path ([f1cd7ca](https://github.com/adobe/spectrum-web-components/commit/f1cd7ca79f175c4d0c344c4056638f7b1548c3d9))
- **split-button:** test a11y correctly, find issues, fix them ([4283994](https://github.com/adobe/spectrum-web-components/commit/4283994e0456813ee53be4a1bfd6b53965e41433))
- **split-view:** end drag on pointerleave ([85e5258](https://github.com/adobe/spectrum-web-components/commit/85e525827a8aabcb4ebf441f05b7e1789b590b8b))
- **split-view:** prevent touch-action on handle for delivery in mobile ([b68c497](https://github.com/adobe/spectrum-web-components/commit/b68c4975424039322a2d03978983898b07b91824))
- **split-view:** redraw when primary-size change ([665d238](https://github.com/adobe/spectrum-web-components/commit/665d2384ca7f43d89fd7e2b7b3fb7536a5e24df8))
- **status-light:** extend docs and styling for [disabled] ([3d9fd16](https://github.com/adobe/spectrum-web-components/commit/3d9fd16256dea767183bdfb3cedd431427c15c7f))
- **status-light:** manage aria-disabled from disabled attribute ([8bc9be7](https://github.com/adobe/spectrum-web-components/commit/8bc9be7bc469801b496997757d0158bd55e45996))
- **status-light:** review comments for status-light ([80caa08](https://github.com/adobe/spectrum-web-components/commit/80caa083eb3958c0260c1d1dc92578d1710abd89))
- **status-light:** update version in bundle pjson ([a8eabdb](https://github.com/adobe/spectrum-web-components/commit/a8eabdb95b70cb21cf58423385df295ec013c1fc))
- stop merging selectors in a way that alters the cascade ([369388f](https://github.com/adobe/spectrum-web-components/commit/369388f8cc147543891087991c569f849ddb9b38))
- stop merging selectors in a way that alters the cascade ([532304f](https://github.com/adobe/spectrum-web-components/commit/532304f3f5c12ed1daef0c8f227b8e82b1a7173e))
- stop propagation of sp-radio "change" events at sp-radio-group boundary ([f618460](https://github.com/adobe/spectrum-web-components/commit/f618460f41c760481b14580eeb73c2202f13d279))
- **story-decorator:** ensure reduce motion application in overlays ([3f1bc23](https://github.com/adobe/spectrum-web-components/commit/3f1bc23bb2e87dedd285915c034ea497a0271d07))
- **story-decorator:** use sp-field-label ([5992c98](https://github.com/adobe/spectrum-web-components/commit/5992c98024bbb9476a18c4a69a024968c05cac17))
- style clean up ([49e1537](https://github.com/adobe/spectrum-web-components/commit/49e15377f3a839d0ed5dc2504dd71396aa156eb5))
- style icons in Picker correctly ([0bbdf84](https://github.com/adobe/spectrum-web-components/commit/0bbdf84df595a573b355721698262b1c5a1f3b01))
- **styles:** add basic color-scheme support ([1ccf110](https://github.com/adobe/spectrum-web-components/commit/1ccf110e75890ecaaa7f160fce09ffeb15c570a3))
- **styles:** ensure ",map" file inclusion in the published package ([54a2b13](https://github.com/adobe/spectrum-web-components/commit/54a2b130d5ec943807429420460ffbd93f033d25))
- **styles:** move `@spectrum-web-components/base` from devDependencies to dependencies ([246411c](https://github.com/adobe/spectrum-web-components/commit/246411c63c96cfdabee5ee6ee36659f25cc4e0d4))
- **styles:** process CSS in package for use directly in a browser ([cf52924](https://github.com/adobe/spectrum-web-components/commit/cf52924404112e44a0abc6eacd4092f3ca4a9ea1))
- **styles:** process CSS in package for use directly in a browser ([d85779f](https://github.com/adobe/spectrum-web-components/commit/d85779f24b29a62f8ee086f5a2cd72b47792c18a))
- **styles:** update exports listing ([535113d](https://github.com/adobe/spectrum-web-components/commit/535113daf33b4bdecda6874f45c44469927469ec))
- support --spectrum-global-dimension-dividers token ([59fda81](https://github.com/adobe/spectrum-web-components/commit/59fda81db6e2e43c0c51f719b17fb5eba64ff242))
- support a wider number of sizes ([ee44978](https://github.com/adobe/spectrum-web-components/commit/ee4497830da0d3bc63d4414ad5548291a39588c7))
- support matching keydown to [dir] ([70b40a9](https://github.com/adobe/spectrum-web-components/commit/70b40a9d3bb5fe2d12208365abf132260270721b))
- support non-flat "color" application ([efc0159](https://github.com/adobe/spectrum-web-components/commit/efc0159d9be10cdfd497a630a2eb4195cd612927))
- swap the order here so the variables are defined first ([01d8724](https://github.com/adobe/spectrum-web-components/commit/01d87246b83807ae560ff2fa3ea71e7f38675d24))
- **swatch:** normalize repeat selection of same item in "selects=single" ([ee0fb0c](https://github.com/adobe/spectrum-web-components/commit/ee0fb0c60cda72f4a7896444f27ffab06c49986d))
- **swc-templates:** ensure the styles filename is correct ([13916ab](https://github.com/adobe/spectrum-web-components/commit/13916ab9cbe8fe22ee09fd98fa85740956f8331d))
- **swc-templates:** update naming, imports, and dependencies ([12d43ed](https://github.com/adobe/spectrum-web-components/commit/12d43ed82ae97d706eecfe31515c616562848366))
- switch to heading/subheading instead of title ([d182a0f](https://github.com/adobe/spectrum-web-components/commit/d182a0f829b21296f07b50f37c8aecda2c0ed137))
- **switch:** process CSS correction ([292fff1](https://github.com/adobe/spectrum-web-components/commit/292fff19a14225f579e5e8b4717b7db3a33895c4))
- **switch:** track aria-checked ([1980046](https://github.com/adobe/spectrum-web-components/commit/1980046ab0f791bfe1e147c855f43ddf2d2a424e))
- tab indicator positioning ([8c20769](https://github.com/adobe/spectrum-web-components/commit/8c20769030c3c90620f1f2e397f5f5b83b2a49c9))
- **tab-list:** add support for "vertical-right" ([da740c0](https://github.com/adobe/spectrum-web-components/commit/da740c0755e1434c75f65b3dffa455881f8776a1))
- **tab-list:** correct specificity collision ([622887e](https://github.com/adobe/spectrum-web-components/commit/622887eb596b7d193e077a3db8865cdfea557845))
- **tab-list:** hide indicator without selection, listen to resize events ([feadf3c](https://github.com/adobe/spectrum-web-components/commit/feadf3cbaf5bde7a743c0ae5b8fd3b090bcd9eca))
- **tab-list:** position the indicator correctly when sized ([e956758](https://github.com/adobe/spectrum-web-components/commit/e9567582369a94557657e4bf62e3aeebbcf0b586))
- **tab-list:** remove logging ([dc73329](https://github.com/adobe/spectrum-web-components/commit/dc73329469c044f9bfcb91b8cfa4fcb3a6259316))
- **tab-list:** size indicator on font load, click/focus ring management ([254815b](https://github.com/adobe/spectrum-web-components/commit/254815bae485964cd3ab4549f73da000600775ee))
- **tab-list:** transition indicator "width" as well as position ([b26ab76](https://github.com/adobe/spectrum-web-components/commit/b26ab765e3eabdf1dc56a09e3a9f38e30d6ddbcc))
- **tab:** allow icon only, expand visual regression suite ([a167550](https://github.com/adobe/spectrum-web-components/commit/a167550ed8c4324f68d03b35b1cc41ed510958f5))
- **table:** add resize controller to TableBody for a11y reasons ([85dd406](https://github.com/adobe/spectrum-web-components/commit/85dd4066328afeacf978acc3fc9acd57436900a1))
- **table:** allow "change" events from table row content ([97699a0](https://github.com/adobe/spectrum-web-components/commit/97699a05f1845ea627814e012ed880b411855446))
- **table:** allow tablebody to be resized via flex-grow ([f797202](https://github.com/adobe/spectrum-web-components/commit/f797202501d81ff878b500551b6ca6fbb5022e76))
- **table:** update element tag in sp table sub components ([4e94d70](https://github.com/adobe/spectrum-web-components/commit/4e94d709b85eec887bf2f39ae4f3057dd67e5868))
- **table:** update sp-table import in elements.js ([0cfe25a](https://github.com/adobe/spectrum-web-components/commit/0cfe25a971520ae0cf6d57de0fe14430b53b72bb))
- **tabs:** add "emphasized" and correct WHCM delivery ([27940bd](https://github.com/adobe/spectrum-web-components/commit/27940bde2444040910bf772c757514fbabdee85c))
- **tabs:** add "quiet", "compact", and "emphasized" "direction=vertical" ([26fff53](https://github.com/adobe/spectrum-web-components/commit/26fff53d8d64c508be66406d00e6e45e48c15278))
- **tabs:** add "tablist" part to manage list styles ([bbf8074](https://github.com/adobe/spectrum-web-components/commit/bbf8074b177f51929ec3bddbffcd2c22ad1971b5))
- **tabs:** added test ([7d5f41f](https://github.com/adobe/spectrum-web-components/commit/7d5f41f74d2467e9d12a1a2328db1ff3dd6a8a71))
- **tabs:** bind tabindicator update to dir value ([09598b5](https://github.com/adobe/spectrum-web-components/commit/09598b59f1198b7ebc8067834681000ceee0918e))
- **tabs:** bind tabs overflow state with sp-tabs ([a07c45b](https://github.com/adobe/spectrum-web-components/commit/a07c45bdce27a7b0bed3faf46bd638ebab9b42d9))
- **tabs:** bind tabs overflow state with sp-tabs ([570a2cd](https://github.com/adobe/spectrum-web-components/commit/570a2cdaf282ef0f565574c65eef619c82ef2a60))
- **tabs:** correct entry focus element ([64407d3](https://github.com/adobe/spectrum-web-components/commit/64407d37fd09d3d598253a66c3b342882d51a826))
- **tabs:** correct indicator size by scaling from 100px ([a3fb68b](https://github.com/adobe/spectrum-web-components/commit/a3fb68bb8103bc87a9c1e14e3bca8a5476e3a2f1))
- **tabs:** ensure only one active tab stop in the tabs ([68b2523](https://github.com/adobe/spectrum-web-components/commit/68b2523d2287ad8bdb82d2c8b0e79b30129317c4))
- **tabs:** ensure tabs has layout ([7aba515](https://github.com/adobe/spectrum-web-components/commit/7aba51561965342ea3e18404621659aa32c2ed8f))
- **tabs:** ensure that "auto" attribute is respected ([d200775](https://github.com/adobe/spectrum-web-components/commit/d20077516fadeb42b8814416f87689254e4e0381))
- **tabs:** error on click - undefined tab target ([9742227](https://github.com/adobe/spectrum-web-components/commit/974222739745e1a8c082ed77e3e68199907f7890))
- **tabs:** include sp-tab-panel.js in the export map ([1619ae8](https://github.com/adobe/spectrum-web-components/commit/1619ae876d70d35eaff38aa955f3cd307f4a5c54))
- **tabs:** manage disabled state on tabs and tab elements ([58def1f](https://github.com/adobe/spectrum-web-components/commit/58def1fd7a724cc078459c56f39c19ebe2005f97))
- **tabs:** update css workarounds ([c2a17e0](https://github.com/adobe/spectrum-web-components/commit/c2a17e02ac019dc7a28411bdc2f666f8c27c26b8))
- **tab:** use Spectrum CSS relative values for overrides ([f2e22f8](https://github.com/adobe/spectrum-web-components/commit/f2e22f8954c583159b96e32185a307da36578172))
- **tags:** correct render types ([ecfb6ab](https://github.com/adobe/spectrum-web-components/commit/ecfb6abc15a0e826c5c5087898f76109749e83fb))
- **tags:** gate focus with deletable attribute ([d5e79f6](https://github.com/adobe/spectrum-web-components/commit/d5e79f667daaac9cde47a4fa717cb42edb73332e))
- **tags:** support distant sibling selectors ([a8dcf7f](https://github.com/adobe/spectrum-web-components/commit/a8dcf7fb4d30a1bf0e0cdc3ac5e044d75701c5fa))
- tests weren't fully updated ([22bf3b1](https://github.com/adobe/spectrum-web-components/commit/22bf3b14d304a9106525a05a8c0dc16834648356))
- **textfield:** add 'u' flag to keep consistency with native input element ([0af779f](https://github.com/adobe/spectrum-web-components/commit/0af779f040ebe1b2b2a80a19afe1df42201dbe3e))
- **textfield:** add maxlength and minlength attributes ([5326649](https://github.com/adobe/spectrum-web-components/commit/5326649daac788e922a4493b9172cc20518b8abb))
- **textfield:** add select() API mapping to shadow DOM element ([d467a34](https://github.com/adobe/spectrum-web-components/commit/d467a3463f326d839c9d51ffacd24f8fdfb1aff1))
- **textfield:** break very long words within the Textarea's sizer element ([2f95ac0](https://github.com/adobe/spectrum-web-components/commit/2f95ac04a3ad3c200172cd3c364c9014c7d6dfde))
- **textfield:** correct "multiline" and "grows" delivery ([fa0ac34](https://github.com/adobe/spectrum-web-components/commit/fa0ac3437b269f009ef47d080b41996fe0a25779))
- **textfield:** leverage aria-invalid attribute ([e718c0a](https://github.com/adobe/spectrum-web-components/commit/e718c0ac0d9f037b2bb9c6fb53ffc2121298731a))
- **textfield:** prevent IME selection misalignment in Safari when using hiragana input modality ([f8e1e70](https://github.com/adobe/spectrum-web-components/commit/f8e1e709e99d62e67589d8f54f15d49a9ecf2f32))
- **textfield:** process ".is-focused" and ".is-keyboardFocused" styles ([48fd67d](https://github.com/adobe/spectrum-web-components/commit/48fd67d7cdab3aac26c20a8e9232d6320b27fb59))
- **textfield:** process ".is-focused" and ".is-keyboardFocused" styles ([9fe6a42](https://github.com/adobe/spectrum-web-components/commit/9fe6a42fe6d0397cf0a857f3161d4a4851359989))
- **textfield:** reimplement min/maxlength ([23a4c2e](https://github.com/adobe/spectrum-web-components/commit/23a4c2e61dbc399bf9e58bb32952e16b8aa9d5ae))
- **textfield:** remove use of sp-icons-\* ([9a5c213](https://github.com/adobe/spectrum-web-components/commit/9a5c213a886146709601a2878484529c315d9f51))
- **textfield:** respect resize styling ([04993c3](https://github.com/adobe/spectrum-web-components/commit/04993c380d485b0e9b02fd6ad196e5caaf29e0a2))
- **textfield:** respect type=text|url|tel|email|password ([1b7a59a](https://github.com/adobe/spectrum-web-components/commit/1b7a59a208ce00a62c23c80b75bacabf73c3e6ea))
- **textfield:** update for easier extensibility ([9deaf9e](https://github.com/adobe/spectrum-web-components/commit/9deaf9e4f5a476593378f8feaaae352fd8bb80d7))
- **textfield:** update validation path, add "allowed-keys" ([ae9f85d](https://github.com/adobe/spectrum-web-components/commit/ae9f85d3b0ec30bbcf5fbe3d4750a1cd96c990d5))
- **textfield:** Use correct filename in exports field ([637b166](https://github.com/adobe/spectrum-web-components/commit/637b166420e3a0fa41980bfbb24129df77ff4efd))
- **theme:** include "large" scale ([67577e7](https://github.com/adobe/spectrum-web-components/commit/67577e73b973b4ff28ebd9c0ccba15485b1be5c9))
- **theme:** make typescript happy ([a9aa377](https://github.com/adobe/spectrum-web-components/commit/a9aa377aeae134d888c00d9a54d8b25d631adf61))
- **theme:** prevent property sets attribute set property stack overflow ([28d8a07](https://github.com/adobe/spectrum-web-components/commit/28d8a07a9f614cfd59787bb248cf99bd45042806))
- **theme:** stop language resolution propagation and demo using local languages ([6b81391](https://github.com/adobe/spectrum-web-components/commit/6b81391c3e4416889daa5627526dc0194f2f5f56))
- **theme:** support lazily loading theme fragments ([3c3b634](https://github.com/adobe/spectrum-web-components/commit/3c3b634a21d2cdce43b841c301932a505c140a58))
- **theme:** track default theme values dynamically ([a0c306c](https://github.com/adobe/spectrum-web-components/commit/a0c306c9682d97cefa1258e01ce6eee179f0e071))
- **theme:** Use correct filename in exports field ([d5da506](https://github.com/adobe/spectrum-web-components/commit/d5da506e5d4125a39492df2b1682d7129b89ca07))
- these selectors didn't actually change ([a5ac275](https://github.com/adobe/spectrum-web-components/commit/a5ac275dfc9873ba65abf7a4d9631cc67fd65aa1))
- **toast:** ensure "close" event only triggers when open===false ([7fa08ba](https://github.com/adobe/spectrum-web-components/commit/7fa08ba4b6bf45d28e90d70cd3238df94c8fb7a7))
- **toast:** include dependencies ([1b82212](https://github.com/adobe/spectrum-web-components/commit/1b82212487dddf4c703e98c60ff94c708d60438a))
- **tooltip:** correct arrow orientation, remove popper-arrow-rotate ([fcd6ea2](https://github.com/adobe/spectrum-web-components/commit/fcd6ea28ef5e4f06a07994ebd8f8b9be1a934eb2))
- **tooltip:** ensure delayed and self-managed tooltips do not disrupt the page layout ([0f43b25](https://github.com/adobe/spectrum-web-components/commit/0f43b250f81ea8208a350792363f56d14cae7716))
- **tooltip:** manage describedby attributes non-destructively ([8443136](https://github.com/adobe/spectrum-web-components/commit/8443136776b3f2b5f15dca8d640d2e691f0fece0))
- **top-nav:** ensure focus state in all contexts ([6de83be](https://github.com/adobe/spectrum-web-components/commit/6de83be28811979284044a395f9cbf9b984f97c6))
- **top-nav:** initialize nav with an undefined selection ([3473f63](https://github.com/adobe/spectrum-web-components/commit/3473f635facb6f22e92d329f7bf018f4eb1a9852))
- **top-nav:** initialize nav with an undefined selection ([d801d64](https://github.com/adobe/spectrum-web-components/commit/d801d641252c3bd1febfdc431b9beeec43fc5118))
- **top-nav:** match indicator management strategy from Tabs ([ecc76a0](https://github.com/adobe/spectrum-web-components/commit/ecc76a0cd824c6a26be61e26dfe5455a711ded05))
- **top-nav:** minor edits to description, typos ([bc2ee48](https://github.com/adobe/spectrum-web-components/commit/bc2ee48ba172aa37f23cae335599cffcb7637673))
- **top-nav:** prototype top-nav pattern ([9708f6f](https://github.com/adobe/spectrum-web-components/commit/9708f6f63e080c0ec91c11763d3121a407349d1a))
- **tray:** add tray pattern ([0915fa5](https://github.com/adobe/spectrum-web-components/commit/0915fa5e3c7eecc1608ce3b706fbae01b3ee3608))
- **tray:** include correct dependency listing ([51cb231](https://github.com/adobe/spectrum-web-components/commit/51cb2315ebd44ec299d2562d9c5fad31ce361083))
- update "reparentChildren" types for flexibility ([2d358be](https://github.com/adobe/spectrum-web-components/commit/2d358be094cf73785d0858545ccd0f9ca2aa8db0))
- update colour slider ([9acda67](https://github.com/adobe/spectrum-web-components/commit/9acda673d98e39a9928166806926689020dc0577))
- update configuration for Spectrum CSS processing for specificity ([5c2e21e](https://github.com/adobe/spectrum-web-components/commit/5c2e21ed68d94a75cac0cc248925cc5bca35cc25))
- update consumption of Spectrum CSS for latest version ([ed2305b](https://github.com/adobe/spectrum-web-components/commit/ed2305b7334c973ea5c8299cbbce33a365896329))
- update export patterns ([b2da444](https://github.com/adobe/spectrum-web-components/commit/b2da444359b4022ed3f61dedf563b5bacba42103))
- update file path access ([8898bf7](https://github.com/adobe/spectrum-web-components/commit/8898bf707e6e28abb78c92a0a0858d459e65347b))
- update indicator animation for loading and content direction ([f607f8b](https://github.com/adobe/spectrum-web-components/commit/f607f8b4fca280b7aa5eae835554ea62845abd1c))
- update latest Spectrum CSS beta releases ([d8d3acc](https://github.com/adobe/spectrum-web-components/commit/d8d3acc86de31e58219db6ba2a9d045b83cbe103))
- update latest Spectrum CSS beta releases ([11b47df](https://github.com/adobe/spectrum-web-components/commit/11b47df686b641a9d4fb5cc1d36fc5989f2a4c6e))
- update method extension types to match ([6eb686f](https://github.com/adobe/spectrum-web-components/commit/6eb686fbc7ad336ec245fbf2edd6aa769486533c))
- update package.json ([455b626](https://github.com/adobe/spectrum-web-components/commit/455b62649aebfd0d325768563a094c45f96a2569))
- update Picker label via MutationObserver instead of "slotchange" ([196998e](https://github.com/adobe/spectrum-web-components/commit/196998e9433dc938d86bfbe77db9e3accd6d9bbc))
- update presence confirmation so popper is available on update ([24f8380](https://github.com/adobe/spectrum-web-components/commit/24f83800a2011f9181947795d9249b87be99f8ab))
- update role application logic to not overwrite menu\* roles ([94b6aec](https://github.com/adobe/spectrum-web-components/commit/94b6aecffc1e5686feab09361d4e07ec3e854726))
- update screen reader interface with menu items list ([16756b5](https://github.com/adobe/spectrum-web-components/commit/16756b56c0f7f9561426acc202997fb098e8f19a))
- update side effect listings ([8160d3a](https://github.com/adobe/spectrum-web-components/commit/8160d3ab2c4f5ea11ac40897a5cf1fdaa357f4a8))
- update slotting in "sp-sidenav-item" to allow for labelling in HTML ([928c476](https://github.com/adobe/spectrum-web-components/commit/928c476294c482f1d3acf1b787ef995f960edcbb))
- update spelling ([283d10a](https://github.com/adobe/spectrum-web-components/commit/283d10acf09f1c3a2575d5dd263559d0c63a69fa))
- update the ci visual baselines ([dc9cf05](https://github.com/adobe/spectrum-web-components/commit/dc9cf05f5f906f1bd89f993983cd393e29fcbbf5))
- update timing to support non-virtualized rows ([11ff752](https://github.com/adobe/spectrum-web-components/commit/11ff7523b1f9901b517d7180288cc995ce20c680))
- update to latest spectrum-css packages ([a5ca19f](https://github.com/adobe/spectrum-web-components/commit/a5ca19f67d5b3f0951667c4441d4d977bf1e0937))
- update when events are added to manage overlays ([60cddac](https://github.com/adobe/spectrum-web-components/commit/60cddac69554d00095aee492608d85d6513c8928))
- updating spectrum-config to support new label styles ([cefeaad](https://github.com/adobe/spectrum-web-components/commit/cefeaade098d246f7b222e54de5ff8becf42d315))
- use "fixed" strategy to prevent unexpected overlay placement ([e39e108](https://github.com/adobe/spectrum-web-components/commit/e39e108def1336adabb21823d1454e917fd38599))
- use CSS Custom Property name supplied by Spectrum for dividers ([e6977c3](https://github.com/adobe/spectrum-web-components/commit/e6977c341cb61b7e99020afdcb739ecc2722bc57))
- use CSS position relative and revert Tabs.ts changes ([a682bcf](https://github.com/adobe/spectrum-web-components/commit/a682bcf149bc8d7e09875838323145883dbd3cbd))
- use height: 100% to avoid layout breaks ([1498129](https://github.com/adobe/spectrum-web-components/commit/14981291e6d860a8fde7e1746a4a03af4df1e572))
- use hue normalized color in handle and allow focus ([f9e1fa2](https://github.com/adobe/spectrum-web-components/commit/f9e1fa24afd091334341610a49331fc0ec5f8573))
- use icons without "size" values ([3fc7c91](https://github.com/adobe/spectrum-web-components/commit/3fc7c91713793a928082eae15fc3d9dec638a31a))
- use latest @spectrum-css/\* versions ([c35eb86](https://github.com/adobe/spectrum-web-components/commit/c35eb86defd89a0c36b5ea186f6d40f20851b5e5))
- use latest @spectrum-css/\* versions ([d0d67a2](https://github.com/adobe/spectrum-web-components/commit/d0d67a2abb1c4dda0a1b1ca0ffa133bf62e4110e))
- use latest @spectrum-css/thumbnail with built in "cover" support ([d152b4e](https://github.com/adobe/spectrum-web-components/commit/d152b4ec2e62201f1675c95fb08083768ab5a6e1))
- use less restrictive overlay sizing ([f6917aa](https://github.com/adobe/spectrum-web-components/commit/f6917aa4ca22360ba66e40fc933c0e994a04b8c9))
- use local declaration of ShadowRoot.adoptedStyleSheets ([43f1c63](https://github.com/adobe/spectrum-web-components/commit/43f1c63fb920d0f750226f2e567e03e4dcba7a79))
- use ObserveSlotText mixin to prevent white space from overriding label attribute ([610fb4b](https://github.com/adobe/spectrum-web-components/commit/610fb4b5b392b7e3673c7d46bf8f9f5f79f27ca9))
- use the "browsers" listing in postcss-preset-env ([4eaf6a2](https://github.com/adobe/spectrum-web-components/commit/4eaf6a28f7b5eaf60487841d264d6d804ae675ce))
- use type="search" for nicer virtual keyboards ([c439eb3](https://github.com/adobe/spectrum-web-components/commit/c439eb3b5d0b9dbc628691a5215d65c936c3939e))
- use typescript@^4.5 for "native" document.fonts typings ([a3e4aea](https://github.com/adobe/spectrum-web-components/commit/a3e4aea802c796e9029b2bc32f58639954db831b))
- visual test name change ([a06676a](https://github.com/adobe/spectrum-web-components/commit/a06676a562f818c564d11ed14f0733c81913c5e3))
- wait for fonts ready before positioning overlays ([cb8026a](https://github.com/adobe/spectrum-web-components/commit/cb8026a1999a4458b442673291214269fc1e1cef))
- work around icon positioning error in CSS source ([ef5271c](https://github.com/adobe/spectrum-web-components/commit/ef5271c208569b44166b00692baa2caeb0a30d27))
- workaround bug in Edge with switches ([7014a2c](https://github.com/adobe/spectrum-web-components/commit/7014a2cced96a704589a85f4c23f5b3d5519fb3b))

### Features

- **accordion:** add accordion pattern ([97529d8](https://github.com/adobe/spectrum-web-components/commit/97529d848eaa1ea4c0d0a7770f7c73927687256b))
- **accordion:** allow accordion items to close ([3c715ab](https://github.com/adobe/spectrum-web-components/commit/3c715abc4038b1baeb2412613cc0acdd194c0e2d))
- **accordion:** allow accordion items to close ([e930e43](https://github.com/adobe/spectrum-web-components/commit/e930e432e2a814fef77c06085db5fa0be04e1221))
- **accordion:** update spectrum css input ([d94e059](https://github.com/adobe/spectrum-web-components/commit/d94e059a8735405fedc5615bc9c66e4f71120e4d))
- **action-bar:** create sp-action-bar component to replace sp-actionbar ([38004b4](https://github.com/adobe/spectrum-web-components/commit/38004b472a69302e3592add04b746ca01e44557d))
- **action-button:** add action button pattern ([03ac00a](https://github.com/adobe/spectrum-web-components/commit/03ac00a710290e6a78340f206d88385a4f8ae8c2))
- **action-group:** add action-group pattern ([d2de766](https://github.com/adobe/spectrum-web-components/commit/d2de766efde6dfbaa1cd604f99ae3128b4fc81b5))
- **action-group:** manage "one" and "multiple" selections ([6fad59e](https://github.com/adobe/spectrum-web-components/commit/6fad59e0df1210108fe6b54ab075c0cbd94cae78))
- **action-group:** update spectrum css input ([9840b19](https://github.com/adobe/spectrum-web-components/commit/9840b19576510d417387194846fb3aa6e4228759))
- **action-group:** use core tokens ([73f3b51](https://github.com/adobe/spectrum-web-components/commit/73f3b51becf3c20c387bdf00b4cd54b8839a12da))
- **action-menu:** allow icon customization ([cffd49a](https://github.com/adobe/spectrum-web-components/commit/cffd49ac8f81be77b9bd378e3e249157a22efa74))
- **action-menu:** remove menu selection by default ([54d636f](https://github.com/adobe/spectrum-web-components/commit/54d636f0206e8fa7dd67a465de643e6dd9fc29cf))
- **action-menu:** update spectrum css input ([62a5065](https://github.com/adobe/spectrum-web-components/commit/62a50651a3c797598f8d76330e87f2824cdabbc5))
- **actionbar:** add actionbar component package ([36dd7e9](https://github.com/adobe/spectrum-web-components/commit/36dd7e943a8b825b947f0053ddbe31b69ca27062))
- **actionbar:** update spectrum css input ([8c888aa](https://github.com/adobe/spectrum-web-components/commit/8c888aa883490fe8e6a070f799095284128a609a))
- add "darkest" theme styles ([fe38025](https://github.com/adobe/spectrum-web-components/commit/fe38025d2b631f07834789c936efe7ffcbc1a628))
- add and use icons-ui package ([d9c3ab2](https://github.com/adobe/spectrum-web-components/commit/d9c3ab212b4f756334e857fc513ccbf0a4dff9cc))
- add badge component ([cabfdfe](https://github.com/adobe/spectrum-web-components/commit/cabfdfe7b7eb00c3868ec26afab524cef1c2fcbd))
- add dialog, dialog-wrapped, and underlay elements ([3df9050](https://github.com/adobe/spectrum-web-components/commit/3df9050f65bd3a95f9b986aa728cfc1a2eaee432))
- add Help Text pattern ([fdbb812](https://github.com/adobe/spectrum-web-components/commit/fdbb812e05a1202e5b5912a5e93cfba59a3dae9e))
- add open/close events for some menus and overlays ([17f0a58](https://github.com/adobe/spectrum-web-components/commit/17f0a58722fdfee39653c2abde048391f7f24564))
- add Picker Button pattern ([31337b8](https://github.com/adobe/spectrum-web-components/commit/31337b86acdade3d93bea44a781ad0ea7042ca32))
- add plop templating to get started fast ([2b415bf](https://github.com/adobe/spectrum-web-components/commit/2b415bf7332156eb84cf7d885fe06ccc3ef2fc17))
- add reactive controllers package ([d434e9d](https://github.com/adobe/spectrum-web-components/commit/d434e9df151991bac031a0e8c1bde10ebecb5047))
- add screenshot regression testing to CI ([8205dfe](https://github.com/adobe/spectrum-web-components/commit/8205dfe33c725e13f74f411779c2ff3b6061a913))
- add selects attribute to menu ([bdf2578](https://github.com/adobe/spectrum-web-components/commit/bdf25780e56c7b92368904dce2a02f2594c364a2))
- add support for replacement of complexSelectors in CSS processsing ([bbbe391](https://github.com/adobe/spectrum-web-components/commit/bbbe39110980be73645677f0b79b8b43b5643795))
- add support for Spectrum Express ([12bfe99](https://github.com/adobe/spectrum-web-components/commit/12bfe99570122514fa88ce1a4e4a1591bcc5aa70))
- add swatch pattern ([0cdc04b](https://github.com/adobe/spectrum-web-components/commit/0cdc04b1506ab0c9f675fea6e72020bb8957065f))
- add t-shirt sizing to the Radio pattern ([fc49343](https://github.com/adobe/spectrum-web-components/commit/fc49343311d4ff95699b455c451514cb7fc62a45))
- add t-shirt sizing with visual regressions to checkbox and picker elements ([ce47ec8](https://github.com/adobe/spectrum-web-components/commit/ce47ec88bd2c6c8d236c05826d28b2d0dadf12b8))
- adopt DNA@7 base Spectrum CSS ([e08cafd](https://github.com/adobe/spectrum-web-components/commit/e08cafda9f1b33b0163fbe5ba66754806be8f9e4))
- allow activation of longpress content ([55e71fd](https://github.com/adobe/spectrum-web-components/commit/55e71fdf9fd5dde489871c3d9798ef8957f4e5b6))
- allow CSS processing to manage :host(:before) ([bee3ca1](https://github.com/adobe/spectrum-web-components/commit/bee3ca1152e8b1ed89816f581393b1cc45ac5321))
- allow dir management by sp-theme elements ([2d10158](https://github.com/adobe/spectrum-web-components/commit/2d1015883bc0c3a03862c0de8b4d996cd954291f))
- allow slotted title for card ([aaf7157](https://github.com/adobe/spectrum-web-components/commit/aaf7157de6070a49bcdcc591f62c85a56622acfb))
- apply sizedMixin for t-shirt sizing ([d7b63fb](https://github.com/adobe/spectrum-web-components/commit/d7b63fb0db06b5a8a412fea8370964f4db9d18ae))
- **asset:** add the asset pattern ([a7c00bb](https://github.com/adobe/spectrum-web-components/commit/a7c00bbd591587a13b8d941885a19047e3d1cae7))
- **asset:** update spectrum css input ([b3f0d70](https://github.com/adobe/spectrum-web-components/commit/b3f0d7045d1436ad0f8386faba09d185a7757df5))
- **avatar:** add avatar component ([a6882b4](https://github.com/adobe/spectrum-web-components/commit/a6882b40a01596305c10990d96bed53168a0f5e3))
- **avatar:** update spectrum css input ([0a6f35a](https://github.com/adobe/spectrum-web-components/commit/0a6f35a2729edb62df2fcaae10dc5f6770072d53))
- **avatar:** use core tokens ([6937e68](https://github.com/adobe/spectrum-web-components/commit/6937e684aadd69e825de2b40bfc0366eb8555ef7))
- **badge:** use core tokens ([83e566c](https://github.com/adobe/spectrum-web-components/commit/83e566c6a80b01621770bbde0ee59dc3d7e7e173))
- **bar-loader:** add bar-loader pattern ([eff18e7](https://github.com/adobe/spectrum-web-components/commit/eff18e7c506feefa28e85df4b82b322ffb675de1))
- **bar-loader:** update spectrum css input ([7c41293](https://github.com/adobe/spectrum-web-components/commit/7c41293db4c59bfc6943972ea133b410777c73f3))
- **base:** insert Spectrum base class/mixin ([37c2ee9](https://github.com/adobe/spectrum-web-components/commit/37c2ee9c1ad33e128538f062215713e761192047))
- **bundle:** add search ([0e00123](https://github.com/adobe/spectrum-web-components/commit/0e00123197010c70295b00ca2bded6c0ca5aac7a))
- **bundle:** include sp-actionbar ([af4b09f](https://github.com/adobe/spectrum-web-components/commit/af4b09f947af953e92f96017aea012f8ac912155))
- **button-group:** add ButtonGroup pattern ([c4d85b5](https://github.com/adobe/spectrum-web-components/commit/c4d85b5524f6623dbd3cb22c0d6fa8fc00e98733))
- **button-group:** update spectrum css input ([d8b1218](https://github.com/adobe/spectrum-web-components/commit/d8b1218f3993d378115206b125ca3e92ba756203))
- **button-group:** use core tokens and add t-shirt sizing ([960e972](https://github.com/adobe/spectrum-web-components/commit/960e9726aa9be615a6b971079fa2d7436d898243))
- **button:** accept update Spectrum Tokens ([d6d6db1](https://github.com/adobe/spectrum-web-components/commit/d6d6db152ea9a1bf1ca7a475ce847ff3ca471037))
- **button:** action-buttons with icons AND text ([aa788b1](https://github.com/adobe/spectrum-web-components/commit/aa788b106b6d649841f54a61de61e131293a244a))
- **button:** add support for "sp-clear-button" ([9028b6d](https://github.com/adobe/spectrum-web-components/commit/9028b6da78b461d6972ea38a5df28dcdb38f20f6))
- **button:** allow icon only buttons ([25623d6](https://github.com/adobe/spectrum-web-components/commit/25623d686663388ef1fe427e99c9040359516fa7))
- **button:** move "white" and "black" out of "variant" and into "static" ([5cf51df](https://github.com/adobe/spectrum-web-components/commit/5cf51df7db6f010f4c22d125b17a68e54fd507ba))
- **button:** pass "label" property to "aria-label" ([78ae59d](https://github.com/adobe/spectrum-web-components/commit/78ae59d260c7e2c0aec16841d96c0c3177061bab))
- **button:** update spectrum css input ([7b5b200](https://github.com/adobe/spectrum-web-components/commit/7b5b20012621a4a43c8402fb07fe163fe919495d))
- **button:** use latest @spectrum-css/button beta ([b3b20ed](https://github.com/adobe/spectrum-web-components/commit/b3b20ed85923955deca5ca4d18d95ea8c5ce15ea))
- **button:** use latest @spectrum-css/button beta ([9360b60](https://github.com/adobe/spectrum-web-components/commit/9360b6062a61a86382beb057997e0bb611e2568a))
- **button:** use synthetic button instead of native ([49e94bc](https://github.com/adobe/spectrum-web-components/commit/49e94bcf79da6ec1ef05f4197042f992922b91ca))
- **button:** use synthetic button instead of native ([ed30d82](https://github.com/adobe/spectrum-web-components/commit/ed30d828affe7857db3540fcad8d6d43fee74ff6))
- **button:** using core-tokens for button ([a4a6d42](https://github.com/adobe/spectrum-web-components/commit/a4a6d42e7615466c6de344ccf36c8d7b4903a921))
- **card:** update spectrum css input ([18b6dae](https://github.com/adobe/spectrum-web-components/commit/18b6dae1e89e0cf4dd854d569545c5a3046dbc9f))
- **card:** upgrade to Spectrum CSS v3.0.0 ([84cf1a9](https://github.com/adobe/spectrum-web-components/commit/84cf1a9758b1e357f18efac5763d17d6a4db0578))
- **checkbox:** update spectrum css input ([e894cb4](https://github.com/adobe/spectrum-web-components/commit/e894cb4bc2b36882a9124d1bcbe94d5ad7dbb38e))
- **circle-loader:** update spectrum css input ([75dcf52](https://github.com/adobe/spectrum-web-components/commit/75dcf5288c0c56b922a986352503a8de64819223))
- **circleloader:** add circleloader component ([ebab180](https://github.com/adobe/spectrum-web-components/commit/ebab1807e200005ff90f463b7718659976f958f4))
- **close-button:** add Close Button pattern ([8e9e1ad](https://github.com/adobe/spectrum-web-components/commit/8e9e1ad1ac84a989c4052f1368d8d3d8ddc5f60e))
- **close-button:** use core tokens ([e6a4efe](https://github.com/adobe/spectrum-web-components/commit/e6a4efe3a278ae4586a6274571b9e59638725fb7))
- **coachmark:** add coachmark pattern ([f53ae70](https://github.com/adobe/spectrum-web-components/commit/f53ae70e6f49f73c71480809021e21d2ff9bcd85))
- **coachmark:** update spectrum css input ([a099ee6](https://github.com/adobe/spectrum-web-components/commit/a099ee61e786f0a07f9005e9c522da09ed707d33))
- **color-area:** add color-area pattern ([dc15e1c](https://github.com/adobe/spectrum-web-components/commit/dc15e1ccf1cae1b08e07fe72a7eae0e93f49ba17))
- **color-area:** separate X and Y aria labels to improve accessibility ([e8d9768](https://github.com/adobe/spectrum-web-components/commit/e8d9768f702991f76b0b3c109edb1eef17fe3cae))
- **color-area:** use core tokens ([51a89de](https://github.com/adobe/spectrum-web-components/commit/51a89de75aaa1aa8b5f56dbed1e9ab76d903b54b))
- **color-handle:** add color-handle pattern ([e3856d8](https://github.com/adobe/spectrum-web-components/commit/e3856d8894d91336d073c639b8fbc6f35d3d1276))
- **color-handle:** use core tokens ([e0c1468](https://github.com/adobe/spectrum-web-components/commit/e0c1468285e04f9868ad0eb504f15412cdc22418))
- **color-loupe:** add color-loupe pattern ([e2f0d15](https://github.com/adobe/spectrum-web-components/commit/e2f0d159714cc7998f15d9913b38128486f8b7fb))
- **color-loupe:** use core tokens ([149165c](https://github.com/adobe/spectrum-web-components/commit/149165c1ea67bc6348f31d79a89ccea8da7e9262))
- **color-slider:** add color-slider pattern ([625f6fe](https://github.com/adobe/spectrum-web-components/commit/625f6fe28713dabf7806dd94d51157f7e91f95ad))
- **color-wheel:** add color-wheel pattern ([8b2a56d](https://github.com/adobe/spectrum-web-components/commit/8b2a56de9765cca69f9b84a6a32832971f3814ca))
- **color-wheel:** use core tokens ([57159a2](https://github.com/adobe/spectrum-web-components/commit/57159a2443b776b78128bfd9a83b2aa3de1a8342))
- conditionally load focus-visible polyfill ([6b5e5cf](https://github.com/adobe/spectrum-web-components/commit/6b5e5cf515f02ef14f072b7aee62feed7a83c281))
- debug colour elements for a11y ([7008f7c](https://github.com/adobe/spectrum-web-components/commit/7008f7c0c0b719f6978a8f158bfea4434d1580af))
- delivery dev mode messages in various packages ([62370a1](https://github.com/adobe/spectrum-web-components/commit/62370a19c77ab00e5b5702833bb1e40fb81e7d48))
- deprecate "icon-right" in buttons as per Spectrum ([064a775](https://github.com/adobe/spectrum-web-components/commit/064a775f9915523a3c9a744f824b5903f26c382e))
- deprecate sp-menu in PickerBase derived classes ([bbb773c](https://github.com/adobe/spectrum-web-components/commit/bbb773c915587b9d92875e333a6b422ec878a8ea))
- **dialog:** descendent attribute support, responsive attribute added ([568cedb](https://github.com/adobe/spectrum-web-components/commit/568cedbe548e6a6ce50ae056e41a36471f305cbe))
- **dialog:** update spectrum css input ([405ca5e](https://github.com/adobe/spectrum-web-components/commit/405ca5ea5c5d6b88130c6d80cfc394168f5110a0))
- **dialog:** use latest @spectrum-css/dialog beta ([b5d5718](https://github.com/adobe/spectrum-web-components/commit/b5d5718f74f4cb30ee8ce067c6a82898c0d192fd))
- **dialog:** use latest @spectrum-css/dialog beta ([1a599a6](https://github.com/adobe/spectrum-web-components/commit/1a599a655c29883076eadabbab02ed94a1928662))
- **divider:** create sp-divider from sp-rule ([ec26d81](https://github.com/adobe/spectrum-web-components/commit/ec26d81bf92742a42913b8cb7f87beaba035743a))
- **divider:** use core tokens ([e30c969](https://github.com/adobe/spectrum-web-components/commit/e30c969c8688ca37b5b750cd8333844d383927fb))
- **dropdown:** add 'selectedItemText', acquire 'value' from menu-item ([ee991af](https://github.com/adobe/spectrum-web-components/commit/ee991aff08bec9e40722103d1086adcf83208a9a))
- **dropdown:** check open in fixture in tests ([02c0b9d](https://github.com/adobe/spectrum-web-components/commit/02c0b9dec1a73a84da81266ed3d3fd0cba97abbc))
- **dropdown:** handle being set from outside again and disabaled items ([81e5cab](https://github.com/adobe/spectrum-web-components/commit/81e5cabef2b9e5bf6ad325ba71fe17228febd063))
- **dropdown:** open menu UI with overlay system ([9811eeb](https://github.com/adobe/spectrum-web-components/commit/9811eebc33d892da46752981f5bfa49c42ab1192))
- **dropdown:** pull request changes ([661165b](https://github.com/adobe/spectrum-web-components/commit/661165bb700a34ea0054d58c1c45a52322739557))
- **dropdown:** update spectrum css input ([4fd3585](https://github.com/adobe/spectrum-web-components/commit/4fd3585c99339752f36e13e72fdba0920fe3af08))
- **dropzone:** update spectrum css input ([0f5a667](https://github.com/adobe/spectrum-web-components/commit/0f5a6679f4e0fb7ae4561a0e13e1db9ad89b21d8))
- **example-project-rollup:** add an exmaple project powered by rollup ([975c243](https://github.com/adobe/spectrum-web-components/commit/975c243c3c7758a9b99595ede6a29963eba32a73))
- **field-group:** add field-group pattern ([f8d265c](https://github.com/adobe/spectrum-web-components/commit/f8d265c3352f4a97fc103a09ce8eb56511dcedbb))
- **field-group:** add field-group pattern ([b027f27](https://github.com/adobe/spectrum-web-components/commit/b027f27b31156313bb28902ad7702315c49b1a54))
- **field-group:** update spectrum css input ([b2160a9](https://github.com/adobe/spectrum-web-components/commit/b2160a9c2a3ed95f20979cf3a5836bb9fca48c0c))
- **field-group:** use core tokens ([7433e59](https://github.com/adobe/spectrum-web-components/commit/7433e598634adc74eb8d2d6c7794eaa5a2ec27e7))
- **field-label:** add field label pattern ([2fa7c7e](https://github.com/adobe/spectrum-web-components/commit/2fa7c7e0201a6161d6cc769dc171ae37c70ab136))
- **field-label:** add field label pattern ([efdcbf1](https://github.com/adobe/spectrum-web-components/commit/efdcbf1557768069c80822c2d104c0441e7f40a0))
- **field-label:** update spectrum css input ([80a993d](https://github.com/adobe/spectrum-web-components/commit/80a993d787af98f41a613f053e4c2497d07f07ee))
- **field-label:** use core tokens ([8db7ac4](https://github.com/adobe/spectrum-web-components/commit/8db7ac48badbad06dbcc7665e9a3bd19b271bb45))
- **icon:** add UIIcon styles ([6f03b1a](https://github.com/adobe/spectrum-web-components/commit/6f03b1a0b898adf608d5ee2ca94f53416ecffe73))
- **icon:** allow `<sp-icon>` to accept a slotted icon ([cbf7a07](https://github.com/adobe/spectrum-web-components/commit/cbf7a078a6adb6e6d28e07d1429cc96e3207db7a))
- **icons-ui:** update spectrum css input ([4cb87ff](https://github.com/adobe/spectrum-web-components/commit/4cb87ff45cec625f273dd6e8ce7785b38cee448a))
- **icons-ui:** vend fully registered icon components ([915a7b5](https://github.com/adobe/spectrum-web-components/commit/915a7b58294403943a331e40098b7947ffc87dc6))
- **icons-workflow:** add workflow icons package ([6b09287](https://github.com/adobe/spectrum-web-components/commit/6b09287d5c169205f0cc332b2158d57e7ef4a4b7))
- **icons-workflow:** update spectrum css input ([549b4b6](https://github.com/adobe/spectrum-web-components/commit/549b4b6b3743ac6ca3b8fe1048188ab96ba85eee))
- **icons-workflow:** vend fully registered icon components ([941f3a4](https://github.com/adobe/spectrum-web-components/commit/941f3a41486fbd49eca0805fb63383f63313e71e))
- **iconset:** update spectrum css input ([914150a](https://github.com/adobe/spectrum-web-components/commit/914150a60e9e123ee68e9a26c8a72653846cd3ea))
- **icons:** update spectrum css input ([296738e](https://github.com/adobe/spectrum-web-components/commit/296738ee582c760812214f0181db3503856db608))
- **icon:** update spectrum css input ([42f17db](https://github.com/adobe/spectrum-web-components/commit/42f17db9ac249a12f224759fe4ead418720e85d4))
- **illustrated-message:** update spectrum css input ([25c0545](https://github.com/adobe/spectrum-web-components/commit/25c054583f944bf2fd0b10c4abdd70f65b4a5f20))
- **illustrated-message:** use core tokens ([5f34473](https://github.com/adobe/spectrum-web-components/commit/5f34473343bbd40df090c8fe23f8df6dee860598))
- implement [#2964](https://github.com/adobe/spectrum-web-components/issues/2964) for sidenav component ([99afac9](https://github.com/adobe/spectrum-web-components/commit/99afac986f1ddf45cc6d0486306cdac246f8764a))
- implement [#2964](https://github.com/adobe/spectrum-web-components/issues/2964) for sidenav component ([5bf36e5](https://github.com/adobe/spectrum-web-components/commit/5bf36e56c132781b62a28eeb5a01c523aa6633bb))
- include all Dev Mode files in side effects ([f70817c](https://github.com/adobe/spectrum-web-components/commit/f70817cc15db6dcf5cc1de2d82b4f7b0c80b1251))
- join overlay-root and overlay-trigger as overlay ([dcde42c](https://github.com/adobe/spectrum-web-components/commit/dcde42c118b76bf8466c7475611e95783a1dcb3d))
- leverage "exports" field in package.json ([321abd7](https://github.com/adobe/spectrum-web-components/commit/321abd7b7e78ccd9157cff75a1fa3dbd06e81f79))
- leverage latest Spectrum button API ([9faeade](https://github.com/adobe/spectrum-web-components/commit/9faeade93893137285ae031c9516ce37d9a9041f))
- leverage latest Spectrum button API ([9caf2f6](https://github.com/adobe/spectrum-web-components/commit/9caf2f6313424450c91c039fafea89bf8aa72624))
- **link:** add download attribute to `<sp-link>` ([fb02104](https://github.com/adobe/spectrum-web-components/commit/fb02104104c856d2601a70d9de59fbbe3a79e5d7))
- **link:** add download attribute to `<sp-link>` ([fefb28e](https://github.com/adobe/spectrum-web-components/commit/fefb28ef29f382401d2d8160c15012af59d0053c))
- **link:** add download attribute to `<sp-link>` ([4811653](https://github.com/adobe/spectrum-web-components/commit/4811653e07a7f8bda39332bc99f78477379ac07c))
- **link:** add download attribute to `<sp-link>` ([aed8639](https://github.com/adobe/spectrum-web-components/commit/aed8639a5460b7dcfe8d0b920d341d7c66e8c01d))
- **link:** add download attribute to `<sp-link>` ([16894ba](https://github.com/adobe/spectrum-web-components/commit/16894ba672882178b09a33c4834e42144e6b081d))
- **link:** add download attribute to `<sp-link>` ([0763504](https://github.com/adobe/spectrum-web-components/commit/07635046b2943e8461a82f564c168d7a9f27ddc2))
- **link:** support rel attribute ([df4b5a8](https://github.com/adobe/spectrum-web-components/commit/df4b5a831aa35f5992b183cbba3cad18eb3dbb53))
- **link:** update spectrum css input ([e8cd359](https://github.com/adobe/spectrum-web-components/commit/e8cd3592e780608afeda5bbfb5830a64a0b2caa1))
- **link:** use core tokens ([510173b](https://github.com/adobe/spectrum-web-components/commit/510173bad82b61138c31d680ca11319590b3aaa3))
- **menu-item:** added 'value' and 'itemText' properties ([2c187b5](https://github.com/adobe/spectrum-web-components/commit/2c187b58776f4ab12283adc93858e26d7152af8f))
- **menu:** update spectrum css input ([8c7e18a](https://github.com/adobe/spectrum-web-components/commit/8c7e18ac16f2747bd2f10173bcac0d5e53a0bcac))
- **meter:** add meter pattern ([fa092ba](https://github.com/adobe/spectrum-web-components/commit/fa092ba915a2fe6320cd9bdbe33055a9e41eee87))
- **meter:** add meter pattern ([42a6951](https://github.com/adobe/spectrum-web-components/commit/42a6951cf92c2d1c73197ee94ef517644ae70c6a))
- **meter:** update spectrum css input ([683bb1a](https://github.com/adobe/spectrum-web-components/commit/683bb1a769483c50eeceb245730e8efbf2ec7442))
- **modal:** add modal CSS only pattern ([44c7655](https://github.com/adobe/spectrum-web-components/commit/44c765582baba6f751602f7b37a083dd5234e4df))
- **modal:** add modal CSS only pattern ([f2bb4ad](https://github.com/adobe/spectrum-web-components/commit/f2bb4ad8f58bbab53c60769e7768a524a6817828))
- **modal:** update spectrum css input ([bbcfc2a](https://github.com/adobe/spectrum-web-components/commit/bbcfc2a35a42fc3b81d3de17f216e4c872d3ac07))
- modified .selected to make `<sp-action-group>` a controllable component ([#2006](https://github.com/adobe/spectrum-web-components/issues/2006)) ([4c69b25](https://github.com/adobe/spectrum-web-components/commit/4c69b251fdf09fe898ce98482881e647b857205d))
- multi-handle slider implementation ([8d5a743](https://github.com/adobe/spectrum-web-components/commit/8d5a74309ec171107a9504695216cb90abe39023)), closes [#1385](https://github.com/adobe/spectrum-web-components/issues/1385)
- **number-field:** add number field pattern ([384ab34](https://github.com/adobe/spectrum-web-components/commit/384ab34d5aafe54e3206ff6802eb642c4df556c6))
- **number-field:** use new config ([8d42d69](https://github.com/adobe/spectrum-web-components/commit/8d42d693363e69362e18c49f1d7a5c91262f4c38))
- observe document.documentElement for dir value ([da84a9a](https://github.com/adobe/spectrum-web-components/commit/da84a9a956e35ab40052d9691461de533eae8f49))
- **overlay:** manage focus throwing and tab trapping ([27a0b53](https://github.com/adobe/spectrum-web-components/commit/27a0b53ea94d19bb18b7d3f89763b06dc1b42b59))
- **overlay:** move entire package behind dynamic import by default ([9b0a74d](https://github.com/adobe/spectrum-web-components/commit/9b0a74de1f32ccd8cde6cabe4c06f990064f11ae))
- pass through autocomplete attribute to inputs ([5416510](https://github.com/adobe/spectrum-web-components/commit/541651063fb67766426168ef0ad885bb89b6b762))
- **picker:** process field-label content for more accurate a11y tree ([dc9df54](https://github.com/adobe/spectrum-web-components/commit/dc9df54d052edc46c2399f0f7b12d3b5d4aff740))
- **picker:** replace dropdown with picker component ([30b8bc7](https://github.com/adobe/spectrum-web-components/commit/30b8bc791be37ba53a12244f3dd2cccd55c490a3))
- **picker:** support responsive delivery of menu ([20031d1](https://github.com/adobe/spectrum-web-components/commit/20031d1b42b36cdaa129a25ee70eb2bcbcdbdb5e))
- **picker:** update "icons-only" to "icons=only" to support more variations ([de16a62](https://github.com/adobe/spectrum-web-components/commit/de16a628f6ec7cfcbe405c71414bef6ed72b1726))
- **picker:** use new tokens ([7d65b69](https://github.com/adobe/spectrum-web-components/commit/7d65b69d47d69a34f75b456a5aa457f22ec04aca))
- **popover:** update spectrum css input ([0f7a00e](https://github.com/adobe/spectrum-web-components/commit/0f7a00e3bf1fc35c566719d1619cf5d4e859b190))
- **progress-bar:** replace bar-loader with progress-bar ([182935c](https://github.com/adobe/spectrum-web-components/commit/182935c540013af9e793ccf5654113b7af5d34de))
- **progress-bar:** use core tokens ([540552e](https://github.com/adobe/spectrum-web-components/commit/540552ecda4cfab4f26045a6ef2ed58457190ab9))
- **progress-circle:** replace circle-loader with progress-circle ([a852140](https://github.com/adobe/spectrum-web-components/commit/a852140797f978078d71aceac58f61f744e5a651))
- **progress-circle:** use core tokens ([587ac63](https://github.com/adobe/spectrum-web-components/commit/587ac63ed5cf972158fedebdeda944851dd01051))
- **quick-actions:** add quick-actions pattern ([3664b51](https://github.com/adobe/spectrum-web-components/commit/3664b51c53ddc200a57f7db1a16036dc7fc81ed5))
- **quick-actions:** update spectrum css input ([efec525](https://github.com/adobe/spectrum-web-components/commit/efec525c43c86347476aeede7605504a52a5a6e1))
- **radio:** update spectrum css input ([4fef340](https://github.com/adobe/spectrum-web-components/commit/4fef3400413a8f5fd03cab0b5e27356c7c6f14a4))
- **react:** react wrapper generator ([#2745](https://github.com/adobe/spectrum-web-components/issues/2745)) ([2c9d006](https://github.com/adobe/spectrum-web-components/commit/2c9d006acbaf259bbbca7b735f2a229f735420d9))
- reparentChildren - insertAdjacentElement style API ([07f966f](https://github.com/adobe/spectrum-web-components/commit/07f966f54e4f563d190084933f9dc15fc5316869))
- reparentChildren - refactored arguments - breaking change ([dea2bc5](https://github.com/adobe/spectrum-web-components/commit/dea2bc5cba1185e790a834db43daf8fc45f4e4f7))
- rework overlays to use popper ([e17d1bb](https://github.com/adobe/spectrum-web-components/commit/e17d1bb23082b788ea921ec15315ea955e2596eb))
- **rule:** add Spectrum rule pattern and apply to docs ([f4c52ae](https://github.com/adobe/spectrum-web-components/commit/f4c52ae34eeae80f8edb57828ad93f32f33f713e))
- **rule:** update spectrum css input ([1e9f240](https://github.com/adobe/spectrum-web-components/commit/1e9f240942bfe84370ada81bc8d90b9108011b7f))
- **search:** adds sp-search element ([d484fc2](https://github.com/adobe/spectrum-web-components/commit/d484fc2848a08d52ebb1fc2064202a4288b6b4b3))
- **search:** introduce API to control form interactions ([42fac00](https://github.com/adobe/spectrum-web-components/commit/42fac00ac071e87f9f80ae45212ea469d4d05fb0))
- **search:** submit will bubble ([8014345](https://github.com/adobe/spectrum-web-components/commit/801434548576daf4c31dc99eb6972ea140c68943))
- **search:** support "quiet" variant ([d0f85f1](https://github.com/adobe/spectrum-web-components/commit/d0f85f18887731f80d26eaec84ae601f4e433196))
- **search:** update spectrum css input ([05d8131](https://github.com/adobe/spectrum-web-components/commit/05d813121075a96652b122c7bb9aafa375dc97ad))
- **search:** use Spectrum CSS ^3.0.0 ([7830ac0](https://github.com/adobe/spectrum-web-components/commit/7830ac0868e855145cee0922529a0f6d4d3e7f50))
- select row when clicking row ([294523c](https://github.com/adobe/spectrum-web-components/commit/294523cd392a423351faf321cd9af1b02e0544e6))
- sets action-menu quiet to false by default, fixes [#3040](https://github.com/adobe/spectrum-web-components/issues/3040) ([8414cab](https://github.com/adobe/spectrum-web-components/commit/8414cab2ef916be40be9f624f485fb02184eec2b))
- setup SplitView component from rebase main ([32f3272](https://github.com/adobe/spectrum-web-components/commit/32f3272dcbaba5b09cf02f66f25b54ab923f4510))
- shared pkg versions, devmode define warning, registry-conflicts docs ([6e49565](https://github.com/adobe/spectrum-web-components/commit/6e4956519b845fa8127f8032948b625c252ef7a6))
- **shared:** add mixing for observing text content changes in a slot ([1318150](https://github.com/adobe/spectrum-web-components/commit/1318150ca6282c0b15dc06fe0e821d142175455e))
- **shared:** conditionally apply focus-visible polyfill ([b854df6](https://github.com/adobe/spectrum-web-components/commit/b854df6dd050da4762eaf75eca1a7a62673b3828))
- **shared:** conditionally apply focus-visible polyfill ([ca1de8d](https://github.com/adobe/spectrum-web-components/commit/ca1de8d10893a2504854546381ede45b6cdce69e))
- **sidenav:** add a "change" event to track the "value" property ([8d3a0bd](https://github.com/adobe/spectrum-web-components/commit/8d3a0bd93bdd9dbad66df0b895ff8101128776fa))
- **sidenav:** add keyboard accessibility ([6ff622b](https://github.com/adobe/spectrum-web-components/commit/6ff622bf89ad319a7d464fbdd2477c7b55b65cdd))
- **sidenav:** update spectrum css input ([bd43201](https://github.com/adobe/spectrum-web-components/commit/bd43201749948479216400af6c320c1c6dd269cd))
- **slider:** add "ramp" and "tick" variant support ([bb98bb6](https://github.com/adobe/spectrum-web-components/commit/bb98bb6e1e7ac7b795c29b5085e7ebef57d8ca94))
- **slider:** add "ramp" and "tick" variant support ([6b4e4a4](https://github.com/adobe/spectrum-web-components/commit/6b4e4a408c82e7598397df2eab7bb3e1df567da8))
- **slider:** adds getAriaValueText property, fixes [#381](https://github.com/adobe/spectrum-web-components/issues/381) ([5800915](https://github.com/adobe/spectrum-web-components/commit/5800915bb805022cbe4c8ea822631c11da03fc98))
- **slider:** mouse event fallback from pointer events ([b69e7fc](https://github.com/adobe/spectrum-web-components/commit/b69e7fc23966386097e0cad22c56ab02f70abcae))
- **slider:** support tick labels and tick steps ([1ccf8d6](https://github.com/adobe/spectrum-web-components/commit/1ccf8d6f2ac33843c6cb27e2e86f0943aab31a6d))
- **slider:** update "value" default to match browser native range input ([0050f63](https://github.com/adobe/spectrum-web-components/commit/0050f633ad2a0d7db192af0e8a77f6b7c646a256))
- **slider:** update spectrum css input ([21ebe36](https://github.com/adobe/spectrum-web-components/commit/21ebe36d600501771c3382e987f4e22753c36262))
- **slider:** use latest @spectrum-css/slider beta ([9f29bbe](https://github.com/adobe/spectrum-web-components/commit/9f29bbee3a43c092f4ee141e18a96fe0dfa4fba4))
- **slider:** use latest @spectrum-css/slider beta ([b8c6488](https://github.com/adobe/spectrum-web-components/commit/b8c648834c6ce73aef3357dd993085868ace337c))
- split icons into their own export ([98dac4c](https://github.com/adobe/spectrum-web-components/commit/98dac4ce935082a54074c8b57276dce2cf2b20e1))
- **split-button:** add split-button pattern ([d3d8240](https://github.com/adobe/spectrum-web-components/commit/d3d8240225c5c11813e16c7ca64c75c5fd036bc6))
- **split-button:** add split-button pattern ([012b7f8](https://github.com/adobe/spectrum-web-components/commit/012b7f8ca88213c246683eb65f27b8cfe59e60bb))
- **split-button:** add split-button pattern ([4833a59](https://github.com/adobe/spectrum-web-components/commit/4833a598bb3da3552d194586350a3888dba79543))
- **split-button:** update spectrum css input ([7d83331](https://github.com/adobe/spectrum-web-components/commit/7d83331fae9ff181c98ba7033d69bdf276790e7f))
- **status-light:** add status-light component ([e3a5b3d](https://github.com/adobe/spectrum-web-components/commit/e3a5b3dd853ebb8ad05ec438f4855fd3c500f7ce))
- **status-light:** update spectrum css input ([e10fd45](https://github.com/adobe/spectrum-web-components/commit/e10fd457dd8c97a8d90b93b93e4279308d4007ef))
- **story-decorator:** add story decorator to replace knobs for theme application ([7c0c6be](https://github.com/adobe/spectrum-web-components/commit/7c0c6be37d58ad3e6d8973e8d4f5ccc587bf55af))
- **story-decorator:** ensure version ([dd39772](https://github.com/adobe/spectrum-web-components/commit/dd39772af363051c35126c369bb5a33a0c7853d9))
- **styles:** add typography coverage ([e8ab4dd](https://github.com/adobe/spectrum-web-components/commit/e8ab4dd555542e7b76db2a516bac8aedc6e3f8ad))
- **styles:** bump to latest tokens ([077434a](https://github.com/adobe/spectrum-web-components/commit/077434ada01e299a97425bf729014b3c31bd9f56))
- **styles:** process, deliver, document the "large" scale ([89d4911](https://github.com/adobe/spectrum-web-components/commit/89d4911255bfd40b12f264f4dd81f657bb65449f))
- **styles:** update spectrum css input ([88314bb](https://github.com/adobe/spectrum-web-components/commit/88314bb34c3c6f372402ded0b0d7cf97a29a5677))
- **styles:** update typography to leverage Core Tokens ([2f86560](https://github.com/adobe/spectrum-web-components/commit/2f86560139b98e8e014b69d6b108918010637f3d))
- **styles:** vend CSS literal versions of the typography system ([6406c96](https://github.com/adobe/spectrum-web-components/commit/6406c96377557a88ad7756147e6e5777f5d1f746))
- **styles:** vend CSS literal versions of the typography system ([1658efa](https://github.com/adobe/spectrum-web-components/commit/1658efac81f72237759fbc6b2f7bdb19ebe1dae6))
- support processing CSS from individual Spectrum CSS packages ([a1d6938](https://github.com/adobe/spectrum-web-components/commit/a1d6938f4a86be507b23291d5b4a96df55a79b62))
- support rel attribute for sidenav item ([90522e7](https://github.com/adobe/spectrum-web-components/commit/90522e79f57df974b3610877143d32d6885c4c41))
- support Spectrum Token consumption and update Action Button to use them ([743ab16](https://github.com/adobe/spectrum-web-components/commit/743ab16d8f05335d320440effbdcb8cd4bffc97d))
- support static white and static black variants of Action Button ([7f1e25b](https://github.com/adobe/spectrum-web-components/commit/7f1e25bce122bd3601c6aa5ed505cba436e8b952))
- **swatch:** use core tokens ([821aebe](https://github.com/adobe/spectrum-web-components/commit/821aebe15e3e8f5720b7e357f0a2661b39dd46d3))
- **swc-templates:** update create process to require less manual interference ([1342649](https://github.com/adobe/spectrum-web-components/commit/1342649079b44fe060936711f061fdb58b139cab))
- **swc-templates:** update generator for new dir structure ([72b631e](https://github.com/adobe/spectrum-web-components/commit/72b631ed735ee4bb1d986f2be5943a3952c85563))
- **switch:** update spectrum css input ([1d2ce17](https://github.com/adobe/spectrum-web-components/commit/1d2ce179650fd2206fb0b4a839361b2b0b2d9917))
- **switch:** use core tokens ([8011ead](https://github.com/adobe/spectrum-web-components/commit/8011ead4377b8e8fb5647a7b2984e8f1695bfbf7))
- **tab-list:** autofocus, :before/after processing, visual test ([83dddb0](https://github.com/adobe/spectrum-web-components/commit/83dddb03f2e1ea460567b2fa27b02e88099cfa42))
- **tabs-overflow:** address comments ([b0e3398](https://github.com/adobe/spectrum-web-components/commit/b0e3398518d8c8d72dc901bd3c137a7c4c8f4b54))
- **tabs-overflow:** first round implementation of sp-tabs-overflow ([c5b589a](https://github.com/adobe/spectrum-web-components/commit/c5b589a41d74e61edfd1a10f012f70052ae39f6d))
- **tabs-overflow:** first round of feedback ([3701e8a](https://github.com/adobe/spectrum-web-components/commit/3701e8af876da04e0b05d793539485f459c7c44d))
- **tabs-overflow:** fix style and update unittest ([59843df](https://github.com/adobe/spectrum-web-components/commit/59843df8b716abbfa906c4fcc23232e40e1aa4d2))
- **tabs-overflow:** testing cli ([fb08ed9](https://github.com/adobe/spectrum-web-components/commit/fb08ed924ed6053d8eefc9e4ec7556da8c63ac2b))
- **tabs-overflow:** update CSS and component to be more spectrum compliant ([8c92ae9](https://github.com/adobe/spectrum-web-components/commit/8c92ae9a3fdb0ff4ab02fac5ed1fc03fcd5bea43))
- **tabs-overflow:** update documentation ([13a6da6](https://github.com/adobe/spectrum-web-components/commit/13a6da64188099c28f37e564cb341136341699a0))
- **tabs:** add sp-tab-panel element ([b17d276](https://github.com/adobe/spectrum-web-components/commit/b17d2765cf415578a31e5fa23515c25ff4c3922d))
- **tabs:** add test coverage, remove unused property from component class ([9933ad8](https://github.com/adobe/spectrum-web-components/commit/9933ad83dea315533bd749be9a25a15d9a33b24a))
- **tabs:** add test coverage, update import paths ([d104b52](https://github.com/adobe/spectrum-web-components/commit/d104b520f1ae0892f4905b6ba4e5d41d13e2fa76))
- **tabs:** moving tabs overflow under tabs package ([a18c692](https://github.com/adobe/spectrum-web-components/commit/a18c692a858163859cc73c86755a078ee003d67f))
- **tabs:** update bundle setup and readme ([0249b94](https://github.com/adobe/spectrum-web-components/commit/0249b94d36567f9a1e6c9de35a56ffeb1163df1b))
- **tabs:** update imports to get correct coverage ([2e421cd](https://github.com/adobe/spectrum-web-components/commit/2e421cda336833b55ba67f0e69bc76195e2b5a0a))
- **tabs:** update spectrum css input ([d875a0c](https://github.com/adobe/spectrum-web-components/commit/d875a0cdeba6e798ff129409b2b809d9d8adaae3))
- **tab:** use @spectrum-css/tab, support :host(:before) selector ([ace96f9](https://github.com/adobe/spectrum-web-components/commit/ace96f99c9f5dceafa660a1f5de683870892ab0d))
- **tags:** add tags pattern ([ae91865](https://github.com/adobe/spectrum-web-components/commit/ae91865642bab3f330174ec5dd27977f73ed7b9c))
- **tags:** manage aria-disabled from disabled attribute ([657eba8](https://github.com/adobe/spectrum-web-components/commit/657eba8e6a07971148bdf177015ccb3491ef2fc8))
- **tags:** update spectrum css input ([f8a59ed](https://github.com/adobe/spectrum-web-components/commit/f8a59ed637fd52b3d213f6f6ea08d6a5cf66de5f))
- **textfield:** add support for setSelectionRange ([#2070](https://github.com/adobe/spectrum-web-components/issues/2070)) ([dd17ba0](https://github.com/adobe/spectrum-web-components/commit/dd17ba0f50cc604b4dcd14699d5129710aac121b))
- **textfield:** update spectrum css input ([2ce4ba2](https://github.com/adobe/spectrum-web-components/commit/2ce4ba2e0a9c6dcc6c0041fde02b0d98f08cf6a1))
- **textfield:** use Spectrum CSS ^3.0.0 ([1c1acb9](https://github.com/adobe/spectrum-web-components/commit/1c1acb94577f97c189a5f4e2d34bf81dc169447c))
- **theme:** filter css variables ([1761f3a](https://github.com/adobe/spectrum-web-components/commit/1761f3af1594e3c395dee98e7e9b1d616a74a1a1))
- **thumbnail:** add the thumbnail package ([56935d5](https://github.com/adobe/spectrum-web-components/commit/56935d5f6183c700b036ffd058629a3d9cbdbbbc))
- **toast:** add "sp-toast" pattern ([d0a5f00](https://github.com/adobe/spectrum-web-components/commit/d0a5f009a656b55cdcbd7df471646380aa478ef4))
- **toast:** default to "open === false", always dispatch "close" event ([fcb3729](https://github.com/adobe/spectrum-web-components/commit/fcb37292178bac2cb2327eebd4f3a01908e27f38))
- **toast:** default to "open === false", always dispatch "close" event ([544b6e5](https://github.com/adobe/spectrum-web-components/commit/544b6e5e62661b935b371e822cc419de82791582))
- **toast:** update spectrum css input ([183ee95](https://github.com/adobe/spectrum-web-components/commit/183ee95c8f9e0ba2c9f2f8d0bc922728e36fdb0a))
- **tooltip:** initial release ([c1331c9](https://github.com/adobe/spectrum-web-components/commit/c1331c907ab19274981aae6ed17cc3fc0bb3cbf6))
- **tooltip:** update spectrum css input ([a946b1c](https://github.com/adobe/spectrum-web-components/commit/a946b1cecf759c8cabf3ee5b49a6d122c00c6082))
- track the associated Spectrum CSS package ([86b1be5](https://github.com/adobe/spectrum-web-components/commit/86b1be5d1d2b6e870049a8642dabc3520c359716))
- **tray:** use spectrum tokens ([cdd78b2](https://github.com/adobe/spectrum-web-components/commit/cdd78b28d464a2ff2fb7701fc6fed780a4f557c9))
- **underlay:** update spectrum css input ([edf1a4b](https://github.com/adobe/spectrum-web-components/commit/edf1a4b780b83b99ae054fad7d547fba99c2c7dc))
- update card and tabs to latest spectrum-css ([55b8d67](https://github.com/adobe/spectrum-web-components/commit/55b8d67c03349183c3aebb52bbc54f5c58b3fdb4))
- update lit-\* dependencies, wip ([377f3c8](https://github.com/adobe/spectrum-web-components/commit/377f3c848b09e64fa1ecc1e18208f534fefcd9e4))
- update Menu Divider for new Spectrum CSS output ([aca7e2d](https://github.com/adobe/spectrum-web-components/commit/aca7e2dd1b42016d16c5e7a3484e0963ffce4d9a))
- update to Spectrum CSS v3.0.0 ([e8b3d8f](https://github.com/adobe/spectrum-web-components/commit/e8b3d8f75c77c04b4d7af126b91b0f6ad2a40742))
- upgrade accessibility of tab/tab-list family of elements ([c7ea803](https://github.com/adobe/spectrum-web-components/commit/c7ea803d1879bc5fda85514667339fee6a2b09d2))
- use :focus-visable (via polyfill) instead of :focus ([11c6fc7](https://github.com/adobe/spectrum-web-components/commit/11c6fc77960de8e57dd9c49bb7669df689f0ebaa))
- use @adobe/spectrum-css@2.15.1 ([3918888](https://github.com/adobe/spectrum-web-components/commit/39188887afad9bec52ef48d4e22596f9b757a9fe))
- use 3.0.0-beta.\* release for styles ([877b485](https://github.com/adobe/spectrum-web-components/commit/877b485f20c76ec8f77975747322f572eea88e97))
- use core tokens ([d569672](https://github.com/adobe/spectrum-web-components/commit/d569672364472385a8df539a382e0f917c65f39c))
- use latest exports specification ([a7ecf4b](https://github.com/adobe/spectrum-web-components/commit/a7ecf4b6da7996f36a8a89f62cc2384709497008))
- use SixedMixin to manage "size" property ([8819821](https://github.com/adobe/spectrum-web-components/commit/88198212cb495833ed2e7644f95b43dca915318d))

### Performance Improvements

- accept new Spectrum CSS featuring simpler DOM structure ([a0b042b](https://github.com/adobe/spectrum-web-components/commit/a0b042b1d05bc23b0b824123af94df5bc3e1e0d2))
- **button:** recentralize shared styles in base ([85d3d0a](https://github.com/adobe/spectrum-web-components/commit/85d3d0a3c84301dcf5be492e2b42cd00e8986089))
- reduce render cycles when managing "dir" attribute ([7b28309](https://github.com/adobe/spectrum-web-components/commit/7b28309ff2b977ad8a61d9e6c41737abfbb111bf))
- reorganize inheritance and composition in Menu Items ([d96ccb6](https://github.com/adobe/spectrum-web-components/commit/d96ccb621833277444d69535126c3669343c2eaf))
- **shared:** focus-visible, lazily instantiate the focus-visible polyfilling ([fe257c1](https://github.com/adobe/spectrum-web-components/commit/fe257c1eb10bcb8cfb8ca6700e89efb2386980e5))
- **shared:** focus-visible, lazily instantiate the focus-visible polyfilling ([1ffcedb](https://github.com/adobe/spectrum-web-components/commit/1ffcedbb7a0c5335313184257dbc2331c68eae11))
- use "sideEffects" listing in package.json ([7271614](https://github.com/adobe/spectrum-web-components/commit/7271614c0ca3ccf3566583bb59467eb15a6199cd))
- use imported TypeScript helpers instead of inlining them ([cc2bd0a](https://github.com/adobe/spectrum-web-components/commit/cc2bd0accd643c2f35cbf1ba809b54f52c25628d))

### Reverts

- Revert "chore: release new versions" ([a6d655d](https://github.com/adobe/spectrum-web-components/commit/a6d655d1435ee6427a3778b89f1a6cf9fe4beb9d))
- version update ([ab58bf9](https://github.com/adobe/spectrum-web-components/commit/ab58bf9721d0332460a20f260d500455c58bad47))

### BREAKING CHANGES

- renamed title/subtitle attributes and slot.
