# Swan - Next Generation Spectrum Web Components

Swan is the next generation of Spectrum Web Components, built with modern web standards and minimal overhead. It leverages the shared infrastructure from `@spectrum-web-components/core` while providing a clean, lightweight foundation for future component development.

## Philosophy

- **Minimal**: Only what you need, nothing more
- **Modern**: Latest web standards and Lit 3.0
- **Lightweight**: Optimized bundle sizes and performance
- **Standards-based**: Built on web components and ES modules
- **Future-ready**: Designed for the next decade of web development

## Architecture

```
┌─────────────────┐
│      Swan       │
│   Components    │
│   (Modern)      │
└─────────┬───────┘
          │
┌─────────▼───────┐
│   Core Package  │
│  (Shared Logic) │
└─────────────────┘
```

Swan components inherit from the shared core infrastructure while embracing modern patterns:

- ESM-first architecture
- Vite-based build system
- TypeScript with strict settings
- Minimal runtime overhead
- Tree-shakeable exports

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Usage

```js
import { SwanButton } from '@spectrum-web-components/swan/components/button.js';

// Use in your HTML
<swan-button variant="primary">Click me</swan-button>;
```

## Component Development

Swan components extend the shared base classes from core:

```js
import { SpectrumElement } from '@spectrum-web-components/core/base/Base.js';
import { html, css } from 'lit';

export class SwanButton extends SpectrumElement {
    static styles = css`
        :host {
            /* Minimal, modern styling */
        }
    `;

    render() {
        return html`
            <button><slot></slot></button>
        `;
    }
}
```

## Build System

Swan uses Vite for optimal development experience and production builds:

- **Fast HMR**: Instant updates during development
- **Optimized bundles**: Automatic code splitting and tree shaking
- **TypeScript**: Full type safety with zero config
- **Modern targets**: ES2022+ for smaller, faster code

## Migration from SWC 1.X

Swan components can coexist with SWC 1.X components, allowing gradual migration:

1. Both systems share the same core infrastructure
2. Components can be migrated incrementally
3. No breaking changes to existing applications
4. Improved performance and smaller bundles over time

## Contributing

Swan follows the same contribution guidelines as the main Spectrum Web Components project while emphasizing modern development practices and minimal complexity.
