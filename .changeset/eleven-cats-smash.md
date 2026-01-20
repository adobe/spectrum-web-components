---
'@spectrum-web-components/picker': patch
---

**Fixed**: Arrow key events now stop propagation when handled by the picker, preventing them from bubbling up to parent elements.

Previously, arrow key events (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) would propagate to ancestor containers even when the picker was actively handling them. This could cause unintended side effects in layouts or applications that also listen for arrow key events.
