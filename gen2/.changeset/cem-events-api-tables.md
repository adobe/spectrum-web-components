---
'@adobe/spectrum-wc': patch
---

**docs(\*):** Fix the Events tables in the gen2 API reference. The Custom Elements Manifest no longer lists events that the analyzer can't name, which showed as an empty row on `swc-tooltip` and `swc-accordion-item` and as a `type` event on `swc-response-status` and `swc-response-status-step`. `swc-button`, `swc-action-button`, `swc-close-button`, and `swc-infield-button` now document their `click` event. No component runtime changes.
