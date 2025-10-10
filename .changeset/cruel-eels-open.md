---
'@spectrum-web-components/menu': minor
---

**Fixed** MenuItem focus stealing from input elements on mouseover by enhanceing MenuItem's `handleMouseover` method to detect when an input element currently has focus and prevent stealing focus in those cases.
