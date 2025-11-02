<sp-alert-banner open variant="negative">
    <div class="spectrum-InLineAlert-header">
        <span>Experimental Feature</span>
    </div>
    <div class="spectrum-InLineAlert-content">
        The <code>slottable-request</code> event system is experimental. Its shape and presence in the library may change. For stable overlay content management, consider using <code>sp-overlay</code> or <code>Overlay.open()</code>.
    </div>
</sp-alert-banner>

## Overview

The `slottable-request` event provides a performance optimization mechanism for overlays with large content. Instead of keeping large amounts of content in the DOM at all times, an empty `<sp-overlay>` can be used initially. The overlay will dispatch `slottable-request` events just before opening and after closing, allowing content to be lazily rendered and removed as needed.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/overlay?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/overlay?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)

```zsh
yarn add @spectrum-web-components/overlay
```

Import the side effectful registration of `<sp-overlay>` via:

```ts
import '@spectrum-web-components/overlay/sp-overlay.js';
```

For type information and utilities, import:

```ts
import {
    removeSlottableRequest,
    SlottableRequestEvent,
} from '@spectrum-web-components/overlay/src/slottable-request-event.js';
```

### Example

#### Basic usage

Here's a basic example of using `slottable-request` with vanilla JavaScript:

```html-live
<sp-button id="js-trigger">Trigger</sp-button>
<sp-overlay trigger="js-trigger@click" placement="right-start"></sp-overlay>

<script type="module">
    import { removeSlottableRequest } from '@spectrum-web-components/overlay/src/slottable-request-event.js';

    function initOverlay() {
        const overlay = document.querySelector('[trigger="js-trigger@click"]');
        overlay.addEventListener('slottable-request', function (event) {
            if (event.data === removeSlottableRequest) {
                this.innerHTML = '';
            } else {
                this.innerHTML = `
                <sp-popover>
                    <p>This content will display within the Overlay and <em>only</em> be on the DOM when the Overlay is open.</p>
                </sp-popover>
                `;
            }
        });
    }

    customElements.whenDefined('code-example').then(() => {
        customElements.whenDefined('sp-overlay').then(() => {
            initOverlay();
        });
    });
</script>
```

<script type="module">
    import { removeSlottableRequest } from '@spectrum-web-components/overlay/src/slottable-request-event.js';

    function initOverlay() {
        const overlay = document.querySelector('[trigger="js-trigger@click"]');
        overlay.addEventListener('slottable-request', function (event) {
            if (event.data === removeSlottableRequest) {
                this.innerHTML = '';
            } else {
                this.innerHTML = `
                <sp-popover>
                    <p>This content will display within the Overlay and <em>only</em> be on the DOM when the Overlay is open.</p>
                </sp-popover>
                `;
            }
        });
    }

    customElements.whenDefined('code-example').then(() => {
        customElements.whenDefined('sp-overlay').then(() => {
            initOverlay();
        });
    });
</script>

### Options

#### Event data

The `SlottableRequestEvent` includes the following properties:

-   `data`: Contains either an empty object (when opening) or the `removeSlottableRequest` symbol (when closing)
-   `name`: The name of the request
-   `slotName`: The slot name, optionally with a key appended

### Advanced topics

#### Event timing

The `slottable-request` event is dispatched at specific times:

1. Just before the overlay begins to open
2. Just after the overlay finishes closing

This timing ensures proper coordination with overlay transitions and animations.

#### Memory management

By starting with an empty overlay and removing content when closed, applications can better manage memory usage, especially when dealing with:

-   Large DOM trees
-   Complex components
-   Multiple overlays
-   Resource-intensive content

#### Integration with Lit

For Lit-based applications, a directive is available for handling slottable requests:

```ts
import { slottableRequest } from '@spectrum-web-components/overlay/src/slottable-request-directive.js';

// Use in a lit template
html`
    <sp-overlay
        ${slottableRequest(
            () => html`
                <sp-popover>
                    <p>Lazily rendered content</p>
                </sp-popover>
            `
        )}
    ></sp-overlay>
`;
```
