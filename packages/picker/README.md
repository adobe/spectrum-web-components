## Description

An `<sp-picker>` is an alternative to HTML's `<select>` element. Use `<sp-menu-item>` elements to outline the options that will be made available to the user when interacting with the `<sp-picker>` element.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/picker?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/picker)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/picker?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/picker)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/guTpKeAjgecibF150Qbg/src/index.ts)

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

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-field-group>
    <div>
        <sp-field-label for="picker-s" size="s">Selection type:</sp-field-label>
        <sp-picker id="picker-s" size="s" label="Selection type">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-picker>
    </div>
    <div>
        <sp-field-label for="picker-s-quiet" size="s">
            Selection type:
        </sp-field-label>
        <sp-picker id="picker-s-quiet" quiet size="s" label="Selection type">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-picker>
    </div>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-field-group>
    <div>
        <sp-field-label for="picker-m" size="m">Selection type:</sp-field-label>
        <sp-picker id="picker-m" size="m" label="Selection type">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-picker>
    </div>
    <div>
        <sp-field-label for="picker-m-quiet" size="m">
            Selection type:
        </sp-field-label>
        <sp-picker id="picker-m-quiet" quiet size="m" label="Selection type">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-picker>
    </div>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-field-group>
    <div>
        <sp-field-label for="picker-l" size="l">Selection type:</sp-field-label>
        <sp-picker id="picker-l" size="l" label="Selection type">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-picker>
    </div>
    <div>
        <sp-field-label for="picker-l-quiet" size="l">
            Selection type:
        </sp-field-label>
        <sp-picker id="picker-l-quiet" quiet size="l" label="Selection type">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-picker>
    </div>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-field-group>
    <div>
        <sp-field-label for="picker-xl" size="xl">
            Selection type:
        </sp-field-label>
        <sp-picker id="picker-xl" size="xl" label="Selection type">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-picker>
    </div>
    <div>
        <sp-field-label for="picker-xl-quiet" size="xl">
            Selection type:
        </sp-field-label>
        <sp-picker id="picker-xl-quiet" quiet size="xl" label="Selection type">
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save selection</sp-menu-item>
            <sp-menu-item disabled>Make work path</sp-menu-item>
        </sp-picker>
    </div>
</sp-field-group>
```

</sp-tab-panel>
</sp-tabs>

## Icons

`<sp-menu-item>`s in an `<sp-picker>` that are provided content addressed to their `icon` slot will be passed to the `<sp-picker>` element when that item is chosen.

```html
<sp-field-label for="picker-icons">Choose an action...</sp-field-label>
<sp-picker label="What would you like to do?" value="item-2" id="picker-icons">
    <sp-menu-item>
        <sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>
        Save
    </sp-menu-item>
    <sp-menu-item>
        <sp-icon-stopwatch slot="icon"></sp-icon-stopwatch>
        Finish
    </sp-menu-item>
    <sp-menu-item>
        <sp-icon-user-activity slot="icon"></sp-icon-user-activity>
        Review
    </sp-menu-item>
</sp-picker>
```

When you choose to leverage `<sp-menu-item>` elements without text content, you will need to be sure to leverage the `value` attribute so that the `<sp-picker>` element can differentiate between the available options. Further, it is important that you apply accessible labeling to the `[slot="icon"]` content as follows:

```html
<sp-field-label for="picker-icons-only">Choose an action...</sp-field-label>
<sp-picker
    label="What would you like to do?"
    value="item-2"
    id="picker-icons-only"
>
    <sp-menu-item value="item-1">
        <sp-icon-save-floppy slot="icon" label="Save"></sp-icon-save-floppy>
    </sp-menu-item>
    <sp-menu-item value="item-2">
        <sp-icon-stopwatch slot="icon" label="Finish"></sp-icon-stopwatch>
    </sp-menu-item>
    <sp-menu-item value="item-3">
        <sp-icon-user-activity
            slot="icon"
            label="Review"
        ></sp-icon-user-activity>
    </sp-menu-item>
</sp-picker>
```

### Advanced icon management

The `icons` attribute allows you to manage whether to `only` display the icon in the `<sp-picker>` element or to display `none` of the icons in the `<sp-picker>`.

When using `icons="only"` and your `<sp-menu-item>` elements still have text content, that content will be applied to `<sp-picker>` element in a non-visible way.

```html
<sp-field-label for="picker-icons-value">Choose an action...</sp-field-label>
<sp-picker
    label="What would you like to do?"
    value="item-2"
    id="picker-icons-value"
    icons="only"
