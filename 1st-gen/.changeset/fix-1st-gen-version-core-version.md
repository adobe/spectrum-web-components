---
'@spectrum-web-components/base': patch
'@spectrum-web-components/theme': patch
---

**fix**: align the generated 1st-gen version metadata with the removed core dependency tracking.

The generated `@spectrum-web-components/base` version file no longer exports a stale `coreVersion`, and the 1st-gen `CORE_VERSION` static stays aligned with `VERSION` to preserve runtime compatibility without tracking a removed dependency.
