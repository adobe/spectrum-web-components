---
'@spectrum-web-components/picker': patch
---

**fix(picker):** Prevent `PickerBase` internal scroll event from crossing shadow DOM boundary.

`PickerBase.onScroll()` was dispatching `new Event('scroll', { cancelable: true, composed: true })`, which allowed the event to escape the component's shadow root and propagate to ancestor elements in the light DOM. This was the same bug fixed for the `Picker` subclass in #6028, but the equivalent method in `PickerBase` was missed.

Reported by PSWeb.
