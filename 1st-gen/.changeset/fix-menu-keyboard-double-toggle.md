---
'@spectrum-web-components/menu': patch
---

**fix(menu):** Fixed `sp-menu-item` selection toggling on and immediately back off when pressed via <kbd>Space</kbd> or <kbd>Enter</kbd>.

The keydown handler called `focusElement.click()`, which already dispatches a click that flows through `handleClick` → `handlePointerBasedSelection` → `selectOrToggleItem`, and then called `selectOrToggleItem` a second time explicitly. The redundant second call toggled the item's selection state back off in the same tick, so keyboard users saw two `change` events and no visible selection, most noticeably with `selects="multiple"` where the final selected value reverted to empty.
