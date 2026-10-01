---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

Add the gen2 `<swc-menu>`, the Spectrum 2 successor to `<sp-menu>`.

- **API**: `for` / `triggerElement` reference an externally-authored trigger (the menu renders none of its own), plus `placement` (12 values, default `bottom-start`), `should-flip` (default `true`), the reflected `open`, and `size` (`s`–`xl`, default `m`). Visibility changes dispatch `swc-open` / `swc-after-open` / `swc-close` / `swc-after-close`, the after-events deferred until the transition settles.
- **Accessibility**: implements the menu-button pattern. `role="menu"` lives on the shadow-internal surface rather than the host, and `aria-haspopup="menu"` / `aria-expanded` are wired onto the resolved trigger's interactive element across shadow boundaries. The surface is a native `popover="auto"`, so Escape and outside clicks light-dismiss through the platform. Arrow keys, Home, and End move a roving tabindex with wrap-around, Tab stays trapped on the active row, Enter activates a row and closes, opening moves focus to the first row, and closing restores it to the trigger.
- **Styling**: Spectrum 2 surface chrome with an entry and exit transition gated on the resolved placement, so the surface never fades in at its unpositioned origin. No public CSS custom properties are exposed this release.
- **Core**: adds `MenuBase` and `Menu.types.ts` (`MENU_PLACEMENTS`, `MENU_VALID_SIZES`, `MENU_ALLOWED_CHILDREN`), composing the shared `PlacementController`, `FocusgroupNavigationController`, and `TriggerPressController`.
- **Docs and tests**: Storybook docs page, consumer migration guide, unit coverage, and Playwright accessibility tests covering the ARIA tree and native light-dismiss.

`<swc-menu-item>` has not shipped yet, so the default slot currently accepts it by name only. Menu groups, dividers as separators, submenus, selection, link rows, and the mobile drilldown tray are not part of this release.
