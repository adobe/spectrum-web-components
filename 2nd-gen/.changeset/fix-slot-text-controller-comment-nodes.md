---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(slot-text-controller):** `SlotTextController` no longer counts comment nodes as label content. A `${cond ? nothing : label}` binding leaves a Lit child-part marker (a comment node with non-empty data) in the default slot; its data was previously misread as label text during the controller's initial `host.childNodes` scan.

For a consumer whose default slot does not bind `@slotchange` (for example an icon-only `<swc-action-button>` with a conditional label), this made `hasContent` stay `true`, so the icon-only presentation was never applied. Only real text nodes now count.
