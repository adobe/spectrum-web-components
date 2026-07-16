---
'@adobe/spectrum-wc-core': minor
'@adobe/spectrum-wc': patch
---

**refactor(core):** Replace the `ObserveSlotPresence` and `ObserveSlotText` mixins with reactive controllers, following the mixin-composition guidance to prefer controllers over deep mixin chains.

- **`@adobe/spectrum-wc-core`**: adds `SlotPresenceController` (`/controllers/slot-presence-controller`), which tracks whether slotted content matching one or more CSS selectors is present in the light DOM, and `SlotTextController` (`/controllers/slot-text-controller`), which tracks whether a slot has meaningful text or element content. Both are documented in the Controllers section of Storybook with stories and tests. The `ObserveSlotPresence` and `ObserveSlotText` mixins and their subpath exports (`/mixins/observe-slot-presence.js`, `/mixins/observe-slot-text.js`) are **removed**; consumers should construct the corresponding controller instead. `SlotTextController` requires binding `handleSlotChange` to the observed slot's `@slotchange` event.
- **`@adobe/spectrum-wc`**: `swc-badge`, `swc-button` (and its subclasses), `swc-accordion-item`, and the linear-progress components (`swc-progress-bar`) now derive their icon/label/actions/slot state from these controllers. No public API or behavioral change — the controllers reproduce the mixins' behavior.
