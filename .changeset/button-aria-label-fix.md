---
'@spectrum-web-components/button': patch
---

**Fixed** aria-label handling in `<sp-button>` component.

- **Fixed**: Moved aria-label updates to occur after slot content changes are processed to prevent timing issues
- **Added**: Enhanced `label` property support for programmatic aria-label control
- **Added**: Comprehensive tests for aria-label behavior during content and pending state changes
- **Fixed**: Removed duplicate aria-label update logic in `update()` method

These changes ensure that aria-labels are properly managed and preserved across component state changes, improving accessibility for screen reader users.
