---
'@spectrum-web-components/action-button': patch
---

- **Deprecated**: The link API (`href`, `target`, `download`, `referrerpolicy`, `rel`) on `<sp-button>` is now deprecated. A dev mode warning is emitted when `href` is used, directing consumers to native HTML anchor elements with `@spectrum-web-components/styles/global-elements.css`.

- **Documented**: Updated action button README with deprecation notices.
