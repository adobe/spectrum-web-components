## Overview

[Reactive controllers](https://lit.dev/docs/composition/controllers/) are a powerful tool for code reuse and composition within [Lit](https://lit.dev), a core dependency of Spectrum Web Components. They enable you to extract common behaviors into reusable packages that can be shared across multiple components, reducing code complexity and size while delivering a consistent user experience.

### Usage

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Reactive controllers are instantiated in your component and automatically hook into the component's lifecycle:

```typescript
import { LitElement, html } from 'lit';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

class MyComponent extends LitElement {
    // Create controller instance
    darkMode = new MatchMediaController(this, '(prefers-color-scheme: dark)');

    render() {
        // Use controller state in render
        return html`
            <div class=${this.darkMode.matches ? 'dark' : 'light'}>Content</div>
        `;
    }
}
```

### Controller lifecycle

Reactive controllers implement the `ReactiveController` interface with the following optional lifecycle methods:

- **`hostConnected()`**: Called when the host element is connected to the DOM
- **`hostDisconnected()`**: Called when the host element is disconnected from the DOM
- **`hostUpdate()`**: Called before the host's `update()` method
- **`hostUpdated()`**: Called after the host's `update()` method

Controllers can also call `host.requestUpdate()` to trigger an update cycle on the host element.

### Creating your own controllers

You can create custom reactive controllers by implementing the `ReactiveController` interface:

```typescript
import { ReactiveController, ReactiveElement } from 'lit';

export class MyController implements ReactiveController {
    private host: ReactiveElement;

    constructor(host: ReactiveElement) {
        this.host = host;
        // Register this controller with the host
        this.host.addController(this);
    }

    hostConnected() {
        // Called when host is connected to DOM
    }

    hostDisconnected() {
        // Called when host is disconnected from DOM
    }
}
```

### Available controllers

#### ColorController

Manages and validates color values in various color spaces (RGB, HSL, HSV, Hex). Provides conversion between formats and state management for color-related interactions.

**Use cases:**

- Color pickers and selectors
- Color input validation
- Color format conversion
- Theme customization UIs

**Key features:**

- Multiple color format support (hex, RGB, HSL, HSV)
- Color validation
- Format preservation
- Undo/redo support

[Learn more →](../color-controller)

---

#### DependencyManagerController

Manages the availability of custom element dependencies, enabling lazy loading patterns and progressive enhancement strategies.

**Use cases:**

- Code splitting and lazy loading
- Progressive enhancement
- Route-based component loading
- Conditional feature loading

**Key features:**

- Tracks custom element registration
- Reactive loading state
- Multiple dependency management
- Works with dynamic imports

[Learn more →](../dependency-manager)

---

#### ElementResolutionController

Maintains an active reference to another element in the DOM tree, automatically tracking changes and updating when the DOM mutates.

**Use cases:**

- Accessible label associations
- Focus trap management
- Form validation connections
- Dynamic element relationships

**Key features:**

- Automatic DOM observation
- ID selector optimization
- Shadow DOM support
- Reactive updates

[Learn more →](../element-resolution)

---

#### FocusGroupController

Base controller for managing keyboard focus within groups of elements. Extended by `RovingTabindexController` with tabindex management capabilities.

**Use cases:**

- Custom composite widgets
- Keyboard navigation patterns
- Focus management

**Key features:**

- Arrow key navigation
- Configurable direction modes
- Focus entry points
- Element enter actions

**Note:** This controller is typically not used directly. Use [RovingTabindexController](../roving-tab-index) instead for most use cases.

---

#### LanguageResolutionController

Resolves and tracks the language/locale context of the host element, responding to changes in the `lang` attribute up the DOM tree.

**Use cases:**

- Internationalization (i18n)
- Localized content
- RTL/LTR text direction
- Locale-specific formatting

**Key features:**

- Automatic language detection
- Locale change tracking
- Supports Shadow DOM
- Bubbles up DOM tree

[Learn more →](../language-resolution)

---

#### MatchMediaController

Binds CSS media queries to reactive elements, automatically updating when queries match or unmatch.

**Use cases:**

- Responsive design
- Dark mode detection
- Mobile/desktop layouts
- Print styles
- Accessibility preferences (prefers-reduced-motion, etc.)

**Key features:**

- Multiple media query support
- Reactive updates
- Predefined queries (DARK_MODE, IS_MOBILE)
- Event-driven

[Learn more →](../match-media)

---

#### PendingStateController

Manages pending/loading states for interactive elements, providing visual feedback and accessible state communication.

**Use cases:**

- Async button actions
- Form submission states
- Loading indicators
- Progress feedback

**Key features:**

- Automatic ARIA label management
- Progress circle rendering
- Label caching and restoration
- Disabled state awareness

**Note:** Currently used primarily by Button component. May be deprecated in future versions.

[Learn more →](../pending-state)

---

#### RovingTabindexController

Implements the W3C ARIA roving tabindex pattern for keyboard navigation in composite widgets, managing `tabindex` attributes and arrow key navigation.

**Use cases:**

- Toolbars
- Tab lists
- Menus
- Radio groups
- Listboxes
- Grids

**Key features:**

- Arrow key navigation (with Home/End support)
- Automatic tabindex management
- Flexible direction modes (horizontal, vertical, both, grid)
- Skips disabled elements
- WCAG compliant

[Learn more →](../roving-tab-index)

---

#### SystemContextResolutionController

Resolves and tracks system-level context like color scheme and scale preferences from Spectrum theme providers.

**Use cases:**

- Theme integration
- Design system variant detection (Spectrum Classic, Express, Spectrum 2)
- System-specific asset loading
- Adaptive UI rendering

**Key features:**

- Automatic theme context resolution
- Reactive system variant updates
- Event-based communication with `<sp-theme>`
- Automatic cleanup on disconnect

**Note:** Private Beta API - subject to changes.

[Learn more →](../system-context-resolution)
