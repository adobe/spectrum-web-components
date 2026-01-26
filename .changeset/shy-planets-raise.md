---
'@spectrum-web-components/slider': patch
---

**Fixed**: Arrow key events now stop propagation when handled by the slider, preventing them from bubbling up to parent elements.

Previously, arrow key events (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) would propagate to ancestor containers even when the slider was actively handling value adjustments. This could cause unintended side effects in layouts or applications that also listen for arrow key events.
