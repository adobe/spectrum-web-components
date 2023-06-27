## Description

The `<sp-accordion>` element contains a list of items that can be expanded or collapsed to reveal additional content or information associated with each item. There can be zero expanded items, exactly one expanded item, or more than one item expanded at a time, depending on the configuration. This list of items is defined by child [`<sp-accordion-item>`](./components/accordion-item) elements that are targetted to the default slot of their `<sp-accordion>` parent.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/accordion?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/accordion)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/accordion?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/accordion)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Muvuvbd79YCP9tcdtnsW/src/index.ts)

```bash
yarn add @spectrum-web-components/accordion
```

Import the side effectful registration of `<sp-accordion>` and `<sp-accordion-item>` via:

```js
import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
```

When looking to leverage the `Accordion` and `AccordionItem` base class as a type and/or for extension purposes, do so via:

```js
import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';
```

## Example

```html
<sp-accordion>
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 5">
        <div>Item 5</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 6">
        <div>Item 6</div>
    </sp-accordion-item>
</sp-accordion>
```

## Allow Multiple

```html
<sp-accordion allow-multiple>
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 5">
        <div>Item 5</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 6">
        <div>Item 6</div>
    </sp-accordion-item>
</sp-accordion>
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-accordion size="s">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-accordion size="m">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-accordion size="l">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-accordion size="xl">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
</sp-tabs>

## Density

The `density` property, when applied, accepts the values of `compact` or `spacious`.

### Compact

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-accordion density="compact" size="s">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-accordion density="compact" size="m">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-accordion density="compact" size="l">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-accordion density="compact" size="xl">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
</sp-tabs>

### Spacious

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-accordion density="spacious" size="s">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-accordion density="spacious" size="m">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-accordion density="spacious" size="l">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-accordion density="spacious" size="xl">
    <sp-accordion-item label="Heading 1">
        <div>Item 1</div>
    </sp-accordion-item>
    <sp-accordion-item disabled label="Heading 2">
        <div>Item 2</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 3">
        <div>Item 3</div>
    </sp-accordion-item>
    <sp-accordion-item label="Heading 4">
        <div>Item 4</div>
    </sp-accordion-item>
</sp-accordion>
```

</sp-tab-panel>
</sp-tabs>
