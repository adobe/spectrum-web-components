---
'@spectrum-web-components/picker': minor
---

fix: moved tooltip outside of the trigger button content which prevents event propagation issues and fixes CSS hover state problems by properly separating the tooltip from the button's content (it no longer is a direct child in the DOM).
