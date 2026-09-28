---
'@spectrum-web-components/menu': patch
---

**fix(menu):** Reset the `mobile-view` drill-down when the containing `<sp-tray>` is dismissed.

Previously, drilling into a submenu and then dismissing the tray (click-outside, Escape, or programmatic close) kept the submenu state, so reopening the tray showed the stale submenu instead of the top-level menu. While drilled in, `<sp-menu mobile-view>` now listens for the containing tray's `close` event and resets the stack on dismiss. Desktop flyout submenus are unaffected.
