---
'@adobe/spectrum-wc': patch
---

**fix(menu, popover):** Changed the open and close animation of `<swc-menu>` and `<swc-popover>` to match React Spectrum S2: both now fade and slide over 200 ms instead of 160 ms, opening with `ease` and closing with ease-in, so a closing surface no longer drops out abruptly.
