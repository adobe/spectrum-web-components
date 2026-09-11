---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(thumbnail):** Migrated `<swc-thumbnail>`'s CSS to Spectrum 2 tokens for full visual fidelity (all 12 sizes, bordered frame, `fit="cover"|"contain"`, forced-colors support), matching the `spectrum-css` `spectrum-two` source.

Also fixes two accessibility bugs: `aria-hidden` could get stuck on the host after `decorative` was unset, and the missing-`alt` DEBUG warning could log twice on first render. No public API changes.
