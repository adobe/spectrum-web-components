---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-icons': patch
---

Publish consumer documentation for the Spectrum 2 icon families and make UI icons deliverable.

- **UI icons are now deliverable.** `<swc-ui-icon>` (chevrons, checkmarks, arrows, and other control internals) ships from `@adobe/spectrum-wc` with its own consumer docs page next to workflow icons, rather than being internal-only.
- **Custom SVG contract documented.** The `<swc-icon>` frame now has a public docs page describing the contract for a slotted SVG: a single `<svg>` with a `viewBox`, no `width`/`height`, and `fill="currentColor"` so it follows text color and `--swc-icon-color`.
- **Per-family usage docs** for UI icons and the `<swc-icon>` frame, plus the 1st-gen icon migration guide, are now part of the published Storybook build (previously excluded as internal-only pages).
- **Removed the `elements/*` shared-template catalog.** `@adobe/spectrum-wc/icon` no longer re-exports the `elements/*` `TemplateResult` helpers. Slot a workflow icon (as its custom element) or your own SVG into `<swc-icon>` instead.
- **Removed `--swc-close-button-icon-size` (breaking).** This documented `@cssprop` is gone from `<swc-close-button>`. The cross icon now sizes from the button's `size` attribute (forwarded to `<swc-ui-icon>`), keeping the box and the optical step in sync. Remove any `--swc-close-button-icon-size` override; use `size` to change the icon, and `--swc-close-button-size` to size the button box.

The `@adobe/spectrum-wc-icons` change moves the ambient `*.css` module declaration into `src/` so the package's generated type declarations resolve icon stylesheet imports cleanly.
