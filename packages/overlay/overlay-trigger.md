<sp-alert-banner open variant="info">
    <div class="spectrum-InLineAlert-header">
        <span> <code class="spectrum-Code" style="font-size: 17px;">triggered-by</code> performance optimization</span>
    </div>
    <div class="spectrum-InLineAlert-content">
        Use the new <code class="spectrum-Code"  style="font-size: 17px;">triggered-by</code> attribute to declare which types of overlays
        your implementation will use. This improves performance by avoiding
        unnecessary DOM operations and preventing race conditions during
        rendering. For more information, read the <a href="#performance-optimization">Performance
        optimization</a> section.
    </div>
</sp-alert-banner>

## Overview

An `<overlay-trigger>` element supports the delivery of temporary overlay content based on interaction with a persistent trigger element. An element prepared to receive accessible interactions (e.g. an `<sp-button>`, or `<button>`, etc.) is addressed to `slot="trigger"`, and the content to display (either via `click` or `hover`/`focus` interactions) is addressed to `slot="click-content"` or `slot="hover-content"`, respectively. A trigger element can be linked to the delivery of content, intended for a single interaction, or both. Content addressed to `slot="hover-content"` is made available when the mouse enters or leaves the target element. Keyboard navigation will make this content available when focus enters or leaves the target element. Be thoughtful with what content you address to `slot="hover-content"`, as the content available via "hover" will be transient and non-interactive.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/meter?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/meter?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)

```zsh
yarn add @spectrum-web-components/overlay
```

Import the side-effectful registration of `<overlay-trigger>` via:

```ts
import '@spectrum-web-components/overlay/overlay-trigger.js';
```

The default of `<overlay-trigger>` will load dependencies in `@spectrum-web-components/overlay` asynchronously via a dynamic import. In the case that you would like to import those tranverse dependencies statically, import the side effectful registration of `<overlay-trigger>` as follows:

```ts
import '@spectrum-web-components/overlay/sync/overlay-trigger.js';
```

When looking to leverage the `OverlayTrigger` base class as a type and/or for extension purposes, do so via:

```ts
import { OverlayTrigger } from '@spectrum-web-components/overlay';
```

### Example

In this example, a default `<overlay-trigger>` manages content that is triggered by "click" and "hover" interactions.

```html
<overlay-trigger placement="top" type="replace">
    <sp-button slot="trigger">Overlay Trigger</sp-button>
    <sp-popover slot="click-content" open>
        <sp-dialog size="s">
            <h2 slot="heading">Click content</h2>
            An &lt;overlay-trigger&gt; can be used to manage either or both of
            the "click" and "hover" content slots that are made available. Here,
            content is only addressed to
            <code>slot="click-content"</code>
            ...
            <sp-button
                slot="button"
                onclick="javascript: this.dispatchEvent(new Event('close', {bubbles: true, composed: true}));"
            >
                I understand
            </sp-button>
        </sp-dialog>
    </sp-popover>
    <sp-tooltip slot="hover-content">Hover content</sp-tooltip>
</overlay-trigger>
```

### Options

#### Placement

When using the `placement` attribute of an `<overlay-trigger>` (`"top" |"top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "right" | "right-start" | "right-end" | "left" | "left-start" | "left-end"`), you can suggest to the overlay in which direction relative to the trigger that the content should display. When there is adequate room for the content to display in the specified direction, it will do so. When adequate room is not available, the overlaid content will calculate the direction in which it has the most room to be displayed and use that direction.

#### Type

The `type` of an Overlay outlines a number of things about the interaction model within which it works:

**Note:** The `type` attribute only affects click-triggered overlays. Hover overlays always use `hint` type behavior, and longpress overlays always use `auto` type behavior. For more control over hover and longpress overlay types, use `<sp-overlay>` directly.

<sp-tabs selected="modal" auto label="Type attribute options">
<sp-tab value="modal">Modal</sp-tab>
<sp-tab-panel value="modal">

`'modal'` Overlays create a modal context that traps focus within the content and prevents interaction with the rest of the page. The overlay manages focus trapping and accessibility features like `aria-modal="true"` to ensure proper screen reader behavior.

They should be used when you need to ensure that the user has interacted with the content of the Overlay before continuing with their work. This is commonly used for dialogs that require a user to confirm or cancel an action before continuing.

