---
'@spectrum-web-components/menu': patch
---

**fix(menu):** Fixed `sp-menu-item` submenus opening from a touch tap's `pointerup` in mobile view, bypassing the drill-down navigation.

`handlePointerdown`'s touch fast-path lacked an `!this.isMobileView` guard, so a touch `pointerup` on a menu item with a submenu triggered the desktop-style overlay-opening logic even when `mobile-view` was set. This left `currentMobileSubmenu` unset while the overlay-based submenu was also open, corrupting the drill-down bookkeeping and causing the next touch-driven submenu open to fail intermittently. In mobile view, submenus now open only via the click that follows a touch tap, consistent with the drill-down navigation model.
