---
'@adobe/spectrum-wc': patch
---

**docs(\*):** The published Custom Elements Manifest now expands referenced type aliases into their literal values via `@wc-toolkit/type-parser`. Properties typed as a union alias (e.g. `variant`, `fill-style`, `static-color`) now list their allowed values in the Storybook API table and generate a `select` control automatically, without inlining the union in source or hand-wiring `argTypes.options` per story. Aliases reaching a component through a mixin, and default values of accessor-backed properties, are resolved as well. Structural expansions are no longer written to the manifest, because they embedded compiler-internal symbol ids that made the published artifact non-reproducible.
