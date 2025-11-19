## When to use imperative API

Use the imperative API when you need **programmatic control** over overlay creation and lifecycle. This approach excels at:

- **Dynamic overlays**: Create overlays based on runtime conditions
- **Virtual positioning**: Use `VirtualTrigger` for cursor-based or coordinate positioning
- **Context menus**: Right-click menus, dropdown actions
- **Complex lifecycle**: Fine-grained control over when overlays are created and destroyed
- **Component libraries**: Building reusable components that manage their own overlays

**Don't use imperative API when:**

- **Static overlays**: Declarative [`<sp-overlay>`](./README.md) or [`<overlay-trigger>`](./overlay-trigger.md) are simpler
- **Multiple interactions**: Use [`<overlay-trigger>`](./overlay-trigger.md) for hover + click on same element
- **Lit templates**: Use the [trigger directive](./trigger-directive.md) for better integration

See the [Getting Started Guide](./GETTING-STARTED.md) for a complete comparison of entry points.

## Overview

While an `<sp-overlay>` element is the recommended entry point to the Spectrum Web Components Overlay API, you can also interact with this set of features via an imperative API, `Overlay.open`.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/overlay?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/overlay?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)

```zsh
yarn add @spectrum-web-components/overlay
```

Import the `Overlay` class to leverage its capabilities within your application or custom element:

```ts
import { Overlay } from '@spectrum-web-components/overlay';
```

### Example

Primarily, this class gives you access to the `open` method that will allow you to open an overlay:

```ts
Overlay.open(
    (overlayElement: HTMLElement), // the element that will be projected into the overlay, "content",
    (options?: OverlayOptions)
);
```

`Overlay.open()` is an asynchronous method that returns an `<sp-overlay>` element that wraps the `HTMLElement` provided as the `overlayElement`. While this process will set the `<sp-overlay>` element to `open`, consumers of this API will need to choose where to append this element to the DOM in order for the content to be made available in the browser.

```ts
(async () => {
    const content = document.querySelector('#content');
    const options = {
        offset: 0,
        placement: 'bottom',
        trigger: document.querySelector('#trigger'),
        type: 'auto',
    };
    const overlay = await Overlay.open(content, options);
    document.body.append(overlay);
})();
```

Keep in mind that a changing DOM tree is likely to alter the relationship between existing content. Without proper care this can negatively effect the CSS that you have applied to existing content. DOM events and DOM selection methods can also perform differently than expected as the tree shape changes.

### Options

When leveraging `Overlay.open()`, you can provide an optional second argument of `OverlayOptions`, with the following type:

```ts
type OverlayOptions = {
    delayed?: boolean;
    notImmediatelyCloseable?: boolean;
    offset?: number | [number, number];
    placement?: Placement;
    receivesFocus?: 'auto' | 'true' | 'false';
    trigger?: HTMLElement | VirtualTrigger;
    type?: 'modal' | 'page' | 'hint' | 'auto' | 'manual';
};
```

## VirtualTrigger patterns

`VirtualTrigger` enables positioning overlays at specific coordinates without a DOM element.

### Basic usage

Create a `VirtualTrigger` with x/y coordinates:

```typescript
import { VirtualTrigger } from '@spectrum-web-components/overlay';

const virtualTrigger = new VirtualTrigger(100, 200);
```

### Context menu pattern

Right-click menus are the most common use case:

```typescript
import { VirtualTrigger, openOverlay } from '@spectrum-web-components/overlay';

element.addEventListener('contextmenu', async (event) => {
    event.preventDefault();

    // Create trigger at mouse position
    const trigger = new VirtualTrigger(event.clientX, event.clientY);

    // Create menu content
    const menu = document.createElement('sp-popover');
    menu.innerHTML = `
        <sp-menu>
            <sp-menu-item>Cut</sp-menu-item>
            <sp-menu-item>Copy</sp-menu-item>
            <sp-menu-item>Paste</sp-menu-item>
        </sp-menu>
    `;

    // Open overlay
    const overlay = await openOverlay(menu, {
        trigger,
        placement: 'right-start',
        type: 'auto',
        notImmediatelyClosable: true, // Prevent instant close from mouseup
    });

    // Add to DOM
    document.body.appendChild(overlay);

    // Clean up when closed
    overlay.addEventListener(
        'sp-closed',
        () => {
            overlay.remove();
        },
        { once: true }
    );
});
```

