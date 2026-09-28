---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(tabs):** `<swc-tabs>` now links tabs that are added after the initial render to their panels.

The tab panels were only linked when the `tab-panel` slot changed, and `<swc-tab>` only got its `id` after its first render. When the slotted tabs were swapped out and the panels stayed, the new tabs had no `aria-controls` and the panels kept an `aria-labelledby` that pointed to the removed tabs. `<swc-tab>` now sets its `id` when it connects, and `<swc-tabs>` relinks the panels when the tabs change.
