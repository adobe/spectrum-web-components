---
'@adobe/spectrum-wc': patch
'@adobe/spectrum-wc-core': patch
---

Repoint `CloseButton`, `MessageSources`, and `ResponseStatus` off the pre-RFC `icon/elements/` module onto the internal `<swc-ui-icon>` element, matching the Accordion POC. No public API changes.

- Fixed a pre-existing bug where `swc-close-button`'s default (`m`) size had no `:host([size="m"])` rule, so its cross icon fell through to the `ui-icon-large` box size instead of `ui-icon-medium`.
- Visual change: `swc-close-button`'s cross icon now uses the RFC's fixed size-to-step map instead of its old ad hoc numbering, so `l`/`xl` may render a slightly different glyph than before.
- Visual no-op: `MessageSources` and `ResponseStatus` chevrons now use `<swc-ui-icon icon="chevron" size="s">` instead of a custom `10px` inline size; the rendered size is unchanged.
