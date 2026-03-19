---
'@spectrum-web-components/core': minor
'@adobe/spectrum-wc': patch
'@spectrum-web-components/base': patch
---

- **Refactored**: Reorganized Badge types to remove `S2` suffix from exports (`BADGE_VARIANTS_S2` -> `BADGE_VARIANTS`, `BADGE_VARIANTS_COLOR_S2` -> `BADGE_VARIANTS_COLOR`, `BadgeVariantS2` -> `BadgeVariant`, `BadgeColorVariantS2` -> `BadgeColorVariant`). Types file now uses SHARED/S1-ONLY/CANONICAL section organization for clearer S1 removal path.
- **Refactored**: Replaced `ElementSizes` record with `ELEMENT_SIZES` and `DEFAULT_ELEMENT_SIZES` const arrays in sized mixin, enabling `as const satisfies` type-safe patterns. The old `ElementSizes` record is re-exported from `@spectrum-web-components/base` as a deprecated alias.
- **Updated**: StatusLight types to add `@todo` annotations for future prefix rename and fix `satisfies` syntax.
- **Updated**: Asset component to use `when` directive and rename CSS classes from `spectrum-` to `swc-` prefix.
- **Updated**: Divider to use styles getter pattern; ProgressCircle to use consistent `styles` variable name.
