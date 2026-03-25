---
'@spectrum-web-components/field-label': minor
---

**Added**: field label mixin to insert a label in a component's shadow DOM to resolve cross-root ARIA issues (`export class FormField extends FieldLabelMixin(SpectrumElement, 'label')` to apply mixin with a `label` slot to a class and `this.renderFieldLabel('field_id')` to render a field label for an element with `id="field_id"`)