```html
<overlay-trigger type="modal" triggered-by="click">
    <sp-button slot="trigger">Open modal</sp-button>
    <sp-dialog-wrapper
        slot="click-content"
        headline="Signin form"
        dismissable
        underlay
    >
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
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="page">Page</sp-tab>
<sp-tab-panel value="page">

`'page'` Overlays behave similarly to `'modal'` Overlays by creating a modal context and trapping focus, but they will not be allowed to close via the "light dismiss" algorithm (e.g. the Escape key).

A page overlay could be used for a full-screen menu on a mobile website. When the user clicks on the menu button, the entire screen is covered with the menu options.

```html
<overlay-trigger type="page" triggered-by="click">
    <sp-button slot="trigger">Open page</sp-button>
    <sp-dialog-wrapper
        slot="click-content"
        headline="Full screen menu"
        mode="fullscreenTakeover"
        cancel-label="Close"
    >
        <p>I am a page type overlay.</p>
    </sp-dialog-wrapper>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="hint">Hint</sp-tab>
<sp-tab-panel value="hint">

`'hint'` Overlays are much like tooltips so they are not just ephemeral, but they are delivered primarily as a visual helper and exist outside of the tab order. In this way, be sure _not_ to place interactive content within this type of Overlay.

This overlay type does not accept focus and does not interfere with the user's interaction with the rest of the page.

```html
<overlay-trigger type="hint" triggered-by="hover">
    <sp-button slot="trigger">Open hint</sp-button>
    <sp-tooltip slot="click-content">
        I am a hint type overlay. I am not interactive and will close when the
        user interacts with the page.
    </sp-tooltip>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="auto">Auto</sp-tab>
<sp-tab-panel value="auto">

`'auto'` Overlays provide a place for content that is ephemeral _and_ interactive. These Overlays can accept focus and remain open while interacting with their content. They will close when focus moves outside the overlay or when clicking elsewhere on the page.

```html
<overlay-trigger type="auto" triggered-by="click" placement="bottom">
    <sp-button slot="trigger">Open overlay</sp-button>
    <sp-popover slot="click-content" dialog>
        <p>
            My slider in overlay element:
            <sp-slider label="Slider Label - Editable" editable></sp-slider>
        </p>
    </sp-popover>
</overlay-trigger>
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
<overlay-trigger type="manual" triggered-by="click">
    <sp-button slot="trigger">Open manual</sp-button>
    <sp-popover slot="click-content" class="chat-container">
        <sp-dialog dismissable>
            <span slot="heading">Chat Window</span>
            <sp-textfield placeholder="Enter your message"></sp-textfield>
            <sp-action-button>Send</sp-action-button>
        </sp-dialog>
    </sp-popover>
</overlay-trigger>
```

</sp-tab-panel>
</sp-tabs>

### Performance optimization

The `triggered-by` attribute (`triggeredBy` property) allows you to explicitly declare which types of overlays your implementation will use. This can help optimize performance by avoiding unnecessary DOM operations and preventing race conditions during rendering.

```html
<!-- Only using click and hover overlays -->
<overlay-trigger triggered-by="click hover">
    <sp-button slot="trigger">Click and hover trigger</sp-button>
    <sp-popover slot="click-content" direction="bottom" tip>
        Click content
    </sp-popover>
    <sp-tooltip slot="hover-content">Hover content</sp-tooltip>
</overlay-trigger>

<!-- Only using longpress overlay -->
<overlay-trigger triggered-by="longpress">
    <sp-button slot="trigger">Longpress trigger</sp-button>
    <sp-popover slot="longpress-content" direction="bottom" tip>
        Longpress content
    </sp-popover>
    <div slot="longpress-describedby-descriptor">
        Press and hold to reveal more options
    </div>
</overlay-trigger>
```

The `triggered-by` attribute accepts a space-separated string of overlay types:

- `click` - For click-triggered content
- `hover` - For hover/focus-triggered content
- `longpress` - For longpress-triggered content

When not specified, the component will automatically detect which content types are present, but this may result in additional rendering cycles. For optimal performance, especially in applications with many overlay triggers, explicitly declaring the content types you plan to use is recommended.

### Accessibility

When using an `<overlay-trigger>` element, it is important to be sure the that content you project into `slot="trigger"` is "interactive". This means that an element within that branch of DOM will be able to receive focus, and said element will appropriately convert keyboard interactions to `click` events, similar to what you'd find with `<a href="#">Anchors</a>`, `<button>Buttons</button>`, etc. You can find further reading on the subject of accessible keyboard interactions at [https://www.w3.org/WAI/WCAG21/Understanding/keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard).
