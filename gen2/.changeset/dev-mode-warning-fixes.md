---
'@adobe/spectrum-wc-core': patch
'@adobe/spectrum-wc': patch
---

**fix(dev-validation):** Fixed two problems with dev mode warnings. No consumer action required.

- Setting `window.__swc = { ...window.__swc, DEBUG: false }` before the first component loads now turns dev mode off, as the [dev mode warnings guide](https://spectrum-web-components.adobe.com/?path=/docs/guides-dev-mode-warnings--docs) says. The "in dev mode" notice is not logged in that case either.
- Warnings now link to a docs page that exists, for the element that warned. Warnings from `<swc-progress-bar>` linked to the meter docs; warnings from `<swc-action-button>`, `<swc-close-button>`, and `<swc-infield-button>` linked to the button docs; and warnings from `<swc-action-group>`, `<swc-dropzone>`, `<swc-status-light>`, and `<swc-prompt-field>`, the dev mode notice, and the duplicate element warning linked to pages that do not exist.
