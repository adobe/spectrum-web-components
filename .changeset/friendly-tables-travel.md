---
'@spectrum-web-components/base': minor
'@spectrum-web-components/core': minor
---

Refactored size mixin exports and badge type naming for consistency.

**@spectrum-web-components/base (1st-gen)**

- **Added**: New exports `ELEMENT_SIZES` and `DEFAULT_ELEMENT_SIZES` for typed size arrays
- **Deprecated**: `ElementSizes` record is now deprecated in favor of `ELEMENT_SIZES`. The export is preserved for backward compatibility but will be removed in a future major release.

**@spectrum-web-components/core (2nd-gen)**

- **Changed**: Replaced `ElementSizes` record with `ELEMENT_SIZES` const array and `DEFAULT_ELEMENT_SIZES`
- **Changed**: `VALID_SIZES` arrays are now typed as `readonly ElementSize[]` for better type safety
- **Changed**: Badge type exports renamed for consistency:
  - `BADGE_VARIANTS_S2` → `BADGE_VARIANTS`
  - `BADGE_VARIANTS_COLOR_S2` → `BADGE_VARIANTS_COLOR`
  - `BadgeVariantS2` → `BadgeVariant`
  - `BadgeColorVariantS2` → `BadgeColorVariant`
