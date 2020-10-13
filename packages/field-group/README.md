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
<sp-field-group horizontal>
    <sp-checkbox>Checkbox 1</sp-checkbox>
    <sp-checkbox>Checkbox 2</sp-checkbox>
    <sp-checkbox checked>Checkbox 3</sp-checkbox>
    <sp-checkbox>Checkbox 4</sp-checkbox>
    <sp-checkbox>Checkbox 5</sp-checkbox>
</sp-field-group>
```

### Vertical

```html
<sp-field-group vertical>
    <sp-checkbox>Checkbox 1</sp-checkbox>
    <sp-checkbox>Checkbox 2</sp-checkbox>
    <sp-checkbox>Checkbox 3</sp-checkbox>
    <sp-checkbox>Checkbox 4</sp-checkbox>
    <sp-checkbox checked>Checkbox 5</sp-checkbox>
</sp-field-group>
```
