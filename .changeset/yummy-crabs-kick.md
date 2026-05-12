---
'@spectrum-web-components/switch': minor
'@spectrum-web-components/styles': minor
---

- **Fixed**: Improved `<sp-switch>` contrast in S1 and Express to meet WCAG SC 1.4.11 Non-text Contrast (3:1 minimum). The unselected track border was added in S1 and Express, matching the S2 pattern of matching the handle background color to the track border color per interaction state.

- **Fixed**: Corrected `<sp-switch>` handle border colors for selected states in S1 and Express. Handle border now resolves to `--spectrum-gray-75` against the filled/selected track background.

- **Fixed**: Improved `<sp-switch>` Forced Colors (Windows High Contrast) mode. Replaced `box-shadow` track borders with proper `border` declarations, expanded `--highcontrast-switch-border-color` to full state-specific tokens (default, hover, focus, down, disabled), and corrected handle border colors to use system colors (`ButtonFace` for selected, `GrayText` for disabled).

- **Changed**: Renamed `--spectrum-switch-border-width-themed` to `--spectrum-switch-border-width` on `<sp-switch>`. The border width is now a consistent 2px in all themes. **The `--mod-switch-border-width-themed` variable remains unaffected.**

- **Changed**: Renamed `--highcontrast-switch-border-color` to `--highcontrast-switch-border-color-default` on `<sp-switch>`, and expanded it to full per-state tokens (`hover`, `focus`, `down`, `disabled`). Previously a single token controlled the track border color in all forced-colors states.

**If you were overriding `--highcontrast-switch-border-color` in Windows High Contrast styles, update your usage to the appropriate state-specific token.**

```css
/* Before */
sp-switch {
  --highcontrast-switch-border-color: Highlight;
}

/* After */
sp-switch {
  --highcontrast-switch-border-color-default: Highlight;
}
```
