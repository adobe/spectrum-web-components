---
'@spectrum-web-components/progress-bar': patch
---

**docs(progress-bar):** Added deprecation notices to `<sp-progress-bar>` ahead of the Spectrum 2 migration.

The `label`, `side-label`, and `progress` properties are now marked `@deprecated` and emit `window.__swc.DEBUG` warnings pointing to their `<swc-progress-bar>` replacements (`label` slot, `label-position="side"`, and `value`). Runtime behavior is unchanged when debug validation is disabled.
