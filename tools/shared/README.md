## Overview

The `@spectrum-web-components/shared` package provides essential base classes, mixins, and utilities that support developing Spectrum Web Components. This package contains foundational tools for focus management, slot observation, accessibility enhancements, and other common functionality used across the component library.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/shared?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/shared)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/shared?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/shared)

```bash
npm install @spectrum-web-components/shared
```

Individual base classes, mixins, and utilities can be imported as follows:

```javascript
import {
    Focusable,
    FocusVisiblePolyfillMixin,
    getActiveElement,
    getDeepElementFromPoint,
    LikeAnchor,
    ObserveSlotPresence,
    ObserveSlotText,
} from '@spectrum-web-components/shared';
```

## Utilities

### getDeepElementFromPoint

The `getDeepElementFromPoint` method allows you to obtain the deepest possible element at a given coordinates on the current page. The method will step into any available `shadowRoot`s until it reaches the first element with no `shadowRoot` or no children available at the given coordinates.

```javascript
import { getDeepElementFromPoint } from '@spectrum-web-components/shared';

const element = getDeepElementFromPoint(x, y);
```

### getActiveElement

Use this helper to find an `activeElement` in your component.

```javascript
import { getActiveElement } from '@spectrum-web-components/shared';

const activeEl = getActiveElement(this);
```

## Base classes

### Focusable

The `Focusable` subclass of `SpectrumElement` adds helper methods and lifecycle coverage to support passing focus to a container element inside of a custom element. The Focusable base class handles tabindex setting into shadowed elements automatically and is based heavily on the [aybolit delegate-focus-mixin](https://github.com/web-padawan/aybolit/blob/master/packages/core/src/mixins/delegate-focus-mixin.js).

```javascript
import { Focusable } from '@spectrum-web-components/shared';
import { html, TemplateResult } from '@spectrum-web-components/base';

class FocusableButton extends Focusable {
    public get focusElement(): HTMLElement {
        return this.shadowRoot.querySelector('#button') as HTMLElement;
    }

    protected override render(): TemplateResult {
        return html`
            <button id="button">
                Focus for this button is being managed by the focusable base class.
            </button>
        `;
    }
}
```

### LikeAnchor

Mix `download`, `label`, `href`, `target`, `rel`, and `referrerpolicy` properties into your element to allow it to act more like an `HTMLAnchorElement`. It also provides a `renderAnchor` method for rendering anchor elements.

```javascript
import { LikeAnchor } from '@spectrum-web-components/shared';
import { ReactiveElement, html, TemplateResult } from '@spectrum-web-components/base';

class MyLinkElement extends LikeAnchor(ReactiveElement) {
    protected render(): TemplateResult {
        return this.renderAnchor({
            id: 'my-anchor',
            className: 'my-link',
            anchorContent: html`<slot></slot>`,
        });
    }
}
```

## Mixins

### ObserveSlotPresence

When working with styles that are driven by the conditional presence of `<slot>`s in a component's shadow DOM, you will need to track whether light DOM that is meant for that slot exists. Use the `ObserveSlotPresence` mixin to target specific light DOM to observe the presence of and trigger `this.requestUpdate()` calls when content fulfilling that selector comes in and out of availability.

```javascript
import { ObserveSlotPresence } from '@spectrum-web-components/shared';
import { ReactiveElement, html, TemplateResult } from '@spectrum-web-components/base';

class ObserveSlotPresenceElement extends ObserveSlotPresence(
    ReactiveElement,
    '[slot="conditional-slot"]'
) {
    // Translate the mixin properties into locally understandable language
    protected get hasConditionalSlotContent() {
        return this.slotContentIsPresent;
    }

    protected override render(): TemplateResult {
        return html`
            <button id="button">
                ${this.hasConditionalSlotContent
                    ? html`<slot name="conditional-slot"></slot>`
                    : html``
                }
            </button>
        `;
    }

    protected updated(): void {
        console.log(this.slotContentIsPresent);
        // => true when <observing-slot-presence-element><div slot="conditional-slot"></div></observing-slot-presence-element>
    }
}

customElements.define('observing-slot-presence-element', ObserveSlotPresenceElement);
```

### ObserveSlotText

When working with `<slot>`s and their `slotchange` event, you will have the opportunity to capture when the nodes and/or elements in your element are added or removed. However, if the `textContent` of a text node changes, you will not receive the `slotchange` event because the slot hasn't actually received new nodes and/or elements in the exchange. When working with a lit-html binding `<your-element>${text}</your-element>` that means you will not receive a `slotchange` event when the value of `text` goes from `text = ''` to `text = 'something'` or the other way. In these cases the `ObserveSlotText` can be leveraged to apply a mutation observer onto your element that tracks `characterData` mutations so that you can respond as desired.

```javascript
import { ObserveSlotText } from '@spectrum-web-components/shared';
import { ReactiveElement, html, TemplateResult } from '@spectrum-web-components/base';

class ObserveSlotTextElement extends ObserveSlotText(ReactiveElement) {
    protected override render(): TemplateResult {
        return html`
            <button id="button">
                <slot
                    id="observing-slot"
                    @slotchange=${this.manageTextObservedSlot}
                ></slot>
            </button>
        `;
    }

    protected updated(): void {
        console.log(this.slotHasContent);
        // => true when <observing-slot-text-element>Text</observing-slot-text-element>
    }
}

customElements.define('observing-slot-text-element', ObserveSlotTextElement);
```
