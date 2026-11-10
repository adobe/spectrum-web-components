---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

**feat(core):** Add experimental support for scoped custom element registries, so independently built apps on one page can each use their own version of Spectrum Web Components with the same tag names.

- **`Component.define(registry)`:** Every component class can define itself in any registry, together with the elements it renders internally and the child elements it needs. With no argument, it uses the global registry. Defining the same class again does nothing.
- **`@adobe/spectrum-wc/registry`:** A new entry that exports `getRegistry()`, `supportsScopedRegistries()`, `ScopedElementMixin`, `scopedRenderOptions()`, and the `@adobe/spectrum-wc` `version`. Importing it has no side effects. `getRegistry()` returns the scoped registry of the loaded copy and publishes it at `window.__swc.scopedRegistries.get(version)`. It throws in browsers without scoped registry support, and when another copy of the same version already published its registry.
- **Per-instance registries:** Components render their templates with the registry they were created in, including in existing shadow roots and light-DOM render roots. Components created in the global registry render as before.
- **Class imports no longer register globally (breaking):** Importing a class, for example `CloseButton` from `@adobe/spectrum-wc/close-button`, no longer defines the elements it renders, such as `<swc-ui-icon>`, in the global registry. If you define a class yourself with `customElements.define()`, call `CloseButton.define()` or import its `swc-*.js` registration file instead.
- **Registration files define required children:** Importing `swc-tabs.js` also defines `<swc-tab>` and `<swc-tab-panel>`, and importing `swc-accordion.js` also defines `<swc-accordion-item>`. Importing their own registration files as well still works.
- **Tokens in shadow roots:** `tokens.css` also targets `:host`, and `swc.css` sets up the scale on `:host`. An app that loads both in its shadow root gets its own version's tokens, even when the page loads another version. In the document, `:host` matches nothing, so pages don't change. If you load these files in a component's shadow root, they now set the tokens on that component, so token overrides on its ancestors no longer reach inside it.
- **Text Field invalid icon:** Text Field renders its invalid icon inside `<swc-icon>`, so `swc-text-field.js` now defines `<swc-icon>` instead of `<swc-icon-alert-triangle>`.
- **`defineElement(name, constructor, registry)`:** Takes an optional registry and does nothing when the same constructor is already defined under that name.

See the "Scoped registries" guide for usage and browser support.
