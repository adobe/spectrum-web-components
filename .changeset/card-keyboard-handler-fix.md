---
'@spectrum-web-components/card': patch
---

**Fixed** keyboard event handler to prevent unintended fall-through behavior in switch cases. Added missing `break` statements after Space key and Enter key handlers to ensure proper event handling flow.
