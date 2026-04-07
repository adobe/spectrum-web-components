---
'@spectrum-web-components/switch': patch
'@spectrum-web-components/styles': patch
---

**Added**: New switch component tokens and styles were mapped to bring more fidelity for Spectrum 2 foundations theme. Switch now uses system theme tokens for track and handle border colors, handle background, and themed border width; S1 and Express handle border colors are preserved. Users can hook into `--mod-switch-border-width-themed` to adjust the switch input border; `--mod-switch-border-color-*` to modify the switch input border color; `--mod-switch-handle-border-color-*` to change the handle/thumb border color.

**Fixed**: S2 foundations switch emphasized down state color was fixed to reflect the S2 switch down state design spec. The high contrast input border color for S2, and a high-contrast typo are fixed.

**Fixed**: Theme bridge token additions and updates in `@spectrum-web-components/styles` (Spectrum, Express, and tokens-v2) support the switch overrides.
