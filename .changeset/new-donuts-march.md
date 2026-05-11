---
'@adobe/spectrum-wc': minor
---

**feat(button):** Add 2nd-gen `<swc-button>` with full Spectrum 2 visual fidelity. Key changes from 1st-gen `<sp-button>`:

- Renders an internal native `<button>` as the semantic control; the custom-element host carries no button role or tab stop (`delegatesFocus: true`)
- `ButtonBase` in `core` owns accessible-name resolution, pending-label behavior, and attribute-forwarding so future button-like components can reuse the semantic contract
- `fill-style` replaces `treatment`; `accessible-label` replaces `label`; `truncate` replaces `no-wrap`; `justified` is new
- Link API (`href`, `target`, `download`, etc.) removed — use a native `<a>` with global button styles instead
- Pending state sets `aria-disabled="true"`, derives a descriptive default busy label (`"${name}, busy"`), and remains focusable (fixes SWC-459)
- Focus indication uses `outline` so the ring is not clipped by truncated overflow (fixes SWC-886)
- Button label inherits host `visibility` (fixes SWC-701)
- Static white outline is demonstrated on approved background colors to maintain hover contrast (fixes SWC-1139)
- `global-button.css` is now auto-generated from `button.css` by the new `@adobe/vite-global-elements-css` plugin, eliminating drift between the component and global-element styling

See the [consumer migration guide](https://spectrum-web-components.adobe.com/?path=/docs/components-button-consumer-migration-guide--readme) for upgrading from 1st-gen `sp-button`.
