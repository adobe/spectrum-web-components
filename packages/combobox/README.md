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

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-combobox size="s" label="Color">
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-combobox size="m" label="Color">
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-combobox size="l" label="Color">
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-combobox size="xl" label="Color">
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

</sp-tab-panel>
</sp-tabs>

## Labeling

A combobox must be labeled.
Typically, you should render a visible label via `<sp-field-label>`.
For exceptional cases, provide an accessible label via the `label` attribute.

```html
<sp-field-label for="color">Color</sp-field-label>
<sp-combobox id="color">
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

## Providing options

Combobox options are presented as a popup menu.
Menu items can be provided via markup as `<sp-menu-item>` children, or by assigning an array to the `options` property of an `<sp-combobox>`.

### Options property

Instead of providing `<sp-menu-item>` children, you can assign an array of `ComboboxOptions` to the `options` property, and `<sp-combobox>` will create matching menu items:

```html-no-demo
<sp-combobox id="color" label="Color"></sp-combobox>

<script>
    document.getElementById('color').options = [
        { value: "red", itemText: "Red" },
        { value: "green", itemText: "Green" },
        { value: "blue", itemText: "Blue" }
    ];
</script>
```

### Dynamic options

When you replace the `options` Array, or add/remove `<sp-menu-item>` children, the `<sp-combobox>` will detect that change and update its popup menu contents.
For example, using [Lit](https://lit.dev/):

```ts
render() {
    return html`<sp-combobox label="Color" .options=${this.colorOptions}></sp-combobox>`;
}

mutate() {
    this.colorOptions = [
        ...this.colorOptions,
        { value: 'purple', itemText: 'Purple' }
    ];
}
```

## Autocomplete

The text in an `<sp-combobox>` is editable, and the string the user has typed in will become the `value` of the combobox unless the user selects a different value in the popup menu.

### None

`autocomplete="none"`

The suggested popup menu items will remain the same regardless of the currently-input value.
Whenever the currently-typed input exactly matches the `value` of a popup menu item, that item is automatically selected.

### List

`autocomplete="list"`

The popup menu items are filtered to only those completing the currently-input value.

## Focus and Accessibility

The combobox supports both mouse and keyboard navigation.
Mobile behavior is currently unspecified.

When an `<sp-combobox>` is focused, pressing the down arrow moves focus to the first menu item in the popup menu.
The up and down arrows then move between available menu items.

The escape key dismisses the popup menu if open.
Otherwise, it clears the combobox's textfield.

The enter key sets the `value` of the focused `<sp-combobox>`.
If the popup menu is open, the value is set to the `value` of the selected menu item, returning focus back to the combobox's textfield.
