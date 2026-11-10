---
'@adobe/spectrum-wc': minor
---

**feat(ai-button):** Add `<swc-ai-button>` to the AI toolkit: a pill-shaped button that starts an AI action, such as "Ask AI".

- Shows an S2 workflow icon before an optional label: the AI mark by default, or one of 7 AI workflow icons set with `icon` (`ai-chat-conversation`, `ai-expand`, `ai-fill`, `ai-image`, `ai-image-generate`, `ai-layer`, or `ai-search`). Without a label, it renders as a circular icon-only button that takes its name from `accessible-label`.
- Supports the `s`, `m` (default), `l`, and `xl` sizes and the disabled state, in light and dark themes. A gradient glow grows on hover.
- Its appearance is fixed by design, so it has no public CSS custom properties.
