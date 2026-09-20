---
'@adobe/spectrum-wc': patch
---

**fix(ai-toolkit):** Visual and structural fixes across the response-status and conversation patterns.

- `<swc-response-status>` renders its header as a stable `<button>` in both the interactive and non-interactive states, toggling the disclosure wiring (role, tabindex, ARIA) via attributes instead of swapping the element tag; this stops the nested pixel loader's animation from restarting when the first step arrives. Also removes the toggle-row padding, keeps the header ring full-width, scopes focus rings to visible content, and fixes step-ring clipping.
- `<swc-conversation-turn>` aligns turn edges and caps the reading width.
- Trailing gap when `<swc-response-status>` is closed is removed, and `<swc-message-sources>` / `<swc-user-message>` spacing is corrected.