### Following the cursor

Update the trigger position as the mouse moves:

```typescript
const trigger = new VirtualTrigger(0, 0);
let overlay;

element.addEventListener('mouseenter', async () => {
    const tooltip = document.createElement('sp-tooltip');
    tooltip.textContent = 'Follows cursor';

    overlay = await openOverlay(tooltip, {
        trigger,
        placement: 'right',
        type: 'hint',
    });

    document.body.appendChild(overlay);
});

element.addEventListener('mousemove', (event) => {
    if (overlay?.open) {
        // Update trigger position
        trigger.updateBoundingClientRect(event.clientX, event.clientY);
    }
});

element.addEventListener('mouseleave', () => {
    if (overlay) {
        overlay.open = false;
    }
});
```

### Drag-and-drop preview

Show preview at drop target position:

```typescript
element.addEventListener('dragover', (event) => {
    event.preventDefault();

    const trigger = new VirtualTrigger(event.clientX, event.clientY);

    // Show drop preview
    showDropPreview(trigger);
});
```

### Touch gesture response

Position overlay at touch point:

```typescript
element.addEventListener('touchstart', async (event) => {
    const touch = event.touches[0];
    const trigger = new VirtualTrigger(touch.clientX, touch.clientY);

    const overlay = await openOverlay(content, {
        trigger,
        placement: 'top',
        type: 'auto',
    });

    document.body.appendChild(overlay);
});
```

## Lifecycle management

### Creating overlays on demand

The imperative API is ideal for creating overlays only when needed:

```typescript
async function showUserMenu(user, triggerElement) {
    // Fetch user data if needed
    const userData = await fetchUserData(user.id);

    // Create content with fresh data
    const menu = document.createElement('sp-popover');
    menu.innerHTML = `
        <sp-menu>
            <sp-menu-item>${userData.name}</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Profile</sp-menu-item>
            <sp-menu-item>Settings</sp-menu-item>
            <sp-menu-item>Logout</sp-menu-item>
        </sp-menu>
    `;

    const overlay = await openOverlay(menu, {
        trigger: triggerElement,
        placement: 'bottom-start',
        type: 'auto',
    });

    document.body.appendChild(overlay);

    return overlay;
}
```

### Managing overlay references

Store references for later control:

```typescript
class ContextMenuManager {
    private currentOverlay?: HTMLElement;

    async show(x: number, y: number, items: MenuItem[]) {
        // Close existing overlay
        this.close();

        const trigger = new VirtualTrigger(x, y);
        const menu = this.createMenu(items);

        this.currentOverlay = await openOverlay(menu, {
            trigger,
            placement: 'right-start',
            type: 'auto',
        });

        document.body.appendChild(this.currentOverlay);

        // Auto-cleanup
        this.currentOverlay.addEventListener(
            'sp-closed',
            () => {
                this.cleanup();
            },
            { once: true }
        );
    }

    close() {
        if (this.currentOverlay) {
            this.currentOverlay.open = false;
        }
    }

    private cleanup() {
        if (this.currentOverlay) {
            this.currentOverlay.remove();
            this.currentOverlay = undefined;
        }
    }
}
```

### Cleanup patterns

Always clean up overlays when done:

