## Description

The `<sp-accordion>` element is a list of items that can be expanded or collapsed to reveal additional content or information associated with each item. There can be zero expanded items, exactly one expanded item, or more than one item expanded at a time, depending on the configuration.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/accordion?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/accordion)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/accordion?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/accordion)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Muvuvbd79YCP9tcdtnsW/src/index.ts)

```
yarn add @spectrum-web-components/accordion
```

Import the side effectful registration of `<sp-accordion>` and `<sp-accordion-item>` via:

```
import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
```

When looking to leverage the `Accordion` and `AccordionItem` base class as a type and/or for extension purposes, do so via:

```
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
