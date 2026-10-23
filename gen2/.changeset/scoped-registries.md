---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

**feat(core):** Add experimental support for scoped custom element registries, so independently built apps on one page can each use their own version of Spectrum Web Components with the same tag names.

- **`Component.define(registry)`:** Every component class can define itself, and the elements it renders internally, in any registry. With no argument, it uses the global registry. Defining the same class again does nothing.
- **`@adobe/spectrum-wc/registry`:** A new entry that exports the scoped `registry` of the loaded copy, its `@adobe/spectrum-wc` `version`, `ScopedElementMixin`, and `scopedRenderOptions()`. The registry is also published at `window.__swc.scopedRegistries.get(version)`. Importing the entry throws in browsers without scoped registry support.
- **Per-instance registries:** Components create their shadow root and render their templates with the registry they were created in. Components created in the global registry render as before.
- **Class imports no longer register globally (breaking):** Importing a class, for example `CloseButton` from `@adobe/spectrum-wc/close-button`, no longer defines the elements it renders, such as `<swc-ui-icon>`, in the global registry. If you define a class yourself with `customElements.define()`, call `CloseButton.define()` or import its `swc-*.js` registration file instead. Registration files are unchanged.
- **`defineElement(name, constructor, registry)`:** Takes an optional registry and does nothing when the same constructor is already defined under that name.

See the "Scoped registries" guide for usage and browser support.
