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

<sp-tabs selected="inline" auto label="Type attribute options">
<sp-tab value="inline">Inline</sp-tab>
<sp-tab-panel value="inline">

`'inline'` type inserts the overlay after the trigger in the tab order. This creates a natural flow where:

- Forward tab: Goes to the next logical element
- Backward tab (shift): Returns to the trigger

```html
<overlay-trigger type="inline" placement="bottom">
    <sp-button slot="trigger">Open Menu</sp-button>
    <sp-popover slot="click-content">
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option 2</sp-menu-item>
        </sp-menu>
    </sp-popover>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="replace">Replace</sp-tab>
<sp-tab-panel value="replace">

`'replace'` type inserts the overlay as if it were the trigger itself in the tab order. This means:

- Forward tab: Goes to the next logical element
- Backward tab (shift): Goes to the element before the trigger

```html
<overlay-trigger type="replace" placement="bottom">
    <sp-button slot="trigger">Show Details</sp-button>
    <sp-popover slot="click-content">
        <sp-dialog>
            <p>Details panel that replaces trigger in tab order</p>
            <sp-button
                onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }))"
            >
                Close
            </sp-button>
        </sp-dialog>
    </sp-popover>
</overlay-trigger>
```

</sp-tab-panel>
<sp-tab value="modal">Modal</sp-tab>
<sp-tab-panel value="modal">

`'modal'` type creates a separate tab order and traps focus within the overlay content until the required interaction is complete. This is ideal for important interactions that need user attention.

```html
<overlay-trigger type="modal">
    <sp-button slot="trigger">Open Settings</sp-button>
    <sp-dialog-wrapper
        slot="click-content"
        headline="Settings"
        dismissable
        underlay
    >
        <sp-field-label>Theme</sp-field-label>
        <sp-picker>
            <sp-menu-item>Light</sp-menu-item>
            <sp-menu-item>Dark</sp-menu-item>
        </sp-picker>
        <sp-button
            onclick="this.dispatchEvent(new Event('close', { bubbles: true, composed: true }))"
        >
            Save
        </sp-button>
    </sp-dialog-wrapper>
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
