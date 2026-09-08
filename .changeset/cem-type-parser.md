---
'@adobe/spectrum-wc': patch
---

**docs(\*):** The published Custom Elements Manifest now expands referenced type aliases into their literal values via `@wc-toolkit/type-parser`. Properties typed as a union alias (e.g. `variant`, `fill-style`, `static-color`) now list their allowed values in the Storybook API table and generate a `select` control automatically, without inlining the union in source or hand-wiring `argTypes.options` per story.
