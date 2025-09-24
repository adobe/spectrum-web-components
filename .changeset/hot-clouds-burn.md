---
'@spectrum-web-components/button': patch
---

**Fixed** aria-label updates when `label` property changes.

- Added pending state checks to prevent `aria-label` conflicts when `PendingStateController` is managing accessibility attributes
