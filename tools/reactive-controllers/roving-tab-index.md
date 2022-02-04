## Description

[Roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/#kbd_roving_tabindex) is a pattern whereby multiple focusable elements are represented by a single `tabindex=0` element, while the individual elements maintain `tabindex=-1` and are made accessible via arrow keys after the entry element if focused. This allows keyboard users to quickly tab through a page without having to stop on every element in a large collection. Attaching a `RovingTabindexController` to your custom element will manage the supplied `elements` via this pattern.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```
yarn add @spectrum-web-components/reactive-controllers
```

Import the `RovingTabindexController` via:

```
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/RovingTabindex.js';
```

## Example

A `Container` element that manages a collection of `<sp-button>` elements that are slotted into it from outside might look like the following:

```js
import { html, LitElement } from 'lit';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/RovingTabindex.js';
import type { Button } from '@spectrum-web-components/button';

class Container extends LitElement {
    rovingTabindexController =
        new RovingTabindexController() <
        Button >
        (this,
        {
            elements: () => [...this.querySelectorAll('sp-button')],
        });

    render() {
        return html`
            <slot></slot>
        `;
    }
}
```

The above will default to entering the `Container` element via the first `<sp-button>` element every time while making all slotted `<sp-button>` elements accessible via the the arrow key (`ArrowLeft`, `ArrowRight`, `ArrowUp`, and `ArrowDown`) managed tab order.

## Options

A `Container` can further customize the implementation of the `RovingTabindexController` with the following options:

-   `direction` to customize how and which arrow keys manage what element is to be focused and accepts a either a string of `both`, `vertical`, `horizontal`, or `grid` or a method returning one of those strings
-   `elementEnterAction` enacts actions other than `focus` on the entered element which accepts a method with a signature of `(el: T) => void`
-   `elements` provides the elements that will have their `tabindex` managed via a method with a signature of `() => T[]`
-   `focusInIndex` to control what element will recieve `tabindex=0` while focus is outside of the `Container` and accepts a method with a signature of `(_elements: T[]) => number`
-   `isFocusableElement` describes the state an element much be in to receive `focus` via a method with a signature of `(el: T) => boolean`
-   `listenerScope` outlines which parts on a container's DOM when listening for arrow key presses via an element reference or a method returning an element reference with the signature `() => HTMLElement`

## Advanced usage

These options can be combined to form various interfaces from the more default that we saw above to the very complex. Below is another `Container` that manages slotted `<sp-button>` elements via the `RovingTabindexController`. The options provided ensure:

-   the first focused `<sp-button>` is the one `selected` by the container
-   the elements are only focused via the `ArrowLeft` and `ArrowRight` keys
-   when an element is focused it becomes the `selected` element
-   only enabled elements are focusable

```js
import { html, LitElement } from 'lit';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/RovingTabindex.js';
import type { Button } from '@spectrum-web-components/button';

class Container extends LitElement {
    rovingTabindexController = new RovingTabindexController<Button>(this, {
        focusInIndex: (buttons) => return this.selected
            ? buttons.indexOf(this.selected)
            : 0,
        direction: 'horizontal',
        elementEnterAction: (button) => this.selected = button,
        elements: () => [...this.querySelectorAll('sp-button')],
        isFocusableElement: (button) => !button.disabled,
    });

    selected!: Button;

    render() {
        return html`<slot></slot>`;
    }
}
```

The above usage is very close to what can be seen in the [`<sp-radio-group>` element](../components/radio).
