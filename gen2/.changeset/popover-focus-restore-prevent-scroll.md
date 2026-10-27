---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

Fix `swc-popover` scrolling the page when closing a light-dismiss popover whose trigger has been scrolled out of view. On close, focus is restored to the trigger with `preventScroll` so the browser no longer scrolls the off-screen trigger back into view. This surfaced on touch devices (e.g. iPad), where tapping outside on non-interactive content does not blur the popover, so focus is still inside when it closes and restoration runs.
