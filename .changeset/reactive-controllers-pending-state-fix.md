---
'@spectrum-web-components/reactive-controllers': patch
---

**Fixed** accessibility and caching in `PendingStateController`.

- **Fixed**: Updated progress circle to use `role="presentation"` for better accessibility compliance
- **Fixed**: Improved aria-label caching logic to better handle dynamic label changes
- **Added**: Documentation noting the controller is primarily used by `<sp-button>` component
- **Fixed**: Enhanced caching mechanism to preserve user-set aria-labels during pending states

These changes improve accessibility compliance and aria-label management for components using the pending state controller.
