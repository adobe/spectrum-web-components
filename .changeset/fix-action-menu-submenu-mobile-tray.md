---
'@spectrum-web-components/action-menu': patch
'@spectrum-web-components/menu': patch
---

**fix(action-menu):** Submenus inside `sp-action-menu` now open correctly on mobile instead of dismissing the tray.

On mobile, `sp-action-menu` renders its menu inside an `sp-tray` but was not setting `mobile-view` on the inner `sp-menu`. This meant tapping a submenu item used flyout overlay logic whose click event bubbled up to the tray and triggered dismissal. The same failure occurred with VoiceOver on iOS, where a double-tap fires a synthetic `click` that bypasses the `pointerdown`/`pointerup` sequence entirely.

`mobile-view` is now applied automatically to the inner `sp-menu` when the action menu is rendering as a tray (i.e. on mobile without `force-popover`). Submenu activation routes through the drill-down path, which stops the event before it reaches the tray.

**fix(menu):** Added documentation for the `mobile-view` and `mobile-back-label` attributes, which were previously undocumented in the README.
