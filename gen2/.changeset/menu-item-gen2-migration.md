---
'@adobe/spectrum-wc': minor
'@adobe/spectrum-wc-core': minor
---

Add the gen2 `<swc-menu-item>`, the Spectrum 2 successor to `<sp-menu-item>`.

- **API**: `disabled` (reflected) and `size` (`s`–`xl`, default `m`). Set `size` on the owning `<swc-menu>`, which propagates it to every row it slots. Content moves into four named slots: `label` (required, supplies the accessible name), `visual` (leading icon or `swc-thumbnail`), `description` (supporting text below the label), and `secondary` (trailing text such as a keyboard shortcut).
- **Accessibility**: the host is always `role="menuitem"`. The row names itself from its `label` slot and describes itself from its `description` slot followed by its `secondary` slot, using element references on `ElementInternals` rather than `id` refs, so consumer markup needs no `id` attributes and the references survive slot forwarding. A row with no `label` warns in development. `disabled` maps to `aria-disabled="true"` rather than the native attribute, so disabled rows stay focusable and keep their place in arrow-key navigation per [APG: Focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols). `Enter` and `Space` activate on keydown, matching the platform and React Spectrum.
- **Styling**: full Spectrum 2 token-based CSS across the four sizes, with hover, focus, down, and disabled states plus a forced-colors pass. Hover fill and the keyboard focus ring are driven by input modality, so opening with a pointer does not paint a focus ring and moving the pointer does not leave one behind. Exposes 19 `--swc-menu-item-*` custom properties covering size and spacing, corner radius, per-state background, label and description text, the gap between them, trailing text, and the slotted visual's size.
- **Core**: adds `MenuItemBase` and `MenuItem.types.ts` (`MENU_ITEM_VALID_SIZES`), composing the shared `SizedMixin` and `validateRequiredSlot()`. The rendering layer's `MenuItem` adds the shared `SlotPresenceController`.
- **Docs and tests**: Storybook docs page, a consumer migration guide covering both `swc-menu` and `swc-menu-item`, unit coverage, and Playwright accessibility tests.

Selection (`selected`, the item `value` property), link rows, submenus, and non-text trailing content are not part of this release.
