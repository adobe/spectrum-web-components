## Description

An `ElementResolutionController` keeps an active reference to another element in the same DOM tree. Supply the controller with a selector to query and it will manage observing the DOM tree to ensure that the reference it holds is always the first matched element or `null`.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```
yarn add @spectrum-web-components/reactive-controllers
```

Import the `ElementResolutionController` and/or `elementResolverUpdatedSymbol` via:

```
import { ElementResolutionController, elementResolverUpdatedSymbol } from '@spectrum-web-components/reactive-controllers/ElementResolution.js';
```

## Example

An `ElementResolutionController` can be applied to a host element like the following.

```js
import { html, LitElement } from 'lit';
import { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/ElementResolution.js';

class RootEl extends LitElement {
    resolvedElement = new ElementResolutionController(this);

    costructor() {
        super();
        this.resolvedElement.selector = '.other-element';
    }
}

customElements.define('root-el', RootEl);
```

In this example, the selector `'.other-element'` is supplied to the resolver, which mean in the following example, `this.resolvedElement.element` will maintain a reference to the sibling `<div>` element:

```html-no-demo
<root-el></root-el>
<div class="other-element"></div>
```

The resolved reference will always be the first element matching the selector applied, so in the following example the element with content "First!" will be the reference:

```html-no-demo
<root-el></root-el>
<div class="other-element">First!</div>
<div class="other-element">Last.</div>
```

A [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) is leveraged to track mutations to the DOM tree in which the host element resides in order to update the element reference on any changes to the content therein that could change the resolved element.

## Updates

Changes to the resolved element reference are reported to the host element via a call to the `requestUpdate()` method. This will be provided the `elementResolverUpdatedSymbol` as the changed key. If your element leverages this value against the changes map, it can react directly to changes in the resolved element:

```ts
import { html, LitElement } from 'lit';
import {
    ElementResolutionController,
    elementResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/ElementResolution.js';

class RootEl extends LitElement {
    resolvedElement = new ElementResolutionController(this);

    costructor() {
        super();
        this.resolvedElement.selector = '.other-element';
    }

    protected override willUpdate(changes: PropertyValues): void {
        if (changes.has(elementResolverUpdatedSymbol)) {
            // work to be done only when the element reference has been updated
        }
    }
}
```
