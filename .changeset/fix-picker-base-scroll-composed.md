---
'@spectrum-web-components/picker': patch
'@spectrum-web-components/action-menu': patch
---

**fix(picker, action-menu):** Prevent the internal menu scroll event from crossing the shadow DOM boundary.

`Picker`, `PickerBase`, and `ActionMenu` re-dispatch a `scroll` event on their host when the internal menu scrolls. The event was created with `composed: true`, allowing it to cross the shadow DOM boundary and reach ancestor elements, which could close an enclosing overlay while the user was scrolling the menu. The event is now non-composed: it still fires on the component host for consumers, but no longer escapes into ancestors. This applies the #6028 fix to `PickerBase` and `ActionMenu`, which were previously missed.

Reported by PSWeb.
