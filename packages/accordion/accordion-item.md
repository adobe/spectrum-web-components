## Description

The `<sp-accordion-item>` element represents a single item in an `<sp-accordion>` parent element. Its `label` attribute and default slot content make up the "headline" and "body" of the toggleable content item.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/accordion?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/accordion)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/accordion?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/accordion)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Muvuvbd79YCP9tcdtnsW/src/index.ts)

```
yarn add @spectrum-web-components/accordion
```

Import the side effectful registration of `<sp-accordion-item>` via:

```
import '@spectrum-web-components/accordion/sp-accordion-item.js';
```

When looking to leverage the `AccordionItem` base class as a type and/or for extension purposes, do so via:

```
import { AccordionItem } from '@spectrum-web-components/accordion';
```

## Example

```html
<sp-accordion>
    <sp-accordion-item label="Heading 1">
        <div>The content can be toggled visible.</div>
    </sp-accordion-item>
</sp-accordion>
```

### Opened

```html
<sp-accordion allow-multiple>
    <sp-accordion-item open label="Heading 2">
        <div>This content is visible by default.</div>
    </sp-accordion-item>
</sp-accordion>
```

### Disabled

```html
<sp-accordion allow-multiple>
    <sp-accordion-item disabled label="Heading 2">
        <div>You can not toggle this content visible.</div>
    </sp-accordion-item>
</sp-accordion>
```

## Events

An `<sp-accordion-item>` element will dispatch `sp-accordion-item-toggle` events when it is opened or closed. By default, these events are dispatched to allow the parent `<sp-accordion>` to manage which of its item children can shot their children at any one time, consumers can also listen for this event and leverage `event.target.open` to ascertain the current state of the item dispatching item.
