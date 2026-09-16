---
'@adobe/spectrum-wc-core': patch
---

**fix(color-loupe):** Added the missing `./components/color-loupe` subpath export (and `typesVersions` entry) to `@adobe/spectrum-wc-core`'s `package.json`.

`<swc-color-loupe>` was never reachable from `@adobe/spectrum-wc-core` under real exports-map resolution, which also broke `<swc-color-handle>` since it ships with `<swc-color-loupe>`. No source or API change, only the package export map.

All components now ship both the bare and explicit-`.js` specifier forms consistently. No source, behavior, or public API change.
