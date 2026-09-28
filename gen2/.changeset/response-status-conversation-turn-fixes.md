---
'@adobe/spectrum-wc': patch
---

**fix(ai-toolkit):** Accessibility and layout fixes across the response-status and conversation patterns.

- `<swc-response-status>` keeps its row and pixel loader mounted when the first step arrives. Without steps, active labels are status text rather than inert buttons; with steps, a native disclosure button spans the row's hit area. Completed labels wrap in full unless a line cap is set. The row spans the column, and toggle padding and focus rings are corrected.
- `<swc-conversation-turn>` aligns turns and gives user messages a responsive reading-width cap: 75% of the column, at least 25ch where space permits, and at most 536px. The thread gap uses spacing-400.
- `<swc-message-sources>` spaces the first source inside the list without leaving an empty gap when closed. `<swc-user-message>` spacing is also corrected.
- Response-status steps have tighter icon spacing and an updated label shimmer animation.
