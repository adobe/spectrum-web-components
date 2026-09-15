---
'@spectrum-web-components/picker': patch
---

**fix(picker):** the mobile Tray now reopens after being dismissed by an outside tap. When the overlay closed externally with `preventNextToggle === 'no'`, `handleBeforetoggle` set the host's `open` to `false` but left the interaction controller's `open` state stale at `true`, so the next tap set `preventNextToggle = 'yes'` and skipped the toggle. The controller state is now synced on external close, matching the sibling branch.
