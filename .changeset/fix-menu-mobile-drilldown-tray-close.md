---
'@spectrum-web-components/menu': patch
---

**fix(menu):** Reset the mobile-view drill-down submenu stack when the containing `<sp-tray>` closes.

`resetMobileSubmenus()` was only called from `disconnectedCallback` (when `<sp-menu>` is removed from the DOM) or when the `mobile-view` attribute was toggled off at runtime. Since `<sp-tray>` hides itself visually on close without disconnecting its slotted content, dismissing the tray (e.g. by clicking outside) left the drill-down stack intact, so reopening the tray dropped the user back into the previously active submenu instead of the top-level menu. `<sp-menu mobile-view>` now listens for the containing tray's `close` event and resets the stack accordingly.
