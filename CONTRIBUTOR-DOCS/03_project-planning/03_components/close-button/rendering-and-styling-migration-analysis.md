<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Close Button / Close button migration roadmap

<!-- Document title (editable) -->

# Close button migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Component specifications](#component-specifications)
    - [CSS](#css)
    - [SWC](#swc)
- [Comparison](#comparison)
    - [DOM structure changes](#dom-structure-changes)
    - [CSS => SWC mapping](#css--swc-mapping)
- [Summary of changes](#summary-of-changes)
    - [CSS => SWC implementation gaps](#css--swc-implementation-gaps)
    - [CSS Spectrum 2 changes](#css-spectrum-2-changes)
- [Resources](#resources)

</details>

<!-- Document content (editable) -->

## Component specifications

### CSS

**Source of truth for Spectrum 2 visual behavior:** `spectrum-css` `spectrum-two` branch, `components/closebutton/index.css`.

Key selectors and modifiers:

- Base: `.spectrum-CloseButton`
- Sizes: `.spectrum-CloseButton--sizeS`, `--sizeL`, `--sizeXL` (`m` is base/default)
- Static colors: `.spectrum-CloseButton--staticWhite`, `.spectrum-CloseButton--staticBlack`
- States: `:hover`, `:active`, `:focus-visible`, `:disabled`
- High contrast: `@media (forced-colors: active)`

Primary token groups used by Spectrum CSS:

- Size: `--spectrum-closebutton-size`
- Icon colors: `--spectrum-closebutton-icon-color-*`
- Background colors: `--spectrum-closebutton-background-color-*`
- Focus ring: `--spectrum-closebutton-focus-indicator-*`

### SWC

**Current 1st-gen implementation source:** `1st-gen/packages/button/src/CloseButton.ts`

Current behavior and structure:

- Tag: `sp-close-button`
- Extends `StyledButton` with `SizedMixin(..., { noDefaultSize: true })`
- Variant surface: `variant` (`white`/`black`) plus `static-color`
- Renders cross icon by size (`Cross200`..`Cross500`)
- Renders visually hidden `<span id="label">` wrapping default slot text

## Comparison

### DOM structure changes

| Area | 1st-gen | 2nd-gen target |
| --- | --- | --- |
| Host tag | `<sp-close-button>` | `<swc-close-button>` |
| Interactive element | Host-level button-like behavior via `ButtonBase` | Real inner `<button type="button">` with delegated focus |
| Labeling | `label` + hidden slot text | `accessible-label` + optional hidden/slot text fallback |
| Visual class root | 1st-gen button/close-button class stack | `swc-CloseButton` class contract mapped to S2 selectors |

### CSS => SWC mapping

| Spectrum CSS contract | SWC expectation |
| --- | --- |
| `.spectrum-CloseButton` | `.swc-CloseButton` |
| `--sizeS`, base(m), `--sizeL`, `--sizeXL` | `size="s|m|l|xl"` |
| `--staticWhite`, `--staticBlack` | `static-color="white|black"` |
| Focus ring vars + `:focus-visible::after` | Equivalent pseudo-element focus ring in SWC CSS |
| Forced colors adjustments | Equivalent high-contrast overrides in SWC CSS |

## Summary of changes

### CSS => SWC implementation gaps

- No 2nd-gen close-button component exists yet in `2nd-gen/packages/core` or `2nd-gen/packages/swc`.
- No SWC close-button CSS exists yet, so no verified `--swc-close-button-*` public property list exists.
- Migration guide content for close-button styling must remain provisional until SWC CSS and `@cssprop` JSDoc land.

### CSS Spectrum 2 changes

- Static color is modifier-based (`--staticWhite` / `--staticBlack`), not a standalone variant family.
- Size is single-axis (`--spectrum-closebutton-size`) across both inline/block size.
- Focus treatment is pseudo-element based and must remain visible in forced-colors mode.
- S2 story templates include icon scale concepts (`regular` vs `large`); if SWC exposes this, it must be explicit and documented.

## Resources

- `1st-gen/packages/button/src/CloseButton.ts`
- `1st-gen/packages/button/test/close-button.test.ts`
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/close-button/accessibility-migration-analysis.md`
- `CONTRIBUTOR-DOCS/03_project-planning/03_components/button/migration-plan.md`
- [S2 Web Desktop scale (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=125265-577&t=99qlf018hYjRXRft-4)
- [S2 close-button anatomy](https://s2.spectrum.corp.adobe.com/page/close-button/#anatomy)
- `spectrum-css (spectrum-two)/components/closebutton/index.css`
- `spectrum-css (spectrum-two)/components/closebutton/dist/metadata.json`
