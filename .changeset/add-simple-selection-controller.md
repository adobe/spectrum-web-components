---
'@adobe/spectrum-wc': patch
---

Add `SelectionController`, a Lit `ReactiveController` that manages click- and keyboard-driven selection for groups of sibling elements — tabs, radio groups, segmented view-switcher button groups, and multi-select filter chips. It owns capture-phase `click` (and, optionally, Enter/Space `keydown`) on its host, keeps an internal cache of the current selection, and supports `single`, `single-toggle`, and `multiple` modes. Pair with `FocusgroupNavigationController` for composites that also need roving `tabindex` and arrow-key navigation.

This controller targets items that never change their own selected-ish state independently (a plain button, a tab, a radio). A separate, more complex controller for self-owning items (an accordion panel with its own `open` property, a menu item with its own `selected` state) is tracked separately and not part of this change.

`FocusgroupNavigationController`'s `focusgroupNavigationActiveChange` event now includes a `reason` field (`'keyboard' | 'focus' | 'programmatic' | 'refresh'`) describing what caused the active item to change. This is additive — existing consumers (`ConversationThread`, `MessageFeedback`) that don't read `reason` are unaffected. Consumers implementing "selection follows focus" should react only to `'keyboard'` and `'focus'`; `'refresh'` and `'programmatic'` fire when the roving tab stop is recomputed without the user actually moving focus there (for example on mount, or when re-enabling after `disabled`), and treating those as real navigation would fire a spurious selection.

`<swc-tabs>` now uses `SelectionController` (click, Enter/Space, `selected`-property bookkeeping) and `FocusgroupNavigationController` (arrow-key / Home / End roving `tabindex`) internally, replacing hand-rolled equivalents. Its public API and documented behavior are unchanged; the `reason` field above is what keeps `keyboard-activation="automatic"` from selecting a phantom tab on mount or after a `disabled` toggle.
