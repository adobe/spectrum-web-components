---
'@spectrum-web-components/core': minor
'@adobe/spectrum-wc': minor
---

Added an `actions` slot to `<swc-illustrated-message>` for placing a `<swc-button>` or `<swc-button-group>` below the description. The component automatically propagates its `size` to every slotted element. Also adds `SlotAttributePropagationController`, an internal Lit `ReactiveController` that propagates any host attribute to slotted children; used by `IllustratedMessage` and `ButtonGroup`.
