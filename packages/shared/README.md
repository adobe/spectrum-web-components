## Description

Shared mixins, tools, etc. that support developing Spectrum Web Components.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/shared?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/shared)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/shared?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/shared)

```bash
npm install @spectrum-web-components/shared
```

Individual base classes and mixins can be imported as follows:

```javascript
import {
    Focusable,
    FocusVisiblePolyfillMixin,
    getActiveElement,
    LikeAnchor,
    ObserveSlotText,
} from '@spectrum-web-components/shared';
```

### Focusable

The `Focusable` subclass of `LitElement` adds some helpers method and lifecycle coverage in order to support passing focus to a container element inside of a custom element. The Focusable base class handles tabindex setting into shadowed elements automatically and is based heavily on the [aybolit delegate-focus-mixin](https://github.com/web-padawan/aybolit/blob/master/packages/core/src/mixins/delegate-focus-mixin.js).

```javascript
import { Focusable } from '@spectrum-web-components/shared';
import { html } from 'lit-element';

class FocusableButton extends Focusable {
    public static get styles(): CSSResultArray {
        return [...super.styles];
    }
    public get focusElement(): HTMLElement {
        return this.shadowRoot.querySelector('#button') as HTMLElement;
    }

    protected render(): TemplateResult {
        return html`
            <button
                id="button"
            >
                Focus for this button is being managed by the focusable base class.
            </button>
        `;
    }
}
```

### FocusVisiblePolyfillMixin

Use this mixin if you would like to leverage `:focus-visible` based selectors in your CSS. [Learn more about the polyfill that powers this.](https://www.npmjs.com/package/focus-visible)

### getActiveElement

Use this helper to find an `activeElement` in your component. [Learn more about tracking active elements over shadow DOM boundaries.](https://dev.to/open-wc/mind-the-document-activeelement-2o9a)

### LikeAnchor

Mix `download`, `label`, `href`, and `target` properties into your element to allow it to act more like an `HTMLAnchorElement`.

### ObserveSlotPresence

When working with styles that are driven by the conditional presence of `<slot>`s in a component's shadow DOM, you will need to track whether light DOM that is meant for that slot exists. Use the `ObserveSlotPresence` mixin to target specific light DOM to observe the presence of and trigger `this.requestUpdate()` calls when content fulfilling that selector comes in and out of availability.

```javascript
import { ObserveSlotPresence } from '@spectrum-web-components/shared';
import { LitElement, html } from 'lit-element';
class ObserveSlotPresenceElement extends ObserveSlotPresence(LitElement, '[slot="conditional-slot"]') {
    // translate the mixin properties into locally understandable language
    protected get hasConditionalSlotContent() {
        return this.slotContentIsPresent;
    }
    protected render(): TemplateResult {
        return html`
            <button
                id="button"
            >
                ${this.hasConditionalSlotContent
                    ? html`
                        <slot
                            name="conditional-slot"
                        ></slot>
                    `
                    : html``
                }
            </button>
        `;
    }
    protected updated(): void {
        console.log(this.slotContentIsPresent); // => true when <observing-slot-presence-element><div slot="conditional-slot"></div></observing-slot-presence-element>
    }
}
customElements.define('observing-slot-presence-element', ObserveSlotPresenceElement);
```

### ObserveSlotText

When working with `<slot>`s and their `slotchange` event, you will have the opportunity to capture when the nodes and/or elements in your element are added or removed. However, if the `textContent` of a text node changes, you will not receive the `slotchange` event because the slot hasn't actually received new nodes and/or elements in the exchange. When working with a lit-html binding `<your-element>${text}</your-element>` that means you will not receive a `slotchange` event when the value of `text` goes from `text = ''` to `text = 'something'` or the other way. In these cases the `ObserveSlotText` can be leverages to apply a mutation observe onto your element that tracks `characterData` mutations so that you can resspond as desired.

```javascript
import { ObserveSlotText } from '@spectrum-web-components/shared';
import { LitElement, html } from 'lit-element';

class ObserveSlotTextElement extends ObserveSlotText(LitElement, '#observing-slot') {
    protected render(): TemplateResult {
        return html`
            <button
                id="button"
            >
                <slot
                    id="observing-slot"
                    @slotchange=${this.manageObservedSlot}
                ></slot>
            </button>
        `;
    }
    protected updated(): void {
        console.log(this.slotHasContent); // => true when <observing-slot-text-element>Text</observing-slot-text-element>
    }
}

customElements.define('observing-slot-text-element', ObserveSlotTextElement);
```
