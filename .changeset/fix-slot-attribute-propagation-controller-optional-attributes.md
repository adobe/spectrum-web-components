---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(slot-attribute-propagation-controller):** Fixed `SlotAttributePropagationController` permanently skipping re-propagation when a repeated value was recorded before its target slot had resolved, and added support for propagating attributes that are only sometimes present on the host.

`getValue` may now return `null` to remove the propagated attribute from assigned elements instead of setting it to an empty string. The `hostUpdated()` no-op guard now only records a value as applied once the slot actually resolves, so a slot that resolves after an earlier unsuccessful attempt with the same value is no longer skipped forever.

`SlotAttributePropagationController` is also now a public export of `@adobe/spectrum-wc-core` (`@spectrum-web-components/core/controllers/slot-attribute-propagation-controller.js`), alongside dedicated tests and a Storybook controller docs page. Existing consumers (`<swc-button-group>`, `<swc-illustrated-message>`) are unaffected aside from benefiting from the propagation-guard fix.
