---
'@adobe/spectrum-wc': patch
---

**fix(ai-toolkit):** Make the response-status width scale with its conversation thread, and fix several detail-panel issues surfaced while testing it.

- `swc-response-status` no longer fills the full width of its parent; it now scales as a percentage of its parent conversation thread's width (90% in narrow containers down to 65% in wide ones, interpolating smoothly in between).
- Settled status labels now default to 1 line (truncating with an ellipsis) instead of wrapping to 2; a status with no steps (no disclosure panel to open into) shows its label in full instead. Override with `--swc-response-status-label-max-lines`.
- A `<pre>` slotted into a step's `description` (e.g. a pasted code sample) never wraps and scrolls horizontally instead, renders at a size closer to the surrounding prose, and no longer gets clipped before reaching the end of its scroll range in a narrow host.
- The detail panel's scroll fade no longer dims its scrollbar; the fade and the scrollbar now render independently, and the fade stays pinned to the panel edges instead of scrolling away with horizontally-scrolling code content.
- The detail panel's scroll region is now keyboard-focusable when a short-but-wide `<pre>` overflows horizontally, not just when it overflows vertically; the fade overlays only render while the panel overflows vertically (a horizontally-scrolling single line no longer gets a washed-out fade), and they stay in sync if the description grows while the panel is already open.
- A slotted `<pre>` now stays left-to-right regardless of document direction, since code content is always LTR.
- Long non-code content (e.g. a URL or path) in a narrow host no longer gets its trailing edge (and scrollbar) clipped by the detail panel's own box model.
- `swc-conversation-turn`'s full-width stretch rule for system turns is now scoped to `swc-system-message` instead of any slotted content, so a `swc-response-status` slotted directly into a system turn keeps its own width clamp instead of being stretched to fill the column.
