---
'@spectrum-web-components/action-group': patch
---

Add `@deprecated` JSDoc to `sp-action-group`'s `vertical`, `selects`, `selected`, and `emphasized`, plus a runtime `window.__swc.warn()` deprecation notice on the `selected` setter, ahead of removal in gen2 `<swc-action-group>`.
