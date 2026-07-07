---
'@adobe/spectrum-wc': minor
---

**fix(tabs):** Addressed review feedback on the `SelectionController` / `FocusgroupNavigationController` integration in `<swc-tabs>`.

- **Breaking:** the `change` event now fires _before_ selection state (`<swc-tabs>`'s `selected` property and each `<swc-tab>`'s `selected` property) is updated, instead of after. `preventDefault()` still blocks the transition; listeners that read `selected` from the event target or a tab to determine the newly selected tab must read the interacted tab directly instead. See the [Tabs migration guide](../2nd-gen/packages/swc/components/tabs/migration-guide.mdx#behavior-changes).
- `SelectionController.setSelectedItem()` and `.refresh()` accept a new `{ silent: true }` option to commit a selection transition without invoking `confirmSelectionChange` or dispatching the controller's change event, replacing an internal ad hoc suppression flag in `Tabs.base.ts` that could get stuck if a call threw.
- `FocusgroupNavigationController.setActiveItem()` and `.focusFirstItemByTextPrefix()` no longer depend on `refresh()` having run first in the same cycle; they now always recompute eligible items instead of trusting a cache that could be stale.
- `SelectionController`'s `defaultToFirstSelectable` no longer infers "host disabled" from an empty `getItems()` result; it only selects from the current eligible set.
