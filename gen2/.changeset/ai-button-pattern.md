---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': patch
---

**feat(ai-button):** Add `<swc-ai-button>` to the AI toolkit: a pill-shaped button that starts an AI action, such as "Ask AI".

- Shows an S2 workflow icon before an optional label: the AI mark by default, or one of 7 AI workflow icons set with `icon` (`ai-chat-conversation`, `ai-expand`, `ai-fill`, `ai-image`, `ai-image-generate`, `ai-layer`, or `ai-search`). Without a label, it renders as a circular icon-only button that takes its name from `accessible-label`.
- An element in the `icon` slot replaces the built-in icon. Use it only when no AI icon fits.
- Supports the `m` (default), `l`, and `xl` sizes and the disabled state, in light and dark themes. Given the intended use cases of the AI button, there's no small size. A gradient glow grows on hover.
- Adds a translucent contrast layer to keep enabled labels and icons legible over black and white backgrounds without changing the disabled appearance.
- Uses an opaque system-colored face in forced-colors mode and clips the decorative glow to the rounded face.
- Lets button subclasses provide the documentation URL used by missing-label warnings, so AI button warnings link to its pattern documentation.
- Its appearance is fixed by design, so it has no public CSS custom properties.
