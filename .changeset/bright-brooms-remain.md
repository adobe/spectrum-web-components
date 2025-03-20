---
'@spectrum-web-components/picker': minor
'@spectrum-web-components/menu': minor
---

Disabled drag and select functionality of picker in mobile devices. This is done to prevent click event being captured behind the menu-tray combination because the menu was closing immediately on pointerup.

-   Fixed a bug where the picker in a dialog was not closing when clicking outside the dialog. ([#5111](https://github.com/adobe/spectrum-web-components/issues/5111))
-   Fixed another bug where the elements behind the menu were receiving click events. ([#5060](https://github.com/adobe/spectrum-web-components/issues/5060))
