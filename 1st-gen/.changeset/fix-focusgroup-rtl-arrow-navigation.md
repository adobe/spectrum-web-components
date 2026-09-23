---
'@spectrum-web-components/reactive-controllers': patch
---

**fix(reactive-controllers):** Fixed `FocusGroupController` moving focus opposite to the visual layout when arrow keys are used in a right-to-left context.

`handleKeydown` mapped <kbd>ArrowRight</kbd> to `+1` and <kbd>ArrowLeft</kbd> to `-1` in DOM order without consulting the resolved text direction, so under `dir="rtl"` focus travelled backwards relative to what the user sees. This affected every horizontally rendered focus group, including `sp-swatch-group`, `sp-action-group`, `sp-tabs`, `sp-radio-group` and `sp-tags`.

The horizontal step is now mirrored when the host's computed direction is `rtl`, and only when the host reports that its elements are laid out along the inline axis. A new `mirrorHorizontalInRTL` config option carries that report, accepting a boolean or a callback for hosts that can render either way, such as `() => !this.vertical`. It defaults to `true` only for `direction: 'horizontal'`, which is the one value that unambiguously describes a single inline-axis row.

Vertically rendered groups therefore keep <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> stepping in DOM order, so they stay consistent with <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd>. `sp-grid` also keeps DOM order, because it positions its items with a physical transform and so does not flip with the writing mode. <kbd>Home</kbd> and <kbd>End</kbd> remain logical in both directions.