```typescript
const overlay = await openOverlay(content, options);
document.body.appendChild(overlay);

// Method 1: Remove on close
overlay.addEventListener(
    'sp-closed',
    () => {
        overlay.remove();
    },
    { once: true }
);

// Method 2: Manual cleanup
function cleanup() {
    overlay.open = false;
    // Wait for close animation
    overlay.addEventListener(
        'sp-closed',
        () => {
            overlay.remove();
        },
        { once: true }
    );
}

// Method 3: Use AbortController for automatic cleanup
const controller = new AbortController();

overlay.addEventListener(
    'sp-closed',
    () => {
        overlay.remove();
    },
    { signal: controller.signal, once: true }
);

// Later: cleanup all listeners
controller.abort();
```

### Advanced topics

#### Using a virtual trigger

```html-live
<style>
    #root {
        position: relative;
        width: 100%;
        height: 20vh;
        background-color: var(--spectrum-gray-100);
        border: 1px solid var(--spectrum-gray-400);
    }
</style>

<p>Right click anywhere in bounded rectangle to open the menu</p>
<div id="root"></div>

<script type="module">

    import { html, render } from '@spectrum-web-components/base';
    import { VirtualTrigger, openOverlay } from '@spectrum-web-components/overlay';

    const contextMenuTemplate = () => html`
          <sp-popover
            style="width:300px;"
            @change=${(event) => {
                    event.target.dispatchEvent(
                    new Event('close', { bubbles: true })
                );
            }}
        >
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Select All</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item disabled>Copy</sp-menu-item>
                <sp-menu-item disabled>Cut</sp-menu-item>
                <sp-menu-item disabled>Paste</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;

    const init = () => {
        const appRoot = document.querySelector('#root');
        appRoot.addEventListener('contextmenu', async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const source = event.composedPath()[0];
            const { id } = source;
            const trigger = event.target;
            const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
            const fragment = document.createDocumentFragment();
            render(contextMenuTemplate(), fragment);
            const popover = fragment.querySelector('sp-popover');

            const overlay = await openOverlay(popover, {
                trigger: virtualTrigger,
                placement: 'right-start',
                offset: 0,
                notImmediatelyClosable: true,
                type: 'auto',
            });
            trigger.insertAdjacentElement('afterend', overlay);
        });
    }

    customElements.whenDefined('code-example').then(() => {
        Promise.all([...document.querySelectorAll('code-example')].map(example => example.updateComplete)).then(() => {
            init();
        });
    });
</script>
```

<script type="module">

    import { html, render } from '@spectrum-web-components/base';
    import { VirtualTrigger, openOverlay } from '@spectrum-web-components/overlay';

    const contextMenuTemplate = () => html`
          <sp-popover
            style="width:300px;"
            @change=${(event) => {
                    event.target.dispatchEvent(
                    new Event('close', { bubbles: true })
                );
            }}
        >
            <sp-menu>
                <sp-menu-item>Deselect</sp-menu-item>
                <sp-menu-item>Select Inverse</sp-menu-item>
                <sp-menu-item>Select All</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item disabled>Copy</sp-menu-item>
                <sp-menu-item disabled>Cut</sp-menu-item>
                <sp-menu-item disabled>Paste</sp-menu-item>
            </sp-menu>
        </sp-popover>
    `;

    const init = () => {
        const appRoot = document.querySelector('#root');
        appRoot.addEventListener('contextmenu', async (event) => {
            event.preventDefault();
            event.stopPropagation();

            const source = event.composedPath()[0];
            const { id } = source;
            const trigger = event.target;
            const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
            const fragment = document.createDocumentFragment();
            render(contextMenuTemplate(), fragment);
            const popover = fragment.querySelector('sp-popover');

            const overlay = await openOverlay(popover, {
                trigger: virtualTrigger,
                placement: 'right-start',
                offset: 0,
                notImmediatelyClosable: true,
                type: 'auto',
            });
            trigger.insertAdjacentElement('afterend', overlay);
        });
    }

    customElements.whenDefined('code-example').then(() => {
        Promise.all([...document.querySelectorAll('code-example')].map(example => example.updateComplete)).then(() => {
            init();
        });
    });
</script>
