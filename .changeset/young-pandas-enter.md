---
'@spectrum-web-components/number-field': major
'@spectrum-web-components/textfield': major
'@spectrum-web-components/field-label': minor
---

**textfield:**

- **Changed**: Updated `<sp-textfield>` layout structure from flex to grid for proper label, input, and help-text positioning. This change may affect custom styles that depend on the previous flex layout.
- **Added**: Added `--mod-textfield-container-width` custom property to control container sizing independent of input width. Use this when you need labels or help text to extend beyond the input width.
- **Changed**: Updated default width calculation to ensure container is never smaller than the input. Migration: if you were relying on the previous flex layout behavior, you may need to update your styles.

**number-field:**

- **Changed**: Updated `<sp-number-field>` layout structure from flex to grid for proper label, input, and help-text positioning. This change may affect custom styles that depend on the previous flex layout.
- **Added**: Added `--mod-stepper-container-width` custom property for container sizing. Use this when you need labels or help text to extend beyond the input width.
- **Changed**: Updated default width calculation to ensure container is never smaller than the input. Migration: if you were relying on the previous flex layout behavior, you may need to update your styles.

**field-label:**

- **Added**: Added dedicated `field-label-mixin.css` stylesheet with comprehensive label styling for components using `FieldLabelMixin`, including size variants, side-alignment, disabled states, and high contrast mode support.
