---
'@adobe/spectrum-wc': minor
---

**fix(tabs):** Addressed review feedback on the `SelectionController` / `FocusgroupNavigationController` integration in `<swc-tabs>`.

- `SelectionController.setSelectedItem()`, `.refresh()`, `.toggleItem()`, `.selectAll()`, and `.clearAll()` accept a new `{ silent: true }` option to commit a selection transition without invoking `confirmSelectionChange` or dispatching the controller's change event, replacing an internal ad hoc suppression flag in `Tabs.base.ts` that could get stuck if a call threw.
- `confirmSelectionChange` now runs _after_ mutators and internal state have already been applied for the candidate transition (reverted if it returns `false`), matching 1st-gen Tabs' apply-then-revert-on-cancel pattern. A `change` listener on `<swc-tabs>` now sees the newly selected tab on both `event.target.selected` and the tab's own `selected` property, as it did in 1st-gen — this is a bug fix, not a behavior change consumers need to migrate for.
- New `enableInteraction` option lets a consumer use `SelectionController` purely for its mode-aware selection bookkeeping without attaching its own click/keydown handling — used by `<swc-accordion>`, whose items own their own interaction and cancelable-toggle lifecycle.
- New `isDisabled` option lets a consumer override the built-in disabled-participant check for cascading or computed disabled state.
- `FocusgroupNavigationController.setActiveItem()` and `.focusFirstItemByTextPrefix()` no longer depend on `refresh()` having run first in the same cycle; they now always recompute eligible items instead of trusting a cache that could be stale.
- `SelectionController`'s `defaultToFirstSelectable` no longer infers "host disabled" from an empty `getItems()` result; it only selects from the current eligible set.
