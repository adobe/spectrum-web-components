---
'@spectrum-web-components/picker': minor
---

- **Added**: Added a new `ExpandableElement` base class for expandable picker-like components with overlay functionality.
- **Deprecated**: `PickerBase` class is deprecated and will be removed in a future release. Use a `ExpandableElement` base class instead. As a result `Picker instanceof PickerBase` will now return false.
