---
'@spectrum-web-components/button': patch
'@spectrum-web-components/reactive-controllers': patch
---

**Fixed** aria-label handling in button components and pending state controller.

**Button component changes:**

- Fixed timing of aria-label updates to occur after slot content changes are processed
- Added `label` property support for programmatic aria-label control
- Added comprehensive tests for aria-label behavior during content changes

**PendingState controller changes:**

- Improved aria-label caching logic to better handle dynamic label changes
- Changed progress circle from `aria-valuetext` to `aria-label` for better accessibility
- Enhanced caching mechanism to preserve user-set aria-labels during pending states

These changes ensure that aria-labels are properly managed and preserved across component state changes, improving accessibility for screen reader users.
