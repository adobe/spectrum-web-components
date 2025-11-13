## Overview

The `DependencyManagerController` is a [reactive controller](https://lit.dev/docs/composition/controllers/) designed to manage the availability of custom element dependencies in your host element. It helps gate rendering and functional behavior before and after the presence of required custom elements, which is especially useful when lazily loading custom element definitions across the lifecycle of your application.

### Features

- **Lazy loading support**: Delays functionality until required custom elements are registered
- **Multiple dependency tracking**: Manages any number of custom element dependencies
- **Reactive loading state**: Automatically updates the host when all dependencies are loaded
- **Async registration handling**: Works seamlessly with dynamic imports and lazy loading

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Import the `DependencyManagerController` via:

```typescript
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
```

### Examples

#### Basic usage with lazy loading

A `Host` element that renders different content depending on the `loaded` state of a heavy dependency:

```typescript
import { html, LitElement } from 'lit';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
import '@spectrum-web-components/button/sp-button.js';

class LazyHost extends LitElement {
    dependencyManager = new DependencyManagerController(this);

    state = 'initial';

    forwardState() {
        this.state = 'heavy';
        this.requestUpdate();
    }

    render() {
        const isInitialState = this.state === 'initial';

        if (isInitialState || !this.dependencyManager.loaded) {
            if (!isInitialState) {
                // When not in the initial state, this element depends on <some-heavy-element>
                this.dependencyManager.add('some-heavy-element');
                // Lazily load that element
                import('./some-heavy-element.js');
            }

            return html`
                <sp-button
                    @click=${this.forwardState}
                    ?pending=${!isInitialState &&
                    !this.dependencyManager.loaded}
                    aria-live="polite"
                >
                    ${!isInitialState ? 'Loading...' : 'Go to next state'}
                </sp-button>
            `;
        } else {
            // <some-heavy-element> has now been loaded and can be rendered
            return html`
                <some-heavy-element></some-heavy-element>
            `;
        }
    }
}

customElements.define('lazy-host', LazyHost);
```

#### Multiple dependencies

Manage multiple custom element dependencies:

```typescript
import { html, LitElement } from 'lit';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';

class MultiDependencyHost extends LitElement {
    dependencyManager = new DependencyManagerController(this);

    connectedCallback() {
        super.connectedCallback();

        // Add multiple dependencies
        this.dependencyManager.add('sp-button');
        this.dependencyManager.add('sp-dialog');
        this.dependencyManager.add('sp-progress-circle');

        // Lazy load all dependencies
        import('@spectrum-web-components/button/sp-button.js');
        import('@spectrum-web-components/dialog/sp-dialog.js');
        import(
            '@spectrum-web-components/progress-circle/sp-progress-circle.js'
        );
    }

    render() {
        if (!this.dependencyManager.loaded) {
            return html`
                <div role="status" aria-live="polite">
                    Loading components...
                </div>
            `;
        }

        return html`
            <sp-button>Open Dialog</sp-button>
            <sp-dialog open>
                <h2 slot="heading">Dialog Title</h2>
                <p>All dependencies loaded successfully!</p>
            </sp-dialog>
        `;
    }
}

customElements.define('multi-dependency-host', MultiDependencyHost);
```

#### Conditional feature loading

Load features based on user interaction or conditions:

```typescript
import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
import '@spectrum-web-components/button/sp-button.js';

class FeatureLoader extends LitElement {
    dependencyManager = new DependencyManagerController(this);

    @property({ type: String })
    activeFeature = '';

    loadFeature(featureName: string) {
        this.activeFeature = featureName;

        switch (featureName) {
            case 'chart':
                this.dependencyManager.add('chart-component');
                import('./features/chart-component.js');
                break;
            case 'table':
                this.dependencyManager.add('table-component');
                import('./features/table-component.js');
                break;
            case 'form':
                this.dependencyManager.add('form-component');
                import('./features/form-component.js');
                break;
        }

        this.requestUpdate();
    }

    renderFeature() {
        if (!this.dependencyManager.loaded) {
            return html`
                <div
                    role="status"
                    aria-live="polite"
                    aria-label="Loading ${this.activeFeature}"
                >
                    Loading ${this.activeFeature}...
                </div>
            `;
        }

        switch (this.activeFeature) {
            case 'chart':
                return html`
                    <chart-component></chart-component>
                `;
            case 'table':
                return html`
                    <table-component></table-component>
                `;
            case 'form':
                return html`
                    <form-component></form-component>
                `;
            default:
                return html``;
        }
    }

    render() {
        return html`
            <nav role="navigation" aria-label="Feature selection">
                <sp-button @click=${() => this.loadFeature('chart')}>
                    Load Chart
                </sp-button>
                <sp-button @click=${() => this.loadFeature('table')}>
                    Load Table
                </sp-button>
                <sp-button @click=${() => this.loadFeature('form')}>
                    Load Form
                </sp-button>
            </nav>

            <div role="region" aria-label="Feature content">
                ${this.renderFeature()}
            </div>
        `;
    }
}

customElements.define('feature-loader', FeatureLoader);
```

#### Tracking load state changes

Use the `dependencyManagerLoadedSymbol` to react to loading state changes:

```typescript
import { html, LitElement, PropertyValues } from 'lit';
import {
    DependencyManagerController,
    dependencyManagerLoadedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';

class TrackingHost extends LitElement {
    dependencyManager = new DependencyManagerController(this);

    connectedCallback() {
        super.connectedCallback();
        this.dependencyManager.add('heavy-component');
        import('./heavy-component.js');
    }

    protected override willUpdate(changes: PropertyValues): void {
        if (changes.has(dependencyManagerLoadedSymbol)) {
            const wasLoaded = changes.get(dependencyManagerLoadedSymbol);

            if (!wasLoaded && this.dependencyManager.loaded) {
                // Dependencies just finished loading
                console.log('All dependencies loaded!');

                // Announce to screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('role', 'status');
                announcement.setAttribute('aria-live', 'polite');
                announcement.textContent = 'Components loaded successfully';
                this.shadowRoot?.appendChild(announcement);

                setTimeout(() => announcement.remove(), 1000);
            }
        }
    }

    render() {
        return html`
            <div>
                ${this.dependencyManager.loaded
                    ? html`
                          <heavy-component></heavy-component>
                      `
                    : html`
                          <p>Loading...</p>
                      `}
            </div>
        `;
    }
}

customElements.define('tracking-host', TrackingHost);
```

### Accessibility

When using `DependencyManagerController` to manage lazy-loaded components, consider these accessibility best practices:

#### Loading states

- **Provide clear feedback**: Always inform users when content is loading using `role="status"` and `aria-live="polite"`.
- **Use aria-busy**: Set `aria-busy="true"` on containers while dependencies are loading.
- **Loading indicators**: Include visible loading indicators (spinners, progress bars) for better user experience.

#### Screen reader announcements

- Announce when loading begins: Use `aria-live="polite"` regions to notify screen reader users.
- Announce when loading completes: Inform users when content has finished loading.
- Avoid announcement spam: Debounce or throttle announcements if multiple components load in quick succession.

#### Keyboard accessibility

- Ensure keyboard focus is managed correctly when lazy-loaded components appear.
- Don't trap focus in loading states.
- Return focus to a logical location after content loads.

### Performance considerations

- **Code splitting**: Use the dependency manager with dynamic imports to split code and reduce initial bundle size.
- **Lazy loading strategy**: Load components just-in-time based on user interaction or route changes.
- **Preloading**: Consider preloading critical dependencies during idle time using `requestIdleCallback()`.
- **Caching**: Browsers will cache imported modules, so subsequent loads are fast.
