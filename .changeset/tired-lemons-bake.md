---
'@spectrum-web-components/contextual-help': patch
---

## Changeset

**Fix: Contextual Help popover inaccessible to screen readers**

Adds required ARIA attributes to associate the trigger button with popover content, enabling screen readers to announce the heading and body text when the popover opens.
