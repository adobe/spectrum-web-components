---
'@spectrum-web-components/action-button': patch
'@spectrum-web-components/styles': patch
---

Updated 1st-gen Action Button color wiring so S2 colors match spec while Spectrum 1 remains visually unchanged.

- Updated S2-only token values in `1st-gen/tools/styles/tokens-v2/system-theme-bridge.css`:
    - `--system-action-button-content-color-selected` -> `var(--spectrum-gray-25)`
    - static quiet disabled backgrounds:
        - black -> `var(--spectrum-transparent-black-25)`
        - white -> `var(--spectrum-transparent-white-25)`
    - added S2 static content tokens:
        - `--system-action-button-static-black-content-color-{default,hover,down,focus}`
        - `--system-action-button-static-white-content-color-{default,hover,down,focus}`

- Updated `1st-gen/packages/action-button/src/action-button-overrides.css` to map new S2 `--system-*` static content tokens into `--spectrum-*` action-button vars.

- Updated `1st-gen/packages/action-button/src/spectrum-action-button.css` static color content assignments to read from `--spectrum-actionbutton-static-*-content-color-*` with S1-safe fallbacks:
    - black fallback remains `var(--spectrum-black)`
    - white fallback remains `var(--spectrum-white)`
