---
'@spectrum-web-components/core': patch
'@adobe/spectrum-wc': patch
---

**fix(popover):** Fixed `swc-popover` staying dismissed on the next unrelated outside click after a trigger press was dragged off and released elsewhere.

A `pointerdown` on the trigger followed by a drag off the trigger and a release elsewhere never dispatches a `click`, so the internal reopen-guard flag was left stuck `true`, misattributing the next unrelated outside light-dismiss to that stale press and swallowing the following legitimate trigger click.
