## Description

An `<sp-field-label>` provides accessible labelling for form elements. Use the `for` attribute to outline the `id` of an element in the same DOM tree to which it should associate itself.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/field-label?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/field-label)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/field-label?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/field-label)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/fDq5bpzNQJzUUyEq6ENR/src/index.ts)

```
yarn add @spectrum-web-components/field-label
```

Import the side effectful registration of `<sp-field-label>` via:

```
import '@spectrum-web-components/field-label/sp-field-label.js';
```

When looking to leverage the `FieldLabel` base class as a type and/or for extension purposes, do so via:

```
import { FieldLabel } from '@spectrum-web-components/field-label';
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-field-label for="lifestory-0" size="s">Life Story</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-0"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-field-label for="lifestory-1" size="m">Life Story</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-1"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-field-label for="lifestory-2" size="l">Life Story</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-2"
></sp-textfield>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-field-label for="lifestory-3" size="xl">Life Story</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-3"
></sp-textfield>
```

</sp-tab-panel>
</sp-tabs>

## Examples

```html
<sp-field-label for="lifestory">Life Story</sp-field-label>
<sp-textfield placeholder="Enter your life story" id="lifestory"></sp-textfield>
<sp-field-label for="birth-place">Birthplace</sp-field-label>
<sp-picker id="birth-place">
    <span slot="label">Choose a location:</span>
    <sp-menu-item>Istanbul</sp-menu-item>
    <sp-menu-item>London</sp-menu-item>
    <sp-menu-item>Maputo</sp-menu-item>
    <sp-menu-item>Melbuorne</sp-menu-item>
    <sp-menu-item>New York</sp-menu-item>
    <sp-menu-item>San Fransisco</sp-menu-item>
    <sp-menu-item>Santiago</sp-menu-item>
    <sp-menu-item>Tokyo</sp-menu-item>
</sp-picker>
```

## Side Aligned

Using the `side-aligned` attribute will display the `<sp-field-label>` element inline with surrounding elements and the `start` and `end` values outline the alignment of the label text in the width specified.

### Start

Use `side-aligned="start"` to display the `<sp-field-label>` inline and to align the label text to the "start" of the flow of text:

```html
<sp-field-label for="lifestory-1" side-aligned="start" style="width: 120px">
    Life Story
</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-1"
></sp-textfield>
<br />
<br />
<sp-field-label
    for="birth-place-1"
    side-aligned="start"
    required
    style="width: 120px"
>
    Birthplace
</sp-field-label>
<sp-picker id="birth-place-1">
    <span slot="label">Choose a location:</span>
    <sp-menu-item>Istanbul</sp-menu-item>
    <sp-menu-item>London</sp-menu-item>
    <sp-menu-item>Maputo</sp-menu-item>
    <sp-menu-item>Melbuorne</sp-menu-item>
    <sp-menu-item>New York</sp-menu-item>
    <sp-menu-item>San Fransisco</sp-menu-item>
    <sp-menu-item>Santiago</sp-menu-item>
    <sp-menu-item>Tokyo</sp-menu-item>
</sp-picker>
```

### End

Use `side-aligned="end"` to display the `<sp-field-label>` inline and to align the label text to the "end" of the flow of text:

```html
<sp-field-label
    for="lifestory-1"
    side-aligned="end"
    required
    style="width: 120px"
>
    Life Story
</sp-field-label>
<sp-textfield
    placeholder="Enter your life story"
    id="lifestory-1"
></sp-textfield>
<br />
<br />
<sp-field-label for="birth-place-1" side-aligned="end" style="width: 120px">
    Birthplace
</sp-field-label>
<sp-picker id="birth-place-1">
    <span slot="label">Choose a location:</span>
    <sp-menu-item>Istanbul</sp-menu-item>
    <sp-menu-item>London</sp-menu-item>
    <sp-menu-item>Maputo</sp-menu-item>
    <sp-menu-item>Melbuorne</sp-menu-item>
    <sp-menu-item>New York</sp-menu-item>
    <sp-menu-item>San Fransisco</sp-menu-item>
    <sp-menu-item>Santiago</sp-menu-item>
    <sp-menu-item>Tokyo</sp-menu-item>
</sp-picker>
```
