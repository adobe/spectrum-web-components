---
'@spectrum-web-components/picker': minor
---

**Fixed** escape key behavior in modal overlays containing picker components. Previously, pressing the Escape key when a picker was open inside a modal overlay would not properly close the modal, instead moving focus to the picker. Now, the escape key correctly closes the picker first (if open), then closes the modal overlay on subsequent escape key presses.

This fix adds a check for `this.open` in the picker's `handleEscape` method to ensure proper modal overlay closure behavior.
