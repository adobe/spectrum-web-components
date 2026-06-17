---
component: combobox
tag: sp-combobox
package: '@spectrum-web-components/combobox'
source: 1st-gen/packages/combobox/README.md
generated: 2026-06-17T10:46:50.651Z
generator: scripts/generate-llm-docs.mjs
---

## Overview

An `<sp-combobox>` allows users to filter lists to only the options matching a query. It's composed of a textfield, a picker button, and child menu items.

### Usage

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

```html
<sp-combobox size="s" label="Color">
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

```html
<sp-combobox size="m" label="Color">
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

```html
<sp-combobox size="l" label="Color">
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

```html
<sp-combobox size="xl" label="Color">
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

### Quiet

```html
<sp-field-label for="color">Color</sp-field-label>
<sp-combobox id="color" quiet>
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
<sp-field-label for="color-none" autocomplete="none">Color</sp-field-label>
<sp-combobox id="color-none">
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

#### List

`autocomplete="list"`

The popup menu items are filtered to only those completing the currently-input value.

```html
<sp-field-label for="color-list" autocomplete="list">Color</sp-field-label>
<sp-combobox id="color-list">
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

## States

```html
<sp-field-label for="color-disabled">Color</sp-field-label>
<sp-combobox id="color-disabled" disabled>
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
<br />
<sp-field-label for="color-disabled-item">Color</sp-field-label>
<sp-combobox id="color">
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue" disabled>Blue</sp-menu-item>
</sp-combobox>
```

```html
<sp-field-label for="color-invalid">Color</sp-field-label>
<sp-combobox id="color-invalid" invalid>
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
  <sp-help-text slot="negative-help-text">
    Choose or add at least one color.
  </sp-help-text>
</sp-combobox>
```

```html
<sp-field-label for="color">Color</sp-field-label>
<sp-combobox id="color" pending>
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

### Accessibility

#### Provide a label

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

#### Provide help text and tooltips in the correct location

It is [not currently possible](https://w3c.github.io/webcomponents-cg/#cross-root-aria) to provide accessible ARIA references between elements in different shadow roots. To ensure proper association between elements, help text must be included via the `slot="help-text"` or `slot="negative-help-text"` and tooltips must be included via the `slot="tooltip"`.

See [help text](../help-text) and [tooltip](../tooltip) for more information.

```html
<sp-field-label for="color1">Color</sp-field-label>
<sp-combobox id="color1">
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
  <sp-help-text slot="help-text">Enter the name of a color.</sp-help-text>
</sp-combobox>
```

```html
<sp-field-label for="color2">Color</sp-field-label>
<sp-combobox id="color2" required>
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
  <sp-help-text slot="help-text">Enter the name of a color.</sp-help-text>
  <sp-help-text slot="negative-help-text">A color is required.</sp-help-text>
</sp-combobox>
```

```html
<sp-field-label for="color3">Color</sp-field-label>
<sp-combobox id="color3">
  <sp-tooltip slot="tooltip">
    Color options, such as red, green, or blue.
  </sp-tooltip>
  <sp-menu-item value="red">Red</sp-menu-item>
  <sp-menu-item value="green">Green</sp-menu-item>
  <sp-menu-item value="blue">Blue</sp-menu-item>
</sp-combobox>
```

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
