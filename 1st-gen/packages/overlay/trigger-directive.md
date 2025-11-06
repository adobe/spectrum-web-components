## Overview

To support consumers that leverage `lit-html`, Spectrum Web Components also vends a [directive](https://lit.dev/docs/api/directives/) to further simplify the management of content conditional to whether or not the Overlay is currently visible.

### Usage

```zsh
yarn add @spectrum-web-components/overlay
```

Import the `trigger` directive as follows:

```ts
import { trigger } from '@spectrum-web-components/overlay';
```

### Example

Pass a `TemplateResult` into the `trigger()` directive, as follows in order to have it rendered to the DOM when the associated Overlay is about to open and the removed after the Overlay has closed.

```html-live
<div id="root"></div>

<script type="module">
    import { trigger } from '@spectrum-web-components/overlay';
    import { html, render } from 'lit-html';

    const renderOverlayContent = () => html`
        <sp-popover>
            <p>
                This content will display within the Overlay and
                <em>only</em>
                be on the DOM when the Overlay is open.
            </p>
        </sp-popover>
    `;

    const template = html`
        <sp-button
            ${trigger(renderOverlayContent, {
                open: false,
                triggerInteraction: 'click',
                overlayOptions: {
                    placement: 'bottom',
                    offset: 6,
                },
            })}
        >
            Trigger
        </sp-button>
    `;

    customElements.whenDefined('code-example').then(() => {
        Promise.all(
            [...document.querySelectorAll('code-example')].map(
                (example) => example.updateComplete
            )
        ).then(() => {
            const appRoot = document.querySelector('#root');
            appRoot.innerHTML = '';
            render(template, appRoot);
        });
    });
</script>
```

<script type="module">
    import { trigger } from '@spectrum-web-components/overlay';
    import { html, render } from 'lit-html';

    const renderOverlayContent = () => html`
        <sp-popover>
            <p>
                This content will display within the Overlay and
                <em>only</em>
                be on the DOM when the Overlay is open.
            </p>
        </sp-popover>
    `;

    const template = html`
        <sp-button ${trigger(renderOverlayContent, {
            open: false,
            triggerInteraction: 'click',
            overlayOptions: {
                placement: 'bottom',
                offset: 6,
            }
        })}>Trigger</sp-button>
    `;

    customElements.whenDefined('code-example').then(() => {
        Promise.all([...document.querySelectorAll('code-example')].map(example => example.updateComplete)).then(() => {
            const appRoot = document.querySelector('#root');
            appRoot.innerHTML = '';
            render(template, appRoot);
        });
    });
</script>

### Options

The `trigger()` directive accepts two arguments:

-   a required method returning the `TemplateResult` defining the content of the open overlay

```ts
() => TemplateResult;
```

-   an optional options object which is shaped as follows:

```ts
{
    open?: boolean; // Whether the Overlay in question should be rendered open.
    triggerInteraction: TriggerInteraction; // 'click' | 'longpress' | 'hover'
    overlayOptions: OverlayOptions;
    insertionOptions?: InsertionOptions;
}
```

`OverlayOptions` are leveraged in the same way as outlined [here](https://opensource.adobe.com/spectrum-web-components/components/imperative-api/#overlayoptions) and `InsertionOptions` are leveraged to outline where in the DOM the Overlay should be inserted:

```ts
type InsertionOptions = {
    el: HTMLElement | (() => HTMLElement); // returning a reference to the element the Overlay should be inserted adjacent to
    where: InsertPosition; // 'afterbegin' | 'afterend' | 'beforebegin' | 'beforeend'
};
```
