---
'@spectrum-web-components/core': patch
'@adobe/spectrum-wc': patch
---

Extract the pending (busy) state into reusable, decoupled 2nd-gen core primitives so any pending-capable component can adopt it.

- **`@spectrum-web-components/core`**: adds `PendingController` (`/controllers/pending-controller`) for the pending state (delayed activation, inline-size freeze, derived busy accessible name), the render-only `renderPendingSpinner` directive (`/directives/pending-spinner`), and `PendingMixin` (`/mixins`) which wires the controller, the `pending` / `pending-label` properties, and click suppression. `ButtonBase` no longer owns pending state.
- **`@adobe/spectrum-wc`**: `swc-button` and `swc-action-button` now consume these primitives via `PendingMixin`. No public API change — `pending` / `pending-label` and the busy behavior are unchanged.
