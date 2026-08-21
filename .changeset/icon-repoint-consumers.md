---
'@adobe/spectrum-wc': patch
---

Repoint `CloseButton`, `MessageSources`, and `ResponseStatus` off the pre-RFC `icon/elements/` module onto the internal `<swc-ui-icon>` element, matching the Accordion POC. No public API changes.

- Visual change: `swc-close-button`'s cross icon now uses the RFC's fixed size-to-step map instead of its old ad hoc numbering. `s`/`m` now render the previously-unused `Cross75`/`Cross100` glyphs in place of the old `Cross200`/`Cross300` shapes, and `l`/`xl` may render a slightly different glyph than before. The `m` size's icon box remains `ui-icon-large` (12px), matching the S2 spec.
- Visual change: `MessageSources` and `ResponseStatus` chevrons now use `<swc-ui-icon icon="chevron" size="s">` instead of a custom `10px` inline size. The rendered size is unchanged at the default theme scale, but now follows the `ui-icon-small` token, so it scales under `--swc-theme--sizeL` instead of staying fixed at `10px`.
