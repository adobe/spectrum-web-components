## Description

While an `<sp-overlay>` element is the recommended entry point to the Spectrum Web Components Overlay API, you can also interact with this set of features via an imperative API, `Overlay.open`.

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
    (overlayElement: HTMLElement), // the element that will be projected into the overlay, "content",
    (options?: OverlayOptions)
);
```

`Overlay.open()` is an asynchronous method that returns an `<sp-overlay>` element that wraps the `HTMLElement` provided as the `overlayElement`. While this process will set the `<sp-overlay>` element to `open`, consumers of this API will need to choose where to append this element to the DOM in order for the content to be made available in the browser.

```js
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

## OverlayOptions

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

### delayed

An Overlay that is `delayed` will wait until a warm-up period of 1000ms has completed before opening. Once the warmup period has completed, all subsequent Overlays will open immediately. When no Overlays are opened, a cooldown period of 1000ms will begin. Once the cooldown has completed, the next Overlay to be opened will be subject to the warm-up period if provided that option.

### notImmediatelyCloseable

When an Overlay is `notImmediatelyCloseable` that means that the first interaction that would lead to the closure of the Overlay in question will be ignored. This is useful when working with non-"click" mouse interactions, like `contextmenu`, where the trigger event (e.g. `contextmenu`) occurs _before_ an event that would close said overlay (e.g. `pointerup`).

### offset

The `offset` property accepts either a single number, to define the offset of the Overlay along the main axis from the trigger, or 2-tuple, to define the offset along the main axis and the cross axis. This option has no effect when there is no trigger element.

### placement

A `placement` of `"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"` will instruct the Overlay where to place itself in relationship to the trigger element.

### receivesFocus

Some Overlays will always be passed focus (e.g. modal or page Overlays). When this is not true, the `receivesFocus` option will inform the API whether to attempt to pass focus into the Overlay once it is open. `'true'` will pass focus, `'false'` will not (when possible), and `"auto"` (the default), will make a decision based on the `type` of the Overlay.

### trigger

The `trigger` option accepts an `HTMLElement` or a `VirtualTrigger` from which to position the Overlay.

### type

The `type` of an Overlay outlines a number of things about the interaction model within which is works.

-   `'modal'` Overlays are opened with the `showModal()` method on a `<dialog>` element, which causes the Overlay to accept focus and trap the tab stop within the content of said Overlay.
-   `'page'` Overlays will act in a similar manner to a `'modal'` Overlay, however they will not be allowed to close via the "light dismiss" algorithm (e.g. the Escape key).
-   `'hint'` Overlays are much like tooltips so they are not just ephemeral, but they are delivered primarily as a visual helper and exist outside of the tab order. In this way, be sure _not_ to place interactive content within this type of Overlay.
-   `'auto'` Overlays provide a place for content that is ephemeral _and_ interactive. These Overlays can accept focus but will close when losing that focus, or when interacting with other parts of the page.
-   `'manual'` Overlays act much like `"auto"` Overlays, but do not close when losing focus or interacting with other parts of the page. When a `"manual"` Overlay is at the top of the "overlay stack", it will still respond to the Escape key and close.
