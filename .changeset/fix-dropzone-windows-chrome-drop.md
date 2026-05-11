---
'@spectrum-web-components/dropzone': patch
---

**Fixed**: `sp-dropzone-drop` event not firing on Windows Chrome. Moved `event.preventDefault()` to the top of `onDragOver` so the browser always treats the element as a valid drop target, regardless of `dataTransfer` availability or `shouldAccept` state. Added `isDragged` guard in `onDrop` to prevent dispatching `sp-dropzone-drop` for rejected drags. Added `relatedTarget` check in `onDragLeave` to suppress spurious dragleave events when moving between child elements. Added cleanup of pending dragleave timeout in `disconnectedCallback`.
