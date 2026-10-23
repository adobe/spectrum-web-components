---
'@adobe/spectrum-wc': patch
---

**fix(ai-toolkit):** Make the response-status width scale with its conversation thread, and fix several detail-panel issues surfaced while testing it.

- `swc-response-status` no longer caps its width at a fixed `540px`; it now scales as a percentage of its parent conversation thread's width (90% in narrow containers down to 65% in wide ones, interpolating smoothly in between).
- Completed/settled status labels now default to 1 line (truncating with an ellipsis) instead of wrapping to 2; override with `--swc-response-status-label-max-lines`.
- A `<pre>` slotted into a step's `description` (e.g. a pasted code sample) never wraps and scrolls horizontally instead, and no longer gets clipped before reaching the end of its scroll range in a narrow host.
- The detail panel's scroll fade no longer dims its scrollbar; the fade and the scrollbar now render independently, and the fade stays pinned to the panel edges instead of scrolling away with horizontally-scrolling code content.
