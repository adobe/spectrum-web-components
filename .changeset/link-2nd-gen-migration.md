---
'@adobe/spectrum-wc': minor
---

`Link` — Added 2nd-gen link styles for native `<a href>` elements (no `swc-link` custom element). Default prose and link-list appearance ships with Typography; explicit modifiers live in `link.css`, with optional `global-link.css` for application-wide bare-anchor baseline. See the [component docs](https://spectrum-web-components.adobe.com/?path=/docs/components-link--docs) and [migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-link-migration-guide--docs). Consumer action: replace `<sp-link>` with native `<a href>` and the classes or Typography wrappers documented in the migration guide.
