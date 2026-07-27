---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
'@spectrum-web-components/dropzone': patch
---

Add the 2nd-gen `<swc-dropzone>`, migrated from the Spectrum 1 `<sp-dropzone>`.

- **API**: `dropEffect`, `dragged`, `filled`, `size` (new), and localizable `dragged-message`/`filled-message`/`replace-message` status text. Renames `isDragged`/`isFilled` to `dragged`/`filled` and events to the `swc-dropzone-*` prefix; adds a dedicated `filled-content` slot instead of restyling the default slot in place.
- **Accessibility**: fixed `role="group"` host requiring an accessible name, a visually-hidden `role="status"` region announcing drag and drop state changes, and no host `tabindex` (the slotted browse control owns the tab stop).
- **Styling**: SVG stroke border matching Spectrum 2's dashed-corner treatment, three sizes, and a small `--swc-dropzone-*` custom-property surface.
- **Docs and tests**: includes Storybook docs, a consumer migration guide, unit and accessibility tests, and dedicated VRT coverage.

**fix(illustrated-message):** `<swc-illustrated-message>`'s default slot is now reactive to content added after first render. It previously only re-evaluated on `characterData` mutations, missing element insertions such as a dynamically added illustration.

1st-gen `<sp-dropzone>` gains development-mode deprecation warnings for `isDragged`/`isFilled`, the upcoming `swc-dropzone-*` event rename, and overriding `onDragOver`/`onDragLeave`/`onDrop`, matching the pattern used for other migrated components.
