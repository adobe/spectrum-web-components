---
'@adobe/spectrum-wc': patch
---

**fix(avatar):** `<swc-avatar>` now scales correctly when a parent component forces its box size, such as when slotted into `<swc-action-button>`'s `icon` slot.

Previously, `--swc-avatar-size` sized the internal image and background directly, independent of the host element's own box. A parent that overrides the host's `inline-size`/`block-size` (as `<swc-action-button>`'s icon slot CSS does, to match its own icon-size tokens) had no effect on the visible avatar, causing it to overflow its squeezed container. The host itself is now sized from `--swc-avatar-size`, and the internal image/background scale to 100% of the host, so external sizing on the host is inherited correctly. Standalone avatar sizing via the `size` attribute is unaffected.
