## Description

While `<sp-tooltip>` element are general fairly innocumous amounts of DOM, it is possible that your page will quickly leverage so many Tooltips that their presence could begin to negatively effect its performane. To support consumers that leverage `lit-html`, Spectrum Web Components also vends a [directive](https://lit.dev/docs/api/directives/) to further simplify the delivery of `<sp-tooltip>` elements.

### Uusage

```
yarn add @spectrum-web-components/tooltip
```

Import the `trigger` directive as follows:

```
import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';
```

## Arguments

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
    variant: 'info' | 'positive' | 'negative';
}
```

The `triggerInteraction` is applied as `hover` when using the `tooltip()` directive.

`OverlayOptions` are leveraged in the same way as outlined [here](https://opensource.adobe.com/spectrum-web-components/components/imperative-api/#overlayoptions) and `InsertionOptions` are leveraged to outline where in the DOM the Overlay should be inserted:

```ts
type InsertionOptions = {
    el: HTMLElement | (() => HTMLElement); // returning a reference to the element the Overlay should be inserted adjacent to
    where: InsertPosition; // 'afterbegin' | 'afterend' | 'beforebegin' | 'beforeend'
};
```

## Consumption via `lit-html`

The `tooltip()` directive will automatically wrap whatever content you provide in an `<sp-tooltip>` element for you, so you will not need to supply one in this case.

Pass a `TemplateResult` into the `tooltip()` directive, as follows in order to have it rendered to the DOM when the associated Tooltip is about to open and the removed after the Tooltip has closed.

```html-live

<div id="root"></div>

<script type="module">
    import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';
    import { html, render } from 'lit-html';

    const renderOverlayContent = () => html`
        <p>Tooltip content</p>
    `;

    const template = html`
        <sp-button ${tooltip(renderOverlayContent, {
            variant: 'negative'
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
```

<script type="module">
    import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';
    import { html, render } from 'lit-html';

    const renderOverlayContent = () => html`
        <p>Tooltip content</p>
    `;

    const template = html`
        <sp-button ${tooltip(renderOverlayContent, {
            variant: 'negative'
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
