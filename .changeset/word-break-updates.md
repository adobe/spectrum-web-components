---
'@spectrum-web-components/textfield': patch
'@spectrum-web-components/sidenav': patch
'@spectrum-web-components/tooltip': patch
---

Replace deprecated `word-break: break-word` with `overflow-wrap: break-word` to align with modern CSS standards and improve cross-browser compatibility. This property was deprecated in Chrome 44 (July 2015) in favor of the standardized `overflow-wrap` property.
