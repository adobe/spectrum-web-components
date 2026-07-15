---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(color-loupe):** Added an adaptive white-first inner border to `<swc-color-loupe>` so its chrome meets WCAG 1.4.11 non-text contrast (≥3:1) across the color spectrum.

The inner border's opacity now escalates above its default floor only when the white outer halo can't itself carry 3:1 contrast against the loupe's color. The outer border, shape, and sizing are unchanged, and there is no public API change. This supersedes the prior practical-limits exception, matching the adaptive dual-border approach already shipped for `<swc-color-handle>`.
