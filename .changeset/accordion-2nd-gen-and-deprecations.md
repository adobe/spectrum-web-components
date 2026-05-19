---
'@adobe/spectrum-wc': minor
'@spectrum-web-components/accordion': patch
---

**feat(accordion):** Add 2nd-gen `<swc-accordion>` and `<swc-accordion-item>` with Spectrum 2-oriented behavior. Key changes from 1st-gen `<sp-accordion>` / `<sp-accordion-item>`:

- Core `AccordionBase` / `AccordionItemBase` with public API: `allow-multiple`, `level`, `size`, `density`, `quiet`, host `disabled`, item `open` / `disabled`, slotted heading (`slot="label"`), optional `slot="actions"`, and cancellable `swc-accordion-item-toggle`
- APG-aligned accessibility: `<h*>` wrapping a native header `<button>`, `aria-expanded` / `aria-controls`, `role="region"` + `aria-labelledby`, closed panels use `hidden`, disabled items use `aria-disabled` on the header and `inert` on the panel (no roving `tabindex` or arrow-key header navigation)
- Space on the header calls `preventDefault()` and toggles without scrolling overflow containers (SWC-1487)
- Controlled `open` is frozen while the host or item is disabled (imperative assignment cannot expand or collapse)
- Storybook play tests for ARIA contract, toggle/cancel, exclusive open, host and item disabled, Space, and heading level propagation
- `Chevron300Icon` for `xl` item sizing

**chore(accordion):** Add Spectrum 2 deprecation warnings in dev mode on 1st-gen accordion for `label`, item `level`, and host `focus()`, with matching tests.
