---
'@spectrum-web-components/combobox': minor
---

**Added**: Enhanced `<sp-combobox>` change event to include both `value` and `itemText` in the event detail, enabling consumers to access both the unique identifier and display text of the selected option.

**Fixed**: Resolved issue where selecting an option would incorrectly match the first option with the same display text. The component now correctly preserves the selected option's value even when multiple options share similar display text.

```js
combobox.addEventListener('change', (event) => {
    const { value, itemText } = event.detail;
    console.log(`Selected: ${itemText} (ID: ${value})`);
});
```
