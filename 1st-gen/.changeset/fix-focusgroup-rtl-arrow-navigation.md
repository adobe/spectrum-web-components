---
'@spectrum-web-components/reactive-controllers': patch
---

**fix(reactive-controllers):** Fixed `FocusGroupController` moving focus opposite to the visual layout when arrow keys are used in a right-to-left context.

`handleKeydown` mapped <kbd>ArrowRight</kbd> to `+1` and <kbd>ArrowLeft</kbd> to `-1` in DOM order without consulting the resolved text direction, so under `dir="rtl"` focus travelled backwards relative to what the user sees. This affected every horizontally rendered focus group, including `sp-swatch-group`, `sp-action-group`, `sp-tabs`, `sp-radio-group` and `sp-tags`.

The horizontal step is now mirrored when the host's computed direction is `rtl`, and only when the elements are actually laid out along the inline axis. Vertically rendered groups keep <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> stepping in DOM order, so they stay consistent with <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd>. <kbd>Home</kbd> and <kbd>End</kbd> remain logical in both directions.
