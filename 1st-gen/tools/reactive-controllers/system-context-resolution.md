## Overview

The `SystemResolutionController` is a [reactive controller](https://lit.dev/docs/composition/controllers/) that resolves and tracks the Spectrum design system variant context from parent `<sp-theme>` elements in the DOM tree. It provides a standardized way for components to detect which Spectrum design system is in use (Spectrum, Spectrum 2, or Express) and react to changes dynamically.

### Features

- **Automatic system detection**: Resolves system context from parent `<sp-theme>` elements
- **Reactive updates**: Automatically updates when the theme system changes
- **Event-based communication**: Uses custom events to query and subscribe to system context
- **Cleanup management**: Automatically unsubscribes when component disconnects
- **Type-safe**: Provides TypeScript types for system variants

> **Note**: This is a private Beta API and is subject to changes.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Import the `SystemResolutionController` via:

```typescript
import {
    SystemResolutionController,
    systemResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js';
import type { SystemVariant } from '@spectrum-web-components/theme';
```

### Examples

#### Basic usage

A simple component that displays the current design system variant.

```typescript
import { LitElement, html } from 'lit';
import { SystemResolutionController } from '@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js';
import type { SystemVariant } from '@spectrum-web-components/theme';

class SystemAwareComponent extends LitElement {
    private systemResolver = new SystemResolutionController(this);

    render() {
        const system = this.systemResolver.system;

        return html`
            <div>Current design system: ${system}</div>
        `;
    }
}

customElements.define('system-aware-component', SystemAwareComponent);
```

Usage with `<sp-theme>`:

```html-no-demo
<sp-theme system="express" color="light" scale="medium">
    <system-aware-component></system-aware-component>
</sp-theme>
```

#### Reacting to system changes

Detect system changes using the symbol and apply system-specific styles or load resources dynamically.

```typescript
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import {
    SystemResolutionController,
    systemResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js';
import type { SystemVariant } from '@spectrum-web-components/theme';

class AdaptiveComponent extends LitElement {
    private systemResolver = new SystemResolutionController(this);

    @property({ type: String, reflect: true })
    private currentSystem: SystemVariant = 'spectrum';

    static styles = css`
        :host {
            display: block;
            padding: 16px;
        }

        :host([current-system='express']) {
            /* Express-specific styles */
            border-left: 3px solid blue;
        }

        :host([current-system='spectrum-two']) {
            /* Spectrum 2-specific styles */
            border-left: 3px solid green;
        }
    `;

    protected override update(changes: Map<PropertyKey, unknown>): void {
        if (changes.has(systemResolverUpdatedSymbol)) {
            this.currentSystem = this.systemResolver.system;
            console.log('System context changed to:', this.currentSystem);

            // Perform system-specific logic
            this.handleSystemChange(this.currentSystem);
        }
        super.update(changes);
    }

    private handleSystemChange(system: SystemVariant): void {
        // Implement system-specific behavior
        switch (system) {
            case 'express':
                // Load Express-specific resources
                break;
            case 'spectrum-two':
                // Load Spectrum 2-specific resources
                break;
            case 'spectrum':
            default:
                // Load Spectrum resources
                break;
        }
    }

    render() {
        return html`
            <div>
                <h3>Adaptive Component</h3>
                <p>Currently using: ${this.currentSystem}</p>
            </div>
        `;
    }
}

customElements.define('adaptive-component', AdaptiveComponent);
```

#### Conditional rendering based on system

Render completely different UI layouts based on the active design system variant.

```typescript
import { LitElement, html } from 'lit';
import { SystemResolutionController } from '@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js';

class SystemSpecificContent extends LitElement {
    private systemResolver = new SystemResolutionController(this);

    renderExpressContent() {
        return html`
            <div class="express-ui">
                <p>Optimized for high-density enterprise workflows</p>
                <button>Express Action</button>
            </div>
        `;
    }

    renderSpectrum2Content() {
        return html`
            <div class="spectrum2-ui">
                <p>Modern Spectrum 2 design</p>
                <button>Spectrum 2 Action</button>
            </div>
        `;
    }

    renderSpectrumContent() {
        return html`
            <div class="spectrum-ui">
                <p>Classic Spectrum design</p>
                <button>Standard Action</button>
            </div>
        `;
    }

    render() {
        switch (this.systemResolver.system) {
            case 'express':
                return this.renderExpressContent();
            case 'spectrum-two':
                return this.renderSpectrum2Content();
            case 'spectrum':
            default:
                return this.renderSpectrumContent();
        }
    }
}

customElements.define('system-specific-content', SystemSpecificContent);
```

#### Loading system-specific assets

Load different icon sets or images based on the system variant for consistent visual design.

```typescript
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { SystemResolutionController } from '@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js';
import type { SystemVariant } from '@spectrum-web-components/theme';

class IconLoader extends LitElement {
    private systemResolver = new SystemResolutionController(this);

    @property({ type: String })
    iconName = '';

    private getIconPath(system: SystemVariant): string {
        return `/assets/icons/${system}/${this.iconName}.svg`;
    }

    render() {
        const iconSrc = this.getIconPath(this.systemResolver.system);

        return html`
            <img
                src=${iconSrc}
                alt=${this.iconName}
                aria-label="Icon for ${this.iconName} in ${this.systemResolver
                    .system} design system"
            />
        `;
    }
}

customElements.define('icon-loader', IconLoader);
```

