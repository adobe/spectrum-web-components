---
'@spectrum-web-components/reactive-controllers': patch
'@spectrum-web-components/action-group': patch
'@spectrum-web-components/radio': patch
'@spectrum-web-components/tabs': patch
'@spectrum-web-components/swatch': patch
'@spectrum-web-components/tags': patch
'@spectrum-web-components/grid': patch
---

**fix(reactive-controllers):** Fixed arrow keys moving focus opposite to the visual layout in a right-to-left context.

`FocusGroupController` mapped <kbd>ArrowRight</kbd> to the next element and <kbd>ArrowLeft</kbd> to the previous one in DOM order, without checking the text direction. Under `dir="rtl"`, focus therefore moved away from the arrow the user pressed. This affected `sp-swatch-group`, `sp-action-group`, `sp-tabs`, `sp-radio-group` and `sp-tags`.

<kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> now swap when the host's computed direction is `rtl` and the host lays out its elements in a row. A new `mirrorHorizontalInRTL` config option tells the controller whether that is the case. It accepts a boolean, or a callback for hosts that can render as either a row or a column. It defaults to `true` only for `direction: 'horizontal'`.

- `sp-action-group` and `sp-tabs` mirror unless they render vertically.
- `sp-radio-group` mirrors only with `horizontal`, because it renders as a column by default.
- `sp-swatch-group` and `sp-tags` always mirror.
- `sp-grid` never mirrors, because it positions items with physical offsets that do not follow the text direction.

In a column, <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> keep following DOM order, so they stay consistent with <kbd>ArrowUp</kbd> and <kbd>ArrowDown</kbd>.

**fix(grid):** Fixed <kbd>Home</kbd> and <kbd>End</kbd> being swapped in `sp-grid`. <kbd>Home</kbd> now moves focus to the first item and <kbd>End</kbd> to the last, as in every other focus group.
