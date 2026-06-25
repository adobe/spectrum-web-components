---
'@spectrum-web-components/core': minor
'@adobe/spectrum-wc': minor
---

Added an `actions` slot to `<swc-illustrated-message>` for placing a `<swc-button>` or `<swc-button-group>` below the description. The component automatically propagates its `size` to every slotted element. Also adds `SlotSizePropagationController`, an internal Lit `ReactiveController` that encapsulates this size-propagation pattern for use across `IllustratedMessage` and `ButtonGroup`.
