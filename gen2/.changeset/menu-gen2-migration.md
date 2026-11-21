---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

Add the gen2 `<swc-menu>`, the Spectrum 2 successor to `<sp-menu>`.

- **API**: `for` / `triggerElement` reference an externally-authored trigger (the menu renders none of its own), plus `placement` (12 values, default `bottom-start`), `should-flip` (default `true`), the reflected `open`, and `size` (`s`–`xl`, default `m`). Visibility changes dispatch `swc-open` / `swc-after-open` / `swc-close` / `swc-after-close`, the after-events deferred until the transition settles.
- **Accessibility**: implements the menu-button pattern. `role="menu"` lives on the shadow-internal surface rather than the host, and `aria-haspopup="menu"` / `aria-expanded` are wired onto the resolved trigger's interactive element across shadow boundaries. The surface is a native `popover="auto"`, so Escape and outside clicks light-dismiss through the platform. Arrow keys, Home, and End move a roving tabindex with wrap-around, and typing printable characters moves focus to the first item whose label starts with what was typed, skipping disabled items. Enter and Space activate a row and close the menu, Tab closes it and carries focus on from the trigger, opening moves focus to the first row, and closing restores it to the trigger.
- **Styling**: Spectrum 2 surface chrome with an entry and exit transition gated on the resolved placement, so the surface never fades in at its unpositioned origin. No public CSS custom properties are exposed this release.
- **Core**: adds `MenuBase` and `Menu.types.ts` (`MENU_PLACEMENTS`, `MENU_VALID_SIZES`, `MENU_ALLOWED_CHILDREN`), composing the shared `PlacementController`, `FocusgroupNavigationController`, and `TriggerPressController`.
- **Docs and tests**: Storybook docs page, consumer migration guide, unit coverage, and Playwright accessibility tests covering the ARIA tree and native light-dismiss.

The default slot accepts `<swc-menu-item>`, which ships alongside this release. Menu groups, dividers as separators, submenus, selection, link rows, and the mobile drilldown tray are not part of this release.
