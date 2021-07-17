## Description

Overlays in Spectrum Web Components are created via the `Overlay` class system, which prepares an "overlay stack" that can manage the deployment of one or more overlays onto a page. Whether it's needed for transient content like a tooltip, for extended interactions like selecting a value from a picker, or for blocking content like a modal, the imperative APIs outlined below or the declarative APIs delivered by `<overlay-trigger>` should cover your overlay delivery needs.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/overlay?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/overlay?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)

```
yarn add @spectrum-web-components/overlay
```

Import the `Overlay` class to leverage its capabilities within your application or custom element:

```js
import { Overlay } from '@spectrum-web-components/overlay';
```

Primarily, this class gives you access to the `open` method that will allow you to open an overlay:

```js
Overlay.open(
    (owner: HTMLElement), // the element to open the overlay in reference to, "trigger"
    (interaction: TriggerInteractions), // the type of interaction type that opened the overlay
    (overlayElement: HTMLElement), // the element that will be projected into the overlay, "content"
    (options: OverlayOptions) // options to customize the overlay
);
```

`Overlay.open()` is an asynchronous method that returns a function for closing the overlay, so it is common to leverage this functionality like the following:

```js
(async () => {
    const trigger = document.querySelector('#trigger');
    const interaction = 'click';
    const content = document.querySelector('#content');
    const options = {
        offset: 0,
        placement: 'bottom',
    };
    const closeOverlay = await Overlay.open(
        trigger,
        interaction,
        content,
        options
    );
})();
```

## Types

### TriggerInteractions

This outlines the user experience that is to be delivered through the process of opening and closing an overlay.

```
type TriggerInteractions =
    | 'click'
    | 'custom',
    | 'hover'
    | 'inline'
    | 'modal'
    | 'replace';
```

`click` will open an overlay that will close immediately on the next click that is not on an element within the overlay.

`custom` is less opinionated and allows for some customization of the process from the outside.

`hover` will close the overlay as soon as the pointer leaves the trigger to which the overlay is connected.

`inline` places the overlay after the trigger but before the next element in the logical tab order. This means the `shift + tab` keyboard stroke will return to the trigger.

`modal` manages the overlay like a modal and will trap the tab order within its contents only.

`replace` will position the overlay directly in the position of the trigger in the logical tab order. This means the `shift + tab` keyboard stroke will return the focusable element immediately prior to the trigger.

### OverlayOptions

```
type OverlayOptions = {
    delayed?: boolean;
    placement?: Placement;
    offset?: number;
    receivesFocus?: 'auto';
}
```

`delayed` allows for the overlay to open the overlay with warmup/cooldown behaviors as described at https://spectrum.adobe.com/page/tooltip/#Immediate-or-delayed-appearance

`placement` outlines where the overlay system should attempt to position the overlay in relation to the trigger. When the layout of the page and/or current scroll positioning prevents the successful placement of the content in this way, the `placement` will be automatically applied as the value best suited for those conditions. Placements available include: `"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"`.

`offset` defines the distance of the overlay content from the trigger, measured in pixels.

`receivesFocus` tells the overlay stack to throw focus into the overlay after it has opened.

### Events

The work to both open and close an overlay is asynchronous. This asynchrony is surfaced into the application via DOM events dispatched from the `trigger` element of your overlay. An `sp-opened` event will be dispatched once the overlay has finished opening, and an `sp-closed` event will be dispatched once the overlay has finished closing. In both cases, the dispatched event will include a `detail` property with an `interaction: TriggerInteractions` key to support associating the event/overlay with its originating `interaction`.

## Example

```html
<sp-button
    onclick="
        const trigger = this;
        const interaction = 'click';
        const content = this.nextElementSibling;
        if (!content) return;
        const options = {
            offset: 0,
            placement: 'right',
        };
        content.open = true;
        const closeOverlayPromise = Overlay.open(
            trigger, 
            interaction,
            content,
            options
        );
        setTimeout(function () {
            closeOverlayPromise.then(function(close) {
                close();
                content.open = false;
            });
        }, 5000);
    "
>
    Click me for a 5 second overlay!
</sp-button>
<sp-popover>
    <sp-dialog size="medium">
        <h2 slot="heading">Demo</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
        augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas
        diam in arcu cursus euismod quis viverra. Posuere ac ut consequat semper
        viverra nam libero justo laoreet. Enim ut tellus elementum sagittis
        vitae et leo duis ut. Neque laoreet suspendisse interdum consectetur
        libero id faucibus nisl. Diam volutpat commodo sed egestas egestas.
        Dolor magna eget est lorem ipsum dolor. Vitae suscipit tellus mauris a
        diam maecenas sed. Turpis in eu mi bibendum neque egestas congue.
        Rhoncus est pellentesque elit ullamcorper dignissim cras lobortis.
    </sp-dialog>
</sp-popover>
```

## Styling

When an overlay is opened from within a styled DOM scope as created by an `<sp-theme>` element, this scope will be resolved and recreated with in the `<active-overlay>` element that is created to host the overlaid content directly in the `<body>`. By default, the generated `<sp-theme>` element will be supplied with settings of the scope from which the overlay is triggered, including any "app" centric CSS Custom Properties that might be applied via `Theme.registerThemeFragment('app', 'app', themeFragment)` therein. In the case that you have set CSS Custom Properties for the scope created by an `<sp-theme>` element via other methods, you can specify that those values should also be applied to overlay content using the `theme` part on the `<active-overlay>` element via the `active-overlay::part(theme) { /* styles */ }` selector.

## Advanced Usage

When working with the DOM-based APIs of custom elements, it is sometimes preferred to project content into an overlay from a different shadow root (eg projecting a single-slotted element into the overlay). To ensure that the content can be marshalled through any number of `<slot>` elements which are addressed into subsequent `<slot>` elements, be sure to use the `flatten: true` option when querying `slot.asignedNodes()`:

```js
const trigger = shadowRoot.querySelector('#trigger');
const slot = shadowRoot.querySeletor('slot');
const interaction = 'click';
const content = slot
    .assignedNodes({ flatten: true })
    .find((node) => node instanceof HTMLElement);
const options = {
    offset: 0,
    placement: 'bottom',
};
const closeOverlay = await Overlay.open(trigger, interaction, content, options);
```

Other times, you may want to compose content from multiple shadow roots into a single overlay. This is a pattern seen in the `<sp-dropdown>` element: its `<sp-menu>` light DOM child is wrapped by its `<sp-popover>` shadow DOM child before being projected into an overlay. What follows is a more trivial example, where content in the light DOM of an element is injected into an element in the shadow DOM of the same element and then projected into an overlay. Notice the added work here of setting a comment node into the light DOM as a placeholder for the "stolen" content, and then swapping that content back into the light DOM when the overlay is closed.

```js
const trigger = this.shadowRoot.querySelector('#trigger');
const outterContent = this.shadowRoot.querySelector('#outter-content');
const innerContent = this.querySelector('#inner-content');
const innerContentParent =
    innerContent.parentElement || innerContent.getRootNode();
const placeholder = document.createComment('placeholder for inner content');
innerContentParent.replaceChild(placeholder, innerContent);
outterContent.append(innerContent);
const interaction = 'click';
const options = {
    offset: 0,
    placement: 'bottom',
};
const closeOverlayPromise = Overlay.open(
    trigger,
    interaction,
    outterContent,
    options
);
const closeOverlay = function () {
    closeOverlayPromise.then((close) => close());
    innerContentParent.replaceChild(placeholder, innerContent);
};
```
