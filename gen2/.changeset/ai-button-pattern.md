---
'@adobe/spectrum-wc': minor
---

**feat(ai-button):** Add `<swc-ai-button>` to the AI toolkit: a pill-shaped button that starts an AI action, such as "Ask AI".

- Shows a pixel-art icon, drawn by a static `<swc-pixel-loader>`, before an optional label. The icon is the AI mark by default; set `icon` to any pixel loader icon name to change it. Without a label, it renders as a circular icon-only button that takes its name from `accessible-label`.
- Supports the `s`, `m` (default), `l`, and `xl` sizes and the disabled state, in light and dark themes. A gradient glow grows on hover.
- Its appearance is fixed by design, so it has no public CSS custom properties.
