## Overview

While `<sp-tooltip>` elements are generally fairly innocuous amounts of DOM, it is possible impact performance with too many Tooltips. To support consumers that use `lit-html`, Spectrum Web Components also proives a [directive](https://lit.dev/docs/api/directives/) to improve performance when using many `<sp-tooltip>` elements.

### Usage

```
yarn add @spectrum-web-components/tooltip
```

Import the tooltip directive as follows:

```
import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';
```

### Anatomy

The tooltip directive consists of two main parts:

1. A method returning the `TemplateResult` defining the content of the open overlay:

```ts
() => TemplateResult;
```

2. An optional options object for configuring the tooltip behavior:

```ts
{
    open?: boolean; // Whether the Overlay in question should be rendered open.
    triggerInteraction: TriggerInteraction; // 'click' | 'longpress' | 'hover'
    overlayOptions: OverlayOptions;
    insertionOptions?: InsertionOptions;
    variant: 'info' | 'positive' | 'negative';
}
```

### Options

#### Overlay Options

The `overlayOptions` are leveraged in the same way as outlined [here](https://opensource.adobe.com/spectrum-web-components/components/imperative-api/#overlayoptions).

#### Insertion Options

The `insertionOptions` define where in the DOM the Overlay should be inserted:

```ts
type InsertionOptions = {
    el: HTMLElement | (() => HTMLElement); // returning a reference to the element the Overlay should be inserted adjacent to
    where: InsertPosition; // 'afterbegin' | 'afterend' | 'beforebegin' | 'beforeend'
};
```

### Behaviors

#### Consumption via `lit-html`

The `tooltip()` directive will automatically wrap whatever content you provide in an `<sp-tooltip>` element. Pass a `TemplateResult` into the `tooltip()` directive to have it rendered to the DOM when the associated Tooltip is about to open and then removed after the Tooltip has closed.

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

### Accessibility

The tooltip directive automatically manages accessibility features:

- Tooltips are associated with their trigger elements via `aria-describedby`
- Content is only rendered when needed, reducing DOM complexity
- Hover and focus interactions are handled automatically
- Keyboard navigation support is built-in

For more information on accessibility, see the [Accessibility](https://opensource.adobe.com/spectrum-web-components/components/tooltip/#accessibility) section of the tooltip component.
