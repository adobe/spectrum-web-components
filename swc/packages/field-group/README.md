## Description

An `<sp-field-group>` element is used to layout a group of fields, usually `<sp-checkbox>` elements. It can be leveraged for `vertical` or `horizontal` organization of the fields that are supplied as its children.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/field-group?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/field-group)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/field-group?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/field-group)

```
yarn add @spectrum-web-components/field-group
```

Import the side effectful registration of `<sp-field-group>` via:

```
import '@spectrum-web-components/field-group/sp-field-group.js';
```

When looking to leverage the `FieldGroup` base class as a type and/or for extension purposes, do so via:

```
import { FieldGroup } from '@spectrum-web-components/field-group';
```

## Example

```html
<sp-field-label for="horizontal">
    Choose from horizonally placed options
</sp-field-label>
<sp-field-group horizontal id="horizontal">
    <sp-checkbox>Checkbox 1</sp-checkbox>
    <sp-checkbox>Checkbox 2</sp-checkbox>
    <sp-checkbox checked>Checkbox 3</sp-checkbox>
    <sp-checkbox>Checkbox 4</sp-checkbox>
    <sp-checkbox>Checkbox 5</sp-checkbox>
</sp-field-group>
```

### Vertical

```html
<sp-field-label for="vertical">
    Choose from vertically placed options
</sp-field-label>
<sp-field-group vertical id="vertical">
    <sp-checkbox>Checkbox 1</sp-checkbox>
    <sp-checkbox>Checkbox 2</sp-checkbox>
    <sp-checkbox>Checkbox 3</sp-checkbox>
    <sp-checkbox>Checkbox 4</sp-checkbox>
    <sp-checkbox checked>Checkbox 5</sp-checkbox>
</sp-field-group>
```

## Help text

Help text can be accessibly associated with an `<sp-field-group>` element by using the `help-text` or `negative-help-text` slots. When using the `negative-help-text` slot, `<sp-field-group>` will self manage the presence of this content based on the value of the `invalid` property on your `<sp-field-group>` element. Content within the `help-text` slot will be show by default. When your `<sp-field-group>` should receive help text based on state outside of the complexity of `invalid` or not, manage the content addressed to the `help-text` from above to ensure that it displays the right messaging and possesses the right `variant`.

<sp-tabs selected="self" auto label="Help text usage in field groups">
<sp-tab value="self">Self managed</sp-tab>
<sp-tab-panel value="self">

```html
<sp-field-group horizontal id="self" label="What are your favorite fruits?">
    <sp-checkbox value="apple">Apple</sp-checkbox>
    <sp-checkbox
        value="not-a-fruit"
        onchange="javascript:this.parentElement.invalid = this.checked"
    >
        Lettuce
    </sp-checkbox>
    <sp-checkbox value="strawberry" checked>Strawberry</sp-checkbox>
    <sp-help-text slot="help-text">One of these is not a fruit.</sp-help-text>
    <sp-help-text slot="negative-help-text" icon>
        Choose actual fruit(s).
    </sp-help-text>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="above">Managed from above</sp-tab>
<sp-tab-panel value="above">

```html
<sp-field-label for="above">What are your favorite fruits?</sp-field-label>
<sp-field-group horizontal id="above">
    <sp-checkbox value="apple">Apple</sp-checkbox>
    <sp-checkbox
        value="not-a-fruit"
        onchange="
            const helpText = this.parentElement.querySelector(`[slot='help-text']`);
            helpText.icon = this.checked;
            helpText.textContent = this.checked ? 'Choose actual fruit(s).' : 'One of these is not a fruit.';
            helpText.variant = this.checked ? 'negative' : 'neutral';
        "
    >
        Lettuce
    </sp-checkbox>
    <sp-checkbox value="strawberry" checked>Strawberry</sp-checkbox>
    <sp-help-text slot="help-text">One of these is not a fruit.</sp-help-text>
</sp-field-group>
```

</sp-tab-panel>
</sp-tabs>
