---
'@spectrum-web-components/overlay': patch
---

**fix(overlay):** Removed the `./src/OverlayDialog.js` entry from the package `exports` map. The file does not exist, so importing that path always failed to resolve.
