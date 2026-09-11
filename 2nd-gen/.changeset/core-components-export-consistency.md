---
'@adobe/spectrum-wc-core': patch
---

**fix(core):** Added the missing `./components/<name>/index.js` subpath export (and matching `typesVersions` entry) for every `@adobe/spectrum-wc-core` component that only had the bare `./components/<name>` form. Also added the `./components/action-group` and `./components/popover` `typesVersions` entries, which were missing entirely.

All components now ship both the bare and explicit-`.js` specifier forms consistently. No source, behavior, or public API change.
