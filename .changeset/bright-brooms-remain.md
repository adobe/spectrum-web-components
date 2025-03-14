---
'@spectrum-web-components/picker': minor
'@spectrum-web-components/menu': minor
---

Updated pointerup and click event handling in menu selection. The change event now fires after both the pointerup and click have completed successfully.

-   Fixed a bug where the picker in a dialog was not closing when clicking outside the dialog.
-   Fixed another bug where the elements behind the menu were receiving click events.
