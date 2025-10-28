## Description

System context (private beta API — subject to change)

The `<sp-theme>` element provides a private beta “system” context. Components can consume it via a controller that resolves the current system (e.g. `spectrum`, `express`, `spectrum-two`) and notifies on change.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/reactive-controllers)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/reactive-controllers?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/reactive-controllers)

```
yarn add @spectrum-web-components/reactive-controllers
```

Import the controller and symbol via:

```
import {
    SystemResolutionController,
    systemResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js';
import type { SystemVariant } from '@spectrum-web-components/theme';
```

## Example

Consume the system context and respond to updates in a LitElement host:

```js
import { html, LitElement } from 'lit';
import {
    SystemResolutionController,
    systemResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/SystemContextResolution.js';

class MyComponent extends LitElement {
    systemResolver = new SystemResolutionController(this);

    protected update(changes) {
        super.update(changes);
        if (changes.has(systemResolverUpdatedSymbol)) {
            this.handleSystemChange();
        }
    }

    handleSystemChange() {
        const currentSystem = this.systemResolver.system; // "spectrum" | "express" | "spectrum-two"
        // react to system updates: adjust styles, state, or rendering
    }

    render() {
        return html`Current system: ${this.systemResolver.system}`;
    }
}
```

## Notes

- This is a private beta API and may change.
- If no `<sp-theme>` is present, `system` remains `"spectrum"` until a provider appears.
- Pair with explicit `<sp-theme system="…" color="…" scale="…">` to avoid fallback behavior and ensure predictable theming.
