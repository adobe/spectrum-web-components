---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

Add the 2nd-gen `<swc-infield-button>`, the Spectrum 2 net-new icon button for form fields.

- **API**: `accessible-label` (required, maps to `aria-label` on the inner `<button>`), `size` (`s`/`m`/`l`/`xl`), `quiet`, and `disabled`. Does not inherit the 1st-gen link attributes (`href`, `target`, etc.) or position attributes (`block`, `inline`). Accepts icon content via the named `icon` slot.
- **Accessibility**: button is set to `tabindex="-1"` (not in the tab order); the parent field owns keyboard behavior and the visible focus ring. Missing `accessible-label` fires a dev-mode console warning.
- **Styling**: `--swc-infield-button-*` custom-property surface covering background-color and icon-color per interactive state. Quiet treatment removes the background.
- **Docs and tests**: includes Storybook docs, a consumer migration guide, unit and Playwright accessibility tests.

Consumers migrating from `<sp-infield-button>` should rename the element tag, replace `label` with `accessible-label`, move icon content to `slot="icon"`, and remove `block`/`inline` attributes. See the [consumer migration guide](?path=/docs/infield-button-migration-guide--docs) for full steps.
