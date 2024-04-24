## Description

The `downstate` controller is designed to manage the down state styles of a custom element in a web application. This controller is particularly useful for creating interactive elements that visually respond to user input, such as buttons or interactive components.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```
yarn add @spectrum-web-components/reactive-controllers
```

Import the `Downstate Controller` via:

```js
import { Downstate } from '@spectrum-web-components/reactive-controllers/downstate.js';
```

### Example

To enable a `downstate` on an element, you can add a `spectrumConfig` property to the element's class and specify the downstate configuration. Here's an example of how you can do this:

```js
import { html, LitElement } from 'lit';
import { Downstate } from '@spectrum-web-components/reactive-controllers/downstate.js';

class Host extends LitElement {
    downstate = new DownState(this);
    constructor() {
        super();
        this.spectrumConfig = {
            downstate: ['spectrum-two'],
        };
    }
    render() {
        return html`
            <slot></slot>
        `;
    }
}
```

Here `spectrum-two` is the name of the system on which the downstate will be applied to.
The above will add a downstate trigger into the slotted element and will add a pressed effect into the element's active state
