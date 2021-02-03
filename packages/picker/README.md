## Description

An `<sp-picker>` is an alternative to HTML's `<select>` element. Use an `<sp-menu>` element to outline the options that will be made available to the user when interacting with the `<sp-picker>` element.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/picker?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/picker)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/picker?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/picker)

```
yarn add @spectrum-web-components/picker
```

Import the side effectful registration of `<sp-picker>` via:

```
import '@spectrum-web-components/picker/sp-picker.js';
```

The default of `<sp-picker>` will load dependencies in `@spectrum-web-components/overlay` asynchronously via a dynamic import. In the case that you would like to import those tranverse dependencies statically, import the side effectful registration of `<sp-picker>` as follows:

```
import '@spectrum-web-components/picker/sync/sp-picker.js';
```

When looking to leverage the `Picker` base class as a type and/or for extension purposes, do so via:

```
import { Picker } from '@spectrum-web-components/picker';
```

## Sizes

<sp-tabs selected="m">
    <sp-tab value="s">Small</sp-tab>
    <sp-tab value="m">Medium</sp-tab>
    <sp-tab value="l">Large</sp-tab>
    <sp-tab value="xl">Extra Large</sp-tab>
</sp-tabs>

<div class="tabs--s">

```html demo
<sp-field-group>
    <sp-picker size="s" label="Selection type">
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-menu>
    </sp-picker>
    <sp-picker quiet size="s" label="Selection type">
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-menu>
    </sp-picker>
</sp-field-group>
```

</div>

<div class="tabs--m">

```html demo
<sp-field-group>
    <sp-picker size="m" label="Selection type">
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-menu>
    </sp-picker>
    <sp-picker quiet size="m" label="Selection type">
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-menu>
    </sp-picker>
</sp-field-group>
```

</div>

<div class="tabs--l">

```html demo
<sp-field-group>
    <sp-picker size="l" label="Selection type">
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-menu>
    </sp-picker>
    <sp-picker quiet size="l" label="Selection type">
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-menu>
    </sp-picker>
</sp-field-group>
```

</div>

<div class="tabs--xl">

```html demo
<sp-field-group>
    <sp-picker size="xl" label="Selection type">
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-menu>
    </sp-picker>
    <sp-picker quiet size="xl" label="Selection type">
        <sp-menu>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-menu>
    </sp-picker>
</sp-field-group>
```

</div>

## Value

When the `value` of an `<sp-picker>` matches the `value` attribute or the trimmed `textContent` (or `itemText`) of a descendent `<sp-menu-item>` element, it will make that element as `selected`.

### Matching `value`

```html
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    value="item-2"
>
    <sp-menu>
        <sp-menu-item value="item-1">Deselect</sp-menu-item>
        <sp-menu-item value="item-2">Select inverse</sp-menu-item>
        <sp-menu-item value="item-3">Feather...</sp-menu-item>
        <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item value="item-5">Save selection</sp-menu-item>
        <sp-menu-item disabled value="item-6">Make work path</sp-menu-item>
    </sp-menu>
</sp-picker>
```

### Matching `itemText`

```html
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    value="Feather..."
>
    <sp-menu>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save selection</sp-menu-item>
        <sp-menu-item>Make work path</sp-menu-item>
    </sp-menu>
</sp-picker>
```

## States

### Invalid

```html
<p><strong>Standard:</strong></p>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    invalid
>
    <sp-menu>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save selection</sp-menu-item>
        <sp-menu-item disabled>Make work path</sp-menu-item>
    </sp-menu>
</sp-picker>
<br />
<br />
<p><strong>Quiet:</strong></p>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    invalid
    quiet
>
    <sp-menu>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save selection</sp-menu-item>
        <sp-menu-item disabled>Make work path</sp-menu-item>
    </sp-menu>
</sp-picker>
```

### Disabled

```html
<p><strong>Standard:</strong></p>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    disabled
>
    <sp-menu>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save selection</sp-menu-item>
        <sp-menu-item disabled>Make work path</sp-menu-item>
    </sp-menu>
</sp-picker>
<br />
<br />
<p><strong>Quiet:</strong></p>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    disabled
    quiet
>
    <sp-menu>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save selection</sp-menu-item>
        <sp-menu-item disabled>Make work path</sp-menu-item>
    </sp-menu>
</sp-picker>
```

## Accessibility

An `<sp-picker>` parent will ensure that the wrapped `<sp-menu>` features a role of `listbox` and contains children with the role `option`. Upon focusing the `<sp-picker>` using `ArrowDown` will also open the menu while throwing focus into first selected (or unselected when none are selected) menu item to assist in selecting of a new value.
