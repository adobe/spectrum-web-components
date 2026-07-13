---
'@adobe/spectrum-wc': minor
---

Add `SelectionController`, a Lit `ReactiveController` that manages click- and keyboard-driven selection for groups of sibling elements — tabs, radio groups, and segmented view-switcher button groups. It owns capture-phase `click` (and, optionally, Enter/Space `keydown`) on its host, keeps an internal cache of the current selection, and supports `single` and `single-toggle` modes. Pair with `FocusgroupNavigationController` for composites that also need roving `tabindex` and arrow-key navigation.

A `multiple` mode (independent per-item toggling, `selectAll()`) is tracked separately on another branch and not part of this change.

This controller targets items that never change their own selected-ish state independently (a plain button, a tab, a radio). A separate, more complex controller for self-owning items (an accordion panel with its own `open` property, a menu item with its own `selected` state) is tracked separately and not part of this change.

`<swc-tabs>` now uses `SelectionController` internally for click, Enter/Space, and `selected`-property bookkeeping — its public API and documented behavior are unchanged. Arrow-key/Home/End navigation is untouched.
