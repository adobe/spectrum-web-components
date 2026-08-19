---
'@adobe/spectrum-wc': minor
---

**feat(live-selection-controller):** Added `LiveSelectionController`, a Lit reactive controller that enforces a selection constraint (single or multiple) on a group of items that each own their own selected state.

Use it for patterns like accordions and disclosure groups where items manage their own `open` or `selected` property and can change that state on their own initiative. Unlike a cache-authoritative controller, it reads item state live from the DOM on each observed event rather than maintaining an internal list, so it stays correct even when items change themselves outside a controller-driven transition.

The accordion (`swc-accordion`) now uses `LiveSelectionController` internally to enforce its exclusive-open constraint; its public API and behavior are unchanged.
