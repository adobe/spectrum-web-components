---
'@spectrum-web-components/picker': patch
'@spectrum-web-components/action-menu': patch
---

**Fixed**: Safari + VoiceOver crash when opening Picker and ActionMenu. The issue was caused by an imperative `render()` call that mutated the DOM during the render cycle, causing Safari to crash while VoiceOver scanned the accessibility tree.
