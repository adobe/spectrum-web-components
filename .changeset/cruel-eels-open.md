---
'@spectrum-web-components/menu': patch
---

**Fixed** : MenuItem focus stealing from input elements on mouseover by enhancing MenuItem's `handleMouseover` method to detect when an input element currently has focus and prevent stealing focus in those cases.
