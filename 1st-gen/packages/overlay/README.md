## 📚 Documentation

**New to overlays?** Start with the [Getting Started Guide](./GETTING-STARTED.md) to choose the right approach for your use case.

### 🚀 Getting started

- **[Getting Started Guide](./GETTING-STARTED.md)** 📘 - Interactive decision tree to choose the right overlay approach
- **[README](./README.md)** 📄 - Component overview and basic usage (this document)

### 📖 Learn more

- **[Architecture](./ARCHITECTURE.md)** 🏗️ - How the overlay system works internally
  - Overlay stack management
  - Interaction controllers (Click, Hover, Longpress)
  - Placement engine and collision detection
  - Event lifecycle
- **[Accessibility](./ACCESSIBILITY.md)** ♿ - Focus management and ARIA patterns
  - Focus trapping and restoration
  - Keyboard navigation
  - Screen reader support
  - WCAG compliance
- **[Performance](./PERFORMANCE.md)** ⚡ - Optimization strategies and benchmarks
  - Lazy loading with slottable-request
  - triggered-by optimization
  - Memory management
  - Performance metrics

### 🔧 Entry points

Choose the right API for your use case:

- **[`<sp-overlay>`](./README.md#usage)** 🎯 - Declarative overlay element (this document)
  - Single interaction per trigger
  - Fine-grained control
  - Virtual positioning support
- **[`<overlay-trigger>`](./overlay-trigger.md)** 🎭 - Multiple interactions per trigger
  - Combined hover + click patterns
  - Slot-based API
  - Automatic lifecycle management
- **[Imperative API](./imperative-api.md)** ⚙️ - Programmatic overlay control
  - Dynamic overlay creation
  - VirtualTrigger for cursor positioning
  - Full lifecycle control
- **[Trigger Directive](./trigger-directive.md)** 🔗 - Lit template integration
  - Lit framework specific
  - Reactive content updates
  - TypeScript integration
- **[Slottable Request](./slottable-request.md)** 🚀 - Lazy content loading
  - Performance optimization
  - Reduce initial DOM size
  - On-demand content creation

### 🎯 Integration guides

Real-world patterns and best practices:

- **[Forms Integration](./FORMS-INTEGRATION.md)** 📝 - Validation and field helpers
  - Validation popovers
  - Field error display
  - Picker integration
  - Form field helpers
- **[Menus Integration](./MENUS-INTEGRATION.md)** 📋 - Action menus and dropdowns
  - Context menus
  - Action menus
  - Dropdown patterns
  - Menu positioning

### 🔍 Troubleshooting

- **[Troubleshooting Guide](./TROUBLESHOOTING.md)** 🔧 - Symptom-based problem diagnosis
  - Overlay won't open
  - Overlay won't close
  - Positioning issues
  - Focus management problems
  - Performance issues
  - Accessibility issues

### 📊 Additional resources

- **[Storybook Examples](https://opensource.adobe.com/spectrum-web-components/storybook)** - Interactive examples and demos
- **[GitHub Discussions](https://github.com/adobe/spectrum-web-components/discussions)** - Ask questions and share feedback
- **[GitHub Issues](https://github.com/adobe/spectrum-web-components/issues)** - Report bugs and request features

---

## Overview

An `<sp-overlay>` element is used to decorate content that you would like to present to your visitors as "overlaid" on the rest of the application. This includes dialogs (modal and not), pickers, tooltips, context menus, et al.

## Choosing an entry point

The overlay system provides several ways to create overlays. Use this guide to choose the right approach:

**Use `<sp-overlay>`** (this component) when you need:

- Single interaction type per trigger (click, hover, or longpress)
- Fine-grained control over overlay behavior
- Virtual triggers for cursor-based positioning
- Direct access to all overlay features

**Use [`<overlay-trigger>`](./overlay-trigger.md)** when you need:

- Multiple interaction types on one trigger (hover tooltip + click dialog)
- Simpler slot-based API
- Automatic content lifecycle management

**Use [Imperative API](./imperative-api.md)** when you need:

- Programmatic overlay creation and control
- Dynamic positioning with `VirtualTrigger`
- Context menus or complex lifecycle management

**Use [Trigger directive](./trigger-directive.md)** when you're:

- Building Lit-based applications
- Need reactive content updates
- Want template composition benefits

See the [Getting Started Guide](./GETTING-STARTED.md) for a detailed decision tree and comparison.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/overlay?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/overlay?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)

```zsh
yarn add @spectrum-web-components/overlay
```

Import the side effectful registration of `<sp-overlay>` as follows:

```ts
import '@spectrum-web-components/overlay/sp-overlay.js';
```

When looking to leverage the `Overlay` base class as a type and/or for extension purposes, do so via:

```ts
import { Overlay } from '@spectrum-web-components/overlay';
```

### Example

By leveraging the `trigger` attribute to pass an ID reference to another element within the same DOM tree, your overlay will be positioned in relation to this element. When the ID reference is followed by an `@` symbol and interaction type, like `click`, `hover`, or `longpress`, the overlay will bind itself to the referenced element via the DOM events associated with that interaction.

```html
<sp-button id="trigger">Overlay Trigger</sp-button>

<!-- Opening an overlay via a click interaction -->
<sp-overlay trigger="trigger@click" placement="bottom">
    <sp-popover>
        <sp-dialog>
            <h2 slot="heading">Clicking opens this popover...</h2>
            <p>But, it really could be anything. Really.</p>
        </sp-dialog>
    </sp-popover>
</sp-overlay>

<!-- Opening an overlay via a hover interaction -->
<sp-overlay trigger="trigger@hover" placement="bottom">
    <sp-tooltip>
        I'm a tooltip and I'm triggered by hovering over the button!
    </sp-tooltip>
</sp-overlay>
```

### Anatomy

When a `<sp-overlay>` element is opened, it will pass that state to its direct children elements as the property `open`, which it will set to `true`. Elements should react to this by initiating any transition between closed and open that they see fit. Similarly, `open` will be set to `false` when the `<sp-overlay>` element is closed.

## Architecture overview

Understanding the key components of the overlay system will help you use it effectively:

### Interaction controllers

The overlay system uses **interaction controllers** to manage different trigger types:

- **ClickController**: Handles click interactions on trigger elements
- **HoverController**: Manages hover and focus interactions with delayed close behavior
- **LongpressController**: Detects longpress gestures on trigger elements

Each controller binds appropriate DOM events to the trigger element and manages the overlay's open/close state.

### Overlay stack

Multiple overlays are managed by a global **overlay stack** that:

- Tracks all open overlays in order
- Manages focus trapping for modal overlays
- Handles ESC key presses (closing from top to bottom)
- Prevents conflicts between overlays

### Placement system

The **PlacementController** uses [Floating UI](https://floating-ui.com/) to:

- Position overlays relative to trigger elements
- Calculate fallback placements when space is constrained
- Apply offsets and maintain required spacing
- Update position when content or viewport changes

### Overlay types and focus behavior

Different overlay types have specific focus management:

- **`modal` and `page`**: Always trap focus within overlay (modal prevents ESC close)
- **`auto`**: Accepts focus, closes on outside click or focus loss
- **`manual`**: Accepts focus, only closes on ESC or programmatic close
- **`hint`**: No focus management, closes on any interaction

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed technical documentation.

## Performance considerations

### The `delayed` attribute

Use `delayed` for hover tooltips to prevent unnecessary overlay creation:

```html
<sp-overlay trigger="button@hover" type="hint" delayed>
    <sp-tooltip>This tooltip has a warm-up delay</sp-tooltip>
</sp-overlay>
```

The first hover waits 1000ms before opening. Subsequent hovers open immediately until 1000ms passes with no overlays open.

### Lazy content loading with `slottable-request`

For overlays with large or expensive content, use the `slottable-request` event to load content only when needed:

```javascript
overlay.addEventListener('slottable-request', (event) => {
    if (event.data === removeSlottableRequest) {
        // Overlay closing - remove content
        overlay.innerHTML = '';
    } else {
        // Overlay opening - add content
        overlay.innerHTML = '<sp-popover>Large content here</sp-popover>';
    }
});
```

See [slottable-request.md](./slottable-request.md) and [PERFORMANCE.md](./PERFORMANCE.md) for more optimization strategies.

### Virtual triggers

When you need to position an overlay at specific coordinates (like for context menus), use `VirtualTrigger`:

```javascript
import { VirtualTrigger } from '@spectrum-web-components/overlay';

const overlay = document.querySelector('sp-overlay');
overlay.triggerElement = new VirtualTrigger(x, y);
overlay.open = true;

// Update position dynamically
overlay.triggerElement.updateBoundingClientRect(newX, newY);
```

### Options

<sp-tabs selected="delayed" auto label="Overlay options">
<sp-tab value="delayed">delayed</sp-tab>
<sp-tab-panel value="delayed">

An Overlay that is `delayed` will wait until a warm-up period of 1000ms has completed before opening. Once the warmup period has completed, all subsequent Overlays will open immediately. When no Overlays are opened, a cool down period of 1000ms will begin. Once the cool down has completed, the next Overlay to be opened will be subject to the warm-up period if provided that option.

```html
<sp-button id="trigger">Overlay Trigger</sp-button>

<sp-overlay trigger="trigger@hover" placement="bottom" delayed>
    <sp-tooltip>I'm a tooltip and I'm delayed!</sp-tooltip>
</sp-overlay>
```

</sp-tab-panel>
<sp-tab value="notImmediatelyCloseable">notImmediatelyCloseable</sp-tab>
<sp-tab-panel value="notImmediatelyCloseable">

When an Overlay is `notImmediatelyCloseable` that means that the first interaction that would lead to the closure of the Overlay in question will be ignored. This is useful when working with non-"click" mouse interactions, like `contextmenu`, where the trigger event (e.g. `contextmenu`) occurs _before_ an event that would close said overlay (e.g. `pointerup`).

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
<div id="root">
    <sp-overlay
        offset="0"
        type="auto"
        placement="right-start"
    >
        <sp-popover style="width:300px;">
            <sp-menu>
                <sp-menu-group>
                    <span slot="header">Menu</span>
                    <sp-menu-item>Deselect</sp-menu-item>
                    <sp-menu-item>Select inverse</sp-menu-item>
                    <sp-menu-item>Feather...</sp-menu-item>
                    <sp-menu-item>Select and mask...</sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item>Save selection</sp-menu-item>
                    <sp-menu-item disabled>Make work path</sp-menu-item>
                </sp-menu-group>
            </sp-menu>
        </sp-popover>
    </sp-overlay>
</div>

<script type="module">
    import { VirtualTrigger } from '@spectrum-web-components/overlay';

    const init = () => {
        const overlay = document.querySelector('sp-overlay');
        const popover = overlay.querySelector('sp-popover');

        // Set up the virtual trigger
        overlay.triggerElement = new VirtualTrigger(0, 0);

        // Set up change handler for menu items
        popover.addEventListener('change', (event) => {
            event.target.dispatchEvent(new Event('close', { bubbles: true }));
        });

        const handleContextmenu = async (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (overlay.triggerElement instanceof VirtualTrigger) {
                overlay.triggerElement.updateBoundingClientRect(
                    event.clientX,
                    event.clientY
                );
            }
            overlay.willPreventClose = true;
            overlay.open = true;
        };

        const root = document.getElementById('root');
        root.addEventListener('contextmenu', handleContextmenu, { capture: true });
    }

   customElements.whenDefined('code-example').then(() => {
        Promise.all([...document.querySelectorAll('code-example')].map(example => example.updateComplete)).then(() => {
            init();
        });
    });
</script>
```

<script type="module">
    import { VirtualTrigger } from '@spectrum-web-components/overlay';

    const init = () => {
        const overlay = document.querySelector('sp-overlay');
        const popover = overlay.querySelector('sp-popover');

        // Set up the virtual trigger
        overlay.triggerElement = new VirtualTrigger(0, 0);

        // Set up change handler for menu items
        popover.addEventListener('change', (event) => {
            event.target.dispatchEvent(new Event('close', { bubbles: true }));
        });

        const handleContextmenu = async (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (overlay.triggerElement instanceof VirtualTrigger) {
                overlay.triggerElement.updateBoundingClientRect(
                    event.clientX,
                    event.clientY
                );
            }
            overlay.willPreventClose = true;
            overlay.open = true;
        };

        const root = document.getElementById('root');
        root.addEventListener('contextmenu', handleContextmenu, { capture: true });
    }

   customElements.whenDefined('code-example').then(() => {
        Promise.all([...document.querySelectorAll('code-example')].map(example => example.updateComplete)).then(() => {
            init();
        });
    });
</script>

</sp-tab-panel>
<sp-tab value="offset">offset</sp-tab>
<sp-tab-panel value="offset">

The `offset` property accepts either a single number, to define the offset of the Overlay along the main axis from the trigger, or 2-tuple, to define the offset along the main axis and the cross axis. This option has no effect when there is no trigger element.

```html
<sp-button id="trigger">Overlay Trigger</sp-button>

<sp-overlay trigger="trigger@click" placement="bottom" offset="50">
    <sp-popover>
        <sp-dialog>
            <h2 slot="heading">Clicking opens this popover...</h2>
            <p>An offset of 50px is applied to the overlay.</p>
        </sp-dialog>
    </sp-popover>
</sp-overlay>
```

</sp-tab-panel>
<sp-tab value="placement">placement</sp-tab>
<sp-tab-panel value="placement">

A `placement` of `"auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"` will instruct the Overlay where to place itself in relationship to the trigger element.

```html
<sp-button id="trigger">Overlay Trigger</sp-button>

<sp-overlay trigger="trigger@click" placement="right-start">
    <sp-popover>
        <sp-dialog>
            <h2 slot="heading">Clicking opens this popover...</h2>
            <p>The overlay is placed to the right of the trigger.</p>
        </sp-dialog>
    </sp-popover>
</sp-overlay>
```

</sp-tab-panel>
<sp-tab value="receivesFocus">receivesFocus</sp-tab>
<sp-tab-panel value="receivesFocus">

Some Overlays will always be passed focus (e.g. modal or page Overlays). When this is not true, the `receivesFocus` option will inform the API whether to attempt to pass focus into the Overlay once it is open. `'true'` will pass focus, `'false'` will not (when possible), and `"auto"` (the default), will make a decision based on the `type` of the Overlay.

```html
<sp-button id="trigger">Overlay Trigger</sp-button>

<sp-overlay trigger="trigger@click" placement="bottom" receives-focus="false">
    <sp-popover>
        <sp-dialog>
            <h2 slot="heading">
                Clicking opens this popover but does not receive focus
            </h2>
            <sp-field-label>Enter your email</sp-field-label>
            <sp-textfield placeholder="test@gmail.com"></sp-textfield>
            <sp-action-button
                onClick="
                    this.dispatchEvent(
                        new Event('close', {
                            bubbles: true,
                            composed: true,
                        })
                    );
                "
            >
                Sign in
            </sp-action-button>
        </sp-dialog>
    </sp-popover>
</sp-overlay>
```

</sp-tab-panel>
</sp-tabs>

#### trigger

The `trigger` attribute accepts a string ID reference for the trigger element combined with the interaction type.

The format is `"elementId@interaction"`, where:

- `elementId` is the ID of the HTML element to use as the trigger
- `interaction` is required and can be `click`, `hover`, or `longpress`

Examples:

```html
<sp-button id="my-button">Open Overlay</sp-button>

<!-- Explicit click interaction -->
<sp-overlay trigger="my-button@click" placement="top-start">
    <sp-popover>Click popover</sp-popover>
</sp-overlay>

<!-- Explicit hover interaction -->
<sp-overlay trigger="my-button@hover" placement="right-start">
    <sp-popover>Hover popover</sp-popover>
</sp-overlay>

<!-- Explicit longpress interaction -->
<sp-overlay trigger="my-button@longpress" placement="bottom-start">
    <sp-popover>Longpress popover</sp-popover>
</sp-overlay>
```

#### triggerElement

The `triggerElement` property accepts an `HTMLElement` or a `VirtualTrigger` from which to position the Overlay.

- You can import the `VirtualTrigger` class from the overlay package to create a virtual trigger that can be used to position an Overlay. This is useful when you want to position an Overlay relative to a point on the screen that is not an element in the DOM, like the mouse cursor.

#### type

The `type` of an Overlay outlines a number of things about the interaction model within which it works:

<sp-tabs selected="modal" auto label="Type attribute options">
<sp-tab value="modal">Modal</sp-tab>
<sp-tab-panel value="modal">

`'modal'` Overlays create a modal context that traps focus within the content and prevents interaction with the rest of the page. The overlay manages focus trapping and accessibility features like `aria-modal="true"` to ensure proper screen reader behavior.

They should be used when you need to ensure that the user has interacted with the content of the Overlay before continuing with their work. This is commonly used for dialogs that require a user to confirm or cancel an action before continuing.

```html
<sp-button id="trigger">open modal</sp-button>
<sp-overlay trigger="trigger@click" type="modal">
    <sp-dialog-wrapper headline="Signin form" dismissable underlay>
        <p>I am a modal type overlay.</p>
        <sp-field-label>Enter your email</sp-field-label>
        <sp-textfield placeholder="test@gmail.com"></sp-textfield>
        <sp-action-button
            onClick="
                this.dispatchEvent(
                    new Event('close', {
                        bubbles: true,
                        composed: true,
                    })
                );
            "
        >
            Sign in
        </sp-action-button>
    </sp-dialog-wrapper>
</sp-overlay>
```

</sp-tab-panel>
<sp-tab value="page">Page</sp-tab>
<sp-tab-panel value="page">

`'page'` Overlays behave similarly to `'modal'` Overlays by creating a modal context and trapping focus, but they will not be allowed to close via the "light dismiss" algorithm (e.g. the Escape key).

A page overlay could be used for a full-screen menu on a mobile website. When the user clicks on the menu button, the entire screen is covered with the menu options.

```html
<sp-button id="trigger">open page</sp-button>
<sp-overlay trigger="trigger@click" type="page">
    <sp-dialog-wrapper
        headline="Full screen menu"
        mode="fullscreenTakeover"
        cancel-label="Close"
    >
        <p>I am a page type overlay.</p>
    </sp-dialog-wrapper>
</sp-overlay>
```

</sp-tab-panel>
<sp-tab value="hint">Hint</sp-tab>
<sp-tab-panel value="hint">

`'hint'` Overlays are much like tooltips so they are not just ephemeral, but they are delivered primarily as a visual helper and exist outside of the tab order. In this way, be sure _not_ to place interactive content within this type of Overlay.

This overlay type does not accept focus and does not interfere with the user's interaction with the rest of the page.

```html
<sp-button id="trigger">open hint</sp-button>
<sp-overlay trigger="trigger@hover" type="hint">
    <sp-tooltip>
        I am a hint type overlay. I am not interactive and will close when the
        user interacts with the page.
    </sp-tooltip>
</sp-overlay>
```

</sp-tab-panel>
<sp-tab value="auto">Auto</sp-tab>
<sp-tab-panel value="auto">

`'auto'` Overlays provide a place for content that is ephemeral _and_ interactive. These Overlays can accept focus and remain open while interacting with their content. They will close when focus moves outside the overlay or when clicking elsewhere on the page.

```html
<sp-button id="trigger">Open Overlay</sp-button>
<sp-overlay trigger="trigger@click" type="auto" placement="bottom">
    <sp-popover dialog>
        <p>
            My slider in overlay element:
            <sp-slider label="Slider Label - Editable" editable></sp-slider>
        </p>
    </sp-popover>
</sp-overlay>
```

</sp-tab-panel>
<sp-tab value="manual">Manual</sp-tab>
<sp-tab-panel value="manual">

`'manual'` Overlays act much like `'auto'` Overlays, but do not close when losing focus or interacting with other parts of the page.

Note: When a `'manual'` Overlay is at the top of the "overlay stack", it will still respond to the Escape key and close.

```html
<style>
    .chat-container {
        position: fixed;
        bottom: 1em;
        left: 1em;
    }
</style>
<sp-button id="trigger">open manual</sp-button>
<sp-overlay trigger="trigger@click" type="manual">
    <sp-popover class="chat-container">
        <sp-dialog dismissable>
            <span slot="heading">Chat Window</span>
            <sp-textfield placeholder="Enter your message"></sp-textfield>
            <sp-action-button>Send</sp-action-button>
        </sp-dialog>
    </sp-popover>
</sp-overlay>
```

</sp-tab-panel>
</sp-tabs>

### Events

When fully open the `<sp-overlay>` element will dispatch the `sp-opened` event, and when fully closed the `sp-closed` event will be dispatched. Both of these events are of type:

```ts
type OverlayStateEvent = Event & {
    overlay: Overlay;
};
```

The `overlay` value in this case will hold a reference to the actual `<sp-overlay>` that is opening or closing to trigger this event. Remember that some `<sp-overlay>` element (like those creates via the imperative API) can be transiently available in the DOM, so if you choose to build a cache of Overlay elements to some end, be sure to leverage a weak reference so that the `<sp-overlay>` can be garbage collected as desired by the browser.

#### When it is "fully" open or closed?

"Fully" in this context means that all CSS transitions that have dispatched `transitionrun` events on the direct children of the `<sp-overlay>` element have successfully dispatched their `transitionend` or `transitioncancel` event. Keep in mind the following:

- `transition*` events bubble; this means that while transition events on light DOM content of those direct children will be heard, those events will not be taken into account
- `transition*` events are not composed; this means that transition events on shadow DOM content of the direct children will not propagate to a level in the DOM where they can be heard

This means that in both cases, if the transition is meant to be a part of the opening or closing of the overlay in question you will need to re-dispatch the `transitionrun`, `transitionend`, and `transitioncancel` events from that transition from the closest direct child of the `<sp-overlay>`.

## Common patterns

Quick links to implementation patterns for specific use cases:

### Tooltips

- **Simple tooltip**: `<sp-overlay trigger="id@hover" type="hint">`
- **Tooltip with click action**: Use [`<overlay-trigger>`](./overlay-trigger.md) with both hover and click content

### Modal dialogs

- **Confirmation**: `<sp-overlay trigger="id@click" type="modal">` with `<sp-dialog-wrapper>`
- **Form input**: Modal with `receivesFocus="true"` to focus first field
- **Full-screen**: Use `type="page"` with `mode="fullscreenTakeover"`

### Dropdown menus

- **Action menu**: `<sp-overlay trigger="id@click" type="auto">` with `<sp-menu>`
- **Context menu**: [Imperative API](./imperative-api.md) with `VirtualTrigger`
- **Picker**: See [Menus Integration](./MENUS-INTEGRATION.md)

### Form helpers

- **Validation error**: `<sp-overlay type="auto" receives-focus="false">`
- **Field help**: Hover tooltip with `type="hint"`
- **Date picker**: See [Forms Integration](./FORMS-INTEGRATION.md)

### Integration patterns

#### Action bar system

```html
<style>
    .overlay-demo-popover sp-action-group {
        padding: var(--spectrum-actiongroup-vertical-spacing-regular);
    }
    #overlay-demo {
        position: static;
    }
    #overlay-demo:not(:defined),
    #overlay-demo *:not(:defined) {
        display: none;
    }
</style>
<sp-popover id="overlay-demo" class="overlay-demo-popover" open>
    <sp-action-group vertical quiet emphasized selects="single">
        <sp-action-button id="trigger-1" hold-affordance>
            <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
        </sp-action-button>
        <sp-action-button id="trigger-2" hold-affordance>
            <sp-icon-polygon-select slot="icon"></sp-icon-polygon-select>
        </sp-action-button>
        <sp-action-button id="trigger-3" hold-affordance>
            <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
        </sp-action-button>
    </sp-action-group>
    <sp-overlay trigger="trigger-1@hover" type="hint">
        <sp-tooltip>Hover</sp-tooltip>
    </sp-overlay>
    <sp-overlay
        trigger="trigger-1@longpress"
        type="auto"
        placement="right-start"
    >
        <sp-popover class="overlay-demo-popover" tip>
            <sp-action-group vertical quiet>
                <sp-action-button>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                </sp-action-button>
            </sp-action-group>
        </sp-popover>
    </sp-overlay>
    <sp-overlay trigger="trigger-2@hover" type="hint">
        <sp-tooltip>Hover</sp-tooltip>
    </sp-overlay>
    <sp-overlay
        trigger="trigger-2@longpress"
        type="auto"
        placement="right-start"
    >
        <sp-popover class="overlay-demo-popover" tip>
            <sp-action-group vertical quiet>
                <sp-action-button>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                </sp-action-button>
            </sp-action-group>
        </sp-popover>
    </sp-overlay>
    <sp-overlay trigger="trigger-3@hover" type="hint">
        <sp-tooltip>Hover</sp-tooltip>
    </sp-overlay>
    <sp-overlay
        trigger="trigger-3@longpress"
        type="auto"
        placement="right-start"
    >
        <sp-popover class="overlay-demo-popover" tip>
            <sp-action-group vertical quiet>
                <sp-action-button>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                </sp-action-button>
            </sp-action-group>
        </sp-popover>
    </sp-overlay>
</sp-popover>
```

## Troubleshooting quick reference

Common issues and their solutions:

### Overlay appears behind other content

- **Check z-index**: Ensure trigger element doesn't have higher z-index than overlay
- **CSS containment**: Remove `contain:` property from parent elements or move overlay outside
- **Clip-path**: Move overlay outside elements with `clip-path`, use `triggerElement` property to maintain association

### Overlay doesn't position correctly

- **Missing trigger**: Ensure `trigger` attribute references valid element ID with `@interaction` suffix
- **No placement**: Set `placement` attribute when using positioned overlays
- **VirtualTrigger**: When using `triggerElement` property, placement only works with valid trigger

### Overlay doesn't close when expected

- **Wrong type**: Use `type="auto"` for click-to-close, `type="modal"` for explicit dismissal
- **Manual type**: `type="manual"` only closes on ESC key or programmatic close
- **Focus trap**: Modal overlays prevent closing until user interacts with content

### Content doesn't update

- **Static content**: Content is set when overlay is created, use `slottable-request` for dynamic updates
- **Reactive frameworks**: Ensure framework change detection runs after overlay opens

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions and debugging techniques.

### Advanced topics

#### API

```ts
<sp-overlay
    ?open=${boolean}
    ?delayed=${boolean}
    offset=${Number | [Number, Number]}
    placement=${Placement}
    receives-focus=${'true' | 'false' | 'auto' (default)
    trigger=${string | ${string}@${string}}
    .triggerElement=${HTMLElement | VirtualTrigger}
    .triggerInteraction=${'click' | 'longpress' | 'hover'}
    type=${'auto' | 'hint' | 'manual' | 'modal' | 'page'}
    ?allow-outside-click=${boolean}
></sp-overlay>
```

##### API value interactions

When a `triggerElement` is present (via `trigger` attribute or direct property setting), the following configurations apply:

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Configuration</sp-table-head-cell>
        <sp-table-head-cell>Required Properties</sp-table-head-cell>
        <sp-table-head-cell>Behavior</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Basic Placement</sp-table-cell>
            <sp-table-cell>`placement` + `triggerElement`</sp-table-cell>
            <sp-table-cell>Content positions next to trigger</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Placement + Offset</sp-table-cell>
            <sp-table-cell>`placement` + `offset` + `triggerElement`</sp-table-cell>
            <sp-table-cell>Content positions with extra spacing</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Invalid Placement</sp-table-cell>
            <sp-table-cell>`placement` without `triggerElement`</sp-table-cell>
            <sp-table-cell>No positioning occurs</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>No Placement</sp-table-cell>
            <sp-table-cell>No `placement` specified</sp-table-cell>
            <sp-table-cell>Content positioning handled by:
• Content itself
• Application

Common in `modal`/`page` overlays for full-screen content</sp-table-cell>
</sp-table-row>
</sp-table-body>
</sp-table>

##### Deprecated Properties

> **⚠️ Deprecation Notice**: The `allow-outside-click` property is deprecated and will be removed in a future version.

The `allow-outside-click` property allows clicks outside the overlay to close it. **We do not recommend using this property for accessibility reasons** as it can cause unexpected behavior and accessibility issues. When set to `true`, it configures the focus trap to allow outside clicks, which may interfere with proper focus management and user expectations.

```html
<!-- @deprecated Not recommended for accessibility reasons -->
<sp-overlay trigger="trigger@click" allow-outside-click="true">
    <sp-popover>
        <p>This overlay can be closed by clicking outside</p>
    </sp-popover>
</sp-overlay>
```

**Alternative approaches**: Instead of using `allow-outside-click`, consider implementing explicit close buttons or using the `type="modal"` or `type="page"` overlay types which provide better accessibility and user experience.

#### Styling

`<sp-overlay>` element will use the `<dialog>` element or `popover` attribute to project your content onto the top-layer of the browser, without being moved in the DOM tree. That means that you can style your overlay content with whatever techniques you are already leveraging to style the content that doesn't get overlaid. This means standard CSS selectors, CSS Custom Properties, and CSS Parts applied in your parent context will always apply to your overlaid content.

#### Top layer over complex CSS

There are some complex CSS values that have not yet been covered by the positioning API that the `<sp-overlay>` element leverages to associate overlaid content with their trigger elements. In specific, properties like `filter`, when applied to a trigger element within which lives the related content to be overlaid, are not currently supported by the relationship created herein. If support for this is something that you and the work you are addressing would require, we'd love to hear from you in [an issue](https://github.com/adobe/spectrum-web-components/issues). We'd be particularly interested in speaking with you if you were interested in contributing support/testing to ensure this capability for all consumers of the library.

#### Fallback support

While the [`<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) is widely supported by browsers, the [`popover` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover) is still quite new. When leveraged in browsers that do not yet support the `popover` attribute, there may be additional intervention required to ensure your content is delivered to your visitors as expected.

##### Complex layered

When an overlay is placed within a page with complex layering, the content therein can fall behind other content in the `z-index` stack. The following example is somewhat contrived but, imagine a toolbar next to a properties panel. If the toolbar has a lower `z-index` than the properties panel, any overlaid content (tooltips, etc.) within that toolbar will display underneath any content in the properties panel with which it may share pixels.

```html
<div class="complex-layered-demo">
    <div class="complex-layered-holder">
        <sp-action-button id="complex-layered">Trigger</sp-action-button>
        <sp-overlay
            trigger="complex-layered@hover"
            type="hint"
            placement="bottom-start"
        >
            <sp-tooltip>
                I can be partially blocked when [popover] is not available
            </sp-tooltip>
        </sp-overlay>
    </div>
    <div class="complex-layered-blocker"></div>
</div>
<style>
    .complex-layered-demo {
        position: relative;
    }
    .complex-layered-holder {
        z-index: 1;
        position: relative;
    }
    .complex-layered-blocker {
        position: relative;
        z-index: 10;
        background: white;
        width: 100%;
        height: 40px;
    }
</style>
```

Properly managed `z-index` values will support working around this issue while browsers work to adopt the `popover` attribute. In this demo, you can achieve the same output by sharing one `z-index` between the various pieces of content, removing `z-index` values altogether, or raising the `.complex-layered-holder` element to a higher `z-index` than the `.complex-layered-blocker` element.

##### Contained

[CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) gives a developer direct control over how the internals of one element affect the paint and layout of the internals of other elements on the same page. While leveraging some of its values can offer performance gains, they can interrupt the delivery of your overlaid content.

```html
<div class="contained-demo">
    <sp-action-button id="contained">Trigger</sp-action-button>
    <sp-overlay trigger="contained@hover" type="hint" placement="bottom-start">
        <sp-tooltip>
            I can be blocked when [popover] is not available
        </sp-tooltip>
    </sp-overlay>
</div>
<style>
    .contained-demo {
        contain: content;
    }
</style>
```

You could just _remove_ the `contain` rule. But, if you are not OK with simply removing the `contain` value, you still have options. If you would like to continue to leverage `contain`, you can place your "contained" content separately from your overlaid content, like so:

```html
<div class="contained-demo">
    <sp-action-button id="contained-working">Trigger</sp-action-button>
</div>
<sp-overlay
    trigger="contained-working@hover"
    type="hint"
    placement="bottom-start"
>
    <sp-tooltip>I can be blocked when [popover] is not available</sp-tooltip>
</sp-overlay>
<style>
    .contained-demo {
        contain: content;
    }
</style>
```

`<sp-overlay>` accepts an ID reference via the `trigger` attribute to relate it to interactions and positioning in the DOM. To fulfill this reference the two elements need to be in the same DOM tree. However, `<sp-overlay>` alternatively accepts a `triggerElement` _property_ that opens even more flexibility in addressing this situation.

##### Clip pathed

`clip-path` can also restrict how content in an element is surfaced at paint time. When overlaid content should display outside of the `clip-path`, without the `popover` attribute, that content could be _clipped_.

```html
<div class="clip-pathed-demo">
    <sp-action-button id="clip-pathed">Trigger</sp-action-button>
    <sp-overlay
        trigger="clip-pathed@hover"
        type="hint"
        placement="bottom-start"
    >
        <sp-tooltip>
            I can be blocked when [popover] is not available
        </sp-tooltip>
    </sp-overlay>
</div>
<style>
    .clip-pathed-demo {
        clip-path: inset(0 0);
    }
</style>
```

Here, again, working with your content needs (whether or not you want to leverage `clip-path`) or DOM structure (not colocating clipped and non-clipped content) will allow you to avoid this issue:

```html
<div class="clip-pathed-demo">
    <sp-action-button id="clip-pathed-working">Trigger</sp-action-button>
</div>
<sp-overlay
    trigger="clip-pathed-working@hover"
    type="hint"
    placement="bottom-start"
>
    <sp-tooltip>I can be blocked when [popover] is not available</sp-tooltip>
</sp-overlay>
<style>
    .clip-pathed-demo {
        clip-path: inset(0 0);
    }
</style>
```

##### Non-overflowing, relative containers with z-index in Safari

Under very specific conditions, [WebKit will incorrectly clip fixed-position content](https://bugs.webkit.org/show_bug.cgi?id=160953).
WebKit clips `position: fixed` elements within containers that have all of:

1. `position: relative`
2. `overflow: clip` or `overflow: hidden`
3. `z-index` greater than zero

If you notice overlay clipping _only_ in Safari, this is likely the culprit. The solution is to break up the conditions into separate elements to avoid triggering WebKit's bug. For example, leaving relative positioning and z-index on the outermost container while creating an inner container that enforces the overflow rules.

### Accessibility

#### Nested overlays

When nesting multiple overlays, it is important to ensure that the nested overlays are actually nested in the HTML as well, otherwise it will not be accessible.

```html
<div style="padding: 20px;">
    <sp-button id="outerTrigger" variant="primary" aria-haspopup="dialog">
        Open Outer Modal
    </sp-button>
    <sp-overlay id="outerOverlay" type="auto" trigger="outerTrigger@click">
        <sp-popover>
            <sp-dialog>
                <h2 slot="heading" id="outer-dialog-heading">Outer Dialog</h2>
                <p>This is the outer modal content. Press ESC to close it.</p>
                <sp-button
                    id="innerTrigger"
                    variant="primary"
                    aria-haspopup="dialog"
                >
                    Open Inner Modal
                </sp-button>
                <sp-overlay
                    id="innerOverlay"
                    type="auto"
                    trigger="innerTrigger@click"
                >
                    <sp-popover>
                        <sp-dialog>
                            <h2 slot="heading" id="inner-dialog-heading">
                                Inner Dialog
                            </h2>
                            <p>
                                This is the inner modal content. Press ESC to
                                close this first, then the outer modal.
                            </p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </sp-dialog>
        </sp-popover>
    </sp-overlay>
</div>
```

#### Focus management

The overlay manages focus based on its type:

- For `modal` and `page` types, focus is always trapped within the overlay
- For `auto` and `manual` types, focus behavior is controlled by the `receives-focus` attribute
- For `hint` type, focus remains on the trigger element

Example of proper focus management:

```html
<sp-button id="modal-trigger" aria-haspopup="dialog" aria-expanded="false">
    Open Settings
</sp-button>
<sp-overlay trigger="modal-trigger@click" type="modal">
    <sp-dialog-wrapper
        headline="Settings"
        dismissable
        underlay
        aria-labelledby="settings-heading"
    >
        <h2 id="settings-heading" slot="heading">Settings</h2>
        <sp-field-label for="setting1">Email Notifications</sp-field-label>
        <sp-switch id="setting1">Enable notifications</sp-switch>

        <div slot="footer">
            <sp-button
                variant="secondary"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true }))"
            >
                Cancel
            </sp-button>
            <sp-button
                variant="accent"
                onclick="this.dispatchEvent(new Event('close', { bubbles: true }))"
            >
                Save
            </sp-button>
        </div>
    </sp-dialog-wrapper>
</sp-overlay>
```

#### Keyboard navigation

<sp-table>
    <sp-table-head>
        <sp-table-head-cell>Key</sp-table-head-cell>
        <sp-table-head-cell>Action</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell><kbd>ESC</kbd></sp-table-cell>
            <sp-table-cell>Closes overlays in reverse order of opening</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>TAB</kbd>/<kbd>Shift+TAB</kbd></sp-table-cell>
            <sp-table-cell>Navigates through focusable elements within modal/page overlays</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>Arrow keys</kbd></sp-table-cell>
            <sp-table-cell>Navigate through menu items in menu overlays</sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell><kbd>ENTER</kbd>/<kbd>SPACE</kbd></sp-table-cell>
            <sp-table-cell>Activates buttons and controls</sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>

#### Screen reader considerations

- Use `aria-haspopup` on trigger elements to indicate the type of overlay
- Provide descriptive labels using `aria-label` or `aria-labelledby`
- Use proper heading structure within overlays
- Ensure error messages are announced using `aria-live`

Example of a tooltip with proper screen reader support:

```html
<sp-button id="help-trigger" aria-describedby="help-tooltip" label="Help">
    <sp-icon-help slot="icon"></sp-icon-help>
</sp-button>
<sp-overlay trigger="help-trigger@hover" type="hint">
    <sp-tooltip id="help-tooltip">
        Click for more information about this feature
    </sp-tooltip>
</sp-overlay>
```
