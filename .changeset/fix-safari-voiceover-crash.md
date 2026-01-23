---
'@spectrum-web-components/picker': patch
'@spectrum-web-components/action-menu': patch
---

**Fixed**: Safari + VoiceOver crash when opening Picker and ActionMenu components.

The issue was caused by an imperative `render()` call inside the `renderOverlay()` method that synchronously mutated the DOM during the render cycle. When VoiceOver was enabled and scanning the accessibility tree of the newly opened overlay, Safari couldn't handle the simultaneous DOM mutation, resulting in a crash due to an unstable accessibility tree.

The crash only occurred when VoiceOver was already enabled before opening the overlay. If VoiceOver was enabled after the overlay opened, the DOM was stable and no crash occurred.
