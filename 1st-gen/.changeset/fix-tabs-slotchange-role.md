---
'@spectrum-web-components/tabs': patch
---

**fix(tabs):** Fixed `sp-tabs` ignoring `sp-tab` elements that are added after the initial render, for example when the slotted tabs are swapped out. `sp-tab` now sets `role="tab"` when it connects instead of after its first render, so `sp-tabs` finds the new tabs when the slot changes. Before this fix, the current `selected` value was cleared and the new tabs could not be selected unless `role="tab"` was set on them manually.
