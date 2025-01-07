## Description

When working with a large amount of content that lives whithin an overlay, a page may encounter performance issues for placing a large amount of content within `<sp-overlay>` or `<overlay-trigger>` elements. To avoid this, an empty `<sp-overlay>` could be used instead. When triggered, the `<sp-overlay>` element will dispatch `slottable-request` just before it begins to open and just after it finished closing. When handling these events the contents of an overlay can be lazily rendered into the `<sp-overlay>` element as it opens and then, as needed, removed from the DOM once the overlay has closed.

### Usage

```
yarn add @spectrum-web-components/overlay
```

Import the side effectful registration of `<sp-overlay>` as follows:

```
import '@spectrum-web-components/overlay/sp-overlay.js';
```

Import type information about the `slottable-request` event and a symbol to signify that the request is for the DOM to be removed:

```
import {
    removeSlottableRequest,
    SlottableRequestEvent,
} from '@spectrum-web-components/overlay/src/slottable-request-event.js';
```

#### Javascript based consumption

When leveraging the `<sp-overlay>` in a javascript only context, you can leverage the `slottable-request` event and its `data` property to decide whether and what to render into the `<sp-overlay>` event.

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

Starting with no DOM in the `<sp-overlay>` element and returning to that when the Overlay element is no longer showing can support an application in releasing memory back to other activities.
