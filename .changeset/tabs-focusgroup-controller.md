---
'@spectrum-web-components/core': minor
'@adobe/spectrum-wc': minor
---

**refactor(tabs):** Migrate `<swc-tabs>` keyboard navigation to `FocusgroupNavigationController`.

Arrow-key, Home, and End navigation is now handled by the controller rather than by manually computed deltas in `handleKeyDown`. The `handleKeyDown` method retains only Enter/Space activation; all roving-tabindex management is delegated to the controller. In automatic activation mode, `focusgroupNavigationActiveChange` events with `source: 'keyboard'` drive selection-follows-focus; events with `source: 'refresh'` or `source: 'programmatic'` are intentionally ignored so that mounting or toggling `disabled` cannot trigger spurious `change` events.
