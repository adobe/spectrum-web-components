---
'@spectrum-web-components/tray': minor
---

**Added**: Automatic dismiss button detection and visually-hidden helpers for screen reader accessibility

- **Added**: `<sp-tray>` now automatically detects keyboard-accessible dismiss buttons (like `<sp-button>`, `<sp-close-button>`, or HTML `<button>` elements) in slotted content
- **Added**: When no dismiss buttons are detected, the tray automatically renders visually-hidden dismiss buttons before and after its content to support mobile screen readers (particularly VoiceOver on iOS)
- **Added**: New `has-keyboard-dismiss` boolean attribute to manually override auto-detection when slotted content has custom dismiss functionality that cannot be automatically detected
- **Added**: Auto-detection recognizes `<sp-dialog dismissable>` and `<sp-dialog-wrapper dismissable>` components with built-in dismiss functionality in shadow DOM
- **Enhanced**: Improved mobile screen reader accessibility by ensuring dismissal options are always available when appropriate
