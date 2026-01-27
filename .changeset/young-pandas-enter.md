---
'@spectrum-web-components/number-field': major
'@spectrum-web-components/textfield': major
'@spectrum-web-components/field-label': minor
---

**textfield:**

- **Changed**: Updated `<sp-textfield>` layout structure from flex to grid for proper label, input, and help-text positioning. This change may affect custom styles that depend on the previous flex layout.
- **Added**: Added `--mod-textfield-container-width` custom property to control container sizing independent of input width. Use this when you need labels or help text to extend beyond the input width.
- **Added**: Added `--mod-textfield-grid-template-columns-side-label` custom property to control grid column layout for side-aligned textfields. Use this to customize the column sizing when labels are positioned to the start or end of the input.
- **Changed**: Updated default width calculation to ensure container is never smaller than the input. Migration: if you were relying on the previous flex layout behavior, you may need to update your styles.

**number-field:**

- **Changed**: Updated `<sp-number-field>` layout structure from flex to grid for proper label, input, and help-text positioning. This change may affect custom styles that depend on the previous flex layout.
- **Added**: Added `--mod-stepper-container-width` custom property for container sizing. Use this when you need labels or help text to extend beyond the input width.
- **Added**: Added `--mod-stepper-grid-template-columns-side-label` custom property to control grid column layout for side-aligned number fields. Use this to customize the column sizing when labels are positioned to the start or end of the input.
- **Changed**: Updated default width calculation to ensure container is never smaller than the input. Migration: if you were relying on the previous flex layout behavior, you may need to update your styles.

**field-label:**

- **Added**: Added dedicated `field-label-mixin.css` stylesheet with comprehensive label styling for components using `FieldLabelMixin`, including size variants, side-alignment, disabled states, and high contrast mode support.

---

### New modifier custom properties

This release introduces the following new `--mod-*` custom properties for enhanced customization:

**Textfield:**

- `--mod-textfield-container-width` - Controls container width independent of input width
- `--mod-textfield-grid-template-columns-side-label` - Controls grid column layout for side-aligned textfields (default: `minmax(10ch, 1fr) minmax(16ch, 2fr)`)

**Number field:**

- `--mod-stepper-container-width` - Controls container width independent of input width
- `--mod-stepper-grid-template-columns-side-label` - Controls grid column layout for side-aligned number fields (default: `minmax(10ch, 1fr) fit-content(15ch)`)
