## Overview

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

### Anatomy

Combobox options are presented as a popup menu.
Menu items can be provided via markup as `<sp-menu-item>` children, or by assigning an array to the `options` property of an `<sp-combobox>`.

#### Menu items via the `options` property

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

#### Menu items via dynamic options

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

### Options

#### Sizes

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

### Quiet

```html
<sp-combobox quiet>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

#### Autocomplete

The text in an `<sp-combobox>` is editable, and the string the user has typed in will become the `value` of the combobox unless the user selects a different value in the popup menu.

##### None

`autocomplete="none"`

The suggested popup menu items will remain the same regardless of the currently-input value.
Whenever the currently-typed input exactly matches the `value` of a popup menu item, that item is automatically selected.

```html
<sp-combobox>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

#### List

`autocomplete="list"`

The popup menu items are filtered to only those completing the currently-input value.

```html
<sp-combobox>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

## States

<sp-tabs selected="disabled" auto label="Combobox states">
<sp-tab value="disabled">Disabled</sp-tab>
<sp-tab-panel value="disabled">

```html
<sp-combobox disabled>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
<br />
<sp-combobox>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue" disabled>Blue</sp-menu-item>
</sp-combobox>
```

</sp-tab-panel>
<sp-tab value="invalid">Invalid</sp-tab>
<sp-tab-panel value="invalid">

```html
<sp-combobox invalid>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
    <sp-help-text slot="negative-help-text">
        Choose or add at least one color.
    </sp-help-text>
</sp-combobox>
```

</sp-tab-panel>
<sp-tab value="pending">Pending</sp-tab>
<sp-tab-panel value="pending">

```html
<sp-combobox pending>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

</sp-tab-panel>
</sp-tabs>

### Accessibility

#### Provide a label

A combobox must be labeled.
Typically, you should render a visible label via the `label` slot.
For exceptional cases, provide an accessible label via the `label` attribute.

```html
<sp-combobox>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

#### Provide help text and tooltips in the correct location

It is [not currently possible](https://w3c.github.io/webcomponents-cg/#cross-root-aria) to provide accessible ARIA references between elements in different shadow roots. To ensure proper association between elements, help text must be included via the `slot="help-text"` or `slot="negative-help-text"` and tooltips must be included via the `slot="tooltip"`.

See [help text](../help-text) and [tooltip](../tooltip) for more information.

<sp-tabs selected="help-text" auto label="Slotted help text and tooltips">
<sp-tab value="help-text">Help text</sp-tab>
<sp-tab-panel value="help-text">

```html
<sp-combobox>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
    <sp-help-text slot="help-text">Enter the name of a color.</sp-help-text>
</sp-combobox>
```

</sp-tab-panel>
<sp-tab value="negative-help-text">Negative help text</sp-tab>
<sp-tab-panel value="negative-help-text">

```html
<sp-combobox required>
    <span slot="field-label">Color</span>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
    <sp-help-text slot="help-text">Enter the name of a color.</sp-help-text>
    <sp-help-text slot="negative-help-text">A color is required.</sp-help-text>
</sp-combobox>
```

</sp-tab-panel>
<sp-tab value="tooltip">Tooltip</sp-tab>
<sp-tab-panel value="tooltip">

```html
<sp-combobox>
    <span slot="field-label">Color</span>
    <sp-tooltip slot="tooltip">
        Color options, such as red, green, or blue.
    </sp-tooltip>
    <sp-menu-item value="red">Red</sp-menu-item>
    <sp-menu-item value="green">Green</sp-menu-item>
    <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

</sp-tab-panel>
</sp-tabs>

#### Do not override keyboard navigation

The combobox supports both mouse and keyboard navigation.
Mobile behavior is currently unspecified.

When an `<sp-combobox>` is focused, pressing the down arrow moves focus to the first menu item in the popup menu.
The up and down arrows then move between available menu items.

The escape key dismisses the popup menu if open.
Otherwise, it clears the combobox's textfield.

The enter key sets the `value` of the focused `<sp-combobox>`.
If the popup menu is open, the value is set to the `value` of the selected menu item, returning focus back to the combobox's textfield.

For comprehensive information on combobox accessibility, see WAI ARIA Authoring Practice Guide's [Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).