>
    <sp-menu-item>
        <sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>
        Save
    </sp-menu-item>
    <sp-menu-item>
        <sp-icon-stopwatch slot="icon"></sp-icon-stopwatch>
        Finish
    </sp-menu-item>
    <sp-menu-item>
        <sp-icon-user-activity slot="icon"></sp-icon-user-activity>
        Review
    </sp-menu-item>
</sp-picker>
```

When using `icons="none"`, the icons will only be available in the overlaid menu.

```html
<sp-field-label for="picker-icons-none">Choose an action...</sp-field-label>
<sp-picker
    label="What would you like to do?"
    value="item-2"
    id="picker-icons-none"
    icons="none"
>
    <sp-menu-item>
        <sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>
        Save
    </sp-menu-item>
    <sp-menu-item>
        <sp-icon-stopwatch slot="icon"></sp-icon-stopwatch>
        Finish
    </sp-menu-item>
    <sp-menu-item>
        <sp-icon-user-activity slot="icon"></sp-icon-user-activity>
        Review
    </sp-menu-item>
</sp-picker>
```

## Value

When the `value` of an `<sp-picker>` matches the `value` attribute or the trimmed `textContent` (or `itemText`) of a descendent `<sp-menu-item>` element, it will make that element as `selected`.

### Matching `value`

```html
<sp-field-label for="picker-value">Selection type:</sp-field-label>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    value="item-2"
    id="picker-value"
>
    <sp-menu-item value="item-1">Deselect</sp-menu-item>
    <sp-menu-item value="item-2">Select inverse</sp-menu-item>
    <sp-menu-item value="item-3">Feather...</sp-menu-item>
    <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item value="item-5">Save selection</sp-menu-item>
    <sp-menu-item disabled value="item-6">Make work path</sp-menu-item>
</sp-picker>
```

### Matching `itemText`

```html
<sp-field-label for="picker-item-text">Selection type:</sp-field-label>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    value="Feather..."
    id="picker-item-text"
>
    <sp-menu-item>Deselect</sp-menu-item>
    <sp-menu-item>Select inverse</sp-menu-item>
    <sp-menu-item>Feather...</sp-menu-item>
    <sp-menu-item>Select and mask...</sp-menu-item>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item>Save selection</sp-menu-item>
    <sp-menu-item>Make work path</sp-menu-item>
</sp-picker>
```

## States

### Invalid

```html
<sp-field-label for="picker-invalid">Standard:</sp-field-label>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    invalid
    id="picker-invalid"
>
    <sp-menu-item>Deselect</sp-menu-item>
    <sp-menu-item>Select inverse</sp-menu-item>
    <sp-menu-item>Feather...</sp-menu-item>
    <sp-menu-item>Select and mask...</sp-menu-item>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item>Save selection</sp-menu-item>
    <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
<br />
<br />
<sp-field-label for="picker-invalid-quiet">Quiet:</sp-field-label>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    invalid
    quiet
    id="picker-invalid-quiet"
>
    <sp-menu-item>Deselect</sp-menu-item>
    <sp-menu-item>Select inverse</sp-menu-item>
    <sp-menu-item>Feather...</sp-menu-item>
    <sp-menu-item>Select and mask...</sp-menu-item>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item>Save selection</sp-menu-item>
    <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
```

### Disabled

```html
<sp-field-label for="picker-disabled">Standard:</sp-field-label>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    disabled
    id="picker-disabled"
>
    <sp-menu-item>Deselect</sp-menu-item>
    <sp-menu-item>Select inverse</sp-menu-item>
    <sp-menu-item>Feather...</sp-menu-item>
    <sp-menu-item>Select and mask...</sp-menu-item>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item>Save selection</sp-menu-item>
    <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
<br />
<br />
<sp-field-label for="picker-disabled">Quiet:</sp-field-label>
<sp-picker
    label="Select a Country with a very long label, too long in fact"
    disabled
    quiet
    id="picker-disabled-quiet"
>
    <sp-menu-item>Deselect</sp-menu-item>
    <sp-menu-item>Select inverse</sp-menu-item>
    <sp-menu-item>Feather...</sp-menu-item>
    <sp-menu-item>Select and mask...</sp-menu-item>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item>Save selection</sp-menu-item>
    <sp-menu-item disabled>Make work path</sp-menu-item>
</sp-picker>
```

## Accessibility

To render accessibly, an `<sp-picker>` element should be paired with an `<sp-field-label>` element that has a `for` attribute referencing the `id` of the `<sp-picker>` element.
