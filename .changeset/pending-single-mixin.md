---
'@spectrum-web-components/core': minor
'@adobe/spectrum-wc': patch
---

Extract the pending (busy) state into a single `PendingMixin` and a shared `renderPendingSpinner` directive so any component can adopt pending without subclassing `ButtonBase`.

- **`@spectrum-web-components/core`**: adds `PendingMixin` (`/mixins`) which owns all pending state: the 1-second-delayed `pendingActive` flag, inline-size freeze via `--swc-pending-inline-size`, accessible-name derivation, and capture-phase click suppression. Adds the `renderPendingSpinner` directive (`/directives/pending-spinner`), relocated from the button package to `core` so non-button components can reuse it without coupling to button. `ButtonBase` no longer owns pending state.
- **`@adobe/spectrum-wc`**: `swc-button` and `swc-action-button` now opt in via `PendingMixin`. No public API change — `pending`, `pending-label`, and the busy behavior are unchanged.
