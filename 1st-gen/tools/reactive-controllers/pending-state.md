## Overview

The `PendingStateController` is a [reactive controller](https://lit.dev/docs/composition/controllers/) that helps manage the pending state of a reactive element. It provides a standardized way to indicate when an element is in a pending state (such as during an asynchronous operation) by rendering a progress indicator and managing ARIA labels for accessibility.

### Features

- **Visual feedback**: Renders an `<sp-progress-circle>` element during pending states
- **Accessible state management**: Automatically updates ARIA labels to reflect pending status
- **Label caching**: Preserves and restores the original `aria-label` when transitioning states
- **Disabled state awareness**: Respects the disabled state of the host element

### Current limitations

**Note**: This controller is currently used primarily by the `<sp-button>` component, where the host element is the interactive element that needs pending state. This pattern does not work optimally for components where the interactive element requiring pending state is in the shadow DOM (e.g., Combobox and Picker).

**Deprecation consideration**: This controller may be deprecated in future versions as it's not widely adopted beyond `<sp-button>`.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Import the `PendingStateController` via:

```typescript
import {
    PendingStateController,
    HostWithPendingState,
} from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
```

### Examples

#### Basic usage

A simple button component that displays a loading state with an accessible progress indicator.

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

```html-no-demo
<async-button pending pending-label="Saving...">
    Save
</async-button>
```

#### Async operation handling

Handle asynchronous operations with proper pending state management and success/error event dispatching.

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

#### Multiple pending states

Dynamically update the pending label based on different actions being performed.

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

### Accessibility

The `PendingStateController` includes several accessibility features, but additional considerations should be taken when implementing it:

#### ARIA label management

- **Automatic label updates**: The controller automatically updates the `aria-label` when entering/exiting pending state.
- **Label preservation**: The original `aria-label` is cached and restored when the pending state ends.
- **Custom pending labels**: Use the `pendingLabel` property to provide context-specific messages (e.g., "Saving...", "Uploading...").

#### Screen reader announcements

The pending state changes are communicated to screen readers through:

- **aria-label changes**: The `aria-label` attribute is updated to reflect the pending state.
- **Progress indicator**: The `<sp-progress-circle>` has `role="presentation"` to avoid redundant announcements.

#### Keyboard accessibility

- **Disable during pending**: The element should be disabled (`disabled` attribute) or not interactive during pending states to prevent multiple submissions.
- **Focus management**: Ensure focus remains on the element or moves appropriately after async operations complete.

#### Visual indicators

- **Progress circle**: The rendered `<sp-progress-circle>` provides visual feedback.
- **Text changes**: Consider changing button text during pending states (e.g., "Save" → "Saving...").
- **Disabled state**: Apply visual styling to indicate the element is not interactive.

### References

- [WCAG 2.1 - Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)
- [ARIA: aria-busy attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-busy)
- [ARIA: aria-label attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
- [ARIA: status role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/status_role)

### Related components

The `PendingStateController` is used by:

- [`<sp-button>`](../../components/button/) - Primary use case for pending state

### Resources

- [`<sp-progress-circle>`](../../components/progress-circle/) - The visual indicator component
- [Buttons with loading states](https://spectrum.adobe.com/page/button/#Pending) - UX for pending states
