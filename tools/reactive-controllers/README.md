## Description

[Reactive controllers](https://lit.dev/docs/composition/controllers/) are a powerful tool for code reuse and composition within [Lit](https://lit.dev), a core dependency of Spectrum Web Components. They enable you to extract common behaviors into reusable packages that can be shared across multiple components, reducing code complexity and size while delivering a consistent user experience.

Reactive controllers hook into a component's lifecycle and can:

- Maintain state
- Respond to lifecycle events
- Request updates when state changes
- Access the host element's properties and methods

The Spectrum Web Components library publishes several reactive controllers to NPM that you can leverage in your own projects. These controllers handle common patterns like keyboard navigation, media queries, element resolution, lazy loading, color management, and pending states.

## Available controllers

### [ColorController](./color-controller.md)

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

[Learn more →](./color-controller.md)

---

### [DependencyManagerController](./dependency-manager.md)

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

[Learn more →](./dependency-manager.md)

---

### [ElementResolutionController](./element-resolution.md)

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

[Learn more →](./element-resolution.md)

---

### FocusGroupController

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

**Note:** This controller is typically not used directly. Use `RovingTabindexController` instead for most use cases.

---

### LanguageResolutionController

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

---

### [MatchMediaController](./match-media.md)

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

[Learn more →](./match-media.md)

---

### [PendingStateController](./pending-state.md)

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

[Learn more →](./pending-state.md)

---

### [RovingTabindexController](./roving-tab-index.md)

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

[Learn more →](./roving-tab-index.md)

---

### SystemContextResolutionController

Resolves and tracks system-level context like color scheme and scale preferences from Spectrum theme providers.

**Use cases:**

- Theme integration
- Scale-aware components
- System preference detection
- Spectrum theme consumption

**Key features:**

- Automatic theme context resolution
- Color scheme tracking
- Scale preference tracking
- Works with Spectrum theme providers

## Installation

All controllers are published as part of the `@spectrum-web-components/reactive-controllers` package:

```bash
yarn add @spectrum-web-components/reactive-controllers
```

Or with npm:

```bash
npm install @spectrum-web-components/reactive-controllers
```

## Basic usage

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

## Controller lifecycle

Reactive controllers implement the `ReactiveController` interface with the following optional lifecycle methods:

- **`hostConnected()`**: Called when the host element is connected to the DOM
- **`hostDisconnected()`**: Called when the host element is disconnected from the DOM
- **`hostUpdate()`**: Called before the host's `update()` method
- **`hostUpdated()`**: Called after the host's `update()` method

Controllers can also call `host.requestUpdate()` to trigger an update cycle on the host element.

## Creating your own controllers

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

## Best practices

### Composition over inheritance

Use reactive controllers to share behavior across components instead of extending base classes:

```typescript
// Good: Composition with controllers
class ButtonA extends LitElement {
    pending = new PendingStateController(this);
}

class ButtonB extends LitElement {
    pending = new PendingStateController(this);
}

// Avoid: Inheritance
class BaseButton extends LitElement {
    // shared pending logic
}
class ButtonA extends BaseButton {}
class ButtonB extends BaseButton {}
```

### Keep controllers focused

Each controller should have a single responsibility:

```typescript
// Good: Focused controllers
darkMode = new MatchMediaController(this, '(prefers-color-scheme: dark)');
isMobile = new MatchMediaController(this, '(max-width: 768px)');

// Avoid: One controller doing too much
```

### Clean up resources

Always clean up in `hostDisconnected()`:

```typescript
hostConnected() {
    window.addEventListener('resize', this.handleResize);
}

hostDisconnected() {
    window.removeEventListener('resize', this.handleResize);
}
```

### Request updates appropriately

Only call `host.requestUpdate()` when state that affects rendering changes:

```typescript
set value(newValue: string) {
    if (newValue === this._value) return;
    this._value = newValue;
    this.host.requestUpdate(); // Only when value actually changes
}
```

## Accessibility considerations

Many of the reactive controllers in this package support or enable accessibility features:

- **RovingTabindexController**: Implements WCAG keyboard navigation patterns
- **PendingStateController**: Manages ARIA labels for loading states
- **ElementResolutionController**: Helps connect accessible labels and descriptions
- **MatchMediaController**: Supports accessibility preference queries (prefers-reduced-motion, etc.)

Always consider accessibility when using these controllers. See each controller's documentation for specific guidance.

## Browser support

Reactive controllers work in all browsers that support Lit (all modern browsers). No polyfills are required for the controllers themselves, though individual controllers may use browser APIs that require polyfills in older browsers:

- `MatchMediaController` requires `window.matchMedia()`
- `ElementResolutionController` requires `MutationObserver`
- `DependencyManagerController` requires `customElements.whenDefined()`

## Resources

### Documentation

- [Lit Reactive Controllers](https://lit.dev/docs/composition/controllers/) - Official Lit documentation
- [Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/) - Component library documentation

### Specifications

- [Web Components](https://www.webcomponents.org/) - Web Components specifications
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) - Accessibility patterns

### Community

- [GitHub Repository](https://github.com/adobe/spectrum-web-components) - Source code and issues
- [Lit Discord](https://lit.dev/discord/) - Community support

## Contributing

Contributions are welcome! Please see the [contributing guidelines](../../CONTRIBUTING.md) for more information.

## License

Apache License 2.0. See [LICENSE](../../LICENSE) file for details.
