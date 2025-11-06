## Overview

While an `<sp-overlay>` element is the recommended entry point to the Spectrum Web Components Overlay API, you can also interact with this set of features via an imperative API, `Overlay.open`.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/overlay?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/overlay?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)

```zsh
yarn add @spectrum-web-components/overlay
```

Import the `Overlay` class to leverage its capabilities within your application or custom element:

```ts
import { Overlay } from '@spectrum-web-components/overlay';
```

### Example

Primarily, this class gives you access to the `open` method that will allow you to open an overlay:

```ts
Overlay.open(
    (overlayElement: HTMLElement), // the element that will be projected into the overlay, "content",
    (options?: OverlayOptions)
);
```

`Overlay.open()` is an asynchronous method that returns an `<sp-overlay>` element that wraps the `HTMLElement` provided as the `overlayElement`. While this process will set the `<sp-overlay>` element to `open`, consumers of this API will need to choose where to append this element to the DOM in order for the content to be made available in the browser.

```ts
(async () => {
    const content = document.querySelector('#content');
    const options = {
        offset: 0,
        placement: 'bottom',
        trigger: document.querySelector('#trigger'),
        type: 'auto',
    };
    const overlay = await Overlay.open(content, options);
    document.body.append(overlay);
})();
```

Keep in mind that a changing DOM tree is likely to alter the relationship between existing content. Without proper care this can negatively effect the CSS that you have applied to existing content. DOM events and DOM selection methods can also perform differently than expected as the tree shape changes.

### Options

When leveraging `Overlay.open()`, you can provide an optional second argument of `OverlayOptions`, with the following type:

```ts
type OverlayOptions = {
    delayed?: boolean;
    notImmediatelyCloseable?: boolean;
    offset?: number | [number, number];
    placement?: Placement;
    receivesFocus?: 'auto' | 'true' | 'false';
    trigger?: HTMLElement | VirtualTrigger;
    type?: 'modal' | 'page' | 'hint' | 'auto' | 'manual';
};
```

### Advanced topics

#### Using a virtual trigger

```html-live
<style>
    #root {
        position: relative;
        width: 100%;
        height: 20vh;
        background-color: var(--spectrum-gray-100);
        border: 1px solid var(--spectrum-gray-400);
    }
</style>

<p>Right click anywhere in bounded rectangle to open the menu</p>
<div id="root"></div>

<script type="module">

    import { html, render } from '@spectrum-web-components/base';
    import { VirtualTrigger, openOverlay } from '@spectrum-web-components/overlay';

    const contextMenuTemplate = () => html`
          <sp-popover
            style="width:300px;"
            @change=${(event) => {
                    event.target.dispatchEvent(
                    new Event('close', { bubbles: true })
                );
            }}
        >
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Select All</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item disabled>Copy</sp-menu-item>
                <sp-menu-item disabled>Cut</sp-menu-item>
                <sp-menu-item disabled>Paste</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;

    const init = () => {
        const appRoot = document.querySelector('#root');
        appRoot.addEventListener('contextmenu', async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const source = event.composedPath()[0];
            const { id } = source;
            const trigger = event.target;
            const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
            const fragment = document.createDocumentFragment();
            render(contextMenuTemplate(), fragment);
            const popover = fragment.querySelector('sp-popover');

            const overlay = await openOverlay(popover, {
                trigger: virtualTrigger,
                placement: 'right-start',
                offset: 0,
                notImmediatelyClosable: true,
                type: 'auto',
            });
            trigger.insertAdjacentElement('afterend', overlay);
        });
    }

    customElements.whenDefined('code-example').then(() => {
        Promise.all([...document.querySelectorAll('code-example')].map(example => example.updateComplete)).then(() => {
            init();
        });
    });
</script>
```

<script type="module">

    import { html, render } from '@spectrum-web-components/base';
    import { VirtualTrigger, openOverlay } from '@spectrum-web-components/overlay';

    const contextMenuTemplate = () => html`
          <sp-popover
            style="width:300px;"
            @change=${(event) => {
                    event.target.dispatchEvent(
                    new Event('close', { bubbles: true })
                );
            }}
        >
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Select All</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item disabled>Copy</sp-menu-item>
                <sp-menu-item disabled>Cut</sp-menu-item>
                <sp-menu-item disabled>Paste</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;

    const init = () => {
        const appRoot = document.querySelector('#root');
        appRoot.addEventListener('contextmenu', async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const source = event.composedPath()[0];
            const { id } = source;
            const trigger = event.target;
            const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
            const fragment = document.createDocumentFragment();
            render(contextMenuTemplate(), fragment);
            const popover = fragment.querySelector('sp-popover');

            const overlay = await openOverlay(popover, {
                trigger: virtualTrigger,
                placement: 'right-start',
                offset: 0,
                notImmediatelyClosable: true,
                type: 'auto',
            });
            trigger.insertAdjacentElement('afterend', overlay);
        });
    }

    customElements.whenDefined('code-example').then(() => {
        Promise.all([...document.querySelectorAll('code-example')].map(example => example.updateComplete)).then(() => {
            init();
        });
    });
</script>
