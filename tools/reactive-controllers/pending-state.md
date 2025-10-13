## Description

The `PendingStateController` is a [reactive controller](https://lit.dev/docs/composition/controllers/) that helps manage the pending state of a reactive element. It provides a standardized way to indicate when an element is in a pending state (such as during an asynchronous operation) by rendering a progress indicator and managing ARIA labels for accessibility.

### Features

- **Visual feedback**: Renders an `<sp-progress-circle>` element during pending states
- **Accessible state management**: Automatically updates ARIA labels to reflect pending status
- **Label caching**: Preserves and restores the original `aria-label` when transitioning states
- **Disabled state awareness**: Respects the disabled state of the host element

### Current limitations

**Note**: This controller is currently used primarily by the Button component, where the host element is the interactive element that needs pending state. This pattern does not work optimally for components where the interactive element requiring pending state is in the shadow DOM (e.g., Combobox and Picker).

> **Deprecation consideration**: See issue [SWC-1119, SWC-1255, SWC-459] - This controller may be deprecated in future versions as it's not widely adopted beyond Button. Consider alternative patterns for new implementations.

## API

### Constructor

```typescript
new PendingStateController<T extends HostWithPendingState>(host: T)
```

**Parameters:**

- `host` (T extends HostWithPendingState): The host element that uses this controller. Must implement the `HostWithPendingState` interface.

### Host element requirements

Your host element must implement the `HostWithPendingState` interface:

```typescript
interface HostWithPendingState extends LitElement {
    pendingLabel?: string; // Label to announce during pending state
    pending: boolean; // Whether the element is pending
    disabled: boolean; // Whether the element is disabled
    pendingStateController: PendingStateController<HostWithPendingState>;
}
```

### Properties

#### `host`

- **Type**: `T extends HostWithPendingState`
- **Description**: The host element that this controller is attached to.
- **Settable**: No (set in constructor)

#### `cachedAriaLabel`

- **Type**: `string | null`
- **Description**: Cached value of the original `aria-label` attribute, used to restore it when exiting pending state.
- **Settable**: Yes (public property, managed by the controller)

### Methods

#### `renderPendingState(): TemplateResult`

Renders the pending state UI (progress circle).

**Returns:** A Lit `TemplateResult` containing either an `<sp-progress-circle>` (when pending) or an empty template.

**Example:**

```typescript
render() {
    return html`
        <button>
            Button content
            ${this.pendingStateController.renderPendingState()}
        </button>
    `;
}
```

#### `hostConnected(): void`

Called when the host element is connected to the DOM. Caches the initial `aria-label` and updates it based on pending state.

#### `hostUpdated(): void`

Called after the host element has updated. Updates the `aria-label` based on the current pending state.

## Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```
yarn add @spectrum-web-components/reactive-controllers
```

Import the `PendingStateController` via:

```
import { PendingStateController, HostWithPendingState } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
```

## Examples

### Basic usage

```typescript
import { html, LitElement, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import {
    PendingStateController,
    HostWithPendingState,
} from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import { when } from 'lit/directives/when.js';

class AsyncButton extends LitElement implements HostWithPendingState {
    /** Whether the button is currently in a pending state. */
    @property({ type: Boolean, reflect: true })
    public pending = false;

    /** Whether the button is disabled. */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    /** Label to announce when the button is pending. */
    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Loading';

    public pendingStateController: PendingStateController<this>;

    constructor() {
        super();
        this.pendingStateController = new PendingStateController(this);
    }

    render(): TemplateResult {
        return html`
            <button
                ?disabled=${this.disabled || this.pending}
                aria-busy=${this.pending}
            >
                <slot></slot>
                ${when(this.pending, () =>
                    this.pendingStateController.renderPendingState()
                )}
            </button>
        `;
    }
}

customElements.define('async-button', AsyncButton);
```

Usage:

```html
<async-button pending pending-label="Saving...">Save</async-button>
```

### Async operation handling

```typescript
import { html, LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import {
    PendingStateController,
    HostWithPendingState,
} from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import { when } from 'lit/directives/when.js';

class SaveButton extends LitElement implements HostWithPendingState {
    @property({ type: Boolean, reflect: true })
    public pending = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Saving';

    public pendingStateController: PendingStateController<this>;

    static styles = css`
        :host {
            display: inline-block;
        }

        button {
            position: relative;
            padding: 8px 16px;
        }

        sp-progress-circle {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
        }
    `;

    constructor() {
        super();
        this.pendingStateController = new PendingStateController(this);
    }

    async handleClick() {
        this.pending = true;

        try {
            // Simulate async operation
            await this.saveData();

            // Announce success to screen readers
            this.dispatchEvent(
                new CustomEvent('save-success', {
                    detail: { message: 'Data saved successfully' },
                    bubbles: true,
                    composed: true,
                })
            );
        } catch (error) {
            // Announce error to screen readers
            this.dispatchEvent(
                new CustomEvent('save-error', {
                    detail: { message: 'Failed to save data' },
                    bubbles: true,
                    composed: true,
                })
            );
        } finally {
            this.pending = false;
        }
    }

    async saveData(): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    render() {
        return html`
            <button
                @click=${this.handleClick}
                ?disabled=${this.disabled || this.pending}
                aria-busy=${this.pending}
            >
                <slot>Save</slot>
                ${when(this.pending, () =>
                    this.pendingStateController.renderPendingState()
                )}
            </button>
        `;
    }
}

customElements.define('save-button', SaveButton);
```

### Form submission with pending state

```typescript
import { html, LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import {
    PendingStateController,
    HostWithPendingState,
} from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import { when } from 'lit/directives/when.js';
import '@spectrum-web-components/textfield/sp-textfield.js';

class SubmitButton extends LitElement implements HostWithPendingState {
    @property({ type: Boolean, reflect: true })
    public pending = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Submitting';

    public pendingStateController: PendingStateController<this>;

    static styles = css`
        :host {
            display: inline-block;
        }

        button {
            padding: 10px 20px;
            min-width: 120px;
            position: relative;
        }
    `;

    constructor() {
        super();
        this.pendingStateController = new PendingStateController(this);
    }

    async handleSubmit(event: Event) {
        event.preventDefault();

        if (this.pending) return;

        this.pending = true;

        try {
            const form = this.closest('form');
            if (form) {
                const formData = new FormData(form);
                await this.submitForm(formData);

                // Announce success
                this.announceToScreenReader('Form submitted successfully');
            }
        } catch (error) {
            // Announce error
            this.announceToScreenReader('Form submission failed', 'assertive');
        } finally {
            this.pending = false;
        }
    }

    announceToScreenReader(
        message: string,
        priority: 'polite' | 'assertive' = 'polite'
    ) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', priority);
        announcement.textContent = message;
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';

        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    async submitForm(formData: FormData): Promise<void> {
        // Simulate API call
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    render() {
        return html`
            <button
                type="submit"
                @click=${this.handleSubmit}
                ?disabled=${this.disabled || this.pending}
                aria-busy=${this.pending}
            >
                ${this.pending ? 'Submitting...' : 'Submit'}
                ${when(this.pending, () =>
                    this.pendingStateController.renderPendingState()
                )}
            </button>
        `;
    }
}

customElements.define('submit-button', SubmitButton);
```

### Multiple pending states

```typescript
import { html, LitElement, css } from 'lit';
import { property } from 'lit/decorators.js';
import {
    PendingStateController,
    HostWithPendingState,
} from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import { when } from 'lit/directives/when.js';

class ActionButton extends LitElement implements HostWithPendingState {
    @property({ type: Boolean, reflect: true })
    public pending = false;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Processing';

    @property({ type: String })
    public action = '';

    public pendingStateController: PendingStateController<this>;

    constructor() {
        super();
        this.pendingStateController = new PendingStateController(this);
    }

    async performAction(actionType: string) {
        this.action = actionType;
        this.pending = true;

        // Update pending label based on action
        switch (actionType) {
            case 'save':
                this.pendingLabel = 'Saving';
                break;
            case 'delete':
                this.pendingLabel = 'Deleting';
                break;
            case 'upload':
                this.pendingLabel = 'Uploading';
                break;
        }

        try {
            await this.executeAction(actionType);
        } finally {
            this.pending = false;
            this.action = '';
        }
    }

    async executeAction(action: string): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    render() {
        return html`
            <button
                @click=${() => this.performAction('save')}
                ?disabled=${this.disabled || this.pending}
                aria-busy=${this.pending}
            >
                <slot>Perform Action</slot>
                ${when(this.pending, () =>
                    this.pendingStateController.renderPendingState()
                )}
            </button>
        `;
    }
}

customElements.define('action-button', ActionButton);
```

## Accessibility

The `PendingStateController` includes several accessibility features, but additional considerations should be taken when implementing it:

### ARIA label management

- **Automatic label updates**: The controller automatically updates the `aria-label` when entering/exiting pending state.
- **Label preservation**: The original `aria-label` is cached and restored when the pending state ends.
- **Custom pending labels**: Use the `pendingLabel` property to provide context-specific messages (e.g., "Saving...", "Uploading...").

### Screen reader announcements

The pending state changes are communicated to screen readers through:

- **aria-label changes**: The `aria-label` attribute is updated to reflect the pending state.
- **Progress indicator**: The `<sp-progress-circle>` has `role="presentation"` to avoid redundant announcements.

**Best practices:**

```typescript
render() {
    return html`
        <button
            ?disabled=${this.disabled || this.pending}
            aria-busy=${this.pending ? 'true' : 'false'}
            aria-label=${this.pending ? this.pendingLabel : 'Submit'}
        >
            Submit
            ${when(this.pending, () => this.pendingStateController.renderPendingState())}
        </button>
    `;
}
```

### Keyboard accessibility

- **Disable during pending**: The element should be disabled (`disabled` attribute) or not interactive during pending states to prevent multiple submissions.
- **Focus management**: Ensure focus remains on the element or moves appropriately after async operations complete.

### Visual indicators

- **Progress circle**: The rendered `<sp-progress-circle>` provides visual feedback.
- **Text changes**: Consider changing button text during pending states (e.g., "Save" → "Saving...").
- **Disabled state**: Apply visual styling to indicate the element is not interactive.

### Error handling and recovery

```typescript
async handleAction() {
    this.pending = true;

    try {
        await this.performAsync();
        // Success announcement
        this.announceToScreenReader('Action completed successfully', 'polite');
    } catch (error) {
        // Error announcement
        this.announceToScreenReader(
            'Action failed. Please try again.',
            'assertive'
        );
    } finally {
        this.pending = false;
    }
}

announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.textContent = message;

    // Visually hide the live region
    Object.assign(liveRegion.style, {
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
    });

    document.body.appendChild(liveRegion);
    setTimeout(() => liveRegion.remove(), 1000);
}
```

### Known issues

> **Note**: [SWC-1119, SWC-1255, SWC-459] - Accessibility warnings and the a11y DOM tree should be confirmed for pending state in Button, Combobox, and Picker components.

### References

- [WCAG 2.1 - Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)
- [ARIA: aria-busy attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy)
- [ARIA: aria-label attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
- [ARIA: status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role)
- [Adobe Accessibility Guidelines](https://www.adobe.com/accessibility/products/spectrum.html)

## Events

The `PendingStateController` doesn't dispatch custom events directly. Host elements should dispatch their own events to communicate state changes:

```typescript
this.dispatchEvent(
    new CustomEvent('pending-change', {
        detail: { pending: this.pending },
        bubbles: true,
        composed: true,
    })
);
```

## Related components

The `PendingStateController` is used by:

- [`<sp-button>`](../../packages/button/) - Primary use case for pending state

## Resources

- [Lit Reactive Controllers](https://lit.dev/docs/composition/controllers/) - Learn more about reactive controllers
- [`<sp-progress-circle>`](../../packages/progress-circle/) - The visual indicator component
- [Buttons with loading states](https://www.nngroup.com/articles/indicators-validating-user-input/) - UX best practices