Usage:

```html-no-demo
<sp-theme system="express" color="light" scale="medium">
    <icon-loader icon-name="settings"></icon-loader>
</sp-theme>
```

#### Nested theme contexts

Components automatically resolve to their nearest parent `<sp-theme>`, allowing different system variants in nested contexts.

```html-no-demo
<sp-theme system="spectrum" color="light" scale="medium">
    <system-aware-component></system-aware-component>
    <!-- Uses 'spectrum' -->

    <sp-theme system="express" color="dark" scale="large">
        <system-aware-component></system-aware-component>
        <!-- Uses 'express' -->

        <sp-theme system="spectrum-two" color="light" scale="medium">
            <system-aware-component></system-aware-component>
            <!-- Uses 'spectrum-two' -->
        </sp-theme>
    </sp-theme>
</sp-theme>
```

### Accessibility

When using `SystemResolutionController` to adapt UI based on design systems, consider these accessibility best practices:

#### Screen reader announcements

When the system context changes dynamically, consider announcing it:

```typescript
private announceSystemChange(): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `Design system updated to ${this.systemResolver.system}`;

    // Add to DOM temporarily
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}
```

#### ARIA attributes

- Maintain proper ARIA attributes regardless of system variant.
- Ensure labels and descriptions remain accurate after system changes.
- Don't rely on visual styling alone to convey information.

#### Keyboard navigation

- Keyboard navigation patterns should remain consistent across system variants.
- Focus indicators must be visible in all system themes.
- Tab order should not change based on system variant.

#### Color contrast

Different system variants may have different color palettes:

- Verify that all system variants meet [WCAG 2.1 Level AA contrast requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).
- Test with system-specific color tokens.
- Consider high contrast modes for each system variant.

### How it works

The controller uses an event-based protocol to communicate with `<sp-theme>` elements:

1. When the host connects, it dispatches an `sp-system-context` event that bubbles up the DOM
2. The nearest `<sp-theme>` element catches this event and calls the provided callback with the current system variant
3. The theme also provides an `unsubscribe` function for cleanup
4. When the system attribute changes on the theme, it notifies all subscribed components
5. When the host disconnects, the controller automatically unsubscribes

### Related components

The `SystemResolutionController` works with:

- [`<sp-theme>`](../../tools/theme/) - Provides the system context
- All Spectrum Web Components that need to adapt to different design systems

### Best practices

#### Do:

- Use the controller to adapt visual presentation to the current system
- Maintain consistent functionality across all system variants
- Test your component with all three system variants
- Clean up properly (the controller handles this automatically)

#### Don't:

- Don't completely change component behavior based on system variant
- Don't remove accessibility features in certain systems
- Don't assume a default system - always check `systemResolver.system`
- Don't query the system context manually - use the controller

### Resources

- [Lit Reactive Controllers](https://lit.dev/docs/composition/controllers/) - Learn more about reactive controllers
- [Spectrum Design System](https://spectrum.adobe.com/) - Official Spectrum documentation
- [Spectrum Theme Component](../../tools/theme/) - Theme provider documentation
- [Spectrum 2 Design System](https://s2.spectrum.adobe.com/) - What's new in Spectrum 2
