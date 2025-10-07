---
'@spectrum-web-components/combobox': patch
---

**Fixed** pending state handling and accessibility in `<sp-combobox>` component.

- **Changed**: Removed dependency on `PendingStateController` and implemented inline pending state handling
- **Fixed**: Updated aria-labelledby attribute ordering to improve screen reader experience (`label applied-label pending-label`)
- **Fixed**: Updated progress circle implementation to use `role="presentation"` instead of `aria-valuetext`
- **Added**: Direct pending state visual rendering with improved accessibility

These changes improve accessibility for pending states while reducing unnecessary component dependencies.
