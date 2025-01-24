## Description

The `PendingStateController` is a class that helps manage the pending state of a reactive element. It provides a standardized way to indicate when an element is in a pending state, such as during an asynchronous operation.
When the components is in a pending state it supplies the pending state UI `sp-progress-circle` which gets rendered in the component.
It also updates the value of ARIA label of the host element to its pending-label based on the pending state.

The `HostWithPendingState` interface defines the properties that a host element must implement to work with the `PendingStateController`.

## Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```
yarn add @spectrum-web-components/reactive-controllers
```

Import the `PendingStateController` via:

```
import { PendingStateController } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
```

## Example

```js
import { LitElement } from 'lit';
import { PendingStateController, HostWithPendingState } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';

class Host extends LitElement<HostWithPendingState> {

    /** Whether the items are currently loading. */
    @property({ type: Boolean, reflect: true })
    public pending = false;

    /** Whether the host is disabled. */
    @property({type: boolean})
    public disabled = false;

    /** Defines a string value that labels the while it is in pending state. */
    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Pending';
    public pendingStateController: PendingStateController<this>;

    /**
     * Initializes the `PendingStateController` for the component.
     * The `PendingStateController` manages the pending state of the Component.
     */
    constructor() {
        super();
        this.pendingStateController = new PendingStateController(this);
    }
    render(){
        return html`
        <host-element></host-element>
        ${when(
                this.pending,
                () => {
                    return this.pendingStateController.renderPendingState();
                }
            )}
        `
    }

}

```
