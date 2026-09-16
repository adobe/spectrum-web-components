---
'@adobe/spectrum-wc-core': minor
'@adobe/spectrum-wc': minor
---

**refactor(core):** Leaned out `SpectrumElement`.

- Removed `hasVisibleFocusInTree()` from `SpectrumMixin` / `SpectrumInterface`. The same behavior is now the standalone `isFocusVisibleInTree(root)` utility exported from `@adobe/spectrum-wc-core/utils`. Call `isFocusVisibleInTree(this.getRootNode() as Document | ShadowRoot)` where a component previously used `this.hasVisibleFocusInTree()`.
- Removed the `get dir()` override from `SpectrumElement`; `element.dir` now resolves to the standard DOM attribute instead of the computed direction. No 2nd-gen component read this property (2nd-gen resolves direction via `getComputedStyle(...).direction` at each call site).
- Removed the `SpectrumMixin` and `SpectrumInterface` exports. With `hasVisibleFocusInTree` gone, the mixin only re-typed `shadowRoot` as non-null, which nothing relied on (all reads use `?.`). `SpectrumElement` now extends `LitElement` directly, and `shadowRoot` is `ShadowRoot | null` again as in Lit.
