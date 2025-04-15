---
'@spectrum-web-components/tabs': patch
---

Fixed a bug where removing the `disabled` attribute (or setting it to `false`) on an `sp-tabs` element would not correctly enable the selected `sp-tab`. The fix updates the `focusInIndex` method in the component's `RovingTabindexController` to properly identify the selected tab that should become focusable when the parent tabs component is enabled.
