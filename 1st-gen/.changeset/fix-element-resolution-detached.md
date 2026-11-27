---
'@spectrum-web-components/reactive-controllers': patch
---

**fix(reactive-controllers):** Fixed `ElementResolutionController` throwing `TypeError: parent.getElementById is not a function` when its selector changes while the host element is detached from the document, for example when `sp-overlay`'s `trigger` or `sp-field-label`'s `for` is updated during a framework route or view swap. While the host is detached, the controller now skips the lookup and clears the resolved element, then resolves it again when the host reconnects.
