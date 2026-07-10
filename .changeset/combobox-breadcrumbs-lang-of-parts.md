---
'@spectrum-web-components/combobox': patch
'@spectrum-web-components/breadcrumbs': patch
---

**Fixed**: Propagate `lang`/`dir` for a single item's language without breaking layout:

- Combobox: forwards `lang`/`dir` from slotted `<sp-menu-item>` (or `.options` data) onto the rendered popover `<sp-menu-item>`, and syncs the input's own `lang` to the committed option's language for correct pronunciation
- Breadcrumbs: forwards the same `lang`/`dir` propagation to the "More items" overflow menu
- `BreadcrumbItem` now forwards `lang`/`dir` to `#item-link` only, so a single item's language does not flip its own layout or mirror its separator's chevron; the separator tracks the ambient direction (nearest ancestor `dir`, or the document default) instead of the host's own `dir` attribute, including live updates when an ancestor's `dir` changes after mount
