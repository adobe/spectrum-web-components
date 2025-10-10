## Description

In cases where you choose to lazily register custom element definitions across the lifecycle of your application, delaying certain functionality until that registration is complete can be beneficial. To normalize management of this process, a `DependencyManagerController` can be added to your custom element.

Use the `add()` method to inform the manager which custom element tag names you need to be defined before doing some action. When the elements you have provided to the manager are available, the controller will request an update to your host element and surface a `loaded` boolean to clarify the current load state of the managed dependencies.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```
yarn add @spectrum-web-components/reactive-controllers
```

Import the `DependencyManagerController` via:

```
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/DependencyManager.js';
```

## Example

A `Host` element that renders a different message depending on the `loaded` state of the `<some-heavy-element>` dependency in the following custom element definition:

```js
import { html, LitElement } from 'lit';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/DependencyManager.js';
import '@spectrum-web-components/button/sp-button.js';

class Host extends LitElement {
    dependencyManager = new DependencyManagerController(this);

    state = 'initial';

    forwardState() {
        this.state = 'heavy';
    }

    render() {
        const isInitialState = this.state === 'initial';
        if (isInitialState || !this.dependencyManager.loaded) {
            if (!isInitialState) {
                // When not in the initial state, this element depends on <some-heavy-element>
                this.dependencyManager.add('some-heavy-element');
                // Lazily load that element
                import('path/to/register/some-heavy-element.js');
            }
            return html`
                <sp-button
                    @click=${this.forwardState}
                    ?pending=${!isInitialState &&
                    !this.dependencyManager.loaded}
                >
                    Go to next state
                </sp-button>
            `;
        } else {
            // <some-heavy-element> has now been loaded and can be rendered
            return html`
                <some-heavy-element></some-heavy-element>
            `;
        }
    }
}
```
