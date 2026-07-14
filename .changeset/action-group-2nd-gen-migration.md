---
'@adobe/spectrum-wc': minor
'@spectrum-web-components/core': minor
'@spectrum-web-components/action-group': patch
---

Add the 2nd-gen `<swc-action-group>` file structure, API, and accessibility semantics, migrated from the Spectrum 1 `<sp-action-group>`.

- **API**: `accessible-label`, `disabled`, `orientation` (`horizontal` / `vertical`), `compact`, `quiet`, `justified`, `size`, `static-color`; children are collected via the default slot (`swc-action-button` / `swc-action-menu`).
- **Accessibility**: host always `role="group"` (never `toolbar` or `radiogroup`); `accessible-label` reflects to `aria-label`; `aria-orientation="vertical"` set only for vertical layout; group `disabled` sets `aria-disabled="true"` on the host and propagates `aria-disabled` (not native `disabled`) to all children so they remain keyboard-reachable and discoverable per [APG: Focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols); `FocusgroupNavigationController` wired with `skipDisabled: false` so `aria-disabled` children stay in the arrow-key sequence.
- **`ButtonBase` (core)**: click activation is now suppressed for any button whose host carries `aria-disabled="true"`, matching the existing suppression for `disabled` and `pending`. This is shared behavior for every `ButtonBase` subclass, not just `swc-action-button`.
- **`swc-action-button`**: added disabled-appearance CSS for the externally-set `aria-disabled` case (e.g. when disabled via a parent `swc-action-group`), including forced-colors system-color overrides.
- **1st-gen `sp-action-group`**: added `@deprecated` JSDoc to `vertical`, `selects`, `selected`, and `emphasized`, plus a runtime `window.__swc.warn()` deprecation notice on the `selected` setter, ahead of removal in 2nd-gen.
