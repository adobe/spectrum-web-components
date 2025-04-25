---
'@spectrum-web-components/picker': patch
---

`PickerBase`(used in `<sp-picker>` and `sp-action-menu>`):

Fixes focus so that it is not set on `<sp-menu-item>` elements when opened via mouse.

A keyboard interaction is the only interaction that should set focus on an `<sp-menu-item>` when the menu is opened. A user with a mouse would expect the focus to stay where the mouse is.

Fixes: #2950
