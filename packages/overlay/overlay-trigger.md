## Description

An `<overlay-trigger>` element supports the delivery of temporary overlay content based on interaction with a persistent trigger element. An element prepared to receive accessible interactions (e.g. an `<sp-button>`, or `<button>`, etc.) is addressed to `slot="trigger"`, and the content to display (either via `click` or `hover`/`focus` interactions) is addressed to `slot="click-content"` or `slot="hover-content"`, respectively. A trigger element can be linked to the delivery of content, intended for a single interaction, or both. Content addressed to `slot="hover-content"` is made available when the mouse enters or leaves the target element. Keyboard navigation will make this content available when focus enters or leaves the target element. Be thoughtful with what content you address to `slot="hover-content"`, as the content available via "hover" will be transient and non-interactive.

### Placement

When using the `placement` attribute of an `<overlay-trigger>` (`"top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"`), you can suggest to the overlay in which direction relative to the trigger that the content should display. When there is adequate room for the content to display in the specified direction, it will do so. When adequate room is not available, the overlaid content will calculate the direction in which it has the most room to be displayed and use that direction.

### Type

The `type` attribute of an `<overlay-trigger>` element outlines how the element's "click" content should appear in the tab order. `inline` will insert the overlay after the trigger; from here, forward tabbing targets the next logical element, and backward/shift tabbing returns to the target. `replace` will insert the overlay into the page as if it were the trigger; from here, forward tabbing targets the next logical element, and backward/shift tabbing targets the logical element prior to the target. Finally, `modal` will open the content in a tab order fully separate from the original content flow and trap the tab order within that content until the required interaction is complete.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/meter?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/meter?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/bu0sOBIfyW7wnHkXtGzL/src/index.ts)

```
yarn add @spectrum-web-components/overlay
```

Import the side-effectful registration of `<overlay-trigger>` via:

```
import '@spectrum-web-components/overlay/overlay-trigger.js';
```

The default of `<overlay-trigger>` will load dependencies in `@spectrum-web-components/overlay` asynchronously via a dynamic import. In the case that you would like to import those tranverse dependencies statically, import the side effectful registration of `<overlay-trigger>` as follows:

```
import '@spectrum-web-components/overlay-trigger/sync/overlay-trigger.js';
```

When looking to leverage the `OverlayTrigger` base class as a type and/or for extension purposes, do so via:

```
import { OverlayTrigger } from '@spectrum-web-components/overlay';
```

## Examples

Here a default `<overlay-trigger>` manages content that is triggered by click and "hover" interactions.

```html
<style>
    overlay-trigger {
        flex: none;
    }

    .tooltip {
        background-color: var(--spectrum-global-color-gray-800);
        color: var(--spectrum-global-color-gray-50);
        padding: 4px 10px;
        font-size: 10px;
    }
</style>
<overlay-trigger id="trigger" placement="bottom" offset="6">
    <sp-button variant="primary" slot="trigger">Button popover</sp-button>
    <sp-popover dialog slot="click-content" direction="bottom" tip>
        <div class="options-popover-content">
            <sp-slider
                value="5"
                step="0.5"
                min="0"
                max="20"
                label="Awesomeness"
            ></sp-slider>
            <sp-button>Press me</sp-button>
        </div>
    </sp-popover>
    <sp-tooltip slot="hover-content" delayed managed>Tooltip</sp-tooltip>
    <sp-popover slot="longpress-content" tip>
        <sp-action-group
            selects="single"
            vertical
            style="margin: calc(var(--spectrum-actiongroup-button-gap-y,var(--spectrum-global-dimension-size-100)) / 2);"
        >
            <sp-action-button>
                <sp-icon-magnify slot="icon"></sp-icon-magnify>
            </sp-action-button>
            <sp-action-button>
                <sp-icon-magnify slot="icon"></sp-icon-magnify>
            </sp-action-button>
            <sp-action-button>
                <sp-icon-magnify slot="icon"></sp-icon-magnify>
            </sp-action-button>
        </sp-action-group>
    </sp-popover>
</overlay-trigger>
```

### Click content only

This example only delivers content via the "click" interaction and leverages both `placement` and `type` attributes to customize the visual relationship of the content to the page and its position in the tab order.

```html
<overlay-trigger placement="top" type="replace">
    <sp-button slot="trigger">Overlay Trigger</sp-button>
    <sp-popover slot="click-content" open>
        <sp-dialog size="small">
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
</overlay-trigger>
```

### "Hover" content only

The delivery of hover content can be customized via the `placement` attribute. However, this content can not be interacted with, so the `type` attribute will not customize its delivery in any way.

```html
<overlay-trigger placement="right">
    <sp-button slot="trigger">Overlay Trigger</sp-button>
    <sp-tooltip slot="hover-content" placement="right" managed>
        Hover Content
    </sp-tooltip>
</overlay-trigger>
```

## Styling

Content that is thrown into an overlay (e.g. `[slot="*-content"]`) will be moved out of the CSS scope created by its parent `<overlay-trigger>` and other related elements within the same DOM/shadow tree. In this way styling rules that rely on that scope will not travel with the content into its overlay context. In order to ensure that your overlay content is styled as you would like you will need to bind those styles by applying them inline, including a `<style>` element _inside_ of your content element, or by making your content its own custom element.

**Inline Styles**

```html
<overlay-trigger placement="top-start">
    <sp-button slot="trigger" variant="primary">Trigger Element</sp-button>
    <div
        slot="click-content"
        style="
        background-color: var(--spectrum-global-color-gray-50);
        color: var(--spectrum-global-color-gray-800);
        border: 1px solid;
        padding: 2em;
    "
    >
        This content is delivered with inline styles.
    </div>
</overlay-trigger>
```

**Style Element**

```html
<overlay-trigger placement="top-start">
    <sp-button slot="trigger" variant="primary">Trigger Element</sp-button>
    <div slot="click-content" id="styled-content">
        <style>
            #styled-content {
                background-color: var(--spectrum-global-color-gray-50);
                color: var(--spectrum-global-color-gray-800);
                border: 1px solid;
                padding: 2em;
            }
        </style>
        This content is delivered with a style element defining its styles.
    </div>
</overlay-trigger>
```

**Custom Element**

```html
<overlay-trigger placement="top-start">
    <sp-button slot="trigger" variant="primary">Trigger Element</sp-button>
    <styled-element slot="click-content">
        This content is delivered as its own custom element.
    </styled-element>
</overlay-trigger>
<script>
    class StyledElement extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        background-color: var(--spectrum-global-color-gray-50);
                        color: var(--spectrum-global-color-gray-800);
                        border: 1px solid;
                        padding: 2em;
                    }
                </style>
                <slot></slot>
            `;
        }
    }
    customElements.define('styled-element', StyledElement);
</script>
```

## Accessibility

When using an `<overlay-trigger>` element, it is important to be sure the that content you project into `slot="trigger"` is "interactive". This means that an element within that branch of DOM will be able to receive focus, and said element will appropriately convert keyboard interactions to `click` events, similar to what you'd find with `<a href="#">Anchors</a>`, `<button>Buttons</button>`, etc. You can find further reading on the subject of accessible keyboard interactions at [https://www.w3.org/WAI/WCAG21/Understanding/keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard).
