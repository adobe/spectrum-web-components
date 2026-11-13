---
'@adobe/spectrum-wc': patch
---

**fix(text-field, prompt-field):** `@adobe/spectrum-wc` no longer bundles its own copy of workflow icons. `<swc-text-field>` and `<swc-prompt-field>` now import them from `@adobe/spectrum-wc-icons`, which is now a dependency of `@adobe/spectrum-wc`. Before, a page that also loaded `@adobe/spectrum-wc-icons/swc-icon-alert-triangle.js` threw an error, because `swc-icon-alert-triangle` was defined twice. No consumer action required.
