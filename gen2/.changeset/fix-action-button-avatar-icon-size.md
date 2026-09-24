---
'@adobe/spectrum-wc': patch
---

**fix(action-button):** A `<swc-avatar>` slotted into `<swc-action-button>`'s `icon` slot now automatically scales to match the button's icon size.

Previously, Avatar's own `size` attribute controlled its rendered size regardless of the action button's size, since Avatar's `:host([size])` sizing rule won the specificity contest with the icon slot's generic sizing rule for the avatar's _host box_ only — the visible image inside Avatar's shadow root ignored that squeeze entirely and rendered at its own `size`, causing it to overflow. Consumers previously had to manually pair an avatar `size` with the action-button `size` (e.g. `xl` action button with avatar `size="1000"`) to avoid a visual mismatch.

The icon slot now also sets `--swc-avatar-size` directly (the same way it already sets its own internal icon-size custom properties), which wins over Avatar's own `:host([size])` rule for a slotted avatar specifically because of how shadow-tree custom property cascading resolves rules matching via `::slotted()` against rules from the slotted element's own shadow tree. Avatar's `size` attribute becomes a no-op when slotted into an action button's icon slot; standalone avatar sizing is unaffected.
