---
'@adobe/spectrum-wc': patch
---

Repoint `CloseButton`, `MessageSources`, and `ResponseStatus` off the pre-RFC `icon/elements/` module onto the internal `<swc-ui-icon>` element, matching the Accordion POC. No public API changes.

- Visual change: `swc-close-button`'s cross icon now uses `<swc-ui-icon icon="cross">` and aligns to the latest design update
- Visual change: `MessageSources` and `ResponseStatus` chevrons now use `<swc-ui-icon icon="chevron" size="s">` instead of a custom `10px` inline size. The rendered size is unchanged at the default theme scale, but now follows the `ui-icon-small` token, so it scales under `--swc-theme--sizeL` instead of staying fixed at `10px`.
