---
'@spectrum-web-components/picker': patch
'@spectrum-web-components/action-menu': patch
---

**fix(picker, action-menu):** Stop the internal menu scroll from surfacing on the component host.

`Picker`, `PickerBase`, and `ActionMenu` were re-dispatching the internal `sp-menu` scroll event on their own host element (previously with `composed: true`, which also let it cross the shadow DOM boundary into ancestor light DOM). The internal scroll is now absorbed and no longer re-dispatched, so consumers no longer receive a spurious `scroll` event from the component or its ancestors.

Reported by PSWeb.
