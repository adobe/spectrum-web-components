---
layout: partial.njk
title: 'Grid: Spectrum Web Components'
displayName: Grid
componentName: grid
partType: examples
tags:
- grid
---
## Description

An `<sp-grid>` element displays a virtualized grid of elements built from its `items`, a normalized array of javascript objects, applied to a supplied `renderItem`, a `TemplateResult` returning method. `sp-grid` is a class extension of [`lit-virtualizer`](https://www.npmjs.com/package/@lit-labs/virtualizer/v/0.7.0-pre.2) and as such surfaces all of its underlying methods and events.

Elements displayed in the grid can be focused via the [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/#kbd_roving_tabindex) that allows the grid to be entered via the `Tab` key and then subsequent elements to be focused via the arrow keys. To inform the `<sp-grid>` element what part of the DOM created by the `renderItem` method can be focused, supply a value to `focusableSelector`. Focus will always enter the element list at index 0 of ALL available elements, not just those currently realized to the page.

Elements rendered via `renderItem` can have their width and height customized by supplying a value for `itemSize` that accepts an object: `{ width: number, height: number }`. You can customize the space between these elements via the `gap` property that accepts a value of `0` or `${number}px`.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/grid?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/grid)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/grid?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/grid)

```
yarn add @spectrum-web-components/grid
```

Import the side effectful registration of `<sp-grid>` via:

```
import '@spectrum-web-components/grid/sp-grid.js';
```

When looking to leverage the `Grid` base class as a type and/or for extension purposes, do so via:

```
import { Grid } from '@spectrum-web-components/grid';
```

## Example

```ts
const items = generateItems(1000);

const renderItem = (
    item: Item,
    index: number,
    selected: boolean
): TemplateResult => {
    return html`
        <sp-card
            toggles
            variant="quiet"
            heading="Card Heading ${item.id}"
            subheading="JPG Photo"
            style="contain: strict; padding: 1px;"
            value="card-${item.id}"
            .selected=${selected}
            key=${index}
        >
            <img
                alt=""
                slot="preview"
                src="https://picsum.photos/id/${item.id}/200/300"
                decoding="async"
            />
            <div slot="description">10/15/18</div>
            <div slot="footer">Footer</div>
        </sp-card>
    `;
};

// ...
```


