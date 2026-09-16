---
'@spectrum-web-components/dropzone': patch
---

1st-gen `<sp-dropzone>` gains `@deprecated` JSDoc for `isDragged`/`isFilled`, `onDragOver`/`onDragLeave`/`onDrop`, and the removed `DropzoneEventDetail` type, plus matching development-mode console warnings for the upcoming `swc-dropzone-*` event rename and overriding the drag handler methods. `isDragged`/`isFilled` have no runtime warning: both attributes (`dragged`/`filled`) are unchanged and still valid, so Lit's attribute-to-property sync and (for `isDragged`) the component's own internal drag handling route through the same reactive properties a consumer's JS assignment would use, and a warning there would fire for ordinary, unmigrated attribute/template-binding usage the migration plan explicitly promises is unaffected.
