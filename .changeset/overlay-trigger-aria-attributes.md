---
'@spectrum-web-components/overlay': patch
'@spectrum-web-components/dialog': patch
---

**Fixed**: Added automatic ARIA attribute management to `<overlay-trigger>` for screen reader accessibility (WCAG 1.3.2 Meaningful Sequence):

- `aria-expanded` is now automatically set on the trigger element, reflecting the overlay's open/closed state
- `aria-controls` is set on the trigger element, pointing to the overlay content's `id` (generated if not provided)
- `aria-haspopup` is set to `"dialog"` by default (respects consumer overrides; component tracks its own values to allow type changes)
- ARIA attributes are cleaned up from the trigger element when the overlay-trigger is disconnected, the trigger element changes, or content is removed
- Updated dialog README behaviors example to use `<overlay-trigger>` for automatic ARIA management
- Added comprehensive accessibility documentation to overlay-trigger covering ARIA attributes, focus management, keyboard navigation, and screen reader considerations
