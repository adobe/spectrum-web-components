## Description

To support consumers that leverage `lit-html`, Spectrum Web Components also vends a [directive](https://lit.dev/docs/api/directives/) to further simplify the management of content conditional to whether or not the Overlay is currently visible.

### Usage

```
yarn add @spectrum-web-components/overlay
```

Import the `trigger` directive as follows:

```
import { trigger } from '@spectrum-web-components/overlay';
```

## Types

The `trigger()` directive accepts two arguments: a required method returning the `TemplateResult` defining the content of the open overlay and an options object. The options object is shaped as follows:

```ts
{
    open?: boolean; // Whether the Overlay in question should be rendered open.
    triggerInteraction: TriggerInteraction; // 'click' | 'longpress' | 'hover'
    overlayOptions: OverlayOptions;
    insertionOptions?: InsertionOptions;
}
```

The options are of type `OverlayOptions` (outlined [here](https://opensource.adobe.com/spectrum-web-components/components/imperative-api/#overlayoptions)) and `InsertionOptions` are leveraged to outline where in the DOM the Overlay should be inserted:

```ts
type InsertionOptions = {
    el: HTMLElement | (() => HTMLElement); // returning a reference to the element the Overlay should be inserted adjacent to
    where: InsertPosition; // 'afterbegin' | 'afterend' | 'beforebegin' | 'beforeend'
};
```

#### Consumption via `lit-html`

Pass a `TemplateResult` into the `trigger()` directive, as follows in order to have it rendered to the DOM when the associated Overlay is about to open and the removed after the Overlay has closed.

```js
import { trigger } from '@spectrum-web-components/overlay';

// ...

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
    <sp-button ${trigger(renderOverlayContent)}>Trigger</sp-button>
`;
```
