## Overview

The `ElementResolutionController` is a [reactive controller](https://lit.dev/docs/composition/controllers/) that maintains an active reference to another element in the same DOM tree. It automatically observes the DOM tree for changes and ensures that the reference it holds is always up-to-date with the first matched element or `null` if no match is found.

### Features

- **Automatic element tracking**: Maintains a live reference to elements matching a CSS selector
- **DOM observation**: Uses `MutationObserver` to track changes in the DOM tree
- **Efficient ID resolution**: Optimized path for ID-based selectors
- **Reactive updates**: Automatically triggers host updates when the resolved element changes
- **Scope awareness**: Works within Shadow DOM and regular DOM contexts

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Import the `ElementResolutionController` and/or `elementResolverUpdatedSymbol` via:

```typescript
import {
    ElementResolutionController,
    elementResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';
```

### Examples

#### Basic usage

An `ElementResolutionController` can be applied to a host element like the following:

```typescript
import { html, LitElement } from 'lit';
import { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';

class RootEl extends LitElement {
    resolvedElement = new ElementResolutionController(this);

    constructor() {
        super();
        this.resolvedElement.selector = '.other-element';
    }

    render() {
        return html`
            <p>
                Resolved element:
                ${this.resolvedElement.element ? 'Found' : 'Not found'}
            </p>
        `;
    }
}

customElements.define('root-el', RootEl);
```

In this example, the selector `'.other-element'` is supplied to the resolver, which means in the following example, `this.resolvedElement.element` will maintain a reference to the sibling `<div>` element:

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

#### Constructor-based selector

You can provide the selector in the constructor options:

```typescript
import { LitElement } from 'lit';
import { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';

class FormController extends LitElement {
    resolvedElement = new ElementResolutionController(this, {
        selector: '#submit-button',
    });

    handleSubmit() {
        if (this.resolvedElement.element) {
            this.resolvedElement.element.click();
        }
    }
}

customElements.define('form-controller', FormController);
```

#### Tracking resolution updates

Changes to the resolved element reference are reported to the host element via a call to the `requestUpdate()` method. This will be provided the `elementResolverUpdatedSymbol` as the changed key. If your element leverages this value against the changes map, it can react directly to changes in the resolved element:

```typescript
import { html, LitElement, PropertyValues } from 'lit';
import {
    ElementResolutionController,
    elementResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';

class RootEl extends LitElement {
    resolvedElement = new ElementResolutionController(this);

    constructor() {
        super();
        this.resolvedElement.selector = '.other-element';
    }

    protected override willUpdate(changes: PropertyValues): void {
        if (changes.has(elementResolverUpdatedSymbol)) {
            // Work to be done only when the element reference has been updated
            console.log(
                'Resolved element changed:',
                this.resolvedElement.element
            );
        }
    }

    render() {
        return html`
            <p>
                Element status:
                ${this.resolvedElement.element ? 'Found' : 'Not found'}
            </p>
        `;
    }
}

customElements.define('root-el', RootEl);
```

#### Accessible label resolution

Use `ElementResolutionController` to resolve accessible labeling elements across shadow DOM boundaries:

```typescript
import { html, LitElement } from 'lit';
import { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';

class CustomInput extends LitElement {
    labelElement = new ElementResolutionController(this, {
        selector: '.input-label',
    });

    firstUpdated() {
        // Connect input to label for accessibility
        // This handles cross-root ARIA relationships
        const target = this.labelElement.element;
        const input = this.shadowRoot?.querySelector('input');

        if (input && target) {
            const targetParent = target.getRootNode() as HTMLElement;

            if (targetParent === (this.getRootNode() as HTMLElement)) {
                // Same root: use aria-labelledby with ID reference
                const labelId = target.id || this.generateId();
                target.id = labelId;
                input.setAttribute('aria-labelledby', labelId);
            } else {
                // Different root: use aria-label with text content
                input.setAttribute(
                    'aria-label',
                    target.textContent?.trim() || ''
                );
            }
        }
    }

    generateId() {
        return `label-${Math.random().toString(36).substr(2, 9)}`;
    }

    render() {
        return html`
            <input type="text" />
        `;
    }
}

customElements.define('custom-input', CustomInput);
```

Usage:

```html-no-demo
<span class="input-label" id="name-label">Enter your name</span>
<custom-input></custom-input>
```

#### Dynamic selector changes

The selector can be changed dynamically, and the controller will automatically update:

```typescript
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';

class DynamicResolver extends LitElement {
    resolvedElement = new ElementResolutionController(this);

    @property({ type: String })
    targetSelector = '.default-target';

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('targetSelector')) {
            this.resolvedElement.selector = this.targetSelector;
        }
    }

    render() {
        const status = this.resolvedElement.element
            ? `Found: ${this.resolvedElement.element.tagName}`
            : 'Not found';

        return html`
            <div role="status" aria-live="polite">
                Current target (${this.targetSelector}): ${status}
            </div>
        `;
    }
}

customElements.define('dynamic-resolver', DynamicResolver);
```

#### Modal and overlay management

Use element resolution to manage focus trap elements in modals. The controller can find elements across shadow DOM boundaries, making it useful for overlays where content might be slotted or projected:

```typescript
import { html, LitElement } from 'lit';
import { ElementResolutionController } from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';

class ModalManager extends LitElement {
    firstFocusableElement = new ElementResolutionController(this, {
        selector: '[data-first-focus]',
    });

    lastFocusableElement = new ElementResolutionController(this, {
        selector: '[data-last-focus]',
    });

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('keydown', this.handleKeydown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('keydown', this.handleKeydown);
    }

    handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Tab') {
            const activeElement = document.activeElement;

            if (event.shiftKey) {
                // Tabbing backward
                if (activeElement === this.firstFocusableElement.element) {
                    event.preventDefault();
                    this.lastFocusableElement.element?.focus();
                }
            } else {
                // Tabbing forward
                if (activeElement === this.lastFocusableElement.element) {
                    event.preventDefault();
                    this.firstFocusableElement.element?.focus();
                }
            }
        }
    }

    render() {
        return html`
            <div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
                <h2 id="dialog-title">Modal Dialog</h2>
                <button data-first-focus>First Action</button>
                <slot></slot>
                <button data-last-focus>Cancel</button>
            </div>
        `;
    }
}

customElements.define('modal-manager', ModalManager);
```

Usage:

```html-no-demo
<!-- Elements with data-first-focus/data-last-focus can be inside shadow root -->
<modal-manager></modal-manager>

<!-- Or slotted from light DOM - controller finds them regardless -->
<modal-manager>
    <button data-first-focus>Custom First Button</button>
    <p>Modal content...</p>
    <button data-last-focus>Custom Last Button</button>
</modal-manager>
```

### Accessibility

When using `ElementResolutionController` for accessibility-related functionality, consider these best practices:

#### Label associations

- When resolving label elements, always use proper ARIA attributes (`aria-labelledby`, `aria-describedby`) to create programmatic relationships.
- Ensure labels have unique IDs that can be referenced.
- Generate IDs programmatically if they don't exist.

#### Error messages

- Error message elements should have `role="alert"` for screen reader announcements.
- Use `aria-describedby` to associate error messages with form controls.
- Ensure error messages are visible and programmatically associated when validation fails.

#### Focus management

- When resolving focusable elements, ensure they meet keyboard accessibility requirements.
- Maintain logical tab order when using resolved elements for focus trapping.
- Provide clear focus indicators for all resolved interactive elements.

#### Dynamic content

- Use `aria-live` regions when resolved elements change dynamically and users need to be notified.
- Consider using `aria-live="polite"` for non-critical updates.
- Use `aria-live="assertive"` sparingly for critical information.

#### Element visibility

- Verify that resolved elements are visible and accessible to assistive technologies.
- Check that resolved elements aren't hidden with `display: none` or `visibility: hidden` unless intentional.
- Use appropriate ARIA attributes (`aria-hidden`) when hiding decorative resolved elements.

### Performance considerations

- **ID selectors are optimized**: The controller uses `getElementById()` for ID-based selectors (starting with `#`), which is faster than `querySelector()`.
- **MutationObserver scope**: The observer watches the entire root node (Shadow DOM or document) for changes. For large DOMs, this could have performance implications.
- **Automatic cleanup**: The controller automatically disconnects the MutationObserver when the host is disconnected from the DOM.

### References

- [WCAG 2.1 - Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [ARIA: aria-labelledby attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)
- [ARIA: aria-describedby attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby)
