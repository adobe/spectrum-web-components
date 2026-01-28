---
'@spectrum-web-components/radio': patch
---

**Fixed**: Removed deprecated `invalid` property from `<sp-radio>` component in favor of group-level validation.

The `invalid` property on individual `<sp-radio>` elements has been removed. Validation state should now be managed exclusively at the `<sp-radio-group>` level using the `invalid` property, which correctly applies the `aria-invalid` attribute to the group container. This change aligns with accessibility best practices where validation feedback should be provided at the radio group level rather than on individual radio buttons.

**Migration guide**: If you were using the `invalid` property on individual `<sp-radio>` elements, move it to the parent `<sp-radio-group>`:

```html
<!-- Before -->
<sp-radio-group>
    <sp-radio value="option1" invalid>Option 1</sp-radio>
    <sp-radio value="option2">Option 2</sp-radio>
</sp-radio-group>

<!-- After -->
<sp-radio-group invalid>
    <sp-radio value="option1">Option 1</sp-radio>
    <sp-radio value="option2">Option 2</sp-radio>
</sp-radio-group>
```
