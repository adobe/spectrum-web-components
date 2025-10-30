## Overview

An `<sp-grid>` element displays a virtualized grid of elements built from its `items`, a normalized array of JavaScript objects, applied to a supplied `renderItem`, a `TemplateResult` returning method. The `<sp-grid>` is a class extension of [`lit-virtualizer`](https://www.npmjs.com/package/@lit-labs/virtualizer/v/0.7.0-pre.2) and as such surfaces all of its underlying methods and events.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/grid?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/grid)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/grid?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/grid)

```bash
yarn add @spectrum-web-components/grid
```

Import the side effectful registration of `<sp-grid>` via:

```javascript
import '@spectrum-web-components/grid/sp-grid.js';
```

When looking to leverage the `Grid` base class as a type and/or for extension purposes, do so via:

```javascript
import { Grid } from '@spectrum-web-components/grid';
```

### Anatomy

The grid consists of several key parts:

- A virtualized container that efficiently renders only visible items
- Individual grid items rendered via the `renderItem` method
- A roving tabindex system for keyboard navigation
- Configurable layout properties for item sizing and spacing

```html
<sp-grid id="basic-grid"></sp-grid>
<script type="module">
    const grid = document.querySelector('#basic-grid');
    grid.items = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];
    grid.renderItem = (item) => {
        const div = document.createElement('div');
        div.textContent = item.name;
        return div;
    };
</script>
```

### Options

#### Properties

The grid supports several properties for configuration:

##### Items

The `items` property accepts a normalized array of JavaScript objects that will be rendered in the grid:

```javascript
const grid = document.querySelector('sp-grid');
grid.items = [
    { name: 'Card 1', date: '10/15/18' },
    { name: 'Card 2', date: '10/16/18' },
    { name: 'Card 3', date: '10/17/18' },
];
```

##### Render Item

The `renderItem` property is a function that receives an item, index, and selected state, and returns a DOM element to be rendered:

```javascript
grid.renderItem = (item, index, selected) => {
    const card = document.createElement('sp-card');
    card.heading = item.name;
    card.selected = selected;
    return card;
};
```

##### Item Size

Control the dimensions of each grid item using the `itemSize` property, which accepts an object with `width` and `height` properties:

```javascript
grid.itemSize = {
    width: 200,
    height: 300,
};
```

##### Gap

Customize the space between grid items via the `gap` property, which accepts a value of `0` or `${number}px`:

```javascript
grid.gap = '10px';
```

##### Focusable Selector

Specify which element within the rendered item can receive focus by providing a CSS selector to the `focusableSelector` property:

```javascript
grid.focusableSelector = 'sp-card';
```

This informs the `<sp-grid>` element what part of the DOM created by the `renderItem` method can be focused via keyboard navigation.

### Behaviors

#### Virtualization

The `<sp-grid>` uses virtualization to efficiently render large lists of items. Only the items visible in the viewport (plus a small buffer) are rendered to the DOM, which significantly improves performance for large datasets. As you scroll, the grid dynamically updates which items are rendered.

#### Focus Management

Elements displayed in the grid can be focused via the [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/#kbd_roving_tabindex) pattern. This allows the grid to be entered via the <kbd>Tab</kbd> key and then subsequent elements to be focused via the arrow keys.

Focus will always enter the element list at index 0 of all available elements, not just those currently realized to the page.

#### Selection Management

The grid supports selection of items. You can maintain a `selectedItems` array and update it based on user interactions:

```javascript
grid.selectedItems = [];

grid.renderItem = (item, index, selected) => {
    const card = document.createElement('sp-card');
    card.selected = grid.selectedItems.includes(card.value);
    card.addEventListener('change', () => {
        if (grid.selectedItems.includes(card.value)) {
            grid.selectedItems = grid.selectedItems.filter(
                (item) => item !== card.value
            );
        } else {
            grid.selectedItems.push(card.value);
        }
    });
    return card;
};
```

### Accessibility

The `<sp-grid>` is designed with accessibility in mind and follows ARIA best practices for grid patterns.

#### Keyboard Navigation

The grid supports keyboard navigation through the roving tabindex pattern:

- <kbd>Tab</kbd>: Enter the grid (focus moves to first item)
- <kbd>Arrow Keys</kbd>: Navigate between grid items
- Focus always starts at index 0 of all available elements

#### ARIA Attributes

When implementing a grid, ensure you provide appropriate ARIA attributes for screen reader support:

```javascript
grid.role = 'grid';
grid.ariaLabel = 'Select images';
grid.ariaMultiSelectable = 'true';
grid.ariaRowCount = `${grid.items.length}`;
grid.ariaColCount = 1;
```

Additionally, each rendered item should have appropriate ARIA attributes:

```javascript
card.role = 'row';
card.label = `Card Heading ${index}`;
card.ariaSelected = grid.selectedItems.includes(card.value);
card.ariaRowIndex = `${index + 1}`;
```

#### Focusable Elements

Use the `focusableSelector` property to specify which elements within each grid item should receive focus. This ensures that keyboard users can navigate to interactive elements within the grid.

## Example

To interact with a fully accessible grid example, reference our [Grid Storybook](https://opensource.adobe.com/spectrum-web-components/storybook/index.html?path=/story/grid/) documentation.

```html-no-demo
<sp-grid
    id="grid-demo"
    style="
        margin:
            calc(-1 * var(--spectrum-spacing-500))
            calc(-1 * var(--spectrum-spacing-600))
    "
></sp-grid>
<script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                name: String(total - count),
                date: count,
            });
        }
        return items;
    };
    const initGrid = () => {
        const grid = document.querySelector('#grid-demo');
        grid.items = initItems(100);
        grid.focusableSelector = 'sp-card';
        grid.gap = '10px';
        grid.itemSize = {
            width: 200,
            height: 300,
        };
        grid.role = 'grid';
        grid.ariaLabel = 'Select images';
        grid.ariaMultiSelectable = 'true';
        grid.ariaRowCount = `${grid.items.length}`;
        grid.ariaColCount = 1;
        grid.selectedItems = [];

        grid.renderItem = (
            item,
            index,
            selected
        ) => {
            const card = document.createElement('sp-card');
            const img = document.createElement('img');
            const description = document.createElement('div');
            const footer = document.createElement('div');
            card.toggles = true;
            card.variant = 'quiet';
            card.heading = `Card Heading ${index}`
            card.subheading = 'JPG Photo'
            card.style = 'contain: strict; padding: 1px;'
            card.value = `card-${index}`
            card.selected = grid.selectedItems.includes(card.value);
            card.key = index;
            card.role = 'row';
            card.label = `Card Heading ${index}`;
            card.ariaSelected = grid.selectedItems.includes(card.value);
            card.ariaRowIndex = `${index + 1}`;
            card.addEventListener('change', () => {
                if(grid.selectedItems.includes(card.value)) {
                    grid.selectedItems = grid.selectedItems.filter(item => item !== card.value);
                } else {
                    grid.selectedItems.push(card.value);
                }
            });
            img.alt = '';
            img.slot = 'preview';
            img.src = `https://picsum.photos/id/${index}/200/300`;
            img.decoding = 'async';
            description.slot = 'description';
            description.textContent = '10/15/18';
            footer.slot = 'footer';
            footer.textContent = 'Footer';
            card.append(img, description, footer);
            return card;
        }
    };
    customElements.whenDefined('sp-grid').then(() => {
        initGrid();
    });
</script>
```

<!-- @todo make the example work for a keyboard Tracking in 5582-->
<!-- <script type="module">
    const initItems = (count) => {
        const total = count;
        const items = [];
        while (count) {
            count--;
            items.push({
                name: String(total - count),
                date: count,
            });
        }
        return items;
    };
    const initGrid = () => {
        const grid = document.querySelector('#grid-demo');
        grid.items = initItems(100);
        grid.focusableSelector = 'sp-card';
        grid.gap = '10px';
        grid.itemSize = {
            width: 200,
            height: 300,
        };
        grid.role = 'grid';
        grid.ariaLabel = 'Select images';
        grid.ariaMultiSelectable = 'true';
        grid.ariaRowCount = `${grid.items.length}`;
        grid.ariaColCount = 1;
        grid.selectedItems = [];

        grid.renderItem = (
            item,
            index,
            selected
        ) => {
            const card = document.createElement('sp-card');
            const img = document.createElement('img');
            const description = document.createElement('div');
            const footer = document.createElement('div');
            card.toggles = true;
            card.variant = 'quiet';
            card.heading = `Card Heading ${index}`
            card.subheading = 'JPG Photo'
            card.style = 'contain: strict; padding: 1px;'
            card.value = `card-${index}`
            card.selected = grid.selectedItems.includes(card.value);
            card.key = index;
            card.role = 'row';
            card.label = `Card Heading ${index}`;
            card.ariaSelected = grid.selectedItems.includes(card.value);
            card.ariaRowIndex = `${index + 1}`;
            card.addEventListener('change', () => {
                if(grid.selectedItems.includes(card.value)) {
                    grid.selectedItems = grid.selectedItems.filter(item => item !== card.value);
                } else {
                    grid.selectedItems.push(card.value);
                }
            });
            img.alt = '';
            img.slot = 'preview';
            img.src = `https://picsum.photos/id/${index}/200/300`;
            img.decoding = 'async';
            description.slot = 'description';
            description.textContent = '10/15/18';
            footer.slot = 'footer';
            footer.textContent = 'Footer';
            card.append(img, description, footer);
            return card;
        }
    };
    customElements.whenDefined('sp-grid').then(() => {
        initGrid();
    });
</script> -->
