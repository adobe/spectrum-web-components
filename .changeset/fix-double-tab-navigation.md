---
'@spectrum-web-components/button': patch
---

**Fixed** issue where clicking `sp-button` or `sp-action-button` with `href` and `target="_blank"` opened two tabs in Chrome instead of one.

The fix checks if the anchor element is already in the click event's composed path before triggering a proxy click. When the user clicks directly on the button, the absolutely-positioned anchor naturally receives the click, so no proxy is needed. The proxy click is now only triggered for keyboard activation and VoiceOver, where the anchor isn't in the click path.
