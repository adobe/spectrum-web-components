---
'@spectrum-web-components/menu': patch
'@spectrum-web-components/slider': patch
---

**fix(menu, slider):** Use package imports for `sp-menu-divider` and `sp-slider-handle` registration instead of relative imports.

In build systems that alias `@spectrum-web-components/*` packages (for example UXP wrappers), a relative side-effect import can resolve to a different module instance than the package export consumers use, causing `NotSupportedError: Failed to execute 'define' on 'CustomElementRegistry'` from duplicate custom element registration. This applies the same fix as #3225 (already applied to `MenuGroup`, `DialogBase`, `DialogWrapper`, and `Table`) to `Menu` and `Slider`.
