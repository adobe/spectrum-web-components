---
'@adobe/spectrum-wc': patch
---

**fix(action-button):** `<swc-action-button>` now tracks label content added or removed after the initial render.

The default slot wasn't bound to `SlotTextController`'s `handleSlotChange`, so `hasLabel` only reflected content present at connect. Dynamically clearing or setting the label in a consumer app (e.g. a framework re-render) left the `swc-ActionButton--iconOnly` class and its spacing stale until an unrelated property change forced a re-render.
