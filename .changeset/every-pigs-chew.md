---
'@spectrum-web-components/combobox': patch
---

Replace the use of offsetWidth with a resizeObserver to avoid unecessary, performance-impacting layout reflows.
