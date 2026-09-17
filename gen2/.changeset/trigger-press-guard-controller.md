---
'@adobe/spectrum-wc-core': minor
'@adobe/spectrum-wc': minor
---

**feat(core):** Added `TriggerPressGuardController`, a Lit reactive controller for click-to-toggle triggers on light-dismissible surfaces (`popover="auto"`, a non-modal `<dialog>`).

Pressing the trigger again while the surface is open light-dismisses it before the trailing click fires, so a naive `open = !open` handler reads `open` as already `false` and reopens the surface on the click that should have closed it. `Popover.base.ts` (and `<swc-popover>` transitively) now composes this controller instead of carrying its own copy of the fix. Also fixes a related edge case where a native dismissal noted during a press that then ends without a click (for example the platform reinterprets it as a scroll) could get stuck and silently swallow the next, unrelated click on the trigger.
