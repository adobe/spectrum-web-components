---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

`Action Group` — Fixed arrow-key navigation for an invalid `orientation`: it now uses the default horizontal direction. An invalid `static-color` is no longer passed to child buttons, so they render their default. Both now warn through the standard development warning.
