---
'@adobe/spectrum-wc': patch
---

**refactor(conversational-ai):** Tighten `swc-conversation-thread` focus handling and story layout for conversational AI.

- Roving focus for the thread is driven only by `FocusgroupNavigationController`; the reflected `active-index` attribute and related public surface are removed.
- Conversation thread stories avoid host inline layout styles in favor of neutral wrappers where needed.
- `swc-user-message` no longer applies host `margin-inline-end` gutter; rely on thread or app shell spacing for edge inset.
