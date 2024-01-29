## Description

An `<sp-combobox>` allows users to filter lists to only the options matching a query. It's composed of a textfield, a picker button, and child menu items.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/combobox?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/combobox)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/combobox?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/combobox)

```
yarn add @spectrum-web-components/combobox
```

Import the side effectful registration of `<sp-combobox>` via:

```
import '@spectrum-web-components/combobox/sp-combobox.js';
```

When looking to leverage the `Combobox` base class as a type and/or for extension purposes, do so via:

```
import { Combobox } from '@spectrum-web-components/combobox';
```

## Examples

<!--- what is the most minimal example possible? are any of the attributes required? -->
<!--- Each example in the RFC includes a prepended sp-field-label. Is that required, even with the "label" attr? -->
<!-- https://combobox--spectrum-web-components.netlify.app/storybook/?path=/story/combobox--default is empty -->

```html
<sp-combobox>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

### Options Array

Instead of providing `<sp-menu-item>` children, you can assign an array of `ComboboxOptions` to the `options` property, and `<sp-combobox>` will create matching menu items:

<!--- Why does ComboboxOptions have "id" and "value" rather than "value" and "label" to match <option> & provide a data-value and a render-value? -->

```html
<sp-combobox id="colors"></sp-combobox>

<script>
    document.getElementById('colors').options = {[
        { id: "red", value: "Red" },
        { id: "green", value: "Green" },
        { id: "blue", value: "Blue" }
    ]};
</script>
```

### Dynamic Items

When you update the `options` property or add/remove `<sp-menu-item>` children, the `<sp-combobox>` will detect that change and update its popup menu contents. For example, using [Lit](https://lit.dev/):

```html
<sp-combobox .options="${this.colorOptions}"></sp-combobox>
```

```js
this.colorOptions = [...this.colorOptions, { id: 'purple', value: 'Purple' }];
```

## Autocomplete

<!--- Should there be an option to make matching case-sensitive? -->
<!--- Should there be an option to allow matching anywhere in a string rather than the beginning? -->

The text in an `<sp-combobox>` is editable, and the string the user has typed in will become the `value` of the combobox unless the user selects a different value in the popup menu.

-   `autocomplete="none"`: the suggested popup menu items will remain the same regardless of the currently-input value.
-   `autocomplete="list"`: the popup menu items are filtered to only those completing the currently-input value.

Whenever the currently-typed input exactly matches the `value` of a popup menu item, that item is automatically selected.

## Focus and Accessibility

<!--- Opening then closing the popup menu should focus the text input of the combobox, right? -->

The combobox supports both mouse and keyboard navigation. Mobile behavior is currently unspecified.

When an `<sp-combobox>` is focused, pressing the down arrow moves focus to the first menu item in the popup menu.
The up and down arrows then move between available menu items.

The escape key dismisses the popup menu if open. Otherwise, it clears the combobox's textfield.

The enter key sets the `value` of the focused `<sp-combobox>`.
If the popup menu is open, the value is set to the `value` of the selected menu item,
returning focus back to the combobox's textfield.
